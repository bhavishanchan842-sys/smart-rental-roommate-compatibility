import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, User, Phone, Check, ArrowRight, Sun, Moon, Sparkle, AlertTriangle } from 'lucide-react';
import { calculateResidentCompatibility } from '../mockData';
import confetti from 'canvas-confetti';

export default function SharedPGDetailModal({ pg, currentUser, onClose }) {
  if (!pg) return null;

  const resident = pg.resident;
  const userProfile = currentUser?.lifestyle_profile || {
    sleep_schedule: 2,
    cleanliness: 4,
    noise_tolerance: 2,
    social_habits: 3,
    guest_frequency: 2,
    dietary_pref: "Vegetarian",
    smoking: "Non-smoker"
  };

  // Local interactive quiz adjustment state
  const [activeTab, setActiveTab] = useState('rent_share'); // 'rent_share' or 'compatibility_quiz'
  const [quizState, setQuizState] = useState({ ...userProfile });
  const [requestSent, setRequestSent] = useState(false);

  // Compute live compatibility between current user and resident
  const compatibility = calculateResidentCompatibility(quizState, resident.lifestyle_profile);

  const handleSendRequest = () => {
    setRequestSent(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Banner (Vibrant Indigo Gradient, not black) */}
        <div className="p-5 px-6 bg-gradient-to-r from-indigo-700 via-indigo-800 to-violet-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={resident.avatar}
                alt={resident.full_name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-400"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" title="Active Resident" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">{resident.full_name}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 text-slate-200">
                  Current Flatmate ({resident.age} yrs)
                </span>
              </div>
              <p className="text-xs text-indigo-200">{resident.occupation}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{compatibility.score}% Match</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher: 1. Total Rent & Share Details, 2. Roommate Compatibility Quiz */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('rent_share')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'rent_share'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            💰 1. Total Rent & Share Details
          </button>
          <button
            onClick={() => setActiveTab('compatibility_quiz')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'compatibility_quiz'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Roommate Compatibility Quiz ({compatibility.score}%)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto space-y-6">

          {/* TAB 1: TOTAL RENT & SHARE DETAILS */}
          {activeTab === 'rent_share' && (
            <div className="space-y-5">
              
              {/* Flat Overview */}
              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">{pg.property_type}</span>
                <h2 className="text-lg font-bold text-slate-900">{pg.title}</h2>
                <p className="text-xs text-slate-500">{pg.address}, {pg.neighborhood}, {pg.city}</p>
              </div>

              {/* Big High-Level Numbers */}
              <div className="grid grid-cols-2 gap-4 bg-gradient-to-br from-indigo-50 to-violet-50 p-4 rounded-2xl border border-indigo-100">
                <div className="bg-white p-3.5 rounded-xl border border-indigo-100 shadow-2xs">
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Flat Rent</p>
                  <p className="text-xl font-extrabold text-slate-900 mt-0.5">₹{pg.total_flat_rent}<span className="text-xs font-normal text-slate-500">/mo</span></p>
                  <p className="text-[10px] text-slate-400 mt-1">Split between 2 flatmates</p>
                </div>

                <div className="bg-indigo-600 p-3.5 rounded-xl text-white shadow-md shadow-indigo-200">
                  <p className="text-[11px] font-semibold text-indigo-100 uppercase tracking-wider">Your Monthly Share</p>
                  <p className="text-xl font-black mt-0.5">₹{pg.your_share}<span className="text-xs font-normal text-indigo-200">/mo</span></p>
                  <p className="text-[10px] text-indigo-100 mt-1">Deposit Share: ₹{pg.deposit_share}</p>
                </div>
              </div>

              {/* Itemized Share Breakdown */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Transparent Monthly Expense Share Breakdown
                  </h4>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-600 font-medium">Base Room Rent (Your 50% Share)</span>
                    <span className="font-bold text-slate-900">₹{pg.cost_breakdown.room_rent}</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-600 font-medium">Cook & Groceries / Mess Food Share</span>
                    <span className="font-bold text-slate-900">₹{pg.cost_breakdown.cook_and_food}</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-600 font-medium">Housekeeping Maid & Cleaning</span>
                    <span className="font-bold text-slate-900">₹{pg.cost_breakdown.maid_and_cleaning}</span>
                  </div>
                  <div className="flex items-center justify-between p-3">
                    <span className="text-slate-600 font-medium">WiFi (200 Mbps) & Shared Electricity</span>
                    <span className="font-bold text-slate-900">₹{pg.cost_breakdown.wifi_and_electricity}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 font-bold text-indigo-700">
                    <span>Estimated Total All-Inclusive Per Month</span>
                    <span>₹{pg.total_monthly_expense}</span>
                  </div>
                </div>
              </div>

              {/* Resident Bio & Vibe */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Meet Your Potential Flatmate: {resident.full_name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{resident.bio}"
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                    {resident.lifestyle_profile.dietary_pref}
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                    {resident.lifestyle_profile.smoking}
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                    Cleanliness: {resident.lifestyle_profile.cleanliness}/5
                  </span>
                </div>
              </div>

            </div>
          )}


          {/* TAB 2: ROOMMATE COMPATIBILITY QUIZ */}
          {activeTab === 'compatibility_quiz' && (
            <div className="space-y-6">
              
              {/* Score Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    Overall Lifestyle Compatibility: {compatibility.score}%
                  </h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Tested against {resident.full_name}'s habits and daily routine.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-700">{compatibility.score}%</span>
                </div>
              </div>

              {/* Synergies & Friction Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-emerald-800 flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Mutual Synergies
                  </p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {compatibility.strengths.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-amber-800 flex items-center gap-1 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Differences to Consider
                  </p>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {compatibility.frictions.map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Live Quiz Calibration Sliders */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Test Your Answers in Real-Time:
                </h4>

                {/* Question 1: Sleep */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>1. Your Sleep Schedule vs {resident.full_name?.split(' ')[0]} (Morning)</span>
                    <span className="text-indigo-600 font-bold">
                      {quizState.sleep_schedule <= 2 ? "Early Riser" : "Night Owl"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={quizState.sleep_schedule}
                    onChange={(e) => setQuizState({ ...quizState, sleep_schedule: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                {/* Question 2: Cleanliness */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>2. Cleanliness Standard vs {resident.full_name?.split(' ')[0]} ({resident.lifestyle_profile.cleanliness}/5)</span>
                    <span className="text-indigo-600 font-bold">{quizState.cleanliness} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={quizState.cleanliness}
                    onChange={(e) => setQuizState({ ...quizState, cleanliness: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>

                {/* Question 3: Food */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>3. Food & Diet Preference</span>
                    <span className="text-indigo-600 font-bold">{quizState.dietary_pref}</span>
                  </div>
                  <div className="flex gap-2">
                    {['Vegetarian', 'Non-Vegetarian', 'Flexible / Any'].map((diet) => (
                      <button
                        key={diet}
                        onClick={() => setQuizState({ ...quizState, dietary_pref: diet })}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                          quizState.dietary_pref === diet
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {diet}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Your Share</p>
            <p className="text-base font-black text-indigo-700">₹{pg.your_share}/mo</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Close
            </button>

            <button
              onClick={handleSendRequest}
              disabled={requestSent}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                requestSent
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
              }`}
            >
              {requestSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Request Sent to {resident.full_name?.split(' ')[0]}!</span>
                </>
              ) : (
                <>
                  <span>Request to Share Room</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
