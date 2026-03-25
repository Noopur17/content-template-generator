from fastapi import APIRouter
from app.models.content_store import STORE

router = APIRouter()

@router.post("/save")
def save_content(content: dict):
    STORE.append(content)
    return {"status": "saved", "total_items": len(STORE)}

@router.get("/")
def list_saved_content():
    return STORE
