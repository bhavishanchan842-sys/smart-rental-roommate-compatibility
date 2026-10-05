import React from 'react';
import { Sparkles, Sun, Moon, Sparkle, ShieldCheck, Heart, Send, Check } from 'lucide-react';

export default function RoommateCard({ match, onOpenDetail, onConnect }) {
  const { user, compatibility_score, strengths = [], connection_status } = match;
  const lifestyle = user.lifestyle_profile || {};

  // Badge color based on score
  const getScoreColor = (score) => {
    if (score >= 90) return 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-emerald-500/20';
    if (score >= 80) return 'bg-indigo-50 text-indigo-700 border-indigo-300 ring-indigo-500/20';
    if (score >= 70) return 'bg-amber-50 text-amber-700 border-amber-300 ring-amber-500/20';
    return 'bg-slate-100 text-slate-700 border-slate-300 ring-slate-500/10';
  };

  const getScoreGradient = (score) => {
    if (score >= 90) return 'from-emerald-500 to-teal-600';
    if (score >= 80) return 'from-indigo-600 to-violet-600';
    if (score >= 70) return 'from-amber-500 to-orange-500';
    return 'from-slate-500 to-slate-600';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Card Header & Avatar */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={user.full_name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 group-hover:ring-indigo-100 transition-all"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" title="Verified Tenant"></span>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  {user.full_name}
                  <span className="text-xs font-normal text-slate-500">({user.age})</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">{user.occupation}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{lifestyle.preferred_city || "Metro City"}</p>
              </div>
            </div>

            {/* Compatibility Badge */}
            <div className="text-right">
              <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-bold ring-2 ${getScoreColor(compatibility_score)}`}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{compatibility_score}%</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Match Index</p>
            </div>
          </div>

          {/* Quick Bio */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
            {user.bio || "Looking for a friendly, compatible roommate to share an apartment."}
          </p>

          {/* Lifestyle Pills */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-100">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
              {lifestyle.sleep_schedule <= 2 ? (
                <><Sun className="w-3 h-3 text-amber-500" /> Early Riser</>
              ) : (
                <><Moon className="w-3 h-3 text-indigo-500" /> Night Owl</>
              )}
            </span>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
              <Sparkle className="w-3 h-3 text-cyan-500" />
              Clean: {lifestyle.cleanliness}/5
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
              {lifestyle.work_schedule}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700">
              {lifestyle.dietary_pref}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              ₹{lifestyle.budget_min} - ₹{lifestyle.budget_max}/mo
            </span>
          </div>

          {/* Top Strength Highlight */}
          {strengths && strengths.length > 0 && (
            <div className="mt-3 bg-indigo-50/60 rounded-xl p-2.5 border border-indigo-100/80">
              <p className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Top Synergy
              </p>
              <p className="text-xs text-indigo-950 font-medium mt-0.5 line-clamp-1">
                {strengths[0]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onOpenDetail(match)}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 shadow-2xs transition-all"
        >
          View Radar & Insights
        </button>

        <button
          onClick={() => onConnect(match)}
          disabled={!!connection_status}
          className={`py-2 px-3 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
            connection_status
              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200'
          }`}
        >
          {connection_status ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{connection_status.includes('Sent') ? 'Requested' : 'Connected'}</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Connect</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
