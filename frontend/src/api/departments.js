import config from "../config";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

async function list() {
  const res = await fetch(`${config.API_URL}/departments`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch departments");
  return await res.json();
}

async function create(payload) {
  const res = await fetch(`${config.API_URL}/departments`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create department");
  return await res.json();
}

async function update(id, payload) {
  const res = await fetch(`${config.API_URL}/departments/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update department");
  return await res.json();
}

async function remove(id) {
  const res = await fetch(`${config.API_URL}/departments/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete department");
  return true;
}

export default { list, create, update, remove };
