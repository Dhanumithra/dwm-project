from pydantic import BaseModel, Field
from typing import Optional

class NotificationBase(BaseModel):
    to: str = Field("user", description="user or admin target role")
    toEmail: str = Field(..., description="Target employee email")
    from_user: str = Field("System", alias="from", description="Sender label, e.g., System")
    type: str = Field("info", description="info, warning, success, error")
    subject: str = Field(..., min_length=2)
    body: str = Field(...)
    read: bool = False
    approved: Optional[bool] = False

    class Config:
        populate_by_name = True

class NotificationCreate(NotificationBase):
    pass

class NotificationUpdate(BaseModel):
    read: Optional[bool] = None
    approved: Optional[bool] = None
    subject: Optional[str] = None
    body: Optional[str] = None

class NotificationOut(NotificationBase):
    id: int
    timestamp: str

    class Config:
        populate_by_name = True
        from_attributes = True
