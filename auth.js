// ---------- Role tabs ----------
  document.getElementById('tabEstudiante').addEventListener('click', () => selectRole('estudiante'));
  document.getElementById('tabDocente').addEventListener('click', () => selectRole('docente'));
  function selectRole(role){
    selectedRole = role;
    document.getElementById('tabEstudiante').classList.toggle('active', role === 'estudiante');
    document.getElementById('tabDocente').classList.toggle('active', role === 'docente');
    document.getElementById('loginError').textContent = '';
  }

  // ---------- Login ----------
  document.getElementById('loginForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const user = document.getElementById('loginUser').value.trim();
    const pass = document.getElementById('loginPass').value.trim();
    const errorBox = document.getElementById('loginError');
    const submitBtn = e.target.querySelector('.btn-primary');

    if(CONFIG.API_URL.includes('PEGA_AQUI')){
      errorBox.textContent = 'Falta configurar la URL del backend (CONFIG.API_URL) en el código.';
      return;
    }

    errorBox.textContent = '';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verificando...';

    try{
      const data = await apiGet({ action:'login', usuario:user, password:pass, rol:selectedRole });
      if(data.success){
        currentUser = { rol: data.rol, nombre: data.nombre, usuario: data.usuario, equipo: data.equipo };
        if(data.primerAcceso){
          document.getElementById('loginScreen').classList.add('hidden');
          document.getElementById('forcedPasswordScreen').classList.remove('hidden');
        } else {
          renderApp();
        }
      } else {
        errorBox.textContent = data.error || 'Usuario o contraseña incorrectos.';
      }
    }catch(err){
      errorBox.textContent = 'No se pudo conectar con el servidor. Verifica tu conexión.';
    }finally{
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Ingresar';
    }
  });

  // ---------- Render app shell tras login ----------
  function renderApp(){
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('forcedPasswordScreen').classList.add('hidden');
    document.getElementById('appShell').classList.remove('hidden');

    document.getElementById('userName').textContent = currentUser.nombre;
    document.getElementById('userRole').textContent =
      currentUser.rol === 'docente' ? 'Docente — Administrador del sistema' : 'Estudiante';

    // Reinicia siempre a la vista principal del rol correspondiente,
    // ocultando cualquier submódulo (como Registro de estudiantes) que haya
    // quedado abierto de una sesión anterior en el mismo navegador.
    document.getElementById('panelRegistro').classList.add('hidden');
    document.querySelectorAll('.panel-secundario').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.panel-actividad-interactiva').forEach(p => p.classList.add('hidden'));
    document.getElementById('modalEstudiante').classList.add('hidden');

    document.getElementById('panelDocente').classList.toggle('hidden', currentUser.rol !== 'docente');
    document.getElementById('panelEstudiante').classList.toggle('hidden', currentUser.rol !== 'estudiante');
  }

  // ---------- Logout ----------
  document.getElementById('btnLogout').addEventListener('click', function(){
    currentUser = null;
    estudiantesCache = [];
    docenteOriginal = null;
    document.getElementById('impersonationBanner').classList.add('hidden');
    document.getElementById('appShell').classList.add('hidden');
    document.getElementById('panelRegistro').classList.add('hidden');
    document.querySelectorAll('.panel-secundario').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.panel-actividad-interactiva').forEach(p => p.classList.add('hidden'));
    document.getElementById('modalEstudiante').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').textContent = '';
  });
