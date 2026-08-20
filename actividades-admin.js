  // ================= ACTIVIDADES POR RA =================
  let actividadesCache = [];
  let raActual = 'RA1';

  document.getElementById('cardActividadesRA').addEventListener('click', () => {
    document.getElementById('panelDocente').classList.add('hidden');
    document.getElementById('panelActividades').classList.remove('hidden');
    cargarActividades();
  });
  document.getElementById('btnBackFromActividades').addEventListener('click', () => {
    document.getElementById('panelActividades').classList.add('hidden');
    document.getElementById('panelDocente').classList.remove('hidden');
  });
  document.getElementById('raTab1').addEventListener('click', () => {
    raActual = 'RA1';
    cargarActividades();
  });

  async function cargarActividades(){
    const wrap = document.getElementById('listaActividadesWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando actividades...</div>';
    try{
      const data = await apiGet({ action:'listarActividades', ra: raActual });
      if(data.success){
        actividadesCache = data.actividades;
        pintarActividades();
      } else {
        wrap.innerHTML = '<div class="empty-table-msg">No se pudo cargar la lista de actividades.</div>';
      }
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

  function pintarActividades(){
    const wrap = document.getElementById('listaActividadesWrap');
    const habilitadas = actividadesCache.filter(a => a.habilitada === 'Si').length;
    document.getElementById('totalActividadesLabel').textContent =
      `${actividadesCache.length} actividades — ${habilitadas} habilitada(s)`;

    if(actividadesCache.length === 0){
      wrap.innerHTML = `<div class="empty-table-msg">
        <i class="fa-solid fa-triangle-exclamation"></i><br>
        No hay actividades cargadas para ${raActual}. Ejecuta la función <b>sembrarActividadesRA1()</b> una vez desde el editor de Apps Script para precargarlas.
      </div>`;
      return;
    }

    wrap.innerHTML = actividadesCache.map(act => `
      <div class="actividad-card" data-codigo="${act.codigo}">
        <div class="actividad-top">
          <div>
            <div class="actividad-codigo">${act.codigo}</div>
            <div class="actividad-ec">${act.ec} · ${act.ra}</div>
          </div>
        </div>
        <div class="actividad-enunciado">${act.enunciado}</div>
        <div class="actividad-meta"><i class="fa-solid fa-people-group"></i> ${act.metodologia}</div>
        <div class="actividad-controls">
          <div class="puntaje-field">
            <label>Puntaje máx.</label>
            <input type="number" min="0" step="0.5" class="input-puntaje" value="${act.puntaje || 0}">
          </div>
          <div class="switch-field">
            <label class="switch">
              <input type="checkbox" class="input-habilitada" ${act.habilitada === 'Si' ? 'checked' : ''}>
              <span class="switch-slider"></span>
            </label>
            <span class="switch-label">Habilitada</span>
          </div>
          <button type="button" class="btn-save-act"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
          <span class="save-ok-msg"><i class="fa-solid fa-check"></i> Guardado</span>
        </div>
      </div>
    `).join('');

    // Vincular botones de guardar de cada tarjeta
    wrap.querySelectorAll('.actividad-card').forEach(card => {
      const codigo = card.dataset.codigo;
      const btn = card.querySelector('.btn-save-act');
      const okMsg = card.querySelector('.save-ok-msg');

      btn.addEventListener('click', async () => {
        const puntaje = card.querySelector('.input-puntaje').value;
        const habilitada = card.querySelector('.input-habilitada').checked;

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
        okMsg.classList.remove('show');

        try{
          const data = await apiPost({ action:'actualizarActividad', codigo, puntaje, habilitada });
          if(data.success){
            okMsg.classList.add('show');
            setTimeout(() => okMsg.classList.remove('show'), 2000);
          } else {
            alert(data.error || 'No se pudo guardar.');
          }
        }catch(err){
          alert('Error de conexión con el servidor.');
        }finally{
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar';
        }
      });
    });
  }
