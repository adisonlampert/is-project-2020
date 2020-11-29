var pending = JSON.parse(localStorage.getItem("pendingList"));
var approved = JSON.parse(localStorage.getItem("oppsList"));

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");

function create_modal() {
  $(".modal-content").html("");
  $("<span/>", {
    class: "close-button",
    text: "x",
    click: function() {
      toggleModal();
    }
  }).appendTo(".modal-content");
  $("<table/>", {
    class: "modalTable"
  }).appendTo(".modal-content");
  var table = $(".modalTable")[0];
  var data = Object.keys(pending[0]);
  generateModalTableHead(table, data);
  generateModalTable(table, pending, 0);
  $("<i/>", {
    class: "fa fa-check-square"
  }).appendTo(".modal-content");
}

function generateModalTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    th.classList.add("modalHead")
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateModalTable(table, data, rowNum) {
  for (var i = 0; i < data.length; i++) {
    if(i == rowNum){
      let row = table.insertRow();
      for (key in data[i]) {
        let cell = row.insertCell();
        var spanner = document.createElement("textarea");
        spanner.classList.add("modalTextArea");
        spanner.type = "text";
        spanner.value = data[i][key];
        cell.appendChild(spanner);
      }
    }
  }
}

function toggleModal() {
    create_modal();
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
