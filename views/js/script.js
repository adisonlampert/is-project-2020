//easydropdown.all();
$(document).ready(function() {
$('.js-example-basic-single').select2()
});

var width = $(window).width();
// Page doesn't format correctly without reload
$(window).on('resize', function() {
  if ($(this).width() !== width) {
    width = $(this).width();
    $('.js-example-basic-single').select2();
    location.reload();
  }
});
