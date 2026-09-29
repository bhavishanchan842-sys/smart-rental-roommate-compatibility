import math
from typing import Dict, Any, List

# Dimension weights (must sum to 1.0)
WEIGHTS = {
    "cleanliness": 0.28,      # Cleanliness is statistically #1 cause of roommate friction
    "sleep_schedule": 0.22,   # Sleep habits & circadian rhythms
    "noise_tolerance": 0.18,  # Noise / quiet hours alignment
    "social_habits": 0.16,    # Social energy vs privacy
    "guest_frequency": 0.16   # Overnight guests & parties
}

def calculate_dimension_similarity(val1: int, val2: int, max_diff: float = 4.0) -> float:
    """
    Computes a 0.0 - 1.0 similarity score between two 1-5 scale ratings.
    Uses a non-linear decay so larger differences produce sharper penalties.
    """
    diff = abs(val1 - val2)
    # Quadratic decay: small difference (1) is penalized mildly, 3 or 4 is heavily penalized
    return max(0.0, 1.0 - (diff / max_diff) ** 1.35)


def calculate_budget_overlap(min1: float, max1: float, min2: float, max2: float) -> tuple[float, str]:
    """
    Evaluates budget compatibility between two users.
    Returns (score 0.0-1.0, description).
    """
    overlap_start = max(min1, min2)
    overlap_end = min(max1, max2)

    if overlap_end >= overlap_start:
        overlap_range = overlap_end - overlap_start
        avg_range = ((max1 - min1) + (max2 - min2)) / 2.0
        ratio = min(1.0, (overlap_range + 50) / (avg_range + 50))
        return (0.85 + (0.15 * ratio), f"Overlapping budget range: ${int(overlap_start)} - ${int(overlap_end)}/mo")
    else:
        gap = overlap_start - overlap_end
        penalty = min(0.6, gap / 300.0)
        return (max(0.3, 0.8 - penalty), f"Budget gap of ${int(gap)}/mo")


