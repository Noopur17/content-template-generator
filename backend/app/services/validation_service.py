def validate_output(template: dict, output_json: dict):
    validated = {}
    errors = []

    for field in template.get("fields", []):
        name = field["name"]
        required = field.get("required", False)
        max_length = field.get("maxLength")
        value = output_json.get(name)

        if required and (value is None or str(value).strip() == ""):
            errors.append(f"Missing required field: {name}")
            continue

        if value is not None:
            value = str(value).strip()
            if max_length and len(value) > max_length:
                value = value[:max_length]
            validated[name] = value

    return {"validated_content": validated, "errors": errors}
