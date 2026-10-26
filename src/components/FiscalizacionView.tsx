import React, { useState } from 'react';
import {
  FilePlus,
  AlertTriangle,
  Scale,
  HeartHandshake,
  Search,
  FileText,
} from 'lucide-react';
import { ActaInfraccion } from '../types';

interface FiscalizacionViewProps {
  actas: ActaInfraccion[];
  onOpenNuevaActa: () => void;
  onVerExpediente: (acta: ActaInfraccion) => void;
}

export const FiscalizacionView: React.FC<FiscalizacionViewProps> = ({
  actas,
  onOpenNuevaActa,
  onVerExpediente,
}) => {
  const [filterText, setFilterText] = useState('');

  const filteredActas = actas.filter((a) => {
    return (
      filterText === '' ||
      a.nroActa.toLowerCase().includes(filterText.toLowerCase()) ||
      a.operadorInfractor.toLowerCase().includes(filterText.toLowerCase()) ||
      a.lugar.toLowerCase().includes(filterText.toLowerCase()) ||
      a.expediente.toLowerCase().includes(filterText.toLowerCase()) ||
      a.infraccionDetectada.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const totalKilosDecomisados = actas.reduce(
    (acc, a) => acc + (a.kilosDecomisados || 0),
    4890 // base histórica
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Módulo III: Fiscalización, Actas y Decomisos Sanitarios
            </h2>
            <p className="text-xs text-slate-500">
              Marco Regulatorio: Cumplimiento Ley Federal de Carnes N° 22.375 y Ley Provincial N° 5.893/92
            </p>
          </div>
          <button
            onClick={onOpenNuevaActa}
            className="px-4 py-2.5 bg-procarne-700 hover:bg-procarne-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
          >
            <FilePlus className="w-4 h-4" /> Labrar Nueva Acta de Infracción
          </button>
        </div>

        {/* 3 Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-3">
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-red-600 font-bold uppercase">Decomisos Realizados</p>
              <h4 className="text-xl font-black text-red-900">{actas.length + 15} Actuaciones</h4>
              <p className="text-[10px] text-red-700">
                {(totalKilosDecomisados / 1000).toFixed(1)} Tn retiradas por faena clandestina / corte de frío
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-amber-600 font-bold uppercase">Clausuras Preventivas</p>
              <h4 className="text-xl font-black text-amber-900">4 Establecimientos</h4>
              <p className="text-[10px] text-amber-700">Dpto. Banda, Robles y Capital</p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-bold uppercase">Destino Comunitario / Donación</p>
              <h4 className="text-xl font-black text-emerald-900">100% Asignado</h4>
              <p className="text-[10px] text-emerald-700">
                Asoc. Protectoras conforme Art. 27 Ley 5.893
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de Actas Recientes */}
        <div className="border rounded-xl border-slate-200 overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Registro Oficial de Actas de Inspección y Sanciones
              </h4>
              <span className="text-[11px] text-slate-500">Área ProCarne - Fiscalización</span>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Buscar acta, expediente o infractor..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Acta N°</th>
                  <th className="py-2.5 px-3">Fecha y Lugar</th>
                  <th className="py-2.5 px-3">Operador / Infractor</th>
                  <th className="py-2.5 px-3">Infracción Detectada</th>
                  <th className="py-2.5 px-3">Medida Adoptada</th>
                  <th className="py-2.5 px-3">Destino del Decomiso</th>
                  <th className="py-2.5 px-3 text-right">Expediente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredActas.map((acta) => (
                  <tr key={acta.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono font-bold text-procarne-800">
                      {acta.nroActa}
                      <div className="text-[10px] text-slate-400 font-normal">
                        Insp: {acta.inspector}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{acta.fecha}</div>
                      <div className="text-[10px] text-slate-500">{acta.lugar}</div>
                    </td>
                    <td className="py-3 px-3 font-medium">
                      <div className="text-slate-900">{acta.operadorInfractor}</div>
                      {acta.cuitInfractor && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          CUIT: {acta.cuitInfractor}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-red-700 font-medium max-w-xs">
                      {acta.infraccionDetectada}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold inline-block">
                        {acta.medidaAdoptada}
                      </span>
                      {acta.kilosDecomisados ? (
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Total: {acta.kilosDecomisados.toLocaleString()} kg
                        </div>
                      ) : null}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-700">
                      {acta.destinoDecomiso}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => onVerExpediente(acta)}
                        className="text-procarne-700 font-bold hover:underline cursor-pointer inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        {acta.expediente}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
