function updateCountdown() {
  // 140 is the max message length
  var remaining = 800 - jQuery(".message").val().length;
  jQuery(".countdown").text(remaining + " characters remaining.");
}

jQuery(document).ready(function($) {
  updateCountdown();
  $(".message").change(updateCountdown);
  $(".message").keyup(updateCountdown);
  $(".app-deadline").hide();
  $(".start-end-date").hide();
  $(".price").hide();
});

$("#yes-date").click(function() {
  $(".app-deadline").show();
});

$("#no-date").click(function() {
  $(".app-deadline").hide();
});
$("#ongoing").click(function() {
  $(".start-end-date").hide();
});
$("#intermittent").click(function() {
  $(".start-end-date").show();
});
$("#yes-cost").click(function() {
  $(".price").show();
});
$("#no-cost").click(function() {
  $(".price").hide();
});


