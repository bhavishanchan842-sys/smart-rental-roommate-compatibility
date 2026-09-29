import pytest
from app.compatibility import calculate_compatibility, calculate_dimension_similarity, calculate_budget_overlap
from app.models import LifestyleProfile

def test_identical_profiles():
    p1 = LifestyleProfile(
        cleanliness=5, sleep_schedule=2, noise_tolerance=2,
        social_habits=3, guest_frequency=2, smoking="Non-smoker",
        pet_friendly="Loves pets", dietary_pref="Vegetarian",
        work_schedule="Hybrid", budget_min=700, budget_max=1200
    )
    p2 = LifestyleProfile(
        cleanliness=5, sleep_schedule=2, noise_tolerance=2,
        social_habits=3, guest_frequency=2, smoking="Non-smoker",
        pet_friendly="Loves pets", dietary_pref="Vegetarian",
        work_schedule="Hybrid", budget_min=700, budget_max=1200
    )

    result = calculate_compatibility(p1, p2)
    assert result["overall_score"] >= 95
    assert result["cleanliness_score"] == 100
    assert result["sleep_score"] == 100
    assert len(result["strengths"]) > 0

def test_opposing_profiles():
    # Spotless early-bird non-smoker vs messy night-owl smoker with pet allergy conflict
    p1 = LifestyleProfile(
        cleanliness=5, sleep_schedule=1, noise_tolerance=1,
        social_habits=1, guest_frequency=1, smoking="Non-smoker",
        pet_friendly="Loves pets", dietary_pref="Vegetarian",
        work_schedule="Student", budget_min=500, budget_max=800
    )
    p2 = LifestyleProfile(
        cleanliness=1, sleep_schedule=5, noise_tolerance=5,
        social_habits=5, guest_frequency=5, smoking="Smoker",
        pet_friendly="Allergic", dietary_pref="Non-Vegetarian",
        work_schedule="Hybrid", budget_min=1800, budget_max=2500
    )

    result = calculate_compatibility(p1, p2)
    assert result["overall_score"] < 40
    assert len(result["frictions"]) >= 3
