type Props = {
  templateId: string;
  content: Record<string, any> | null;
  assetInfo?: any;
  onEdit?: (field: string, value: string) => void;
};

export default function ContentPreview({
  templateId,
  content,
  assetInfo,
  onEdit,
}: Props) {
  if (!content) {
    return (
      <div className="preview-shell">
        <h2 className="preview-heading">Preview</h2>
        <div className="empty-state">
          Generate content to see a live preview here.
        </div>
      </div>
    );
  }

  const uploadedImageUrl = assetInfo?.file_url || null;

  if (templateId === "hero-banner") {
    return (
      <div className="preview-shell">
        <h2 className="preview-heading">Hero Banner Preview</h2>
        <div className="hero-banner">
          {uploadedImageUrl && (
            <img className="preview-image" src={uploadedImageUrl} alt="Uploaded asset" />
          )}
          <div className="badge">Hero Banner</div>

          <div className="label">Headline</div>
          <input
            className="input"
            value={content.headline || ""}
            onChange={(e) => onEdit?.("headline", e.target.value)}
          />

          <div className="label">Subheadline</div>
          <textarea
            className="textarea"
            value={content.subheadline || ""}
            onChange={(e) => onEdit?.("subheadline", e.target.value)}
          />

          <div className="label">CTA</div>
          <input
            className="input"
            value={content.cta || ""}
            onChange={(e) => onEdit?.("cta", e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (templateId === "product-spotlight") {
    return (
      <div className="preview-shell">
        <h2 className="preview-heading">Product Spotlight Preview</h2>
        <div className="preview-card-inner">
          {uploadedImageUrl && (
            <img className="preview-image" src={uploadedImageUrl} alt="Uploaded asset" />
          )}

          <div className="badge">Product Spotlight</div>

          <div className="label">Title</div>
          <input
            className="input"
            value={content.title || ""}
            onChange={(e) => onEdit?.("title", e.target.value)}
          />

          <div className="label">Description</div>
          <textarea
            className="textarea"
            value={content.description || ""}
            onChange={(e) => onEdit?.("description", e.target.value)}
          />

          <div className="label">CTA</div>
          <input
            className="input"
            value={content.cta || ""}
            onChange={(e) => onEdit?.("cta", e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (templateId === "marketing-card") {
    return (
      <div className="preview-shell">
        <h2 className="preview-heading">Marketing Card Preview</h2>
        <div className="preview-card-inner">
          <div className="badge">Marketing Card</div>

          <div className="label">Header</div>
          <input
            className="input"
            value={content.header || ""}
            onChange={(e) => onEdit?.("header", e.target.value)}
          />

          <div className="label">Body</div>
          <textarea
            className="textarea"
            value={content.body || ""}
            onChange={(e) => onEdit?.("body", e.target.value)}
          />

          <div className="label">CTA</div>
          <input
            className="input"
            value={content.cta || ""}
            onChange={(e) => onEdit?.("cta", e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (templateId === "product_description") {
    return (
      <div className="preview-shell">
        <h2 className="preview-heading">Retail Product Description Preview</h2>
        <div className="preview-card-inner">
          {uploadedImageUrl && (
            <img className="preview-image" src={uploadedImageUrl} alt="Uploaded asset" />
          )}

          <div className="badge">Retail Product Description</div>

          <div className="label">Title</div>
          <input
            className="input"
            value={content.title || ""}
            onChange={(e) => onEdit?.("title", e.target.value)}
          />

          <div className="label">Short Description</div>
          <textarea
            className="textarea"
            value={content.short_description || ""}
            onChange={(e) => onEdit?.("short_description", e.target.value)}
          />

          <div className="label">Long Description</div>
          <textarea
            className="textarea"
            value={content.long_description || ""}
            onChange={(e) => onEdit?.("long_description", e.target.value)}
          />

          <div className="label">Bullets</div>
          <textarea
            className="textarea"
            value={Array.isArray(content.bullets) ? content.bullets.join("\n") : content.bullets || ""}
            onChange={(e) => onEdit?.("bullets", e.target.value)}
          />

          <div className="label">SEO Title</div>
          <input
            className="input"
            value={content.seo_title || ""}
            onChange={(e) => onEdit?.("seo_title", e.target.value)}
          />

          <div className="label">SEO Description</div>
          <textarea
            className="textarea"
            value={content.seo_description || ""}
            onChange={(e) => onEdit?.("seo_description", e.target.value)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="preview-shell">
      <h2 className="preview-heading">Generated Content</h2>
      <div className="preview-card-inner">
        {Object.entries(content).map(([key, value]) => (
          <div key={key} style={{ marginBottom: "16px" }}>
            <div className="label">{key}</div>
            <textarea
              className="textarea"
              value={Array.isArray(value) ? value.join("\n") : String(value)}
              onChange={(e) => onEdit?.(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}