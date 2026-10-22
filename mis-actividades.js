// ================= MIS ACTIVIDADES (vista estudiante) =================
  const RAS_DISPONIBLES_ESTUDIANTE = ['RA1','RA2']; // RA2-RA5 se habilitan cuando se construyan sus actividades
  let raActualEstudiante = 'RA1';

  document.getElementById('cardMisActividades').addEventListener('click', () => {
    document.getElementById('panelEstudiante').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    document.getElementById('vistaRaCardsEstudiante').classList.remove('hidden');
    document.getElementById('vistaListaMisActividades').classList.add('hidden');
    pintarRaCardsEstudiante();
  });
  document.getElementById('btnBackFromMisActividades').addEventListener('click', () => {
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelEstudiante').classList.remove('hidden');
  });
  document.getElementById('btnBackToRaCardsEstudiante').addEventListener('click', () => {
    document.getElementById('vistaListaMisActividades').classList.add('hidden');
    document.getElementById('vistaRaCardsEstudiante').classList.remove('hidden');
  });

  function pintarRaCardsEstudiante(){
    const wrap = document.getElementById('raCardsEstudianteWrap');
    wrap.innerHTML = pintarTarjetasRA(
      ['RA1','RA2','RA3','RA4','RA5'].map(ra => ({ ra, disponible: RAS_DISPONIBLES_ESTUDIANTE.includes(ra) }))
    );

    wrap.querySelectorAll('.ra-card:not(.ra-card-disabled)').forEach(card => {
      card.addEventListener('click', () => {
        raActualEstudiante = card.dataset.ra;
        document.getElementById('tituloListaMisActividades').textContent = raActualEstudiante;
        document.getElementById('vistaRaCardsEstudiante').classList.add('hidden');
        document.getElementById('vistaListaMisActividades').classList.remove('hidden');
        cargarMisActividades();
      });
    });
  }

  // Encabezado del RA: valor, mínimo aprobatorio y puntos que lleva el estudiante
  async function pintarBannerRA_(progreso){
    const el = document.getElementById('bannerValorRA');
    if(!el) return;
    const cfg = (await cargarConfigRA_())[raActualEstudiante];
    if(!cfg){ el.innerHTML = ''; return; }
    let extra = '';
    if(progreso){
      const ev = evaluarResultadoRA_(cfg, progreso.obtenidos, progreso.disponibles);
      const etiqueta = { 'aprobado':'<i class="fa-solid fa-circle-check"></i> Aprobado', 'no-aprobado':'<i class="fa-solid fa-circle-xmark"></i> No aprobado', 'en-proceso':'<i class="fa-solid fa-hourglass-half"></i> En proceso' }[ev.estado];
      extra = `
        <span class="ra-chip">Obtenido <b>${ev.total} pts</b></span>
        <span class="ra-chip ra-chip-estado ra-chip-${ev.estado}">${etiqueta}</span>`;
    }
    el.innerHTML = `
      <div class="banner-ra">
        <span class="ra-chip">Valor <b>${fmtPts_(cfg.valor)} pts</b></span>
        <span class="ra-chip" title="${fmtPts_(cfg.porcentaje)} % del valor del RA">Mínimo <b>${cfg.minimo} pts</b></span>
        ${extra}
      </div>`;
  }

  async function cargarMisActividades(){
    const wrap = document.getElementById('listaMisActividadesWrap');
    pintarBannerRA_(null);
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando actividades...</div>';
    try{
      const data = await apiGet({ action:'listarActividades', ra: raActualEstudiante, usuario: currentUser.usuario });
      if(!data.success){
        wrap.innerHTML = '<div class="empty-table-msg">No se pudieron cargar las actividades.</div>';
        return;
      }
      const habilitadas = data.actividades.filter(a => modoPreviewDocente || a.habilitada === 'Si');

      if(habilitadas.length === 0){
        wrap.innerHTML = `<div class="empty-note">
          <i class="fa-solid fa-circle-info"></i>
          Tu docente aún no ha habilitado ninguna actividad de este RA. Vuelve a revisar más tarde.
        </div>`;
        return;
      }

      // Verificar cuáles actividades ya fueron completadas por el estudiante
      let calificacionesPorCodigo = {};
      try{
        const califs = await apiGet({ action:'listarCalificaciones', usuario: currentUser.usuario });
        if(califs.success){
          califs.calificaciones.forEach(c => { calificacionesPorCodigo[c.codigo] = c; });
        }
      }catch(err){ /* si falla, simplemente no se muestra el estado de completada */ }
      if(!modoPreviewDocente){
        let obtenidos = 0, disponibles = 0;
        const ahoraSeg = ahoraSeguro_();
        habilitadas.forEach(a => {
          const c = calificacionesPorCodigo[a.codigo];
          if(c){ obtenidos += Number(c.nota) || 0; }
          else {
            const fin = fechaVentana_(a.finMs, a.fechaFin);
            if(!fin || ahoraSeg <= fin) disponibles += Number(a.puntaje) || 0;
          }
        });
        pintarBannerRA_({ obtenidos, disponibles });
      }

      wrap.innerHTML = habilitadas.map(act => {
        const completada = calificacionesPorCodigo[act.codigo];
        const esInteractiva = !!actividadesInteractivas[act.codigo];

        // Ventana de disponibilidad (si el docente la configuró)
        const ahora = ahoraSeguro_();
        const inicio = fechaVentana_(act.inicioMs, act.fechaInicio);
        const fin = fechaVentana_(act.finMs, act.fechaFin);
        const aunNoInicia = inicio && ahora < inicio;
        const yaVencio = fin && ahora > fin;
        const fueraDeVentana = (aunNoInicia || yaVencio) && !completada && !modoPreviewDocente;

        let estadoBadge;
        if(modoPreviewDocente && act.habilitada !== 'Si'){
          estadoBadge = '<span class="estado-badge estado-vencida"><i class="fa-solid fa-eye-slash"></i> No habilitada (solo tú la ves)</span>';
        } else if(completada){
          estadoBadge = `<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> Completada — ${completada.nota}/${completada.puntajeMaximo}</span>`;
        } else if(aunNoInicia){
          estadoBadge = `<span class="estado-badge estado-pendiente"><i class="fa-solid fa-clock"></i> Disponible desde ${formatearFechaCorta(inicio)}</span>`;
        } else if(yaVencio){
          estadoBadge = `<span class="estado-badge estado-vencida"><i class="fa-solid fa-lock"></i> Cerrada desde ${formatearFechaCorta(fin)}</span>`;
        } else if(esInteractiva){
          estadoBadge = '<span class="estado-badge estado-activa"><i class="fa-solid fa-play"></i> Disponible</span>';
        } else {
          estadoBadge = '<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> Próximamente interactiva</span>';
        }

        const mostrarBoton = esInteractiva && !fueraDeVentana;

        return `
        <div class="actividad-card">
          <div class="actividad-top">
            <div>
              <div class="actividad-codigo">${act.codigo}${act.titulo ? ` — ${act.titulo}` : ''}</div>
              <div class="actividad-ec">${act.ec} · ${act.ra}</div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <span class="puntaje-pill"><i class="fa-solid fa-star"></i> ${act.puntaje} pts</span>
              ${act.prorroga && !completada ? '<span class="prorroga-pill"><i class="fa-solid fa-user-clock"></i> Fecha especial</span>' : ''}
              ${estadoBadge}
            </div>
          </div>
          <div class="actividad-enunciado contenido-enriquecido">${limpiarColoresCasiBlancos(act.enunciado)}</div>
          <div class="actividad-meta"><i class="fa-solid fa-people-group"></i> ${act.metodologia}</div>
          ${fin && !completada && !yaVencio ? `<div class="actividad-vence-aviso"><i class="fa-solid fa-hourglass-half"></i> Disponible hasta ${formatearFechaCorta(fin)}</div>` : ''}
          ${mostrarBoton ? `
            <button type="button" class="btn-add abrir-actividad-btn" data-codigo="${act.codigo}" style="margin-top:12px;">
              <i class="fa-solid ${completada ? 'fa-eye' : 'fa-play'}"></i> ${completada ? 'Ver resultado' : 'Realizar actividad'}
            </button>` : ''}
        </div>
      `;}).join('');

      wrap.querySelectorAll('.abrir-actividad-btn').forEach(btn => {
        const act = habilitadas.find(a => a.codigo === btn.dataset.codigo);
        const funcionAbrir = actividadesInteractivas[act.codigo];
        btn.addEventListener('click', async () => {
          // Antes de abrir una actividad pendiente se confirma con el servidor que siga disponible
          // (la hora de la computadora del estudiante no cuenta).
          if(!calificacionesPorCodigo[act.codigo] && !modoPreviewDocente){
            try{
              const v = await apiGet({ action:'verificarDisponibilidad', codigo: act.codigo, usuario: currentUser.usuario });
              if(v.success && v.disponible === false){
                mostrarNotificacion(v.motivo || 'Esta actividad no está disponible en este momento.', 'error');
                cargarMisActividades();
                return;
              }
            }catch(err){ /* sin conexión: el servidor igual validará al guardar */ }
          }
          funcionAbrir(act.puntaje, act.tiempoEstimado, act.enunciado);
        });
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }
