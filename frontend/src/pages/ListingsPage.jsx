import React, { useState } from 'react';
import { Home, Search, SlidersHorizontal, PlusCircle, RefreshCw, MapPin } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function ListingsPage({
  listings = [],
  filters,
  onFilterChange,
  onResetFilters,
  onOpenDetail,
  onOpenSplitter,
  onOpenCreateListing
}) {
  const neighborhoods = ['All', 'University District', 'Tech Park', 'Arts District', 'Green Valley'];

  return (
    <div className="space-y-8 py-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
            <Home className="w-4 h-4" />
            <span>Verified Rental Properties</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">
            Discover Shared Living Spaces
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Curated apartments, master suites, and student flats ready for co-living.
          </p>
        </div>

        <button
          onClick={onOpenCreateListing}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 flex items-center gap-1.5 self-start md:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Rental</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by neighborhood, title, campus, or amenities..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-800 transition-all"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          {/* Max Rent Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
              <span>Max Monthly Rent</span>
              <span className="text-indigo-600 font-bold">${filters.maxRent || 2000}/mo</span>
            </div>
            <input
              type="range"
              min="600"
              max="2500"
              step="50"
              value={filters.maxRent || 2000}
              onChange={(e) => onFilterChange({ ...filters, maxRent: parseFloat(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bedrooms</label>
            <select
              value={filters.bedrooms || 0}
              onChange={(e) => onFilterChange({ ...filters, bedrooms: parseInt(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="0">Any Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
            </select>
          </div>

          {/* Furnished */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Furnished Status</label>
            <select
              value={filters.furnished || 'All'}
              onChange={(e) => onFilterChange({ ...filters, furnished: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            >
              <option value="All">All Furnishing Types</option>
              <option value="Fully Furnished">Fully Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

        </div>

        {/* Neighborhood Quick Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
            Area:
          </span>
          {neighborhoods.map((n) => (
            <button
              key={n}
              onClick={() => onFilterChange({ ...filters, neighborhood: n })}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                (filters.neighborhood || 'All') === n
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

      </div>

      {/* Results Count & Properties Grid */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <p>Showing <span className="font-bold text-slate-800">{listings.length}</span> rental properties</p>
      </div>

      {listings.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-700">No properties match your current filters</p>
          <p className="text-xs text-slate-500">Try adjusting your budget or clearing the search query.</p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-xl hover:bg-indigo-100"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onOpenDetail={onOpenDetail}
              onOpenSplitter={onOpenSplitter}
            />
          ))}
        </div>
      )}

    </div>
  );
}
