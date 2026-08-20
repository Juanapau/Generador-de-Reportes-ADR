// ---------- CONFIGURACIÓN ----------
  // 👉 Pega aquí la URL de tu Apps Script (termina en /exec) luego de implementarlo.
  const CONFIG = {
    API_URL: 'https://script.google.com/macros/s/AKfycbxz34BwiamnGlgacedLeicRxt9F5yY8agA8lfGpVsvogt_O19wZR9aCFuQEZVo6Kkaf/exec'
  };

  // ---------- Estado de sesión (en memoria, sin localStorage) ----------
  let currentUser = null;
  let selectedRole = 'estudiante';
  let estudiantesCache = [];
  let docenteOriginal = null; // guarda al docente cuando está "viendo como" un estudiante

  // ---------- Helper de conexión ----------
  async function apiGet(params){
    // Se agrega un parámetro anti-caché (_t) y cache:'no-store' porque el navegador
    // puede reutilizar una respuesta anterior para la misma URL (ej. el login),
    // devolviendo datos desactualizados como el estado de "primer acceso".
    const allParams = { ...params, _t: Date.now() };
    const url = CONFIG.API_URL + '?' + new URLSearchParams(allParams).toString();
    const res = await fetch(url, { cache: 'no-store' });
    return res.json();
  }
  async function apiPost(data){
    const res = await fetch(CONFIG.API_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return res.json();
  }

  // ---------- Registro de actividades interactivas ----------
  // Cada actividad interactiva (A.1.1, A.1.2...) se registra aquí sola,
  // al final de su propio archivo, para que "Mis actividades" sepa
  // cómo abrirla sin que ningún otro archivo tenga que conocerla.
  const actividadesInteractivas = {};
  function registrarActividadInteractiva(codigo, funcionAbrir){
    actividadesInteractivas[codigo] = funcionAbrir;
  }

  // ---------- Recursos de una actividad (reutilizable por cualquier actividad interactiva) ----------
  // ---------- Utilidad de mezclado (usada por cualquier actividad para evitar patrones) ----------
  function barajar(arr){
    const copia = [...arr];
    for(let i = copia.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  async function cargarRecursosActividad(codigo, containerId){
    const cont = document.getElementById(containerId);
    if(!cont) return;
    try{
      const data = await apiGet({ action:'listarRecursos', codigo });
      if(!data.success || data.recursos.length === 0){
        cont.innerHTML = '<div style="font-size:14px; opacity:.6; padding:6px 0;">Tu docente no ha agregado recursos para esta actividad.</div>';
        return;
      }
      cont.innerHTML = data.recursos.map(r => `
        <a href="${r.url}" target="_blank" rel="noopener" class="recurso-item">
          <i class="fa-solid ${r.tipo === 'archivo' ? 'fa-file-lines' : 'fa-link'}"></i>
          <span>${r.nombre}</span>
          <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left:auto; opacity:.6;"></i>
        </a>
      `).join('');
    }catch(err){
      cont.innerHTML = '<div style="font-size:14px; opacity:.6;">No se pudieron cargar los recursos.</div>';
    }
  }
