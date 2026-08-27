// ================= ACTIVIDADES POR RA (panel docente) =================
  let actividadesCache = [];
  let raActual = 'RA1';
  const RAS_DISPONIBLES = ['RA1']; // RA2-RA5 se habilitan cuando se construyan sus actividades

  // Paletas del editor de enunciados (colores estándar + los que la docente ha usado en la sesión)
  const COLORES_ESTANDAR_TEXTO = ['#1a1a1a','#ffffff','#ef4444','#f59e0b','#22c55e','#0ea5e9','#8b5cf6','#ec4899'];
  const COLORES_ESTANDAR_RESALTADO = ['#fff58a','#a7f3d0','#bfdbfe','#fbcfe8','#fed7aa','#ddd6fe','#fca5a5','#ffffff'];
  let coloresRecientesTextoA = [];
  let coloresRecientesResaltadoA = [];

  // Cierra cualquier menú de color abierto al hacer clic fuera de él (se registra una sola vez)
  document.addEventListener('click', (e) => {
    if(!e.target.closest('.editor-color-group')){
      document.querySelectorAll('.editor-color-popover').forEach(p => p.classList.add('hidden'));
    }
  });

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
        <div class="editor-wrap">
          <div class="editor-toolbar">
            <button type="button" class="editor-btn" data-cmd="bold" title="Negrita"><b>B</b></button>
            <button type="button" class="editor-btn" data-cmd="italic" title="Cursiva"><i>I</i></button>
            <button type="button" class="editor-btn" data-cmd="underline" title="Subrayado"><u>S</u></button>
            <button type="button" class="editor-btn" data-cmd="strikeThrough" title="Tachado"><s>T</s></button>

            <select class="editor-fontsize" title="Tamaño de fuente">
              <option value="">Tamaño</option>
              <option value="2">Pequeño</option>
              <option value="3">Normal</option>
              <option value="5">Grande</option>
              <option value="7">Muy grande</option>
            </select>

            <span class="editor-separador"></span>

            <div class="editor-color-group" data-tipo="texto">
              <button type="button" class="editor-btn editor-color-toggle" title="Color de texto">A</button>
              <div class="editor-color-popover hidden">
                <div class="editor-swatches" data-tipo="texto">
                  ${COLORES_ESTANDAR_TEXTO.map(c => `<button type="button" class="swatch-btn" data-color="${c}" style="background:${c};" title="${c}"></button>`).join('')}
                  ${coloresRecientesTextoA.map(c => `<button type="button" class="swatch-btn swatch-reciente" data-color="${c}" style="background:${c};" title="${c}"></button>`).join('')}
                </div>
                <label class="editor-color-custom-btn" title="Elegir color personalizado">
                  <i class="fa-solid fa-plus" style="pointer-events:none;"></i>
                  <input type="color" class="editor-color-picker" data-tipo="texto" data-cmd="foreColor">
                </label>
              </div>
            </div>

            <div class="editor-color-group" data-tipo="resaltado">
              <button type="button" class="editor-btn editor-color-toggle" title="Resaltar texto"><i class="fa-solid fa-highlighter"></i></button>
              <div class="editor-color-popover hidden">
                <div class="editor-swatches" data-tipo="resaltado">
                  ${COLORES_ESTANDAR_RESALTADO.map(c => `<button type="button" class="swatch-btn" data-color="${c}" style="background:${c};" title="${c}"></button>`).join('')}
                  ${coloresRecientesResaltadoA.map(c => `<button type="button" class="swatch-btn swatch-reciente" data-color="${c}" style="background:${c};" title="${c}"></button>`).join('')}
                </div>
                <label class="editor-color-custom-btn" title="Elegir color personalizado">
                  <i class="fa-solid fa-plus" style="pointer-events:none;"></i>
                  <input type="color" class="editor-color-picker" data-tipo="resaltado" data-cmd="hiliteColor">
                </label>
              </div>
            </div>

            <span class="editor-separador"></span>

            <button type="button" class="editor-btn" data-cmd="insertUnorderedList" title="Viñetas"><i class="fa-solid fa-list-ul"></i></button>
            <button type="button" class="editor-btn" data-cmd="insertOrderedList" title="Lista numerada"><i class="fa-solid fa-list-ol"></i></button>

            <span class="editor-separador"></span>

            <button type="button" class="editor-btn" data-cmd="justifyLeft" title="Alinear a la izquierda"><i class="fa-solid fa-align-left"></i></button>
            <button type="button" class="editor-btn" data-cmd="justifyCenter" title="Centrar"><i class="fa-solid fa-align-center"></i></button>
            <button type="button" class="editor-btn" data-cmd="justifyRight" title="Alinear a la derecha"><i class="fa-solid fa-align-right"></i></button>

            <span class="editor-separador"></span>

            <button type="button" class="editor-btn editor-btn-link" title="Insertar enlace"><i class="fa-solid fa-link"></i></button>
            <button type="button" class="editor-btn" data-cmd="undo" title="Deshacer"><i class="fa-solid fa-rotate-left"></i></button>
            <button type="button" class="editor-btn" data-cmd="redo" title="Rehacer"><i class="fa-solid fa-rotate-right"></i></button>
            <button type="button" class="editor-btn" data-cmd="removeFormat" title="Quitar formato"><i class="fa-solid fa-eraser"></i></button>
          </div>
          <div class="editor-contenido input-enunciado contenido-enriquecido" contenteditable="true">${act.enunciado}</div>
        </div>
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
      const editorContenido = card.querySelector('.editor-contenido');
      let seleccionGuardadaA = null;

      function guardarSeleccionEditor(){
        const sel = window.getSelection();
        if(sel.rangeCount > 0 && editorContenido.contains(sel.anchorNode)){
          seleccionGuardadaA = sel.getRangeAt(0);
        }
      }
      function restaurarSeleccionEditor(){
        if(seleccionGuardadaA){
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(seleccionGuardadaA);
        }
        editorContenido.focus();
        // "styleWithCSS" en false evita que el navegador "hornee" el color calculado del tema
        // (claro/oscuro) dentro del texto — así el texto sin color explícito siempre se adapta al tema.
        document.execCommand('styleWithCSS', false, false);
      }
      editorContenido.addEventListener('mouseup', guardarSeleccionEditor);
      editorContenido.addEventListener('keyup', guardarSeleccionEditor);

      // Botones normales (negrita, cursiva, alinear, deshacer, enlace, etc.)
      card.querySelectorAll('.editor-btn[data-cmd]').forEach(editorBtn => {
        // mousedown + preventDefault evita que el editor pierda el foco/selección al hacer clic en el botón
        editorBtn.addEventListener('mousedown', (e) => { e.preventDefault(); guardarSeleccionEditor(); });
        editorBtn.addEventListener('click', () => {
          restaurarSeleccionEditor();
          document.execCommand(editorBtn.dataset.cmd, false, null);
        });
      });

      // Tamaño de fuente
      const selectTamano = card.querySelector('.editor-fontsize');
      if(selectTamano){
        selectTamano.addEventListener('mousedown', guardarSeleccionEditor);
        selectTamano.addEventListener('change', () => {
          if(!selectTamano.value) return;
          restaurarSeleccionEditor();
          document.execCommand('fontSize', false, selectTamano.value);
          selectTamano.value = '';
        });
      }

      // Aplica un color (de una paleta o personalizado) al texto u al resaltado
      function aplicarColorA(cmd, color){
        restaurarSeleccionEditor();
        document.execCommand(cmd, false, color);
      }

      // Abrir/cerrar el menú desplegable de colores al hacer clic en "A" o el resaltador
      card.querySelectorAll('.editor-color-toggle').forEach(toggleBtn => {
        toggleBtn.addEventListener('mousedown', (e) => { e.preventDefault(); guardarSeleccionEditor(); });
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const popover = toggleBtn.nextElementSibling;
          const estabaAbierto = !popover.classList.contains('hidden');
          document.querySelectorAll('.editor-color-popover').forEach(p => p.classList.add('hidden'));
          if(!estabaAbierto) popover.classList.remove('hidden');
        });
      });

      // Swatches de colores estándar y recientes (clic directo, sin abrir el selector del sistema)
      card.querySelectorAll('.swatch-btn').forEach(swatch => {
        swatch.addEventListener('mousedown', (e) => { e.preventDefault(); guardarSeleccionEditor(); });
        swatch.addEventListener('click', () => {
          const tipo = swatch.closest('.editor-swatches').dataset.tipo;
          aplicarColorA(tipo === 'texto' ? 'foreColor' : 'hiliteColor', swatch.dataset.color);
          swatch.closest('.editor-color-popover').classList.add('hidden');
        });
      });

      // Selector de color personalizado — agrega el color elegido a "recientes" para reutilizarlo después
      card.querySelectorAll('.editor-color-picker').forEach(colorInput => {
        colorInput.addEventListener('mousedown', guardarSeleccionEditor);
        colorInput.addEventListener('input', () => {
          aplicarColorA(colorInput.dataset.cmd, colorInput.value);

          const tipo = colorInput.dataset.tipo;
          const listaRecientes = tipo === 'texto' ? coloresRecientesTextoA : coloresRecientesResaltadoA;
          if(!listaRecientes.includes(colorInput.value)){
            listaRecientes.unshift(colorInput.value);
            if(listaRecientes.length > 6) listaRecientes.pop();

            const contSwatches = card.querySelector(`.editor-swatches[data-tipo="${tipo}"]`);
            const nuevoSwatch = document.createElement('button');
            nuevoSwatch.type = 'button';
            nuevoSwatch.className = 'swatch-btn swatch-reciente';
            nuevoSwatch.dataset.color = colorInput.value;
            nuevoSwatch.style.background = colorInput.value;
            nuevoSwatch.title = colorInput.value;
            nuevoSwatch.addEventListener('mousedown', (e) => { e.preventDefault(); guardarSeleccionEditor(); });
            nuevoSwatch.addEventListener('click', () => {
              aplicarColorA(colorInput.dataset.cmd, nuevoSwatch.dataset.color);
              nuevoSwatch.closest('.editor-color-popover').classList.add('hidden');
            });
            contSwatches.appendChild(nuevoSwatch);
          }
        });
      });

      // Insertar enlace
      const btnLink = card.querySelector('.editor-btn-link');
      if(btnLink){
        btnLink.addEventListener('mousedown', (e) => { e.preventDefault(); guardarSeleccionEditor(); });
        btnLink.addEventListener('click', () => {
          const url = window.prompt('Escribe la dirección del enlace (URL):', 'https://');
          if(url){
            restaurarSeleccionEditor();
            document.execCommand('createLink', false, url);
          }
        });
      }

      btn.addEventListener('click', async () => {
        const puntaje = card.querySelector('.input-puntaje').value;
        const tiempoEstimado = card.querySelector('.input-tiempo').value;
        const habilitada = card.querySelector('.input-habilitada').checked;
        const enunciado = card.querySelector('.input-enunciado').innerHTML.trim();
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
