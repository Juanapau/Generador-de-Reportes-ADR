// ============================================================================
// ACTIVIDADES INTERACTIVAS — TODOS los códigos de actividad viven en este
// único archivo, organizados por secciones (Ctrl+F el código, ej. "A.1.2").
// Esto evita tener decenas de archivos sueltos a medida que crece el módulo.
// ============================================================================

// ============================================================================
// A.1.1 — CLASIFICADOR DE REPORTES EMPRESARIALES (Interno / Externo)
// ============================================================================
  // ================= ACTIVIDAD A.1.1: CLASIFICADOR DE REPORTES =================
  // Contenido pensado para 5to de Bachillerato Técnico en Informática: requiere leer
  // y analizar el propósito/audiencia de cada reporte, no solo detectar una palabra clave.
  const ITEMS_A11_BASE = [
    { id:1, texto:'Resumen semanal de indicadores de productividad, compartido únicamente entre los supervisores de línea de producción.', tipo:'interno' },
    { id:2, texto:'Boletín trimestral con los resultados financieros consolidados, remitido a la Superintendencia de Valores.', tipo:'externo' },
    { id:3, texto:'Registro de horas trabajadas y ausencias, utilizado por el área de nómina para calcular los pagos quincenales.', tipo:'interno' },
    { id:4, texto:'Cotización detallada de servicios de mantenimiento, enviada a una empresa interesada en contratar a la compañía.', tipo:'externo' },
    { id:5, texto:'Comparativo de existencias entre bodegas, empleado para decidir traslados internos de mercancía.', tipo:'interno' },
    { id:6, texto:'Memoria anual de responsabilidad social corporativa, disponible para descarga en la página institucional.', tipo:'externo' },
    { id:7, texto:'Análisis de rotación de personal presentado en la reunión mensual de gerencia.', tipo:'interno' },
    { id:8, texto:'Certificación de cumplimiento tributario, solicitada por un banco para aprobar una línea de crédito.', tipo:'externo' },
    { id:9, texto:'Bitácora de incidencias del sistema, revisada por el equipo de soporte técnico para dar seguimiento a fallos.', tipo:'interno' },
    { id:10, texto:'Carta de confirmación de pedido con el detalle de productos y fechas de entrega, dirigida a un cliente.', tipo:'externo' }
  ];

  const CRITERIOS_BASE_A11 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad de clasificación desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de tipos', descripcion:'Reconoce las características que distinguen un reporte interno de uno externo.' },
    { key:'clasificacion', nombre:'3. Clasificación correcta', descripcion:'Ubica cada ejemplo en la categoría correcta según sus características.' },
    { key:'justificacion', nombre:'4. Justificación del criterio', descripcion:'Explica el motivo de su clasificación con argumentos válidos.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'colaborativo', nombre:'6. Trabajo colaborativo', descripcion:'Colabora de forma organizada con su equipo durante el ejercicio.' }
  ];

  let ITEMS_A11 = [];
  let asignacionesA11 = {};
  let seleccionadoA11 = null;
  let puntajeMaxA11 = 0;
  let tiempoEstimadoA11 = 10;
  let inicioTiempoA11 = null;
  let timerIntervalA11 = null;

  async function abrirActividadA11(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA11 = puntajeMaximo;
    tiempoEstimadoA11 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA11').textContent = enunciado || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA11').classList.remove('hidden');

    // ---- Bloqueo de repetición: si ya existe una calificación para esta actividad,
    // se muestra directamente el resultado guardado y no se permite volver a realizarla.
    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.1') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA11').classList.add('hidden');
        document.getElementById('vistaEjercicioA11').classList.add('hidden');
        document.getElementById('vistaResultadoA11').classList.remove('hidden');
        document.getElementById('resultadoDesgloseA11').innerHTML = '';
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
    document.getElementById('justificacionA11').value = '';
    document.getElementById('vistaInstrumentoA11').classList.add('hidden');
    document.getElementById('vistaEjercicioA11').classList.remove('hidden');
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
    document.getElementById('btnFinalizarA11').disabled = enPool.length > 0;
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

    const minutosTranscurridos = (Date.now() - inicioTiempoA11) / 60000;
    const justificacion = document.getElementById('justificacionA11').value.trim();

    const criterios = [];

    criterios.push({ nombre: CRITERIOS_BASE_A11[0].nombre, descripcion: CRITERIOS_BASE_A11[0].descripcion, nivel: 'logrado' });

    criterios.push({
      nombre: CRITERIOS_BASE_A11[1].nombre, descripcion: CRITERIOS_BASE_A11[1].descripcion,
      nivel: proporcionCorrecta >= 0.75 ? 'logrado' : (proporcionCorrecta >= 0.4 ? 'proceso' : 'no_logrado')
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

    const proporcionFinalA11 = puntajeMaxA11 > 0 ? notaCalculada / puntajeMaxA11 : 0;
    mostrarLogro(proporcionFinalA11 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA11 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA11 >= 0.8) dispararConfeti();

    document.getElementById('resultadoDesgloseA11').innerHTML = `
      <div class="clasif-zona zona-interno">
        <h4><i class="fa-solid fa-building"></i> Interno</h4>
        ${ITEMS_A11.filter(it => it.tipo === 'interno').map(it => `
          <div class="clasif-item ${asignacionesA11[it.id] === 'interno' ? 'correcto' : 'incorrecto'}">${it.texto}</div>
        `).join('')}
      </div>
      <div class="clasif-zona zona-externo">
        <h4><i class="fa-solid fa-globe"></i> Externo</h4>
        ${ITEMS_A11.filter(it => it.tipo === 'externo').map(it => `
          <div class="clasif-item ${asignacionesA11[it.id] === 'externo' ? 'correcto' : 'incorrecto'}">${it.texto}</div>
        `).join('')}
      </div>
    `;

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.1',
        ra:'RA1',
        ec:'EC6.1.1',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA11,
        criterios: criterios
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
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

  const CRITERIOS_BASE_A12 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de partes', descripcion:'Reconoce las partes que componen un reporte empresarial.' },
    { key:'clasificacion', nombre:'3. Ubicación correcta', descripcion:'Coloca cada etiqueta en la zona correcta del reporte.' },
    { key:'justificacion', nombre:'4. Justificación', descripcion:'Explica la función de al menos dos de las partes identificadas.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'6. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let asignacionesA12 = {};
  let etiquetaSeleccionadaA12 = null;
  let etiquetasBarajadasA12 = [];
  let puntajeMaxA12 = 0;
  let tiempoEstimadoA12 = 10;
  let inicioTiempoA12 = null;
  let timerIntervalA12 = null;

  async function abrirActividadA12(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA12 = puntajeMaximo;
    tiempoEstimadoA12 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA12').textContent = enunciado || '';
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
        renderListaCotejo('rubricaResultadoA12', previa.criterios, previa.puntajeMaximo, previa.nota);
        document.getElementById('avisoYaCompletadaA12').classList.remove('hidden');
        document.getElementById('tituloDesgloseA12').classList.add('hidden');
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
    asignacionesA12 = {};
    etiquetaSeleccionadaA12 = null;
    etiquetasBarajadasA12 = barajar(ETIQUETAS_A12_BASE); // orden distinto en cada intento
    document.getElementById('justificacionA12').value = '';
    document.getElementById('vistaInstrumentoA12').classList.add('hidden');
    document.getElementById('vistaEjercicioA12').classList.remove('hidden');
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
    document.getElementById('btnFinalizarA12').disabled = Object.keys(asignacionesA12).length < ZONAS_A12_BASE.length;
  }

  document.getElementById('btnFinalizarA12').addEventListener('click', async () => {
    clearInterval(timerIntervalA12);

    let correctas = 0;
    ZONAS_A12_BASE.forEach(z => { if(asignacionesA12[z.id] === z.correcta) correctas++; });
    const total = ZONAS_A12_BASE.length;
    const proporcionCorrecta = correctas / total;

    const minutosTranscurridos = (Date.now() - inicioTiempoA12) / 60000;
    const justificacion = document.getElementById('justificacionA12').value.trim();

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A12[0].nombre, descripcion: CRITERIOS_BASE_A12[0].descripcion, nivel: 'cumple' });

    criterios.push({
      nombre: CRITERIOS_BASE_A12[1].nombre, descripcion: CRITERIOS_BASE_A12[1].descripcion,
      nivel: proporcionCorrecta >= 0.6 ? 'cumple' : 'no_cumple'
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
    document.getElementById('tituloDesgloseA12').classList.remove('hidden');
    renderListaCotejo('rubricaResultadoA12', criterios, puntajeMaxA12, notaCalculada);

    const proporcionFinalA12 = puntajeMaxA12 > 0 ? notaCalculada / puntajeMaxA12 : 0;
    mostrarLogro(proporcionFinalA12 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA12 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA12 >= 0.8) dispararConfeti();

    document.getElementById('resultadoDesgloseA12').innerHTML = ZONAS_A12_BASE.map(z => {
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

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.2',
        ra:'RA1',
        ec:'EC6.1.1',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA12,
        criterios: criterios
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnVolverMisActA12').addEventListener('click', () => {
    document.getElementById('panelActividadA12').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.2', abrirActividadA12);

// ============================================================================
// A.1.3 — VISTAS DE UN REPORTE EMPRESARIAL
// ============================================================================
  const ESCENARIOS_A13_BASE = [
    { id:1, texto:'El diseñador ajusta el ancho de las columnas y el color de fondo del encabezado antes de conectar el reporte a los datos reales.', tipo:'diseno' },
    { id:2, texto:'Se arrastran los campos de la base de datos hacia la cuadrícula del reporte para definir dónde aparecerá cada dato.', tipo:'diseno' },
    { id:3, texto:'Se agrega un logotipo y se cambia la fuente del título del reporte mientras aún no hay información cargada.', tipo:'diseno' },
    { id:4, texto:'Antes de entregar el reporte, el diseñador revisa cómo se verá impreso, usando datos de prueba, sin publicarlo todavía.', tipo:'previsualizacion' },
    { id:5, texto:'Se simula cómo lucirán los totales y subtotales en la página, sin que el reporte esté disponible aún para los usuarios finales.', tipo:'previsualizacion' },
    { id:6, texto:'El equipo revisa la distribución de las páginas y los saltos de página antes de liberar el reporte a producción.', tipo:'previsualizacion' },
    { id:7, texto:'El reporte se ejecuta consultando la base de datos en tiempo real y genera el documento final que verá el gerente.', tipo:'ejecucion' },
    { id:8, texto:'Un usuario solicita el reporte de ventas del mes y el sistema lo genera al instante con la información actualizada.', tipo:'ejecucion' },
    { id:9, texto:'El reporte corre automáticamente cada lunes a las 8:00 a.m. y envía los resultados actualizados por correo.', tipo:'ejecucion' }
  ];

  const CRITERIOS_BASE_A13 = [
    { key:'participacion', nombre:'1. Participación activa', niveles:{ excelente:'Participa activamente desde el inicio de la actividad.', bueno:'Participa la mayor parte del tiempo.', proceso:'Participa de forma limitada o intermitente.', insuficiente:'No participa en la actividad.' } },
    { key:'identificacion', nombre:'2. Identificación de vistas', niveles:{ excelente:'Reconoce con precisión las diferencias entre las tres vistas de un reporte.', bueno:'Reconoce la mayoría de las diferencias entre las vistas.', proceso:'Reconoce algunas diferencias, con confusiones frecuentes.', insuficiente:'No logra diferenciar las vistas del reporte.' } },
    { key:'clasificacion', nombre:'3. Clasificación correcta', niveles:{ excelente:'Clasifica correctamente el 90%-100% de los escenarios.', bueno:'Clasifica correctamente el 70%-89% de los escenarios.', proceso:'Clasifica correctamente el 50%-69% de los escenarios.', insuficiente:'Clasifica correctamente menos del 50% de los escenarios.' } },
    { key:'justificacion', nombre:'4. Justificación', niveles:{ excelente:'Explica con claridad y precisión el porqué de su clasificación.', bueno:'Explica de forma general el porqué de su clasificación.', proceso:'Ofrece una justificación breve o poco clara.', insuficiente:'No justifica su clasificación.' } },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', niveles:{ excelente:'Completa la actividad dentro del tiempo estimado.', bueno:'Completa la actividad con un ligero retraso.', proceso:'Completa la actividad con un retraso considerable.', insuficiente:'Excede ampliamente el tiempo estimado.' } },
    { key:'colaborativo', nombre:'6. Trabajo colaborativo', niveles:{ excelente:'Colabora de forma organizada y respetuosa con su pareja de trabajo.', bueno:'Colabora la mayor parte del tiempo con su pareja.', proceso:'Colabora de forma limitada.', insuficiente:'No colabora con su pareja de trabajo.' } }
  ];

  let asignacionesA13 = {};
  let seleccionadoA13 = null;
  let escenariosBarajadosA13 = [];
  let puntajeMaxA13 = 0;
  let tiempoEstimadoA13 = 10;
  let inicioTiempoA13 = null;
  let timerIntervalA13 = null;

  async function abrirActividadA13(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA13 = puntajeMaximo;
    tiempoEstimadoA13 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA13').textContent = enunciado || '';
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA13').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
      const previa = data.success ? data.calificaciones.find(c => c.codigo === 'A.1.3') : null;
      if(previa){
        document.getElementById('vistaInstrumentoA13').classList.add('hidden');
        document.getElementById('vistaEjercicioA13').classList.add('hidden');
        document.getElementById('vistaResultadoA13').classList.remove('hidden');
        document.getElementById('resultadoDesgloseA13').innerHTML = '';
        renderRubricaDescriptiva('rubricaResultadoA13', previa.criterios, previa.puntajeMaximo, previa.nota);
        document.getElementById('avisoYaCompletadaA13').classList.remove('hidden');
        document.getElementById('tituloDesgloseA13').classList.add('hidden');
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
    asignacionesA13 = {};
    seleccionadoA13 = null;
    escenariosBarajadosA13 = barajar(ESCENARIOS_A13_BASE);
    document.getElementById('justificacionA13').value = '';
    document.getElementById('vistaInstrumentoA13').classList.add('hidden');
    document.getElementById('vistaEjercicioA13').classList.remove('hidden');
    pintarClasificadorA13();

    inicioTiempoA13 = Date.now();
    clearInterval(timerIntervalA13);
    timerIntervalA13 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA13) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA13').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA13} min aprox.)</span>`;
    }, 1000);
  });

  function pintarClasificadorA13(){
    const pool = document.getElementById('clasifPoolA13');
    const zonaDiseno = document.getElementById('zonaDisenoItemsA13');
    const zonaPrevis = document.getElementById('zonaPrevisualizacionItemsA13');
    const zonaEjec = document.getElementById('zonaEjecucionItemsA13');

    const enPool = escenariosBarajadosA13.filter(it => !asignacionesA13[it.id]);
    const enDiseno = escenariosBarajadosA13.filter(it => asignacionesA13[it.id] === 'diseno');
    const enPrevis = escenariosBarajadosA13.filter(it => asignacionesA13[it.id] === 'previsualizacion');
    const enEjec = escenariosBarajadosA13.filter(it => asignacionesA13[it.id] === 'ejecucion');

    pool.innerHTML = enPool.map(it => `
      <div class="clasif-item ${seleccionadoA13 === it.id ? 'selected' : ''}" draggable="true" data-id="${it.id}">${it.texto}</div>
    `).join('') || '<span style="opacity:.5; font-size:14px;">Todos los escenarios han sido clasificados.</span>';

    zonaDiseno.innerHTML = enDiseno.map(it => `<div class="clasif-item" data-id="${it.id}">${it.texto}</div>`).join('');
    zonaPrevis.innerHTML = enPrevis.map(it => `<div class="clasif-item" data-id="${it.id}">${it.texto}</div>`).join('');
    zonaEjec.innerHTML = enEjec.map(it => `<div class="clasif-item" data-id="${it.id}">${it.texto}</div>`).join('');

    pool.querySelectorAll('.clasif-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.dataset.id);
        seleccionadoA13 = seleccionadoA13 === id ? null : id;
        pintarClasificadorA13();
      });
    });

    [...zonaDiseno.querySelectorAll('.clasif-item'), ...zonaPrevis.querySelectorAll('.clasif-item'), ...zonaEjec.querySelectorAll('.clasif-item')].forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.dataset.id);
        delete asignacionesA13[id];
        pintarClasificadorA13();
      });
    });

    // Arrastrar y soltar (además del clic-seleccionar-y-asignar)
    habilitarArrastre(
      pool.querySelectorAll('.clasif-item[draggable="true"]'),
      [document.getElementById('zonaDisenoA13'), document.getElementById('zonaPrevisualizacionA13'), document.getElementById('zonaEjecucionA13')],
      (idArrastrado, zonaEl) => {
        const mapaZona = { zonaDisenoA13:'diseno', zonaPrevisualizacionA13:'previsualizacion', zonaEjecucionA13:'ejecucion' };
        asignacionesA13[Number(idArrastrado)] = mapaZona[zonaEl.id];
        seleccionadoA13 = null;
        pintarClasificadorA13();
      }
    );

    actualizarBarraProgreso('progresoA13', escenariosBarajadosA13.length - enPool.length, escenariosBarajadosA13.length);
    document.getElementById('btnFinalizarA13').disabled = enPool.length > 0;
  }

  function asignarZonaA13(tipo){
    if(seleccionadoA13 === null) return;
    asignacionesA13[seleccionadoA13] = tipo;
    seleccionadoA13 = null;
    pintarClasificadorA13();
  }
  document.getElementById('zonaDisenoA13').addEventListener('click', (e) => {
    if(e.target.closest('.clasif-item')) return;
    asignarZonaA13('diseno');
  });
  document.getElementById('zonaPrevisualizacionA13').addEventListener('click', (e) => {
    if(e.target.closest('.clasif-item')) return;
    asignarZonaA13('previsualizacion');
  });
  document.getElementById('zonaEjecucionA13').addEventListener('click', (e) => {
    if(e.target.closest('.clasif-item')) return;
    asignarZonaA13('ejecucion');
  });

  document.getElementById('btnFinalizarA13').addEventListener('click', async () => {
    clearInterval(timerIntervalA13);

    let correctas = 0;
    escenariosBarajadosA13.forEach(it => { if(asignacionesA13[it.id] === it.tipo) correctas++; });
    const total = escenariosBarajadosA13.length;
    const proporcionCorrecta = correctas / total;

    const minutosTranscurridos = (Date.now() - inicioTiempoA13) / 60000;
    const justificacion = document.getElementById('justificacionA13').value.trim();

    function nivelPorProporcion(p, uExc, uBueno, uProceso){
      if(p >= uExc) return 'excelente';
      if(p >= uBueno) return 'bueno';
      if(p >= uProceso) return 'proceso';
      return 'insuficiente';
    }

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A13[0].nombre, niveles: CRITERIOS_BASE_A13[0].niveles, nivel: 'excelente' });

    criterios.push({
      nombre: CRITERIOS_BASE_A13[1].nombre, niveles: CRITERIOS_BASE_A13[1].niveles,
      nivel: nivelPorProporcion(proporcionCorrecta, 0.75, 0.55, 0.3)
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A13[2].nombre, niveles: CRITERIOS_BASE_A13[2].niveles,
      nivel: nivelPorProporcion(proporcionCorrecta, 0.9, 0.7, 0.5)
    });

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
    document.getElementById('tituloDesgloseA13').classList.remove('hidden');
    renderRubricaDescriptiva('rubricaResultadoA13', criterios, puntajeMaxA13, notaCalculada);

    const proporcionFinalA13 = puntajeMaxA13 > 0 ? notaCalculada / puntajeMaxA13 : 0;
    mostrarLogro(proporcionFinalA13 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA13 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA13 >= 0.8) dispararConfeti();

    function bloqueResultadoA13(titulo, icono, tipo){
      const items = escenariosBarajadosA13.filter(it => it.tipo === tipo);
      return `
        <div class="clasif-zona zona-${tipo}">
          <h4><i class="fa-solid ${icono}"></i> ${titulo}</h4>
          ${items.map(it => `
            <div class="clasif-item ${asignacionesA13[it.id] === tipo ? 'correcto' : 'incorrecto'}">${it.texto}</div>
          `).join('')}
        </div>`;
    }
    document.getElementById('resultadoDesgloseA13').innerHTML =
      bloqueResultadoA13('Vista de diseño', 'fa-pen-ruler', 'diseno') +
      bloqueResultadoA13('Previsualización', 'fa-eye', 'previsualizacion') +
      bloqueResultadoA13('Ejecución', 'fa-play', 'ejecucion');

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.3',
        ra:'RA1',
        ec:'EC6.1.2',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA13,
        criterios: criterios
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnVolverMisActA13').addEventListener('click', () => {
    document.getElementById('panelActividadA13').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.3', abrirActividadA13);

