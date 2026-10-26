import React, { useState } from 'react';
import { FilePlus, X, Scale, HeartHandshake } from 'lucide-react';
import { ActaInfraccion } from '../../types';

interface ModalActaProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (acta: Omit<ActaInfraccion, 'id'>) => void;
}

export const ModalActa: React.FC<ModalActaProps> = ({ isOpen, onClose, onSubmit }) => {
  const [lugar, setLugar] = useState('');
  const [departamento, setDepartamento] = useState('Robles');
  const [operadorInfractor, setOperadorInfractor] = useState('');
  const [cuitInfractor, setCuitInfractor] = useState('');
  const [infraccionDetectada, setInfraccionDetectada] = useState(
    'Faena no autorizada sin control veterinario oficial'
  );
  const [kilosDecomisados, setKilosDecomisados] = useState('');
  const [medidaAdoptada, setMedidaAdoptada] = useState(
    'Decomiso preventivo total y Clausura Preventiva'
  );
  const [destinoDecomiso, setDestinoDecomiso] = useState(
    'Asociación Protectora Civil "Bichos y Amor" (Art. 27 Ley 5.893)'
  );
  const [inspector, setInspector] = useState('Dr. M. Villalba (Mat. Vet. 418)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNum = Math.floor(846 + Math.random() * 40);
    const nroActa = `ACTA-2026-0${nextNum}`;
    const expediente = `EXP-${Math.floor(4900 + Math.random() * 90)}/26`;

    onSubmit({
      nroActa,
      fecha: '26/Oct/2026',
      lugar: lugar.trim() || 'Vilmer, Dpto. Robles',
      departamento,
      operadorInfractor: operadorInfractor.trim(),
      cuitInfractor: cuitInfractor.trim() || undefined,
      infraccionDetectada,
      medidaAdoptada,
      kilosDecomisados: Number(kilosDecomisados) || undefined,
      destinoDecomiso,
      expediente,
      inspector,
      articuloLey: 'Art. 27 Ley Provincial N° 5.893/92 y Ley Nac. 22.375',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 text-red-800 rounded-lg">
              <FilePlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Labrar Nueva Acta de Infracción y Decomiso
              </h3>
              <p className="text-[10px] text-slate-500">
                Dirección General de Agricultura y Ganadería • Programa ProCarne
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
                Lugar del Operativo / Domicilio *
              </label>
              <input
                required
                type="text"
                placeholder="Ruta 34 Km 710 / Vilmer"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Departamento Provincial
              </label>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="Robles">Robles</option>
                <option value="Capital">Capital</option>
                <option value="Banda">Banda</option>
                <option value="General Taboada">General Taboada</option>
                <option value="Choya">Choya</option>
                <option value="Rivadavia">Rivadavia</option>
                <option value="Avellaneda">Avellaneda</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Operador / Infractor / Razón Social *
              </label>
              <input
                required
                type="text"
                placeholder="Nombre o Predio Rural"
                value={operadorInfractor}
                onChange={(e) => setOperadorInfractor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                CUIT / DNI del Responsable
              </label>
              <input
                type="text"
                placeholder="20-XXXXXXXX-X"
                value={cuitInfractor}
                onChange={(e) => setCuitInfractor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Infracción Detectada *
            </label>
            <select
              value={infraccionDetectada}
              onChange={(e) => setInfraccionDetectada(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
            >
              <option value="Faena no autorizada sin control veterinario oficial">
                Faena no autorizada sin control veterinario oficial (Faena clandestina)
              </option>
              <option value="Transporte de carnes sin cadena de frío ni habilitación UTF">
                Transporte de carnes sin cadena de frío ni habilitación UTF
              </option>
              <option value="Traspaso indebido de medias reses en vía pública">
                Traspaso indebido de medias reses en vía pública
              </option>
              <option value="Falta de Remito REC ARCA / DTE SENASA exigible">
                Falta de Remito REC ARCA / DTE SENASA exigible
              </option>
              <option value="Comercialización de carnes sin sellos sanitarios de fiscalización">
                Comercialización de carnes sin sellos sanitarios de fiscalización
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Kilos Decomisados
              </label>
              <input
                type="number"
                placeholder="Ej: 850"
                value={kilosDecomisados}
                onChange={(e) => setKilosDecomisados(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Medida Sanitaria
              </label>
              <select
                value={medidaAdoptada}
                onChange={(e) => setMedidaAdoptada(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="Decomiso preventivo total y Clausura Preventiva">
                  Decomiso preventivo y Clausura Preventiva
                </option>
                <option value="Decomiso y Destino Comunitario Protectoras">
                  Decomiso y Destino Comunitario Protectoras
                </option>
                <option value="Inutilización in situ por alteración bromatológica">
                  Inutilización in situ por alteración
                </option>
                <option value="Intervención de mercadería con apercibimiento">
                  Intervención de mercadería
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Destino del Decomiso (Art. 27 Ley 5.893/92)
            </label>
            <select
              value={destinoDecomiso}
              onChange={(e) => setDestinoDecomiso(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
            >
              <option value='Asociación Protectora Civil "Bichos y Amor"'>
                Asociación Protectora Civil "Bichos y Amor"
              </option>
              <option value="Refugios Caninos Oficiales y Comunitarios">
                Refugios Caninos Oficiales y Comunitarios
              </option>
              <option value="Asociación Protectora de Animales La Banda">
                Asociación Protectora de Animales La Banda
              </option>
              <option value="Digestión térmica / Inutilización sanitaria">
                Digestión térmica / Inutilización sanitaria
              </option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Inspector Actuante
            </label>
            <input
              type="text"
              value={inspector}
              onChange={(e) => setInspector(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 text-[11px] flex items-center gap-2">
            <Scale className="w-4 h-4 text-slate-500 shrink-0" />
            <span>
              Actuación bajo régimen de la Ley Provincial 5.893 y Ley Nacional 22.375 con remisión al Tribunal de Faltas.
            </span>
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
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow cursor-pointer flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4" /> Labrar Acta Oficial
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
