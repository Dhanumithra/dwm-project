from pydantic import BaseModel, Field
from typing import Optional

class SubCategoryBase(BaseModel):
    name: str = Field(..., min_length=2)
    description: Optional[str] = ""

class SubCategoryCreate(SubCategoryBase):
    pass

class SubCategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class SubCategoryOut(SubCategoryBase):
    id: int

    class Config:
        from_attributes = True
