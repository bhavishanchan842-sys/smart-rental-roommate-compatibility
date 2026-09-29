import React from 'react';
import { Home, Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-slate-800">SmartRent & Match</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              An intelligent platform pairing verified student and professional rental discovery with multi-attribute algorithmic roommate matching.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Discovery</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li><button onClick={() => onNavigate('listings')} className="hover:text-indigo-600 transition-colors">Find Rental Properties</button></li>
              <li><button onClick={() => onNavigate('roommates')} className="hover:text-indigo-600 transition-colors">Roommate Compatibility Engine</button></li>
              <li><button onClick={() => onNavigate('quiz')} className="hover:text-indigo-600 transition-colors">Lifestyle Compatibility Quiz</button></li>
              <li><button onClick={() => onNavigate('splitter')} className="hover:text-indigo-600 transition-colors">Fair Rent & Utility Splitter</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Matching Technology</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-500" /> Multi-Attribute Compatibility Index</li>
              <li className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-500" /> Dealbreaker Penalty Safeguards</li>
              <li>Budget Overlap Evaluation</li>
              <li>Visual Lifestyle Radar Breakdown</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Project Information</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Academic Mini-Project demonstration showcasing automated matchmaking, algorithmic fairness in shared housing, and RESTful full-stack architecture.
            </p>
            <div className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              FastAPI + React System Online
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SmartRent & Match. Built with pair-programming assistance.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by Python FastAPI, React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
