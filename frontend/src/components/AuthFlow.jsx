import React, { useState } from 'react';
import { Phone, ShieldCheck, ArrowRight, User, CheckCircle2, Building, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthFlow({ onAuthComplete }) {
  // Step 1: 'phone' -> Step 2: 'otp' -> Step 3: 'details'
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  
  // Profile Details
  const [details, setDetails] = useState({
    full_name: '',
    gender: 'Male',
    age: 21,
    occupation: 'College Student',
    college: 'Engineering Institute of Technology',
    city: 'Bangalore',
    budget_max: 9500,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
  });

  // Step 1: Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.replace(/\D/g, '').length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep('otp');
    setOtpError('');
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Accept 1234 or any 4 digit OTP for presentation demo
    if (otp.length === 4) {
      setStep('details');
    } else {
      setOtpError('Please enter a 4-digit OTP (Use Demo OTP: 1234)');
    }
  };

  // Step 3: Submit User Details
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    onAuthComplete({
      id: Date.now(),
      phone: `+91 ${phoneNumber}`,
      ...details,
      lifestyle_profile: {
        sleep_schedule: 2,
        cleanliness: 4,
        noise_tolerance: 2,
        social_habits: 3,
        guest_frequency: 2,
        dietary_pref: "Vegetarian",
        smoking: "Non-smoker",
        drinking: "Non-drinker"
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Brand Banner Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 p-6 text-white text-center space-y-1.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-2 shadow-inner">
            <Building className="w-6 h-6 text-amber-300" />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">SmartRent & Match</h2>
          <p className="text-xs text-indigo-100 font-medium">
            Smart PGs, Rooms & Roommate Compatibility
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-4 px-6">
          <span className={`h-1.5 rounded-full transition-all ${step === 'phone' ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
          <span className={`h-1.5 rounded-full transition-all ${step === 'otp' ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
          <span className={`h-1.5 rounded-full transition-all ${step === 'details' ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'}`} />
        </div>

        {/* STEP 1: PHONE NUMBER */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Sign In with Phone</h3>
              <p className="text-xs text-slate-500">
                Enter your mobile number to get a verification code
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mobile Number
              </label>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-indigo-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 overflow-hidden transition-all">
                <span className="px-3.5 py-3 text-xs font-bold text-slate-600 border-r border-slate-200 bg-slate-100">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="98765 43210"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-sm font-semibold text-slate-900 p-3 bg-transparent focus:outline-none"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1.5">
                💡 Demo Mode: You can type any 10-digit number.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Get Verification OTP</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Verify Your Number</h3>
              <p className="text-xs text-slate-500">
                OTP sent to <span className="font-semibold text-slate-800">+91 {phoneNumber}</span>
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
                Enter 4-Digit OTP
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="1 2 3 4"
                className="w-full text-center text-2xl font-black tracking-widest text-indigo-700 p-3 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                autoFocus
              />
              {otpError && <p className="text-xs text-rose-500 text-center font-medium">{otpError}</p>}
            </div>

            {/* Quick Demo Helper */}
            <div className="bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
              <span className="text-xs text-indigo-900 font-medium">Demo Testing OTP: <strong>1234</strong></span>
              <button
                type="button"
                onClick={() => {
                  setOtp('1234');
                  setOtpError('');
                }}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 underline"
              >
                Auto-fill
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="py-3 px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify OTP</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: USER DETAILS ONBOARDING */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-slate-900">Complete Your Profile</h3>
              <p className="text-xs text-slate-500">
                Help us match you with compatible PGs and flatmates
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={details.full_name}
                onChange={(e) => setDetails({ ...details, full_name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Gender
                </label>
                <select
                  value={details.gender}
                  onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Age
                </label>
                <input
                  type="number"
                  min="17"
                  max="60"
                  value={details.age}
                  onChange={(e) => setDetails({ ...details, age: parseInt(e.target.value) || 20 })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Occupation
                </label>
                <select
                  value={details.occupation}
                  onChange={(e) => setDetails({ ...details, occupation: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="College Student">College Student</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Intern">Intern / Trainee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Target City
                </label>
                <select
                  value={details.city}
                  onChange={(e) => setDetails({ ...details, city: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  College, Workplace or Preferred Area
                </label>
                {details.college && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${details.college}, ${details.city}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md flex items-center gap-0.5 transition-colors"
                  >
                    📍 Check on Google Maps
                  </a>
                )}
              </div>
              <input
                type="text"
                value={details.college}
                onChange={(e) => setDetails({ ...details, college: e.target.value })}
                placeholder="e.g. Near Christ University, Koramangala"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                <span className="uppercase tracking-wider">Max Monthly Budget</span>
                <span className="text-indigo-600 font-extrabold">₹{details.budget_max}/mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="25000"
                step="500"
                value={details.budget_max}
                onChange={(e) => setDetails({ ...details, budget_max: parseInt(e.target.value) })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 pt-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Complete Profile & Start Searching</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
