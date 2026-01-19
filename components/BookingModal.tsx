
import React, { useState } from 'react';
import { Business, Service, Booking, Staff } from '../types';
import { Language } from '../translations';

interface BookingModalProps {
  business: Business;
  onClose: () => void;
  onBook: (booking: Omit<Booking, 'id' | 'status'>) => void;
  language: Language;
}

const BookingModal: React.FC<BookingModalProps> = ({ business, onClose, onBook, language }) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // Payment State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !date || !time) return;

    setIsProcessing(true);
    // Simulating secure card vaulting (not charging yet)
    setTimeout(() => {
      onBook({
        businessId: business.id,
        serviceId: selectedService.id,
        staffId: selectedStaff?.id,
        businessName: business.name,
        serviceName: selectedService.name,
        staffName: selectedStaff?.name,
        date,
        time,
        customerName: 'Korisnik Test',
        price: selectedService.price,
        paymentStatus: 'guaranteed'
      });
      setIsProcessing(false);
    }, 1500);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="relative h-28 bg-indigo-600 p-8 flex items-end">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div className="text-white">
            <h2 className="text-xl font-bold">{business.name}</h2>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${i <= step ? 'bg-white' : 'bg-white/30'}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Izaberite uslugu</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {business.services.map((service) => (
                  <div 
                    key={service.id}
                    onClick={() => { setSelectedService(service); nextStep(); }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedService?.id === service.id 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-slate-800">{service.name}</div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-slate-500 font-medium">{service.duration} min</span>
                      <span className="text-indigo-600 font-black">{service.price} RSD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Izaberite osobu (Opciono)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div 
                  onClick={() => { setSelectedStaff(null); nextStep(); }}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${
                    selectedStaff === null ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">Bilo ko</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Najbrži termin</div>
                  </div>
                </div>
                {business.staff.map((member) => (
                  <div 
                    key={member.id}
                    onClick={() => { setSelectedStaff(member); nextStep(); }}
                    className={`p-5 rounded-3xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${
                      selectedStaff?.id === member.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100'
                    }`}
                  >
                    <img src={member.avatar} className="w-12 h-12 rounded-2xl object-cover shadow-sm" alt="" />
                    <div>
                      <div className="font-bold text-slate-800">{member.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={prevStep} className="mt-8 text-indigo-600 font-bold text-sm">← Nazad</button>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 space-y-6">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Datum i vreme</label>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Datum</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-100 outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Satnica</label>
                  <select 
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer appearance-none"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Izaberi sat</option>
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase mb-1">Pregled</div>
                  <div className="font-black text-slate-800 text-lg">{selectedService?.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{selectedStaff ? selectedStaff.name : 'Bilo ko'}</div>
                </div>
                <div className="text-right">
                   <div className="text-2xl font-black text-slate-800">{selectedService?.price} <span className="text-xs">RSD</span></div>
                   <div className="text-[10px] text-slate-400 font-bold uppercase">Plaćanje u salonu</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="button" onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl">Nazad</button>
                <button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!date || !time}
                  className="flex-[2] bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 disabled:opacity-50"
                >
                  Garantuj termin →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Garancija termina</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">Vaša kartica neće biti zadužena odmah.</p>
                  </div>
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
               </div>

               {/* Card Component */}
               <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl text-white shadow-2xl aspect-[1.6/1] flex flex-col justify-between overflow-hidden relative border border-slate-700">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full -mr-24 -mt-24"></div>
                  <div className="flex justify-between items-start relative z-10">
                     <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                        </div>
                        <div className="text-[8px] opacity-60 font-black uppercase tracking-[0.2em]">Secure Guarantee</div>
                     </div>
                  </div>
                  <div className="text-2xl font-mono tracking-[0.3em] relative z-10 drop-shadow-md">
                    {cardNumber ? cardNumber.replace(/(.{4})/g, '$1 ') : '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-end relative z-10">
                     <div>
                        <div className="text-[7px] opacity-40 uppercase font-black tracking-widest">Nosilac garancije</div>
                        <div className="text-sm font-bold uppercase tracking-wider">{cardName || 'FULL NAME'}</div>
                     </div>
                     <div className="flex space-x-1 opacity-50">
                        <div className="w-6 h-4 bg-white/20 rounded"></div>
                        <div className="w-6 h-4 bg-white/20 rounded"></div>
                     </div>
                  </div>
               </div>

               <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start space-x-3">
                  <div className="mt-0.5 text-amber-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
                  </div>
                  <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
                    Sistem <strong>neće skinuti novac</strong> sa vaše kartice. Kartica služi isključivo kao garancija. 
                    U slučaju da se ne pojavite bez prethodnog otkazivanja (min 24h ranije), lokal zadržava pravo naplate penala u iznosu od <strong>50% cene usluge</strong>.
                  </p>
               </div>

               <div className="space-y-4">
                  <input 
                    required 
                    value={cardName} 
                    onChange={e => setCardName(e.target.value)} 
                    placeholder="Ime i prezime na kartici" 
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100 font-medium" 
                  />
                  <div className="flex gap-4">
                    <input 
                      required 
                      maxLength={16} 
                      value={cardNumber} 
                      onChange={e => setCardNumber(e.target.value)} 
                      placeholder="Broj kartice" 
                      className="flex-[2] bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-indigo-100 font-mono text-lg" 
                    />
                    <input required placeholder="CVV" maxLength={3} className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none text-center" />
                  </div>
               </div>

               <div className="flex gap-4">
                  <button type="button" onClick={prevStep} className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl">Nazad</button>
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="flex-[2] bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-100 flex items-center justify-center space-x-2"
                  >
                    {isProcessing ? (
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <span>Potvrdi garanciju</span>
                    )}
                  </button>
               </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
