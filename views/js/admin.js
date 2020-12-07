var pending = JSON.parse(localStorage.getItem("pendingList"));
var approved = JSON.parse(localStorage.getItem("oppsList"));

function create_pending(n) {
  $("<div/>", {
    class: "single-admin-container",
    id: `sc-${n}`
  }).appendTo(".admin-container");

  $("<div/>", {
    class: "panel-admin visible",
    id: `panel${n}`,
  }).appendTo(".admin-container");

  $("<table/>", {
    class: `table${n}`,
  }).appendTo(`#panel${n}`);

  $("<div/>", {
    id: `opp-left${n}`,
    class: "opp-left admin-left",
    click: function() {
      var itemID = $(this).attr("id");
      var indexID = itemID.match(/\d+/);

      $(`#panel${indexID}`).toggleClass("visible");

    }
  }).appendTo(`#sc-${n}`);

  $("<div/>", {
    id: `opp-right${n}`,
    class: "opp-right",
  }).appendTo(`#sc-${n}`);

  $("<p/>", {
    class: "opp-name",
    text: pending[n].name
  }).appendTo(`#opp-left${n}`);

  $("<i />", {
    class:"trigger fa fa-edit fa-lg",
    id: `trigger${n}`,
    onload: function() {
      $(this).attr("data-toggle", "modal");
      $(this).attr("data-target", "#editModal");
    },
    click: function() {
      toggleModal(n);
    }
  }).appendTo(`#opp-right${n}`);

  $("<i />", {
    class:"fa fa-close fa-lg delete",
    click: function() {
      deletePending(n);
    }
  }).appendTo(`#opp-right${n}`);
}

function create_approved(n) {
  $("<div/>", {
    class: "single-admin-container",
    id: `sc-${n}`
  }).appendTo(".published-container");

  $("<div/>", {
    class: "panel-admin visible",
    id: `panel${n}`,
  }).appendTo(".published-container");

  $("<table/>", {
    class: `table${n}`,
  }).appendTo(`#panel${n}`);

  $("<div/>", {
    id: `opp-left${n}`,
    class: "opp-left admin-left",
    click: function() {
      var itemID = $(this).attr("id");
      var indexID = itemID.match(/\d+/);

      $(`#panel${indexID}`).toggleClass("visible");

    }
  }).appendTo(`#sc-${n}`);

  $("<div/>", {
    id: `opp-right${n}`,
    class: "opp-right",
  }).appendTo(`#sc-${n}`);

  $("<p/>", {
    class: "opp-name",
    text: approved[n-pending.length].name
  }).appendTo(`#opp-left${n}`);

  $("<i />", {
    class:"fa fa-close fa-lg delete",
    click: function() {
      deleteOpportunities(n-pending.length);
    }
  }).appendTo(`#opp-right${n}`);
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
        let text = document.createTextNode(data[i][key]);

        cell.appendChild(spanner);
        spanner.appendChild(text);
        spanner.innerHTML = spanner.innerHTML +"<br>";
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
  for (var n = pending.length; n < pending.length+approved.length; n++) {
    create_approved(n);
    var table = $("table")[n];
    var data = Object.keys(approved[0]);
    generateTableHead(table, data);
    generateTable(table, approved, n-pending.length);
  }
}

$(document).ready(function() {
  page_ready();
});
