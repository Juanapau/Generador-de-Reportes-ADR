// ================= COMPONENTE COMPARTIDO: RÚBRICA VISUAL =================
// Genera la tabla de "Escala de valoración" con el mismo estilo/estructura
// para todas las actividades del sistema.
//
// criterios: [{ nombre, descripcion, nivel }]  nivel: 'logrado' | 'proceso' | 'no_logrado' | null (null = aún no evaluado)
// puntajeMaximo: número total de puntos de la actividad
// notaFinal: número (solo se muestra si ya se evaluó) o null

function renderRubrica(containerId, criterios, puntajeMaximo, notaFinal){
  const cont = document.getElementById(containerId);
  if(!cont) return;

  const pesoUnidad = puntajeMaximo / criterios.length;

  const filas = criterios.map(c => {
    const estados = [
      { key:'logrado', label:'Logrado', icon:'fa-check', pts: pesoUnidad },
      { key:'proceso', label:'En proceso', icon:'fa-triangle-exclamation', pts: pesoUnidad/2 },
      { key:'no_logrado', label:'No logrado', icon:'fa-xmark', pts: 0 }
    ];
    const celdas = estados.map(e => {
      const activo = c.nivel === e.key;
      return `<td class="rub-celda rub-${e.key} ${activo ? 'rub-activo' : ''}">
        ${activo ? `<i class="fa-solid ${e.icon}"></i> ${e.label}` : ''}
      </td>`;
    }).join('');
    return `
      <tr>
        <td class="rub-indicador">${c.nombre}</td>
        <td class="rub-descripcion">${c.descripcion}</td>
        ${celdas}
      </tr>`;
  }).join('');

  cont.innerHTML = `
    <div class="rubrica-wrap">
      <div class="rubrica-titulo"><i class="fa-solid fa-clipboard-list"></i> Escala de valoración${notaFinal === null || notaFinal === undefined ? ' — así serás evaluado' : ''}</div>
      <table class="rubrica-visual">
        <thead>
          <tr>
            <th class="rub-th-indicador">Indicador</th>
            <th class="rub-th-descripcion">Descripción del desempeño</th>
            <th class="rub-th-logrado"><i class="fa-solid fa-check"></i> Logrado<br><span>${(pesoUnidad).toFixed(2)} pts</span></th>
            <th class="rub-th-proceso"><i class="fa-solid fa-triangle-exclamation"></i> En proceso<br><span>${(pesoUnidad/2).toFixed(2)} pts</span></th>
            <th class="rub-th-nologrado"><i class="fa-solid fa-xmark"></i> No logrado<br><span>0 pts</span></th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
      <div class="rubrica-total">
        <div class="rubrica-total-label">Calificación total</div>
        <div class="rubrica-total-valor">${notaFinal === null || notaFinal === undefined ? '—' : notaFinal} / ${puntajeMaximo.toFixed(2)}</div>
      </div>
    </div>
  `;
}
