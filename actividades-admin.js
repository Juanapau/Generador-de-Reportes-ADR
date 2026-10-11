// ===================== CONFIGURACIÓN =====================
var SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
var SHEET_USUARIOS = 'Usuarios';
var SHEET_ACTIVIDADES = 'Actividades';
var SHEET_CALIFICACIONES = 'Calificaciones';
var SHEET_RECURSOS = 'Recursos';
var SHEET_DB_VENTAS = 'DB_Ventas';
var SHEET_ACTIVIDADES_EXTRA = 'ActividadesExtra';
var SHEET_RESPUESTAS_EXTRA = 'RespuestasExtra';
var SHEET_CONFIGURACION = 'Configuracion';

function getSheet(name){
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(name);
}

function jsonResponse(obj){
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e){
  var action = e.parameter.action;
  if(action === 'login'){ return login(e.parameter.usuario, e.parameter.password, e.parameter.rol); }
  if(action === 'listarEstudiantes'){ return listarEstudiantes(); }
  if(action === 'listarActividades'){ return listarActividades(e.parameter.ra); }
  if(action === 'listarCalificaciones'){ return listarCalificaciones(e.parameter.usuario); }
  if(action === 'listarRecursos'){ return listarRecursos(e.parameter.codigo); }
  if(action === 'listarTablaDatos'){ return listarTablaDatos(e.parameter.tabla); }
  if(action === 'listarActividadesExtra'){ return listarActividadesExtra(); }
  if(action === 'listarRespuestasExtra'){ return listarRespuestasExtra(e.parameter.usuario); }
  if(action === 'listarRespuestasPorActividadExtra'){ return listarRespuestasPorActividadExtra(e.parameter.codigo); }
  if(action === 'listarCalificacionesPorRA'){ return listarCalificacionesPorRA(e.parameter.ra); }
  if(action === 'listarConfiguracion'){ return listarConfiguracion(); }
  return jsonResponse({ success:false, error:'Acción no reconocida' });
}

function doPost(e){
  var data = JSON.parse(e.postData.contents);
  var action = data.action;
  if(action === 'agregarEstudiante') return agregarEstudiante(data);
  if(action === 'actualizarEstudiante') return actualizarEstudiante(data);
  if(action === 'eliminarEstudiante') return eliminarEstudiante(data);
  if(action === 'cambiarPassword') return cambiarPassword(data);
  if(action === 'importarEstudiantes') return importarEstudiantes(data);
  if(action === 'actualizarActividad') return actualizarActividad(data);
  if(action === 'guardarCalificacion') return guardarCalificacion(data);
  if(action === 'agregarRecurso') return agregarRecurso(data);
  if(action === 'agregarRecursoArchivo') return agregarRecursoArchivo(data);
  if(action === 'eliminarRecurso') return eliminarRecurso(data);
  if(action === 'actualizarRecurso') return actualizarRecurso(data);
  if(action === 'guardarActividadExtra') return guardarActividadExtra(data);
  if(action === 'eliminarActividadExtra') return eliminarActividadExtra(data);
  if(action === 'enviarRespuestaExtra') return enviarRespuestaExtra(data);
  if(action === 'calificarRespuestaExtra') return calificarRespuestaExtra(data);
  if(action === 'guardarConfiguracion') return guardarConfiguracion(data);
  return jsonResponse({ success:false, error:'Acción no reconocida' });
}

function login(usuario, password, rol){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[0]) === String(usuario) && String(row[1]) === String(password) && String(row[2]) === String(rol)){
      return jsonResponse({ success:true, usuario: row[0], rol: row[2], nombre: row[3], equipo: row[4],
        primerAcceso: !(row[6] === false || String(row[6]).trim().toLowerCase() === 'no') });
    }
  }
  return jsonResponse({ success:false, error:'Usuario, contraseña o rol incorrecto.' });
}

function listarEstudiantes(){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  var estudiantes = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[2]) === 'estudiante'){
      estudiantes.push({ usuario: row[0], nombre: row[3], equipo: row[4], fechaRegistro: row[5] });
    }
  }
  return jsonResponse({ success:true, estudiantes: estudiantes });
}

