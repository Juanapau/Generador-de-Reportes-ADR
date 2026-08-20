// ================= REGISTRO DE ESTUDIANTES =================
  document.getElementById('cardRegistroEstudiantes').addEventListener('click', () => {
    document.getElementById('panelDocente').classList.add('hidden');
    document.getElementById('panelRegistro').classList.remove('hidden');
    cargarEstudiantes();
  });
  document.getElementById('btnBackFromRegistro').addEventListener('click', () => {
    document.getElementById('panelRegistro').classList.add('hidden');
    document.getElementById('panelDocente').classList.remove('hidden');
  });

  async function cargarEstudiantes(){
    const tbody = document.getElementById('tbodyEstudiantes');
    tbody.innerHTML = '<tr><td colspan="4"><div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando estudiantes...</div></td></tr>';
    try{
      const data = await apiGet({ action:'listarEstudiantes' });
      if(data.success){
        estudiantesCache = data.estudiantes;
        pintarTablaEstudiantes();
      } else {
        tbody.innerHTML = '<tr><td colspan="4"><div class="empty-table-msg">No se pudo cargar la lista.</div></td></tr>';
      }
    }catch(err){
      tbody.innerHTML = '<tr><td colspan="4"><div class="empty-table-msg">Error de conexión con el servidor.</div></td></tr>';
    }
  }

  function pintarTablaEstudiantes(){
    const tbody = document.getElementById('tbodyEstudiantes');
    document.getElementById('totalEstudiantesLabel').textContent =
      estudiantesCache.length + (estudiantesCache.length === 1 ? ' estudiante registrado' : ' estudiantes registrados');

    if(estudiantesCache.length === 0){
      tbody.innerHTML = '<tr><td colspan="4"><div class="empty-table-msg"><i class="fa-solid fa-users-slash"></i><br>Aún no hay estudiantes registrados.</div></td></tr>';
      return;
    }

    tbody.innerHTML = estudiantesCache.map(est => `
      <tr>
        <td>${est.usuario}</td>
        <td>${est.nombre}</td>
        <td>${est.equipo ? `<span class="equipo-badge">${est.equipo}</span>` : '<span style="opacity:.5;">Sin asignar</span>'}</td>
        <td>
          <div class="row-actions">
            <button type="button" class="edit-btn" title="Editar" onclick="abrirEditarEstudiante('${est.usuario}')"><i class="fa-solid fa-pen"></i></button>
            <button type="button" class="del-btn" title="Eliminar" onclick="eliminarEstudianteUI('${est.usuario}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // ---- Modal: abrir para nuevo / editar ----
  const modalEstudiante = document.getElementById('modalEstudiante');

  document.getElementById('btnNuevoEstudiante').addEventListener('click', () => {
    document.getElementById('modalEstudianteTitle').textContent = 'Nuevo estudiante';
    document.getElementById('formEstudiante').reset();
    document.getElementById('estUsuarioOriginal').value = '';
    document.getElementById('estUsuario').disabled = false;
    document.getElementById('passHint').textContent = '';
    document.getElementById('estPassword').required = true;
    document.getElementById('formEstudianteMsg').textContent = '';
    modalEstudiante.classList.remove('hidden');
  });

  window.abrirEditarEstudiante = function(usuario){
    const est = estudiantesCache.find(e => e.usuario === usuario);
    if(!est) return;
    document.getElementById('modalEstudianteTitle').textContent = 'Editar estudiante';
    document.getElementById('estUsuarioOriginal').value = est.usuario;
    document.getElementById('estUsuario').value = est.usuario;
    document.getElementById('estUsuario').disabled = true;
    document.getElementById('estNombre').value = est.nombre;
    document.getElementById('estEquipo').value = est.equipo || '';
    document.getElementById('estPassword').value = '';
    document.getElementById('estPassword').required = false;
    document.getElementById('passHint').textContent = '(dejar en blanco para no cambiarla)';
    document.getElementById('formEstudianteMsg').textContent = '';
    modalEstudiante.classList.remove('hidden');
  };

  document.getElementById('btnCancelarModal').addEventListener('click', () => {
    modalEstudiante.classList.add('hidden');
  });

  document.getElementById('formEstudiante').addEventListener('submit', async function(e){
    e.preventDefault();
    const msg = document.getElementById('formEstudianteMsg');
    const submitBtn = e.target.querySelector('.btn-primary');
    const usuarioOriginal = document.getElementById('estUsuarioOriginal').value;

    const payload = {
      usuario: document.getElementById('estUsuario').value.trim(),
      nombre: document.getElementById('estNombre').value.trim(),
      equipo: document.getElementById('estEquipo').value.trim(),
      password: document.getElementById('estPassword').value.trim()
    };

    submitBtn.disabled = true;
    msg.className = 'form-msg';
    msg.textContent = 'Guardando...';

    try{
      let data;
      if(usuarioOriginal){
        payload.action = 'actualizarEstudiante';
        payload.usuarioOriginal = usuarioOriginal;
        data = await apiPost(payload);
      } else {
        payload.action = 'agregarEstudiante';
        data = await apiPost(payload);
      }

      if(data.success){
        modalEstudiante.classList.add('hidden');
        cargarEstudiantes();
      } else {
        msg.className = 'form-msg err';
        msg.textContent = data.error || 'Ocurrió un error al guardar.';
      }
    }catch(err){
      msg.className = 'form-msg err';
      msg.textContent = 'Error de conexión con el servidor.';
    }finally{
      submitBtn.disabled = false;
    }
  });

  window.eliminarEstudianteUI = async function(usuario){
    if(!confirm(`¿Eliminar al estudiante "${usuario}"? Esta acción no se puede deshacer.`)) return;
    try{
      const data = await apiPost({ action:'eliminarEstudiante', usuario: usuario });
      if(data.success){
        cargarEstudiantes();
      } else {
        alert(data.error || 'No se pudo eliminar.');
      }
    }catch(err){
      alert('Error de conexión con el servidor.');
    }
  };

  // ================= CAMBIO OBLIGATORIO DE CONTRASEÑA (primer acceso) =================
  document.getElementById('formCambioPassword').addEventListener('submit', async function(e){
    e.preventDefault();
    const p1 = document.getElementById('nuevaPass1').value.trim();
    const p2 = document.getElementById('nuevaPass2').value.trim();
    const errorBox = document.getElementById('cambioPasswordError');
    const submitBtn = e.target.querySelector('.btn-primary');

    if(p1 !== p2){
      errorBox.textContent = 'Las contraseñas no coinciden.';
      return;
    }
    if(p1.length < 4){
      errorBox.textContent = 'La contraseña debe tener al menos 4 caracteres.';
      return;
    }

    errorBox.textContent = '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Guardando...';

    try{
      const data = await apiPost({ action:'cambiarPassword', usuario: currentUser.usuario, passwordNueva: p1 });
      if(data.success){
        document.getElementById('forcedPasswordScreen').classList.add('hidden');
        document.getElementById('formCambioPassword').reset();
        renderApp();
      } else {
        errorBox.textContent = data.error || 'No se pudo guardar la nueva contraseña.';
      }
    }catch(err){
      errorBox.textContent = 'Error de conexión con el servidor.';
    }finally{
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Guardar y continuar';
    }
  });

  // ================= EXPORTAR A EXCEL =================
  document.getElementById('btnExportarExcel').addEventListener('click', () => {
    if(estudiantesCache.length === 0){
      alert('No hay estudiantes para exportar.');
      return;
    }
    const filas = estudiantesCache.map(e => ({
      Usuario: e.usuario,
      Nombre: e.nombre,
      Equipo: e.equipo || '',
      FechaRegistro: e.fechaRegistro || ''
    }));
    const ws = XLSX.utils.json_to_sheet(filas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');
    XLSX.writeFile(wb, 'Estudiantes_GeneradorReportes.xlsx');
  });

  // ================= IMPORTAR DESDE EXCEL =================
  document.getElementById('btnImportarExcel').addEventListener('click', () => {
    document.getElementById('inputImportarExcel').click();
  });

  document.getElementById('inputImportarExcel').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = async function(evt){
      try{
        const wb = XLSX.read(evt.target.result, { type:'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const filas = XLSX.utils.sheet_to_json(ws, { defval:'' });

        const estudiantes = filas.map(f => ({
          usuario: String(f.Usuario || f.usuario || '').trim(),
          nombre: String(f.Nombre || f.nombre || '').trim(),
          equipo: String(f.Equipo || f.equipo || '').trim(),
          password: String(f.Contraseña || f.contraseña || f.Password || f.password || '').trim()
        })).filter(x => x.usuario && x.nombre);

        if(estudiantes.length === 0){
          alert('No se encontraron filas válidas. Verifica que el archivo tenga las columnas Usuario y Nombre.');
          return;
        }

        const btn = document.getElementById('btnImportarExcel');
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Importando...';

        const data = await apiPost({ action:'importarEstudiantes', estudiantes: estudiantes });

        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-file-arrow-up"></i> Importar desde Excel';

        if(data.success){
          let mensaje = `Se importaron ${data.agregados} estudiante(s).`;
          if(data.omitidos && data.omitidos.length > 0){
            mensaje += `\nOmitidos (usuario ya existente o datos incompletos): ${data.omitidos.join(', ')}`;
          }
          alert(mensaje);
          cargarEstudiantes();
        } else {
          alert(data.error || 'No se pudo completar la importación.');
        }
      }catch(err){
        alert('No se pudo leer el archivo. Verifica que sea un Excel válido (.xlsx).');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsArrayBuffer(file);
  });
