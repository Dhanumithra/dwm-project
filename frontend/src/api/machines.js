import config from "../config";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

async function list() {
  const res = await fetch(`${config.API_URL}/machines`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch machines");
  return await res.json();
}

async function create(payload) {
  const res = await fetch(`${config.API_URL}/machines`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create machine");
  return await res.json();
}

async function update(id, payload) {
  const res = await fetch(`${config.API_URL}/machines/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update machine");
  return await res.json();
}

async function toggle(id) {
  const res = await fetch(`${config.API_URL}/machines/${id}/toggle`, {
    method: "PATCH",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to toggle machine status");
  return await res.json();
}

async function remove(id) {
  const res = await fetch(`${config.API_URL}/machines/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete machine");
  return true;
}

export default { list, create, update, toggle, remove };
