from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.sub_category import SubCategoryCreate, SubCategoryUpdate, SubCategoryOut
from app.repositories.db_repository import SubCategoriesRepository
from app.middleware.rbac import get_current_user, RoleChecker

# We register as /sub-categories and support /subcategories mapping in main
router = APIRouter(tags=["Sub Categories"])
sc_repo = SubCategoriesRepository()

@router.get("/sub-categories", response_model=List[SubCategoryOut])
@router.get("/subcategories", response_model=List[SubCategoryOut])
def get_sub_categories(current_user: dict = Depends(get_current_user)):
    """Returns a list of all sub-categories."""
    return sc_repo.get_all()

@router.post("/sub-categories", response_model=SubCategoryOut, status_code=status.HTTP_201_CREATED)
@router.post("/subcategories", response_model=SubCategoryOut, status_code=status.HTTP_201_CREATED)
def create_sub_category(
    payload: SubCategoryCreate,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN"]))
):
    """Creates a new sub-category."""
    sc = sc_repo.add(payload.dict())
    return sc

@router.put("/sub-categories/{id}", response_model=SubCategoryOut)
@router.put("/subcategories/{id}", response_model=SubCategoryOut)
def update_sub_category(
    id: int,
    payload: SubCategoryUpdate,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN"]))
):
    """Updates sub-category details."""
    sc = sc_repo.get_by_id(id)
    if not sc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sub-category with ID {id} not found"
        )
    updated = sc_repo.update(id, payload.dict(exclude_unset=True))
    return updated

@router.delete("/sub-categories/{id}")
@router.delete("/subcategories/{id}")
def delete_sub_category(
    id: int,
    current_user: dict = Depends(RoleChecker(["ADMIN", "SUPER_ADMIN"]))
):
    """
    DELETE /sub-categories/{id}
    Critical gap resolved. Deletes a specific sub-category.
    """
    success = sc_repo.delete(id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sub-category with ID {id} not found"
        )
    return {"message": "Sub-category deleted successfully"}
