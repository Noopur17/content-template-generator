"use client";

import { useEffect, useState } from "react";
import TemplateCard from "@/components/TemplateCard";
import PromptForm from "@/components/PromptForm";
import ContentPreview from "@/components/ContentPreview";
import AssetUploader from "@/components/AssetUploader";
import { getTemplates, generateContent, saveContent } from "@/lib/api";

type Template = {
  id: string;
  name: string;
  description?: string;
};

export default function CreatePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("professional");
  const [audience, setAudience] = useState("general");
  const [assetContext, setAssetContext] = useState("");
  const [generatedContent, setGeneratedContent] = useState<Record<string, string> | null>(null);
  const [assetInfo, setAssetInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTemplates().then(setTemplates).catch(console.error);
  }, []);

  const handleGenerate = async () => {
    if (!selectedTemplate || !prompt.trim()) {
      alert("Please select a template and enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      const result = await generateContent({
        template_id: selectedTemplate,
        prompt,
        tone,
        audience,
        asset_context: assetContext
      });
      setGeneratedContent(result.content);
    } catch (error: any) {
      alert(error.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    await saveContent({
      template_id: selectedTemplate,
      prompt,
      tone,
      audience,
      asset_context: assetContext,
      asset_info: assetInfo,
      content: generatedContent
    });

    alert("Content saved");
  };

  return (
    <main className="container">
      <h1>Create Content</h1>

      <h2>Select Template</h2>
      <div className="card-grid">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            name={template.name}
            description={template.description}
            selected={selectedTemplate === template.id}
            onClick={() => setSelectedTemplate(template.id)}
          />
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <AssetUploader onUploadComplete={setAssetInfo} />
      </div>

      {assetInfo && (
        <div className="preview-box">
          <strong>Uploaded:</strong> {assetInfo.filename}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        <PromptForm
          prompt={prompt}
          tone={tone}
          audience={audience}
          assetContext={assetContext}
          onPromptChange={setPrompt}
          onToneChange={setTone}
          onAudienceChange={setAudience}
          onAssetContextChange={setAssetContext}
          onSubmit={handleGenerate}
          loading={loading}
        />
      </div>

      <ContentPreview content={generatedContent} />

      {generatedContent && (
        <button className="button" onClick={handleSave} style={{ marginTop: "16px" }}>
          Save Content
        </button>
      )}
    </main>
  );
}
