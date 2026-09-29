import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Sparkle, Volume2, Users, Coffee, Check, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizPage({ currentUser, onSaveProfile, onNavigate }) {
  const profile = currentUser?.lifestyle_profile || {};

  const [formData, setFormData] = useState({
    sleep_schedule: profile.sleep_schedule ?? 3,
    cleanliness: profile.cleanliness ?? 4,
    noise_tolerance: profile.noise_tolerance ?? 2,
    social_habits: profile.social_habits ?? 3,
    guest_frequency: profile.guest_frequency ?? 2,
    work_schedule: profile.work_schedule ?? "Hybrid",
    dietary_pref: profile.dietary_pref ?? "Any",
    smoking: profile.smoking ?? "Non-smoker",
    drinking: profile.drinking ?? "Socially",
    pet_friendly: profile.pet_friendly ?? "Loves pets",
    budget_min: profile.budget_min ?? 600,
    budget_max: profile.budget_max ?? 1200,
    preferred_city: profile.preferred_city ?? "Metro City",
    preferred_areas: profile.preferred_areas ?? "University District, Tech Park",
    move_in_date: profile.move_in_date ?? "Immediate",
    hobbies: profile.hobbies ?? "Reading, Cooking, Gym"
  });

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (currentUser?.lifestyle_profile) {
      setFormData({
        ...currentUser.lifestyle_profile
      });
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSaveProfile(formData);
      setSaved(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setSaved(false);
        onNavigate('roommates');
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      {/* Quiz Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Lifestyle Compatibility Calibration</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Roommate Compatibility Quiz
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
          Tune your living habits, chore expectations, and schedule. Our matching engine will immediately recalibrate compatibility scores with prospective flatmates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        
        {/* Dimension 1: Sleep Schedule */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-900">1. Circadian Rhythm & Sleep Schedule</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
              {formData.sleep_schedule === 1 && "Early Bird (6:00 AM - 10:00 PM)"}
              {formData.sleep_schedule === 2 && "Morning-aligned (7:30 AM - 11:00 PM)"}
              {formData.sleep_schedule === 3 && "Balanced / Flexible (8:30 AM - Midnight)"}
              {formData.sleep_schedule === 4 && "Night Owl (10:00 AM - 1:30 AM)"}
              {formData.sleep_schedule === 5 && "Extreme Night Owl (12:00 PM - 3:00 AM)"}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formData.sleep_schedule}
              onChange={(e) => setFormData({ ...formData, sleep_schedule: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>🌅 Up before 7 AM</span>
              <span>Flexible</span>
              <span>🌙 Active late night</span>
            </div>
          </div>
        </div>

        {/* Dimension 2: Cleanliness */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-cyan-500" />
              <h3 className="font-bold text-sm text-slate-900">2. Cleanliness & Shared Space Standards</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
              {formData.cleanliness === 1 && "Very Relaxed (Tidies up occasionally)"}
              {formData.cleanliness === 2 && "Moderate (Clean before weekends)"}
              {formData.cleanliness === 3 && "Standard (Regular kitchen & dish cleaning)"}
              {formData.cleanliness === 4 && "High (Clean counters & sink daily)"}
              {formData.cleanliness === 5 && "Spotless (Meticulous / Sanitized)"}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formData.cleanliness}
              onChange={(e) => setFormData({ ...formData, cleanliness: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Casual / Clutter friendly</span>
              <span>Normal shared hygiene</span>
              <span>✨ Spotless / Sanitized daily</span>
            </div>
          </div>
        </div>

        {/* Dimension 3: Noise Tolerance */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-violet-500" />
              <h3 className="font-bold text-sm text-slate-900">3. Noise Tolerance & Atmosphere</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
              {formData.noise_tolerance === 1 && "Library Quiet (Minimal sound)"}
              {formData.noise_tolerance === 2 && "Quiet Hours Respected"}
              {formData.noise_tolerance === 3 && "Moderate Background TV / Music"}
              {formData.noise_tolerance === 4 && "Lively & Music Friendly"}
              {formData.noise_tolerance === 5 && "High Energy / Parties Welcome"}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formData.noise_tolerance}
              onChange={(e) => setFormData({ ...formData, noise_tolerance: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>🔇 Library silence</span>
              <span>Normal daytime sounds</span>
              <span>🔊 Lively / Social chatter</span>
            </div>
          </div>
        </div>

        {/* Dimension 4: Social Habits & Entertaining */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-500" />
              <h3 className="font-bold text-sm text-slate-900">4. Social Habits & Privacy Preference</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
              {formData.social_habits === 1 && "Private Sanctuary (Recharge alone)"}
              {formData.social_habits === 2 && "Independent & Low-key"}
              {formData.social_habits === 3 && "Friendly (Casual kitchen chats)"}
              {formData.social_habits === 4 && "Sociable (Shares meals together)"}
              {formData.social_habits === 5 && "Social Hub (Loves having folks over)"}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formData.social_habits}
              onChange={(e) => setFormData({ ...formData, social_habits: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Private introvert sanctuary</span>
              <span>Balanced friendly vibe</span>
              <span>🎉 Extroverted social hub</span>
            </div>
          </div>
        </div>

        {/* Dimension 5: Guest Policy */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-sm text-slate-900">5. Overnight Guests & Visitors</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
              {formData.guest_frequency === 1 && "Rarely / Advance Notice Only"}
              {formData.guest_frequency === 2 && "Occasional Weekend Visits"}
              {formData.guest_frequency === 3 && "Moderate (1-2 nights a week)"}
              {formData.guest_frequency === 4 && "Frequent Visitors Welcome"}
              {formData.guest_frequency === 5 && "Anytime Open Door Policy"}
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formData.guest_frequency}
              onChange={(e) => setFormData({ ...formData, guest_frequency: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-medium">
              <span>Strict / Advance notice</span>
              <span>Weekend visits okay</span>
              <span>Open door anytime</span>
            </div>
          </div>
        </div>

        {/* Categorical Lifestyle Attributes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Work / Routine
            </label>
            <select
              value={formData.work_schedule}
              onChange={(e) => setFormData({ ...formData, work_schedule: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="Student">Student (University)</option>
              <option value="Work from home">Remote / WFH</option>
              <option value="In-Office">Standard Office (9am-5pm)</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Dietary Preference
            </label>
            <select
              value={formData.dietary_pref}
              onChange={(e) => setFormData({ ...formData, dietary_pref: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="Any">Flexible / Any</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Pet Policy
            </label>
            <select
              value={formData.pet_friendly}
              onChange={(e) => setFormData({ ...formData, pet_friendly: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="Loves pets">Loves pets</option>
              <option value="Has pets">I have a pet</option>
              <option value="No pets">Prefer no pets</option>
              <option value="Allergic">Allergic (Strict no pets)</option>
            </select>
          </div>
        </div>

        {/* Budget Brackets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Minimum Target Budget ($/mo)
            </label>
            <input
              type="number"
              value={formData.budget_min}
              onChange={(e) => setFormData({ ...formData, budget_min: parseFloat(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Maximum Target Budget ($/mo)
            </label>
            <input
              type="number"
              value={formData.budget_max}
              onChange={(e) => setFormData({ ...formData, budget_max: parseFloat(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500">
            Updates will dynamically recalculate your 0-100% compatibility scores and radar diagrams across all flatmate candidates.
          </p>

          <button
            type="submit"
            disabled={saving}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-xs font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              saved
                ? 'bg-emerald-600 shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Updated & Calibrated!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{saving ? 'Calibrating...' : 'Save & Recalculate Matches'}</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
