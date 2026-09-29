import React from 'react';
import { Home, Users, Sparkles, Calculator, LogOut, Phone, Building } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Name */}
          <div 
            onClick={() => setActiveTab('rooms')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Building className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-xl font-black bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-900 bg-clip-text text-transparent">
                SmartRent
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 ml-1.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                & PG Match
              </span>
            </div>
          </div>

          {/* Center Navigation Links - The 2 requested main pages + Quiz & Splitter */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'rooms'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>Search Rooms & PGs</span>
            </button>

            <button
              onClick={() => setActiveTab('shared_pg')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'shared_pg'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4 text-violet-600" />
              <span>PG with Existing Flatmate</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Roommate Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('splitter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'splitter'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Rent Splitter</span>
            </button>
          </nav>

          {/* Right Action Bar: Current User Details & Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 p-1.5 px-3 rounded-2xl bg-slate-50 border border-slate-200">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                alt=""
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500"
              />
              <div className="text-left text-xs">
                <p className="font-bold text-slate-800 leading-tight">
                  {currentUser?.full_name || "Guest User"}
                </p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">
                  <span>{currentUser?.phone}</span>
                </p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Logout / Switch Phone"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden border-t border-slate-200 bg-white px-2 py-1 justify-around text-xs font-bold">
        <button
          onClick={() => setActiveTab('rooms')}
          className={`py-1.5 px-2 rounded ${activeTab === 'rooms' ? 'text-indigo-600' : 'text-slate-600'}`}
        >
          Rooms & PGs
        </button>
        <button
          onClick={() => setActiveTab('shared_pg')}
          className={`py-1.5 px-2 rounded ${activeTab === 'shared_pg' ? 'text-indigo-600' : 'text-slate-600'}`}
        >
          Shared PG
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`py-1.5 px-2 rounded ${activeTab === 'quiz' ? 'text-indigo-600' : 'text-slate-600'}`}
        >
          Quiz
        </button>
        <button
          onClick={() => setActiveTab('splitter')}
          className={`py-1.5 px-2 rounded ${activeTab === 'splitter' ? 'text-indigo-600' : 'text-slate-600'}`}
        >
          Splitter
        </button>
      </div>
    </header>
  );
}
