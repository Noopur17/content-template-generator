"use client";

import { useEffect, useState } from "react";
import { getTemplates, generateContent } from "@/lib/api";

export default function Create() {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const handleGenerate = async () => {
    const res = await generateContent({
      template_id: selected,
      prompt
    });
    setResult(res);
  };

  return (
    <div>
      <h2>Create Content</h2>

      <select onChange={(e) => setSelected(e.target.value)}>
        <option>Select Template</option>
        {templates.map((t: any) => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <textarea
        placeholder="Enter your prompt"
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleGenerate}>Generate</button>

      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}