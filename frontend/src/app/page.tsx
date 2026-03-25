import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>Content Template Generator</h1>
      <p>
        Generate structured content from prompts using predefined templates and a free local LLM with Ollama.
      </p>
      <div style={{ marginTop: "24px" }}>
        <Link href="/create">Go to Create Content</Link>
      </div>
    </main>
  );
}
