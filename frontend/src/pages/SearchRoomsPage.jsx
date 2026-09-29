import React, { useState } from 'react';
import { Building, Search, SlidersHorizontal, MapPin, Check, Phone, Utensils, Zap, Shield, Sparkles } from 'lucide-react';
import { MOCK_ROOMS_AND_PGS } from '../mockData';

export default function SearchRoomsPage({ onSelectPG }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [maxRent, setMaxRent] = useState(15000);
  const [foodOnly, setFoodOnly] = useState(false);
  const [selectedPG, setSelectedPG] = useState(null);
  const [contacted, setContacted] = useState(false);

  const filtered = MOCK_ROOMS_AND_PGS.filter((pg) => {
    if (typeFilter !== 'All' && !pg.type.includes(typeFilter)) return false;
    if (pg.total_rent > maxRent) return false;
    if (foodOnly && !pg.food_included) return false;
    if (search) {
      const q = search.toLowerCase();
      const match = pg.title.toLowerCase().includes(q) ||
                    pg.neighborhood.toLowerCase().includes(q) ||
                    pg.address.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 py-4">
      
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 mb-2">
          <Building className="w-3.5 h-3.5 text-indigo-600" />
          <span>Independent Rooms & Paying Guest (PG)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Find Rooms & Student PGs
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Browse verified Boys, Girls, and Co-Living PGs with food, WiFi, and daily housekeeping included.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by college, area (e.g. Koramangala, HSR Layout, Indiranagar)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
          />
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['All', 'Boys PG', 'Girls PG', 'Co-Living', 'Studio'].map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                typeFilter === type
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Sliders and Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
              <span>Max Budget:</span>
              <span className="text-indigo-600 font-bold">₹{maxRent}/mo</span>
            </div>
            <input
              type="range"
              min="5000"
              max="20000"
              step="500"
              value={maxRent}
              onChange={(e) => setMaxRent(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={foodOnly}
                onChange={(e) => setFoodOnly(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <Utensils className="w-3.5 h-3.5 text-amber-500" />
              <span>Show PGs with 3 Meals Daily Included only</span>
            </label>
          </div>
        </div>

      </div>

      {/* Results Header */}
      <p className="text-xs text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-800">{filtered.length}</span> verified Rooms and PGs
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((pg) => (
          <div
            key={pg.id}
            className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Photo */}
              <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                <img
                  src={pg.images[0]}
                  alt={pg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white">
                    {pg.type}
                  </span>
                  {pg.food_included && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600/90 backdrop-blur-sm text-white flex items-center gap-1">
                      <Utensils className="w-3 h-3" /> Food Included
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-xl shadow-md">
                  <span className="text-xs font-medium text-slate-500">Starts at </span>
                  <span className="text-base font-extrabold text-indigo-700">₹{pg.total_rent}</span>
                  <span className="text-xs text-slate-500">/mo</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {pg.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{pg.address} ({pg.neighborhood})</span>
                </p>

                {/* Occupancy Options */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Sharing Options & Rates:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pg.occupancy_options.map((opt, i) => (
                      <span key={i} className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5">
                  {pg.amenities.slice(0, 4).map((a, i) => (
                    <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {a}
                    </span>
                  ))}
                  {pg.amenities.length > 4 && (
                    <span className="text-[10px] font-medium text-slate-400">
                      +{pg.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Deposit: ₹{pg.deposit}</span>
              <button
                onClick={() => setSelectedPG(pg)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
              >
                <span>View Full Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PG Detail Modal */}
      {selectedPG && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="relative aspect-[16/9] bg-slate-100">
              <img src={selectedPG.images[0]} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => { setSelectedPG(null); setContacted(false); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{selectedPG.type}</span>
                <h2 className="text-xl font-bold text-slate-900">{selectedPG.title}</h2>
                <p className="text-xs text-slate-500 mt-1">{selectedPG.address}, {selectedPG.neighborhood}, {selectedPG.city}</p>
              </div>

              {/* Food Info */}
              {selectedPG.food_included && (
                <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-start gap-2.5">
                  <Utensils className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">Food & Dining Included</p>
                    <p className="text-xs text-emerald-700 mt-0.5">{selectedPG.meals_provided}</p>
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Amenities & Services</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedPG.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">PG Rules & Timings</h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {selectedPG.house_rules.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-bold">Monthly Starting Rent</p>
                <p className="text-lg font-black text-indigo-700">₹{selectedPG.total_rent}/mo</p>
              </div>

              <button
                onClick={() => setContacted(true)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  contacted ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>{contacted ? `Warden: ${selectedPG.contact_phone}` : 'Contact PG Warden'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