function agregarEstudiante(data){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuario)){ return jsonResponse({ success:false, error:'Ese usuario ya existe.' }); }
  }
  sheet.appendRow([data.usuario, data.password, 'estudiante', data.nombre, data.equipo || '', new Date(), 'Si']);
  return jsonResponse({ success:true });
}

function actualizarEstudiante(data){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuarioOriginal)){
      sheet.getRange(i+1, 1).setValue(data.usuario);
      if(data.password){
        sheet.getRange(i+1, 2).setValue(data.password);
        sheet.getRange(i+1, 7).setValue('Si');
      }
      sheet.getRange(i+1, 4).setValue(data.nombre);
      sheet.getRange(i+1, 5).setValue(data.equipo || '');
      return jsonResponse({ success:true });
    }
  }
  return jsonResponse({ success:false, error:'Estudiante no encontrado.' });
}

function cambiarPassword(data){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuario)){
      sheet.getRange(i+1, 2).setValue(data.passwordNueva);
      sheet.getRange(i+1, 7).setValue('No');
      return jsonResponse({ success:true });
    }
  }
  return jsonResponse({ success:false, error:'Usuario no encontrado.' });
}

function importarEstudiantes(data){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  var existentes = {};
  for(var i=1; i<rows.length; i++){ existentes[String(rows[i][0])] = true; }
  var agregados = 0;
  var omitidos = [];
  (data.estudiantes || []).forEach(function(est){
    var usuario = String(est.usuario || '').trim();
    var nombre = String(est.nombre || '').trim();
    if(!usuario || !nombre){ omitidos.push(usuario || '(sin usuario)'); return; }
    if(existentes[usuario]){ omitidos.push(usuario); return; }
    sheet.appendRow([usuario, est.password ? String(est.password) : usuario, 'estudiante', nombre, est.equipo ? String(est.equipo) : '', new Date(), 'Si']);
    existentes[usuario] = true;
    agregados++;
  });
  return jsonResponse({ success:true, agregados: agregados, omitidos: omitidos });
}

function eliminarEstudiante(data){
  var sheet = getSheet(SHEET_USUARIOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuario)){ sheet.deleteRow(i+1); return jsonResponse({ success:true }); }
  }
  return jsonResponse({ success:false, error:'Estudiante no encontrado.' });
}

function listarActividades(ra){
  var sheet = getSheet(SHEET_ACTIVIDADES);
  var rows = sheet.getDataRange().getValues();
  var actividades = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(!ra || String(row[1]) === String(ra)){
      actividades.push({ codigo: row[0], ra: row[1], ec: row[2], enunciado: row[3], metodologia: row[4],
        puntaje: row[5], habilitada: row[6], tiempoEstimado: row[7] || 10,
        fechaInicio: row[8] ? formatearFechaISO(row[8]) : '', fechaFin: row[9] ? formatearFechaISO(row[9]) : '',
        titulo: row[10] || '' });
    }
  }
  return jsonResponse({ success:true, actividades: actividades });
}

function formatearFechaISO(valor){
  if(Object.prototype.toString.call(valor) === '[object Date]'){
    var tz = Session.getScriptTimeZone();
    return Utilities.formatDate(valor, tz, "yyyy-MM-dd'T'HH:mm");
  }
  return String(valor);
}

function actualizarActividad(data){
  var sheet = getSheet(SHEET_ACTIVIDADES);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.codigo)){
      if(data.enunciado !== undefined){ sheet.getRange(i+1, 4).setValue(data.enunciado); }
      sheet.getRange(i+1, 6).setValue(Number(data.puntaje) || 0);
      sheet.getRange(i+1, 7).setValue(data.habilitada ? 'Si' : 'No');
      sheet.getRange(i+1, 8).setValue(Number(data.tiempoEstimado) || 10);
      sheet.getRange(i+1, 9).setValue(data.fechaInicio || '');
      sheet.getRange(i+1, 10).setValue(data.fechaFin || '');
      sheet.getRange(i+1, 11).setValue(data.titulo || '');
      return jsonResponse({ success:true });
    }
  }
  return jsonResponse({ success:false, error:'Actividad no encontrada.' });
}

function guardarCalificacion(data){
  var sheet = getSheet(SHEET_CALIFICACIONES);
  var rows = sheet.getDataRange().getValues();
  var criteriosJSON = data.criterios ? JSON.stringify(data.criterios) : '';
  var detalleJSON = data.detalle ? JSON.stringify(data.detalle) : '';
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuario) && String(rows[i][1]) === String(data.codigo)){
      sheet.getRange(i+1, 5).setValue(Number(data.nota));
      sheet.getRange(i+1, 6).setValue(Number(data.puntajeMaximo));
      sheet.getRange(i+1, 7).setValue(new Date());
      sheet.getRange(i+1, 8).setValue(criteriosJSON);
      sheet.getRange(i+1, 9).setValue(detalleJSON);
      return jsonResponse({ success:true });
    }
  }
  sheet.appendRow([data.usuario, data.codigo, data.ra || '', data.ec || '', Number(data.nota), Number(data.puntajeMaximo), new Date(), criteriosJSON, detalleJSON]);
  return jsonResponse({ success:true });
}

function listarCalificaciones(usuario){
  var sheet = getSheet(SHEET_CALIFICACIONES);
  var rows = sheet.getDataRange().getValues();
  var calificaciones = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[0]) === String(usuario)){
      calificaciones.push({ codigo: row[1], ra: row[2], ec: row[3], nota: row[4], puntajeMaximo: row[5], fecha: row[6],
        criterios: row[7] ? JSON.parse(row[7]) : [], detalle: row[8] ? JSON.parse(row[8]) : [] });
    }
  }
  return jsonResponse({ success:true, calificaciones: calificaciones });
}

function listarRecursos(codigo){
  var sheet = getSheet(SHEET_RECURSOS);
  var rows = sheet.getDataRange().getValues();
  var recursos = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[1]) === String(codigo)){
      recursos.push({ id: row[0], codigo: row[1], tipo: row[2], nombre: row[3], url: row[4] });
    }
  }
  return jsonResponse({ success:true, recursos: recursos });
}

function agregarRecurso(data){
  var sheet = getSheet(SHEET_RECURSOS);
  var id = Utilities.getUuid();
  sheet.appendRow([id, data.codigo, data.tipo || 'enlace', data.nombre, data.url, new Date()]);
  return jsonResponse({ success:true, id:id });
}

function agregarRecursoArchivo(data){
  var carpeta = obtenerOCrearCarpetaRecursos();
  var bytes = Utilities.base64Decode(data.archivoBase64);
  var blob = Utilities.newBlob(bytes, data.mimeType, data.nombreArchivo);
  var archivo = carpeta.createFile(blob);
  archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  var sheet = getSheet(SHEET_RECURSOS);
  var id = Utilities.getUuid();
  sheet.appendRow([id, data.codigo, 'archivo', data.nombre, archivo.getUrl(), new Date()]);
  return jsonResponse({ success:true, id:id, url: archivo.getUrl() });
}

function obtenerOCrearCarpetaRecursos(){
  var nombre = 'Recursos - Generador de Reportes';
  var carpetas = DriveApp.getFoldersByName(nombre);
  if(carpetas.hasNext()){ return carpetas.next(); }
  return DriveApp.createFolder(nombre);
}

function eliminarRecurso(data){
  var sheet = getSheet(SHEET_RECURSOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.id)){ sheet.deleteRow(i+1); return jsonResponse({ success:true }); }
  }
  return jsonResponse({ success:false, error:'Recurso no encontrado.' });
}

function actualizarRecurso(data){
  var sheet = getSheet(SHEET_RECURSOS);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.id)){
      if(data.nombre !== undefined && String(data.nombre).trim() !== ''){ sheet.getRange(i+1, 4).setValue(data.nombre); }
      // La URL solo se cambia en enlaces; en archivos de Drive se conserva la existente.
      if(data.url !== undefined && String(data.url).trim() !== '' && String(rows[i][2]) !== 'archivo'){ sheet.getRange(i+1, 5).setValue(data.url); }
      return jsonResponse({ success:true });
    }
  }
  return jsonResponse({ success:false, error:'Recurso no encontrado.' });
}

function listarTablaDatos(nombreTabla){
  var sheet = getSheet(nombreTabla);
  if(!sheet){ return jsonResponse({ success:false, error:'La tabla "' + nombreTabla + '" no existe en la base de datos.' }); }
  var rows = sheet.getDataRange().getValues();
  if(rows.length < 2){ return jsonResponse({ success:true, tabla:nombreTabla, campos:rows[0] || [], datos:[] }); }
  var headers = rows[0];
  var datos = [];
  for(var i=1; i<rows.length; i++){
    var obj = {};
    for(var j=0; j<headers.length; j++){ obj[headers[j]] = rows[i][j]; }
    datos.push(obj);
  }
  return jsonResponse({ success:true, tabla:nombreTabla, campos:headers, datos:datos });
}

function sembrarDBVentas(){
  var sheet = getSheet(SHEET_DB_VENTAS);
  if(sheet.getLastRow() === 0){
    sheet.appendRow(['Fecha','Producto','Categoria','Cantidad','PrecioUnitario','Vendedor']);
  } else { return; }
  var ventas = [
    ['2026-01-05','Laptop HP 15','Computadoras',3,28500,'M. Reyes'],
    ['2026-01-06','Mouse inalámbrico','Accesorios',12,650,'P. Guzmán'],
    ['2026-01-07','Teclado mecánico','Accesorios',7,1200,'L. Fermín'],
    ['2026-01-08','Monitor LED 24"','Computadoras',5,7800,'M. Reyes'],
    ['2026-01-09','Impresora multifuncional','Periféricos',2,9500,'P. Guzmán'],
    ['2026-01-12','Disco SSD 480GB','Accesorios',9,2400,'L. Fermín'],
    ['2026-01-13','Audífonos Bluetooth','Accesorios',15,1100,'M. Reyes'],
    ['2026-01-14','Cámara web HD','Periféricos',6,1800,'P. Guzmán'],
    ['2026-01-15','Router WiFi','Redes',4,3200,'L. Fermín'],
    ['2026-01-16','Cargador USB-C','Accesorios',20,450,'M. Reyes'],
    ['2026-01-19','Laptop HP 15','Computadoras',2,28500,'P. Guzmán'],
    ['2026-01-20','Mouse inalámbrico','Accesorios',8,650,'L. Fermín'],
    ['2026-01-21','Monitor LED 24"','Computadoras',3,7800,'M. Reyes'],
    ['2026-01-22','Teclado mecánico','Accesorios',5,1200,'P. Guzmán'],
    ['2026-01-23','Router WiFi','Redes',2,3200,'L. Fermín']
  ];
  ventas.forEach(function(v){ sheet.appendRow(v); });
}

function sembrarActividadesRA1(){
  var sheet = getSheet(SHEET_ACTIVIDADES);
  if(sheet.getLastRow() === 0){
    sheet.appendRow(['Codigo','RA','EC','Enunciado','Metodologia','PuntajeMaximo','Habilitada','TiempoEstimadoMin']);
  }
  var actividades = [
    ['A.1.1','RA1','EC6.1.1','x','Estudio de caso'],
    ['A.1.2','RA1','EC6.1.1','x','Indagación guiada'],
    ['A.1.3','RA1','EC6.1.2','x','Aprendizaje práctico guiado'],
    ['A.1.4','RA1','EC6.1.2','x','Práctica dirigida'],
    ['A.1.5','RA1','EC6.1.3','x','Indagación guiada'],
    ['A.1.6','RA1','EC6.1.3','x','Aprendizaje colaborativo'],
    ['A.1.7','RA1','EC6.1.4','x','Práctica dirigida'],
    ['A.1.8','RA1','EC6.1.4','x','Aprendizaje práctico'],
    ['A.1.9','RA1','EC6.1.5','x','Aprendizaje basado en proyectos'],
    ['A.1.10','RA1','EC6.1.5','x','Estudio de caso']
  ];
  var existentes = {};
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){ existentes[String(rows[i][0])] = true; }
  actividades.forEach(function(act){
    if(!existentes[act[0]]){
      sheet.appendRow([act[0], act[1], act[2], act[3], act[4], 0, 'No', 10]);
    }
  });
}

function listarActividadesExtra(){
  var sheet = getSheet(SHEET_ACTIVIDADES_EXTRA);
  var rows = sheet.getDataRange().getValues();
  var actividades = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(!row[0]) continue;
    actividades.push({ codigo: row[0], titulo: row[1], enunciado: row[2], criterios: row[3] ? JSON.parse(row[3]) : [],
      puntajeMaximo: row[4], tiempoEstimadoMin: row[5], tipoRespuesta: row[6], habilitada: row[7] === 'Si' || row[7] === true,
      fechaInicio: formatearFechaISO(row[8]), fechaFin: formatearFechaISO(row[9]),
      tieneInstrumento: row[10] === '' || row[10] === undefined ? true : (row[10] === 'Si' || row[10] === true) });
  }
  return jsonResponse({ success:true, actividades: actividades });
}

function guardarActividadExtra(data){
  var sheet = getSheet(SHEET_ACTIVIDADES_EXTRA);
  var rows = sheet.getDataRange().getValues();
  var criteriosJSON = data.criterios ? JSON.stringify(data.criterios) : '[]';
  var habilitadaVal = data.habilitada ? 'Si' : 'No';
  var tieneInstrumentoVal = data.tieneInstrumento === false ? 'No' : 'Si';
  var codigo = data.codigo;
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(codigo)){
      sheet.getRange(i+1, 2).setValue(data.titulo || '');
      sheet.getRange(i+1, 3).setValue(data.enunciado || '');
      sheet.getRange(i+1, 4).setValue(criteriosJSON);
      sheet.getRange(i+1, 5).setValue(Number(data.puntajeMaximo) || 0);
      sheet.getRange(i+1, 6).setValue(Number(data.tiempoEstimadoMin) || 10);
      sheet.getRange(i+1, 7).setValue(data.tipoRespuesta || 'texto');
      sheet.getRange(i+1, 8).setValue(habilitadaVal);
      sheet.getRange(i+1, 9).setValue(data.fechaInicio ? new Date(data.fechaInicio) : '');
      sheet.getRange(i+1, 10).setValue(data.fechaFin ? new Date(data.fechaFin) : '');
      sheet.getRange(i+1, 11).setValue(tieneInstrumentoVal);
      return jsonResponse({ success:true, codigo: codigo });
    }
  }
  var maxNum = 0;
  for(var j=1; j<rows.length; j++){
    var m = String(rows[j][0]).match(/^EX\.(\d+)$/);
    if(m) maxNum = Math.max(maxNum, Number(m[1]));
  }
  codigo = 'EX.' + (maxNum + 1);
  sheet.appendRow([codigo, data.titulo || '', data.enunciado || '', criteriosJSON, Number(data.puntajeMaximo) || 0,
    Number(data.tiempoEstimadoMin) || 10, data.tipoRespuesta || 'texto', habilitadaVal,
    data.fechaInicio ? new Date(data.fechaInicio) : '', data.fechaFin ? new Date(data.fechaFin) : '', tieneInstrumentoVal]);
  return jsonResponse({ success:true, codigo: codigo });
}

function eliminarActividadExtra(data){
  var sheet = getSheet(SHEET_ACTIVIDADES_EXTRA);
  var rows = sheet.getDataRange().getValues();
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.codigo)){ sheet.deleteRow(i+1); return jsonResponse({ success:true }); }
  }
  return jsonResponse({ success:false, error:'No se encontró la actividad.' });
}

function enviarRespuestaExtra(data){
  var sheet = getSheet(SHEET_RESPUESTAS_EXTRA);
  var rows = sheet.getDataRange().getValues();
  var sheetAct = getSheet(SHEET_ACTIVIDADES_EXTRA);
  var rowsAct = sheetAct.getDataRange().getValues();
  var tieneInstrumento = true;
  for(var k=1; k<rowsAct.length; k++){
    if(String(rowsAct[k][0]) === String(data.codigo)){ tieneInstrumento = rowsAct[k][10] !== 'No'; break; }
  }
  var estadoInicial = tieneInstrumento ? 'pendiente' : 'completado';
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuario) && String(rows[i][1]) === String(data.codigo)){
      if(String(rows[i][3]) === 'calificado'){ return jsonResponse({ success:false, error:'Esta actividad ya fue calificada, no se puede reenviar.' }); }
      sheet.getRange(i+1, 3).setValue(data.respuestaTexto || '');
      sheet.getRange(i+1, 4).setValue(estadoInicial);
      sheet.getRange(i+1, 8).setValue(new Date());
      return jsonResponse({ success:true });
    }
  }
  sheet.appendRow([data.usuario, data.codigo, data.respuestaTexto || '', estadoInicial, '', '', '', new Date(), '']);
  return jsonResponse({ success:true });
}

function listarRespuestasExtra(usuario){
  var sheet = getSheet(SHEET_RESPUESTAS_EXTRA);
  var rows = sheet.getDataRange().getValues();
  var respuestas = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[0]) === String(usuario)){
      respuestas.push({ codigo: row[1], respuestaTexto: row[2], estado: row[3], nota: row[4], puntajeMaximo: row[5],
        criteriosCalificados: row[6] ? JSON.parse(row[6]) : [], fechaEnvio: formatearFechaISO(row[7]), fechaCalificacion: formatearFechaISO(row[8]) });
    }
  }
  return jsonResponse({ success:true, respuestas: respuestas });
}

function listarRespuestasPorActividadExtra(codigo){
  var sheet = getSheet(SHEET_RESPUESTAS_EXTRA);
  var rows = sheet.getDataRange().getValues();
  var respuestas = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[1]) === String(codigo)){
      respuestas.push({ usuario: row[0], codigo: row[1], respuestaTexto: row[2], estado: row[3], nota: row[4], puntajeMaximo: row[5],
        criteriosCalificados: row[6] ? JSON.parse(row[6]) : [], fechaEnvio: formatearFechaISO(row[7]), fechaCalificacion: formatearFechaISO(row[8]) });
    }
  }
  return jsonResponse({ success:true, respuestas: respuestas });
}

function calificarRespuestaExtra(data){
  var sheet = getSheet(SHEET_RESPUESTAS_EXTRA);
  var rows = sheet.getDataRange().getValues();
  var criteriosJSON = data.criterios ? JSON.stringify(data.criterios) : '[]';
  for(var i=1; i<rows.length; i++){
    if(String(rows[i][0]) === String(data.usuario) && String(rows[i][1]) === String(data.codigo)){
      sheet.getRange(i+1, 4).setValue('calificado');
      sheet.getRange(i+1, 5).setValue(Number(data.nota));
      sheet.getRange(i+1, 6).setValue(Number(data.puntajeMaximo));
      sheet.getRange(i+1, 7).setValue(criteriosJSON);
      sheet.getRange(i+1, 9).setValue(new Date());
      return jsonResponse({ success:true });
    }
  }
  return jsonResponse({ success:false, error:'No se encontró el envío del estudiante.' });
}

// ===================== TABLA DE CUMPLIMIENTO (todas las calificaciones de un RA a la vez) =====================
// Trae, en una sola llamada, qué estudiante completó qué actividad dentro de un RA —
// mucho más eficiente que pedir listarCalificaciones() estudiante por estudiante.
function listarCalificacionesPorRA(ra){
  var sheet = getSheet(SHEET_CALIFICACIONES);
  var rows = sheet.getDataRange().getValues();
  var calificaciones = [];
  for(var i=1; i<rows.length; i++){
    var row = rows[i];
    if(String(row[2]) === String(ra)){
      calificaciones.push({ usuario: row[0], codigo: row[1], nota: row[4], puntajeMaximo: row[5] });
    }
  }
  return jsonResponse({ success:true, calificaciones: calificaciones });
}

function obtenerOCrearHojaGenerador_(nombre){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hoja = ss.getSheetByName(nombre);
  if(!hoja){ hoja = ss.insertSheet(nombre); }
  return hoja;
}

function sembrarDBEmpleados(){
  var sheet = obtenerOCrearHojaGenerador_('DB_Empleados');
  if(sheet.getLastRow() === 0){ sheet.appendRow(['Id','Nombre','Departamento','Cargo','FechaContratacion','Salario','Email']); }
  if(sheet.getLastRow() <= 1){
    var datos = [[1,'a','a','a','a',1,'a']];
    datos.forEach(function(d){ sheet.appendRow(d); });
  }
}
function sembrarDBClientes(){
  var sheet = obtenerOCrearHojaGenerador_('DB_Clientes');
  if(sheet.getLastRow() === 0){ sheet.appendRow(['Id','Nombre','Ciudad','Telefono','TipoCliente','FechaRegistro']); }
  if(sheet.getLastRow() <= 1){
    var datos = [[1,'a','a','a','a','a']];
    datos.forEach(function(d){ sheet.appendRow(d); });
  }
}
function sembrarDBInventario(){
  var sheet = obtenerOCrearHojaGenerador_('DB_Inventario');
  if(sheet.getLastRow() === 0){ sheet.appendRow(['Producto','Categoria','CantidadDisponible','PrecioUnitario','Proveedor','NivelMinimo']); }
  if(sheet.getLastRow() <= 1){
    var datos = [['a','a',1,1,'a',1]];
    datos.forEach(function(d){ sheet.appendRow(d); });
  }
}
function sembrarDBGastos(){
  var sheet = obtenerOCrearHojaGenerador_('DB_Gastos');
  if(sheet.getLastRow() === 0){ sheet.appendRow(['Fecha','Categoria','Descripcion','Monto','Departamento','AprobadoPor']); }
  if(sheet.getLastRow() <= 1){
    var datos = [['a','a','a',1,'a','a']];
    datos.forEach(function(d){ sheet.appendRow(d); });
  }
}
function sembrarTodaLaBaseDeDatosAmpliada(){
  sembrarDBEmpleados();
  sembrarDBClientes();
  sembrarDBInventario();
  sembrarDBGastos();
}

// ===================== CONFIGURACIÓN GENERAL DEL SISTEMA =====================
// Hoja "Configuracion": Clave | Valor  (par simple, una fila por dato guardado)
// Se autocrea si aún no existe, para no depender de crearla a mano en el Sheet.
function obtenerHojaConfiguracion_(){
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var hoja = ss.getSheetByName(SHEET_CONFIGURACION);
  if(!hoja){
    hoja = ss.insertSheet(SHEET_CONFIGURACION);
    hoja.appendRow(['Clave', 'Valor']);
  }
  return hoja;
}

function listarConfiguracion(){
  var sheet = obtenerHojaConfiguracion_();
  var rows = sheet.getDataRange().getValues();
  var config = {};
  for(var i=1; i<rows.length; i++){
    if(rows[i][0]) config[String(rows[i][0])] = rows[i][1];
  }
  return jsonResponse({ success:true, config: config });
}

function guardarConfiguracion(data){
  var sheet = obtenerHojaConfiguracion_();
  var rows = sheet.getDataRange().getValues();
  var claves = ['nombreModulo', 'anioLectivo', 'docenteResponsable'];

  claves.forEach(function(clave){
    var encontrada = false;
    for(var i=1; i<rows.length; i++){
      if(String(rows[i][0]) === clave){
        sheet.getRange(i+1, 2).setValue(data[clave] || '');
        encontrada = true;
        break;
      }
    }
    if(!encontrada){
      sheet.appendRow([clave, data[clave] || '']);
    }
  });

  return jsonResponse({ success:true });
}


function sembrarDBAsistencia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const existente = ss.getSheetByName('DB_Asistencia');
  if (existente) { ss.deleteSheet(existente); }
  const hoja = ss.insertSheet('DB_Asistencia');

  const encabezados = ['Fecha', 'Empleado', 'Departamento', 'HoraEntrada', 'HoraSalida', 'Estado'];
  hoja.appendRow(encabezados);

  const datos = [
    ['15/01/2026', 'Carlos Fernández', 'Ventas',         '08:02', '17:05', 'Presente'],
    ['15/01/2026', 'Ana Ramírez',      'Ventas',         '07:55', '17:00', 'Presente'],
    ['15/01/2026', 'Miguel Santos',    'Almacén',        '08:15', '17:10', 'Tarde'],
    ['15/01/2026', 'Rosa Jiménez',     'Contabilidad',   '08:00', '17:00', 'Presente'],
    ['15/01/2026', 'Luis Peña',        'Administración', '',      '',      'Ausente'],
    ['15/01/2026', 'Carmen Reyes',     'Almacén',        '07:58', '17:02', 'Presente'],

    ['16/01/2026', 'Carlos Fernández', 'Ventas',         '07:59', '17:03', 'Presente'],
    ['16/01/2026', 'Ana Ramírez',      'Ventas',         '08:10', '17:00', 'Tarde'],
    ['16/01/2026', 'Miguel Santos',    'Almacén',        '08:01', '17:05', 'Presente'],
    ['16/01/2026', 'Rosa Jiménez',     'Contabilidad',   '08:03', '17:08', 'Presente'],
    ['16/01/2026', 'Luis Peña',        'Administración', '08:00', '17:00', 'Presente'],
    ['16/01/2026', 'Carmen Reyes',     'Almacén',        '07:57', '16:58', 'Presente'],

    ['19/01/2026', 'Carlos Fernández', 'Ventas',         '08:00', '17:00', 'Presente'],
    ['19/01/2026', 'Ana Ramírez',      'Ventas',         '07:50', '17:00', 'Presente'],
    ['19/01/2026', 'Miguel Santos',    'Almacén',        '',      '',      'Ausente'],
    ['19/01/2026', 'Rosa Jiménez',     'Contabilidad',   '08:05', '17:02', 'Presente'],
    ['19/01/2026', 'Luis Peña',        'Administración', '08:01', '17:00', 'Presente'],
    ['19/01/2026', 'Carmen Reyes',     'Almacén',        '08:12', '17:00', 'Tarde'],

    ['20/01/2026', 'Carlos Fernández', 'Ventas',         '08:03', '17:01', 'Presente'],
    ['20/01/2026', 'Ana Ramírez',      'Ventas',         '07:58', '17:05', 'Presente'],
    ['20/01/2026', 'Miguel Santos',    'Almacén',        '08:00', '17:00', 'Presente'],
    ['20/01/2026', 'Rosa Jiménez',     'Contabilidad',   '08:00', '17:00', 'Presente'],
    ['20/01/2026', 'Luis Peña',        'Administración', '08:20', '17:00', 'Tarde'],
    ['20/01/2026', 'Carmen Reyes',     'Almacén',        '07:59', '17:00', 'Presente']
  ];

  hoja.getRange(2, 1, datos.length, encabezados.length).setValues(datos);
  hoja.getRange(1, 1, 1, encabezados.length).setFontWeight('bold');
  hoja.autoResizeColumns(1, encabezados.length);

  Logger.log('DB_Asistencia creada con ' + datos.length + ' registros.');
}


function sembrarCampoRegionVentas() {
  const REGIONES = ['Norte', 'Sur', 'Este', 'Oeste'];

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('DB_Ventas');
  if (!hoja) {
    throw new Error('No se encontró la hoja "DB_Ventas" en esta base de datos.');
  }

  const ultimaFila = hoja.getLastRow();
  const ultimaColumna = hoja.getLastColumn();
  if (ultimaFila < 2) {
    Logger.log('DB_Ventas no tiene filas de datos todavía; no hay nada que rellenar.');
    return;
  }

  const encabezados = hoja.getRange(1, 1, 1, ultimaColumna).getValues()[0];
  let colRegion = encabezados.findIndex(h => String(h).trim().toLowerCase() === 'región' || String(h).trim().toLowerCase() === 'region');

  if (colRegion === -1) {
    // La columna no existe todavía: se crea al final de la hoja.
    colRegion = ultimaColumna; // índice 0-based de la nueva columna
    hoja.getRange(1, colRegion + 1).setValue('Región');
    Logger.log('Columna "Región" creada en DB_Ventas.');
  } else {
    Logger.log('La columna "Región" ya existía; solo se rellenarán las filas vacías.');
  }

  const numFilasDatos = ultimaFila - 1;
  const rangoRegion = hoja.getRange(2, colRegion + 1, numFilasDatos, 1);
  const valoresActuales = rangoRegion.getValues();

  const nuevosValores = valoresActuales.map((fila, i) => {
    const valorActual = String(fila[0] || '').trim();
    if (valorActual) return [valorActual]; // ya tiene región asignada: no se toca
    return [REGIONES[i % REGIONES.length]];
  });

  rangoRegion.setValues(nuevosValores);

  Logger.log('Listo: DB_Ventas ahora tiene la columna "Región" completa en ' + numFilasDatos + ' filas.');
}
