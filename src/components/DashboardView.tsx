import React from 'react';
import {
  CheckCircle2,
  Plus,
  ShieldCheck,
  Beef,
  MapPinOff,
  Store,
  AlertOctagon,
  Radio,
  XCircle,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { DashboardCharts } from './DashboardCharts';
import { ControlRuta, Operador } from '../types';

interface DashboardViewProps {
  onOpenRecModal: () => void;
  onOpenOperativoModal: () => void;
  onOpenOperadorModal?: () => void;
  onSelectActa: (actaId: string) => void;
  controles: ControlRuta[];
  operadores: Operador[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenRecModal,
  onOpenOperativoModal,
  onOpenOperadorModal,
  onSelectActa,
  controles,
  operadores,
}) => {
  const habilitadosCount = operadores.filter((op) => op.estado === 'Habilitado').length;
  const porcentajeHabilitados = ((habilitadosCount / operadores.length) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Banner Balance de Masa & AGROTRAZA */}
      <div className="bg-gradient-to-r from-procarne-800 to-procarne-900 text-white rounded-xl p-5 sm:p-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5 relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
            <CheckCircle2 className="w-3.5 h-3.5" /> Convenio ExpoBRA Activo (Sept 2026)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Balance Dinámico de la Cadena Cárnica Provincial
          </h2>
          <p className="text-xs text-slate-200 leading-relaxed">
            Integración en tiempo real de Remitos REC (ARCA), DTE ganadero (SIGSA) y trazabilidad fitosanitaria/ambiental (AGROTRAZA - Ley 27.279).
          </p>
        </div>
        <div className="flex items-center gap-2.5 relative z-10 flex-wrap">
          {onOpenOperadorModal && (
            <button
              onClick={onOpenOperadorModal}
              className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs shadow transition flex items-center gap-1.5 cursor-pointer"
            >
              <Store className="w-4 h-4" /> Inscribir Operador
            </button>
          )}
          <button
            onClick={onOpenRecModal}
            className="px-3.5 py-2.5 bg-white text-procarne-900 font-bold rounded-lg text-xs shadow hover:bg-slate-100 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-procarne-700" /> Declarar REC
          </button>
          <button
            onClick={onOpenOperativoModal}
            className="px-3.5 py-2.5 bg-procarne-600 text-white font-bold rounded-lg text-xs shadow border border-procarne-400 hover:bg-procarne-500 transition flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" /> Nuevo Operativo
          </button>
        </div>
      </div>

      {/* Tarjetas KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tarjeta 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-procarne-200 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Faena Local Provincial
              </p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
                42,850 <span className="text-xs font-medium text-slate-500">cabezas</span>
              </h3>
            </div>
            <div className="p-2.5 rounded-lg bg-procarne-50 text-procarne-700 border border-procarne-200">
              <Beef className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +12.4%
            </span>
            <span className="text-slate-500">vs trimestre anterior</span>
          </div>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-200 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Ingreso Extraprovincial
              </p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
                1,840.5 <span className="text-xs font-medium text-slate-500">Tn / Mes</span>
              </h3>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <MapPinOff className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-amber-600 font-bold">58% prov. Córdoba / Sta Fe</span>
            <span className="text-slate-500">bajo control REC</span>
          </div>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-200 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Operadores Registrados
              </p>
              <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
                1,428 <span className="text-xs font-normal text-slate-400">({operadores.length} activos en padrón)</span>
              </h3>
            </div>
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              <Store className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-blue-600 font-bold">{porcentajeHabilitados}%</span>
            <span className="text-slate-500">con habilitación vigente</span>
          </div>
        </div>

        {/* Tarjeta 4: Decomisos y Fiscalización */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-red-200 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Decomisos Clandestinos
              </p>
              <h3 className="text-2xl font-extrabold text-procarne-700 mt-1">
                7,480 <span className="text-xs font-medium text-slate-500">Kg</span>
              </h3>
            </div>
            <div className="p-2.5 rounded-lg bg-red-50 text-red-700 border border-red-200">
              <AlertOctagon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-procarne-700 font-semibold">100% donado</span>
            <span className="text-slate-500">según Art. 27 Ley 5.893/92</span>
          </div>
        </div>
      </div>

      {/* Gráficos del Sistema Estratégico */}
      <DashboardCharts />

      {/* Alertas en Tiempo Real de Fiscalización en Ruta */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">
              Monitoreo de Rutas & Puestos de Control (Ruta 34, 9 y Dpto. Banda)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Actualizado en vivo</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Puesto / Zona</th>
                <th className="py-2.5 px-3">Vehículo / CUIT</th>
                <th className="py-2.5 px-3">Mercadería</th>
                <th className="py-2.5 px-3">Documentación</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {controles.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {c.puesto}
                    <div className="text-[10px] text-slate-400 font-normal">Hora: {c.hora}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-slate-800">{c.vehiculo}</span>
                    <div className="text-[10px] text-slate-500 font-mono">
                      Patente: {c.patente} • CUIT: {c.cuit}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium">
                    {c.mercaderia}
                  </td>
                  <td className="py-3 px-3">
                    {c.documentacionValida ? (
                      <span className="inline-flex items-center text-emerald-600 font-semibold gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> {c.documentacion}
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600 font-semibold gap-1">
                        <XCircle className="w-3.5 h-3.5" /> {c.documentacion}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        c.estado === 'Intervenido / Decomiso'
                          ? 'bg-red-100 text-red-800'
                          : c.estado === 'Liberado en Tránsito'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {c.actaRef ? (
                      <button
                        onClick={() => onSelectActa(c.actaRef!)}
                        className="text-procarne-700 hover:text-procarne-900 font-semibold underline cursor-pointer"
                      >
                        Ver {c.actaRef}
                      </button>
                    ) : (
                      <span className="text-slate-500">Conforme</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
