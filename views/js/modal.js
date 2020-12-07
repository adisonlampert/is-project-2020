var pending = JSON.parse(localStorage.getItem("pendingList"));
var approved = JSON.parse(localStorage.getItem("oppsList"));

var modal = document.querySelector(".modal");

function create_modal(number) {
  $(".modal-body").html("");

  $("<table/>", {
    class: "modalTable"
  }).appendTo(".modal-body");
  var table = $(".modalTable")[0];
  var data = Object.keys(pending[0]);
  generateModalTableHead(table, data);
  generateModalTable(table, pending, number);
}

function generateModalTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    th.classList.add("modalHead");
    th.classList.add("modalEntry");
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
        $("<textarea/>", {
          class: "modalEntry modalTextArea",
          name: `${key}`,
          id: `${key}`,
          value: data[i][key],
          text: data[i][key]
        }).appendTo(cell);

      }
    }
  }
}

function toggleModal(num) {
    create_modal(num);
    //event.stopPropagation();

}
