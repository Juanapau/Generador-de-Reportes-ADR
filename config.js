// ---------- CONFIGURACIÓN ----------
  // 👉 Pega aquí la URL de tu Apps Script (termina en /exec) luego de implementarlo.
  const CONFIG = {
    API_URL: 'https://script.google.com/macros/s/AKfycbxz34BwiamnGlgacedLeicRxt9F5yY8agA8lfGpVsvogt_O19wZR9aCFuQEZVo6Kkaf/exec'
  };

  // ---------- Estado de sesión (en memoria, sin localStorage) ----------
  let currentUser = null;
  let selectedRole = 'estudiante';
  let estudiantesCache = [];
  let docenteOriginal = null; // guarda al docente cuando está "viendo como" un estudiante
  let modoPreviewDocente = false; // true cuando el docente está en su propia vista previa de estudiante (ve todo, sin guardar nada)

  // ---------- Helper de conexión (con reintentos automáticos) ----------
  // Google Apps Script a veces tarda en "despertar" o hay un hipo momentáneo de red.
  // Antes, cualquier falla se mostraba de inmediato como error. Ahora se reintenta
  // automáticamente antes de rendirse, en un solo lugar que beneficia a TODA la app
  // (cada pantalla llama a apiGet/apiPost, así que arreglarlo aquí lo arregla en todos lados).
  async function fetchConReintentos_(url, opciones, intentos){
    for(let intento = 1; intento <= intentos; intento++){
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s por intento — Apps Script puede tardar en arrancar
      try{
        const res = await fetch(url, { ...opciones, signal: controller.signal });
        clearTimeout(timeoutId);
        if(!res.ok) throw new Error('HTTP ' + res.status);
        return await res.json();
      }catch(err){
        clearTimeout(timeoutId);
        if(intento === intentos) throw err; // se agotaron los intentos, ahora sí se propaga el error
        await new Promise(r => setTimeout(r, 700 * intento)); // espera un poco más cada vez antes de reintentar
      }
    }
  }

  async function apiGet(params){
    // Se agrega un parámetro anti-caché (_t) y cache:'no-store' porque el navegador
    // puede reutilizar una respuesta anterior para la misma URL (ej. el login),
    // devolviendo datos desactualizados como el estado de "primer acceso".
    const allParams = { ...params, _t: Date.now() };
    const url = CONFIG.API_URL + '?' + new URLSearchParams(allParams).toString();
    return fetchConReintentos_(url, { cache: 'no-store' }, 3);
  }
  const ACCIONES_BLOQUEADAS_EN_PREVIEW = ['guardarCalificacion', 'enviarRespuestaExtra', 'calificarRespuestaExtra'];
  async function apiPost(data){
    if(modoPreviewDocente && ACCIONES_BLOQUEADAS_EN_PREVIEW.includes(data.action)){
      // En vista previa de administrador no se guarda nada real en el servidor.
      console.log('[Vista previa de administrador] No se guardó en el servidor:', data.action);
      return { success:true };
    }
    return fetchConReintentos_(CONFIG.API_URL, { method:'POST', body: JSON.stringify(data) }, 3);
  }

  // ---------- Registro de actividades interactivas ----------
  // Cada actividad interactiva (A.1.1, A.1.2...) se registra aquí sola,
  // al final de su propio archivo, para que "Mis actividades" sepa
  // cómo abrirla sin que ningún otro archivo tenga que conocerla.
  // ---------- Información de los 5 RA (compartida entre panel docente y estudiante) ----------
  const RA_INFO = {
    RA1: { icono:'fa-clipboard-list', color:'blue',  descripcion:'Clasificar los requerimientos de información de los diversos usuarios para producir reportes empresariales, siguiendo parámetros establecidos.' },
    RA2: { icono:'fa-table-cells-large', color:'gold', descripcion:'Aplicar los conocimientos recibidos para la creación de reportes empresariales funcionales y oportunos, según requerimientos del usuario.' },
    RA3: { icono:'fa-code',           color:'green', descripcion:'Presentar o entregar reportes que cumplan los requerimientos de información, según criterios definidos por la organización.' },
    RA4: { icono:'fa-chart-line',     color:'blue',  descripcion:'Medir parámetros e indicadores para mejorar estrategias de marketing digital implementando los correctivos en las pautas recibidas.' },
    RA5: { icono:'fa-robot',          color:'gold',  descripcion:'Integrar repositorios de tableros con algoritmos de Big Data o Inteligencia Artificial para descubrir patrones y tendencias.' }
  };

  // ---------- Notificaciones tipo toast (reemplaza alert() nativo) ----------
  function mostrarNotificacion(mensaje, tipo){
    tipo = tipo || 'info'; // 'success' | 'error' | 'info'
    const iconos = { success:'fa-circle-check', error:'fa-circle-exclamation', info:'fa-circle-info' };
    const cont = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `<i class="fa-solid ${iconos[tipo] || iconos.info}"></i><span>${mensaje}</span>`;
    cont.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ---------- Modal de confirmación (reemplaza confirm() nativo) ----------
  // Uso: if(await confirmarAccion('¿Eliminar este recurso?')) { ... }
  function confirmarAccion(mensaje, titulo){
    return new Promise(resolve => {
      const modal = document.getElementById('modalConfirmacion');
      document.getElementById('confirmTitulo').textContent = titulo || '¿Estás segura?';
      document.getElementById('confirmMensaje').textContent = mensaje;
      modal.classList.remove('hidden');

      const btnAceptar = document.getElementById('confirmAceptar');
      const btnCancelar = document.getElementById('confirmCancelar');

      function limpiar(resultado){
        modal.classList.add('hidden');
        btnAceptar.removeEventListener('click', onAceptar);
        btnCancelar.removeEventListener('click', onCancelar);
        resolve(resultado);
      }
      function onAceptar(){ limpiar(true); }
      function onCancelar(){ limpiar(false); }

      btnAceptar.addEventListener('click', onAceptar);
      btnCancelar.addEventListener('click', onCancelar);
    });
  }

  // ---------- Formato corto de fecha para mostrar al estudiante ----------
  // Acepta un objeto Date, un texto ISO, o un texto tipo datetime-local, y siempre
  // devuelve el mismo formato "AAAA-MM-DD HH:mm" (o solo "AAAA-MM-DD" si no tiene hora).
  function formatearFechaCorta(fecha){
    if(!fecha) return '';
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    if(isNaN(d.getTime())) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mi = String(d.getMinutes()).padStart(2, '0');
    const soloMedianoche = hh === '00' && mi === '00';
    return soloMedianoche ? `${yyyy}-${mm}-${dd}` : `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  }

  // ---------- Fecha corta "dd/mm/aaaa", sin hora — para espacios pequeños (ej. el sello del PDF) ----------
  function formatearFechaCortaSinHora_(fecha){
    if(!fecha) return '';
    const d = fecha instanceof Date ? fecha : new Date(fecha);
    if(isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${d.getFullYear()}`;
  }

  // ---------- Formatea el valor de UNA CELDA de un reporte diseñado por el estudiante ----------
  // Las tablas de Google Sheets devuelven las fechas y horas como texto ISO
  // ("1899-12-30T12:42:00.000Z", "2026-10-03T00:00:00.000Z"...), que no debe
  // verse así en pantalla ni en el PDF. Esta función detecta esos valores y los
  // convierte a un formato corto y legible:
  //  - Si la "fecha" es el 30/12/1899 (el cero de los números seriales de Sheets),
  //    el valor original era solo una HORA sin fecha real → se muestra solo la hora.
  //  - Si tiene fecha real sin hora (medianoche) → se muestra solo la fecha.
  //  - Si tiene fecha y hora → se muestran ambas, cortas.
  // Cualquier otro valor (texto, número) se devuelve tal cual.
  function formatearValorCeldaReporte_(valor){
    if(valor === null || valor === undefined || valor === '') return valor;
    const esTextoISO = typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/.test(valor);
    if(!(valor instanceof Date) && !esTextoISO) return valor;

    const d = valor instanceof Date ? valor : new Date(valor);
    if(isNaN(d.getTime())) return valor;

    const anio = d.getUTCFullYear();
    const mes = d.getUTCMonth();
    const dia = d.getUTCDate();
    const horas = d.getUTCHours();
    const minutos = d.getUTCMinutes();

    const horaCorta = () => {
      const h12 = horas % 12 === 0 ? 12 : horas % 12;
      const ampm = horas < 12 ? 'a.m.' : 'p.m.';
      return `${h12}:${String(minutos).padStart(2, '0')} ${ampm}`;
    };

    const esSoloHora = anio === 1899 && mes === 11 && dia === 30;
    if(esSoloHora) return horaCorta();

    const fechaCorta = `${String(dia).padStart(2, '0')}/${String(mes + 1).padStart(2, '0')}/${anio}`;
    const tieneHora = horas !== 0 || minutos !== 0;
    return tieneHora ? `${fechaCorta} ${horaCorta()}` : fechaCorta;
  }

  function pintarTarjetasRA(items){
    return items.map(({ ra, disponible }) => {
      const info = RA_INFO[ra];
      return `
        <div class="ra-card ${disponible ? '' : 'ra-card-disabled'}" data-ra="${ra}">
          <div class="ra-card-icon ra-icon-${info.color}"><i class="fa-solid ${info.icono}"></i></div>
          <div class="ra-card-titulo">${ra}</div>
          <div class="ra-card-desc">${info.descripcion}</div>
          <div class="ra-card-sub">${disponible ? 'Ver actividades' : 'Próximamente'}</div>
        </div>`;
    }).join('');
  }

  const actividadesInteractivas = {};
  function registrarActividadInteractiva(codigo, funcionAbrir){
    actividadesInteractivas[codigo] = funcionAbrir;
  }

  // ---------- Recursos de una actividad (reutilizable por cualquier actividad interactiva) ----------
  // ---------- Utilidad de mezclado (usada por cualquier actividad para evitar patrones) ----------
  function barajar(arr){
    const copia = [...arr];
    for(let i = copia.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  // ---------- Tablas de datos compartidas (reutilizable por cualquier actividad) ----------
  // Devuelve { campos: [...], datos: [...] } o null si falla.
  // ---------- Limpieza de texto casi invisible en contenido enriquecido ----------
  // Corrige de raíz (y retroactivamente) el bug de texto blanco "horneado" por el navegador
  // al usar contenteditable: si un color guardado es casi blanco, se quita para que el texto
  // vuelva a heredar el color correcto según el tema (claro u oscuro) de quien lo esté viendo.
  function colorACanalesRgb(colorStr){
    const d = document.createElement('div');
    d.style.color = colorStr;
    document.body.appendChild(d);
    const computado = getComputedStyle(d).color;
    document.body.removeChild(d);
    const match = computado.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if(!match) return null;
    return { r:+match[1], g:+match[2], b:+match[3] };
  }

  function limpiarColoresCasiBlancos(html){
    if(!html) return html;
    const temp = document.createElement('div');
    temp.innerHTML = html;

    temp.querySelectorAll('[style*="color"]').forEach(el => {
      if(!el.style.color) return;
      const rgb = colorACanalesRgb(el.style.color);
      if(rgb){
        const luminancia = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        if(luminancia > 235){
          el.style.removeProperty('color');
          if(!el.getAttribute('style')) el.removeAttribute('style');
        }
      }
    });

    temp.querySelectorAll('font[color]').forEach(el => {
      const rgb = colorACanalesRgb(el.getAttribute('color'));
      if(rgb){
        const luminancia = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        if(luminancia > 235) el.removeAttribute('color');
      }
    });

    return temp.innerHTML;
  }

  async function cargarTablaDatos(tabla){
    try{
      const data = await apiGet({ action:'listarTablaDatos', tabla });
      if(!data.success) return null;
      return { campos: data.campos, datos: data.datos };
    }catch(err){
      return null;
    }
  }

  // ---------- PDF de resultado (reutilizable por cualquier actividad) ----------
  const ETIQUETAS_NIVEL_PDF = {
    logrado:'Logrado', proceso:'En proceso', no_logrado:'No logrado',
    cumple:'Cumple', no_cumple:'No cumple',
    excelente:'Excelente', bueno:'Bueno', insuficiente:'Insuficiente'
  };

  // Colores de acento (RGB) usados en el PDF, a juego con la paleta del sistema
  const PDF_COLOR_VERDE_BG = [224, 247, 235];
  const PDF_COLOR_VERDE_TEXTO = [21, 128, 61];
  const PDF_COLOR_ROJO_BG = [253, 226, 226];
  const PDF_COLOR_ROJO_TEXTO = [185, 28, 28];
  const PDF_COLOR_DORADO = [184, 121, 15];
  const PDF_COLOR_AZUL = [37, 99, 235];

  function generarPdfResultado(codigo, criterios, nota, puntajeMaximo, ec, ra, detalle){
    if(!window.jspdf){
      mostrarNotificacion('No se pudo cargar el generador de PDF. Verifica tu conexión e intenta de nuevo.', 'error');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margenIzq = 14;
    const anchoUtil = 182;
    let y = 20;

    // ---------- Portada: encabezado + resumen del instrumento ----------
    doc.setFillColor(...PDF_COLOR_AZUL);
    doc.rect(0, 0, 210, 26, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(17);
    doc.setFont(undefined, 'bold');
    doc.text(`Resultado — Actividad ${codigo}`, margenIzq, 16);

    doc.setTextColor(30, 30, 30);
    y = 36;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Estudiante: ${(currentUser && (currentUser.nombre || currentUser.usuario)) || ''}`, margenIzq, y);
    y += 6;
    doc.text(`${ec || ''} · ${ra || ''}`, margenIzq, y);
    y += 6;
    doc.text(`Fecha: ${formatearFechaCorta(new Date())}`, margenIzq, y);
    y += 10;

    doc.setDrawColor(210);
    doc.line(margenIzq, y, 196, y);
    y += 8;

    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...PDF_COLOR_DORADO);
    doc.text('Instrumento de evaluación', margenIzq, y);
    doc.setTextColor(30, 30, 30);
    y += 8;

    criterios.forEach(c => {
      if(y > 265){ doc.addPage(); y = 20; }

      const logrado = ['logrado','cumple','excelente','bueno'].includes(c.nivel);
      const colorTexto = logrado ? PDF_COLOR_VERDE_TEXTO : PDF_COLOR_ROJO_TEXTO;

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(30, 30, 30);
      doc.text(c.nombre, margenIzq, y);
      y += 5;

      const nivelTexto = ETIQUETAS_NIVEL_PDF[c.nivel] || c.nivel || '';
      doc.setFontSize(9.5);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...colorTexto);
      doc.text(`Nivel obtenido: ${nivelTexto}`, margenIzq, y);
      doc.setTextColor(30, 30, 30);
      y += 5;

      const descripcionMostrar = c.descripcion || (c.niveles && c.niveles[c.nivel]) || '';
      if(descripcionMostrar){
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        const lineas = doc.splitTextToSize(descripcionMostrar, 180);
        doc.text(lineas, margenIzq, y);
        y += lineas.length * 4.5;
      }
      y += 6;
    });

    if(y > 255){ doc.addPage(); y = 20; }
    y += 4;
    doc.setDrawColor(210);
    doc.line(margenIzq, y, 196, y);
    y += 10;

    doc.setFillColor(...PDF_COLOR_DORADO);
    doc.roundedRect(margenIzq, y - 6, anchoUtil, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text(`Calificación total: ${nota} / ${puntajeMaximo}`, margenIzq + 4, y + 2);
    doc.setTextColor(30, 30, 30);

    // ---------- Detalle de preguntas y respuestas, con colores ----------
    if(detalle && detalle.length){
      doc.addPage();
      y = 20;
      doc.setFontSize(15);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...PDF_COLOR_AZUL);
      doc.text('Detalle de tus respuestas', margenIzq, y);
      doc.setTextColor(30, 30, 30);
      y += 10;

      detalle.forEach(seccion => {
        if(y > 270){ doc.addPage(); y = 20; }
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...PDF_COLOR_DORADO);
        doc.text(seccion.titulo, margenIzq, y);
        doc.setTextColor(30, 30, 30);
        y += 7;

        seccion.items.forEach(item => {
          doc.setFontSize(9);
          const preguntaLineas = doc.splitTextToSize(item.pregunta, anchoUtil - 8);
          const tuRespuestaLineas = doc.splitTextToSize(`Tu respuesta: ${item.tuRespuesta}`, anchoUtil - 8);
          let correctaLineas = [];
          if(!item.correcta && item.respuestaCorrecta){
            correctaLineas = doc.splitTextToSize(`Respuesta correcta: ${item.respuestaCorrecta}`, anchoUtil - 8);
          }
          const alturaCaja = 6 + preguntaLineas.length * 4.3 + tuRespuestaLineas.length * 4.3 + correctaLineas.length * 4.3 + 4;

          if(y + alturaCaja > 285){ doc.addPage(); y = 20; }

          const fondo = item.correcta ? PDF_COLOR_VERDE_BG : PDF_COLOR_ROJO_BG;
          const texto = item.correcta ? PDF_COLOR_VERDE_TEXTO : PDF_COLOR_ROJO_TEXTO;
          doc.setFillColor(...fondo);
          doc.roundedRect(margenIzq, y, anchoUtil, alturaCaja, 2, 2, 'F');

          let yy = y + 5;
          doc.setFont(undefined, 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(...texto);
          doc.text(item.correcta ? 'CORRECTO' : 'INCORRECTO', margenIzq + 4, yy);
          yy += 4.5;

          doc.setFont(undefined, 'bold');
          doc.setFontSize(9);
          doc.setTextColor(30, 30, 30);
          doc.text(preguntaLineas, margenIzq + 4, yy);
          yy += preguntaLineas.length * 4.3;

          doc.setFont(undefined, 'normal');
          doc.setTextColor(60, 60, 60);
          doc.text(tuRespuestaLineas, margenIzq + 4, yy);
          yy += tuRespuestaLineas.length * 4.3;

          if(correctaLineas.length){
            doc.setFont(undefined, 'italic');
            doc.setTextColor(...PDF_COLOR_VERDE_TEXTO);
            doc.text(correctaLineas, margenIzq + 4, yy);
          }

          doc.setTextColor(30, 30, 30);
          y += alturaCaja + 5;
        });

        y += 4;
      });
    }

    const nombreArchivo = `Resultado_${codigo}_${(currentUser && currentUser.usuario) || 'estudiante'}.pdf`;
    doc.save(nombreArchivo);
  }

  // ---------- Genera un PDF del REPORTE que el estudiante diseñó (no de su calificación) ----------
  // Pensado para imprimirse. Lo usan todas las actividades de "Diseñador de Reportes"
  // (A.2.1, A.2.2, A.2.3 y las que se vayan agregando), por eso vive aquí como helper
  // genérico en vez de repetirse en cada actividad.
  //
  // opciones = {
  //   nombreEmpresa, tituloReporte: strings para el encabezado del reporte
  //   columnas: array de títulos de columna ya listos para mostrarse (encabezado de página)
  //   filas: array de filas (cada fila es un array de celdas, ya formateadas como texto) — para reportes SIN agrupar
  //   grupos: array de { encabezado, filas: [[...]], pie } — para reportes agrupados (si viene, se usa en vez de "filas")
  //   numeroPagina: boolean — si se debe imprimir "Página X" al pie de cada hoja
  //   nombreArchivo: nombre sugerido del PDF (opcional)
  // }
  // Paleta propia de este PDF (más llamativa que la del PDF de resultados): azul
  // marino oscuro + dorado + franjas alternas, para que se vea como un reporte de
  // verdad y no como una lista plana. Es el diseño ESTÁNDAR para cualquier reporte
  // que el estudiante construya en el Diseñador de Reportes (A.2.1, A.2.2, A.2.3...).
  const PDF_REPORTE_AZUL_MARINO = [15, 35, 65];
  const PDF_REPORTE_FRANJA_PAR = [255, 255, 255];
  const PDF_REPORTE_FRANJA_IMPAR = [244, 246, 251];

  function generarPdfReporteDisenado(opciones){
    if(!window.jspdf){
      mostrarNotificacion('No se pudo cargar el generador de PDF. Verifica tu conexión e intenta de nuevo.', 'error');
      return;
    }
    const { nombreEmpresa, tituloReporte, columnas, filas, grupos, numeroPagina } = opciones;
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margenIzq = 14;
    const margenDer = 196;
    const anchoUtil = 182;
    const anchoCol = anchoUtil / Math.max(columnas.length, 1);
    let y = 40;
    let numPaginaActual = 1;
    let indiceFilaFranja = 0;

    function pintarMarcoPagina(){
      doc.setDrawColor(...PDF_COLOR_DORADO);
      doc.setLineWidth(0.6);
      doc.rect(6, 6, 198, 285);
      doc.setLineWidth(0.2);
    }

    function pintarPiePagina(){
      doc.setDrawColor(220);
      doc.line(margenIzq, 284, margenDer, 284);
      doc.setFontSize(8);
      doc.setFont(undefined, 'italic');
      doc.setTextColor(140, 140, 140);
      doc.text('Generador de Reportes ADR — Análisis y Diseño de Reportes', margenIzq, 289);
      if(numeroPagina){
        doc.text(`Página ${numPaginaActual}`, margenDer, 289, { align:'right' });
      }
      doc.setFont(undefined, 'normal');
      doc.setTextColor(30, 30, 30);
      numPaginaActual++;
    }

    function pintarEncabezadoReporte(){
      // Franja dorada superior (detalle decorativo) + banda azul marino con el
      // nombre de la empresa y el título, y una etiqueta "REPORTE" a la derecha.
      doc.setFillColor(...PDF_COLOR_DORADO);
      doc.rect(0, 0, 210, 3, 'F');
      doc.setFillColor(...PDF_REPORTE_AZUL_MARINO);
      doc.rect(0, 3, 210, 29, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(17);
      doc.setFont(undefined, 'bold');
      doc.text(nombreEmpresa || '', margenIzq, 18);
      doc.setFontSize(11.5);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...PDF_COLOR_DORADO);
      doc.text(tituloReporte || '', margenIzq, 26);

      const anchoPastilla = 38;
      doc.setDrawColor(...PDF_COLOR_DORADO);
      doc.setLineWidth(0.6);
      doc.roundedRect(margenDer - anchoPastilla, 8, anchoPastilla, 11, 1.8, 1.8);
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.text('REPORTE', margenDer - anchoPastilla / 2, 13, { align:'center' });
      doc.setFontSize(7);
      doc.setFont(undefined, 'normal');
      doc.text(formatearFechaCortaSinHora_(new Date()), margenDer - anchoPastilla / 2, 17, { align:'center' });

      doc.setLineWidth(0.2);
      doc.setTextColor(30, 30, 30);
      doc.setFont(undefined, 'normal');
    }

    function pintarEncabezadoColumnas(){
      doc.setFillColor(...PDF_REPORTE_AZUL_MARINO);
      doc.rect(margenIzq, y - 5.5, anchoUtil, 8, 'F');
      doc.setFont(undefined, 'bold');
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      columnas.forEach((c, i) => doc.text(String(c).toUpperCase(), margenIzq + i * anchoCol + 3, y));
      doc.setTextColor(30, 30, 30);
      doc.setFont(undefined, 'normal');
      y += 7;
      indiceFilaFranja = 0;
    }

    function saltarPaginaSiNecesario(espacioNecesario){
      if(y + espacioNecesario > 278){
        pintarPiePagina();
        doc.addPage();
        pintarMarcoPagina();
        y = 24;
        pintarEncabezadoColumnas();
      }
    }

    function pintarFila(valores){
      saltarPaginaSiNecesario(7);
      const alturaFila = 6.3;
      doc.setFillColor(...(indiceFilaFranja % 2 === 0 ? PDF_REPORTE_FRANJA_PAR : PDF_REPORTE_FRANJA_IMPAR));
      doc.rect(margenIzq, y - 4.6, anchoUtil, alturaFila, 'F');
      doc.setFontSize(9);
      valores.forEach((v, i) => {
        const txt = doc.splitTextToSize(v === undefined || v === null ? '' : String(v), anchoCol - 5);
        doc.text(txt[0] || '', margenIzq + i * anchoCol + 3, y);
      });
      doc.setDrawColor(226, 230, 240);
      doc.line(margenIzq, y + 1.7, margenDer, y + 1.7);
      y += alturaFila;
      indiceFilaFranja++;
    }

    function pintarBandaGrupo(texto, colorFondo, colorTexto, icono){
      saltarPaginaSiNecesario(8);
      doc.setFillColor(...colorFondo);
      doc.roundedRect(margenIzq, y - 5, anchoUtil, 7.5, 1.2, 1.2, 'F');
      doc.setTextColor(...colorTexto);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(9.5);
      doc.text(`${icono}  ${texto || ''}`, margenIzq + 3, y);
      doc.setTextColor(30, 30, 30);
      doc.setFont(undefined, 'normal');
      y += 9;
      indiceFilaFranja = 0;
    }

    pintarMarcoPagina();
    pintarEncabezadoReporte();
    pintarEncabezadoColumnas();

    if(grupos && grupos.length){
      grupos.forEach(g => {
        pintarBandaGrupo(g.encabezado, PDF_COLOR_DORADO, [255, 255, 255], '▸');
        (g.filas || []).forEach(f => pintarFila(f));
        pintarBandaGrupo(g.pie, PDF_COLOR_VERDE_BG, PDF_COLOR_VERDE_TEXTO, 'Σ');
      });
    } else {
      (filas || []).forEach(f => pintarFila(f));
    }

    pintarPiePagina();

    const base = (tituloReporte || opciones.nombreArchivo || 'reporte_disenado').toString().replace(/[^a-z0-9]+/gi, '_');
    doc.save(`${base}.pdf`);
  }

  async function cargarRecursosActividad(codigo, containerId){
    const cont = document.getElementById(containerId);
    if(!cont) return;
    try{
      const data = await apiGet({ action:'listarRecursos', codigo });
      if(!data.success || data.recursos.length === 0){
        cont.innerHTML = '<div style="font-size:14px; opacity:.6; padding:6px 0;">Tu docente no ha agregado recursos para esta actividad.</div>';
        return;
      }
      cont.innerHTML = data.recursos.map(r => `
        <a href="${r.url}" target="_blank" rel="noopener" class="recurso-item">
          <i class="fa-solid ${r.tipo === 'archivo' ? 'fa-file-lines' : 'fa-link'}"></i>
          <span>${r.nombre}</span>
          <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left:auto; opacity:.6;"></i>
        </a>
      `).join('');
    }catch(err){
      cont.innerHTML = '<div style="font-size:14px; opacity:.6;">No se pudieron cargar los recursos.</div>';
    }
  }
