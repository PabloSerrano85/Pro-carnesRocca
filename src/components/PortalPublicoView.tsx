import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle,
  AlertTriangle,
  QrCode,
  MapPin,
  Calendar,
  Building,
  Leaf,
  Flag,
} from 'lucide-react';
import { Operador } from '../types';

interface PortalPublicoViewProps {
  operadores: Operador[];
}

export const PortalPublicoView: React.FC<PortalPublicoViewProps> = ({ operadores }) => {
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchedOperador, setMatchedOperador] = useState<Operador | null>(null);
  const [denunciaAbierta, setDenunciaAbierta] = useState(false);
  const [denunciaEnviada, setDenunciaEnviada] = useState(false);

  const handleBuscar = (customQuery?: string) => {
    const q = (customQuery !== undefined ? customQuery : query).trim().toLowerCase();
    setSearched(true);

    if (!q) {
      setMatchedOperador(null);
      return;
    }

    const found = operadores.find(
      (op) =>
        op.cuit.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) ||
        op.cuit.toLowerCase().includes(q) ||
        op.nroRocca.toLowerCase().includes(q) ||
        op.razonSocial.toLowerCase().includes(q)
    );

    setMatchedOperador(found || null);
  };

  const handleSimularDefault = () => {
    setQuery('30-71490214-5');
    handleBuscar('30-71490214-5');
  };

  return (
    <div className="space-y-6">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md text-center space-y-5">
        <div className="w-16 h-16 bg-procarne-100 text-procarne-800 rounded-full flex items-center justify-center mx-auto shadow-inner border border-procarne-300">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs font-bold text-procarne-700 uppercase tracking-widest">
            Portal de Verificación Ciudadana
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Carnicería Segura • Operador Habilitado
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1">
            Consulte la legalidad, procedencia de los cortes y la habilitación sanitaria otorgada por la Dirección de Agricultura y Ganadería de Santiago del Estero.
          </p>
        </div>

        {/* Campo de búsqueda */}
        <div className="space-y-2 max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
              placeholder="Ingrese N° de CUIT o Código QR del comercio..."
              className="flex-grow px-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-procarne-700 focus:outline-none"
            />
            <button
              onClick={() => handleBuscar()}
              className="px-5 py-2.5 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-xl text-xs sm:text-sm transition shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-4 h-4" /> Verificar
            </button>
          </div>

          {/* Accesos rápidos de prueba */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <span>Ejemplos rápidos:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('30-71490214-5');
                handleBuscar('30-71490214-5');
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-mono cursor-pointer"
            >
              La Tradición (30-71490214-5)
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery('30-68912345-8');
                handleBuscar('30-68912345-8');
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[10px] font-mono cursor-pointer"
            >
              Forres-Beltrán
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery('20-19482716-3');
                handleBuscar('20-19482716-3');
              }}
              className="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-700 rounded text-[10px] font-mono cursor-pointer"
            >
              Sancionado (Río Dulce)
            </button>
          </div>
        </div>

        {/* Resultado de la Verificación */}
        {searched && matchedOperador && (
          <div
            className={`mt-6 text-left border rounded-xl p-5 space-y-4 shadow-xs ${
              matchedOperador.estado === 'Habilitado'
                ? 'bg-emerald-50/70 border-emerald-300'
                : matchedOperador.estado === 'En Trámite de Renovación'
                ? 'bg-amber-50/70 border-amber-300'
                : 'bg-red-50/70 border-red-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3.5 h-3.5 rounded-full ${
                    matchedOperador.estado === 'Habilitado'
                      ? 'bg-emerald-500'
                      : matchedOperador.estado === 'En Trámite de Renovación'
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                ></span>
                <span
                  className={`font-black text-sm tracking-wide ${
                    matchedOperador.estado === 'Habilitado'
                      ? 'text-emerald-900'
                      : matchedOperador.estado === 'En Trámite de Renovación'
                      ? 'text-amber-900'
                      : 'text-red-900'
                  }`}
                >
                  {matchedOperador.estado === 'Habilitado'
                    ? 'ESTABLECIMIENTO VERIFICADO Y HABILITADO'
                    : matchedOperador.estado === 'En Trámite de Renovación'
                    ? 'ESTABLECIMIENTO EN PROCESO DE RENOVACIÓN'
                    : 'ESTABLECIMIENTO SUSPENDIDO / CLAUSURA SANITARIA'}
                </span>
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                  matchedOperador.estado === 'Habilitado'
                    ? 'bg-emerald-200 text-emerald-900'
                    : matchedOperador.estado === 'En Trámite de Renovación'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-red-200 text-red-900'
                }`}
              >
                Vigencia {matchedOperador.fechaVencimiento}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div>
                <p className="text-slate-500 font-medium">Razón Social & Titular:</p>
                <p className="font-bold text-slate-900 text-sm">{matchedOperador.razonSocial}</p>
                {matchedOperador.titular && (
                  <p className="text-slate-600 text-[11px]">{matchedOperador.titular}</p>
                )}
              </div>
              <div>
                <p className="text-slate-500 font-medium">N° Registro ROCCA:</p>
                <p className="font-mono font-bold text-procarne-800 text-sm">
                  {matchedOperador.nroRocca}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">CUIT: {matchedOperador.cuit}</p>
              </div>
              <div>
                <p className="text-slate-500 font-medium">Origen de Cortes Declarado:</p>
                <p className="font-semibold text-slate-900">
                  {matchedOperador.origenPredominante || 'Frigorífico Forres-Beltrán (Robles)'}
                </p>
                {matchedOperador.agrotrazaSustentable && (
                  <span className="inline-flex items-center text-[10px] text-emerald-700 font-bold mt-0.5">
                    <Leaf className="w-3 h-3 mr-1" /> Sello Verde AGROTRAZA Activo
                  </span>
                )}
              </div>
              <div>
                <p className="text-slate-500 font-medium">Última Inspección Sanitaria:</p>
                <p className="font-semibold text-emerald-800">
                  18 de Octubre 2026 - Conforme ProCarne
                </p>
                <p className="text-[11px] text-slate-500">
                  Habilitación: {matchedOperador.habilitacion}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-600 gap-2">
              <span className="flex items-center gap-1 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {matchedOperador.domicilio}, {matchedOperador.departamento}
              </span>
              <span className="text-[10px] bg-white/70 px-2 py-0.5 rounded border border-slate-200 text-slate-500">
                Auditoría Digital SGO-ARCA
              </span>
            </div>
          </div>
        )}

        {searched && !matchedOperador && (
          <div className="mt-6 text-left border rounded-xl p-5 bg-red-50 border-red-200 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>No se encontró ningún operador registrado con el criterio: "{query}"</span>
            </div>
            <p className="text-xs text-red-700 leading-relaxed">
              El comercio consultado no figura en el padrón oficial del ROCCA o su habilitación no fue cargada. Si sospecha de faena clandestina o venta sin control veterinario, puede reportarlo directamente.
            </p>
            <div className="pt-1">
              <button
                onClick={() => setDenunciaAbierta(true)}
                className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Flag className="w-3.5 h-3.5" /> Radicar Reporte Anónimo a ProCarne
              </button>
            </div>
          </div>
        )}

        {/* Sección de Denuncia Ciudadana */}
        {denunciaAbierta && (
          <div className="mt-4 p-4 text-left bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-procarne-700" />
                Denuncia Anónima de Irregularidad Comercial / Faena Clandestina
              </h4>
              <button
                onClick={() => setDenunciaAbierta(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cerrar
              </button>
            </div>

            {denunciaEnviada ? (
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold">
                ✅ Reporte recibido. Número de seguimiento asignado: <strong>DEN-2026-9041</strong>. Los inspectores de ProCarne y Policía Rural han sido notificados.
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Dirección o ubicación del local o faena..."
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
                <textarea
                  placeholder="Describa la anomalía (falta de frío, carne sin sellos, faena nocturna, mal olor)..."
                  rows={2}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setDenunciaEnviada(true)}
                  className="px-4 py-2 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Enviar Reporte Confidencial
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
