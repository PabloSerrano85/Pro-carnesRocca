import React, { useState } from 'react';
import { Award, Calculator, TrendingUp, CheckCircle2, Shield, Leaf, DollarSign } from 'lucide-react';

export const IncentivosView: React.FC = () => {
  const [cabezasMensuales, setCabezasMensuales] = useState<number>(150);
  const [pesoPromedio, setPesoPromedio] = useState<number>(420);

  // Cálculos del simulador:
  // Ahorro en flete interjurisdiccional: ~ $32.000 por cabeza trasladada a Santa Fe/Córdoba
  // Bonificación de alícuota ProCarne: ~ $9.500 por cabeza procesada en SDE
  // Valor agregado local generado:
  const ahorroFlete = cabezasMensuales * 32000;
  const bonificacionAlicuota = cabezasMensuales * 9500;
  const beneficioTotal = ahorroFlete + bonificacionAlicuota;
  const toneladasLocales = ((cabezasMensuales * pesoPromedio * 0.58) / 1000).toFixed(1); // rinde al gancho 58%

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-procarne-100 text-procarne-800 font-bold text-xs uppercase tracking-wide">
            Módulo VI: Política Productiva Provincial
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Programa de Incentivos a la Formalización y Faena en Origen
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-3xl mt-1 leading-relaxed">
            Herramienta diseñada para mitigar la salida de hacienda en pie santiagueña hacia frigoríficos de Santa Fe y Córdoba, promoviendo el valor agregado local, el arraigo y el empleo industrial en Santiago del Estero.
          </p>
        </div>

        {/* 3 Pilares del Programa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-procarne-300 transition">
            <div className="w-8 h-8 rounded-lg bg-procarne-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Alícuota Cero en Faena Local</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bonificación del 100% en tasas de fiscalización provincial para matarifes y frigoríficos que procesen hacienda con origen comprobado en Santiago del Estero.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-emerald-300 transition">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Sello AGROTRAZA Sustentable</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Puntaje crediticio preferencial en el Fondo de Desarrollo Productivo Provincial para campos y feedlots que cumplan el balance ambiental y trazabilidad fitosanitaria (Ley 27.279).
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 hover:border-amber-300 transition">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Prioridad Comercial en Carnicerías</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distintivo en vitrina con código QR público que certifica origen 100% Santiagueño e inocuidad garantizada por la Dirección de Agricultura y Ganadería.
            </p>
          </div>
        </div>

        {/* Indicador de Fuga de Faena */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-sgo-navy text-white rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1">
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">
              Objetivo Provincial 2026 - 2027
            </p>
            <h3 className="text-lg font-bold">
              Recuperación de Faena Local: Reducción del drenaje interjurisdiccional
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Actualmente se procesa el 42.5% del stock comercializado internamente. La meta del sistema ROCCA es alcanzar el 70% de faena en frigoríficos de la provincia (Forres-Beltrán, Añatuya, Frías).
            </p>
          </div>
          <div className="text-center bg-white/10 px-6 py-3.5 rounded-xl border border-white/20 shrink-0">
            <span className="text-3xl font-black text-amber-300">42.5%</span>
            <span className="block text-[11px] text-slate-200 font-medium mt-0.5">
              Faena en Plantas Locales
            </span>
          </div>
        </div>

        {/* Simulador Interactivo de Incentivo Económico */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Calculator className="w-5 h-5 text-procarne-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Simulador de Ahorro y Beneficios por Faena en Origen
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-medium mb-1">
                Cabezas a faenar por mes:
              </label>
              <input
                type="number"
                min="10"
                max="5000"
                value={cabezasMensuales}
                onChange={(e) => setCabezasMensuales(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">
                Peso promedio en pie (Kg):
              </label>
              <input
                type="number"
                min="200"
                max="600"
                value={pesoPromedio}
                onChange={(e) => setPesoPromedio(Math.max(100, Number(e.target.value)))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center">
              <span className="text-slate-500 text-[11px]">Carne Gancho Estimada:</span>
              <span className="text-base font-extrabold text-procarne-800">
                {toneladasLocales} Tn / mes
              </span>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 flex flex-col justify-center">
              <span className="text-emerald-700 text-[11px] font-semibold">
                Ahorro Total Estimado:
              </span>
              <span className="text-base font-extrabold text-emerald-800">
                $ {beneficioTotal.toLocaleString('es-AR')} / mes
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Ahorro en Fletes Vacunos:</strong> $ {ahorroFlete.toLocaleString('es-AR')} al evitar viajes a plantas foráneas.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Bonificación Fiscal ProCarne:</strong> $ {bonificacionAlicuota.toLocaleString('es-AR')} bajo régimen de Alícuota Cero.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
