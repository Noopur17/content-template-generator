import json
import os

def get_templates_dir():
    current_file = os.path.abspath(__file__)
    services_dir = os.path.dirname(current_file)
    app_dir = os.path.dirname(services_dir)
    backend_dir = os.path.dirname(app_dir)
    return os.path.join(backend_dir, "templates")

def load_templates():
    template_dir = get_templates_dir()
    templates = []

    if not os.path.exists(template_dir):
        return templates

    for file_name in os.listdir(template_dir):
        if file_name.endswith(".json"):
            full_path = os.path.join(template_dir, file_name)
            with open(full_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                templates.append(data)

    return templates

def get_template(template_id: str):
    templates = load_templates()

    for template in templates:
        if template.get("id") == template_id:
            return template

    return None