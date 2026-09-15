// ============================================================================
// EXTRAS ESPECIALES — 2 actividades extra con mecánica completamente propia:
// el Libro Digital de repaso y la Prueba Práctica, ambas cubriendo A.1.1-A.1.4.
// Se enrutan por TÍTULO exacto desde actividades-extra.js (ver TITULO_LIBRO_
// DIGITAL_RA1 y TITULO_PRUEBA_PRACTICA_RA1 al inicio de ese archivo).
// ============================================================================

// ============================================================================
// LIBRO DIGITAL DE REPASO
// ============================================================================
  const LIBRO_RA1_CAPITULOS = [
    {
      titulo: 'Reportes Empresariales',
      paginas: [
        `<div class="libro-pagina">
          <h2>¿Qué son los reportes empresariales?</h2>
          <p>Los reportes empresariales son documentos que recopilan, organizan y presentan información relevante para la toma de decisiones dentro de una empresa. Pueden incluir datos financieros, operativos, administrativos, estratégicos o de desempeño.</p>
          <div class="libro-callout"><b>Objetivo principal:</b> ofrecer una visión clara y ordenada de lo que está ocurriendo en la organización, permitiendo evaluar resultados, detectar problemas, planificar acciones y mejorar procesos.</div>
          <p>Su importancia radica en que facilitan la toma de decisiones, promueven la transparencia, mejoran la comunicación entre departamentos, permiten medir el desempeño, y favorecen la planificación y el control.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Reportes internos y externos</h2>
          <p>Los reportes se clasifican en dos grandes categorías, según a quién van dirigidos:</p>
          <table>
            <tr><th>Reportes Internos</th><th>Reportes Externos</th></tr>
            <tr><td>Para uso dentro de la organización: empleados, supervisores, gerentes.</td><td>Para compartir fuera de la empresa: inversionistas, bancos, clientes, entes reguladores.</td></tr>
            <tr><td>Ej: ventas diarias, producción, asistencia, inventario.</td><td>Ej: estados financieros, informes fiscales, reportes a inversionistas.</td></tr>
            <tr><td>Ayudan a controlar procesos y organizar el trabajo diario.</td><td>Cumplen normativas y generan confianza hacia el exterior.</td></tr>
          </table>
        </div>`,
        `<div class="libro-pagina">
          <h2>Ejemplos reales</h2>
          <p>Así se ven en la práctica algunos ejemplos de cada tipo:</p>
          <div class="libro-ejemplo-box">
            TECNOVENTAS RD, S.R.L. — REPORTE DE VENTAS DIARIAS<br>
            Fecha: 15/08/2026 | Sucursal: Santiago Centro<br>
            TOTAL DEL DÍA: RD$101,700.00<br>
            <span style="opacity:.7;">Uso interno — Departamento de Ventas</span>
          </div>
          <div class="libro-ejemplo-box">
            GRUPO CARIBE INVERSIONES, S.A. — BALANCE GENERAL<br>
            Al 31 de diciembre de 2025<br>
            Patrimonio Neto: RD$26,450,000<br>
            <span style="opacity:.7;">Distribuido a: accionistas, banco acreedor y Cámara de Comercio</span>
          </div>
          <p>Nota cómo el primero se queda "dentro de la casa" (uso interno), mientras que el segundo se envía fuera de la empresa, a personas ajenas a ella.</p>
        </div>`
      ]
    },
    {
      titulo: 'Partes de un Reporte',
      paginas: [
        `<div class="libro-pagina">
          <h2>Encabezado de reporte y encabezado de página</h2>
          <p>Todo reporte generado con un programa de reportes está compuesto por 5 secciones. Cada una aparece con una frecuencia distinta.</p>
          <div class="libro-callout"><b>Encabezado de reporte</b> (una sola vez): aparece al principio de todo el documento. Contiene el nombre de la empresa, el título del reporte y el período que cubre.</div>
          <div class="libro-callout"><b>Encabezado de página</b> (en cada página): se repite en la parte superior de cada página. Contiene el número de página, la fecha y los títulos de las columnas.</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Línea de detalle y pie de página</h2>
          <div class="libro-callout"><b>Línea de detalle</b> (una vez por registro): es el cuerpo del reporte — se repite una vez por cada producto, empleado o transacción. Es la sección más extensa, porque contiene toda la información detallada.</div>
          <div class="libro-callout"><b>Pie de página</b> (en cada página): se ubica en la parte inferior de cada página. Contiene el número de página y, a veces, un subtotal de esa página.</div>
          <div class="libro-ejemplo-box">
            Laptop HP 15&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;RD$28,500.00&nbsp;&nbsp;&nbsp;RD$85,500.00<br>
            Mouse inalámbrico&nbsp;&nbsp;&nbsp;12&nbsp;&nbsp;&nbsp;RD$650.00&nbsp;&nbsp;&nbsp;RD$7,800.00
          </div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Pie de reporte y resumen completo</h2>
          <div class="libro-callout"><b>Pie de reporte</b> (una sola vez): es la última sección, aparece al final de todo el documento. Cierra el reporte con el total general y el responsable.</div>
          <table>
            <tr><th>Parte</th><th>Frecuencia</th></tr>
            <tr><td>Encabezado de reporte</td><td>Una sola vez, al inicio</td></tr>
            <tr><td>Encabezado de página</td><td>En cada página</td></tr>
            <tr><td>Línea de detalle</td><td>Una vez por registro</td></tr>
            <tr><td>Pie de página</td><td>En cada página</td></tr>
            <tr><td>Pie de reporte</td><td>Una sola vez, al final</td></tr>
          </table>
        </div>`
      ]
    },
    {
      titulo: 'Vistas de un Reporte',
      paginas: [
        `<div class="libro-pagina">
          <h2>¿Por qué varias vistas?</h2>
          <p>Cuando alguien diseña un reporte, el proceso avanza en etapas, y en cada etapa el programa lo muestra de forma distinta. A eso se le llama <b>vista</b>.</p>
          <div class="libro-callout">Piénsalo así: es como escribir un documento — primero escribes y das formato (diseño), luego usas "vista previa" (previsualización), y finalmente lo imprimes o envías (ejecución).</div>
          <p><b>Vista de Diseño:</b> aquí se construye la estructura del reporte — se colocan encabezados, se conectan los datos, se ajustan colores y anchos de columna. Todavía no hay datos reales, solo casillas reservadas.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Previsualización y Ejecución</h2>
          <p><b>Vista de Previsualización:</b> permite revisar cómo se verá el reporte ya diseñado, usando datos de muestra (no reales). Sirve para detectar errores de formato antes de usar información real.</p>
          <p><b>Vista de Ejecución:</b> es el momento en que el reporte corre de verdad — consulta la base de datos real y genera el documento final que finalmente recibe el usuario.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Resumen comparativo</h2>
          <table>
            <tr><th>Vista</th><th>¿Datos reales?</th><th>¿Se puede modificar el diseño?</th></tr>
            <tr><td>Diseño</td><td>No</td><td>Sí</td></tr>
            <tr><td>Previsualización</td><td>No (de muestra)</td><td>No, solo se revisa</td></tr>
            <tr><td>Ejecución</td><td>Sí</td><td>No</td></tr>
          </table>
          <p>Las 3 vistas siguen siempre este orden: <b>Diseño → Previsualización → Ejecución</b>. No tendría sentido ejecutar con datos reales antes de revisar el diseño.</p>
        </div>`
      ]
    },
    {
      titulo: 'Ejecutar y Verificar',
      paginas: [
        `<div class="libro-pagina">
          <h2>¿Por qué filtrar y verificar?</h2>
          <p>En una empresa real casi nunca se pide "todos los datos de todo". Para eso existen los <b>filtros</b>: permiten ejecutar un reporte mostrando solo la información que realmente se necesita.</p>
          <div class="libro-callout"><b>Idea clave:</b> Filtrar + Ejecutar + Verificar es el flujo de trabajo real de cualquier persona que genera reportes en una empresa.</div>
          <p><b>Paso 1 — Elegir columnas:</b> decides qué información tendrá tu reporte. <b>Paso 2 — Aplicar un filtro:</b> seleccionas un criterio para mostrar solo una parte de los datos (ej. un solo vendedor).</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Diseño, previsualización y ejecución con filtro</h2>
          <p><b>Paso 3 — Revisar diseño y previsualización:</b> confirmas que la estructura esté correcta, ahora ya con tu filtro seleccionado.</p>
          <p><b>Paso 4 — Ejecutar con datos reales filtrados:</b> el sistema consulta la base de datos real y muestra únicamente las filas que cumplen tu filtro.</p>
          <div class="libro-ejemplo-box">
            Cuaderno 100 hojas&nbsp;&nbsp;&nbsp;40&nbsp;&nbsp;&nbsp;RD$85.00&nbsp;&nbsp;&nbsp;Ana Ramírez<br>
            Caja de lápices&nbsp;&nbsp;&nbsp;25&nbsp;&nbsp;&nbsp;RD$120.00&nbsp;&nbsp;&nbsp;Ana Ramírez
          </div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Verificar el total</h2>
          <p><b>Paso 5 — Verificar sumando manualmente:</b> para cada fila, multiplicas Cantidad × Precio Unitario, y luego sumas todos los resultados.</p>
          <div class="libro-ejemplo-box">
            Cuaderno 100 hojas: 40 × RD$85.00 = RD$3,400.00<br>
            Caja de lápices: 25 × RD$120.00 = RD$3,000.00<br>
            Marcador permanente: 15 × RD$95.00 = RD$1,425.00<br>
            <b>TOTAL VERIFICADO: RD$7,825.00</b>
          </div>
          <p>Si tu suma coincide con el total real que maneja el sistema, ¡tu reporte está verificado y es confiable! <b>Flujo completo:</b> Elegir columnas → Aplicar filtro → Revisar diseño/previsualización → Ejecutar con datos reales → Verificar el total.</p>
        </div>`
      ]
    }
  ];

  let capituloActualLibroRA1 = 0;
  let paginaActualLibroRA1 = 0;
  let codigoLibroActualRA1 = null;

  document.getElementById('btnBackFromLibroDigitalRA1').addEventListener('click', () => {
    document.getElementById('panelLibroDigitalRA1').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  async function abrirLibroDigitalRA1(codigo){
    codigoLibroActualRA1 = codigo;
    capituloActualLibroRA1 = 0;
    paginaActualLibroRA1 = 0;
    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelLibroDigitalRA1').classList.remove('hidden');
    pintarLibroDigitalRA1();
  }

  function pintarSidebarLibroRA1(){
    const cont = document.getElementById('libroSidebarRA1');
    cont.innerHTML = LIBRO_RA1_CAPITULOS.map((cap, i) => `
      <button type="button" class="libro-capitulo-btn ${i === capituloActualLibroRA1 ? 'activo' : ''} ${i < capituloActualLibroRA1 ? 'completado' : ''}" data-cap="${i}">
        <span class="num">${i < capituloActualLibroRA1 ? '<i class=\"fa-solid fa-check\"></i>' : i + 1}</span>
        ${cap.titulo}
      </button>
    `).join('');
    cont.querySelectorAll('.libro-capitulo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        capituloActualLibroRA1 = Number(btn.dataset.cap);
        paginaActualLibroRA1 = 0;
        pintarLibroDigitalRA1();
      });
    });
  }

  function pintarLibroDigitalRA1(){
    pintarSidebarLibroRA1();
    const cap = LIBRO_RA1_CAPITULOS[capituloActualLibroRA1];
    document.getElementById('libroIndicadorRA1').textContent =
      `Capítulo ${capituloActualLibroRA1 + 1} de ${LIBRO_RA1_CAPITULOS.length} — Página ${paginaActualLibroRA1 + 1} de ${cap.paginas.length}`;
    document.getElementById('libroPaginaContenidoRA1').innerHTML = cap.paginas[paginaActualLibroRA1];

    document.getElementById('btnLibroAnteriorRA1').disabled = (capituloActualLibroRA1 === 0 && paginaActualLibroRA1 === 0);

    const esUltimaPaginaDelLibro = capituloActualLibroRA1 === LIBRO_RA1_CAPITULOS.length - 1 && paginaActualLibroRA1 === cap.paginas.length - 1;
    const btnSiguiente = document.getElementById('btnLibroSiguienteRA1');
    btnSiguiente.innerHTML = esUltimaPaginaDelLibro
      ? '<i class="fa-solid fa-check-double"></i> Finalizar y marcar como leído'
      : 'Siguiente <i class="fa-solid fa-arrow-right"></i>';

    window.scrollTo({ top: 0, behavior:'smooth' });
  }

  document.getElementById('btnLibroAnteriorRA1').addEventListener('click', () => {
    if(paginaActualLibroRA1 > 0){
      paginaActualLibroRA1--;
    } else if(capituloActualLibroRA1 > 0){
      capituloActualLibroRA1--;
      paginaActualLibroRA1 = LIBRO_RA1_CAPITULOS[capituloActualLibroRA1].paginas.length - 1;
    }
    pintarLibroDigitalRA1();
  });

  document.getElementById('btnLibroSiguienteRA1').addEventListener('click', async () => {
    const cap = LIBRO_RA1_CAPITULOS[capituloActualLibroRA1];
    const esUltimaPaginaDelLibro = capituloActualLibroRA1 === LIBRO_RA1_CAPITULOS.length - 1 && paginaActualLibroRA1 === cap.paginas.length - 1;

    if(esUltimaPaginaDelLibro){
      try{
        await apiPost({ action:'enviarRespuestaExtra', usuario: currentUser.usuario, codigo: codigoLibroActualRA1, respuestaTexto:'Libro leído completo.' });
      }catch(err){ /* si falla, igual se deja ver el mensaje de éxito */ }
      mostrarLogro('¡Repaso completado!', 'fa-book');
      dispararConfeti();
      document.getElementById('panelLibroDigitalRA1').classList.add('hidden');
      document.getElementById('panelMisActividades').classList.remove('hidden');
      cargarActividadesExtraEstudiante();
      return;
    }

    if(paginaActualLibroRA1 < cap.paginas.length - 1){
      paginaActualLibroRA1++;
    } else {
      capituloActualLibroRA1++;
      paginaActualLibroRA1 = 0;
    }
    pintarLibroDigitalRA1();
  });

