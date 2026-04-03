const API_BASE = "http://127.0.0.1:8001";

export async function getTemplates() {
  const res = await fetch(`${API_BASE}/templates/`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch templates: ${res.status}`);
  }

  return res.json();
}

export async function generateContent(payload: {
  template_id: string;
  prompt: string;
  tone: string;
  audience: string;
  asset_context?: string;
}) {
  const res = await fetch(`${API_BASE}/generate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to generate content");
  }

  return res.json();
}

export async function saveContent(payload: any) {
  const res = await fetch(`${API_BASE}/content/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to save content");
  }

  return res.json();
}