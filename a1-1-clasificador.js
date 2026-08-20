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
  let asignacionesA11 = {};
  let seleccionadoA11 = null;
  let puntajeMaxA11 = 0;

  function abrirActividadA11(puntajeMaximo){
    puntajeMaxA11 = puntajeMaximo;
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadA11').classList.remove('hidden');
    document.getElementById('vistaInstrumentoA11').classList.remove('hidden');
    document.getElementById('vistaEjercicioA11').classList.add('hidden');
    document.getElementById('vistaResultadoA11').classList.add('hidden');
  }

  document.getElementById('btnBackFromActividadA11').addEventListener('click', () => {
    document.getElementById('panelActividadA11').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnComenzarA11').addEventListener('click', () => {
    asignacionesA11 = {};
    seleccionadoA11 = null;
    document.getElementById('vistaInstrumentoA11').classList.add('hidden');
    document.getElementById('vistaEjercicioA11').classList.remove('hidden');
    pintarClasificador();
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

    // Seleccionar un ítem del pool
    pool.querySelectorAll('.clasif-item').forEach(el => {
      el.addEventListener('click', () => {
        const id = Number(el.dataset.id);
        seleccionadoA11 = seleccionadoA11 === id ? null : id;
        pintarClasificador();
      });
    });

    // Click en un ítem ya clasificado: lo regresa al pool
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
    if(e.target.closest('.clasif-item')) return; // evita reasignar al hacer click en un ítem ya puesto
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
    let correctas = 0;
    ITEMS_A11.forEach(it => { if(asignacionesA11[it.id] === it.tipo) correctas++; });

    const total = ITEMS_A11.length;
    const nota = Math.round((correctas / total) * puntajeMaxA11 * 100) / 100;

    // Mostrar resultado
    document.getElementById('vistaEjercicioA11').classList.add('hidden');
    document.getElementById('vistaResultadoA11').classList.remove('hidden');
    document.getElementById('resultadoNotaA11').textContent = `${nota} / ${puntajeMaxA11}`;
    document.getElementById('resultadoDetalleA11').textContent =
      `Clasificaste correctamente ${correctas} de ${total} reportes (criterio 3: Clasificación correcta).`;

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

    // Guardar la calificación
    try{
      await apiPost({
        action:'guardarCalificacion',
        usuario: currentUser.usuario,
        codigo:'A.1.1',
        ra:'RA1',
        ec:'EC6.1.1',
        nota: nota,
        puntajeMaximo: puntajeMaxA11
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
