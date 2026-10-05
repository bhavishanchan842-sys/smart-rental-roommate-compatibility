# 🎯 20% PROJECT REVIEW — PPT SLIDES DECK

Copy and paste each slide content directly into Microsoft PowerPoint, Google Slides, or Canva:

---

## 📽️ SLIDE 1: Title Slide
- **Title**: Smart Rental & Roommate Compatibility Platform (SmartRent & Match)
- **Subtitle**: Phase 1 Evaluation (20% Progress Review)
- **Domain**: Web Technologies & Intelligent Decision Support Systems
- **Presented By**: [Your Name & Roll No]
- **Project Guide**: [Guide / Mam Name]
- **Department**: Computer Science & Engineering

---

## 📽️ SLIDE 2: Problem Statement & Motivation
- **The Core Problem**: Finding a PG or room is easy, but finding a compatible flatmate is difficult.
- **Key Insight**: Over 70% of flatmate disputes arise from **lifestyle clashes** (sleep schedules, cleanliness habits, dietary conflicts, guest policies).
- **Industry Gap**: Portals like MagicBricks and NoBroker only list physical buildings; they completely ignore behavioral roommate compatibility and shared expense transparency.

---

## 📽️ SLIDE 3: Objectives & Scope of Project
- **Primary Objectives**:
  1. Build a verified listing directory for independent Rooms and PGs (Boys, Girls, Co-living).
  2. Implement an intelligent **lifestyle compatibility engine** that pairs tenants based on behavioral synergy.
  3. Provide an **itemized rent & utility breakdown** (Rent + Food + Maid + Electricity/WiFi) so users know their exact monthly share before moving in.
- **Scope for 20% Review**: Complete frontend architecture, interactive user journey, onboarding, dual search pages, and working prototype.

---

## 📽️ SLIDE 4: System Architecture
- **Three-Tier Architecture**:
  - **Presentation Layer (Frontend)**: React 19, Vite, Tailwind CSS (Clean, high-contrast, accessible UI).
  - **Application Layer (Backend)**: Python FastAPI with asynchronous REST endpoints.
  - **Data Layer (Storage)**: Relational SQLite database with SQLAlchemy ORM.
- **Key Algorithms**:
  - Weighted Euclidean Lifestyle Compatibility Scoring.
  - Zero-Sum Fair Rent and Utility Partitioning.

---

## 📽️ SLIDE 5: Database Design & Key Entities
- **Users**: Phone, Name, Gender, Age, Occupation, College, Budget.
- **Lifestyle Profiles**: Cleanliness (1-5), Sleep Schedule, Diet, Guest Policy, Noise Tolerance.
- **PG Listings**: Title, PG Type (Boys/Girls/Co-Ed), Sharing (Private/Double/Triple), Total Rent, Amenities.
- **Shared Residents**: Existing tenant details, current rent, and individual share breakdown (Room, Food, Maid, Utilities).

---

## 📽️ SLIDE 6: Completed 20% Deliverables (Live Demo Flow)
- **Screen 1**: Mobile Phone Login with instant validation.
- **Screen 2**: Secure 4-digit OTP verification (Demo: `1234`).
- **Screen 3**: Comprehensive User Profile Onboarding (Demographics + Budget).
- **Screen 4**: "Search Rooms & PGs" — Filter by gender, meal availability, and sharing type.
- **Screen 5**: "Find Shared PG & Flatmates" — See existing residents and compatibility score.
- **Screen 6**: "Rent Breakdown & Quiz Modal" — Itemized monthly costs + interactive lifestyle quiz.

---

## 📽️ SLIDE 7: Live Demonstration
*(Switch to browser tab at http://localhost:5173)*
- Step 1: Input mobile number `9876543210` -> Click "Send OTP".
- Step 2: Enter OTP `1234` -> Click "Verify & Proceed".
- Step 3: Enter profile details -> Land on dashboard.
- Step 4: Show "Search Rooms/PGs" filters (Meal Included / Private / Double).
- Step 5: Switch to "Find Shared PG" -> Click on resident "Rahul Sharma".
- Step 6: Point out Total Flat Rent (₹22,000) vs. Your Share (₹11,000) + Food/Maid breakdown + Compatibility score!

---

## 📽️ SLIDE 8: Roadmap for Remaining Milestones
- **Phase 1 (20% - Current Milestone)**: Architecture, UI/UX prototype, user onboarding, discovery feeds, rent breakdown modal. **[COMPLETED]**
- **Phase 2 (50% Review)**: Full database integration, user session management, automated backend calculations.
- **Phase 3 (80% Review)**: Dynamic vector matching, messaging/connect requests between flatmates.
- **Phase 4 (100% Final Review)**: Cloud deployment, security hardening, user acceptance testing.

---

## 📽️ SLIDE 9: Conclusion & Faculty Q&A
- **Summary**: Delivered a fully functional, high-contrast, accessible frontend prototype that solves the dual problem of rental search and roommate friction.
- **Code Repository**: https://github.com/bhavishanchan842-sys/smart-rental-roommate-compatibility
- **Thank you! We are now open for questions.**
