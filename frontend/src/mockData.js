// Comprehensive mock data for Rooms, PGs, and Shared PGs with Existing Roommates

export const INITIAL_USER = {
  id: 1,
  phone: "+91 98765 43210",
  full_name: "Rahul Sharma",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  gender: "Male",
  age: 21,
  occupation: "Computer Science Student",
  college: "Tech Institute of Engineering",
  city: "Bangalore",
  area: "Koramangala",
  budget_max: 9500,
  lifestyle_profile: {
    sleep_schedule: 2, // 1=Early Bird, 5=Night Owl
    cleanliness: 4,    // 1=Casual, 5=Spotless
    noise_tolerance: 2,// 1=Quiet, 5=Party
    social_habits: 3,  // 1=Private, 5=Social
    guest_frequency: 2,// 1=Rare, 5=Frequent
    dietary_pref: "Vegetarian",
    smoking: "Non-smoker",
    drinking: "Non-drinker"
  }
};

export const MOCK_USERS = [
  INITIAL_USER,
  {
    id: 2,
    email: "aditya.verma@example.com",
    full_name: "Aditya Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    gender: "Male",
    age: 23,
    occupation: "Software Engineer",
    phone: "+91 98450 12345",
    role: "tenant",
    lifestyle_profile: {
      sleep_schedule: 2,
      cleanliness: 4,
      noise_tolerance: 2,
      social_habits: 3,
      guest_frequency: 2,
      dietary_pref: "Vegetarian",
      smoking: "Non-smoker",
      drinking: "Socially",
      budget_min: 7000,
      budget_max: 12000
    }
  },
  {
    id: 3,
    email: "sneha.nair@example.com",
    full_name: "Sneha Nair",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    gender: "Female",
    age: 22,
    occupation: "Data Science Student",
    phone: "+91 97312 34567",
    role: "tenant",
    lifestyle_profile: {
      sleep_schedule: 1,
      cleanliness: 5,
      noise_tolerance: 1,
      social_habits: 2,
      guest_frequency: 1,
      dietary_pref: "Vegetarian",
      smoking: "Non-smoker",
      drinking: "Non-drinker",
      budget_min: 6000,
      budget_max: 10000
    }
  }
];

// 1. Independent Rooms & PGs
export const MOCK_ROOMS_AND_PGS = [
  {
    id: 101,
    title: "Stanza Living - Maple House (Premium Boys PG)",
    type: "Boys PG",
    address: "Near Christ University, Hosur Road",
    neighborhood: "Koramangala",
    city: "Bangalore",
    total_rent: 9000,
    deposit: 9000,
    occupancy_options: ["Single Room (₹14,000)", "Double Sharing (₹9,000)", "Triple Sharing (₹7,500)"],
    furnished: "Fully Furnished",
    food_included: true,
    meals_provided: "Breakfast, Lunch & Dinner included 7 days/week",
    amenities: ["High-Speed WiFi", "3 Meals Daily", "Daily Housekeeping", "Laundry Service", "AC & Geyser", "Biometric Security", "Gym Area"],
    house_rules: ["Gate closes at 11:30 PM", "No indoor smoking", "Visitors allowed in common lounge only"],
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
    ],
    contact_phone: "+91 91234 56780"
  },
  {
    id: 102,
    title: "Zolo Stays - Blossom Luxury Girls PG",
    type: "Girls PG",
    address: "14th Main, Sector 4, HSR Layout",
    neighborhood: "HSR Layout",
    city: "Bangalore",
    total_rent: 8500,
    deposit: 8500,
    occupancy_options: ["Double Sharing (₹8,500)", "Single Private Room (₹13,500)"],
    furnished: "Fully Furnished",
    food_included: true,
    meals_provided: "Homely North & South Indian meals (3 times/day)",
    amenities: ["CCTV & 24/7 Female Warden", "Free High-Speed WiFi", "RO Water Purifier", "Washing Machine", "Power Backup", "Attached Balcony"],
    house_rules: ["Girls PG only", "Curfew 10:30 PM", "Zero tolerance for alcohol/smoking"],
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    contact_phone: "+91 92345 67891"
  },
  {
    id: 103,
    title: "Independent Studio Room with Attached Kitchenette",
    type: "Private Studio Room",
    address: "5th Cross, Indiranagar 100ft Road",
    neighborhood: "Indiranagar",
    city: "Bangalore",
    total_rent: 14000,
    deposit: 25000,
    occupancy_options: ["Private Single / Couple Occupancy"],
    furnished: "Semi-Furnished",
    food_included: false,
    meals_provided: "Self-cooking permitted (modular kitchen available)",
    amenities: ["Private Balcony", "Air Conditioner", "Modular Kitchen with Gas connection", "Wardrobe & Bed", "2-Wheeler Parking"],
    house_rules: ["No loud music after 11 PM", "Pet friendly", "Clean hallway"],
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80"
    ],
    contact_phone: "+91 93456 78912"
  },
  {
    id: 104,
    title: "Urban Nest - Unisex Co-Living PG & Flats",
    type: "Co-Living PG",
    address: "Electronic City Phase 1, Near Infosys Gate",
    neighborhood: "Electronic City",
    city: "Bangalore",
    total_rent: 7500,
    deposit: 7500,
    occupancy_options: ["Double Sharing (₹7,500)", "Triple Sharing (₹6,000)"],
    furnished: "Fully Furnished",
    food_included: true,
    meals_provided: "Breakfast & Dinner included on weekdays, all meals on weekends",
    amenities: ["Coworking Space", "Gaming Lounge (PS5/TT)", "High-Speed WiFi", "Gymnasium", "Free Laundry", "24/7 Power Backup"],
    house_rules: ["Professional & student friendly", "No smoking in rooms"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80"
    ],
    contact_phone: "+91 94567 89123"
  }
];

