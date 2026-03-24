
def validate_output(template, output_json):
    validated = {}

    for field in template["fields"]:
        name = field["name"]

        if name in output_json:
            value = str(output_json[name])

            if "maxLength" in field:
                value = value[:field["maxLength"]]

            validated[name] = value

    return validated