import React from 'react';
import {
  LayoutDashboard,
  Users,
  Truck,
  ShieldAlert,
  Award,
  QrCode,
  Radio,
} from 'lucide-react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  operadoresCount: number;
  remitosCount: number;
  actasCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  operadoresCount,
  remitosCount,
  actasCount,
}) => {
  const tabs = [
    {
      id: 'dashboard' as TabType,
      label: 'Módulo IV: Monitor Estratégico',
      icon: LayoutDashboard,
    },
    {
      id: 'operadores' as TabType,
      label: 'Módulo I: Operadores',
      icon: Users,
      badge: operadoresCount,
    },
    {
      id: 'movimientos' as TabType,
      label: 'Módulos II & VII: Remitos REC y Tránsito',
      icon: Truck,
      badge: remitosCount,
    },
    {
      id: 'fiscalizacion' as TabType,
      label: 'Módulo III: Fiscalización en Ruta',
      icon: ShieldAlert,
      badge: actasCount,
    },
    {
      id: 'incentivos' as TabType,
      label: 'Módulo VI: Faena en Origen',
      icon: Award,
    },
    {
      id: 'portal' as TabType,
      label: 'Módulo V: Portal Público',
      icon: QrCode,
    },
  ];

  return (
    <header className="bg-gradient-to-r from-sgo-navy via-slate-900 to-procarne-900 text-white shadow-md border-b-2 border-procarne-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        {/* Marca & Subsecretaría */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-procarne-700 flex items-center justify-center font-bold text-white shadow-inner border border-procarne-500 text-xl tracking-wider select-none">
            R
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Gobierno de Santiago del Estero
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-400/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                AGROTRAZA Integrado
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              ROCCA{' '}
              <span className="text-xs font-normal text-slate-300 hidden md:inline">
                | Registro de Operadores y Control de la Cadena Cárnica
              </span>
            </h1>
            <p className="text-[11px] text-slate-300">
              Dirección General de Agricultura y Ganadería • ProCarne Fiscalización
            </p>
          </div>
        </div>

        {/* Estado de Cruce Federal & Nodo Provincial */}
        <div className="flex items-center gap-3 text-xs bg-black/35 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
          <div className="flex flex-col text-right">
            <span className="font-semibold text-slate-100 flex items-center justify-end gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Interconexión Federal Activa
            </span>
            <span className="text-[10px] text-slate-400">
              ARCA (REC) • SENASA (SIGSA) • SDE AGROTRAZA
            </span>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></div>
        </div>
      </div>

      {/* Navegación por Módulos */}
      <nav className="bg-white border-t border-slate-200 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-3 overflow-x-auto py-2 text-xs sm:text-sm text-slate-600 font-medium scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'border border-procarne-700 text-procarne-800 bg-procarne-50 font-bold shadow-xs'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-procarne-700' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-procarne-700 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
