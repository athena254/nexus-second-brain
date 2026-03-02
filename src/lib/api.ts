const API_BASE = '/api';

export async function getNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  return res.json();
}

export async function createNote(data: { title: string; content: string; source_type: string; source_url?: string; tags?: string[] }) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function searchNotes(q: string, mode = 'semantic') {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}&mode=${mode}`);
  return res.json();
}
