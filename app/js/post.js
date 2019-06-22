let title = {{ post.content|tojson }};
console.log(title);
let ele = document.getElementById('content');
ele.innerHTML = title;
