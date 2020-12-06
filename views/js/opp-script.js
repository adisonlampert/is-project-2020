var visible_list = JSON.parse(localStorage.getItem("oppsList"));
var pages = Math.ceil(visible_list.length/20);

function sortT(sortType, sortName) {
  for (var n = 0; n < visible_list.length; n++) {
    if (visible_list[n][`${sortType}`] != sortName) {
      visible_list[n].visible = false;
    }
  }
  display_sort();
}

function create_opp(n) {
  $("<div/>", {
    class: "single-container-stem",
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
  }).appendTo(".opp-main");

  $("<div/>", {
    class: "panel-stem",
    id: `panel${n}`,
    style: "display: none",
  }).appendTo(".opp-main");

  $("<div/>", {
    id: `opp-left${n}`,
    class: "opp-left",
  }).appendTo(`#sc-${n}`);

  $("<div/>", {
    id: `opp-right${n}`,
    class: "opp-right",
  }).appendTo(`#sc-${n}`);

  $("<div/>", {
    class: "tags-stem",
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

function display_sort(page_num) {
  $(".opp-main").html("");
  console.log("called");
  console.log(visible_list);
  if(page_num != pages){
    for (var n = 20*(page_num-1); n < 20*(page_num); n++) {
      create_opp(n);
    }
  }
  else {
    for (var n = 20*(page_num-1); n < visible_list.length; n++) {
      create_opp(n);
    }
  }
}

$(".next").on("click", function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$(".back").on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
