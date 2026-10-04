// ============================================================================
// SIMULADOR DE PROGRAMA — piezas reutilizables para actividades que simulan
// descargar, instalar y usar un programa generador de reportes ficticio.
//
// Se inventó un programa propio (NexaReport) en vez de simular uno real para
// no depender de una interfaz ajena que puede cambiar, y para poder controlar
// con precisión qué es "correcto" en cada paso (sitio oficial, opciones de
// instalación, etc.) sin preocuparnos por derechos de marca.
//
// Este archivo NO contiene lógica de ninguna actividad en particular — solo
// construye piezas de interfaz (navegador simulado, etc.) que actividades.js
// usa y le da contenido específico. Así, cuando A.1.8 necesite un instalador
// simulado o A.1.9 necesite el "escritorio" del programa ya instalado, se
// agregan aquí como piezas nuevas sin tocar lo que ya funciona.
// ============================================================================

  const NEXAREPORT_BRAND = {
    nombre: 'NexaReport',
    dominioOficial: 'www.nexareport.com',
    colorPrimario: '#6366f1',   // índigo
    colorSecundario: '#14b8a6', // teal
    eslogan: 'Software profesional para generación de reportes empresariales'
  };

  // Logo simple de NexaReport (SVG en línea, sin depender de imágenes externas)
  function logoNexaReportHTML(tamano){
    tamano = tamano || 40;
    return `
      <svg width="${tamano}" height="${tamano}" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="36" rx="10" fill="${NEXAREPORT_BRAND.colorPrimario}"/>
        <path d="M11 27V13h3.2l8.6 10.4V13H26v14h-3.2L14.2 16.6V27H11z" fill="white"/>
        <circle cx="30" cy="10" r="3.2" fill="${NEXAREPORT_BRAND.colorSecundario}"/>
      </svg>`;
  }

  // ---------- Navegador simulado (barra de direcciones + contenido) ----------
  // containerId: dónde se dibuja. urlTexto: lo que se muestra en la barra de direcciones.
  // contenidoHTML: el HTML que va dentro de la "página" (resultados de búsqueda, sitio, etc.)
  function pintarVentanaNavegadorSimulado(containerId, urlTexto, contenidoHTML){
    const cont = document.getElementById(containerId);
    cont.innerHTML = `
      <div class="navegador-simulado">
        <div class="navegador-barra-superior">
          <span class="navegador-punto punto-rojo"></span>
          <span class="navegador-punto punto-amarillo"></span>
          <span class="navegador-punto punto-verde"></span>
        </div>
        <div class="navegador-barra-direcciones">
          <i class="fa-solid fa-lock navegador-candado"></i>
          <span class="navegador-url">${urlTexto}</span>
        </div>
        <div class="navegador-contenido">${contenidoHTML}</div>
      </div>`;
  }

  // ---------- Pantalla de búsqueda simulada (home de un buscador, solo el cuadro) ----------
  // Se usa ANTES de mostrar resultados: el estudiante debe escribir algo en el cuadro
  // de búsqueda (como en un buscador real) y enviarlo para recién ahí ver resultados.
  // Genérico y reutilizable: containerId es dónde se dibuja, opciones admite:
  //   dominio: texto mostrado como "sitio" del buscador (ej. 'buscador.com')
  //   placeholder: texto de ejemplo dentro del cuadro de búsqueda
  //   onBuscar(texto, { mostrarError }): se llama al enviar la búsqueda; si el texto
  //     no es válido, llama a mostrarError(mensaje) para avisar sin perder lo escrito.
  function pintarBuscadorSimulado(containerId, opciones){
    opciones = opciones || {};
    const dominio = opciones.dominio || 'buscador.com';
    const placeholder = opciones.placeholder || 'Escribe tu búsqueda...';
    const formId = containerId + '_formBuscar';
    const inputId = containerId + '_inputBuscar';
    const errorId = containerId + '_errorBuscar';

    const contenidoHTML = `
      <div class="buscador-home">
        <div class="buscador-home-logo"><i class="fa-solid fa-magnifying-glass"></i> ${dominio}</div>
        <form id="${formId}" class="buscador-home-form">
          <input type="text" id="${inputId}" class="buscador-home-input" placeholder="${placeholder}" autocomplete="off">
          <button type="submit" class="buscador-home-btn"><i class="fa-solid fa-magnifying-glass"></i> Buscar</button>
        </form>
        <div id="${errorId}" class="buscador-home-error hidden"></div>
      </div>`;

    pintarVentanaNavegadorSimulado(containerId, dominio, contenidoHTML);

    const form = document.getElementById(formId);
    const input = document.getElementById(inputId);
    const errorBox = document.getElementById(errorId);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      errorBox.classList.add('hidden');
      if(opciones.onBuscar){
        opciones.onBuscar(texto, {
          mostrarError: (mensaje) => {
            errorBox.textContent = mensaje;
            errorBox.classList.remove('hidden');
          }
        });
      }
    });

    setTimeout(() => { if(input) input.focus(); }, 50);
  }

  // ---------- Instalador simulado (ventana con barra de título + cuerpo) ----------
  // Igual de genérico que el navegador: solo dibuja la "ventana", el contenido de
  // cada paso lo decide quien llama (la actividad). Reutilizable para instalar
  // cualquier programa futuro, no solo NexaReport.
  function pintarVentanaInstaladorSimulado(containerId, tituloBarra, cuerpoHTML){
    const cont = document.getElementById(containerId);
    cont.innerHTML = `
      <div class="instalador-simulado">
        <div class="instalador-barra-titulo">
          ${logoNexaReportHTML(20)}
          <span>${tituloBarra}</span>
        </div>
        <div class="instalador-cuerpo">${cuerpoHTML}</div>
      </div>`;
  }
