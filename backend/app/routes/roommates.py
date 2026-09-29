from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import User, LifestyleProfile, MatchRequest
from ..schemas import RoommateMatchCard, UserResponse
from ..compatibility import calculate_compatibility

router = APIRouter(prefix="/api/roommates", tags=["Roommate Compatibility & Matching"])

@router.get("", response_model=List[RoommateMatchCard])
def get_roommate_matches(
    current_user_id: int = Query(1, description="ID of the currently logged-in user"),
    min_score: Optional[int] = Query(None, description="Filter matches above a minimum compatibility score"),
    gender: Optional[str] = Query(None, description="Filter by preferred roommate gender"),
    work_schedule: Optional[str] = Query(None, description="Filter by work schedule"),
    pet_friendly: Optional[str] = Query(None, description="Filter by pet compatibility"),
    db: Session = Depends(get_db)
):
    current_user = db.query(User).filter(User.id == current_user_id).first()
    if not current_user or not current_user.lifestyle_profile:
        raise HTTPException(status_code=404, detail="Active user or lifestyle profile not found")

    # Fetch all other users with a lifestyle profile (excluding landlords)
    candidates = (
        db.query(User)
        .filter(User.id != current_user_id, User.role != "landlord")
        .all()
    )

    # Fetch active match requests involving current_user
    sent_requests = {
        req.receiver_id: req.status
        for req in db.query(MatchRequest).filter(MatchRequest.sender_id == current_user_id).all()
    }
    received_requests = {
        req.sender_id: req.status
        for req in db.query(MatchRequest).filter(MatchRequest.receiver_id == current_user_id).all()
    }

    results = []
    for candidate in candidates:
        if not candidate.lifestyle_profile:
            continue

        # Optional filters
        if gender and gender != "All" and candidate.gender != gender:
            continue
        if work_schedule and work_schedule != "All" and candidate.lifestyle_profile.work_schedule != work_schedule:
            continue
        if pet_friendly and pet_friendly != "All" and candidate.lifestyle_profile.pet_friendly != pet_friendly:
            continue

        # Run algorithmic compatibility engine
        comp = calculate_compatibility(current_user.lifestyle_profile, candidate.lifestyle_profile)

        if min_score and comp["overall_score"] < min_score:
            continue

        # Connection status check
        connection_status = None
        if candidate.id in sent_requests:
            connection_status = f"Sent: {sent_requests[candidate.id]}"
        elif candidate.id in received_requests:
            connection_status = f"Received: {received_requests[candidate.id]}"

        results.append(RoommateMatchCard(
            user=UserResponse.model_validate(candidate),
            compatibility_score=comp["overall_score"],
            cleanliness_score=comp["cleanliness_score"],
            sleep_score=comp["sleep_score"],
            noise_score=comp["noise_score"],
            social_score=comp["social_score"],
            guest_score=comp["guest_score"],
            budget_score=comp["budget_score"],
            strengths=comp["strengths"],
            frictions=comp["frictions"],
            radar_data=comp["radar_data"],
            connection_status=connection_status
        ))

    # Sort candidates by highest compatibility score first
    results.sort(key=lambda x: x.compatibility_score, reverse=True)
    return results


@router.get("/compare")
def compare_two_profiles(user1_id: int, user2_id: int, db: Session = Depends(get_db)):
    u1 = db.query(User).filter(User.id == user1_id).first()
    u2 = db.query(User).filter(User.id == user2_id).first()

    if not u1 or not u2 or not u1.lifestyle_profile or not u2.lifestyle_profile:
        raise HTTPException(status_code=404, detail="One or both users lack complete lifestyle profiles")

    comp = calculate_compatibility(u1.lifestyle_profile, u2.lifestyle_profile)
    return {
        "user1": UserResponse.model_validate(u1),
        "user2": UserResponse.model_validate(u2),
        "compatibility": comp
    }
