from fastapi import FastAPI
from app.api import routes_templates, routes_generate, routes_assets, routes_content

app = FastAPI(title="Content Template Generator")

app.include_router(routes_templates.router, prefix="/templates", tags=["Templates"])
app.include_router(routes_generate.router, prefix="/generate", tags=["Generate"])
app.include_router(routes_assets.router, prefix="/assets", tags=["Assets"])
app.include_router(routes_content.router, prefix="/content", tags=["Content"])