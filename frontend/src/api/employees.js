import config from "../config";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

async function list() {
  const res = await fetch(`${config.API_URL}/employees`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch employees");
  return await res.json();
}

async function create(payload) {
  const res = await fetch(`${config.API_URL}/employees`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.detail || "Failed to create employee");
  }
  return await res.json();
}

async function update(id, payload) {
  const res = await fetch(`${config.API_URL}/employees/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update employee");
  return await res.json();
}

async function remove(id) {
  const res = await fetch(`${config.API_URL}/employees/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete employee");
  return true;
}

async function toggle(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${config.API_URL}/employees/${id}/toggle`, {
    method: "PATCH",
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  if (!res.ok) throw new Error("Failed to toggle employee status");
  return await res.json();
}

export default { list, create, update, remove, toggle };
