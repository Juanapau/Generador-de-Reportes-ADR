// ============================================================================
// PANEL ADMINISTRATIVO AVANZADO — Calificaciones y avances, Reportes PDF/Excel,
// y Configuración general del sistema.
// ============================================================================

  const RAS_TODAS_ADMIN = ['RA1', 'RA2', 'RA3', 'RA4', 'RA5'];
  let raActualCalificaciones = 'RA1';
  let ultimoDetalleEstudianteData = null;

// ============================================================================
// CALIFICACIONES Y AVANCES — tabla general + detalle por estudiante
// ============================================================================

  document.getElementById('cardCalificacionesAvances').addEventListener('click', () => {
    document.getElementById('panelDocente').classList.add('hidden');
    document.getElementById('panelCalificacionesAvances').classList.remove('hidden');
    pintarSelectorRACalificaciones();
    cargarTablaCalificacionesAvances(raActualCalificaciones);
  });

  document.getElementById('btnBackFromCalificacionesAvances').addEventListener('click', () => {
    document.getElementById('panelCalificacionesAvances').classList.add('hidden');
    document.getElementById('panelDocente').classList.remove('hidden');
  });

  function pintarSelectorRACalificaciones(){
    const cont = document.getElementById('selectorRACalificaciones');
    cont.innerHTML = RAS_TODAS_ADMIN.map(ra => `
      <button type="button" class="role-tab ${ra === raActualCalificaciones ? 'active' : ''}" data-ra="${ra}">${ra}</button>
    `).join('');
    cont.querySelectorAll('.role-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        raActualCalificaciones = btn.dataset.ra;
        cont.querySelectorAll('.role-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        cargarTablaCalificacionesAvances(raActualCalificaciones);
      });
    });
  }

  async function cargarTablaCalificacionesAvances(ra){
    const wrap = document.getElementById('tablaCalificacionesAvancesWrap');
    wrap.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando calificaciones...</div>';

    try{
      const [dataEst, dataAct, dataCal] = await Promise.all([
        apiGet({ action:'listarEstudiantes' }),
        apiGet({ action:'listarActividades', ra }),
        apiGet({ action:'listarCalificacionesPorRA', ra })
      ]);

      if(!dataEst.success){
        wrap.innerHTML = '<div class="empty-table-msg">No se pudo cargar la lista de estudiantes.</div>';
        return;
      }

      const estudiantes = dataEst.estudiantes.slice().sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
      const actividades = (dataAct.success ? dataAct.actividades : []).slice()
        .sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), undefined, { numeric:true }));

      if(actividades.length === 0){
        wrap.innerHTML = `<div class="empty-table-msg">Este RA todavía no tiene actividades creadas.</div>`;
        return;
      }
      if(estudiantes.length === 0){
        wrap.innerHTML = `<div class="empty-table-msg">Todavía no hay estudiantes registrados.</div>`;
        return;
      }

      const notasPorClave = {};
      if(dataCal.success) dataCal.calificaciones.forEach(c => { notasPorClave[`${c.usuario}|${c.codigo}`] = c; });

      wrap.innerHTML = `
        <div class="tabla-cumplimiento-scroll">
          <table class="tabla-cumplimiento">
            <thead>
              <tr>
                <th class="col-estudiante">Estudiante</th>
                ${actividades.map(a => `<th>${a.codigo}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${estudiantes.map(est => `
                <tr>
                  <td class="col-estudiante">
                    <span class="fila-calificaciones-nombre" data-usuario="${est.usuario}" data-nombre="${(est.nombre || est.usuario).replace(/"/g,'&quot;')}">
                      ${est.nombre || est.usuario}
                    </span>
                  </td>
                  ${actividades.map(a => {
                    const c = notasPorClave[`${est.usuario}|${a.codigo}`];
                    return `<td>${c ? `${c.nota}/${c.puntajeMaximo}` : '—'}</td>`;
                  }).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`;

      wrap.querySelectorAll('.fila-calificaciones-nombre').forEach(el => {
        el.addEventListener('click', () => abrirDetalleEstudianteCalificaciones(el.dataset.usuario, el.dataset.nombre));
      });
    }catch(err){
      wrap.innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

  // ---------- Detalle de un estudiante ----------
  document.getElementById('btnBackFromDetalleEstudianteCalificaciones').addEventListener('click', () => {
    document.getElementById('panelDetalleEstudianteCalificaciones').classList.add('hidden');
    document.getElementById('panelCalificacionesAvances').classList.remove('hidden');
  });

  // Trae y arma el resumen completo de un estudiante (todas las RA + actividades extra calificadas).
  // Lo usan tanto la vista de detalle como el generador de PDF individual.
  async function obtenerResumenCompletoEstudiante(usuario, nombre){
    const [dataCal, dataResp, dataActExtra] = await Promise.all([
      apiGet({ action:'listarCalificaciones', usuario }),
      apiGet({ action:'listarRespuestasExtra', usuario }),
      apiGet({ action:'listarActividadesExtra' })
    ]);

    const calificaciones = dataCal.success ? dataCal.calificaciones : [];
    const respuestasExtra = dataResp.success ? dataResp.respuestas.filter(r => r.estado === 'calificado') : [];
    const actividadesExtraTodas = dataActExtra.success ? dataActExtra.actividades : [];

    let puntosObtenidos = 0, puntosPosibles = 0;
    calificaciones.forEach(c => { puntosObtenidos += Number(c.nota) || 0; puntosPosibles += Number(c.puntajeMaximo) || 0; });
    respuestasExtra.forEach(r => { puntosObtenidos += Number(r.nota) || 0; puntosPosibles += Number(r.puntajeMaximo) || 0; });
    const porcentaje = puntosPosibles > 0 ? Math.round((puntosObtenidos / puntosPosibles) * 100) : 0;

    return { usuario, nombre, calificaciones, respuestasExtra, actividadesExtraTodas, puntosObtenidos, puntosPosibles, porcentaje };
  }

  async function abrirDetalleEstudianteCalificaciones(usuario, nombre){
    document.getElementById('panelCalificacionesAvances').classList.add('hidden');
    document.getElementById('panelDetalleEstudianteCalificaciones').classList.remove('hidden');
    document.getElementById('tituloDetalleEstudianteCalificaciones').textContent = `Calificaciones de ${nombre}`;
    document.getElementById('resumenEstudianteWrap').innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando...</div>';
    document.getElementById('detalleEstudianteCalificacionesWrap').innerHTML = '';

    try{
      const data = await obtenerResumenCompletoEstudiante(usuario, nombre);
      ultimoDetalleEstudianteData = data;

      document.getElementById('resumenEstudianteWrap').innerHTML = `
        <div class="resumen-estudiante-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <div style="font-family:var(--font-display); font-size:26px;">${data.puntosObtenidos.toFixed(2)} <span style="font-size:14px; opacity:.7; font-family:inherit;">/ ${data.puntosPosibles.toFixed(2)} pts</span></div>
              <div style="font-size:13px; color:var(--dark-text-dim); margin-top:4px;">${data.calificaciones.length + data.respuestasExtra.length} actividades completadas</div>
            </div>
            <div style="font-family:var(--font-display); font-size:26px; color:var(--dark-green-accent); background:rgba(34,197,94,.15); padding:6px 16px; border-radius:12px;">${data.porcentaje}%</div>
          </div>
        </div>`;

      const porRA = {};
      data.calificaciones.forEach(c => { if(!porRA[c.ra]) porRA[c.ra] = []; porRA[c.ra].push(c); });
      const rasOrdenados = Object.keys(porRA).sort();

      let html = rasOrdenados.map(ra => `
        <div class="progreso-ra-grupo">
          <div class="progreso-ra-titulo"><i class="fa-solid fa-layer-group"></i> ${ra}</div>
          ${porRA[ra].map(c => `
            <div class="progreso-item-card">
              <div class="progreso-item-info">
                <div class="progreso-item-codigo">${c.codigo}</div>
                <div class="progreso-item-fecha">Completada: ${formatearFechaCorta(c.fecha) || '—'}</div>
              </div>
              <span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> ${c.nota}/${c.puntajeMaximo} pts</span>
            </div>
          `).join('')}
        </div>
      `).join('');

      if(data.respuestasExtra.length > 0){
        html += `
          <div class="progreso-ra-grupo">
            <div class="progreso-ra-titulo"><i class="fa-solid fa-star"></i> Actividades Extra</div>
            ${data.respuestasExtra.map(r => {
              const act = data.actividadesExtraTodas.find(a => a.codigo === r.codigo);
              return `
                <div class="progreso-item-card">
                  <div class="progreso-item-info">
                    <div class="progreso-item-codigo">${act ? act.titulo : r.codigo}</div>
                    <div class="progreso-item-fecha">Calificada: ${formatearFechaCorta(r.fechaCalificacion) || '—'}</div>
                  </div>
                  <span class="estado-badge estado-activa"><i class="fa-solid fa-circle-check"></i> ${r.nota}/${r.puntajeMaximo} pts</span>
                </div>`;
            }).join('')}
          </div>`;
      }

      if(data.calificaciones.length === 0 && data.respuestasExtra.length === 0){
        html = '<div class="empty-note"><i class="fa-solid fa-circle-info"></i> Este estudiante todavía no ha completado ninguna actividad.</div>';
      }

      document.getElementById('detalleEstudianteCalificacionesWrap').innerHTML = html;
    }catch(err){
      document.getElementById('resumenEstudianteWrap').innerHTML = '<div class="empty-table-msg">Error de conexión con el servidor.</div>';
    }
  }

  document.getElementById('btnDescargarPdfResumenEstudiante').addEventListener('click', () => {
    if(!ultimoDetalleEstudianteData) return;
    generarPdfResumenEstudiante(ultimoDetalleEstudianteData);
  });

// ============================================================================
// REPORTES PDF / EXCEL
// ============================================================================

  document.getElementById('cardReportes').addEventListener('click', async () => {
    document.getElementById('panelDocente').classList.add('hidden');
    document.getElementById('panelReportes').classList.remove('hidden');

    const selectRA = document.getElementById('selectRAReporteExcel');
    selectRA.innerHTML = RAS_TODAS_ADMIN.map(ra => `<option value="${ra}">${ra}</option>`).join('');

    const selectEst = document.getElementById('selectEstudianteReportePDF');
    selectEst.innerHTML = '<option value="">Selecciona un estudiante...</option>';
    try{
      const data = await apiGet({ action:'listarEstudiantes' });
      if(data.success){
        data.estudiantes.slice().sort((a, b) => (a.nombre || '').localeCompare(b.nombre || '')).forEach(e => {
          const opt = document.createElement('option');
          opt.value = e.usuario;
          opt.textContent = e.nombre || e.usuario;
          selectEst.appendChild(opt);
        });
      }
    }catch(err){ /* el select se queda solo con la opción por defecto */ }
  });

  document.getElementById('btnBackFromReportes').addEventListener('click', () => {
    document.getElementById('panelReportes').classList.add('hidden');
    document.getElementById('panelDocente').classList.remove('hidden');
  });

  document.getElementById('btnGenerarReportePDF').addEventListener('click', async () => {
    const select = document.getElementById('selectEstudianteReportePDF');
    const usuario = select.value;
    if(!usuario){ mostrarNotificacion('Selecciona un estudiante primero.', 'error'); return; }
    const nombre = select.selectedOptions[0].textContent;

    const btn = document.getElementById('btnGenerarReportePDF');
    btn.disabled = true;
    try{
      const data = await obtenerResumenCompletoEstudiante(usuario, nombre);
      generarPdfResumenEstudiante(data);
    }catch(err){
      mostrarNotificacion('Error de conexión con el servidor.', 'error');
    }finally{
      btn.disabled = false;
    }
  });

  // PDF de resumen general de un estudiante (distinto del PDF por actividad que ya existía)
  function generarPdfResumenEstudiante(data){
    if(!window.jspdf){
      mostrarNotificacion('No se pudo cargar el generador de PDF. Verifica tu conexión e intenta de nuevo.', 'error');
      return;
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const margenIzq = 14;
    let y = 20;

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 26, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(17);
    doc.setFont(undefined, 'bold');
    doc.text(`Resumen de calificaciones — ${data.nombre}`, margenIzq, 16);

    doc.setTextColor(30, 30, 30);
    y = 36;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Usuario: ${data.usuario}`, margenIzq, y); y += 6;
    doc.text(`Fecha del reporte: ${formatearFechaCorta(new Date())}`, margenIzq, y); y += 10;

    doc.setDrawColor(210);
    doc.line(margenIzq, y, 196, y);
    y += 8;

    doc.setFillColor(184, 121, 15);
    doc.roundedRect(margenIzq, y - 6, 182, 12, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text(`Total: ${data.puntosObtenidos.toFixed(2)} / ${data.puntosPosibles.toFixed(2)} pts (${data.porcentaje}%)`, margenIzq + 4, y + 2);
    doc.setTextColor(30, 30, 30);
    y += 18;

    const filas = [];
    data.calificaciones.forEach(c => filas.push([c.codigo, c.ra, `${c.nota}/${c.puntajeMaximo}`, formatearFechaCorta(c.fecha) || '—']));
    data.respuestasExtra.forEach(r => {
      const act = data.actividadesExtraTodas.find(a => a.codigo === r.codigo);
      filas.push([act ? act.titulo : r.codigo, 'Extra', `${r.nota}/${r.puntajeMaximo}`, formatearFechaCorta(r.fechaCalificacion) || '—']);
    });

    if(filas.length === 0){
      doc.setFontSize(11);
      doc.text('Este estudiante todavía no ha completado ninguna actividad.', margenIzq, y);
    } else {
      doc.setFontSize(10.5);
      doc.setFont(undefined, 'bold');
      doc.text('Actividad', margenIzq, y);
      doc.text('RA', margenIzq + 95, y);
      doc.text('Nota', margenIzq + 125, y);
      doc.text('Fecha', margenIzq + 155, y);
      y += 5;
      doc.setDrawColor(210);
      doc.line(margenIzq, y, 196, y);
      y += 6;

      doc.setFont(undefined, 'normal');
      doc.setFontSize(9.5);
      filas.forEach(f => {
        if(y > 280){ doc.addPage(); y = 20; }
        const nombreLineas = doc.splitTextToSize(String(f[0]), 90);
        doc.text(nombreLineas, margenIzq, y);
        doc.text(String(f[1]), margenIzq + 95, y);
        doc.text(String(f[2]), margenIzq + 125, y);
        doc.text(String(f[3]), margenIzq + 155, y);
        y += Math.max(7, nombreLineas.length * 5);
      });
    }

    doc.save(`Resumen_${data.usuario}.pdf`);
  }

  document.getElementById('btnGenerarReporteExcel').addEventListener('click', async () => {
    const ra = document.getElementById('selectRAReporteExcel').value;
    const btn = document.getElementById('btnGenerarReporteExcel');
    btn.disabled = true;

    try{
      const [dataEst, dataAct, dataCal] = await Promise.all([
        apiGet({ action:'listarEstudiantes' }),
        apiGet({ action:'listarActividades', ra }),
        apiGet({ action:'listarCalificacionesPorRA', ra })
      ]);

      if(!dataEst.success || !dataAct.success){
        mostrarNotificacion('No se pudo cargar la información necesaria.', 'error');
        return;
      }

      const estudiantes = dataEst.estudiantes.slice().sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''));
      const actividades = dataAct.actividades.slice().sort((a, b) => String(a.codigo).localeCompare(String(b.codigo), undefined, { numeric:true }));

      if(actividades.length === 0){
        mostrarNotificacion(`${ra} todavía no tiene actividades creadas.`, 'error');
        return;
      }

      const notasPorClave = {};
      if(dataCal.success) dataCal.calificaciones.forEach(c => { notasPorClave[`${c.usuario}|${c.codigo}`] = c; });

      let csv = 'Estudiante,' + actividades.map(a => a.codigo).join(',') + '\n';
      estudiantes.forEach(est => {
        const fila = [`"${(est.nombre || est.usuario).replace(/"/g, '""')}"`];
        actividades.forEach(a => {
          const c = notasPorClave[`${est.usuario}|${a.codigo}`];
          fila.push(c ? `${c.nota}/${c.puntajeMaximo}` : '');
        });
        csv += fila.join(',') + '\n';
      });

      // El BOM (\ufeff) al inicio asegura que Excel muestre bien las tildes/ñ
      const blob = new Blob(['\ufeff' + csv], { type:'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement('a');
      enlace.href = url;
      enlace.download = `Calificaciones_${ra}.csv`;
      document.body.appendChild(enlace);
      enlace.click();
      document.body.removeChild(enlace);
      URL.revokeObjectURL(url);
    }catch(err){
      mostrarNotificacion('Error de conexión con el servidor.', 'error');
    }finally{
      btn.disabled = false;
    }
  });

