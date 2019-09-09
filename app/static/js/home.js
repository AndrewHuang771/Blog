const top_padding = 22.5;
const post_width = 440;
const max_post_height = 300;
const min_post_height = 200;
const multipleOf = 100;
const max_height = max_post_height * 4;
const postsPerPage = 12;

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
  node.style.top = columnHeight + 'px';
  node.style.left = (column * (post_width + top_padding)) + 'px';
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

  $(".content-main").css('height', (max_height + top_padding*5) + 'px');
  $(".background").css('height', (max_height + top_padding*5) + 'px');
  $(".page-list").css('margin-top', (max_height + top_padding) + 'px');
  $(".post-regular").css("transform", "translateX(" + leftOverSpace/2 + "px)");


  let timeout;
  $(".post-regular").on('mouseenter', function() {
    clearInterval(timeout);
    $(".background").css("background-image", this.style.backgroundImage);
    $(".background").css("opacity", 0.85);
    $(".post-regular").css("opacity", 0.35);
    this.style.opacity = 1;
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
    30,
    60,
    200,
    500,
    30,
  ]

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

});