export const MOCK_PROPERTIES = MOCK_ROOMS_AND_PGS.map(p => ({
  ...p,
  rent_monthly: p.total_rent,
  property_type: p.type,
  bedrooms: 2,
  bathrooms: 1,
  size_sqft: 650,
  utilities_included: p.food_included,
  estimated_utilities: p.food_included ? 0 : 500,
  available_from: "Immediate",
  host: {
    full_name: "Property Manager",
    phone: p.contact_phone,
    email: "manager@example.com"
  }
}));

// 2. Shared PG with the person ALREADY living there
export const MOCK_SHARED_PGS = [
  {
    id: 201,
    title: "Spacious 2BHK Room Share in Koramangala 4th Block",
    address: "17th Cross, Near Sony World Signal",
    neighborhood: "Koramangala",
    city: "Bangalore",
    property_type: "Private Room in Shared 2BHK",
    furnished: "Fully Furnished",
    available_from: "Immediate",
    
    total_flat_rent: 18000,
    your_share: 9000,
    deposit_share: 15000,
    cost_breakdown: {
      room_rent: 7800,
      cook_and_food: 3200,
      maid_and_cleaning: 600,
      wifi_and_electricity: 600
    },
    total_monthly_expense: 12200,

    amenities: ["Private Balcony", "Air Conditioning", "WiFi 200 Mbps", "Washing Machine", "Full Kitchen Setup", "Cook comes twice a day"],
    house_rules: ["Keep common living hall tidy", "Non-smoker preferred", "Friends can visit on weekends with heads up"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],

    resident: {
      id: 11,
      full_name: "Aditya Verma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      age: 23,
      gender: "Male",
      occupation: "Software Engineer at Startup",
      bio: "Living here for 1 year. My current flatmate moved to another city for work. I work hybrid (2 days WFH). Very chill, keep the kitchen clean, like watching football on weekends.",
      phone: "+91 98450 12345",
      lifestyle_profile: {
        sleep_schedule: 2,
        cleanliness: 4,
        noise_tolerance: 2,
        social_habits: 3,
        guest_frequency: 2,
        dietary_pref: "Vegetarian",
        smoking: "Non-smoker",
        drinking: "Socially"
      }
    }
  },
  {
    id: 202,
    title: "Master Bedroom with Attached Bath in HSR Layout",
    address: "Sector 2, Near 27th Main Road",
    neighborhood: "HSR Layout",
    city: "Bangalore",
    property_type: "Sharing Room in Luxury 3BHK",
    furnished: "Fully Furnished",
    available_from: "1st of Next Month",

    total_flat_rent: 26000,
    your_share: 8500,
    deposit_share: 18000,
    cost_breakdown: {
      room_rent: 7500,
      cook_and_food: 2800,
      maid_and_cleaning: 500,
      wifi_and_electricity: 500
    },
    total_monthly_expense: 11300,

    amenities: ["Attached Bathroom", "Geyser", "RO Water", "Gym in Apartment Complex", "Covered Bike Parking", "Full Power Backup"],
    house_rules: ["Quiet hours after 11 PM", "Kitchen cleaning rotation strictly followed", "No smoking inside rooms"],
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
    ],

    resident: {
      id: 12,
      full_name: "Sneha Nair",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      age: 22,
      gender: "Female",
      occupation: "Data Science Student & Intern",
      bio: "Final year student interning nearby. Looking for a female roommate to share the master room. I study quietly in the evenings, love filter coffee, and do yoga in the mornings.",
      phone: "+91 97312 34567",
      lifestyle_profile: {
        sleep_schedule: 1,
        cleanliness: 5,
        noise_tolerance: 1,
        social_habits: 2,
        guest_frequency: 1,
        dietary_pref: "Vegetarian",
        smoking: "Non-smoker",
        drinking: "Non-drinker"
      }
    }
  },
  {
    id: 203,
    title: "Vibrant Flat Share in Indiranagar near Metro",
    address: "Near Metro Station, 12th Main",
    neighborhood: "Indiranagar",
    city: "Bangalore",
    property_type: "Private Room in 2BHK",
    furnished: "Fully Furnished",
    available_from: "Immediate",

    total_flat_rent: 22000,
    your_share: 11000,
    deposit_share: 20000,
    cost_breakdown: {
      room_rent: 9800,
      cook_and_food: 3500,
      maid_and_cleaning: 700,
      wifi_and_electricity: 700
    },
    total_monthly_expense: 14700,

    amenities: ["Walk to Metro (3 mins)", "Fast WiFi", "Smart TV in Hall", "Washing Machine", "Terrace Access", "Balcony with sunset view"],
    house_rules: ["Social gatherings on weekends welcome", "Clean dishes after cooking", "Respect work hours"],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
    ],

    resident: {
      id: 13,
      full_name: "Karan Singhal",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      age: 24,
      gender: "Male",
      occupation: "UI/UX Designer",
      bio: "Working at a fintech design studio. Love gaming on weekends, music, and exploring cafes. Looking for an easygoing flatmate to share this prime 2BHK.",
      phone: "+91 99001 23456",
      lifestyle_profile: {
        sleep_schedule: 4,
        cleanliness: 3,
        noise_tolerance: 4,
        social_habits: 4,
        guest_frequency: 3,
        dietary_pref: "Non-Vegetarian",
        smoking: "Non-smoker",
        drinking: "Socially"
      }
    }
  }
];

