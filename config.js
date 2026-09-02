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

  // ---------- Helper de conexión ----------
  async function apiGet(params){
    // Se agrega un parámetro anti-caché (_t) y cache:'no-store' porque el navegador
    // puede reutilizar una respuesta anterior para la misma URL (ej. el login),
    // devolviendo datos desactualizados como el estado de "primer acceso".
    const allParams = { ...params, _t: Date.now() };
    const url = CONFIG.API_URL + '?' + new URLSearchParams(allParams).toString();
    const res = await fetch(url, { cache: 'no-store' });
    return res.json();
  }
  async function apiPost(data){
    const res = await fetch(CONFIG.API_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.json();
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
