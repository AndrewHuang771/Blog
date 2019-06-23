const top_padding = 25;
const post_width = 220;

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
  const numCols = Math.floor($(".wrapper-post").width()/220);
  for ( let i = 0; i < numCols; i ++ ) {
    tables.push(top_padding);
  }

  $('.wrapper-post').children('a').each(function() {
    this.style.height = 100*(Math.ceil(Math.random()*3+2)) + 'px';
    let col = findShortestCol(tables);
    movePost(this, col.idx, col.min, tables);
  });

  //Now sort them into columns.

  $(".post-regular").on('mouseenter', function() {
    $(this).children('.post-content')[0].style.left = 0 + 'px';
    $(this).children('.darkener')[0].style.opacity = 0.3;
  });

  $(".post-regular").on('mouseleave', function() {
    $(this).children('.post-content')[0].style.left = -220 + 'px';
    $(this).children('.darkener')[0].style.opacity = 0;
  });
});
