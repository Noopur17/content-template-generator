
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.template_service import get_template
from app.services.llm_service import generate_content
from app.services.validation_service import validate_output
import json

router = APIRouter()

class GenerateRequest(BaseModel):
    template_id: str
    prompt: str
    tone: str = "professional"
    audience: str = "general"

@router.post("/")
def generate(req: GenerateRequest):

    template = get_template(req.template_id)

    raw_output = generate_content(
        template,
        req.prompt,
        req.tone,
        req.audience
    )

    try:
        parsed = json.loads(raw_output)
    except:
        return {"error": "Invalid JSON", "raw": raw_output}

    validated = validate_output(template, parsed)

    return validated