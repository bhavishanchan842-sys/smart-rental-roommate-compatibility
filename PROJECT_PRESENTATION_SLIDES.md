# Smart Rental & Roommate Compatibility Platform
## Project Presentation Slides (Phase 1 / 20% Evaluation)

> **Theme**: Professional Indigo & Slate Modern Design  
> **PowerPoint File**: `SmartRent_Presentation.pptx`  
> **Key Guideline**: Easy to read, crisp bullet points, not lengthy.

---

### Slide 1: Title Slide
- **Title**: SMART RENTAL & ROOMMATE COMPATIBILITY PLATFORM
- **Subtitle**: Intelligent PG Discovery, Habit-Based Matching & Transparent Shared Living
- **Degree / Phase**: Mini-Project Phase 1 (20% Milestone)
- **Domain**: Web Technologies & Applied Machine Learning
- **Currency & Geo**: Indian Rupees (₹) • Manual Location Entry with Google Maps

---

### Slide 2: 1. Abstract
- **Core Problem**: Urban students & interns struggle to find affordable accommodation and face frequent conflicts with incompatible roommates.
- **Proposed Solution**: A dual-mode web platform combining independent PG discovery with a habit-based roommate recommendation engine.
- **Dual Discovery**:
  1. *Search Independent Rooms & PGs* (Boys, Girls, Co-Living).
  2. *Search Shared PGs with Person Already Living There* (with mutual compatibility %).
- **Fair Utility Splitter**: Mathematical algorithm dividing rent based on bedroom square footage and attached washrooms.
- **Value**: Transparent pricing in Indian Rupees (₹), zero brokerage, and dispute-free co-living.

---

### Slide 3: 2. Introduction: Background & Motivation

#### 📌 Background
- Rapid migration of students and employees to metropolitan hubs (Bangalore, Pune, Hyderabad, NCR).
- High rental inflation forces people to share 2BHK/3BHK flats to split living costs.
- Traditional property portals treat tenants merely as real-estate buyers, completely ignoring who they will live with.

#### 🎯 Motivation
- Clashes in daily habits (sleep routines, cleanliness standards, food preferences) cause immense stress and mid-lease dropouts.
- Students waste high brokerage fees on unverified properties with surprise hidden charges.
- Motivation to build a single-window solution that evaluates **habit compatibility before moving in**.

---

### Slide 4: 2. Introduction: Scope
- **Target Audience**: College students, corporate interns, and early-career working professionals.
- **Manual Area Discovery**: Users type any neighborhood, landmark, or college name manually, with 1-click external Google Maps route connectivity.
- **Scientific Matchmaking**: Evaluates 4 core dimensions: Sleep Schedule, Cleanliness, Study Routine, and Dietary Habits.
- **Transparent Expense Breakdown**: Itemizes Room Rent, Cook, Maid, and WiFi separately in INR (₹).
- **Out of Scope for Phase 1**: Commercial banking payment gateway and legal lease disputes.

---

### Slide 5: 3. Literature Survey (L S)
- **Traditional Portals** *(MagicBricks, 99acres)*: Large catalog of properties, but zero roommate matching; treats shared living as commercial real estate.
- **Social Media Groups** *(Facebook, WhatsApp)*: Free community postings, but unstructured data, heavy spam, zero verification, no privacy.
- **Basic Flatmate Apps** *(Flatmate.in, Roomster)*: Filter by city and budget, but superficial matching (only age/budget); no lifestyle algorithms or itemized utility breakdown.
- **Academic Research** *(Ricci et al., RecSys)*: Proves vector similarity algorithms work, but rarely implemented in a practical, user-friendly student rental workflow.

---

### Slide 6: 4. Research Gap
- **Gap 1: Absence of Lifestyle Compatibility**: Existing apps match purely on budget and city, ignoring sleep cycles, study habits, and cleanliness.
- **Gap 2: No Resident-In-Place Discovery**: Existing platforms only list vacant flats, lacking an option to move in with someone who is **already living there**.
- **Gap 3: Hidden Expense Surprises**: Listed rents frequently omit maintenance, electricity, maid, and cook fees.
- **Gap 4: Arbitrary Rent Splitting**: Roommates dispute over rent when one gets a master bedroom with an attached bathroom while the other gets a smaller room.
- **Our Contribution**: We bridge all 4 gaps with vector matching, resident-replacement listings, transparent cost cards, and an automated fair rent calculator.

