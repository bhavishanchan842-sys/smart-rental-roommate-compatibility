import React, { useState } from 'react';
import { Users, Search, Sparkles, MapPin, ArrowRight, Sun, Moon, Sparkle, Map, ExternalLink } from 'lucide-react';
import { MOCK_SHARED_PGS, calculateResidentCompatibility } from '../mockData';
import SharedPGDetailModal from '../components/SharedPGDetailModal';

export default function SearchSharedPGPage({ currentUser }) {
  const [search, setSearch] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [showMapPreview, setShowMapPreview] = useState(false);
  const [selectedPG, setSelectedPG] = useState(null);

  const effectiveLocation = manualLocation || search;

  const handleOpenGoogleMaps = (locationQuery) => {
    const query = locationQuery || effectiveLocation || 'Bangalore';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const popularLocations = ['Koramangala', 'HSR Layout', 'Indiranagar', 'Electronic City', 'Whitefield'];

  const filtered = MOCK_SHARED_PGS.filter((pg) => {
    const term = (manualLocation || search).trim().toLowerCase();
    if (term) {
      const match = pg.title.toLowerCase().includes(term) ||
                    pg.neighborhood.toLowerCase().includes(term) ||
                    pg.address.toLowerCase().includes(term) ||
                    pg.resident.full_name.toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 py-4">
      
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-bold text-violet-800 mb-2">
          <Users className="w-3.5 h-3.5 text-violet-600" />
          <span>Roommate Replacement & Shared Flat Discovery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Find a PG with Someone Already Living There
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Join an established apartment or PG in Indian Rupees (₹). Review flatmate habits, connect locations with Google Maps, and view transparent itemized rent.
        </p>
      </div>

      {/* Manual Location Entry Card */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-violet-600" />
              <span>Enter Location Manually:</span>
            </label>
            {manualLocation && (
              <button
                type="button"
                onClick={() => handleOpenGoogleMaps(manualLocation)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold shadow-2xs transition-all self-start sm:self-auto"
                title="Open entered location in Google Maps"
              >
                <Map className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
              </button>
            )}
          </div>

          <div className="relative">
            <MapPin className="w-4 h-4 text-violet-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Type any area or flatmate location manually (e.g. Koramangala, HSR Layout, Indiranagar)..."
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              className="w-full text-xs font-bold pl-10 pr-20 py-3 rounded-2xl border-2 border-violet-200 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 placeholder:text-slate-400 placeholder:font-normal shadow-2xs"
              autoFocus
            />
            {manualLocation && (
              <button
                type="button"
                onClick={() => setManualLocation('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-rose-600 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Shared PGs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pg) => {
          const comp = calculateResidentCompatibility(
            currentUser?.lifestyle_profile,
            pg.resident.lifestyle_profile
          );

          return (
            <div
              key={pg.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Photo & Match Badge */}
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <img
                    src={pg.images[0]}
                    alt={pg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white">
                      {pg.property_type}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/95 backdrop-blur-sm text-emerald-700 text-xs font-extrabold shadow-md border border-emerald-100">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{comp.score}% Match</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-xl shadow-md">
                    <span className="text-[10px] text-slate-500 font-medium">Your Share: </span>
                    <span className="text-base font-extrabold text-indigo-700">₹{pg.your_share}</span>
                    <span className="text-[10px] text-slate-500">/mo</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {pg.title}
                    </h3>
                    <div className="flex items-center justify-between gap-1 text-xs text-slate-500 mt-1">
                      <p className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{pg.address}, {pg.neighborhood}</span>
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenGoogleMaps(`${pg.title}, ${pg.address}, ${pg.neighborhood}, ${pg.city}`);
                        }}
                        className="text-[11px] font-bold text-violet-700 hover:text-violet-900 bg-violet-50 hover:bg-violet-100 px-2 py-0.5 rounded-lg shrink-0 flex items-center gap-0.5 transition-colors"
                        title="View on Google Maps"
                      >
                        <span>📍 Maps</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  {/* Current Resident Badge */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={pg.resident.avatar}
                        alt={pg.resident.full_name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-200"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {pg.resident.full_name} ({pg.resident.age})
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {pg.resident.occupation}
                      </p>
                    </div>
                  </div>

                  {/* Quick Resident Habits */}
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-medium text-slate-600">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 flex items-center gap-1">
                      {pg.resident.lifestyle_profile.sleep_schedule <= 2 ? (
                        <><Sun className="w-3 h-3 text-amber-500" /> Morning</>
                      ) : (
                        <><Moon className="w-3 h-3 text-indigo-500" /> Night Owl</>
                      )}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 flex items-center gap-1">
                      <Sparkle className="w-3 h-3 text-cyan-500" />
                      Clean: {pg.resident.lifestyle_profile.cleanliness}/5
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100">
                      {pg.resident.lifestyle_profile.dietary_pref}
                    </span>
                  </div>

                  {/* Financial Quick Glance */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Total Rent: ₹{pg.total_flat_rent}</span>
                    <span>Deposit Share: ₹{pg.deposit_share}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-3 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => setSelectedPG(pg)}
                  className="w-full py-2.5 px-4 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>View Rent Share & Compatibility Quiz</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedPG && (
        <SharedPGDetailModal
          pg={selectedPG}
          currentUser={currentUser}
          onClose={() => setSelectedPG(null)}
        />
      )}

    </div>
  );
}
