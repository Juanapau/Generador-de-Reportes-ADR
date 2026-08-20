  // ================= ACTIVIDAD A.1.2: PARTES DE UN REPORTE EMPRESARIAL =================
  // Esquema gráfico: 5 zonas de un reporte (de arriba hacia abajo) sin etiquetar.
  // El estudiante debe asignar la etiqueta correcta a cada zona.
  const ZONAS_A12_BASE = [
    { id:1, tag:'Zona 1 (arriba de todo)', correcta:'Encabezado de reporte' },
    { id:2, tag:'Zona 2', correcta:'Encabezado de página' },
    { id:3, tag:'Zona 3 (se repite varias veces)', correcta:'Línea de detalle' },
    { id:4, tag:'Zona 4', correcta:'Pie de página' },
    { id:5, tag:'Zona 5 (abajo de todo)', correcta:'Pie de reporte' }
  ];
  const ETIQUETAS_A12 = ['Encabezado de reporte', 'Encabezado de página', 'Línea de detalle', 'Pie de página', 'Pie de reporte'];

  const CRITERIOS_BASE_A12 = [
    { key:'participacion', nombre:'1. Participación activa', descripcion:'Participa en la actividad desde el inicio.' },
    { key:'identificacion', nombre:'2. Identificación de partes', descripcion:'Reconoce las partes que componen un reporte empresarial.' },
    { key:'clasificacion', nombre:'3. Ubicación correcta', descripcion:'Coloca cada etiqueta en la zona correcta del esquema.' },
    { key:'justificacion', nombre:'4. Justificación', descripcion:'Explica la función de al menos dos de las partes identificadas.' },
    { key:'tiempo', nombre:'5. Cumplimiento del tiempo', descripcion:'Completa la actividad dentro del tiempo estimado.' },
    { key:'prolijidad', nombre:'6. Orden y prolijidad', descripcion:'Desarrolla la actividad de forma ordenada y completa.' }
  ];

  let asignacionesA12 = {};
  let etiquetaSeleccionadaA12 = null;
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
    const etiquetasDisponibles = ETIQUETAS_A12.filter(et => !etiquetasUsadas.includes(et));

    pool.innerHTML = etiquetasDisponibles.map(et => `
      <div class="clasif-item ${etiquetaSeleccionadaA12 === et ? 'selected' : ''}" data-etiqueta="${et}">${et}</div>
    `).join('') || '<span style="opacity:.5; font-size:14px;">Todas las etiquetas han sido ubicadas.</span>';

    esquema.innerHTML = ZONAS_A12_BASE.map(z => {
      const etiqueta = asignacionesA12[z.id];
      return `
        <div class="esquema-zona ${etiqueta ? 'esquema-zona-llena' : 'esquema-zona-vacia'}" data-zona="${z.id}">
          <div>
            <div class="esquema-zona-tag">${z.tag}</div>
            ${etiqueta
              ? `<div class="esquema-zona-etiqueta">${etiqueta}</div>`
              : `<div class="esquema-zona-placeholder">Haz clic aquí después de seleccionar una etiqueta</div>`}
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

    document.getElementById('resultadoDesgloseA12').innerHTML = ZONAS_A12_BASE.map(z => {
      const asignada = asignacionesA12[z.id];
      const ok = asignada === z.correcta;
      return `
        <div class="esquema-zona ${ok ? 'correcto' : 'incorrecto'}">
          <div>
            <div class="esquema-zona-tag">${z.tag} — correcta: ${z.correcta}</div>
            <div class="esquema-zona-etiqueta">${asignada ? `Tu respuesta: ${asignada}` : 'Sin responder'}</div>
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
