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
    wrap.innerHTML = pintarTarjetasRA(
      ['RA1','RA2','RA3','RA4','RA5'].map(ra => ({ ra, disponible: RAS_DISPONIBLES.includes(ra) }))
    );

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
        <label style="display:block; font-size:14.5px; font-weight:700; color:var(--dark-text-dim); margin:12px 0 6px;">Enunciado (editable — el estudiante ve este texto)</label>
        <textarea class="input-enunciado textarea-generico">${act.enunciado}</textarea>
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
        </div>

        <div class="disponibilidad-section">
          <label style="display:block; font-size:14.5px; font-weight:700; color:var(--dark-text-dim); margin:14px 0 8px;">
            <i class="fa-solid fa-calendar-days"></i> Ventana de disponibilidad para el estudiante (opcional)
          </label>
          <div class="actividad-controls" style="margin-top:0;">
            <div class="puntaje-field">
              <label>Disponible desde</label>
              <input type="datetime-local" class="input-fecha-inicio" value="${act.fechaInicio || ''}">
            </div>
            <div class="puntaje-field">
              <label>Disponible hasta</label>
              <input type="datetime-local" class="input-fecha-fin" value="${act.fechaFin || ''}">
            </div>
          </div>
          <div class="empty-note" style="margin:10px 0 0; padding:10px 14px; font-size:12.5px;">
            <i class="fa-solid fa-circle-info"></i>
            Si dejas estos campos vacíos, la actividad estará disponible sin límite de fecha mientras esté habilitada.
          </div>
        </div>

        <div class="recursos-section">
          <div style="font-weight:800; font-size:15px; margin-top:16px; margin-bottom:8px;">
            <i class="fa-solid fa-paperclip"></i> Recursos de apoyo
          </div>
          <div class="recursos-lista" data-recursos-de="${act.codigo}">
            <div class="loading-note" style="padding:10px;"><i class="fa-solid fa-spinner fa-spin"></i> Cargando recursos...</div>
          </div>

          <div class="role-tabs" style="margin:10px 0 12px; width:auto; max-width:260px;">
            <button type="button" class="role-tab recurso-tipo-tab active" data-tipo="enlace">Enlace</button>
            <button type="button" class="role-tab recurso-tipo-tab" data-tipo="archivo">Archivo</button>
          </div>

          <div class="recurso-form recurso-form-enlace">
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

          <div class="recurso-form recurso-form-archivo hidden">
            <div class="field">
              <label>Nombre del recurso</label>
              <input type="text" class="input-recurso-nombre-archivo" placeholder="Ej. Presentación de apoyo">
            </div>
            <div class="field">
              <label>Archivo (PDF, Word, PPT — máx. 5 MB)</label>
              <input type="file" class="input-recurso-archivo" accept=".pdf,.doc,.docx,.ppt,.pptx">
            </div>
            <button type="button" class="btn-add btn-add-recurso-archivo" style="padding:10px 16px;">
              <i class="fa-solid fa-upload"></i> Subir
            </button>
          </div>
          <div class="form-msg" style="margin-top:6px;" data-msg-de="${act.codigo}"></div>
        </div>

        <div class="actividad-guardar-final">
          <button type="button" class="btn-save-act"><i class="fa-solid fa-floppy-disk"></i> Guardar cambios de esta actividad</button>
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
        const tiempoEstimado = card.querySelector('.input-tiempo').value;
        const habilitada = card.querySelector('.input-habilitada').checked;
        const enunciado = card.querySelector('.input-enunciado').value.trim();
        const fechaInicio = card.querySelector('.input-fecha-inicio').value;
        const fechaFin = card.querySelector('.input-fecha-fin').value;

        if(fechaInicio && fechaFin && new Date(fechaFin) <= new Date(fechaInicio)){
          mostrarNotificacion('La fecha "hasta" debe ser posterior a la fecha "desde".', 'error');
          return;
        }

        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';
        okMsg.classList.remove('show');

        try{
          const data = await apiPost({ action:'actualizarActividad', codigo, puntaje, tiempoEstimado, habilitada, enunciado, fechaInicio, fechaFin });
          if(data.success){
            okMsg.classList.add('show');
            setTimeout(() => okMsg.classList.remove('show'), 2000);
          } else {
            mostrarNotificacion(data.error || 'No se pudo guardar.', 'error');
          }
        }catch(err){
          mostrarNotificacion('Error de conexión con el servidor.', 'error');
        }finally{
          btn.disabled = false;
          btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar';
        }
      });

      cargarRecursosAdmin(codigo, card);

      // Toggle entre "Enlace" y "Archivo"
      card.querySelectorAll('.recurso-tipo-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          card.querySelectorAll('.recurso-tipo-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          const esArchivo = tab.dataset.tipo === 'archivo';
          card.querySelector('.recurso-form-enlace').classList.toggle('hidden', esArchivo);
          card.querySelector('.recurso-form-archivo').classList.toggle('hidden', !esArchivo);
        });
      });

      const msgBox = card.querySelector(`[data-msg-de="${codigo}"]`);

      const btnAdd = card.querySelector('.btn-add-recurso');
      btnAdd.addEventListener('click', async () => {
        const nombre = card.querySelector('.input-recurso-nombre').value.trim();
        const url = card.querySelector('.input-recurso-url').value.trim();
        if(!nombre || !url){ mostrarNotificacion('Completa el nombre y el enlace del recurso.', 'error'); return; }

        btnAdd.disabled = true;
        try{
          const data = await apiPost({ action:'agregarRecurso', codigo, tipo:'enlace', nombre, url });
          if(data.success){
            card.querySelector('.input-recurso-nombre').value = '';
            card.querySelector('.input-recurso-url').value = '';
            cargarRecursosAdmin(codigo, card);
          } else {
            mostrarNotificacion(data.error || 'No se pudo agregar el recurso.', 'error');
          }
        }catch(err){
          mostrarNotificacion('Error de conexión con el servidor.', 'error');
        }finally{
          btnAdd.disabled = false;
        }
      });

      // Subida de archivo (PDF/Word/PPT) a Google Drive
      const btnAddArchivo = card.querySelector('.btn-add-recurso-archivo');
      btnAddArchivo.addEventListener('click', () => {
        const nombre = card.querySelector('.input-recurso-nombre-archivo').value.trim();
        const fileInput = card.querySelector('.input-recurso-archivo');
        const archivo = fileInput.files[0];

        if(!nombre || !archivo){ mostrarNotificacion('Completa el nombre y selecciona un archivo.', 'error'); return; }
        if(archivo.size > 5 * 1024 * 1024){ mostrarNotificacion('El archivo supera los 5 MB. Sube uno más liviano o comparte un enlace.', 'error'); return; }

        btnAddArchivo.disabled = true;
        msgBox.className = 'form-msg';
        msgBox.textContent = 'Subiendo archivo, puede tardar unos segundos...';

        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target.result.split(',')[1]; // quita el prefijo data:...;base64,
          try{
            const data = await apiPost({
              action:'agregarRecursoArchivo',
              codigo,
              nombre,
              archivoBase64: base64,
              nombreArchivo: archivo.name,
              mimeType: archivo.type || 'application/octet-stream'
            });
            if(data.success){
              msgBox.className = 'form-msg ok';
              msgBox.textContent = 'Archivo subido correctamente.';
              card.querySelector('.input-recurso-nombre-archivo').value = '';
              fileInput.value = '';
              cargarRecursosAdmin(codigo, card);
            } else {
              msgBox.className = 'form-msg err';
              msgBox.textContent = data.error || 'No se pudo subir el archivo.';
            }
          }catch(err){
            msgBox.className = 'form-msg err';
            msgBox.textContent = 'Error de conexión con el servidor.';
          }finally{
            btnAddArchivo.disabled = false;
          }
        };
        reader.readAsDataURL(archivo);
      });
    });
  }

  async function cargarRecursosAdmin(codigo, card){
    const cont = card.querySelector(`.recursos-lista[data-recursos-de="${codigo}"]`);
    try{
      const data = await apiGet({ action:'listarRecursos', codigo });
      if(!data.success || data.recursos.length === 0){
        cont.innerHTML = '<div style="font-size:14.5px; opacity:.6; padding:6px 0;">Sin recursos agregados todavía.</div>';
        return;
      }
      cont.innerHTML = data.recursos.map(r => `
        <div class="recurso-item">
          <i class="fa-solid ${r.tipo === 'archivo' ? 'fa-file-lines' : 'fa-link'}"></i>
          <span>${r.nombre}</span>
          <i class="fa-solid fa-trash recurso-del" data-id="${r.id}" data-codigo="${codigo}"></i>
        </div>
      `).join('');

      cont.querySelectorAll('.recurso-del').forEach(del => {
        del.addEventListener('click', async () => {
          if(!await confirmarAccion('¿Eliminar este recurso? Esta acción no se puede deshacer.', 'Eliminar recurso')) return;
          await apiPost({ action:'eliminarRecurso', id: del.dataset.id });
          mostrarNotificacion('Recurso eliminado correctamente.', 'success');
          cargarRecursosAdmin(del.dataset.codigo, card);
        });
      });
    }catch(err){
      cont.innerHTML = '<div style="font-size:14.5px; opacity:.6;">Error al cargar recursos.</div>';
    }
  }
