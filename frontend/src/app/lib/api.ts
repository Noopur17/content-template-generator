export async function getTemplates() {
  const res = await fetch("http://localhost:8000/templates");
  return res.json();
}

export async function generateContent(data: any) {
  const res = await fetch("http://localhost:8000/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });

  return res.json();
}