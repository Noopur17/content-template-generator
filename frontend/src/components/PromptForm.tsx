type Props = {
  prompt: string;
  tone: string;
  audience: string;
  assetContext: string;
  onPromptChange: (value: string) => void;
  onToneChange: (value: string) => void;
  onAudienceChange: (value: string) => void;
  onAssetContextChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function PromptForm(props: Props) {
  return (
    <div className="panel">
      <h2 className="section-title">Content Inputs</h2>

      <div className="label">Prompt</div>
      <textarea
        className="textarea"
        value={props.prompt}
        onChange={(e) => props.onPromptChange(e.target.value)}
        placeholder="Create a retail product description for white low-top sneakers designed for everyday casual wear."
      />

      <div className="label">Tone</div>
      <select
        className="select"
        value={props.tone}
        onChange={(e) => props.onToneChange(e.target.value)}
      >
        <option value="professional">Professional</option>
        <option value="energetic">Energetic</option>
        <option value="minimal">Minimal</option>
      </select>

      <div className="label">Audience</div>
      <select
        className="select"
        value={props.audience}
        onChange={(e) => props.onAudienceChange(e.target.value)}
      >
        <option value="general">General</option>
        <option value="athletes">Athletes</option>
        <option value="shoppers">Shoppers</option>
      </select>

      <div className="label">Product / Asset Description</div>
      <textarea
        className="textarea"
        value={props.assetContext}
        onChange={(e) => props.onAssetContextChange(e.target.value)}
        placeholder="Example: white low-top sneakers with a clean minimalist design, lace-up closure, cushioned sole, and everyday casual style"
      />

      <button className="button" onClick={props.onSubmit} disabled={props.loading}>
        {props.loading ? "Generating..." : "Generate Content"}
      </button>
    </div>
  );
}