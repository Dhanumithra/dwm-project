from pydantic import BaseModel, Field
from typing import Optional

class MachineBase(BaseModel):
    name: str = Field(..., min_length=2)
    dept: str = Field(..., description="Target department of the machine")
    active: bool = True

class MachineCreate(MachineBase):
    pass

class MachineUpdate(BaseModel):
    name: Optional[str] = None
    dept: Optional[str] = None
    active: Optional[bool] = None

class MachineOut(MachineBase):
    id: int

    class Config:
        from_attributes = True
