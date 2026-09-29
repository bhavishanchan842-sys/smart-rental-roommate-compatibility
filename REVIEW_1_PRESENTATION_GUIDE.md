# 🎓 SmartRent & Match — Milestone 1 (30% Evaluation Guide)

This guide is prepared specifically for your **30% Project Progress Review** with your guide/faculty ("Mam"). It outlines exactly what has been completed, how to present the interactive frontend, and what to say during the demo.

---

## 📌 Executive Summary for Faculty

- **Project Title**: *Smart Rental & Roommate Compatibility Platform (SmartRent & Match)*
- **Domain**: Web Technologies, Applied Algorithms & Decision Support Systems
- **Current Milestone**: **30% Completion** (UI/UX Architecture, Interactive Frontend Prototype, Component Design, and Algorithmic Wireframes)
- **Tech Stack Used**: React 19, Vite, Tailwind CSS v4, Lucide Icons, Canvas Confetti (with FastAPI + SQLite backend ready for Milestone 2)

---

## 🎯 What to Demonstrate for the 30% Review

Your faculty will look for:
1. A clear, well-scoped problem statement.
2. A working, professional user interface (not just static slides).
3. The core algorithmic concept visually represented (the Compatibility Radar).
4. Realistic data and complete user flows.

### 🌟 6 Key Interactive Features to Show:

| Feature | Where to Click in UI | What to Highlight to Faculty |
| :--- | :--- | :--- |
| **1. Dynamic Persona Switcher** | Top right dropdown (`Alex Chen`, `Jordan Taylor`, etc.) | Show that switching profiles dynamically recalculates roommate match percentages on the fly! |
| **2. Roommate Compatibility Radar** | Roommate Match tab ➔ Click *"View Radar & Insights"* | Point out the 6-axis polygon chart (Cleanliness, Sleep, Noise, Social, Guests, Budget) comparing two lifestyles visually. |
| **3. Synergy & Friction Engine** | Inside the Radar Modal | Show the transparent explanations: *"Both value high cleanliness"* or *"Contrasting sleep schedules (Early bird vs Night owl)"*. |
| **4. Verified Rental Directory** | *"Find Rentals"* tab | Demonstrate searching by neighborhood, budget sliders, photo galleries, and house rules. |
| **5. Fair Rent & Utility Splitter** | *"Rent Splitter"* tab | Demonstrate mathematical fairness: how the tool divides rent by square footage, private bathrooms (+12%), and balconies (+6%) with zero-sum penny balance. |
| **6. Lifestyle Calibration Quiz** | *"Compatibility Quiz"* tab | Adjust a slider (e.g. change Cleanliness from Spotless to Casual) ➔ Click *"Save & Recalculate"* ➔ Show confetti and updated scores! |

---

## 🗣️ Step-by-Step Presentation Script (What to Say)

### Step 1: Introduction (30 Seconds)
> *"Good morning / afternoon Mam. For our mini-project, we are building **SmartRent & Match**, an intelligent platform that pairs rental property discovery with an algorithmic roommate compatibility engine.*
>
> *Existing rental portals like MagicBricks, 99acres, or Zillow only list properties—they ignore roommate compatibility. Statistically, the primary reason roommates experience conflict and break leases isn't the apartment itself, but mismatched sleep cycles, differing chore standards, and disputes over rent division.*
>
> *For our 30% milestone, we have completed the **entire interactive frontend architecture, UI/UX components, lifestyle assessment quiz, and the algorithmic visualization system**."*

### Step 2: Live Prototype Walkthrough (2 Minutes)

1. **Show the Roommate Feed**:
   > *"Here on the Roommate Match page, every profile is scored against the currently logged-in user. For example, Alex Chen is an early riser and neat freak. Notice how Maya Patel, who shares a quiet morning routine, is ranked at the top with a 93% match, while Ethan Brooks, a late-night gamer, scores lower."*

2. **Open the Compatibility Radar Modal**:
   > *"If we click 'View Radar & Insights', our custom SVG Radar Chart plots both users across 6 key dimensions: Cleanliness, Sleep Sync, Noise Tolerance, Social Energy, Guest Policy, and Budget Fit. Below it, our algorithm provides transparent explanations of synergies and potential friction points."*

3. **Demonstrate the Lifestyle Quiz**:
   > *"If a user's habits change, they can take our 10-point Compatibility Quiz. When they adjust their sliders and save, the platform instantly recalibrates compatibility scores across all candidates."*

4. **Show the Fair Rent Splitter**:
   > *"Finally, we built a Fair Rent Splitter tool. When multiple roommates rent a 2BHK or 3BHK, dividing rent equally is unfair if one person has a master suite with a private bath. Our tool partitions rent into a common living pool and private bedroom pool, weighting room square footage and private perks mathematically."*

### Step 3: Roadmap for Remaining 70% (30 Seconds)
> *"For our next milestone (60% Review), we will focus on backend database persistence, user authentication, and enhancing the compatibility engine with advanced vector similarity. The final 100% milestone will cover live deployment, security hardening, and performance testing."*

---

## 💻 How to Run the Frontend for the Presentation

You have two easy ways to launch the app:

### Option A: Standalone Frontend Mode (Recommended for Class/Viva)
Runs directly without requiring the backend server to be open:
```powershell
cd c:\miniproject\frontend
npm run dev
```
Open your browser at: **`http://localhost:5173`**
*(All mock data, live calculations, radar charts, and quiz updates work 100% smoothly offline!)*

### Option B: Full-Stack Mode (Backend + Frontend)
Double-click `run.bat` in `c:\miniproject` or run:
```powershell
.\run.bat
```
- Frontend: `http://localhost:5173`
- Backend API Docs: `http://127.0.0.1:8000/docs`
