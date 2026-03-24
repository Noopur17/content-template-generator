# backend/app/services/llm_service.py

import os
import requests

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma3")

def generate_content(template, prompt, tone, audience):
    field_rules = "\n".join([
        f"- {f['name']} (max {f.get('maxLength', 100)} chars)"
        for f in template["fields"]
    ])

    system_prompt = f"""
You are a structured content generator.

Return ONLY valid JSON.
Do not include explanations.
Do not add markdown fences.

Template: {template['name']}

Fields:
{field_rules}

Tone: {tone}
Audience: {audience}

Strictly follow field names and limits.
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