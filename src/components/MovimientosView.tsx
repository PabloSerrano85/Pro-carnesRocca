import React, { useState } from 'react';
import {
  QrCode,
  Leaf,
  Check,
  X,
  CheckCheck,
  Clock,
  AlertTriangle,
  Plus,
  Search,
} from 'lucide-react';
import { RemitoREC } from '../types';

interface MovimientosViewProps {
  remitos: RemitoREC[];
  onAddRemito: (remito: Omit<RemitoREC, 'id'>) => void;
  onUpdateRecepcion: (id: string, nuevoEstado: 'Confirmado QR' | 'Pendiente Destino' | 'Rechazado') => void;
  onOpenNuevoModal: () => void;
}

export const MovimientosView: React.FC<MovimientosViewProps> = ({
  remitos,
  onAddRemito,
  onUpdateRecepcion,
  onOpenNuevoModal,
}) => {
  // Estado local para el formulario de validación rápida en pantalla
  const [inputRec, setInputRec] = useState('');
  const [inputDte, setInputDte] = useState('');
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Filtros de tabla
  const [filtroEspecie, setFiltroEspecie] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleValidarYRegistrar = (tipo: 'aceptar' | 'rechazar') => {
    if (!inputRec.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Por favor ingrese el N° de Remito REC para validar.',
      });
      return;
    }

    const nroRecNormalizado = inputRec.toUpperCase().trim();
    const existing = remitos.find((r) => r.nroREC.toUpperCase() === nroRecNormalizado);

    if (existing) {
      onUpdateRecepcion(
        existing.id,
        tipo === 'aceptar' ? 'Confirmado QR' : 'Rechazado'
      );
      setStatusMessage({
        type: tipo === 'aceptar' ? 'success' : 'error',
        text: tipo === 'aceptar'
          ? `✅ Remito ${existing.nroREC} validado contra ARCA y SIGSA. Recepción confirmada exitosamente.`
          : `⚠️ Remito ${existing.nroREC} marcado como Rechazado por operador de destino.`,
      });
    } else {
      // Registrar nuevo movimiento conforme o rechazado
      onAddRemito({
        nroREC: nroRecNormalizado.startsWith('REC-') ? nroRecNormalizado : `REC-${nroRecNormalizado}`,
        nroDTE: inputDte.trim() || '26-092-2026-DTE',
        especie: 'Bovino',
        kilos: 2500,
        origenEstablecimiento: 'Frigorífico Certificado SDE',
        origenProvincia: 'Santiago del Estero',
        destinoOperador: 'Boca de Expendio Local',
        destinoCuit: '30-71049281-2',
        estadoValidacion: tipo === 'aceptar' ? 'ARCA OK' : 'Observado / Incompleto',
        recepcionEstado: tipo === 'aceptar' ? 'Confirmado QR' : 'Rechazado',
        fecha: new Date().toISOString().slice(0, 10),
        agrotrazaCertificado: true,
        detalleCortes: 'Medias reses trazadas en origen',
      });

      setStatusMessage({
        type: tipo === 'aceptar' ? 'success' : 'error',
        text: tipo === 'aceptar'
          ? `✅ Remito ${nroRecNormalizado} validado en ARCA/SIGSA y registrado con conformidad.`
          : `⚠️ Remito ${nroRecNormalizado} registrado con acta de rechazo de carga.`,
      });
    }

    setInputRec('');
    setInputDte('');
  };

  const filteredRemitos = remitos.filter((r) => {
    const matchesEspecie = filtroEspecie === '' || r.especie === filtroEspecie;
    const matchesSearch =
      searchQuery === '' ||
      r.nroREC.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.origenEstablecimiento.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.destinoOperador.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nroDTE.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEspecie && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Panel de Trazabilidad REC / Cruce ARCA - SENASA - AGROTRAZA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tarjeta de Declaración / Validación Cárnica */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="p-2 bg-procarne-100 text-procarne-800 rounded-lg">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Validar Remito REC Cárnico
                </h3>
                <p className="text-[11px] text-slate-500">
                  Conformidad de recepción en destino obligado
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs mt-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  N° de Remito Electrónico Cárnico (REC - ARCA)
                </label>
                <input
                  type="text"
                  value={inputRec}
                  onChange={(e) => setInputRec(e.target.value)}
                  placeholder="Ej: REC-0001-00094821"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  DTE / DT-e de Origen (SIGSA SENASA)
                </label>
                <input
                  type="text"
                  value={inputDte}
                  onChange={(e) => setInputDte(e.target.value)}
                  placeholder="Ej: 26-0492-2026-DTE"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-800 space-y-1">
                <div className="flex items-center gap-1 font-semibold text-[11px]">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Verificación AGROTRAZA Sostenible:
                </div>
                <p className="text-[10px] text-emerald-700 leading-tight">
                  Lote con certificación de trazabilidad de insumos y devolución de envases fitosanitarios (Ley Nac. 27.279).
                </p>
              </div>

              {statusMessage && (
                <div
                  className={`p-2.5 rounded-lg text-[11px] font-medium ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : statusMessage.type === 'error'
                      ? 'bg-red-100 text-red-800 border border-red-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleValidarYRegistrar('aceptar')}
                  className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs shadow flex justify-center items-center gap-1.5 transition cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Aceptar Conforme
                </button>
                <button
                  type="button"
                  onClick={() => handleValidarYRegistrar('rechazar')}
                  className="flex-1 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg text-xs border border-red-300 flex justify-center items-center gap-1.5 transition cursor-pointer"
                >
                  <X className="w-4 h-4" /> Rechazar Carga
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={onOpenNuevoModal}
              className="w-full py-2 border border-procarne-700 text-procarne-800 hover:bg-procarne-50 font-bold rounded-lg text-xs flex justify-center items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Declarar Movimiento Completo
            </button>
          </div>
        </div>

        {/* Listado de Movimientos Cárnicos Declarados */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Flujo de Tránsito Cárnico Interjurisdiccional e Interno
              </h3>
              <p className="text-[11px] text-slate-500">
                Módulo VII: Declaración de ingresos de medias reses y cortes a Santiago del Estero
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                Total: {filteredRemitos.length} envíos
              </span>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="sm:col-span-2 relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por REC, DTE, Frigorífico o Destino..."
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <select
                value={filtroEspecie}
                onChange={(e) => setFiltroEspecie(e.target.value)}
                className="w-full py-1.5 px-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="">Todas las Especies</option>
                <option value="Bovino">Bovino</option>
                <option value="Porcino">Porcino</option>
                <option value="Caprino">Caprino</option>
                <option value="Ovino">Ovino</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Remito REC</th>
                  <th className="py-2.5 px-3">Origen / Frigorífico</th>
                  <th className="py-2.5 px-3">Destino (Operador ROCCA)</th>
                  <th className="py-2.5 px-3">Kg / Especie</th>
                  <th className="py-2.5 px-3">Validación</th>
                  <th className="py-2.5 px-3 text-right">Recepción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredRemitos.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-procarne-800">{r.nroREC}</span>
                      <div className="text-[10px] text-slate-400 font-mono">DTE: {r.nroDTE}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-900">{r.origenEstablecimiento}</div>
                      <div className="text-[10px] text-slate-500">{r.origenProvincia}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-slate-800">{r.destinoOperador}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.destinoCuit}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold">
                      {r.kilos.toLocaleString()} kg{' '}
                      <span className="text-[10px] font-normal text-slate-500">
                        ({r.especie})
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.estadoValidacion === 'ARCA OK'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.estadoValidacion === 'Faena Local + REC'
                            ? 'bg-blue-100 text-blue-800'
                            : r.estadoValidacion === 'En Tránsito RN 34'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {r.estadoValidacion}
                      </span>
                      {r.agrotrazaCertificado && (
                        <div className="text-[9px] text-emerald-700 font-medium mt-0.5 flex items-center">
                          <Leaf className="w-2.5 h-2.5 mr-0.5" /> Sello Verde
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {r.recepcionEstado === 'Confirmado QR' && (
                        <span className="inline-flex items-center text-emerald-600 font-bold text-[11px]">
                          <CheckCheck className="w-3.5 h-3.5 mr-1" /> Confirmado QR
                        </span>
                      )}
                      {r.recepcionEstado === 'Pendiente Destino' && (
                        <div className="inline-flex flex-col items-end">
                          <span className="inline-flex items-center text-amber-600 font-bold text-[11px]">
                            <Clock className="w-3.5 h-3.5 mr-1" /> Pendiente Destino
                          </span>
                          <button
                            onClick={() => onUpdateRecepcion(r.id, 'Confirmado QR')}
                            className="text-[10px] text-procarne-700 hover:underline font-semibold cursor-pointer"
                          >
                            Dar Conformidad
                          </button>
                        </div>
                      )}
                      {r.recepcionEstado === 'Rechazado' && (
                        <span className="inline-flex items-center text-red-600 font-bold text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Rechazado
                        </span>
                      )}
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
