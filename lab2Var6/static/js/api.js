async function getLinks() {
  const response = await fetch("/api/links");
  return await response.json();
}

async function addLink(title, url) {
  const response = await fetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, url: url }),
  });
  if (!response.ok) {
    const data = await response.json();
    if (typeof data.detail === "string") {
      alert(data.detail);
    } else {
      alert("Проверьте введённые данные");
    }
    return false;
  }
  return true;
}

async function updateLink(id, title, url) {
  const response = await fetch("/api/links/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, url: url }),
  });
  if (!response.ok) {
    const data = await response.json();
    if (typeof data.detail === "string") {
      alert(data.detail);
    } else {
      alert("Проверьте введённые данные");
    }
    return false;
  }
  return true;
}

async function deleteLink(id) {
  await fetch("/api/links/" + id, { method: "DELETE" });
}
