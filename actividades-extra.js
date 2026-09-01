// ============================================================================
// ACTIVIDADES EXTRA — actividades fuera de los RA, creadas libremente por la
// docente (enunciado, recursos e instrumento propios). Instrumento: Lista de
// cotejo (cumple/no cumple), calificada manualmente por la docente porque la
// respuesta del estudiante es de texto libre o simplemente "realizada".
// ============================================================================

  let actividadesExtraCache = [];
  let codigoExtraActual = null; // actividad extra abierta actualmente (estudiante)

  // ---------------- Navegación ----------------
  document.getElementById('cardActividadesExtraAdmin').addEventListener('click', () => {
    document.getElementById('panelActividades').classList.add('hidden');
    document.getElementById('panelActividadesExtraAdmin').classList.remove('hidden');
    cargarActividadesExtraAdmin();
  });
  document.getElementById('btnBackFromActividadesExtraAdmin').addEventListener('click', () => {
    document.getElementById('panelActividadesExtraAdmin').classList.add('hidden');
    document.getElementById('panelActividades').classList.remove('hidden');
    document.getElementById('vistaRaCardsAdmin').classList.remove('hidden');
    document.getElementById('vistaListaActividades').classList.add('hidden');
  });
  document.getElementById('btnBackFromCalificarExtra').addEventListener('click', () => {
    document.getElementById('panelCalificarExtra').classList.add('hidden');
    document.getElementById('panelActividadesExtraAdmin').classList.remove('hidden');
  });

  document.getElementById('cardActividadesExtraEstudiante').addEventListener('click', () => {
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelActividadesExtraEstudiante').classList.remove('hidden');
    cargarActividadesExtraEstudiante();
  });
  document.getElementById('btnBackFromActividadesExtraEstudiante').addEventListener('click', () => {
    document.getElementById('panelActividadesExtraEstudiante').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });
  document.getElementById('btnBackFromDetalleActividadExtra').addEventListener('click', () => {
    document.getElementById('panelDetalleActividadExtra').classList.add('hidden');
    document.getElementById('panelActividadesExtraEstudiante').classList.remove('hidden');
  });