def calculate_compatibility(p1, p2) -> Dict[str, Any]:
    """
    Calculates detailed roommate compatibility between two LifestyleProfile instances.
    """
    # 1. Base 1-5 dimensions
    clean_sim = calculate_dimension_similarity(p1.cleanliness, p2.cleanliness)
    sleep_sim = calculate_dimension_similarity(p1.sleep_schedule, p2.sleep_schedule)
    noise_sim = calculate_dimension_similarity(p1.noise_tolerance, p2.noise_tolerance)
    social_sim = calculate_dimension_similarity(p1.social_habits, p2.social_habits)
    guest_sim = calculate_dimension_similarity(p1.guest_frequency, p2.guest_frequency)

    base_score = (
        clean_sim * WEIGHTS["cleanliness"] +
        sleep_sim * WEIGHTS["sleep_schedule"] +
        noise_sim * WEIGHTS["noise_tolerance"] +
        social_sim * WEIGHTS["social_habits"] +
        guest_sim * WEIGHTS["guest_frequency"]
    )

    # 2. Categorical Adjustments & Dealbreakers
    adjustment = 0.0
    strengths: List[str] = []
    frictions: List[str] = []

    # Cleanliness insights
    if abs(p1.cleanliness - p2.cleanliness) <= 1:
        if p1.cleanliness >= 4:
            strengths.append("Both value high cleanliness and organized living spaces")
        else:
            strengths.append("Similar relaxed approach to household chores")
    else:
        frictions.append("Noticeable difference in cleanliness and chore expectations")

    # Sleep schedule insights
    if abs(p1.sleep_schedule - p2.sleep_schedule) <= 1:
        if p1.sleep_schedule <= 2:
            strengths.append("Both are early risers with morning-aligned schedules")
        elif p1.sleep_schedule >= 4:
            strengths.append("Both are night owls with late evening routines")
        else:
            strengths.append("Synchronized day/night routines")
    else:
        frictions.append("Contrasting sleep schedules (Early bird vs. Night owl)")

    # Smoking policy
    if p1.smoking == "Non-smoker" and p2.smoking == "Smoker":
        adjustment -= 0.15
        frictions.append("Smoking mismatch: One roommate prefers a strictly smoke-free home")
    elif p1.smoking == "Smoker" and p2.smoking == "Non-smoker":
        adjustment -= 0.15
        frictions.append("Smoking mismatch: One roommate prefers a strictly smoke-free home")
    elif p1.smoking == p2.smoking:
        adjustment += 0.03
        strengths.append(f"Matching smoking preference ({p1.smoking})")

    # Pet compatibility
    if (p1.pet_friendly == "Allergic" and p2.pet_friendly in ["Has pets", "Loves pets"]) or \
       (p2.pet_friendly == "Allergic" and p1.pet_friendly in ["Has pets", "Loves pets"]):
        adjustment -= 0.20
        frictions.append("Pet allergy conflict: Potential issue with pets in living space")
    elif p1.pet_friendly in ["Loves pets", "Has pets"] and p2.pet_friendly in ["Loves pets", "Has pets"]:
        adjustment += 0.04
        strengths.append("Both are animal lovers and pet-friendly")

    # Dietary preferences
    if p1.dietary_pref == p2.dietary_pref and p1.dietary_pref != "Any":
        adjustment += 0.04
        strengths.append(f"Shared dietary preference ({p1.dietary_pref})")

    # Work / study routines
    if p1.work_schedule == p2.work_schedule:
        strengths.append(f"Matching work style: {p1.work_schedule}")
    elif ("Work from home" in [p1.work_schedule, p2.work_schedule]) and ("In-Office" in [p1.work_schedule, p2.work_schedule]):
        strengths.append("Complementary day schedules: one works remotely while the other is out")

    # Budget overlap
    budget_score, budget_note = calculate_budget_overlap(
        p1.budget_min, p1.budget_max, p2.budget_min, p2.budget_max
    )
    if "Overlapping" in budget_note:
        strengths.append(budget_note)
    else:
        frictions.append(budget_note)

    # 3. Final composite calculation
    # Base accounts for 75%, budget for 15%, adjustments for 10%
    composite = (base_score * 0.75) + (budget_score * 0.15) + adjustment
    composite_percent = int(round(max(15, min(99, composite * 100))))

    # Normalized radar scores (0 to 100 scale)
    radar_data = [
        {"subject": "Cleanliness", "user": p1.cleanliness * 20, "match": p2.cleanliness * 20, "score": int(round(clean_sim * 100))},
        {"subject": "Sleep Sync", "user": p1.sleep_schedule * 20, "match": p2.sleep_schedule * 20, "score": int(round(sleep_sim * 100))},
        {"subject": "Noise / Quiet", "user": p1.noise_tolerance * 20, "match": p2.noise_tolerance * 20, "score": int(round(noise_sim * 100))},
        {"subject": "Social Vibe", "user": p1.social_habits * 20, "match": p2.social_habits * 20, "score": int(round(social_sim * 100))},
        {"subject": "Guest Policy", "user": p1.guest_frequency * 20, "match": p2.guest_frequency * 20, "score": int(round(guest_sim * 100))},
        {"subject": "Budget Fit", "user": 85, "match": 85, "score": int(round(budget_score * 100))},
    ]

    # Provide fallback strengths or frictions if lists are short
    if not strengths:
        strengths.append("Balanced general living habits and reasonable flexibility")
    if not frictions:
        frictions.append("No critical friction points identified! Highly compatible match.")

    return {
        "overall_score": composite_percent,
        "cleanliness_score": int(round(clean_sim * 100)),
        "sleep_score": int(round(sleep_sim * 100)),
        "noise_score": int(round(noise_sim * 100)),
        "social_score": int(round(social_sim * 100)),
        "guest_score": int(round(guest_sim * 100)),
        "budget_score": int(round(budget_score * 100)),
        "strengths": strengths,
        "frictions": frictions,
        "radar_data": radar_data
    }
