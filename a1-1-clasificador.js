// ================= ACTIVIDAD A.1.1: CLASIFICADOR DE REPORTES =================
  const ITEMS_A11 = [
    { id:1, texto:'Reporte de ventas mensuales dirigido al gerente general de la empresa.', tipo:'interno' },
    { id:2, texto:'Informe financiero anual publicado para los accionistas.', tipo:'externo' },
    { id:3, texto:'Reporte de asistencia del personal para el departamento de RRHH.', tipo:'interno' },
    { id:4, texto:'Estado de cuenta enviado a un cliente.', tipo:'externo' },
    { id:5, texto:'Reporte de inventario para el supervisor de almacén.', tipo:'interno' },
    { id:6, texto:'Informe de sostenibilidad publicado en el sitio web de la empresa.', tipo:'externo' },
    { id:7, texto:'Reporte de desempeño de ventas para la gerencia.', tipo:'interno' },
    { id:8, texto:'Factura enviada a un proveedor externo.', tipo:'externo' }
  ];

  const CRITERIOS_BASE_A11 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad de clasificación desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de tipos', descripcion:'Reconoce las características que distinguen un reporte interno de uno externo.' },
    { key:'clasificacion', nombre:'3. Clasificación correcta', descripcion:'Ubica cada ejemplo en la categoría correcta según sus características.' },
    { key:'justificacion', nombre:'4. Justificación del criterio', descripcion:'Explica el motivo de su clasificación con argumentos válidos.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'colaborativo', nombre:'6. Trabajo colaborativo', descripcion:'Colabora de forma organizada con su equipo durante el ejercicio.' }
  ];

  let asignacionesA11 = {};
  let seleccionadoA11 = null;
  let puntajeMaxA11 = 0;
  let tiempoEstimadoA11 = 10;
  let inicioTiempoA11 = null;
  let timerIntervalA11 = null;

  function abrirActividadA11(puntajeMaximo, tiempoEstimado){
    puntajeMaxA11 = puntajeMaximo;
    tiempoEstimadoA11 = tiempoEstimado || 10;
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA11').classList.remove('hidden');
    document.getElementById('vistaInstrumentoA11').classList.remove('hidden');
    document.getElementById('vistaEjercicioA11').classList.add('hidden');
    document.getElementById('vistaResultadoA11').classList.add('hidden');

    cargarRecursosEstudianteA11();

    // Instrumento de evaluación (previo, sin resultados aún)
    const criteriosPrevios = CRITERIOS_BASE_A11.map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderRubrica('instrumentoPrevioA11', criteriosPrevios, puntajeMaxA11, null);
  }

  async function cargarRecursosEstudianteA11(){
    const cont = document.getElementById('recursosEstudianteA11');
    try{
      const data = await apiGet({ action:'listarRecursos', codigo:'A.1.1' });
      if(!data.success || data.recursos.length === 0){
        cont.innerHTML = '<div style="font-size:13px; opacity:.6; padding:6px 0;">Tu docente no ha agregado recursos para esta actividad.</div>';
        return;
      }
      cont.innerHTML = data.recursos.map(r => `
        <a href="${r.url}" target="_blank" rel="noopener" class="recurso-item">
          <i class="fa-solid fa-link"></i>
          <span>${r.nombre}</span>
          <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left:auto; opacity:.6;"></i>
        </a>
      `).join('');
    }catch(err){
      cont.innerHTML = '<div style="font-size:13px; opacity:.6;">No se pudieron cargar los recursos.</div>';
    }
  }

  document.getElementById('btnBackFromActividadA11').addEventListener('click', () => {
    clearInterval(timerIntervalA11);
    document.getElementById('panelActividadA11').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA11').addEventListener('click', () => {
    asignacionesA11 = {};
    seleccionadoA11 = null;
    document.getElementById('justificacionA11').value = '';
    document.getElementById('vistaInstrumentoA11').classList.add('hidden');
    document.getElementById('vistaEjercicioA11').classList.remove('hidden');
    pintarClasificador();

    // Iniciar cronómetro (criterio 5: cumplimiento del tiempo)
    inicioTiempoA11 = Date.now();
    clearInterval(timerIntervalA11);
    timerIntervalA11 = setInterval(() => {
      const seg = Math.floor((Date.now() - inicioTiempoA11) / 1000);
      const mm = String(Math.floor(seg/60)).padStart(2,'0');
      const ss = String(seg%60).padStart(2,'0');
      document.getElementById('timerA11').innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${mm}:${ss}`;
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
    `).join('') || '<span style="opacity:.5; font-size:13px;">Todos los reportes han sido clasificados.</span>';

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

    // ===== Evaluación automática de cada criterio =====
    const criterios = [];

    // 1. Participación activa: si llegó hasta aquí, participó.
    criterios.push({ nombre: CRITERIOS_BASE_A11[0].nombre, descripcion: CRITERIOS_BASE_A11[0].descripcion, nivel: 'logrado' });

    // 2. Identificación de tipos: se infiere del nivel de acierto general.
    criterios.push({
      nombre: CRITERIOS_BASE_A11[1].nombre, descripcion: CRITERIOS_BASE_A11[1].descripcion,
      nivel: proporcionCorrecta >= 0.75 ? 'logrado' : (proporcionCorrecta >= 0.4 ? 'proceso' : 'no_logrado')
    });

    // 3. Clasificación correcta (el criterio central, autocalificado por el ejercicio).
    criterios.push({
      nombre: CRITERIOS_BASE_A11[2].nombre, descripcion: CRITERIOS_BASE_A11[2].descripcion,
      nivel: proporcionCorrecta >= 0.9 ? 'logrado' : (proporcionCorrecta >= 0.5 ? 'proceso' : 'no_logrado')
    });

    // 4. Justificación del criterio: según longitud/calidad mínima del texto.
    criterios.push({
      nombre: CRITERIOS_BASE_A11[3].nombre, descripcion: CRITERIOS_BASE_A11[3].descripcion,
      nivel: justificacion.length >= 20 ? 'logrado' : (justificacion.length > 0 ? 'proceso' : 'no_logrado')
    });

    // 5. Cumplimiento del tiempo: comparado con el tiempo estimado por el docente.
    criterios.push({
      nombre: CRITERIOS_BASE_A11[4].nombre, descripcion: CRITERIOS_BASE_A11[4].descripcion,
      nivel: minutosTranscurridos <= tiempoEstimadoA11 * 1.5 ? 'logrado' : (minutosTranscurridos <= tiempoEstimadoA11 * 2 ? 'proceso' : 'no_logrado')
    });

    // 6. Trabajo colaborativo: no medible por el sistema, se marca Logrado por defecto
    // (el docente puede ajustarlo manualmente desde "Calificaciones y avances" si lo requiere).
    criterios.push({ nombre: CRITERIOS_BASE_A11[5].nombre, descripcion: CRITERIOS_BASE_A11[5].descripcion, nivel: 'logrado' });

    // ===== Cálculo de la nota total según los niveles logrados =====
    const pesoUnidad = puntajeMaxA11 / criterios.length;
    let notaCalculada = 0;
    criterios.forEach(c => {
      if(c.nivel === 'logrado') notaCalculada += pesoUnidad;
      else if(c.nivel === 'proceso') notaCalculada += pesoUnidad / 2;
    });
    notaCalculada = Math.round(notaCalculada * 100) / 100;

    // Mostrar resultado
    document.getElementById('vistaEjercicioA11').classList.add('hidden');
    document.getElementById('vistaResultadoA11').classList.remove('hidden');
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

    // Guardar la calificación con el desglose completo por criterio
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
