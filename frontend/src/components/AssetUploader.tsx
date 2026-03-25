"use client";

type Props = {
  onUploadComplete: (result: any) => void;
};

export default function AssetUploader({ onUploadComplete }: Props) {
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8001/assets/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    onUploadComplete(data);
  };

  return (
    <div className="card">
      <div className="label">Upload Asset</div>
      <input className="input" type="file" onChange={handleChange} />
    </div>
  );
}
