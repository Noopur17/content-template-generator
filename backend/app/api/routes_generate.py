import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.template_service import get_template
from app.services.llm_service import generate_content
from app.services.validation_service import validate_output

router = APIRouter()

class GenerateRequest(BaseModel):
    template_id: str
    prompt: str
    tone: str = "professional"
    audience: str = "general"
    asset_context: str | None = None

@router.post("/")
def generate(req: GenerateRequest):
    template = get_template(req.template_id)

    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    raw_output = generate_content(
        template=template,
        prompt=req.prompt,
        tone=req.tone,
        audience=req.audience,
        asset_context=req.asset_context
    )

    try:
        parsed_output = json.loads(raw_output)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail={
                "message": "Model did not return valid JSON",
                "raw_output": raw_output
            }
        )

    validation_result = validate_output(template, parsed_output)

    return {
        "template_id": req.template_id,
        "content": validation_result["validated_content"],
        "validation_errors": validation_result["errors"],
        "raw_output": parsed_output
    }