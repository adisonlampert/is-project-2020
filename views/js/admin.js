var visible_list = JSON.parse(localStorage.getItem("pendingList"));

function create_opp(n) {
  $("<div/>", {
    class: "single-container",
    id: `sc-${n}`,
    click: function() {
      var itemID = $(this).attr("id");
      var indexID = itemID.match(/\d+/);
      var link = visible_list[indexID].link;
      //$(`#panel${indexID}`).html("");

      $(`#panel${indexID}`).toggleClass("visible");

    }
  }).appendTo(".admin-main");

  $("<div/>", {
    class: "panel visible",
    id: `panel${n}`,
  }).appendTo(".admin-main");

  $("<table/>", {
    class: `table${n}`,
  }).appendTo(`#panel${n}`);

  $("<div/>", {
    id: `opp-left${n}`,
    class: "opp-left",
  }).appendTo(`#sc-${n}`);

  $("<p/>", {
    class: "opp-name",
    text: visible_list[n].name
  }).appendTo(`#opp-left${n}`);
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data, rowNum) {
  for (var i = 0; i < visible_list.length; i++) {
    if(i == rowNum){
      let row = table.insertRow();
      for (key in visible_list[i]) {
        let cell = row.insertCell();
        let text = document.createTextNode(visible_list[i][key]);
        cell.appendChild(text);
      }
    }
  }
}

function page_ready(){
  for (var n = 0; n < visible_list.length; n++) {
    create_opp(n);
    var table = $("table")[n];
    var data = Object.keys(visible_list[0]);
    generateTableHead(table, data);
    generateTable(table, visible_list, n);

  }

}

$(document).ready(page_ready());
