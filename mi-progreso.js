// ============================================================================
// MI PROGRESO — resumen del historial de calificaciones del estudiante,
// combinando las actividades del RA1 y las Actividades Extra.
// ============================================================================

  const NOMBRES_ACTIVIDADES_RA = {
    'A.1.1': 'Clasificador de reportes empresariales',
    'A.1.2': 'Partes de un reporte empresarial',
    'A.1.3': 'Simulador de vistas de un reporte',
    'A.1.4': 'Ejecutar y verificar un reporte filtrado',
    'A.1.5': 'Rompecabezas de programas generadores'
  };

  document.getElementById('cardMiProgreso').addEventListener('click', () => {
    document.getElementById('panelEstudiante').classList.add('hidden');
    document.getElementById('panelMiProgreso').classList.remove('hidden');
    cargarMiProgreso();
  });
  document.getElementById('btnBackFromMiProgreso').addEventListener('click', () => {
    document.getElementById('panelMiProgreso').classList.add('hidden');
    document.getElementById('panelEstudiante').classList.remove('hidden');
  });

  async function cargarMiProgreso(){
    document.getElementById('resumenProgresoWrap').innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando tu progreso...</div>';
    document.getElementById('listaProgresoRA1Wrap').innerHTML = '';
    document.getElementById('bloqueProgresoExtra').classList.add('hidden');

    try{
      const [dataAct, dataCal, dataActExtra, dataRespExtra] = await Promise.all([
        apiGet({ action:'listarActividades' }),
        apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario }),
        apiGet({ action:'listarActividadesExtra' }),
        apiGet({ action:'listarRespuestasExtra', usuario: currentUser.usuario })
      ]);

      const actividadesRA = (dataAct.success ? dataAct.actividades : []).filter(a => a.habilitada === 'Si');
      const calificaciones = dataCal.success ? dataCal.calificaciones : [];
      const califPorCodigo = {};
      calificaciones.forEach(c => { califPorCodigo[c.codigo] = c; });

      const actividadesExtra = (dataActExtra.success ? dataActExtra.actividades : []).filter(a => a.habilitada);
      const respuestasExtra = dataRespExtra.success ? dataRespExtra.respuestas : [];
      const respPorCodigo = {};
      respuestasExtra.forEach(r => { respPorCodigo[r.codigo] = r; });

      // ---------- Resumen general ----------
      let puntosObtenidos = 0, puntosPosibles = 0, completadas = 0, totalActividades = 0;

      actividadesRA.forEach(a => {
        totalActividades++;
        puntosPosibles += Number(a.puntaje) || 0;
        if(califPorCodigo[a.codigo]){
          completadas++;
          puntosObtenidos += Number(califPorCodigo[a.codigo].nota) || 0;
        }
      });
      actividadesExtra.forEach(a => {
        totalActividades++;
        puntosPosibles += Number(a.puntajeMaximo) || 0;
        const r = respPorCodigo[a.codigo];
        if(r && (r.estado === 'calificado' || r.estado === 'completado')){
          completadas++;
          if(r.estado === 'calificado') puntosObtenidos += Number(r.nota) || 0;
        }
      });

      const porcentaje = puntosPosibles > 0 ? Math.round((puntosObtenidos / puntosPosibles) * 100) : 0;

      document.getElementById('resumenProgresoWrap').innerHTML = `
        <div class="resumen-progreso-card">
          <div class="resumen-progreso-top">
            <div>
              <div class="resumen-progreso-numero">${puntosObtenidos.toFixed(2)} <span>/ ${puntosPosibles.toFixed(2)} pts</span></div>
              <div class="resumen-progreso-sub">${completadas} de ${totalActividades} actividades completadas</div>
            </div>
            <div class="resumen-progreso-porcentaje">${porcentaje}%</div>
          </div>
          <div class="progreso-barra-wrap" style="margin-bottom:0;">
            <div class="progreso-barra-fill" style="width:${porcentaje}%"></div>
          </div>
        </div>
      `;

      // ---------- Lista agrupada por RA, cada una con su propia barra de progreso ----------
      const wrapRA = document.getElementById('listaProgresoRA1Wrap');
      if(actividadesRA.length === 0){
        wrapRA.innerHTML = '<div class="empty-note"><i class="fa-solid fa-circle-info"></i> Tu docente aún no ha habilitado actividades.</div>';
      } else {
        // Agrupa las actividades habilitadas por su RA (RA1, RA2, ...), en orden
        const gruposPorRA = {};
        actividadesRA.forEach(a => {
          if(!gruposPorRA[a.ra]) gruposPorRA[a.ra] = [];
          gruposPorRA[a.ra].push(a);
        });
        const rasOrdenados = Object.keys(gruposPorRA).sort();

        wrapRA.innerHTML = rasOrdenados.map(ra => {
          const actividadesDelRA = gruposPorRA[ra];
          const infoRA = RA_INFO[ra];

          let puntosRA = 0, posiblesRA = 0, completadasRA = 0;
          const itemsHtml = actividadesDelRA.map(a => {
            const cal = califPorCodigo[a.codigo];
            const nombre = NOMBRES_ACTIVIDADES_RA[a.codigo] || a.codigo;
            posiblesRA += Number(a.puntaje) || 0;
            if(cal){ completadasRA++; puntosRA += Number(cal.nota) || 0; }
            return `
              <div class="progreso-item-card">
                <div class="progreso-item-info">
                  <div class="progreso-item-codigo">${a.codigo} <span class="progreso-item-nombre">— ${nombre}</span></div>
                  ${cal ? `<div class="progreso-item-fecha">Completada: ${formatearFechaCorta(cal.fecha) || '—'}</div>` : `<div class="progreso-item-fecha">Aún no realizada</div>`}
                </div>
                <div class="progreso-item-acciones">
                  ${cal
                    ? `<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> ${cal.nota}/${cal.puntajeMaximo} pts</span>
                       <button type="button" class="btn-progreso-pdf" data-codigo="${a.codigo}" data-tipo="ra"><i class="fa-solid fa-file-pdf"></i></button>`
                    : `<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> Pendiente</span>
                       <button type="button" class="btn-progreso-ir" data-codigo="${a.codigo}"><i class="fa-solid fa-play"></i> Ir</button>`
                  }
                </div>
              </div>`;
          }).join('');

          const porcentajeRA = posiblesRA > 0 ? Math.round((puntosRA / posiblesRA) * 100) : 0;

          return `
            <div class="progreso-ra-grupo">
              <div class="progreso-ra-titulo">
                <i class="fa-solid ${infoRA ? infoRA.icono : 'fa-layer-group'}"></i> ${ra}${infoRA ? ` — ${infoRA.descripcion}` : ''}
              </div>
              ${itemsHtml}
              <div class="progreso-ra-barra-wrap">
                <div class="progreso-ra-barra-texto">${completadasRA} de ${actividadesDelRA.length} actividades de ${ra} · ${puntosRA.toFixed(2)}/${posiblesRA.toFixed(2)} pts</div>
                <div class="progreso-barra-wrap" style="margin-bottom:0;">
                  <div class="progreso-barra-fill" style="width:${porcentajeRA}%"></div>
                </div>
              </div>
            </div>`;
        }).join('');

        wrapRA.querySelectorAll('.btn-progreso-ir').forEach(btn => {
          btn.addEventListener('click', () => {
            const act = actividadesRA.find(a => a.codigo === btn.dataset.codigo);
            const funcionAbrir = actividadesInteractivas[act.codigo];
            if(!funcionAbrir) return;
            document.getElementById('panelMiProgreso').classList.add('hidden');
            funcionAbrir(act.puntaje, act.tiempoEstimado, act.enunciado);
          });
        });

        wrapRA.querySelectorAll('.btn-progreso-pdf').forEach(btn => {
          btn.addEventListener('click', () => {
            const cal = califPorCodigo[btn.dataset.codigo];
            generarPdfResultado(btn.dataset.codigo, cal.criterios, cal.nota, cal.puntajeMaximo, cal.ec, cal.ra, cal.detalle);
          });
        });
      }

      // ---------- Lista Actividades Extra ----------
      if(actividadesExtra.length > 0){
        document.getElementById('bloqueProgresoExtra').classList.remove('hidden');
        const wrapExtra = document.getElementById('listaProgresoExtraWrap');

        wrapExtra.innerHTML = actividadesExtra.map(a => {
          const r = respPorCodigo[a.codigo];
          const calificada = r && r.estado === 'calificado';
          const completadaSinInstrumento = r && r.estado === 'completado';
          const pendienteCalificar = r && r.estado === 'pendiente';

          let badge, accion;
          if(calificada){
            badge = `<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> ${r.nota}/${r.puntajeMaximo} pts</span>`;
            accion = `<button type="button" class="btn-progreso-pdf" data-codigo="${a.codigo}" data-tipo="extra"><i class="fa-solid fa-file-pdf"></i></button>`;
          } else if(completadaSinInstrumento){
            badge = `<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> Completada</span>`;
            accion = '';
          } else if(pendienteCalificar){
            badge = `<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> En espera de calificación</span>`;
            accion = '';
          } else {
            badge = `<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> Pendiente</span>`;
            accion = `<button type="button" class="btn-progreso-ir-extra" data-codigo="${a.codigo}"><i class="fa-solid fa-play"></i> Ir</button>`;
          }

          return `
            <div class="progreso-item-card">
              <div class="progreso-item-info">
                <div class="progreso-item-codigo">${a.titulo || a.codigo}</div>
                ${r ? `<div class="progreso-item-fecha">Enviada: ${formatearFechaCorta(r.fechaEnvio) || '—'}</div>` : `<div class="progreso-item-fecha">Aún no realizada</div>`}
              </div>
              <div class="progreso-item-acciones">${badge} ${accion}</div>
            </div>`;
        }).join('');

        wrapExtra.querySelectorAll('.btn-progreso-ir-extra').forEach(btn => {
          btn.addEventListener('click', () => {
            document.getElementById('panelMiProgreso').classList.add('hidden');
            document.getElementById('panelActividadesExtraEstudiante').classList.remove('hidden');
            actividadesExtraCache = actividadesExtra;
            abrirDetalleActividadExtra(btn.dataset.codigo);
          });
        });

        wrapExtra.querySelectorAll('.btn-progreso-pdf').forEach(btn => {
          btn.addEventListener('click', () => {
            const r = respPorCodigo[btn.dataset.codigo];
            const act = actividadesExtra.find(a => a.codigo === btn.dataset.codigo);
            const detalle = [{
              titulo: 'Tu respuesta',
              items: [{
                pregunta: act.tipoRespuesta === 'marcar' ? 'Actividad marcada como realizada' : 'Respuesta enviada',
                tuRespuesta: act.tipoRespuesta === 'marcar' ? 'Realizada' : (r.respuestaTexto || ''),
                correcta: true
              }]
            }];
            generarPdfResultado(btn.dataset.codigo, r.criteriosCalificados, r.nota, r.puntajeMaximo, '', 'Actividad Extra', detalle);
          });
        });
      }
    }catch(err){
      document.getElementById('resumenProgresoWrap').innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }
