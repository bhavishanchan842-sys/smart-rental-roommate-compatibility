import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, Send, User, Check } from 'lucide-react';
import CompatibilityRadar from './CompatibilityRadar';

export default function CompatibilityDetailModal({
  match,
  currentUser,
  onClose,
  onConnect
}) {
  if (!match) return null;

  const { user, compatibility_score, strengths = [], frictions = [], radar_data = [], connection_status } = match;
  const matchLifestyle = user.lifestyle_profile || {};
  const currentLifestyle = currentUser?.lifestyle_profile || {};

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.full_name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-400"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{user.full_name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  {user.age} yrs • {user.gender}
                </span>
              </div>
              <p className="text-xs text-indigo-200 mt-0.5">{user.occupation} • {user.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-base font-extrabold">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{compatibility_score}%</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Match Score</p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">

          {/* Radar Chart & High-Level Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Algorithmic Harmony Radar</h4>
              <p className="text-xs text-slate-500 mb-4">
                Visualizing normalized alignment across 6 behavioral dimensions between you and {user.full_name}.
              </p>
              <CompatibilityRadar
                data={radar_data}
                userName={currentUser?.full_name?.split(' ')[0] || "You"}
                matchName={user.full_name?.split(' ')[0]}
                size={270}
              />
            </div>

            {/* Score Breakdown Bars */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Dimension Breakdown
              </h4>

              {[
                { name: "Cleanliness Alignment", score: match.cleanliness_score, desc: "Chore habits & clutter standards" },
                { name: "Sleep Schedule Sync", score: match.sleep_score, desc: "Circadian rhythm alignment" },
                { name: "Noise Tolerance", score: match.noise_score, desc: "Music, TV, and quiet study hours" },
                { name: "Social Energy", score: match.social_score, desc: "Home environment personality" },
                { name: "Guest Policy", score: match.guest_score, desc: "Overnight and weekend visitors" },
                { name: "Budget Compatibility", score: match.budget_score, desc: "Rental price bracket overlap" }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-700">{item.name}</span>
                    <span className="font-bold text-indigo-600">{item.score}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.score >= 80 ? 'bg-emerald-500' : item.score >= 60 ? 'bg-indigo-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI / Algorithmic Insights: Strengths & Friction Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Strengths */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Key Synergies ({strengths.length})
              </h4>
              <ul className="space-y-2">
                {strengths.map((str, i) => (
                  <li key={i} className="text-xs text-emerald-950 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Friction Points */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Considerations & Differences
              </h4>
              <ul className="space-y-2">
                {frictions.map((fric, i) => (
                  <li key={i} className="text-xs text-amber-950 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{fric}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Side-by-side Attribute Comparison Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <div className="bg-slate-100/80 px-4 py-2.5 border-b border-slate-200">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Direct Lifestyle Matrix
              </h4>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-3 p-3 bg-slate-50 font-semibold text-slate-500">
                <div>Metric</div>
                <div>{currentUser?.full_name?.split(' ')[0] || "You"}</div>
                <div>{user.full_name?.split(' ')[0]}</div>
              </div>

              <div className="grid grid-cols-3 p-3">
                <div className="font-medium text-slate-600">Sleep Schedule</div>
                <div>{currentLifestyle.sleep_schedule <= 2 ? "Early Riser" : "Night Owl"}</div>
                <div>{matchLifestyle.sleep_schedule <= 2 ? "Early Riser" : "Night Owl"}</div>
              </div>

              <div className="grid grid-cols-3 p-3">
                <div className="font-medium text-slate-600">Cleanliness Standard</div>
                <div>{currentLifestyle.cleanliness} / 5 (Spotless)</div>
                <div>{matchLifestyle.cleanliness} / 5</div>
              </div>

              <div className="grid grid-cols-3 p-3">
                <div className="font-medium text-slate-600">Work/Study Routine</div>
                <div>{currentLifestyle.work_schedule}</div>
                <div>{matchLifestyle.work_schedule}</div>
              </div>

              <div className="grid grid-cols-3 p-3">
                <div className="font-medium text-slate-600">Dietary Style</div>
                <div>{currentLifestyle.dietary_pref}</div>
                <div>{matchLifestyle.dietary_pref}</div>
              </div>

              <div className="grid grid-cols-3 p-3">
                <div className="font-medium text-slate-600">Pet Policy</div>
                <div>{currentLifestyle.pet_friendly}</div>
                <div>{matchLifestyle.pet_friendly}</div>
              </div>

              <div className="grid grid-cols-3 p-3">
                <div className="font-medium text-slate-600">Monthly Budget</div>
                <div>₹{currentLifestyle.budget_min} - ₹{currentLifestyle.budget_max}</div>
                <div>₹{matchLifestyle.budget_min} - ₹{matchLifestyle.budget_max}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Send a match request to exchange contact details and schedule an apartment tour together.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => onConnect(match)}
              disabled={!!connection_status}
              className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                connection_status
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
              }`}
            >
              {connection_status ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{connection_status.includes('Sent') ? 'Request Already Sent' : 'Connected'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Roommate Request</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
