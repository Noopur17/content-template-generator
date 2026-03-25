import os
import shutil
from fastapi import APIRouter, UploadFile, File
from app.core.config import UPLOAD_DIR

router = APIRouter()
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
def upload_asset(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": file.filename,
        "file_path": file_path,
        "content_type": file.content_type
    }
