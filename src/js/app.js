$(document).ready(function() {

  // Replace png with svg using modernizr
  if (!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
  //--> svg replace

});// doc ready
