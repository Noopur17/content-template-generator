import json
import os

TEMPLATE_DIR = "templates"

def load_templates():
    templates = []
    for file in os.listdir(TEMPLATE_DIR):
        with open(os.path.join(TEMPLATE_DIR, file)) as f:
            templates.append(json.load(f))
    return templates

def get_template(template_id):
    for t in load_templates():
        if t["id"] == template_id:
            return t
    return None