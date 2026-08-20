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

  function barajar(arr){
    const copia = [...arr];
    for(let i = copia.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

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
      <div class="clasif-item ${seleccionadoA11 === it.id ? 'selected' : ''}" data-id="${it.id}">${it.texto}</div>
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
