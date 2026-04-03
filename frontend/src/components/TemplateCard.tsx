type Props = {
  name: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
};

export default function TemplateCard({
  name,
  description,
  selected,
  onClick,
}: Props) {
  return (
    <div
      className={`card template-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="badge">{selected ? "Selected" : "Template"}</div>
      <h3 className="template-name">{name}</h3>
      <p className="template-description">
        {description || "No description available"}
      </p>
    </div>
  );
}