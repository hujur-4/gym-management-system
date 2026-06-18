const BASE = "http://localhost:5000/api";

async function parseJsonOrText(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    // not JSON
    return text;
  }
}

export async function getMembers() {
  const r = await fetch(`${BASE}/members`);
  if (!r.ok) {
    const t = await parseJsonOrText(r);
    throw new Error(t || `HTTP ${r.status}`);
  }
  return await parseJsonOrText(r);
}

export async function getMember(id) {
  const r = await fetch(`${BASE}/members/${id}`);
  if (!r.ok) {
    const t = await parseJsonOrText(r);
    throw new Error(t || `HTTP ${r.status}`);
  }
  return await parseJsonOrText(r);
}

export async function createMember(payload) {
  const r = await fetch(`${BASE}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const parsed = await parseJsonOrText(r);
  if (!r.ok) throw new Error(parsed || `HTTP ${r.status}`);
  return parsed;
}

export async function updateMember(id, payload) {
  const r = await fetch(`${BASE}/members/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const parsed = await parseJsonOrText(r);
  if (!r.ok) throw new Error(parsed || `HTTP ${r.status}`);
  return parsed;
}

export async function deleteMember(id) {
  const r = await fetch(`${BASE}/members/${id}`, { method: "DELETE" });
  const parsed = await parseJsonOrText(r);
  if (!r.ok) throw new Error(parsed || `HTTP ${r.status}`);
  return parsed;
}