import React, { useState } from 'react';
import { ShieldCheck, X, Check } from 'lucide-react';
import { ControlRuta } from '../../types';

interface ModalOperativoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (control: Omit<ControlRuta, 'id'>) => void;
}

export const ModalOperativo: React.FC<ModalOperativoProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [puesto, setPuesto] = useState('Palo Negro - RN 34 (Límite Santa Fe)');
  const [vehiculo, setVehiculo] = useState('Furgón Térmico Habilitado');
  const [patente, setPatente] = useState('');
  const [cuit, setCuit] = useState('');
  const [mercaderia, setMercaderia] = useState('');
  const [kilos, setKilos] = useState('');
  const [documentacion, setDocumentacion] = useState('REC Validado ARCA + DTE SENASA');
  const [documentacionValida, setDocumentacionValida] = useState(true);
  const [estado, setEstado] = useState<
    'Liberado en Tránsito' | 'Intervenido / Decomiso' | 'En Inspección Sanitaria'
  >('Liberado en Tránsito');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const hora = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')} hs`;

    onSubmit({
      puesto,
      vehiculo,
      patente: patente.trim().toUpperCase() || 'AE-319-ZX',
      cuit: cuit.trim() || '30-71049281-2',
      mercaderia: mercaderia.trim() || 'Medias reses bovinas frescas',
      kilos: Number(kilos) || 2000,
      documentacion,
      documentacionValida,
      estado,
      actaRef: estado === 'Intervenido / Decomiso' ? `ACTA-2026-${Math.floor(840 + Math.random() * 50)}` : undefined,
      hora,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-procarne-100 text-procarne-800 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Nuevo Operativo de Fiscalización en Ruta
              </h3>
              <p className="text-[10px] text-slate-500">
                Puestos de control interprovinciales e interjurisdiccionales
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
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Puesto / Zona de Control
            </label>
            <select
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
            >
              <option value="Palo Negro - RN 34 (Límite Santa Fe)">
                Palo Negro - RN 34 (Límite Santa Fe)
              </option>
              <option value="La Banda - Rotonda Autopista">
                La Banda - Rotonda Autopista
              </option>
              <option value="Ruta Nacional 9 - Puesto San Marcos">
                Ruta Nacional 9 - Puesto San Marcos
              </option>
              <option value="Ruta Prov. 5 - La Cañada / Figueroa">
                Ruta Prov. 5 - La Cañada / Figueroa
              </option>
              <option value="Puesto Frías - RN 157 (Límite Catamarca)">
                Puesto Frías - RN 157 (Límite Catamarca)
              </option>
              <option value="Selva - RN 34 (Acceso Sur)">
                Selva - RN 34 (Acceso Sur)
              </option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Tipo de Vehículo / Marca *
              </label>
              <input
                required
                type="text"
                placeholder="Mercedes-Benz Térmico"
                value={vehiculo}
                onChange={(e) => setVehiculo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Patente *</label>
              <input
                required
                type="text"
                placeholder="AB-420-CD"
                value={patente}
                onChange={(e) => setPatente(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                CUIT del Transportista
              </label>
              <input
                type="text"
                placeholder="30-71049281-2"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Kilos de Carga</label>
              <input
                required
                type="number"
                placeholder="2400"
                value={kilos}
                onChange={(e) => setKilos(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Mercadería Transportada
            </label>
            <input
              type="text"
              placeholder="Ej: 20 Medias Reses Bovinas y menudencias"
              value={mercaderia}
              onChange={(e) => setMercaderia(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Estado Documental
              </label>
              <select
                value={documentacion}
                onChange={(e) => {
                  setDocumentacion(e.target.value);
                  setDocumentacionValida(!e.target.value.includes('Incompleto') && !e.target.value.includes('Sin doc'));
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="REC Validado ARCA + DTE SENASA">REC Validado ARCA + DTE SENASA</option>
                <option value="REC Incompleto (Sin receptor en SDE)">REC Incompleto (Sin receptor en SDE)</option>
                <option value="Sin amparo documental ni habilitación UTF">Sin amparo documental ni habilitación UTF</option>
                <option value="Inspección de precinto conforme">Inspección de precinto conforme</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Resolución del Operativo
              </label>
              <select
                value={estado}
                onChange={(e) =>
                  setEstado(
                    e.target.value as
                      | 'Liberado en Tránsito'
                      | 'Intervenido / Decomiso'
                      | 'En Inspección Sanitaria'
                  )
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white"
              >
                <option value="Liberado en Tránsito">Liberado en Tránsito</option>
                <option value="Intervenido / Decomiso">Intervenido / Decomiso</option>
                <option value="En Inspección Sanitaria">En Inspección Sanitaria</option>
              </select>
            </div>
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
              <Check className="w-4 h-4" /> Guardar Operativo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
