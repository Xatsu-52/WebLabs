const LIMIT = 50;

const form = document.getElementById("form");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const list = document.getElementById("list");
const counter = document.getElementById("counter");
const submitButton = form.querySelector("button[type='submit']");
const cancelEditButton = document.getElementById("cancel-edit");
let editingId = null;

async function render() {
  const links = await getLinks();
  counter.textContent = "Записей: " + links.length + " из " + LIMIT;
  list.innerHTML = "";

  for (const link of links) {
    const li = document.createElement("li");
    li.textContent = link.title + " — " + link.url;

    const editButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    editButton.onclick = function () {
      editingId = link.id;
      titleInput.value = link.title;
      urlInput.value = link.url;
      submitButton.textContent = "Сохранить";
      cancelEditButton.hidden = false;
      titleInput.focus();
    };

    const button = document.createElement("button");
    button.textContent = "Удалить";
    button.onclick = async function () {
      await deleteLink(link.id);
      if (editingId === link.id) {
        resetForm();
      }
      render();
    };

    li.appendChild(editButton);
    li.appendChild(button);
    list.appendChild(li);
  }
}

form.onsubmit = async function (event) {
  event.preventDefault();
  const ok = editingId === null
    ? await addLink(titleInput.value, urlInput.value)
    : await updateLink(editingId, titleInput.value, urlInput.value);
  if (ok) {
    resetForm();
    render();
  }
};

function resetForm() {
  editingId = null;
  form.reset();
  submitButton.textContent = "Добавить";
  cancelEditButton.hidden = true;
}

cancelEditButton.onclick = resetForm;

render();
