from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class LoginRequest(BaseModel):
    empNo: str = Field(..., description="Numeric login ID of employee or administrator")
    password: str = Field(..., description="Employee account password")

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    empNo: str
    email: str
    role: str
    department: str
    username: str

class PasswordChangePayload(BaseModel):
    currentPassword: str
    newPassword: str = Field(..., min_length=6)

class ResetRequestPayload(BaseModel):
    empNo: str

class ResetActionPayload(BaseModel):
    action: str = Field(..., description="Must be 'approve' or 'reject'")
    default_password: Optional[str] = None

class ResetStatusResponse(BaseModel):
    empNo: str
    status: str # "null", "pending", "expired", "approved"
    requestedAt: Optional[str] = None
