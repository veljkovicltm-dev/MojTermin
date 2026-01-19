import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AIAssistant from './components/AIAssistant';
import BusinessCard from './components/BusinessCard';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import PlatformDashboard from './components/PlatformDashboard';
import { MOCK_BUSINESSES } from './constants';
import { Business, Booking, PlatformConfig } from './types';
import { Language } from './translations';

const App: React.FC = () => {
  // Navigation & View State
  const [view, setView] = useState<'home' | 'dashboard' | 'ai' | 'admin_settings'>('home');
  const [language, setLanguage] = useState<Language>('sr');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Data State
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>({
    iban: 'RS35 1600 0000 1234 56',
    pib: '109876543'
  });

  // Business Owner State (Simulated login)
  const [myBusiness] = useState<Business>(MOCK_BUSINESSES[0]);

  const handleBooking = (newBooking: Omit<Booking, 'id' | 'status'>) => {
    const booking: Booking = {
      ...newBooking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'confirmed'
    };
    setBookings([booking, ...bookings]);
    setSelectedBusiness(null);
    setView('dashboard');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="animate-fade-in">
            <LandingPage 
              language={language} 
              onStart={(role) => {
                if (role === 'owner') {
                  setAuthMode('register');
                  setIsAuthOpen(true);
                } else {
                  document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onDownload={() => setView('admin_settings')}
            />
            
            <section id="explore-section" className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {language === 'sr' ? 'Istraži salone' : 'Explore Salons'}
                  </h2>
                  <p className="text-slate-500 font-medium">
                    {language === 'sr' ? 'Najbolje ocenjeni u tvojoj blizini' : 'Top rated near you'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_BUSINESSES.map(b => (
                  <BusinessCard key={b.id} business={b} onSelect={setSelectedBusiness} />
                ))}
              </div>
            </section>
          </div>
        );

      case 'ai':
        return <AIAssistant language={language} />;

      case 'dashboard':
        return (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <AdminDashboard 
              business={myBusiness} 
              bookings={bookings.filter(b => b.businessId === myBusiness.id)}
              language={language}
              onAddStaff={(s) => console.log('Staff added:', s)}
              onRemoveStaff={(id) => console.log('Staff removed:', id)}
            />
          </div>
        );

      case 'admin_settings':
        return (
          <PlatformDashboard 
            config={platformConfig} 
            businesses={MOCK_BUSINESSES}
            onUpdateConfig={setPlatformConfig}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header 
        currentView={view}
        onViewChange={setView}
        language={language}
        onLanguageChange={setLanguage}
        onAuthOpen={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
        onDownloadOpen={() => setView('admin_settings')}
      />

      <main>
        {renderContent()}
      </main>

      {/* Modals */}
      {selectedBusiness && (
        <BookingModal 
          business={selectedBusiness} 
          language={language}
          onClose={() => setSelectedBusiness(null)}
          onBook={handleBooking}
        />
      )}

      {isAuthOpen && (
        <AuthModal 
          initialMode={authMode} 
          language={language}
          onClose={() => setIsAuthOpen(false)}
        />
      )}

      {/* Mobile Quick Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50">
        <button onClick={() => setView('home')} className={`p-2 transition-colors ${view === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
        </button>
        <button onClick={() => setView('ai')} className={`p-2 transition-colors ${view === 'ai' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </button>
        <button onClick={() => setView('dashboard')} className={`p-2 transition-colors ${view === 'dashboard' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        </button>
      </nav>
    </div>
  );
};

export default App;