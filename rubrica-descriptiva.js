// ================= COMPONENTE COMPARTIDO: RÚBRICA DESCRIPTIVA =================
// Genera una rúbrica de 4 niveles (Excelente / Bueno / En proceso / Insuficiente),
// donde cada celda describe específicamente el desempeño esperado en ese nivel,
// con el mismo estilo/estructura que los demás instrumentos.
//
// criterios: [{ nombre, niveles: { excelente, bueno, proceso, insuficiente }, nivel }]
//   nivel: 'excelente' | 'bueno' | 'proceso' | 'insuficiente' | null (null = aún no evaluado)
// puntajeMaximo: número total de puntos de la actividad
// notaFinal: número (solo se muestra si ya se evaluó) o null

function renderRubricaDescriptiva(containerId, criterios, puntajeMaximo, notaFinal){
  const cont = document.getElementById(containerId);
  if(!cont) return;

  const pesoUnidad = puntajeMaximo / criterios.length;
  const ESTADOS = [
    { key:'excelente',    label:'Excelente',    icon:'fa-star',              pts: pesoUnidad,       clase:'logrado' },
    { key:'bueno',        label:'Bueno',        icon:'fa-thumbs-up',         pts: pesoUnidad*0.75,  clase:'bueno' },
    { key:'proceso',      label:'En proceso',   icon:'fa-triangle-exclamation', pts: pesoUnidad*0.4, clase:'proceso' },
    { key:'insuficiente', label:'Insuficiente', icon:'fa-xmark',             pts: 0,                 clase:'no_logrado' }
  ];

  const filas = criterios.map(c => {
    const celdas = ESTADOS.map(e => {
      const activo = c.nivel === e.key;
      const texto = c.niveles ? c.niveles[e.key] : '';
      return `<td class="rub-celda rub-${e.clase} rub-descriptiva-celda ${activo ? 'rub-activo' : ''}">
        ${activo ? `<i class="fa-solid ${e.icon}"></i> ` : ''}${texto || ''}
      </td>`;
    }).join('');
    return `
      <tr>
        <td class="rub-indicador">${c.nombre}</td>
        ${celdas}
      </tr>`;
  }).join('');

  cont.innerHTML = `
    <div class="rubrica-wrap">
      <div class="rubrica-titulo"><i class="fa-solid fa-award"></i> Rúbrica${notaFinal === null || notaFinal === undefined ? ' — así serás evaluado' : ''}</div>
      <table class="rubrica-visual rubrica-descriptiva">
        <thead>
          <tr>
            <th class="rub-th-indicador">Indicador</th>
            <th class="rub-th-logrado"><i class="fa-solid fa-star"></i> Excelente<br><span>${(pesoUnidad).toFixed(2)} pts</span></th>
            <th class="rub-th-bueno"><i class="fa-solid fa-thumbs-up"></i> Bueno<br><span>${(pesoUnidad*0.75).toFixed(2)} pts</span></th>
            <th class="rub-th-proceso"><i class="fa-solid fa-triangle-exclamation"></i> En proceso<br><span>${(pesoUnidad*0.4).toFixed(2)} pts</span></th>
            <th class="rub-th-nologrado"><i class="fa-solid fa-xmark"></i> Insuficiente<br><span>0 pts</span></th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
      </table>
      <div class="rubrica-total">
        <div class="rubrica-total-label">Calificación total</div>
        <div class="rubrica-total-valor"><span id="${containerId}-nota">${notaFinal === null || notaFinal === undefined ? '—' : '0.00'}</span> / ${puntajeMaximo.toFixed(2)}</div>
      </div>
    </div>
  `;

  if(notaFinal !== null && notaFinal !== undefined){
    animarContador(document.getElementById(`${containerId}-nota`), 0, notaFinal, 900);
  }
}
