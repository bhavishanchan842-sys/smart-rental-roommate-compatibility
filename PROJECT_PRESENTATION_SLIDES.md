# Smart Rental & Roommate Compatibility Platform
## Project Presentation Slides (Phase 1 / 20% Evaluation)

> **Key Rule**: Simple, natural, and easy to explain by reading just once.  
> **PowerPoint File**: `SmartRent_Presentation.pptx` (Saved on Desktop & in Project Folder).

---

### Slide 1: Title Slide
- **Title**: SMART RENTAL & ROOMMATE COMPATIBILITY PLATFORM
- **Subtitle**: Find the Right PG and the Right Roommate Without Brokers
- **Evaluation**: Mini-Project Phase 1 (20% Evaluation)
- **Domain**: Web Technologies & Applied Machine Learning

---

### Slide 2: 1. Abstract
- **What is this project?**: A simple website that helps students and interns find verified PGs and compatible flatmates in one place.
- **Roommate Matching**: Matches people based on everyday habits like sleep schedule, cleanliness, and food preferences so roommates don't fight.
- **Two Ways to Search**: Users can search independent Boys/Girls PGs OR search a shared room where someone is already living.
- **Fair Rent Calculator**: Automatically calculates fair rent for each person based on bedroom size and attached bathroom.
- **Main Benefit**: 100% transparent costs in Rupees (₹) and zero broker commissions.

> 🗣️ **One-Line Explanation for Mam**:  
> *"Good morning Ma'am. Our project helps students easily find verified PGs and compatible flatmates, so they don't fight over daily habits or pay heavy broker charges."*

---

### Slide 3: 2. Introduction: Background & Motivation

#### 📌 Background
- Students and young workers move to big cities like Bangalore for college and jobs.
- Individual apartments are too expensive, so sharing a 2BHK/3BHK flat or PG is necessary.
- Existing property portals only list buildings, but tell you nothing about the people you will live with.

#### 🎯 Motivation
- Living with an incompatible roommate (late sleepers vs early risers) causes daily arguments and stress.
- Brokers take heavy non-refundable fees from students without verifying room conditions.
- We wanted to build an easy tool where students can verify their roommate's habits before moving in.

> 🗣️ **One-Line Explanation for Mam**:  
> *"Students have to share flats to save money, but living with the wrong person ruins their peace of mind. We solve this by testing habit compatibility upfront."*

---

### Slide 4: 2. Introduction: Scope
- **Target Users**: College students, interns, and young working professionals looking for shared housing.
- **Manual Location Search**: Users can type any neighborhood, landmark, or college name manually to find rooms nearby.
- **Google Maps Connectivity**: A 1-click button to open the location directly in Google Maps for easy navigation.
- **Transparent Expenses**: Shows exact breakdown of Room Rent, Food, Maid, and WiFi separately in Rupees (₹).
- **What is Out of Scope?**: Online rent payments and legal dispute handling are kept out of Phase 1 to keep the system simple and focused.

---

### Slide 5: 3. Literature Survey (L S)
- **1. Property Websites (MagicBricks, 99acres)**: Great for buying flats, but completely ignore roommate matching and student budgets.
- **2. Social Media (Facebook & WhatsApp Groups)**: Free to post, but full of spam, fake brokers, unverified listings, and no privacy.
- **3. Basic Flatmate Apps (Flatmate.in)**: Only filters by age and city; does not match daily living habits or provide utility splitters.
- **4. Our Advantage**: Combines verified PG listings + lifestyle compatibility quiz + transparent rent breakdown in one simple platform.

---

### Slide 6: 4. Research Gap
- **Gap 1: No Lifestyle Matching**: Existing websites match only by budget and city. They ignore sleep routines, cleanliness, and diet.
- **Gap 2: No Resident-In-Place Search**: Most apps only show empty rooms. They don't help you join someone who is ALREADY living there.
- **Gap 3: Hidden Costs**: Advertised rent often excludes food, maid, electricity, and maintenance fees, surprising students later.
- **Gap 4: Unfair Rent Splitting**: When one roommate gets a bigger room with an attached bath, there is no tool to calculate fair rent shares.

