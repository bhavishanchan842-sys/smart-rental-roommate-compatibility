import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthFlow from './components/AuthFlow';
import SearchRoomsPage from './pages/SearchRoomsPage';
import SearchSharedPGPage from './pages/SearchSharedPGPage';
import QuizPage from './pages/QuizPage';
import RentSplitterPage from './pages/RentSplitterPage';

export default function App() {
  // First experience: user sees Phone + OTP + Profile Setup
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('shared_pg'); // default to the shared PG discovery tab

  // Handle successful login and profile submission
  const handleAuthComplete = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSaveQuizProfile = (updatedProfile) => {
    setCurrentUser((prev) => ({
      ...prev,
      lifestyle_profile: {
        ...prev.lifestyle_profile,
        ...updatedProfile
      }
    }));
  };

  // 1. IF NOT LOGGED IN: SHOW PHONE NO + OTP + DETAILS ONBOARDING FLOW
  if (!isLoggedIn) {
    return <AuthFlow onAuthComplete={handleAuthComplete} />;
  }

  // 2. ONCE LOGGED IN: SHOW THE MAIN APPLICATION
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Page 1: Search Rooms or PGs */}
        {activeTab === 'rooms' && (
          <SearchRoomsPage />
        )}

        {/* Page 2: Search PG with Person Already Living There */}
        {activeTab === 'shared_pg' && (
          <SearchSharedPGPage currentUser={currentUser} />
        )}

        {/* Page 3: Roommate Compatibility Quiz */}
        {activeTab === 'quiz' && (
          <QuizPage
            currentUser={currentUser}
            onSaveProfile={handleSaveQuizProfile}
            onNavigate={setActiveTab}
          />
        )}

        {/* Page 4: Rent Splitter */}
        {activeTab === 'splitter' && (
          <RentSplitterPage />
        )}

      </main>

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />

    </div>
  );
}
