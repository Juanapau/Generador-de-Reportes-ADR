// ============================================================================
// ACTIVIDADES INTERACTIVAS — TODOS los códigos de actividad viven en este
// único archivo, organizados por secciones (Ctrl+F el código, ej. "A.1.2").
// Esto evita tener decenas de archivos sueltos a medida que crece el módulo.
// ============================================================================

// ============================================================================
// A.1.1 — CLASIFICADOR DE REPORTES EMPRESARIALES (Interno / Externo)
// ============================================================================
  // ================= ACTIVIDAD A.1.1: CLASIFICADOR DE REPORTES =================
  // Contenido anclado directamente al recurso de lectura "Reportes Empresariales"
  // (con los 9 ejemplos "en papel" que el estudiante ya estudió). Se parafrasea
  // el destinatario de cada uno para que la actividad exija comprensión real del
  // recurso, no solo repetir la palabra "interno"/"externo" que aparecía en el PDF.
  const ITEMS_A11_BASE = [
    { id:1, texto:'TECNOVENTAS RD, S.R.L. — Reporte de Ventas Diarias: resume las ventas del día en la sucursal de Santiago Centro, para el departamento de ventas de la empresa.', tipo:'interno' },
    { id:2, texto:'INDUSTRIAS DEL CIBAO, S.A. — Reporte de Producción: compara la meta de producción del turno con lo realmente fabricado, dirigido a la gerencia de operaciones.', tipo:'interno' },
    { id:3, texto:'COMERCIAL ALTAGRACIA, S.R.L. — Reporte de Asistencia: registra las horas de entrada y salida del personal administrativo durante la semana.', tipo:'interno' },
    { id:4, texto:'FERRETERÍA EL PROGRESO — Informe de Inventario: detalla las existencias del almacén principal y qué productos deben reordenarse.', tipo:'interno' },
    { id:5, texto:'SEGUROS CONFIANZA, S.A. — Reporte de Desempeño: presenta los indicadores de atención al cliente, ventas y cobranza en la reunión mensual de gerencia.', tipo:'interno' },
    { id:6, texto:'GRUPO CARIBE INVERSIONES, S.A. — Balance General: resume los activos, pasivos y patrimonio de la empresa; auditado y entregado a los accionistas y al banco acreedor.', tipo:'externo' },
    { id:7, texto:'DISTRIBUIDORA NORTE, EIRL — Declaración Jurada de ITBIS: detalla las ventas gravadas y el impuesto a pagar, presentado ante la Dirección General de Impuestos Internos (DGII).', tipo:'externo' },
    { id:8, texto:'AGROEXPORT DOMINICANA, S.A. — Informe Trimestral: resume los ingresos y la utilidad del trimestre, enviado por correo certificado a los socios accionistas.', tipo:'externo' },
    { id:9, texto:'CEMENTOS DEL ESTE, S.A. — Informe de Responsabilidad Social: describe los programas de reforestación y becas escolares, publicado en el sitio web institucional para la comunidad.', tipo:'externo' }
  ];

  const CRITERIOS_BASE_A11 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad de clasificación desde el inicio.' },
    { key:'identificacion', nombre:'2. Conceptos clave', descripcion:'Responde correctamente las preguntas sobre qué son, cuál es su objetivo y por qué son importantes los reportes empresariales, según el recurso.' },
    { key:'clasificacion', nombre:'3. Clasificación correcta', descripcion:'Ubica cada ejemplo del recurso en la categoría correcta según su destinatario.' },
    { key:'justificacion', nombre:'4. Justificación del criterio', descripcion:'Explica el motivo de su clasificación con argumentos válidos.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'colaborativo', nombre:'6. Trabajo colaborativo', descripcion:'Colabora de forma organizada con su equipo durante el ejercicio.' }
  ];

  // Sección 1: preguntas de selección múltiple sobre el recurso (qué son, objetivo, importancia)
  const PREGUNTAS_A11_BASE = [
    {
      pregunta: '¿Qué son los reportes empresariales, según el recurso?',
      opciones: [
        'Documentos que recopilan, organizan y presentan información relevante para la toma de decisiones.',
        'Documentos exclusivos del departamento de contabilidad.',
        'Registros que solo contienen datos financieros.',
        'Presentaciones visuales sin datos numéricos.'
      ],
      correctaIdx: 0
    },
    {
      pregunta: '¿Cuál es el objetivo principal de un reporte empresarial?',
      opciones: [
        'Aumentar las ventas de forma directa.',
        'Sustituir las reuniones de trabajo.',
        'Ofrecer una visión clara y ordenada de lo que ocurre en la organización para apoyar la toma de decisiones.',
        'Cumplir un requisito legal únicamente.'
      ],
      correctaIdx: 2
    },
    {
      pregunta: '¿Cuál de las siguientes NO es una razón por la que los reportes empresariales son importantes?',
      opciones: [
        'Facilitan la toma de decisiones.',
        'Promueven la transparencia.',
        'Permiten medir el desempeño.',
        'Garantizan que la empresa nunca tendrá pérdidas.'
      ],
      correctaIdx: 3
    }
  ];

  let preguntasBarajadasA11 = [];
  let respuestasQuizA11 = [];
  let ITEMS_A11 = [];
  let ultimoResultadoA11 = null;
  let asignacionesA11 = {};
  let seleccionadoA11 = null;
  let puntajeMaxA11 = 0;
  let tiempoEstimadoA11 = 10;
  let inicioTiempoA11 = null;
  let timerIntervalA11 = null;

  async function abrirActividadA11(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA11 = puntajeMaximo;
    tiempoEstimadoA11 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA11').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA11').classList.remove('hidden');

    // ---- Bloqueo de repetición: si ya existe una calificación para esta actividad,
    // se muestra directamente el resultado guardado y no se permite volver a realizarla.
    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.1') : null;
      if(previa){
        ultimoResultadoA11 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('vistaInstrumentoA11').classList.add('hidden');
        document.getElementById('vistaEjercicioA11').classList.add('hidden');
        document.getElementById('vistaResultadoA11').classList.remove('hidden');
        document.getElementById('resultadoDesgloseA11').innerHTML = '';
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA11', previa.detalle);
        renderRubrica('rubricaResultadoA11', previa.criterios, previa.puntajeMaximo, previa.nota);
        document.getElementById('avisoYaCompletadaA11').classList.remove('hidden');
        document.getElementById('tituloDesgloseA11').classList.add('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA11').classList.add('hidden');
    document.getElementById('vistaInstrumentoA11').classList.remove('hidden');
    document.getElementById('vistaEjercicioA11').classList.add('hidden');
    document.getElementById('vistaResultadoA11').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA11').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA11} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosEstudianteA11();

    const criteriosPrevios = CRITERIOS_BASE_A11.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA11', criteriosPrevios, puntajeMaxA11, null);
  }

  async function cargarRecursosEstudianteA11(){
    const cont = document.getElementById('recursosEstudianteA11');
    try{
      const data = await apiGet({ action:'listarRecursos', codigo:'A.1.1' });
      if(!data.success || data.recursos.length === 0){
        cont.innerHTML = '<div style="font-size:15px; opacity:.6; padding:6px 0;">Tu docente no ha agregado recursos para esta actividad.</div>';
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
      cont.innerHTML = '<div style="font-size:15px; opacity:.6;">No se pudieron cargar los recursos.</div>';
    }
  }

  document.getElementById('btnBackFromActividadA11').addEventListener('click', () => {
    clearInterval(timerIntervalA11);
    document.getElementById('panelActividadA11').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA11').addEventListener('click', () => {
    ITEMS_A11 = barajar(ITEMS_A11_BASE); // orden distinto en cada intento, sin patrón predecible
    asignacionesA11 = {};
    seleccionadoA11 = null;
    preguntasBarajadasA11 = barajar(PREGUNTAS_A11_BASE);
    respuestasQuizA11 = new Array(preguntasBarajadasA11.length).fill(null);
    document.getElementById('justificacionA11').value = '';
    document.getElementById('vistaInstrumentoA11').classList.add('hidden');
    document.getElementById('vistaEjercicioA11').classList.remove('hidden');
    pintarQuizA11();
    pintarClasificador();

    inicioTiempoA11 = Date.now();
    clearInterval(timerIntervalA11);
    timerIntervalA11 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA11) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA11').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA11} min aprox.)</span>`;
    }, 1000);
  });

  function pintarQuizA11(){
    const cont = document.getElementById('quizA11');
    cont.innerHTML = preguntasBarajadasA11.map((p, i) => `
      <div class="quiz-pregunta-bloque">
        <div class="quiz-pregunta-texto">${i + 1}. ${p.pregunta}</div>
        <div class="quiz-opciones">
          ${p.opciones.map((op, j) => `
            <button type="button" class="quiz-opcion-radio ${respuestasQuizA11[i] === j ? 'seleccionada' : ''}" data-pregunta="${i}" data-opcion="${j}">
              <span class="quiz-radio-circulo"></span>
              <span class="quiz-opcion-texto">${op}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    cont.querySelectorAll('.quiz-opcion-radio').forEach(btn => {
      btn.addEventListener('click', () => {
        respuestasQuizA11[Number(btn.dataset.pregunta)] = Number(btn.dataset.opcion);
        pintarQuizA11();
        actualizarBotonFinalizarA11();
      });
    });
  }

  function actualizarBotonFinalizarA11(){
    const quizCompleto = respuestasQuizA11.every(r => r !== null);
    const clasificacionCompleta = ITEMS_A11.filter(it => !asignacionesA11[it.id]).length === 0;
    document.getElementById('btnFinalizarA11').disabled = !(quizCompleto && clasificacionCompleta);
  }

  function pintarClasificador(){
    const pool = document.getElementById('clasifPool');
    const zonaInterno = document.getElementById('zonaInternoItems');
    const zonaExterno = document.getElementById('zonaExternoItems');

    const enPool = ITEMS_A11.filter(it => !asignacionesA11[it.id]);
    const enInterno = ITEMS_A11.filter(it => asignacionesA11[it.id] === 'interno');
    const enExterno = ITEMS_A11.filter(it => asignacionesA11[it.id] === 'externo');

    pool.innerHTML = enPool.map(it => `
      <div class="clasif-item ${seleccionadoA11 === it.id ? 'selected' : ''}" draggable="true" data-id="${it.id}">${it.texto}</div>
    `).join('') || '<span style="opacity:.5; font-size:15px;">Todos los reportes han sido clasificados.</span>';

    zonaInterno.innerHTML = enInterno.map(it => `<div class="clasif-item" data-id="${it.id}">${it.texto}</div>`).join('');
    zonaExterno.innerHTML = enExterno.map(it => `<div class="clasif-item" data-id="${it.id}">${it.texto}</div>`).join('');

    pool.querySelectorAll('.clasif-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.dataset.id);
        seleccionadoA11 = seleccionadoA11 === id ? null : id;
        pintarClasificador();
      });
    });

    [...zonaInterno.querySelectorAll('.clasif-item'), ...zonaExterno.querySelectorAll('.clasif-item')].forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.dataset.id);
        delete asignacionesA11[id];
        pintarClasificador();
      });
    });

    // Arrastrar y soltar (además del clic-seleccionar-y-asignar, que sigue funcionando igual)
    habilitarArrastre(
      pool.querySelectorAll('.clasif-item[draggable="true"]'),
      [document.getElementById('zonaInterno'), document.getElementById('zonaExterno')],
      (idArrastrado, zonaEl) => {
        asignacionesA11[Number(idArrastrado)] = zonaEl.id === 'zonaInterno' ? 'interno' : 'externo';
        seleccionadoA11 = null;
        pintarClasificador();
      }
    );

    actualizarBarraProgreso('progresoA11', ITEMS_A11.length - enPool.length, ITEMS_A11.length);
    actualizarBotonFinalizarA11();
  }

  document.getElementById('zonaInterno').addEventListener('click', (e) => {
    if(seleccionadoA11 === null) return;
    if(e.target.closest('.clasif-item')) return;
    asignacionesA11[seleccionadoA11] = 'interno';
    seleccionadoA11 = null;
    pintarClasificador();
  });
  document.getElementById('zonaExterno').addEventListener('click', (e) => {
    if(seleccionadoA11 === null) return;
    if(e.target.closest('.clasif-item')) return;
    asignacionesA11[seleccionadoA11] = 'externo';
    seleccionadoA11 = null;
    pintarClasificador();
  });

  document.getElementById('btnFinalizarA11').addEventListener('click', async () => {
    clearInterval(timerIntervalA11);

    let correctas = 0;
    ITEMS_A11.forEach(it => { if(asignacionesA11[it.id] === it.tipo) correctas++; });
    const total = ITEMS_A11.length;
    const proporcionCorrecta = correctas / total;

    let aciertosQuiz = 0;
    preguntasBarajadasA11.forEach((p, i) => { if(respuestasQuizA11[i] === p.correctaIdx) aciertosQuiz++; });
    const proporcionQuiz = preguntasBarajadasA11.length > 0 ? aciertosQuiz / preguntasBarajadasA11.length : 0;

    const minutosTranscurridos = (Date.now() - inicioTiempoA11) / 60000;
    const justificacion = document.getElementById('justificacionA11').value.trim();

    const criterios = [];

    criterios.push({ nombre: CRITERIOS_BASE_A11[0].nombre, descripcion: CRITERIOS_BASE_A11[0].descripcion, nivel: 'logrado' });

    criterios.push({
      nombre: CRITERIOS_BASE_A11[1].nombre, descripcion: CRITERIOS_BASE_A11[1].descripcion,
      nivel: proporcionQuiz >= 1 ? 'logrado' : (proporcionQuiz >= 0.5 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A11[2].nombre, descripcion: CRITERIOS_BASE_A11[2].descripcion,
      nivel: proporcionCorrecta >= 0.9 ? 'logrado' : (proporcionCorrecta >= 0.5 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A11[3].nombre, descripcion: CRITERIOS_BASE_A11[3].descripcion,
      nivel: justificacion.length >= 20 ? 'logrado' : (justificacion.length > 0 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A11[4].nombre, descripcion: CRITERIOS_BASE_A11[4].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA11 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA11 * 2 ? 'proceso' : 'no_logrado')
    });

    criterios.push({ nombre: CRITERIOS_BASE_A11[5].nombre, descripcion: CRITERIOS_BASE_A11[5].descripcion, nivel: 'logrado' });

    const pesoUnidad = puntajeMaxA11 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => {
      if(c.nivel === 'logrado') notaCalculada += pesoUnidad;
      else if(c.nivel === 'proceso') notaCalculada += pesoUnidad / 2;
    });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA11').classList.add('hidden');
    document.getElementById('vistaResultadoA11').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA11').classList.add('hidden');
    document.getElementById('tituloDesgloseA11').classList.remove('hidden');
    renderRubrica('rubricaResultadoA11', criterios, puntajeMaxA11, notaCalculada);
    ultimoResultadoA11 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA11 };

    const proporcionFinalA11 = puntajeMaxA11 > 0 ? notaCalculada / puntajeMaxA11 : 0;
    mostrarLogro(proporcionFinalA11 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA11 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA11 >= 0.8) dispararConfeti();

    const desgloseQuizHtml = preguntasBarajadasA11.map((p, i) => {
      const ok = respuestasQuizA11[i] === p.correctaIdx;
      return `
        <div class="esquema-zona ${ok ? 'correcto' : 'incorrecto'}">
          <div style="flex:1;">
            <div class="esquema-zona-tag">${i + 1}. ${p.pregunta}</div>
            <div class="esquema-zona-slot">
              <span class="esquema-zona-etiqueta">Tu respuesta: ${p.opciones[respuestasQuizA11[i]]}</span>
              ${!ok ? `<div style="margin-top:6px; font-size:12.5px; opacity:.8;">Correcta: ${p.opciones[p.correctaIdx]}</div>` : ''}
            </div>
          </div>
          <i class="fa-solid ${ok ? 'fa-check' : 'fa-xmark'}"></i>
        </div>`;
    }).join('');

    document.getElementById('resultadoDesgloseA11').innerHTML = `
      <div class="section-heading" style="font-size:16px; margin-top:0;">Sección 1 — Conceptos clave</div>
      <div class="esquema-reporte">${desgloseQuizHtml}</div>
      <div class="section-heading" style="font-size:16px;">Sección 2 — Clasificación</div>
      <div class="clasif-zonas">
        <div class="clasif-zona zona-interno">
          <h4><i class="fa-solid fa-building"></i> Interno</h4>
          ${ITEMS_A11.filter(it => it.tipo === 'interno').map(it => `
            <div class="clasif-item clasif-item-compacto ${asignacionesA11[it.id] === 'interno' ? 'correcto' : 'incorrecto'}">${it.texto.split(':')[0]}</div>
          `).join('')}
        </div>
        <div class="clasif-zona zona-externo">
          <h4><i class="fa-solid fa-globe"></i> Externo</h4>
          ${ITEMS_A11.filter(it => it.tipo === 'externo').map(it => `
            <div class="clasif-item clasif-item-compacto ${asignacionesA11[it.id] === 'externo' ? 'correcto' : 'incorrecto'}">${it.texto.split(':')[0]}</div>
          `).join('')}
        </div>
      </div>
    `;

    const detalleA11 = [
      {
        titulo: 'Sección 1 — Conceptos clave',
        items: preguntasBarajadasA11.map((p, i) => ({
          pregunta: p.pregunta,
          tuRespuesta: p.opciones[respuestasQuizA11[i]],
          correcta: respuestasQuizA11[i] === p.correctaIdx,
          respuestaCorrecta: p.opciones[p.correctaIdx]
        }))
      },
      {
        titulo: 'Sección 2 — Clasificación de reportes',
        items: ITEMS_A11.map(it => ({
          pregunta: it.texto,
          tuRespuesta: asignacionesA11[it.id] === 'interno' ? 'Interno' : (asignacionesA11[it.id] === 'externo' ? 'Externo' : 'Sin responder'),
          correcta: asignacionesA11[it.id] === it.tipo,
          respuestaCorrecta: it.tipo === 'interno' ? 'Interno' : 'Externo'
        }))
      }
    ];
    ultimoResultadoA11.detalle = detalleA11;

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.1',
        ra:'RA1',
        ec:'EC6.1.1',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA11,
        criterios: criterios,
        detalle: detalleA11
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA11').addEventListener('click', () => {
    if(!ultimoResultadoA11) return;
    generarPdfResultado('A.1.1', ultimoResultadoA11.criterios, ultimoResultadoA11.nota, ultimoResultadoA11.puntajeMaximo, 'EC6.1.1', 'RA1', ultimoResultadoA11.detalle);
  });

  document.getElementById('btnVolverMisActA11').addEventListener('click', () => {
    document.getElementById('panelActividadA11').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.1', abrirActividadA11);

// ============================================================================
// A.1.2 — PARTES DE UN REPORTE EMPRESARIAL
// ============================================================================
  // ================= ACTIVIDAD A.1.2: PARTES DE UN REPORTE EMPRESARIAL =================
  // Se muestra un reporte simulado con datos reales (empresa, productos, totales en RD$).
  // El estudiante debe identificar qué parte del reporte es cada sección, arrastrando/asignando
  // las etiquetas del banco (que aparecen en orden aleatorio) a la zona correspondiente.
  const ZONAS_A12_BASE = [
    {
      id:1,
      correcta:'Encabezado de reporte',
      html:`<div style="font-weight:800; font-size:16px;">TECNOVENTAS RD, S.R.L.</div>
            <div style="font-size:14px; opacity:.85;">Reporte de Ventas Mensuales — Enero 2026</div>`
    },
    {
      id:2,
      correcta:'Encabezado de página',
      html:`<div style="font-size:12.5px; opacity:.8; margin-bottom:6px;">Página 1 &nbsp;·&nbsp; Generado: 31/01/2026 &nbsp;·&nbsp; Vendedor: Todos</div>
            <div style="display:flex; gap:14px; font-weight:800; font-size:12.5px; border-bottom:1px solid rgba(255,255,255,.15); padding-bottom:6px;">
              <span style="flex:2;">Producto</span><span style="flex:1;">Cant.</span><span style="flex:1;">Precio Unit.</span><span style="flex:1;">Total</span>
            </div>`
    },
    {
      id:3,
      correcta:'Línea de detalle',
      html:`<div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0;"><span style="flex:2;">Laptop HP 15</span><span style="flex:1;">3</span><span style="flex:1;">RD$28,500.00</span><span style="flex:1;">RD$85,500.00</span></div>
            <div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0;"><span style="flex:2;">Mouse inalámbrico</span><span style="flex:1;">12</span><span style="flex:1;">RD$650.00</span><span style="flex:1;">RD$7,800.00</span></div>
            <div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0;"><span style="flex:2;">Teclado mecánico</span><span style="flex:1;">7</span><span style="flex:1;">RD$1,200.00</span><span style="flex:1;">RD$8,400.00</span></div>`
    },
    {
      id:4,
      correcta:'Pie de página',
      html:`<div style="font-size:12.5px; opacity:.85;">Página 1 de 2 &nbsp;·&nbsp; Subtotal de esta página: <b>RD$101,700.00</b></div>`
    },
    {
      id:5,
      correcta:'Pie de reporte',
      html:`<div style="font-size:14.5px; font-weight:800;">TOTAL GENERAL DEL REPORTE: RD$198,450.00</div>
            <div style="font-size:12px; opacity:.75;">Elaborado por: Departamento de Ventas</div>`
    }
  ];
  const ETIQUETAS_A12_BASE = ['Encabezado de reporte', 'Encabezado de página', 'Línea de detalle', 'Pie de página', 'Pie de reporte'];

  // Camino del aprendizaje: 3 personajes, cada uno hace una pregunta con 3 opciones,
  // basada en el recurso "Partes de un Reporte Empresarial".
  const PERSONAJES_A12 = [
    {
      nombre: 'El Gerente General',
      avatar: '🧑‍💼',
      pregunta: 'Quiero ver el nombre de mi empresa y el título del reporte apenas lo abra, sin importar en qué página esté. ¿Qué parte del reporte debo revisar?',
      opciones: ['Encabezado de reporte', 'Encabezado de página', 'Pie de página'],
      correctaIdx: 0
    },
    {
      nombre: 'La Diseñadora de Reportes',
      avatar: '👩‍💻',
      pregunta: 'Necesito la sección que se repite una vez por cada producto vendido, mostrando su cantidad y su precio. ¿Cuál es?',
      opciones: ['Encabezado de reporte', 'Línea de detalle', 'Pie de reporte'],
      correctaIdx: 1
    },
    {
      nombre: 'El Contador',
      avatar: '🧑‍🔬',
      pregunta: 'Quiero saber el total general de todo el reporte, no solo el subtotal de una página. ¿Dónde lo encuentro?',
      opciones: ['Pie de página', 'Encabezado de página', 'Pie de reporte'],
      correctaIdx: 2
    }
  ];

  const CRITERIOS_BASE_A12 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de partes', descripcion:'Responde correctamente las preguntas del camino del aprendizaje sobre las partes de un reporte.' },
    { key:'clasificacion', nombre:'3. Ubicación correcta', descripcion:'Coloca cada etiqueta en la zona correcta del reporte.' },
    { key:'justificacion', nombre:'4. Justificación', descripcion:'Explica la función de al menos dos de las partes identificadas.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'6. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let pasoCaminoA12 = 0;
  let respuestasCaminoA12 = [];
  let intentosCaminoA12 = [];
  let asignacionesA12 = {};
  let ultimoResultadoA12 = null;
  let etiquetaSeleccionadaA12 = null;
  let etiquetasBarajadasA12 = [];
  let puntajeMaxA12 = 0;
  let tiempoEstimadoA12 = 10;
  let inicioTiempoA12 = null;
  let timerIntervalA12 = null;

  async function abrirActividadA12(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA12 = puntajeMaximo;
    tiempoEstimadoA12 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA12').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA12').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.2') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA12').classList.add('hidden');
        document.getElementById('vistaEjercicioA12').classList.add('hidden');
        document.getElementById('vistaResultadoA12').classList.remove('hidden');
        document.getElementById('resultadoDesgloseA12').innerHTML = '';
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA12', previa.detalle);
        renderListaCotejo('rubricaResultadoA12', previa.criterios, previa.puntajeMaximo, previa.nota);
        ultimoResultadoA12 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA12').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA12').classList.add('hidden');
    document.getElementById('vistaInstrumentoA12').classList.remove('hidden');
    document.getElementById('vistaEjercicioA12').classList.add('hidden');
    document.getElementById('vistaResultadoA12').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA12').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA12} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.2', 'recursosEstudianteA12');

    const criteriosPrevios = CRITERIOS_BASE_A12.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderListaCotejo('instrumentoPrevioA12', criteriosPrevios, puntajeMaxA12, null);
  }

  document.getElementById('btnBackFromActividadA12').addEventListener('click', () => {
    clearInterval(timerIntervalA12);
    document.getElementById('panelActividadA12').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA12').addEventListener('click', () => {
    pasoCaminoA12 = 0;
    respuestasCaminoA12 = [];
    intentosCaminoA12 = [];
    asignacionesA12 = {};
    etiquetaSeleccionadaA12 = null;
    etiquetasBarajadasA12 = barajar(ETIQUETAS_A12_BASE); // orden distinto en cada intento
    document.getElementById('justificacionA12').value = '';
    document.getElementById('seccion2A12').classList.add('hidden');
    document.getElementById('vistaInstrumentoA12').classList.add('hidden');
    document.getElementById('vistaEjercicioA12').classList.remove('hidden');
    pintarCaminoA12();
    pintarEsquemaA12();

    inicioTiempoA12 = Date.now();
    clearInterval(timerIntervalA12);
    timerIntervalA12 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA12) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA12').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA12} min aprox.)</span>`;
    }, 1000);
  });

  function pintarCaminoA12(){
    const cont = document.getElementById('caminoA12');

    // Barra de nodos del camino (círculos conectados por líneas)
    const nodosHtml = PERSONAJES_A12.map((p, i) => {
      let claseNodo = '';
      if(i < pasoCaminoA12) claseNodo = 'completado';
      else if(i === pasoCaminoA12) claseNodo = 'activo';
      const linea = i < PERSONAJES_A12.length - 1
        ? `<div class="camino-linea ${i < pasoCaminoA12 ? 'completada' : ''}"></div>` : '';
      return `<div class="camino-nodo ${claseNodo}">${i < pasoCaminoA12 ? '<i class="fa-solid fa-check" style="color:var(--dark-green-accent);"></i>' : p.avatar}</div>${linea}`;
    }).join('');

    if(pasoCaminoA12 >= PERSONAJES_A12.length){
      cont.innerHTML = `
        <div class="camino-wrap">
          <div class="camino-progreso">${nodosHtml}</div>
          <div class="camino-tarjeta">
            <div class="camino-avatar">🎉</div>
            <div style="flex:1;">
              <div class="camino-completa-msg"><i class="fa-solid fa-circle-check"></i> ¡Completaste el camino! Ya puedes continuar con la Sección 2.</div>
            </div>
          </div>
        </div>`;
      document.getElementById('seccion2A12').classList.remove('hidden');
      actualizarBotonFinalizarA12();
      return;
    }

    const p = PERSONAJES_A12[pasoCaminoA12];
    const yaResuelto = respuestasCaminoA12[pasoCaminoA12] !== undefined;

    cont.innerHTML = `
      <div class="camino-wrap">
        <div class="camino-progreso">${nodosHtml}</div>
        <div class="camino-tarjeta">
          <div class="camino-avatar">${p.avatar}</div>
          <div style="flex:1;">
            <div class="camino-nombre-personaje">${p.nombre}</div>
            <div class="camino-burbuja">${p.pregunta}</div>
            <div class="asistente-opciones">
              ${p.opciones.map((op, i) => `
                <button type="button" class="asistente-opcion camino-opcion" data-opcion="${i}" ${yaResuelto ? 'disabled' : ''}>${op}</button>
              `).join('')}
            </div>
            <div id="caminoFeedbackA12"></div>
            ${yaResuelto ? '<button type="button" class="btn btn-primary" id="btnSiguientePersonajeA12" style="width:auto; padding:10px 22px; margin-top:14px;">Siguiente <i class="fa-solid fa-arrow-right"></i></button>' : ''}
          </div>
        </div>
      </div>`;

    if(yaResuelto){
      const idxCorrecta = p.correctaIdx;
      const btnCorrecta = document.querySelector(`.camino-opcion[data-opcion="${idxCorrecta}"]`);
      if(btnCorrecta) btnCorrecta.classList.add('correcta-marcada');
      document.getElementById('caminoFeedbackA12').innerHTML =
        `<div class="asistente-feedback"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Esa es: <b>${p.opciones[idxCorrecta]}</b>.</div>`;
      document.getElementById('btnSiguientePersonajeA12').addEventListener('click', () => {
        pasoCaminoA12++;
        pintarCaminoA12();
      });
    } else {
      document.querySelectorAll('.camino-opcion').forEach(btn => {
        btn.addEventListener('click', () => manejarOpcionCaminoA12(Number(btn.dataset.opcion), btn));
      });
    }
  }

  function manejarOpcionCaminoA12(idx, btnEl){
    const p = PERSONAJES_A12[pasoCaminoA12];
    if(intentosCaminoA12[pasoCaminoA12] === undefined) intentosCaminoA12[pasoCaminoA12] = 0;
    intentosCaminoA12[pasoCaminoA12]++;

    if(idx === p.correctaIdx){
      respuestasCaminoA12[pasoCaminoA12] = intentosCaminoA12[pasoCaminoA12] === 1; // true = acertó al primer intento
      pintarCaminoA12();
    } else {
      btnEl.classList.add('incorrecta-marcada');
      sacudir(btnEl);
      setTimeout(() => btnEl.classList.remove('incorrecta-marcada'), 500);
    }
  }

  function actualizarBotonFinalizarA12(){
    const caminoCompleto = pasoCaminoA12 >= PERSONAJES_A12.length;
    const enPool = ETIQUETAS_A12_BASE.filter(et => !Object.values(asignacionesA12).includes(et));
    document.getElementById('btnFinalizarA12').disabled = !(caminoCompleto && enPool.length === 0);
  }

  function pintarEsquemaA12(){
    const pool = document.getElementById('etiquetasPoolA12');
    const esquema = document.getElementById('esquemaReporteA12');

    const etiquetasUsadas = Object.values(asignacionesA12);
    const etiquetasDisponibles = etiquetasBarajadasA12.filter(et => !etiquetasUsadas.includes(et));

    pool.innerHTML = etiquetasDisponibles.map(et => `
      <div class="clasif-item ${etiquetaSeleccionadaA12 === et ? 'selected' : ''}" draggable="true" data-etiqueta="${et}">${et}</div>
    `).join('') || '<span style="opacity:.5; font-size:14px;">Todas las etiquetas han sido ubicadas.</span>';

    esquema.innerHTML = ZONAS_A12_BASE.map(z => {
      const etiqueta = asignacionesA12[z.id];
      return `
        <div class="esquema-zona ${etiqueta ? 'esquema-zona-llena' : 'esquema-zona-vacia'}" data-zona="${z.id}">
          <div style="flex:1;">
            ${z.html}
            <div class="esquema-zona-slot">
              ${etiqueta
                ? `<span class="esquema-zona-etiqueta"><i class="fa-solid fa-tag"></i> ${etiqueta}</span>`
                : `<span class="esquema-zona-placeholder">¿Qué parte del reporte es esta? Selecciona una etiqueta y haz clic aquí.</span>`}
            </div>
          </div>
          ${etiqueta ? '<i class="fa-solid fa-xmark" style="opacity:.5;"></i>' : ''}
        </div>`;
    }).join('');

    pool.querySelectorAll('.clasif-item').forEach(el => {
      el.addEventListener('click', () => {
        const et = el.dataset.etiqueta;
        etiquetaSeleccionadaA12 = etiquetaSeleccionadaA12 === et ? null : et;
        pintarEsquemaA12();
      });
    });

    esquema.querySelectorAll('.esquema-zona').forEach(el => {
      el.addEventListener('click', () => {
        const zonaId = Number(el.dataset.zona);
        if(asignacionesA12[zonaId]){
          delete asignacionesA12[zonaId]; // quitar etiqueta ya puesta
        } else if(etiquetaSeleccionadaA12){
          asignacionesA12[zonaId] = etiquetaSeleccionadaA12;
          etiquetaSeleccionadaA12 = null;
        }
        pintarEsquemaA12();
      });
    });

    // Arrastrar y soltar (además del clic-seleccionar-y-asignar)
    habilitarArrastre(
      pool.querySelectorAll('.clasif-item[draggable="true"]'),
      Array.from(esquema.querySelectorAll('.esquema-zona')),
      (etiquetaArrastrada, zonaEl) => {
        const zonaId = Number(zonaEl.dataset.zona);
        asignacionesA12[zonaId] = etiquetaArrastrada;
        etiquetaSeleccionadaA12 = null;
        pintarEsquemaA12();
      }
    );

    actualizarBarraProgreso('progresoA12', Object.keys(asignacionesA12).length, ZONAS_A12_BASE.length);
    actualizarBotonFinalizarA12();
  }

  document.getElementById('btnFinalizarA12').addEventListener('click', async () => {
    clearInterval(timerIntervalA12);

    let correctas = 0;
    ZONAS_A12_BASE.forEach(z => { if(asignacionesA12[z.id] === z.correcta) correctas++; });
    const total = ZONAS_A12_BASE.length;
    const proporcionCorrecta = correctas / total;

    const aciertosCamino = respuestasCaminoA12.filter(r => r === true).length;
    const proporcionCamino = PERSONAJES_A12.length > 0 ? aciertosCamino / PERSONAJES_A12.length : 0;

    const minutosTranscurridos = (Date.now() - inicioTiempoA12) / 60000;
    const justificacion = document.getElementById('justificacionA12').value.trim();

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A12[0].nombre, descripcion: CRITERIOS_BASE_A12[0].descripcion, nivel: 'cumple' });

    criterios.push({
      nombre: CRITERIOS_BASE_A12[1].nombre, descripcion: CRITERIOS_BASE_A12[1].descripcion,
      nivel: proporcionCamino >= 0.66 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A12[2].nombre, descripcion: CRITERIOS_BASE_A12[2].descripcion,
      nivel: proporcionCorrecta >= 0.8 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A12[3].nombre, descripcion: CRITERIOS_BASE_A12[3].descripcion,
      nivel: justificacion.length >= 20 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A12[4].nombre, descripcion: CRITERIOS_BASE_A12[4].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA12 * 1.5 ? 'cumple' : 'no_cumple'
    });

    criterios.push({ nombre: CRITERIOS_BASE_A12[5].nombre, descripcion: CRITERIOS_BASE_A12[5].descripcion, nivel: 'cumple' });

    const pesoUnidad = puntajeMaxA12 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => { if(c.nivel === 'cumple') notaCalculada += pesoUnidad; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA12').classList.add('hidden');
    document.getElementById('vistaResultadoA12').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA12').classList.add('hidden');
    renderListaCotejo('rubricaResultadoA12', criterios, puntajeMaxA12, notaCalculada);
    ultimoResultadoA12 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA12 };

    const proporcionFinalA12 = puntajeMaxA12 > 0 ? notaCalculada / puntajeMaxA12 : 0;
    mostrarLogro(proporcionFinalA12 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA12 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA12 >= 0.8) dispararConfeti();

    const desgloseCaminoHtml = PERSONAJES_A12.map((p, i) => `
      <div class="esquema-zona">
        <div style="flex:1;">
          <div class="esquema-zona-tag">${p.nombre} preguntó:</div>
          <div style="font-size:13.5px; margin:4px 0;">${p.pregunta}</div>
          <div class="esquema-zona-slot">
            <span class="esquema-zona-etiqueta">Respuesta correcta: ${p.opciones[p.correctaIdx]}</span>
          </div>
        </div>
        <i class="fa-solid fa-check" style="color:var(--dark-green-accent);"></i>
      </div>
    `).join('');

    const desgloseEtiquetadoHtml = ZONAS_A12_BASE.map(z => {
      const asignada = asignacionesA12[z.id];
      const ok = asignada === z.correcta;
      return `
        <div class="esquema-zona ${ok ? 'correcto' : 'incorrecto'}">
          <div style="flex:1;">
            ${z.html}
            <div class="esquema-zona-slot">
              <span class="esquema-zona-etiqueta">Tu respuesta: ${asignada || 'Sin responder'} ${!ok ? `(correcta: ${z.correcta})` : ''}</span>
            </div>
          </div>
          <i class="fa-solid ${ok ? 'fa-check' : 'fa-xmark'}"></i>
        </div>`;
    }).join('');

    document.getElementById('resultadoDesgloseA12').innerHTML = `
      <div class="section-heading" style="font-size:16px; margin-top:0;">Sección 1 — Camino del aprendizaje</div>
      <div class="esquema-reporte">${desgloseCaminoHtml}</div>
      <div class="section-heading" style="font-size:16px;">Sección 2 — Etiquetado del reporte</div>
      <div class="esquema-reporte">${desgloseEtiquetadoHtml}</div>
    `;

    const detalleA12 = [
      {
        titulo: 'Sección 1 — Camino del aprendizaje',
        items: PERSONAJES_A12.map(p => ({
          pregunta: `${p.nombre} preguntó: ${p.pregunta}`,
          tuRespuesta: p.opciones[p.correctaIdx],
          correcta: true,
          respuestaCorrecta: p.opciones[p.correctaIdx]
        }))
      },
      {
        titulo: 'Sección 2 — Etiquetado del reporte',
        items: ZONAS_A12_BASE.map(z => ({
          pregunta: z.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
          tuRespuesta: asignacionesA12[z.id] || 'Sin responder',
          correcta: asignacionesA12[z.id] === z.correcta,
          respuestaCorrecta: z.correcta
        }))
      }
    ];
    ultimoResultadoA12.detalle = detalleA12;

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.2',
        ra:'RA1',
        ec:'EC6.1.1',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA12,
        criterios: criterios,
        detalle: detalleA12
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA12').addEventListener('click', () => {
    if(!ultimoResultadoA12) return;
    generarPdfResultado('A.1.2', ultimoResultadoA12.criterios, ultimoResultadoA12.nota, ultimoResultadoA12.puntajeMaximo, 'EC6.1.1', 'RA1', ultimoResultadoA12.detalle);
  });

  document.getElementById('btnVolverMisActA12').addEventListener('click', () => {
    document.getElementById('panelActividadA12').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.2', abrirActividadA12);

// ============================================================================
// A.1.3 — VISTAS DE UN REPORTE EMPRESARIAL (simulador de construcción)
// ============================================================================
  // El estudiante configura un reporte real (eligiendo columnas de la tabla
  // compartida DB_Ventas) y lo navega en sus 3 vistas: Diseño, Previsualización
  // (datos de muestra) y Ejecución (datos reales consultados del sistema).
  // Sección 1: repaso teórico del recurso "Vistas de un Reporte Empresarial" (preguntas desplegables)
  const PREGUNTAS_TEORIA_A13 = [
    {
      pregunta: '¿En qué vista se construye la estructura del reporte, sin datos reales todavía?',
      opciones: ['Vista de Ejecución', 'Vista de Previsualización', 'Vista de Diseño'],
      correctaIdx: 2
    },
    {
      pregunta: '¿En qué vista se usan datos de muestra (no reales) para revisar cómo lucirá el reporte?',
      opciones: ['Vista de Diseño', 'Vista de Previsualización', 'Vista de Ejecución'],
      correctaIdx: 1
    },
    {
      pregunta: '¿Cuál vista consulta la base de datos real y genera el documento final?',
      opciones: ['Vista de Previsualización', 'Vista de Diseño', 'Vista de Ejecución'],
      correctaIdx: 2
    },
    {
      pregunta: 'Según el recurso, ¿cuál es el orden correcto en que se recorren las 3 vistas al crear un reporte?',
      opciones: ['Ejecución → Diseño → Previsualización', 'Diseño → Previsualización → Ejecución', 'Previsualización → Ejecución → Diseño'],
      correctaIdx: 1
    }
  ];

  const CAMPOS_DISPONIBLES_A13 = [
    { campo:'Producto', etiqueta:'Producto', obligatorio:true, muestra:'[Producto de ejemplo]' },
    { campo:'Cantidad', etiqueta:'Cantidad', obligatorio:true, muestra:'XX' },
    { campo:'PrecioUnitario', etiqueta:'Precio Unitario', obligatorio:true, muestra:'RD$X,XXX.XX' },
    { campo:'Categoria', etiqueta:'Categoría', obligatorio:false, muestra:'[Categoría]' },
    { campo:'Vendedor', etiqueta:'Vendedor', obligatorio:false, muestra:'[Vendedor]' },
    { campo:'Fecha', etiqueta:'Fecha', obligatorio:false, muestra:'[Fecha]' }
  ];

  const CRITERIOS_BASE_A13 = [
    { key:'participacion', nombre:'1. Participación activa', niveles:{ excelente:'Participa activamente desde el inicio de la actividad.', bueno:'Participa la mayor parte del tiempo.', proceso:'Participa de forma limitada o intermitente.', insuficiente:'No participa en la actividad.' } },
    { key:'identificacion', nombre:'2. Identificación de las vistas', niveles:{ excelente:'Responde correctamente las 4 preguntas de repaso sobre las vistas de un reporte.', bueno:'Responde correctamente 3 de las 4 preguntas de repaso.', proceso:'Responde correctamente 2 de las 4 preguntas de repaso.', insuficiente:'Responde correctamente menos de 2 preguntas de repaso.' } },
    { key:'clasificacion', nombre:'3. Construcción del reporte', niveles:{ excelente:'Construye un reporte completo, agregando columnas opcionales además de las obligatorias.', bueno:'Construye el reporte con la mayoría de las columnas disponibles.', proceso:'Construye el reporte solo con las columnas obligatorias.', insuficiente:'No logra construir un reporte válido.' } },
    { key:'justificacion', nombre:'4. Justificación', niveles:{ excelente:'Explica con claridad y precisión las diferencias entre las 3 vistas de su reporte.', bueno:'Explica de forma general las diferencias entre las vistas.', proceso:'Ofrece una justificación breve o poco clara.', insuficiente:'No justifica las diferencias observadas.' } },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', niveles:{ excelente:'Completa la actividad dentro del tiempo estimado.', bueno:'Completa la actividad con un ligero retraso.', proceso:'Completa la actividad con un retraso considerable.', insuficiente:'Excede ampliamente el tiempo estimado.' } },
    { key:'colaborativo', nombre:'6. Trabajo colaborativo', niveles:{ excelente:'Colabora de forma organizada y respetuosa con su pareja de trabajo.', bueno:'Colabora la mayor parte del tiempo con su pareja.', proceso:'Colabora de forma limitada.', insuficiente:'No colabora con su pareja de trabajo.' } }
  ];

  const COLOR_VISTA_A13 = {
    diseno: { nombre:'Vista de Diseño', icono:'fa-pen-ruler', bg:'rgba(168,85,247,.15)', color:'#a855f7' },
    previsualizacion: { nombre:'Vista de Previsualización', icono:'fa-eye', bg:'rgba(232,185,59,.15)', color:'var(--dark-gold-accent)' },
    ejecucion: { nombre:'Vista de Ejecución', icono:'fa-play', bg:'rgba(34,197,94,.15)', color:'var(--dark-green-accent)' }
  };

  let respuestasTeoriaA13 = [];
  let camposSeleccionadosA13 = {};
  let vistasVisitadasA13 = new Set();
  let ultimoResultadoA13 = null;
  let vistaActualA13 = null;
  let datosRealesA13 = null;
  let puntajeMaxA13 = 0;
  let tiempoEstimadoA13 = 10;
  let inicioTiempoA13 = null;
  let timerIntervalA13 = null;

  async function abrirActividadA13(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA13 = puntajeMaximo;
    tiempoEstimadoA13 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA13').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA13').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.3') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA13').classList.add('hidden');
        document.getElementById('vistaEjercicioA13').classList.add('hidden');
        document.getElementById('vistaResultadoA13').classList.remove('hidden');
        renderRubricaDescriptiva('rubricaResultadoA13', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA13', previa.detalle);
        ultimoResultadoA13 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA13').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA13').classList.add('hidden');
    document.getElementById('vistaInstrumentoA13').classList.remove('hidden');
    document.getElementById('vistaEjercicioA13').classList.add('hidden');
    document.getElementById('vistaResultadoA13').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA13').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA13} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.3', 'recursosEstudianteA13');

    const criteriosPrevios = CRITERIOS_BASE_A13.map(c => ({ nombre:c.nombre, niveles:c.niveles, nivel:null }));
    renderRubricaDescriptiva('instrumentoPrevioA13', criteriosPrevios, puntajeMaxA13, null);
  }

  document.getElementById('btnBackFromActividadA13').addEventListener('click', () => {
    clearInterval(timerIntervalA13);
    document.getElementById('panelActividadA13').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA13').addEventListener('click', () => {
    respuestasTeoriaA13 = new Array(PREGUNTAS_TEORIA_A13.length).fill(null);
    camposSeleccionadosA13 = {};
    CAMPOS_DISPONIBLES_A13.forEach(c => { camposSeleccionadosA13[c.campo] = c.obligatorio; });
    vistasVisitadasA13 = new Set();
    vistaActualA13 = null;
    datosRealesA13 = null;
    document.getElementById('justificacionA13').value = '';
    document.getElementById('seccionConfigA13').classList.add('hidden');
    document.getElementById('navegadorVistasA13').classList.add('hidden');
    document.getElementById('seccionFinalA13').classList.add('hidden');
    document.getElementById('vistaInstrumentoA13').classList.add('hidden');
    document.getElementById('vistaEjercicioA13').classList.remove('hidden');
    pintarTeoriaA13();
    pintarConfigCamposA13();

    inicioTiempoA13 = Date.now();
    clearInterval(timerIntervalA13);
    timerIntervalA13 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA13) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA13').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA13} min aprox.)</span>`;
    }, 1000);
  });

  function pintarTeoriaA13(){
    const cont = document.getElementById('teoriaA13');
    cont.innerHTML = PREGUNTAS_TEORIA_A13.map((p, i) => `
      <div class="teoria-pregunta-bloque">
        <div class="teoria-pregunta-texto">${i + 1}. ${p.pregunta}</div>
        <select class="teoria-select ${respuestasTeoriaA13[i] !== null ? 'respondida' : ''}" data-pregunta="${i}">
          <option value="" ${respuestasTeoriaA13[i] === null ? 'selected' : ''} disabled>Selecciona una opción...</option>
          ${p.opciones.map((op, j) => `
            <option value="${j}" ${respuestasTeoriaA13[i] === j ? 'selected' : ''}>${op}</option>
          `).join('')}
        </select>
      </div>
    `).join('');

    cont.querySelectorAll('.teoria-select').forEach(sel => {
      sel.addEventListener('change', () => {
        respuestasTeoriaA13[Number(sel.dataset.pregunta)] = Number(sel.value);
        sel.classList.add('respondida');
        document.getElementById('btnContinuarTeoriaA13').disabled = respuestasTeoriaA13.some(r => r === null);
      });
    });
  }

  document.getElementById('btnContinuarTeoriaA13').addEventListener('click', () => {
    document.getElementById('seccionConfigA13').classList.remove('hidden');
  });

  function pintarConfigCamposA13(){
    const cont = document.getElementById('configCamposA13');
    cont.innerHTML = `
      <div class="campos-checklist">
        ${CAMPOS_DISPONIBLES_A13.map(c => `
          <div class="campo-check-item ${c.obligatorio ? 'obligatorio' : ''}">
            <input type="checkbox" id="campoA13-${c.campo}" ${camposSeleccionadosA13[c.campo] ? 'checked' : ''} ${c.obligatorio ? 'disabled' : ''}>
            <label for="campoA13-${c.campo}">${c.etiqueta}</label>
            ${c.obligatorio ? '<span class="campo-obligatorio-tag">Obligatoria</span>' : ''}
          </div>
        `).join('')}
      </div>`;

    cont.querySelectorAll('input[type="checkbox"]:not([disabled])').forEach(input => {
      input.addEventListener('change', () => {
        const campo = input.id.replace('campoA13-', '');
        camposSeleccionadosA13[campo] = input.checked;
      });
    });
  }

  document.getElementById('btnConstruirA13').addEventListener('click', async () => {
    const btn = document.getElementById('btnConstruirA13');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Consultando datos...';

    datosRealesA13 = await cargarTablaDatos('DB_Ventas');

    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-hammer"></i> Construir reporte';

    if(!datosRealesA13){
      mostrarNotificacion('No se pudo conectar con la base de datos. Intenta de nuevo.', 'error');
      return;
    }

    document.getElementById('navegadorVistasA13').classList.remove('hidden');
    pintarVistasTabsA13();
    cambiarVistaA13('diseno');
  });

  function pintarVistasTabsA13(){
    const cont = document.getElementById('vistasTabsA13');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A13[v];
      const visitada = vistasVisitadasA13.has(v);
      const activa = vistaActualA13 === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');

    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaA13(btn.dataset.vista));
    });
  }

  function cambiarVistaA13(vista){
    vistaActualA13 = vista;
    vistasVisitadasA13.add(vista);
    pintarVistasTabsA13();
    pintarContenidoVistaA13(vista);
    actualizarBotonFinalizarA13();
  }

  function formatearFechaSimpleA13(valor){
    if(!valor) return '';
    const d = new Date(valor);
    if(isNaN(d.getTime())) return String(valor);
    // Se usa UTC para que la fecha no se corra un día por el huso horario del navegador
    const dd = String(d.getUTCDate()).padStart(2, '0');
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const yyyy = d.getUTCFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  function camposActivosA13(){
    return CAMPOS_DISPONIBLES_A13.filter(c => camposSeleccionadosA13[c.campo]);
  }

  function pintarContenidoVistaA13(vista){
    const cont = document.getElementById('vistaContenidoA13');
    const info = COLOR_VISTA_A13[vista];
    const campos = camposActivosA13();

    let filasHtml = '';
    if(vista === 'diseno'){
      filasHtml = `<tr>${campos.map(() => `<td class="simulador-placeholder-cell">—</td>`).join('')}</tr>`;
    } else if(vista === 'previsualizacion'){
      filasHtml = [1,2,3].map(() => `<tr>${campos.map(c => `<td class="simulador-placeholder-cell">${c.muestra}</td>`).join('')}</tr>`).join('');
    } else if(vista === 'ejecucion'){
      const filas = (datosRealesA13 && datosRealesA13.datos) ? datosRealesA13.datos.slice(0, 8) : [];
      filasHtml = filas.map(fila => `
        <tr>${campos.map(c => {
          let valor = fila[c.campo];
          if(c.campo === 'PrecioUnitario' && typeof valor === 'number') valor = 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2});
          if(c.campo === 'Fecha') valor = formatearFechaSimpleA13(valor);
          return `<td>${valor !== undefined ? valor : ''}</td>`;
        }).join('')}</tr>
      `).join('');

      if(camposSeleccionadosA13['Cantidad'] && camposSeleccionadosA13['PrecioUnitario']){
        const total = filas.reduce((sum, f) => sum + (Number(f.Cantidad)||0) * (Number(f.PrecioUnitario)||0), 0);
        filasHtml += `<tr class="simulador-total-fila">${campos.map((c,i) => {
          if(i === 0) return `<td>TOTAL</td>`;
          if(c.campo === 'PrecioUnitario') return `<td>RD$${total.toLocaleString('es-DO', {minimumFractionDigits:2})}</td>`;
          return `<td></td>`;
        }).join('')}</tr>`;
      }
    }

    cont.innerHTML = `
      <div class="simulador-pantalla">
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
        </span>
        <div style="font-weight:800; font-size:15px;">TECNOVENTAS RD, S.R.L. — Reporte de Ventas</div>
        <table class="simulador-tabla">
          <thead><tr>${campos.map(c => `<th>${c.etiqueta}</th>`).join('')}</tr></thead>
          <tbody>${filasHtml}</tbody>
        </table>
      </div>`;
  }

  function actualizarBotonFinalizarA13(){
    if(vistasVisitadasA13.size >= 3){
      document.getElementById('seccionFinalA13').classList.remove('hidden');
      document.getElementById('btnFinalizarA13').disabled = false;
    }
  }

  document.getElementById('btnFinalizarA13').addEventListener('click', async () => {
    clearInterval(timerIntervalA13);

    const minutosTranscurridos = (Date.now() - inicioTiempoA13) / 60000;
    const justificacion = document.getElementById('justificacionA13').value.trim();
    const opcionalesSeleccionados = CAMPOS_DISPONIBLES_A13.filter(c => !c.obligatorio && camposSeleccionadosA13[c.campo]).length;

    let aciertosTeoria = 0;
    PREGUNTAS_TEORIA_A13.forEach((p, i) => { if(respuestasTeoriaA13[i] === p.correctaIdx) aciertosTeoria++; });
    const proporcionTeoria = PREGUNTAS_TEORIA_A13.length > 0 ? aciertosTeoria / PREGUNTAS_TEORIA_A13.length : 0;

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A13[0].nombre, niveles: CRITERIOS_BASE_A13[0].niveles, nivel: 'excelente' });

    let nivelIdentificacion = 'insuficiente';
    if(proporcionTeoria >= 1) nivelIdentificacion = 'excelente';
    else if(proporcionTeoria >= 0.75) nivelIdentificacion = 'bueno';
    else if(proporcionTeoria >= 0.5) nivelIdentificacion = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A13[1].nombre, niveles: CRITERIOS_BASE_A13[1].niveles, nivel: nivelIdentificacion });

    let nivelConstruccion = 'insuficiente';
    if(opcionalesSeleccionados >= 3) nivelConstruccion = 'excelente';
    else if(opcionalesSeleccionados >= 2) nivelConstruccion = 'bueno';
    else if(opcionalesSeleccionados >= 1) nivelConstruccion = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A13[2].nombre, niveles: CRITERIOS_BASE_A13[2].niveles, nivel: nivelConstruccion });

    let nivelJustificacion = 'insuficiente';
    if(justificacion.length >= 40) nivelJustificacion = 'excelente';
    else if(justificacion.length >= 20) nivelJustificacion = 'bueno';
    else if(justificacion.length > 0) nivelJustificacion = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A13[3].nombre, niveles: CRITERIOS_BASE_A13[3].niveles, nivel: nivelJustificacion });

    let nivelTiempo = 'insuficiente';
    if(minutosTranscurridos <= tiempoEstimadoA13) nivelTiempo = 'excelente';
    else if(minutosTranscurridos <= tiempoEstimadoA13 * 1.5) nivelTiempo = 'bueno';
    else if(minutosTranscurridos <= tiempoEstimadoA13 * 2) nivelTiempo = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A13[4].nombre, niveles: CRITERIOS_BASE_A13[4].niveles, nivel: nivelTiempo });

    criterios.push({ nombre: CRITERIOS_BASE_A13[5].nombre, niveles: CRITERIOS_BASE_A13[5].niveles, nivel: 'excelente' });

    const pesoUnidad = puntajeMaxA13 / criterios.length;
    const pesosPorNivel = { excelente:1, bueno:0.75, proceso:0.4, insuficiente:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA13').classList.add('hidden');
    document.getElementById('vistaResultadoA13').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA13').classList.add('hidden');
    renderRubricaDescriptiva('rubricaResultadoA13', criterios, puntajeMaxA13, notaCalculada);
    ultimoResultadoA13 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA13 };

    const proporcionFinalA13 = puntajeMaxA13 > 0 ? notaCalculada / puntajeMaxA13 : 0;
    mostrarLogro(proporcionFinalA13 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA13 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA13 >= 0.8) dispararConfeti();

    const detalleA13 = [
      {
        titulo: 'Sección 1 — Repaso del recurso',
        items: PREGUNTAS_TEORIA_A13.map((p, i) => ({
          pregunta: p.pregunta,
          tuRespuesta: p.opciones[respuestasTeoriaA13[i]],
          correcta: respuestasTeoriaA13[i] === p.correctaIdx,
          respuestaCorrecta: p.opciones[p.correctaIdx]
        }))
      },
      {
        titulo: 'Sección 2 — Configuración del reporte',
        items: [{
          pregunta: 'Columnas incluidas en el reporte construido',
          tuRespuesta: camposActivosA13().map(c => c.etiqueta).join(', '),
          correcta: true
        }]
      }
    ];
    ultimoResultadoA13.detalle = detalleA13;
    renderDesgloseColoreado('resultadoDesgloseA13', detalleA13);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.3',
        ra:'RA1',
        ec:'EC6.1.2',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA13,
        criterios: criterios,
        detalle: detalleA13
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA13').addEventListener('click', () => {
    if(!ultimoResultadoA13) return;
    generarPdfResultado('A.1.3', ultimoResultadoA13.criterios, ultimoResultadoA13.nota, ultimoResultadoA13.puntajeMaximo, 'EC6.1.2', 'RA1', ultimoResultadoA13.detalle);
  });

  document.getElementById('btnVolverMisActA13').addEventListener('click', () => {
    document.getElementById('panelActividadA13').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.3', abrirActividadA13);

// ============================================================================
// ============================================================================
// A.1.4 — EJECUTAR Y VERIFICAR UN REPORTE FILTRADO (más compleja que A.1.3)
// ============================================================================
  // El estudiante repasa el flujo filtrar→ejecutar→verificar con preguntas de
  // aplicación (no solo definición), configura un reporte con un FILTRO real
  // por vendedor, navega sus 3 vistas (la Ejecución no muestra el total ya
  // calculado), y debe VERIFICAR manualmente el total sumando los datos reales.
  const PREGUNTAS_TEORIA_A14 = [
    {
      pregunta: 'Antes de ejecutar un reporte filtrado por vendedor, ¿en qué vista defines qué columnas tendrá el reporte?',
      opciones: ['Vista de Ejecución', 'Vista de Previsualización', 'Vista de Diseño'],
      correctaIdx: 2
    },
    {
      pregunta: 'Si aplicas un filtro por vendedor y luego ejecutas el reporte, ¿qué información verás?',
      opciones: ['Todas las ventas de todos los vendedores', 'Solo las ventas del vendedor que elegiste', 'Ninguna venta'],
      correctaIdx: 1
    },
    {
      pregunta: '¿Por qué es importante verificar manualmente el total de un reporte ya ejecutado?',
      opciones: ['Para practicar sumas en clase', 'Para confirmar que los datos y cálculos del reporte son correctos', 'Porque el sistema nunca calcula bien'],
      correctaIdx: 1
    },
    {
      pregunta: 'Un gerente te pide el reporte de ventas de un solo vendedor, no de todos. ¿Qué debes hacer antes de ejecutar el reporte?',
      opciones: ['Ejecutar el reporte completo y luego borrar manualmente las demás filas', 'Aplicar un filtro por vendedor antes de ejecutar el reporte', 'Pedirle al vendedor que envíe sus propios datos'],
      correctaIdx: 1
    },
    {
      pregunta: '¿En qué vista podrías detectar que elegiste una columna equivocada, antes de ejecutar con datos reales?',
      opciones: ['Vista de Ejecución', 'Vista de Diseño o Previsualización', 'No se puede detectar antes de ejecutar'],
      correctaIdx: 1
    }
  ];

  const CAMPOS_DISPONIBLES_A14 = [
    { campo:'Producto', etiqueta:'Producto', obligatorio:true, muestra:'[Producto de ejemplo]' },
    { campo:'Cantidad', etiqueta:'Cantidad', obligatorio:true, muestra:'XX' },
    { campo:'PrecioUnitario', etiqueta:'Precio Unitario', obligatorio:true, muestra:'RD$X,XXX.XX' },
    { campo:'Categoria', etiqueta:'Categoría', obligatorio:false, muestra:'[Categoría]' },
    { campo:'Vendedor', etiqueta:'Vendedor', obligatorio:false, muestra:'[Vendedor]' },
    { campo:'Fecha', etiqueta:'Fecha', obligatorio:false, muestra:'[Fecha]' }
  ];

  const CRITERIOS_BASE_A14 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'repaso', nombre:'2. Repaso: filtrar y verificar', descripcion:'Responde correctamente las preguntas de aplicación sobre filtrar y verificar un reporte.' },
    { key:'filtrado', nombre:'3. Configuración y filtrado', descripcion:'Configura correctamente las columnas y aplica un filtro válido por vendedor.' },
    { key:'verificacion', nombre:'4. Verificación numérica', descripcion:'Calcula correctamente el total real de su reporte filtrado.' },
    { key:'justificacion', nombre:'5. Justificación', descripcion:'Explica con claridad lo aprendido sobre filtrar, ejecutar y verificar un reporte.' },
    { key:'tiempo', nombre:'6. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' }
  ];

  const COLOR_VISTA_A14 = {
    diseno: { nombre:'Vista de Diseño', icono:'fa-pen-ruler', bg:'rgba(168,85,247,.15)', color:'#a855f7' },
    previsualizacion: { nombre:'Vista de Previsualización', icono:'fa-eye', bg:'rgba(232,185,59,.15)', color:'var(--dark-gold-accent)' },
    ejecucion: { nombre:'Vista de Ejecución', icono:'fa-play', bg:'rgba(34,197,94,.15)', color:'var(--dark-green-accent)' }
  };

  let respuestasTeoriaA14 = [];
  let camposSeleccionadosA14 = {};
  let vendedorFiltroA14 = '';
  let vistasVisitadasA14 = new Set();
  let vistaActualA14 = null;
  let datosRealesA14 = null;
  let datosFiltradosA14 = [];
  let totalRealA14 = 0;
  let verificacionCorrectaA14 = null; // true = correcta al primer intento
  let ultimoResultadoA14 = null;
  let calcExpresionA14 = '';
  let intentosVerificacionA14 = 0;
  let puntajeMaxA14 = 0;
  let tiempoEstimadoA14 = 10;
  let inicioTiempoA14 = null;
  let timerIntervalA14 = null;

  async function abrirActividadA14(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA14 = puntajeMaximo;
    tiempoEstimadoA14 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA14').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA14').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.4') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA14').classList.add('hidden');
        document.getElementById('vistaEjercicioA14').classList.add('hidden');
        document.getElementById('vistaResultadoA14').classList.remove('hidden');
        renderRubrica('rubricaResultadoA14', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA14', previa.detalle);
        ultimoResultadoA14 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA14').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA14').classList.add('hidden');
    document.getElementById('vistaInstrumentoA14').classList.remove('hidden');
    document.getElementById('vistaEjercicioA14').classList.add('hidden');
    document.getElementById('vistaResultadoA14').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA14').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA14} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.4', 'recursosEstudianteA14');

    const criteriosPrevios = CRITERIOS_BASE_A14.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA14', criteriosPrevios, puntajeMaxA14, null);
  }

  document.getElementById('btnBackFromActividadA14').addEventListener('click', () => {
    clearInterval(timerIntervalA14);
    document.getElementById('panelActividadA14').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA14').addEventListener('click', () => {
    respuestasTeoriaA14 = new Array(PREGUNTAS_TEORIA_A14.length).fill(null);
    camposSeleccionadosA14 = {};
    CAMPOS_DISPONIBLES_A14.forEach(c => { camposSeleccionadosA14[c.campo] = c.obligatorio; });
    vendedorFiltroA14 = '';
    vistasVisitadasA14 = new Set();
    vistaActualA14 = null;
    datosRealesA14 = null;
    datosFiltradosA14 = [];
    totalRealA14 = 0;
    verificacionCorrectaA14 = null;
    intentosVerificacionA14 = 0;
    document.getElementById('justificacionA14').value = '';
    document.getElementById('totalCalculadoA14').value = '';
    document.getElementById('feedbackVerificacionA14').innerHTML = '';
    document.getElementById('seccionConfigA14').classList.add('hidden');
    document.getElementById('navegadorVistasA14').classList.add('hidden');
    document.getElementById('seccionVerificacionA14').classList.add('hidden');
    document.getElementById('seccionFinalA14').classList.add('hidden');
    document.getElementById('vistaInstrumentoA14').classList.add('hidden');
    document.getElementById('vistaEjercicioA14').classList.remove('hidden');
    pintarTeoriaA14();
    pintarConfigCamposA14();
    cargarVendedoresA14();

    inicioTiempoA14 = Date.now();
    clearInterval(timerIntervalA14);
    timerIntervalA14 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA14) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA14').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA14} min aprox.)</span>`;
    }, 1000);
  });

  function pintarTeoriaA14(){
    const cont = document.getElementById('teoriaA14');
    cont.innerHTML = PREGUNTAS_TEORIA_A14.map((p, i) => `
      <div class="teoria-pregunta-bloque">
        <div class="teoria-pregunta-texto">${i + 1}. ${p.pregunta}</div>
        <select class="teoria-select ${respuestasTeoriaA14[i] !== null ? 'respondida' : ''}" data-pregunta="${i}">
          <option value="" ${respuestasTeoriaA14[i] === null ? 'selected' : ''} disabled>Selecciona una opción...</option>
          ${p.opciones.map((op, j) => `
            <option value="${j}" ${respuestasTeoriaA14[i] === j ? 'selected' : ''}>${op}</option>
          `).join('')}
        </select>
      </div>
    `).join('');

    cont.querySelectorAll('.teoria-select').forEach(sel => {
      sel.addEventListener('change', () => {
        respuestasTeoriaA14[Number(sel.dataset.pregunta)] = Number(sel.value);
        sel.classList.add('respondida');
        document.getElementById('btnContinuarTeoriaA14').disabled = respuestasTeoriaA14.some(r => r === null);
      });
    });
  }

  document.getElementById('btnContinuarTeoriaA14').addEventListener('click', () => {
    document.getElementById('seccionConfigA14').classList.remove('hidden');
  });

  function pintarConfigCamposA14(){
    const cont = document.getElementById('configCamposA14');
    cont.innerHTML = `
      <div class="campos-checklist">
        ${CAMPOS_DISPONIBLES_A14.map(c => `
          <div class="campo-check-item ${c.obligatorio ? 'obligatorio' : ''}">
            <input type="checkbox" id="campoA14-${c.campo}" ${camposSeleccionadosA14[c.campo] ? 'checked' : ''} ${c.obligatorio ? 'disabled' : ''}>
            <label for="campoA14-${c.campo}">${c.etiqueta}</label>
            ${c.obligatorio ? '<span class="campo-obligatorio-tag">Obligatoria</span>' : ''}
          </div>
        `).join('')}
      </div>`;

    cont.querySelectorAll('input[type="checkbox"]:not([disabled])').forEach(input => {
      input.addEventListener('change', () => {
        const campo = input.id.replace('campoA14-', '');
        camposSeleccionadosA14[campo] = input.checked;
      });
    });
  }

  async function cargarVendedoresA14(){
    const sel = document.getElementById('filtroVendedorA14');
    const data = await cargarTablaDatos('DB_Ventas');
    if(!data){
      sel.innerHTML = '<option value="">Error al cargar vendedores</option>';
      return;
    }
    datosRealesA14 = data;
    const vendedoresUnicos = [...new Set(data.datos.map(d => d.Vendedor))].filter(Boolean);
    sel.innerHTML = `<option value="" selected disabled>Selecciona un vendedor...</option>` +
      vendedoresUnicos.map(v => `<option value="${v}">${v}</option>`).join('');

    sel.addEventListener('change', () => { vendedorFiltroA14 = sel.value; });
  }

  document.getElementById('btnConstruirA14').addEventListener('click', () => {
    if(!vendedorFiltroA14){
      mostrarNotificacion('Selecciona un vendedor para filtrar el reporte.', 'error');
      return;
    }
    if(!datosRealesA14){
      mostrarNotificacion('Los datos aún se están cargando, espera un momento e intenta de nuevo.', 'error');
      return;
    }

    datosFiltradosA14 = datosRealesA14.datos.filter(d => d.Vendedor === vendedorFiltroA14);
    totalRealA14 = datosFiltradosA14.reduce((sum, f) => sum + (Number(f.Cantidad)||0) * (Number(f.PrecioUnitario)||0), 0);

    document.getElementById('navegadorVistasA14').classList.remove('hidden');
    pintarVistasTabsA14();
    cambiarVistaA14('diseno');
  });

  function pintarVistasTabsA14(){
    const cont = document.getElementById('vistasTabsA14');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A14[v];
      const visitada = vistasVisitadasA14.has(v);
      const activa = vistaActualA14 === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');

    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaA14(btn.dataset.vista));
    });
  }

  function cambiarVistaA14(vista){
    vistaActualA14 = vista;
    vistasVisitadasA14.add(vista);
    pintarVistasTabsA14();
    pintarContenidoVistaA14(vista);
    if(vistasVisitadasA14.size >= 3){
      document.getElementById('seccionVerificacionA14').classList.remove('hidden');
    }
  }

  function camposActivosA14(){
    return CAMPOS_DISPONIBLES_A14.filter(c => camposSeleccionadosA14[c.campo]);
  }

  function renderCalculadoraA14(){
    return `
      <div class="calculadora-mini">
        <div class="calc-titulo"><i class="fa-solid fa-calculator"></i> Calculadora</div>
        <div class="calc-display" id="calcDisplayA14">${calcExpresionA14 || '0'}</div>
        <div class="calc-teclado">
          <button type="button" class="calc-btn" data-calc="7">7</button>
          <button type="button" class="calc-btn" data-calc="8">8</button>
          <button type="button" class="calc-btn" data-calc="9">9</button>
          <button type="button" class="calc-btn calc-op" data-calc="/">÷</button>
          <button type="button" class="calc-btn" data-calc="4">4</button>
          <button type="button" class="calc-btn" data-calc="5">5</button>
          <button type="button" class="calc-btn" data-calc="6">6</button>
          <button type="button" class="calc-btn calc-op" data-calc="*">×</button>
          <button type="button" class="calc-btn" data-calc="1">1</button>
          <button type="button" class="calc-btn" data-calc="2">2</button>
          <button type="button" class="calc-btn" data-calc="3">3</button>
          <button type="button" class="calc-btn calc-op" data-calc="-">−</button>
          <button type="button" class="calc-btn calc-clear" data-calc="C">C</button>
          <button type="button" class="calc-btn" data-calc="0">0</button>
          <button type="button" class="calc-btn" data-calc=".">.</button>
          <button type="button" class="calc-btn calc-op" data-calc="+">+</button>
          <button type="button" class="calc-btn calc-eq" data-calc="=" style="grid-column:span 4;">=</button>
        </div>
        <div style="font-size:10.5px; opacity:.6; margin-top:8px; text-align:center;">Uso interno — no se envía al sistema.</div>
      </div>`;
  }

  function wireCalculadoraA14(){
    document.querySelectorAll('.calc-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.calc;
        if(val === 'C'){
          calcExpresionA14 = '';
        } else if(val === '='){
          if(calcExpresionA14.trim() !== '' && /^[0-9+\-*/.() ]+$/.test(calcExpresionA14)){
            try{
              const resultado = Function('"use strict"; return (' + calcExpresionA14 + ')')();
              calcExpresionA14 = Number.isFinite(resultado) ? String(Math.round(resultado * 100) / 100) : 'Error';
            }catch(err){
              calcExpresionA14 = 'Error';
            }
          }
        } else {
          if(calcExpresionA14 === 'Error') calcExpresionA14 = '';
          calcExpresionA14 += val;
        }
        document.getElementById('calcDisplayA14').textContent = calcExpresionA14 || '0';
      });
    });
  }

  function pintarContenidoVistaA14(vista){
    const cont = document.getElementById('vistaContenidoA14');
    const info = COLOR_VISTA_A14[vista];
    const campos = camposActivosA14();

    let filasHtml = '';
    if(vista === 'diseno'){
      filasHtml = `<tr>${campos.map(() => `<td class="simulador-placeholder-cell">—</td>`).join('')}</tr>`;
    } else if(vista === 'previsualizacion'){
      filasHtml = [1,2,3].map(() => `<tr>${campos.map(c => `<td class="simulador-placeholder-cell">${c.muestra}</td>`).join('')}</tr>`).join('');
    } else if(vista === 'ejecucion'){
      // A diferencia de A.1.3, aquí NO se muestra el total: el estudiante debe calcularlo.
      filasHtml = datosFiltradosA14.slice(0, 10).map(fila => `
        <tr>${campos.map(c => {
          let valor = fila[c.campo];
          if(c.campo === 'PrecioUnitario' && typeof valor === 'number') valor = 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2});
          if(c.campo === 'Fecha') valor = formatearFechaSimpleA13(valor);
          return `<td>${valor !== undefined ? valor : ''}</td>`;
        }).join('')}</tr>
      `).join('');
    }

    const tituloReporte = `
      <div style="font-weight:800; font-size:15px;">TECNOVENTAS RD, S.R.L. — Reporte de Ventas
        ${vista !== 'diseno' ? `<span style="font-weight:600; font-size:12.5px; opacity:.7;"> · Filtrado por: ${vendedorFiltroA14}</span>` : ''}
      </div>`;

    const tablaHtml = `
      <table class="simulador-tabla">
        <thead><tr>${campos.map(c => `<th>${c.etiqueta}</th>`).join('')}</tr></thead>
        <tbody>${filasHtml}</tbody>
      </table>
      ${vista === 'ejecucion' ? '<div style="margin-top:10px; font-size:12.5px; opacity:.7;"><i class="fa-solid fa-circle-info"></i> El total no se muestra aquí — usa la calculadora y anota el resultado en la Sección 4.</div>' : ''}`;

    if(vista === 'ejecucion'){
      cont.innerHTML = `
        <div class="simulador-pantalla">
          <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};">
            <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          </span>
          ${tituloReporte}
          <div class="simulador-ejecucion-layout">
            <div class="simulador-tabla-wrap">${tablaHtml}</div>
            ${renderCalculadoraA14()}
          </div>
        </div>`;
      wireCalculadoraA14();
    } else {
      cont.innerHTML = `
        <div class="simulador-pantalla">
          <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};">
            <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          </span>
          ${tituloReporte}
          ${tablaHtml}
        </div>`;
    }
  }

  document.getElementById('btnVerificarA14').addEventListener('click', () => {
    const valorIngresado = Number(document.getElementById('totalCalculadoA14').value);
    const feedback = document.getElementById('feedbackVerificacionA14');

    if(!document.getElementById('totalCalculadoA14').value){
      mostrarNotificacion('Escribe un total antes de verificar.', 'error');
      return;
    }

    intentosVerificacionA14++;
    const diferencia = Math.abs(valorIngresado - totalRealA14);
    const esCorrecta = diferencia <= 1; // tolerancia de RD$1 por redondeo

    if(esCorrecta){
      if(verificacionCorrectaA14 === null) verificacionCorrectaA14 = intentosVerificacionA14 === 1;
      feedback.innerHTML = `<div class="feedback-verificacion correcta"><i class="fa-solid fa-circle-check"></i> ¡Correcto! El total real es RD$${totalRealA14.toLocaleString('es-DO', {minimumFractionDigits:2})}.</div>`;
      document.getElementById('seccionFinalA14').classList.remove('hidden');
      document.getElementById('btnFinalizarA14').disabled = false;
    } else {
      if(verificacionCorrectaA14 === null) verificacionCorrectaA14 = false;
      feedback.innerHTML = `<div class="feedback-verificacion incorrecta"><i class="fa-solid fa-circle-exclamation"></i> Ese total no coincide. Revisa tus multiplicaciones y vuelve a sumar.</div>`;
      sacudir(document.getElementById('totalCalculadoA14'));
    }
  });

  document.getElementById('btnFinalizarA14').addEventListener('click', async () => {
    clearInterval(timerIntervalA14);

    const minutosTranscurridos = (Date.now() - inicioTiempoA14) / 60000;
    const justificacion = document.getElementById('justificacionA14').value.trim();

    let aciertosTeoria = 0;
    PREGUNTAS_TEORIA_A14.forEach((p, i) => { if(respuestasTeoriaA14[i] === p.correctaIdx) aciertosTeoria++; });
    const proporcionTeoria = aciertosTeoria / PREGUNTAS_TEORIA_A14.length;

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A14[0].nombre, descripcion: CRITERIOS_BASE_A14[0].descripcion, nivel: 'logrado' });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[1].nombre, descripcion: CRITERIOS_BASE_A14[1].descripcion,
      nivel: proporcionTeoria >= 0.8 ? 'logrado' : (proporcionTeoria >= 0.4 ? 'proceso' : 'no_logrado')
    });

    // Configuración y filtrado: logrado si eligió un vendedor válido y al menos 1 campo opcional
    const opcionalesSeleccionados = CAMPOS_DISPONIBLES_A14.filter(c => !c.obligatorio && camposSeleccionadosA14[c.campo]).length;
    criterios.push({
      nombre: CRITERIOS_BASE_A14[2].nombre, descripcion: CRITERIOS_BASE_A14[2].descripcion,
      nivel: (vendedorFiltroA14 && opcionalesSeleccionados >= 1) ? 'logrado' : (vendedorFiltroA14 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[3].nombre, descripcion: CRITERIOS_BASE_A14[3].descripcion,
      nivel: verificacionCorrectaA14 === true ? 'logrado' : (verificacionCorrectaA14 === false ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[4].nombre, descripcion: CRITERIOS_BASE_A14[4].descripcion,
      nivel: justificacion.length >= 20 ? 'logrado' : (justificacion.length > 0 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[5].nombre, descripcion: CRITERIOS_BASE_A14[5].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA14 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA14 * 2 ? 'proceso' : 'no_logrado')
    });

    const pesoUnidad = puntajeMaxA14 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => {
      if(c.nivel === 'logrado') notaCalculada += pesoUnidad;
      else if(c.nivel === 'proceso') notaCalculada += pesoUnidad / 2;
    });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA14').classList.add('hidden');
    document.getElementById('vistaResultadoA14').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA14').classList.add('hidden');
    renderRubrica('rubricaResultadoA14', criterios, puntajeMaxA14, notaCalculada);
    ultimoResultadoA14 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA14 };

    const proporcionFinalA14 = puntajeMaxA14 > 0 ? notaCalculada / puntajeMaxA14 : 0;
    mostrarLogro(proporcionFinalA14 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA14 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA14 >= 0.8) dispararConfeti();

    const valorIngresadoFinalA14 = document.getElementById('totalCalculadoA14').value;
    const detalleA14 = [
      {
        titulo: 'Sección 1 — Repaso: filtrar y verificar',
        items: PREGUNTAS_TEORIA_A14.map((p, i) => ({
          pregunta: p.pregunta,
          tuRespuesta: p.opciones[respuestasTeoriaA14[i]],
          correcta: respuestasTeoriaA14[i] === p.correctaIdx,
          respuestaCorrecta: p.opciones[p.correctaIdx]
        }))
      },
      {
        titulo: 'Sección 2 — Configuración y filtrado',
        items: [{
          pregunta: 'Filtro y columnas usadas en el reporte',
          tuRespuesta: `Vendedor: ${vendedorFiltroA14} · Columnas: ${camposActivosA14().map(c => c.etiqueta).join(', ')}`,
          correcta: true
        }]
      },
      {
        titulo: 'Sección 3 — Verificación numérica',
        items: [{
          pregunta: '¿Cuál es el total general de las ventas de tu reporte filtrado?',
          tuRespuesta: `RD$${Number(valorIngresadoFinalA14 || 0).toLocaleString('es-DO', {minimumFractionDigits:2})}`,
          correcta: verificacionCorrectaA14 === true,
          respuestaCorrecta: `RD$${totalRealA14.toLocaleString('es-DO', {minimumFractionDigits:2})}`
        }]
      }
    ];
    ultimoResultadoA14.detalle = detalleA14;
    renderDesgloseColoreado('resultadoDesgloseA14', detalleA14);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.4',
        ra:'RA1',
        ec:'EC6.1.2',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA14,
        criterios: criterios,
        detalle: detalleA14
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA14').addEventListener('click', () => {
    if(!ultimoResultadoA14) return;
    generarPdfResultado('A.1.4', ultimoResultadoA14.criterios, ultimoResultadoA14.nota, ultimoResultadoA14.puntajeMaximo, 'EC6.1.2', 'RA1', ultimoResultadoA14.detalle);
  });

  document.getElementById('btnVolverMisActA14').addEventListener('click', () => {
    document.getElementById('panelActividadA14').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.4', abrirActividadA14);

// ============================================================================
// A.1.5 — ROMPECABEZAS DE PROGRAMAS GENERADORES (emparejar, estilo memoria)
// ============================================================================
  // Contenido anclado a lo investigado en el WebQuest en pares (4 programas
  // generadores reales). El estudiante empareja cada programa con la
  // característica que le corresponde, en un juego de memoria de 8 tarjetas.
  const PARES_A15_BASE = [
    { id:1, programa:'Microsoft Power BI', caracteristica:'Se integra profundamente con Excel, Azure y el ecosistema Microsoft 365.' },
    { id:2, programa:'Google Looker Studio', caracteristica:'Es gratuito en su versión base y se conecta de forma nativa con Google Analytics, Ads y Sheets.' },
    { id:3, programa:'SAP Crystal Reports', caracteristica:'Es ideal para generar facturas e informes financieros con formato muy detallado y preciso.' },
    { id:4, programa:'JasperReports', caracteristica:'Es una biblioteca de código abierto pensada para integrarse en aplicaciones Java hechas por programadores.' }
  ];

  // Un color distinto por cada pareja ya formada, para identificarlas fácilmente de un vistazo
  const COLORES_PAREJA_A15 = ['#4fa3ff', '#f2a93d', '#a855f7', '#ec4899'];

  const CRITERIOS_BASE_A15 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de características', descripcion:'Empareja correctamente cada programa con su característica dentro de un número razonable de intentos.' },
    { key:'justificacion', nombre:'3. Justificación de las coincidencias', descripcion:'Explica por qué la característica elegida corresponde al programa seleccionado.' },
    { key:'aplicacion', nombre:'4. Aplicación práctica', descripcion:'Recomienda un programa para una situación real, justificando su elección.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'6. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let cartasA15 = [];
  let ultimoResultadoA15 = null;
  let cartaSeleccionadaA15 = null;
  let paresEncontradosA15 = 0;
  let intentosA15 = 0;
  let bloqueadoA15 = false;
  let puntajeMaxA15 = 0;
  let tiempoEstimadoA15 = 10;
  let inicioTiempoA15 = null;
  let timerIntervalA15 = null;

  async function abrirActividadA15(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA15 = puntajeMaximo;
    tiempoEstimadoA15 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA15').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA15').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.5') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA15').classList.add('hidden');
        document.getElementById('vistaEjercicioA15').classList.add('hidden');
        document.getElementById('vistaResultadoA15').classList.remove('hidden');
        renderListaCotejo('rubricaResultadoA15', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA15', previa.detalle);
        ultimoResultadoA15 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA15').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA15').classList.add('hidden');
    document.getElementById('vistaInstrumentoA15').classList.remove('hidden');
    document.getElementById('vistaEjercicioA15').classList.add('hidden');
    document.getElementById('vistaResultadoA15').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA15').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA15} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.5', 'recursosEstudianteA15');

    const criteriosPrevios = CRITERIOS_BASE_A15.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderListaCotejo('instrumentoPrevioA15', criteriosPrevios, puntajeMaxA15, null);
  }

  document.getElementById('btnBackFromActividadA15').addEventListener('click', () => {
    clearInterval(timerIntervalA15);
    document.getElementById('panelActividadA15').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA15').addEventListener('click', () => {
    paresEncontradosA15 = 0;
    intentosA15 = 0;
    cartaSeleccionadaA15 = null;
    bloqueadoA15 = false;
    document.getElementById('justificacionA15').value = '';
    document.getElementById('aplicacionA15').value = '';
    document.getElementById('seccionFinalA15').classList.add('hidden');
    document.getElementById('vistaInstrumentoA15').classList.add('hidden');
    document.getElementById('vistaEjercicioA15').classList.remove('hidden');

    // Se arma el mazo: una tarjeta "programa" y una "característica" por cada par, mezcladas
    const mazoSinMezclar = [];
    PARES_A15_BASE.forEach(p => {
      mazoSinMezclar.push({ parId:p.id, tipo:'programa', texto:p.programa });
      mazoSinMezclar.push({ parId:p.id, tipo:'caracteristica', texto:p.caracteristica });
    });
    cartasA15 = barajar(mazoSinMezclar).map((c, i) => ({ ...c, cartaId:i, resuelta:false }));
    pintarMemoriaA15();

    inicioTiempoA15 = Date.now();
    clearInterval(timerIntervalA15);
    timerIntervalA15 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA15) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA15').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA15} min aprox.)</span>`;
    }, 1000);
  });

  function pintarMemoriaA15(){
    const cont = document.getElementById('memoriaGridA15');
    cont.innerHTML = cartasA15.map(c => `
      <div class="memoria-carta tipo-${c.tipo} ${c.resuelta ? 'resuelta' : ''}" data-carta-id="${c.cartaId}">
        <div class="memoria-carta-interior">
          <div class="memoria-cara memoria-dorso"><i class="fa-solid fa-question"></i></div>
          <div class="memoria-cara memoria-frente">${c.texto}</div>
        </div>
      </div>
    `).join('');

    actualizarBarraProgreso('progresoA15', paresEncontradosA15, PARES_A15_BASE.length);

    cont.querySelectorAll('.memoria-carta').forEach(el => {
      el.addEventListener('click', () => manejarClicCartaA15(Number(el.dataset.cartaId), el));
    });
  }

  function manejarClicCartaA15(cartaId, el){
    if(bloqueadoA15) return;
    const carta = cartasA15.find(c => c.cartaId === cartaId);
    if(!carta || carta.resuelta) return;
    if(cartaSeleccionadaA15 && cartaSeleccionadaA15.cartaId === cartaId) return;

    el.classList.add('volteada');

    if(!cartaSeleccionadaA15){
      cartaSeleccionadaA15 = { ...carta, el };
      return;
    }

    intentosA15++;
    const primeraCarta = cartaSeleccionadaA15;
    const segundaCarta = { ...carta, el };
    bloqueadoA15 = true;

    const esPar = primeraCarta.parId === segundaCarta.parId && primeraCarta.tipo !== segundaCarta.tipo;

    if(esPar){
      cartasA15.find(c => c.cartaId === primeraCarta.cartaId).resuelta = true;
      cartasA15.find(c => c.cartaId === segundaCarta.cartaId).resuelta = true;
      paresEncontradosA15++;
      actualizarBarraProgreso('progresoA15', paresEncontradosA15, PARES_A15_BASE.length);

      const colorPareja = COLORES_PAREJA_A15[(primeraCarta.parId - 1) % COLORES_PAREJA_A15.length];
      [primeraCarta.el, segundaCarta.el].forEach(el => {
        el.classList.add('resuelta');
        const frente = el.querySelector('.memoria-frente');
        frente.style.borderColor = colorPareja;
        frente.style.background = colorPareja + '26'; // transparencia suave
        frente.style.color = colorPareja;
      });

      cartaSeleccionadaA15 = null;
      bloqueadoA15 = false;

      if(paresEncontradosA15 >= PARES_A15_BASE.length){
        document.getElementById('seccionFinalA15').classList.remove('hidden');
        document.getElementById('btnFinalizarA15').disabled = false;
      }
    } else {
      primeraCarta.el.classList.add('error');
      segundaCarta.el.classList.add('error');
      setTimeout(() => {
        primeraCarta.el.classList.remove('volteada', 'error');
        segundaCarta.el.classList.remove('volteada', 'error');
        cartaSeleccionadaA15 = null;
        bloqueadoA15 = false;
      }, 900);
    }
  }

  document.getElementById('btnFinalizarA15').addEventListener('click', async () => {
    clearInterval(timerIntervalA15);

    const minutosTranscurridos = (Date.now() - inicioTiempoA15) / 60000;
    const justificacion = document.getElementById('justificacionA15').value.trim();
    const aplicacion = document.getElementById('aplicacionA15').value.trim();

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A15[0].nombre, descripcion: CRITERIOS_BASE_A15[0].descripcion, nivel: 'cumple' });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[1].nombre, descripcion: CRITERIOS_BASE_A15[1].descripcion,
      nivel: intentosA15 <= 10 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[2].nombre, descripcion: CRITERIOS_BASE_A15[2].descripcion,
      nivel: justificacion.length >= 20 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[3].nombre, descripcion: CRITERIOS_BASE_A15[3].descripcion,
      nivel: aplicacion.length >= 20 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[4].nombre, descripcion: CRITERIOS_BASE_A15[4].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA15 * 1.5 ? 'cumple' : 'no_cumple'
    });

    criterios.push({ nombre: CRITERIOS_BASE_A15[5].nombre, descripcion: CRITERIOS_BASE_A15[5].descripcion, nivel: 'cumple' });

    const pesoUnidad = puntajeMaxA15 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => { if(c.nivel === 'cumple') notaCalculada += pesoUnidad; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA15').classList.add('hidden');
    document.getElementById('vistaResultadoA15').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA15').classList.add('hidden');
    renderListaCotejo('rubricaResultadoA15', criterios, puntajeMaxA15, notaCalculada);
    ultimoResultadoA15 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA15 };

    const proporcionFinalA15 = puntajeMaxA15 > 0 ? notaCalculada / puntajeMaxA15 : 0;
    mostrarLogro(proporcionFinalA15 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA15 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA15 >= 0.8) dispararConfeti();

    const detalleA15 = [
      {
        titulo: `Sección 1 — Parejas encontradas (en ${intentosA15} intentos)`,
        items: PARES_A15_BASE.map(p => ({
          pregunta: p.programa,
          tuRespuesta: p.caracteristica,
          correcta: true
        }))
      },
      {
        titulo: 'Sección 2 — Reflexión',
        items: [
          { pregunta: 'Justificación de las coincidencias elegidas', tuRespuesta: justificacion || 'Sin responder', correcta: justificacion.length >= 20 },
          { pregunta: 'Recomendación para una pequeña empresa dominicana', tuRespuesta: aplicacion || 'Sin responder', correcta: aplicacion.length >= 20 }
        ]
      }
    ];
    ultimoResultadoA15.detalle = detalleA15;
    renderDesgloseColoreado('resultadoDesgloseA15', detalleA15);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.5',
        ra:'RA1',
        ec:'EC6.1.3',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA15,
        criterios: criterios,
        detalle: detalleA15
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA15').addEventListener('click', () => {
    if(!ultimoResultadoA15) return;
    generarPdfResultado('A.1.5', ultimoResultadoA15.criterios, ultimoResultadoA15.nota, ultimoResultadoA15.puntajeMaximo, 'EC6.1.3', 'RA1', ultimoResultadoA15.detalle);
  });

  document.getElementById('btnVolverMisActA15').addEventListener('click', () => {
    document.getElementById('panelActividadA15').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.5', abrirActividadA15);

// ============================================================================
// A.1.6 — EL DADO DE LAS COMPAÑÍAS (dado 3D + apareo con líneas trazadas)
// ============================================================================
  // Contenido anclado al recurso "Compañías Distribuidoras de Programas
  // Generadores de Reportes" (Microsoft, Google, SAP, TIBCO).
  const PREGUNTAS_DADO_A16_BASE = [
    { pregunta:'¿Qué compañía distribuye Power BI?', opciones:['SAP', 'Microsoft', 'TIBCO'], correctaIdx:1 },
    { pregunta:'¿En qué país tiene su sede SAP?', opciones:['España', 'Alemania', 'Estados Unidos'], correctaIdx:1 },
    { pregunta:'¿Qué compañía es dueña de Looker Studio?', opciones:['Microsoft', 'TIBCO', 'Google (Alphabet)'], correctaIdx:2 },
    { pregunta:'¿Cómo obtuvo SAP el programa Crystal Reports?', opciones:['Lo creó desde cero', 'Adquiriendo la empresa Business Objects en 2007', 'Se lo compró a Microsoft'], correctaIdx:1 },
    { pregunta:'De las 4 compañías estudiadas, ¿cuál es una empresa privada (no cotiza en bolsa)?', opciones:['Microsoft', 'SAP', 'TIBCO'], correctaIdx:2 },
    { pregunta:'¿En qué año fue fundada Microsoft?', opciones:['1975', '1998', '1972'], correctaIdx:0 },
    { pregunta:'¿Qué otro producto conocido desarrolla Google, además de Looker Studio?', opciones:['Windows', 'Gmail', 'Crystal Reports'], correctaIdx:1 },
    { pregunta:'¿Cuál de estas compañías fue fundada por 5 exingenieros de otra empresa (IBM)?', opciones:['TIBCO', 'Microsoft', 'SAP'], correctaIdx:2 }
  ];

  const COMPANIAS_APAREO_A16_BASE = [
    { id:1, nombre:'Microsoft', info:'Fundada en 1975 en Redmond, Washington; también desarrolla Windows y Azure.' },
    { id:2, nombre:'Google (Alphabet)', info:'Ofrece su programa de reportes de forma gratuita como parte de su ecosistema de datos en la nube.' },
    { id:3, nombre:'SAP', info:'Empresa alemana fundada en 1972, líder en software empresarial en Europa.' },
    { id:4, nombre:'TIBCO', info:'Compañía privada que forma parte de Cloud Software Group junto con Citrix.' }
  ];

  const CRITERIOS_BASE_A16 = [
    { key:'participacion', nombre:'1. Participación activa', niveles:{ excelente:'Participa activamente desde el inicio de la actividad.', bueno:'Participa la mayor parte del tiempo.', proceso:'Participa de forma limitada o intermitente.', insuficiente:'No participa en la actividad.' } },
    { key:'dado', nombre:'2. Dado de preguntas', niveles:{ excelente:'Responde correctamente las 4 preguntas del dado.', bueno:'Responde correctamente al menos 3 de las 4 preguntas del dado.', proceso:'Responde correctamente al menos 2 de las 4 preguntas del dado.', insuficiente:'Responde correctamente menos de 2 de las 4 preguntas del dado.' } },
    { key:'apareo', nombre:'3. Apareamiento de compañías', niveles:{ excelente:'Une correctamente las 4 compañías con su información en su único intento.', bueno:'Une correctamente al menos 3 de las 4 compañías.', proceso:'Une correctamente al menos 2 de las 4 compañías.', insuficiente:'Une correctamente menos de 2 de las 4 compañías.' } },
    { key:'justificacion', nombre:'4. Justificación', niveles:{ excelente:'Explica con claridad y reflexión qué le ayudó a recordar la información.', bueno:'Explica de forma general qué le ayudó a recordar.', proceso:'Ofrece una justificación breve o poco clara.', insuficiente:'No justifica su respuesta.' } },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', niveles:{ excelente:'Completa la actividad dentro del tiempo estimado.', bueno:'Completa la actividad con un ligero retraso.', proceso:'Completa la actividad con un retraso considerable.', insuficiente:'Excede ampliamente el tiempo estimado.' } },
    { key:'colaborativo', nombre:'6. Orden y prolijidad', niveles:{ excelente:'Desarrolla la actividad de forma ordenada y completa.', bueno:'Desarrolla la actividad con algunas interrupciones.', proceso:'Desarrolla la actividad de forma desordenada.', insuficiente:'No completa el desarrollo de la actividad.' } }
  ];

  const DADO_TARGETS_A16 = {
    1: { x:0,   y:0   },
    2: { x:90,  y:0   },
    3: { x:0,   y:-90 },
    4: { x:0,   y:90  },
    5: { x:-90, y:0   },
    6: { x:180, y:0   }
  };

  let dadoRotXA16 = 0, dadoRotYA16 = 0;
  let girandoDadoA16 = false;
  let tiradasA16 = 0;
  let preguntasRespondidasA16 = [];
  let carasMostradasA16 = [];
  let respuestasDadoA16 = [];
  let companiasApareoBarajadoA16 = [];
  let infoApareoBarajadoA16 = [];
  let apareoArrastrandoA16 = false;
  let apareoOrigenElA16 = null;
  let apareoOrigenIdA16 = null;
  let paresResueltosApareoA16 = 0;
  let intentosApareoA16 = 0;
  let errorApareoIdA16 = {}; // cuenta los intentos fallidos por cada compañía (id -> número de errores)
  let puntajeMaxA16 = 0;
  let tiempoEstimadoA16 = 10;
  let inicioTiempoA16 = null;
  let timerIntervalA16 = null;
  let ultimoResultadoA16 = null;

  async function abrirActividadA16(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA16 = puntajeMaximo;
    tiempoEstimadoA16 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA16').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA16').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.6') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA16').classList.add('hidden');
        document.getElementById('vistaEjercicioA16').classList.add('hidden');
        document.getElementById('vistaResultadoA16').classList.remove('hidden');
        renderRubricaDescriptiva('rubricaResultadoA16', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA16', previa.detalle);
        ultimoResultadoA16 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA16').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA16').classList.add('hidden');
    document.getElementById('vistaInstrumentoA16').classList.remove('hidden');
    document.getElementById('vistaEjercicioA16').classList.add('hidden');
    document.getElementById('vistaResultadoA16').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA16').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA16} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.6', 'recursosEstudianteA16');

    const criteriosPrevios = CRITERIOS_BASE_A16.map(c => ({ nombre:c.nombre, niveles:c.niveles, nivel:null }));
    renderRubricaDescriptiva('instrumentoPrevioA16', criteriosPrevios, puntajeMaxA16, null);
  }

  document.getElementById('btnBackFromActividadA16').addEventListener('click', () => {
    clearInterval(timerIntervalA16);
    document.getElementById('panelActividadA16').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA16').addEventListener('click', () => {
    dadoRotXA16 = 0; dadoRotYA16 = 0;
    girandoDadoA16 = false;
    tiradasA16 = 0;
    preguntasRespondidasA16 = [];
    carasMostradasA16 = [];
    respuestasDadoA16 = [];
    paresResueltosApareoA16 = 0;
    intentosApareoA16 = 0;
    errorApareoIdA16 = {};
    document.getElementById('dado3dA16').style.transform = 'rotateX(0deg) rotateY(0deg)';
    document.getElementById('dadoContadorA16').textContent = 'Tiradas: 0 de 4';
    document.getElementById('preguntaDadoA16').innerHTML = '';
    document.getElementById('btnLanzarDadoA16').disabled = false;
    document.getElementById('seccionApareaA16').classList.add('hidden');
    document.getElementById('seccionFinalA16').classList.add('hidden');
    document.getElementById('justificacionA16').value = '';
    document.getElementById('btnFinalizarA16').disabled = true;
    document.getElementById('vistaInstrumentoA16').classList.add('hidden');
    document.getElementById('vistaEjercicioA16').classList.remove('hidden');

    inicioTiempoA16 = Date.now();
    clearInterval(timerIntervalA16);
    timerIntervalA16 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA16) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA16').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA16} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Dado 3D ----------
  function proximoAnguloA16(actual, objetivoMod360, vueltasExtra){
    const base = Math.floor(actual / 360) * 360;
    let nuevo = base + objetivoMod360 + vueltasExtra * 360;
    while(nuevo <= actual) nuevo += 360;
    return nuevo;
  }

  document.getElementById('btnLanzarDadoA16').addEventListener('click', () => {
    if(girandoDadoA16 || tiradasA16 >= 4) return;

    // La cara que se ve (1-6) es un efecto visual, pero tampoco se repite en las 4 tiradas.
    const carasDisponibles = [1, 2, 3, 4, 5, 6].filter(c => !carasMostradasA16.includes(c));
    const cara = carasDisponibles[Math.floor(Math.random() * carasDisponibles.length)];
    carasMostradasA16.push(cara);
    // La pregunta se elige aparte, al azar, de un banco de 8 sin repetir ninguna.
    const indicesDisponibles = PREGUNTAS_DADO_A16_BASE.map((_, i) => i).filter(i => !preguntasRespondidasA16.includes(i));
    const indicePregunta = indicesDisponibles[Math.floor(Math.random() * indicesDisponibles.length)];

    girandoDadoA16 = true;
    document.getElementById('btnLanzarDadoA16').disabled = true;
    document.getElementById('preguntaDadoA16').innerHTML = '';

    const t = DADO_TARGETS_A16[cara];
    const objetivoX = ((t.x % 360) + 360) % 360;
    const objetivoY = ((t.y % 360) + 360) % 360;
    dadoRotXA16 = proximoAnguloA16(dadoRotXA16, objetivoX, 2 + Math.floor(Math.random() * 2));
    dadoRotYA16 = proximoAnguloA16(dadoRotYA16, objetivoY, 2 + Math.floor(Math.random() * 2));

    document.getElementById('dado3dA16').style.transform = `rotateX(${dadoRotXA16}deg) rotateY(${dadoRotYA16}deg)`;

    setTimeout(() => {
      girandoDadoA16 = false;
      tiradasA16++;
      document.getElementById('dadoContadorA16').textContent = `Tiradas: ${tiradasA16} de 4`;
      pintarPreguntaDadoA16(cara, indicePregunta);
    }, 1350);
  });

  function pintarPreguntaDadoA16(cara, indicePregunta){
    const p = PREGUNTAS_DADO_A16_BASE[indicePregunta];
    const cont = document.getElementById('preguntaDadoA16');
    let seleccion = null;

    cont.innerHTML = `
      <div class="dado-pregunta-card">
        <div class="dado-pregunta-titulo">Sacaste ${cara} — Pregunta ${tiradasA16} de 4</div>
        <div class="dado-pregunta-texto">${p.pregunta}</div>
        <div class="quiz-opciones">
          ${p.opciones.map((op, i) => `
            <button type="button" class="quiz-opcion-radio" data-idx="${i}">
              <span class="quiz-radio-circulo"></span>
              <span class="quiz-opcion-texto">${op}</span>
            </button>
          `).join('')}
        </div>
        <button type="button" class="btn btn-add" id="btnConfirmarRespuestaDadoA16" style="margin-top:14px;" disabled>
          <i class="fa-solid fa-check"></i> Confirmar respuesta
        </button>
      </div>`;

    cont.querySelectorAll('.quiz-opcion-radio').forEach(btn => {
      btn.addEventListener('click', () => {
        cont.querySelectorAll('.quiz-opcion-radio').forEach(b => b.classList.remove('seleccionada'));
        btn.classList.add('seleccionada');
        seleccion = Number(btn.dataset.idx);
        document.getElementById('btnConfirmarRespuestaDadoA16').disabled = false;
      });
    });

    document.getElementById('btnConfirmarRespuestaDadoA16').addEventListener('click', () => {
      if(seleccion === null) return;
      const correcta = seleccion === p.correctaIdx;
      respuestasDadoA16.push({
        pregunta: p.pregunta,
        tuRespuesta: p.opciones[seleccion],
        correcta,
        respuestaCorrecta: p.opciones[p.correctaIdx]
      });
      preguntasRespondidasA16.push(indicePregunta);

      cont.innerHTML = `
        <div class="dado-pregunta-card ${correcta ? 'correcta' : 'incorrecta'}">
          <i class="fa-solid ${correcta ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
          ${correcta ? '¡Correcto!' : `Incorrecto. La respuesta correcta era: <b>${p.opciones[p.correctaIdx]}</b>`}
        </div>`;

      if(tiradasA16 >= 4){
        document.getElementById('btnLanzarDadoA16').disabled = true;
        document.getElementById('seccionApareaA16').classList.remove('hidden');
        pintarApareoA16();
      } else {
        document.getElementById('btnLanzarDadoA16').disabled = false;
      }
    });
  }

  // ---------- Apareo con líneas trazadas ----------
  function pintarApareoA16(){
    companiasApareoBarajadoA16 = barajar(COMPANIAS_APAREO_A16_BASE);
    infoApareoBarajadoA16 = barajar(COMPANIAS_APAREO_A16_BASE);

    const colIzq = document.getElementById('apareoColIzqA16');
    const colDer = document.getElementById('apareoColDerA16');
    colIzq.innerHTML = companiasApareoBarajadoA16.map(c => `<div class="apareo-item apareo-item-izq" data-id="${c.id}">${c.nombre}</div>`).join('');
    colDer.innerHTML = infoApareoBarajadoA16.map(c => `<div class="apareo-item apareo-item-der" data-id="${c.id}">${c.info}</div>`).join('');

    colIzq.querySelectorAll('.apareo-item-izq').forEach(el => {
      el.addEventListener('mousedown', (e) => iniciarArrastreApareoA16(e, el));
      el.addEventListener('touchstart', (e) => iniciarArrastreApareoA16(e, el), { passive:false });
    });
  }

  // Convierte coordenadas de pantalla (clientX/clientY) al sistema de coordenadas interno
  // del SVG usando su matriz de transformación real (getScreenCTM). A diferencia de restar
  // getBoundingClientRect() a mano, esto es exacto sin importar zoom, transform o escalas
  // que haya aplicadas en algún elemento ancestro (como el "modo proyector").
  function puntoSvgDesdeClienteA16(clientX, clientY){
    const svg = document.getElementById('apareoSvgA16');
    const ctm = svg.getScreenCTM();
    if(!ctm) return { x: clientX, y: clientY };
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const transformado = pt.matrixTransform(ctm.inverse());
    return { x: transformado.x, y: transformado.y };
  }

  function bordeElementoSvgA16(el, lado){
    const r = el.getBoundingClientRect();
    const clientX = lado === 'derecho' ? r.right : r.left;
    const clientY = r.top + r.height / 2;
    return puntoSvgDesdeClienteA16(clientX, clientY);
  }

  function coordenadasRelativasApareoA16(e){
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return puntoSvgDesdeClienteA16(clientX, clientY);
  }

  function iniciarArrastreApareoA16(e, itemEl){
    if(itemEl.classList.contains('resuelto')) return;
    e.preventDefault();
    apareoArrastrandoA16 = true;
    apareoOrigenElA16 = itemEl;
    apareoOrigenIdA16 = itemEl.dataset.id;
    itemEl.classList.add('seleccionado');
    actualizarLineaTemporalApareoA16(e);
  }

  function actualizarLineaTemporalApareoA16(e){
    if(!apareoArrastrandoA16) return;
    const svg = document.getElementById('apareoSvgA16');
    const origen = bordeElementoSvgA16(apareoOrigenElA16, 'derecho');
    const p = coordenadasRelativasApareoA16(e);

    let linea = document.getElementById('lineaTemporalApareoA16');
    if(!linea){
      linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      linea.setAttribute('id', 'lineaTemporalApareoA16');
      linea.setAttribute('stroke', '#4fa3ff');
      linea.setAttribute('stroke-width', '3');
      linea.setAttribute('stroke-dasharray', '7 5');
      linea.setAttribute('stroke-linecap', 'round');
      svg.appendChild(linea);
    }
    linea.setAttribute('x1', origen.x); linea.setAttribute('y1', origen.y);
    linea.setAttribute('x2', p.x); linea.setAttribute('y2', p.y);
  }

  document.addEventListener('mousemove', actualizarLineaTemporalApareoA16);
  document.addEventListener('touchmove', (e) => { if(apareoArrastrandoA16){ e.preventDefault(); actualizarLineaTemporalApareoA16(e); } }, { passive:false });

  function finalizarArrastreApareoA16(e){
    if(!apareoArrastrandoA16) return;
    apareoArrastrandoA16 = false;

    const temp = document.getElementById('lineaTemporalApareoA16');
    if(temp) temp.remove();
    if(apareoOrigenElA16) apareoOrigenElA16.classList.remove('seleccionado');

    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
    const elBajoCursor = document.elementFromPoint(clientX, clientY);
    const itemDerecha = elBajoCursor ? elBajoCursor.closest('.apareo-item-der') : null;

    if(itemDerecha && !itemDerecha.classList.contains('resuelto') && apareoOrigenElA16){
      intentosApareoA16++;
      if(itemDerecha.dataset.id === apareoOrigenIdA16){
        dibujarLineaPermanenteApareoA16(apareoOrigenElA16, itemDerecha, '#22c55e');
        apareoOrigenElA16.classList.add('resuelto');
        itemDerecha.classList.add('resuelto');
      } else {
        // Un solo intento por compañía: aunque falle, la línea roja queda marcada
        // y esa compañía se da por respondida (no hay reintentos). El recuadro de
        // información sigue disponible para que otra compañía lo use correctamente.
        errorApareoIdA16[apareoOrigenIdA16] = (errorApareoIdA16[apareoOrigenIdA16] || 0) + 1;
        dibujarLineaPermanenteApareoA16(apareoOrigenElA16, itemDerecha, '#ef4444');
        apareoOrigenElA16.classList.add('resuelto', 'resuelto-error');
        sacudir(itemDerecha);
        const elDerError = itemDerecha;
        setTimeout(() => elDerError.classList.remove('anim-sacudir'), 500);
      }
      paresResueltosApareoA16++;
      if(paresResueltosApareoA16 >= COMPANIAS_APAREO_A16_BASE.length){
        document.getElementById('seccionFinalA16').classList.remove('hidden');
        document.getElementById('btnFinalizarA16').disabled = false;
      }
    }
    apareoOrigenElA16 = null;
    apareoOrigenIdA16 = null;
  }
  document.addEventListener('mouseup', finalizarArrastreApareoA16);
  document.addEventListener('touchend', finalizarArrastreApareoA16);

  function dibujarLineaPermanenteApareoA16(elIzq, elDer, color){
    const svg = document.getElementById('apareoSvgA16');
    const origen = bordeElementoSvgA16(elIzq, 'derecho');
    const destino = bordeElementoSvgA16(elDer, 'izquierdo');
    const linea = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    linea.setAttribute('x1', origen.x);
    linea.setAttribute('y1', origen.y);
    linea.setAttribute('x2', destino.x);
    linea.setAttribute('y2', destino.y);
    linea.setAttribute('stroke', color);
    linea.setAttribute('stroke-width', color === '#ef4444' ? '2.5' : '3');
    if(color === '#ef4444') linea.setAttribute('stroke-dasharray', '6 4');
    linea.setAttribute('stroke-linecap', 'round');
    svg.appendChild(linea);
  }

  document.getElementById('btnFinalizarA16').addEventListener('click', async () => {
    clearInterval(timerIntervalA16);

    const minutosTranscurridos = (Date.now() - inicioTiempoA16) / 60000;
    const justificacion = document.getElementById('justificacionA16').value.trim();
    const aciertosDado = respuestasDadoA16.filter(r => r.correcta).length;

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A16[0].nombre, niveles: CRITERIOS_BASE_A16[0].niveles, nivel: 'excelente' });

    let nivelDado = 'insuficiente';
    if(aciertosDado >= 4) nivelDado = 'excelente';
    else if(aciertosDado >= 3) nivelDado = 'bueno';
    else if(aciertosDado >= 2) nivelDado = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A16[1].nombre, niveles: CRITERIOS_BASE_A16[1].niveles, nivel: nivelDado });

    const aciertosApareo = COMPANIAS_APAREO_A16_BASE.filter(c => !errorApareoIdA16[c.id]).length;
    let nivelApareo = 'insuficiente';
    if(aciertosApareo >= 4) nivelApareo = 'excelente';
    else if(aciertosApareo >= 3) nivelApareo = 'bueno';
    else if(aciertosApareo >= 2) nivelApareo = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A16[2].nombre, niveles: CRITERIOS_BASE_A16[2].niveles, nivel: nivelApareo });

    let nivelJustificacion = 'insuficiente';
    if(justificacion.length >= 20) nivelJustificacion = 'excelente';
    else if(justificacion.length > 0) nivelJustificacion = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A16[3].nombre, niveles: CRITERIOS_BASE_A16[3].niveles, nivel: nivelJustificacion });

    let nivelTiempo = 'insuficiente';
    if(minutosTranscurridos <= tiempoEstimadoA16) nivelTiempo = 'excelente';
    else if(minutosTranscurridos <= tiempoEstimadoA16 * 1.5) nivelTiempo = 'bueno';
    else if(minutosTranscurridos <= tiempoEstimadoA16 * 2) nivelTiempo = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A16[4].nombre, niveles: CRITERIOS_BASE_A16[4].niveles, nivel: nivelTiempo });

    criterios.push({ nombre: CRITERIOS_BASE_A16[5].nombre, niveles: CRITERIOS_BASE_A16[5].niveles, nivel: 'excelente' });

    const pesoUnidad = puntajeMaxA16 / criterios.length;
    const pesosPorNivel = { excelente:1, bueno:0.75, proceso:0.4, insuficiente:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA16').classList.add('hidden');
    document.getElementById('vistaResultadoA16').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA16').classList.add('hidden');
    renderRubricaDescriptiva('rubricaResultadoA16', criterios, puntajeMaxA16, notaCalculada);

    const proporcionFinalA16 = puntajeMaxA16 > 0 ? notaCalculada / puntajeMaxA16 : 0;
    mostrarLogro(proporcionFinalA16 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA16 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA16 >= 0.8) dispararConfeti();

    const detalleA16 = [
      { titulo: 'Sección 1 — Dado de preguntas', items: respuestasDadoA16 },
      {
        titulo: 'Sección 2 — Apareo de compañías',
        items: COMPANIAS_APAREO_A16_BASE.map(c => {
          const errores = errorApareoIdA16[c.id] || 0;
          return {
            pregunta: c.nombre,
            tuRespuesta: c.info + (errores > 0 ? ` (con ${errores} intento${errores > 1 ? 's' : ''} fallido${errores > 1 ? 's' : ''} antes de acertar)` : ''),
            correcta: errores === 0
          };
        })
      }
    ];
    ultimoResultadoA16 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA16, detalle: detalleA16 };
    renderDesgloseColoreado('resultadoDesgloseA16', detalleA16);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.6',
        ra:'RA1',
        ec:'EC6.1.3',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA16,
        criterios: criterios,
        detalle: detalleA16
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA16').addEventListener('click', () => {
    if(!ultimoResultadoA16) return;
    generarPdfResultado('A.1.6', ultimoResultadoA16.criterios, ultimoResultadoA16.nota, ultimoResultadoA16.puntajeMaximo, 'EC6.1.3', 'RA1', ultimoResultadoA16.detalle);
  });

  document.getElementById('btnVolverMisActA16').addEventListener('click', () => {
    document.getElementById('panelActividadA16').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.6', abrirActividadA16);

// ============================================================================
// A.1.7 — DESCARGA GUIADA DE NEXAREPORT (navegador simulado)
// ============================================================================
  // Usa el navegador simulado compartido (simulador-programa.js). El estudiante
  // debe identificar el sitio oficial de NexaReport entre varios resultados de
  // búsqueda (algunos son trampas: anuncio, foro, portal de descargas de terceros).
  const RESULTADOS_BUSQUEDA_A17 = [
    {
      id:'anuncio', esOficial:false, esAnuncio:true,
      url:'www.descargas-gratis-programas.com', titulo:'Descarga NexaReport GRATIS — Súper rápido',
      desc:'¡Descarga rápida! Sin virus, sin registro. Haz clic aquí para instalar ya mismo.',
      advertencia:'Este resultado es un <b>anuncio pagado</b> (fíjate en la etiqueta "Anuncio"), no necesariamente el sitio del desarrollador real. Los anuncios que prometen descargas "súper rápidas y gratis" son una señal común de sitios no confiables.'
    },
    {
      id:'oficial', esOficial:true, esAnuncio:false,
      url: 'www.nexareport.com', titulo:'NexaReport — Sitio oficial',
      desc:'Software profesional para generación de reportes empresariales. Descarga la versión oficial, con planes gratuitos y de pago disponibles.'
    },
    {
      id:'foro', esOficial:false, esAnuncio:false,
      url:'www.tecnoayuda-foros.net/tema/48213', titulo:'Foro TecnoAyuda: ¿cómo consigo NexaReport?',
      desc:'Usuarios comparten enlaces de terceros para descargar NexaReport. Última respuesta hace 2 años.',
      advertencia:'Este es un <b>foro de usuarios</b>, no el sitio del desarrollador. Los enlaces que comparten otros usuarios en foros pueden estar desactualizados o ser inseguros.'
    },
    {
      id:'portal', esOficial:false, esAnuncio:false,
      url:'nexareport-descargas.info', titulo:'nexareport-descargas.info — Descargar NexaReport',
      desc:'Portal de descargas de software. Miles de programas disponibles para descargar gratis.',
      advertencia:'Este sitio <b>no es el desarrollador oficial</b> de NexaReport — es un portal externo de descargas. Estos portales a veces incluyen programas adicionales no deseados junto con la descarga.'
    }
  ];

  const PERSONAJES_A17 = [
    {
      nombre: 'Un compañero de trabajo',
      avatar: '🧑‍💻',
      pregunta: 'Encontré este resultado buscando NexaReport: un anuncio que dice "Descarga NexaReport GRATIS — Súper rápido". ¿Debería confiar en él?',
      opciones: ['Sí, es gratis y rápido', 'No, es un anuncio pagado y eso no garantiza que sea el sitio oficial', 'Sí, porque aparece primero en la búsqueda'],
      correctaIdx: 1
    },
    {
      nombre: 'Tu jefe',
      avatar: '🧑‍💼',
      pregunta: 'Quiero asegurarme de que estamos descargando NexaReport del sitio correcto. ¿Cuál de estas señales confirma que es el sitio oficial?',
      opciones: ['Que tenga muchos anuncios alrededor', 'Que el dominio coincida exactamente con el nombre de la empresa', 'Que sea el primer resultado de la búsqueda'],
      correctaIdx: 1
    },
    {
      nombre: 'Un usuario de un foro',
      avatar: '🧑‍🎓',
      pregunta: 'Yo encontré un enlace en un foro para descargar el programa gratis. ¿Es igual de seguro que el sitio oficial del desarrollador?',
      opciones: ['Sí, es exactamente igual de seguro', 'No, los enlaces de foros pueden estar desactualizados o ser inseguros', 'Sí, porque lo compartió un usuario con experiencia'],
      correctaIdx: 1
    }
  ];

  const CRITERIOS_BASE_A17 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'repaso', nombre:'2. Repaso teórico', descripcion:'Responde correctamente las preguntas del camino de aprendizaje sobre cómo identificar sitios de descarga confiables.' },
    { key:'identificacion', nombre:'3. Identificación del sitio oficial', descripcion:'Identifica el sitio oficial de NexaReport dentro de un número razonable de intentos.' },
    { key:'descarga', nombre:'4. Descarga del programa', descripcion:'Completa la simulación de descarga desde el sitio oficial.' },
    { key:'justificacion', nombre:'5. Justificación', descripcion:'Explica con criterio qué señales le permitieron reconocer el sitio oficial.' },
    { key:'tiempo', nombre:'6. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'7. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let pasoCaminoA17 = 0;
  let respuestasCaminoA17 = [];
  let intentosCaminoA17 = [];
  let intentosSitioA17 = 0;
  let descargaCompletadaA17 = false;
  let puntajeMaxA17 = 0;
  let tiempoEstimadoA17 = 10;
  let inicioTiempoA17 = null;
  let timerIntervalA17 = null;
  let ultimoResultadoA17 = null;

  async function abrirActividadA17(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA17 = puntajeMaximo;
    tiempoEstimadoA17 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA17').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA17').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.7') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA17').classList.add('hidden');
        document.getElementById('vistaEjercicioA17').classList.add('hidden');
        document.getElementById('vistaResultadoA17').classList.remove('hidden');
        renderRubrica('rubricaResultadoA17', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA17', previa.detalle);
        ultimoResultadoA17 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA17').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA17').classList.add('hidden');
    document.getElementById('vistaInstrumentoA17').classList.remove('hidden');
    document.getElementById('vistaEjercicioA17').classList.add('hidden');
    document.getElementById('vistaResultadoA17').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA17').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA17} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.7', 'recursosEstudianteA17');

    const criteriosPrevios = CRITERIOS_BASE_A17.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA17', criteriosPrevios, puntajeMaxA17, null);
  }

  document.getElementById('btnBackFromActividadA17').addEventListener('click', () => {
    clearInterval(timerIntervalA17);
    document.getElementById('panelActividadA17').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA17').addEventListener('click', () => {
    pasoCaminoA17 = 0;
    respuestasCaminoA17 = [];
    intentosCaminoA17 = [];
    intentosSitioA17 = 0;
    descargaCompletadaA17 = false;
    document.getElementById('justificacionA17').value = '';
    document.getElementById('seccionNavegadorA17').classList.add('hidden');
    document.getElementById('seccionFinalA17').classList.add('hidden');
    document.getElementById('btnFinalizarA17').disabled = true;
    document.getElementById('vistaInstrumentoA17').classList.add('hidden');
    document.getElementById('vistaEjercicioA17').classList.remove('hidden');

    pintarCaminoA17();

    inicioTiempoA17 = Date.now();
    clearInterval(timerIntervalA17);
    timerIntervalA17 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA17) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA17').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA17} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Sección 1: camino de repaso teórico ----------
  function pintarCaminoA17(){
    const cont = document.getElementById('caminoA17');

    const nodosHtml = PERSONAJES_A17.map((p, i) => {
      let claseNodo = '';
      if(i < pasoCaminoA17) claseNodo = 'completado';
      else if(i === pasoCaminoA17) claseNodo = 'activo';
      const linea = i < PERSONAJES_A17.length - 1
        ? `<div class="camino-linea ${i < pasoCaminoA17 ? 'completada' : ''}"></div>` : '';
      return `<div class="camino-nodo ${claseNodo}">${i < pasoCaminoA17 ? '<i class="fa-solid fa-check" style="color:var(--dark-green-accent);"></i>' : p.avatar}</div>${linea}`;
    }).join('');

    if(pasoCaminoA17 >= PERSONAJES_A17.length){
      cont.innerHTML = `
        <div class="camino-wrap">
          <div class="camino-progreso">${nodosHtml}</div>
          <div class="camino-tarjeta">
            <div class="camino-avatar">🎉</div>
            <div style="flex:1;">
              <div class="camino-completa-msg"><i class="fa-solid fa-circle-check"></i> ¡Completaste el repaso! Ya puedes continuar con la Sección 2.</div>
            </div>
          </div>
        </div>`;
      document.getElementById('seccionNavegadorA17').classList.remove('hidden');
      pintarResultadosBusquedaA17();
      return;
    }

    const p = PERSONAJES_A17[pasoCaminoA17];
    const yaResuelto = respuestasCaminoA17[pasoCaminoA17] !== undefined;

    cont.innerHTML = `
      <div class="camino-wrap">
        <div class="camino-progreso">${nodosHtml}</div>
        <div class="camino-tarjeta">
          <div class="camino-avatar">${p.avatar}</div>
          <div style="flex:1;">
            <div class="camino-nombre-personaje">${p.nombre}</div>
            <div class="camino-burbuja">${p.pregunta}</div>
            <div class="asistente-opciones">
              ${p.opciones.map((op, i) => `
                <button type="button" class="asistente-opcion camino-opcion" data-opcion="${i}" ${yaResuelto ? 'disabled' : ''}>${op}</button>
              `).join('')}
            </div>
            <div id="caminoFeedbackA17"></div>
            ${yaResuelto ? '<button type="button" class="btn btn-primary" id="btnSiguientePersonajeA17" style="width:auto; padding:10px 22px; margin-top:14px;">Siguiente <i class="fa-solid fa-arrow-right"></i></button>' : ''}
          </div>
        </div>
      </div>`;

    if(yaResuelto){
      const idxCorrecta = p.correctaIdx;
      const btnCorrecta = document.querySelector(`#caminoA17 .camino-opcion[data-opcion="${idxCorrecta}"]`);
      if(btnCorrecta) btnCorrecta.classList.add('correcta-marcada');
      document.getElementById('caminoFeedbackA17').innerHTML =
        `<div class="asistente-feedback"><i class="fa-solid fa-circle-check"></i> ¡Correcto! ${p.opciones[idxCorrecta]}</div>`;
      document.getElementById('btnSiguientePersonajeA17').addEventListener('click', () => {
        pasoCaminoA17++;
        pintarCaminoA17();
      });
    } else {
      document.querySelectorAll('#caminoA17 .camino-opcion').forEach(btn => {
        btn.addEventListener('click', () => manejarOpcionCaminoA17(Number(btn.dataset.opcion), btn));
      });
    }
  }

  function manejarOpcionCaminoA17(idx, btnEl){
    const p = PERSONAJES_A17[pasoCaminoA17];
    if(intentosCaminoA17[pasoCaminoA17] === undefined) intentosCaminoA17[pasoCaminoA17] = 0;
    intentosCaminoA17[pasoCaminoA17]++;

    if(idx === p.correctaIdx){
      respuestasCaminoA17[pasoCaminoA17] = intentosCaminoA17[pasoCaminoA17] === 1;
      pintarCaminoA17();
    } else {
      btnEl.classList.add('incorrecta-marcada');
      sacudir(btnEl);
      setTimeout(() => btnEl.classList.remove('incorrecta-marcada'), 500);
    }
  }

  // ---------- Sección 2: navegador simulado ----------
  function pintarResultadosBusquedaA17(){
    const resultadosHTML = barajar(RESULTADOS_BUSQUEDA_A17).map(r => `
      <div class="resultado-busqueda" data-id="${r.id}">
        <div class="resultado-url"><i class="fa-solid fa-globe"></i> ${r.url} ${r.esAnuncio ? '<span class="badge-anuncio">Anuncio</span>' : ''}</div>
        <div class="resultado-titulo">${r.titulo}</div>
        <div class="resultado-desc">${r.desc}</div>
      </div>
    `).join('');

    pintarVentanaNavegadorSimulado('ventanaNavegadorA17', 'buscador.com/busqueda?q=descargar+nexareport', resultadosHTML);

    document.querySelectorAll('#ventanaNavegadorA17 .resultado-busqueda').forEach(el => {
      el.addEventListener('click', () => manejarClicResultadoA17(el.dataset.id));
    });
  }

  function manejarClicResultadoA17(id){
    const resultado = RESULTADOS_BUSQUEDA_A17.find(r => r.id === id);
    intentosSitioA17++;

    if(resultado.esOficial){
      pintarSitioOficialA17();
      return;
    }

    const contenidoHTML = `
      <div class="advertencia-sitio-falso">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <div>${resultado.advertencia}</div>
      </div>
      <button type="button" class="btn-volver-resultados" id="btnVolverResultadosA17">
        <i class="fa-solid fa-arrow-left"></i> Volver a los resultados de búsqueda
      </button>`;
    pintarVentanaNavegadorSimulado('ventanaNavegadorA17', resultado.url, contenidoHTML);
    document.getElementById('btnVolverResultadosA17').addEventListener('click', pintarResultadosBusquedaA17);
  }

  function pintarSitioOficialA17(){
    const contenidoHTML = `
      <div class="sitio-oficial-nexa">
        ${logoNexaReportHTML(56)}
        <div class="nexa-nombre-marca">${NEXAREPORT_BRAND.nombre}</div>
        <div class="nexa-eslogan">${NEXAREPORT_BRAND.eslogan}</div>
        <button type="button" class="btn-descargar-nexa" id="btnDescargarNexaA17">
          <i class="fa-solid fa-download"></i> Descargar para Windows
        </button>
        <div class="nexa-requisitos">Windows 10/11 · 64 bits · 350 MB de espacio libre</div>
        <div id="zonaDescargaA17"></div>
      </div>`;
    pintarVentanaNavegadorSimulado('ventanaNavegadorA17', NEXAREPORT_BRAND.dominioOficial, contenidoHTML);
    document.getElementById('btnDescargarNexaA17').addEventListener('click', iniciarDescargaA17);
  }

  function iniciarDescargaA17(){
    const btn = document.getElementById('btnDescargarNexaA17');
    btn.disabled = true;
    const zona = document.getElementById('zonaDescargaA17');
    zona.innerHTML = `
      <div class="descarga-progreso-wrap"><div class="descarga-progreso-fill" id="descargaFillA17"></div></div>
      <div class="descarga-texto-estado" id="descargaTextoA17">Descargando NexaReport_Setup.exe...</div>`;

    requestAnimationFrame(() => {
      document.getElementById('descargaFillA17').style.width = '100%';
    });

    setTimeout(() => {
      document.getElementById('descargaTextoA17').textContent = '¡Descarga completa!';
      zona.innerHTML += `
        <div class="descarga-completada-barra">
          <i class="fa-solid fa-circle-check"></i>
          <div>
            <div class="archivo-nombre">NexaReport_Setup.exe</div>
            <div class="archivo-sub">350 MB — Descarga completa</div>
          </div>
        </div>`;
      descargaCompletadaA17 = true;
      document.getElementById('seccionFinalA17').classList.remove('hidden');
      document.getElementById('btnFinalizarA17').disabled = false;
    }, 1900);
  }

  document.getElementById('btnFinalizarA17').addEventListener('click', async () => {
    clearInterval(timerIntervalA17);

    const minutosTranscurridos = (Date.now() - inicioTiempoA17) / 60000;
    const justificacion = document.getElementById('justificacionA17').value.trim();
    const aciertosCaminoA17 = respuestasCaminoA17.filter(Boolean).length;

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A17[0].nombre, descripcion: CRITERIOS_BASE_A17[0].descripcion, nivel: 'logrado' });

    criterios.push({
      nombre: CRITERIOS_BASE_A17[1].nombre, descripcion: CRITERIOS_BASE_A17[1].descripcion,
      nivel: aciertosCaminoA17 >= 2 ? 'logrado' : 'no_logrado'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A17[2].nombre, descripcion: CRITERIOS_BASE_A17[2].descripcion,
      nivel: intentosSitioA17 <= 2 ? 'logrado' : 'no_logrado'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A17[3].nombre, descripcion: CRITERIOS_BASE_A17[3].descripcion,
      nivel: descargaCompletadaA17 ? 'logrado' : 'no_logrado'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A17[4].nombre, descripcion: CRITERIOS_BASE_A17[4].descripcion,
      nivel: justificacion.length >= 20 ? 'logrado' : 'no_logrado'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A17[5].nombre, descripcion: CRITERIOS_BASE_A17[5].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA17 * 1.5 ? 'logrado' : 'no_logrado'
    });

    criterios.push({ nombre: CRITERIOS_BASE_A17[6].nombre, descripcion: CRITERIOS_BASE_A17[6].descripcion, nivel: 'logrado' });

    const pesoUnidad = puntajeMaxA17 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => { if(c.nivel === 'logrado') notaCalculada += pesoUnidad; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA17').classList.add('hidden');
    document.getElementById('vistaResultadoA17').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA17').classList.add('hidden');
    renderRubrica('rubricaResultadoA17', criterios, puntajeMaxA17, notaCalculada);

    const proporcionFinalA17 = puntajeMaxA17 > 0 ? notaCalculada / puntajeMaxA17 : 0;
    mostrarLogro(proporcionFinalA17 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA17 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA17 >= 0.8) dispararConfeti();

    const detalleA17 = [
      {
        titulo: 'Sección 1 — Repaso: ¿sitio confiable o trampa?',
        items: PERSONAJES_A17.map((p, i) => ({
          pregunta: `${p.nombre} preguntó: ${p.pregunta}`,
          tuRespuesta: p.opciones[p.correctaIdx],
          correcta: true
        }))
      },
      {
        titulo: 'Sección 2 — Descarga guiada de NexaReport',
        items: [
          {
            pregunta: '¿Identificó el sitio oficial de NexaReport?',
            tuRespuesta: `Sí, en ${intentosSitioA17} intento${intentosSitioA17 > 1 ? 's' : ''} (incluyendo el acierto)`,
            correcta: intentosSitioA17 <= 2
          },
          {
            pregunta: '¿Completó la descarga desde el sitio oficial?',
            tuRespuesta: descargaCompletadaA17 ? 'Sí, descargó NexaReport_Setup.exe' : 'No completó la descarga',
            correcta: descargaCompletadaA17
          },
          {
            pregunta: '¿Cómo supiste cuál era el sitio oficial?',
            tuRespuesta: justificacion || 'Sin responder',
            correcta: justificacion.length >= 20
          }
        ]
      }
    ];
    ultimoResultadoA17 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA17, detalle: detalleA17 };
    renderDesgloseColoreado('resultadoDesgloseA17', detalleA17);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.7',
        ra:'RA1',
        ec:'EC6.1.3',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA17,
        criterios: criterios,
        detalle: detalleA17
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA17').addEventListener('click', () => {
    if(!ultimoResultadoA17) return;
    generarPdfResultado('A.1.7', ultimoResultadoA17.criterios, ultimoResultadoA17.nota, ultimoResultadoA17.puntajeMaximo, 'EC6.1.3', 'RA1', ultimoResultadoA17.detalle);
  });

  document.getElementById('btnVolverMisActA17').addEventListener('click', () => {
    document.getElementById('panelActividadA17').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.7', abrirActividadA17);

// ============================================================================
// A.1.8 — INSTALACIÓN GUIADA DE NEXAREPORT (instalador simulado, 7 pasos)
// ============================================================================
  const PREGUNTAS_CARTAS_A18 = [
    { id:1, pregunta:'¿Por qué es importante leer los términos y condiciones antes de aceptarlos?' },
    { id:2, pregunta:'¿Qué deberías revisar en la pantalla de "Componentes adicionales" antes de continuar?' },
    { id:3, pregunta:'¿Qué información te muestra la pantalla de "Carpeta de destino"?' },
    { id:4, pregunta:'¿Qué ocurre exactamente durante la barra de progreso de instalación?' },
    { id:5, pregunta:'Si un instalador pide permisos que no tienen sentido para el programa, ¿qué deberías hacer?' },
    { id:6, pregunta:'¿Qué opción suele ofrecer la pantalla de "Finalizar", además de cerrar el asistente?' },
    { id:7, pregunta:'¿Por qué es riesgoso dejar marcadas casillas que no revisaste con atención?' },
    { id:8, pregunta:'¿Qué requisitos del sistema debes verificar antes de instalar un programa como NexaReport?' }
  ];

  const CRITERIOS_BASE_A18 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'repaso', nombre:'2. Repaso teórico', descripcion:'Responde con desarrollo adecuado las 5 preguntas seleccionadas en la baraja sobre el proceso de instalación.' },
    { key:'instalacion', nombre:'3. Instalación completa', descripcion:'Completa los 7 pasos del asistente de instalación hasta el final.' },
    { key:'seguridad', nombre:'4. Decisión de seguridad', descripcion:'Rechaza la instalación del componente adicional no deseado (BuscadorTurbo) durante la instalación.' },
    { key:'justificacion', nombre:'5. Justificación', descripcion:'Explica con criterio por qué tomó esa decisión sobre el componente adicional.' },
    { key:'tiempo', nombre:'6. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'7. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let cartasVolteadasA18 = [];
  let respuestasCartasA18 = {};
  let pasoActualA18 = 1;
  let terminosAceptadosA18 = false;
  let rechazoOfertaExtraA18 = false;
  let instalacionCompletadaA18 = false;
  let puntajeMaxA18 = 0;
  let tiempoEstimadoA18 = 10;
  let inicioTiempoA18 = null;
  let timerIntervalA18 = null;
  let ultimoResultadoA18 = null;

  async function abrirActividadA18(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA18 = puntajeMaximo;
    tiempoEstimadoA18 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA18').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA18').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.8') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA18').classList.add('hidden');
        document.getElementById('vistaEjercicioA18').classList.add('hidden');
        document.getElementById('vistaResultadoA18').classList.remove('hidden');
        renderListaCotejo('rubricaResultadoA18', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA18', previa.detalle);
        ultimoResultadoA18 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA18').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA18').classList.add('hidden');
    document.getElementById('vistaInstrumentoA18').classList.remove('hidden');
    document.getElementById('vistaEjercicioA18').classList.add('hidden');
    document.getElementById('vistaResultadoA18').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA18').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA18} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.8', 'recursosEstudianteA18');

    const criteriosPrevios = CRITERIOS_BASE_A18.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderListaCotejo('instrumentoPrevioA18', criteriosPrevios, puntajeMaxA18, null);
  }

  document.getElementById('btnBackFromActividadA18').addEventListener('click', () => {
    clearInterval(timerIntervalA18);
    document.getElementById('panelActividadA18').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA18').addEventListener('click', () => {
    cartasVolteadasA18 = [];
    respuestasCartasA18 = {};
    pasoActualA18 = 1;
    terminosAceptadosA18 = false;
    rechazoOfertaExtraA18 = false;
    instalacionCompletadaA18 = false;
    document.getElementById('justificacionA18').value = '';
    document.getElementById('seccionInstaladorA18').classList.add('hidden');
    document.getElementById('seccionFinalA18').classList.add('hidden');
    document.getElementById('btnFinalizarA18').disabled = true;
    document.getElementById('vistaInstrumentoA18').classList.add('hidden');
    document.getElementById('vistaEjercicioA18').classList.remove('hidden');

    pintarCartasA18();

    inicioTiempoA18 = Date.now();
    clearInterval(timerIntervalA18);
    timerIntervalA18 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA18) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA18').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA18} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Sección 1: baraja de preguntas ----------
  const MAX_CARTAS_A18 = 5;

  function pintarCartasA18(){
    const cont = document.getElementById('cartasA18');
    cont.innerHTML = `
      <div class="cartas-contador" id="cartasContadorA18">Cartas volteadas: ${cartasVolteadasA18.length} de ${MAX_CARTAS_A18}</div>
      <div class="cartas-grid">
        ${PREGUNTAS_CARTAS_A18.map(p => {
          const volteada = cartasVolteadasA18.includes(p.id);
          return `
            <div class="carta-pregunta ${volteada ? 'volteada' : ''}" data-id="${p.id}">
              <div class="carta-interior">
                <div class="carta-cara carta-dorso">
                  <span class="carta-dorso-esquina esquina-si"></span>
                  <span class="carta-dorso-esquina esquina-sd"></span>
                  <span class="carta-dorso-esquina esquina-ii"></span>
                  <span class="carta-dorso-esquina esquina-id"></span>
                  <div class="carta-dorso-marco">${logoNexaReportHTML(30)}</div>
                </div>
                <div class="carta-cara carta-frente">${p.pregunta}</div>
              </div>
            </div>`;
        }).join('')}
      </div>
      <div id="respuestasCartasWrapA18"></div>`;

    document.querySelectorAll('#cartasA18 .carta-pregunta').forEach(el => {
      el.addEventListener('click', () => manejarClicCartaA18(Number(el.dataset.id)));
    });

    pintarCajasRespuestaCartasA18();
  }

  function manejarClicCartaA18(id){
    if(cartasVolteadasA18.includes(id)) return;
    if(cartasVolteadasA18.length >= MAX_CARTAS_A18) return;
    cartasVolteadasA18.push(id);
    pintarCartasA18();
  }

  function pintarCajasRespuestaCartasA18(){
    const wrap = document.getElementById('respuestasCartasWrapA18');
    if(cartasVolteadasA18.length === 0){ wrap.innerHTML = ''; return; }

    wrap.innerHTML = cartasVolteadasA18.map(id => {
      const p = PREGUNTAS_CARTAS_A18.find(x => x.id === id);
      return `
        <div class="justificacion-box">
          <label for="respuestaCartaA18_${id}"><i class="fa-solid fa-pen"></i> ${p.pregunta}</label>
          <textarea id="respuestaCartaA18_${id}" placeholder="Escribe tu respuesta...">${respuestasCartasA18[id] || ''}</textarea>
        </div>`;
    }).join('') + `
      <button type="button" class="btn btn-add" id="btnContinuarCartasA18" style="margin-top:8px;" ${cartasVolteadasA18.length < MAX_CARTAS_A18 ? 'disabled' : ''}>
        <i class="fa-solid fa-arrow-right"></i> Continuar a la instalación
      </button>`;

    cartasVolteadasA18.forEach(id => {
      document.getElementById(`respuestaCartaA18_${id}`).addEventListener('input', (e) => {
        respuestasCartasA18[id] = e.target.value;
      });
    });

    const btnContinuar = document.getElementById('btnContinuarCartasA18');
    if(btnContinuar){
      btnContinuar.addEventListener('click', () => {
        const faltantes = cartasVolteadasA18.filter(id => !(respuestasCartasA18[id] || '').trim());
        if(faltantes.length > 0){
          mostrarNotificacion('Responde las 5 preguntas antes de continuar.', 'error');
          return;
        }
        document.getElementById('seccionInstaladorA18').classList.remove('hidden');
        pintarPasoA18(1);
      });
    }
  }

  // ---------- Sección 2: instalador simulado ----------

  function pintarPasoA18(paso){
    pasoActualA18 = paso;

    if(paso === 1){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Descargas', `
        <p>🗂️ <strong>NexaReport_Setup.exe</strong> — 350 MB</p>
        <p style="margin-top:14px;">Haz doble clic para ejecutar el instalador que descargaste.</p>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Ejecutar instalador</button>
        </div>`);
      document.getElementById('btnPasoA18').addEventListener('click', () => pintarPasoA18(2));
    }

    else if(paso === 2){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Instalación de NexaReport', `
        <p><strong>Bienvenido al asistente de instalación de NexaReport</strong></p>
        <p>Este asistente te guiará durante la instalación del programa.</p>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Siguiente ›</button>
        </div>`);
      document.getElementById('btnPasoA18').addEventListener('click', () => pintarPasoA18(3));
    }

    else if(paso === 3){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Acuerdo de licencia', `
        <div class="instalador-ruta" style="max-height:70px; overflow:hidden;">Términos de uso de NexaReport... Este software se proporciona "tal cual", sin garantías de ningún tipo...</div>
        <div class="instalador-checkbox" id="checkboxTerminosA18">
          <span class="caja" id="cajaTerminosA18"></span> Acepto los términos y condiciones
        </div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA18" disabled>Siguiente ›</button>
        </div>`);
      document.getElementById('checkboxTerminosA18').addEventListener('click', () => {
        terminosAceptadosA18 = !terminosAceptadosA18;
        document.getElementById('cajaTerminosA18').classList.toggle('marcada', terminosAceptadosA18);
        document.getElementById('btnPasoA18').disabled = !terminosAceptadosA18;
      });
      document.getElementById('btnPasoA18').addEventListener('click', () => { if(terminosAceptadosA18) pintarPasoA18(4); });
    }

    else if(paso === 4){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Carpeta de destino', `
        <p>NexaReport se instalará en:</p>
        <div class="instalador-ruta">C:\\Archivos de programa\\NexaReport\\</div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn secundario">Examinar...</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Siguiente ›</button>
        </div>`);
      document.getElementById('btnPasoA18').addEventListener('click', () => pintarPasoA18(5));
    }

    else if(paso === 5){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Componentes adicionales', `
        <div class="instalador-checkbox" id="checkboxAccesoA18">
          <span class="caja marcada" id="cajaAccesoA18"></span> Crear acceso directo en el escritorio
        </div>
        <div class="instalador-checkbox trampa" id="checkboxTurboA18">
          <span class="caja marcada" id="cajaTurboA18"></span> Instalar también <b>BuscadorTurbo</b> — tu nueva barra de herramientas gratis
        </div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Instalar</button>
        </div>`);
      let accesoMarcado = true;
      let turboMarcado = true;
      document.getElementById('checkboxAccesoA18').addEventListener('click', () => {
        accesoMarcado = !accesoMarcado;
        document.getElementById('cajaAccesoA18').classList.toggle('marcada', accesoMarcado);
      });
      document.getElementById('checkboxTurboA18').addEventListener('click', () => {
        turboMarcado = !turboMarcado;
        document.getElementById('cajaTurboA18').classList.toggle('marcada', turboMarcado);
      });
      document.getElementById('btnPasoA18').addEventListener('click', () => {
        rechazoOfertaExtraA18 = !turboMarcado; // correcto = lo desmarcó antes de continuar
        pintarPasoA18(6);
      });
    }

    else if(paso === 6){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Instalando NexaReport...', `
        <p id="textoProgresoA18">Copiando archivos...</p>
        <div class="instalador-progreso-wrap"><div class="instalador-progreso-fill" id="progresoInstalA18"></div></div>
        <div class="instalador-texto-estado" id="estadoInstalA18">0%</div>`);
      requestAnimationFrame(() => { document.getElementById('progresoInstalA18').style.width = '100%'; });
      setTimeout(() => { document.getElementById('estadoInstalA18').textContent = '100%'; }, 2200);
      setTimeout(() => pintarPasoA18(7), 2400);
    }

    else if(paso === 7){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Instalación completa', `
        <div class="instalador-exito">
          <i class="fa-solid fa-circle-check"></i>
          <p><strong>NexaReport se instaló correctamente</strong></p>
        </div>
        <div class="instalador-checkbox">
          <span class="caja marcada"></span> Abrir NexaReport ahora
        </div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Finalizar</button>
        </div>`);
      document.getElementById('btnPasoA18').addEventListener('click', () => {
        instalacionCompletadaA18 = true;
        document.getElementById('seccionFinalA18').classList.remove('hidden');
        document.getElementById('btnFinalizarA18').disabled = false;
      });
    }
  }

  document.getElementById('btnFinalizarA18').addEventListener('click', async () => {
    clearInterval(timerIntervalA18);

    const minutosTranscurridos = (Date.now() - inicioTiempoA18) / 60000;
    const justificacion = document.getElementById('justificacionA18').value.trim();
    const respuestasValidasCartas = Object.values(respuestasCartasA18).filter(r => r.trim().length >= 15).length;

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A18[0].nombre, descripcion: CRITERIOS_BASE_A18[0].descripcion, nivel: 'cumple' });
    criterios.push({ nombre: CRITERIOS_BASE_A18[1].nombre, descripcion: CRITERIOS_BASE_A18[1].descripcion, nivel: respuestasValidasCartas >= 4 ? 'cumple' : 'no_cumple' });
    criterios.push({ nombre: CRITERIOS_BASE_A18[2].nombre, descripcion: CRITERIOS_BASE_A18[2].descripcion, nivel: instalacionCompletadaA18 ? 'cumple' : 'no_cumple' });
    criterios.push({ nombre: CRITERIOS_BASE_A18[3].nombre, descripcion: CRITERIOS_BASE_A18[3].descripcion, nivel: rechazoOfertaExtraA18 ? 'cumple' : 'no_cumple' });
    criterios.push({ nombre: CRITERIOS_BASE_A18[4].nombre, descripcion: CRITERIOS_BASE_A18[4].descripcion, nivel: justificacion.length >= 20 ? 'cumple' : 'no_cumple' });
    criterios.push({ nombre: CRITERIOS_BASE_A18[5].nombre, descripcion: CRITERIOS_BASE_A18[5].descripcion, nivel: minutosTranscurridos <= tiempoEstimadoA18 * 1.5 ? 'cumple' : 'no_cumple' });
    criterios.push({ nombre: CRITERIOS_BASE_A18[6].nombre, descripcion: CRITERIOS_BASE_A18[6].descripcion, nivel: 'cumple' });

    const pesoUnidad = puntajeMaxA18 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => { if(c.nivel === 'cumple') notaCalculada += pesoUnidad; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA18').classList.add('hidden');
    document.getElementById('vistaResultadoA18').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA18').classList.add('hidden');
    renderListaCotejo('rubricaResultadoA18', criterios, puntajeMaxA18, notaCalculada);

    const proporcionFinalA18 = puntajeMaxA18 > 0 ? notaCalculada / puntajeMaxA18 : 0;
    mostrarLogro(proporcionFinalA18 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA18 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA18 >= 0.8) dispararConfeti();

    const detalleA18 = [
      {
        titulo: 'Sección 1 — Baraja de preguntas',
        items: cartasVolteadasA18.map(id => {
          const p = PREGUNTAS_CARTAS_A18.find(x => x.id === id);
          const respuesta = (respuestasCartasA18[id] || '').trim();
          return { pregunta: p.pregunta, tuRespuesta: respuesta || 'Sin responder', correcta: respuesta.length >= 15 };
        })
      },
      {
        titulo: 'Sección 2 — Instalación guiada de NexaReport',
        items: [
          { pregunta: '¿Completó los 7 pasos de la instalación?', tuRespuesta: instalacionCompletadaA18 ? 'Sí' : 'No', correcta: instalacionCompletadaA18 },
          {
            pregunta: '¿Qué decidió sobre el componente adicional "BuscadorTurbo"?',
            tuRespuesta: rechazoOfertaExtraA18 ? 'Lo desmarcó antes de continuar (correcto)' : 'Lo dejó marcado e instaló el componente adicional',
            correcta: rechazoOfertaExtraA18
          },
          { pregunta: '¿Por qué tomó esa decisión?', tuRespuesta: justificacion || 'Sin responder', correcta: justificacion.length >= 20 }
        ]
      }
    ];
    ultimoResultadoA18 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA18, detalle: detalleA18 };
    renderDesgloseColoreado('resultadoDesgloseA18', detalleA18);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.8',
        ra:'RA1',
        ec:'EC6.1.3',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA18,
        criterios: criterios,
        detalle: detalleA18
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA18').addEventListener('click', () => {
    if(!ultimoResultadoA18) return;
    generarPdfResultado('A.1.8', ultimoResultadoA18.criterios, ultimoResultadoA18.nota, ultimoResultadoA18.puntajeMaximo, 'EC6.1.3', 'RA1', ultimoResultadoA18.detalle);
  });

  document.getElementById('btnVolverMisActA18').addEventListener('click', () => {
    document.getElementById('panelActividadA18').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.8', abrirActividadA18);

// ============================================================================
// A.1.9 — CREAR UN PROYECTO Y CONECTAR UNA BASE DE DATOS EN NEXAREPORT
// ============================================================================
  const PASOS_ORDEN_A19_BASE = [
    { id:1, texto:'Abrir NexaReport y seleccionar "Nuevo proyecto"' },
    { id:2, texto:'Escribir un nombre para el proyecto' },
    { id:3, texto:'Seleccionar "Conectar base de datos"' },
    { id:4, texto:'Ingresar los datos de conexión (servidor, usuario, contraseña)' },
    { id:5, texto:'Elegir la tabla de datos con la que se trabajará' },
    { id:6, texto:'Guardar el proyecto' }
  ];

  const TABLAS_DISPONIBLES_A19 = [
    { codigo:'DB_Ventas', nombre:'Ventas', desc:'Registro de ventas diarias por producto y vendedor' },
    { codigo:'DB_Empleados', nombre:'Empleados', desc:'Información de personal, departamento y salario' },
    { codigo:'DB_Clientes', nombre:'Clientes', desc:'Base de datos de clientes registrados' },
    { codigo:'DB_Inventario', nombre:'Inventario', desc:'Existencias, proveedores y niveles mínimos' },
    { codigo:'DB_Gastos', nombre:'Gastos', desc:'Registro de gastos operativos por departamento' }
  ];

  const CRITERIOS_BASE_A19 = [
    { key:'participacion', nombre:'1. Participación activa', niveles:{ excelente:'Participa activamente desde el inicio de la actividad.', bueno:'Participa la mayor parte del tiempo.', proceso:'Participa de forma limitada o intermitente.', insuficiente:'No participa en la actividad.' } },
    { key:'repaso', nombre:'2. Repaso teórico', niveles:{ excelente:'Ordena los 6 pasos correctamente en el primer o segundo intento.', bueno:'Ordena los 6 pasos correctamente en 3 o 4 intentos.', proceso:'Ordena los 6 pasos correctamente después de varios intentos.', insuficiente:'No logra ordenar los pasos correctamente.' } },
    { key:'proyecto', nombre:'3. Creación del proyecto', niveles:{ excelente:'Crea el proyecto asignándole un nombre adecuado.', bueno:'Crea el proyecto con un nombre genérico o poco descriptivo.', proceso:'Crea el proyecto con dificultad.', insuficiente:'No logra crear el proyecto.' } },
    { key:'conexion', nombre:'4. Conexión a la base de datos', niveles:{ excelente:'Completa la conexión a la base de datos y selecciona una tabla de forma independiente.', bueno:'Completa la conexión con alguna orientación.', proceso:'Completa la conexión con dificultad.', insuficiente:'No logra conectar el proyecto a la base de datos.' } },
    { key:'justificacion', nombre:'5. Justificación', niveles:{ excelente:'Explica con claridad para qué tipo de reporte serviría la tabla elegida.', bueno:'Explica de forma general para qué serviría la tabla.', proceso:'Ofrece una justificación breve o poco clara.', insuficiente:'No justifica su elección.' } },
    { key:'tiempo', nombre:'6. Cumplimiento del tiempo', niveles:{ excelente:'Completa la actividad dentro del tiempo estimado.', bueno:'Completa la actividad con un ligero retraso.', proceso:'Completa la actividad con un retraso considerable.', insuficiente:'Excede ampliamente el tiempo estimado.' } },
    { key:'prolijidad', nombre:'7. Orden y prolijidad', niveles:{ excelente:'Desarrolla la actividad de forma ordenada y completa.', bueno:'Desarrolla la actividad con algunas interrupciones.', proceso:'Desarrolla la actividad de forma desordenada.', insuficiente:'No completa el desarrollo de la actividad.' } }
  ];

  let ordenActualA19 = [];
  let intentosOrdenA19 = 0;
  let arrastrandoIdOrdenA19 = null;
  let nombreProyectoA19 = '';
  let tablaSeleccionadaA19 = null;
  let conexionExitosaA19 = false;
  let proyectoCreadoA19 = false;
  let puntajeMaxA19 = 0;
  let tiempoEstimadoA19 = 10;
  let inicioTiempoA19 = null;
  let timerIntervalA19 = null;
  let ultimoResultadoA19 = null;

  async function abrirActividadA19(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA19 = puntajeMaximo;
    tiempoEstimadoA19 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA19').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA19').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.9') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA19').classList.add('hidden');
        document.getElementById('vistaEjercicioA19').classList.add('hidden');
        document.getElementById('vistaResultadoA19').classList.remove('hidden');
        renderRubricaDescriptiva('rubricaResultadoA19', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA19', previa.detalle);
        ultimoResultadoA19 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA19').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA19').classList.add('hidden');
    document.getElementById('vistaInstrumentoA19').classList.remove('hidden');
    document.getElementById('vistaEjercicioA19').classList.add('hidden');
    document.getElementById('vistaResultadoA19').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA19').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA19} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.9', 'recursosEstudianteA19');

    const criteriosPrevios = CRITERIOS_BASE_A19.map(c => ({ nombre:c.nombre, niveles:c.niveles, nivel:null }));
    renderRubricaDescriptiva('instrumentoPrevioA19', criteriosPrevios, puntajeMaxA19, null);
  }

  document.getElementById('btnBackFromActividadA19').addEventListener('click', () => {
    clearInterval(timerIntervalA19);
    document.getElementById('panelActividadA19').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA19').addEventListener('click', () => {
    ordenActualA19 = barajar(PASOS_ORDEN_A19_BASE).map(p => p.id);
    intentosOrdenA19 = 0;
    nombreProyectoA19 = '';
    tablaSeleccionadaA19 = null;
    conexionExitosaA19 = false;
    proyectoCreadoA19 = false;
    document.getElementById('justificacionA19').value = '';
    document.getElementById('seccionEscritorioA19').classList.add('hidden');
    document.getElementById('seccionFinalA19').classList.add('hidden');
    document.getElementById('btnFinalizarA19').disabled = true;
    document.getElementById('vistaInstrumentoA19').classList.add('hidden');
    document.getElementById('vistaEjercicioA19').classList.remove('hidden');

    pintarOrdenA19();

    inicioTiempoA19 = Date.now();
    clearInterval(timerIntervalA19);
    timerIntervalA19 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA19) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA19').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA19} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Sección 1: ordenar los pasos (arrastrar o con flechas) ----------
  function pintarOrdenA19(){
    const cont = document.getElementById('ordenA19');
    cont.innerHTML = `
      <div class="orden-lista" id="ordenListaA19">
        ${ordenActualA19.map((id, idx) => {
          const p = PASOS_ORDEN_A19_BASE.find(x => x.id === id);
          return `
            <div class="orden-item" draggable="true" data-id="${id}">
              <span class="orden-numero">${idx + 1}</span>
              <span class="orden-texto">${p.texto}</span>
              <span class="orden-flechas">
                <button type="button" class="orden-flecha" data-dir="up" data-id="${id}" ${idx === 0 ? 'disabled' : ''}><i class="fa-solid fa-chevron-up"></i></button>
                <button type="button" class="orden-flecha" data-dir="down" data-id="${id}" ${idx === ordenActualA19.length - 1 ? 'disabled' : ''}><i class="fa-solid fa-chevron-down"></i></button>
              </span>
              <i class="fa-solid fa-grip-lines orden-handle"></i>
            </div>`;
        }).join('')}
      </div>
      <button type="button" class="btn btn-add" id="btnVerificarOrdenA19" style="margin-top:14px;">
        <i class="fa-solid fa-check"></i> Verificar orden
      </button>
      <div id="feedbackOrdenA19"></div>`;

    // Arrastrar con mouse (escritorio)
    const items = document.querySelectorAll('#ordenA19 .orden-item');
    items.forEach(el => {
      el.addEventListener('dragstart', () => { arrastrandoIdOrdenA19 = Number(el.dataset.id); el.classList.add('arrastrando'); });
      el.addEventListener('dragend', () => el.classList.remove('arrastrando'));
      el.addEventListener('dragover', (e) => e.preventDefault());
      el.addEventListener('drop', (e) => {
        e.preventDefault();
        const idDestino = Number(el.dataset.id);
        if(arrastrandoIdOrdenA19 === null || arrastrandoIdOrdenA19 === idDestino) return;
        moverItemOrdenA19(arrastrandoIdOrdenA19, idDestino);
      });
    });

    // Flechas (funcionan igual en escritorio, tablet o celular)
    document.querySelectorAll('#ordenA19 .orden-flecha').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        const idx = ordenActualA19.indexOf(id);
        const nuevoIdx = btn.dataset.dir === 'up' ? idx - 1 : idx + 1;
        if(nuevoIdx < 0 || nuevoIdx >= ordenActualA19.length) return;
        [ordenActualA19[idx], ordenActualA19[nuevoIdx]] = [ordenActualA19[nuevoIdx], ordenActualA19[idx]];
        pintarOrdenA19();
      });
    });

    document.getElementById('btnVerificarOrdenA19').addEventListener('click', manejarVerificarOrdenA19);
  }

  function moverItemOrdenA19(idArrastrado, idDestino){
    const idxOrigen = ordenActualA19.indexOf(idArrastrado);
    const idxDestino = ordenActualA19.indexOf(idDestino);
    ordenActualA19.splice(idxOrigen, 1);
    ordenActualA19.splice(idxDestino, 0, idArrastrado);
    pintarOrdenA19();
  }

  function manejarVerificarOrdenA19(){
    intentosOrdenA19++;
    const correcto = ordenActualA19.every((id, idx) => id === PASOS_ORDEN_A19_BASE[idx].id);
    const feedback = document.getElementById('feedbackOrdenA19');

    if(correcto){
      feedback.innerHTML = `<div class="asistente-feedback"><i class="fa-solid fa-circle-check"></i> ¡Orden correcto! Ya puedes continuar con la Sección 2.</div>`;
      document.querySelectorAll('#ordenA19 .orden-item').forEach(el => el.setAttribute('draggable', 'false'));
      document.querySelectorAll('#ordenA19 .orden-flecha').forEach(btn => btn.disabled = true);
      document.getElementById('btnVerificarOrdenA19').disabled = true;
      document.getElementById('seccionEscritorioA19').classList.remove('hidden');
      pintarEscritorioA19(1);
    } else {
      feedback.innerHTML = `<div class="advertencia-sitio-falso" style="max-width:100%; margin:12px 0 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>Ese orden todavía no es correcto. Vuelve a intentarlo.</div></div>`;
    }
  }

  // ---------- Sección 2: escritorio de NexaReport (crear proyecto + conectar BD) ----------
  function pintarEscritorioA19(paso){
    if(paso === 1){
      pintarVentanaInstaladorSimulado('escritorioNexaA19', 'NexaReport', `
        <p><strong>Bienvenido a NexaReport</strong></p>
        <p>Aún no tienes proyectos. Empieza creando uno nuevo.</p>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA19">＋ Nuevo proyecto</button>
        </div>`);
      document.getElementById('btnPasoA19').addEventListener('click', () => pintarEscritorioA19(2));
    }

    else if(paso === 2){
      pintarVentanaInstaladorSimulado('escritorioNexaA19', 'Nuevo proyecto', `
        <p>Escribe un nombre para tu proyecto:</p>
        <input type="text" id="inputNombreProyectoA19" class="instalador-ruta" style="width:100%; border:1px solid #cbd5e1; font-family:inherit;" placeholder="Ej. Reporte de Ventas TECNOVENTAS" value="${nombreProyectoA19}">
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA19" disabled>Crear proyecto</button>
        </div>`);
      const input = document.getElementById('inputNombreProyectoA19');
      const btn = document.getElementById('btnPasoA19');
      btn.disabled = input.value.trim().length === 0;
      input.addEventListener('input', () => { btn.disabled = input.value.trim().length === 0; });
      btn.addEventListener('click', () => {
        nombreProyectoA19 = input.value.trim();
        pintarEscritorioA19(3);
      });
    }

    else if(paso === 3){
      pintarVentanaInstaladorSimulado('escritorioNexaA19', nombreProyectoA19, `
        <p><strong>Proyecto "${nombreProyectoA19}" creado.</strong></p>
        <p>Este proyecto todavía no tiene ninguna fuente de datos. Conéctalo a una base de datos para poder construir reportes.</p>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA19"><i class="fa-solid fa-database"></i> Conectar base de datos</button>
        </div>`);
      document.getElementById('btnPasoA19').addEventListener('click', () => pintarEscritorioA19(4));
    }

    else if(paso === 4){
      pintarVentanaInstaladorSimulado('escritorioNexaA19', 'Conectar base de datos', `
        <p style="font-size:12.5px; margin-bottom:2px;">Servidor</p>
        <div class="instalador-ruta">servidor-tecnoventas.nexareport.cloud</div>
        <p style="font-size:12.5px; margin-bottom:2px;">Puerto</p>
        <div class="instalador-ruta">5432</div>
        <p style="font-size:12.5px; margin-bottom:2px;">Usuario</p>
        <div class="instalador-ruta">admin_reportes</div>
        <p style="font-size:12.5px; margin-bottom:2px;">Contraseña</p>
        <input type="password" id="inputPasswordA19" class="instalador-ruta" style="width:100%; border:1px solid #cbd5e1; font-family:inherit;" placeholder="Escribe la contraseña...">
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA19" disabled>Conectar</button>
        </div>`);
      const inputPass = document.getElementById('inputPasswordA19');
      const btn = document.getElementById('btnPasoA19');
      inputPass.addEventListener('input', () => { btn.disabled = inputPass.value.trim().length === 0; });
      btn.addEventListener('click', () => {
        conexionExitosaA19 = true;
        pintarEscritorioA19(5);
      });
    }

    else if(paso === 5){
      pintarVentanaInstaladorSimulado('escritorioNexaA19', 'Seleccionar tabla de datos', `
        <p>Conexión exitosa. ¿Con cuál tabla de TECNOVENTAS RD quieres trabajar en este proyecto?</p>
        <div id="tablasDisponiblesA19">
          ${TABLAS_DISPONIBLES_A19.map(t => `
            <div class="instalador-checkbox tabla-opcion-a19" data-codigo="${t.codigo}" style="justify-content:flex-start; cursor:pointer;">
              <span class="caja"></span>
              <div style="text-align:left;"><b>${t.nombre}</b><br><span style="font-size:12px; opacity:.75;">${t.desc}</span></div>
            </div>`).join('')}
        </div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA19" disabled>Usar esta tabla</button>
        </div>`);
      document.querySelectorAll('#tablasDisponiblesA19 .tabla-opcion-a19').forEach(el => {
        el.addEventListener('click', () => {
          document.querySelectorAll('#tablasDisponiblesA19 .tabla-opcion-a19 .caja').forEach(c => c.classList.remove('marcada'));
          el.querySelector('.caja').classList.add('marcada');
          tablaSeleccionadaA19 = el.dataset.codigo;
          document.getElementById('btnPasoA19').disabled = false;
        });
      });
      document.getElementById('btnPasoA19').addEventListener('click', () => pintarEscritorioA19(6));
    }

    else if(paso === 6){
      const tabla = TABLAS_DISPONIBLES_A19.find(t => t.codigo === tablaSeleccionadaA19);
      pintarVentanaInstaladorSimulado('escritorioNexaA19', 'Proyecto listo', `
        <div class="instalador-exito">
          <i class="fa-solid fa-circle-check"></i>
          <p><strong>"${nombreProyectoA19}" está conectado a ${tabla ? tabla.nombre : tablaSeleccionadaA19}</strong></p>
          <p style="margin-top:6px;">Tu proyecto ya está listo para que empieces a construir reportes.</p>
        </div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn primario" id="btnPasoA19">Finalizar</button>
        </div>`);
      document.getElementById('btnPasoA19').addEventListener('click', () => {
        proyectoCreadoA19 = true;
        document.getElementById('seccionFinalA19').classList.remove('hidden');
        document.getElementById('btnFinalizarA19').disabled = false;
      });
    }
  }

  document.getElementById('btnFinalizarA19').addEventListener('click', async () => {
    clearInterval(timerIntervalA19);

    const minutosTranscurridos = (Date.now() - inicioTiempoA19) / 60000;
    const justificacion = document.getElementById('justificacionA19').value.trim();

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A19[0].nombre, niveles: CRITERIOS_BASE_A19[0].niveles, nivel: 'excelente' });

    let nivelRepaso = 'insuficiente';
    if(intentosOrdenA19 <= 2) nivelRepaso = 'excelente';
    else if(intentosOrdenA19 <= 4) nivelRepaso = 'bueno';
    else nivelRepaso = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A19[1].nombre, niveles: CRITERIOS_BASE_A19[1].niveles, nivel: nivelRepaso });

    criterios.push({
      nombre: CRITERIOS_BASE_A19[2].nombre, niveles: CRITERIOS_BASE_A19[2].niveles,
      nivel: (nombreProyectoA19.length >= 6) ? 'excelente' : (nombreProyectoA19.length > 0 ? 'bueno' : 'insuficiente')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A19[3].nombre, niveles: CRITERIOS_BASE_A19[3].niveles,
      nivel: (conexionExitosaA19 && tablaSeleccionadaA19) ? 'excelente' : 'insuficiente'
    });

    let nivelJustificacion = 'insuficiente';
    if(justificacion.length >= 20) nivelJustificacion = 'excelente';
    else if(justificacion.length > 0) nivelJustificacion = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A19[4].nombre, niveles: CRITERIOS_BASE_A19[4].niveles, nivel: nivelJustificacion });

    let nivelTiempo = 'insuficiente';
    if(minutosTranscurridos <= tiempoEstimadoA19) nivelTiempo = 'excelente';
    else if(minutosTranscurridos <= tiempoEstimadoA19 * 1.5) nivelTiempo = 'bueno';
    else if(minutosTranscurridos <= tiempoEstimadoA19 * 2) nivelTiempo = 'proceso';
    criterios.push({ nombre: CRITERIOS_BASE_A19[5].nombre, niveles: CRITERIOS_BASE_A19[5].niveles, nivel: nivelTiempo });

    criterios.push({ nombre: CRITERIOS_BASE_A19[6].nombre, niveles: CRITERIOS_BASE_A19[6].niveles, nivel: 'excelente' });

    const pesoUnidad = puntajeMaxA19 / criterios.length;
    const pesosPorNivel = { excelente:1, bueno:0.75, proceso:0.4, insuficiente:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA19').classList.add('hidden');
    document.getElementById('vistaResultadoA19').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA19').classList.add('hidden');
    renderRubricaDescriptiva('rubricaResultadoA19', criterios, puntajeMaxA19, notaCalculada);

    const proporcionFinalA19 = puntajeMaxA19 > 0 ? notaCalculada / puntajeMaxA19 : 0;
    mostrarLogro(proporcionFinalA19 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA19 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA19 >= 0.8) dispararConfeti();

    const tablaElegida = TABLAS_DISPONIBLES_A19.find(t => t.codigo === tablaSeleccionadaA19);
    const detalleA19 = [
      {
        titulo: 'Sección 1 — Orden de los pasos',
        items: PASOS_ORDEN_A19_BASE.map(p => ({ pregunta: `Paso ${p.id}`, tuRespuesta: p.texto, correcta: true }))
      },
      {
        titulo: 'Sección 2 — Proyecto y conexión a base de datos',
        items: [
          { pregunta: '¿Qué nombre le puso a su proyecto?', tuRespuesta: nombreProyectoA19 || 'Sin nombre', correcta: nombreProyectoA19.length > 0 },
          { pregunta: '¿Completó la conexión a la base de datos?', tuRespuesta: conexionExitosaA19 ? 'Sí' : 'No', correcta: conexionExitosaA19 },
          { pregunta: '¿A qué tabla conectó su proyecto?', tuRespuesta: tablaElegida ? tablaElegida.nombre : 'Ninguna', correcta: !!tablaSeleccionadaA19 },
          { pregunta: '¿Para qué reporte le serviría esa tabla?', tuRespuesta: justificacion || 'Sin responder', correcta: justificacion.length >= 20 }
        ]
      }
    ];
    ultimoResultadoA19 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA19, detalle: detalleA19 };
    renderDesgloseColoreado('resultadoDesgloseA19', detalleA19);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.9',
        ra:'RA1',
        ec:'EC6.1.5',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA19,
        criterios: criterios,
        detalle: detalleA19
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA19').addEventListener('click', () => {
    if(!ultimoResultadoA19) return;
    generarPdfResultado('A.1.9', ultimoResultadoA19.criterios, ultimoResultadoA19.nota, ultimoResultadoA19.puntajeMaximo, 'EC6.1.5', 'RA1', ultimoResultadoA19.detalle);
  });

  document.getElementById('btnVolverMisActA19').addEventListener('click', () => {
    document.getElementById('panelActividadA19').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.9', abrirActividadA19);

// ============================================================================
// A.1.10 — ¿CUÁL ES EL MÉTODO DE ENTREGA CORRECTO? (estudio de caso)
// ============================================================================
  const METODOS_A110 = [
    { id:'impreso', nombre:'Impreso', icono:'🖨️' },
    { id:'pantalla', nombre:'En pantalla', icono:'🖥️' },
    { id:'web', nombre:'Publicación web', icono:'🌐' }
  ];

  const CASOS_A110_BASE = [
    { id:1, escenario:'El departamento de Auditoría Externa solicita el balance general anual de la empresa para verificarlo y firmarlo.', correcto:'impreso', explicacion:'Requiere firma física y es un documento legal formal — el método impreso es el más adecuado.' },
    { id:2, escenario:'El gerente de ventas quiere ver, en tiempo real, cómo van las ventas de hoy mientras camina por el piso de ventas con su tablet.', correcto:'pantalla', explicacion:'Necesita monitoreo en tiempo real e interactividad — un dashboard en pantalla es lo ideal.' },
    { id:3, escenario:'La empresa tiene 5 sucursales en distintas provincias, y todas necesitan consultar el mismo reporte de inventario actualizado constantemente.', correcto:'web', explicacion:'Varias ubicaciones necesitan acceso simultáneo y centralizado — la publicación web es la mejor opción.' },
    { id:4, escenario:'Un cliente externo solicita el reporte financiero trimestral para revisarlo desde su oficina en otra ciudad.', correcto:'web', explicacion:'Es un acceso remoto para alguien externo a la empresa — compartir por publicación web es lo más práctico.' },
    { id:5, escenario:'El director quiere explorar los datos de un evento de ventas navideño, filtrando por región y producto, durante una reunión de análisis.', correcto:'pantalla', explicacion:'Necesita filtrar y explorar los datos de forma interactiva — un dashboard en pantalla permite justo eso.' }
  ];

  const FACTORES_CASO_EXTENDIDO_A110 = [
    { id:1, pregunta:'¿El documento requiere firma física o validación legal?', correcta:true },
    { id:2, pregunta:'¿Los datos necesitan actualizarse en tiempo real?', correcta:false },
    { id:3, pregunta:'¿Será consultado por varias ubicaciones al mismo tiempo?', correcta:false },
    { id:4, pregunta:'¿Se necesita explorar o filtrar los datos de forma interactiva?', correcta:false },
    { id:5, pregunta:'¿Debe conservarse como archivo físico por motivos legales?', correcta:true }
  ];

  const CASO_EXTENDIDO_A110 = {
    escenario: 'TECNOVENTAS RD acaba de cerrar su año fiscal. El departamento de Contabilidad debe presentar el reporte de cierre anual a la Dirección General y, después, entregarlo a la firma de auditores externos para su revisión y aprobación formal. Este reporte no cambia una vez cerrado, y la política de la empresa exige conservar una copia firmada archivada durante al menos 5 años. El equipo de Contabilidad trabaja únicamente desde la oficina principal en Santiago.',
    metodoCorrecto: 'impreso',
    explicacion: 'Requiere firma física, no cambia con el tiempo, se archiva legalmente y solo lo maneja una ubicación — todas las señales apuntan al método impreso.'
  };

  const CRITERIOS_BASE_A110 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación del método correcto', descripcion:'Elige el método de entrega correcto en la mayoría de los 5 casos cortos planteados.' },
    { key:'analisis', nombre:'3. Análisis del caso extenso', descripcion:'Identifica correctamente los factores relevantes del caso extenso antes de decidir.' },
    { key:'decision', nombre:'4. Decisión final del caso extenso', descripcion:'Elige el método de entrega correcto para el caso extenso, con base en su análisis.' },
    { key:'justificacion', nombre:'5. Justificación', descripcion:'Explica con criterio por qué el método elegido era el más adecuado para el caso.' },
    { key:'tiempo', nombre:'6. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'7. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let pasoCasoA110 = 0;
  let respuestasCasosA110 = [];
  let respuestasFactoresA110 = {};
  let metodoFinalElegidoA110 = null;
  let puntajeMaxA110 = 0;
  let tiempoEstimadoA110 = 10;
  let inicioTiempoA110 = null;
  let timerIntervalA110 = null;
  let ultimoResultadoA110 = null;

  async function abrirActividadA110(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA110 = puntajeMaximo;
    tiempoEstimadoA110 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA110').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA110').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.10') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA110').classList.add('hidden');
        document.getElementById('vistaEjercicioA110').classList.add('hidden');
        document.getElementById('vistaResultadoA110').classList.remove('hidden');
        renderRubrica('rubricaResultadoA110', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA110', previa.detalle);
        ultimoResultadoA110 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA110').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA110').classList.add('hidden');
    document.getElementById('vistaInstrumentoA110').classList.remove('hidden');
    document.getElementById('vistaEjercicioA110').classList.add('hidden');
    document.getElementById('vistaResultadoA110').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA110').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA110} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.1.10', 'recursosEstudianteA110');

    const criteriosPrevios = CRITERIOS_BASE_A110.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA110', criteriosPrevios, puntajeMaxA110, null);
  }

  document.getElementById('btnBackFromActividadA110').addEventListener('click', () => {
    clearInterval(timerIntervalA110);
    document.getElementById('panelActividadA110').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA110').addEventListener('click', () => {
    pasoCasoA110 = 0;
    respuestasCasosA110 = [];
    respuestasFactoresA110 = {};
    metodoFinalElegidoA110 = null;
    document.getElementById('justificacionA110').value = '';
    document.getElementById('seccionCasoExtendidoA110').classList.add('hidden');
    document.getElementById('seccionFinalA110').classList.add('hidden');
    document.getElementById('btnFinalizarA110').disabled = true;
    document.getElementById('vistaInstrumentoA110').classList.add('hidden');
    document.getElementById('vistaEjercicioA110').classList.remove('hidden');

    pintarCasoA110();

    inicioTiempoA110 = Date.now();
    clearInterval(timerIntervalA110);
    timerIntervalA110 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA110) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA110').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA110} min aprox.)</span>`;
    }, 1000);
  });

  function pintarCasoA110(){
    const cont = document.getElementById('casosA110');
    actualizarBarraProgreso('progresoA110', pasoCasoA110, CASOS_A110_BASE.length);

    if(pasoCasoA110 >= CASOS_A110_BASE.length){
      cont.innerHTML = `<div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste los 5 casos cortos! Ahora sigue un caso más a fondo.</div>`;
      document.getElementById('seccionCasoExtendidoA110').classList.remove('hidden');
      pintarCasoExtendidoA110();
      return;
    }

    const caso = CASOS_A110_BASE[pasoCasoA110];
    cont.innerHTML = `
      <div class="caso-a110-card">
        <div class="caso-a110-titulo">Caso ${pasoCasoA110 + 1} de ${CASOS_A110_BASE.length}</div>
        <div class="caso-a110-escenario">${caso.escenario}</div>
        <div class="metodos-a110-opciones">
          ${METODOS_A110.map(m => `
            <button type="button" class="metodo-a110-btn" data-id="${m.id}">
              <span class="metodo-a110-icono">${m.icono}</span>
              <span>${m.nombre}</span>
            </button>
          `).join('')}
        </div>
        <div id="feedbackCasoA110"></div>
      </div>`;

    document.querySelectorAll('#casosA110 .metodo-a110-btn').forEach(btn => {
      btn.addEventListener('click', () => manejarRespuestaCasoA110(btn.dataset.id, caso));
    });
  }

  function manejarRespuestaCasoA110(elegido, caso){
    const correcta = elegido === caso.correcto;
    respuestasCasosA110.push({
      escenario: caso.escenario,
      tuRespuesta: METODOS_A110.find(m => m.id === elegido).nombre,
      correcta,
      respuestaCorrecta: METODOS_A110.find(m => m.id === caso.correcto).nombre + ' — ' + caso.explicacion
    });

    document.querySelectorAll('#casosA110 .metodo-a110-btn').forEach(btn => {
      btn.disabled = true;
      if(btn.dataset.id === caso.correcto) btn.classList.add('correcta-marcada');
      else if(btn.dataset.id === elegido) btn.classList.add('incorrecta-marcada');
    });

    document.getElementById('feedbackCasoA110').innerHTML = `
      <div class="asistente-feedback ${correcta ? '' : 'feedback-incorrecto'}">
        <i class="fa-solid ${correcta ? 'fa-circle-check' : 'fa-circle-info'}"></i>
        ${correcta ? '¡Correcto!' : 'No exactamente.'} ${caso.explicacion}
      </div>
      <button type="button" class="btn btn-primary" id="btnSiguienteCasoA110" style="width:auto; padding:10px 22px; margin-top:14px;">
        Siguiente caso <i class="fa-solid fa-arrow-right"></i>
      </button>`;

    document.getElementById('btnSiguienteCasoA110').addEventListener('click', () => {
      pasoCasoA110++;
      pintarCasoA110();
    });
  }

  // ---------- Sección 2: caso extenso con matriz de decisión ----------
  function pintarCasoExtendidoA110(){
    const cont = document.getElementById('casoExtendidoA110');
    cont.innerHTML = `
      <div class="caso-a110-card" style="max-width:680px;">
        <div class="caso-a110-escenario">${CASO_EXTENDIDO_A110.escenario}</div>
        <div class="matriz-factores-a110">
          ${FACTORES_CASO_EXTENDIDO_A110.map(f => `
            <div class="factor-a110-item" data-id="${f.id}">
              <div class="factor-a110-pregunta">${f.pregunta}</div>
              <div class="factor-a110-botones">
                <button type="button" class="factor-a110-btn" data-id="${f.id}" data-valor="si">Sí</button>
                <button type="button" class="factor-a110-btn" data-id="${f.id}" data-valor="no">No</button>
              </div>
            </div>
          `).join('')}
        </div>
        <div id="zonaMetodoExtendidoA110"></div>
      </div>`;

    document.querySelectorAll('#casoExtendidoA110 .factor-a110-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        respuestasFactoresA110[id] = btn.dataset.valor === 'si';
        document.querySelectorAll(`.factor-a110-btn[data-id="${id}"]`).forEach(b => b.classList.remove('seleccionado'));
        btn.classList.add('seleccionado');

        if(Object.keys(respuestasFactoresA110).length === FACTORES_CASO_EXTENDIDO_A110.length && !document.getElementById('btnConfirmarAnalisisA110')){
          document.getElementById('zonaMetodoExtendidoA110').innerHTML = `
            <button type="button" class="btn btn-add" id="btnConfirmarAnalisisA110" style="margin-top:16px;">
              <i class="fa-solid fa-check"></i> Confirmar análisis y elegir método
            </button>`;
          document.getElementById('btnConfirmarAnalisisA110').addEventListener('click', mostrarSeleccionMetodoExtendidoA110);
        }
      });
    });
  }

  function mostrarSeleccionMetodoExtendidoA110(){
    document.querySelectorAll('#casoExtendidoA110 .factor-a110-btn').forEach(b => b.disabled = true);
    document.getElementById('zonaMetodoExtendidoA110').innerHTML = `
      <div class="metodos-a110-opciones" style="margin-top:16px;">
        ${METODOS_A110.map(m => `
          <button type="button" class="metodo-a110-btn" data-id="${m.id}">
            <span class="metodo-a110-icono">${m.icono}</span>
            <span>${m.nombre}</span>
          </button>
        `).join('')}
      </div>
      <div id="feedbackCasoExtendidoA110"></div>`;

    document.querySelectorAll('#zonaMetodoExtendidoA110 .metodo-a110-btn').forEach(btn => {
      btn.addEventListener('click', () => manejarMetodoFinalA110(btn.dataset.id));
    });
  }

  function manejarMetodoFinalA110(elegido){
    metodoFinalElegidoA110 = elegido;
    const correcta = elegido === CASO_EXTENDIDO_A110.metodoCorrecto;

    document.querySelectorAll('#zonaMetodoExtendidoA110 .metodo-a110-btn').forEach(btn => {
      btn.disabled = true;
      if(btn.dataset.id === CASO_EXTENDIDO_A110.metodoCorrecto) btn.classList.add('correcta-marcada');
      else if(btn.dataset.id === elegido) btn.classList.add('incorrecta-marcada');
    });

    document.getElementById('feedbackCasoExtendidoA110').innerHTML = `
      <div class="asistente-feedback ${correcta ? '' : 'feedback-incorrecto'}">
        <i class="fa-solid ${correcta ? 'fa-circle-check' : 'fa-circle-info'}"></i>
        ${correcta ? '¡Correcto!' : 'No exactamente.'} ${CASO_EXTENDIDO_A110.explicacion}
      </div>
      <button type="button" class="btn btn-primary" id="btnContinuarJustificacionA110" style="width:auto; padding:10px 22px; margin-top:14px;">
        Continuar <i class="fa-solid fa-arrow-right"></i>
      </button>`;

    document.getElementById('btnContinuarJustificacionA110').addEventListener('click', () => {
      document.getElementById('seccionFinalA110').classList.remove('hidden');
      document.getElementById('btnFinalizarA110').disabled = false;
    });
  }

  document.getElementById('btnFinalizarA110').addEventListener('click', async () => {
    clearInterval(timerIntervalA110);

    const minutosTranscurridos = (Date.now() - inicioTiempoA110) / 60000;
    const justificacion = document.getElementById('justificacionA110').value.trim();
    const aciertosCasos = respuestasCasosA110.filter(r => r.correcta).length;
    const aciertosFactores = FACTORES_CASO_EXTENDIDO_A110.filter(f => respuestasFactoresA110[f.id] === f.correcta).length;
    const decisionExtendidaCorrecta = metodoFinalElegidoA110 === CASO_EXTENDIDO_A110.metodoCorrecto;

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A110[0].nombre, descripcion: CRITERIOS_BASE_A110[0].descripcion, nivel: 'logrado' });

    criterios.push({
      nombre: CRITERIOS_BASE_A110[1].nombre, descripcion: CRITERIOS_BASE_A110[1].descripcion,
      nivel: aciertosCasos >= 4 ? 'logrado' : (aciertosCasos >= 3 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A110[2].nombre, descripcion: CRITERIOS_BASE_A110[2].descripcion,
      nivel: aciertosFactores >= 4 ? 'logrado' : (aciertosFactores >= 3 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A110[3].nombre, descripcion: CRITERIOS_BASE_A110[3].descripcion,
      nivel: decisionExtendidaCorrecta ? 'logrado' : 'no_logrado'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A110[4].nombre, descripcion: CRITERIOS_BASE_A110[4].descripcion,
      nivel: justificacion.length >= 20 ? 'logrado' : (justificacion.length > 0 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A110[5].nombre, descripcion: CRITERIOS_BASE_A110[5].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA110 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA110 * 2 ? 'proceso' : 'no_logrado')
    });

    criterios.push({ nombre: CRITERIOS_BASE_A110[6].nombre, descripcion: CRITERIOS_BASE_A110[6].descripcion, nivel: 'logrado' });

    const pesoUnidad = puntajeMaxA110 / criterios.length;
    const pesosPorNivel = { logrado:1, proceso:0.5, no_logrado:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA110').classList.add('hidden');
    document.getElementById('vistaResultadoA110').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA110').classList.add('hidden');
    renderRubrica('rubricaResultadoA110', criterios, puntajeMaxA110, notaCalculada);

    const proporcionFinalA110 = puntajeMaxA110 > 0 ? notaCalculada / puntajeMaxA110 : 0;
    mostrarLogro(proporcionFinalA110 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA110 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA110 >= 0.8) dispararConfeti();

    const detalleA110 = [
      { titulo: 'Sección 1 — Casos empresariales cortos', items: respuestasCasosA110 },
      {
        titulo: 'Sección 2 — Caso extenso: análisis de factores',
        items: FACTORES_CASO_EXTENDIDO_A110.map(f => ({
          pregunta: f.pregunta,
          tuRespuesta: respuestasFactoresA110[f.id] ? 'Sí' : 'No',
          correcta: respuestasFactoresA110[f.id] === f.correcta,
          respuestaCorrecta: f.correcta ? 'Sí' : 'No'
        }))
      },
      {
        titulo: 'Sección 2 — Caso extenso: decisión final',
        items: [{
          pregunta: '¿Qué método eligió para el caso extenso?',
          tuRespuesta: metodoFinalElegidoA110 ? METODOS_A110.find(m => m.id === metodoFinalElegidoA110).nombre : 'Sin responder',
          correcta: decisionExtendidaCorrecta,
          respuestaCorrecta: METODOS_A110.find(m => m.id === CASO_EXTENDIDO_A110.metodoCorrecto).nombre + ' — ' + CASO_EXTENDIDO_A110.explicacion
        }]
      },
      {
        titulo: 'Justificación',
        items: [{ pregunta: '¿Por qué ese método era el más adecuado?', tuRespuesta: justificacion || 'Sin responder', correcta: justificacion.length >= 20 }]
      }
    ];
    ultimoResultadoA110 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA110, detalle: detalleA110 };
    renderDesgloseColoreado('resultadoDesgloseA110', detalleA110);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.10',
        ra:'RA1',
        ec:'EC6.1.5',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA110,
        criterios: criterios,
        detalle: detalleA110
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA110').addEventListener('click', () => {
    if(!ultimoResultadoA110) return;
    generarPdfResultado('A.1.10', ultimoResultadoA110.criterios, ultimoResultadoA110.nota, ultimoResultadoA110.puntajeMaximo, 'EC6.1.5', 'RA1', ultimoResultadoA110.detalle);
  });

  document.getElementById('btnVolverMisActA110').addEventListener('click', () => {
    document.getElementById('panelActividadA110').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.10', abrirActividadA110);
