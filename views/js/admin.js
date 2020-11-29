var pending = JSON.parse(localStorage.getItem("pendingList"));
var approved = JSON.parse(localStorage.getItem("oppsList"));

function create_pending(n) {
  $("<div/>", {
    class: "single-admin-container",
    id: `sc-${n}`,
    click: function() {
      var itemID = $(this).attr("id");
      var indexID = itemID.match(/\d+/);

      $(`#panel${indexID}`).toggleClass("visible");

    }
  }).appendTo(".admin-container");

  $("<div/>", {
    class: "panel visible",
    id: `panel${n}`,
  }).appendTo(".admin-container");

  $("<table/>", {
    class: `table${n}`,
  }).appendTo(`#panel${n}`);

  $("<div/>", {
    id: `opp-left${n}`,
    class: "opp-left",
  }).appendTo(`#sc-${n}`);

  $("<p/>", {
    class: "opp-name",
    text: pending[n].name
  }).appendTo(`#opp-left${n}`);
}

function create_approved(n) {
  $("<div/>", {
    class: "single-admin-container",
    id: `sc-${n}`,
    click: function() {
      var itemID = $(this).attr("id");
      var indexID = itemID.match(/\d+/);

      $(`#panel${indexID}`).toggleClass("visible");

    }
  }).appendTo(".published-container");

  $("<div/>", {
    class: "panel visible",
    id: `panel${n}`,
  }).appendTo(".published-container");

  $("<table/>", {
    class: `table${n}`,
  }).appendTo(`#panel${n}`);

  $("<div/>", {
    id: `opp-left${n}`,
    class: "opp-left",
  }).appendTo(`#sc-${n}`);

  $("<p/>", {
    class: "opp-name",
    text: approved[n].name
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
  for (var i = 0; i < data.length; i++) {
    if(i == rowNum){
      let row = table.insertRow();
      for (key in data[i]) {
        let cell = row.insertCell();
        var spanner = document.createElement("span");
        spanner.classList.add("table-span");
        let text = document.createTextNode(data[i][key]+"\00");
        cell.appendChild(spanner);
        spanner.appendChild(text);
      }
    }
  }
}

function page_ready(){
  for (var n = 0; n < pending.length; n++) {
    create_pending(n);
    var table = $("table")[n];
    var data = Object.keys(pending[0]);
    generateTableHead(table, data);
    generateTable(table, pending, n);
  }
  for (var n = pending.length; n < pending.length+approved.length-2; n++) {
    create_approved(n);
    var table = $("table")[n];
    var data = Object.keys(approved[0]);
    generateTableHead(table, data);
    generateTable(table, approved, n);
  }
}

$(document).ready(page_ready());