// Helper to compute compatibility between user and resident
export function calculateResidentCompatibility(userProfile, residentProfile) {
  if (!userProfile || !residentProfile) return { score: 85, strengths: ["Good mutual alignment"], frictions: [], radar: [] };

  const cleanDiff = Math.abs(userProfile.cleanliness - residentProfile.cleanliness);
  const sleepDiff = Math.abs(userProfile.sleep_schedule - residentProfile.sleep_schedule);
  const noiseDiff = Math.abs(userProfile.noise_tolerance - residentProfile.noise_tolerance);
  const socialDiff = Math.abs(userProfile.social_habits - residentProfile.social_habits);
  const guestDiff = Math.abs(userProfile.guest_frequency - residentProfile.guest_frequency);

  const cleanSim = Math.max(0, 1 - Math.pow(cleanDiff / 4, 1.35));
  const sleepSim = Math.max(0, 1 - Math.pow(sleepDiff / 4, 1.35));
  const noiseSim = Math.max(0, 1 - Math.pow(noiseDiff / 4, 1.35));
  const socialSim = Math.max(0, 1 - Math.pow(socialDiff / 4, 1.35));
  const guestSim = Math.max(0, 1 - Math.pow(guestDiff / 4, 1.35));

  let base = (cleanSim * 0.28) + (sleepSim * 0.22) + (noiseSim * 0.18) + (socialSim * 0.16) + (guestSim * 0.16);
  let adj = 0;
  const strengths = [];
  const frictions = [];

  if (cleanDiff <= 1) {
    strengths.push(userProfile.cleanliness >= 4 ? "Both value high cleanliness and tidy common spaces" : "Similar relaxed chore standards");
  } else {
    frictions.push("Different standards regarding cleaning and chore frequency");
  }

  if (sleepDiff <= 1) {
    strengths.push("Compatible sleep routines and day/night schedules");
  } else {
    frictions.push("Contrasting sleep schedules (Early bird vs. Night owl)");
  }

  if (userProfile.smoking === residentProfile.smoking) {
    adj += 0.05;
    strengths.push(`Matching smoking preference (${userProfile.smoking})`);
  } else {
    adj -= 0.15;
    frictions.push("Smoking preference mismatch");
  }

  if (userProfile.dietary_pref === residentProfile.dietary_pref) {
    adj += 0.04;
    strengths.push(`Shared dietary preference (${userProfile.dietary_pref})`);
  }

  const score = Math.min(99, Math.max(30, Math.round(((base * 0.85) + adj + 0.1) * 100)));

  return {
    score,
    cleanliness_score: Math.round(cleanSim * 100),
    sleep_score: Math.round(sleepSim * 100),
    noise_score: Math.round(noiseSim * 100),
    social_score: Math.round(socialSim * 100),
    guest_score: Math.round(guestSim * 100),
    strengths: strengths.length ? strengths : ["Good general compatibility"],
    frictions: frictions.length ? frictions : ["No major lifestyle friction identified!"],
    radar: [
      { subject: "Cleanliness", user: userProfile.cleanliness * 20, resident: residentProfile.cleanliness * 20, match: Math.round(cleanSim * 100) },
      { subject: "Sleep Schedule", user: userProfile.sleep_schedule * 20, resident: residentProfile.sleep_schedule * 20, match: Math.round(sleepSim * 100) },
      { subject: "Noise Level", user: userProfile.noise_tolerance * 20, resident: residentProfile.noise_tolerance * 20, match: Math.round(noiseSim * 100) },
      { subject: "Social Habits", user: userProfile.social_habits * 20, resident: residentProfile.social_habits * 20, match: Math.round(socialSim * 100) },
      { subject: "Guest Policy", user: userProfile.guest_frequency * 20, resident: residentProfile.guest_frequency * 20, match: Math.round(guestSim * 100) }
    ]
  };
}

export function clientCalculateCompatibility(p1, p2) {
  return calculateResidentCompatibility(p1, p2);
}
