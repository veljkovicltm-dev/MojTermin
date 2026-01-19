import React from 'react';
import { translations, Language } from '../translations';

interface LandingPageProps {
  onStart: (role: 'customer' | 'owner') => void;
  onDownload: () => void;
  language: Language;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onDownload, language }) => {
  const t = translations[language];
  const hero = t.hero;
  const pricing = t.pricing;

  return (
    <div className="bg-slate-50 min-h-screen animate-fade-in">
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-600 text-xs font-black uppercase tracking-widest animate-bounce">
              {hero.badge}
            </div>
            <div className="px-4 py-2 rounded-full bg-indigo-600 shadow-lg shadow-indigo-100 text-white text-xs font-black uppercase tracking-widest animate-pulse">
              {hero.trialBadge}
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-none animate-slide-up">
            {hero.title} <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{hero.titleSpan}</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up delay-100 opacity-0">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200 opacity-0">
            <button 
              onClick={() => onStart('owner')}
              className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              {hero.ctaRegister}
            </button>
            <button 
              onClick={() => onStart('customer')}
              className="w-full sm:w-auto bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all hover:scale-105 active:scale-95"
            >
              {hero.ctaExplore}
            </button>
          </div>
          
          <div className="mt-12 text-slate-400 text-[10px] uppercase tracking-[0.3em]">
            * <span className="font-black text-slate-900 opacity-100">{language === 'sr' ? 'BEZ NAPLATE PRVIH 7 DANA' : 'NO CHARGES FOR FIRST 7 DAYS'}</span> 
            <span className="opacity-60"> • {language === 'sr' ? 'Otkažite bilo kad' : 'Cancel anytime'}</span>
          </div>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 group p-6 rounded-[32px] hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
              <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3 className="text-xl font-black text-slate-800">{language === 'sr' ? '7 Dana Besplatno' : '7 Days Free Trial'}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {language === 'sr' 
                  ? 'Isprobajte sve premium funkcije platforme bez ijednog uloženog dinara.' 
                  : 'Try all premium features of the platform without spending a single cent.'}
              </p>
            </div>
            <div className="space-y-4 group p-6 rounded-[32px] hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
              <div className="w-16 h-16 bg-violet-50 rounded-3xl flex items-center justify-center text-violet-600 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.954 0 0112 2.944a11.954 11.954 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <h3 className="text-xl font-black text-slate-800">{language === 'sr' ? 'Garancija karticom' : 'Card Guarantee'}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {language === 'sr' 
                  ? 'Naplati 50% cene klijentima koji se ne pojave. Zaštitite svoje vreme.' 
                  : 'Charge 50% of the price to no-show clients automatically. Protect your time.'}
              </p>
            </div>
            <div className="space-y-4 group p-6 rounded-[32px] hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
              <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              </div>
              <h3 className="text-xl font-black text-slate-800">Viber & WhatsApp</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {language === 'sr' 
                  ? 'Automatske notifikacije direktno tvojim zaposlenima. Nema više zaboravljenih termina.' 
                  : 'Automated notifications directly to your staff. No more forgotten appointments.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{pricing.title}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
              {pricing.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Monthly */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{pricing.monthly}</div>
              <div className="mb-8">
                <span className="text-5xl font-black text-slate-900">1.200</span>
                <span className="text-xl font-black text-slate-400 ml-1">RSD</span>
                <div className="text-xs text-slate-400 mt-1 font-bold">{pricing.perMonth}</div>
              </div>
              <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-8 text-center">
                {pricing.trialInfo}
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {pricing.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => onStart('owner')} className="w-full py-4 bg-slate-50 text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase text-xs tracking-widest border border-slate-200">
                {language === 'sr' ? 'Počni besplatno' : 'Start Free'}
              </button>
            </div>

            {/* Annual - Best Value */}
            <div className="bg-slate-900 p-10 rounded-[40px] shadow-2xl flex flex-col relative overflow-hidden scale-105 z-10 hover:-translate-y-2 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/30 blur-3xl -mr-16 -mt-16"></div>
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs font-black text-indigo-400 uppercase tracking-widest">{pricing.annual}</div>
                <div className="bg-indigo-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {pricing.bestValue}
                </div>
              </div>
              <div className="mb-8 text-white">
                <span className="text-5xl font-black">9.600</span>
                <span className="text-xl font-black opacity-50 ml-1">RSD</span>
                <div className="text-xs opacity-50 mt-1 font-bold">{pricing.total}</div>
                <div className="text-emerald-400 text-xs font-black mt-2 uppercase tracking-tighter">
                  {pricing.save} 4.800 RSD
                </div>
              </div>
              <div className="bg-white/10 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-8 text-center border border-white/10">
                {pricing.trialInfo}
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {pricing.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-white/80">
                    <svg className="w-5 h-5 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => onStart('owner')} className="w-full py-5 bg-indigo-600 text-white font-black rounded-3xl hover:bg-indigo-500 transition-all uppercase text-xs tracking-widest shadow-lg shadow-indigo-900/20">
                {pricing.ctaRegister || 'Započni besplatno'}
              </button>
            </div>

            {/* 6 Months */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">{pricing.sixMonths}</div>
              <div className="mb-8">
                <span className="text-5xl font-black text-slate-900">5.400</span>
                <span className="text-xl font-black text-slate-400 ml-1">RSD</span>
                <div className="text-xs text-slate-400 mt-1 font-bold">{pricing.total}</div>
                <div className="text-indigo-600 text-xs font-black mt-2 uppercase tracking-tighter">
                  {pricing.save} 1.800 RSD
                </div>
              </div>
              <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest mb-8 text-center">
                {pricing.trialInfo}
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {pricing.features.map((f, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => onStart('owner')} className="w-full py-4 bg-slate-50 text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all uppercase text-xs tracking-widest border border-slate-200">
                {language === 'sr' ? 'Počni besplatno' : 'Start Free'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;