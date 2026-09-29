import json
from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey
)
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    avatar = Column(String(255), nullable=True)
    gender = Column(String(30), default="Any")
    age = Column(Integer, nullable=True)
    occupation = Column(String(100), default="Student")
    bio = Column(Text, nullable=True)
    phone = Column(String(30), nullable=True)
    role = Column(String(30), default="tenant")  # tenant, landlord, both
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    lifestyle_profile = relationship("LifestyleProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    listings = relationship("PropertyListing", back_populates="host")
    sent_requests = relationship("MatchRequest", foreign_keys="MatchRequest.sender_id", back_populates="sender")
    received_requests = relationship("MatchRequest", foreign_keys="MatchRequest.receiver_id", back_populates="receiver")


class LifestyleProfile(Base):
    __tablename__ = "lifestyle_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    # Core 1-5 Scale Dimensions (used in algorithmic similarity)
    sleep_schedule = Column(Integer, default=3)   # 1=Early Bird (6am-10pm), 5=Night Owl (2am-10am)
    cleanliness = Column(Integer, default=4)      # 1=Relaxed/Messy, 5=Spotless/Meticulous
    noise_tolerance = Column(Integer, default=2)  # 1=Silence/Quiet library, 5=Parties & Loud music
    social_habits = Column(Integer, default=3)    # 1=Private/Introvert, 5=Extrovert/Social hub
    guest_frequency = Column(Integer, default=2)  # 1=Rarely/Never, 5=Daily/Overnight guests anytime

    # Lifestyle & Preference Attributes
    work_schedule = Column(String(50), default="Hybrid") # "Work from home", "In-Office", "Student", "Hybrid"
    dietary_pref = Column(String(50), default="Any")     # "Vegetarian", "Vegan", "Non-Vegetarian", "Any"
    smoking = Column(String(50), default="Non-smoker")   # "Non-smoker", "Outdoor only", "Smoker"
    drinking = Column(String(50), default="Socially")    # "Non-drinker", "Socially", "Regular"
    pet_friendly = Column(String(50), default="Loves pets") # "No pets", "Loves pets", "Has pets", "Allergic"
    
    # Financial & Location filters
    budget_min = Column(Float, default=500.0)
    budget_max = Column(Float, default=1200.0)
    preferred_city = Column(String(80), default="Metro City")
    preferred_areas = Column(String(255), default="Downtown, University District, Tech Park")
    move_in_date = Column(String(50), default="Immediate")
    hobbies = Column(String(255), default="Reading, Cooking, Gym, Gaming")

    user = relationship("User", back_populates="lifestyle_profile")


class PropertyListing(Base):
    __tablename__ = "property_listings"

    id = Column(Integer, primary_key=True, index=True)
    host_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    property_type = Column(String(60), default="Private Room in Shared Apartment")
    address = Column(String(200), nullable=False)
    city = Column(String(80), nullable=False)
    neighborhood = Column(String(100), nullable=False)
    rent_monthly = Column(Float, nullable=False)
    deposit = Column(Float, default=0.0)
    utilities_included = Column(Boolean, default=False)
    estimated_utilities = Column(Float, default=50.0)
    bedrooms = Column(Integer, default=2)
    bathrooms = Column(Integer, default=1)
    size_sqft = Column(Integer, default=850)
    furnished = Column(String(50), default="Fully Furnished")
    available_from = Column(String(50), default="Immediate")
    lease_term_months = Column(Integer, default=6)
    amenities = Column(Text, default="[]")  # JSON encoded list of strings
    house_rules = Column(Text, default="[]") # JSON encoded list of strings
    images = Column(Text, default="[]")      # JSON encoded list of image URLs
    preferred_gender = Column(String(30), default="Any")
    created_at = Column(DateTime, default=datetime.utcnow)

    host = relationship("User", back_populates="listings")

    def get_amenities_list(self):
        try:
            return json.loads(self.amenities)
        except Exception:
            return []

    def get_house_rules_list(self):
        try:
            return json.loads(self.house_rules)
        except Exception:
            return []

    def get_images_list(self):
        try:
            return json.loads(self.images)
        except Exception:
            return []


class MatchRequest(Base):
    __tablename__ = "match_requests"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    property_id = Column(Integer, ForeignKey("property_listings.id"), nullable=True)
    status = Column(String(30), default="pending") # pending, accepted, declined
    message = Column(Text, default="Hi! I noticed our compatibility score is great and wanted to connect.")
    created_at = Column(DateTime, default=datetime.utcnow)

    sender = relationship("User", foreign_keys=[sender_id], back_populates="sent_requests")
    receiver = relationship("User", foreign_keys=[receiver_id], back_populates="received_requests")


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
