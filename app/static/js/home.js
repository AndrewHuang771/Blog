const top_padding = 22.5;
const post_width = 440;
const max_post_height = 300;
const min_post_height = 200;
const multipleOf = 100;
const max_height = max_post_height * 4;
const postsPerPage = 12;
const topOffset = window.innerHeight;

function max_element(tables) {
  if ( tables.length === 0 ) {
    return 0;
  }
  let max = tables[0];
  for ( let i = 0; i < tables.length; i ++ ) {
    if (tables[i] > max) {
      max = tables[i];
    }
  }
  return max;
}

function movePost(node, column, columnHeight, tables) {
  node.style.top = topOffset + columnHeight + 'px';
  node.style.left = (column * (post_width + top_padding)) + 'px';
  if ( isMobile ) {
    node.style.left = '82px';
  }
  node.style.display = 'inline-block';
  tables[column] += parseInt(node.style.height.substr(0, node.style.height.length - 2)) + top_padding;
}

function findShortestCol(tables) {
  let minInfo = {
    min: tables[0],
    idx: 0,
  };
  for ( let i = 0; i < tables.length; i ++ ) {
    if ( tables[i] < minInfo.min ) {
      minInfo.min = tables[i];
      minInfo.idx = i;
    }
  }
  return minInfo;
}

$(document).ready(function() {
  const tables = [];
  const numCols = isMobile || Math.floor($(".wrapper-post").width()/(post_width + top_padding));
  const leftOverSpace = $(".wrapper-post").width() - numCols*(post_width + top_padding) - top_padding;
  let j = 0;
  let max_height = 0;
  let firstTime = true;
  for ( let i = 0; i < numCols; i ++ ) {
    tables.push(top_padding);
  }

  $('.wrapper-post').children('a').each(function() {
    if ( j > postsPerPage - numCols - 1 ) {
      if ( firstTime ) {
        max_height = max_element(tables) + top_padding + min_post_height;
        firstTime = false;
      }
      let col = findShortestCol(tables);
      this.style.height = max_height - tables[col.idx] + 'px';
      movePost(this, col.idx, col.min, tables);
    } else {
      let height = multipleOf*(Math.random()*(max_post_height/multipleOf)+2);
      this.style.height = height + 'px';
      let col = findShortestCol(tables);
      movePost(this, col.idx, col.min, tables);
      max_height = Math.max(max_height, tables[col.idx]);
    }
    j ++;
  });

  $(".content-main").css('height', (topOffset + max_height + top_padding*5 + 150) + 'px');
  $(".background").css('height', (topOffset + max_height + top_padding*5) + 'px');
  $(".page-list").css('margin-top', (topOffset + max_height + top_padding) + 'px');
  $(".post-regular").css("transform", "translateX(" + leftOverSpace/2 + "px)");
  //$(".wrapper-about").css('height', (max_height + top_padding*5) + 'px');

  let timeout;
  $(".post-regular").on('mouseenter', function() {
    clearInterval(timeout);
    $(".content-main").css("background-color", "transparent");
    //$(".background").css("background-image", this.style.backgroundImage);
    $(".background").css("opacity", 0.85);
    // $(".post-regular").css("opacity", 0.35);
    // this.style.opacity = 1;
    // $(this).children('.post-content')[0].style.left = 0 + 'px';
    //$(this).children('.darkener')[0].style.opacity = 0.3;
  });

  $(".post-regular").on('mouseleave', function() {
    timeout = setTimeout(function() {
      $(".background").css("background-image", '');
    }, 300);
    $(".background").css("opacity", 0);
    $(".post-regular").css("opacity", 1);
    // $(this).children('.post-content')[0].style.left = -post_width + 'px';
    // $(this).children('.darkener')[0].style.opacity = 0;
  });

  let fonts = [
    'Open Sans, sans-serif',
    'Kaushan Script, cursive',
    'Playfair Display, serif',
    'Bitter, serif',
    'Abel, sans-serif',
    'Source Code Pro, monospace',
    'Courgette, cursive',
    'Cormorant Garamond, serif',
  ];

  let fontSizes = [
    0,
    0,
    200,
    500,
    30,
  ]

  //setInterval(function() {
    //$(".large-font").css("font-family", fonts[Math.floor(Math.random()*(fonts.length - 1))]);
  //}, 1000);

  $(".large-font").css("font-family", fonts[1]);

  let roles = [
    'Student',
    'Developer',
    'Writer',
    'Artist',
    'Gamer',
    'Learner',
    'Intern',
    'Leader',
    'Teacher',
  ];

  let t = 0;
  setInterval(function() {
    $("#role-names").text(roles[t % roles.length]);
    $("#role-names").css("font-family", fonts[Math.floor(Math.random()*(fonts.length - 1))]);
    t++;
  }, 1000)

  $('.post-content').each(function() {
    this.style.fontFamily = fonts[Math.floor(Math.random()*(fonts.length - 1))];
    let fontSize = fontSizes[Math.floor(Math.random()*(fontSizes.length - 1))];
    this.style.fontSize = fontSize + 'px';
    if ( fontSize < 200 ) {
      this.style.lineHeight = fontSize*1.5 + 'px';
    } else {
      this.style.lineHeight = fontSize*1.15 + 'px';
    }
  });

  let circles = [
    {
      color: '#4D4861',
      left: '70vh',
      top: '-50vh',
      radius: '200vh',
      zIndex: 0,
    },
    // {
    //   color: '#605770',
    //   left: '67%',
    //   top: '100px',
    //   radius: '40vh',
    //   zIndex: 200,
    // },
    // {
    //   color: '#605770',
    //   left: '80%',
    //   top: '35vh',
    //   radius: '20vh',
    //   zIndex: 200,
    // },
    // {
    //   color: '#605770',
    //   left: '80%',
    //   top: '130px',
    //   radius: '30vh',
    //   zIndex: 200,
    // },
    // {
    //   color: '#605770',
    //   left: '70%',
    //   top: '570px',
    //   radius: '20vh',
    //   zIndex: 200,
    // },
    // {
    //   color: '#605770',
    //   left: '45%',
    //   top: '280px',
    //   radius: '30vh',
    //   zIndex: 200,
    // },
    // {
    //   color: '#605770',
    //   left: '85%',
    //   top: '770px',
    //   radius: '20vh',
    //   zIndex: 200,
    // },
    {
      color: '#605770',
      left: '75vh',
      top: '-45vh',
      radius: '190vh',
      zIndex: 1,
    },
    {
      color: '#F7C4A5',
      left: '-50vh',
      top: '155vh',
      radius: '90vh',
      zIndex: 0,
    },
  ];

  for (let i = 0; i < circles.length; i++) {
    $circle = $('<div>').addClass('circle');
    $circle.css({
      'left': circles[i].left,
      'top': circles[i].top,
      'background': circles[i].color,
      'height': circles[i].radius,
      'width': circles[i].radius,
      'z-index': circles[i].zIndex,
    });
    $('.content-main').append($circle);
  }

  $("#start-reading").on("click", function() {
    window.scroll({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  });

  let toggle = false;
  $("#about-me-button").on("click", function() {
    if (!toggle) {
      $(".about-me").css("transform", "translate(-16px, 0)");
      toggle = true;
    } else {
      $(".about-me").css("transform", "translate(100%, 0)");
      toggle = false;
    }
  });

});
