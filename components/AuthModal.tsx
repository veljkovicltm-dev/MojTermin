
import React, { useState, useMemo } from 'react';
import { Category } from '../types';
import { translations, Language } from '../translations';

interface AuthModalProps {
  initialMode: 'login' | 'register';
  onClose: () => void;
  language: Language;
  platformIBAN?: string;
}

type UserType = 'client' | 'owner';

const AuthModal: React.FC<AuthModalProps> = ({ 
  initialMode, 
  onClose, 
  language,
  platformIBAN = 'RS35 1600 0000 1234 56' 
}) => {
  const t = translations[language];
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [userType, setUserType] = useState<UserType>('client');
  const [step, setStep] = useState(1);
  
  // Common State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Owner Specific State
  const [salonName, setSalonName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [subscription, setSubscription] = useState<'monthly' | 'six_months' | 'annual'>('monthly');
  const [salonCategory, setSalonCategory] = useState<Category>('Kozmetički saloni');
  const [staffNames, setStaffNames] = useState<string[]>(['']);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [salonImages, setSalonImages] = useState<string[]>([]);

  // Client Specific State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Generate a random reference number based on name and date
  const referenceNumber = useMemo(() => {
    const prefix = salonName.slice(0, 3).toUpperCase() || 'MTM';
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 900) + 100;
    return `97-${prefix}${datePart}${random}`;
  }, [salonName]);

  const amount = useMemo(() => {
    if (subscription === 'monthly') return 1200;
    if (subscription === 'six_months') return 5400;
    return 9600;
  }, [subscription]);

  const categories: Category[] = [
    'Kozmetički saloni', 'Frizerski saloni', 'Fitness i teretana', 
    'Spa i Wellness', 'Saloni za masažu', 'Medical'
  ];

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleStaffChange = (index: number, value: string) => {
    const newStaff = [...staffNames];
    newStaff[index] = value;
    setStaffNames(newStaff);
  };

  const addStaffField = () => setStaffNames([...staffNames, '']);
  const removeStaffField = (index: number) => setStaffNames(staffNames.filter((_, i) => i !== index));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isProfile: boolean) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (isProfile) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setProfileImage(reader.result as string);
        reader.readAsDataURL(file);
      }
    } else {
      const filesArray = Array.from(files);
      filesArray.forEach(file => {
        if (file instanceof Blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSalonImages(prev => {
              if (prev.length >= 20) return prev;
              return [...prev, reader.result as string];
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeSalonImage = (index: number) => {
    setSalonImages(prev => prev.filter((_, i) => i !== index));
  };

  const finishRegistration = () => {
    const successMsg = language === 'sr' 
      ? `Uspešna registracija! Vaših 7 dana besplatno počinje sada. Molimo Vas da izvršite uplatu po predračunu radi trajnog aktiviranja naloga na MojTermin platformi.`
      : `Success! Your 7-day free trial starts now. Please complete the payment per the proforma invoice for permanent activation on MojTermin platform.`;
    alert(successMsg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md overflow-y-auto">
      <div className={`bg-white w-full ${userType === 'owner' && step >= 4 ? 'max-w-3xl' : 'max-w-md'} rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-8`}>
        
        {/* Header */}
        <div className="p-8 pb-4 flex justify-between items-center border-b border-slate-50">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button 
              onClick={() => { setMode('login'); setStep(1); }}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              {language === 'sr' ? 'Prijava' : 'Login'}
            </button>
            <button 
              onClick={() => { setMode('register'); setStep(1); }}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              {language === 'sr' ? 'Registracija' : 'Register'}
            </button>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="p-8 pt-6">
          {mode === 'login' ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-2xl font-black text-slate-800">{language === 'sr' ? 'Dobrodošli nazad' : 'Welcome back'}</h2>
              <p className="text-slate-500 text-sm mb-6">{language === 'sr' ? 'Prijavite se da biste upravljali vašim terminima.' : 'Log in to manage your appointments.'}</p>
              <input type="email" placeholder="Email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
              <input type="password" placeholder={language === 'sr' ? 'Lozinka' : 'Password'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
              <button onClick={() => alert('Prijava...')} className="w-full bg-indigo-600 text-white font-bold py-5 rounded-[24px] shadow-xl shadow-indigo-100 mt-4">
                {language === 'sr' ? 'Prijavi se' : 'Log in'}
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4">
              {/* Step Indicators */}
              <div className="flex gap-2 mb-8">
                {Array.from({ length: userType === 'owner' ? 7 : 2 }).map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i + 1 <= step ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-slate-800">{language === 'sr' ? 'Koja je tvoja uloga?' : 'What is your role?'}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => { setUserType('client'); handleNext(); }}
                      className="p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left group"
                    >
                      <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      </div>
                      <div className="font-bold text-slate-800">{language === 'sr' ? 'Klijent' : 'Client'}</div>
                      <div className="text-xs text-slate-500 mt-1">{language === 'sr' ? 'Želim da zakazujem' : 'I want to book'}</div>
                    </button>
                    <button 
                      onClick={() => { setUserType('owner'); handleNext(); }}
                      className="p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all text-left group"
                    >
                      <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600 mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                      </div>
                      <div className="font-bold text-slate-800">{language === 'sr' ? 'Vlasnik' : 'Owner'}</div>
                      <div className="text-xs text-slate-500 mt-1">{language === 'sr' ? 'Želim da vodim biznis' : 'I want to run a business'}</div>
                    </button>
                  </div>
                </div>
              )}

              {/* OWNER FLOW */}
              {userType === 'owner' && (
                <>
                  {step === 2 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-black text-slate-800">{language === 'sr' ? 'Osnovni podaci' : 'Basic Info'}</h2>
                      <input value={salonName} onChange={e => setSalonName(e.target.value)} placeholder={language === 'sr' ? 'Naziv salona' : 'Salon Name'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                      <input value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder={language === 'sr' ? 'Ime i prezime odgovornog lica' : 'Full Name of Responsible Person'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={language === 'sr' ? 'Kontakt telefon' : 'Contact Phone'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email adresa" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                      <input type="password" placeholder={language === 'sr' ? 'Lozinka' : 'Password'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                      <button onClick={handleNext} className="w-full bg-indigo-600 text-white font-bold py-5 rounded-[24px] shadow-xl mt-4">
                        {language === 'sr' ? 'Nastavi na planove →' : 'Continue to plans →'}
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h2 className="text-2xl font-black text-slate-800 mb-2">{language === 'sr' ? 'Izaberite pretplatu' : 'Choose your plan'}</h2>
                        <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {language === 'sr' ? 'Svaki plan počinje sa 7 dana GRATIS' : 'Every plan starts with 7 days FREE'}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div 
                          onClick={() => setSubscription('monthly')}
                          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${subscription === 'monthly' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}
                        >
                          <div>
                            <div className="font-bold">{language === 'sr' ? 'Mesečna' : 'Monthly'}</div>
                            <div className="text-xs text-slate-500">{language === 'sr' ? '7 dana free + 1.200 RSD/mes' : '7 days free + 1,200 RSD/mo'}</div>
                          </div>
                          <div className="text-xl font-black text-indigo-600">1.200 <span className="text-xs">RSD</span></div>
                        </div>
                        <div 
                          onClick={() => setSubscription('six_months')}
                          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${subscription === 'six_months' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}
                        >
                          <div>
                            <div className="font-bold">{language === 'sr' ? '6 meseci' : '6 months'}</div>
                            <div className="text-xs text-slate-500">{language === 'sr' ? '7 dana free + Ušteda 1.800 RSD' : '7 days free + Save 1,800 RSD'}</div>
                          </div>
                          <div className="text-xl font-black text-indigo-600">5.400 <span className="text-xs">RSD</span></div>
                        </div>
                        <div 
                          onClick={() => setSubscription('annual')}
                          className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex justify-between items-center ${subscription === 'annual' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'}`}
                        >
                          <div>
                            <div className="font-bold">{language === 'sr' ? 'Godišnja' : 'Annual'}</div>
                            <div className="text-xs text-emerald-600 font-bold uppercase tracking-tighter">{language === 'sr' ? 'Najbolja vrednost + 7 dana GRATIS' : 'Best value + 7 days FREE'}</div>
                          </div>
                          <div className="text-xl font-black text-indigo-600">9.600 <span className="text-xs">RSD</span></div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button onClick={handlePrev} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl">{language === 'sr' ? 'Nazad' : 'Back'}</button>
                        <button onClick={handleNext} className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-2xl">{language === 'sr' ? 'Generiši predračun →' : 'Generate Invoice →'}</button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-2xl font-black text-slate-800">{t.payment.proformaTitle}</h2>
                          <p className="text-xs text-indigo-600 font-bold mt-1">
                            {language === 'sr' ? 'Pretplata se aktivira nakon uplate' : 'Subscription activates after payment'}
                          </p>
                        </div>
                        <div className="text-[10px] bg-slate-100 text-slate-400 px-3 py-1 rounded-full font-bold uppercase tracking-widest">Virmansko plaćanje</div>
                      </div>

                      {/* Visual Proforma / Payment Slip (Uplatnica) */}
                      <div className="bg-white border-2 border-slate-100 rounded-[32px] p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 px-4 py-1 bg-amber-100 text-amber-700 text-[8px] font-black uppercase tracking-widest rounded-bl-xl">
                          Nalog za uplatu
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Left Column */}
                          <div className="space-y-4">
                             <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{t.payment.recipient}</label>
                                <div className="text-sm font-black text-slate-800 leading-tight">
                                   MojTermin DOO <br/>
                                   Bulevar Kralja Petra 1 <br/>
                                   11000 Beograd
                                </div>
                             </div>
                             <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{t.payment.purpose}</label>
                                <div className="text-sm font-bold text-slate-600">
                                   Pretplata za MojTermin - {salonName || 'Salon'}
                                </div>
                             </div>
                          </div>

                          {/* Right Column */}
                          <div className="space-y-4 bg-slate-50 p-4 rounded-2xl">
                             <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                                <span className="text-[9px] font-black text-slate-400 uppercase">{t.payment.amount}</span>
                                <span className="text-lg font-black text-indigo-600">{amount.toLocaleString()} RSD</span>
                             </div>
                             <div>
                                <label className="text-[9px] font-black text-slate-400 uppercase">{t.payment.accountNumber}</label>
                                <div className="text-xs font-mono font-black text-slate-800">{platformIBAN}</div>
                             </div>
                             <div className="grid grid-cols-3 gap-2">
                                <div>
                                   <label className="text-[9px] font-black text-slate-400 uppercase">{t.payment.model}</label>
                                   <div className="text-xs font-mono font-black text-slate-800">97</div>
                                </div>
                                <div className="col-span-2">
                                   <label className="text-[9px] font-black text-slate-400 uppercase">{t.payment.referenceNumber}</label>
                                   <div className="text-xs font-mono font-black text-slate-800 truncate">{referenceNumber}</div>
                                </div>
                             </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start space-x-3">
                        <div className="mt-0.5 text-amber-600">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                        </div>
                        <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
                          {t.payment.notice}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                         <button onClick={() => alert('PDF predračun je preuzet.')} className="flex-1 bg-white border border-slate-200 text-slate-600 text-xs font-black py-4 rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest">
                           {t.payment.downloadPDF}
                         </button>
                         <button onClick={handleNext} className="flex-[2] bg-indigo-600 text-white font-black py-5 rounded-[24px] shadow-xl shadow-indigo-100 uppercase text-xs tracking-widest">
                           {t.payment.activateTrial}
                         </button>
                      </div>
                    </div>
                  )}

                  {step === 5 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-black text-slate-800">{language === 'sr' ? 'Detalji salona' : 'Salon Details'}</h2>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{language === 'sr' ? 'Vrsta salona' : 'Salon Category'}</label>
                        <select 
                          value={salonCategory} 
                          onChange={e => setSalonCategory(e.target.value as Category)}
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none cursor-pointer"
                        >
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{language === 'sr' ? 'Osoblje' : 'Staff'}</label>
                        <div className="space-y-3">
                          {staffNames.map((name, i) => (
                            <div key={i} className="flex gap-2">
                              <input 
                                value={name} 
                                onChange={e => handleStaffChange(i, e.target.value)}
                                placeholder={language === 'sr' ? "Ime zaposlenog" : "Staff name"} 
                                className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none" 
                              />
                              {staffNames.length > 1 && (
                                <button onClick={() => removeStaffField(i)} className="text-red-400 hover:text-red-600 p-2">✕</button>
                              )}
                            </div>
                          ))}
                          <button onClick={addStaffField} className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:underline">+ {language === 'sr' ? 'Dodaj osoblje' : 'Add staff'}</button>
                        </div>
                      </div>
                      <button onClick={handleNext} className="w-full bg-indigo-600 text-white font-bold py-5 rounded-[24px] shadow-xl">
                        {language === 'sr' ? 'Nastavi na slike →' : 'Continue to images →'}
                      </button>
                    </div>
                  )}

                  {step === 6 && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <h2 className="text-2xl font-black text-slate-800">{language === 'sr' ? 'Galerija i profil' : 'Gallery & Profile'}</h2>
                         <div className="text-[10px] bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-black uppercase tracking-wider">
                           {salonImages.length} / 10+ {language === 'sr' ? 'Slike' : 'Images'}
                         </div>
                      </div>
                      
                      <div className="flex flex-col items-center p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                        <label className="relative cursor-pointer group">
                          <div className="w-24 h-24 rounded-[30px] bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
                            {profileImage ? <img src={profileImage} className="w-full h-full object-cover" /> : <svg className="w-10 h-10 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
                          </div>
                          <div className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover:opacity-100 rounded-[30px] flex items-center justify-center transition-all">
                             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          </div>
                          <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, true)} />
                        </label>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">{language === 'sr' ? 'Profilna slika lokala' : 'Business Profile Image'}</span>
                      </div>

                      <div className="space-y-4">
                        <label className="block bg-white border-2 border-dashed border-slate-200 p-8 rounded-[30px] hover:border-indigo-400 transition-all group cursor-pointer text-center">
                          <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          </div>
                          <span className="text-sm font-bold text-slate-700">{language === 'sr' ? 'Izaberi slike sa uređaja' : 'Pick images from device'}</span>
                          <input 
                            type="file" 
                            multiple 
                            accept="image/*" 
                            className="hidden" 
                            onChange={e => handleImageUpload(e, false)} 
                          />
                        </label>

                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                           {Array.from({ length: Math.max(10, salonImages.length) }).map((_, i) => (
                             <div key={i} className={`group relative aspect-square rounded-2xl border ${salonImages[i] ? 'border-transparent' : 'border-slate-100 bg-slate-50'} overflow-hidden transition-all`}>
                               {salonImages[i] ? (
                                 <>
                                   <img src={salonImages[i]} className="w-full h-full object-cover" />
                                   <button 
                                     onClick={(e) => { e.stopPropagation(); removeSalonImage(i); }}
                                     className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                   >
                                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                                   </button>
                                 </>
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center text-slate-200">
                                   <span className="text-xl font-black">{i + 1}</span>
                                 </div>
                               )}
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button onClick={handlePrev} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl">{language === 'sr' ? 'Nazad' : 'Back'}</button>
                        <button 
                          onClick={handleNext} 
                          disabled={salonImages.length < 10}
                          className="flex-[2] bg-indigo-600 text-white font-black py-5 rounded-[24px] shadow-xl disabled:opacity-50 transition-all"
                        >
                          {salonImages.length < 10 ? (language === 'sr' ? `Još ${10 - salonImages.length} slika` : `${10 - salonImages.length} more images`) : (language === 'sr' ? 'Završi registraciju' : 'Complete Registration')}
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 7 && (
                    <div className="text-center space-y-6 py-8 animate-in zoom-in-50">
                       <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                         <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                       </div>
                       <h2 className="text-4xl font-black text-slate-800">{language === 'sr' ? 'Čestitamo!' : 'Congratulations!'}</h2>
                       <p className="text-slate-500 max-w-xs mx-auto">
                         {language === 'sr' 
                           ? 'Vaših 7 dana besplatno na MojTermin počinje sada. Podaci za uplatu su vam poslati na email.' 
                           : 'Your 7-day free trial on MojTermin starts now. Payment instructions have been sent to your email.'}
                       </p>
                       <button onClick={finishRegistration} className="w-full bg-slate-900 text-white font-bold py-5 rounded-[24px] shadow-xl">
                         {language === 'sr' ? 'Počni sa radom' : 'Get Started'}
                       </button>
                    </div>
                  )}
                </>
              )}

              {/* CLIENT FLOW */}
              {userType === 'client' && ( step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-black text-slate-800">{language === 'sr' ? 'Moji podaci' : 'My Info'}</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={language === 'sr' ? 'Ime' : 'First Name'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-100" />
                    <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder={language === 'sr' ? 'Prezime' : 'Last Name'} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-100" />
                  </div>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={language === 'sr' ? "Kontakt telefon" : "Phone"} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                  <input type="password" placeholder={language === 'sr' ? "Lozinka" : "Password"} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100" />
                  <button onClick={finishRegistration} className="w-full bg-indigo-600 text-white font-bold py-5 rounded-[24px] shadow-xl mt-4">
                    {language === 'sr' ? 'Završi registraciju' : 'Complete Registration'}
                  </button>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
