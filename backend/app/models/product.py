from typing import List, Optional
from pydantic import BaseModel, Field


class ProductInput(BaseModel):
    product_name: str = Field(..., description="Name of the product")
    brand: str = Field(..., description="Brand name")
    category: str = Field(..., description="Product category")
    sport: Optional[str] = Field(None, description="Sport or activity")
    audience: Optional[str] = Field(None, description="Target audience")
    color: Optional[str] = Field(None, description="Product color")
    material: Optional[str] = Field(None, description="Material information")
    features: List[str] = Field(default_factory=list, description="Key product features")
    market: str = Field(..., description="Target market, e.g. US, UK, IN")
    language: str = Field(..., description="Target language, e.g. en-US, en-GB, en-IN")
    tone: str = Field(default="premium", description="Desired tone")
    template_id: str = Field(default="product_description", description="Template identifier")
    output_types: List[str] = Field(
        default_factory=lambda: [
            "title",
            "short_description",
            "long_description",
            "bullets",
            "seo_title",
            "seo_description",
        ],
        description="Requested output content blocks",
    )


class RetailContentOutput(BaseModel):
    title: str
    short_description: str
    long_description: str
    bullets: List[str]
    seo_title: Optional[str] = None
    seo_description: Optional[str] = None


class RetailGenerationResponse(BaseModel):
    success: bool = True
    data: RetailContentOutput