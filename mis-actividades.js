// ================= MIS ACTIVIDADES (vista estudiante) =================
  const RAS_DISPONIBLES_ESTUDIANTE = ['RA1']; // RA2-RA5 se habilitan cuando se construyan sus actividades
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

  async function cargarMisActividades(){
    const wrap = document.getElementById('listaMisActividadesWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando actividades...</div>';
    try{
      const data = await apiGet({ action:'listarActividades', ra: raActualEstudiante });
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

      wrap.innerHTML = habilitadas.map(act => {
        const completada = calificacionesPorCodigo[act.codigo];
        const esInteractiva = !!actividadesInteractivas[act.codigo];

        // Ventana de disponibilidad (si el docente la configuró)
        const ahora = new Date();
        const inicio = act.fechaInicio ? new Date(act.fechaInicio) : null;
        const fin = act.fechaFin ? new Date(act.fechaFin) : null;
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
              <div class="actividad-codigo">${act.codigo}</div>
              <div class="actividad-ec">${act.ec} · ${act.ra}</div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <span class="puntaje-pill"><i class="fa-solid fa-star"></i> ${act.puntaje} pts</span>
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
        btn.addEventListener('click', () => funcionAbrir(act.puntaje, act.tiempoEstimado, act.enunciado));
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }
