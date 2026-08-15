const API_URL = import.meta.env.VITE_API_URL;

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchWorkspaces = async () => {
  const res = await fetch(`${API_URL}/workspaces`, { headers: authHeaders() });
  return res.json();
};

export const createWorkspace = async (name) => {
  const res = await fetch(`${API_URL}/workspaces`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to create workspace");
  return data;
};

export const addMember = async (workspaceId, email) => {
  const res = await fetch(`${API_URL}/workspaces/${workspaceId}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add member");
  return data;
};