// ============================================================================
// PANEL DOCENTE — crear y administrar actividades extra
// ============================================================================

  async function cargarActividadesExtraAdmin(){
    const wrap = document.getElementById('listaActividadesExtraAdminWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando actividades...</div>';
    try{
      const data = await apiGet({ action:'listarActividadesExtra' });
      if(!data.success){
        wrap.innerHTML = '<div class="empty-table-msg">No se pudo cargar la lista de actividades extra.</div>';
        return;
      }
      actividadesExtraCache = data.actividades;
      pintarActividadesExtraAdmin();
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

  function pintarActividadesExtraAdmin(){
    const wrap = document.getElementById('listaActividadesExtraAdminWrap');

    if(actividadesExtraCache.length === 0){
      wrap.innerHTML = `<div class="empty-table-msg">
        <i class="fa-solid fa-star"></i><br>
        Todavía no has creado ninguna actividad extra. Usa el botón de arriba para crear la primera.
      </div>`;
      return;
    }

    wrap.innerHTML = actividadesExtraCache.map(act => `
      <div class="actividad-card" data-codigo="${act.codigo}">
        <div class="actividad-top">
          <div>
            <div class="actividad-codigo">${act.codigo}</div>
            <div class="actividad-ec">Actividad Extra</div>
          </div>
        </div>

        <div class="puntaje-field" style="max-width:420px; margin-bottom:12px;">
          <label>Título</label>
          <input type="text" class="input-titulo-extra" placeholder="Ej. Evaluación diagnóstica" value="${(act.titulo || '').replace(/"/g,'&quot;')}">
        </div>

        <label style="display:block; font-size:14.5px; font-weight:700; color:var(--dark-text-dim); margin:12px 0 6px;">Enunciado (editable — el estudiante ve este texto)</label>
        ${construirEditorEnunciadoHTML(act.enunciado)}

        <div class="actividad-controls">
          <div class="puntaje-field">
            <label>Puntaje máx.</label>
            <input type="number" min="0" step="0.5" class="input-puntaje" value="${act.puntajeMaximo || 0}">
          </div>
          <div class="puntaje-field">
            <label>Tiempo est. (min)</label>
            <input type="number" min="1" step="1" class="input-tiempo" value="${act.tiempoEstimadoMin || 10}">
          </div>
          <div class="switch-field">
            <label class="switch">
              <input type="checkbox" class="input-habilitada" ${act.habilitada ? 'checked' : ''}>
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
        </div>

        <label style="display:block; font-size:14.5px; font-weight:700; color:var(--dark-text-dim); margin:16px 0 8px;">
          <i class="fa-solid fa-reply"></i> ¿Cómo responderá el estudiante?
        </label>
        <div class="role-tabs tipo-respuesta-tabs" style="width:auto; max-width:420px;">
          <button type="button" class="role-tab tipo-respuesta-tab ${(act.tipoRespuesta || 'texto') === 'texto' ? 'active' : ''}" data-tipo="texto">Escribe una respuesta</button>
          <button type="button" class="role-tab tipo-respuesta-tab ${act.tipoRespuesta === 'marcar' ? 'active' : ''}" data-tipo="marcar">Solo marca como realizada</button>
        </div>
        <input type="hidden" class="input-tipo-respuesta" value="${act.tipoRespuesta || 'texto'}">

        <label style="display:block; font-size:14.5px; font-weight:700; color:var(--dark-text-dim); margin:18px 0 8px;">
          <i class="fa-solid fa-list-check"></i> Instrumento — Lista de cotejo (criterios de evaluación)
        </label>
        <div class="criterios-extra-lista" data-criterios-de="${act.codigo}"></div>
        <button type="button" class="btn-add-criterio-extra" style="margin:8px 0 4px; padding:9px 16px; background:rgba(79,163,255,.12); color:var(--dark-blue-accent); border:1px solid var(--dark-blue-accent); border-radius:9px; font-weight:700; font-size:13.5px;">
          <i class="fa-solid fa-plus"></i> Agregar criterio
        </button>

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
              <input type="text" class="input-recurso-nombre" placeholder="Ej. Guía de estudio">
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
              <input type="text" class="input-recurso-nombre-archivo" placeholder="Ej. Guía en PDF">
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

        <div class="actividad-guardar-final" style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <button type="button" class="btn btn-primary btn-save-act-extra" style="width:auto; padding:12px 26px;">
            <i class="fa-solid fa-floppy-disk"></i> Guardar cambios
          </button>
          <button type="button" class="btn-ver-respuestas-extra" style="padding:12px 20px; background:rgba(232,185,59,.12); color:var(--dark-gold-accent); border:1px solid var(--dark-gold-accent); border-radius:10px; font-weight:700;">
            <i class="fa-solid fa-inbox"></i> Ver respuestas de estudiantes
          </button>
          <button type="button" class="btn-eliminar-extra" style="padding:12px 16px; background:rgba(239,68,68,.1); color:#ef4444; border:1px solid #ef4444; border-radius:10px; font-weight:700;">
            <i class="fa-solid fa-trash"></i>
          </button>
          <span class="save-ok-msg hidden" style="color:var(--dark-green-accent); font-weight:700; font-size:13.5px;"><i class="fa-solid fa-circle-check"></i> Guardado</span>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('.actividad-card').forEach(card => {
      const codigo = card.dataset.codigo;
      const act = actividadesExtraCache.find(a => a.codigo === codigo);

      conectarEditorEnunciado(card);
      cargarRecursosAdmin(codigo, card);
      wireRecursosExtra(card, codigo);

      // Tabs de tipo de respuesta
      card.querySelectorAll('.tipo-respuesta-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          card.querySelectorAll('.tipo-respuesta-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          card.querySelector('.input-tipo-respuesta').value = tab.dataset.tipo;
        });
      });

      // Constructor de criterios (Lista de cotejo)
      const criteriosIniciales = (act.criterios && act.criterios.length) ? act.criterios : [{nombre:'', descripcion:''}, {nombre:'', descripcion:''}];
      pintarCriteriosExtra(card, criteriosIniciales);

      card.querySelector('.btn-add-criterio-extra').addEventListener('click', () => {
        agregarFilaCriterioExtra(card, { nombre:'', descripcion:'' });
      });

      // Guardar
      const btnGuardar = card.querySelector('.btn-save-act-extra');
      const okMsg = card.querySelector('.save-ok-msg');
      btnGuardar.addEventListener('click', async () => {
        const titulo = card.querySelector('.input-titulo-extra').value.trim();
        const enunciado = card.querySelector('.input-enunciado').innerHTML.trim();
        const puntajeMaximo = card.querySelector('.input-puntaje').value;
        const tiempoEstimadoMin = card.querySelector('.input-tiempo').value;
        const habilitada = card.querySelector('.input-habilitada').checked;
        const fechaInicio = card.querySelector('.input-fecha-inicio').value;
        const fechaFin = card.querySelector('.input-fecha-fin').value;
        const tipoRespuesta = card.querySelector('.input-tipo-respuesta').value;

        const criterios = [];
        card.querySelectorAll('.criterio-extra-row').forEach(row => {
          const nombre = row.querySelector('.input-criterio-nombre').value.trim();
          const descripcion = row.querySelector('.input-criterio-descripcion').value.trim();
          if(nombre) criterios.push({ nombre, descripcion });
        });

        if(!titulo){ mostrarNotificacion('Escribe un título para la actividad.', 'error'); return; }
        if(criterios.length === 0){ mostrarNotificacion('Agrega al menos un criterio de evaluación.', 'error'); return; }

        btnGuardar.disabled = true;
        try{
          const resp = await apiPost({
            action:'guardarActividadExtra',
            codigo, titulo, enunciado, criterios,
            puntajeMaximo, tiempoEstimadoMin, tipoRespuesta, habilitada,
            fechaInicio, fechaFin
          });
          if(resp.success){
            okMsg.classList.remove('hidden');
            setTimeout(() => okMsg.classList.add('hidden'), 2500);
            cargarActividadesExtraAdmin();
          } else {
            mostrarNotificacion(resp.error || 'No se pudo guardar la actividad.', 'error');
          }
        }catch(err){
          mostrarNotificacion('Error de conexión con el servidor.', 'error');
        }finally{
          btnGuardar.disabled = false;
        }
      });

      // Ver respuestas
      card.querySelector('.btn-ver-respuestas-extra').addEventListener('click', () => {
        abrirCalificarExtra(codigo, act.titulo);
      });

      // Eliminar
      card.querySelector('.btn-eliminar-extra').addEventListener('click', async () => {
        if(!await confirmarAccion(`¿Eliminar la actividad "${act.titulo || codigo}"? Esta acción no se puede deshacer.`, 'Eliminar actividad extra')) return;
        const resp = await apiPost({ action:'eliminarActividadExtra', codigo });
        if(resp.success){
          mostrarNotificacion('Actividad extra eliminada.', 'success');
          cargarActividadesExtraAdmin();
        } else {
          mostrarNotificacion(resp.error || 'No se pudo eliminar.', 'error');
        }
      });
    });
  }

  function pintarCriteriosExtra(card, criterios){
    const cont = card.querySelector('.criterios-extra-lista');
    cont.innerHTML = '';
    criterios.forEach(c => agregarFilaCriterioExtra(card, c));
  }

  function agregarFilaCriterioExtra(card, criterio){
    const cont = card.querySelector('.criterios-extra-lista');
    const fila = document.createElement('div');
    fila.className = 'criterio-extra-row';
    fila.style.cssText = 'display:flex; gap:8px; margin-bottom:8px; align-items:flex-start;';
    fila.innerHTML = `
      <input type="text" class="input-criterio-nombre textarea-generico" style="min-height:auto; padding:9px 12px; flex:1; max-width:220px;" placeholder="Nombre del criterio" value="${(criterio.nombre || '').replace(/"/g,'&quot;')}">
      <textarea class="input-criterio-descripcion textarea-generico" style="min-height:44px; flex:2;" placeholder="Descripción del desempeño esperado">${criterio.descripcion || ''}</textarea>
      <button type="button" class="btn-quitar-criterio" style="background:rgba(239,68,68,.1); color:#ef4444; border:1px solid #ef4444; border-radius:8px; width:38px; height:38px; flex-shrink:0;"><i class="fa-solid fa-trash"></i></button>
    `;
    fila.querySelector('.btn-quitar-criterio').addEventListener('click', () => fila.remove());
    cont.appendChild(fila);
  }

  function wireRecursosExtra(card, codigo){
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

    const btnAddArchivo = card.querySelector('.btn-add-recurso-archivo');
    btnAddArchivo.addEventListener('click', () => {
      const nombre = card.querySelector('.input-recurso-nombre-archivo').value.trim();
      const fileInput = card.querySelector('.input-recurso-archivo');
      const archivo = fileInput.files[0];
      if(!nombre || !archivo){ mostrarNotificacion('Completa el nombre y selecciona un archivo.', 'error'); return; }
      if(archivo.size > 5 * 1024 * 1024){ mostrarNotificacion('El archivo supera los 5 MB.', 'error'); return; }

      btnAddArchivo.disabled = true;
      msgBox.className = 'form-msg';
      msgBox.textContent = 'Subiendo archivo, puede tardar unos segundos...';

      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target.result.split(',')[1];
        try{
          const data = await apiPost({
            action:'agregarRecursoArchivo', codigo, nombre,
            archivoBase64: base64, nombreArchivo: archivo.name, mimeType: archivo.type || 'application/octet-stream'
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
  }

  document.getElementById('btnNuevaActividadExtra').addEventListener('click', async () => {
    const resp = await apiPost({
      action:'guardarActividadExtra',
      codigo: '', titulo:'Nueva actividad extra', enunciado:'', criterios:[],
      puntajeMaximo:10, tiempoEstimadoMin:10, tipoRespuesta:'texto', habilitada:false,
      fechaInicio:'', fechaFin:''
    });
    if(resp.success){
      mostrarNotificacion('Actividad extra creada. Complétala abajo.', 'success');
      cargarActividadesExtraAdmin();
    } else {
      mostrarNotificacion(resp.error || 'No se pudo crear la actividad.', 'error');
    }
  });

// ============================================================================
// PANEL DOCENTE — calificar respuestas de una actividad extra
// ============================================================================

  async function abrirCalificarExtra(codigo, titulo){
    document.getElementById('panelActividadesExtraAdmin').classList.add('hidden');
    document.getElementById('panelCalificarExtra').classList.remove('hidden');
    document.getElementById('tituloCalificarExtra').textContent = `Respuestas — ${titulo || codigo}`;
    const wrap = document.getElementById('listaRespuestasExtraWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando respuestas...</div>';

    try{
      const act = actividadesExtraCache.find(a => a.codigo === codigo) || { criterios:[], puntajeMaximo:10, tipoRespuesta:'texto' };
      const [dataResp, dataEst] = await Promise.all([
        apiGet({ action:'listarRespuestasPorActividadExtra', codigo }),
        apiGet({ action:'listarEstudiantes' })
      ]);

      if(!dataResp.success || dataResp.respuestas.length === 0){
        wrap.innerHTML = `<div class="empty-table-msg">
          <i class="fa-solid fa-inbox"></i><br>
          Todavía ningún estudiante ha enviado su respuesta para esta actividad.
        </div>`;
        return;
      }

      const nombresPorUsuario = {};
      if(dataEst.success) dataEst.estudiantes.forEach(e => { nombresPorUsuario[e.usuario] = e.nombre; });

      wrap.innerHTML = dataResp.respuestas.map(r => {
        const nombre = nombresPorUsuario[r.usuario] || r.usuario;
        const calificado = r.estado === 'calificado';
        return `
        <div class="actividad-card" data-usuario="${r.usuario}">
          <div class="actividad-top">
            <div>
              <div class="actividad-codigo" style="font-size:16px;">${nombre}</div>
              <div class="actividad-ec">Enviado: ${formatearFechaCorta(r.fechaEnvio) || '—'} ${calificado ? `· Calificado: ${formatearFechaCorta(r.fechaCalificacion)}` : ''}</div>
            </div>
            <span class="estado-badge ${calificado ? 'estado-activa' : 'estado-pendiente'}">
              <i class="fa-solid ${calificado ? 'fa-circle-check' : 'fa-hourglass-half'}"></i> ${calificado ? `Calificado — ${r.nota}/${r.puntajeMaximo}` : 'Pendiente'}
            </span>
          </div>

          ${act.tipoRespuesta === 'marcar'
            ? `<div class="empty-note" style="margin-top:10px;"><i class="fa-solid fa-circle-check"></i> El estudiante marcó esta actividad como realizada.</div>`
            : `<div class="actividad-enunciado contenido-enriquecido" style="margin-top:10px; white-space:pre-wrap;">${(r.respuestaTexto || '(sin contenido)').replace(/</g,'&lt;')}</div>`
          }

          <label style="display:block; font-size:14.5px; font-weight:700; color:var(--dark-text-dim); margin:16px 0 8px;">Calificación (Lista de cotejo)</label>
          <div class="calificar-criterios-lista"></div>

          <button type="button" class="btn btn-primary btn-guardar-calificacion-extra" style="width:auto; padding:11px 24px; margin-top:10px;">
            <i class="fa-solid fa-floppy-disk"></i> Guardar calificación
          </button>
        </div>`;
      }).join('');

      wrap.querySelectorAll('.actividad-card').forEach(card => {
        const usuario = card.dataset.usuario;
        const r = dataResp.respuestas.find(x => x.usuario === usuario);
        const nivelesGuardados = {};
        (r.criteriosCalificados || []).forEach(c => { nivelesGuardados[c.nombre] = c.nivel; });

        const listaCriterios = card.querySelector('.calificar-criterios-lista');
        listaCriterios.innerHTML = (act.criterios || []).map((c, i) => `
          <div class="calificar-criterio-item" data-nombre="${c.nombre.replace(/"/g,'&quot;')}" data-descripcion="${(c.descripcion||'').replace(/"/g,'&quot;')}" style="padding:10px 14px; margin-bottom:8px; background:var(--dark-card); border:1px solid var(--dark-border); border-radius:10px;">
            <div style="font-weight:700; font-size:14px; margin-bottom:4px;">${i+1}. ${c.nombre}</div>
            <div style="font-size:12.5px; opacity:.75; margin-bottom:8px;">${c.descripcion || ''}</div>
            <div style="display:flex; gap:8px;">
              <button type="button" class="btn-nivel-extra ${nivelesGuardados[c.nombre] === 'cumple' ? 'activo-cumple' : ''}" data-nivel="cumple"><i class="fa-solid fa-check"></i> Cumple</button>
              <button type="button" class="btn-nivel-extra ${nivelesGuardados[c.nombre] === 'no_cumple' ? 'activo-no-cumple' : ''}" data-nivel="no_cumple"><i class="fa-solid fa-xmark"></i> No cumple</button>
            </div>
          </div>
        `).join('');

        listaCriterios.querySelectorAll('.calificar-criterio-item').forEach(item => {
          item.querySelectorAll('.btn-nivel-extra').forEach(btn => {
            btn.addEventListener('click', () => {
              item.querySelectorAll('.btn-nivel-extra').forEach(b => b.classList.remove('activo-cumple', 'activo-no-cumple'));
              btn.classList.add(btn.dataset.nivel === 'cumple' ? 'activo-cumple' : 'activo-no-cumple');
            });
          });
        });

        card.querySelector('.btn-guardar-calificacion-extra').addEventListener('click', async () => {
          const criteriosCalificados = [];
          let faltantes = 0;
          listaCriterios.querySelectorAll('.calificar-criterio-item').forEach(item => {
            const elegido = item.querySelector('.btn-nivel-extra.activo-cumple, .btn-nivel-extra.activo-no-cumple');
            if(!elegido){ faltantes++; return; }
            criteriosCalificados.push({
              nombre: item.dataset.nombre,
              descripcion: item.dataset.descripcion,
              nivel: elegido.dataset.nivel
            });
          });
          if(faltantes > 0){ mostrarNotificacion('Marca "Cumple" o "No cumple" en todos los criterios antes de guardar.', 'error'); return; }

          const pesoUnidad = (act.puntajeMaximo || 0) / criteriosCalificados.length;
          let nota = 0;
          criteriosCalificados.forEach(c => { if(c.nivel === 'cumple') nota += pesoUnidad; });
          nota = Math.round(nota * 100) / 100;

          const resp = await apiPost({
            action:'calificarRespuestaExtra',
            usuario, codigo,
            criterios: criteriosCalificados,
            nota, puntajeMaximo: act.puntajeMaximo
          });
          if(resp.success){
            mostrarNotificacion(`Calificación guardada: ${nota}/${act.puntajeMaximo}`, 'success');
            abrirCalificarExtra(codigo, titulo);
          } else {
            mostrarNotificacion(resp.error || 'No se pudo guardar la calificación.', 'error');
          }
        });
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

// ============================================================================
// PANEL ESTUDIANTE — lista de actividades extra disponibles
// ============================================================================

  async function cargarActividadesExtraEstudiante(){
    const wrap = document.getElementById('listaActividadesExtraEstudianteWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando actividades...</div>';
    try{
      const [dataAct, dataResp] = await Promise.all([
        apiGet({ action:'listarActividadesExtra' }),
        apiGet({ action:'listarRespuestasExtra', usuario: currentUser.usuario })
      ]);
      if(!dataAct.success){
        wrap.innerHTML = '<div class="empty-table-msg">No se pudieron cargar las actividades.</div>';
        return;
      }
      actividadesExtraCache = dataAct.actividades;
      const habilitadas = actividadesExtraCache.filter(a => a.habilitada);

      if(habilitadas.length === 0){
        wrap.innerHTML = `<div class="empty-note">
          <i class="fa-solid fa-circle-info"></i>
          Tu docente aún no ha habilitado ninguna actividad extra.
        </div>`;
        return;
      }

      const respuestasPorCodigo = {};
      if(dataResp.success) dataResp.respuestas.forEach(r => { respuestasPorCodigo[r.codigo] = r; });

      wrap.innerHTML = habilitadas.map(act => {
        const miRespuesta = respuestasPorCodigo[act.codigo];
        const ahora = new Date();
        const inicio = act.fechaInicio ? new Date(act.fechaInicio) : null;
        const fin = act.fechaFin ? new Date(act.fechaFin) : null;
        const aunNoInicia = inicio && ahora < inicio;
        const yaVencio = fin && ahora > fin;
        const fueraDeVentana = (aunNoInicia || yaVencio) && !miRespuesta;

        let estadoBadge, textoBoton;
        if(miRespuesta && miRespuesta.estado === 'calificado'){
          estadoBadge = `<span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> Calificada — ${miRespuesta.nota}/${miRespuesta.puntajeMaximo}</span>`;
          textoBoton = 'Ver resultado';
        } else if(miRespuesta && miRespuesta.estado === 'pendiente'){
          estadoBadge = `<span class="estado-badge estado-pendiente"><i class="fa-solid fa-hourglass-half"></i> Enviada — en espera de calificación</span>`;
          textoBoton = 'Ver mi envío';
        } else if(aunNoInicia){
          estadoBadge = `<span class="estado-badge estado-pendiente"><i class="fa-solid fa-clock"></i> Disponible desde ${formatearFechaCorta(inicio)}</span>`;
          textoBoton = '';
        } else if(yaVencio){
          estadoBadge = `<span class="estado-badge estado-vencida"><i class="fa-solid fa-lock"></i> Cerrada desde ${formatearFechaCorta(fin)}</span>`;
          textoBoton = '';
        } else {
          estadoBadge = '<span class="estado-badge estado-activa"><i class="fa-solid fa-play"></i> Disponible</span>';
          textoBoton = 'Realizar actividad';
        }

        return `
        <div class="actividad-card">
          <div class="actividad-top">
            <div>
              <div class="actividad-codigo">${act.titulo || act.codigo}</div>
              <div class="actividad-ec">Actividad Extra</div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <span class="puntaje-pill"><i class="fa-solid fa-star"></i> ${act.puntajeMaximo} pts</span>
              ${estadoBadge}
            </div>
          </div>
          <div class="actividad-enunciado contenido-enriquecido">${limpiarColoresCasiBlancos(act.enunciado)}</div>
          ${fin && !miRespuesta && !yaVencio ? `<div class="actividad-vence-aviso"><i class="fa-solid fa-hourglass-half"></i> Disponible hasta ${formatearFechaCorta(fin)}</div>` : ''}
          ${(!fueraDeVentana && textoBoton) ? `
            <button type="button" class="btn-add abrir-extra-btn" data-codigo="${act.codigo}" style="margin-top:12px;">
              <i class="fa-solid ${miRespuesta ? 'fa-eye' : 'fa-play'}"></i> ${textoBoton}
            </button>` : ''}
        </div>`;
      }).join('');

      wrap.querySelectorAll('.abrir-extra-btn').forEach(btn => {
        btn.addEventListener('click', () => abrirDetalleActividadExtra(btn.dataset.codigo));
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

// ============================================================================
// PANEL ESTUDIANTE — ver/realizar una actividad extra
// ============================================================================

  async function abrirDetalleActividadExtra(codigo){
    codigoExtraActual = codigo;
    const act = actividadesExtraCache.find(a => a.codigo === codigo);
    if(!act) return;

    document.getElementById('panelActividadesExtraEstudiante').classList.add('hidden');
    document.getElementById('panelDetalleActividadExtra').classList.remove('hidden');
    document.getElementById('tituloDetalleActividadExtra').textContent = act.titulo || codigo;
    document.getElementById('enunciadoActividadExtra').innerHTML = limpiarColoresCasiBlancos(act.enunciado) || '';
    document.getElementById('zonaResultadoExtra').classList.add('hidden');
    cargarRecursosActividad(codigo, 'recursosActividadExtra');

    const criteriosPrevios = (act.criterios || []).map(c => ({ nombre:c.nombre, descripcion:c.descripcion, nivel:null }));
    renderListaCotejo('instrumentoPrevioActividadExtra', criteriosPrevios, act.puntajeMaximo, null);

    const zonaRespuesta = document.getElementById('zonaRespuestaExtra');
    zonaRespuesta.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando tu envío...</div>';

    try{
      const data = await apiGet({ action:'listarRespuestasExtra', usuario: currentUser.usuario });
      const miRespuesta = data.success ? data.respuestas.find(r => r.codigo === codigo) : null;

      if(miRespuesta && miRespuesta.estado === 'calificado'){
        zonaRespuesta.innerHTML = act.tipoRespuesta === 'marcar'
          ? '<div class="empty-note"><i class="fa-solid fa-circle-check"></i> Marcaste esta actividad como realizada.</div>'
          : `<div class="section-heading" style="font-size:16px;">Tu respuesta enviada</div>
             <div class="actividad-enunciado contenido-enriquecido" style="white-space:pre-wrap;">${(miRespuesta.respuestaTexto || '').replace(/</g,'&lt;')}</div>`;
        document.getElementById('zonaResultadoExtra').classList.remove('hidden');
        renderListaCotejo('rubricaResultadoExtra', miRespuesta.criteriosCalificados, miRespuesta.puntajeMaximo, miRespuesta.nota);
        return;
      }

      if(miRespuesta && miRespuesta.estado === 'pendiente'){
        pintarZonaRespuestaExtra(act, miRespuesta);
        zonaRespuesta.insertAdjacentHTML('afterbegin', `
          <div class="empty-note"><i class="fa-solid fa-hourglass-half"></i> Ya enviaste tu respuesta — está en espera de calificación. Puedes actualizarla mientras tu docente no la haya calificado.</div>
        `);
        return;
      }

      pintarZonaRespuestaExtra(act, null);
    }catch(err){
      zonaRespuesta.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

  function pintarZonaRespuestaExtra(act, miRespuesta){
    const zonaRespuesta = document.getElementById('zonaRespuestaExtra');

    if(act.tipoRespuesta === 'marcar'){
      zonaRespuesta.innerHTML += `
        <button type="button" class="btn btn-primary" id="btnEnviarRespuestaExtra" style="width:auto; padding:12px 28px; margin-top:10px;">
          <i class="fa-solid fa-circle-check"></i> Marcar como realizada
        </button>`;
      document.getElementById('btnEnviarRespuestaExtra').addEventListener('click', async () => {
        if(!await confirmarAccion('¿Confirmas que ya realizaste esta actividad?', 'Marcar como realizada')) return;
        await enviarRespuestaExtraServidor('');
      });
    } else {
      zonaRespuesta.innerHTML += `
        <div class="justificacion-box">
          <label for="inputRespuestaExtra"><i class="fa-solid fa-pen"></i> Tu respuesta</label>
          <textarea id="inputRespuestaExtra" placeholder="Escribe aquí tu respuesta...">${miRespuesta ? (miRespuesta.respuestaTexto || '') : ''}</textarea>
        </div>
        <button type="button" class="btn btn-primary" id="btnEnviarRespuestaExtra" style="width:auto; padding:12px 28px;">
          <i class="fa-solid fa-paper-plane"></i> ${miRespuesta ? 'Actualizar respuesta' : 'Enviar respuesta'}
        </button>`;
      document.getElementById('btnEnviarRespuestaExtra').addEventListener('click', async () => {
        const texto = document.getElementById('inputRespuestaExtra').value.trim();
        if(!texto){ mostrarNotificacion('Escribe tu respuesta antes de enviar.', 'error'); return; }
        await enviarRespuestaExtraServidor(texto);
      });
    }
  }

  async function enviarRespuestaExtraServidor(respuestaTexto){
    try{
      const resp = await apiPost({ action:'enviarRespuestaExtra', usuario: currentUser.usuario, codigo: codigoExtraActual, respuestaTexto });
      if(resp.success){
        mostrarLogro('Respuesta enviada correctamente', 'fa-paper-plane');
        abrirDetalleActividadExtra(codigoExtraActual);
      } else {
        mostrarNotificacion(resp.error || 'No se pudo enviar tu respuesta.', 'error');
      }
    }catch(err){
      mostrarNotificacion('Error de conexión con el servidor.', 'error');
    }
  }
