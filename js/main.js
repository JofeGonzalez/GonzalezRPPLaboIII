let materiaPromise = new Promise(getMateria);
materiaPromise.then(fillTable).catch("Error");
let modifyBtn = document.getElementById("modify");
modifyBtn.addEventListener("click", sendModify);
let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", sendDelete);