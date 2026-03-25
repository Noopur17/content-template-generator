import json
import os
from app.core.config import TEMPLATE_DIR

def load_templates():
    templates = []
    if not os.path.exists(TEMPLATE_DIR):
        return templates

    for file_name in os.listdir(TEMPLATE_DIR):
        if file_name.endswith(".json"):
            full_path = os.path.join(TEMPLATE_DIR, file_name)
            with open(full_path, "r", encoding="utf-8") as f:
                templates.append(json.load(f))
    return templates

def get_template(template_id: str):
    for template in load_templates():
        if template["id"] == template_id:
            return template
    return None
