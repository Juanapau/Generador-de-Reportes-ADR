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
    wrap.innerHTML = ['RA1','RA2','RA3','RA4','RA5'].map(ra => {
      const disponible = RAS_DISPONIBLES_ESTUDIANTE.includes(ra);
      return `
        <div class="ra-card ${disponible ? '' : 'ra-card-disabled'}" data-ra="${ra}">
          <div class="ra-card-titulo">${ra}</div>
          <div class="ra-card-sub">${disponible ? 'Ver actividades' : 'Próximamente'}</div>
        </div>`;
    }).join('');

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
      const habilitadas = data.actividades.filter(a => a.habilitada === 'Si');

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
        let estadoBadge;
        if(completada){
          estadoBadge = `<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> Completada — ${completada.nota}/${completada.puntajeMaximo}</span>`;
        } else if(act.codigo === 'A.1.1'){
          estadoBadge = '<span class="estado-badge estado-activa"><i class="fa-solid fa-play"></i> Disponible</span>';
        } else {
          estadoBadge = '<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> Próximamente interactiva</span>';
        }

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
          <div class="actividad-enunciado">${act.enunciado}</div>
          <div class="actividad-meta"><i class="fa-solid fa-people-group"></i> ${act.metodologia}</div>
          ${act.codigo === 'A.1.1' ? `
            <button type="button" class="btn-add abrir-actividad-btn" data-codigo="A.1.1" data-puntaje="${act.puntaje}" data-tiempo="${act.tiempoEstimado}" style="margin-top:12px;">
              <i class="fa-solid ${completada ? 'fa-eye' : 'fa-play'}"></i> ${completada ? 'Ver resultado' : 'Realizar actividad'}
            </button>` : ''}
        </div>
      `;}).join('');

      wrap.querySelectorAll('.abrir-actividad-btn').forEach(btn => {
        const act = habilitadas.find(a => a.codigo === btn.dataset.codigo);
        btn.addEventListener('click', () => abrirActividadA11(act.puntaje, act.tiempoEstimado, act.enunciado));
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }
