from typing import List, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.security import decode_access_token
from app.repositories.db_repository import EmployeesRepository

# Security scheme for extracting Bearer token
security_scheme = HTTPBearer(auto_error=False)
emp_repo = EmployeesRepository()

# Role hierarchy mapping: higher number means higher privileged role
_ROLE_HIERARCHY = {
    "USER": 1,
    "OPERATOR": 2,
    "ADMIN": 3,
    "SUPER_ADMIN": 4,
}


def enforce_hierarchy(current_user: dict, target_user: dict):
    """Enforce that current_user cannot act on a user with equal or higher role.
    Raises HTTPException 403 if hierarchy violation.
    """
    cur_role = current_user.get("role")
    tgt_role = target_user.get("role")
    if cur_role is None or tgt_role is None:
        return  # Let other checks handle missing roles
    if current_user.get("id") == target_user.get("id"):
        return  # Allow editing self
    if cur_role == "SUPER_ADMIN":
        return  # SUPER_ADMIN can manage other SUPER_ADMINs (subject to last-admin protections)
    if _ROLE_HIERARCHY.get(cur_role, 0) <= _ROLE_HIERARCHY.get(tgt_role, 0):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="403 Forbidden: Operation not permitted on higher or equal role.",
        )


# Alias used by employees route
enforce_role_hierarchy = enforce_hierarchy


def guard_last_super_admin(target_id: str, action: str = "remove") -> None:
    """
    Raises 403 if attempting to delete, disable, or demote the last SUPER_ADMIN.
    action: one of 'delete', 'disable', 'demote'
    """
    all_super_admins = emp_repo.get_all(role="SUPER_ADMIN")
    active_super_admins = [e for e in all_super_admins if e.get("active", True)]

    if action == "delete":
        target = emp_repo.get_by_id(target_id)
        if target and target.get("role") == "SUPER_ADMIN" and len(all_super_admins) <= 1:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="403 Forbidden: Cannot delete the last SUPER_ADMIN account.",
            )
    elif action == "disable":
        target = emp_repo.get_by_id(target_id)
        if target and target.get("role") == "SUPER_ADMIN" and len(active_super_admins) <= 1 and target.get("active"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="403 Forbidden: Cannot disable the last active SUPER_ADMIN account.",
            )
    elif action == "demote":
        target = emp_repo.get_by_id(target_id)
        if target and target.get("role") == "SUPER_ADMIN" and (len(all_super_admins) <= 1 or (target.get("active") and len(active_super_admins) <= 1)):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="403 Forbidden: Cannot demote the last active SUPER_ADMIN account.",
            )


def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme)) -> dict:
    """Extracts the authorization token, decodes it, and retrieves the associated employee.
    Raises 401 Unauthorized if missing, expired, or invalid.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not credentials:
        raise credentials_exception
    token = credentials.credentials
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    emp_no: str = payload.get("empNo")
    if emp_no is None:
        raise credentials_exception
    emp = emp_repo.get_by_emp_no(emp_no)
    if emp is None:
        raise credentials_exception
    if not emp.get("active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Employee account is deactivated",
        )
    return emp


class RoleChecker:
    """Enforces authorization boundary constraints for specific routes based on allowed roles."""
    def __init__(self, allowed_roles: List[str]):
        self.allowed_roles = allowed_roles

    def __call__(self, current_user: dict = Depends(get_current_user)) -> dict:
        user_role = current_user.get("role")
        if user_role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"403 Forbidden. Required roles: {', '.join(self.allowed_roles)}",
            )
        return current_user
