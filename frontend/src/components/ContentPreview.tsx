type Props = {
  content: Record<string, string> | null;
};

export default function ContentPreview({ content }: Props) {
  if (!content) return null;

  return (
    <div className="preview-box">
      <h3>Generated Content</h3>
      {Object.entries(content).map(([key, value]) => (
        <div key={key} style={{ marginBottom: "14px" }}>
          <div className="label">{key}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
}
