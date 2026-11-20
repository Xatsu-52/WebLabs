const list = document.getElementById("list");
const search = document.getElementById("search");

let links = [];

function render() {
  const text = search.value.toLowerCase();
  list.innerHTML = "";

  for (const link of links) {
    if (!link.title.toLowerCase().includes(text)) {
      continue;
    }
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.textContent = link.title;
    li.appendChild(a);
    list.appendChild(li);
  }
}

search.oninput = render;

getLinks().then(function (data) {
  links = data;
  render();
});
