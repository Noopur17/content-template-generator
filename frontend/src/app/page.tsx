import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <div className="top-nav">
        <div className="brand">Content Template Generator</div>
        <Link href="/create" className="link-button">
          Open Studio
        </Link>
      </div>

      <div className="page-header">
        <div className="badge">AI-Powered Content Workflow</div>
        <h1 className="page-title">
          Generate structured marketing content from prompts
        </h1>
        <p className="page-subtitle">
          Create reusable, template-based content for banners, product campaigns,
          and promotional cards with a clean authoring workflow.
        </p>
      </div>

      <div className="card-grid" style={{ marginTop: "30px" }}>
        <div className="card">
          <h3 className="template-name">Template-driven</h3>
          <p className="template-description">
            Generate content into predefined formats instead of plain raw text.
          </p>
        </div>

        <div className="card">
          <h3 className="template-name">Structured Output</h3>
          <p className="template-description">
            Get field-level content such as headline, description, and CTA.
          </p>
        </div>

        <div className="card">
          <h3 className="template-name">Preview Ready</h3>
          <p className="template-description">
            Review generated content in a visual layout before saving.
          </p>
        </div>
      </div>
    </main>
  );
}