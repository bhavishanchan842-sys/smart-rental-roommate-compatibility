import React, { useState } from 'react';
import { X, MapPin, BedDouble, Bath, Maximize2, Zap, CheckCircle, Calculator, ShieldCheck, Mail, Phone } from 'lucide-react';

export default function PropertyDetailModal({ property, onClose, onOpenSplitter }) {
  if (!property) return null;

  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"];

  const [activeImage, setActiveImage] = useState(images[0]);
  const [inquirySent, setInquirySent] = useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Bar */}
        <div className="p-4 px-6 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {property.property_type}
            </span>
            <h2 className="text-lg font-bold text-slate-900">{property.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Main Photo & Thumbnails */}
          <div>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={activeImage}
                alt={property.title}
                className="w-full h-full object-cover transition-all"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Key Numbers Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Monthly Rent</p>
              <p className="text-xl font-black text-indigo-700 mt-0.5">₹{property.rent_monthly}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Security Deposit</p>
              <p className="text-lg font-bold text-slate-800 mt-0.5">₹{property.deposit || 0}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Utilities</p>
              <p className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                {property.utilities_included ? (
                  <><Zap className="w-3.5 h-3.5" /> Included</>
                ) : (
                  `~₹${property.estimated_utilities}/mo`
                )}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Availability</p>
              <p className="text-xs font-semibold text-slate-800 mt-1">{property.available_from || "Immediate"}</p>
            </div>
          </div>

          {/* Location & Details */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-medium mb-3">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{property.address}, {property.neighborhood}, {property.city}</span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.title}, ${property.address || ''}, ${property.neighborhood}, ${property.city}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-xl transition-colors shrink-0"
              >
                <span>🗺️ Open in Google Maps</span>
              </a>
            </div>

            {/* Embedded Google Maps View */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 mb-3 shadow-inner">
              <iframe
                title="Google Maps Location"
                width="100%"
                height="180"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.address || property.title}, ${property.neighborhood}, ${property.city}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-600 py-3 px-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-slate-500" />
                <span className="font-semibold">{property.bedrooms}</span> Bedrooms
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-slate-500" />
                <span className="font-semibold">{property.bathrooms}</span> Bathrooms
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-slate-500" />
                <span className="font-semibold">{property.size_sqft}</span> sqft
              </div>
              <div className="font-semibold text-indigo-600">
                {property.furnished}
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Amenities & House Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Amenities */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Building & Apartment Amenities
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                {(property.amenities || []).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                House Rules & Living Policies
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {(property.house_rules || []).map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Host Info */}
          {property.host && (
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={property.host.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"}
                  alt={property.host.full_name}
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    Listed by {property.host.full_name}
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </p>
                  <p className="text-[11px] text-slate-500">{property.host.occupation} • Verified Host</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-slate-500">{property.host.email}</p>
                <p className="text-[11px] text-slate-500">{property.host.phone || "+1 (555) 019-2834"}</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenSplitter(property);
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 flex items-center gap-1.5 transition-colors"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Fair Rent Split</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => setInquirySent(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                inquirySent
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
              }`}
            >
              {inquirySent ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Inquiry Sent to Host!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Book Tour / Inquire</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
