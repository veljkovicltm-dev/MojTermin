
import React, { useState } from 'react';
import { PlatformConfig, Business } from '../types';

interface PlatformDashboardProps {
  config: PlatformConfig;
  onUpdateConfig: (config: PlatformConfig) => void;
  businesses: Business[];
}

const PlatformDashboard: React.FC<PlatformDashboardProps> = ({ config, onUpdateConfig, businesses }) => {
  const [iban, setIban] = useState(config.iban);
  const [pib, setPib] = useState(config.pib);
  const [stripeKey, setStripeKey] = useState(config.stripeKey || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateConfig({ ...config, iban, pib, stripeKey });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-6 duration-500">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">MojTermin Settings</h1>
          <p className="text-slate-500 font-medium">Upravljaj svojim prihodima i mrežom salona</p>
        </div>
        <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100">
          Super Admin Mode
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-8 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl -mr-16 -mt-16"></div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 opacity-70">Ukupna zarada platforme</div>
              <div className="text-5xl font-black">284.500 <span className="text-xl">RSD</span></div>
              <div className="mt-6 flex items-center space-x-2 text-emerald-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5V2a1 1 0 112 0v5a1 1 0 01-1 1h-6zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-2-5a1 1 0 110-2h1a1 1 0 110 2H9zm1 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                <span className="text-xs font-bold">+18% ovog meseca</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Aktivni pretplatnici</div>
                <div className="text-5xl font-black text-slate-900">{businesses.length}</div>
              </div>
              <p className="text-xs text-slate-400 mt-4">Saloni koji plaćaju mesečnu licencu</p>
            </div>
          </div>

          {/* Owner Payment Settings */}
          <div className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100">
            <h3 className="text-2xl font-black text-slate-800 mb-8">Podešavanja tvog računa</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tvoj IBAN (Gde leže novac od pretplata)</label>
                  <input 
                    value={iban} 
                    onChange={e => setIban(e.target.value)}
                    placeholder="RS35..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 outline-none font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">PIB / MB Tvoje firme</label>
                  <input 
                    value={pib} 
                    onChange={e => setPib(e.target.value)}
                    placeholder="102..." 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stripe Secret Key (Za automatsku naplatu)</label>
                <input 
                  type="password"
                  value={stripeKey} 
                  onChange={e => setStripeKey(e.target.value)}
                  placeholder="sk_live_..." 
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-100 outline-none font-mono"
                />
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-slate-900 text-white font-black py-5 rounded-[24px] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center space-x-3"
              >
                {isSaving ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <span>Sačuvaj podešavanja platforme</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-2xl">
            <h3 className="font-black text-sm uppercase tracking-widest mb-6 opacity-80">Poslednje registracije</h3>
            <div className="space-y-6">
              {businesses.slice(0, 4).map(b => (
                <div key={b.id} className="flex items-center space-x-4">
                  <img src={b.image} className="w-10 h-10 rounded-xl object-cover border-2 border-white/20" alt="" />
                  <div className="flex-1">
                    <div className="text-xs font-black truncate">{b.name}</div>
                    <div className="text-[9px] opacity-60 uppercase font-bold">{b.city}</div>
                  </div>
                  <div className="text-[10px] font-black bg-white/10 px-2 py-1 rounded-lg">ACTIVE</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 text-[10px] uppercase tracking-widest mb-4">Brzi savet za vlasnika</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kao vlasnik platforme, tvoj cilj je da IBAN uvek bude tačan kako bi se izbegli problemi sa preusmeravanjem sredstava. 
              Koristi <strong>MojTermin Pro</strong> za potpuno automatizovan splitting provizija između tebe i salona.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
