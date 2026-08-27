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
  // ---------- Información de los 5 RA (compartida entre panel docente y estudiante) ----------
  const RA_INFO = {
    RA1: { icono:'fa-clipboard-list', color:'blue',  descripcion:'Clasificar los requerimientos de información de los diversos usuarios para producir reportes empresariales, siguiendo parámetros establecidos.' },
    RA2: { icono:'fa-table-cells-large', color:'gold', descripcion:'Aplicar los conocimientos recibidos para la creación de reportes empresariales funcionales y oportunos, según requerimientos del usuario.' },
    RA3: { icono:'fa-code',           color:'green', descripcion:'Presentar o entregar reportes que cumplan los requerimientos de información, según criterios definidos por la organización.' },
    RA4: { icono:'fa-chart-line',     color:'blue',  descripcion:'Medir parámetros e indicadores para mejorar estrategias de marketing digital implementando los correctivos en las pautas recibidas.' },
    RA5: { icono:'fa-robot',          color:'gold',  descripcion:'Integrar repositorios de tableros con algoritmos de Big Data o Inteligencia Artificial para descubrir patrones y tendencias.' }
  };

  // ---------- Notificaciones tipo toast (reemplaza alert() nativo) ----------
  function mostrarNotificacion(mensaje, tipo){
    tipo = tipo || 'info'; // 'success' | 'error' | 'info'
    const iconos = { success:'fa-circle-check', error:'fa-circle-exclamation', info:'fa-circle-info' };
    const cont = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `<i class="fa-solid ${iconos[tipo] || iconos.info}"></i><span>${mensaje}</span>`;
    cont.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ---------- Modal de confirmación (reemplaza confirm() nativo) ----------
  // Uso: if(await confirmarAccion('¿Eliminar este recurso?')) { ... }
  function confirmarAccion(mensaje, titulo){
    return new Promise(resolve => {
      const modal = document.getElementById('modalConfirmacion');
      document.getElementById('confirmTitulo').textContent = titulo || '¿Estás segura?';
      document.getElementById('confirmMensaje').textContent = mensaje;
      modal.classList.remove('hidden');

      const btnAceptar = document.getElementById('confirmAceptar');
      const btnCancelar = document.getElementById('confirmCancelar');

      function limpiar(resultado){
        modal.classList.add('hidden');
        btnAceptar.removeEventListener('click', onAceptar);
        btnCancelar.removeEventListener('click', onCancelar);
        resolve(resultado);
      }
      function onAceptar(){ limpiar(true); }
      function onCancelar(){ limpiar(false); }

      btnAceptar.addEventListener('click', onAceptar);
      btnCancelar.addEventListener('click', onCancelar);
    });
  }

  // ---------- Formato corto de fecha para mostrar al estudiante ----------
  function formatearFechaCorta(fecha){
    if(!fecha) return '';
    return fecha.toLocaleString('es-DO', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
  }

  function pintarTarjetasRA(items){
    return items.map(({ ra, disponible }) => {
      const info = RA_INFO[ra];
      return `
        <div class="ra-card ${disponible ? '' : 'ra-card-disabled'}" data-ra="${ra}">
          <div class="ra-card-icon ra-icon-${info.color}"><i class="fa-solid ${info.icono}"></i></div>
          <div class="ra-card-titulo">${ra}</div>
          <div class="ra-card-desc">${info.descripcion}</div>
          <div class="ra-card-sub">${disponible ? 'Ver actividades' : 'Próximamente'}</div>
        </div>`;
    }).join('');
  }

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

  // ---------- Tablas de datos compartidas (reutilizable por cualquier actividad) ----------
  // Devuelve { campos: [...], datos: [...] } o null si falla.
  // ---------- Limpieza de texto casi invisible en contenido enriquecido ----------
  // Corrige de raíz (y retroactivamente) el bug de texto blanco "horneado" por el navegador
  // al usar contenteditable: si un color guardado es casi blanco, se quita para que el texto
  // vuelva a heredar el color correcto según el tema (claro u oscuro) de quien lo esté viendo.
  function colorACanalesRgb(colorStr){
    const d = document.createElement('div');
    d.style.color = colorStr;
    document.body.appendChild(d);
    const computado = getComputedStyle(d).color;
    document.body.removeChild(d);
    const match = computado.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if(!match) return null;
    return { r:+match[1], g:+match[2], b:+match[3] };
  }

  function limpiarColoresCasiBlancos(html){
    if(!html) return html;
    const temp = document.createElement('div');
    temp.innerHTML = html;

    temp.querySelectorAll('[style*="color"]').forEach(el => {
      if(!el.style.color) return;
      const rgb = colorACanalesRgb(el.style.color);
      if(rgb){
        const luminancia = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        if(luminancia > 235){
          el.style.removeProperty('color');
          if(!el.getAttribute('style')) el.removeAttribute('style');
        }
      }
    });

    temp.querySelectorAll('font[color]').forEach(el => {
      const rgb = colorACanalesRgb(el.getAttribute('color'));
      if(rgb){
        const luminancia = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        if(luminancia > 235) el.removeAttribute('color');
      }
    });

    return temp.innerHTML;
  }

  async function cargarTablaDatos(tabla){
    try{
      const data = await apiGet({ action:'listarTablaDatos', tabla });
      if(!data.success) return null;
      return { campos: data.campos, datos: data.datos };
    }catch(err){
      return null;
    }
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
