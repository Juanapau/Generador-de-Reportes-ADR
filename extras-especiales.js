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
          <p>Los reportes empresariales son documentos que recopilan, organizan y presentan información relevante para la toma de decisiones dentro de una empresa. Estos reportes pueden incluir datos financieros, operativos, administrativos, estratégicos o de desempeño.</p>
          <div class="libro-callout"><b>Objetivo principal:</b> ofrecer una visión clara y ordenada de lo que está ocurriendo en la organización, permitiendo evaluar resultados, detectar problemas, planificar acciones y mejorar procesos.</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>¿Por qué son importantes?</h2>
          <p>La importancia de los reportes empresariales radica en que:</p>
          <ul>
            <li><b>Facilitan la toma de decisiones:</b> permiten que directivos, gerentes y empleados comprendan la situación actual y actúen con base en información real.</li>
            <li><b>Promueven la transparencia:</b> ayudan a mantener un registro confiable de las operaciones y resultados.</li>
            <li><b>Mejoran la comunicación:</b> la información se presenta de forma clara y accesible para los diferentes departamentos o públicos.</li>
            <li><b>Permiten medir el desempeño:</b> ayudan a evaluar si se están cumpliendo los objetivos establecidos.</li>
            <li><b>Favorecen la planificación y el control:</b> sirven como guía para diseñar estrategias a futuro.</li>
          </ul>
        </div>`,
        `<div class="libro-pagina">
          <h2>Clasificación: Reportes Internos</h2>
          <p>Los reportes se clasifican principalmente en dos grandes categorías: internos y externos.</p>
          <p><b>Reportes Internos:</b> son aquellos elaborados para el uso dentro de la organización. Están dirigidos a empleados, supervisores, gerentes y directivos. Suelen contener información operativa y administrativa.</p>
          <p><b>Ejemplos:</b></p>
          <ul>
            <li>Reportes de ventas diarias o mensuales</li>
            <li>Reportes de producción</li>
            <li>Reportes de asistencia del personal</li>
            <li>Informes de inventario</li>
            <li>Reportes de desempeño por área</li>
          </ul>
          <div class="libro-callout"><b>Utilidad:</b> ayudan a controlar procesos, evaluar resultados y organizar el trabajo diario.</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Clasificación: Reportes Externos</h2>
          <p><b>Reportes Externos:</b> están diseñados para ser compartidos con personas o entidades fuera de la empresa, como inversionistas, proveedores, bancos, clientes o instituciones gubernamentales.</p>
          <p><b>Ejemplos:</b></p>
          <ul>
            <li>Estados financieros (balance general, estado de resultados)</li>
            <li>Informes fiscales</li>
            <li>Reportes para inversionistas o socios</li>
            <li>Informes de responsabilidad social</li>
          </ul>
          <div class="libro-callout"><b>Objetivo:</b> cumplir normativas, generar confianza y comunicar el estado y desempeño de la empresa hacia el exterior.</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Así se ven en papel</h2>
          <p>Estos son ejemplos ilustrativos de cómo luce cada tipo de reporte. Fíjate en la información que cada uno incluye y a quién está dirigido.</p>
          <p><b>Reportes internos:</b></p>
          <div class="libro-ejemplo-box">
            TECNOVENTAS RD, S.R.L. — REPORTE DE VENTAS DIARIAS<br>Fecha: 15/08/2026 | Sucursal: Santiago Centro<br>TOTAL DEL DÍA: RD$101,700.00<br><span style="opacity:.7;">Uso interno — Departamento de Ventas</span>
          </div>
          <div class="libro-ejemplo-box">
            FERRETERÍA EL PROGRESO — INFORME DE INVENTARIO<br>Almacén: Principal | Corte al: 14/08/2026<br>FR-118 Varilla 3/8" — Existencia 45, Mínimo 80 — <b>REORDEN</b><br><span style="opacity:.7;">Uso interno — Departamento de Almacén</span>
          </div>
          <p><b>Reportes externos:</b></p>
          <div class="libro-ejemplo-box">
            GRUPO CARIBE INVERSIONES, S.A. — BALANCE GENERAL<br>Al 31 de diciembre de 2025<br>Patrimonio Neto: RD$26,450,000<br><span style="opacity:.7;">Distribuido a: accionistas, banco acreedor y Cámara de Comercio</span>
          </div>
          <div class="libro-ejemplo-box">
            DISTRIBUIDORA NORTE, EIRL — DECLARACIÓN JURADA ITBIS<br>RNC: 1-31-45678-2 | Período: Julio 2026<br>ITBIS a pagar: RD$333,000<br><span style="opacity:.7;">Presentado ante la Dirección General de Impuestos Internos (DGII)</span>
          </div>
          <p>En resumen, los reportes empresariales son herramientas indispensables para el funcionamiento eficiente de cualquier organización. Ya sean internos o externos, cada uno cumple un propósito específico y contribuye a que la empresa pueda crecer, mejorar y tomar decisiones estratégicas basadas en información confiable.</p>
        </div>`
      ]
    },
    {
      titulo: 'Partes de un Reporte',
      paginas: [
        `<div class="libro-pagina">
          <h2>¿Por qué es importante conocer las partes?</h2>
          <p>Un reporte empresarial no es un bloque de texto sin orden: está dividido en secciones específicas, cada una con una función distinta. Conocer estas partes permite diseñar reportes bien estructurados, fáciles de leer y que comuniquen la información de forma clara, sin importar si el reporte tiene una sola página o cientos de ellas.</p>
          <div class="libro-callout"><b>Idea clave:</b> cada parte de un reporte aparece con una frecuencia distinta — algunas salen una sola vez en todo el documento, y otras se repiten en cada página o por cada dato registrado. Entender esta diferencia es esencial para diseñar reportes correctamente.</div>
          <p>Todo reporte generado con un programa de reportes está compuesto por estas cinco secciones.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>1. Encabezado de reporte <span style="font-size:12px; background:rgba(232,185,59,.15); color:var(--dark-gold-accent); padding:2px 8px; border-radius:20px;">Una sola vez</span></h2>
          <p>Es la primera sección del reporte. Aparece <b>una única vez</b>, al principio de todo el documento, sin importar cuántas páginas tenga el reporte. Identifica de qué trata el reporte en general.</p>
          <p><b>Normalmente contiene:</b></p>
          <ul>
            <li>Nombre o logotipo de la empresa</li>
            <li>Título del reporte</li>
            <li>Período que cubre (mes, trimestre, año)</li>
          </ul>
          <div class="libro-ejemplo-box"><b>TECNOVENTAS RD, S.R.L.</b><br>Reporte de Ventas Mensuales — Enero 2026</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>2. Encabezado de página <span style="font-size:12px; background:rgba(232,185,59,.15); color:var(--dark-gold-accent); padding:2px 8px; border-radius:20px;">En cada página</span></h2>
          <p>A diferencia del encabezado de reporte, esta sección <b>se repite en la parte superior de cada página</b>. Sirve para que, si alguien abre el reporte en cualquier página, sepa dónde está ubicado y qué información va a encontrar a continuación.</p>
          <p><b>Normalmente contiene:</b></p>
          <ul>
            <li>Número de página y fecha de generación</li>
            <li>Títulos de las columnas de la tabla de datos</li>
            <li>Filtros aplicados (ej. sucursal, vendedor)</li>
          </ul>
          <div class="libro-ejemplo-box">Página 1 · Generado: 31/01/2026 · Vendedor: Todos<br>Producto | Cant. | Precio Unit. | Total</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>3. Línea de detalle <span style="font-size:12px; background:rgba(34,197,94,.15); color:var(--dark-green-accent); padding:2px 8px; border-radius:20px;">Una vez por registro</span></h2>
          <p>Es el <b>cuerpo del reporte</b>: se repite una vez por cada registro o fila de datos (cada producto, cada empleado, cada transacción). Es la sección más extensa del reporte, ya que contiene toda la información detallada.</p>
          <p><b>Normalmente contiene:</b></p>
          <ul>
            <li>Los datos individuales de cada registro (uno por fila)</li>
            <li>Valores numéricos, fechas, nombres, según el tipo de reporte</li>
          </ul>
          <div class="libro-ejemplo-box">
            Laptop HP 15 — 3 — RD$28,500.00 — RD$85,500.00<br>
            Mouse inalámbrico — 12 — RD$650.00 — RD$7,800.00
          </div>
        </div>`,
        `<div class="libro-pagina">
          <h2>4. Pie de página <span style="font-size:12px; background:rgba(232,185,59,.15); color:var(--dark-gold-accent); padding:2px 8px; border-radius:20px;">En cada página</span></h2>
          <p>Se ubica en la parte inferior de <b>cada página</b>, igual que el encabezado de página se repite en la parte superior. Ayuda a ubicar en qué página se está y, en algunos reportes, resume los datos de esa página específica.</p>
          <p><b>Normalmente contiene:</b></p>
          <ul>
            <li>Número de página (ej. "Página 1 de 2")</li>
            <li>Subtotal correspondiente a esa página</li>
          </ul>
          <div class="libro-ejemplo-box">Página 1 de 2 · Subtotal de esta página: <b>RD$101,700.00</b></div>

          <h2 style="margin-top:22px;">5. Pie de reporte <span style="font-size:12px; background:rgba(168,85,247,.15); color:#a855f7; padding:2px 8px; border-radius:20px;">Una sola vez</span></h2>
          <p>Es la última sección del reporte. Aparece <b>una única vez</b>, al final de todo el documento (después de la última página), no en cada página. Cierra el reporte con la información consolidada de todo el período.</p>
          <p><b>Normalmente contiene:</b> total general de todo el reporte, y nombre del departamento o persona responsable.</p>
          <div class="libro-ejemplo-box">TOTAL GENERAL DEL REPORTE: RD$198,450.00<br>Elaborado por: Departamento de Ventas</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Así se ven todas juntas</h2>
          <p>El siguiente es un reporte completo de TECNOVENTAS RD, S.R.L., con cada una de sus 5 partes:</p>
          <div class="libro-ejemplo-box">
            <b>1. ENCABEZADO DE REPORTE</b> — TECNOVENTAS RD, S.R.L. · Reporte de Ventas Mensuales — Enero 2026<br><br>
            <b>2. ENCABEZADO DE PÁGINA</b> — Página 1 · Generado: 31/01/2026 · Vendedor: Todos<br><br>
            <b>3. LÍNEA DE DETALLE</b> — Laptop HP 15, 3, RD$28,500.00, RD$85,500.00<br><br>
            <b>4. PIE DE PÁGINA</b> — Página 1 de 2 · Subtotal: RD$101,700.00<br><br>
            <b>5. PIE DE REPORTE</b> — TOTAL GENERAL: RD$198,450.00 · Elaborado por: Departamento de Ventas
          </div>
          <table>
            <tr><th>Parte</th><th>Frecuencia</th><th>Contenido</th></tr>
            <tr><td>Encabezado de reporte</td><td>Una sola vez, al inicio</td><td>Nombre de la empresa, título, período</td></tr>
            <tr><td>Encabezado de página</td><td>En cada página</td><td>Número de página, fecha, títulos de columnas</td></tr>
            <tr><td>Línea de detalle</td><td>Una vez por registro</td><td>Datos individuales (productos, montos, etc.)</td></tr>
            <tr><td>Pie de página</td><td>En cada página</td><td>Número de página, subtotal de esa página</td></tr>
            <tr><td>Pie de reporte</td><td>Una sola vez, al final</td><td>Total general, responsable del reporte</td></tr>
          </table>
          <p>Cada parte de un reporte cumple una función específica: unas identifican el documento como un todo (encabezado y pie de reporte), otras se repiten para mantener la orientación del lector en cada página (encabezado y pie de página), y la línea de detalle es donde vive la información real.</p>
        </div>`
      ]
    },
    {
      titulo: 'Vistas de un Reporte',
      paginas: [
        `<div class="libro-pagina">
          <h2>¿Por qué un reporte tiene varias "vistas"?</h2>
          <p>Cuando alguien diseña un reporte en un programa generador, no pasa directamente de "idea" a "reporte terminado". El proceso avanza en <b>etapas</b>, y en cada etapa el programa muestra el reporte de una manera distinta. A esto se le llama <b>vista</b>.</p>
          <div class="libro-callout"><b>Piénsalo así:</b> es parecido a escribir un documento en el procesador de texto — primero escribes y das formato (diseño), luego usas "Vista previa de impresión" para revisar cómo quedará en papel (previsualización), y finalmente lo imprimes o lo envías con el contenido definitivo (ejecución). Un reporte empresarial sigue exactamente esa misma lógica.</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>1. Vista de Diseño <span style="font-size:12px; background:rgba(168,85,247,.15); color:#a855f7; padding:2px 8px; border-radius:20px;">Primera etapa</span></h2>
          <p>Es donde se <b>construye la estructura</b> del reporte: se colocan los encabezados, se arrastran los campos de la base de datos hacia la cuadrícula, se ajustan colores, fuentes y el ancho de las columnas. En esta vista <b>todavía no hay datos reales</b> — solo casillas y espacios reservados.</p>
          <p style="font-style:italic; opacity:.85;">Es como el "borrador" de un documento: se define cómo se va a ver, pero el contenido final aún no está.</p>
          <p><b>Aquí se puede:</b></p>
          <ul>
            <li>Agregar y mover encabezados, líneas de detalle y pies</li>
            <li>Conectar el reporte a la base de datos</li>
            <li>Definir formatos (colores, fuentes, tamaños de columna)</li>
          </ul>
          <div class="libro-ejemplo-box">Modo edición — arrastrando elementos<br>[ Encabezado de reporte ]<br>[ Columna ] [ Columna ] [ Columna ]<br>[ Pie de reporte ]</div>
          <p><b>Ejemplo:</b> el equipo de diseño arrastra el logotipo de la empresa hacia la parte superior del reporte y ajusta el ancho de la columna de precios, antes de conectar los datos reales.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>2. Vista de Previsualización <span style="font-size:12px; background:rgba(232,185,59,.15); color:var(--dark-gold-accent); padding:2px 8px; border-radius:20px;">Segunda etapa</span></h2>
          <p>Permite <b>revisar cómo se verá</b> el reporte ya diseñado, usando <b>datos de muestra</b> (de prueba, no reales). Sirve para detectar errores de formato, saltos de página incorrectos o columnas mal alineadas <b>antes</b> de ejecutar el reporte con información real.</p>
          <p style="font-style:italic; opacity:.85;">Es como la "Vista previa de impresión": ves cómo va a quedar, pero normalmente ya no puedes rediseñar la estructura desde ahí.</p>
          <p><b>Aquí se puede:</b> revisar la distribución de las páginas, verificar que los totales y formatos se vean bien, y detectar errores antes de usar datos reales.</p>
          <div class="libro-ejemplo-box">Modo previsualización — datos de muestra<br>Producto | Cant. | Total<br>[Producto de ejemplo] | XX | RD$X,XXX</div>
          <p><b>Ejemplo:</b> antes de imprimir 200 copias de un reporte, el analista revisa cómo se verán los totales y los saltos de página usando datos de prueba.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>3. Vista de Ejecución <span style="font-size:12px; background:rgba(34,197,94,.15); color:var(--dark-green-accent); padding:2px 8px; border-radius:20px;">Tercera etapa</span></h2>
          <p>Es el momento en que el reporte <b>corre de verdad</b>: consulta la base de datos real y genera el documento final, con información actualizada. Este es el reporte que finalmente <b>recibe el usuario</b> (un gerente, un cliente, un departamento).</p>
          <p style="font-style:italic; opacity:.85;">Es como imprimir o enviar el documento definitivo: ya no es un borrador ni una prueba, es el resultado real.</p>
          <p><b>Aquí se puede:</b> ver los datos reales y actualizados de la empresa, imprimir/publicar/guardar el reporte final, y entregarlo a quien lo solicitó.</p>
          <div class="libro-ejemplo-box">Modo ejecución — datos reales<br>Laptop HP 15 — 3 — RD$85,500.00<br>Mouse inalámbrico — 12 — RD$7,800.00</div>
          <p><b>Ejemplo:</b> el sistema genera automáticamente el reporte de nómina cada quincena, consultando los registros reales de cada empleado.</p>
          <p>Las 3 vistas siguen siempre este orden natural: <b>Diseño → Previsualización → Ejecución</b>. No tendría sentido ejecutar un reporte con datos reales antes de revisar su diseño, ni revisar el diseño sin antes haberlo construido.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Resumen comparativo</h2>
          <table>
            <tr><th>Vista</th><th>¿Datos reales?</th><th>¿Se puede modificar diseño?</th><th>¿Para qué se usa?</th></tr>
            <tr><td>Diseño</td><td>No</td><td>Sí</td><td>Construir la estructura del reporte</td></tr>
            <tr><td>Previsualización</td><td>No (de muestra)</td><td>No, solo se revisa</td><td>Comprobar cómo se verá antes de ejecutar</td></tr>
            <tr><td>Ejecución</td><td>Sí</td><td>No</td><td>Generar el reporte final para el usuario</td></tr>
          </table>
          <p>Las vistas de un reporte no son pantallas al azar: representan las etapas naturales de su creación, desde una estructura vacía hasta el documento final con información real. Reconocer en qué vista está un reporte —observando si hay datos reales, de muestra, o ninguno— es clave para entender en qué momento del proceso se encuentra.</p>
        </div>`
      ]
    },
    {
      titulo: 'Ejecutar y Verificar',
      paginas: [
        `<div class="libro-pagina">
          <h2>¿Por qué filtrar y verificar un reporte?</h2>
          <p>En una empresa real, casi nunca se pide "todos los datos de todo". Un gerente pide, por ejemplo, "las ventas de un vendedor específico" o "los productos de una sola categoría". Para eso existen los <b>filtros</b>: permiten ejecutar un reporte mostrando solo la información que realmente se necesita.</p>
          <p>Y una vez que el reporte se ejecuta con datos reales, un buen diseñador de reportes no confía ciegamente en el sistema: <b>verifica</b> que los totales sean correctos, sumando manualmente algunos datos para confirmar que todo cuadra.</p>
          <div class="libro-callout"><b>Idea clave:</b> Filtrar + Ejecutar + Verificar es el flujo de trabajo real de cualquier persona que genera reportes en una empresa, no solo una actividad escolar.</div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Paso 1 — Elige las columnas de tu reporte</h2>
          <p>Al igual que en actividades anteriores, primero decides qué información tendrá tu reporte.</p>
          <div class="libro-ejemplo-box">
            ✓ Producto (obligatoria)<br>✓ Cantidad (obligatoria)<br>✓ Precio Unitario (obligatoria)<br>☐ Categoría<br>✓ Vendedor
          </div>
          <h2 style="margin-top:22px;">Paso 2 — Aplica un filtro</h2>
          <p>Antes de ejecutar, seleccionas un criterio para que el reporte muestre solo una parte de los datos — por ejemplo, un solo vendedor.</p>
          <div class="libro-ejemplo-box">🔍 Filtrar por vendedor: Ana Ramírez ▾</div>
          <p>Esto significa que, al ejecutar, <b>solo aparecerán las ventas hechas por Ana Ramírez</b> — ninguna otra persona.</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Paso 3 — Revisa el Diseño y la Previsualización</h2>
          <p>Confirmas que la estructura esté correcta y revisas cómo se verá con datos de muestra, exactamente igual que en la actividad anterior — pero ahora ya con tu filtro seleccionado.</p>
          <div class="libro-ejemplo-box">
            Previsualización, datos de muestra:<br>Producto | Cant. | Precio | Vendedor<br>[Producto] | XX | RD$X,XXX | Ana Ramírez
          </div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Paso 4 — Ejecuta el reporte con datos reales filtrados</h2>
          <p>El sistema consulta la base de datos real y muestra <b>únicamente</b> las filas que cumplen tu filtro. Observa que esta vez <b>no aparece un total ya calculado</b> — eso es justamente lo que verificarás en el siguiente paso.</p>
          <div class="libro-ejemplo-box">
            Ejecución, datos reales de Ana Ramírez:<br>
            Cuaderno 100 hojas — 40 — RD$85.00 — Ana Ramírez<br>
            Caja de lápices — 25 — RD$120.00 — Ana Ramírez<br>
            Marcador permanente — 15 — RD$95.00 — Ana Ramírez
          </div>
        </div>`,
        `<div class="libro-pagina">
          <h2>Paso 5 — Verifica el total sumando manualmente</h2>
          <p>Para cada fila, multiplicas <b>Cantidad × Precio Unitario</b>, y luego sumas todos los resultados. Ese es el total real de tu reporte filtrado.</p>
          <div class="libro-ejemplo-box">
            Cuaderno 100 hojas: 40 × RD$85.00 = RD$3,400.00<br>
            Caja de lápices: 25 × RD$120.00 = RD$3,000.00<br>
            Marcador permanente: 15 × RD$95.00 = RD$1,425.00<br>
            <b>TOTAL VERIFICADO: RD$7,825.00</b>
          </div>
          <p>Si tu suma coincide con el total real que maneja el sistema, ¡tu reporte está verificado y es confiable!</p>
        </div>`,
        `<div class="libro-pagina">
          <h2>Resumen del flujo completo</h2>
          <p>Cada vez que generes un reporte filtrado, sigue este mismo orden:</p>
          <div class="libro-callout" style="text-align:center; font-weight:700;">
            1. Elegir columnas → 2. Aplicar filtro → 3. Revisar diseño/previsualización → 4. Ejecutar con datos reales → 5. Verificar el total
          </div>
          <p>Filtrar un reporte no es solo "quitar información" — es entregar exactamente lo que el usuario necesita, sin datos de más. Y verificar los totales manualmente es lo que separa a un buen diseñador de reportes de alguien que solo confía a ciegas en la pantalla. Practicar este flujo completo te prepara para construir reportes reales y confiables.</p>
        </div>`
      ]
    }
  ];

  // Oculta todos los paneles de nivel superior antes de mostrar uno nuevo — evita que un panel
  // que quedó abierto por otra vía (ej. la vista genérica de actividad extra) se quede visible
  // por debajo del que se está por mostrar.
  function ocultarTodosLosPanelesPrincipales_(){
    document.querySelectorAll('.panel-secundario').forEach(p => p.classList.add('hidden'));
    document.querySelectorAll('.panel-actividad-interactiva').forEach(p => p.classList.add('hidden'));
    document.getElementById('panelDocente').classList.add('hidden');
  }

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
    ocultarTodosLosPanelesPrincipales_();
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

  let seccionActualPruebaRA1 = 0;
  // Estado de la Sección 4 (simulador de filtro + vistas + verificación)
  let filtroCategoriaS4PruebaRA1 = '';
  let vistasVisitadasS4PruebaRA1 = new Set();
  let vistaActualS4PruebaRA1 = null;
  let datosRealesS4PruebaRA1 = null;
  let datosFiltradosS4PruebaRA1 = [];
  let totalRealS4PruebaRA1 = 0;
  let calcExpresionS4PruebaRA1 = '';
  let respuestasClasificacionRA1 = {};
  let respuestasPartesRA1 = {};
  let respuestasVistaRA1 = {};
  let ordenPartesPruebaRA1 = [];
  let opcionesPartesPorPreguntaRA1 = {};
  let ordenVistasPruebaRA1 = [];
  let opcionesVistaPorPreguntaRA1 = {};
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

    ocultarTodosLosPanelesPrincipales_();
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
    filtroCategoriaS4PruebaRA1 = '';
    vistasVisitadasS4PruebaRA1 = new Set();
    vistaActualS4PruebaRA1 = null;
    datosRealesS4PruebaRA1 = null;
    datosFiltradosS4PruebaRA1 = [];
    totalRealS4PruebaRA1 = 0;
    calcExpresionS4PruebaRA1 = '';

    // Se baraja el orden de las preguntas y, por cada pregunta, el orden de sus opciones —
    // así ni las preguntas ni las respuestas salen siempre en el mismo orden.
    ordenPartesPruebaRA1 = barajar(PARTES_PRUEBA_RA1);
    opcionesPartesPorPreguntaRA1 = {};
    PARTES_PRUEBA_RA1.forEach(p => { opcionesPartesPorPreguntaRA1[p.id] = barajar(OPCIONES_PARTES_RA1); });

    ordenVistasPruebaRA1 = barajar(VISTAS_PRUEBA_RA1);
    opcionesVistaPorPreguntaRA1 = {};
    VISTAS_PRUEBA_RA1.forEach(v => { opcionesVistaPorPreguntaRA1[v.id] = barajar(OPCIONES_VISTA_RA1); });

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
        ${ordenPartesPruebaRA1.map(p => `
          <div class="caso-a110-card" style="max-width:100%; margin-bottom:14px;">
            <div class="caso-a110-escenario">${p.descripcion}</div>
            <select class="input-generico prueba-parte-select" data-id="${p.id}" style="margin-top:10px;">
              <option value="">Selecciona la parte...</option>
              ${opcionesPartesPorPreguntaRA1[p.id].map(op => `<option value="${op}" ${respuestasPartesRA1[p.id]===op?'selected':''}>${op}</option>`).join('')}
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
        ${ordenVistasPruebaRA1.map(v => `
          <div class="caso-a110-card" style="max-width:100%; margin-bottom:14px;">
            <div class="caso-a110-escenario">${v.escenario}</div>
            <div class="metodos-a110-opciones">
              ${opcionesVistaPorPreguntaRA1[v.id].map(op => `
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
        <div class="section-heading" style="font-size:18px;">Sección 4 — Genera y verifica un reporte filtrado</div>
        <div class="empty-note" style="margin-top:0;">
          <i class="fa-solid fa-hand-pointer"></i>
          Filtra el reporte por una categoría, recorre las 3 vistas, y verifica el total calculándolo tú mismo.
        </div>
        <div id="filtroS4PruebaRA1"></div>
        <div id="navegadorVistasS4PruebaRA1" class="hidden"></div>`;
      pintarFiltroS4PruebaRA1();
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

  // ---------- Sección 4: filtro + navegador de vistas + calculadora ----------
  const CAMPOS_S4_PRUEBA_RA1 = [
    { campo:'Producto', etiqueta:'Producto', muestra:'[Producto de ejemplo]' },
    { campo:'Cantidad', etiqueta:'Cantidad', muestra:'XX' },
    { campo:'PrecioUnitario', etiqueta:'Precio Unitario', muestra:'RD$X,XXX.XX' },
    { campo:'Categoria', etiqueta:'Categoría', muestra:'[Categoría]' }
  ];

  async function pintarFiltroS4PruebaRA1(){
    const cont = document.getElementById('filtroS4PruebaRA1');
    cont.innerHTML = '<div class="loading-note"><i class="fa-solid fa-spinner fa-spin"></i> Cargando categorías...</div>';

    const data = await cargarTablaDatos('DB_Ventas');
    if(!data){
      cont.innerHTML = '<div class="empty-table-msg">No se pudo cargar la base de datos. Intenta de nuevo.</div>';
      return;
    }
    datosRealesS4PruebaRA1 = data;
    const categoriasUnicas = [...new Set(data.datos.map(d => d.Categoria))].filter(Boolean);

    cont.innerHTML = `
      <div class="caso-a110-card" style="max-width:100%;">
        <label style="display:block; font-size:13px; font-weight:700; margin-bottom:8px;">Filtrar por categoría</label>
        <select id="selectFiltroS4PruebaRA1" class="input-generico" style="max-width:280px;">
          <option value="" ${filtroCategoriaS4PruebaRA1 ? '' : 'selected disabled'}>Selecciona una categoría...</option>
          ${categoriasUnicas.map(c => `<option value="${c}" ${filtroCategoriaS4PruebaRA1 === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
        <button type="button" class="btn btn-add" id="btnConstruirS4PruebaRA1" style="margin-top:14px; display:block;">
          <i class="fa-solid fa-gears"></i> Construir reporte
        </button>
      </div>`;

    document.getElementById('selectFiltroS4PruebaRA1').addEventListener('change', (e) => { filtroCategoriaS4PruebaRA1 = e.target.value; });
    document.getElementById('btnConstruirS4PruebaRA1').addEventListener('click', () => {
      if(!filtroCategoriaS4PruebaRA1){
        mostrarNotificacion('Selecciona una categoría para filtrar el reporte.', 'error');
        return;
      }
      datosFiltradosS4PruebaRA1 = datosRealesS4PruebaRA1.datos.filter(d => d.Categoria === filtroCategoriaS4PruebaRA1);
      totalRealS4PruebaRA1 = datosFiltradosS4PruebaRA1.reduce((sum, f) => sum + (Number(f.Cantidad)||0) * (Number(f.PrecioUnitario)||0), 0);
      vistasVisitadasS4PruebaRA1 = new Set();

      const navCont = document.getElementById('navegadorVistasS4PruebaRA1');
      navCont.classList.remove('hidden');
      navCont.innerHTML = `
        <div class="vistas-tabs" id="vistasTabsS4PruebaRA1"></div>
        <div id="vistaContenidoS4PruebaRA1"></div>
        <div id="seccionVerificacionS4PruebaRA1" class="hidden"></div>`;
      cambiarVistaS4PruebaRA1('diseno');
    });
  }

  function pintarVistasTabsS4PruebaRA1(){
    const cont = document.getElementById('vistasTabsS4PruebaRA1');
    cont.innerHTML = ['diseno', 'previsualizacion', 'ejecucion'].map(v => {
      const info = COLOR_VISTA_A14[v];
      const visitada = vistasVisitadasS4PruebaRA1.has(v);
      const activa = vistaActualS4PruebaRA1 === v;
      return `
        <button type="button" class="vista-tab-btn ${activa ? 'activa' : ''} ${visitada ? 'visitada' : ''}" data-vista="${v}">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
          ${visitada ? '<i class="fa-solid fa-check check-visitada"></i>' : ''}
        </button>`;
    }).join('');
    cont.querySelectorAll('.vista-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => cambiarVistaS4PruebaRA1(btn.dataset.vista));
    });
  }

  function cambiarVistaS4PruebaRA1(vista){
    vistaActualS4PruebaRA1 = vista;
    vistasVisitadasS4PruebaRA1.add(vista);
    pintarVistasTabsS4PruebaRA1();
    pintarContenidoVistaS4PruebaRA1(vista);
    if(vistasVisitadasS4PruebaRA1.size >= 3){
      document.getElementById('seccionVerificacionS4PruebaRA1').classList.remove('hidden');
      pintarVerificacionS4PruebaRA1();
    }
  }

  function pintarContenidoVistaS4PruebaRA1(vista){
    const cont = document.getElementById('vistaContenidoS4PruebaRA1');
    const info = COLOR_VISTA_A14[vista];
    const campos = CAMPOS_S4_PRUEBA_RA1;

    let filasHtml = '';
    if(vista === 'diseno'){
      filasHtml = `<tr>${campos.map(() => `<td class="simulador-placeholder-cell">—</td>`).join('')}</tr>`;
    } else if(vista === 'previsualizacion'){
      filasHtml = [1,2,3].map(() => `<tr>${campos.map(c => `<td class="simulador-placeholder-cell">${c.muestra}</td>`).join('')}</tr>`).join('');
    } else if(vista === 'ejecucion'){
      filasHtml = datosFiltradosS4PruebaRA1.slice(0, 10).map(fila => `
        <tr>${campos.map(c => {
          let valor = fila[c.campo];
          if(c.campo === 'PrecioUnitario' && typeof valor === 'number') valor = 'RD$' + valor.toLocaleString('es-DO', {minimumFractionDigits:2});
          return `<td>${valor !== undefined ? valor : ''}</td>`;
        }).join('')}</tr>`).join('');
    }

    const tituloReporte = `
      <div style="font-weight:800; font-size:15px;">TECNOVENTAS RD, S.R.L. — Reporte de Ventas
        ${vista !== 'diseno' ? `<span style="font-weight:600; font-size:12.5px; opacity:.7;"> · Filtrado por: ${filtroCategoriaS4PruebaRA1}</span>` : ''}
      </div>`;

    const tablaHtml = `
      <table class="simulador-tabla">
        <thead><tr>${campos.map(c => `<th>${c.etiqueta}</th>`).join('')}</tr></thead>
        <tbody>${filasHtml}</tbody>
      </table>
      ${vista === 'ejecucion' ? '<div style="margin-top:10px; font-size:12.5px; opacity:.7;"><i class="fa-solid fa-circle-info"></i> El total no se muestra aquí — calcúlalo y verifícalo abajo.</div>' : ''}`;

    cont.innerHTML = `
      <div class="simulador-pantalla">
        <span class="simulador-etiqueta-vista" style="background:${info.bg}; color:${info.color};">
          <i class="fa-solid ${info.icono}"></i> ${info.nombre}
        </span>
        ${tituloReporte}
        ${tablaHtml}
      </div>`;
  }

  function pintarVerificacionS4PruebaRA1(){
    const cont = document.getElementById('seccionVerificacionS4PruebaRA1');
    cont.innerHTML = `
      <div class="caso-a110-card" style="max-width:100%; margin-top:20px;">
        <p style="margin-bottom:12px; font-size:14px;">Calcula el total real del reporte filtrado (con la calculadora o a mano) y escríbelo aquí.</p>
        <div class="simulador-ejecucion-layout">
          <div>
            <label style="display:block; font-size:13px; font-weight:700; margin-bottom:6px;">Total verificado (RD$)</label>
            <input type="number" id="inputVerificacionPruebaRA1" class="input-generico" placeholder="0.00" style="max-width:220px;" value="${respuestaVerificacionRA1 !== null ? respuestaVerificacionRA1 : ''}">
          </div>
          <div class="calculadora-mini">
            <div class="calc-titulo"><i class="fa-solid fa-calculator"></i> Calculadora</div>
            <div class="calc-display" id="calcDisplayS4PruebaRA1">${calcExpresionS4PruebaRA1 || '0'}</div>
            <div class="calc-teclado">
              <button type="button" class="calc-btn calc-btn-s4" data-calc="7">7</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="8">8</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="9">9</button>
              <button type="button" class="calc-btn calc-btn-s4 calc-op" data-calc="/">÷</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="4">4</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="5">5</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="6">6</button>
              <button type="button" class="calc-btn calc-btn-s4 calc-op" data-calc="*">×</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="1">1</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="2">2</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="3">3</button>
              <button type="button" class="calc-btn calc-btn-s4 calc-op" data-calc="-">−</button>
              <button type="button" class="calc-btn calc-btn-s4 calc-clear" data-calc="C">C</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc="0">0</button>
              <button type="button" class="calc-btn calc-btn-s4" data-calc=".">.</button>
              <button type="button" class="calc-btn calc-btn-s4 calc-op" data-calc="+">+</button>
              <button type="button" class="calc-btn calc-btn-s4 calc-eq" data-calc="=" style="grid-column:span 4;">=</button>
            </div>
            <div style="font-size:10.5px; opacity:.6; margin-top:8px; text-align:center;">Uso interno — no se envía al sistema.</div>
          </div>
        </div>
        <button type="button" class="btn btn-primary" id="btnFinalizarPruebaRA1" style="width:auto; padding:12px 28px; margin-top:16px;">
          <i class="fa-solid fa-check-double"></i> Finalizar y calificar
        </button>
      </div>`;

    document.getElementById('inputVerificacionPruebaRA1').addEventListener('input', (e) => {
      respuestaVerificacionRA1 = e.target.value === '' ? null : Number(e.target.value);
    });

    cont.querySelectorAll('.calc-btn-s4').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.calc;
        if(val === 'C'){
          calcExpresionS4PruebaRA1 = '';
        } else if(val === '='){
          if(calcExpresionS4PruebaRA1.trim() !== '' && /^[0-9+\-*/.() ]+$/.test(calcExpresionS4PruebaRA1)){
            try{
              const resultado = Function('"use strict"; return (' + calcExpresionS4PruebaRA1 + ')')();
              calcExpresionS4PruebaRA1 = Number.isFinite(resultado) ? String(Math.round(resultado * 100) / 100) : 'Error';
            }catch(err){
              calcExpresionS4PruebaRA1 = 'Error';
            }
          }
        } else {
          if(calcExpresionS4PruebaRA1 === 'Error') calcExpresionS4PruebaRA1 = '';
          calcExpresionS4PruebaRA1 += val;
        }
        document.getElementById('calcDisplayS4PruebaRA1').textContent = calcExpresionS4PruebaRA1 || '0';
      });
    });

    document.getElementById('btnFinalizarPruebaRA1').addEventListener('click', finalizarPruebaPracticaRA1);
  }

  async function finalizarPruebaPracticaRA1(){
    const aciertosClasificacion = CLASIFICACION_PRUEBA_RA1.filter(c => respuestasClasificacionRA1[c.id] === c.correcta).length;
    const aciertosPartes = PARTES_PRUEBA_RA1.filter(p => respuestasPartesRA1[p.id] === p.correcta).length;
    const aciertosVistas = VISTAS_PRUEBA_RA1.filter(v => respuestasVistaRA1[v.id] === v.correcta).length;
    const recorrioLasTresVistas = vistasVisitadasS4PruebaRA1.size >= 3;
    const verificacionCorrecta = recorrioLasTresVistas && respuestaVerificacionRA1 !== null && Math.abs(respuestaVerificacionRA1 - totalRealS4PruebaRA1) < 1;

    const criterios = [
      { nombre:'1. Clasificación correcta de reportes (Interno/Externo)', nivel: aciertosClasificacion >= 3 ? 'cumple' : 'no_cumple' },
      { nombre:'2. Identificación de las partes del reporte', nivel: aciertosPartes >= 4 ? 'cumple' : 'no_cumple' },
      { nombre:'3. Identificación de las vistas correctas', nivel: aciertosVistas >= 2 ? 'cumple' : 'no_cumple' },
      { nombre:'4. Genera un reporte filtrado y verifica su total', nivel: verificacionCorrecta ? 'cumple' : 'no_cumple' }
    ];

    const pesoUnidad = puntajeMaxPruebaRA1 / criterios.length;
    let nota = 0;
    criterios.forEach(c => { if(c.nivel === 'cumple') nota += pesoUnidad; });
    nota = Math.round(nota * 100) / 100;

    const detalle = [
      { titulo:'Sección 1 — Clasificación', items: CLASIFICACION_PRUEBA_RA1.map(c => ({ pregunta:c.texto, tuRespuesta: respuestasClasificacionRA1[c.id] === 'interno' ? 'Interno' : 'Externo', correcta: respuestasClasificacionRA1[c.id] === c.correcta, respuestaCorrecta: c.correcta === 'interno' ? 'Interno' : 'Externo' })) },
      { titulo:'Sección 2 — Partes del reporte', items: PARTES_PRUEBA_RA1.map(p => ({ pregunta:p.descripcion, tuRespuesta: respuestasPartesRA1[p.id] || 'Sin responder', correcta: respuestasPartesRA1[p.id] === p.correcta, respuestaCorrecta: p.correcta })) },
      { titulo:'Sección 3 — Vistas del reporte', items: VISTAS_PRUEBA_RA1.map(v => ({ pregunta:v.escenario, tuRespuesta: (OPCIONES_VISTA_RA1.find(o=>o.id===respuestasVistaRA1[v.id])||{}).nombre || 'Sin responder', correcta: respuestasVistaRA1[v.id] === v.correcta, respuestaCorrecta: OPCIONES_VISTA_RA1.find(o=>o.id===v.correcta).nombre })) },
      { titulo:'Sección 4 — Reporte filtrado y verificado', items: [
        { pregunta:'Categoría usada como filtro', tuRespuesta: filtroCategoriaS4PruebaRA1 || 'Sin filtrar', correcta: !!filtroCategoriaS4PruebaRA1 },
        { pregunta:'¿Recorrió las 3 vistas (Diseño, Previsualización, Ejecución)?', tuRespuesta: `${vistasVisitadasS4PruebaRA1.size} de 3`, correcta: recorrioLasTresVistas },
        { pregunta:'Total verificado', tuRespuesta: respuestaVerificacionRA1 !== null ? `RD$${respuestaVerificacionRA1}` : 'Sin responder', correcta: verificacionCorrecta, respuestaCorrecta: `RD$${totalRealS4PruebaRA1.toFixed(2)}` }
      ] }
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
