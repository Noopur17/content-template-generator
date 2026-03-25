type Props = {
  name: string;
  description?: string;
  selected?: boolean;
  onClick: () => void;
};

export default function TemplateCard({ name, description, selected, onClick }: Props) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: selected ? "2px solid #111" : "1px solid #e5e7eb"
      }}
    >
      <h3>{name}</h3>
      <p>{description || "No description available"}</p>
    </div>
  );
}
