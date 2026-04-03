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

    asset_text = asset_context.strip() if asset_context else ""

    system_prompt = f"""
You are a structured retail and marketing content generator.

Generate content only for the product explicitly described by the user.

Tone: {tone}
Audience: {audience}

Product / Asset Description:
{asset_text if asset_text else "No product description provided."}

Rules:
1. Use the product / asset description as the main source of truth for the product type.
2. Do not invent a different product category.
3. If the description says shoes or sneakers, generate shoe content only.
4. If the description says apparel, generate apparel content only.
5. Do not output content for a yoga mat, bottle, bag, or any unrelated product unless the user explicitly describes that product.
6. Return only the required JSON fields.
7. Do not include markdown.
8. Do not include explanations.
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