const API = `${import.meta.env.VITE_API_URL}/auth`;

export async function loginApi(email: string, password: string) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Login failed");
  return data;
}

export async function logoutApi() {
  const res = await fetch(`${API}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");

  return await res.json();
}

export async function checkAuthApi() {
  const res = await fetch(`${API}/check`, { credentials: "include" });
  return res.ok;
}
