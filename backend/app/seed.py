import json
from .database import SessionLocal, Base, engine
from .models import User, LifestyleProfile, PropertyListing, MatchRequest

def seed_database():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Avoid duplicate seeding
    if db.query(User).count() > 0:
        db.close()
        return

    print("Seeding database with demo users, lifestyle profiles, and rental listings...")

    users_data = [
        {
            "email": "alex.chen@example.com",
            "full_name": "Alex Chen",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
            "gender": "Non-binary",
            "age": 23,
            "occupation": "CS Master's Student",
            "bio": "Graduate student at Tech University focusing on distributed systems. Quiet, early riser, values a tidy living space for study and relaxation.",
            "phone": "+1 (555) 234-5678",
            "role": "tenant",
            "lifestyle": {
                "sleep_schedule": 1, # Early Bird
                "cleanliness": 5,    # Spotless
                "noise_tolerance": 1,# Very quiet
                "social_habits": 2,  # Introvert
                "guest_frequency": 1,# Rarely
                "work_schedule": "Student",
                "dietary_pref": "Vegetarian",
                "smoking": "Non-smoker",
                "drinking": "Non-drinker",
                "pet_friendly": "Loves pets",
                "budget_min": 600.0,
                "budget_max": 1100.0,
                "preferred_city": "Metro City",
                "preferred_areas": "University District, Tech Park",
                "move_in_date": "Within 2 weeks",
                "hobbies": "Algorithms, Espresso brewing, Mechanical Keyboards, Hiking"
            }
        },
        {
            "email": "jordan.taylor@example.com",
            "full_name": "Jordan Taylor",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
            "gender": "Male",
            "age": 24,
            "occupation": "Product Designer",
            "bio": "Working at a creative tech agency. Love synthwave, photography, and weekend cooking experiments. Friendly and sociable vibe.",
            "phone": "+1 (555) 345-6789",
            "role": "tenant",
            "lifestyle": {
                "sleep_schedule": 4, # Night Owl
                "cleanliness": 3,    # Moderate
                "noise_tolerance": 4,# Tolerates background music/noise
                "social_habits": 4,  # Extroverted
                "guest_frequency": 3,# Occasional friends over
                "work_schedule": "Hybrid",
                "dietary_pref": "Any",
                "smoking": "Non-smoker",
                "drinking": "Socially",
                "pet_friendly": "Has pets",
                "budget_min": 800.0,
                "budget_max": 1400.0,
                "preferred_city": "Metro City",
                "preferred_areas": "Arts District, Downtown",
                "move_in_date": "Next month",
                "hobbies": "UI/UX, Cycling, Indie Concerts, Photography"
            }
        },
        {
            "email": "maya.patel@example.com",
            "full_name": "Maya Patel",
            "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
            "gender": "Female",
            "age": 25,
            "occupation": "Data Analyst",
            "bio": "Health-conscious professional working remotely. Practice yoga every morning. Keep shared areas clean and love peaceful evenings.",
            "phone": "+1 (555) 456-7890",
            "role": "tenant",
            "lifestyle": {
                "sleep_schedule": 2, # Morning inclined
                "cleanliness": 4,    # High cleanliness
                "noise_tolerance": 2,# Quiet
                "social_habits": 3,  # Balanced
                "guest_frequency": 2,# Infrequent guests
                "work_schedule": "Work from home",
                "dietary_pref": "Vegetarian",
                "smoking": "Non-smoker",
                "drinking": "Non-drinker",
                "pet_friendly": "Loves pets",
                "budget_min": 700.0,
                "budget_max": 1250.0,
                "preferred_city": "Metro City",
                "preferred_areas": "University District, Green Valley",
                "move_in_date": "Immediate",
                "hobbies": "Yoga, Plant care, Baking, Watercolor painting"
            }
        },
        {
            "email": "liam.davies@example.com",
            "full_name": "Liam Davies",
            "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
            "gender": "Male",
            "age": 26,
            "occupation": "Financial Analyst",
            "bio": "Corporate consultant out of the apartment most days 8am-6pm. Organized, respectful, into fitness, and looking for calm roommates.",
            "phone": "+1 (555) 567-8901",
            "role": "tenant",
            "lifestyle": {
                "sleep_schedule": 1, # Early riser
                "cleanliness": 5,    # Spotless
                "noise_tolerance": 2,# Low noise
                "social_habits": 2,  # Private
                "guest_frequency": 1,# Rare
                "work_schedule": "In-Office",
                "dietary_pref": "Non-Vegetarian",
                "smoking": "Non-smoker",
                "drinking": "Socially",
                "pet_friendly": "No pets",
                "budget_min": 900.0,
                "budget_max": 1600.0,
                "preferred_city": "Metro City",
                "preferred_areas": "Downtown, Financial District",
                "move_in_date": "Within 2 weeks",
                "hobbies": "Marathon training, Tennis, Financial markets, Chess"
            }
        },
        {
            "email": "sophia.rodriguez@example.com",
            "full_name": "Sophia Rodriguez",
            "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
            "gender": "Female",
            "age": 27,
            "occupation": "Pediatric Resident Doctor",
            "bio": "Hospital resident with rotating shifts. Need respectful, quiet living quarters when off-duty. Friendly, honest, and reliable with rent.",
            "phone": "+1 (555) 678-9012",
            "role": "tenant",
            "lifestyle": {
                "sleep_schedule": 3, # Flexible / shift based
                "cleanliness": 5,    # Spotless
                "noise_tolerance": 1,# Very sensitive to loud noise
                "social_habits": 2,  # Private
                "guest_frequency": 1,# Minimal
                "work_schedule": "In-Office",
                "dietary_pref": "Any",
                "smoking": "Non-smoker",
                "drinking": "Socially",
                "pet_friendly": "Allergic",
                "budget_min": 850.0,
                "budget_max": 1500.0,
                "preferred_city": "Metro City",
                "preferred_areas": "Hospital Hill, Downtown",
                "move_in_date": "Immediate",
                "hobbies": "Running, Specialty Coffee, Audiobooks, Swimming"
            }
        },
        {
            "email": "ethan.brooks@example.com",
            "full_name": "Ethan Brooks",
            "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
            "gender": "Male",
            "age": 22,
            "occupation": "Game Developer & Streamer",
            "bio": "Building an indie puzzle adventure game. Usually up late coding or gaming with headset on. Easygoing, cooks pasta, always pays bills early.",
            "phone": "+1 (555) 789-0123",
            "role": "tenant",
            "lifestyle": {
                "sleep_schedule": 5, # Extreme Night Owl (2am-10am)
                "cleanliness": 3,    # Moderate
                "noise_tolerance": 4,# Noise friendly
                "social_habits": 4,  # Social
                "guest_frequency": 3,# Casual
                "work_schedule": "Work from home",
                "dietary_pref": "Non-Vegetarian",
                "smoking": "Non-smoker",
                "drinking": "Socially",
                "pet_friendly": "Loves pets",
                "budget_min": 600.0,
                "budget_max": 1100.0,
                "preferred_city": "Metro City",
                "preferred_areas": "Arts District, University District",
                "move_in_date": "Next month",
                "hobbies": "Game design, Retro consoles, Tabletop RPGs, Sci-Fi movies"
            }
        },
        {
            "email": "landlord.davis@example.com",
            "full_name": "Eleanor Davis",
            "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
            "gender": "Female",
            "age": 45,
            "occupation": "Property Owner & Architect",
            "bio": "Owner of sustainably renovated boutique apartments in the University & Arts districts. We prioritize harmonious tenant communities.",
            "phone": "+1 (555) 890-1234",
            "role": "landlord",
            "lifestyle": {
                "sleep_schedule": 2,
                "cleanliness": 5,
                "noise_tolerance": 2,
                "social_habits": 3,
                "guest_frequency": 2,
                "work_schedule": "In-Office",
                "dietary_pref": "Any",
                "smoking": "Non-smoker",
                "drinking": "Socially",
                "pet_friendly": "Loves pets",
                "budget_min": 1000.0,
                "budget_max": 3000.0,
                "preferred_city": "Metro City",
                "preferred_areas": "All",
                "move_in_date": "Immediate",
                "hobbies": "Architecture, Interior Design, Gardening"
            }
        }
    ]

    created_users = []
    for ud in users_data:
        lifestyle_data = ud.pop("lifestyle")
        user = User(**ud)
        db.add(user)
        db.flush() # assign user.id

        lifestyle = LifestyleProfile(user_id=user.id, **lifestyle_data)
        db.add(lifestyle)
        created_users.append(user)

    db.commit()

    # Seed Properties
    host_user = created_users[-1] # Eleanor Davis
    properties_data = [
        {
            "host_id": host_user.id,
            "title": "Sunlit 2BHK Corner Flat with Study Nook",
            "description": "Bright, newly renovated 2-bedroom apartment situated 5 minutes walk from campus and metro line. Hardwood floors, high-speed fiber internet, and energy-efficient appliances. Perfect for students or young professionals looking for a tranquil environment.",
            "property_type": "Private Room in 2BHK",
            "address": "412 College Avenue, Apt 3B",
            "city": "Metro City",
            "neighborhood": "University District",
            "rent_monthly": 850.0,
            "deposit": 850.0,
            "utilities_included": True,
            "estimated_utilities": 0.0,
            "bedrooms": 2,
            "bathrooms": 1,
            "size_sqft": 920,
            "furnished": "Fully Furnished",
            "available_from": "Immediate",
            "lease_term_months": 12,
            "amenities": json.dumps(["High-Speed Fiber WiFi", "In-Unit Washer & Dryer", "Dishwasher", "Air Conditioning", "Bicycle Storage", "Central Heating", "Elevator Access"]),
            "house_rules": json.dumps(["Quiet hours after 10:30 PM", "No indoor smoking", "Shoes off at entrance", "Clean common kitchen after cooking"]),
            "images": json.dumps([
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
            ]),
            "preferred_gender": "Any"
        },
        {
            "host_id": host_user.id,
            "title": "Modern Master Suite with Private Bath & Balcony",
            "description": "Spacious primary bedroom in a luxury 3BHK flat near Tech Park. Features an ensuite bathroom, walk-in closet, private balcony with green views, and garage parking spot. Current tenants are quiet software engineers.",
            "property_type": "Master Bedroom with Ensuite Bath",
            "address": "88 Innovation Boulevard, Unit 502",
            "city": "Metro City",
            "neighborhood": "Tech Park",
            "rent_monthly": 1150.0,
            "deposit": 1000.0,
            "utilities_included": False,
            "estimated_utilities": 65.0,
            "bedrooms": 3,
            "bathrooms": 3,
            "size_sqft": 1400,
            "furnished": "Fully Furnished",
            "available_from": "1st of Next Month",
            "lease_term_months": 6,
            "amenities": json.dumps(["Private Ensuite Bath", "Private Balcony", "Rooftop Swimming Pool", "Fitness Center & Gym", "High-Speed WiFi", "Covered Parking", "Dishwasher", "24/7 Security"]),
            "house_rules": json.dumps(["No smoking indoors", "Professional working environment", "Respectful guest policy"]),
            "images": json.dumps([
                "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
            ]),
            "preferred_gender": "Any"
        },
        {
            "host_id": host_user.id,
            "title": "Charming Bohemian Loft in the Arts District",
            "description": "High ceilings, exposed brick walls, and oversized industrial windows that flood the open space with natural light. Close to cafes, galleries, indie bookshops, and light rail. Great for creatives.",
            "property_type": "Private Room in Shared Loft",
            "address": "120 Factory Lane, Studio 4A",
            "city": "Metro City",
            "neighborhood": "Arts District",
            "rent_monthly": 920.0,
            "deposit": 900.0,
            "utilities_included": True,
            "estimated_utilities": 0.0,
            "bedrooms": 2,
            "bathrooms": 2,
            "size_sqft": 1100,
            "furnished": "Semi-Furnished",
            "available_from": "Immediate",
            "lease_term_months": 12,
            "amenities": json.dumps(["Exposed Brick Interiors", "Art Studio Space", "Pet Friendly", "Washer/Dryer", "High-Speed WiFi", "Community Garden"]),
            "house_rules": json.dumps(["Pet friendly (clean up required)", "Social gatherings welcome on weekends", "Respectful noise during work hours"]),
            "images": json.dumps([
                "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80"
            ]),
            "preferred_gender": "Any"
        },
        {
            "host_id": host_user.id,
            "title": "Serene Garden Apartment with Courtyard Patio",
            "description": "Peaceful ground-floor 2BHK opening onto a verdant courtyard garden. Quiet residential neighborhood with tree-lined streets, close to hospitals, organic grocery stores, and running trails.",
            "property_type": "Private Room in 2BHK",
            "address": "74 Blossom Way",
            "city": "Metro City",
            "neighborhood": "Green Valley",
            "rent_monthly": 780.0,
            "deposit": 750.0,
            "utilities_included": False,
            "estimated_utilities": 45.0,
            "bedrooms": 2,
            "bathrooms": 1,
            "size_sqft": 880,
            "furnished": "Fully Furnished",
            "available_from": "Immediate",
            "lease_term_months": 12,
            "amenities": json.dumps(["Private Garden Patio", "Full Modular Kitchen", "Dishwasher", "High-Speed WiFi", "Free Street Parking", "Storage Unit"]),
            "house_rules": json.dumps(["Vegetarian/Vegan friendly", "No smoking anywhere on premises", "Quiet residential neighborhood after 10 PM"]),
            "images": json.dumps([
                "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
            ]),
            "preferred_gender": "Female only"
        }
    ]

    for pd in properties_data:
        prop = PropertyListing(**pd)
        db.add(prop)

    # Seed an initial match request from Alex to Maya
    req = MatchRequest(
        sender_id=created_users[0].id, # Alex
        receiver_id=created_users[2].id, # Maya
        status="pending",
        message="Hi Maya! I saw our compatibility score is 93%—we both keep a quiet, early schedule and maintain a clean kitchen. Would love to chat about sharing a 2BHK!"
    )
    db.add(req)

    db.commit()
    db.close()
    print("Database seeding completed successfully.")

if __name__ == "__main__":
    seed_database()