// ============================================================================
// A.1.4 — EJECUTAR UN REPORTE Y CAMBIAR DE VISTA (SIMULADOR TIPO ASISTENTE)
// ============================================================================
  // A diferencia de las anteriores, aquí el estudiante avanza por pasos de un
  // asistente simulado, tomando decisiones en cada pantalla (no clasificación).
  const PASOS_A14 = [
    {
      indicador: 'Paso 1 de 3 — Vista de diseño',
      mockup: `
        <div class="asistente-toolbar">
          <span class="asistente-toolbar-btn activo"><i class="fa-solid fa-pen-ruler"></i> Vista de diseño</span>
          <span class="asistente-toolbar-btn"><i class="fa-solid fa-eye"></i> Vista previa</span>
          <span class="asistente-toolbar-btn"><i class="fa-solid fa-play"></i> Ejecutar</span>
        </div>
        <div style="font-size:13px; opacity:.7; margin-bottom:8px;">Reporte: Ventas Mensuales — TECNOVENTAS RD, S.R.L.</div>
        <div style="border:1px dashed var(--dark-border); border-radius:8px; padding:14px; font-size:12.5px; opacity:.6;">
          [ Encabezado ] &nbsp;·&nbsp; [ Columnas: Producto, Cantidad, Precio ] &nbsp;·&nbsp; [ Pie de página ]
          <br><span style="opacity:.7;">Estructura del reporte lista, sin datos cargados todavía.</span>
        </div>`,
      pregunta: 'Ya terminaste de diseñar la estructura del reporte. ¿Qué deberías hacer antes de ejecutarlo con los datos reales de la empresa?',
      opciones: [
        { texto: 'Seguir hasta ejecutar el reporte de inmediato.', correcta: false },
        { texto: 'Cambiar a la vista de previsualización para revisar cómo se verá con datos de muestra.', correcta: true },
        { texto: 'Cerrar el programa sin guardar los cambios.', correcta: false }
      ],
      feedback: 'La vista de previsualización permite revisar el diseño con datos de muestra antes de ejecutar el reporte con información real, evitando errores costosos.'
    },
    {
      indicador: 'Paso 2 de 3 — Vista de previsualización',
      mockup: `
        <div class="asistente-toolbar">
          <span class="asistente-toolbar-btn"><i class="fa-solid fa-pen-ruler"></i> Vista de diseño</span>
          <span class="asistente-toolbar-btn activo"><i class="fa-solid fa-eye"></i> Vista previa</span>
          <span class="asistente-toolbar-btn"><i class="fa-solid fa-play"></i> Ejecutar</span>
        </div>
        <div style="font-size:13px; opacity:.7; margin-bottom:8px;">Reporte: Ventas Mensuales — TECNOVENTAS RD, S.R.L. (datos de muestra)</div>
        <div style="border:1px dashed var(--dark-border); border-radius:8px; padding:14px; font-size:12.5px;">
          <div style="display:flex; gap:14px; font-weight:700; opacity:.6;"><span style="flex:2;">Producto</span><span style="flex:1;">Cant.</span><span style="flex:1;">Precio</span></div>
          <div style="display:flex; gap:14px; opacity:.5;"><span style="flex:2;">[Producto de ejemplo]</span><span style="flex:1;">XX</span><span style="flex:1;">RD$X,XXX</span></div>
          <div style="display:flex; gap:14px; opacity:.5;"><span style="flex:2;">[Producto de ejemplo]</span><span style="flex:1;">XX</span><span style="flex:1;">RD$X,XXX</span></div>
        </div>`,
      pregunta: 'Estás viendo la vista previa con datos de muestra (no reales). ¿Cuál es tu siguiente paso para obtener el reporte final?',
      opciones: [
        { texto: 'Ejecutar el reporte para consultar la base de datos real.', correcta: true },
        { texto: 'Volver a la vista de diseño y empezar de nuevo.', correcta: false },
        { texto: 'Guardar la vista previa como el reporte definitivo.', correcta: false }
      ],
      feedback: 'Al ejecutar el reporte, el programa consulta la base de datos real y reemplaza los datos de muestra por la información actualizada de la empresa.'
    },
    {
      indicador: 'Paso 3 de 3 — Vista de ejecución',
      mockup: `
        <div class="asistente-toolbar">
          <span class="asistente-toolbar-btn"><i class="fa-solid fa-pen-ruler"></i> Vista de diseño</span>
          <span class="asistente-toolbar-btn"><i class="fa-solid fa-eye"></i> Vista previa</span>
          <span class="asistente-toolbar-btn activo"><i class="fa-solid fa-play"></i> Ejecutar</span>
        </div>
        <div style="font-size:13px; opacity:.7; margin-bottom:8px;">Reporte: Ventas Mensuales — TECNOVENTAS RD, S.R.L. (datos reales)</div>
        <div style="border:1px dashed var(--dark-border); border-radius:8px; padding:14px; font-size:12.5px;">
          <div style="display:flex; gap:14px; font-weight:700; opacity:.85;"><span style="flex:2;">Producto</span><span style="flex:1;">Cant.</span><span style="flex:1;">Precio</span></div>
          <div style="display:flex; gap:14px;"><span style="flex:2;">Laptop HP 15</span><span style="flex:1;">3</span><span style="flex:1;">RD$28,500.00</span></div>
          <div style="display:flex; gap:14px;"><span style="flex:2;">Mouse inalámbrico</span><span style="flex:1;">12</span><span style="flex:1;">RD$650.00</span></div>
        </div>`,
      pregunta: 'El reporte ya se ejecutó con datos reales. ¿Cuál es la diferencia principal respecto a la vista previa?',
      opciones: [
        { texto: 'Los datos ahora provienen de la base de datos real de la empresa, no son de muestra.', correcta: true },
        { texto: 'La estructura del reporte cambió por completo.', correcta: false },
        { texto: 'El reporte ya no puede imprimirse ni publicarse.', correcta: false },
        { texto: 'No hay ninguna diferencia entre ambas vistas.', correcta: false }
      ],
      feedback: 'La ejecución consulta la base de datos en tiempo real: el diseño y la estructura son los mismos, pero los datos ya son reales y actualizados.'
    }
  ];

  const CRITERIOS_BASE_A14 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de la secuencia', descripcion:'Reconoce el orden correcto en que se usan las vistas de un reporte.' },
    { key:'ejecucion', nombre:'3. Ejecución correcta del asistente', descripcion:'Toma la decisión correcta en cada paso del asistente, idealmente al primer intento.' },
    { key:'justificacion', nombre:'4. Justificación', descripcion:'Explica con claridad la diferencia entre las tres vistas del reporte.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'colaborativo', nombre:'6. Trabajo colaborativo', descripcion:'Colabora de forma organizada con su pareja de trabajo.' }
  ];

  let pasoActualA14 = 0;
  let respuestasA14 = []; // por paso: true (acertó al primer intento), false (acertó pero no al primer intento)
  let intentosPasoA14 = [];
  let puntajeMaxA14 = 0;
  let tiempoEstimadoA14 = 10;
  let inicioTiempoA14 = null;
  let timerIntervalA14 = null;

  async function abrirActividadA14(puntajeMaximo, tiempoEstimado, enunciado){
    puntajeMaxA14 = puntajeMaximo;
    tiempoEstimadoA14 = tiempoEstimado || 10;
    document.getElementById('enunciadoActivoA14').textContent = enunciado || '';
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
    pasoActualA14 = 0;
    respuestasA14 = [];
    intentosPasoA14 = [];
    document.getElementById('justificacionA14').value = '';
    document.getElementById('justificacionBoxA14').classList.add('hidden');
    document.getElementById('btnFinalizarA14').classList.add('hidden');
    document.getElementById('vistaInstrumentoA14').classList.add('hidden');
    document.getElementById('vistaEjercicioA14').classList.remove('hidden');
    renderPasoA14();

    inicioTiempoA14 = Date.now();
    clearInterval(timerIntervalA14);
    timerIntervalA14 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA14) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA14').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss} <span style="opacity:.7; font-weight:400;">(tienes ${tiempoEstimadoA14} min aprox.)</span>`;
    }, 1000);
  });

  function renderPasoA14(){
    actualizarBarraProgreso('progresoA14', pasoActualA14, PASOS_A14.length + 1); // +1 por el paso final de justificación

    if(pasoActualA14 >= PASOS_A14.length){
      // Último paso: justificación
      document.getElementById('asistenteA14').innerHTML = `
        <div class="asistente-mockup">
          <div class="asistente-paso-indicador">Paso final</div>
          <div class="asistente-pregunta"><i class="fa-solid fa-flag-checkered"></i> ¡Completaste el recorrido por las 3 vistas del reporte!</div>
          <p style="font-size:14px; opacity:.8;">Ahora responde la reflexión final para terminar la actividad.</p>
        </div>`;
      document.getElementById('justificacionBoxA14').classList.remove('hidden');
      document.getElementById('btnFinalizarA14').classList.remove('hidden');
      return;
    }

    const paso = PASOS_A14[pasoActualA14];
    const yaResuelto = respuestasA14[pasoActualA14] !== undefined;

    document.getElementById('asistenteA14').innerHTML = `
      <div class="asistente-mockup">
        <div class="asistente-paso-indicador">${paso.indicador}</div>
        ${paso.mockup}
        <div class="asistente-pregunta">${paso.pregunta}</div>
        <div class="asistente-opciones">
          ${paso.opciones.map((op, i) => `
            <button type="button" class="asistente-opcion" data-idx="${i}" ${yaResuelto ? 'disabled' : ''}>${op.texto}</button>
          `).join('')}
        </div>
        <div id="feedbackA14"></div>
      </div>
      ${yaResuelto ? '<button type="button" class="btn btn-primary" id="btnSiguientePasoA14" style="width:auto; padding:11px 24px;">Siguiente <i class="fa-solid fa-arrow-right"></i></button>' : ''}
    `;

    if(yaResuelto){
      // Volver a marcar visualmente la opción correcta al reabrir el paso ya resuelto
      const idxCorrecta = paso.opciones.findIndex(o => o.correcta);
      const btnCorrecta = document.querySelector(`.asistente-opcion[data-idx="${idxCorrecta}"]`);
      if(btnCorrecta) btnCorrecta.classList.add('correcta-marcada');
      document.getElementById('feedbackA14').innerHTML = `<div class="asistente-feedback"><i class="fa-solid fa-circle-check"></i> ${paso.feedback}</div>`;
      document.getElementById('btnSiguientePasoA14').addEventListener('click', () => {
        pasoActualA14++;
        renderPasoA14();
      });
    } else {
      document.querySelectorAll('.asistente-opcion').forEach(btn => {
        btn.addEventListener('click', () => manejarOpcionA14(Number(btn.dataset.idx), btn));
      });
    }
  }

  function manejarOpcionA14(idx, btnEl){
    const paso = PASOS_A14[pasoActualA14];
    const opcion = paso.opciones[idx];

    if(intentosPasoA14[pasoActualA14] === undefined) intentosPasoA14[pasoActualA14] = 0;
    intentosPasoA14[pasoActualA14]++;

    if(opcion.correcta){
      respuestasA14[pasoActualA14] = intentosPasoA14[pasoActualA14] === 1; // true = acertó al primer intento
      renderPasoA14();
    } else {
      btnEl.classList.add('incorrecta-marcada');
      sacudir(btnEl);
      setTimeout(() => btnEl.classList.remove('incorrecta-marcada'), 500);
    }
  }

  document.getElementById('btnFinalizarA14').addEventListener('click', async () => {
    clearInterval(timerIntervalA14);

    const aciertosPrimerIntento = respuestasA14.filter(r => r === true).length;
    const proporcionCorrecta = respuestasA14.length > 0 ? aciertosPrimerIntento / respuestasA14.length : 0;

    const minutosTranscurridos = (Date.now() - inicioTiempoA14) / 60000;
    const justificacion = document.getElementById('justificacionA14').value.trim();

    const criterios = [];
    criterios.push({ nombre: CRITERIOS_BASE_A14[0].nombre, descripcion: CRITERIOS_BASE_A14[0].descripcion, nivel: 'logrado' });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[1].nombre, descripcion: CRITERIOS_BASE_A14[1].descripcion,
      nivel: proporcionCorrecta >= 0.65 ? 'logrado' : (proporcionCorrecta > 0 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[2].nombre, descripcion: CRITERIOS_BASE_A14[2].descripcion,
      nivel: proporcionCorrecta >= 1 ? 'logrado' : (proporcionCorrecta >= 0.5 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[3].nombre, descripcion: CRITERIOS_BASE_A14[3].descripcion,
      nivel: justificacion.length >= 20 ? 'logrado' : (justificacion.length > 0 ? 'proceso' : 'no_logrado')
    });

    criterios.push({
      nombre: CRITERIOS_BASE_A14[4].nombre, descripcion: CRITERIOS_BASE_A14[4].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA14 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA14 * 2 ? 'proceso' : 'no_logrado')
    });

    criterios.push({ nombre: CRITERIOS_BASE_A14[5].nombre, descripcion: CRITERIOS_BASE_A14[5].descripcion, nivel: 'logrado' });

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

    const proporcionFinalA14 = puntajeMaxA14 > 0 ? notaCalculada / puntajeMaxA14 : 0;
    mostrarLogro(proporcionFinalA14 >= 0.8 ? '¡Excelente trabajo! Actividad completada' : 'Actividad completada', proporcionFinalA14 >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcionFinalA14 >= 0.8) dispararConfeti();

    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.4',
        ra:'RA1',
        ec:'EC6.1.2',
        nota: notaCalculada,
        puntajeMaximo: puntajeMaxA14,
        criterios: criterios
      });
    }catch(err){
      console.error('No se pudo guardar la calificación', err);
    }
  });

  document.getElementById('btnVolverMisActA14').addEventListener('click', () => {
    document.getElementById('panelActividadA14').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });

  registrarActividadInteractiva('A.1.4', abrirActividadA14);
