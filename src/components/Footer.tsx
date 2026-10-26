import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-sgo-navy text-slate-400 text-xs py-6 border-t border-procarne-900 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-bold text-white text-sm">
            Dirección General de Agricultura y Ganadería • Programa ProCarne Fiscalización
          </p>
          <p className="text-[11px] text-slate-400">
            Ministerio de Producción, Recursos Naturales, Forestación, Tierras y Medio Ambiente
          </p>
          <p className="text-[10px] text-slate-500 mt-1">
            Andes N° 30, Torre Andes 8° Piso • Santiago del Estero • Tel: (0385) 4349800 Int. 1406
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ley Federal 22.375
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ley Provincial 5.893/92
          </span>
          <span className="flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AGROTRAZA Ley 27.279
          </span>
        </div>
      </div>
    </footer>
  );
};
