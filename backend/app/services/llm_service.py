import requests
from app.core.config import OLLAMA_BASE_URL, OLLAMA_MODEL

def generate_content(template: dict, prompt: str, tone: str, audience: str, asset_context: str | None = None):
    fields = template.get("fields", [])
    field_rules = "\n".join(
        [
            f"- {field['name']} (required={field.get('required', False)}, maxLength={field.get('maxLength', 100)})"
            for field in fields
        ]
    )

    asset_text = asset_context if asset_context else "No asset context provided."

    system_prompt = f"""
You are a structured content generator.

Return ONLY valid raw JSON.
Do not include markdown.
Do not include explanations.
Do not wrap output in triple backticks.

Template Name: {template.get('name')}

Fields:
{field_rules}

Tone: {tone}
Audience: {audience}
Asset Context: {asset_text}

Rules:
1. Use exactly the field names provided.
2. Respect all maxLength values.
3. Generate polished marketing content.
4. Return only one JSON object.
"""

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "stream": False
    }

    response = requests.post(
        f"{OLLAMA_BASE_URL}/api/chat",
        json=payload,
        timeout=120
    )
    response.raise_for_status()

    data = response.json()
    return data["message"]["content"]
