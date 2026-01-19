
import React, { useState, useEffect } from 'react';
import { Business, Booking, Staff } from '../types';
import { translations, Language } from '../translations';

interface AdminDashboardProps {
  business: Business;
  bookings: Booking[];
  onAddStaff: (staff: Staff) => void;
  onRemoveStaff: (id: string) => void;
  language: Language;
  onUpdateBookingStatus?: (bookingId: string, status: Booking['status']) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  business, 
  bookings, 
  onAddStaff, 
  onRemoveStaff,
  language,
  onUpdateBookingStatus 
}) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'calendar' | 'staff' | 'finances' | 'settings'>('calendar');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('');
  
  // Persisted Settings
  const [autoConfirm, setAutoConfirm] = useState(() => localStorage.getItem('setting_autoConfirm') === 'true');
  const [viberNotify, setViberNotify] = useState(() => localStorage.getItem('setting_viberNotify') === 'true');
  const [whatsappNotify, setWhatsappNotify] = useState(() => localStorage.getItem('setting_whatsappNotify') === 'true');
  const [isSaving, setIsSaving] = useState(false);

  // Finance State
  const [iban, setIban] = useState(() => localStorage.getItem('fin_iban') || '');
  const [pib, setPib] = useState(() => localStorage.getItem('fin_pib') || '');
  const [payoutFreq, setPayoutFreq] = useState(() => localStorage.getItem('fin_payoutFreq') || 'weekly');

  useEffect(() => {
    localStorage.setItem('setting_autoConfirm', autoConfirm.toString());
    localStorage.setItem('setting_viberNotify', viberNotify.toString());
    localStorage.setItem('setting_whatsappNotify', whatsappNotify.toString());
    localStorage.setItem('fin_iban', iban);
    localStorage.setItem('fin_pib', pib);
    localStorage.setItem('fin_payoutFreq', payoutFreq);
    
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 800);
    return () => clearTimeout(timer);
  }, [autoConfirm, viberNotify, whatsappNotify, iban, pib, payoutFreq]);

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName || !newStaffRole) return;
    onAddStaff({
      id: Math.random().toString(36).substr(2, 9),
      name: newStaffName,
      role: newStaffRole,
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
      specialties: []
    });
    setNewStaffName('');
    setNewStaffRole('');
  };

  const hours = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      {/* Trial Countdown Banner */}
      <div className="mb-6 bg-gradient-to-r from-indigo-600 to-violet-700 p-4 rounded-[24px] text-white flex flex-col md:flex-row items-center justify-between shadow-lg shadow-indigo-100 border border-white/10">
        <div className="flex items-center space-x-4 mb-3 md:mb-0">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest opacity-80">{t.trial.daysLeft}</div>
            <div className="text-xl font-black">7 {language === 'sr' ? 'DANA' : 'DAYS'}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="text-right hidden md:block">
             <div className="text-[10px] font-black uppercase tracking-tighter opacity-70">{t.trial.billingNotice}</div>
             <div className="text-[10px] font-black uppercase tracking-tighter opacity-70">{t.trial.cancelAnytime}</div>
           </div>
           <button 
             onClick={() => alert('Trial cancelled.')}
             className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/20"
           >
             {language === 'sr' ? 'OTKAŽI TRIAL' : 'CANCEL TRIAL'}
           </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-slate-900">{business.name}</h1>
            {isSaving && <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full animate-pulse uppercase font-bold tracking-widest">Saving...</span>}
          </div>
          <p className="text-slate-500">{language === 'sr' ? 'Admin Panel & Automatizacija' : 'Admin Panel & Automation'}</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          {['calendar', 'staff', 'finances', 'settings'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap capitalize ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {tab === 'calendar' ? (language === 'sr' ? 'Kalendar' : 'Calendar') : 
               tab === 'staff' ? (language === 'sr' ? 'Osoblje' : 'Staff') : 
               tab === 'finances' ? (language === 'sr' ? 'Finansije' : 'Finances') : 
               (language === 'sr' ? 'Podešavanja' : 'Settings')}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'calendar' && (
        <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
            <div>
              <h2 className="text-xl font-black text-slate-800">{language === 'sr' ? 'Dnevni Monitor' : 'Daily Monitor'}</h2>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                {language === 'sr' ? 'Danas' : 'Today'}: {new Date().toLocaleDateString(language === 'sr' ? 'sr-RS' : 'en-US')}
              </div>
            </div>
            <div className="flex items-center space-x-6">
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                   {language === 'sr' ? 'Garantovano karticom' : 'Card Guaranteed'}
                 </span>
               </div>
               <div className="flex items-center space-x-2">
                 <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                   {language === 'sr' ? 'Obična rezervacija' : 'Standard Booking'}
                 </span>
               </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[900px] grid grid-cols-[100px_repeat(auto-fit,minmax(200px,1fr))] border-b border-slate-50">
              <div className="p-6"></div>
              {business.staff.map(member => (
                <div key={member.id} className="p-6 border-l border-slate-50 text-center bg-white">
                  <img src={member.avatar} className="w-12 h-12 rounded-2xl mx-auto mb-3 border-2 border-slate-50 shadow-sm object-cover" alt="" />
                  <div className="font-black text-sm text-slate-800 tracking-tight">{member.name}</div>
                  <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{member.role}</div>
                </div>
              ))}
            </div>

            <div className="min-w-[900px]">
              {hours.map(hour => (
                <div key={hour} className="grid grid-cols-[100px_repeat(auto-fit,minmax(200px,1fr))] border-b border-slate-50/50 group hover:bg-slate-50/20 transition-colors">
                  <div className="p-6 text-xs font-black text-slate-300 flex items-center justify-center font-mono">{hour}</div>
                  {business.staff.map(member => {
                    const bookingAtTime = bookings.find(b => b.time === hour && b.staffId === member.id);
                    const isNoShow = bookingAtTime?.status === 'no-show';

                    return (
                      <div key={`${hour}-${member.id}`} className="p-3 border-l border-slate-50 h-32 relative">
                        {bookingAtTime ? (
                          <div className={`absolute inset-3 rounded-3xl p-4 shadow-sm border-l-4 flex flex-col justify-between transition-transform hover:scale-[1.02] cursor-pointer group/booking ${
                            isNoShow ? 'bg-red-50 border-red-500' :
                            bookingAtTime.paymentStatus === 'guaranteed' 
                            ? 'bg-amber-50/50 border-amber-500' 
                            : 'bg-indigo-50/50 border-indigo-600'
                          }`}>
                            <div>
                               <div className="flex justify-between items-start">
                                 <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">
                                   {isNoShow ? (language === 'sr' ? 'Nedolazak' : 'No-Show') : bookingAtTime.serviceName}
                                 </span>
                                 {bookingAtTime.paymentStatus === 'guaranteed' && !isNoShow && (
                                   <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-sm" title="Garantovano karticom">
                                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                                   </div>
                                 )}
                               </div>
                               <div className="text-sm font-black text-slate-800 mt-1 leading-tight">{bookingAtTime.customerName}</div>
                            </div>
                            
                            <div className="absolute inset-0 bg-white/95 rounded-3xl p-3 flex flex-col justify-center opacity-0 group-hover/booking:opacity-100 transition-opacity z-20">
                               <div className="text-[10px] font-black text-slate-400 uppercase mb-2 text-center">{language === 'sr' ? 'Akcije' : 'Actions'}</div>
                               <div className="space-y-2">
                                  {bookingAtTime.paymentStatus === 'guaranteed' && !isNoShow && (
                                    <button 
                                      onClick={() => alert(`Naplaćen penal od ${(bookingAtTime.price * 0.5).toFixed(0)} RSD klijentu ${bookingAtTime.customerName}`)}
                                      className="w-full bg-red-600 text-white text-[10px] font-black py-2 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all uppercase"
                                    >
                                      {language === 'sr' ? 'Naplati penal' : 'Charge Penalty'}
                                    </button>
                                  )}
                                  <button className="w-full bg-slate-100 text-slate-600 text-[10px] font-black py-2 rounded-xl hover:bg-slate-200 transition-all uppercase">
                                    {language === 'sr' ? 'Završeno' : 'Done'}
                                  </button>
                               </div>
                            </div>

                            <div className="flex items-center space-x-2">
                               {viberNotify && <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>}
                               <span className="text-[8px] font-bold text-slate-400 uppercase">
                                 {isNoShow ? (language === 'sr' ? 'PENAL NAPLAĆEN' : 'PENALTY CHARGED') : 
                                  bookingAtTime.paymentStatus === 'guaranteed' ? (language === 'sr' ? 'GARANTOVANO' : 'GUARANTEED') : 
                                  (language === 'sr' ? 'REZERVISANO' : 'BOOKED')}
                               </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-light text-2xl">+</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {activeTab === 'staff' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {business.staff.map(member => (
              <div key={member.id} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl transition-all">
                <div className="flex items-center space-x-5">
                  <div className="relative">
                    <img src={member.avatar} className="w-16 h-16 rounded-[24px] border-4 border-white shadow-lg object-cover" alt="" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 text-lg tracking-tight">{member.name}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveStaff(member.id)}
                  className="text-slate-200 hover:text-red-500 transition-colors p-3 rounded-2xl hover:bg-red-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100 h-fit sticky top-24">
            <h3 className="text-xl font-black text-slate-800 mb-6">{language === 'sr' ? 'Novi zaposleni' : 'New Staff'}</h3>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <input 
                type="text" 
                value={newStaffName}
                onChange={(e) => setNewStaffName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-medium transition-all" 
                placeholder={language === 'sr' ? "Ime i prezime" : "Full Name"}
              />
              <input 
                type="text" 
                value={newStaffRole}
                onChange={(e) => setNewStaffRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-100 outline-none text-sm font-medium transition-all" 
                placeholder={language === 'sr' ? "Pozicija (npr. Senior Barber)" : "Position"}
              />
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white font-black py-5 rounded-[24px] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100"
              >
                {language === 'sr' ? 'Dodaj u Tim' : 'Add to Team'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Finances Tab */}
      {activeTab === 'finances' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4">
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16"></div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 relative z-10">{language === 'sr' ? 'Dostupno za isplatu' : 'Available for payout'}</div>
                <div className="text-5xl font-black text-slate-900 relative z-10">42.500 <span className="text-xl">RSD</span></div>
                <button className="mt-8 w-full bg-emerald-600 text-white font-black py-4 rounded-3xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 relative z-10">
                  {language === 'sr' ? 'Isplati na račun' : 'Payout to bank'}
                </button>
              </div>
              <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-3xl -mr-16 -mt-16"></div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 opacity-60 relative z-10">{language === 'sr' ? 'Garantovani penali' : 'Guaranteed Penalties'}</div>
                <div className="text-5xl font-black relative z-10">8.400 <span className="text-xl">RSD</span></div>
                <p className="text-[10px] mt-6 text-slate-400 font-bold uppercase tracking-widest relative z-10 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                  {language === 'sr' ? 'Sredstva od No-Show naplata' : 'Funds from No-Show charges'}
                </p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center">
                {language === 'sr' ? 'Povezivanje bankovnog računa' : 'Link Bank Account'}
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">IBAN / Broj računa</label>
                    <input 
                      value={iban} 
                      onChange={e => setIban(e.target.value)}
                      placeholder="RS35..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-indigo-100 outline-none font-mono text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">PIB / MB</label>
                    <input 
                      value={pib} 
                      onChange={e => setPib(e.target.value)}
                      placeholder="1098..." 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 focus:ring-2 focus:ring-indigo-100 outline-none text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
               <h3 className="font-black text-slate-800 mb-6 uppercase text-[10px] tracking-widest">{language === 'sr' ? 'Aktivnost plaćanja' : 'Payment Activity'}</h3>
               <div className="space-y-6">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className="flex justify-between items-center pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600">
                           <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-800">{language === 'sr' ? 'Garancija karticom' : 'Card Guarantee'}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{language === 'sr' ? 'Korisnik verifikovan' : 'Verified User'}</div>
                        </div>
                     </div>
                     <div className="text-indigo-600 font-black text-sm">Garant</div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-8 animate-in zoom-in-95">
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <h3 className="text-xl font-black mb-8 text-slate-800 uppercase tracking-tight">{language === 'sr' ? 'Pravila nedolaska (No-show)' : 'No-Show Rules'}</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-amber-50 rounded-[30px] border border-amber-100">
                <div>
                  <div className="font-black text-amber-900">{language === 'sr' ? 'Naplata penala' : 'Charge Penalties'}</div>
                  <div className="text-sm text-amber-700 font-medium mt-1">{language === 'sr' ? 'Sistem omogućava naplatu 50% cene' : 'System enables 50% price charging'}</div>
                </div>
                <div className="w-14 h-7 bg-amber-600 rounded-full relative">
                  <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
