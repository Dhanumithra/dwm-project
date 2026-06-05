from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from app.schemas.machine import MachineCreate, MachineUpdate, MachineOut
from app.repositories.db_repository import MachinesRepository
from app.middleware.rbac import get_current_user, RoleChecker

router = APIRouter(prefix="/machines", tags=["Machines"])
machine_repo = MachinesRepository()

@router.get("", response_model=List[MachineOut])
def get_machines(
    dept: Optional[str] = Query(None),
    active: Optional[bool] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    """Returns list of machines, with optional filtering by department.
    ADMIN role is automatically scoped to their own department.
    """
    if current_user.get("role") == "ADMIN":
        dept = current_user.get("dept")
    return machine_repo.get_all(dept=dept, active=active)

@router.post("", response_model=MachineOut, status_code=status.HTTP_201_CREATED)
def create_machine(
    payload: MachineCreate,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN", "OPERATOR"]))
):
    """Creates a new machine."""
    machine = machine_repo.add(payload.dict())
    return machine

@router.put("/{id}", response_model=MachineOut)
def update_machine(
    id: int,
    payload: MachineUpdate,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN", "OPERATOR"]))
):
    """Modifies machine data."""
    machine = machine_repo.get_by_id(id)
    if not machine:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with ID {id} not found"
        )
    updated = machine_repo.update(id, payload.dict(exclude_unset=True))
    return updated

@router.patch("/{id}/toggle", response_model=MachineOut)
def toggle_machine(
    id: int,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN", "OPERATOR"]))
):
    """Toggles active/inactive state of a machine."""
    updated = machine_repo.toggle_active(id)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with ID {id} not found"
        )
    return updated

@router.delete("/{id}")
def delete_machine(
    id: int,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN"]))
):
    """
    DELETE /machines/{id}
    Critical gap resolved. Deletes a specific machine.
    """
    success = machine_repo.delete(id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Machine with ID {id} not found"
        )
    return {"message": "Machine deleted successfully"}