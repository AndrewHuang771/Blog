$(document).ready(function() {
  $('.wrapper-post').children('a').each(function() {
    this.style.height = 100*(Math.ceil(Math.random()*3+2)) + 'px';
  });

  $(".post-regular").on('mouseenter', function() {
    $(this).children('.post-content')[0].style.left = 0 + 'px';
    $(this).children('.darkener')[0].style.opacity = 0.3;
  });

  $(".post-regular").on('mouseleave', function() {
    $(this).children('.post-content')[0].style.left = -220 + 'px';
    $(this).children('.darkener')[0].style.opacity = 0;
  });
});
