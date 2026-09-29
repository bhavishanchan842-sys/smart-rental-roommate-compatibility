import React from 'react';
import { Sparkles, Home, Users, Calculator, ShieldCheck, ArrowRight, CheckCircle2, SlidersHorizontal, HeartHandshake } from 'lucide-react';
import RoommateCard from '../components/RoommateCard';
import PropertyCard from '../components/PropertyCard';

export default function HomePage({
  roommates = [],
  listings = [],
  currentUser,
  onNavigate,
  onOpenRoommateDetail,
  onOpenPropertyDetail,
  onOpenSplitter,
  onConnect
}) {
  return (
    <div className="space-y-16 py-6">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-14 border border-indigo-800/40 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI-Driven Compatibility & Fair Housing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Rent Smart. Live Compatible. <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-amber-200 bg-clip-text text-transparent">
              Zero Roommate Drama.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Finding a flat is easy—finding the right person to share it with is what matters. 
            SmartRent pairs verified apartments with a multi-attribute compatibility algorithm that aligns sleep schedules, chore standards, and budgets before you sign a lease.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('roommates')}
              className="px-6 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 flex items-center gap-2 group transition-all"
            >
              <Users className="w-4 h-4" />
              <span>Explore Compatible Roommates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('listings')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold backdrop-blur-sm transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Browse Rental Flats</span>
            </button>
          </div>

          {/* Key Value Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div>
              <p className="text-2xl font-black text-white">96%</p>
              <p className="text-[11px] text-slate-400 font-medium">Harmony Retention Rate</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-300">6 Dims</p>
              <p className="text-[11px] text-slate-400 font-medium">Lifestyle Matching Matrix</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-400">100%</p>
              <p className="text-[11px] text-slate-400 font-medium">Fair Split Transparency</p>
            </div>
          </div>
        </div>

        {/* Ambient Decorative Shapes */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute right-10 top-10 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
      </section>


      {/* Top Compatible Roommates Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Algorithmic Matches for {currentUser?.full_name?.split(' ')[0]}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Top Compatible Roommates
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ranked dynamically by circadian sync, chore expectations, and budget alignment.
            </p>
          </div>

          <button
            onClick={() => onNavigate('roommates')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roommates.slice(0, 3).map((match) => (
            <RoommateCard
              key={match.user.id}
              match={match}
              onOpenDetail={onOpenRoommateDetail}
              onConnect={onConnect}
            />
          ))}
        </div>
      </section>


      {/* How It Works Explainer */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            The Compatibility Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            How We Prevent Roommate Conflict
          </h2>
          <p className="text-xs text-slate-400">
            A scientifically weighted similarity matrix engineered to eliminate the most common causes of flatmate friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-base text-white">Multi-Vector Lifestyle Quiz</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Answer 10 intuitive questions measuring your sleep cycle, chore standards, noise tolerance, guest boundaries, and budget.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-base text-white">Weighted Harmony Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our algorithm applies non-linear decay penalties to high-friction metrics (cleanliness & sleep) while rewarding budget overlap.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-base text-white">Fair Rent Splitter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Once you find a flat, use our algorithmic rent calculator to split rent objectively by room square footage, ensuite baths, and balconies.
            </p>
          </div>
        </div>
      </section>


      {/* Featured Rental Properties */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
              <Home className="w-4 h-4 text-indigo-500" />
              <span>Verified Apartments</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Featured Shared Rentals
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Available rooms and multi-bedroom apartments ready for immediate co-living.
            </p>
          </div>

          <button
            onClick={() => onNavigate('listings')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>Browse All Listings ({listings.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onOpenDetail={onOpenPropertyDetail}
              onOpenSplitter={onOpenSplitter}
            />
          ))}
        </div>
      </section>

      {/* Rent Splitter Banner */}
      <section className="bg-gradient-to-r from-indigo-50 via-violet-50 to-emerald-50 rounded-3xl p-8 border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>Mathematical Fairness Tool</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Wondering who pays what for the Master Bedroom?
          </h3>
          <p className="text-xs text-slate-600 max-w-xl">
            Never argue about rent division. Input room sizes and private amenities into our Fair Rent Calculator to get an objective, dispute-free price per roommate.
          </p>
        </div>

        <button
          onClick={() => onNavigate('splitter')}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 shrink-0 transition-all"
        >
          Try the Rent Splitter
        </button>
      </section>

    </div>
  );
}
