from fastapi import APIRouter
from app.models.content_store import STORE

router = APIRouter()

@router.post("/save")
def save(content: dict):
    STORE.append(content)
    return {"status": "saved"}

@router.get("/")
def get_all():
    return STORE