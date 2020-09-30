//easydropdown.all();
$(document).ready(function() {
$('.js-example-basic-single').select2()
});

var width = $(window).width();
$(window).on('resize', function() {
  if ($(this).width() !== width) {
    width = $(this).width();
    $('.js-example-basic-single').select2();
  }
});
