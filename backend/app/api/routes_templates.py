from fastapi import APIRouter, HTTPException
from app.services.template_service import load_templates, get_template

router = APIRouter()

@router.get("/")
def list_templates():
    return load_templates()

@router.get("/{template_id}")
def fetch_template(template_id: str):
    template = get_template(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template
