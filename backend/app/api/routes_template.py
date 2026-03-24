
from fastapi import APIRouter
from app.services.template_service import load_templates

router = APIRouter()

@router.get("/")
def get_templates():
    return load_templates()