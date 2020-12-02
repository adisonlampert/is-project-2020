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
  if (visible_list[n].visible) {
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
}

function display_sort(page_num) {

  $(".opp-main").html("");
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

function page_nav(opp_num) {
  if(pages < 6){
    for(var i = 1; i < pages+1; i++){
      $("<div/>", {
        class: "button button-inactive",
        text: i.toString(),
        value: i.toString(),
        click: function() {
          var cur_page = $(".button-active").text();
          var new_page = $(this).text();
          $(`.button[value='${(parseInt(cur_page)).toString()}']`).removeClass("button-active").addClass("button-inactive");
          $(`.button[value='${(new_page).toString()}']`).removeClass("button-inactive").addClass("button-active");
          display_sort(new_page);
          $("html, body").animate({ scrollTop: 0 }, "slow");
        }
      }).appendTo(".page-nav-container");
    };
    $(".button[value='1']").removeClass("button-inactive").addClass("button-active");
  }
  else {
    for(var i = 1; i <= 3; i++){
      $("<div/>", {
        class: "button button-inactive",
        text: i.toString(),
        value: i.toString(),
        click: function() {
          var cur_page = $(".button-active").text();
          var new_page = $(this).text();
          $(`.button[value='${(parseInt(cur_page)).toString()}']`).removeClass("button-active").addClass("button-inactive");
          $(`.button[value='${(new_page).toString()}']`).removeClass("button-inactive").addClass("button-active");
          display_sort(new_page);
          $("html, body").animate({ scrollTop: 0 }, "slow");
          if(parseInt(new_page) >= 3){
            $(`.button[value='${(parseInt(new_page)+ 1).toString()}']`).removeClass("button-hidden");
          }
          if(parseInt(new_page) < 3){
            $(".button[value='1']").removeClass("button-hidden");
            $(".button[value='2']").removeClass("button-hidden");
            $(".button[value='3']").removeClass("button-hidden");
            for(var i = 4; i < pages; i++){
              $(`.button[value='${(i).toString()}']`).addClass("button-hidden");
            }
            $(".dot-start").each(function() {
              $(this).css("display", "hidden");
            });
          }
        }
      }).appendTo(".page-nav-container");
    };
    for(var i = 1; i <= 3; i++){
      $("<div/>", {
        class: "button dot-start",
        text: ".",
        value: "."
      }).appendTo(".page-nav-container");
    };
    for(var i = 4; i <= pages-1; i++){
      $("<div/>", {
        class: "button button-inactive button-hidden",
        text: i.toString(),
        value: i.toString(),
        click: function() {
          var cur_page = $(".button-active").text();
          var new_page = $(this).text();
          $(`.button[value='${(parseInt(cur_page)).toString()}']`).removeClass("button-active").addClass("button-inactive");
          $(`.button[value='${(new_page).toString()}']`).removeClass("button-inactive").addClass("button-active");
          display_sort(new_page);
          $("html, body").animate({ scrollTop: 0 }, "slow");
          if(parseInt(new_page) >= 3){
            $(`.button[value='${(parseInt(new_page)+ 1).toString()}']`).removeClass("button-hidden");
          }
          if(parseInt(new_page) >= 6){
            $(".dot-start").each(function() {
              $(this).css("display", "block");
            });
            for(var i = new_page-2; i > 1; i--){
              $(`.button[value='${(i).toString()}']`).addClass("button-hidden");
            }
            $(`.button[value='${(new_page-1).toString()}']`).removeClass("button-hidden");
          }
          if(parseInt(new_page) < 3){
            $(".button[value='1']").removeClass("button-hidden");
            $(".button[value='2']").removeClass("button-hidden");
            $(".button[value='3']").removeClass("button-hidden");
            $(".dot-start").each(function() {
              $(this).css("display", "hidden");
            });
          }
          if(parseInt(new_page) == pages-2){
            $(".dot-end").each(function() {
              $(this).css("display", "hidden");
            });
          }
          if(parseInt(new_page) < parseInt(cur_page) && parseInt(new_page) < pages-2 && !$(".dot-end").is(":hidden")){
            $(`.button[value='${(parseInt(cur_page)+1).toString()}']`).addClass("button-hidden");
          }
          if(parseInt(new_page) == pages-3 && parseInt(cur_page) > parseInt(new_page)){
            $(".dot-end").each(function() {
              $(this).css("display", "block");
            });
            $(`.button[value='${(pages-1).toString()}']`).addClass("button-hidden");
          }
        }
      }).appendTo(".page-nav-container");
    };
    for(var i = 1; i <= 3; i++){
      $("<div/>", {
        class: "button dot-end",
        text: ".",
        value: "."
      }).appendTo(".page-nav-container");
    };
    $("<div/>", {
      class: "button button-inactive",
      text: (pages).toString(),
      value: (pages).toString(),
      click: function() {
        var cur_page = $(".button-active").text();
        var new_page = $(this).text();
        $(`.button[value='${(parseInt(cur_page)).toString()}']`).removeClass("button-active").addClass("button-inactive");
        $(`.button[value='${(new_page).toString()}']`).removeClass("button-inactive").addClass("button-active");
        display_sort(new_page);
        $("html, body").animate({ scrollTop: 0 }, "slow");
        if(parseInt(new_page) >= 3){
          $(`.button[value='${(parseInt(new_page)- 1).toString()}']`).removeClass("button-hidden");
          $(`.button[value='${(parseInt(new_page)- 2).toString()}']`).removeClass("button-hidden");
        }
        if(parseInt(new_page) >= 6){
          $(".dot-start").each(function() {
            $(this).css("display", "block");
          });
          for(var i = new_page-2; i > 1; i--){
            $(`.button[value='${(i).toString()}']`).addClass("button-hidden");
          }
        }
        if(parseInt(new_page) < 3){
          $(".button[value='1']").removeClass("button-hidden");
          $(".button[value='2']").removeClass("button-hidden");
          $(".button[value='3']").removeClass("button-hidden");
          $(".dot-start").each(function() {
            $(this).css("display", "hidden");
          });
          for(var i = 4; i < pages; i++){
            $(`.button[value='${(i).toString()}']`).addClass("button-hidden");
          }
        }
        $(".dot-end").each(function() {
          $(this).css("display", "none");
        });
      }
    }).appendTo(".page-nav-container");
    $(".button[value='1']").removeClass("button-inactive").addClass("button-active");
  }

}

function page_ready(){
  display_sort(1);
  page_nav(204);
}

$(document).ready(page_ready());

$(".next").on("click", function() {
  var cur_page = $(".button-active").text()
  if(cur_page > 3){
    if(cur_page == pages-3){
      $(".dot-end").each(function() {
        $(this).css("display", "none");
      });
      $(`.button[value='${(parseInt(cur_page)-1).toString()}']`).addClass("button-hidden");
    }
    else{
      $(".dot-start").each(function() {
        $(this).css("display", "block");
      });
      for(var i = parseInt(cur_page)-1; i > 1; i--){
        $(`.button[value='${(i).toString()}']`).addClass("button-hidden");
      }
    }
  }
  $(".button-active").removeClass("button-active").addClass("button-inactive");
  $(`.button[value='${(parseInt(cur_page)+1).toString()}']`).removeClass("button-inactive").addClass("button-active");
  $(`.button[value='${(parseInt(cur_page)+ 2).toString()}']`).removeClass("button-hidden");
  display_sort(parseInt(cur_page)+1);
  if(parseInt(cur_page) > pages-2){
    $(".dot-end").each(function() {
      $(this).css("display", "hidden");
    });
  }
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$(".back").on("click", function() {
  var cur_page = $(".button-active").text()
  if(cur_page != "1"){
    $(".button-active").removeClass("button-active").addClass("button-inactive");
    $(`.button[value='${(parseInt(cur_page)-1).toString()}']`).removeClass("button-inactive").addClass("button-active");
    if(parseInt(cur_page) < 6){
      if(parseInt(cur_page) == 5){
        $(".dot-start").each(function() {
          $(this).css("display", "none");
        });
        for(var i = 1; i < parseInt(cur_page)+1; i++){
          $(`.button[value='${(i).toString()}']`).removeClass("button-hidden");
        }
        $(`.button[value='${(parseInt(cur_page)+ 1).toString()}']`).addClass("button-hidden");
      }
      if(parseInt(cur_page) == 3){
        $(`.button[value='${(parseInt(cur_page)+ 1).toString()}']`).addClass("button-hidden");
        $(`.button[value='${(parseInt(cur_page)+ 2).toString()}']`).addClass("button-hidden");
      }
    }
    else if(parseInt(cur_page) > pages-4){
      $(".dot-end").each(function() {
        $(this).css("display", "hidden");
      });
      $(`.button[value='${(parseInt(cur_page)-2).toString()}']`).removeClass("button-hidden");
      if(parseInt(cur_page) == pages-3){
        $(".dot-end").each(function() {
          $(this).css("display", "block");
        });
        for(var i = pages-1; i > pages-3; i--){
          $(`.button[value='${(i).toString()}']`).addClass("button-hidden");
        }
      }
    }
    else{
      $(".dot-end").each(function() {
        $(this).css("display", "block");
      });
      $(`.button[value='${(parseInt(cur_page)-2).toString()}']`).removeClass("button-hidden");
      $(`.button[value='${(parseInt(cur_page)+ 1).toString()}']`).addClass("button-hidden");
    }

    display_sort(parseInt(cur_page)-1);
    $("html, body").animate({ scrollTop: 0 }, "slow");
  }
});
