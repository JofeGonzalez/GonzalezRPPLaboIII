function getMateria(correct, wrong) {
  var xhttpGetMateria = new XMLHttpRequest();
  xhttpGetMateria.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let vector = new Array(JSON.parse(this.response));
      console.log(this.statusText);
      correct(vector);
    } else if ((this.readyState != 4) & (this.status == 404)) {
      console.log(wrong);
    }
  };
  xhttpGetMateria.open("GET", "http://localhost:3000/materias", true);
  xhttpGetMateria.send();
}

function modifySomeoneData(persona, filaTabla) {
  var xhttpModifyData = new XMLHttpRequest();
  xhttpModifyData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200 && this.statusText == "OK") {
      filaTabla.childNodes[1].innerHTML = persona.nombre;
      filaTabla.childNodes[2].innerHTML = persona.cuatrimestre;
      filaTabla.childNodes[3].innerHTML = persona.fecha;
      filaTabla.childNodes[4].innerHTML = persona.turno;
      var spinner = document.getElementById("spinner");
      spinner.style.cssText = "visibility: hidden;";
      var table = document.getElementById("containerTable");
      table.style.cssText = "visibility: initial;";
      var container = document.getElementById("containerForm");
      container.style.cssText = "visibility: hidden;";
    } else {
      console.log("Error");
    }
  };
  xhttpModifyData.open("POST", "http://localhost:3000/editar");
  xhttpModifyData.setRequestHeader("content-type", "application/json");
  let Persona = {
    id: persona.id,
    nombre: persona.nombre,
    cuatrimestre: persona.cuatrimestre,
    fecha: persona.fecha,
    turno: persona.turno,
  };
  xhttpModifyData.send(JSON.stringify(Persona));
}

function deleteSomeoneData(persona, filaTabla) {
  var xhttpModifyData = new XMLHttpRequest();
  xhttpModifyData.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200 && this.statusText == "OK") {
      filaTabla.childNodes[1].innerHTML = "";
      filaTabla.childNodes[2].innerHTML = "";
      filaTabla.childNodes[3].innerHTML = "";
      filaTabla.childNodes[4].innerHTML = "";
      var spinner = document.getElementById("spinner");
      spinner.style.cssText = "visibility: hidden;";
      var table = document.getElementById("containerTable");
      table.style.cssText = "visibility: initial;";
      var container = document.getElementById("containerForm");
      container.style.cssText = "visibility: hidden;";
    } else {
      console.log("Error");
    }
  };
  xhttpModifyData.open("POST", "http://localhost:3000/eliminar");
  xhttpModifyData.setRequestHeader("content-type", "application/json");
  let Persona = {
    id: persona.id,
  };
  xhttpModifyData.send(JSON.stringify(Persona));
}
