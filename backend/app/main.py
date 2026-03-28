from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_products import router as products_router

from app.api.routes_templates import router as templates_router
from app.api.routes_generate import router as generate_router
from app.api.routes_assets import router as assets_router
from app.api.routes_content import router as content_router

app = FastAPI(title="Content Template Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(templates_router, prefix="/templates", tags=["Templates"])
app.include_router(generate_router, prefix="/generate", tags=["Generate"])
app.include_router(assets_router, prefix="/assets", tags=["Assets"])
app.include_router(content_router, prefix="/content", tags=["Content"])
app.include_router(products_router)