---

### Slide 7: 5. Problem Statement
> *"To design and develop a web-based rental discovery and roommate compatibility platform that matches tenants based on multi-dimensional lifestyle habits, enables manual area discovery, and provides transparent, mathematically fair rent and utility cost splitting in Indian Rupees (₹)."*

#### Key Challenges Addressed:
1. Eliminating high broker commission fees for students.
2. Preventing roommate conflicts through psychological and habit alignment.
3. Guaranteeing 100% upfront pricing transparency before signing a lease.

---

### Slide 8: 6. Objectives
1. **Frictionless Onboarding**: Implement phone-based authentication with quick 4-digit OTP verification.
2. **Multi-Vector Compatibility Engine**: Calculate mutual match percentage using normalized cosine vector similarity across lifestyle habits.
3. **Dual Accommodation Discovery**:
   - Module A: Independent Rooms & Student PGs.
   - Module B: Shared PGs with existing flatmates.
4. **Manual Location & Maps Connectivity**: Enable manual text entry for any area with instant 1-click Google Maps integration.
5. **Fair Utility Splitter**: Automate mathematically fair rent distribution based on room dimensions and attached bathroom amenities.

---

### Slide 9: 7. Methodology
- **Step 1: User Profile & Survey**: User enters personal info and rates habits on a 1–5 scale (Sleep, Cleanliness, Study, Diet).
- **Step 2: Vector Representation**: Numerical vector representation of habits: V = [x1, x2, x3, x4].
- **Step 3: Cosine Similarity Matching**: Compute alignment score: Similarity(A, B) = (A · B) / (||A|| * ||B||), converted to a 0–100% match badge.
- **Step 4: Manual Location & Dual Search**: Search by typed neighborhood and review verified PGs or resident profiles.
- **Step 5: Rent & Utility Breakdown**: Display itemized expenses and apply room-dimension formula for fair cost-sharing.

---

### Slide 10: 8. System Requirements
#### Software Requirements:
- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Vite
- **Backend API**: Python 3.11+, FastAPI (REST Architecture)
- **Database**: SQLite / PostgreSQL with SQLAlchemy ORM
- **Algorithms**: NumPy, SciPy (Cosine Vector Similarity)
- **External Tools**: Google Maps URL Scheme, Git & GitHub

#### Hardware Requirements:
- **Processor**: Intel Core i3 / AMD Ryzen 3 or higher
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 10 GB available disk space
- **Supported Devices**: Responsive across Laptops, Desktops, Tablets, and Smartphones

---

### Slide 11: 9. Proposed Outcome
- **Functional Web Application**: Intuitive, responsive web app featuring high-contrast clean design (all prices in ₹).
- **Intelligent Match Indicator**: Instant compatibility score displayed on every flatmate profile.
- **Dual Exploration**: Seamlessly toggle between independent PGs and flatmate replacement opportunities.
- **Zero-Dispute Utility Splitter**: Fair rent distribution tool resolving flatmate disagreements over master bedrooms.
- **Phase 1 Status (20% Milestone Achieved)**: Complete frontend architecture, navigation, mock dataset, OTP onboarding, manual location search, and Google Maps linking.

---

### Slide 12: 10. Conclusion & Bibliography
#### 🎯 Conclusion:
- Successfully conceptualized and prototyped a smart, student-focused rental and flatmate matching system.
- Combines housing discovery with psychological compatibility to ensure peaceful, long-term co-living.
- Eliminates broker fees and provides transparent pricing in Indian Rupees (₹).
- **Next Steps (Phase 2)**: Real-time chat, owner KYC verification, and dynamic database persistence.

#### 📚 Bibliography:
1. **Ricci, F., Rokach, L., & Shapira, B.** (2015). *Introduction to Recommender Systems Handbook*. Springer.
2. **Resnick, P., & Varian, H. R.** (1997). *Recommender Systems*. Communications of the ACM, 40(3), 56–58.
3. **FastAPI Documentation** (2024). *High-Performance Asynchronous Python Web APIs*.
4. **React Documentation** (2024). *Component-Based User Interfaces & Modern Web Standards*.
