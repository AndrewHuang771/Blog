const top_padding = 22.5;
const post_width = 220;
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
  const numCols = Math.floor($(".wrapper-post").width()/(post_width + top_padding));
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
      let height = multipleOf*(Math.ceil(Math.random()*(max_post_height/multipleOf)+1));
      this.style.height = height + 'px';
      let col = findShortestCol(tables);
      movePost(this, col.idx, col.min, tables);
      max_height = Math.max(max_height, tables[col.idx]);
      console.log(max_height);
    }
    j ++;
  });

  $(".content-main").css('height', (max_height + top_padding) + 'px');
  $(".page-list").css('margin-top', (max_height + top_padding) + 'px');

  $(".post-regular").on('mouseenter', function() {
    $(this).children('.post-content')[0].style.left = 0 + 'px';
    $(this).children('.darkener')[0].style.opacity = 0.3;
  });

  $(".post-regular").on('mouseleave', function() {
    $(this).children('.post-content')[0].style.left = -post_width + 'px';
    $(this).children('.darkener')[0].style.opacity = 0;
  });
});
