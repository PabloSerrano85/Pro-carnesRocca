import React from 'react';
import { X, FileText, Scale, Printer, CheckCircle, ShieldAlert } from 'lucide-react';
import { ActaInfraccion } from '../../types';

interface ModalExpedienteProps {
  acta: ActaInfraccion | null;
  onClose: () => void;
}

export const ModalExpediente: React.FC<ModalExpedienteProps> = ({ acta, onClose }) => {
  if (!acta) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 text-red-800 rounded-lg">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Expediente Administrativo Oficial
              </h3>
              <p className="text-[10px] text-slate-500 font-mono">
                {acta.expediente} • {acta.nroActa}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Estado</span>
              <p className="font-bold text-red-700">En Trámite Administrativo Sancionatorio</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Fecha Acta</span>
              <p className="font-semibold text-slate-800">{acta.fecha}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold">Infractor</span>
              <p className="font-bold text-slate-900">{acta.operadorInfractor}</p>
              {acta.cuitInfractor && (
                <p className="font-mono text-[10px] text-slate-500">CUIT: {acta.cuitInfractor}</p>
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold">Lugar y Dpto.</span>
              <p className="font-semibold text-slate-800">{acta.lugar}</p>
              <p className="text-[10px] text-slate-500">{acta.departamento}</p>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400 font-bold">Infracción</span>
            <p className="font-semibold text-red-800 mt-0.5">{acta.infraccionDetectada}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-200">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold">Medida Cautelar</span>
              <p className="font-semibold text-slate-800">{acta.medidaAdoptada}</p>
              {acta.kilosDecomisados && (
                <p className="text-procarne-700 font-bold text-[11px]">
                  {acta.kilosDecomisados.toLocaleString()} Kg decomisados
                </p>
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold">
                Destino del Decomiso
              </span>
              <p className="font-semibold text-emerald-800">{acta.destinoDecomiso}</p>
              <p className="text-[10px] text-slate-500">Art. 27 Ley Prov. 5.893/92</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] uppercase text-slate-400 font-bold">Inspector Actuante</span>
            <p className="font-medium text-slate-800">{acta.inspector}</p>
            <p className="text-[10px] text-slate-500">{acta.articuloLey}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Imprimir Copia de Notificación
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
