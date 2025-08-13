const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function get<T=any>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}/${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed with status ${res.status}`);
  return res.json();
}

async function post<T=any>(path: string, data: unknown): Promise<T> {
  const res = await fetch(`${API_URL}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || `POST ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export { get, post };
