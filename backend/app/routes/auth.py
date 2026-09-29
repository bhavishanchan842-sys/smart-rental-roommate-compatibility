from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import User, LifestyleProfile
from ..schemas import UserCreate, UserResponse, LifestyleProfileBase

router = APIRouter(prefix="/api/auth", tags=["Authentication & Users"])

@router.get("/users", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    """List all registered users (used for demo profiles & active user switcher)."""
    return db.query(User).all()

@router.get("/user/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/register", response_model=UserResponse)
def register_user(payload: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_data = payload.model_dump(exclude={"lifestyle"})
    user = User(**user_data)
    db.add(user)
    db.flush()

    # Create lifestyle profile
    lifestyle_data = payload.lifestyle.model_dump() if payload.lifestyle else {}
    lifestyle = LifestyleProfile(user_id=user.id, **lifestyle_data)
    db.add(lifestyle)

    db.commit()
    db.refresh(user)
    return user

@router.put("/profile/{user_id}/lifestyle", response_model=UserResponse)
def update_lifestyle_profile(user_id: int, payload: LifestyleProfileBase, db: Session = Depends(get_db)):
    """Updates lifestyle habits & preferences from the Compatibility Quiz."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(LifestyleProfile).filter(LifestyleProfile.user_id == user_id).first()
    if not profile:
        profile = LifestyleProfile(user_id=user_id, **payload.model_dump())
        db.add(profile)
    else:
        for key, val in payload.model_dump().items():
            setattr(profile, key, val)

    db.commit()
    db.refresh(user)
    return user
