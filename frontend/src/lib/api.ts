const API_BASE = "http://localhost:8001";

export async function getTemplates() {
  const res = await fetch(`${API_BASE}/templates`);
  if (!res.ok) throw new Error("Failed to fetch templates");
  return res.json();
}

export async function generateContent(payload: {
  template_id: string;
  prompt: string;
  tone: string;
  audience: string;
  asset_context?: string;
}) {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error));
  }

  return res.json();
}

export async function saveContent(payload: any) {
  const res = await fetch(`${API_BASE}/content/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Failed to save content");
  return res.json();
}