// ============================================================================
// CONFIGURACIÓN GENERAL DEL SISTEMA
// ============================================================================

  document.getElementById('cardConfiguracion').addEventListener('click', async () => {
    document.getElementById('panelDocente').classList.add('hidden');
    document.getElementById('panelConfiguracion').classList.remove('hidden');

    try{
      const data = await apiGet({ action:'listarConfiguracion' });
      if(data.success){
        document.getElementById('inputNombreModulo').value = data.config.nombreModulo || '';
        document.getElementById('inputAnioLectivo').value = data.config.anioLectivo || '';
        document.getElementById('inputDocenteResponsable').value = data.config.docenteResponsable || '';
      }
    }catch(err){ /* si falla, se dejan los campos vacíos para que los llene de nuevo */ }
  });

  document.getElementById('btnBackFromConfiguracion').addEventListener('click', () => {
    document.getElementById('panelConfiguracion').classList.add('hidden');
    document.getElementById('panelDocente').classList.remove('hidden');
  });

  document.getElementById('btnGuardarConfiguracion').addEventListener('click', async () => {
    const nombreModulo = document.getElementById('inputNombreModulo').value.trim();
    const anioLectivo = document.getElementById('inputAnioLectivo').value.trim();
    const docenteResponsable = document.getElementById('inputDocenteResponsable').value.trim();
    const btn = document.getElementById('btnGuardarConfiguracion');
    btn.disabled = true;

    try{
      const resp = await apiPost({ action:'guardarConfiguracion', nombreModulo, anioLectivo, docenteResponsable });
      if(resp.success){
        document.getElementById('configGuardadoMsg').classList.remove('hidden');
        setTimeout(() => document.getElementById('configGuardadoMsg').classList.add('hidden'), 2500);
        aplicarConfiguracionVisible({ nombreModulo, anioLectivo, docenteResponsable });
      } else {
        mostrarNotificacion(resp.error || 'No se pudo guardar la configuración.', 'error');
      }
    }catch(err){
      mostrarNotificacion('Error de conexión con el servidor.', 'error');
    }finally{
      btn.disabled = false;
    }
  });

  // Aplica los datos guardados a las partes visibles del sistema (por ahora, el pie de página)
  function aplicarConfiguracionVisible(config){
    if(config.nombreModulo){
      document.querySelectorAll('.appfoot').forEach(f => {
        f.textContent = `Politécnico Nuestra Señora de la Altagracia — Generador de Reportes · ${config.nombreModulo}`;
      });
    }
  }

  // Al cargar la página, aplica en silencio la configuración ya guardada (si existe)
  (async function cargarConfiguracionInicialSilenciosa(){
    try{
      const data = await apiGet({ action:'listarConfiguracion' });
      if(data.success && data.config.nombreModulo) aplicarConfiguracionVisible(data.config);
    }catch(err){ /* no pasa nada si aún no hay configuración guardada */ }
  })();
