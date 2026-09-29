# SmartRent & Match — Smart Rental & Roommate Compatibility Platform

An intelligent housing and roommate compatibility platform that combines verified rental discovery with an algorithmic compatibility engine. It helps students and young professionals find compatible flatmates and divide shared living expenses fairly.

---

## 🌟 Key Features

### 1. Algorithmic Roommate Compatibility Engine
- **Multi-Attribute Weighted Scoring**: Computes a transparent 0–100% composite compatibility index across 6 behavioral dimensions:
  - **Cleanliness Standard** (Weight: 28% — Statistically #1 cause of roommate friction)
  - **Sleep Schedule & Circadian Rhythm** (Weight: 22%)
  - **Noise Tolerance & Study Atmosphere** (Weight: 18%)
  - **Social Habits & Privacy Boundaries** (Weight: 16%)
  - **Overnight Guest Frequency** (Weight: 16%)
- **Non-Linear Penalty Model**: Uses quadratic decay \(1 - (\Delta / \Delta_{max})^{1.35}\) to penalize severe differences more sharply than minor preferences.
- **Categorical & Dealbreaker Safeguards**:
  - Smoking mismatches (Non-smoker vs. Smoker penalty: -15%).
  - Pet allergy conflicts (Allergic vs. Has pets penalty: -20%).
  - Shared dietary preferences bonus (+4%).
  - Budget overlap evaluation with sliding scale calculation.
- **Dynamic Radar Chart**: Live visual 6-axis polygon overlay comparing user and candidate.
- **Explainable AI Insights**: Lists actionable synergies (e.g., *"Both value high cleanliness and organized living spaces"*) and potential friction points.

### 2. Verified Rental Listings Explorer
- Filter by maximum rent, bedrooms, neighborhood, furnishing type, and utilities inclusion.
- Full details modal with photo galleries, house rules, amenity badges, and landlord verification.
- User/Host listing creation modal.

### 3. Fair Rent & Utility Splitter
- Solves the common roommate dispute: *"Who pays what for the master bedroom?"*
- Partitioning logic:
  - **Common Area Pool** (default 25%) divided equally among all roommates.
  - **Private Room Pool** (remaining 75%) distributed proportionally by room square footage.
  - **Amenity Surcharges**: Ensuite Private Bathroom (+12%), Private Balcony (+6%), Walk-in Closet (+4%).
  - **Zero-Sum Normalization**: Reconciled down to the cent so the individual totals strictly equal the total lease rent.
  - **Utilities Share**: Divided equally among all occupants.
  - Copyable plain-text flatmate summary.

### 4. Interactive Compatibility Quiz
- Live 10-question questionnaire with interactive sliders and visual choices.
- Immediate recalculation: Updating the quiz recalibrates match scores and radar diagrams across all flatmate candidates in real-time.

### 5. Multi-User Persona Switcher
- Instant demo persona switching in the top navigation bar (Alex Chen, Jordan Taylor, Maya Patel, Liam Davies, Sophia Rodriguez, Ethan Brooks).
- Demonstrates how compatibility scores dynamically shift depending on which user is logged in.

---

## 🏗️ Architecture & Tech Stack

```
c:\miniproject
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI entrypoint, CORS, lifespan
│   │   ├── database.py         # SQLite connection & session
│   │   ├── models.py           # SQLAlchemy User, LifestyleProfile, PropertyListing, MatchRequest
│   │   ├── schemas.py          # Pydantic v2 validation models
│   │   ├── compatibility.py    # Multi-attribute compatibility engine
│   │   ├── seed.py             # Prepopulated demo users, profiles, and properties
│   │   └── routes/
│   │       ├── auth.py         # Users & lifestyle profile updates
│   │       ├── roommates.py    # Ranked compatibility matching & comparison
│   │       ├── listings.py     # Property directory & search filters
│   │       └── interactions.py # Connection requests & fair rent split
│   ├── tests/
│   │   ├── test_compatibility.py
│   │   └── test_api.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, RoommateCard, PropertyCard, CompatibilityRadar, Modals
│   │   ├── pages/              # HomePage, FindRoommatesPage, ListingsPage, QuizPage, RentSplitterPage
│   │   ├── api.js              # Centralized backend API client
│   │   ├── App.jsx             # State orchestration
│   │   ├── index.css           # Tailwind CSS
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.ts
├── run.bat                     # Windows one-click launcher
├── run_dev.ps1                 # PowerShell launcher
└── README.md
```

- **Backend**: Python 3.13, FastAPI, SQLAlchemy 2.0, Pydantic v2, NumPy, Uvicorn, Pytest.
- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti.
- **Database**: SQLite (zero-configuration, pre-seeded on startup).

---

## 🚀 How to Run

### Method 1: One-Click Windows Launcher
Double-click `run.bat` or run:
```powershell
.\run.bat
```
This automatically starts both the FastAPI backend and the Vite frontend in dedicated terminal windows.

### Method 2: Manual Start
1. **Start Backend**:
   ```powershell
   cd c:\miniproject
   .\venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
   - API Docs will be available at: http://127.0.0.1:8000/docs

2. **Start Frontend**:
   ```powershell
   cd c:\miniproject\frontend
   npm run dev
   ```
   - Application will be available at: http://localhost:5173

---

## 🧪 Running Automated Tests

Run backend unit and integration tests:
```powershell
cd c:\miniproject\backend
..\venv\Scripts\python.exe -m pytest tests
```
*All 7 tests verify compatibility math, edge cases, dealbreakers, API responses, and fair rent calculation.*