// ============================================================================
// PRUEBA PRÁCTICA — 4 secciones, autocalificada al finalizar
// ============================================================================
  const CLASIFICACION_PRUEBA_RA1 = [
    { id:1, texto:'Reporte de ventas diarias, dirigido a los supervisores de turno', correcta:'interno' },
    { id:2, texto:'Balance general presentado a los accionistas e inversionistas', correcta:'externo' },
    { id:3, texto:'Informe de asistencia del personal, para el departamento de Recursos Humanos', correcta:'interno' },
    { id:4, texto:'Declaración jurada de impuestos presentada ante la DGII', correcta:'externo' }
  ];

  const PARTES_PRUEBA_RA1 = [
    { id:1, descripcion:'Aparece una sola vez, al principio de todo el documento, con el nombre de la empresa y el período.', correcta:'Encabezado de reporte' },
    { id:2, descripcion:'Se repite en la parte superior de cada página, con los títulos de las columnas.', correcta:'Encabezado de página' },
    { id:3, descripcion:'Se repite una vez por cada registro de datos — es el cuerpo del reporte.', correcta:'Línea de detalle' },
    { id:4, descripcion:'Se ubica en la parte inferior de cada página, con el número de página y el subtotal.', correcta:'Pie de página' },
    { id:5, descripcion:'Aparece una sola vez, al final del documento, con el total general.', correcta:'Pie de reporte' }
  ];
  const OPCIONES_PARTES_RA1 = ['Encabezado de reporte', 'Encabezado de página', 'Línea de detalle', 'Pie de página', 'Pie de reporte'];

  const VISTAS_PRUEBA_RA1 = [
    { id:1, escenario:'El equipo de diseño arrastra el logo de la empresa y ajusta el ancho de las columnas, antes de conectar los datos reales.', correcta:'diseno' },
    { id:2, escenario:'El analista revisa cómo se verán los totales y los saltos de página usando datos de prueba, antes de imprimir 200 copias.', correcta:'previsualizacion' },
    { id:3, escenario:'El sistema genera automáticamente el reporte de nómina cada quincena, consultando los registros reales de cada empleado.', correcta:'ejecucion' }
  ];
  const OPCIONES_VISTA_RA1 = [
    { id:'diseno', nombre:'Vista de Diseño' },
    { id:'previsualizacion', nombre:'Vista de Previsualización' },
    { id:'ejecucion', nombre:'Vista de Ejecución' }
  ];

  const VERIFICACION_PRUEBA_RA1 = {
    filas: [
      { producto:'Cuaderno 100 hojas', cantidad:30, precio:85 },
      { producto:'Caja de lápices', cantidad:20, precio:120 },
      { producto:'Marcador permanente', cantidad:10, precio:95 }
    ],
    totalCorrecto: 30*85 + 20*120 + 10*95
  };

  let seccionActualPruebaRA1 = 0;
  let respuestasClasificacionRA1 = {};
  let respuestasPartesRA1 = {};
  let respuestasVistaRA1 = {};
  let respuestaVerificacionRA1 = null;
  let codigoPruebaActualRA1 = null;
  let puntajeMaxPruebaRA1 = 0;
  let ultimoResultadoPruebaRA1 = null;

  document.getElementById('btnBackFromPruebaPracticaRA1').addEventListener('click', () => {
    document.getElementById('panelPruebaPracticaRA1').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
  });

  document.getElementById('btnVolverMisActPruebaRA1').addEventListener('click', () => {
    document.getElementById('panelPruebaPracticaRA1').classList.add('hidden');
    document.getElementById('panelMisActividades').classList.remove('hidden');
    cargarActividadesExtraEstudiante();
  });

  async function abrirPruebaPracticaRA1(codigo){
    codigoPruebaActualRA1 = codigo;
    const act = actividadesExtraCache.find(a => a.codigo === codigo);
    puntajeMaxPruebaRA1 = act ? act.puntajeMaximo : 4;

    document.getElementById('panelMisActividades').classList.add('hidden');
    document.getElementById('panelPruebaPracticaRA1').classList.remove('hidden');
    document.getElementById('vistaInicioPruebaRA1').classList.remove('hidden');
    document.getElementById('vistaPruebaRA1').classList.add('hidden');
    document.getElementById('vistaResultadoPruebaRA1').classList.add('hidden');

    // Si ya la completó antes, se muestra directamente el resultado guardado
    try{
      const data = await apiGet({ action:'listarRespuestasExtra', usuario: currentUser.usuario });
      const previa = data.success ? data.respuestas.find(r => r.codigo === codigo && r.estado === 'calificado') : null;
      if(previa){
        document.getElementById('vistaInicioPruebaRA1').classList.add('hidden');
        document.getElementById('vistaResultadoPruebaRA1').classList.remove('hidden');
        renderListaCotejo('rubricaResultadoPruebaRA1', previa.criteriosCalificados, previa.puntajeMaximo, previa.nota);
      }
    }catch(err){ /* si falla la verificación, se permite continuar con normalidad */ }
  }

  document.getElementById('btnComenzarPruebaRA1').addEventListener('click', () => {
    seccionActualPruebaRA1 = 0;
    respuestasClasificacionRA1 = {};
    respuestasPartesRA1 = {};
    respuestasVistaRA1 = {};
    respuestaVerificacionRA1 = null;
    document.getElementById('vistaInicioPruebaRA1').classList.add('hidden');
    document.getElementById('vistaPruebaRA1').classList.remove('hidden');
    pintarSeccionPruebaRA1();
  });

  function pintarSeccionPruebaRA1(){
    actualizarBarraProgreso('progresoPruebaRA1', seccionActualPruebaRA1, 4);
    const cont = document.getElementById('contenidoPruebaRA1');

    if(seccionActualPruebaRA1 === 0){
      cont.innerHTML = `
        <div class="section-heading" style="font-size:18px;">Sección 1 — Clasifica cada reporte</div>
        ${CLASIFICACION_PRUEBA_RA1.map(c => `
          <div class="caso-a110-card" style="max-width:100%; margin-bottom:14px;">
            <div class="caso-a110-escenario">${c.texto}</div>
            <div class="metodos-a110-opciones" style="flex-direction:row; gap:12px;">
              <button type="button" class="metodo-a110-btn prueba-clasif-btn ${respuestasClasificacionRA1[c.id]==='interno'?'seleccionado-prueba':''}" data-id="${c.id}" data-valor="interno" style="flex:1;">Interno</button>
              <button type="button" class="metodo-a110-btn prueba-clasif-btn ${respuestasClasificacionRA1[c.id]==='externo'?'seleccionado-prueba':''}" data-id="${c.id}" data-valor="externo" style="flex:1;">Externo</button>
            </div>
          </div>
        `).join('')}
        <button type="button" class="btn btn-primary" id="btnContinuarSeccionPruebaRA1" style="width:auto; padding:12px 28px;" ${Object.keys(respuestasClasificacionRA1).length < CLASIFICACION_PRUEBA_RA1.length ? 'disabled' : ''}>Continuar <i class="fa-solid fa-arrow-right"></i></button>`;

      cont.querySelectorAll('.prueba-clasif-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          respuestasClasificacionRA1[id] = btn.dataset.valor;
          pintarSeccionPruebaRA1();
        });
      });
    }

    else if(seccionActualPruebaRA1 === 1){
      cont.innerHTML = `
        <div class="section-heading" style="font-size:18px;">Sección 2 — ¿Qué parte del reporte es?</div>
        ${PARTES_PRUEBA_RA1.map(p => `
          <div class="caso-a110-card" style="max-width:100%; margin-bottom:14px;">
            <div class="caso-a110-escenario">${p.descripcion}</div>
            <select class="input-generico prueba-parte-select" data-id="${p.id}" style="margin-top:10px;">
              <option value="">Selecciona la parte...</option>
              ${OPCIONES_PARTES_RA1.map(op => `<option value="${op}" ${respuestasPartesRA1[p.id]===op?'selected':''}>${op}</option>`).join('')}
            </select>
          </div>
        `).join('')}
        <button type="button" class="btn btn-primary" id="btnContinuarSeccionPruebaRA1" style="width:auto; padding:12px 28px;" ${Object.keys(respuestasPartesRA1).length < PARTES_PRUEBA_RA1.length ? 'disabled' : ''}>Continuar <i class="fa-solid fa-arrow-right"></i></button>`;

      cont.querySelectorAll('.prueba-parte-select').forEach(sel => {
        sel.addEventListener('change', () => {
          respuestasPartesRA1[Number(sel.dataset.id)] = sel.value;
          const btn = document.getElementById('btnContinuarSeccionPruebaRA1');
          if(btn) btn.disabled = Object.keys(respuestasPartesRA1).filter(k => respuestasPartesRA1[k]).length < PARTES_PRUEBA_RA1.length;
        });
      });
    }

    else if(seccionActualPruebaRA1 === 2){
      cont.innerHTML = `
        <div class="section-heading" style="font-size:18px;">Sección 3 — ¿Cuál vista es?</div>
        ${VISTAS_PRUEBA_RA1.map(v => `
          <div class="caso-a110-card" style="max-width:100%; margin-bottom:14px;">
            <div class="caso-a110-escenario">${v.escenario}</div>
            <div class="metodos-a110-opciones">
              ${OPCIONES_VISTA_RA1.map(op => `
                <button type="button" class="metodo-a110-btn prueba-vista-btn ${respuestasVistaRA1[v.id]===op.id?'seleccionado-prueba':''}" data-id="${v.id}" data-valor="${op.id}">${op.nombre}</button>
              `).join('')}
            </div>
          </div>
        `).join('')}
        <button type="button" class="btn btn-primary" id="btnContinuarSeccionPruebaRA1" style="width:auto; padding:12px 28px;" ${Object.keys(respuestasVistaRA1).length < VISTAS_PRUEBA_RA1.length ? 'disabled' : ''}>Continuar <i class="fa-solid fa-arrow-right"></i></button>`;

      cont.querySelectorAll('.prueba-vista-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = Number(btn.dataset.id);
          respuestasVistaRA1[id] = btn.dataset.valor;
          pintarSeccionPruebaRA1();
        });
      });
    }

    else if(seccionActualPruebaRA1 === 3){
      cont.innerHTML = `
        <div class="section-heading" style="font-size:18px;">Sección 4 — Verifica el total</div>
        <div class="caso-a110-card" style="max-width:100%;">
          <p style="margin-bottom:12px; font-size:14px;">Multiplica Cantidad × Precio Unitario en cada fila, suma todos los resultados, y escribe el total verificado.</p>
          <table style="width:100%; border-collapse:collapse; margin-bottom:16px; font-size:13.5px;">
            <tr style="background:rgba(255,255,255,0.05);"><th style="padding:8px 10px; text-align:left;">Producto</th><th style="padding:8px 10px;">Cantidad</th><th style="padding:8px 10px;">Precio Unit.</th></tr>
            ${VERIFICACION_PRUEBA_RA1.filas.map(f => `<tr><td style="padding:8px 10px;">${f.producto}</td><td style="padding:8px 10px; text-align:center;">${f.cantidad}</td><td style="padding:8px 10px; text-align:center;">RD$${f.precio.toFixed(2)}</td></tr>`).join('')}
          </table>
          <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">Total verificado (RD$)</label>
          <input type="number" id="inputVerificacionPruebaRA1" class="input-generico" placeholder="Ej. 5900" style="max-width:220px;" value="${respuestaVerificacionRA1 !== null ? respuestaVerificacionRA1 : ''}">
        </div>
        <button type="button" class="btn btn-primary" id="btnFinalizarPruebaRA1" style="width:auto; padding:12px 28px; margin-top:16px;">
          <i class="fa-solid fa-check-double"></i> Finalizar y calificar
        </button>`;

      document.getElementById('inputVerificacionPruebaRA1').addEventListener('input', (e) => {
        respuestaVerificacionRA1 = e.target.value === '' ? null : Number(e.target.value);
      });
      document.getElementById('btnFinalizarPruebaRA1').addEventListener('click', finalizarPruebaPracticaRA1);
      return;
    }

    const btnContinuar = document.getElementById('btnContinuarSeccionPruebaRA1');
    if(btnContinuar){
      btnContinuar.addEventListener('click', () => {
        seccionActualPruebaRA1++;
        pintarSeccionPruebaRA1();
      });
    }
  }

  async function finalizarPruebaPracticaRA1(){
    const aciertosClasificacion = CLASIFICACION_PRUEBA_RA1.filter(c => respuestasClasificacionRA1[c.id] === c.correcta).length;
    const aciertosPartes = PARTES_PRUEBA_RA1.filter(p => respuestasPartesRA1[p.id] === p.correcta).length;
    const aciertosVistas = VISTAS_PRUEBA_RA1.filter(v => respuestasVistaRA1[v.id] === v.correcta).length;
    const verificacionCorrecta = respuestaVerificacionRA1 !== null && Math.abs(respuestaVerificacionRA1 - VERIFICACION_PRUEBA_RA1.totalCorrecto) < 1;

    const criterios = [
      { nombre:'1. Clasificación correcta de reportes (Interno/Externo)', nivel: aciertosClasificacion >= 3 ? 'cumple' : 'no_cumple' },
      { nombre:'2. Identificación de las partes del reporte', nivel: aciertosPartes >= 4 ? 'cumple' : 'no_cumple' },
      { nombre:'3. Identificación de las vistas correctas', nivel: aciertosVistas >= 2 ? 'cumple' : 'no_cumple' },
      { nombre:'4. Verificación numérica del total', nivel: verificacionCorrecta ? 'cumple' : 'no_cumple' }
    ];

    const pesoUnidad = puntajeMaxPruebaRA1 / criterios.length;
    let nota = 0;
    criterios.forEach(c => { if(c.nivel === 'cumple') nota += pesoUnidad; });
    nota = Math.round(nota * 100) / 100;

    const detalle = [
      { titulo:'Sección 1 — Clasificación', items: CLASIFICACION_PRUEBA_RA1.map(c => ({ pregunta:c.texto, tuRespuesta: respuestasClasificacionRA1[c.id] === 'interno' ? 'Interno' : 'Externo', correcta: respuestasClasificacionRA1[c.id] === c.correcta, respuestaCorrecta: c.correcta === 'interno' ? 'Interno' : 'Externo' })) },
      { titulo:'Sección 2 — Partes del reporte', items: PARTES_PRUEBA_RA1.map(p => ({ pregunta:p.descripcion, tuRespuesta: respuestasPartesRA1[p.id] || 'Sin responder', correcta: respuestasPartesRA1[p.id] === p.correcta, respuestaCorrecta: p.correcta })) },
      { titulo:'Sección 3 — Vistas del reporte', items: VISTAS_PRUEBA_RA1.map(v => ({ pregunta:v.escenario, tuRespuesta: (OPCIONES_VISTA_RA1.find(o=>o.id===respuestasVistaRA1[v.id])||{}).nombre || 'Sin responder', correcta: respuestasVistaRA1[v.id] === v.correcta, respuestaCorrecta: OPCIONES_VISTA_RA1.find(o=>o.id===v.correcta).nombre })) },
      { titulo:'Sección 4 — Verificación numérica', items: [{ pregunta:'Total verificado', tuRespuesta: respuestaVerificacionRA1 !== null ? `RD$${respuestaVerificacionRA1}` : 'Sin responder', correcta: verificacionCorrecta, respuestaCorrecta: `RD$${VERIFICACION_PRUEBA_RA1.totalCorrecto}` }] }
    ];

    document.getElementById('vistaPruebaRA1').classList.add('hidden');
    document.getElementById('vistaResultadoPruebaRA1').classList.remove('hidden');
    renderListaCotejo('rubricaResultadoPruebaRA1', criterios, puntajeMaxPruebaRA1, nota);
    renderDesgloseColoreado('resultadoDesglosePruebaRA1', detalle);

    const proporcion = puntajeMaxPruebaRA1 > 0 ? nota / puntajeMaxPruebaRA1 : 0;
    mostrarLogro(proporcion >= 0.8 ? '¡Excelente! Prueba completada' : 'Prueba completada', proporcion >= 0.8 ? 'fa-trophy' : 'fa-circle-check');
    if(proporcion >= 0.8) dispararConfeti();

    try{
      await apiPost({ action:'enviarRespuestaExtra', usuario: currentUser.usuario, codigo: codigoPruebaActualRA1, respuestaTexto:'Prueba práctica completada (autocalificada).' });
      await apiPost({ action:'calificarRespuestaExtra', usuario: currentUser.usuario, codigo: codigoPruebaActualRA1, criterios, nota, puntajeMaximo: puntajeMaxPruebaRA1 });
    }catch(err){
      console.error('No se pudo guardar la calificación de la prueba', err);
    }
  }
