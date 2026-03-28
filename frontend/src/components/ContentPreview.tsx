import { RetailContentOutput } from "../types/product";

type ContentPreviewProps = {
  content: RetailContentOutput | null;
};

export default function ContentPreview({ content }: ContentPreviewProps) {
  if (!content) {
    return (
      <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
        No content generated yet.
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>{content.title}</h2>

      <h3>Short Description</h3>
      <p>{content.short_description}</p>

      <h3>Long Description</h3>
      <p>{content.long_description}</p>

      <h3>Bullets</h3>
      <ul>
        {content.bullets.map((bullet, index) => (
          <li key={index}>{bullet}</li>
        ))}
      </ul>

      <h3>SEO Title</h3>
      <p>{content.seo_title || "-"}</p>

      <h3>SEO Description</h3>
      <p>{content.seo_description || "-"}</p>
    </div>
  );
}