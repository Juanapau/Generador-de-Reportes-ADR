  // ================= MIS ACTIVIDADES (vista estudiante) =================
  document.getElementById('cardMisActividades').addEventListener('click', () => {
    document.getElementById('panelEstudiante').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarMisActividades();
  });
  document.getElementById('btnBackFromMisActividades').addEventListener('click', () => {
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelEstudiante').classList.remove('hidden');
  });

  async function cargarMisActividades(){
    const wrap = document.getElementById('listaMisActividadesWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando actividades...</div>';
    try{
      const data = await apiGet({ action:'listarActividades', ra:'RA1' });
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

      wrap.innerHTML = habilitadas.map(act => `
        <div class="actividad-card">
          <div class="actividad-top">
            <div>
              <div class="actividad-codigo">${act.codigo}</div>
              <div class="actividad-ec">${act.ec} · ${act.ra}</div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <span class="puntaje-pill"><i class="fa-solid fa-star"></i> ${act.puntaje} pts</span>
              ${act.codigo === 'A.1.1'
                ? '<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> Disponible</span>'
                : '<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> Próximamente interactiva</span>'}
            </div>
          </div>
          <div class="actividad-enunciado">${act.enunciado}</div>
          <div class="actividad-meta"><i class="fa-solid fa-people-group"></i> ${act.metodologia}</div>
          ${act.codigo === 'A.1.1' ? `
            <button type="button" class="btn-add abrir-actividad-btn" data-codigo="A.1.1" data-puntaje="${act.puntaje}" style="margin-top:12px;">
              <i class="fa-solid fa-play"></i> Realizar actividad
            </button>` : ''}
        </div>
      `).join('');

      wrap.querySelectorAll('.abrir-actividad-btn').forEach(btn => {
        btn.addEventListener('click', () => abrirActividadA11(Number(btn.dataset.puntaje)));
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }
