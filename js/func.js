var MaleCB = document.getElementById("MaleCB");
var FemaleCB = document.getElementById("FemaleCB");

var materias = new Array();

var personaAModificar = new Object();

function closeForm() {
  var form = document.getElementById("containerForm");
  form.style.cssText = "visibility: hidden;";
}

function openForm(event) {
  var form = document.getElementById("containerForm");
  form.style.cssText = "visibility: initial;";
  var persona = event.target.parentNode;
  personaAModificar = persona;
  var nombre = document.getElementById("name");
  var fecha = document.getElementById("fecha");
  var localidad = document.getElementById("localidades");
  nombre.value = persona.children[1].innerHTML;
  localidad.value = persona.children[2].innerHTML;
  fecha.value = persona.children[3].innerHTML;
  if (persona.children[4].innerHTML == "Mañana") {
    FemaleCB.checked = false;
    MaleCB.checked = true;
  } else {
    MaleCB.checked = false;
    FemaleCB.checked = true;
  }
}

MaleCB.addEventListener("change", function () {
  if (FemaleCB.checked) {
    FemaleCB.checked = false;
  }
});

FemaleCB.addEventListener("change", function () {
  if (MaleCB.checked) {
    MaleCB.checked = false;
  }
});

function fillTable(materia) {
  console.log(materia);
  materias = materia[0];
  for (let i = 0; i < materia[0].length; i++) {
    let fila = document.createElement("tr");
    let materiaId = document.createElement("td");
    let materiaNombre = document.createElement("td");
    let materiaCuatrimeste = document.createElement("td");
    let materiaFechaFinal = document.createElement("td");
    let materiaTurno = document.createElement("td");
    let tableId = document.createTextNode(materia[0][i].id);
    let tableNombre = document.createTextNode(materia[0][i].nombre);
    let tableCuatrimeste = document.createTextNode(materia[0][i].cuatrimestre);
    let tableFechaFinal = document.createTextNode(materia[0][i].fechaFinal);
    let tableTurno = document.createTextNode(materia[0][i].turno);
    materiaId.appendChild(tableId);
    materiaNombre.appendChild(tableNombre);
    materiaCuatrimeste.appendChild(tableCuatrimeste);
    materiaFechaFinal.appendChild(tableFechaFinal);
    materiaTurno.appendChild(tableTurno);
    fila.appendChild(materiaId);
    fila.appendChild(materiaNombre);
    fila.appendChild(materiaCuatrimeste);
    fila.appendChild(materiaFechaFinal);
    fila.appendChild(materiaTurno);
    fila.addEventListener("dblclick", openForm);
    document.getElementById("table").appendChild(fila);
  }
}

function changeData(persona) {
  var spinner = document.getElementById("spinner");
  spinner.style.cssText = "visibility: initial;";
  var nombre = document.getElementById("name").value;
  var cuatrimeste = document.getElementById("localidades").value;
  var fecha = document.getElementById("fecha").value;
  var sexo;

  if (MaleCB.checked) {
    sexo = "Mañana";
  } else {
    sexo = "Noche";
  }

  if (validName(nombre) && sexo != null && validDate(fecha)) {
    let personaJson = {
      id: persona.children[0].innerHTML,
      nombre: nombre,
      cuatrimestre: persona.children[2].innerHTML,
      fecha: fecha,
      turno: sexo,
    };
    var nombreBox = document.getElementById("name");
    var table = document.getElementById("containerTable");
    nombreBox.style.cssText = "border-color: black;";
    table.style.cssText = "visibility: hidden;";
    modifySomeoneData(personaJson, persona);
  } else {
    spinner.style.cssText = "visibility: hidden;";
    var nombreBox = document.getElementById("name");
    nombreBox.style.cssText = "border-color: red;";
  }
}

function validName(Name) {
  if (Name.length > 5) {
    return true;
  } else {
    return false;
  }
}

function sendModify() {
  changeData(personaAModificar);
}

function validDate(date) {
  if (new Date(date) > new Date()) {
    return true;
  } else {
    return false;
  }
}

function sendDelete(){
    deleteData(personaAModificar);
}

function deleteData(persona) {
    var spinner = document.getElementById("spinner");
    spinner.style.cssText = "visibility: initial;";
    var nombre = document.getElementById("name").value;
    var cuatrimeste = document.getElementById("localidades").value;
    var fecha = document.getElementById("fecha").value;
    var sexo;
  
    if (MaleCB.checked) {
      sexo = "Mañana";
    } else {
      sexo = "Noche";
    }
  
    if (validName(nombre) && sexo != null) {
      let personaJson = {
        id: persona.children[0].innerHTML,
        nombre: nombre,
        cuatrimestre: persona.children[2].innerHTML,
        fecha: fecha,
        turno: sexo,
      };
      var nombreBox = document.getElementById("name");
      var table = document.getElementById("containerTable");
      nombreBox.style.cssText = "border-color: black;";
      table.style.cssText = "visibility: hidden;";
      deleteSomeoneData(personaJson, persona);
    } else {
      spinner.style.cssText = "visibility: hidden;";
      var nombreBox = document.getElementById("name");
      nombreBox.style.cssText = "border-color: red;";
    }
  }