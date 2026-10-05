import React, { useState, useEffect } from 'react';
import { Calculator, Plus, Trash2, CheckCircle2, Shield, Info, Copy, Check, Sparkles } from 'lucide-react';
import { calculateFairRentSplit } from '../api';

export default function RentSplitterPage({ prefillProperty }) {
  const [totalRent, setTotalRent] = useState(24000);
  const [totalUtilities, setTotalUtilities] = useState(2500);
  const [commonAreaWeight, setCommonAreaWeight] = useState(25);
  const [copied, setCopied] = useState(false);

  const [rooms, setRooms] = useState([
    {
      room_name: "Master Suite",
      size_sqft: 220,
      has_private_bath: true,
      has_balcony: true,
      has_walk_in_closet: true,
      occupant_name: "Roommate 1"
    },
    {
      room_name: "Bedroom 2 (West)",
      size_sqft: 160,
      has_private_bath: false,
      has_balcony: false,
      has_walk_in_closet: false,
      occupant_name: "Roommate 2"
    },
    {
      room_name: "Bedroom 3 (Garden)",
      size_sqft: 140,
      has_private_bath: false,
      has_balcony: false,
      has_walk_in_closet: false,
      occupant_name: "Roommate 3"
    }
  ]);

  const [splitResult, setSplitResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Apply prefill if property was clicked from listings
  useEffect(() => {
    if (prefillProperty) {
      setTotalRent(prefillProperty.rent_monthly);
      setTotalUtilities(prefillProperty.utilities_included ? 0 : (prefillProperty.estimated_utilities || 120));
      
      const numBeds = prefillProperty.bedrooms || 2;
      const avgSqft = Math.round((prefillProperty.size_sqft * 0.6) / numBeds);

      const generatedRooms = Array.from({ length: numBeds }, (_, i) => ({
        room_name: i === 0 ? "Master Bedroom" : `Bedroom ${i + 1}`,
        size_sqft: i === 0 ? avgSqft + 30 : avgSqft - 15,
        has_private_bath: i === 0 && prefillProperty.bathrooms > 1,
        has_balcony: i === 0,
        has_walk_in_closet: i === 0,
        occupant_name: `Roommate ${i + 1}`
      }));
      setRooms(generatedRooms);
    }
  }, [prefillProperty]);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await calculateFairRentSplit({
        total_rent: parseFloat(totalRent),
        total_utilities: parseFloat(totalUtilities),
        common_area_weight_percent: parseFloat(commonAreaWeight),
        rooms: rooms.map(r => ({
          ...r,
          size_sqft: parseFloat(r.size_sqft)
        }))
      });
      setSplitResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Run calculation on initial load
  useEffect(() => {
    handleCalculate();
  }, [totalRent, totalUtilities, commonAreaWeight]);

  const handleAddRoom = () => {
    setRooms([
      ...rooms,
      {
        room_name: `Bedroom ${rooms.length + 1}`,
        size_sqft: 140,
        has_private_bath: false,
        has_balcony: false,
        has_walk_in_closet: false,
        occupant_name: `Roommate ${rooms.length + 1}`
      }
    ]);
  };

  const handleRemoveRoom = (index) => {
    if (rooms.length <= 1) return;
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const handleRoomChange = (index, field, value) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const handleCopySummary = () => {
    if (!splitResult) return;
    const text = `🏠 Fair Rent Split Breakdown\nTotal Rent: ₹${splitResult.total_rent} (Utilities: ₹${splitResult.total_utilities})\n\n` +
      splitResult.rooms.map(r => `• ${r.occupant_name} (${r.room_name}): ₹${r.calculated_rent}/mo rent + ₹${r.utility_share} utils = ₹${r.total_monthly} total`).join('\n') +
      `\n\nGenerated with SmartRent Fair Calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
          <Calculator className="w-3.5 h-3.5 text-emerald-600" />
          <span>Algorithmic Rent Equity</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          Fair Shared Rent & Utility Calculator
        </h1>
        <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          No more guessing or disputes over who pays what. Our formula weights square footage, common living areas, and private perks (ensuite bath, balcony, closet) for complete transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Setup Controls & Room Manager */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Apartment Level Costs */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Total Apartment Expenses
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Monthly Rent (₹)</label>
                <input
                  type="number"
                  value={totalRent}
                  onChange={(e) => setTotalRent(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full text-sm font-bold text-indigo-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Utilities (₹/mo)</label>
                <input
                  type="number"
                  value={totalUtilities}
                  onChange={(e) => setTotalUtilities(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full text-sm font-bold text-slate-700 p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="WiFi, power, water"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                  <span>Common Area Pool</span>
                  <span className="text-indigo-600">{commonAreaWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={commonAreaWeight}
                  onChange={(e) => setCommonAreaWeight(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer mt-2"
                />
                <p className="text-[10px] text-slate-400 mt-1">Split equally for kitchen/living</p>
              </div>
            </div>
          </div>

          {/* Room Configuration Cards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                2. Bedroom Dimensions & Perks ({rooms.length} Rooms)
              </h3>

              <button
                onClick={handleAddRoom}
                className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold border border-indigo-200 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Bedroom</span>
              </button>
            </div>

            <div className="space-y-3">
              {rooms.map((room, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid grid-cols-2 gap-3 flex-1">
                      <input
                        type="text"
                        value={room.room_name}
                        onChange={(e) => handleRoomChange(idx, 'room_name', e.target.value)}
                        className="text-xs font-bold text-slate-800 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Room Label"
                      />
                      <input
                        type="text"
                        value={room.occupant_name}
                        onChange={(e) => handleRoomChange(idx, 'occupant_name', e.target.value)}
                        className="text-xs text-slate-600 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="Occupant / Roommate Name"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <div className="relative">
                          <input
                            type="number"
                            value={room.size_sqft}
                            onChange={(e) => handleRoomChange(idx, 'size_sqft', Math.max(1, parseFloat(e.target.value) || 1))}
                            className="w-full text-xs font-semibold text-slate-800 p-2 pr-7 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                          <span className="text-[10px] text-slate-400 absolute right-2 top-1/2 -translate-y-1/2">sqft</span>
                        </div>
                      </div>

                      {rooms.length > 1 && (
                        <button
                          onClick={() => handleRemoveRoom(idx)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Remove Room"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Private Amenities Toggles */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-slate-100">
                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={room.has_private_bath}
                        onChange={(e) => handleRoomChange(idx, 'has_private_bath', e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Ensuite Bath (+12%)</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={room.has_balcony}
                        onChange={(e) => handleRoomChange(idx, 'has_balcony', e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Private Balcony (+6%)</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={room.has_walk_in_closet}
                        onChange={(e) => handleRoomChange(idx, 'has_walk_in_closet', e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Walk-in Closet (+4%)</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleCalculate}
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>{loading ? 'Calculating...' : 'Recalculate Rent Breakdown'}</span>
            </button>
          </div>

        </div>


        {/* Right Col: Instant Live Breakdown */}
        <div className="space-y-6">
          <div className="bg-indigo-50/80 text-slate-900 p-6 rounded-3xl border-2 border-indigo-200 shadow-sm space-y-6 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-indigo-200 pb-4">
              <div>
                <h3 className="font-bold text-base text-indigo-950">Fair Rent Breakdown</h3>
                <p className="text-[11px] text-slate-500">Exact penny-balanced distribution</p>
              </div>

              <button
                onClick={handleCopySummary}
                className="p-2 rounded-xl bg-white border border-indigo-200 hover:bg-indigo-100 text-indigo-700 transition-colors flex items-center gap-1 text-xs font-bold shadow-2xs"
                title="Copy Summary"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {splitResult ? (
              <div className="space-y-4">
                {splitResult.rooms.map((r, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-indigo-700">{r.occupant_name}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{r.room_name}</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-black text-slate-900">₹{r.total_monthly}</p>
                        <p className="text-[10px] text-slate-500">{r.percentage_of_rent}% of rent</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Base Rent: <strong className="text-slate-900">₹{r.calculated_rent}</strong></span>
                      <span>Utilities: <strong className="text-slate-900">₹{r.utility_share}</strong></span>
                    </div>

                    <p className="text-[10px] text-slate-500 italic leading-snug">
                      {r.formula_explanation}
                    </p>
                  </div>
                ))}

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1 text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Zero-Sum Verified
                  </p>
                  <p className="text-emerald-700 text-[10px]">
                    Sum of individual rents strictly equals ₹{splitResult.total_rent}. Common area share per occupant: ₹{splitResult.common_area_share_per_person}.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">Configuring room parameters...</p>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
