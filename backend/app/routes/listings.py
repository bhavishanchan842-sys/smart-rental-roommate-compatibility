import json
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from ..models import PropertyListing, User
from ..schemas import PropertyListingCreate, PropertyListingResponse, UserBase

router = APIRouter(prefix="/api/listings", tags=["Rental Listings"])

def listing_to_response(prop: PropertyListing) -> PropertyListingResponse:
    return PropertyListingResponse(
        id=prop.id,
        host_id=prop.host_id,
        title=prop.title,
        description=prop.description,
        property_type=prop.property_type,
        address=prop.address,
        city=prop.city,
        neighborhood=prop.neighborhood,
        rent_monthly=prop.rent_monthly,
        deposit=prop.deposit,
        utilities_included=prop.utilities_included,
        estimated_utilities=prop.estimated_utilities,
        bedrooms=prop.bedrooms,
        bathrooms=prop.bathrooms,
        size_sqft=prop.size_sqft,
        furnished=prop.furnished,
        available_from=prop.available_from,
        lease_term_months=prop.lease_term_months,
        amenities=prop.get_amenities_list(),
        house_rules=prop.get_house_rules_list(),
        images=prop.get_images_list(),
        preferred_gender=prop.preferred_gender,
        created_at=prop.created_at,
        host=UserBase.model_validate(prop.host) if prop.host else None
    )

@router.get("", response_model=List[PropertyListingResponse])
def get_listings(
    city: Optional[str] = Query(None, description="City filter"),
    neighborhood: Optional[str] = Query(None, description="Neighborhood filter"),
    min_rent: Optional[float] = Query(None, description="Minimum monthly rent"),
    max_rent: Optional[float] = Query(None, description="Maximum monthly rent"),
    bedrooms: Optional[int] = Query(None, description="Number of bedrooms"),
    furnished: Optional[str] = Query(None, description="Furnished status"),
    search: Optional[str] = Query(None, description="Keyword search in title or description"),
    db: Session = Depends(get_db)
):
    query = db.query(PropertyListing)

    if city and city != "All":
        query = query.filter(PropertyListing.city.ilike(f"%{city}%"))
    if neighborhood and neighborhood != "All":
        query = query.filter(PropertyListing.neighborhood.ilike(f"%{neighborhood}%"))
    if min_rent is not None:
        query = query.filter(PropertyListing.rent_monthly >= min_rent)
    if max_rent is not None:
        query = query.filter(PropertyListing.rent_monthly <= max_rent)
    if bedrooms is not None and bedrooms > 0:
        query = query.filter(PropertyListing.bedrooms == bedrooms)
    if furnished and furnished != "All":
        query = query.filter(PropertyListing.furnished == furnished)
    if search:
        search_filter = f"%{search}%"
        query = query.filter(
            (PropertyListing.title.ilike(search_filter)) |
            (PropertyListing.description.ilike(search_filter)) |
            (PropertyListing.neighborhood.ilike(search_filter))
        )

    listings = query.order_by(PropertyListing.created_at.desc()).all()
    return [listing_to_response(p) for p in listings]


@router.get("/{listing_id}", response_model=PropertyListingResponse)
def get_listing_by_id(listing_id: int, db: Session = Depends(get_db)):
    prop = db.query(PropertyListing).filter(PropertyListing.id == listing_id).first()
    if not prop:
        raise HTTPException(status_code=404, detail="Property listing not found")
    return listing_to_response(prop)


@router.post("", response_model=PropertyListingResponse)
def create_listing(payload: PropertyListingCreate, db: Session = Depends(get_db)):
    host = db.query(User).filter(User.id == payload.host_id).first()
    if not host:
        raise HTTPException(status_code=404, detail="Host user not found")

    prop = PropertyListing(
        host_id=payload.host_id,
        title=payload.title,
        description=payload.description,
        property_type=payload.property_type,
        address=payload.address,
        city=payload.city,
        neighborhood=payload.neighborhood,
        rent_monthly=payload.rent_monthly,
        deposit=payload.deposit,
        utilities_included=payload.utilities_included,
        estimated_utilities=payload.estimated_utilities,
        bedrooms=payload.bedrooms,
        bathrooms=payload.bathrooms,
        size_sqft=payload.size_sqft,
        furnished=payload.furnished,
        available_from=payload.available_from,
        lease_term_months=payload.lease_term_months,
        amenities=json.dumps(payload.amenities),
        house_rules=json.dumps(payload.house_rules),
        images=json.dumps(payload.images if payload.images else [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
        ]),
        preferred_gender=payload.preferred_gender
    )
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return listing_to_response(prop)
