import json
from pathlib import Path
from typing import Any, Dict

from app.models.product import ProductInput, RetailContentOutput


TEMPLATES_DIR = Path(__file__).resolve().parent.parent.parent / "templates"

def load_template(template_id: str) -> Dict[str, Any]:
    template_path = TEMPLATES_DIR / f"{template_id}.json"
    if not template_path.exists():
        raise FileNotFoundError(f"Template not found: {template_id}")
    with open(template_path, "r", encoding="utf-8") as f:
        return json.load(f)


def build_prompt(product: ProductInput, template: Dict[str, Any]) -> str:
    features_text = ", ".join(product.features) if product.features else "No specific features provided"

    return f"""
You are an expert retail content writer for ecommerce and CMS platforms.

Generate structured retail product content in valid JSON only.
Do not include markdown.
Do not include explanations.
Do not include extra keys outside the schema.

Target market: {product.market}
Target language: {product.language}
Tone: {product.tone}

Product details:
- Product name: {product.product_name}
- Brand: {product.brand}
- Category: {product.category}
- Sport: {product.sport or "N/A"}
- Audience: {product.audience or "N/A"}
- Color: {product.color or "N/A"}
- Material: {product.material or "N/A"}
- Features: {features_text}

Template rules:
- Title max words: {template["rules"]["title_max_words"]}
- Short description max words: {template["rules"]["short_description_max_words"]}
- Long description max words: {template["rules"]["long_description_max_words"]}
- Bullets count: {template["rules"]["bullets_count"]}
- Bullet max words: {template["rules"]["bullet_max_words"]}
- SEO title max words: {template["rules"]["seo_title_max_words"]}
- SEO description max words: {template["rules"]["seo_description_max_words"]}

Return JSON in exactly this shape:
{{
  "title": "string",
  "short_description": "string",
  "long_description": "string",
  "bullets": ["string", "string", "string"],
  "seo_title": "string",
  "seo_description": "string"
}}
""".strip()


def parse_llm_response(raw_text: str) -> RetailContentOutput:
    try:
        data = json.loads(raw_text)
        return RetailContentOutput(**data)
    except Exception as exc:
        raise ValueError(f"Failed to parse LLM response into RetailContentOutput: {exc}")


# Temporary mock generator for first integration.
# Replace this later with your Ollama/OpenAI call.
def generate_retail_content(product: ProductInput) -> RetailContentOutput:
    template = load_template(product.template_id)
    _prompt = build_prompt(product, template)

    # TODO: Replace this mock JSON with your actual Ollama/OpenAI response text.
    mock_response = {
        "title": f"{product.brand} {product.product_name}",
        "short_description": f"Premium performance built for {product.audience or 'everyday athletes'}.",
        "long_description": (
            f"The {product.brand} {product.product_name} is designed for "
            f"{product.sport or 'active lifestyles'}, combining "
            f"{product.material or 'quality materials'} with features like "
            f"{', '.join(product.features[:3]) if product.features else 'comfort and versatility'} "
            f"for a refined {product.market} shopping experience."
        ),
        "bullets": (
            product.features[:3]
            if len(product.features) >= 3
            else ["Lightweight comfort", "Everyday versatility", "Retail-ready product storytelling"]
        ),
        "seo_title": f"{product.brand} {product.product_name} | {product.category}",
        "seo_description": (
            f"Shop {product.brand} {product.product_name} with premium design, "
            f"{', '.join(product.features[:2]) if product.features else 'great comfort and performance'}."
        ),
    }

    return RetailContentOutput(**mock_response)