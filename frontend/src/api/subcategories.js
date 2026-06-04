import config from "../config";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
}

async function list() {
  const res = await fetch(`${config.API_URL}/sub-categories`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch subcategories");
  return await res.json();
}

async function create(payload) {
  const res = await fetch(`${config.API_URL}/sub-categories`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create subcategory");
  return await res.json();
}

async function update(id, payload) {
  const res = await fetch(`${config.API_URL}/sub-categories/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to update subcategory");
  return await res.json();
}

async function remove(id) {
  const res = await fetch(`${config.API_URL}/sub-categories/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Failed to delete subcategory");
  return true;
}

export default { list, create, update, remove };
