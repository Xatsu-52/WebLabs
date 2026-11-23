const API_KEY_STORAGE = "apiKey";

function getApiKey() {
  let key = localStorage.getItem(API_KEY_STORAGE);
  if (!key) {
    key = prompt("Введите API-ключ (по умолчанию student-key)");
    if (key) {
      localStorage.setItem(API_KEY_STORAGE, key);
    }
  }
  return key || "";
}

async function apiFetch(url, options = {}) {
  const headers = options.headers || {};
  headers["X-API-Key"] = getApiKey();

  const response = await fetch(url, { ...options, headers: headers });

  if (response.status === 401) {
    localStorage.removeItem(API_KEY_STORAGE);
    alert("Неверный API-ключ");
  }
  return response;
}

async function showError(response) {
  if (response.status === 401) {
    return;
  }
  const data = await response.json();
  if (typeof data.detail === "string") {
    alert(data.detail);
  } else {
    alert("Проверьте введённые данные");
  }
}

async function getLinks() {
  const response = await apiFetch("/api/links");
  if (!response.ok) {
    return [];
  }
  return await response.json();
}

async function addLink(title, url) {
  const response = await apiFetch("/api/links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, url: url }),
  });
  if (!response.ok) {
    await showError(response);
    return false;
  }
  return true;
}

async function updateLink(id, title, url) {
  const response = await apiFetch("/api/links/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, url: url }),
  });
  if (!response.ok) {
    await showError(response);
    return false;
  }
  return true;
}

async function deleteLink(id) {
  const response = await apiFetch("/api/links/" + id, { method: "DELETE" });
  if (!response.ok) {
    await showError(response);
  }
}
