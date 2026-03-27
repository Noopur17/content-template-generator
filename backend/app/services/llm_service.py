import json
from openai import OpenAI
from app.core.config import OPENAI_API_KEY, OPENAI_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)

def generate_content(
    template: dict,
    prompt: str,
    tone: str,
    audience: str,
    asset_context: str | None = None
):
    fields = template.get("fields", [])

    schema_properties = {}
    required_fields = []

    for field in fields:
        name = field["name"]
        max_length = field.get("maxLength", 100)
        required = field.get("required", False)

        schema_properties[name] = {
            "type": "string",
            "description": f"{name} field with max length {max_length}"
        }

        if required:
            required_fields.append(name)

    asset_text = asset_context if asset_context else "No asset context provided."

    system_prompt = f"""
You are a structured content generator for marketing content.

Generate concise, polished content for the selected template.

Tone: {tone}
Audience: {audience}
Asset Context: {asset_text}

Rules:
1. Return only the required fields.
2. Keep each field within the intended length.
3. Do not include markdown.
4. Do not include explanations.
"""

    response = client.responses.create(
        model=OPENAI_MODEL,
        input=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": f"Template: {template.get('name')}\nUser prompt: {prompt}"
            }
        ],
        text={
            "format": {
                "type": "json_schema",
                "name": "content_template_output",
                "schema": {
                    "type": "object",
                    "properties": schema_properties,
                    "required": required_fields,
                    "additionalProperties": False
                }
            }
        }
    )

    return response.output_text