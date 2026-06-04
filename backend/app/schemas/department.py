from pydantic import BaseModel, Field
from typing import Optional

class DepartmentBase(BaseModel):
    name: str = Field(..., min_length=2)
    description: Optional[str] = ""
    headCount: int = Field(0, ge=0)

class DepartmentCreate(DepartmentBase):
    pass

class DepartmentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    headCount: Optional[int] = None

class DepartmentOut(DepartmentBase):
    id: int

    class Config:
        from_attributes = True
