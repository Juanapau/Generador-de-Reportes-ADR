// ============================================================================
// KIT DE GAMIFICACIÓN COMPARTIDO
// Funciones reutilizables por cualquier actividad: barra de progreso, contador
// animado, confeti, sacudida de error, logro/celebración, y arrastrar-soltar.
// Sin sonido (uso en aula con varios estudiantes a la vez).
// ============================================================================

// ---------- Barra de progreso (mientras se realiza la actividad) ----------
function actualizarBarraProgreso(containerId, actual, total){
  const cont = document.getElementById(containerId);
  if(!cont) return;
  const pct = total > 0 ? Math.round((actual / total) * 100) : 0;
  cont.innerHTML = `
    <div class="progreso-barra-texto">${actual} de ${total} completados</div>
    <div class="progreso-barra-wrap">
      <div class="progreso-barra-fill" style="width:${pct}%"></div>
    </div>`;
}

// ---------- Contador animado (para la nota final) ----------
function animarContador(el, desde, hasta, duracionMs){
  if(!el) return;
  const inicio = performance.now();
  function paso(ahora){
    const t = Math.min((ahora - inicio) / (duracionMs || 900), 1);
    const valor = desde + (hasta - desde) * t;
    el.textContent = valor.toFixed(2);
    if(t < 1) requestAnimationFrame(paso);
    else el.textContent = Number(hasta).toFixed(2);
  }
  requestAnimationFrame(paso);
}

// ---------- Confeti (celebración visual, sin sonido) ----------
function dispararConfeti(){
  const colores = ['#4fa3ff', '#e8b93b', '#22c55e', '#ef4444', '#a855f7'];
  const cont = document.createElement('div');
  cont.className = 'confeti-contenedor';
  document.body.appendChild(cont);
  for(let i = 0; i < 60; i++){
    const pieza = document.createElement('div');
    pieza.className = 'confeti-pieza';
    pieza.style.left = (Math.random() * 100) + 'vw';
    pieza.style.background = colores[Math.floor(Math.random() * colores.length)];
    pieza.style.animationDuration = (2 + Math.random() * 1.5) + 's';
    pieza.style.animationDelay = (Math.random() * 0.4) + 's';
    cont.appendChild(pieza);
  }
  setTimeout(() => cont.remove(), 3600);
}

// ---------- Sacudida (retroalimentación visual de error) ----------
function sacudir(el){
  if(!el) return;
  el.classList.remove('anim-sacudir');
  void el.offsetWidth; // fuerza reinicio de la animación
  el.classList.add('anim-sacudir');
}

// ---------- Logro / celebración (mensaje flotante al terminar) ----------
// ---------- Desglose coloreado de preguntas y respuestas (pantalla) ----------
// Usa la MISMA estructura de datos ("detalle") que alimenta el PDF, para que lo
// que se ve en pantalla y lo que se descarga siempre coincidan exactamente.
function renderDesgloseColoreado(containerId, detalle){
  const cont = document.getElementById(containerId);
  if(!cont) return;
  if(!detalle || !detalle.length){
    cont.innerHTML = '<p class="empty-note" style="margin-top:0;">No hay detalle disponible para esta actividad.</p>';
    return;
  }

  cont.innerHTML = detalle.map(seccion => `
    <div class="section-heading" style="font-size:16px;">${seccion.titulo}</div>
    <div class="esquema-reporte">
      ${seccion.items.map(item => `
        <div class="esquema-zona ${item.correcta ? 'correcto' : 'incorrecto'}">
          <div style="flex:1;">
            <div class="esquema-zona-tag">${item.pregunta}</div>
            <div class="esquema-zona-slot">
              <span class="esquema-zona-etiqueta">Tu respuesta: ${item.tuRespuesta}</span>
              ${(!item.correcta && item.respuestaCorrecta) ? `<div style="margin-top:6px; font-size:12.5px; opacity:.8;">Correcta: ${item.respuestaCorrecta}</div>` : ''}
            </div>
          </div>
          <i class="fa-solid ${item.correcta ? 'fa-check' : 'fa-xmark'}"></i>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function mostrarLogro(mensaje, icono){
  const popup = document.createElement('div');
  popup.className = 'logro-popup';
  popup.innerHTML = `<i class="fa-solid ${icono || 'fa-trophy'}"></i><span>${mensaje}</span>`;
  document.body.appendChild(popup);
  requestAnimationFrame(() => popup.classList.add('show'));
  setTimeout(() => {
    popup.classList.remove('show');
    setTimeout(() => popup.remove(), 400);
  }, 3000);
}

// ---------- Arrastrar y soltar (complementa la selección por clic, no la reemplaza) ----------
// items: NodeList de elementos .clasif-item con draggable="true" (dentro del banco)
// zonas: array de elementos zona sobre los que se puede soltar
// onDrop(idArrastrado, zonaEl): se ejecuta al soltar un ítem sobre una zona válida
function habilitarArrastre(items, zonas, onDrop){
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.dataset.id !== undefined ? item.dataset.id : item.dataset.etiqueta);
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
  });
  zonas.forEach(zona => {
    zona.addEventListener('dragover', (e) => { e.preventDefault(); zona.classList.add('clasif-zona-dragover'); });
    zona.addEventListener('dragleave', () => zona.classList.remove('clasif-zona-dragover'));
    zona.addEventListener('drop', (e) => {
      e.preventDefault();
      zona.classList.remove('clasif-zona-dragover');
      const valor = e.dataTransfer.getData('text/plain');
      onDrop(valor, zona);
    });
  });
}