---

### Slide 7: 5. Problem Statement
> *"Students and young professionals struggle to find affordable PGs, often end up living with incompatible roommates due to a lack of habit verification, and face unexpected hidden costs and high broker fees."*

#### How Our Project Solves It:
1. Provides habit-based roommate compatibility scoring before moving in.
2. Allows manual location search with direct Google Maps route viewing.
3. Displays 100% itemized rent breakdown and fair rent splitting in Rupees (₹).

---

### Slide 8: 6. Objectives
1. **Easy Login**: Fast mobile number login with a simple 4-digit OTP.
2. **Habit Compatibility Match**: Compare two roommates on sleep, cleanliness, and diet to show a clear Match % score.
3. **Dual Search Mode**: Search independent PGs OR search shared rooms with an existing flatmate.
4. **Manual Location Search**: Let users type any area or college manually and connect directly with Google Maps.
5. **Fair Rent Splitter**: Automatically split 2BHK/3BHK rent fairly based on room size and attached bathrooms.

---

### Slide 9: 7. Methodology (How it works in 5 simple steps)
- **Step 1: Quick Onboarding**: User enters phone number, verifies OTP, and enters their name, college, and budget.
- **Step 2: Habit Preferences**: User rates simple daily habits (Sleep time, Cleanliness level, Diet) on a 1–5 scale.
- **Step 3: Compatibility Matching**: The system compares habit scores and displays a clear match score (e.g. 92% Match).
- **Step 4: Manual Location Search**: User types their preferred locality; the website filters matching PGs and opens Google Maps.
- **Step 5: Rent Details & Splitter**: User sees full cost breakdown (Rent, Food, Maid, WiFi) and can use the Fair Rent Splitter.

---

### Slide 10: 8. System Requirements

#### 💻 Software Requirements
- **Frontend**: React 18 & Tailwind CSS (Clean, responsive website)
- **Backend**: Python 3.11 & FastAPI (Fast server)
- **Database**: SQLite / PostgreSQL (Stores user profiles and PG data)
- **External Tool**: Google Maps URL Scheme for directions

#### ⚙️ Hardware Requirements
- **Processor**: Intel Core i3 / AMD Ryzen 3 or higher
- **RAM**: 4 GB minimum (8 GB recommended)
- **Storage**: 10 GB free hard disk space
- **Devices**: Runs smoothly on any Laptop, PC, Tablet, or Smartphone

---

### Slide 11: 9. Proposed Outcome
- **Working Web Application**: A responsive, modern website where students can browse PGs and shared flats in ₹.
- **Compatibility Match Badge**: Shows a clear match score (e.g. 92% Match) on prospective flatmates.
- **Zero Broker Fees**: Students connect directly with verified PG wardens and flatmates, saving money.
- **Fair Rent Calculator**: Solves rent disputes by mathematically calculating rent shares for unequal rooms.
- **Current Status (20% Milestone)**: Frontend pages, demo OTP, manual location search, and rent breakdown modals are completed and working.

---

### Slide 12: 10. Conclusion & Bibliography

#### 🎯 Conclusion
- Smart Rental & Roommate Compatibility solves a real everyday problem for college students.
- Helps students find safe rooms and peaceful roommates while eliminating broker commissions.
- Guarantees 100% transparent pricing in Indian Rupees (₹).
- **Future Enhancements**: In-app chat, landlord verification, and digital rental agreements.

#### 📚 Bibliography
1. **Recommender Systems Handbook** – Principles of matching and similarity.
2. **Resnick & Varian** – Introduction to Recommender Systems.
3. **FastAPI Documentation** – Modern, fast web APIs for Python.
4. **React Documentation** – Building user interfaces.
