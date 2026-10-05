import React, { useState } from 'react';
import { Building, Search, SlidersHorizontal, MapPin, Check, Phone, Utensils, Zap, Shield, Sparkles, Navigation, ExternalLink, Map } from 'lucide-react';
import { MOCK_ROOMS_AND_PGS } from '../mockData';

export default function SearchRoomsPage({ onSelectPG }) {
  const [search, setSearch] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [showMapPreview, setShowMapPreview] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [maxRent, setMaxRent] = useState(15000);
  const [foodOnly, setFoodOnly] = useState(false);
  const [selectedPG, setSelectedPG] = useState(null);
  const [contacted, setContacted] = useState(false);

  const effectiveLocation = manualLocation || search;

  const handleOpenGoogleMaps = (locationQuery) => {
    const query = locationQuery || effectiveLocation || 'Bangalore';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGetDirections = (destinationAddress) => {
    const originParam = manualLocation ? `&origin=${encodeURIComponent(manualLocation)}` : '';
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinationAddress)}${originParam}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const popularLocations = ['Koramangala', 'HSR Layout', 'Indiranagar', 'Electronic City', 'Whitefield', 'Christ University'];

  const filtered = MOCK_ROOMS_AND_PGS.filter((pg) => {
    if (typeFilter !== 'All' && !pg.type.includes(typeFilter)) return false;
    if (pg.total_rent > maxRent) return false;
    if (foodOnly && !pg.food_included) return false;
    
    // Filter by search or manual location
    const term = (manualLocation || search).trim().toLowerCase();
    if (term) {
      const match = pg.title.toLowerCase().includes(term) ||
                    pg.neighborhood.toLowerCase().includes(term) ||
                    pg.address.toLowerCase().includes(term) ||
                    pg.city.toLowerCase().includes(term);
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
          Browse verified Boys, Girls, and Co-Living PGs in Indian Rupees (₹) with manual location entry and Google Maps connectivity.
        </p>
      </div>

      {/* Filter and Manual Location Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        {/* 1. MANUAL LOCATION ENTRY & GOOGLE MAPS CONNECTIVITY */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>Enter Manual Location / College / Area:</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenGoogleMaps(manualLocation)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
                title="Connect and view on Google Maps"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Connect with Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </button>
              <button
                type="button"
                onClick={() => setShowMapPreview(!showMapPreview)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white border border-indigo-200 hover:bg-indigo-50 text-indigo-700 text-xs font-semibold transition-all"
              >
                <span>{showMapPreview ? 'Hide Map' : 'Preview Map'}</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-indigo-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Type any area manually (e.g. Koramangala 4th Block, HSR Sector 2, Near Christ University, Bangalore)..."
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-indigo-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 font-medium placeholder:text-slate-400"
            />
          </div>

          {/* Quick Location Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500">Quick Areas:</span>
            {popularLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setManualLocation(loc)}
                className={`text-[11px] px-2.5 py-0.5 rounded-lg border transition-all ${
                  manualLocation === loc
                    ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                📍 {loc}
              </button>
            ))}
            {manualLocation && (
              <button
                type="button"
                onClick={() => setManualLocation('')}
                className="text-[10px] text-slate-400 hover:text-rose-600 underline ml-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Embedded Google Map Preview for Manual Location */}
          {showMapPreview && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-indigo-200 shadow-sm animate-in fade-in duration-200">
              <div className="bg-indigo-100/70 px-3 py-1.5 text-[11px] font-bold text-indigo-900 flex justify-between items-center">
                <span>🗺️ Live Google Maps Preview: {manualLocation || 'Bangalore'}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(manualLocation || 'Bangalore')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-700 hover:underline flex items-center gap-0.5"
                >
                  Open in New Tab <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <iframe
                title="Google Map Manual Location"
                width="100%"
                height="190"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(manualLocation || 'Bangalore, Karnataka')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          )}
        </div>

        {/* Text Filter / Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by keywords (e.g. AC, Single room, Balcony, Stanza Living)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
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

                <div className="flex items-center justify-between gap-1 text-xs text-slate-500">
                  <p className="flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{pg.address} ({pg.neighborhood})</span>
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGoogleMaps(`${pg.title}, ${pg.address}, ${pg.neighborhood}, ${pg.city}`);
                    }}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded-lg shrink-0 flex items-center gap-0.5 transition-colors"
                    title="View on Google Maps"
                  >
                    <span>📍 Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>

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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-1">
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{selectedPG.address}, {selectedPG.neighborhood}, {selectedPG.city}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenGoogleMaps(`${selectedPG.title}, ${selectedPG.address}, ${selectedPG.neighborhood}, ${selectedPG.city}`)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-xl transition-colors"
                    >
                      <Map className="w-3 h-3 text-indigo-600" />
                      <span>Open Maps</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGetDirections(`${selectedPG.address}, ${selectedPG.neighborhood}, ${selectedPG.city}`)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-xl transition-colors"
                    >
                      <Navigation className="w-3 h-3 text-emerald-600" />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Embedded Interactive Google Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  title="PG Google Maps Location"
                  width="100%"
                  height="160"
                  style={{ border: 0 }}
                  loading="lazy"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${selectedPG.address}, ${selectedPG.neighborhood}, ${selectedPG.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                />
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
