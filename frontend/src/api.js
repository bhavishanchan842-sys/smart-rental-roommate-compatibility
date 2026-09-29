import { MOCK_USERS, MOCK_PROPERTIES, clientCalculateCompatibility } from './mockData';

const API_BASE = '/api';

// In-memory fallback stores for standalone frontend presentations
let localUsers = [...MOCK_USERS];
let localProperties = [...MOCK_PROPERTIES];
let localRequests = [
  {
    id: 1,
    sender_id: 1,
    receiver_id: 3,
    property_id: 1,
    status: "pending",
    message: "Hi Maya! I saw our compatibility score is 93%—we both keep a quiet, early schedule and maintain a clean kitchen. Would love to chat about sharing a 2BHK!",
    created_at: new Date().toISOString()
  }
];

export async function fetchUsers() {
  try {
    const res = await fetch(`${API_BASE}/auth/users`);
    if (res.ok) {
      const data = await res.json();
      localUsers = data;
      return data;
    }
  } catch (e) {
    console.warn("Backend API unavailable, using resilient frontend mock data:", e.message);
  }
  return localUsers;
}

export async function fetchUserById(userId) {
  try {
    const res = await fetch(`${API_BASE}/auth/user/${userId}`);
    if (res.ok) return await res.json();
  } catch (e) {
    // fallback
  }
  return localUsers.find(u => u.id === userId) || localUsers[0];
}

export async function updateLifestyleProfile(userId, data) {
  try {
    const res = await fetch(`${API_BASE}/auth/profile/${userId}/lifestyle`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      const updated = await res.json();
      const idx = localUsers.findIndex(u => u.id === userId);
      if (idx !== -1) localUsers[idx] = updated;
      return updated;
    }
  } catch (e) {
    console.warn("Updating profile via local fallback state");
  }

  // Local fallback update
  const user = localUsers.find(u => u.id === userId);
  if (user) {
    user.lifestyle_profile = { ...user.lifestyle_profile, ...data };
    return { ...user };
  }
  return null;
}

export async function fetchRoommateMatches(currentUserId, filters = {}) {
  try {
    const params = new URLSearchParams({ current_user_id: currentUserId });
    if (filters.minScore) params.append('min_score', filters.minScore);
    if (filters.gender && filters.gender !== 'All') params.append('gender', filters.gender);
    if (filters.workSchedule && filters.workSchedule !== 'All') params.append('work_schedule', filters.workSchedule);
    if (filters.petFriendly && filters.petFriendly !== 'All') params.append('pet_friendly', filters.petFriendly);

    const res = await fetch(`${API_BASE}/roommates?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Calculating matches client-side via fallback algorithm");
  }

  // Client-side fallback calculation
  const currentUser = localUsers.find(u => u.id === currentUserId) || localUsers[0];
  const candidates = localUsers.filter(u => u.id !== currentUserId && u.role !== 'landlord');

  const results = [];
  for (const candidate of candidates) {
    if (filters.gender && filters.gender !== 'All' && candidate.gender !== filters.gender) continue;
    if (filters.workSchedule && filters.workSchedule !== 'All' && candidate.lifestyle_profile?.work_schedule !== filters.workSchedule) continue;
    if (filters.petFriendly && filters.petFriendly !== 'All' && candidate.lifestyle_profile?.pet_friendly !== filters.petFriendly) continue;

    const comp = clientCalculateCompatibility(currentUser.lifestyle_profile, candidate.lifestyle_profile);
    if (filters.minScore && comp.overall_score < filters.minScore) continue;

    // Check request status
    let connectionStatus = null;
    const sent = localRequests.find(r => r.sender_id === currentUserId && r.receiver_id === candidate.id);
    const recv = localRequests.find(r => r.sender_id === candidate.id && r.receiver_id === currentUserId);
    if (sent) connectionStatus = `Sent: ${sent.status}`;
    else if (recv) connectionStatus = `Received: ${recv.status}`;

    results.push({
      user: candidate,
      compatibility_score: comp.overall_score,
      cleanliness_score: comp.cleanliness_score,
      sleep_score: comp.sleep_score,
      noise_score: comp.noise_score,
      social_score: comp.social_score,
      guest_score: comp.guest_score,
      budget_score: comp.budget_score,
      strengths: comp.strengths,
      frictions: comp.frictions,
      radar_data: comp.radar_data,
      connection_status: connectionStatus
    });
  }

  results.sort((a, b) => b.compatibility_score - a.compatibility_score);
  return results;
}

export async function fetchListings(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.neighborhood && filters.neighborhood !== 'All') params.append('neighborhood', filters.neighborhood);
    if (filters.maxRent) params.append('max_rent', filters.maxRent);
    if (filters.bedrooms && filters.bedrooms > 0) params.append('bedrooms', filters.bedrooms);
    if (filters.furnished && filters.furnished !== 'All') params.append('furnished', filters.furnished);

    const res = await fetch(`${API_BASE}/listings?${params.toString()}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Using local listings fallback");
  }

  return localProperties.filter(p => {
    if (filters.neighborhood && filters.neighborhood !== 'All' && !p.neighborhood.includes(filters.neighborhood)) return false;
    if (filters.maxRent && p.rent_monthly > filters.maxRent) return false;
    if (filters.bedrooms && filters.bedrooms > 0 && p.bedrooms !== filters.bedrooms) return false;
    if (filters.furnished && filters.furnished !== 'All' && p.furnished !== filters.furnished) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match = p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.neighborhood.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });
}

export async function createListing(listingData) {
  try {
    const res = await fetch(`${API_BASE}/listings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(listingData)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Saving listing to local fallback store");
  }

  const newListing = {
    ...listingData,
    id: localProperties.length + 1,
    created_at: new Date().toISOString()
  };
  localProperties.unshift(newListing);
  return newListing;
}

export async function sendConnectionRequest(senderId, receiverId, propertyId = null, message = '') {
  try {
    const res = await fetch(`${API_BASE}/interactions/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_id: senderId,
        receiver_id: receiverId,
        property_id: propertyId,
        message
      })
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Saving connection request to local fallback store");
  }

  const newReq = {
    id: localRequests.length + 1,
    sender_id: senderId,
    receiver_id: receiverId,
    property_id: propertyId,
    message: message || "Hi! I'd love to connect and share an apartment.",
    status: "pending",
    created_at: new Date().toISOString()
  };
  localRequests.push(newReq);
  return newReq;
}

