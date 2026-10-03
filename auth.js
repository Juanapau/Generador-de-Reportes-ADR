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
    actualizarAvatarUsuario_();
    guardarSesionLocal_();

    // El menú de cambio de rol solo tiene sentido para quien es docente de verdad,
    // o mientras está en su propia vista previa de estudiante (para poder regresar).
    const puedeCambiarVista = (currentUser.rol === 'docente') || modoPreviewDocente;
    document.getElementById('userProfileCaret').classList.toggle('hidden', !puedeCambiarVista);
    document.getElementById('userProfileToggle').classList.toggle('con-menu', puedeCambiarVista);
    document.getElementById('rolDropdown').classList.add('hidden');
    if(puedeCambiarVista){
      const vistaEsEstudiante = modoPreviewDocente;
      document.getElementById('rolOpcionEstudiante').classList.toggle('activo', vistaEsEstudiante);
      document.getElementById('rolOpcionAdministrador').classList.toggle('activo', !vistaEsEstudiante);
    }

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

  // ---------- Menú de cambio de rol (vista previa de administrador) ----------
  document.getElementById('userProfileToggle').addEventListener('click', (e) => {
    if(!document.getElementById('userProfileToggle').classList.contains('con-menu')) return;
    e.stopPropagation();
    document.getElementById('rolDropdown').classList.toggle('hidden');
  });
  document.addEventListener('click', () => {
    document.getElementById('rolDropdown').classList.add('hidden');
  });

  document.getElementById('rolOpcionEstudiante').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('rolDropdown').classList.add('hidden');
    if(modoPreviewDocente) return; // ya está en vista de estudiante

    docenteOriginal = currentUser; // se guarda la sesión real del docente para poder regresar
    currentUser = { rol:'estudiante', usuario: docenteOriginal.usuario, nombre: docenteOriginal.nombre, equipo:'' };
    modoPreviewDocente = true;

    document.getElementById('panelRegistro').classList.add('hidden');
    renderApp();
    document.getElementById('previewDocenteBanner').classList.remove('hidden');
  });

  document.getElementById('rolOpcionAdministrador').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('rolDropdown').classList.add('hidden');
    if(!modoPreviewDocente || !docenteOriginal) return; // ya está en vista de administrador

    currentUser = docenteOriginal;
    docenteOriginal = null;
    modoPreviewDocente = false;
    document.getElementById('previewDocenteBanner').classList.add('hidden');
    renderApp();
  });

  document.getElementById('btnSalirPreviewDocente').addEventListener('click', () => {
    document.getElementById('rolOpcionAdministrador').click();
  });

  // ---------- Logout ----------
  document.getElementById('btnLogout').addEventListener('click', function(){
    currentUser = null;
    estudiantesCache = [];
    docenteOriginal = null;
    modoPreviewDocente = false;
    borrarSesionLocal_();
    document.getElementById('impersonationBanner').classList.add('hidden');
    document.getElementById('previewDocenteBanner').classList.add('hidden');
    document.getElementById('appShell').classList.add('hidden');
    document.getElementById('panelRegistro').classList.add('hidden');
    document.querySelectorAll('.panel-secundario').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.panel-actividad-interactiva').forEach(p => p.classList.add('hidden'));
    document.getElementById('modalEstudiante').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('loginForm').reset();
    document.getElementById('loginError').textContent = '';
  });

  // ---------- Foto del docente administrador ----------
  // Solo el docente (fuera de su propia vista previa de estudiante) muestra una
  // foto en vez del ícono genérico. Si el archivo "foto-docente.jpeg" no existe
  // todavía en el repositorio, simplemente se queda el ícono de siempre — no rompe nada.
  function actualizarAvatarUsuario_(){
    const img = document.getElementById('userAvatarImg');
    const icon = document.getElementById('userAvatarIcon');
    const esDocenteReal = currentUser && currentUser.rol === 'docente' && !modoPreviewDocente;

    if(!esDocenteReal){
      img.classList.add('hidden');
      icon.classList.remove('hidden');
      return;
    }

    img.onload = () => { img.classList.remove('hidden'); icon.classList.add('hidden'); };
    img.onerror = () => { img.classList.add('hidden'); icon.classList.remove('hidden'); };
    img.src = 'foto-docente.jpeg';
  }

  // ---------- Mantener la sesión iniciada al recargar la página ----------
  // Antes, la sesión solo vivía en memoria (la variable currentUser), así que
  // actualizar la página (o Ctrl+Shift+R) la perdía y volvía siempre al login.
  // Ahora se guarda una copia mínima (rol, nombre, usuario, equipo — nunca la
  // contraseña) en localStorage cada vez que se entra a la app, y al cargar la
  // página se restaura automáticamente esa sesión sin pedir credenciales de nuevo.
  const CLAVE_SESION_LOCAL_ = 'gr_sesion_activa';

  function guardarSesionLocal_(){
    try{
      // Si se está previsualizando como estudiante, lo que debe persistir es la
      // sesión real del docente, no la vista temporal de estudiante.
      const sesionReal = (modoPreviewDocente && docenteOriginal) ? docenteOriginal : currentUser;
      if(sesionReal) localStorage.setItem(CLAVE_SESION_LOCAL_, JSON.stringify(sesionReal));
    }catch(err){ /* almacenamiento no disponible (ej. modo incógnito estricto): se ignora */ }
  }

  function borrarSesionLocal_(){
    try{ localStorage.removeItem(CLAVE_SESION_LOCAL_); }catch(err){ /* se ignora */ }
  }

  (function restaurarSesionAlCargar_(){
    try{
      const guardada = localStorage.getItem(CLAVE_SESION_LOCAL_);
      if(!guardada) return;
      const sesion = JSON.parse(guardada);
      if(!sesion || !sesion.usuario || !sesion.rol) return;
      currentUser = sesion;
      renderApp();
    }catch(err){ /* si algo falla, simplemente se queda en la pantalla de login */ }
  })();
