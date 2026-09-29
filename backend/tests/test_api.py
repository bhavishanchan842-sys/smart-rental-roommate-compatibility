import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"

def test_get_users():
    response = client.get("/api/auth/users")
    assert response.status_code == 200
    users = response.json()
    assert len(users) >= 5

def test_get_listings():
    response = client.get("/api/listings")
    assert response.status_code == 200
    listings = response.json()
    assert len(listings) >= 3

def test_get_roommates():
    response = client.get("/api/roommates?current_user_id=1")
    assert response.status_code == 200
    roommates = response.json()
    assert len(roommates) >= 3
    # Check that scores are ordered descending
    scores = [r["compatibility_score"] for r in roommates]
    assert scores == sorted(scores, reverse=True)

def test_fair_rent_split():
    payload = {
        "total_rent": 2400.0,
        "total_utilities": 200.0,
        "common_area_weight_percent": 25.0,
        "rooms": [
            {
                "room_name": "Master Bedroom",
                "size_sqft": 240,
                "has_private_bath": True,
                "has_balcony": True,
                "has_walk_in_closet": True,
                "occupant_name": "Alex"
            },
            {
                "room_name": "Standard Bedroom A",
                "size_sqft": 160,
                "has_private_bath": False,
                "has_balcony": False,
                "has_walk_in_closet": False,
                "occupant_name": "Jordan"
            },
            {
                "room_name": "Standard Bedroom B",
                "size_sqft": 140,
                "has_private_bath": False,
                "has_balcony": False,
                "has_walk_in_closet": False,
                "occupant_name": "Maya"
            }
        ]
    }
    response = client.post("/api/interactions/fair-rent-split", json=payload)
    assert response.status_code == 200
    data = response.json()
    # Total rent allocated must strictly equal 2400
    allocated_sum = sum(r["calculated_rent"] for r in data["rooms"])
    assert round(allocated_sum, 2) == 2400.0
    # Master bedroom with private bath & balcony should have highest rent
    assert data["rooms"][0]["calculated_rent"] > data["rooms"][1]["calculated_rent"]
    assert data["rooms"][1]["calculated_rent"] > data["rooms"][2]["calculated_rent"]
