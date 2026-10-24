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
  let vistaCaminoA12 = null; // paso que se está repasando (null = el paso actual)
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
    vistaCaminoA12 = null;
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

    // Paso que se muestra: el actual, o uno anterior si el estudiante está repasando
    let idxVista = (vistaCaminoA12 === null || vistaCaminoA12 > pasoCaminoA12) ? pasoCaminoA12 : vistaCaminoA12;
    if(idxVista < 0) idxVista = 0;
    const repasando = idxVista < pasoCaminoA12;

    if(idxVista >= PERSONAJES_A12.length){
      cont.innerHTML = `
        <div class="camino-wrap">
          <div class="camino-progreso">${nodosHtml}</div>
          <div class="camino-tarjeta">
            <div class="camino-avatar">🎉</div>
            <div style="flex:1;">
              <div class="camino-completa-msg"><i class="fa-solid fa-circle-check"></i> ¡Completaste el camino! Ya puedes continuar con la Sección 2.</div>
              ${htmlNavPasos_('navCaminoA12', true, false)}
            </div>
          </div>
        </div>`;
      document.getElementById('navCaminoA12Anterior').addEventListener('click', () => {
        vistaCaminoA12 = PERSONAJES_A12.length - 1;
        pintarCaminoA12();
      });
      document.getElementById('seccion2A12').classList.remove('hidden');
      actualizarBotonFinalizarA12();
      return;
    }

    const p = PERSONAJES_A12[idxVista];
    const yaResuelto = respuestasCaminoA12[idxVista] !== undefined;

    cont.innerHTML = `
      <div class="camino-wrap">
        <div class="camino-progreso">${nodosHtml}</div>
        <div class="camino-tarjeta">
          <div class="camino-avatar">${p.avatar}</div>
          <div style="flex:1;">
            ${repasando ? HTML_AVISO_REPASO_ : ''}
            <div class="camino-nombre-personaje">${p.nombre}</div>
            <div class="camino-burbuja">${p.pregunta}</div>
            <div class="asistente-opciones">
              ${p.opciones.map((op, i) => `
                <button type="button" class="asistente-opcion camino-opcion" data-opcion="${i}" ${yaResuelto ? 'disabled' : ''}>${op}</button>
              `).join('')}
            </div>
            <div id="caminoFeedbackA12"></div>
            ${repasando
              ? htmlNavPasos_('navCaminoA12', idxVista > 0, true)
              : `<div class="nav-pasos">
                  ${idxVista > 0 ? '<button type="button" class="btn-nav-paso" id="navCaminoA12Anterior"><i class="fa-solid fa-arrow-left"></i> Anterior</button>' : ''}
                  ${yaResuelto ? '<button type="button" class="btn btn-primary" id="btnSiguientePersonajeA12" style="width:auto; padding:10px 22px;">Siguiente <i class="fa-solid fa-arrow-right"></i></button>' : ''}
                </div>`}
          </div>
        </div>
      </div>`;

    if(yaResuelto){
      const idxCorrecta = p.correctaIdx;
      const btnCorrecta = document.querySelector(`#caminoA12 .camino-opcion[data-opcion="${idxCorrecta}"]`);
      if(btnCorrecta) btnCorrecta.classList.add('correcta-marcada');
      document.getElementById('caminoFeedbackA12').innerHTML =
        `<div class="asistente-feedback"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Esa es: <b>${p.opciones[idxCorrecta]}</b>.</div>`;
    } else {
      document.querySelectorAll('#caminoA12 .camino-opcion').forEach(btn => {
        btn.addEventListener('click', () => manejarOpcionCaminoA12(Number(btn.dataset.opcion), btn));
      });
    }

    const btnAnterior = document.getElementById('navCaminoA12Anterior');
    if(btnAnterior) btnAnterior.addEventListener('click', () => {
      vistaCaminoA12 = idxVista - 1;
      pintarCaminoA12();
    });

    if(repasando){
      document.getElementById('navCaminoA12Siguiente').addEventListener('click', () => {
        vistaCaminoA12 = (idxVista + 1 >= pasoCaminoA12) ? null : idxVista + 1;
        pintarCaminoA12();
      });
    } else if(yaResuelto){
      document.getElementById('btnSiguientePersonajeA12').addEventListener('click', () => {
        pasoCaminoA12++;
        vistaCaminoA12 = null;
        pintarCaminoA12();
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
// A.1.5 — CUADRO COMPARATIVO DE PROGRAMAS GENERADORES
// ============================================================================
  // Contenido anclado a lo investigado en el WebQuest en pares (4 programas
  // generadores reales). El estudiante elige los 2 programas que le tocó
  // investigar y completa una tabla comparativa con las preguntas guía del
  // recurso de apoyo.
  const PROGRAMAS_DISPONIBLES_A15 = ['Microsoft Power BI', 'Google Looker Studio', 'SAP Crystal Reports', 'JasperReports'];

  const PREGUNTAS_TABLA_A15 = [
    '¿Quién desarrolla el programa?',
    '¿Es gratuito, de pago, o tiene ambas versiones?',
    '¿A qué tipo de fuentes de datos se puede conectar?',
    '¿Qué tipo de empresa se beneficiaría más de este programa? (pequeña, mediana, grande)',
    'Menciona 2 características que destaquen según la fuente consultada',
    '¿En qué se diferencia del otro programa que investigaron?'
  ];

  // Las 3 primeras preguntas son de hecho (respuesta objetiva por programa) y se pueden validar
  // contra palabras clave esperadas. Las 3 últimas son de opinión/análisis — ahí no hay una única
  // respuesta correcta, así que en vez de verificar contenido exacto se exige que sea una
  // respuesta sustancial (varias palabras reales), para filtrar texto sin sentido.
  const PALABRAS_CLAVE_A15 = {
    'Microsoft Power BI': {
      0: ['microsoft'],
      1: ['gratis', 'gratuito', 'pago', 'premium', 'pro', 'freemium', 'ambas'],
      2: ['excel', 'sql', 'azure', 'microsoft 365', 'sharepoint', 'nube', 'base de datos', 'office']
    },
    'Google Looker Studio': {
      0: ['google'],
      1: ['gratis', 'gratuito', 'free'],
      2: ['analytics', 'google ads', 'ads', 'sheets', 'bigquery']
    },
    'SAP Crystal Reports': {
      0: ['sap'],
      1: ['pago', 'licencia', 'comercial'],
      2: ['sql', 'oracle', 'base de datos', 'odbc', 'excel']
    },
    'JasperReports': {
      0: ['jaspersoft', 'tibco', 'codigo abierto', 'open source'],
      1: ['gratis', 'gratuito', 'open source', 'codigo abierto', 'libre', 'ambas'],
      2: ['java', 'jdbc', 'base de datos', 'xml', 'mysql']
    }
  };

  function normalizarTextoA15_(t){
    return String(t || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  // Cuenta palabras que parecen "de verdad" (solo letras, 3+ caracteres) — sirve para detectar
  // texto sin sentido tipo "asdkjaskjd" en las preguntas de opinión, que no tienen una única
  // respuesta correcta contra la cual comparar.
  function contarPalabrasRealesA15_(texto){
    const normalizado = normalizarTextoA15_(texto);
    const palabras = normalizado.split(/\s+/).filter(p => /^[a-zñ]{3,}$/.test(p));
    return palabras.length;
  }

  // Evalúa si la respuesta de una celda es válida: para las preguntas 1-3 (de hecho) exige que
  // aparezca alguna palabra clave esperada para ESE programa específico; para las preguntas 4-6
  // (de opinión) exige una cantidad mínima de palabras reales, ya que no hay una única respuesta
  // correcta que verificar.
  function evaluarRespuestaA15(texto, programa, indicePregunta){
    const respuesta = (texto || '').trim();
    if(!respuesta) return false;

    const clavesPrograma = PALABRAS_CLAVE_A15[programa];
    if(clavesPrograma && clavesPrograma[indicePregunta]){
      const normalizado = normalizarTextoA15_(respuesta);
      return clavesPrograma[indicePregunta].some(clave => normalizado.includes(normalizarTextoA15_(clave)));
    }
    // Preguntas de opinión (índices 3, 4, 5): sin palabra clave única, se exige sustancia real
    return contarPalabrasRealesA15_(respuesta) >= 4;
  }

  const CRITERIOS_BASE_A15 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'seleccion', nombre:'2. Selección de los 2 programas', descripcion:'Elige 2 programas distintos para comparar en la tabla.' },
    { key:'programa1', nombre:'3. Respuestas correctas — Programa 1', descripcion:'Responde con información correcta las preguntas de la tabla para el primer programa.' },
    { key:'programa2', nombre:'4. Respuestas correctas — Programa 2', descripcion:'Responde con información correcta las preguntas de la tabla para el segundo programa.' },
    { key:'diferencia', nombre:'5. Identifica la diferencia entre ambos', descripcion:'Explica con claridad en qué se diferencian los dos programas investigados.' },
    { key:'tiempo', nombre:'6. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'7. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let programa1A15 = '';
  let programa2A15 = '';
  let respuestasTablaA15 = {}; // { [indicePregunta]: { p1: texto, p2: texto } }
  let ultimoResultadoA15 = null;
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
    programa1A15 = '';
    programa2A15 = '';
    respuestasTablaA15 = {};
    document.getElementById('btnFinalizarA15').disabled = true;
    document.getElementById('vistaInstrumentoA15').classList.add('hidden');
    document.getElementById('vistaEjercicioA15').classList.remove('hidden');

    pintarTablaComparativaA15();

    inicioTiempoA15 = Date.now();
    clearInterval(timerIntervalA15);
    timerIntervalA15 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA15) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA15').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA15} min aprox.)</span>`;
    }, 1000);
  });

  function pintarTablaComparativaA15(){
    const selectP1 = document.getElementById('selectPrograma1A15');
    const selectP2 = document.getElementById('selectPrograma2A15');
    const opcionesHtml = '<option value="">Selecciona el programa...</option>' +
      PROGRAMAS_DISPONIBLES_A15.map(p => `<option value="${p}">${p}</option>`).join('');
    selectP1.innerHTML = opcionesHtml;
    selectP2.innerHTML = opcionesHtml;

    selectP1.addEventListener('change', () => { programa1A15 = selectP1.value; actualizarEstadoFinalizarA15(); });
    selectP2.addEventListener('change', () => { programa2A15 = selectP2.value; actualizarEstadoFinalizarA15(); });

    const tbody = document.getElementById('tablaComparativaBodyA15');
    tbody.innerHTML = PREGUNTAS_TABLA_A15.map((pregunta, i) => `
      <tr>
        <td>${pregunta}</td>
        <td><textarea class="celda-respuesta-a15" data-pregunta="${i}" data-programa="1" rows="2"></textarea></td>
        <td><textarea class="celda-respuesta-a15" data-pregunta="${i}" data-programa="2" rows="2"></textarea></td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.celda-respuesta-a15').forEach(campo => {
      campo.addEventListener('input', () => {
        const i = Number(campo.dataset.pregunta);
        const prog = campo.dataset.programa;
        if(!respuestasTablaA15[i]) respuestasTablaA15[i] = { p1:'', p2:'' };
        respuestasTablaA15[i][prog === '1' ? 'p1' : 'p2'] = campo.value;
        actualizarEstadoFinalizarA15();
      });
    });
  }

  function actualizarEstadoFinalizarA15(){
    const programasValidos = programa1A15 && programa2A15 && programa1A15 !== programa2A15;
    const todasLasCeldasLlenas = PREGUNTAS_TABLA_A15.every((_, i) =>
      (respuestasTablaA15[i] && respuestasTablaA15[i].p1 || '').trim().length > 0 && (respuestasTablaA15[i] && respuestasTablaA15[i].p2 || '').trim().length > 0
    );
    document.getElementById('btnFinalizarA15').disabled = !(programasValidos && todasLasCeldasLlenas);
  }

  document.getElementById('btnFinalizarA15').addEventListener('click', async () => {
    clearInterval(timerIntervalA15);

    const minutosTranscurridos = (Date.now() - inicioTiempoA15) / 60000;
    const respuestasP1Correctas = PREGUNTAS_TABLA_A15.filter((_, i) => evaluarRespuestaA15((respuestasTablaA15[i] && respuestasTablaA15[i].p1), programa1A15, i)).length;
    const respuestasP2Correctas = PREGUNTAS_TABLA_A15.filter((_, i) => evaluarRespuestaA15((respuestasTablaA15[i] && respuestasTablaA15[i].p2), programa2A15, i)).length;
    const indiceDiferencia = PREGUNTAS_TABLA_A15.length - 1;
    const diferenciaCompleta = evaluarRespuestaA15((respuestasTablaA15[indiceDiferencia] && respuestasTablaA15[indiceDiferencia].p1), programa1A15, indiceDiferencia) &&
      evaluarRespuestaA15((respuestasTablaA15[indiceDiferencia] && respuestasTablaA15[indiceDiferencia].p2), programa2A15, indiceDiferencia);

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A15[0].nombre, descripcion: CRITERIOS_BASE_A15[0].descripcion, nivel: 'cumple' });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[1].nombre, descripcion: CRITERIOS_BASE_A15[1].descripcion,
      nivel: (programa1A15 && programa2A15 && programa1A15 !== programa2A15) ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[2].nombre, descripcion: CRITERIOS_BASE_A15[2].descripcion,
      nivel: respuestasP1Correctas >= PREGUNTAS_TABLA_A15.length - 1 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[3].nombre, descripcion: CRITERIOS_BASE_A15[3].descripcion,
      nivel: respuestasP2Correctas >= PREGUNTAS_TABLA_A15.length - 1 ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[4].nombre, descripcion: CRITERIOS_BASE_A15[4].descripcion,
      nivel: diferenciaCompleta ? 'cumple' : 'no_cumple'
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A15[5].nombre, descripcion: CRITERIOS_BASE_A15[5].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA15 * 1.5 ? 'cumple' : 'no_cumple'
    });

    criterios.push({ nombre: CRITERIOS_BASE_A15[6].nombre, descripcion: CRITERIOS_BASE_A15[6].descripcion, nivel: 'cumple' });

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
        titulo: `Programa 1 — ${programa1A15}`,
        items: PREGUNTAS_TABLA_A15.map((pregunta, i) => ({
          pregunta,
          tuRespuesta: (respuestasTablaA15[i] && respuestasTablaA15[i].p1) || 'Sin responder',
          correcta: evaluarRespuestaA15((respuestasTablaA15[i] && respuestasTablaA15[i].p1), programa1A15, i)
        }))
      },
      {
        titulo: `Programa 2 — ${programa2A15}`,
        items: PREGUNTAS_TABLA_A15.map((pregunta, i) => ({
          pregunta,
          tuRespuesta: (respuestasTablaA15[i] && respuestasTablaA15[i].p2) || 'Sin responder',
          correcta: evaluarRespuestaA15((respuestasTablaA15[i] && respuestasTablaA15[i].p2), programa2A15, i)
        }))
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
    document.getElementById('historialDadoA16').innerHTML = '';
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
      pintarHistorialDadoA16();

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

  // Repaso de las preguntas ya respondidas en tiradas anteriores (solo lectura)
  function pintarHistorialDadoA16(){
    const cont = document.getElementById('historialDadoA16');
    if(respuestasDadoA16.length === 0){ cont.innerHTML = ''; return; }
    cont.innerHTML = `
      <details class="historial-repaso">
        <summary><i class="fa-solid fa-clock-rotate-left"></i> Repasar mis respuestas anteriores (${respuestasDadoA16.length})</summary>
        <div class="historial-repaso-lista">
          ${respuestasDadoA16.map((r, i) => `
            <div class="esquema-zona ${r.correcta ? 'correcto' : 'incorrecto'}">
              <div style="flex:1;">
                <div class="esquema-zona-tag">${i + 1}. ${r.pregunta}</div>
                <div class="esquema-zona-slot">
                  <span class="esquema-zona-etiqueta">Tu respuesta: ${r.tuRespuesta}</span>
                  ${!r.correcta ? `<div style="margin-top:6px; font-size:12.5px; opacity:.8;">Correcta: ${r.respuestaCorrecta}</div>` : ''}
                </div>
              </div>
              <i class="fa-solid ${r.correcta ? 'fa-check' : 'fa-xmark'}"></i>
            </div>`).join('')}
        </div>
      </details>`;
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
  let vistaCaminoA17 = null; // paso que se está repasando (null = el paso actual)
  let navegadorIniciadoA17 = false;
  let respuestasCaminoA17 = [];
  let intentosCaminoA17 = [];
  let intentosSitioA17 = 0;
  let descargaCompletadaA17 = false;
  let puntajeMaxA17 = 0;
  let tiempoEstimadoA17 = 10;
  let inicioTiempoA17 = null;
  let timerIntervalA17 = null;
  let ultimoResultadoA17 = null;
  let ultimoTerminoBuscadoA17 = '';

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
    vistaCaminoA17 = null;
    navegadorIniciadoA17 = false;
    respuestasCaminoA17 = [];
    intentosCaminoA17 = [];
    intentosSitioA17 = 0;
    descargaCompletadaA17 = false;
    ultimoTerminoBuscadoA17 = '';
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

    // Paso que se muestra: el actual, o uno anterior si el estudiante está repasando
    let idxVista = (vistaCaminoA17 === null || vistaCaminoA17 > pasoCaminoA17) ? pasoCaminoA17 : vistaCaminoA17;
    if(idxVista < 0) idxVista = 0;
    const repasando = idxVista < pasoCaminoA17;

    if(idxVista >= PERSONAJES_A17.length){
      cont.innerHTML = `
        <div class="camino-wrap">
          <div class="camino-progreso">${nodosHtml}</div>
          <div class="camino-tarjeta">
            <div class="camino-avatar">🎉</div>
            <div style="flex:1;">
              <div class="camino-completa-msg"><i class="fa-solid fa-circle-check"></i> ¡Completaste el repaso! Ya puedes continuar con la Sección 2.</div>
              ${htmlNavPasos_('navCaminoA17', true, false)}
            </div>
          </div>
        </div>`;
      document.getElementById('navCaminoA17Anterior').addEventListener('click', () => {
        vistaCaminoA17 = PERSONAJES_A17.length - 1;
        pintarCaminoA17();
      });
      document.getElementById('seccionNavegadorA17').classList.remove('hidden');
      // El buscador se dibuja una sola vez, para no reiniciarlo si el estudiante vuelve a repasar
      if(!navegadorIniciadoA17){
        navegadorIniciadoA17 = true;
        pintarBuscadorA17();
      }
      return;
    }

    const p = PERSONAJES_A17[idxVista];
    const yaResuelto = respuestasCaminoA17[idxVista] !== undefined;

    cont.innerHTML = `
      <div class="camino-wrap">
        <div class="camino-progreso">${nodosHtml}</div>
        <div class="camino-tarjeta">
          <div class="camino-avatar">${p.avatar}</div>
          <div style="flex:1;">
            ${repasando ? HTML_AVISO_REPASO_ : ''}
            <div class="camino-nombre-personaje">${p.nombre}</div>
            <div class="camino-burbuja">${p.pregunta}</div>
            <div class="asistente-opciones">
              ${p.opciones.map((op, i) => `
                <button type="button" class="asistente-opcion camino-opcion" data-opcion="${i}" ${yaResuelto ? 'disabled' : ''}>${op}</button>
              `).join('')}
            </div>
            <div id="caminoFeedbackA17"></div>
            ${repasando
              ? htmlNavPasos_('navCaminoA17', idxVista > 0, true)
              : `<div class="nav-pasos">
                  ${idxVista > 0 ? '<button type="button" class="btn-nav-paso" id="navCaminoA17Anterior"><i class="fa-solid fa-arrow-left"></i> Anterior</button>' : ''}
                  ${yaResuelto ? '<button type="button" class="btn btn-primary" id="btnSiguientePersonajeA17" style="width:auto; padding:10px 22px;">Siguiente <i class="fa-solid fa-arrow-right"></i></button>' : ''}
                </div>`}
          </div>
        </div>
      </div>`;

    if(yaResuelto){
      const idxCorrecta = p.correctaIdx;
      const btnCorrecta = document.querySelector(`#caminoA17 .camino-opcion[data-opcion="${idxCorrecta}"]`);
      if(btnCorrecta) btnCorrecta.classList.add('correcta-marcada');
      document.getElementById('caminoFeedbackA17').innerHTML =
        `<div class="asistente-feedback"><i class="fa-solid fa-circle-check"></i> ¡Correcto! ${p.opciones[idxCorrecta]}</div>`;
    } else {
      document.querySelectorAll('#caminoA17 .camino-opcion').forEach(btn => {
        btn.addEventListener('click', () => manejarOpcionCaminoA17(Number(btn.dataset.opcion), btn));
      });
    }

    const btnAnterior = document.getElementById('navCaminoA17Anterior');
    if(btnAnterior) btnAnterior.addEventListener('click', () => {
      vistaCaminoA17 = idxVista - 1;
      pintarCaminoA17();
    });

    if(repasando){
      document.getElementById('navCaminoA17Siguiente').addEventListener('click', () => {
        vistaCaminoA17 = (idxVista + 1 >= pasoCaminoA17) ? null : idxVista + 1;
        pintarCaminoA17();
      });
    } else if(yaResuelto){
      document.getElementById('btnSiguientePersonajeA17').addEventListener('click', () => {
        pasoCaminoA17++;
        vistaCaminoA17 = null;
        pintarCaminoA17();
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
  // Antes de ver resultados, el estudiante ve solo el cuadro de búsqueda (como un
  // buscador real) y debe escribir algo relacionado a "descargar NexaReport".
  function pintarBuscadorA17(){
    pintarBuscadorSimulado('ventanaNavegadorA17', {
      dominio: 'buscador.com',
      placeholder: 'Buscar en buscador.com',
      onBuscar: (texto, { mostrarError }) => {
        const limpio = texto.toLowerCase();
        if(!limpio.includes('nexareport')){
          mostrarError('Tu búsqueda debe incluir el nombre del programa. Prueba con algo como "descargar NexaReport".');
          return;
        }
        pintarResultadosBusquedaA17(texto);
      }
    });
  }

  function pintarResultadosBusquedaA17(terminoBuscado){
    const resultadosHTML = barajar(RESULTADOS_BUSQUEDA_A17).map(r => `
      <div class="resultado-busqueda" data-id="${r.id}">
        <div class="resultado-url"><i class="fa-solid fa-globe"></i> ${r.url} ${r.esAnuncio ? '<span class="badge-anuncio">Anuncio</span>' : ''}</div>
        <div class="resultado-titulo">${r.titulo}</div>
        <div class="resultado-desc">${r.desc}</div>
      </div>
    `).join('');

    const termino = (terminoBuscado || ultimoTerminoBuscadoA17 || 'descargar nexareport').trim();
    ultimoTerminoBuscadoA17 = termino;
    const q = encodeURIComponent(termino).replace(/%20/g, '+');
    pintarVentanaNavegadorSimulado('ventanaNavegadorA17', `buscador.com/busqueda?q=${q}`, resultadosHTML);

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
    document.getElementById('btnVolverResultadosA17').addEventListener('click', () => pintarResultadosBusquedaA17());
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA18">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Siguiente ›</button>
        </div>`);
      document.getElementById('btnAtrasA18').addEventListener('click', () => pintarPasoA18(1));
      document.getElementById('btnPasoA18').addEventListener('click', () => pintarPasoA18(3));
    }

    else if(paso === 3){
      pintarVentanaInstaladorSimulado('ventanaInstaladorA18', 'Acuerdo de licencia', `
        <div class="instalador-ruta" style="max-height:70px; overflow:hidden;">Términos de uso de NexaReport... Este software se proporciona "tal cual", sin garantías de ningún tipo...</div>
        <div class="instalador-checkbox" id="checkboxTerminosA18">
          <span class="caja ${terminosAceptadosA18 ? 'marcada' : ''}" id="cajaTerminosA18"></span> Acepto los términos y condiciones
        </div>
        <div class="instalador-botones">
          <button type="button" class="instalador-btn secundario" id="btnAtrasA18">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA18" ${terminosAceptadosA18 ? '' : 'disabled'}>Siguiente ›</button>
        </div>`);
      document.getElementById('btnAtrasA18').addEventListener('click', () => pintarPasoA18(2));
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA18">‹ Atrás</button>
          <button type="button" class="instalador-btn secundario">Examinar...</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Siguiente ›</button>
        </div>`);
      document.getElementById('btnAtrasA18').addEventListener('click', () => pintarPasoA18(3));
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA18">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA18">Instalar</button>
        </div>`);
      document.getElementById('btnAtrasA18').addEventListener('click', () => pintarPasoA18(4));
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
    { codigo:'DB_Gastos', nombre:'Gastos', desc:'Registro de gastos operativos por departamento' },
    { codigo:'DB_Asistencia', nombre:'Asistencia', desc:'Registro diario de entrada, salida y estado del personal' }
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA19">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA19" disabled>Crear proyecto</button>
        </div>`);
      document.getElementById('btnAtrasA19').addEventListener('click', () => pintarEscritorioA19(1));
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA19">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA19"><i class="fa-solid fa-database"></i> Conectar base de datos</button>
        </div>`);
      document.getElementById('btnAtrasA19').addEventListener('click', () => pintarEscritorioA19(2));
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA19">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA19" disabled>Conectar</button>
        </div>`);
      document.getElementById('btnAtrasA19').addEventListener('click', () => pintarEscritorioA19(3));
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA19">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA19" disabled>Usar esta tabla</button>
        </div>`);
      document.getElementById('btnAtrasA19').addEventListener('click', () => pintarEscritorioA19(4));
      // Si ya había elegido una tabla (por ejemplo al volver con "Atrás"), se conserva la selección
      if(tablaSeleccionadaA19){
        const previa = document.querySelector(`#tablasDisponiblesA19 .tabla-opcion-a19[data-codigo="${tablaSeleccionadaA19}"] .caja`);
        if(previa){ previa.classList.add('marcada'); document.getElementById('btnPasoA19').disabled = false; }
      }
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
          <button type="button" class="instalador-btn secundario" id="btnAtrasA19">‹ Atrás</button>
          <button type="button" class="instalador-btn primario" id="btnPasoA19">Finalizar</button>
        </div>`);
      document.getElementById('btnAtrasA19').addEventListener('click', () => pintarEscritorioA19(5));
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
  let vistaCasoA110 = null; // caso que se está repasando (null = el caso actual)
  let casoExtendidoIniciadoA110 = false;
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
    vistaCasoA110 = null;
    casoExtendidoIniciadoA110 = false;
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

    // Caso que se muestra: el actual, o uno anterior si el estudiante está repasando
    let idxVista = (vistaCasoA110 === null || vistaCasoA110 > pasoCasoA110) ? pasoCasoA110 : vistaCasoA110;
    if(idxVista < 0) idxVista = 0;
    const repasando = idxVista < pasoCasoA110;

    if(idxVista >= CASOS_A110_BASE.length){
      cont.innerHTML = `<div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste los 5 casos cortos! Ahora sigue un caso más a fondo.</div>
        ${htmlNavPasos_('navCasoA110', true, false)}`;
      document.getElementById('navCasoA110Anterior').addEventListener('click', () => {
        vistaCasoA110 = CASOS_A110_BASE.length - 1;
        pintarCasoA110();
      });
      document.getElementById('seccionCasoExtendidoA110').classList.remove('hidden');
      // El caso extenso se dibuja una sola vez, para no reiniciarlo si el estudiante vuelve a repasar
      if(!casoExtendidoIniciadoA110){
        casoExtendidoIniciadoA110 = true;
        pintarCasoExtendidoA110();
      }
      return;
    }

    const caso = CASOS_A110_BASE[idxVista];
    cont.innerHTML = `
      <div class="caso-a110-card">
        ${repasando ? HTML_AVISO_REPASO_ : ''}
        <div class="caso-a110-titulo">Caso ${idxVista + 1} de ${CASOS_A110_BASE.length}</div>
        <div class="caso-a110-escenario">${caso.escenario}</div>
        <div class="metodos-a110-opciones">
          ${METODOS_A110.map(m => `
            <button type="button" class="metodo-a110-btn" data-id="${m.id}" ${repasando ? 'disabled' : ''}>
              <span class="metodo-a110-icono">${m.icono}</span>
              <span>${m.nombre}</span>
            </button>
          `).join('')}
        </div>
        <div id="feedbackCasoA110"></div>
        <div class="nav-pasos" id="navCasoA110">
          ${idxVista > 0 ? '<button type="button" class="btn-nav-paso" id="navCasoA110Anterior"><i class="fa-solid fa-arrow-left"></i> Anterior</button>' : ''}
          ${repasando ? '<button type="button" class="btn-nav-paso btn-nav-paso-primario" id="navCasoA110Siguiente">Siguiente <i class="fa-solid fa-arrow-right"></i></button>' : ''}
        </div>
      </div>`;

    const btnAnterior = document.getElementById('navCasoA110Anterior');
    if(btnAnterior) btnAnterior.addEventListener('click', () => {
      vistaCasoA110 = idxVista - 1;
      pintarCasoA110();
    });

    if(repasando){
      // Se muestra el caso ya respondido, bloqueado, con su retroalimentación
      const resp = respuestasCasosA110[idxVista];
      const elegido = METODOS_A110.find(m => m.nombre === resp.tuRespuesta);
      document.querySelectorAll('#casosA110 .metodo-a110-btn').forEach(btn => {
        if(btn.dataset.id === caso.correcto) btn.classList.add('correcta-marcada');
        else if(elegido && btn.dataset.id === elegido.id) btn.classList.add('incorrecta-marcada');
      });
      document.getElementById('feedbackCasoA110').innerHTML = `
        <div class="asistente-feedback ${resp.correcta ? '' : 'feedback-incorrecto'}">
          <i class="fa-solid ${resp.correcta ? 'fa-circle-check' : 'fa-circle-info'}"></i>
          ${resp.correcta ? '¡Correcto!' : 'No exactamente.'} ${caso.explicacion}
        </div>`;
      document.getElementById('navCasoA110Siguiente').addEventListener('click', () => {
        vistaCasoA110 = (idxVista + 1 >= pasoCasoA110) ? null : idxVista + 1;
        pintarCasoA110();
      });
    } else {
      document.querySelectorAll('#casosA110 .metodo-a110-btn').forEach(btn => {
        btn.addEventListener('click', () => manejarRespuestaCasoA110(btn.dataset.id, caso));
      });
    }
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
      </div>`;

    // El botón "Siguiente caso" se agrega junto al "Anterior" (si existe)
    const nav = document.getElementById('navCasoA110');
    const btnSig = document.createElement('button');
    btnSig.type = 'button';
    btnSig.className = 'btn btn-primary';
    btnSig.id = 'btnSiguienteCasoA110';
    btnSig.style.cssText = 'width:auto; padding:10px 22px;';
    btnSig.innerHTML = 'Siguiente caso <i class="fa-solid fa-arrow-right"></i>';
    nav.appendChild(btnSig);
    btnSig.addEventListener('click', () => {
      pasoCasoA110++;
      vistaCasoA110 = null;
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

// ============================================================================
// RA2 — RESULTADO DE APRENDIZAJE 2
// ============================================================================

// ============================================================================
// A.2.1 — DISEÑADOR DE REPORTES: VISTA DE DISEÑO REAL
// ============================================================================
  // Primera pieza del "Diseñador de Reportes" dentro de NexaReport: un lienzo de
  // diseño real donde el estudiante ESCRIBE el encabezado de reporte y ARRASTRA
  // los campos de la tabla hacia la línea de detalle — simulando de verdad lo que
  // se hace en la Vista de Diseño de un programa generador, no solo eligiendo de
  // una lista. Usa datos reales de DB_Ventas. Este lienzo seguirá creciendo en
  // las próximas actividades de RA2 (pie de reporte, formatos, agrupación,
  // filtros, gráficos...).

  const CAMPOS_CORRECTOS_DETALLE_A21 = ['Producto', 'Cantidad', 'PrecioUnitario'];
  const CAMPOS_CORRECTOS_FINALES_A21 = ['Producto', 'Cantidad', 'PrecioUnitario', 'Vendedor'];

  const CRITERIOS_BASE_A21 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'encReporte', nombre:'2. Encabezado de reporte', descripcion:'Escribe correctamente el nombre de la empresa y el título del reporte.' },
    { key:'detalle', nombre:'3. Línea de detalle', descripcion:'Selecciona la tabla correcta y arrastra exactamente los campos correctos hacia la línea de detalle.' },
    { key:'encPagina', nombre:'4. Encabezado de página', descripcion:'Incluye el número de página además de los títulos de columna.' },
    { key:'vistas', nombre:'5. Recorrido de las 3 vistas', descripcion:'Recorre las vistas de Diseño, Previsualización y Ejecución del reporte ya construido.' },
    { key:'identificar', nombre:'6. Identifica y define las secciones', descripcion:'Identifica correctamente cada sección del reporte y explica en sus propias palabras la función que cumple.' },
    { key:'tiempo', nombre:'7. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'8. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let tablaSeleccionadaDetalleA21 = '';
  let datosTablaSeleccionadaA21 = null;
  let nombreEmpresaValorA21 = '';
  let tituloReporteValorA21 = '';
  let camposColocadosDetalleA21 = [];
  let campoSeleccionadoA21 = null;
  let numPaginaMarcadoA21 = false;
  let encReporteCorrectoA21 = false;
  let detalleCorrectoA21 = false;
  let encPaginaCorrectoA21 = false;
  let intentosPorSeccionA21 = { encReporte:0, detalle:0, encPagina:0 };
  let mostrandoVistaPreviaA21 = false;
  let vistaActualA21 = 'diseno';
  let vistasVisitadasA21 = new Set();
  let ordenSeccionesIdentificarA21 = [];
  let respuestasIdentificarA21 = {};
  let intentosIdentificarGeneralA21 = 0;
  let identificarSeccionesCompletoA21 = false;

  const SECCIONES_IDENTIFICAR_A21_BASE = [
    { id:'encReporte', nombre:'Encabezado de reporte' },
    { id:'encPagina', nombre:'Encabezado de página' },
    { id:'detalle', nombre:'Línea de detalle' }
  ];
  let ultimoResultadoA21 = null;
  let puntajeMaxA21 = 0;
  let tiempoEstimadoA21 = 10;
  let inicioTiempoA21 = null;
  let timerIntervalA21 = null;

  async function abrirActividadA21(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA21 = puntajeMaximo;
    tiempoEstimadoA21 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA21').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA21').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.2.1') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA21').classList.add('hidden');
        document.getElementById('vistaEjercicioA21').classList.add('hidden');
        document.getElementById('vistaResultadoA21').classList.remove('hidden');
        renderRubrica('rubricaResultadoA21', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA21', previa.detalle);
        ultimoResultadoA21 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA21').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA21').classList.add('hidden');
    document.getElementById('vistaInstrumentoA21').classList.remove('hidden');
    document.getElementById('vistaEjercicioA21').classList.add('hidden');
    document.getElementById('vistaResultadoA21').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA21').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA21} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.2.1', 'recursosEstudianteA21');

    const criteriosPrevios = CRITERIOS_BASE_A21.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA21', criteriosPrevios, puntajeMaxA21, null);
  }

  document.getElementById('btnBackFromActividadA21').addEventListener('click', () => {
    clearInterval(timerIntervalA21);
    document.getElementById('panelActividadA21').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA21').addEventListener('click', async () => {
    nombreEmpresaValorA21 = '';
    tituloReporteValorA21 = '';
    tablaSeleccionadaDetalleA21 = '';
    datosTablaSeleccionadaA21 = null;
    camposColocadosDetalleA21 = [];
    campoSeleccionadoA21 = null;
    numPaginaMarcadoA21 = false;
    encReporteCorrectoA21 = false;
    detalleCorrectoA21 = false;
    encPaginaCorrectoA21 = false;
    intentosPorSeccionA21 = { encReporte:0, detalle:0, encPagina:0 };
    mostrandoVistaPreviaA21 = false;
    vistaActualA21 = 'diseno';
    vistasVisitadasA21 = new Set();
    ordenSeccionesIdentificarA21 = [];
    respuestasIdentificarA21 = {};
    intentosIdentificarGeneralA21 = 0;
    identificarSeccionesCompletoA21 = false;
    document.getElementById('identificarSeccionesA21').classList.add('hidden');
    document.getElementById('disenadorReporteA21').classList.remove('hidden');
    document.getElementById('seccionFinalA21').classList.add('hidden');
    document.getElementById('vistaInstrumentoA21').classList.add('hidden');
    document.getElementById('vistaEjercicioA21').classList.remove('hidden');

    pintarSeccionDisenoYVistasA21();

    inicioTiempoA21 = Date.now();
    clearInterval(timerIntervalA21);
    timerIntervalA21 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA21) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA21').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA21} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Sección de diseño + 3 vistas, todo en una sola pantalla con pestañas ----------
  const DESCRIPCIONES_SECCION_A21 = {
    encReporte: 'Debe contener el nombre de la empresa y el título del reporte. Aparece una sola vez, al principio de todo el documento.',
    detalle: 'Debes arrastrar exactamente estos 3 campos: <b>Producto</b>, <b>Cantidad</b> y <b>Precio Unitario</b>. Se repite una vez por cada venta.',
    encPagina: 'Se repite en la parte superior de cada página, con los títulos de columna y el número de página.'
  };

  function pintarSeccionDisenoYVistasA21(){
    const cont = document.getElementById('disenadorReporteA21');
    cont.innerHTML = `
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-hand-pointer"></i> Diseña tu reporte en la pestaña "Vista de Diseño". Puedes volver a esa pestaña en cualquier momento para hacer cambios.</div>
      <div class="vistas-tabs" id="vistasTabsA21"></div>
      <div id="vistaContenidoA21"></div>`;
    pintarTabsVistasA21();
    cambiarVistaA21(vistaActualA21 || 'diseno');
  }

  function pintarTabsVistasA21(){
    const cont = document.getElementById('vistasTabsA21');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A14[v];
      const visitada = vistasVisitadasA21.has(v);
      const activa = vistaActualA21 === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');
    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaA21(btn.dataset.vista));
    });
  }

  function cambiarVistaA21(vista){
    vistaActualA21 = vista;
    vistasVisitadasA21.add(vista);
    pintarTabsVistasA21();
    pintarContenidoVistaA21(vista);
  }

  function pintarContenidoVistaA21(vista){
    const cont = document.getElementById('vistaContenidoA21');
    const info = COLOR_VISTA_A14[vista];
    const nombreEmpresa = nombreEmpresaValorA21 || 'TECNOVENTAS RD, S.R.L.';
    const tituloReporte = tituloReporteValorA21 || 'Reporte de Ventas';

    // ---- Pestaña "Vista de Diseño": el lienzo editable de verdad (siempre se puede volver aquí) ----
    if(vista === 'diseno'){
      actualizarEstadoVisualA21();
      const campos = (datosTablaSeleccionadaA21 && datosTablaSeleccionadaA21.campos) || [];
      const camposDisponibles = campos.filter(c => !camposColocadosDetalleA21.includes(c));

      cont.innerHTML = `
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>

        <div class="lienzo-diseno-a21">
          <div class="caja-diseno-a21 ${encReporteCorrectoA21 ? 'correcta' : ''}" id="cajaEncReporteA21">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-heading"></i> Encabezado de reporte</div>
            <input type="text" id="inputNombreEmpresaA21" class="input-generico" placeholder="Nombre de la empresa..." value="${nombreEmpresaValorA21.replace(/"/g,'&quot;')}">
            <input type="text" id="inputTituloReporteA21" class="input-generico" placeholder="Título del reporte..." style="margin-top:8px;" value="${tituloReporteValorA21.replace(/"/g,'&quot;')}">
            <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A21.encReporte}</p>
          </div>

          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <div class="caja-diseno-a21 ${detalleCorrectoA21 ? 'correcta' : ''}" id="cajaDetalleA21" style="flex:1.3; min-width:260px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-table-list"></i> Línea de detalle</div>
              <div class="zona-arrastre-a21" id="zonaDetalleA21">
                ${camposColocadosDetalleA21.length === 0 ? 'Arrastra aquí los campos que debe mostrar cada venta' :
                  camposColocadosDetalleA21.map(c => `<span class="campo-chip-a21 colocado" data-id="${c}">${c} <i class="fa-solid fa-xmark"></i></span>`).join('')}
              </div>
              <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A21.detalle}</p>
            </div>

            <div class="caja-diseno-a21" id="cajaCamposDisponiblesA21" style="flex:1; min-width:220px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-database"></i> Campos disponibles</div>
              <label style="display:block; font-size:12px; font-weight:700; color:var(--dark-text-dim); margin-bottom:6px;">Tabla de datos</label>
              <select id="selectTablaDetalleA21" class="input-generico">
                <option value="" ${tablaSeleccionadaDetalleA21 ? '' : 'selected disabled'}>Selecciona una tabla...</option>
                ${TABLAS_DISPONIBLES_A19.map(t => `<option value="${t.codigo}" ${tablaSeleccionadaDetalleA21 === t.codigo ? 'selected' : ''}>${t.nombre}</option>`).join('')}
              </select>
              ${camposDisponibles.length > 0 ? `
                <p style="margin:10px 0 6px; font-size:11.5px; opacity:.75;">Arrastra o toca para agregar:</p>
                <div class="pool-campos-a21" id="poolCamposA21">
                  ${camposDisponibles.map(c => `<span class="campo-chip-a21 ${campoSeleccionadoA21 === c ? 'seleccionado' : ''}" draggable="true" data-id="${c}">${c}</span>`).join('')}
                </div>` : ''}
            </div>
          </div>

          <div class="caja-diseno-a21 ${encPaginaCorrectoA21 ? 'correcta' : ''}" id="cajaEncPaginaA21">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-file-lines"></i> Encabezado de página</div>
            <div class="columnas-generadas-a21" id="columnasGeneradasA21">${camposColocadosDetalleA21.length ? camposColocadosDetalleA21.join(' | ') : 'Los títulos de columna aparecerán aquí según los campos que arrastres en la línea de detalle...'}</div>
            <div class="instalador-checkbox" id="checkboxNumPaginaA21" style="margin-top:10px; justify-content:flex-start; cursor:pointer;">
              <span class="caja ${numPaginaMarcadoA21 ? 'marcada' : ''}"></span> Incluir número de página
            </div>
            <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A21.encPagina}</p>
          </div>
        </div>`;

      // Encabezado de reporte: guarda lo que va escribiendo, y actualiza el estado visual en vivo
      document.getElementById('inputNombreEmpresaA21').addEventListener('input', (e) => {
        nombreEmpresaValorA21 = e.target.value;
        actualizarEstadoVisualA21();
        document.getElementById('cajaEncReporteA21').classList.toggle('correcta', encReporteCorrectoA21);
      });
      document.getElementById('inputTituloReporteA21').addEventListener('input', (e) => {
        tituloReporteValorA21 = e.target.value;
        actualizarEstadoVisualA21();
        document.getElementById('cajaEncReporteA21').classList.toggle('correcta', encReporteCorrectoA21);
      });

      // Selector de tabla: al cambiar, carga sus campos reales y reinicia lo ya colocado
      document.getElementById('selectTablaDetalleA21').addEventListener('change', async (e) => {
        tablaSeleccionadaDetalleA21 = e.target.value;
        camposColocadosDetalleA21 = [];
        campoSeleccionadoA21 = null;
        cont.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando campos de la tabla...</div>';
        datosTablaSeleccionadaA21 = tablaSeleccionadaDetalleA21 ? await cargarTablaDatos(tablaSeleccionadaDetalleA21) : null;
        pintarContenidoVistaA21('diseno');
      });

      // Campos del pool: clic para seleccionar (accesible en táctil)
      document.querySelectorAll('#poolCamposA21 .campo-chip-a21').forEach(chip => {
        chip.addEventListener('click', () => {
          const campo = chip.dataset.id;
          campoSeleccionadoA21 = campoSeleccionadoA21 === campo ? null : campo;
          pintarContenidoVistaA21('diseno');
        });
      });

      // Campos ya colocados: clic para quitar
      document.querySelectorAll('#zonaDetalleA21 .campo-chip-a21.colocado').forEach(chip => {
        chip.addEventListener('click', () => {
          camposColocadosDetalleA21 = camposColocadosDetalleA21.filter(c => c !== chip.dataset.id);
          pintarContenidoVistaA21('diseno');
        });
      });

      // Zona de detalle: clic para colocar el campo seleccionado, o soltar (drag) directamente
      const zonaDetalle = document.getElementById('zonaDetalleA21');
      zonaDetalle.addEventListener('click', () => {
        if(campoSeleccionadoA21 && !camposColocadosDetalleA21.includes(campoSeleccionadoA21)){
          camposColocadosDetalleA21.push(campoSeleccionadoA21);
          campoSeleccionadoA21 = null;
          pintarContenidoVistaA21('diseno');
        }
      });
      const chipsArrastrables = document.querySelectorAll('#poolCamposA21 .campo-chip-a21[draggable="true"]');
      habilitarArrastre(chipsArrastrables, [zonaDetalle], (campoArrastrado) => {
        if(!camposColocadosDetalleA21.includes(campoArrastrado)){
          camposColocadosDetalleA21.push(campoArrastrado);
          campoSeleccionadoA21 = null;
          pintarContenidoVistaA21('diseno');
        }
      });

      // Checkbox de número de página
      document.getElementById('checkboxNumPaginaA21').addEventListener('click', () => {
        numPaginaMarcadoA21 = !numPaginaMarcadoA21;
        pintarContenidoVistaA21('diseno');
      });

      return;
    }

    // ---- Pestañas de Previsualización y Ejecución ----
    if(camposColocadosDetalleA21.length === 0){
      cont.innerHTML = `
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>
        <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-circle-info"></i> Todavía no has agregado campos a la línea de detalle en la Vista de Diseño. Vuelve a esa pestaña para completarlo.</div>`;
      return;
    }

    const tieneVendedor = camposColocadosDetalleA21.includes('Vendedor');
    let notaPrevisualizacionHtml = '';
    let filasHtml = '';
    if(vista === 'previsualizacion'){
      if(!tieneVendedor){
        notaPrevisualizacionHtml = `
          <div class="empty-note" style="margin-top:0;">
            <i class="fa-solid fa-circle-info"></i>
            Antes de continuar: vuelve a la <b>Vista de Diseño</b> y agrega un cuarto campo a la línea de detalle — <b>Vendedor</b>. Luego regresa aquí, a la Previsualización, y después continúa a la <b>Vista de Ejecución</b>.
          </div>`;
      }
      filasHtml = [1, 2].map(() => `<div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0; opacity:.6;">${camposColocadosDetalleA21.map(() => `<span style="flex:1;">[muestra]</span>`).join('')}</div>`).join('');
    } else if(vista === 'ejecucion'){
      const filas = (datosTablaSeleccionadaA21 && datosTablaSeleccionadaA21.datos) ? datosTablaSeleccionadaA21.datos : [];
      filasHtml = filas.map(f => `
        <div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0;">
          ${camposColocadosDetalleA21.map(c => {
            let valor = f[c];
            if(c === 'PrecioUnitario' && typeof valor === 'number') valor = 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2});
            else valor = formatearValorCeldaReporte_(valor);
            return `<span style="flex:1;">${valor !== undefined ? valor : ''}</span>`;
          }).join('')}
        </div>`).join('');
    }

    cont.innerHTML = `
      ${notaPrevisualizacionHtml}
      <div class="simulador-pantalla">
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>
        <div style="font-weight:800; font-size:15px; margin-top:10px;">${nombreEmpresa}</div>
        <div style="font-size:13px; opacity:.85; margin-bottom:10px;">${tituloReporte}</div>
        <div style="display:flex; gap:14px; font-weight:800; font-size:12.5px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
          ${camposColocadosDetalleA21.map(c => `<span style="flex:1;">${c}</span>`).join('')}
        </div>
        ${filasHtml}
      </div>
      ${vista === 'ejecucion' ? `
        <div id="feedbackEjecucionA21"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:16px; flex-wrap:wrap;">
          <button type="button" class="btn-descargar-pdf" id="btnDescargarReportePdfA21">
            <i class="fa-solid fa-file-pdf"></i> Descargar reporte en PDF
          </button>
          <button type="button" class="btn btn-primary" id="btnSiguienteEjecucionA21" style="width:auto; padding:12px 28px;">
            <i class="fa-solid fa-arrow-right"></i> Siguiente
          </button>
        </div>` : ''}`;

    if(vista === 'ejecucion'){
      document.getElementById('btnDescargarReportePdfA21').addEventListener('click', () => {
        const filas = ((datosTablaSeleccionadaA21 && datosTablaSeleccionadaA21.datos) || []).map(f =>
          camposColocadosDetalleA21.map(c => {
            const valor = f[c];
            return (c === 'PrecioUnitario' && typeof valor === 'number') ? 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2}) : formatearValorCeldaReporte_(valor);
          })
        );
        generarPdfReporteDisenado({
          nombreEmpresa: nombreEmpresaValorA21 || 'TECNOVENTAS RD, S.R.L.',
          tituloReporte: tituloReporteValorA21 || 'Reporte de Ventas',
          columnas: camposColocadosDetalleA21,
          filas,
          numeroPagina: numPaginaMarcadoA21
        });
      });
      document.getElementById('btnSiguienteEjecucionA21').addEventListener('click', intentarAvanzarDesdeEjecucionA21);
    }
  }

  // Recalcula en vivo (sin contar intentos) si cada sección luce correcta, para el borde verde inmediato
  function actualizarEstadoVisualA21(){
    const empresaOk = normalizarTextoA15_(nombreEmpresaValorA21).includes('tecnoventas');
    const tituloOk = normalizarTextoA15_(tituloReporteValorA21).includes('venta');
    encReporteCorrectoA21 = empresaOk && tituloOk;

    const seleccion = [...camposColocadosDetalleA21].sort();
    const finalEsperado = [...CAMPOS_CORRECTOS_FINALES_A21].sort();
    const tablaOk = tablaSeleccionadaDetalleA21 === 'DB_Ventas';
    detalleCorrectoA21 = tablaOk && seleccion.length === finalEsperado.length && seleccion.every((c, i) => c === finalEsperado[i]);

    encPaginaCorrectoA21 = camposColocadosDetalleA21.length > 0 && numPaginaMarcadoA21;
  }

  // Se dispara desde el botón "Siguiente" de la pestaña de Ejecución — valida todo y, si está
  // completo, avanza a la segunda parte de la actividad (identificar y definir secciones).
  function intentarAvanzarDesdeEjecucionA21(){
    actualizarEstadoVisualA21();
    const mensajes = [];

    if(!encReporteCorrectoA21){
      intentosPorSeccionA21.encReporte++;
      mensajes.push('El <b>encabezado de reporte</b> todavía no está completo: debe incluir el nombre de la empresa (TECNOVENTAS RD) y un título que mencione que es un reporte de ventas. Vuelve a la Vista de Diseño para completarlo.');
    }

    if(!detalleCorrectoA21){
      intentosPorSeccionA21.detalle++;
      const tieneVendedor = camposColocadosDetalleA21.includes('Vendedor');
      mensajes.push(!tieneVendedor
        ? 'La <b>línea de detalle</b> todavía no tiene el campo <b>Vendedor</b> — vuelve a la Vista de Diseño y agrégalo, tal como se indicó en la Previsualización.'
        : 'La <b>línea de detalle</b> no tiene exactamente los campos correctos (Producto, Cantidad, Precio Unitario y Vendedor).');
    }

    if(!encPaginaCorrectoA21){
      intentosPorSeccionA21.encPagina++;
      mensajes.push('El <b>encabezado de página</b> necesita el número de página marcado. Vuelve a la Vista de Diseño para completarlo.');
    }

    if(mensajes.length > 0){
      document.getElementById('feedbackEjecucionA21').innerHTML = mensajes.map(m =>
        `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`
      ).join('');
      return;
    }

    document.getElementById('disenadorReporteA21').classList.add('hidden');
    mostrarIdentificarA21_();
  }

  // Si ya había completado la identificación y vuelve a avanzar, se muestra su estado final;
  // si no, se dibuja el ejercicio (restaurando lo que ya había escrito).
  function mostrarIdentificarA21_(){
    if(identificarSeccionesCompletoA21) mostrarCompletoIdentificarA21_();
    else pintarIdentificarSeccionesA21();
  }

  function mostrarCompletoIdentificarA21_(){
    const cont = document.getElementById('identificarSeccionesA21');
    cont.classList.remove('hidden');
    cont.innerHTML = htmlBotonVolverA_('btnVolverDisenoA21', 'Volver al diseño') +
      '<div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste la identificación de las 3 secciones!</div>';
    conectarVolverDisenoA21_();
    document.getElementById('seccionFinalA21').classList.remove('hidden');
  }

  // Vuelve a la Vista de Diseño sin perder nada de lo hecho; con "Siguiente" regresa a este punto.
  function conectarVolverDisenoA21_(){
    document.getElementById('btnVolverDisenoA21').addEventListener('click', () => {
      document.getElementById('identificarSeccionesA21').classList.add('hidden');
      document.getElementById('seccionFinalA21').classList.add('hidden');
      document.getElementById('disenadorReporteA21').classList.remove('hidden');
    });
  }

  // ---------- Identifica y define las secciones del reporte ya construido ----------
  function pintarIdentificarSeccionesA21(){
    document.getElementById('identificarSeccionesA21').classList.remove('hidden');
    if(!ordenSeccionesIdentificarA21 || ordenSeccionesIdentificarA21.length === 0) ordenSeccionesIdentificarA21 = barajar(SECCIONES_IDENTIFICAR_A21_BASE);

    const nombreEmpresa = nombreEmpresaValorA21 || 'TECNOVENTAS RD, S.R.L.';
    const tituloReporte = tituloReporteValorA21 || 'Reporte de Ventas';
    const filasTodasA21 = (datosTablaSeleccionadaA21 && datosTablaSeleccionadaA21.datos) || [];

    // Muestra el contenido COMPLETO de la línea de detalle: todas las ventas, no
    // solo una, porque esta sección se repite una vez por cada fila del reporte.
    const detalleHtmlA21 = filasTodasA21.length
      ? filasTodasA21.map(f => `<div>${camposColocadosDetalleA21.map(c => {
          const valor = f[c];
          return (c === 'PrecioUnitario' && typeof valor === 'number') ? 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2}) : formatearValorCeldaReporte_(valor);
        }).join(' | ')}</div>`).join('')
      : camposColocadosDetalleA21.join(' — ');

    const contenidoPorSeccion = {
      encReporte: `<div style="font-weight:800;">${nombreEmpresa}</div><div style="opacity:.85;">${tituloReporte}</div>`,
      encPagina: `<div style="font-weight:800; font-size:13px;">${camposColocadosDetalleA21.join(' | ')}</div>`,
      detalle: `<div style="font-size:13px; line-height:1.7;">${detalleHtmlA21}</div>`
    };

    const cont = document.getElementById('identificarSeccionesA21');
    cont.innerHTML = `
      ${htmlBotonVolverA_('btnVolverDisenoA21', 'Volver al diseño')}
      <div class="section-heading" style="font-size:18px;">Identifica y define las secciones de tu reporte</div>
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-hand-pointer"></i> Para cada recuadro, identifica qué sección del reporte es y explica en tus propias palabras qué función cumple.</div>

      ${ordenSeccionesIdentificarA21.map(s => `
        <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
          <div class="libro-ejemplo-box" style="margin-bottom:12px; max-height:180px; overflow-y:auto;">${contenidoPorSeccion[s.id]}</div>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">¿Qué sección del reporte es esta?</label>
          <select class="input-generico select-identificar-a21" data-seccion="${s.id}" style="margin-bottom:12px;">
            <option value="">Selecciona...</option>
            ${barajar(SECCIONES_IDENTIFICAR_A21_BASE).map(op => `<option value="${op.id}">${op.nombre}</option>`).join('')}
          </select>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">En tus palabras, ¿qué función cumple esta sección?</label>
          <textarea class="input-generico celda-respuesta-a15 textarea-definir-a21" data-seccion="${s.id}" rows="2" placeholder="Escribe tu definición..."></textarea>
        </div>
      `).join('')}

      <div id="feedbackIdentificarA21"></div>
      <button type="button" class="btn btn-primary" id="btnConfirmarIdentificarA21" style="width:auto; padding:12px 28px;">
        <i class="fa-solid fa-check"></i> Confirmar
      </button>`;

    document.querySelectorAll('.select-identificar-a21').forEach(sel => {
      sel.addEventListener('change', () => {
        const s = sel.dataset.seccion;
        if(!respuestasIdentificarA21[s]) respuestasIdentificarA21[s] = {};
        respuestasIdentificarA21[s].identificacion = sel.value;
      });
    });
    document.querySelectorAll('.textarea-definir-a21').forEach(ta => {
      ta.addEventListener('input', () => {
        const s = ta.dataset.seccion;
        if(!respuestasIdentificarA21[s]) respuestasIdentificarA21[s] = {};
        respuestasIdentificarA21[s].definicion = ta.value;
      });
    });

    document.getElementById('btnConfirmarIdentificarA21').addEventListener('click', verificarIdentificarSeccionesA21);

    // Si el estudiante vuelve de la Vista de Diseño, se restauran sus respuestas anteriores
    cont.querySelectorAll('.select-identificar-a21').forEach(sel => {
      const r = respuestasIdentificarA21[sel.dataset.seccion];
      if(r && r.identificacion) sel.value = r.identificacion;
    });
    cont.querySelectorAll('.textarea-definir-a21').forEach(ta => {
      const r = respuestasIdentificarA21[ta.dataset.seccion];
      if(r && r.definicion) ta.value = r.definicion;
    });
    conectarVolverDisenoA21_();
  }

  function verificarIdentificarSeccionesA21(){
    intentosIdentificarGeneralA21++;
    let todoCorrecto = true;

    SECCIONES_IDENTIFICAR_A21_BASE.forEach(s => {
      const resp = respuestasIdentificarA21[s.id] || {};
      const identOk = resp.identificacion === s.id;
      const defOk = contarPalabrasRealesA15_(resp.definicion || '') >= 4;
      if(!identOk || !defOk) todoCorrecto = false;
    });

    if(!todoCorrecto){
      document.getElementById('feedbackIdentificarA21').innerHTML = `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>Revisa: alguna identificación o definición todavía no está completa. La definición debe tener varias palabras propias, no solo repetir el nombre de la sección.</div></div>`;
      return;
    }

    identificarSeccionesCompletoA21 = true;
    mostrarCompletoIdentificarA21_();
  }

  document.getElementById('btnFinalizarA21').addEventListener('click', async () => {
    clearInterval(timerIntervalA21);

    const minutosTranscurridos = (Date.now() - inicioTiempoA21) / 60000;
    const nivelPorIntentos = (intentos) => intentos <= 1 ? 'logrado' : (intentos <= 2 ? 'proceso' : 'no_logrado');

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A21[0].nombre, descripcion: CRITERIOS_BASE_A21[0].descripcion, nivel: 'logrado' });
    criterios.push({ nombre: CRITERIOS_BASE_A21[1].nombre, descripcion: CRITERIOS_BASE_A21[1].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA21.encReporte || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A21[2].nombre, descripcion: CRITERIOS_BASE_A21[2].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA21.detalle || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A21[3].nombre, descripcion: CRITERIOS_BASE_A21[3].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA21.encPagina || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A21[4].nombre, descripcion: CRITERIOS_BASE_A21[4].descripcion, nivel: 'logrado' });
    criterios.push({ nombre: CRITERIOS_BASE_A21[5].nombre, descripcion: CRITERIOS_BASE_A21[5].descripcion, nivel: nivelPorIntentos(intentosIdentificarGeneralA21 || 1) });
    criterios.push({
      nombre: CRITERIOS_BASE_A21[6].nombre, descripcion: CRITERIOS_BASE_A21[6].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA21 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA21 * 2 ? 'proceso' : 'no_logrado')
    });
    criterios.push({ nombre: CRITERIOS_BASE_A21[7].nombre, descripcion: CRITERIOS_BASE_A21[7].descripcion, nivel: 'logrado' });

    const pesoUnidad = puntajeMaxA21 / criterios.length;
    const pesosPorNivel = { logrado:1, proceso:0.5, no_logrado:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA21').classList.add('hidden');
    document.getElementById('vistaResultadoA21').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA21').classList.add('hidden');
    renderRubrica('rubricaResultadoA21', criterios, puntajeMaxA21, notaCalculada);
    ultimoResultadoA21 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA21 };

    const proporcionFinalA21 = puntajeMaxA21 > 0 ? notaCalculada / puntajeMaxA21 : 0;
    mostrarLogro(proporcionFinalA21 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA21 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA21 >= 0.8) dispararConfeti();

    const detalleA21 = [
      {
        titulo: 'Diseño del reporte — secciones iniciales',
        items: [
          { pregunta:'Encabezado de reporte', tuRespuesta: `Completado en ${intentosPorSeccionA21.encReporte || 1} intento(s)`, correcta: (intentosPorSeccionA21.encReporte || 1) <= 1 },
          { pregunta:'Línea de detalle', tuRespuesta: camposColocadosDetalleA21.join(', '), correcta: (intentosPorSeccionA21.detalle || 1) <= 1 },
          { pregunta:'Encabezado de página', tuRespuesta: `Completado en ${intentosPorSeccionA21.encPagina || 1} intento(s)`, correcta: (intentosPorSeccionA21.encPagina || 1) <= 1 }
        ]
      },
      {
        titulo: 'Recorrido de vistas e identificación de secciones',
        items: [
          { pregunta:'¿Recorrió las 3 vistas (Diseño, Previsualización, Ejecución)?', tuRespuesta: `${vistasVisitadasA21.size} de 3`, correcta: vistasVisitadasA21.size >= 3 },
          ...SECCIONES_IDENTIFICAR_A21_BASE.map(s => {
            const resp = respuestasIdentificarA21[s.id] || {};
            const nombreIdentificado = (SECCIONES_IDENTIFICAR_A21_BASE.find(x => x.id === resp.identificacion) || {}).nombre || 'Sin responder';
            return {
              pregunta: `¿Qué es "${s.nombre}" y qué función cumple?`,
              tuRespuesta: `Identificó: ${nombreIdentificado}. Definición: ${resp.definicion || 'Sin responder'}`,
              correcta: resp.identificacion === s.id && contarPalabrasRealesA15_(resp.definicion || '') >= 4
            };
          })
        ]
      }
    ];
    ultimoResultadoA21.detalle = detalleA21;
    renderDesgloseColoreado('resultadoDesgloseA21', detalleA21);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.2.1',
        ra:'RA2',
        ec:'EC6.2.1',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA21,
        criterios: criterios,
        detalle: detalleA21
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA21').addEventListener('click', () => {
    if(!ultimoResultadoA21) return;
    generarPdfResultado('A.2.1', ultimoResultadoA21.criterios, ultimoResultadoA21.nota, ultimoResultadoA21.puntajeMaximo, 'EC6.2.1', 'RA2', ultimoResultadoA21.detalle);
  });

  document.getElementById('btnVolverMisActA21').addEventListener('click', () => {
    document.getElementById('panelActividadA21').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.2.1', abrirActividadA21);

// ============================================================================
// A.2.2 — COMPARA DOS REPORTES DISTINTOS (Inventario y Asistencia)
// ============================================================================
  // Reutiliza el mismo Diseñador de Reportes de A.2.1 (lienzo editable + 3
  // vistas), pero esta vez el estudiante lo recorre 2 veces con reportes
  // distintos, y después compara las 3 secciones entre ambos. El enunciado
  // pide que "expliquen oralmente" las diferencias — esa discusión ocurre en
  // el aula, en pares; aquí se recoge una síntesis escrita individual para
  // poder calificar.

  const REPORTES_A22 = [
    {
      id: 'inventario', nombre: 'Reporte de Inventario', tablaCorrecta: 'DB_Inventario',
      camposCorrectos: ['Producto', 'CantidadDisponible', 'PrecioUnitario'], tituloClave: 'inventario'
    },
    {
      id: 'asistencia', nombre: 'Reporte de Asistencia', tablaCorrecta: 'DB_Asistencia',
      camposCorrectos: ['Empleado', 'HoraEntrada', 'Estado'], tituloClave: 'asistencia'
    }
  ];

  const SECCIONES_COMPARAR_A22 = [
    { id:'encReporte', nombre:'Encabezado de reporte' },
    { id:'encPagina', nombre:'Encabezado de página' },
    { id:'detalle', nombre:'Línea de detalle' }
  ];

  const CRITERIOS_BASE_A22 = [
    { nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { nombre:'2. Diseño correcto — Reporte de Inventario', descripcion:'Construye correctamente las 3 secciones del reporte de inventario.' },
    { nombre:'3. Diseño correcto — Reporte de Asistencia', descripcion:'Construye correctamente las 3 secciones del reporte de asistencia.' },
    { nombre:'4. Recorrido de las vistas de ambos reportes', descripcion:'Recorre las vistas de Diseño, Previsualización y Ejecución en los 2 reportes.' },
    { nombre:'5. Explica las diferencias entre ambos reportes', descripcion:'Explica con claridad, en sus propias palabras, en qué se diferencian las 3 secciones entre los 2 reportes.' },
    { nombre:'6. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { nombre:'7. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  function estadoReporteVacioA22(){
    return {
      nombreEmpresa: '', titulo: '', tabla: '', datosTabla: null, camposDetalle: [], numPagina: false,
      encReporteCorrecto: false, detalleCorrecto: false, encPaginaCorrecto: false,
      vistasVisitadas: new Set(), vistaActual: 'diseno',
      intentos: { encReporte:0, detalle:0, encPagina:0 }
    };
  }

  let indiceReporteActualA22 = 0;
  let comparacionCompletaA22 = false;
  let estadoReportesA22 = [estadoReporteVacioA22(), estadoReporteVacioA22()];
  let campoSeleccionadoA22 = null;
  let respuestasComparacionA22 = {};
  let intentosComparacionA22 = 0;
  let ultimoResultadoA22 = null;
  let puntajeMaxA22 = 0;
  let tiempoEstimadoA22 = 10;
  let inicioTiempoA22 = null;
  let timerIntervalA22 = null;

  async function abrirActividadA22(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA22 = puntajeMaximo;
    tiempoEstimadoA22 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA22').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA22').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.2.2') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA22').classList.add('hidden');
        document.getElementById('vistaEjercicioA22').classList.add('hidden');
        document.getElementById('vistaResultadoA22').classList.remove('hidden');
        renderListaCotejo('rubricaResultadoA22', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA22', previa.detalle);
        ultimoResultadoA22 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA22').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA22').classList.add('hidden');
    document.getElementById('vistaInstrumentoA22').classList.remove('hidden');
    document.getElementById('vistaEjercicioA22').classList.add('hidden');
    document.getElementById('vistaResultadoA22').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA22').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA22} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.2.2', 'recursosEstudianteA22');

    const criteriosPrevios = CRITERIOS_BASE_A22.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderListaCotejo('instrumentoPrevioA22', criteriosPrevios, puntajeMaxA22, null);
  }

  document.getElementById('btnBackFromActividadA22').addEventListener('click', () => {
    clearInterval(timerIntervalA22);
    document.getElementById('panelActividadA22').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA22').addEventListener('click', () => {
    indiceReporteActualA22 = 0;
    comparacionCompletaA22 = false;
    estadoReportesA22 = [estadoReporteVacioA22(), estadoReporteVacioA22()];
    campoSeleccionadoA22 = null;
    respuestasComparacionA22 = {};
    intentosComparacionA22 = 0;
    document.getElementById('comparacionSeccionesA22').classList.add('hidden');
    document.getElementById('seccionFinalA22').classList.add('hidden');
    document.getElementById('vistaInstrumentoA22').classList.add('hidden');
    document.getElementById('vistaEjercicioA22').classList.remove('hidden');
    document.getElementById('disenadorReporteA22').classList.remove('hidden');

    pintarSeccionDisenoYVistasA22();

    inicioTiempoA22 = Date.now();
    clearInterval(timerIntervalA22);
    timerIntervalA22 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA22) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA22').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA22} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Diseño + 3 vistas del reporte actual (índice indiceReporteActualA22) ----------
  function pintarSeccionDisenoYVistasA22(){
    const spec = REPORTES_A22[indiceReporteActualA22];
    document.getElementById('consignaGeneralA22').innerHTML =
      `<i class="fa-solid fa-hand-pointer"></i> Reporte ${indiceReporteActualA22 + 1} de 2 — Diseña el <b>${spec.nombre}</b> en la pestaña "Vista de Diseño". Puedes volver a esa pestaña en cualquier momento para hacer cambios.`;

    const cont = document.getElementById('disenadorReporteA22');
    cont.innerHTML = `
      ${indiceReporteActualA22 === 1 ? htmlBotonVolverA_('btnVolverReporte1A22', 'Volver al reporte 1') : ''}
      <div class="vistas-tabs" id="vistasTabsA22"></div>
      <div id="vistaContenidoA22"></div>`;
    const btnVolverReporte1 = document.getElementById('btnVolverReporte1A22');
    if(btnVolverReporte1) btnVolverReporte1.addEventListener('click', () => {
      indiceReporteActualA22 = 0;
      pintarSeccionDisenoYVistasA22();
    });
    pintarTabsVistasA22();
    const estado = estadoReportesA22[indiceReporteActualA22];
    cambiarVistaA22(estado.vistaActual || 'diseno');
  }

  function pintarTabsVistasA22(){
    const estado = estadoReportesA22[indiceReporteActualA22];
    const cont = document.getElementById('vistasTabsA22');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A14[v];
      const visitada = estado.vistasVisitadas.has(v);
      const activa = estado.vistaActual === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');
    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaA22(btn.dataset.vista));
    });
  }

  function cambiarVistaA22(vista){
    const estado = estadoReportesA22[indiceReporteActualA22];
    estado.vistaActual = vista;
    estado.vistasVisitadas.add(vista);
    pintarTabsVistasA22();
    pintarContenidoVistaA22(vista);
  }

  function actualizarEstadoVisualA22(){
    const estado = estadoReportesA22[indiceReporteActualA22];
    const spec = REPORTES_A22[indiceReporteActualA22];

    const empresaOk = normalizarTextoA15_(estado.nombreEmpresa).includes('tecnoventas');
    const tituloOk = normalizarTextoA15_(estado.titulo).includes(spec.tituloClave);
    estado.encReporteCorrecto = empresaOk && tituloOk;

    const seleccion = [...estado.camposDetalle].sort();
    const esperado = [...spec.camposCorrectos].sort();
    const tablaOk = estado.tabla === spec.tablaCorrecta;
    estado.detalleCorrecto = tablaOk && seleccion.length === esperado.length && seleccion.every((c, i) => c === esperado[i]);

    estado.encPaginaCorrecto = estado.camposDetalle.length > 0 && estado.numPagina;
  }

  function pintarContenidoVistaA22(vista){
    const estado = estadoReportesA22[indiceReporteActualA22];
    const spec = REPORTES_A22[indiceReporteActualA22];
    const cont = document.getElementById('vistaContenidoA22');
    const info = COLOR_VISTA_A14[vista];
    const nombreEmpresa = estado.nombreEmpresa || 'TECNOVENTAS RD, S.R.L.';
    const titulo = estado.titulo || spec.nombre;

    // ---- Pestaña "Vista de Diseño" ----
    if(vista === 'diseno'){
      actualizarEstadoVisualA22();
      const campos = (estado.datosTabla && estado.datosTabla.campos) || [];
      const camposDisponibles = campos.filter(c => !estado.camposDetalle.includes(c));

      cont.innerHTML = `
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>

        <div class="lienzo-diseno-a21">
          <div class="caja-diseno-a21 ${estado.encReporteCorrecto ? 'correcta' : ''}" id="cajaEncReporteA22">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-heading"></i> Encabezado de reporte</div>
            <input type="text" id="inputNombreEmpresaA22" class="input-generico" placeholder="Nombre de la empresa..." value="${estado.nombreEmpresa.replace(/"/g,'&quot;')}">
            <input type="text" id="inputTituloReporteA22" class="input-generico" placeholder="Título del reporte..." style="margin-top:8px;" value="${estado.titulo.replace(/"/g,'&quot;')}">
            <p class="descripcion-seccion-a21">Debe contener el nombre de la empresa y el título del reporte (para este reporte, que mencione "${spec.tituloClave}"). Aparece una sola vez, al principio.</p>
          </div>

          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <div class="caja-diseno-a21 ${estado.detalleCorrecto ? 'correcta' : ''}" id="cajaDetalleA22" style="flex:1.3; min-width:260px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-table-list"></i> Línea de detalle</div>
              <div class="zona-arrastre-a21" id="zonaDetalleA22">
                ${estado.camposDetalle.length === 0 ? 'Arrastra aquí los campos que debe mostrar cada registro' :
                  estado.camposDetalle.map(c => `<span class="campo-chip-a21 colocado" data-id="${c}">${c} <i class="fa-solid fa-xmark"></i></span>`).join('')}
              </div>
              <p class="descripcion-seccion-a21">Debes arrastrar exactamente 3 campos: <b>${spec.camposCorrectos.join('</b>, <b>')}</b>. Se repite una vez por cada registro.</p>
            </div>

            <div class="caja-diseno-a21" id="cajaCamposDisponiblesA22" style="flex:1; min-width:220px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-database"></i> Campos disponibles</div>
              <label style="display:block; font-size:12px; font-weight:700; color:var(--dark-text-dim); margin-bottom:6px;">Tabla de datos</label>
              <select id="selectTablaDetalleA22" class="input-generico">
                <option value="" ${estado.tabla ? '' : 'selected disabled'}>Selecciona una tabla...</option>
                ${TABLAS_DISPONIBLES_A19.map(t => `<option value="${t.codigo}" ${estado.tabla === t.codigo ? 'selected' : ''}>${t.nombre}</option>`).join('')}
              </select>
              ${camposDisponibles.length > 0 ? `
                <p style="margin:10px 0 6px; font-size:11.5px; opacity:.75;">Arrastra o toca para agregar:</p>
                <div class="pool-campos-a21" id="poolCamposA22">
                  ${camposDisponibles.map(c => `<span class="campo-chip-a21 ${campoSeleccionadoA22 === c ? 'seleccionado' : ''}" draggable="true" data-id="${c}">${c}</span>`).join('')}
                </div>` : ''}
            </div>
          </div>

          <div class="caja-diseno-a21 ${estado.encPaginaCorrecto ? 'correcta' : ''}" id="cajaEncPaginaA22">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-file-lines"></i> Encabezado de página</div>
            <div class="columnas-generadas-a21" id="columnasGeneradasA22">${estado.camposDetalle.length ? estado.camposDetalle.join(' | ') : 'Los títulos de columna aparecerán aquí según los campos que arrastres en la línea de detalle...'}</div>
            <div class="instalador-checkbox" id="checkboxNumPaginaA22" style="margin-top:10px; justify-content:flex-start; cursor:pointer;">
              <span class="caja ${estado.numPagina ? 'marcada' : ''}"></span> Incluir número de página
            </div>
            <p class="descripcion-seccion-a21">Se repite en la parte superior de cada página, con los títulos de columna y el número de página.</p>
          </div>
        </div>`;

      document.getElementById('inputNombreEmpresaA22').addEventListener('input', (e) => {
        estado.nombreEmpresa = e.target.value;
        actualizarEstadoVisualA22();
        document.getElementById('cajaEncReporteA22').classList.toggle('correcta', estado.encReporteCorrecto);
      });
      document.getElementById('inputTituloReporteA22').addEventListener('input', (e) => {
        estado.titulo = e.target.value;
        actualizarEstadoVisualA22();
        document.getElementById('cajaEncReporteA22').classList.toggle('correcta', estado.encReporteCorrecto);
      });

      document.getElementById('selectTablaDetalleA22').addEventListener('change', async (e) => {
        estado.tabla = e.target.value;
        estado.camposDetalle = [];
        campoSeleccionadoA22 = null;
        cont.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando campos de la tabla...</div>';
        estado.datosTabla = estado.tabla ? await cargarTablaDatos(estado.tabla) : null;
        pintarContenidoVistaA22('diseno');
      });

      document.querySelectorAll('#poolCamposA22 .campo-chip-a21').forEach(chip => {
        chip.addEventListener('click', () => {
          const campo = chip.dataset.id;
          campoSeleccionadoA22 = campoSeleccionadoA22 === campo ? null : campo;
          pintarContenidoVistaA22('diseno');
        });
      });

      document.querySelectorAll('#zonaDetalleA22 .campo-chip-a21.colocado').forEach(chip => {
        chip.addEventListener('click', () => {
          estado.camposDetalle = estado.camposDetalle.filter(c => c !== chip.dataset.id);
          pintarContenidoVistaA22('diseno');
        });
      });

      const zonaDetalle = document.getElementById('zonaDetalleA22');
      zonaDetalle.addEventListener('click', () => {
        if(campoSeleccionadoA22 && !estado.camposDetalle.includes(campoSeleccionadoA22)){
          estado.camposDetalle.push(campoSeleccionadoA22);
          campoSeleccionadoA22 = null;
          pintarContenidoVistaA22('diseno');
        }
      });
      const chipsArrastrables = document.querySelectorAll('#poolCamposA22 .campo-chip-a21[draggable="true"]');
      habilitarArrastre(chipsArrastrables, [zonaDetalle], (campoArrastrado) => {
        if(!estado.camposDetalle.includes(campoArrastrado)){
          estado.camposDetalle.push(campoArrastrado);
          campoSeleccionadoA22 = null;
          pintarContenidoVistaA22('diseno');
        }
      });

      document.getElementById('checkboxNumPaginaA22').addEventListener('click', () => {
        estado.numPagina = !estado.numPagina;
        pintarContenidoVistaA22('diseno');
      });

      return;
    }

    // ---- Pestañas de Previsualización y Ejecución ----
    if(estado.camposDetalle.length === 0){
      cont.innerHTML = `
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>
        <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-circle-info"></i> Todavía no has agregado campos a la línea de detalle en la Vista de Diseño. Vuelve a esa pestaña para completarlo.</div>`;
      return;
    }

    let filasHtml = '';
    if(vista === 'previsualizacion'){
      filasHtml = [1, 2].map(() => `<div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0; opacity:.6;">${estado.camposDetalle.map(() => `<span style="flex:1;">[muestra]</span>`).join('')}</div>`).join('');
    } else if(vista === 'ejecucion'){
      const filas = (estado.datosTabla && estado.datosTabla.datos) ? estado.datosTabla.datos : [];
      filasHtml = filas.map(f => `
        <div style="display:flex; gap:14px; font-size:12.5px; padding:3px 0;">
          ${estado.camposDetalle.map(c => {
            let valor = f[c];
            if(c === 'PrecioUnitario' && typeof valor === 'number') valor = 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2});
            else valor = formatearValorCeldaReporte_(valor);
            return `<span style="flex:1;">${valor !== undefined ? valor : ''}</span>`;
          }).join('')}
        </div>`).join('');
    }

    cont.innerHTML = `
      <div class="simulador-pantalla">
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>
        <div style="font-weight:800; font-size:15px; margin-top:10px;">${nombreEmpresa}</div>
        <div style="font-size:13px; opacity:.85; margin-bottom:10px;">${titulo}</div>
        <div style="display:flex; gap:14px; font-weight:800; font-size:12.5px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
          ${estado.camposDetalle.map(c => `<span style="flex:1;">${c}</span>`).join('')}
        </div>
        ${filasHtml}
      </div>
      ${vista === 'ejecucion' ? `
        <div id="feedbackEjecucionA22"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:16px; flex-wrap:wrap;">
          <button type="button" class="btn-descargar-pdf" id="btnDescargarReportePdfA22">
            <i class="fa-solid fa-file-pdf"></i> Descargar reporte en PDF
          </button>
          <button type="button" class="btn btn-primary" id="btnSiguienteEjecucionA22" style="width:auto; padding:12px 28px;">
            <i class="fa-solid fa-arrow-right"></i> ${indiceReporteActualA22 === 0 ? 'Siguiente reporte' : 'Siguiente'}
          </button>
        </div>` : ''}`;

    if(vista === 'ejecucion'){
      document.getElementById('btnDescargarReportePdfA22').addEventListener('click', () => {
        const filas = ((estado.datosTabla && estado.datosTabla.datos) || []).map(f =>
          estado.camposDetalle.map(c => {
            const valor = f[c];
            return (c === 'PrecioUnitario' && typeof valor === 'number') ? 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2}) : formatearValorCeldaReporte_(valor);
          })
        );
        generarPdfReporteDisenado({
          nombreEmpresa,
          tituloReporte: titulo,
          columnas: estado.camposDetalle,
          filas,
          numeroPagina: estado.numPagina
        });
      });
      document.getElementById('btnSiguienteEjecucionA22').addEventListener('click', intentarAvanzarDesdeEjecucionA22);
    }
  }

  function intentarAvanzarDesdeEjecucionA22(){
    actualizarEstadoVisualA22();
    const estado = estadoReportesA22[indiceReporteActualA22];
    const spec = REPORTES_A22[indiceReporteActualA22];
    const mensajes = [];

    if(!estado.encReporteCorrecto){
      estado.intentos.encReporte++;
      mensajes.push(`El <b>encabezado de reporte</b> todavía no está completo: debe incluir el nombre de la empresa (TECNOVENTAS RD) y un título que mencione "${spec.tituloClave}". Vuelve a la Vista de Diseño para completarlo.`);
    }
    if(!estado.detalleCorrecto){
      estado.intentos.detalle++;
      mensajes.push(`La <b>línea de detalle</b> no tiene exactamente los campos correctos (${spec.camposCorrectos.join(', ')}) de la tabla ${spec.nombre.replace('Reporte de ', '')}.`);
    }
    if(!estado.encPaginaCorrecto){
      estado.intentos.encPagina++;
      mensajes.push('El <b>encabezado de página</b> necesita el número de página marcado. Vuelve a la Vista de Diseño para completarlo.');
    }

    if(mensajes.length > 0){
      document.getElementById('feedbackEjecucionA22').innerHTML = mensajes.map(m =>
        `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`
      ).join('');
      return;
    }

    if(indiceReporteActualA22 === 0){
      indiceReporteActualA22 = 1;
      pintarSeccionDisenoYVistasA22();
    } else {
      document.getElementById('disenadorReporteA22').classList.add('hidden');
      document.getElementById('consignaGeneralA22').classList.add('hidden');
      mostrarComparacionA22_();
    }
  }

  // Muestra el contenido COMPLETO de la línea de detalle de un reporte de A.2.2
  // (todas sus filas reales), no solo una, porque esta sección se repite por cada fila.
  function construirDetalleCompletoA22_(estadoReporte){
    const filas = (estadoReporte.datosTabla && estadoReporte.datosTabla.datos) || [];
    if(!filas.length) return estadoReporte.camposDetalle.join(' — ');
    return filas.map(f => `<div>${estadoReporte.camposDetalle.map(c => {
      const valor = f[c];
      return (c === 'PrecioUnitario' && typeof valor === 'number') ? 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2}) : formatearValorCeldaReporte_(valor);
    }).join(' | ')}</div>`).join('');
  }

  // Si ya había completado la comparación y vuelve a avanzar, se muestra su estado final;
  // si no, se dibuja el ejercicio (restaurando lo que ya había escrito).
  function mostrarComparacionA22_(){
    if(comparacionCompletaA22) mostrarCompletoComparacionA22_();
    else pintarComparacionA22();
  }

  function mostrarCompletoComparacionA22_(){
    const cont = document.getElementById('comparacionSeccionesA22');
    cont.classList.remove('hidden');
    cont.innerHTML = htmlBotonVolverA_('btnVolverReporte2A22', 'Volver al reporte 2') +
      '<div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste la comparación de los 2 reportes!</div>';
    conectarVolverReporte2A22_();
    document.getElementById('seccionFinalA22').classList.remove('hidden');
  }

  // Regresa al diseño del reporte 2 sin perder nada; con "Siguiente" vuelve a este punto.
  function conectarVolverReporte2A22_(){
    document.getElementById('btnVolverReporte2A22').addEventListener('click', () => {
      document.getElementById('comparacionSeccionesA22').classList.add('hidden');
      document.getElementById('seccionFinalA22').classList.add('hidden');
      document.getElementById('consignaGeneralA22').classList.remove('hidden');
      document.getElementById('disenadorReporteA22').classList.remove('hidden');
    });
  }

  // ---------- Parte 2: comparación de las 3 secciones entre ambos reportes ----------
  function pintarComparacionA22(){
    document.getElementById('comparacionSeccionesA22').classList.remove('hidden');
    const [inv, asi] = estadoReportesA22;
    const specInv = REPORTES_A22[0], specAsi = REPORTES_A22[1];

    const contenidoPorSeccion = {
      encReporte: {
        a: `<div style="font-weight:800;">${inv.nombreEmpresa}</div><div style="opacity:.85;">${inv.titulo}</div>`,
        b: `<div style="font-weight:800;">${asi.nombreEmpresa}</div><div style="opacity:.85;">${asi.titulo}</div>`
      },
      encPagina: {
        a: `<div style="font-weight:800; font-size:13px;">${inv.camposDetalle.join(' | ')}</div>`,
        b: `<div style="font-weight:800; font-size:13px;">${asi.camposDetalle.join(' | ')}</div>`
      },
      detalle: {
        a: `<div style="font-size:13px; line-height:1.7;">${construirDetalleCompletoA22_(inv)}</div>`,
        b: `<div style="font-size:13px; line-height:1.7;">${construirDetalleCompletoA22_(asi)}</div>`
      }
    };

    const cont = document.getElementById('comparacionSeccionesA22');
    cont.innerHTML = `
      ${htmlBotonVolverA_('btnVolverReporte2A22', 'Volver al reporte 2')}
      <div class="section-heading" style="font-size:18px;">Compara los 2 reportes</div>
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-comments"></i> Coméntalo con tu pareja de trabajo, y luego escribe en tus propias palabras en qué se diferencia cada sección entre el ${specInv.nombre} y el ${specAsi.nombre}.</div>

      ${SECCIONES_COMPARAR_A22.map(s => `
        <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
          <div class="caso-a110-escenario" style="margin-bottom:8px;">${s.nombre}</div>
          <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:12px;">
            <div class="libro-ejemplo-box" style="flex:1; min-width:220px; max-height:180px; overflow-y:auto;"><b style="font-size:11px; opacity:.7;">${specInv.nombre.toUpperCase()}</b><br>${contenidoPorSeccion[s.id].a}</div>
            <div class="libro-ejemplo-box" style="flex:1; min-width:220px; max-height:180px; overflow-y:auto;"><b style="font-size:11px; opacity:.7;">${specAsi.nombre.toUpperCase()}</b><br>${contenidoPorSeccion[s.id].b}</div>
          </div>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">¿En qué se diferencia esta sección entre ambos reportes?</label>
          <textarea class="input-generico celda-respuesta-a15 textarea-comparar-a22" data-seccion="${s.id}" rows="2" placeholder="Escribe tu explicación..."></textarea>
        </div>
      `).join('')}

      <div id="feedbackComparacionA22"></div>
      <button type="button" class="btn btn-primary" id="btnConfirmarComparacionA22" style="width:auto; padding:12px 28px;">
        <i class="fa-solid fa-check"></i> Confirmar
      </button>`;

    document.querySelectorAll('.textarea-comparar-a22').forEach(ta => {
      ta.addEventListener('input', () => { respuestasComparacionA22[ta.dataset.seccion] = ta.value; });
    });

    document.getElementById('btnConfirmarComparacionA22').addEventListener('click', verificarComparacionA22);

    // Si el estudiante vuelve de la Vista de Diseño, se restauran sus respuestas anteriores
    cont.querySelectorAll('.textarea-comparar-a22').forEach(ta => {
      if(respuestasComparacionA22[ta.dataset.seccion]) ta.value = respuestasComparacionA22[ta.dataset.seccion];
    });
    conectarVolverReporte2A22_();
  }

  function verificarComparacionA22(){
    intentosComparacionA22++;
    let todoCorrecto = true;
    SECCIONES_COMPARAR_A22.forEach(s => {
      if(contarPalabrasRealesA15_(respuestasComparacionA22[s.id] || '') < 4) todoCorrecto = false;
    });

    if(!todoCorrecto){
      document.getElementById('feedbackComparacionA22').innerHTML = `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>Todavía falta alguna explicación, o es muy corta. Escribe con tus propias palabras la diferencia de cada sección.</div></div>`;
      return;
    }

    comparacionCompletaA22 = true;
    mostrarCompletoComparacionA22_();
  }

  document.getElementById('btnFinalizarA22').addEventListener('click', async () => {
    clearInterval(timerIntervalA22);

    const minutosTranscurridos = (Date.now() - inicioTiempoA22) / 60000;
    const [inv, asi] = estadoReportesA22;

    const totalIntentos = (e) => e.intentos.encReporte + e.intentos.detalle + e.intentos.encPagina;
    const disenoInvOk = totalIntentos(inv) <= 5;
    const disenoAsiOk = totalIntentos(asi) <= 5;
    const vistasOk = inv.vistasVisitadas.size >= 3 && asi.vistasVisitadas.size >= 3;
    const comparacionOk = intentosComparacionA22 <= 2;

    const criterios = [
      { nombre: CRITERIOS_BASE_A22[0].nombre, descripcion: CRITERIOS_BASE_A22[0].descripcion, nivel:'cumple' },
      { nombre: CRITERIOS_BASE_A22[1].nombre, descripcion: CRITERIOS_BASE_A22[1].descripcion, nivel: disenoInvOk ? 'cumple' : 'no_cumple' },
      { nombre: CRITERIOS_BASE_A22[2].nombre, descripcion: CRITERIOS_BASE_A22[2].descripcion, nivel: disenoAsiOk ? 'cumple' : 'no_cumple' },
      { nombre: CRITERIOS_BASE_A22[3].nombre, descripcion: CRITERIOS_BASE_A22[3].descripcion, nivel: vistasOk ? 'cumple' : 'no_cumple' },
      { nombre: CRITERIOS_BASE_A22[4].nombre, descripcion: CRITERIOS_BASE_A22[4].descripcion, nivel: comparacionOk ? 'cumple' : 'no_cumple' },
      { nombre: CRITERIOS_BASE_A22[5].nombre, descripcion: CRITERIOS_BASE_A22[5].descripcion, nivel: minutosTranscurridos <= tiempoEstimadoA22 * 1.5 ? 'cumple' : 'no_cumple' },
      { nombre: CRITERIOS_BASE_A22[6].nombre, descripcion: CRITERIOS_BASE_A22[6].descripcion, nivel:'cumple' }
    ];

    const pesoUnidad = puntajeMaxA22 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => { if(c.nivel === 'cumple') notaCalculada += pesoUnidad; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA22').classList.add('hidden');
    document.getElementById('vistaResultadoA22').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA22').classList.add('hidden');
    renderListaCotejo('rubricaResultadoA22', criterios, puntajeMaxA22, notaCalculada);
    ultimoResultadoA22 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA22 };

    const proporcionFinalA22 = puntajeMaxA22 > 0 ? notaCalculada / puntajeMaxA22 : 0;
    mostrarLogro(proporcionFinalA22 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA22 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA22 >= 0.8) dispararConfeti();

    const detalleA22 = [
      {
        titulo: 'Reportes diseñados',
        items: [
          { pregunta:'Reporte de Inventario', tuRespuesta: `${inv.nombreEmpresa} — ${inv.titulo} (campos: ${inv.camposDetalle.join(', ')})`, correcta: disenoInvOk },
          { pregunta:'Reporte de Asistencia', tuRespuesta: `${asi.nombreEmpresa} — ${asi.titulo} (campos: ${asi.camposDetalle.join(', ')})`, correcta: disenoAsiOk }
        ]
      },
      {
        titulo: 'Comparación de secciones',
        items: SECCIONES_COMPARAR_A22.map(s => ({
          pregunta: `Diferencia en "${s.nombre}"`,
          tuRespuesta: respuestasComparacionA22[s.id] || 'Sin responder',
          correcta: contarPalabrasRealesA15_(respuestasComparacionA22[s.id] || '') >= 4
        }))
      }
    ];
    ultimoResultadoA22.detalle = detalleA22;
    renderDesgloseColoreado('resultadoDesgloseA22', detalleA22);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.2.2',
        ra:'RA2',
        ec:'EC6.2.1',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA22,
        criterios: criterios,
        detalle: detalleA22
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA22').addEventListener('click', () => {
    if(!ultimoResultadoA22) return;
    generarPdfResultado('A.2.2', ultimoResultadoA22.criterios, ultimoResultadoA22.nota, ultimoResultadoA22.puntajeMaximo, 'EC6.2.1', 'RA2', ultimoResultadoA22.detalle);
  });

  document.getElementById('btnVolverMisActA22').addEventListener('click', () => {
    document.getElementById('panelActividadA22').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.2.2', abrirActividadA22);

// ============================================================================
// A.2.3 — DISEÑA E IDENTIFICA UN REPORTE AGRUPADO (ventas por región)
// ============================================================================
  // Reutiliza el mismo Diseñador de Reportes (lienzo editable + 3 vistas) de
  // A.2.1/A.2.2, agregando una nueva caja "Agrupar por" para que el estudiante
  // lleve a la práctica el encabezado de grupo, el detalle de grupo y el pie
  // de grupo explicados en el recurso de apoyo "Reportes_Agrupados_A23.pdf".
  // El reporte debe quedar idéntico al del recurso: ventas agrupadas por
  // Región, con un total y una cantidad de ventas por grupo.

  const CAMPOS_CORRECTOS_DETALLE_A23 = ['Producto', 'Vendedor', 'PrecioUnitario'];
  const ETIQUETAS_CAMPOS_A23 = { PrecioUnitario: 'Monto' };

  const CRITERIOS_BASE_A23 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'encReporte', nombre:'2. Encabezado de reporte', descripcion:'Escribe correctamente el nombre de la empresa y el título del reporte.' },
    { key:'detalle', nombre:'3. Línea de detalle', descripcion:'Selecciona la tabla correcta y arrastra exactamente los campos correctos hacia la línea de detalle.' },
    { key:'agrupacion', nombre:'4. Agrupación por región', descripcion:'Agrupa el reporte por el campo correcto, generando encabezado, detalle y pie de grupo.' },
    { key:'encPagina', nombre:'5. Encabezado de página', descripcion:'Incluye el número de página además de los títulos de columna.' },
    { key:'vistas', nombre:'6. Recorrido de las 3 vistas', descripcion:'Recorre las vistas de Diseño, Previsualización y Ejecución del reporte ya construido.' },
    { key:'identificar', nombre:'7. Identifica y define las partes del grupo', descripcion:'Identifica correctamente el encabezado de grupo, el detalle de grupo y el pie de grupo, y explica en sus propias palabras la función que cumple cada uno.' },
    { key:'tiempo', nombre:'8. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'9. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let tablaSeleccionadaDetalleA23 = '';
  let datosTablaSeleccionadaA23 = null;
  let nombreEmpresaValorA23 = '';
  let tituloReporteValorA23 = '';
  let camposColocadosDetalleA23 = [];
  let campoSeleccionadoA23 = null;
  let campoAgruparA23 = '';
  let numPaginaMarcadoA23 = false;
  let encReporteCorrectoA23 = false;
  let detalleCorrectoA23 = false;
  let agrupacionCorrectaA23 = false;
  let encPaginaCorrectoA23 = false;
  let intentosPorSeccionA23 = { encReporte:0, detalle:0, agrupacion:0, encPagina:0 };
  let vistaActualA23 = 'diseno';
  let vistasVisitadasA23 = new Set();
  let ordenSeccionesIdentificarA23 = [];
  let respuestasIdentificarA23 = {};
  let intentosIdentificarGeneralA23 = 0;
  let identificarSeccionesCompletoA23 = false;

  const SECCIONES_IDENTIFICAR_A23_BASE = [
    { id:'encGrupo', nombre:'Encabezado de grupo' },
    { id:'detalleGrupo', nombre:'Detalle de grupo' },
    { id:'pieGrupo', nombre:'Pie de grupo' }
  ];
  let ultimoResultadoA23 = null;
  let puntajeMaxA23 = 0;
  let tiempoEstimadoA23 = 10;
  let inicioTiempoA23 = null;
  let timerIntervalA23 = null;

  // Busca, entre los campos reales de la tabla cargada, el que corresponde a la
  // región (independientemente de acentos/mayúsculas: "Región" o "Region").
  function normalizarNombreCampoA23_(c){
    return normalizarTextoA15_(c || '').replace(/[^a-z0-9]/g, '');
  }
  function campoRegionDisponibleA23_(){
    const campos = (datosTablaSeleccionadaA23 && datosTablaSeleccionadaA23.campos) || [];
    return campos.find(c => normalizarNombreCampoA23_(c) === 'region') || null;
  }

  // Agrupa las filas de datos reales según el campo elegido, conservando el
  // orden de primera aparición, y calcula el total y la cantidad por grupo.
  function agruparDatosA23_(datos, campoAgrupar){
    if(!datos || !campoAgrupar) return [];
    const grupos = [];
    const indice = {};
    datos.forEach(fila => {
      const clave = fila[campoAgrupar];
      if(!(clave in indice)){
        indice[clave] = { clave, filas: [], total: 0, cantidad: 0 };
        grupos.push(indice[clave]);
      }
      indice[clave].filas.push(fila);
      indice[clave].cantidad++;
      const monto = Number(fila.PrecioUnitario) || 0;
      indice[clave].total += monto;
    });
    return grupos;
  }

  async function abrirActividadA23(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA23 = puntajeMaximo;
    tiempoEstimadoA23 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA23').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA23').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.2.3') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA23').classList.add('hidden');
        document.getElementById('vistaEjercicioA23').classList.add('hidden');
        document.getElementById('vistaResultadoA23').classList.remove('hidden');
        renderRubrica('rubricaResultadoA23', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA23', previa.detalle);
        ultimoResultadoA23 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA23').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA23').classList.add('hidden');
    document.getElementById('vistaInstrumentoA23').classList.remove('hidden');
    document.getElementById('vistaEjercicioA23').classList.add('hidden');
    document.getElementById('vistaResultadoA23').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA23').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA23} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.2.3', 'recursosEstudianteA23');

    const criteriosPrevios = CRITERIOS_BASE_A23.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA23', criteriosPrevios, puntajeMaxA23, null);
  }

  document.getElementById('btnBackFromActividadA23').addEventListener('click', () => {
    clearInterval(timerIntervalA23);
    document.getElementById('panelActividadA23').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA23').addEventListener('click', async () => {
    nombreEmpresaValorA23 = '';
    tituloReporteValorA23 = '';
    tablaSeleccionadaDetalleA23 = '';
    datosTablaSeleccionadaA23 = null;
    camposColocadosDetalleA23 = [];
    campoSeleccionadoA23 = null;
    campoAgruparA23 = '';
    numPaginaMarcadoA23 = false;
    encReporteCorrectoA23 = false;
    detalleCorrectoA23 = false;
    agrupacionCorrectaA23 = false;
    encPaginaCorrectoA23 = false;
    intentosPorSeccionA23 = { encReporte:0, detalle:0, agrupacion:0, encPagina:0 };
    vistaActualA23 = 'diseno';
    vistasVisitadasA23 = new Set();
    ordenSeccionesIdentificarA23 = [];
    respuestasIdentificarA23 = {};
    intentosIdentificarGeneralA23 = 0;
    identificarSeccionesCompletoA23 = false;
    document.getElementById('identificarSeccionesA23').classList.add('hidden');
    document.getElementById('disenadorReporteA23').classList.remove('hidden');
    document.getElementById('seccionFinalA23').classList.add('hidden');
    document.getElementById('vistaInstrumentoA23').classList.add('hidden');
    document.getElementById('vistaEjercicioA23').classList.remove('hidden');

    pintarSeccionDisenoYVistasA23();

    inicioTiempoA23 = Date.now();
    clearInterval(timerIntervalA23);
    timerIntervalA23 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA23) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA23').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA23} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Sección de diseño + 3 vistas, todo en una sola pantalla con pestañas ----------
  const DESCRIPCIONES_SECCION_A23 = {
    encReporte: 'Debe contener el nombre de la empresa y el título del reporte. Aparece una sola vez, al principio de todo el documento.',
    detalle: 'Debes arrastrar exactamente estos 3 campos: <b>Producto</b>, <b>Vendedor</b> y <b>Monto</b>. Se repite una vez por cada venta, dentro de cada grupo.',
    agrupar: 'Elige el campo por el que se agrupará el reporte. Cada grupo mostrará un encabezado de grupo, el detalle de sus ventas y un pie de grupo con el total.',
    encPagina: 'Se repite en la parte superior de cada página, con los títulos de columna y el número de página.'
  };

  function pintarSeccionDisenoYVistasA23(){
    const cont = document.getElementById('disenadorReporteA23');
    cont.innerHTML = `
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-hand-pointer"></i> Diseña tu reporte en la pestaña "Vista de Diseño". Puedes volver a esa pestaña en cualquier momento para hacer cambios.</div>
      <div class="vistas-tabs" id="vistasTabsA23"></div>
      <div id="vistaContenidoA23"></div>`;
    pintarTabsVistasA23();
    cambiarVistaA23(vistaActualA23 || 'diseno');
  }

  function pintarTabsVistasA23(){
    const cont = document.getElementById('vistasTabsA23');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A14[v];
      const visitada = vistasVisitadasA23.has(v);
      const activa = vistaActualA23 === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');
    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaA23(btn.dataset.vista));
    });
  }

  function cambiarVistaA23(vista){
    vistaActualA23 = vista;
    vistasVisitadasA23.add(vista);
    pintarTabsVistasA23();
    pintarContenidoVistaA23(vista);
  }

  function pintarContenidoVistaA23(vista){
    const cont = document.getElementById('vistaContenidoA23');
    const info = COLOR_VISTA_A14[vista];
    const nombreEmpresa = nombreEmpresaValorA23 || 'TECNOVENTAS RD, S.R.L.';
    const tituloReporte = tituloReporteValorA23 || 'Reporte de Ventas por Región';

    // ---- Pestaña "Vista de Diseño": el lienzo editable de verdad (siempre se puede volver aquí) ----
    if(vista === 'diseno'){
      actualizarEstadoVisualA23();
      const campoRegion = campoRegionDisponibleA23_();
      const campos = (datosTablaSeleccionadaA23 && datosTablaSeleccionadaA23.campos) || [];
      const camposDisponibles = campos.filter(c => !camposColocadosDetalleA23.includes(c) && c !== campoRegion);
      // Para "Agrupar por" se ofrecen varias opciones reales (no solo la correcta),
      // para que el estudiante tenga que elegir el campo correcto entre varios.
      const camposOpcionesAgrupar = campos.filter(c => !camposColocadosDetalleA23.includes(c));

      cont.innerHTML = `
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>

        <div class="lienzo-diseno-a21">
          <div class="caja-diseno-a21 ${encReporteCorrectoA23 ? 'correcta' : ''}" id="cajaEncReporteA23">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-heading"></i> Encabezado de reporte</div>
            <input type="text" id="inputNombreEmpresaA23" class="input-generico" placeholder="Nombre de la empresa..." value="${nombreEmpresaValorA23.replace(/"/g,'&quot;')}">
            <input type="text" id="inputTituloReporteA23" class="input-generico" placeholder="Título del reporte..." style="margin-top:8px;" value="${tituloReporteValorA23.replace(/"/g,'&quot;')}">
            <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A23.encReporte}</p>
          </div>

          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <div class="caja-diseno-a21 ${detalleCorrectoA23 ? 'correcta' : ''}" id="cajaDetalleA23" style="flex:1.3; min-width:260px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-table-list"></i> Línea de detalle</div>
              <div class="zona-arrastre-a21" id="zonaDetalleA23">
                ${camposColocadosDetalleA23.length === 0 ? 'Arrastra aquí los campos que debe mostrar cada venta' :
                  camposColocadosDetalleA23.map(c => `<span class="campo-chip-a21 colocado" data-id="${c}">${ETIQUETAS_CAMPOS_A23[c] || c} <i class="fa-solid fa-xmark"></i></span>`).join('')}
              </div>
              <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A23.detalle}</p>
            </div>

            <div class="caja-diseno-a21" id="cajaCamposDisponiblesA23" style="flex:1; min-width:220px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-database"></i> Campos disponibles</div>
              <label style="display:block; font-size:12px; font-weight:700; color:var(--dark-text-dim); margin-bottom:6px;">Tabla de datos</label>
              <select id="selectTablaDetalleA23" class="input-generico">
                <option value="" ${tablaSeleccionadaDetalleA23 ? '' : 'selected disabled'}>Selecciona una tabla...</option>
                ${TABLAS_DISPONIBLES_A19.map(t => `<option value="${t.codigo}" ${tablaSeleccionadaDetalleA23 === t.codigo ? 'selected' : ''}>${t.nombre}</option>`).join('')}
              </select>
              ${camposDisponibles.length > 0 ? `
                <p style="margin:10px 0 6px; font-size:11.5px; opacity:.75;">Arrastra o toca para agregar:</p>
                <div class="pool-campos-a21" id="poolCamposA23">
                  ${camposDisponibles.map(c => `<span class="campo-chip-a21 ${campoSeleccionadoA23 === c ? 'seleccionado' : ''}" draggable="true" data-id="${c}">${ETIQUETAS_CAMPOS_A23[c] || c}</span>`).join('')}
                </div>` : ''}
            </div>
          </div>

          <div class="caja-diseno-a21 ${agrupacionCorrectaA23 ? 'correcta' : ''}" id="cajaAgruparA23">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-layer-group"></i> Agrupar por</div>
            <select id="selectAgruparA23" class="input-generico" ${camposOpcionesAgrupar.length ? '' : 'disabled'}>
              <option value="" ${campoAgruparA23 ? '' : 'selected disabled'}>${camposOpcionesAgrupar.length ? 'Selecciona un campo...' : 'Primero selecciona la tabla DB_Ventas'}</option>
              ${camposOpcionesAgrupar.map(c => `<option value="${c}" ${campoAgruparA23 === c ? 'selected' : ''}>${ETIQUETAS_CAMPOS_A23[c] || c}</option>`).join('')}
            </select>
            <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A23.agrupar}</p>
          </div>

          <div class="caja-diseno-a21 ${encPaginaCorrectoA23 ? 'correcta' : ''}" id="cajaEncPaginaA23">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-file-lines"></i> Encabezado de página</div>
            <div class="columnas-generadas-a21" id="columnasGeneradasA23">${camposColocadosDetalleA23.length ? camposColocadosDetalleA23.map(c => ETIQUETAS_CAMPOS_A23[c] || c).join(' | ') : 'Los títulos de columna aparecerán aquí según los campos que arrastres en la línea de detalle...'}</div>
            <div class="instalador-checkbox" id="checkboxNumPaginaA23" style="margin-top:10px; justify-content:flex-start; cursor:pointer;">
              <span class="caja ${numPaginaMarcadoA23 ? 'marcada' : ''}"></span> Incluir número de página
            </div>
            <p class="descripcion-seccion-a21">${DESCRIPCIONES_SECCION_A23.encPagina}</p>
          </div>
        </div>`;

      // Encabezado de reporte: guarda lo que va escribiendo, y actualiza el estado visual en vivo
      document.getElementById('inputNombreEmpresaA23').addEventListener('input', (e) => {
        nombreEmpresaValorA23 = e.target.value;
        actualizarEstadoVisualA23();
        document.getElementById('cajaEncReporteA23').classList.toggle('correcta', encReporteCorrectoA23);
      });
      document.getElementById('inputTituloReporteA23').addEventListener('input', (e) => {
        tituloReporteValorA23 = e.target.value;
        actualizarEstadoVisualA23();
        document.getElementById('cajaEncReporteA23').classList.toggle('correcta', encReporteCorrectoA23);
      });

      // Selector de tabla: al cambiar, carga sus campos reales y reinicia lo ya colocado
      document.getElementById('selectTablaDetalleA23').addEventListener('change', async (e) => {
        tablaSeleccionadaDetalleA23 = e.target.value;
        camposColocadosDetalleA23 = [];
        campoSeleccionadoA23 = null;
        campoAgruparA23 = '';
        cont.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando campos de la tabla...</div>';
        datosTablaSeleccionadaA23 = tablaSeleccionadaDetalleA23 ? await cargarTablaDatos(tablaSeleccionadaDetalleA23) : null;
        pintarContenidoVistaA23('diseno');
      });

      // Selector "Agrupar por"
      const selectAgrupar = document.getElementById('selectAgruparA23');
      if(selectAgrupar){
        selectAgrupar.addEventListener('change', (e) => {
          campoAgruparA23 = e.target.value;
          pintarContenidoVistaA23('diseno');
        });
      }

      // Campos del pool: clic para seleccionar (accesible en táctil)
      document.querySelectorAll('#poolCamposA23 .campo-chip-a21').forEach(chip => {
        chip.addEventListener('click', () => {
          const campo = chip.dataset.id;
          campoSeleccionadoA23 = campoSeleccionadoA23 === campo ? null : campo;
          pintarContenidoVistaA23('diseno');
        });
      });

      // Campos ya colocados: clic para quitar
      document.querySelectorAll('#zonaDetalleA23 .campo-chip-a21.colocado').forEach(chip => {
        chip.addEventListener('click', () => {
          camposColocadosDetalleA23 = camposColocadosDetalleA23.filter(c => c !== chip.dataset.id);
          pintarContenidoVistaA23('diseno');
        });
      });

      // Zona de detalle: clic para colocar el campo seleccionado, o soltar (drag) directamente
      const zonaDetalle = document.getElementById('zonaDetalleA23');
      zonaDetalle.addEventListener('click', () => {
        if(campoSeleccionadoA23 && !camposColocadosDetalleA23.includes(campoSeleccionadoA23)){
          camposColocadosDetalleA23.push(campoSeleccionadoA23);
          campoSeleccionadoA23 = null;
          pintarContenidoVistaA23('diseno');
        }
      });
      const chipsArrastrables = document.querySelectorAll('#poolCamposA23 .campo-chip-a21[draggable="true"]');
      habilitarArrastre(chipsArrastrables, [zonaDetalle], (campoArrastrado) => {
        if(!camposColocadosDetalleA23.includes(campoArrastrado)){
          camposColocadosDetalleA23.push(campoArrastrado);
          campoSeleccionadoA23 = null;
          pintarContenidoVistaA23('diseno');
        }
      });

      // Checkbox de número de página
      document.getElementById('checkboxNumPaginaA23').addEventListener('click', () => {
        numPaginaMarcadoA23 = !numPaginaMarcadoA23;
        pintarContenidoVistaA23('diseno');
      });

      return;
    }

    // ---- Pestañas de Previsualización y Ejecución ----
    if(camposColocadosDetalleA23.length === 0 || !campoAgruparA23){
      cont.innerHTML = `
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>
        <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-circle-info"></i> Todavía no has completado la línea de detalle y la agrupación en la Vista de Diseño. Vuelve a esa pestaña para completarlo.</div>`;
      return;
    }

    const grupos = agruparDatosA23_((datosTablaSeleccionadaA23 && datosTablaSeleccionadaA23.datos) || [], campoAgruparA23);

    function formatearMonto(valor){
      return 'RD$' + (Number(valor) || 0).toLocaleString('es-DO', {minimumFractionDigits:2});
    }

    let gruposHtml = '';
    if(vista === 'previsualizacion'){
      gruposHtml = ['Norte', 'Sur'].map(claveEjemplo => `
        <div style="margin-top:14px;">
          <div style="background:#C9A22733; border-left:4px solid #C9A227; padding:6px 10px; font-weight:800; font-size:12.5px;">${campoAgruparA23}: ${claveEjemplo}</div>
          ${[1,2].map(() => `<div style="display:flex; gap:14px; font-size:12.5px; padding:3px 10px; opacity:.6;">${camposColocadosDetalleA23.map(() => `<span style="flex:1;">[muestra]</span>`).join('')}</div>`).join('')}
          <div style="background:#22c55e22; border-left:4px solid #22c55e; padding:6px 10px; font-weight:700; font-size:12px;">Total ${claveEjemplo}: [muestra]</div>
        </div>`).join('');
    } else if(vista === 'ejecucion'){
      gruposHtml = grupos.map(g => `
        <div style="margin-top:14px;">
          <div style="background:#C9A22733; border-left:4px solid #C9A227; padding:6px 10px; font-weight:800; font-size:12.5px;">${campoAgruparA23}: ${g.clave}</div>
          ${g.filas.map(f => `
            <div style="display:flex; gap:14px; font-size:12.5px; padding:3px 10px;">
              ${camposColocadosDetalleA23.map(c => {
                let valor = f[c];
                if(c === 'PrecioUnitario') valor = formatearMonto(valor);
                else valor = formatearValorCeldaReporte_(valor);
                return `<span style="flex:1;">${valor !== undefined ? valor : ''}</span>`;
              }).join('')}
            </div>`).join('')}
          <div style="background:#22c55e22; border-left:4px solid #22c55e; padding:6px 10px; font-weight:700; font-size:12px;">Total ${g.clave} (${g.cantidad} ventas): ${formatearMonto(g.total)}</div>
        </div>`).join('');
    }

    cont.innerHTML = `
      <div class="simulador-pantalla">
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>
        <div style="font-weight:800; font-size:15px; margin-top:10px;">${nombreEmpresa}</div>
        <div style="font-size:13px; opacity:.85; margin-bottom:10px;">${tituloReporte}</div>
        <div style="display:flex; gap:14px; font-weight:800; font-size:12.5px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
          ${camposColocadosDetalleA23.map(c => `<span style="flex:1;">${ETIQUETAS_CAMPOS_A23[c] || c}</span>`).join('')}
        </div>
        ${gruposHtml}
      </div>
      ${vista === 'ejecucion' ? `
        <div id="feedbackEjecucionA23"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:16px; flex-wrap:wrap;">
          <button type="button" class="btn-descargar-pdf" id="btnDescargarReportePdfA23">
            <i class="fa-solid fa-file-pdf"></i> Descargar reporte en PDF
          </button>
          <button type="button" class="btn btn-primary" id="btnSiguienteEjecucionA23" style="width:auto; padding:12px 28px;">
            <i class="fa-solid fa-arrow-right"></i> Siguiente
          </button>
        </div>` : ''}`;

    if(vista === 'ejecucion'){
      document.getElementById('btnDescargarReportePdfA23').addEventListener('click', () => {
        generarPdfReporteDisenado({
          nombreEmpresa,
          tituloReporte,
          columnas: camposColocadosDetalleA23.map(c => ETIQUETAS_CAMPOS_A23[c] || c),
          grupos: grupos.map(g => ({
            encabezado: `${campoAgruparA23}: ${g.clave}`,
            filas: g.filas.map(f => camposColocadosDetalleA23.map(c => c === 'PrecioUnitario' ? formatearMonto(f[c]) : formatearValorCeldaReporte_(f[c]))),
            pie: `Total ${g.clave} (${g.cantidad} ventas): ${formatearMonto(g.total)}`
          })),
          numeroPagina: numPaginaMarcadoA23
        });
      });
      document.getElementById('btnSiguienteEjecucionA23').addEventListener('click', intentarAvanzarDesdeEjecucionA23);
    }
  }

  // Recalcula en vivo (sin contar intentos) si cada sección luce correcta, para el borde verde inmediato
  function actualizarEstadoVisualA23(){
    const empresaOk = normalizarTextoA15_(nombreEmpresaValorA23).includes('tecnoventas');
    const tituloOk = normalizarTextoA15_(tituloReporteValorA23).includes('venta') && normalizarTextoA15_(tituloReporteValorA23).includes('region');
    encReporteCorrectoA23 = empresaOk && tituloOk;

    const seleccion = [...camposColocadosDetalleA23].sort();
    const esperado = [...CAMPOS_CORRECTOS_DETALLE_A23].sort();
    const tablaOk = tablaSeleccionadaDetalleA23 === 'DB_Ventas';
    detalleCorrectoA23 = tablaOk && seleccion.length === esperado.length && seleccion.every((c, i) => c === esperado[i]);

    const campoRegion = campoRegionDisponibleA23_();
    agrupacionCorrectaA23 = !!campoRegion && campoAgruparA23 === campoRegion;

    encPaginaCorrectoA23 = camposColocadosDetalleA23.length > 0 && numPaginaMarcadoA23;
  }

  // Se dispara desde el botón "Siguiente" de la pestaña de Ejecución — valida todo y, si está
  // completo, avanza a la segunda parte de la actividad (identificar y definir las partes del grupo).
  function intentarAvanzarDesdeEjecucionA23(){
    actualizarEstadoVisualA23();
    const mensajes = [];

    if(!encReporteCorrectoA23){
      intentosPorSeccionA23.encReporte++;
      mensajes.push('El <b>encabezado de reporte</b> todavía no está completo: debe incluir el nombre de la empresa (TECNOVENTAS RD) y un título que mencione que es un reporte de ventas por región. Vuelve a la Vista de Diseño para completarlo.');
    }

    if(!detalleCorrectoA23){
      intentosPorSeccionA23.detalle++;
      mensajes.push('La <b>línea de detalle</b> no tiene exactamente los campos correctos (Producto, Vendedor y Monto).');
    }

    if(!agrupacionCorrectaA23){
      intentosPorSeccionA23.agrupacion++;
      const campoRegion = campoRegionDisponibleA23_();
      mensajes.push(!campoRegion
        ? 'Todavía no hay un campo de <b>Región</b> disponible en DB_Ventas. Avísale a tu profesora para que lo agregue, o verifica que seleccionaste la tabla correcta.'
        : 'Todavía no has elegido el campo correcto en <b>"Agrupar por"</b>. Vuelve a la Vista de Diseño y selecciona Región.');
    }

    if(!encPaginaCorrectoA23){
      intentosPorSeccionA23.encPagina++;
      mensajes.push('El <b>encabezado de página</b> necesita el número de página marcado. Vuelve a la Vista de Diseño para completarlo.');
    }

    if(mensajes.length > 0){
      document.getElementById('feedbackEjecucionA23').innerHTML = mensajes.map(m =>
        `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`
      ).join('');
      return;
    }

    document.getElementById('disenadorReporteA23').classList.add('hidden');
    mostrarIdentificarA23_();
  }

  // Si ya había completado la identificación y vuelve a avanzar, se muestra su estado final;
  // si no, se dibuja el ejercicio (restaurando lo que ya había escrito).
  function mostrarIdentificarA23_(){
    if(identificarSeccionesCompletoA23) mostrarCompletoIdentificarA23_();
    else pintarIdentificarSeccionesA23();
  }

  function mostrarCompletoIdentificarA23_(){
    const cont = document.getElementById('identificarSeccionesA23');
    cont.classList.remove('hidden');
    cont.innerHTML = htmlBotonVolverA_('btnVolverDisenoA23', 'Volver al diseño') +
      '<div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste la identificación de las 3 partes del grupo!</div>';
    conectarVolverDisenoA23_();
    document.getElementById('seccionFinalA23').classList.remove('hidden');
  }

  // Vuelve a la Vista de Diseño sin perder nada de lo hecho; con "Siguiente" regresa a este punto.
  function conectarVolverDisenoA23_(){
    document.getElementById('btnVolverDisenoA23').addEventListener('click', () => {
      document.getElementById('identificarSeccionesA23').classList.add('hidden');
      document.getElementById('seccionFinalA23').classList.add('hidden');
      document.getElementById('disenadorReporteA23').classList.remove('hidden');
    });
  }

  // ---------- Identifica y define las partes del grupo del reporte ya construido ----------
  function pintarIdentificarSeccionesA23(){
    document.getElementById('identificarSeccionesA23').classList.remove('hidden');
    if(!ordenSeccionesIdentificarA23 || ordenSeccionesIdentificarA23.length === 0) ordenSeccionesIdentificarA23 = barajar(SECCIONES_IDENTIFICAR_A23_BASE);

    const grupos = agruparDatosA23_((datosTablaSeleccionadaA23 && datosTablaSeleccionadaA23.datos) || [], campoAgruparA23);
    const primerGrupo = grupos[0] || { clave:'', filas:[], total:0, cantidad:0 };
    const filaEjemplo = primerGrupo.filas[0] || null;

    function formatearMonto(valor){
      return 'RD$' + (Number(valor) || 0).toLocaleString('es-DO', {minimumFractionDigits:2});
    }

    const contenidoPorSeccion = {
      encGrupo: `<div style="font-weight:800;">${campoAgruparA23}: ${primerGrupo.clave}</div>`,
      detalleGrupo: `<div style="font-size:13px;">${filaEjemplo ? camposColocadosDetalleA23.map(c => c === 'PrecioUnitario' ? formatearMonto(filaEjemplo[c]) : formatearValorCeldaReporte_(filaEjemplo[c])).join(' | ') : camposColocadosDetalleA23.join(' — ')}</div>`,
      pieGrupo: `<div style="font-size:13px; font-weight:700;">Total ${primerGrupo.clave} (${primerGrupo.cantidad} ventas): ${formatearMonto(primerGrupo.total)}</div>`
    };
    // Mismos colores usados en la Vista de Ejecución: dorado para el encabezado de
    // grupo, neutro para el detalle y verde para el pie de grupo.
    const estiloCajaPorSeccion = {
      encGrupo: 'background:#C9A22733; border-left:4px solid #C9A227;',
      detalleGrupo: 'background: rgba(255,255,255,0.04); border-left:4px solid var(--dark-border);',
      pieGrupo: 'background:#22c55e22; border-left:4px solid #22c55e;'
    };

    const cont = document.getElementById('identificarSeccionesA23');
    cont.innerHTML = `
      ${htmlBotonVolverA_('btnVolverDisenoA23', 'Volver al diseño')}
      <div class="section-heading" style="font-size:18px;">Identifica y define las partes del grupo</div>
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-hand-pointer"></i> Para cada recuadro, identifica qué parte del grupo es y explica en tus propias palabras qué función cumple.</div>

      ${ordenSeccionesIdentificarA23.map(s => `
        <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
          <div style="${estiloCajaPorSeccion[s.id]} padding:10px 14px; border-radius:8px; margin-bottom:12px;">${contenidoPorSeccion[s.id]}</div>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">¿Qué parte del grupo es esta?</label>
          <select class="input-generico select-identificar-a21" data-seccion="${s.id}" style="margin-bottom:12px;">
            <option value="">Selecciona...</option>
            ${barajar(SECCIONES_IDENTIFICAR_A23_BASE).map(op => `<option value="${op.id}">${op.nombre}</option>`).join('')}
          </select>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">En tus palabras, ¿qué función cumple esta parte?</label>
          <textarea class="input-generico celda-respuesta-a15 textarea-definir-a21" data-seccion="${s.id}" rows="2" placeholder="Escribe tu definición..."></textarea>
        </div>
      `).join('')}

      <div id="feedbackIdentificarA23"></div>
      <button type="button" class="btn btn-primary" id="btnConfirmarIdentificarA23" style="width:auto; padding:12px 28px;">
        <i class="fa-solid fa-check"></i> Confirmar
      </button>`;

    document.querySelectorAll('.select-identificar-a21').forEach(sel => {
      sel.addEventListener('change', () => {
        const s = sel.dataset.seccion;
        if(!respuestasIdentificarA23[s]) respuestasIdentificarA23[s] = {};
        respuestasIdentificarA23[s].identificacion = sel.value;
      });
    });
    document.querySelectorAll('.textarea-definir-a21').forEach(ta => {
      ta.addEventListener('input', () => {
        const s = ta.dataset.seccion;
        if(!respuestasIdentificarA23[s]) respuestasIdentificarA23[s] = {};
        respuestasIdentificarA23[s].definicion = ta.value;
      });
    });

    document.getElementById('btnConfirmarIdentificarA23').addEventListener('click', verificarIdentificarSeccionesA23);

    // Si el estudiante vuelve de la Vista de Diseño, se restauran sus respuestas anteriores
    cont.querySelectorAll('.select-identificar-a21').forEach(sel => {
      const r = respuestasIdentificarA23[sel.dataset.seccion];
      if(r && r.identificacion) sel.value = r.identificacion;
    });
    cont.querySelectorAll('.textarea-definir-a21').forEach(ta => {
      const r = respuestasIdentificarA23[ta.dataset.seccion];
      if(r && r.definicion) ta.value = r.definicion;
    });
    conectarVolverDisenoA23_();
  }

  function verificarIdentificarSeccionesA23(){
    intentosIdentificarGeneralA23++;
    let todoCorrecto = true;

    SECCIONES_IDENTIFICAR_A23_BASE.forEach(s => {
      const resp = respuestasIdentificarA23[s.id] || {};
      const identOk = resp.identificacion === s.id;
      const defOk = contarPalabrasRealesA15_(resp.definicion || '') >= 4;
      if(!identOk || !defOk) todoCorrecto = false;
    });

    if(!todoCorrecto){
      document.getElementById('feedbackIdentificarA23').innerHTML = `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>Revisa: alguna identificación o definición todavía no está completa. La definición debe tener varias palabras propias, no solo repetir el nombre de la parte.</div></div>`;
      return;
    }

    identificarSeccionesCompletoA23 = true;
    mostrarCompletoIdentificarA23_();
  }

  document.getElementById('btnFinalizarA23').addEventListener('click', async () => {
    clearInterval(timerIntervalA23);

    const minutosTranscurridos = (Date.now() - inicioTiempoA23) / 60000;
    const nivelPorIntentos = (intentos) => intentos <= 1 ? 'logrado' : (intentos <= 2 ? 'proceso' : 'no_logrado');

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A23[0].nombre, descripcion: CRITERIOS_BASE_A23[0].descripcion, nivel: 'logrado' });
    criterios.push({ nombre: CRITERIOS_BASE_A23[1].nombre, descripcion: CRITERIOS_BASE_A23[1].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA23.encReporte || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A23[2].nombre, descripcion: CRITERIOS_BASE_A23[2].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA23.detalle || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A23[3].nombre, descripcion: CRITERIOS_BASE_A23[3].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA23.agrupacion || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A23[4].nombre, descripcion: CRITERIOS_BASE_A23[4].descripcion, nivel: nivelPorIntentos(intentosPorSeccionA23.encPagina || 1) });
    criterios.push({ nombre: CRITERIOS_BASE_A23[5].nombre, descripcion: CRITERIOS_BASE_A23[5].descripcion, nivel: 'logrado' });
    criterios.push({ nombre: CRITERIOS_BASE_A23[6].nombre, descripcion: CRITERIOS_BASE_A23[6].descripcion, nivel: nivelPorIntentos(intentosIdentificarGeneralA23 || 1) });
    criterios.push({
      nombre: CRITERIOS_BASE_A23[7].nombre, descripcion: CRITERIOS_BASE_A23[7].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA23 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA23 * 2 ? 'proceso' : 'no_logrado')
    });
    criterios.push({ nombre: CRITERIOS_BASE_A23[8].nombre, descripcion: CRITERIOS_BASE_A23[8].descripcion, nivel: 'logrado' });

    const pesoUnidad = puntajeMaxA23 / criterios.length;
    const pesosPorNivel = { logrado:1, proceso:0.5, no_logrado:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA23').classList.add('hidden');
    document.getElementById('vistaResultadoA23').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA23').classList.add('hidden');
    renderRubrica('rubricaResultadoA23', criterios, puntajeMaxA23, notaCalculada);
    ultimoResultadoA23 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA23 };

    const proporcionFinalA23 = puntajeMaxA23 > 0 ? notaCalculada / puntajeMaxA23 : 0;
    mostrarLogro(proporcionFinalA23 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA23 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA23 >= 0.8) dispararConfeti();

    const detalleA23 = [
      {
        titulo: 'Diseño del reporte agrupado',
        items: [
          { pregunta:'Encabezado de reporte', tuRespuesta: `Completado en ${intentosPorSeccionA23.encReporte || 1} intento(s)`, correcta: (intentosPorSeccionA23.encReporte || 1) <= 1 },
          { pregunta:'Línea de detalle', tuRespuesta: camposColocadosDetalleA23.map(c => ETIQUETAS_CAMPOS_A23[c] || c).join(', '), correcta: (intentosPorSeccionA23.detalle || 1) <= 1 },
          { pregunta:'Agrupación', tuRespuesta: `Agrupado por: ${campoAgruparA23 || 'Sin definir'}`, correcta: (intentosPorSeccionA23.agrupacion || 1) <= 1 },
          { pregunta:'Encabezado de página', tuRespuesta: `Completado en ${intentosPorSeccionA23.encPagina || 1} intento(s)`, correcta: (intentosPorSeccionA23.encPagina || 1) <= 1 }
        ]
      },
      {
        titulo: 'Recorrido de vistas e identificación de las partes del grupo',
        items: [
          { pregunta:'¿Recorrió las 3 vistas (Diseño, Previsualización, Ejecución)?', tuRespuesta: `${vistasVisitadasA23.size} de 3`, correcta: vistasVisitadasA23.size >= 3 },
          ...SECCIONES_IDENTIFICAR_A23_BASE.map(s => {
            const resp = respuestasIdentificarA23[s.id] || {};
            const nombreIdentificado = (SECCIONES_IDENTIFICAR_A23_BASE.find(x => x.id === resp.identificacion) || {}).nombre || 'Sin responder';
            return {
              pregunta: `¿Qué es "${s.nombre}" y qué función cumple?`,
              tuRespuesta: `Identificó: ${nombreIdentificado}. Definición: ${resp.definicion || 'Sin responder'}`,
              correcta: resp.identificacion === s.id && contarPalabrasRealesA15_(resp.definicion || '') >= 4
            };
          })
        ]
      }
    ];
    ultimoResultadoA23.detalle = detalleA23;
    renderDesgloseColoreado('resultadoDesgloseA23', detalleA23);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.2.3',
        ra:'RA2',
        ec:'EC6.2.2',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA23,
        criterios: criterios,
        detalle: detalleA23
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA23').addEventListener('click', () => {
    if(!ultimoResultadoA23) return;
    generarPdfResultado('A.2.3', ultimoResultadoA23.criterios, ultimoResultadoA23.nota, ultimoResultadoA23.puntajeMaximo, 'EC6.2.2', 'RA2', ultimoResultadoA23.detalle);
  });

  document.getElementById('btnVolverMisActA23').addEventListener('click', () => {
    document.getElementById('panelActividadA23').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.2.3', abrirActividadA23);

// ============================================================================
// A.2.4 — REPORTE DE GASTOS COMPLETO: PIE DE PÁGINA vs PIE DE REPORTE
// ============================================================================
  // Individual. El estudiante completa el Diseñador de Reportes con las 5 secciones:
  // encabezado de reporte, encabezado de página, línea de detalle, PIE DE PÁGINA y
  // PIE DE REPORTE (las dos últimas son nuevas en el diseñador), y debe establecer la
  // diferencia entre ambos pies. Se apoya en el recurso "Pie_de_Pagina_y_Pie_de_Reporte_A24.pdf".
  //
  // Novedades del diseñador respecto a A.2.1–A.2.3:
  //  • Ubicar elementos (títulos de columna, número de página, fecha de impresión, total
  //    general, cantidad de registros...) en la sección correcta, y ver el resultado.
  //  • La Vista de Ejecución muestra el reporte PAGINADO (varias hojas): así se ve que el
  //    pie de página se repite en cada hoja y el pie de reporte sale una sola vez al final.
  //  • El PDF descargable respeta ese mismo diseño (pie de página en cada hoja, pie de
  //    reporte al final).

  const FILAS_POR_HOJA_A24 = 5;
  const CAMPOS_CORRECTOS_DETALLE_A24 = ['Fecha', 'Descripcion', 'Departamento', 'Monto'];
  const ETIQUETAS_CAMPOS_A24 = { Descripcion:'Descripción', Categoria:'Categoría', AprobadoPor:'Aprobado por' };
  const etiquetaCampoA24_ = (c) => ETIQUETAS_CAMPOS_A24[c] || c;

  // Datos de respaldo: se usan si la tabla DB_Gastos del Sheet aún no tiene datos reales
  // (ver sembrarDBGastosA24 en Code.gs). Mismos campos que la tabla real.
  const CAMPOS_GASTOS_A24 = ['Fecha', 'Categoria', 'Descripcion', 'Monto', 'Departamento', 'AprobadoPor'];
  const DATOS_GASTOS_RESPALDO_A24 = [
    ['2026-01-05','Servicios','Pago de energía eléctrica',21350,'Administración','Rosa Jiménez'],
    ['2026-01-07','Suministros','Compra de papel y tóner',6480,'Administración','Rosa Jiménez'],
    ['2026-01-09','Transporte','Combustible camión de reparto',8900,'Almacén','Miguel Santos'],
    ['2026-01-12','Mantenimiento','Reparación de aire acondicionado',14200,'Administración','Rosa Jiménez'],
    ['2026-01-14','Publicidad','Anuncios en redes sociales',11500,'Ventas','Ana Ramírez'],
    ['2026-01-16','Servicios','Servicio de internet',4950,'Administración','Rosa Jiménez'],
    ['2026-01-19','Suministros','Cajas y material de empaque',5320,'Almacén','Carmen Reyes'],
    ['2026-01-21','Capacitación','Taller de atención al cliente',9800,'Ventas','Carlos Fernández'],
    ['2026-01-23','Transporte','Mantenimiento de motocicletas',7450,'Almacén','Miguel Santos'],
    ['2026-01-26','Servicios','Agua potable y recolección',2380,'Administración','Rosa Jiménez'],
    ['2026-01-28','Publicidad','Impresión de volantes',3900,'Ventas','Ana Ramírez'],
    ['2026-01-30','Mantenimiento','Limpieza de oficinas y almacén',6100,'Almacén','Carmen Reyes']
  ].map(fila => { const o = {}; CAMPOS_GASTOS_A24.forEach((c, i) => { o[c] = fila[i]; }); return o; });

  // La tabla real se considera válida si trae los campos y suficientes gastos con monto numérico.
  function tablaGastosValidaA24_(t){
    if(!t || !t.campos || !t.datos) return false;
    if(!['Fecha', 'Descripcion', 'Departamento', 'Monto'].every(c => t.campos.includes(c))) return false;
    const buenas = t.datos.filter(f => String(f.Descripcion || '').trim().length > 3 && isFinite(Number(f.Monto)) && Number(f.Monto) > 0);
    return buenas.length >= 8;
  }
  async function cargarTablaA24_(codigoTabla){
    const t = await cargarTablaDatos(codigoTabla);
    if(codigoTabla === 'DB_Gastos' && !tablaGastosValidaA24_(t)){
      return { campos: [...CAMPOS_GASTOS_A24], datos: DATOS_GASTOS_RESPALDO_A24.map(f => ({ ...f })) };
    }
    return t;
  }

  // Elementos que el estudiante ubica en las secciones. "zona" es la sección correcta;
  // "Subtotal por grupo" es un distractor: este reporte NO está agrupado, no va en ninguna.
  const ELEMENTOS_A24 = [
    { id:'titulosColumna', nombre:'Títulos de columna', zona:'encPagina', pista:'Los títulos de columna se repiten arriba de cada hoja: van en el <b>encabezado de página</b>.' },
    { id:'numeroPagina', nombre:'Número de página', zona:'piePagina', pista:'El número de página es información de cada hoja y se repite en todas: va en el <b>pie de página</b>.' },
    { id:'fechaImpresion', nombre:'Fecha de impresión', zona:'piePagina', pista:'La fecha de impresión se repite en cada hoja: va en el <b>pie de página</b>.' },
    { id:'totalGeneral', nombre:'Total general de gastos', zona:'pieReporte', pista:'El total general resume <b>todos</b> los gastos y sale una sola vez, al final: va en el <b>pie de reporte</b>.' },
    { id:'cantidadGastos', nombre:'Cantidad de gastos registrados', zona:'pieReporte', pista:'La cantidad de gastos resume todo el reporte y sale una sola vez, al final: va en el <b>pie de reporte</b>.' },
    { id:'subtotalGrupo', nombre:'Subtotal por grupo', zona:null, pista:'Este reporte no está agrupado, así que no tiene pies de grupo: deja <b>"Subtotal por grupo"</b> fuera de las tres secciones.' }
  ];
  const ZONAS_A24 = [
    { id:'encPagina', nombre:'Encabezado de página', icono:'fa-heading', clase:'caja-zona-encpag', desc:'Parte superior de cada hoja.' },
    { id:'piePagina', nombre:'Pie de página', icono:'fa-shoe-prints', clase:'caja-zona-piepag', desc:'Parte inferior de cada hoja: se repite en todas.' },
    { id:'pieReporte', nombre:'Pie de reporte', icono:'fa-flag-checkered', clase:'caja-zona-piereporte', desc:'Una sola vez, al final, tras el último gasto.' }
  ];
  const SECCIONES_IDENTIFICAR_A24_BASE = [
    { id:'encReporte', nombre:'Encabezado de reporte' },
    { id:'encPagina', nombre:'Encabezado de página' },
    { id:'detalle', nombre:'Línea de detalle' },
    { id:'piePagina', nombre:'Pie de página' },
    { id:'pieReporte', nombre:'Pie de reporte' }
  ];
  const AFIRMACIONES_A24 = [
    { id:'f1', texto:'Aparece una sola vez, al final de todo el reporte.', correcta:'pieReporte' },
    { id:'f2', texto:'Se repite en la parte inferior de cada hoja.', correcta:'piePagina' },
    { id:'f3', texto:'Muestra el total general de todos los gastos.', correcta:'pieReporte' },
    { id:'f4', texto:'Muestra textos como «Página 2 de 3».', correcta:'piePagina' },
    { id:'f5', texto:'Si el reporte tiene 3 hojas, aparece 3 veces.', correcta:'piePagina' },
    { id:'f6', texto:'Su contenido se calcula con todos los registros del reporte.', correcta:'pieReporte' }
  ];

  const CRITERIOS_BASE_A24 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'encReporte', nombre:'2. Encabezado de reporte', descripcion:'Escribe correctamente el nombre de la empresa y el título del reporte de gastos.' },
    { key:'detalle', nombre:'3. Línea de detalle', descripcion:'Selecciona la tabla correcta y arrastra exactamente los campos correctos hacia la línea de detalle.' },
    { key:'encPagina', nombre:'4. Encabezado de página', descripcion:'Ubica los títulos de columna en el encabezado de página.' },
    { key:'piePagina', nombre:'5. Pie de página', descripcion:'Ubica en el pie de página los elementos que se repiten en cada hoja (número de página y fecha de impresión).' },
    { key:'pieReporte', nombre:'6. Pie de reporte', descripcion:'Ubica en el pie de reporte los resúmenes de todo el reporte (total general y cantidad de gastos).' },
    { key:'vistas', nombre:'7. Recorrido de las 3 vistas', descripcion:'Recorre las vistas de Diseño, Previsualización y Ejecución del reporte ya construido.' },
    { key:'identificar', nombre:'8. Identifica y define las 5 secciones', descripcion:'Identifica correctamente cada sección del reporte y explica en sus propias palabras la función que cumple.' },
    { key:'diferencia', nombre:'9. Diferencia entre pie de página y pie de reporte', descripcion:'Distingue cuándo aparece y qué contiene cada pie, y lo explica con sus propias palabras.' },
    { key:'tiempo', nombre:'10. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'11. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let tablaSeleccionadaDetalleA24 = '';
  let datosTablaSeleccionadaA24 = null;
  let nombreEmpresaValorA24 = '';
  let tituloReporteValorA24 = '';
  let camposColocadosDetalleA24 = [];
  let campoSeleccionadoA24 = null;
  let ubicacionesA24 = {};            // idElemento -> id de sección donde lo colocó
  let elementoSeleccionadoA24 = null;
  let estadoSeccionesA24 = { encReporte:false, detalle:false, encPagina:false, piePagina:false, pieReporte:false };
  let intentosPorSeccionA24 = { encReporte:0, detalle:0, encPagina:0, piePagina:0, pieReporte:0 };
  let vistaActualA24 = 'diseno';
  let vistasVisitadasA24 = new Set();
  let ordenSeccionesIdentificarA24 = [];
  let respuestasIdentificarA24 = {};
  let intentosIdentificarGeneralA24 = 0;
  let identificarSeccionesCompletoA24 = false;
  let respuestasDiferenciaA24 = { afirmaciones:{}, vecesPie:'', vecesPieReporte:'', explicacion:'' };
  let intentosDiferenciaA24 = 0;
  let diferenciaCompletaA24 = false;
  let ultimoResultadoA24 = null;
  let puntajeMaxA24 = 0;
  let tiempoEstimadoA24 = 10;
  let inicioTiempoA24 = null;
  let timerIntervalA24 = null;

  const formatoMontoA24_ = (v) => 'RD$' + (Number(v) || 0).toLocaleString('es-DO', { minimumFractionDigits:2 });
  const escaparAttrA24_ = (t) => String(t || '').replace(/"/g, '&quot;');

  function filasGastosA24_(){ return (datosTablaSeleccionadaA24 && datosTablaSeleccionadaA24.datos) || []; }
  function totalGastosA24_(){ return filasGastosA24_().reduce((s, f) => s + (Number(f.Monto) || 0), 0); }
  function hojasA24_(){
    const filas = filasGastosA24_();
    const hojas = [];
    for(let i = 0; i < filas.length; i += FILAS_POR_HOJA_A24) hojas.push(filas.slice(i, i + FILAS_POR_HOJA_A24));
    return hojas.length ? hojas : [[]];
  }
  function elementosEnZonaA24_(zona){ return ELEMENTOS_A24.filter(e => ubicacionesA24[e.id] === zona); }
  // La Fecha puede venir como texto 'aaaa-mm-dd' o como fecha real de Sheets (llega como texto ISO con
  // hora UTC, p. ej. 2026-01-05T04:00:00.000Z, que en República Dominicana es el 5 de enero a medianoche).
  // Se muestra siempre como dd/mm/aaaa, sin hora y sin correrse de día.
  function formatoFechaA24_(v){
    if(v === null || v === undefined || v === '') return '';
    const txt = String(v);
    const simple = txt.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(simple) return `${simple[3]}/${simple[2]}/${simple[1]}`;
    const d = new Date(v);
    if(isNaN(d.getTime())) return txt;
    return d.toLocaleDateString('es-DO', { timeZone:'America/Santo_Domingo', day:'2-digit', month:'2-digit', year:'numeric' });
  }
  function valorCeldaA24_(campo, fila){
    if(campo === 'Monto') return formatoMontoA24_(fila[campo]);
    if(campo === 'Fecha') return formatoFechaA24_(fila[campo]);
    return formatearValorCeldaReporte_(fila[campo]);
  }
  // Texto con el que se muestra un elemento ya ubicado (en la hoja número "n" de "total")
  function textoElementoA24_(id, n, total){
    switch(id){
      case 'numeroPagina': return `Página ${n} de ${total}`;
      case 'fechaImpresion': return 'Impreso: ' + formatearFechaCortaSinHora_(new Date());
      case 'totalGeneral': return `Total general de gastos: ${formatoMontoA24_(totalGastosA24_())}`;
      case 'cantidadGastos': return `Cantidad de gastos registrados: ${filasGastosA24_().length}`;
      case 'subtotalGrupo': return 'Subtotal por grupo: —';
      default: return '';
    }
  }

  async function abrirActividadA24(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA24 = puntajeMaximo;
    tiempoEstimadoA24 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA24').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA24').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.2.4') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA24').classList.add('hidden');
        document.getElementById('vistaEjercicioA24').classList.add('hidden');
        document.getElementById('vistaResultadoA24').classList.remove('hidden');
        renderRubrica('rubricaResultadoA24', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA24', previa.detalle);
        ultimoResultadoA24 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA24').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA24').classList.add('hidden');
    document.getElementById('vistaInstrumentoA24').classList.remove('hidden');
    document.getElementById('vistaEjercicioA24').classList.add('hidden');
    document.getElementById('vistaResultadoA24').classList.add('hidden');

    document.getElementById('tiempoEstimadoAvisoA24').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA24} minutos</b> para completar esta actividad una vez que la inicies.`;

    cargarRecursosActividad('A.2.4', 'recursosEstudianteA24');

    const criteriosPrevios = CRITERIOS_BASE_A24.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA24', criteriosPrevios, puntajeMaxA24, null);
  }

  document.getElementById('btnBackFromActividadA24').addEventListener('click', () => {
    clearInterval(timerIntervalA24);
    document.getElementById('panelActividadA24').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA24').addEventListener('click', () => {
    nombreEmpresaValorA24 = '';
    tituloReporteValorA24 = '';
    tablaSeleccionadaDetalleA24 = '';
    datosTablaSeleccionadaA24 = null;
    camposColocadosDetalleA24 = [];
    campoSeleccionadoA24 = null;
    ubicacionesA24 = {};
    elementoSeleccionadoA24 = null;
    estadoSeccionesA24 = { encReporte:false, detalle:false, encPagina:false, piePagina:false, pieReporte:false };
    intentosPorSeccionA24 = { encReporte:0, detalle:0, encPagina:0, piePagina:0, pieReporte:0 };
    vistaActualA24 = 'diseno';
    vistasVisitadasA24 = new Set();
    ordenSeccionesIdentificarA24 = [];
    respuestasIdentificarA24 = {};
    intentosIdentificarGeneralA24 = 0;
    identificarSeccionesCompletoA24 = false;
    respuestasDiferenciaA24 = { afirmaciones:{}, vecesPie:'', vecesPieReporte:'', explicacion:'' };
    intentosDiferenciaA24 = 0;
    diferenciaCompletaA24 = false;
    document.getElementById('vistaInstrumentoA24').classList.add('hidden');
    document.getElementById('vistaEjercicioA24').classList.remove('hidden');
    pintarSeccionDisenoYVistasA24();
    mostrarPasoA24_('diseno');

    inicioTiempoA24 = Date.now();
    clearInterval(timerIntervalA24);
    timerIntervalA24 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA24) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA24').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA24} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Pasos de la actividad: diseño → identificar secciones → diferencia entre pies ----------
  function mostrarPasoA24_(paso){
    ['disenadorReporteA24', 'identificarSeccionesA24', 'diferenciaPiesA24', 'seccionFinalA24'].forEach(id => document.getElementById(id).classList.add('hidden'));
    if(paso === 'diseno'){
      document.getElementById('disenadorReporteA24').classList.remove('hidden');
    } else if(paso === 'identificar'){
      if(identificarSeccionesCompletoA24) mostrarCompletoIdentificarA24_(); else pintarIdentificarSeccionesA24();
    } else if(paso === 'diferencia'){
      if(diferenciaCompletaA24) mostrarCompletoDiferenciaA24_(); else pintarDiferenciaA24();
    }
  }

  // ---------- Sección de diseño + 3 vistas, todo en una sola pantalla con pestañas ----------
  function pintarSeccionDisenoYVistasA24(){
    const cont = document.getElementById('disenadorReporteA24');
    cont.innerHTML = `
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-hand-pointer"></i> Diseña tu reporte en la pestaña "Vista de Diseño". Puedes volver a esa pestaña en cualquier momento para hacer cambios.</div>
      <div class="vistas-tabs" id="vistasTabsA24"></div>
      <div id="vistaContenidoA24"></div>`;
    pintarTabsVistasA24();
    cambiarVistaA24(vistaActualA24 || 'diseno');
  }

  function pintarTabsVistasA24(){
    const cont = document.getElementById('vistasTabsA24');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A14[v];
      const visitada = vistasVisitadasA24.has(v);
      const activa = vistaActualA24 === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');
    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaA24(btn.dataset.vista));
    });
  }

  function cambiarVistaA24(vista){
    vistaActualA24 = vista;
    vistasVisitadasA24.add(vista);
    pintarTabsVistasA24();
    pintarContenidoVistaA24(vista);
  }

  // Recalcula en vivo (sin contar intentos) si cada sección luce correcta
  function actualizarEstadoVisualA24(){
    const empresaOk = normalizarTextoA15_(nombreEmpresaValorA24).includes('tecnoventas');
    const tituloOk = normalizarTextoA15_(tituloReporteValorA24).includes('gasto');
    estadoSeccionesA24.encReporte = empresaOk && tituloOk;

    const seleccion = [...camposColocadosDetalleA24].sort();
    const esperado = [...CAMPOS_CORRECTOS_DETALLE_A24].sort();
    estadoSeccionesA24.detalle = tablaSeleccionadaDetalleA24 === 'DB_Gastos' && seleccion.length === esperado.length && seleccion.every((c, i) => c === esperado[i]);

    ['encPagina', 'piePagina', 'pieReporte'].forEach(z => {
      const esperados = ELEMENTOS_A24.filter(e => e.zona === z).map(e => e.id).sort();
      const puestos = elementosEnZonaA24_(z).map(e => e.id).sort();
      estadoSeccionesA24[z] = esperados.length === puestos.length && esperados.every((id, i) => id === puestos[i]);
    });
  }

  function pintarContenidoVistaA24(vista){
    const cont = document.getElementById('vistaContenidoA24');
    const info = COLOR_VISTA_A14[vista];
    const etiquetaVista = `<span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color}; display:inline-flex; margin-bottom:14px;"><i class="fa-solid ${info.icono}"></i> ${info.nombre}</span>`;

    // ---- Vista de Diseño: el lienzo editable ----
    if(vista === 'diseno'){
      actualizarEstadoVisualA24();
      const campos = (datosTablaSeleccionadaA24 && datosTablaSeleccionadaA24.campos) || [];
      const camposDisponibles = campos.filter(c => !camposColocadosDetalleA24.includes(c));
      const elementosLibres = ELEMENTOS_A24.filter(e => !ubicacionesA24[e.id]);

      cont.innerHTML = `
        ${etiquetaVista}
        <div class="lienzo-diseno-a21">
          <div class="caja-diseno-a21 ${estadoSeccionesA24.encReporte ? 'correcta' : ''}" id="cajaEncReporteA24">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-heading"></i> Encabezado de reporte</div>
            <input type="text" id="inputNombreEmpresaA24" class="input-generico" placeholder="Nombre de la empresa..." value="${escaparAttrA24_(nombreEmpresaValorA24)}">
            <input type="text" id="inputTituloReporteA24" class="input-generico" placeholder="Título del reporte..." style="margin-top:8px;" value="${escaparAttrA24_(tituloReporteValorA24)}">
            <p class="descripcion-seccion-a21">Debe contener el nombre de la empresa y el título del reporte. Aparece una sola vez, al principio de todo el documento.</p>
          </div>

          <div style="display:flex; gap:16px; flex-wrap:wrap;">
            <div class="caja-diseno-a21 ${estadoSeccionesA24.detalle ? 'correcta' : ''}" id="cajaDetalleA24" style="flex:1.3; min-width:260px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-table-list"></i> Línea de detalle</div>
              <div class="zona-arrastre-a21" id="zonaDetalleA24">
                ${camposColocadosDetalleA24.length === 0 ? 'Arrastra aquí los campos que debe mostrar cada gasto' :
                  camposColocadosDetalleA24.map(c => `<span class="campo-chip-a21 colocado" data-id="${c}">${etiquetaCampoA24_(c)} <i class="fa-solid fa-xmark"></i></span>`).join('')}
              </div>
              <p class="descripcion-seccion-a21">Debes arrastrar exactamente estos 4 campos: <b>Fecha</b>, <b>Descripción</b>, <b>Departamento</b> y <b>Monto</b>. Se repite una vez por cada gasto.</p>
            </div>

            <div class="caja-diseno-a21" id="cajaCamposDisponiblesA24" style="flex:1; min-width:220px;">
              <div class="caja-diseno-titulo"><i class="fa-solid fa-database"></i> Campos disponibles</div>
              <label style="display:block; font-size:12px; font-weight:700; color:var(--dark-text-dim); margin-bottom:6px;">Tabla de datos</label>
              <select id="selectTablaDetalleA24" class="input-generico">
                <option value="" ${tablaSeleccionadaDetalleA24 ? '' : 'selected disabled'}>Selecciona una tabla...</option>
                ${TABLAS_DISPONIBLES_A19.map(t => `<option value="${t.codigo}" ${tablaSeleccionadaDetalleA24 === t.codigo ? 'selected' : ''}>${t.nombre}</option>`).join('')}
              </select>
              ${camposDisponibles.length > 0 ? `
                <p style="margin:10px 0 6px; font-size:11.5px; opacity:.75;">Arrastra o toca para agregar:</p>
                <div class="pool-campos-a21" id="poolCamposA24">
                  ${camposDisponibles.map(c => `<span class="campo-chip-a21 ${campoSeleccionadoA24 === c ? 'seleccionado' : ''}" draggable="true" data-id="${c}">${etiquetaCampoA24_(c)}</span>`).join('')}
                </div>` : ''}
            </div>
          </div>

          <div class="caja-diseno-a21" id="cajaElementosA24">
            <div class="caja-diseno-titulo"><i class="fa-solid fa-shapes"></i> Elementos del reporte</div>
            <p class="descripcion-seccion-a21" style="margin-top:0; margin-bottom:10px;">Ubica cada elemento en la sección donde corresponde: arrástralo o tócalo y luego toca la sección. Ojo: algún elemento puede no corresponder a ninguna de estas tres secciones en este reporte.</p>
            <div class="pool-campos-a21" id="poolElementosA24">
              ${elementosLibres.length ? elementosLibres.map(e => `<span class="campo-chip-a21 ${elementoSeleccionadoA24 === e.id ? 'seleccionado' : ''}" draggable="true" data-id="${e.id}">${e.nombre}</span>`).join('') : '<span style="font-size:12.5px; opacity:.7;">Todos los elementos están ubicados (puedes tocarlos en su sección para moverlos).</span>'}
            </div>
          </div>

          <div class="zonas-secciones-a24">
            ${ZONAS_A24.map(z => `
              <div class="caja-diseno-a21 ${z.clase} ${estadoSeccionesA24[z.id] ? 'correcta' : ''}" id="caja_${z.id}_A24">
                <div class="caja-diseno-titulo"><i class="fa-solid ${z.icono}"></i> ${z.nombre}</div>
                <div class="zona-arrastre-a21 zona-elementos-a24" data-zona="${z.id}">
                  ${elementosEnZonaA24_(z.id).length === 0 ? 'Suelta aquí' :
                    elementosEnZonaA24_(z.id).map(e => `<span class="campo-chip-a21 colocado" data-id="${e.id}">${e.nombre} <i class="fa-solid fa-xmark"></i></span>`).join('')}
                </div>
                <p class="descripcion-seccion-a21">${z.desc}</p>
              </div>`).join('')}
          </div>
        </div>`;

      document.getElementById('inputNombreEmpresaA24').addEventListener('input', (e) => {
        nombreEmpresaValorA24 = e.target.value;
        actualizarEstadoVisualA24();
        document.getElementById('cajaEncReporteA24').classList.toggle('correcta', estadoSeccionesA24.encReporte);
      });
      document.getElementById('inputTituloReporteA24').addEventListener('input', (e) => {
        tituloReporteValorA24 = e.target.value;
        actualizarEstadoVisualA24();
        document.getElementById('cajaEncReporteA24').classList.toggle('correcta', estadoSeccionesA24.encReporte);
      });

      document.getElementById('selectTablaDetalleA24').addEventListener('change', async (e) => {
        tablaSeleccionadaDetalleA24 = e.target.value;
        camposColocadosDetalleA24 = [];
        campoSeleccionadoA24 = null;
        cont.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando campos de la tabla...</div>';
        datosTablaSeleccionadaA24 = tablaSeleccionadaDetalleA24 ? await cargarTablaA24_(tablaSeleccionadaDetalleA24) : null;
        pintarContenidoVistaA24('diseno');
      });

      // Campos de la línea de detalle (clic o arrastre)
      document.querySelectorAll('#poolCamposA24 .campo-chip-a21').forEach(chip => {
        chip.addEventListener('click', () => {
          campoSeleccionadoA24 = campoSeleccionadoA24 === chip.dataset.id ? null : chip.dataset.id;
          elementoSeleccionadoA24 = null;
          pintarContenidoVistaA24('diseno');
        });
      });
      document.querySelectorAll('#zonaDetalleA24 .campo-chip-a21.colocado').forEach(chip => {
        chip.addEventListener('click', () => {
          if(campoSeleccionadoA24) return;   // hay un campo seleccionado: el clic es para colocarlo (lo maneja la zona), no para quitar
          camposColocadosDetalleA24 = camposColocadosDetalleA24.filter(c => c !== chip.dataset.id);
          pintarContenidoVistaA24('diseno');
        });
      });
      const zonaDetalle = document.getElementById('zonaDetalleA24');
      zonaDetalle.addEventListener('click', () => {
        if(campoSeleccionadoA24 && !camposColocadosDetalleA24.includes(campoSeleccionadoA24)){
          camposColocadosDetalleA24.push(campoSeleccionadoA24);
          campoSeleccionadoA24 = null;
          pintarContenidoVistaA24('diseno');
        }
      });
      habilitarArrastre(document.querySelectorAll('#poolCamposA24 .campo-chip-a21[draggable="true"]'), [zonaDetalle], (campo) => {
        if(!camposColocadosDetalleA24.includes(campo)){
          camposColocadosDetalleA24.push(campo);
          campoSeleccionadoA24 = null;
          pintarContenidoVistaA24('diseno');
        }
      });

      // Elementos del reporte: clic en el elemento y luego en la sección, o arrastre directo
      document.querySelectorAll('#poolElementosA24 .campo-chip-a21').forEach(chip => {
        chip.addEventListener('click', () => {
          elementoSeleccionadoA24 = elementoSeleccionadoA24 === chip.dataset.id ? null : chip.dataset.id;
          campoSeleccionadoA24 = null;
          pintarContenidoVistaA24('diseno');
        });
      });
      const zonasElementos = [...document.querySelectorAll('.zona-elementos-a24')];
      zonasElementos.forEach(zona => {
        zona.addEventListener('click', (ev) => {
          if(elementoSeleccionadoA24){
            // hay un elemento seleccionado: el clic (incluso sobre otro chip ya ubicado) lo coloca en esta sección
            ubicacionesA24[elementoSeleccionadoA24] = zona.dataset.zona;
            elementoSeleccionadoA24 = null;
            pintarContenidoVistaA24('diseno');
            return;
          }
          const chipColocado = ev.target.closest('.campo-chip-a21.colocado');
          if(chipColocado){
            delete ubicacionesA24[chipColocado.dataset.id];   // clic sobre uno ya ubicado: lo devuelve a la lista
            pintarContenidoVistaA24('diseno');
          }
        });
      });
      habilitarArrastre(document.querySelectorAll('#poolElementosA24 .campo-chip-a21[draggable="true"]'), zonasElementos, (idElemento, zonaEl) => {
        if(ELEMENTOS_A24.some(e => e.id === idElemento)){
          ubicacionesA24[idElemento] = zonaEl.dataset.zona;
          elementoSeleccionadoA24 = null;
          pintarContenidoVistaA24('diseno');
        }
      });
      return;
    }

    // ---- Previsualización y Ejecución ----
    if(camposColocadosDetalleA24.length === 0){
      cont.innerHTML = `${etiquetaVista}<div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-circle-info"></i> Todavía no has agregado campos a la línea de detalle en la Vista de Diseño. Vuelve a esa pestaña para completarlo.</div>`;
      return;
    }

    const nombreEmpresa = nombreEmpresaValorA24 || 'TECNOVENTAS RD, S.R.L.';
    const tituloReporte = tituloReporteValorA24 || 'Reporte de Gastos';
    const columnasHtml = `<div class="hoja-cols-a24">${camposColocadosDetalleA24.map(c => `<span>${etiquetaCampoA24_(c)}</span>`).join('')}</div>`;
    const esEjecucion = vista === 'ejecucion';
    const hojas = esEjecucion ? hojasA24_() : [[null, null]];   // previsualización: una hoja de muestra con 2 filas
    const totalHojas = esEjecucion ? hojas.length : 2;

    // Contenido de una zona: cada elemento ubicado (excepto títulos de columna, que se dibujan como
    // columnas) se muestra como un texto; en la previsualización, como [marcador].
    function itemsZonaHtml(zona, n, etiquetaHtml){
      return elementosEnZonaA24_(zona).filter(e => e.id !== 'titulosColumna')
        .map(e => `<${etiquetaHtml}>${esEjecucion ? textoElementoA24_(e.id, n, totalHojas) : '[' + e.nombre + ']'}</${etiquetaHtml}>`).join('');
    }
    function hojaHtml(filasHoja, n, esUltima){
      const encPag = elementosEnZonaA24_('encPagina');
      const piePag = elementosEnZonaA24_('piePagina');
      const pieRep = elementosEnZonaA24_('pieReporte');
      return `
        <div class="hoja-etiqueta-a24">${esEjecucion ? `Hoja ${n} de ${totalHojas}` : 'Hoja de muestra'}</div>
        <div class="hoja-reporte-a24">
          ${n === 1 ? `<div class="hoja-enc-reporte-a24"><div class="emp">${nombreEmpresa}</div><div class="tit">${tituloReporte}</div></div>` : ''}
          <div class="hoja-enc-pagina-a24">
            ${encPag.some(e => e.id === 'titulosColumna') ? columnasHtml : ''}
            ${itemsZonaHtml('encPagina', n, 'div')}
            ${encPag.length === 0 ? '<div class="hoja-vacio-a24" style="padding:0;">(encabezado de página vacío)</div>' : ''}
          </div>
          ${filasHoja.map(f => f ? `<div class="hoja-fila-a24">${camposColocadosDetalleA24.map(c => `<span>${valorCeldaA24_(c, f)}</span>`).join('')}</div>`
            : `<div class="hoja-fila-a24" style="opacity:.55;">${camposColocadosDetalleA24.map(() => '<span>[muestra]</span>').join('')}</div>`).join('')}
          ${esUltima ? itemsZonaHtml('pieReporte', n, 'div').replace(/<div>/g, '<div class="hoja-pie-reporte-a24">') : ''}
          ${piePag.length ? `<div class="hoja-pie-pagina-a24">${itemsZonaHtml('piePagina', n, 'span')}</div>` : '<div class="hoja-vacio-a24">(pie de página vacío)</div>'}
        </div>`;
    }

    const hojasHtml = hojas.map((h, i) => hojaHtml(h, i + 1, i === hojas.length - 1)).join('');
    const leyenda = `
      <div class="leyenda-hoja-a24">
        <span><i style="background:#12294a"></i>encabezado de reporte</span>
        <span><i style="background:#8fb0e0"></i>encabezado de página</span>
        <span><i style="background:#e9a850"></i>pie de página</span>
        <span><i style="background:#2e8b57"></i>pie de reporte</span>
      </div>`;
    const notaPrev = !esEjecucion ? `<div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-circle-info"></i> Así quedaría la estructura de tus hojas, con datos de muestra. En la <b>Vista de Ejecución</b> verás el reporte completo con los gastos reales, repartido en varias hojas.</div>` : '';

    cont.innerHTML = `
      ${etiquetaVista}
      ${notaPrev}
      ${leyenda}
      ${hojasHtml}
      ${esEjecucion ? `
        <div class="empty-note"><i class="fa-solid fa-magnifying-glass"></i> Observa cuántas veces aparece cada pie: ¿en cuántas hojas se repite el pie de página? ¿cuántas veces sale el pie de reporte?</div>
        <div id="feedbackEjecucionA24"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:16px; flex-wrap:wrap;">
          <button type="button" class="btn-descargar-pdf" id="btnDescargarReportePdfA24">
            <i class="fa-solid fa-file-pdf"></i> Descargar reporte en PDF
          </button>
          <button type="button" class="btn btn-primary" id="btnSiguienteEjecucionA24" style="width:auto; padding:12px 28px;">
            <i class="fa-solid fa-arrow-right"></i> Siguiente
          </button>
        </div>` : ''}`;

    if(esEjecucion){
      document.getElementById('btnDescargarReportePdfA24').addEventListener('click', () => {
        const enZona = (z, id) => elementosEnZonaA24_(z).some(e => e.id === id);
        const lineasPieReporte = [];
        if(enZona('pieReporte', 'totalGeneral')) lineasPieReporte.push({ etiqueta:'TOTAL GENERAL DE GASTOS', valor: formatoMontoA24_(totalGastosA24_()) });
        if(enZona('pieReporte', 'cantidadGastos')) lineasPieReporte.push({ etiqueta:'CANTIDAD DE GASTOS REGISTRADOS', valor: String(filasGastosA24_().length) });
        generarPdfReporteDisenado({
          nombreEmpresa, tituloReporte,
          columnas: camposColocadosDetalleA24.map(etiquetaCampoA24_),
          filas: filasGastosA24_().map(f => camposColocadosDetalleA24.map(c => valorCeldaA24_(c, f))),
          mostrarTitulosColumna: enZona('encPagina', 'titulosColumna'),
          piePagina: { numero: enZona('piePagina', 'numeroPagina'), fecha: enZona('piePagina', 'fechaImpresion') },
          pieReporte: lineasPieReporte,
          filasPorHoja: FILAS_POR_HOJA_A24,
          nombreArchivo: 'reporte_de_gastos'
        });
      });
      document.getElementById('btnSiguienteEjecucionA24').addEventListener('click', intentarAvanzarDesdeEjecucionA24);
    }
  }

  // Valida el diseño completo; cada sección fallida suma un intento y recibe una pista específica.
  function intentarAvanzarDesdeEjecucionA24(){
    actualizarEstadoVisualA24();
    const mensajes = [];

    if(!estadoSeccionesA24.encReporte){
      intentosPorSeccionA24.encReporte++;
      mensajes.push('El <b>encabezado de reporte</b> todavía no está completo: debe incluir el nombre de la empresa (TECNOVENTAS RD) y un título que mencione que es un reporte de gastos. Vuelve a la Vista de Diseño para completarlo.');
    }
    if(!estadoSeccionesA24.detalle){
      intentosPorSeccionA24.detalle++;
      mensajes.push('La <b>línea de detalle</b> no está correcta: selecciona la tabla <b>Gastos</b> y arrastra exactamente Fecha, Descripción, Departamento y Monto.');
    }

    const nombresZona = { encPagina:'encabezado de página', piePagina:'pie de página', pieReporte:'pie de reporte' };
    ['encPagina', 'piePagina', 'pieReporte'].forEach(z => {
      if(estadoSeccionesA24[z]) return;
      intentosPorSeccionA24[z]++;
      const pistas = [];
      ELEMENTOS_A24.forEach(e => {
        const donde = ubicacionesA24[e.id] || null;
        const debeEstarAqui = e.zona === z;
        if(donde === z && !debeEstarAqui) pistas.push(e.pista);          // está aquí y no debería
        else if(debeEstarAqui && !donde) pistas.push(`Falta ubicar <b>${e.nombre}</b>.`);   // falta y nadie lo puso
      });
      mensajes.push(`El <b>${nombresZona[z]}</b> todavía no está correcto. ${pistas.length ? pistas.join(' ') : 'Revisa qué elementos le corresponden.'}`);
    });

    if(mensajes.length > 0){
      document.getElementById('feedbackEjecucionA24').innerHTML = mensajes.map(m =>
        `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`
      ).join('');
      return;
    }
    mostrarPasoA24_('identificar');
  }

  // ---------- Paso 2: identificar y definir las 5 secciones ----------
  function mostrarCompletoIdentificarA24_(){
    const cont = document.getElementById('identificarSeccionesA24');
    cont.classList.remove('hidden');
    cont.innerHTML = `
      <div class="nav-pasos" style="margin:0 0 14px;">
        <button type="button" class="btn-nav-paso" id="btnVolverDisenoA24"><i class="fa-solid fa-arrow-left"></i> Volver al diseño</button>
        <button type="button" class="btn-nav-paso btn-nav-paso-primario" id="btnSiguienteDiferenciaA24">Siguiente <i class="fa-solid fa-arrow-right"></i></button>
      </div>
      <div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste la identificación de las 5 secciones!</div>`;
    document.getElementById('btnVolverDisenoA24').addEventListener('click', () => mostrarPasoA24_('diseno'));
    document.getElementById('btnSiguienteDiferenciaA24').addEventListener('click', () => mostrarPasoA24_('diferencia'));
  }

  function pintarIdentificarSeccionesA24(){
    const cont = document.getElementById('identificarSeccionesA24');
    cont.classList.remove('hidden');
    if(!ordenSeccionesIdentificarA24 || ordenSeccionesIdentificarA24.length === 0) ordenSeccionesIdentificarA24 = barajar(SECCIONES_IDENTIFICAR_A24_BASE);

    const nombreEmpresa = nombreEmpresaValorA24 || 'TECNOVENTAS RD, S.R.L.';
    const tituloReporte = tituloReporteValorA24 || 'Reporte de Gastos';
    const filas = filasGastosA24_();
    const hojas = hojasA24_().length;
    const textos = (z, n) => elementosEnZonaA24_(z).filter(e => e.id !== 'titulosColumna').map(e => textoElementoA24_(e.id, n, hojas)).join(' · ');

    const contenidoPorSeccion = {
      encReporte: `<div style="font-weight:800;">${nombreEmpresa}</div><div style="opacity:.85;">${tituloReporte}</div>`,
      encPagina: `<div style="font-weight:800; font-size:13px;">${camposColocadosDetalleA24.map(etiquetaCampoA24_).join(' | ')}</div>`,
      detalle: `<div style="font-size:13px; line-height:1.7;">${filas.slice(0, 3).map(f => `<div>${camposColocadosDetalleA24.map(c => valorCeldaA24_(c, f)).join(' | ')}</div>`).join('')}<div style="opacity:.6;">… (una línea por cada uno de los ${filas.length} gastos)</div></div>`,
      piePagina: `<div style="font-size:13px; font-weight:700;">${textos('piePagina', 2)}</div>`,
      pieReporte: `<div style="font-size:13px; font-weight:700;">${elementosEnZonaA24_('pieReporte').map(e => textoElementoA24_(e.id, 1, hojas)).join('<br>')}</div>`
    };
    const estiloCaja = {
      encReporte: 'background:#12294a; color:#fff; border-left:4px solid #C9A227;',
      encPagina: 'background:#dbe7f7; color:#12294a; border-left:4px solid #8fb0e0;',
      detalle: 'background: rgba(255,255,255,0.04); border-left:4px solid var(--dark-border);',
      piePagina: 'background:#fdf0d6; color:#78350f; border-left:4px solid #e9a850;',
      pieReporte: 'background:#dff3e6; color:#166534; border-left:4px solid #2e8b57;'
    };

    cont.innerHTML = `
      ${htmlBotonVolverA_('btnVolverDisenoA24', 'Volver al diseño')}
      <div class="section-heading" style="font-size:18px;">Identifica y define las secciones de tu reporte</div>
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-hand-pointer"></i> Para cada recuadro, identifica qué sección del reporte es y explica en tus propias palabras qué función cumple. Los colores te ayudan, pero no bastan: piensa dónde aparece y cuántas veces.</div>

      ${ordenSeccionesIdentificarA24.map(s => `
        <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
          <div style="${estiloCaja[s.id]} padding:10px 14px; border-radius:8px; margin-bottom:12px;">${contenidoPorSeccion[s.id]}</div>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">¿Qué sección del reporte es esta?</label>
          <select class="input-generico select-identificar-a21" data-seccion="${s.id}" style="margin-bottom:12px;">
            <option value="">Selecciona...</option>
            ${barajar(SECCIONES_IDENTIFICAR_A24_BASE).map(op => `<option value="${op.id}">${op.nombre}</option>`).join('')}
          </select>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">En tus palabras, ¿qué función cumple esta sección?</label>
          <textarea class="input-generico celda-respuesta-a15 textarea-definir-a21" data-seccion="${s.id}" rows="2" placeholder="Escribe tu definición..."></textarea>
        </div>
      `).join('')}

      <div id="feedbackIdentificarA24"></div>
      <button type="button" class="btn btn-primary" id="btnConfirmarIdentificarA24" style="width:auto; padding:12px 28px;">
        <i class="fa-solid fa-check"></i> Confirmar
      </button>`;

    cont.querySelectorAll('.select-identificar-a21').forEach(sel => {
      const r = respuestasIdentificarA24[sel.dataset.seccion];
      if(r && r.identificacion) sel.value = r.identificacion;
      sel.addEventListener('change', () => {
        const s = sel.dataset.seccion;
        if(!respuestasIdentificarA24[s]) respuestasIdentificarA24[s] = {};
        respuestasIdentificarA24[s].identificacion = sel.value;
      });
    });
    cont.querySelectorAll('.textarea-definir-a21').forEach(ta => {
      const r = respuestasIdentificarA24[ta.dataset.seccion];
      if(r && r.definicion) ta.value = r.definicion;
      ta.addEventListener('input', () => {
        const s = ta.dataset.seccion;
        if(!respuestasIdentificarA24[s]) respuestasIdentificarA24[s] = {};
        respuestasIdentificarA24[s].definicion = ta.value;
      });
    });
    document.getElementById('btnConfirmarIdentificarA24').addEventListener('click', verificarIdentificarSeccionesA24);
    document.getElementById('btnVolverDisenoA24').addEventListener('click', () => mostrarPasoA24_('diseno'));
  }

  function verificarIdentificarSeccionesA24(){
    intentosIdentificarGeneralA24++;
    let todoCorrecto = true;
    SECCIONES_IDENTIFICAR_A24_BASE.forEach(s => {
      const resp = respuestasIdentificarA24[s.id] || {};
      if(resp.identificacion !== s.id || contarPalabrasRealesA15_(resp.definicion || '') < 4) todoCorrecto = false;
    });
    if(!todoCorrecto){
      document.getElementById('feedbackIdentificarA24').innerHTML = `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>Revisa: alguna identificación o definición todavía no está completa. La definición debe tener varias palabras propias, no solo repetir el nombre de la sección. Si dudas entre el pie de página y el pie de reporte, recuerda cuántas veces aparece cada uno.</div></div>`;
      return;
    }
    identificarSeccionesCompletoA24 = true;
    mostrarPasoA24_('diferencia');
  }

  // ---------- Paso 3: diferencia entre pie de página y pie de reporte ----------
  function mostrarCompletoDiferenciaA24_(){
    const cont = document.getElementById('diferenciaPiesA24');
    cont.classList.remove('hidden');
    cont.innerHTML = `
      ${htmlBotonVolverA_('btnVolverIdentificarA24', 'Volver a la identificación')}
      <div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Estableciste correctamente la diferencia entre el pie de página y el pie de reporte!</div>`;
    document.getElementById('btnVolverIdentificarA24').addEventListener('click', () => mostrarPasoA24_('identificar'));
    document.getElementById('seccionFinalA24').classList.remove('hidden');
  }

  function pintarDiferenciaA24(){
    const cont = document.getElementById('diferenciaPiesA24');
    cont.classList.remove('hidden');
    const hojas = hojasA24_().length;
    const opcionesNumero = (sel) => '<option value="">Selecciona...</option>' + [1, 2, 3, 4, 5, 6].map(n => `<option value="${n}" ${String(sel) === String(n) ? 'selected' : ''}>${n}</option>`).join('');
    const r = respuestasDiferenciaA24;

    cont.innerHTML = `
      ${htmlBotonVolverA_('btnVolverIdentificarA24', 'Volver a la identificación')}
      <div class="section-heading" style="font-size:18px;">Pie de página vs. pie de reporte</div>
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-scale-balanced"></i> Establece la diferencia entre ambos pies. Apóyate en tu reporte y en el recurso de apoyo.</div>

      <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
        <div class="caja-diseno-titulo">1. ¿A qué pie corresponde cada afirmación?</div>
        ${AFIRMACIONES_A24.map(a => `
          <div class="afirmacion-a24">
            <span>${a.texto}</span>
            <select class="input-generico select-afirmacion-a24" data-id="${a.id}">
              <option value="">Selecciona...</option>
              <option value="piePagina" ${r.afirmaciones[a.id] === 'piePagina' ? 'selected' : ''}>Pie de página</option>
              <option value="pieReporte" ${r.afirmaciones[a.id] === 'pieReporte' ? 'selected' : ''}>Pie de reporte</option>
            </select>
          </div>`).join('')}
      </div>

      <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
        <div class="caja-diseno-titulo">2. Cuenta en tu propio reporte</div>
        <p style="font-size:14px; margin:0 0 12px;">Tu reporte de gastos quedó repartido en <b>${hojas} hojas</b> (en la Vista de Ejecución puedes comprobarlo).</p>
        <div class="afirmacion-a24"><span>¿Cuántas veces aparece el <b>pie de página</b> en todo el reporte?</span>
          <select class="input-generico" id="selVecesPieA24">${opcionesNumero(r.vecesPie)}</select></div>
        <div class="afirmacion-a24" style="border-bottom:none;"><span>¿Cuántas veces aparece el <b>pie de reporte</b> en todo el reporte?</span>
          <select class="input-generico" id="selVecesPieReporteA24">${opcionesNumero(r.vecesPieReporte)}</select></div>
      </div>

      <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
        <div class="caja-diseno-titulo">3. Explícalo con tus palabras</div>
        <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">¿En qué se diferencian el pie de página y el pie de reporte? (dónde aparecen, cuántas veces y qué contienen)</label>
        <textarea class="input-generico celda-respuesta-a15" id="txtExplicacionPiesA24" rows="4" placeholder="Escribe tu explicación...">${(r.explicacion || '').replace(/</g, '&lt;')}</textarea>
      </div>

      <div id="feedbackDiferenciaA24"></div>
      <button type="button" class="btn btn-primary" id="btnConfirmarDiferenciaA24" style="width:auto; padding:12px 28px;">
        <i class="fa-solid fa-check"></i> Confirmar
      </button>`;

    cont.querySelectorAll('.select-afirmacion-a24').forEach(sel => sel.addEventListener('change', () => { respuestasDiferenciaA24.afirmaciones[sel.dataset.id] = sel.value; }));
    document.getElementById('selVecesPieA24').addEventListener('change', (e) => { respuestasDiferenciaA24.vecesPie = e.target.value; });
    document.getElementById('selVecesPieReporteA24').addEventListener('change', (e) => { respuestasDiferenciaA24.vecesPieReporte = e.target.value; });
    document.getElementById('txtExplicacionPiesA24').addEventListener('input', (e) => { respuestasDiferenciaA24.explicacion = e.target.value; });
    document.getElementById('btnVolverIdentificarA24').addEventListener('click', () => mostrarPasoA24_('identificar'));
    document.getElementById('btnConfirmarDiferenciaA24').addEventListener('click', verificarDiferenciaA24);
  }

  function verificarDiferenciaA24(){
    intentosDiferenciaA24++;
    const r = respuestasDiferenciaA24;
    const hojas = hojasA24_().length;
    const malas = AFIRMACIONES_A24.filter(a => r.afirmaciones[a.id] !== a.correcta).length;
    const vecesOk = String(r.vecesPie) === String(hojas) && String(r.vecesPieReporte) === '1';
    const texto = normalizarTextoA15_(r.explicacion || '');
    const explicacionOk = contarPalabrasRealesA15_(r.explicacion || '') >= 12 && texto.includes('pagina') && texto.includes('reporte');

    const mensajes = [];
    if(malas > 0) mensajes.push(`${malas} de las 6 afirmaciones no corresponden al pie que elegiste. Piensa: ¿se repite en cada hoja o sale una sola vez al final?`);
    if(!vecesOk) mensajes.push(`Revisa cuántas veces aparece cada pie: fíjate en la Vista de Ejecución de tu reporte (el pie de página sale una vez por hoja; el pie de reporte, solo al final).`);
    if(!explicacionOk) mensajes.push('Tu explicación necesita más detalle: usa al menos 12 palabras y menciona tanto el <b>pie de página</b> como el <b>pie de reporte</b>, indicando dónde aparecen, cuántas veces y qué contienen.');

    if(mensajes.length){
      document.getElementById('feedbackDiferenciaA24').innerHTML = mensajes.map(m =>
        `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`).join('');
      return;
    }
    diferenciaCompletaA24 = true;
    mostrarPasoA24_('diferencia');
  }

  document.getElementById('btnFinalizarA24').addEventListener('click', async () => {
    clearInterval(timerIntervalA24);

    const minutosTranscurridos = (Date.now() - inicioTiempoA24) / 60000;
    const nivelPorIntentos = (intentos) => intentos <= 1 ? 'logrado' : (intentos <= 2 ? 'proceso' : 'no_logrado');
    const C = CRITERIOS_BASE_A24;
    const crit = (i, nivel) => ({ nombre: C[i].nombre, descripcion: C[i].descripcion, nivel });

    const criterios = [
      crit(0, 'logrado'),
      crit(1, nivelPorIntentos(intentosPorSeccionA24.encReporte || 1)),
      crit(2, nivelPorIntentos(intentosPorSeccionA24.detalle || 1)),
      crit(3, nivelPorIntentos(intentosPorSeccionA24.encPagina || 1)),
      crit(4, nivelPorIntentos(intentosPorSeccionA24.piePagina || 1)),
      crit(5, nivelPorIntentos(intentosPorSeccionA24.pieReporte || 1)),
      crit(6, 'logrado'),
      crit(7, nivelPorIntentos(intentosIdentificarGeneralA24 || 1)),
      crit(8, nivelPorIntentos(intentosDiferenciaA24 || 1)),
      crit(9, minutosTranscurridos <= tiempoEstimadoA24 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA24 * 2 ? 'proceso' : 'no_logrado')),
      crit(10, 'logrado')
    ];

    const pesoUnidad = puntajeMaxA24 / criterios.length;
    const pesosPorNivel = { logrado:1, proceso:0.5, no_logrado:0 };
    let notaCalculada = 0;
    criterios.forEach(c => { notaCalculada += pesoUnidad * pesosPorNivel[c.nivel]; });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    document.getElementById('vistaEjercicioA24').classList.add('hidden');
    document.getElementById('vistaResultadoA24').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA24').classList.add('hidden');
    renderRubrica('rubricaResultadoA24', criterios, puntajeMaxA24, notaCalculada);
    ultimoResultadoA24 = { criterios, nota: notaCalculada, puntajeMaximo: puntajeMaxA24 };

    const proporcionFinal = puntajeMaxA24 > 0 ? notaCalculada / puntajeMaxA24 : 0;
    mostrarLogro(proporcionFinal >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinal >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinal >= 0.8) dispararConfeti();

    const nombreZona = { encPagina:'Encabezado de página', piePagina:'Pie de página', pieReporte:'Pie de reporte' };
    const detalleA24 = [
      {
        titulo: 'Diseño del reporte de gastos',
        items: [
          { pregunta:'Encabezado de reporte', tuRespuesta: `Completado en ${intentosPorSeccionA24.encReporte || 1} intento(s)`, correcta: (intentosPorSeccionA24.encReporte || 1) <= 1 },
          { pregunta:'Línea de detalle', tuRespuesta: camposColocadosDetalleA24.map(etiquetaCampoA24_).join(', '), correcta: (intentosPorSeccionA24.detalle || 1) <= 1 },
          ...['encPagina', 'piePagina', 'pieReporte'].map(z => ({
            pregunta: nombreZona[z],
            tuRespuesta: elementosEnZonaA24_(z).map(e => e.nombre).join(', ') || 'Vacío',
            correcta: (intentosPorSeccionA24[z] || 1) <= 1
          }))
        ]
      },
      {
        titulo: 'Recorrido de vistas, identificación de secciones y diferencia entre pies',
        items: [
          { pregunta:'¿Recorrió las 3 vistas (Diseño, Previsualización, Ejecución)?', tuRespuesta: `${vistasVisitadasA24.size} de 3`, correcta: vistasVisitadasA24.size >= 3 },
          ...SECCIONES_IDENTIFICAR_A24_BASE.map(s => {
            const resp = respuestasIdentificarA24[s.id] || {};
            const nombreIdentificado = (SECCIONES_IDENTIFICAR_A24_BASE.find(x => x.id === resp.identificacion) || {}).nombre || 'Sin responder';
            return {
              pregunta: `¿Qué es "${s.nombre}" y qué función cumple?`,
              tuRespuesta: `Identificó: ${nombreIdentificado}. Definición: ${resp.definicion || 'Sin responder'}`,
              correcta: resp.identificacion === s.id && contarPalabrasRealesA15_(resp.definicion || '') >= 4
            };
          }),
          { pregunta:'Veces que aparece cada pie en su reporte', tuRespuesta: `Pie de página: ${respuestasDiferenciaA24.vecesPie}; pie de reporte: ${respuestasDiferenciaA24.vecesPieReporte}`, correcta: (intentosDiferenciaA24 || 1) <= 1 },
          { pregunta:'Diferencia entre pie de página y pie de reporte', tuRespuesta: respuestasDiferenciaA24.explicacion || 'Sin responder', correcta: (intentosDiferenciaA24 || 1) <= 1 }
        ]
      }
    ];
    ultimoResultadoA24.detalle = detalleA24;
    renderDesgloseColoreado('resultadoDesgloseA24', detalleA24);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.2.4',
        ra:'RA2',
        ec:'EC6.2.2',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA24,
        criterios: criterios,
        detalle: detalleA24
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA24').addEventListener('click', () => {
    if(!ultimoResultadoA24) return;
    generarPdfResultado('A.2.4', ultimoResultadoA24.criterios, ultimoResultadoA24.nota, ultimoResultadoA24.puntajeMaximo, 'EC6.2.2', 'RA2', ultimoResultadoA24.detalle);
  });

  document.getElementById('btnVolverMisActA24').addEventListener('click', () => {
    document.getElementById('panelActividadA24').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.2.4', abrirActividadA24);


// ============================================================================
// A.2.5 — CONSTRUYE UN REPORTE NUEVO, SECCIÓN POR SECCIÓN
// ============================================================================
  // En pares (cada estudiante entrega y se califica de forma individual). Crean un proyecto
  // nuevo de reporte (la nómina de empleados de TECNOVENTAS RD) y agregan PROGRESIVAMENTE sus
  // 5 secciones, en este orden: encabezado de reporte, encabezado de página, línea de detalle,
  // pie de página y pie de reporte. Mientras construyen, ven a un lado una hoja de muestra que
  // va "creciendo": las secciones aún no agregadas aparecen como recuadros punteados.
  // Al final ejecutan el reporte (paginado, con datos reales) y lo analizan. Se apoya en el
  // recurso "Construccion_Progresiva_de_un_Reporte_A25.pdf".

  const EC_A25 = 'EC6.2.2';
  const FILAS_POR_HOJA_A25 = 5;
  const CAMPOS_CORRECTOS_DETALLE_A25 = ['Nombre', 'Cargo', 'Departamento', 'Salario'];
  const ETIQUETAS_CAMPOS_A25 = { FechaContratacion:'Fecha de contratación', Email:'Correo electrónico' };
  const etiquetaCampoA25_ = (c) => ETIQUETAS_CAMPOS_A25[c] || c;

  // Datos de respaldo: se usan si la tabla DB_Empleados del Sheet no tiene datos reales todavía.
  const CAMPOS_EMPLEADOS_A25 = ['Id', 'Nombre', 'Departamento', 'Cargo', 'FechaContratacion', 'Salario', 'Email'];
  const DATOS_EMPLEADOS_RESPALDO_A25 = [
    [1,'Carlos Fernández','Ventas','Gerente de ventas','2019-03-11',68000,'cfernandez@tecnoventas.do'],
    [2,'Ana Ramírez','Ventas','Ejecutiva de ventas','2021-06-01',42000,'aramirez@tecnoventas.do'],
    [3,'Miguel Santos','Almacén','Encargado de almacén','2020-02-17',38500,'msantos@tecnoventas.do'],
    [4,'Rosa Jiménez','Contabilidad','Contadora general','2018-09-10',61000,'rjimenez@tecnoventas.do'],
    [5,'Luis Peña','Administración','Asistente administrativo','2022-01-24',31500,'lpena@tecnoventas.do'],
    [6,'Carmen Reyes','Almacén','Auxiliar de almacén','2023-04-03',27000,'creyes@tecnoventas.do'],
    [7,'Pedro Martínez','Ventas','Ejecutivo de ventas','2022-08-15',41000,'pmartinez@tecnoventas.do'],
    [8,'Yesenia Cabrera','Contabilidad','Auxiliar contable','2023-02-06',33500,'ycabrera@tecnoventas.do'],
    [9,'José Almonte','Almacén','Despachador','2021-11-22',29500,'jalmonte@tecnoventas.do'],
    [10,'Lucía Batista','Administración','Recepcionista','2024-01-15',26500,'lbatista@tecnoventas.do'],
    [11,'Raúl Peralta','Ventas','Ejecutivo de ventas','2024-05-20',40000,'rperalta@tecnoventas.do'],
    [12,'Daniela Mejía','Administración','Gerente administrativa','2019-07-08',64000,'dmejia@tecnoventas.do']
  ].map(fila => { const o = {}; CAMPOS_EMPLEADOS_A25.forEach((c, i) => { o[c] = fila[i]; }); return o; });

  function tablaEmpleadosValidaA25_(t){
    if(!t || !t.campos || !t.datos) return false;
    if(!CAMPOS_CORRECTOS_DETALLE_A25.every(c => t.campos.includes(c))) return false;
    const buenas = t.datos.filter(f => String(f.Nombre || '').trim().length > 3 && isFinite(Number(f.Salario)) && Number(f.Salario) > 0);
    return buenas.length >= 8;
  }
  async function cargarTablaA25_(codigoTabla){
    const t = await cargarTablaDatos(codigoTabla);
    if(codigoTabla === 'DB_Empleados' && !tablaEmpleadosValidaA25_(t)){
      return { campos: [...CAMPOS_EMPLEADOS_A25], datos: DATOS_EMPLEADOS_RESPALDO_A25.map(f => ({ ...f })) };
    }
    return t;
  }

  // Elementos que el estudiante decide en qué sección van. "zona" es la sección correcta;
  // "Subtotal por departamento" es un distractor: este reporte NO está agrupado.
  const ELEMENTOS_A25 = [
    { id:'titulosColumna', nombre:'Títulos de columna', zona:'encPagina', pista:'Los títulos de columna se repiten arriba de cada hoja: van en el <b>encabezado de página</b>.' },
    { id:'numeroPagina', nombre:'Número de página', zona:'piePagina', pista:'El número de página es información de cada hoja y se repite en todas: va en el <b>pie de página</b>.' },
    { id:'fechaImpresion', nombre:'Fecha de impresión', zona:'piePagina', pista:'La fecha de impresión se repite en cada hoja: va en el <b>pie de página</b>.' },
    { id:'totalNomina', nombre:'Total de la nómina', zona:'pieReporte', pista:'El total de la nómina suma <b>todos</b> los salarios y sale una sola vez, al final: va en el <b>pie de reporte</b>.' },
    { id:'cantidadEmpleados', nombre:'Cantidad de empleados', zona:'pieReporte', pista:'La cantidad de empleados resume todo el reporte y sale una sola vez, al final: va en el <b>pie de reporte</b>.' },
    { id:'subtotalDepto', nombre:'Subtotal por departamento', zona:null, pista:'Este reporte no está agrupado por departamento, así que no lleva subtotales: <b>"Subtotal por departamento"</b> no va en esta sección.' }
  ];

  const SECCIONES_A25 = [
    { id:'proyecto', nombre:'Proyecto nuevo', corto:'Proyecto', icono:'fa-folder-plus', oral:'Cuéntale a tu pareja: ¿de dónde sacará este reporte sus datos?' },
    { id:'encReporte', nombre:'Encabezado de reporte', corto:'Enc. de reporte', icono:'fa-heading', oral:'Digan juntos: ¿cuántas veces saldrá este encabezado en todo el reporte?' },
    { id:'encPagina', nombre:'Encabezado de página', corto:'Enc. de página', icono:'fa-table-columns', oral:'Comenten: ¿por qué los títulos de columna se repiten en cada hoja?' },
    { id:'detalle', nombre:'Línea de detalle', corto:'Detalle', icono:'fa-table-list', oral:'Digan en voz alta: ¿cuántas líneas de detalle tendrá el reporte y por qué?' },
    { id:'piePagina', nombre:'Pie de página', corto:'Pie de página', icono:'fa-shoe-prints', oral:'Expliquen: ¿qué tienen en común el número de página y la fecha de impresión?' },
    { id:'pieReporte', nombre:'Pie de reporte', corto:'Pie de reporte', icono:'fa-flag-checkered', oral:'Comenten: ¿por qué el total va solo al final y no en cada hoja?' }
  ];
  const ETAPAS_A25 = [...SECCIONES_A25.map(s => ({ id:s.id, corto:s.corto })), { id:'ejecucion', corto:'Ejecutar' }, { id:'analisis', corto:'Analizar' }];
  const PASO_EJECUCION_A25 = 6, PASO_ANALISIS_A25 = 7;

  const OPCIONES_FRECUENCIA_A25 = [
    { id:'unaVezInicio', texto:'Una sola vez, al inicio del reporte' },
    { id:'arribaCadaHoja', texto:'En la parte de arriba de cada hoja' },
    { id:'cadaRegistro', texto:'Una vez por cada empleado' },
    { id:'abajoCadaHoja', texto:'En la parte de abajo de cada hoja' },
    { id:'unaVezFinal', texto:'Una sola vez, al final del reporte' }
  ];
  const FRECUENCIAS_CORRECTAS_A25 = { encReporte:'unaVezInicio', encPagina:'arribaCadaHoja', detalle:'cadaRegistro', piePagina:'abajoCadaHoja', pieReporte:'unaVezFinal' };

  const CRITERIOS_BASE_A25 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio y revisa cada sección con su pareja.' },
    { key:'proyecto', nombre:'2. Proyecto nuevo', descripcion:'Crea el proyecto con un nombre claro y lo conecta a la tabla de datos correcta.' },
    { key:'encReporte', nombre:'3. Encabezado de reporte', descripcion:'Agrega el nombre de la empresa y el título del reporte de nómina.' },
    { key:'encPagina', nombre:'4. Encabezado de página', descripcion:'Agrega los títulos de columna en el encabezado de página.' },
    { key:'detalle', nombre:'5. Línea de detalle', descripcion:'Elige exactamente los campos que debe mostrar cada empleado.' },
    { key:'piePagina', nombre:'6. Pie de página', descripcion:'Agrega al pie de página lo que se repite en cada hoja (número de página y fecha de impresión).' },
    { key:'pieReporte', nombre:'7. Pie de reporte', descripcion:'Agrega al pie de reporte los resúmenes de todo el reporte (total de la nómina y cantidad de empleados).' },
    { key:'ejecucion', nombre:'8. Ejecución y revisión del reporte', descripcion:'Ejecuta el reporte completo y revisa el resultado hoja por hoja.' },
    { key:'frecuencia', nombre:'9. Cuántas veces aparece cada sección', descripcion:'Reconoce cuántas veces y en qué lugar aparece cada sección en su reporte.' },
    { key:'reflexion', nombre:'10. Reflexión sobre la construcción', descripcion:'Explica con sus propias palabras qué cambió en la hoja al agregar las secciones y por qué conviene revisar tras cada paso.' },
    { key:'tiempo', nombre:'11. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'12. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let proyectoA25 = { nombre:'', pareja:'', tabla:'' };
  let datosTablaA25 = null;
  let cfgA25 = {};
  let agregadaA25 = {};
  let completadaAlgunaVezA25 = {};
  let intentosA25 = {};
  let pasoA25 = 0;
  let ejecucionVistaA25 = false;
  let respAnalisisA25 = { frecuencias:{}, lineas:'', vecesPie:'', reflexion:'', conPareja:false };
  let intentosFrecuenciaA25 = 0, intentosReflexionA25 = 0;
  let frecuenciaOkA25 = false, reflexionOkA25 = false, analisisOkA25 = false;
  let ultimoResultadoA25 = null;
  let puntajeMaxA25 = 0;
  let tiempoEstimadoA25 = 10;
  let inicioTiempoA25 = null;
  let timerIntervalA25 = null;

  const formatoMontoA25_ = (v) => 'RD$' + (Number(v) || 0).toLocaleString('es-DO', { minimumFractionDigits:2 });
  const escaparAttrA25_ = (t) => String(t || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const escaparHtmlA25_ = (t) => String(t || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  function reiniciarEstadoA25_(){
    proyectoA25 = { nombre:'', pareja:'', tabla:'' };
    datosTablaA25 = null;
    cfgA25 = { encReporte:{ empresa:'', titulo:'' }, encPagina:[], detalle:[], piePagina:[], pieReporte:[] };
    agregadaA25 = {}; completadaAlgunaVezA25 = {};
    intentosA25 = { proyecto:0, encReporte:0, encPagina:0, detalle:0, piePagina:0, pieReporte:0 };
    pasoA25 = 0; ejecucionVistaA25 = false;
    respAnalisisA25 = { frecuencias:{}, lineas:'', vecesPie:'', reflexion:'', conPareja:false };
    intentosFrecuenciaA25 = 0; intentosReflexionA25 = 0; frecuenciaOkA25 = false; reflexionOkA25 = false; analisisOkA25 = false;
  }

  function filasEmpleadosA25_(){ return (datosTablaA25 && datosTablaA25.datos) || []; }
  function totalNominaA25_(){ return filasEmpleadosA25_().reduce((s, f) => s + (Number(f.Salario) || 0), 0); }
  function hojasA25_(){
    const filas = filasEmpleadosA25_();
    const hojas = [];
    for(let i = 0; i < filas.length; i += FILAS_POR_HOJA_A25) hojas.push(filas.slice(i, i + FILAS_POR_HOJA_A25));
    return hojas.length ? hojas : [[]];
  }
  function camposDetalleOrdenadosA25_(){ return CAMPOS_CORRECTOS_DETALLE_A25.filter(c => cfgA25.detalle.includes(c)); }
  function valorCeldaA25_(campo, fila){
    if(campo === 'Salario') return formatoMontoA25_(fila[campo]);
    return escaparHtmlA25_(formatearValorCeldaReporte_(fila[campo]));
  }
  function textoElementoA25_(id, n, total){
    switch(id){
      case 'numeroPagina': return `Página ${n} de ${total}`;
      case 'fechaImpresion': return 'Impreso: ' + formatearFechaCortaSinHora_(new Date());
      case 'totalNomina': return `Total de la nómina: ${formatoMontoA25_(totalNominaA25_())}`;
      case 'cantidadEmpleados': return `Cantidad de empleados: ${filasEmpleadosA25_().length}`;
      default: return '';
    }
  }
  const nombreElementoA25_ = (id) => (ELEMENTOS_A25.find(e => e.id === id) || {}).nombre || id;

  // ---------- Validación de cada sección (devuelve { ok, mensajes }) ----------
  function validarSeccionA25_(sec){
    const msgs = [];
    if(sec === 'proyecto'){
      const nombre = (proyectoA25.nombre || '').trim();
      const generico = /^(proyecto|nuevo proyecto|reporte|sin nombre|prueba|test)\s*\d*$/i.test(nombre);
      if(nombre.length < 4 || generico) msgs.push('Ponle a tu proyecto un <b>nombre claro</b> que diga de qué es el reporte (por ejemplo, "Nómina de empleados"). Evita nombres genéricos como "Proyecto1".');
      if((proyectoA25.pareja || '').trim().length < 3) msgs.push('Escribe el nombre de tu <b>pareja de trabajo</b>. Si hoy trabajas solo/a, escribe "Sin pareja".');
      if(!proyectoA25.tabla) msgs.push('Conecta el proyecto a una <b>tabla de datos</b>.');
      else if(proyectoA25.tabla !== 'DB_Empleados') msgs.push('Este reporte es la nómina de TECNOVENTAS RD: necesita los datos de los empleados y sus salarios. Conecta el proyecto a la tabla <b>Empleados</b>.');
    } else if(sec === 'encReporte'){
      if(!normalizarTextoA15_(cfgA25.encReporte.empresa).includes('tecnoventas')) msgs.push('Escribe el nombre de la empresa: <b>TECNOVENTAS RD</b>.');
      const tit = normalizarTextoA15_(cfgA25.encReporte.titulo);
      if(!(tit.includes('nomina') || tit.includes('empleado'))) msgs.push('El título debe decir de qué es el reporte: una <b>nómina de empleados</b>.');
    } else if(sec === 'detalle'){
      const sel = [...cfgA25.detalle].sort(), esp = [...CAMPOS_CORRECTOS_DETALLE_A25].sort();
      if(!(sel.length === esp.length && sel.every((c, i) => c === esp[i]))){
        msgs.push('La línea de detalle debe mostrar exactamente estos 4 campos: <b>Nombre, Cargo, Departamento y Salario</b>. Cada empleado ocupa una línea.');
      }
    } else {
      const esperados = ELEMENTOS_A25.filter(e => e.zona === sec).map(e => e.id).sort();
      const elegidos = [...cfgA25[sec]].sort();
      if(!(esperados.length === elegidos.length && esperados.every((id, i) => id === elegidos[i]))){
        ELEMENTOS_A25.forEach(e => {
          if(cfgA25[sec].includes(e.id) && e.zona !== sec) msgs.push(e.pista);
          else if(e.zona === sec && !cfgA25[sec].includes(e.id)) msgs.push(`Falta agregar <b>${e.nombre}</b>.`);
        });
      }
    }
    return { ok: msgs.length === 0, mensajes: msgs };
  }

  // Primer paso de construcción (0-5) que aún no está agregado; 6 si ya están todos.
  function primerPendienteA25_(){
    const i = SECCIONES_A25.findIndex(s => !agregadaA25[s.id]);
    return i === -1 ? PASO_EJECUCION_A25 : i;
  }
  function limitePasoA25_(){
    const p = primerPendienteA25_();
    if(p < PASO_EJECUCION_A25) return p;
    return ejecucionVistaA25 ? PASO_ANALISIS_A25 : PASO_EJECUCION_A25;
  }

  // ---------- Pantalla de apertura ----------
  async function abrirActividadA25(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA25 = puntajeMaximo;
    tiempoEstimadoA25 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA25').innerHTML = limpiarColoresCasiBlancos(enunciado) || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA25').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.2.5') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA25').classList.add('hidden');
        document.getElementById('vistaEjercicioA25').classList.add('hidden');
        document.getElementById('vistaResultadoA25').classList.remove('hidden');
        renderRubrica('rubricaResultadoA25', previa.criterios, previa.puntajeMaximo, previa.nota);
        if(previa.detalle && previa.detalle.length) renderDesgloseColoreado('resultadoDesgloseA25', previa.detalle);
        ultimoResultadoA25 = { criterios: previa.criterios, nota: previa.nota, puntajeMaximo: previa.puntajeMaximo, detalle: previa.detalle };
        document.getElementById('avisoYaCompletadaA25').classList.remove('hidden');
        return;
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }

    document.getElementById('avisoYaCompletadaA25').classList.add('hidden');
    document.getElementById('vistaInstrumentoA25').classList.remove('hidden');
    document.getElementById('vistaEjercicioA25').classList.add('hidden');
    document.getElementById('vistaResultadoA25').classList.add('hidden');
    document.getElementById('tiempoEstimadoAvisoA25').innerHTML =
      `<i class="fa-solid fa-hourglass-half"></i> Tendrás aproximadamente <b>${tiempoEstimadoA25} minutos</b> para completar esta actividad una vez que la inicies.`;
    cargarRecursosActividad('A.2.5', 'recursosEstudianteA25');
    renderRubrica('instrumentoPrevioA25', CRITERIOS_BASE_A25.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null })), puntajeMaxA25, null);
  }

  document.getElementById('btnBackFromActividadA25').addEventListener('click', () => {
    clearInterval(timerIntervalA25);
    document.getElementById('panelActividadA25').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA25').addEventListener('click', () => {
    reiniciarEstadoA25_();
    document.getElementById('vistaInstrumentoA25').classList.add('hidden');
    document.getElementById('vistaEjercicioA25').classList.remove('hidden');
    document.getElementById('seccionFinalA25').classList.add('hidden');
    pintarPasoA25_();

    inicioTiempoA25 = Date.now();
    clearInterval(timerIntervalA25);
    timerIntervalA25 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA25) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA25').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA25} min aprox.)</span>`;
    }, 1000);
  });

  // ---------- Estructura general: indicador de pasos + cuerpo del paso actual ----------
  function irAPasoA25_(n){
    if(n < 0 || n > limitePasoA25_()) return;
    pasoA25 = n;
    pintarPasoA25_();
  }

  function pintarStepperA25_(){
    const limite = limitePasoA25_();
    return `<div class="stepper-a25">${ETAPAS_A25.map((e, i) => {
      const hecho = i < PASO_EJECUCION_A25 ? !!agregadaA25[e.id] : (i === PASO_EJECUCION_A25 ? ejecucionVistaA25 : analisisOkA25);
      const clases = ['paso-a25', i === pasoA25 ? 'activo' : '', hecho ? 'hecho' : '', i > limite ? 'bloqueado' : ''].join(' ');
      return `<button type="button" class="${clases}" data-paso="${i}" ${i > limite ? 'disabled' : ''}>
        <span class="num">${hecho && i !== pasoA25 ? '<i class="fa-solid fa-check"></i>' : i + 1}</span><span class="txt">${e.corto}</span></button>`;
    }).join('')}</div>`;
  }

  function pintarPasoA25_(){
    const cont = document.getElementById('disenadorReporteA25');
    document.getElementById('seccionFinalA25').classList.add('hidden');
    let cuerpo = '<div id="cuerpoPasoA25"></div>';
    cont.innerHTML = pintarStepperA25_() + cuerpo;
    cont.querySelectorAll('.paso-a25').forEach(b => b.addEventListener('click', () => irAPasoA25_(Number(b.dataset.paso))));
    if(pasoA25 < PASO_EJECUCION_A25) pintarPasoConstruccionA25_();
    else if(pasoA25 === PASO_EJECUCION_A25) pintarEjecucionA25_();
    else pintarAnalisisA25_();
  }

  // ---------- Pasos 1-6: construir una sección ----------
  function controlesSeccionA25_(sec){
    const s = SECCIONES_A25.find(x => x.id === sec);
    if(sec === 'proyecto'){
      return `
        <p class="descripcion-seccion-a21" style="margin-top:0;">Crea el proyecto de la <b>nómina de empleados</b> de TECNOVENTAS RD: ponle un nombre claro, anota con quién trabajas y conéctalo a la tabla que tiene los datos de los empleados.</p>
        <label class="etiqueta-a25">Nombre del proyecto</label>
        <input type="text" id="inputProyectoNombreA25" class="input-generico" placeholder="Ej. Nómina de empleados" maxlength="60" value="${escaparAttrA25_(proyectoA25.nombre)}">
        <label class="etiqueta-a25">Tu pareja de trabajo</label>
        <input type="text" id="inputProyectoParejaA25" class="input-generico" placeholder="Nombre de tu compañero/a (o 'Sin pareja')" maxlength="60" value="${escaparAttrA25_(proyectoA25.pareja)}">
        <label class="etiqueta-a25">Tabla de datos</label>
        <select id="selectProyectoTablaA25" class="input-generico">
          <option value="" ${proyectoA25.tabla ? '' : 'selected disabled'}>Selecciona una tabla...</option>
          ${TABLAS_DISPONIBLES_A19.map(t => `<option value="${t.codigo}" ${proyectoA25.tabla === t.codigo ? 'selected' : ''}>${t.nombre}</option>`).join('')}
        </select>`;
    }
    if(sec === 'encReporte'){
      return `
        <p class="descripcion-seccion-a21" style="margin-top:0;">Aparece <b>una sola vez</b>, al principio de todo el reporte. Escribe el nombre de la empresa y el título del reporte.</p>
        <label class="etiqueta-a25">Nombre de la empresa</label>
        <input type="text" id="inputEmpresaA25" class="input-generico" placeholder="Nombre de la empresa..." value="${escaparAttrA25_(cfgA25.encReporte.empresa)}">
        <label class="etiqueta-a25">Título del reporte</label>
        <input type="text" id="inputTituloA25" class="input-generico" placeholder="Título del reporte..." value="${escaparAttrA25_(cfgA25.encReporte.titulo)}">`;
    }
    if(sec === 'detalle'){
      const campos = (datosTablaA25 && datosTablaA25.campos) || [];
      return `
        <p class="descripcion-seccion-a21" style="margin-top:0;">Se repite <b>una vez por cada empleado</b>. Toca los campos que debe mostrar cada línea: exactamente <b>Nombre, Cargo, Departamento y Salario</b>.</p>
        <div class="pool-campos-a21">
          ${campos.map(c => `<span class="campo-chip-a21 chip-toggle-a25 ${cfgA25.detalle.includes(c) ? 'seleccionado' : ''}" data-id="${c}">${cfgA25.detalle.includes(c) ? '<i class="fa-solid fa-check"></i> ' : ''}${etiquetaCampoA25_(c)}</span>`).join('') || '<span style="opacity:.7;">No hay campos disponibles: vuelve al paso 1 y conecta una tabla.</span>'}
        </div>`;
    }
    // encPagina, piePagina, pieReporte: se eligen elementos
    const descripciones = {
      encPagina: 'Parte superior de <b>cada hoja</b>. Toca los elementos que van aquí.',
      piePagina: 'Parte inferior de <b>cada hoja</b>: se repite en todas. Toca los elementos que van aquí.',
      pieReporte: '<b>Una sola vez</b>, al final, después del último empleado. Toca los elementos que van aquí.'
    };
    return `
      <p class="descripcion-seccion-a21" style="margin-top:0;">${descripciones[sec]} Ojo: algún elemento puede no corresponder a esta sección.</p>
      <div class="pool-campos-a21">
        ${ELEMENTOS_A25.map(e => `<span class="campo-chip-a21 chip-toggle-a25 ${cfgA25[sec].includes(e.id) ? 'seleccionado' : ''}" data-id="${e.id}">${cfgA25[sec].includes(e.id) ? '<i class="fa-solid fa-check"></i> ' : ''}${e.nombre}</span>`).join('')}
      </div>`;
  }

  function pintarPasoConstruccionA25_(){
    const sec = SECCIONES_A25[pasoA25];
    const cuerpo = document.getElementById('cuerpoPasoA25');
    cuerpo.innerHTML = `
      <div class="a25-layout">
        <div class="a25-panel">
          <div class="caja-diseno-a21 ${agregadaA25[sec.id] ? 'correcta' : ''}" id="cajaSeccionA25">
            <div class="caja-diseno-titulo"><i class="fa-solid ${sec.icono}"></i> Paso ${pasoA25 + 1}: ${pasoA25 === 0 ? sec.nombre : 'agrega el ' + sec.nombre.toLowerCase()}</div>
            <div id="controlesA25">${controlesSeccionA25_(sec.id)}</div>
          </div>
          <div id="feedbackA25"></div>
          <div id="accionesA25"></div>
        </div>
        <div class="a25-preview" id="previewA25"></div>
      </div>`;
    conectarControlesA25_(sec.id);
    pintarAccionesA25_();
    pintarPreviewA25_(null);
  }

  // Si el estudiante cambia algo de una sección ya agregada, vuelve a quedar "sin agregar" hasta
  // que presione de nuevo el botón (así lo que ve en la hoja siempre coincide con lo validado).
  function invalidarSeccionA25_(sec){
    if(!agregadaA25[sec]) return;
    agregadaA25[sec] = false;
    document.getElementById('feedbackA25').innerHTML = '';
    document.getElementById('cajaSeccionA25').classList.remove('correcta');
    pintarAccionesA25_();
    pintarPreviewA25_(null);
    const st = document.querySelector('.stepper-a25');
    if(st){ const tmp = document.createElement('div'); tmp.innerHTML = pintarStepperA25_(); st.replaceWith(tmp.firstElementChild); document.querySelectorAll('.paso-a25').forEach(b => b.addEventListener('click', () => irAPasoA25_(Number(b.dataset.paso)))); }
  }

  function conectarControlesA25_(sec){
    if(sec === 'proyecto'){
      document.getElementById('inputProyectoNombreA25').addEventListener('input', (e) => { proyectoA25.nombre = e.target.value; invalidarSeccionA25_('proyecto'); });
      document.getElementById('inputProyectoParejaA25').addEventListener('input', (e) => { proyectoA25.pareja = e.target.value; invalidarSeccionA25_('proyecto'); });
      document.getElementById('selectProyectoTablaA25').addEventListener('change', async (e) => {
        proyectoA25.tabla = e.target.value;
        cfgA25.detalle = [];
        agregadaA25.detalle = false;
        invalidarSeccionA25_('proyecto');
        datosTablaA25 = null;
        datosTablaA25 = proyectoA25.tabla ? await cargarTablaA25_(proyectoA25.tabla) : null;
        pintarPreviewA25_(null);
      });
    } else if(sec === 'encReporte'){
      document.getElementById('inputEmpresaA25').addEventListener('input', (e) => { cfgA25.encReporte.empresa = e.target.value; invalidarSeccionA25_('encReporte'); });
      document.getElementById('inputTituloA25').addEventListener('input', (e) => { cfgA25.encReporte.titulo = e.target.value; invalidarSeccionA25_('encReporte'); });
    } else {
      document.querySelectorAll('#controlesA25 .chip-toggle-a25').forEach(chip => {
        chip.addEventListener('click', () => {
          const lista = cfgA25[sec];
          const id = chip.dataset.id;
          const i = lista.indexOf(id);
          if(i === -1) lista.push(id); else lista.splice(i, 1);
          chip.classList.toggle('seleccionado', i === -1);
          chip.innerHTML = (i === -1 ? '<i class="fa-solid fa-check"></i> ' : '') + (sec === 'detalle' ? etiquetaCampoA25_(id) : nombreElementoA25_(id));
          invalidarSeccionA25_(sec);
        });
      });
    }
  }

  function pintarAccionesA25_(){
    const cont = document.getElementById('accionesA25');
    if(!cont) return;
    const sec = SECCIONES_A25[pasoA25];
    const agregada = !!agregadaA25[sec.id];
    cont.innerHTML = `
      <div class="nav-pasos" style="margin-top:14px;">
        ${pasoA25 > 0 ? '<button type="button" class="btn-nav-paso" id="btnAnteriorA25"><i class="fa-solid fa-arrow-left"></i> Anterior</button>' : ''}
        <button type="button" class="btn btn-primary" id="btnAgregarA25" style="width:auto; padding:11px 22px;">
          <i class="fa-solid ${agregada ? 'fa-rotate' : 'fa-plus'}"></i> ${pasoA25 === 0 ? (agregada ? 'Actualizar proyecto' : 'Crear proyecto') : (agregada ? 'Actualizar sección' : 'Agregar al reporte')}
        </button>
        ${agregada ? `<button type="button" class="btn-nav-paso btn-nav-paso-primario" id="btnSiguienteA25">${pasoA25 === 5 ? 'Ejecutar el reporte' : 'Siguiente sección'} <i class="fa-solid fa-arrow-right"></i></button>` : ''}
      </div>`;
    const ant = document.getElementById('btnAnteriorA25');
    if(ant) ant.addEventListener('click', () => irAPasoA25_(pasoA25 - 1));
    document.getElementById('btnAgregarA25').addEventListener('click', agregarSeccionA25_);
    const sig = document.getElementById('btnSiguienteA25');
    if(sig) sig.addEventListener('click', () => irAPasoA25_(pasoA25 + 1));
  }

  function agregarSeccionA25_(){
    const sec = SECCIONES_A25[pasoA25];
    const fb = document.getElementById('feedbackA25');
    const r = validarSeccionA25_(sec.id);
    if(!r.ok){
      if(!completadaAlgunaVezA25[sec.id]) intentosA25[sec.id]++;
      agregadaA25[sec.id] = false;
      fb.innerHTML = r.mensajes.map(m => `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`).join('');
      document.getElementById('cajaSeccionA25').classList.remove('correcta');
      pintarAccionesA25_();
      pintarPreviewA25_(null);
      return;
    }
    agregadaA25[sec.id] = true;
    completadaAlgunaVezA25[sec.id] = true;
    document.getElementById('cajaSeccionA25').classList.add('correcta');
    fb.innerHTML = `
      <div class="exito-a25"><i class="fa-solid fa-circle-check"></i>
        <div><b>${pasoA25 === 0 ? '¡Proyecto creado!' : `¡${sec.nombre} agregado!`}</b> Mira cómo cambió la hoja.<br>
        <span class="oral-a25"><i class="fa-solid fa-comments"></i> ${sec.oral} Luego cambien de rol.</span></div>
      </div>`;
    pintarAccionesA25_();
    pintarPreviewA25_(sec.id);
    const st = document.querySelector('.stepper-a25');
    const tmp = document.createElement('div'); tmp.innerHTML = pintarStepperA25_(); st.replaceWith(tmp.firstElementChild);
    document.querySelectorAll('.paso-a25').forEach(b => b.addEventListener('click', () => irAPasoA25_(Number(b.dataset.paso))));
  }

  // ---------- Hoja de muestra que va creciendo ----------
  function pintarPreviewA25_(recienAgregada){
    const cont = document.getElementById('previewA25');
    if(!cont) return;
    const ag = agregadaA25;
    const nombreEmpresa = escaparHtmlA25_(cfgA25.encReporte.empresa);
    const tituloReporte = escaparHtmlA25_(cfgA25.encReporte.titulo);
    const campos = camposDetalleOrdenadosA25_();
    const filasMuestra = filasEmpleadosA25_().slice(0, 3);
    const pend = (txt) => `<div class="hoja-pendiente-a25"><i class="fa-regular fa-square-plus"></i> ${txt}</div>`;
    const glow = (id) => recienAgregada === id ? ' recien-a25' : '';

    const encRep = ag.encReporte
      ? `<div class="hoja-enc-reporte-a24${glow('encReporte')}"><div class="emp">${nombreEmpresa}</div><div class="tit">${tituloReporte}</div></div>`
      : pend('Encabezado de reporte: aún no agregado');
    const encPag = ag.encPagina
      ? `<div class="hoja-enc-pagina-a24${glow('encPagina')}">${ag.detalle && campos.length
          ? `<div class="hoja-cols-a24">${campos.map(c => `<span>${etiquetaCampoA25_(c)}</span>`).join('')}</div>`
          : '<div class="hoja-cols-a24"><span>[Títulos de columna]</span></div>'}</div>`
      : pend('Encabezado de página: aún no agregado');
    const detalle = ag.detalle
      ? `<div class="${glow('detalle').trim()}">${filasMuestra.map(f => `<div class="hoja-fila-a24">${campos.map(c => `<span>${valorCeldaA25_(c, f)}</span>`).join('')}</div>`).join('')}
         <div class="hoja-fila-a24" style="opacity:.55;"><span>… una línea por cada empleado</span></div></div>`
      : pend('Línea de detalle: aún no agregada');
    const pieRep = ag.pieReporte
      ? `<div class="${glow('pieReporte').trim()}">${cfgA25.pieReporte.map(id => `<div class="hoja-pie-reporte-a24">[${nombreElementoA25_(id)}]</div>`).join('')}</div>`
      : pend('Pie de reporte: aún no agregado');
    const piePag = ag.piePagina
      ? `<div class="hoja-pie-pagina-a24${glow('piePagina')}">${cfgA25.piePagina.map(id => `<span>[${nombreElementoA25_(id)}]</span>`).join('')}</div>`
      : pend('Pie de página: aún no agregado');

    const nombreProyecto = ag.proyecto ? escaparHtmlA25_(proyectoA25.nombre) : '';
    cont.innerHTML = `
      <div class="hoja-etiqueta-a25"><i class="fa-solid fa-file-lines"></i> ${ag.proyecto ? `Proyecto: <b>${nombreProyecto}</b>` : 'Tu proyecto todavía no existe'} · hoja de muestra</div>
      <div class="hoja-reporte-a24" style="margin:0;">
        ${encRep}${encPag}${detalle}${pieRep}${piePag}
      </div>
      <div class="leyenda-hoja-a24" style="margin:8px 0 0;">
        <span><i style="background:#12294a"></i>enc. de reporte</span>
        <span><i style="background:#8fb0e0"></i>enc. de página</span>
        <span><i style="background:#e9a850"></i>pie de página</span>
        <span><i style="background:#2e8b57"></i>pie de reporte</span>
      </div>`;
  }

  // ---------- Paso 7: ejecutar el reporte ----------
  function pintarEjecucionA25_(){
    ejecucionVistaA25 = true;
    const cuerpo = document.getElementById('cuerpoPasoA25');
    const campos = camposDetalleOrdenadosA25_();
    const hojas = hojasA25_();
    const totalHojas = hojas.length;
    const nombreEmpresa = escaparHtmlA25_(cfgA25.encReporte.empresa);
    const tituloReporte = escaparHtmlA25_(cfgA25.encReporte.titulo);
    const tiene = (zona, id) => cfgA25[zona].includes(id);

    const hojaHtml = (filas, n, esUltima) => `
      <div class="hoja-etiqueta-a24">Hoja ${n} de ${totalHojas}</div>
      <div class="hoja-reporte-a24">
        ${n === 1 ? `<div class="hoja-enc-reporte-a24"><div class="emp">${nombreEmpresa}</div><div class="tit">${tituloReporte}</div></div>` : ''}
        <div class="hoja-enc-pagina-a24"><div class="hoja-cols-a24">${campos.map(c => `<span>${etiquetaCampoA25_(c)}</span>`).join('')}</div></div>
        ${filas.map(f => `<div class="hoja-fila-a24">${campos.map(c => `<span>${valorCeldaA25_(c, f)}</span>`).join('')}</div>`).join('')}
        ${esUltima ? cfgA25.pieReporte.map(id => `<div class="hoja-pie-reporte-a24">${textoElementoA25_(id, n, totalHojas)}</div>`).join('') : ''}
        <div class="hoja-pie-pagina-a24">${cfgA25.piePagina.map(id => `<span>${textoElementoA25_(id, n, totalHojas)}</span>`).join('')}</div>
      </div>`;

    cuerpo.innerHTML = `
      <div class="empty-note" style="margin-top:0;"><i class="fa-solid fa-play"></i> <b>Ejecuta tu reporte.</b> Ya está construido: así se ve con los datos reales de la nómina, repartido en hojas. Recórrelo con tu pareja y comprueba que cada sección aparezca donde y cuantas veces le corresponde.</div>
      <div class="leyenda-hoja-a24">
        <span><i style="background:#12294a"></i>encabezado de reporte</span>
        <span><i style="background:#8fb0e0"></i>encabezado de página</span>
        <span><i style="background:#e9a850"></i>pie de página</span>
        <span><i style="background:#2e8b57"></i>pie de reporte</span>
      </div>
      ${hojas.map((h, i) => hojaHtml(h, i + 1, i === hojas.length - 1)).join('')}
      <div class="nav-pasos" style="justify-content:space-between; margin-top:16px;">
        <button type="button" class="btn-nav-paso" id="btnAnteriorA25"><i class="fa-solid fa-arrow-left"></i> Anterior</button>
        <button type="button" class="btn-descargar-pdf" id="btnDescargarReportePdfA25"><i class="fa-solid fa-file-pdf"></i> Descargar reporte en PDF</button>
        <button type="button" class="btn-nav-paso btn-nav-paso-primario" id="btnSiguienteA25">Analizar el reporte <i class="fa-solid fa-arrow-right"></i></button>
      </div>`;

    document.getElementById('btnAnteriorA25').addEventListener('click', () => irAPasoA25_(5));
    document.getElementById('btnSiguienteA25').addEventListener('click', () => irAPasoA25_(PASO_ANALISIS_A25));
    document.getElementById('btnDescargarReportePdfA25').addEventListener('click', () => {
      const lineasPieReporte = [];
      if(tiene('pieReporte', 'totalNomina')) lineasPieReporte.push({ etiqueta:'TOTAL DE LA NÓMINA', valor: formatoMontoA25_(totalNominaA25_()) });
      if(tiene('pieReporte', 'cantidadEmpleados')) lineasPieReporte.push({ etiqueta:'CANTIDAD DE EMPLEADOS', valor: String(filasEmpleadosA25_().length) });
      generarPdfReporteDisenado({
        nombreEmpresa: cfgA25.encReporte.empresa, tituloReporte: cfgA25.encReporte.titulo,
        columnas: campos.map(etiquetaCampoA25_),
        filas: filasEmpleadosA25_().map(f => campos.map(c => formatoCeldaPdfA25_(c, f))),
        mostrarTitulosColumna: true,
        piePagina: { numero: tiene('piePagina', 'numeroPagina'), fecha: tiene('piePagina', 'fechaImpresion') },
        pieReporte: lineasPieReporte,
        filasPorHoja: FILAS_POR_HOJA_A25,
        nombreArchivo: 'nomina_de_empleados'
      });
    });
    // Reaparece el stepper con "Ejecutar" ya marcado como hecho
    const st = document.querySelector('.stepper-a25');
    const tmp = document.createElement('div'); tmp.innerHTML = pintarStepperA25_(); st.replaceWith(tmp.firstElementChild);
    document.querySelectorAll('.paso-a25').forEach(b => b.addEventListener('click', () => irAPasoA25_(Number(b.dataset.paso))));
  }
  function formatoCeldaPdfA25_(campo, fila){
    if(campo === 'Salario') return formatoMontoA25_(fila[campo]);
    const v = formatearValorCeldaReporte_(fila[campo]);
    return v === null || v === undefined ? '' : String(v);
  }

  // ---------- Paso 8: analizar el reporte construido ----------
  function pintarAnalisisA25_(){
    const cuerpo = document.getElementById('cuerpoPasoA25');
    const r = respAnalisisA25;
    const hojas = hojasA25_().length;
    const opcionesNum = (sel, max) => '<option value="">Selecciona...</option>' + Array.from({ length:max }, (_, i) => i + 1).map(n => `<option value="${n}" ${String(sel) === String(n) ? 'selected' : ''}>${n}</option>`).join('');
    const completo = analisisOkA25;

    cuerpo.innerHTML = `
      <div class="nav-pasos" style="margin:0 0 14px;"><button type="button" class="btn-nav-paso" id="btnAnteriorA25"><i class="fa-solid fa-arrow-left"></i> Volver a la ejecución</button></div>
      <div class="section-heading" style="font-size:18px;">Analiza el reporte que construyeron</div>
      ${completo ? '<div class="empty-note"><i class="fa-solid fa-circle-check"></i> ¡Completaste el análisis! Ya puedes finalizar la actividad.</div>' : ''}

      <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
        <div class="caja-diseno-titulo">1. ¿Cuántas veces y dónde aparece cada sección?</div>
        ${SECCIONES_A25.slice(1).map(s => `
          <div class="afirmacion-a24">
            <span><b>${s.nombre}</b></span>
            <select class="input-generico select-frecuencia-a25" data-sec="${s.id}" ${frecuenciaOkA25 ? 'disabled' : ''}>
              <option value="">Selecciona...</option>
              ${OPCIONES_FRECUENCIA_A25.map(o => `<option value="${o.id}" ${r.frecuencias[s.id] === o.id ? 'selected' : ''}>${o.texto}</option>`).join('')}
            </select>
          </div>`).join('')}
      </div>

      <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
        <div class="caja-diseno-titulo">2. Cuenta en tu propio reporte</div>
        <p style="font-size:14px; margin:0 0 12px;">Fíjate en la Vista de Ejecución: tu reporte quedó repartido en varias hojas.</p>
        <div class="afirmacion-a24"><span>¿Cuántas <b>líneas de detalle</b> tiene tu reporte en total?</span>
          <select class="input-generico" id="selLineasA25" ${frecuenciaOkA25 ? 'disabled' : ''}>${opcionesNum(r.lineas, 20)}</select></div>
        <div class="afirmacion-a24" style="border-bottom:none;"><span>¿Cuántas veces aparece el <b>pie de página</b> en todo el reporte?</span>
          <select class="input-generico" id="selVecesPieA25" ${frecuenciaOkA25 ? 'disabled' : ''}>${opcionesNum(r.vecesPie, 10)}</select></div>
        <div id="feedbackFrecuenciaA25"></div>
      </div>

      <div class="caso-a110-card" style="max-width:100%; margin-bottom:16px;">
        <div class="caja-diseno-titulo">3. Reflexión de la pareja</div>
        <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">Al construir el reporte sección por sección, ¿qué cambió en la hoja con cada sección que agregaron y por qué conviene revisar la hoja después de cada paso?</label>
        <textarea class="input-generico celda-respuesta-a15" id="txtReflexionA25" rows="4" placeholder="Escribe tu reflexión con tus propias palabras..." ${reflexionOkA25 ? 'disabled' : ''}>${escaparHtmlA25_(r.reflexion)}</textarea>
        <div id="feedbackReflexionA25"></div>
      </div>

      <label class="check-pareja-a25"><input type="checkbox" id="chkParejaA25" ${r.conPareja ? 'checked' : ''} ${completo ? 'disabled' : ''}> Revisamos en voz alta, mi pareja y yo, qué apareció en la hoja con cada sección.</label>
      <div id="feedbackGeneralA25"></div>
      ${completo ? '' : `<button type="button" class="btn btn-primary" id="btnConfirmarAnalisisA25" style="width:auto; padding:12px 28px; margin-top:12px;"><i class="fa-solid fa-check"></i> Confirmar</button>`}`;

    document.getElementById('btnAnteriorA25').addEventListener('click', () => irAPasoA25_(PASO_EJECUCION_A25));
    cuerpo.querySelectorAll('.select-frecuencia-a25').forEach(sel => sel.addEventListener('change', () => { r.frecuencias[sel.dataset.sec] = sel.value; }));
    document.getElementById('selLineasA25').addEventListener('change', (e) => { r.lineas = e.target.value; });
    document.getElementById('selVecesPieA25').addEventListener('change', (e) => { r.vecesPie = e.target.value; });
    document.getElementById('txtReflexionA25').addEventListener('input', (e) => { r.reflexion = e.target.value; });
    document.getElementById('chkParejaA25').addEventListener('change', (e) => { r.conPareja = e.target.checked; });
    const btn = document.getElementById('btnConfirmarAnalisisA25');
    if(btn) btn.addEventListener('click', verificarAnalisisA25_);
    if(completo) document.getElementById('seccionFinalA25').classList.remove('hidden');
  }

  function verificarAnalisisA25_(){
    const r = respAnalisisA25;
    const hojas = hojasA25_().length;
    const caja = (m) => `<div class="advertencia-sitio-falso" style="max-width:100%; margin:10px 0;"><i class="fa-solid fa-triangle-exclamation"></i><div>${m}</div></div>`;

    if(!frecuenciaOkA25){
      const malas = SECCIONES_A25.slice(1).filter(s => r.frecuencias[s.id] !== FRECUENCIAS_CORRECTAS_A25[s.id]).length;
      const numerosOk = String(r.lineas) === String(filasEmpleadosA25_().length) && String(r.vecesPie) === String(hojas);
      if(malas === 0 && numerosOk){
        frecuenciaOkA25 = true;
      } else {
        intentosFrecuenciaA25++;
        const m = [];
        if(malas > 0) m.push(`${malas} de las 5 secciones no tienen la frecuencia correcta. Piensa: ¿sale una vez, en cada hoja o una por empleado? ¿Arriba o abajo?`);
        if(!numerosOk) m.push('Revisa tus conteos en la Vista de Ejecución: una línea de detalle por empleado, y el pie de página sale una vez por hoja.');
        document.getElementById('feedbackFrecuenciaA25').innerHTML = m.map(caja).join('');
      }
    }
    if(!reflexionOkA25){
      const texto = normalizarTextoA15_(r.reflexion || '');
      const claves = ['encabezado', 'detalle', 'pie'].filter(k => texto.includes(k)).length;
      if(contarPalabrasRealesA15_(r.reflexion || '') >= 15 && claves >= 2){
        reflexionOkA25 = true;
      } else {
        intentosReflexionA25++;
        document.getElementById('feedbackReflexionA25').innerHTML = caja('Tu reflexión necesita más detalle: usa al menos 15 palabras y menciona varias secciones (por ejemplo, el <b>encabezado</b>, el <b>detalle</b> o los <b>pies</b>) indicando qué apareció en la hoja al agregarlas.');
      }
    }
    const fbF = document.getElementById('feedbackFrecuenciaA25').innerHTML;
    const fbR = document.getElementById('feedbackReflexionA25').innerHTML;
    const sinCheck = frecuenciaOkA25 && reflexionOkA25 && !r.conPareja;
    if(frecuenciaOkA25 && reflexionOkA25 && r.conPareja) analisisOkA25 = true;
    pintarAnalisisA25_();
    if(analisisOkA25){ pintarStepperEnLugarA25_(); return; }
    document.getElementById('feedbackFrecuenciaA25').innerHTML = fbF;
    document.getElementById('feedbackReflexionA25').innerHTML = fbR;
    if(sinCheck) document.getElementById('feedbackGeneralA25').innerHTML = caja('Marca la casilla: antes de finalizar, comenten en voz alta con tu pareja lo que apareció en la hoja con cada sección.');
  }
  function pintarStepperEnLugarA25_(){
    const st = document.querySelector('.stepper-a25');
    const tmp = document.createElement('div'); tmp.innerHTML = pintarStepperA25_(); st.replaceWith(tmp.firstElementChild);
    document.querySelectorAll('.paso-a25').forEach(b => b.addEventListener('click', () => irAPasoA25_(Number(b.dataset.paso))));
  }

  // ---------- Finalizar y calificar ----------
  document.getElementById('btnFinalizarA25').addEventListener('click', async () => {
    clearInterval(timerIntervalA25);
    const minutos = (Date.now() - inicioTiempoA25) / 60000;
    const nivelPorIntentos = (intentos) => intentos <= 1 ? 'logrado' : (intentos <= 2 ? 'proceso' : 'no_logrado');
    const C = CRITERIOS_BASE_A25;
    const crit = (i, nivel) => ({ nombre: C[i].nombre, descripcion: C[i].descripcion, nivel });
    const criterios = [
      crit(0, 'logrado'),
      crit(1, nivelPorIntentos(intentosA25.proyecto + 1)),
      crit(2, nivelPorIntentos(intentosA25.encReporte + 1)),
      crit(3, nivelPorIntentos(intentosA25.encPagina + 1)),
      crit(4, nivelPorIntentos(intentosA25.detalle + 1)),
      crit(5, nivelPorIntentos(intentosA25.piePagina + 1)),
      crit(6, nivelPorIntentos(intentosA25.pieReporte + 1)),
      crit(7, ejecucionVistaA25 ? 'logrado' : 'no_logrado'),
      crit(8, nivelPorIntentos(intentosFrecuenciaA25 + 1)),
      crit(9, nivelPorIntentos(intentosReflexionA25 + 1)),
      crit(10, minutos <= tiempoEstimadoA25 * 1.5 ? 'logrado' : (minutos <= tiempoEstimadoA25 * 2 ? 'proceso' : 'no_logrado')),
      crit(11, 'logrado')
    ];
    const pesoUnidad = puntajeMaxA25 / criterios.length;
    const pesosPorNivel = { logrado:1, proceso:0.5, no_logrado:0 };
    let nota = 0;
    criterios.forEach(c => { nota += pesoUnidad * pesosPorNivel[c.nivel]; });
    nota = Math.round(nota * 100) / 100;

    document.getElementById('vistaEjercicioA25').classList.add('hidden');
    document.getElementById('vistaResultadoA25').classList.remove('hidden');
    document.getElementById('avisoYaCompletadaA25').classList.add('hidden');
    renderRubrica('rubricaResultadoA25', criterios, puntajeMaxA25, nota);
    ultimoResultadoA25 = { criterios, nota, puntajeMaximo: puntajeMaxA25 };

    const proporcion = puntajeMaxA25 > 0 ? nota / puntajeMaxA25 : 0;
    mostrarLogro(proporcion >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcion >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcion >= 0.8) dispararConfeti();

    const r = respAnalisisA25;
    const detalle = [
      {
        titulo: 'Construcción del reporte, sección por sección',
        items: [
          { pregunta:'Proyecto nuevo', tuRespuesta: `"${proyectoA25.nombre}" · conectado a ${(TABLAS_DISPONIBLES_A19.find(t => t.codigo === proyectoA25.tabla) || {}).nombre || 'sin tabla'} · pareja: ${proyectoA25.pareja}`, correcta: intentosA25.proyecto === 0 },
          { pregunta:'Encabezado de reporte', tuRespuesta: `${cfgA25.encReporte.empresa} — ${cfgA25.encReporte.titulo}`, correcta: intentosA25.encReporte === 0 },
          { pregunta:'Encabezado de página', tuRespuesta: cfgA25.encPagina.map(nombreElementoA25_).join(', ') || 'Vacío', correcta: intentosA25.encPagina === 0 },
          { pregunta:'Línea de detalle', tuRespuesta: camposDetalleOrdenadosA25_().map(etiquetaCampoA25_).join(', '), correcta: intentosA25.detalle === 0 },
          { pregunta:'Pie de página', tuRespuesta: cfgA25.piePagina.map(nombreElementoA25_).join(', ') || 'Vacío', correcta: intentosA25.piePagina === 0 },
          { pregunta:'Pie de reporte', tuRespuesta: cfgA25.pieReporte.map(nombreElementoA25_).join(', ') || 'Vacío', correcta: intentosA25.pieReporte === 0 }
        ]
      },
      {
        titulo: 'Análisis del reporte',
        items: [
          { pregunta:'¿Ejecutó y revisó el reporte completo?', tuRespuesta: ejecucionVistaA25 ? 'Sí' : 'No', correcta: ejecucionVistaA25 },
          ...SECCIONES_A25.slice(1).map(s => ({
            pregunta: `¿Cuántas veces y dónde aparece el ${s.nombre.toLowerCase()}?`,
            tuRespuesta: (OPCIONES_FRECUENCIA_A25.find(o => o.id === r.frecuencias[s.id]) || {}).texto || 'Sin responder',
            correcta: r.frecuencias[s.id] === FRECUENCIAS_CORRECTAS_A25[s.id]
          })),
          { pregunta:'Conteos en su reporte', tuRespuesta: `Líneas de detalle: ${r.lineas}; veces que aparece el pie de página: ${r.vecesPie}`, correcta: intentosFrecuenciaA25 === 0 },
          { pregunta:'Reflexión sobre la construcción por secciones', tuRespuesta: r.reflexion || 'Sin responder', correcta: intentosReflexionA25 === 0 }
        ]
      }
    ];
    ultimoResultadoA25.detalle = detalle;
    renderDesgloseColoreado('resultadoDesgloseA25', detalle);

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.2.5',
        ra:'RA2',
        ec: EC_A25,
        nota,
        puntajeMaximo: puntajeMaxA25,
        criterios,
        detalle
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnDescargarPdfA25').addEventListener('click', () => {
    if(!ultimoResultadoA25) return;
    generarPdfResultado('A.2.5', ultimoResultadoA25.criterios, ultimoResultadoA25.nota, ultimoResultadoA25.puntajeMaximo, EC_A25, 'RA2', ultimoResultadoA25.detalle);
  });

  document.getElementById('btnVolverMisActA25').addEventListener('click', () => {
    document.getElementById('panelActividadA25').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.2.5', abrirActividadA25);