export async function fetchUserRequests(userId) {
  try {
    const res = await fetch(`${API_BASE}/interactions/requests/${userId}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Fetching requests from local fallback store");
  }
  return localRequests.filter(r => r.sender_id === userId || r.receiver_id === userId);
}

export async function updateRequestStatus(requestId, status) {
  try {
    const res = await fetch(`${API_BASE}/interactions/requests/${requestId}/status?status=${status}`, {
      method: 'PUT'
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Updating request status in local fallback store");
  }

  const req = localRequests.find(r => r.id === requestId);
  if (req) {
    req.status = status;
    return req;
  }
  return null;
}

export async function calculateFairRentSplit(payload) {
  try {
    const res = await fetch(`${API_BASE}/interactions/fair-rent-split`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("Calculating rent split via client-side formula fallback");
  }

  // Client-side fallback calculation matching backend logic
  const totalRent = payload.total_rent;
  const utilities = payload.total_utilities || 0;
  const numRooms = payload.rooms.length;
  const totalSqft = payload.rooms.reduce((acc, r) => acc + r.size_sqft, 0);

  const commonRatio = (payload.common_area_weight_percent || 25) / 100.0;
  const commonPool = totalRent * commonRatio;
  const commonSharePerRoom = commonPool / numRooms;
  const privatePool = totalRent - commonPool;

  const rawPrivate = [];
  const surcharges = [];

  for (const r of payload.rooms) {
    const baseShare = (r.size_sqft / totalSqft) * privatePool;
    let sur = 0;
    if (r.has_private_bath) sur += baseShare * 0.12;
    if (r.has_balcony) sur += baseShare * 0.06;
    if (r.has_walk_in_closet) sur += baseShare * 0.04;
    rawPrivate.push(baseShare + sur);
    surcharges.push(sur);
  }

  const sumRaw = rawPrivate.reduce((a, b) => a + b, 0);
  const scale = sumRaw > 0 ? privatePool / sumRaw : 1.0;
  const utilPerPerson = utilities / numRooms;

  const roomResults = payload.rooms.map((room, i) => {
    const finalPrivate = rawPrivate[i] * scale;
    const finalRent = Math.round((commonSharePerRoom + finalPrivate) * 100) / 100;
    const totalMonthly = Math.round((finalRent + utilPerPerson) * 100) / 100;
    const pct = Math.round((finalRent / totalRent) * 1000) / 10;

    const perks = [];
    if (room.has_private_bath) perks.push("Private Bath (+12%)");
    if (room.has_balcony) perks.push("Balcony (+6%)");
    if (room.has_walk_in_closet) perks.push("Walk-in Closet (+4%)");

    return {
      room_name: room.room_name,
      occupant_name: room.occupant_name || `Roommate ${i + 1}`,
      calculated_rent: finalRent,
      utility_share: Math.round(utilPerPerson * 100) / 100,
      total_monthly: totalMonthly,
      percentage_of_rent: pct,
      amenity_surcharge: Math.round(surcharges[i] * 100) / 100,
      formula_explanation: `${room.size_sqft} sqft (${Math.round((room.size_sqft / totalSqft) * 100)}% private area)${perks.length ? ' with ' + perks.join(', ') : ''}. Equal common pool: $${Math.round(commonSharePerRoom)}.`
    };
  });

  return {
    total_rent: totalRent,
    total_utilities: utilities,
    rooms: roomResults,
    common_area_share_per_person: Math.round(commonSharePerRoom * 100) / 100,
    summary: `Fair division for ${numRooms} rooms across ${totalSqft} sqft.`
  };
}
