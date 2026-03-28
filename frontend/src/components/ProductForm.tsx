"use client";

import { useState } from "react";
import LocaleSelector from "./LocaleSelector";
import ContentPreview from "./ContentPreview";
import { generateRetailContent } from "../services/api";
import { ProductInput, RetailContentOutput } from "../types/product";

const CATEGORY_OPTIONS = ["Shoes", "Apparel", "Accessories", "Equipment"];

const SPORT_OPTIONS = [
  "Running",
  "Training",
  "Basketball",
  "Soccer",
  "Yoga",
  "Lifestyle",
  "Tennis",
  "Walking",
];

const AUDIENCE_OPTIONS = ["Men", "Women", "Kids", "Unisex", "Athletes"];

const TONE_OPTIONS = [
  "Premium",
  "Athlete-first",
  "Performance-driven",
  "Minimal",
  "Playful",
  "Luxury",
];

const FEATURE_SUGGESTIONS = [
  "Breathable upper",
  "Responsive cushioning",
  "Lightweight comfort",
  "Durable traction",
  "Supportive fit",
  "Sweat-wicking fabric",
  "Flexible movement",
  "Soft feel",
];

const initialForm: ProductInput = {
  product_name: "",
  brand: "",
  category: "Shoes",
  sport: "Running",
  audience: "Women",
  color: "",
  material: "",
  features: [],
  market: "US",
  language: "en-US",
  tone: "Premium",
  template_id: "product_description",
  output_types: [
    "title",
    "short_description",
    "long_description",
    "bullets",
    "seo_title",
    "seo_description",
  ],
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontSize: "16px",
  border: "1px solid #bbb",
  borderRadius: "8px",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "6px",
  display: "block",
};

const sectionStyle: React.CSSProperties = {
  display: "grid",
  gap: "16px",
};

const chipStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1px solid #bbb",
  borderRadius: "999px",
  background: "#fff",
  cursor: "pointer",
  fontSize: "14px",
};

const removeChipStyle: React.CSSProperties = {
  padding: "6px 10px",
  border: "1px solid #bbb",
  borderRadius: "999px",
  background: "#f7f7f7",
  cursor: "pointer",
  fontSize: "14px",
};

export default function ProductForm() {
  const [form, setForm] = useState<ProductInput>(initialForm);
  const [featureInput, setFeatureInput] = useState("");
  const [result, setResult] = useState<RetailContentOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function addFeatureFromInput() {
    const trimmed = featureInput.trim();
    if (!trimmed) return;

    const alreadyExists = form.features.some(
      (feature) => feature.toLowerCase() === trimmed.toLowerCase()
    );
    if (alreadyExists) {
      setFeatureInput("");
      return;
    }

    setForm((prev) => ({
      ...prev,
      features: [...prev.features, trimmed],
    }));
    setFeatureInput("");
  }

  function addSuggestedFeature(feature: string) {
    const alreadyExists = form.features.some(
      (item) => item.toLowerCase() === feature.toLowerCase()
    );
    if (alreadyExists) return;

    setForm((prev) => ({
      ...prev,
      features: [...prev.features, feature],
    }));
  }

  function removeFeature(index: number) {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await generateRetailContent(form);
      setResult(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <div
        style={{
          padding: "16px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fafafa",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Retail Content Generator</h1>
        <p style={{ marginBottom: 0, color: "#555" }}>
          Fill in product details to generate structured retail copy for CMS, ecommerce,
          and localized content workflows.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "24px" }}>
        <div style={{ ...sectionStyle, gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <label style={labelStyle}>Product Name</label>
            <input
              style={inputStyle}
              value={form.product_name}
              onChange={(e) => updateField("product_name", e.target.value)}
              placeholder="Nike Air Zoom Pegasus 41"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Brand</label>
            <input
              style={inputStyle}
              value={form.brand}
              onChange={(e) => updateField("brand", e.target.value)}
              placeholder="Nike"
              required
            />
          </div>
        </div>

        <div style={{ ...sectionStyle, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              style={inputStyle}
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Sport</label>
            <select
              style={inputStyle}
              value={form.sport}
              onChange={(e) => updateField("sport", e.target.value)}
            >
              {SPORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Audience</label>
            <select
              style={inputStyle}
              value={form.audience}
              onChange={(e) => updateField("audience", e.target.value)}
            >
              {AUDIENCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ ...sectionStyle, gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div>
            <label style={labelStyle}>Color</label>
            <input
              style={inputStyle}
              value={form.color}
              onChange={(e) => updateField("color", e.target.value)}
              placeholder="Black/White"
            />
          </div>

          <div>
            <label style={labelStyle}>Material</label>
            <input
              style={inputStyle}
              value={form.material}
              onChange={(e) => updateField("material", e.target.value)}
              placeholder="Engineered mesh"
            />
          </div>

          <div>
            <label style={labelStyle}>Tone</label>
            <select
              style={inputStyle}
              value={form.tone}
              onChange={(e) => updateField("tone", e.target.value)}
            >
              {TONE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <LocaleSelector
          market={form.market}
          language={form.language}
          onMarketChange={(value) => updateField("market", value)}
          onLanguageChange={(value) => updateField("language", value)}
        />

        <div style={{ display: "grid", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Features</label>
            <p style={{ marginTop: 0, fontSize: "14px", color: "#666" }}>
              Add key product features or click one of the suggested options below.
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input
                style={{ ...inputStyle, maxWidth: "320px" }}
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add a feature"
              />
              <button
                type="button"
                onClick={addFeatureFromInput}
                style={{
                  padding: "10px 16px",
                  borderRadius: "8px",
                  border: "1px solid #bbb",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
              Suggested features
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {FEATURE_SUGGESTIONS.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => addSuggestedFeature(feature)}
                  style={chipStyle}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {form.features.length > 0 && (
            <div>
              <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                Selected features
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {form.features.map((feature, index) => (
                  <button
                    key={`${feature}-${index}`}
                    type="button"
                    onClick={() => removeFeature(index)}
                    style={removeChipStyle}
                  >
                    {feature} ×
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            padding: "16px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            background: "#fafafa",
          }}
        >
          <p style={{ marginTop: 0, fontWeight: 600 }}>Example values</p>
          <p style={{ margin: 0, color: "#555" }}>
            Product Name: Nike Air Zoom Pegasus 41 • Category: Shoes • Sport: Running •
            Audience: Women • Material: Engineered mesh • Features: Breathable upper,
            Responsive cushioning, Durable traction
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "14px 20px",
            borderRadius: "10px",
            border: "1px solid #bbb",
            background: loading ? "#f0f0f0" : "#111",
            color: loading ? "#666" : "#fff",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          {loading ? "Generating..." : "Generate Content"}
        </button>

        {error && <p style={{ color: "red", marginTop: 0 }}>{error}</p>}
      </form>

      <ContentPreview content={result} />
    </div>
  );
}