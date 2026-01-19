
import React from 'react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  onSelect: (business: Business) => void;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group cursor-pointer flex flex-col h-full"
      onClick={() => onSelect(business)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={business.image} 
          alt={business.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-indigo-600 flex items-center shadow-sm">
          ★ {business.rating}
        </div>
        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded font-bold">
          {business.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2">
          <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">{business.city}</div>
          <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight">{business.name}</h3>
        </div>
        <p className="text-sm text-slate-500 flex items-center mb-3">
          <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {business.address}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {business.services.length} Usluga dostupno
          </div>
          <button className="bg-slate-50 text-indigo-600 px-3 py-1 rounded-lg font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all">
            Zakaži
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
