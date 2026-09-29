from typing import List, Optional, Dict, Any
from pydantic import BaseModel, ConfigDict
from datetime import datetime

# --- Profile Schemas ---
class LifestyleProfileBase(BaseModel):
    sleep_schedule: int = 3
    cleanliness: int = 4
    noise_tolerance: int = 2
    social_habits: int = 3
    guest_frequency: int = 2
    work_schedule: str = "Hybrid"
    dietary_pref: str = "Any"
    smoking: str = "Non-smoker"
    drinking: str = "Socially"
    pet_friendly: str = "Loves pets"
    budget_min: float = 500.0
    budget_max: float = 1200.0
    preferred_city: str = "Metro City"
    preferred_areas: str = "Downtown, University District"
    move_in_date: str = "Immediate"
    hobbies: str = "Reading, Cooking, Gym"

class LifestyleProfileCreate(LifestyleProfileBase):
    pass

class LifestyleProfileResponse(LifestyleProfileBase):
    id: int
    user_id: int
    model_config = ConfigDict(from_attributes=True)


# --- User Schemas ---
class UserBase(BaseModel):
    email: str
    full_name: str
    avatar: Optional[str] = None
    gender: str = "Any"
    age: Optional[int] = 22
    occupation: str = "Student"
    bio: Optional[str] = None
    phone: Optional[str] = None
    role: str = "tenant"
    model_config = ConfigDict(from_attributes=True)

class UserCreate(UserBase):
    lifestyle: Optional[LifestyleProfileCreate] = None

class UserResponse(UserBase):
    id: int
    created_at: datetime
    lifestyle_profile: Optional[LifestyleProfileResponse] = None
    model_config = ConfigDict(from_attributes=True)


# --- Property Listing Schemas ---
class PropertyListingBase(BaseModel):
    title: str
    description: str
    property_type: str = "Private Room in Shared Apartment"
    address: str
    city: str
    neighborhood: str
    rent_monthly: float
    deposit: float = 0.0
    utilities_included: bool = False
    estimated_utilities: float = 50.0
    bedrooms: int = 2
    bathrooms: int = 1
    size_sqft: int = 850
    furnished: str = "Fully Furnished"
    available_from: str = "Immediate"
    lease_term_months: int = 6
    amenities: List[str] = []
    house_rules: List[str] = []
    images: List[str] = []
    preferred_gender: str = "Any"

class PropertyListingCreate(PropertyListingBase):
    host_id: int

class PropertyListingResponse(BaseModel):
    id: int
    host_id: int
    title: str
    description: str
    property_type: str
    address: str
    city: str
    neighborhood: str
    rent_monthly: float
    deposit: float
    utilities_included: bool
    estimated_utilities: float
    bedrooms: int
    bathrooms: int
    size_sqft: int
    furnished: str
    available_from: str
    lease_term_months: int
    amenities: List[str]
    house_rules: List[str]
    images: List[str]
    preferred_gender: str
    created_at: datetime
    host: Optional[UserBase] = None
    model_config = ConfigDict(from_attributes=True)


# --- Match & Compatibility Schemas ---
class RoommateMatchCard(BaseModel):
    user: UserResponse
    compatibility_score: int
    cleanliness_score: int
    sleep_score: int
    noise_score: int
    social_score: int
    guest_score: int
    budget_score: int
    strengths: List[str]
    frictions: List[str]
    radar_data: List[Dict[str, Any]]
    connection_status: Optional[str] = None

class MatchRequestCreate(BaseModel):
    sender_id: int
    receiver_id: int
    property_id: Optional[int] = None
    message: Optional[str] = None

class MatchRequestResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    property_id: Optional[int] = None
    status: str
    message: str
    created_at: datetime
    sender: Optional[UserBase] = None
    receiver: Optional[UserBase] = None
    model_config = ConfigDict(from_attributes=True)


# --- Rent Splitter Schemas ---
class RoomFeatureInput(BaseModel):
    room_name: str
    size_sqft: float
    has_private_bath: bool = False
    has_balcony: bool = False
    has_walk_in_closet: bool = False
    occupant_name: Optional[str] = ""

class FairRentSplitRequest(BaseModel):
    total_rent: float
    total_utilities: float = 0.0
    common_area_weight_percent: float = 25.0
    rooms: List[RoomFeatureInput]

class RoomSplitResult(BaseModel):
    room_name: str
    occupant_name: str
    calculated_rent: float
    utility_share: float
    total_monthly: float
    percentage_of_rent: float
    amenity_surcharge: float
    formula_explanation: str

class FairRentSplitResponse(BaseModel):
    total_rent: float
    total_utilities: float
    rooms: List[RoomSplitResult]
    common_area_share_per_person: float
    summary: str
