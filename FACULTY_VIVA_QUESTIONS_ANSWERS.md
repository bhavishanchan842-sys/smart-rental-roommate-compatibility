# 🎓 20% MILESTONE VIVA VOCE — FACULTY Q&A CHEAT SHEET

Here are the most common questions your guide ("Mam") will ask during your 20% review and the exact, impressive answers to give:

---

### Q1: "What have you completed for this 20% milestone?"
**Answer:**
> *"Mam, for our 20% milestone, we have completed:
> 1. The comprehensive Problem Formulation, SRS (Software Requirements Specification), and Architecture.
> 2. The complete Relational Database Schema for Users, Listings, Residents, and Expenses.
> 3. A fully interactive, responsive Frontend Prototype built with React 19, Vite, and Tailwind CSS.
> 4. The end-to-end user journey: Mobile Phone Login -> OTP Verification -> User Profile Onboarding -> Dual Discovery Pages (Vacant Rooms vs. Shared PGs with Existing Residents) -> Itemized Total Rent Breakdown & Live Lifestyle Compatibility Quiz."*

---

### Q2: "Why did you build two separate search pages instead of one?"
**Answer:**
> *"Because students and working professionals have two distinct accommodation scenarios:
> 1. In **Search Rooms/PGs**, a user is looking for an independent vacant room or standard PG operated by a landlord/warden, where meals and amenities are standard.
> 2. In **Search Shared PG with Resident**, a flat is already leased by an existing resident who has a vacant room. In this case, compatibility with the existing flatmate's habits (sleep schedule, cleanliness, diet) and how they split the maid/cook and utility bills is the primary deciding factor."*

---

### Q3: "How does your compatibility algorithm work?"
**Answer:**
> *"Our algorithm uses a weighted Euclidean distance metric normalized across 6 lifestyle dimensions: Cleanliness, Sleep Schedule, Food/Diet preferences, Guest Policy, Noise Tolerance, and Budget.
> We assign higher weights to high-friction dimensions—for instance, Cleanliness and Sleep Schedule have a 1.3 weight because mismatched sleep hours or messy habits cause the majority of roommate disputes."*

---

### Q4: "How does the rent breakdown work?"
**Answer:**
> *"Instead of showing just an arbitrary lump-sum rent, our platform transparently itemizes expenses into:
> - Base Room Rent
> - Food & Cook expense
> - Housekeeping / Maid charge
> - Utilities (Electricity, Water, High-Speed WiFi)
> It shows the Total Flat Rent alongside Your Exact Share, avoiding hidden cost disputes between roommates."*

---

### Q5: "What is your plan for the next review (50% milestone)?"
**Answer:**
> *"For the 50% milestone, we will connect this frontend to our FastAPI backend and SQLite database to persist user registrations, allow landlords and existing flatmates to post new listings dynamically, and store compatibility quiz results permanently."*
