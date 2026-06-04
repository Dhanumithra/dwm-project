from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class EmployeeBase(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    role: str = Field("USER", description="One of: USER, OPERATOR, ADMIN, SUPER_ADMIN")
    dept: str = Field(..., description="Department name")
    designation: Optional[str] = ""
    active: bool = True
    empNo: str = Field(..., description="Unique numerical login ID assigned to employee")
    # NOTE: shift is intentionally EXCLUDED from employee master data.
    # Shift is operational data managed separately.

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    dept: Optional[str] = None
    designation: Optional[str] = None
    active: Optional[bool] = None
    empNo: Optional[str] = None
    # shift is NOT updatable through the employee API

class EmployeeOut(BaseModel):
    id: str
    name: str
    email: str
    role: str
    dept: str
    designation: Optional[str] = ""
    active: bool
    empNo: str
    # shift is not returned in employee master data

    class Config:
        from_attributes = True
