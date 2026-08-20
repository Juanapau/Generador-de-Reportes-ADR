// ================= COMPONENTE COMPARTIDO: LISTA DE COTEJO =================
// Genera la tabla de "Lista de cotejo" (2 niveles: Cumple / No cumple),
// con el mismo estilo/estructura que la escala de valoración.
//
// criterios: [{ nombre, descripcion, nivel }]  nivel: 'cumple' | 'no_cumple' | null (null = aún no evaluado)
// puntajeMaximo: número total de puntos de la actividad
// notaFinal: número (solo se muestra si ya se evaluó) o null

function renderListaCotejo(containerId, criterios, puntajeMaximo, notaFinal){
  const cont = document.getElementById(containerId);
  if(!cont) return;

  const pesoUnidad = puntajeMaximo / criterios.length;

  const filas = criterios.map(c => {
    const estados = [
      { key:'cumple', label:'Cumple', icon:'fa-check', pts: pesoUnidad },
      { key:'no_cumple', label:'No cumple', icon:'fa-xmark', pts: 0 }
    ];
    const celdas = estados.map(e => {
      const activo = c.nivel === e.key;
      return `<td class="rub-celda rub-${e.key === 'cumple' ? 'logrado' : 'no_logrado'} ${activo ? 'rub-activo' : ''}">
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
      <div class="rubrica-titulo"><i class="fa-solid fa-list-check"></i> Lista de cotejo${notaFinal === null || notaFinal === undefined ? ' — así serás evaluado' : ''}</div>
      <table class="rubrica-visual">
        <thead>
          <tr>
            <th class="rub-th-indicador">Indicador</th>
            <th class="rub-th-descripcion">Descripción del desempeño</th>
            <th class="rub-th-logrado"><i class="fa-solid fa-check"></i> Cumple<br><span>${(pesoUnidad).toFixed(2)} pts</span></th>
            <th class="rub-th-nologrado"><i class="fa-solid fa-xmark"></i> No cumple<br><span>0 pts</span></th>
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
