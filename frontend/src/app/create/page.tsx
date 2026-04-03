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
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setErrorMessage("");
        const data = await getTemplates();
        setTemplates(Array.isArray(data) ? data : []);
      } catch (error: any) {
        setErrorMessage(error.message || "Failed to load templates");
        setTemplates([]);
      }
    }

    fetchTemplates();
  }, []);

  const handleEdit = (field: string, value: string) => {
    setGeneratedContent((prev) => ({
      ...(prev || {}),
      [field]: value,
    }));
  };

  const handleGenerate = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    if (!selectedTemplate) {
      setErrorMessage("Please select a template first.");
      return;
    }

    if (!prompt.trim()) {
      setErrorMessage("Please enter a prompt.");
      return;
    }

    if (selectedTemplate === "product_description" && !assetContext.trim()) {
      setErrorMessage(
        "Please add a product / asset description so the generator knows what product is shown."
      );
      return;
    }

    try {
      setLoading(true);
      const result = await generateContent({
        template_id: selectedTemplate,
        prompt,
        tone,
        audience,
        asset_context: assetContext,
      });
      setGeneratedContent(result.content);
      setSuccessMessage("Content generated successfully.");
    } catch (error: any) {
      setErrorMessage(error.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent) return;

    try {
      await saveContent({
        template_id: selectedTemplate,
        prompt,
        tone,
        audience,
        asset_context: assetContext,
        asset_info: assetInfo,
        content: generatedContent,
      });

      setSuccessMessage("Content saved successfully.");
      setErrorMessage("");
    } catch (error: any) {
      setErrorMessage(error.message || "Save failed");
    }
  };

  return (
    <main className="container">
      <div className="page-header">
        <div className="badge">Authoring Studio</div>
        <h1 className="page-title">Create content from prompts and templates</h1>
        <p className="page-subtitle">
          Select a template, describe the product clearly, generate structured content,
          edit it, and preview it before saving.
        </p>
      </div>

      <div className="status-line">Templates loaded: {templates.length}</div>

      {errorMessage && <div className="error-box">{errorMessage}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}

      <div style={{ marginBottom: "24px" }}>
        <h2 className="section-title">Choose a Template</h2>

        {templates.length === 0 ? (
          <div className="empty-state">
            No templates found. Check backend <code>/templates/</code>.
          </div>
        ) : (
          <div className="card-grid">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                name={template.name}
                description={template.description}
                selected={selectedTemplate === template.id}
                onClick={() => {
                  setSelectedTemplate(template.id);
                  setGeneratedContent(null);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="layout-grid">
        <div>
          <AssetUploader onUploadComplete={setAssetInfo} />

          {assetInfo && (
            <div className="panel" style={{ marginTop: "20px" }}>
              <h2 className="section-title">Uploaded Asset</h2>
              <p className="template-description">
                <strong>File:</strong> {assetInfo.filename}
              </p>
              <p className="template-description" style={{ marginTop: "10px" }}>
                Tip: the uploader does not automatically understand the image contents yet.
                Add a clear product description below for better results.
              </p>
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

          {generatedContent && (
            <div className="button-row">
              <button className="button secondary" onClick={handleGenerate}>
                Regenerate
              </button>
              <button className="button secondary" onClick={handleSave}>
                Save Content
              </button>
            </div>
          )}
        </div>

        <div>
          <ContentPreview
            templateId={selectedTemplate}
            content={generatedContent}
            assetInfo={assetInfo}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </main>
  );
}