from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import MatchRequest, User
from ..schemas import (
    MatchRequestCreate, MatchRequestResponse,
    FairRentSplitRequest, FairRentSplitResponse, RoomSplitResult
)

router = APIRouter(prefix="/api/interactions", tags=["Connections & Smart Utilities"])

@router.post("/connect", response_model=MatchRequestResponse)
def send_connection_request(payload: MatchRequestCreate, db: Session = Depends(get_db)):
    if payload.sender_id == payload.receiver_id:
        raise HTTPException(status_code=400, detail="Cannot send a roommate connection request to yourself")

    # Check if request already exists
    existing = db.query(MatchRequest).filter(
        MatchRequest.sender_id == payload.sender_id,
        MatchRequest.receiver_id == payload.receiver_id
    ).first()

    if existing:
        return existing

    req = MatchRequest(
        sender_id=payload.sender_id,
        receiver_id=payload.receiver_id,
        property_id=payload.property_id,
        message=payload.message or "Hi! I loved your profile and compatibility score. Would love to connect!"
    )
    db.add(req)
    db.commit()
    db.refresh(req)
    return req


@router.get("/requests/{user_id}", response_model=List[MatchRequestResponse])
def get_user_requests(user_id: int, db: Session = Depends(get_db)):
    """Fetch all sent and received connection requests for a user."""
    return db.query(MatchRequest).filter(
        (MatchRequest.sender_id == user_id) | (MatchRequest.receiver_id == user_id)
    ).order_by(MatchRequest.created_at.desc()).all()


@router.put("/requests/{request_id}/status", response_model=MatchRequestResponse)
def update_request_status(request_id: int, status: str, db: Session = Depends(get_db)):
    if status not in ["accepted", "declined", "pending"]:
        raise HTTPException(status_code=400, detail="Invalid status")

    req = db.query(MatchRequest).filter(MatchRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Request not found")

    req.status = status
    db.commit()
    db.refresh(req)
    return req


@router.post("/fair-rent-split", response_model=FairRentSplitResponse)
def calculate_fair_rent_split(payload: FairRentSplitRequest):
    """
    Algorithmic Fair Rent Division:
    - Splits rent into Common Area pool (divided equally) and Private Bedroom pool (proportional to sqft).
    - Applies premium multipliers for private bath (+8%), private balcony (+4%), walk-in closet (+2.5%).
    - Normalizes so total strictly equals the total rent.
    """
    total_rent = payload.total_rent
    utilities = payload.total_utilities
    num_rooms = len(payload.rooms)

    if num_rooms == 0:
        raise HTTPException(status_code=400, detail="At least one room is required")

    total_sqft = sum(r.size_sqft for r in payload.rooms)
    if total_sqft <= 0:
        raise HTTPException(status_code=400, detail="Total square footage must be greater than zero")

    # Common vs private pool
    common_ratio = max(0.0, min(0.6, payload.common_area_weight_percent / 100.0))
    common_pool = total_rent * common_ratio
    common_share_per_room = common_pool / num_rooms

    private_pool = total_rent - common_pool

    # Calculate room weights
    raw_private_values = []
    amenity_surcharges = []

    for room in payload.rooms:
        base_size_share = (room.size_sqft / total_sqft) * private_pool

        # Surcharges for premium private amenities
        surcharge = 0.0
        if room.has_private_bath:
            surcharge += base_size_share * 0.12 # 12% surcharge for private bath
        if room.has_balcony:
            surcharge += base_size_share * 0.06 # 6% surcharge for balcony
        if room.has_walk_in_closet:
            surcharge += base_size_share * 0.04 # 4% surcharge for walk-in closet

        raw_val = base_size_share + surcharge
        raw_private_values.append(raw_val)
        amenity_surcharges.append(surcharge)

    # Normalize private values so their sum equals private_pool
    sum_raw = sum(raw_private_values)
    scale_factor = private_pool / sum_raw if sum_raw > 0 else 1.0

    room_results = []
    utility_per_person = utilities / num_rooms if num_rooms > 0 else 0.0

    for idx, room in enumerate(payload.rooms):
        final_private = raw_private_values[idx] * scale_factor
        final_rent = round(common_share_per_room + final_private, 2)
        total_monthly = round(final_rent + utility_per_person, 2)
        pct = round((final_rent / total_rent) * 100, 1) if total_rent > 0 else 0

        # Construct formula explanation
        perks = []
        if room.has_private_bath:
            perks.append("Private Bath")
        if room.has_balcony:
            perks.append("Balcony")
        if room.has_walk_in_closet:
            perks.append("Walk-in Closet")
        perks_str = f" with {', '.join(perks)}" if perks else " standard features"

        explanation = (
            f"{room.size_sqft} sqft ({round((room.size_sqft / total_sqft) * 100, 1)}% of private space)"
            f"{perks_str}. Common area share: ${round(common_share_per_room, 2)}."
        )

        room_results.append(RoomSplitResult(
            room_name=room.room_name,
            occupant_name=room.occupant_name or f"Roommate {idx + 1}",
            calculated_rent=final_rent,
            utility_share=round(utility_per_person, 2),
            total_monthly=total_monthly,
            percentage_of_rent=pct,
            amenity_surcharge=round(amenity_surcharges[idx], 2),
            formula_explanation=explanation
        ))

    # Reconcile rounding discrepancy to ensure exact total_rent match
    current_sum = sum(r.calculated_rent for r in room_results)
    diff = round(total_rent - current_sum, 2)
    if diff != 0:
        room_results[0].calculated_rent = round(room_results[0].calculated_rent + diff, 2)
        room_results[0].total_monthly = round(room_results[0].calculated_rent + utility_per_person, 2)

    return FairRentSplitResponse(
        total_rent=total_rent,
        total_utilities=utilities,
        rooms=room_results,
        common_area_share_per_person=round(common_share_per_room, 2),
        summary=f"Calculated fair split for {num_rooms} rooms across {int(total_sqft)} total private sqft with ${int(common_pool)} shared common amenities pool."
    )
