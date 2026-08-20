// ================= ACTIVIDADES POR RA (panel docente) =================
  let actividadesCache = [];
  let raActual = 'RA1';
  const RAS_DISPONIBLES = ['RA1']; // RA2-RA5 se habilitan cuando se construyan sus actividades

  document.getElementById('cardActividadesRA').addEventListener('click', () => {
    document.getElementById('panelDocente').classList.add('hidden');
    document.getElementById('panelActividades').classList.remove('hidden');
    document.getElementById('vistaRaCardsAdmin').classList.remove('hidden');
    document.getElementById('vistaListaActividades').classList.add('hidden');
    pintarRaCardsAdmin();
  });
  document.getElementById('btnBackFromActividades').addEventListener('click', () => {
    document.getElementById('panelActividades').classList.add('hidden');
    document.getElementById('panelDocente').classList.remove('hidden');
  });
  document.getElementById('btnBackToRaCardsAdmin').addEventListener('click', () => {
    document.getElementById('vistaListaActividades').classList.add('hidden');
    document.getElementById('vistaRaCardsAdmin').classList.remove('hidden');
  });

  function pintarRaCardsAdmin(){
    const wrap = document.getElementById('raCardsAdminWrap');
    wrap.innerHTML = ['RA1','RA2','RA3','RA4','RA5'].map(ra => {
      const disponible = RAS_DISPONIBLES.includes(ra);
      return `
        <div class="ra-card ${disponible ? '' : 'ra-card-disabled'}" data-ra="${ra}">
          <div class="ra-card-titulo">${ra}</div>
          <div class="ra-card-sub">${disponible ? 'Ver actividades' : 'Próximamente'}</div>
        </div>`;
    }).join('');

    wrap.querySelectorAll('.ra-card:not(.ra-card-disabled)').forEach(card => {
      card.addEventListener('click', () => {
        raActual = card.dataset.ra;
        document.getElementById('vistaRaCardsAdmin').classList.add('hidden');
        document.getElementById('vistaListaActividades').classList.remove('hidden');
        cargarActividades();
      });
    });
  }

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
      `${raActual} — ${actividadesCache.length} actividades — ${habilitadas} habilitada(s)`;

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
          <div class="puntaje-field">
            <label>Tiempo est. (min)</label>
            <input type="number" min="1" step="1" class="input-tiempo" value="${act.tiempoEstimado || 10}">
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

        <div class="recursos-section">
          <div style="font-weight:800; font-size:13px; margin-top:16px; margin-bottom:8px;">
            <i class="fa-solid fa-paperclip"></i> Recursos de apoyo
          </div>
          <div class="recursos-lista" data-recursos-de="${act.codigo}">
            <div class="loading-note" style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Cargando recursos...</div>
          </div>
          <div class="recurso-form">
            <div class="field">
              <label>Nombre del recurso</label>
              <input type="text" class="input-recurso-nombre" placeholder="Ej. Guía de tipos de reportes">
            </div>
            <div class="field">
              <label>Enlace (URL)</label>
              <input type="text" class="input-recurso-url" placeholder="https://...">
            </div>
            <button type="button" class="btn-add btn-add-recurso" style="padding:10px 16px;">
              <i class="fa-solid fa-plus"></i> Agregar
            </button>
          </div>
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
        const tiempoEstimado = card.querySelector('.input-tiempo').value;
        const habilitada = card.querySelector('.input-habilitada').checked;

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
        okMsg.classList.remove('show');

        try{
          const data = await apiPost({ action:'actualizarActividad', codigo, puntaje, tiempoEstimado, habilitada });
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

      cargarRecursosAdmin(codigo, card);

      const btnAdd = card.querySelector('.btn-add-recurso');
      btnAdd.addEventListener('click', async () => {
        const nombre = card.querySelector('.input-recurso-nombre').value.trim();
        const url = card.querySelector('.input-recurso-url').value.trim();
        if(!nombre || !url){ alert('Completa el nombre y el enlace del recurso.'); return; }

        btnAdd.disabled = true;
        try{
          const data = await apiPost({ action:'agregarRecurso', codigo, tipo:'enlace', nombre, url });
          if(data.success){
            card.querySelector('.input-recurso-nombre').value = '';
            card.querySelector('.input-recurso-url').value = '';
            cargarRecursosAdmin(codigo, card);
          } else {
            alert(data.error || 'No se pudo agregar el recurso.');
          }
        }catch(err){
          alert('Error de conexión con el servidor.');
        }finally{
          btnAdd.disabled = false;
        }
      });
    });
  }

  async function cargarRecursosAdmin(codigo, card){
    const cont = card.querySelector(`.recursos-lista[data-recursos-de="${codigo}"]`);
    try{
      const data = await apiGet({ action:'listarRecursos', codigo });
      if(!data.success || data.recursos.length === 0){
        cont.innerHTML = '<div style="font-size:12.5px; opacity:.6; padding:6px 0;">Sin recursos agregados todavía.</div>';
        return;
      }
      cont.innerHTML = data.recursos.map(r => `
        <div class="recurso-item">
          <i class="fa-solid fa-link"></i>
          <span>${r.nombre}</span>
          <i class="fa-solid fa-trash recurso-del" data-id="${r.id}" data-codigo="${codigo}"></i>
        </div>
      `).join('');

      cont.querySelectorAll('.recurso-del').forEach(del => {
        del.addEventListener('click', async () => {
          if(!confirm('¿Eliminar este recurso?')) return;
          await apiPost({ action:'eliminarRecurso', id: del.dataset.id });
          cargarRecursosAdmin(del.dataset.codigo, card);
        });
      });
    }catch(err){
      cont.innerHTML = '<div style="font-size:12.5px; opacity:.6;">Error al cargar recursos.</div>';
    }
  }
