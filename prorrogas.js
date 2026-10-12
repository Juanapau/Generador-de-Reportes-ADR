// ============================================================
// PRÓRROGAS POR ESTUDIANTE
// Permite al docente darle a un estudiante una fecha de inicio/cierre distinta
// a la general de la actividad (por ausencia justificada, etc.).
// La validación real la hace el servidor, así que cambiar la hora de la PC no sirve.
// ============================================================
let estudiantesProrrogasCache = null;

function escHtmlPr_(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

async function cargarEstudiantesProrrogas_(){
  if(estudiantesProrrogasCache) return estudiantesProrrogasCache;
  const data = await apiGet({ action:'listarEstudiantes' });
  if(!data.success) throw new Error('No se pudo cargar la lista de estudiantes.');
  estudiantesProrrogasCache = data.estudiantes.slice().sort((a, b) => (a.nombre || a.usuario || '').localeCompare(b.nombre || b.usuario || ''));
  return estudiantesProrrogasCache;
}

// codigo: código de la actividad; tipo: 'normal' | 'extra'
function montarPanelProrrogas_(card, codigo, tipo){
  const cont = card.querySelector('.prorrogas-section');
  if(!cont) return;

  cont.innerHTML = `
    <button type="button" class="prorrogas-toggle">
      <i class="fa-solid fa-user-clock"></i> Prórrogas por estudiante
      <span class="prorrogas-count"></span>
      <i class="fa-solid fa-chevron-down prorrogas-chevron"></i>
    </button>
    <div class="prorrogas-body" style="display:none;">
      <div class="empty-note" style="margin:0 0 12px; padding:10px 14px; font-size:12.5px;">
        <i class="fa-solid fa-circle-info"></i>
        Aquí puedes darle a un estudiante una fecha distinta a la general (por ejemplo, por una ausencia justificada).
        Solo le afecta a él o ella. Si dejas una fecha vacía, se usa la general. La actividad debe estar <b>habilitada</b>.
      </div>
      <div class="prorrogas-lista"><div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div></div>
      <div class="prorrogas-form">
        <div class="prorrogas-form-titulo">Dar una prórroga</div>
        <div class="prorrogas-fila">
          <div class="puntaje-field" style="flex:2; min-width:200px;">
            <label>Estudiante</label>
            <select class="pr-estudiante"><option value="">Cargando estudiantes...</option></select>
          </div>
          <div class="puntaje-field">
            <label>Disponible desde</label>
            <input type="datetime-local" class="pr-inicio">
          </div>
          <div class="puntaje-field">
            <label>Disponible hasta</label>
            <input type="datetime-local" class="pr-fin">
          </div>
        </div>
        <div class="puntaje-field" style="margin-top:10px;">
          <label>Motivo (opcional, solo lo ve el docente)</label>
          <input type="text" class="pr-motivo" maxlength="200" placeholder="Ej.: Ausencia justificada por enfermedad">
        </div>
        <div class="pr-otras" style="display:none;"></div>
        <div style="margin-top:12px;">
          <button type="button" class="btn-add pr-guardar"><i class="fa-solid fa-user-clock"></i> Dar prórroga</button>
        </div>
      </div>
    </div>
  `;

  const toggle = cont.querySelector('.prorrogas-toggle');
  const body = cont.querySelector('.prorrogas-body');
  const lista = cont.querySelector('.prorrogas-lista');
  const selEst = cont.querySelector('.pr-estudiante');
  const otras = cont.querySelector('.pr-otras');
  const contador = cont.querySelector('.prorrogas-count');
  let cargado = false;

  function pintarOtras(){
    const fuente = tipo === 'extra'
      ? (typeof actividadesExtraCache !== 'undefined' ? actividadesExtraCache : [])
      : (typeof actividadesCache !== 'undefined' ? actividadesCache : []);
    const resto = fuente.filter(a => a.codigo !== codigo);
    if(resto.length === 0){ otras.style.display = 'none'; otras.innerHTML = ''; return; }
    otras.style.display = 'block';
    otras.innerHTML = `
      <div class="pr-otras-titulo">Aplicar también a otras actividades (opcional)</div>
      <div class="pr-otras-lista">
        ${resto.map(a => `
          <label class="pr-otra-item">
            <input type="checkbox" value="${escHtmlPr_(a.codigo)}">
            <span>${escHtmlPr_(a.codigo)}${a.titulo ? ' · ' + escHtmlPr_(a.titulo) : ''}</span>
          </label>`).join('')}
      </div>`;
  }

  async function refrescarLista(){
    lista.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div>';
    try{
      const data = await apiGet({ action:'listarProrrogas', codigo });
      if(!data.success){ lista.innerHTML = '<div class="empty-note">No se pudieron cargar las prórrogas.</div>'; return; }
      const items = data.prorrogas || [];
      contador.textContent = items.length ? items.length : '';
      if(items.length === 0){
        lista.innerHTML = '<div class="empty-note" style="margin:0 0 12px;">Nadie tiene prórroga en esta actividad.</div>';
        return;
      }
      lista.innerHTML = items.map(p => `
        <div class="prorroga-item" data-usuario="${escHtmlPr_(p.usuario)}">
          <div class="prorroga-info">
            <div class="prorroga-nombre">${escHtmlPr_(p.nombre || p.usuario)} <span class="prorroga-user">(${escHtmlPr_(p.usuario)})</span></div>
            <div class="prorroga-fechas">
              <i class="fa-solid fa-calendar-days"></i>
              ${p.fechaInicio ? 'Desde ' + escHtmlPr_(formatearFechaCorta(p.fechaInicio)) : 'Desde: fecha general'} ·
              ${p.fechaFin ? 'Hasta ' + escHtmlPr_(formatearFechaCorta(p.fechaFin)) : 'Hasta: fecha general'}
            </div>
            ${p.motivo ? `<div class="prorroga-motivo"><i class="fa-solid fa-comment"></i> ${escHtmlPr_(p.motivo)}</div>` : ''}
          </div>
          <button type="button" class="btn-icon-danger pr-eliminar" title="Quitar prórroga"><i class="fa-solid fa-trash"></i></button>
        </div>`).join('');

      lista.querySelectorAll('.pr-eliminar').forEach(btn => {
        btn.addEventListener('click', async () => {
          const usuario = btn.closest('.prorroga-item').dataset.usuario;
          if(!await confirmarAccion('¿Quitar la prórroga de este estudiante? Volverá a regirse por la fecha general.', 'Quitar prórroga')) return;
          try{
            const r = await apiPost({ action:'eliminarProrroga', usuario, codigo });
            if(r.success){ mostrarNotificacion('Prórroga eliminada.', 'success'); refrescarLista(); }
            else mostrarNotificacion(r.error || 'No se pudo eliminar.', 'error');
          }catch(err){ mostrarNotificacion('Error de conexión con el servidor.', 'error'); }
        });
      });
    }catch(err){
      lista.innerHTML = '<div class="empty-note">Error de conexión al cargar las prórrogas.</div>';
    }
  }

  async function abrir(){
    body.style.display = 'block';
    cont.classList.add('abierto');
    pintarOtras();
    if(cargado) return;
    cargado = true;
    refrescarLista();
    try{
      const ests = await cargarEstudiantesProrrogas_();
      selEst.innerHTML = '<option value="">— Selecciona un estudiante —</option>' +
        ests.map(e => `<option value="${escHtmlPr_(e.usuario)}">${escHtmlPr_(e.nombre || e.usuario)} (${escHtmlPr_(e.usuario)})</option>`).join('');
    }catch(err){
      selEst.innerHTML = '<option value="">No se pudo cargar la lista</option>';
    }
  }

  toggle.addEventListener('click', () => {
    if(body.style.display === 'none') abrir();
    else { body.style.display = 'none'; cont.classList.remove('abierto'); }
  });

  cont.querySelector('.pr-guardar').addEventListener('click', async (ev) => {
    const btn = ev.currentTarget;
    const usuario = selEst.value;
    const fechaInicio = cont.querySelector('.pr-inicio').value;
    const fechaFin = cont.querySelector('.pr-fin').value;
    const motivo = cont.querySelector('.pr-motivo').value.trim();
    if(!usuario){ mostrarNotificacion('Selecciona un estudiante.', 'error'); return; }
    if(!fechaInicio && !fechaFin){ mostrarNotificacion('Indica al menos una fecha (desde o hasta).', 'error'); return; }
    if(fechaInicio && fechaFin && fechaFin <= fechaInicio){ mostrarNotificacion('La fecha "hasta" debe ser posterior a "desde".', 'error'); return; }
    const codigos = [codigo].concat(Array.from(otras.querySelectorAll('input[type=checkbox]:checked')).map(c => c.value));

    btn.disabled = true;
    try{
      const r = await apiPost({ action:'guardarProrroga', usuario, codigos, fechaInicio, fechaFin, motivo });
      if(r.success){
        mostrarNotificacion(codigos.length > 1 ? `Prórroga guardada en ${codigos.length} actividades.` : 'Prórroga guardada.', 'success');
        selEst.value = '';
        cont.querySelector('.pr-inicio').value = '';
        cont.querySelector('.pr-fin').value = '';
        cont.querySelector('.pr-motivo').value = '';
        otras.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);
        refrescarLista();
      } else {
        mostrarNotificacion(r.error || 'No se pudo guardar la prórroga.', 'error');
      }
    }catch(err){
      mostrarNotificacion('Error de conexión con el servidor.', 'error');
    }finally{
      btn.disabled = false;
    }
  });
}
