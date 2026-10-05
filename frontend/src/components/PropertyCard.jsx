import React from 'react';
import { MapPin, BedDouble, Bath, Maximize2, Zap, Calculator, CheckCircle2 } from 'lucide-react';

export default function PropertyCard({ property, onOpenDetail, onOpenSplitter }) {
  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white">
              {property.furnished}
            </span>
            {property.utilities_included && (
              <span className="text-[11px] font-semibold px-2 py-1 rounded-lg bg-emerald-500/90 backdrop-blur-sm text-white flex items-center gap-1">
                <Zap className="w-3 h-3" /> Bills Included
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md">
            <span className="text-base font-extrabold text-indigo-700">₹{property.rent_monthly}</span>
            <span className="text-[11px] text-slate-500 font-medium">/mo</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
            {property.property_type}
          </p>
          <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center justify-between gap-1.5 text-xs text-slate-500 mt-2">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{property.neighborhood}, {property.city}</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title}, ${property.neighborhood}, ${property.city}`)}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md hover:bg-indigo-100 transition-colors shrink-0 flex items-center gap-1"
            >
              📍 Maps
            </a>
          </div>

          {/* Quick Specs */}
          <div className="flex items-center gap-4 text-xs text-slate-600 mt-4 py-2.5 px-3 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-slate-400" />
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span>{property.size_sqft} sqft</span>
            </div>
          </div>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {(property.amenities || []).slice(0, 3).map((amenity, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                {amenity}
              </span>
            ))}
            {(property.amenities || []).length > 3 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500">
                +{(property.amenities || []).length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={() => onOpenDetail(property)}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 shadow-2xs transition-all"
        >
          View Details
        </button>

        <button
          onClick={() => onOpenSplitter(property)}
          className="py-2 px-3 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center gap-1.5 transition-all"
          title="Calculate rent split for this property"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Split Rent</span>
        </button>
      </div>
    </div>
  );
}
