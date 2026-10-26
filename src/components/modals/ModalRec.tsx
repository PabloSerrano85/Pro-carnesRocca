import React, { useState } from 'react';
import { FileText, X, CheckCircle, Leaf } from 'lucide-react';
import { RemitoREC, EspecieCarne } from '../../types';

interface ModalRecProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (remito: Omit<RemitoREC, 'id'>) => void;
}

export const ModalRec: React.FC<ModalRecProps> = ({ isOpen, onClose, onSubmit }) => {
  const [nroREC, setNroREC] = useState('');
  const [nroDTE, setNroDTE] = useState('');
  const [especie, setEspecie] = useState<EspecieCarne>('Bovino');
  const [kilos, setKilos] = useState('');
  const [origenEstablecimiento, setOrigenEstablecimiento] = useState('');
  const [origenProvincia, setOrigenProvincia] = useState('Santiago del Estero (Faena Local)');
  const [destinoOperador, setDestinoOperador] = useState('');
  const [destinoCuit, setDestinoCuit] = useState('');
  const [agrotrazaCertificado, setAgrotrazaCertificado] = useState(true);
  const [detalleCortes, setDetalleCortes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedRec = nroREC.trim().toUpperCase().startsWith('REC-')
      ? nroREC.trim().toUpperCase()
      : `REC-${nroREC.trim().toUpperCase()}`;

    onSubmit({
      nroREC: formattedRec,
      nroDTE: nroDTE.trim().toUpperCase(),
      especie,
      kilos: Number(kilos) || 1000,
      origenEstablecimiento: origenEstablecimiento.trim(),
      origenProvincia,
      destinoOperador: destinoOperador.trim(),
      destinoCuit: destinoCuit.trim() || '30-71049281-2',
      estadoValidacion: origenProvincia.includes('Santiago') ? 'Faena Local + REC' : 'ARCA OK',
      recepcionEstado: 'Confirmado QR',
      fecha: new Date().toISOString().slice(0, 10),
      agrotrazaCertificado,
      detalleCortes: detalleCortes.trim() || 'Medias reses tipificadas',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-procarne-100 text-procarne-800 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Declarar Movimiento Cárnico (REC)
              </h3>
              <p className="text-[10px] text-slate-500">
                Cruce ARCA / SENASA / Sistema Provincial SDE
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

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                N° Remito REC (ARCA) *
              </label>
              <input
                required
                type="text"
                placeholder="REC-0418-29182"
                value={nroREC}
                onChange={(e) => setNroREC(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                N° DT-e / DUT de Faena *
              </label>
              <input
                required
                type="text"
                placeholder="26-112-901"
                value={nroDTE}
                onChange={(e) => setNroDTE(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Especie</label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value as EspecieCarne)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="Bovino">Bovino</option>
                <option value="Porcino">Porcino</option>
                <option value="Caprino">Caprino (Cabrito Santiagueño)</option>
                <option value="Ovino">Ovino</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Cantidad en Kilogramos *
              </label>
              <input
                required
                type="number"
                placeholder="Ej: 3500"
                value={kilos}
                onChange={(e) => setKilos(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Planta de Faena / Origen *
              </label>
              <input
                required
                type="text"
                placeholder="Ej: Frigorífico Forres Beltrán"
                value={origenEstablecimiento}
                onChange={(e) => setOrigenEstablecimiento(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Provincia de Origen
              </label>
              <select
                value={origenProvincia}
                onChange={(e) => setOrigenProvincia(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="Santiago del Estero (Faena Local)">Santiago del Estero (Faena Local)</option>
                <option value="Córdoba">Córdoba</option>
                <option value="Santa Fe">Santa Fe</option>
                <option value="Tucumán">Tucumán</option>
                <option value="Salta">Salta</option>
                <option value="Buenos Aires">Buenos Aires</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Operador Destinatario (ROCCA SDE) *
              </label>
              <input
                required
                type="text"
                placeholder="Ej: Carnicería La Tradición"
                value={destinoOperador}
                onChange={(e) => setDestinoOperador(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                CUIT del Destinatario
              </label>
              <input
                type="text"
                placeholder="30-71490214-5"
                value={destinoCuit}
                onChange={(e) => setDestinoCuit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Detalle de Cortes / Medias Reses
            </label>
            <input
              type="text"
              placeholder="Ej: 16 Medias Reses con sello ProCarne e Inocuidad"
              value={detalleCortes}
              onChange={(e) => setDetalleCortes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
            />
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] text-emerald-900 font-medium">
                Sello AGROTRAZA Sostenible (Trazabilidad ambiental Ley 27.279)
              </span>
            </div>
            <input
              type="checkbox"
              checked={agrotrazaCertificado}
              onChange={(e) => setAgrotrazaCertificado(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-lg shadow cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" /> Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
