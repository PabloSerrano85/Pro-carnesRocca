import React from 'react';
import { X, Printer, ShieldCheck, QrCode, CheckCircle2, Leaf } from 'lucide-react';
import { Operador } from '../../types';

interface ModalCertificadoProps {
  operador: Operador | null;
  onClose: () => void;
}

export const ModalCertificado: React.FC<ModalCertificadoProps> = ({
  operador,
  onClose,
}) => {
  if (!operador) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
          <span className="text-xs font-bold text-procarne-700 uppercase tracking-widest">
            Credencial Oficial Digital
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificado con marco de seguridad */}
        <div className="p-6 rounded-xl border-2 border-procarne-700 bg-gradient-to-b from-white via-slate-50 to-procarne-50/30 space-y-4 shadow-sm relative">
          <div className="text-center space-y-1">
            <div className="inline-block px-3 py-1 bg-procarne-800 text-white font-black text-xs tracking-widest uppercase rounded">
              Gobierno de Santiago del Estero
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight pt-1">
              REGISTRO DE OPERADORES Y CONTROL DE LA CADENA CÁRNICA
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Dirección General de Agricultura y Ganadería • Programa ProCarne Fiscalización
            </p>
          </div>

          <div className="p-3 bg-white border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Matrícula Provincial</span>
              <div className="font-mono text-xl font-black text-procarne-800">
                {operador.nroRocca}
              </div>
              <div className="text-xs font-mono text-slate-600">CUIT: {operador.cuit}</div>
            </div>

            {/* Simulación visual de código QR */}
            <div className="w-24 h-24 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white shrink-0 shadow-inner">
              <QrCode className="w-14 h-14 text-white" />
              <span className="text-[8px] font-mono tracking-tighter text-slate-300">
                VERIFICADO SGO
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Razón Social</span>
              <p className="font-bold text-slate-900 text-sm">{operador.razonSocial}</p>
              {operador.titular && (
                <p className="text-[11px] text-slate-500">Titular: {operador.titular}</p>
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Actividad</span>
              <p className="font-semibold text-slate-800">{operador.actividad}</p>
              <p className="text-[11px] text-slate-500">{operador.departamento}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Domicilio Legal</span>
              <p className="font-medium text-slate-800">{operador.domicilio}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Habilitación Sanitaria</span>
              <p className="font-medium text-slate-800">{operador.habilitacion}</p>
              <p className="text-[10px] text-emerald-700 font-semibold">Vto: {operador.fechaVencimiento}</p>
            </div>
          </div>

          {operador.agrotrazaSustentable && (
            <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Sello Verde AGROTRAZA Integrado:</strong> Cumplimiento ambiental y de gestión de residuos de producción (Ley Nac. 27.279).
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400">
            <span>Ley Nac. 22.375 • Ley Provincial 5.893/92</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Estado: {operador.estado}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" /> Imprimir Certificado de Habilitación
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg text-xs hover:bg-slate-50 cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
