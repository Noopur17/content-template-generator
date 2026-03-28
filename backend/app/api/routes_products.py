from fastapi import APIRouter, HTTPException

from app.models.product import ProductInput, RetailGenerationResponse
from app.services.retail_generation_service import generate_retail_content

router = APIRouter(prefix="/api/products", tags=["products"])


@router.post("/generate", response_model=RetailGenerationResponse)
def generate_product_content(payload: ProductInput):
    try:
        result = generate_retail_content(payload)
        return RetailGenerationResponse(success=True, data=result)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {exc}")