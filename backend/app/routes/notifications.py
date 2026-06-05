from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.schemas.notification import NotificationCreate, NotificationUpdate, NotificationOut
from app.repositories.db_repository import NotificationsRepository
from app.middleware.rbac import get_current_user

router = APIRouter(prefix="/notifications", tags=["Notifications"])
notif_repo = NotificationsRepository()

@router.get("", response_model=List[NotificationOut])
def get_notifications(
    toEmail: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    """
    Returns in-app notifications.
    Standard users are restricted to their own notifications.
    """
    email = current_user["email"]
    if current_user["role"] in ["ADMIN", "SUPER_ADMIN"] and toEmail:
        email = toEmail
        
    return notif_repo.get_all(email=email)

@router.get("/unread-count")
def get_unread_count(current_user: dict = Depends(get_current_user)):
    """Returns total count of unread notifications for the logged-in user."""
    return {"count": notif_repo.unread_count(current_user["email"])}

@router.post("", response_model=NotificationOut, status_code=status.HTTP_201_CREATED)
def create_notification(
    payload: NotificationCreate,
    current_user: dict = Depends(get_current_user)
):
    """Creates a new in-app notification."""
    notif = notif_repo.add(payload.dict(by_alias=True))
    return notif

@router.put("/read-all")
def mark_all_as_read(current_user: dict = Depends(get_current_user)):
    """Marks all notifications for the authenticated user as read."""
    notif_repo.mark_all_read(current_user["email"])
    return {"message": "All notifications marked as read"}

@router.put("/{id}", response_model=NotificationOut)
def update_notification(
    id: int,
    payload: NotificationUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Modifies notification read/approved status."""
    notif = notif_repo.get_by_id(id)
    if not notif:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Notification with ID {id} not found"
        )
        
    # Restrict users from updating other's notifications
    if current_user["role"] not in ["ADMIN", "SUPER_ADMIN"] and notif["toEmail"] != current_user["email"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden operation"
        )
        
    updated = notif_repo.update(id, payload.dict(exclude_unset=True))
    return updated

@router.put("/{id}/read")
def mark_as_read(id: int, current_user: dict = Depends(get_current_user)):
    """Marks a specific notification as read."""
    notif = notif_repo.get_by_id(id)
    if not notif:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Notification with ID {id} not found"
        )
        
    if current_user["role"] not in ["ADMIN", "SUPER_ADMIN"] and notif["toEmail"] != current_user["email"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden operation"
        )
        
    success = notif_repo.mark_read(id)
    return {"message": "Notification marked as read", "success": success}

@router.delete("/{id}")
def delete_notification(id: int, current_user: dict = Depends(get_current_user)):
    """Deletes a specific notification for the authenticated user."""
    notif = notif_repo.get_by_id(id)
    if not notif:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Notification with ID {id} not found"
        )

    if notif["toEmail"] != current_user["email"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Forbidden operation"
        )

    success = notif_repo.delete_by_id(id, current_user["email"])
    return {"message": "Notification deleted", "success": success}

@router.delete("")
def delete_all_notifications(current_user: dict = Depends(get_current_user)):
    """Deletes all notifications for the authenticated user."""
    deleted_count = notif_repo.delete_all(current_user["email"])
    return {"message": "All notifications deleted", "deletedCount": deleted_count}
