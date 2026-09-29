import React, { useState } from 'react';
import { Users, Filter, SlidersHorizontal, Sparkles, RefreshCw } from 'lucide-react';
import RoommateCard from '../components/RoommateCard';

export default function FindRoommatesPage({
  roommates = [],
  currentUser,
  filters,
  onFilterChange,
  onResetFilters,
  onOpenDetail,
  onConnect,
  loading
}) {
  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Harmonious Flatmate Finder</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            Compatible Roommates
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmically scored for <span className="font-semibold text-slate-800">{currentUser?.full_name}</span> based on sleep habits, cleanliness, and budget overlap.
          </p>
        </div>

        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filter Roommate Match Criteria</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Min Score Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Min Compatibility</span>
              <span className="text-indigo-600 font-bold">{filters.minScore || 50}%+</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={filters.minScore || 50}
              onChange={(e) => onFilterChange({ ...filters, minScore: parseInt(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gender Preference</label>
            <select
              value={filters.gender || 'All'}
              onChange={(e) => onFilterChange({ ...filters, gender: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="All">All Genders</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>

          {/* Work / Study Routine */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Work / Routine</label>
            <select
              value={filters.workSchedule || 'All'}
              onChange={(e) => onFilterChange({ ...filters, workSchedule: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="All">All Work Schedules</option>
              <option value="Student">Student</option>
              <option value="Work from home">Work from home</option>
              <option value="In-Office">In-Office</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Pet Friendly */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Pet Preference</label>
            <select
              value={filters.petFriendly || 'All'}
              onChange={(e) => onFilterChange({ ...filters, petFriendly: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="All">Any Pet Policy</option>
              <option value="Loves pets">Loves pets</option>
              <option value="Has pets">Has pets</option>
              <option value="No pets">No pets</option>
              <option value="Allergic">Allergic (Hypoallergenic)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <p>
          Found <span className="font-bold text-slate-800">{roommates.length}</span> roommate profiles sorted by highest mathematical compatibility
        </p>
        <span className="flex items-center gap-1 font-semibold text-indigo-600">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Weighted Euclidean & Cosine Engine
        </span>
      </div>

      {/* Roommates Grid */}
      {roommates.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-700">No roommates match this strict filter threshold</p>
          <p className="text-xs text-slate-500">Try lowering the minimum compatibility score or expanding work schedule filters.</p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-xl hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roommates.map((match) => (
            <RoommateCard
              key={match.user.id}
              match={match}
              onOpenDetail={onOpenDetail}
              onConnect={onConnect}
            />
          ))}
        </div>
      )}

    </div>
  );
}
