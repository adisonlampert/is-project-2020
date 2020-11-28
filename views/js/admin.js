var visible_list = JSON.parse(localStorage.getItem("pendingList"));

function create_opp(n) {
  if (visible_list[n].visible) {
    $("<div/>", {
      class: "single-container",
      id: `sc-${n}`,
      click: function() {
        var itemID = $(this).attr("id");
        var indexID = itemID.match(/\d+/);
        var link = visible_list[indexID].link;
        $(`#panel${indexID}`).html("");

        $("<p/>", {
          class: "details-name",
          text: visible_list[indexID].name
        }).appendTo(`#panel${indexID}`);

        $("<p/>", {
          class: "details",
          text: visible_list[indexID].description
        }).appendTo(`#panel${indexID}`);

        $("<a/>", {
          class: "details-link",
          text: "Link",
          click: function() {
            var win = window.open(visible_list[indexID].link, '_blank');
            if (win) {
              //Browser has allowed it to be opened
              win.focus();
            } else {
              //Browser has blocked it
              alert('Please allow popups for this website');
            }
          }
        }).appendTo(`#panel${indexID}`);

        $(`#panel${indexID}`).toggle();
      }
    }).appendTo(".admin-main");

    $("<div/>", {
      class: "panel",
      id: `panel${n}`,
    }).appendTo(".admin-main");

    $("<div/>", {
      id: `opp-left${n}`,
      class: "opp-left",
    }).appendTo(`#sc-${n}`);

    $("<div/>", {
      id: `opp-right${n}`,
      class: "opp-right",
    }).appendTo(`#sc-${n}`);

    $("<div/>", {
      class: "tags",
      id: `tags-${n}`
    }).appendTo(`#opp-left${n}`);

    $("<p/>", {
      class: "cat-name",
      text: visible_list[n].category
    }).appendTo(`#tags-${n}`);

    $("<p/>", {
      class: "type-name",
      text: visible_list[n].type
    }).appendTo(`#tags-${n}`);

    $("<p/>", {
      class: "opp-name",
      text: visible_list[n].name
    }).appendTo(`#opp-left${n}`);

    $("<p/>", {
      class: "loc-info",
      text: `Location: ${visible_list[n].location}`
    }).appendTo(`#opp-left${n}`);

    $("<p/>", {
      class: "app-info",
      text: `Application Deadline: ${visible_list[n].deadline}`
    }).appendTo(`#opp-right${n}`);

    $("<p/>", {
      class: "date-info",
      text: `Date: ${visible_list[n].dateRange}`
    }).appendTo(`#opp-right${n}`);

  }
}

function page_ready(){
  for (var n = 0; n < visible_list.length; n++) {
    create_opp(n);
  }
}

$(document).ready(page_ready());
