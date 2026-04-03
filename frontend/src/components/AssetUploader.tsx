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
      body: formData,
    });

    const data = await response.json();
    onUploadComplete(data);
  };

  return (
    <div className="panel">
      <h2 className="section-title">Upload Asset</h2>
      <input className="input" type="file" onChange={handleChange} />
      <p className="upload-note">
        Add an image or media asset to support content generation and preview.
      </p>
    </div>
  );
}