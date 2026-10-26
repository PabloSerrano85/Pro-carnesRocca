import React, { useState } from 'react';
import { UserPlus, X, Check, Leaf, AlertCircle, Sparkles } from 'lucide-react';
import { Operador, ActividadOperador, EstadoOperador } from '../../types';

interface ModalOperadorProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (operador: Omit<Operador, 'id'>) => void;
}

export const ModalOperador: React.FC<ModalOperadorProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [cuit, setCuit] = useState('');
  const [razonSocial, setRazonSocial] = useState('');
  const [titular, setTitular] = useState('');
  const [actividad, setActividad] = useState<ActividadOperador>('Carnicería Minorista');
  const [departamento, setDepartamento] = useState('Capital, Santiago del Estero');
  const [domicilio, setDomicilio] = useState('');
  const [habilitacion, setHabilitacion] = useState('DGAG-');
  const [estado, setEstado] = useState<EstadoOperador>('Habilitado');
  const [agrotrazaSustentable, setAgrotrazaSustentable] = useState(true);
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setCuit('');
    setRazonSocial('');
    setTitular('');
    setActividad('Carnicería Minorista');
    setDepartamento('Capital, Santiago del Estero');
    setDomicilio('');
    setHabilitacion('DGAG-');
    setEstado('Habilitado');
    setAgrotrazaSustentable(true);
    setTelefono('');
    setEmail('');
    setErrorMsg(null);
  };

  const handleAutofill = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setCuit(`30-71${randomSuffix}421-8`);
    setRazonSocial(`CARNES Y CHACINADOS SANTIAGUEÑOS ${randomSuffix} S.R.L.`);
    setTitular('Morales Roberto Carlos');
    setActividad('Carnicería Minorista');
    setDepartamento('Robles, Fernández');
    setDomicilio('Av. San Martín 450');
    setHabilitacion(`DGAG-${randomSuffix}`);
    setTelefono('(0385) 491-2300');
    setEmail(`contacto@carnes${randomSuffix}.com.ar`);
    setAgrotrazaSustentable(true);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cuit.trim()) {
      setErrorMsg('El CUIT del operador es obligatorio.');
      return;
    }
    if (!razonSocial.trim()) {
      setErrorMsg('La Razón Social o Denominación Comercial es obligatoria.');
      return;
    }
    if (!domicilio.trim()) {
      setErrorMsg('El domicilio físico del establecimiento es obligatorio.');
      return;
    }
    if (!habilitacion.trim() || habilitacion.trim() === 'DGAG-') {
      setErrorMsg('Debe indicar el N° de Habilitación Oficial (SENASA o DGAG).');
      return;
    }

    const nextRoccaNum = Math.floor(1000 + Math.random() * 9000);
    const nroRocca = `ROCCA-SDE-${nextRoccaNum}`;

    onSubmit({
      cuit: cuit.trim(),
      nroRocca,
      razonSocial: razonSocial.trim().toUpperCase(),
      titular: titular.trim() || undefined,
      tipoEstablecimiento: actividad,
      actividad,
      departamento,
      domicilio: domicilio.trim(),
      habilitacion: habilitacion.trim(),
      estado,
      fechaVencimiento: '31/12/2027',
      agrotrazaSustentable,
      telefono: telefono.trim() || undefined,
      origenPredominante: 'Faena Local Provincial (Robles / Banda)',
    });

    resetForm();
    onClose();
  };

  const handleClose = () => {
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[92vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-procarne-100 text-procarne-800 rounded-lg">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Inscribir Nuevo Operador en el Padrón ROCCA
              </h3>
              <p className="text-[10px] text-slate-500">
                Registro Único Provincial de la Cadena Cárnica • Dirección de Agricultura y Ganadería
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
          <span className="text-slate-600 text-[11px]">¿Desea autocompletar con datos de prueba?</span>
          <button
            type="button"
            onClick={handleAutofill}
            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded text-[11px] flex items-center gap-1 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Autocompletar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                CUIT del Operador *
              </label>
              <input
                required
                type="text"
                placeholder="Ej: 30-71289123-4"
                value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Actividad Principal *
              </label>
              <select
                value={actividad}
                onChange={(e) => setActividad(e.target.value as ActividadOperador)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white text-xs"
              >
                <option value="Carnicería Minorista">Carnicería Minorista</option>
                <option value="Frigorífico / Ciclo I">Frigorífico / Ciclo I (Faena)</option>
                <option value="Despostadero / Ciclo II">Despostadero / Ciclo II (Troceo)</option>
                <option value="Matarife Abastecedor">Matarife Abastecedor</option>
                <option value="Distribuidor Mayorista">Distribuidor Mayorista</option>
                <option value="Transportista de Carnes">Transportista de Carnes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Razón Social / Nombre Comercial *
            </label>
            <input
              required
              type="text"
              placeholder="Ej: CARNICERÍA LA SANTIAGUEÑA S.R.L."
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Titular / Responsable Legal
              </label>
              <input
                type="text"
                placeholder="Nombre y Apellido"
                value={titular}
                onChange={(e) => setTitular(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Teléfono</label>
              <input
                type="text"
                placeholder="(0385) 421-XXXX"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Departamento Provincial *
              </label>
              <select
                value={departamento}
                onChange={(e) => setDepartamento(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white text-xs"
              >
                <option value="Capital, Santiago del Estero">Capital, Santiago del Estero</option>
                <option value="Banda, La Banda">Banda, La Banda</option>
                <option value="Robles, Fernández">Robles, Fernández / Forres</option>
                <option value="General Taboada, Añatuya">General Taboada, Añatuya</option>
                <option value="Choya, Frías">Choya, Frías</option>
                <option value="Rivadavia, Selva">Rivadavia, Selva</option>
                <option value="Loreto, Santiago del Estero">Loreto, Santiago del Estero</option>
                <option value="Moreno, Quimilí">Moreno, Quimilí</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Domicilio / Ubicación *
              </label>
              <input
                required
                type="text"
                placeholder="Calle y N° o Ruta Km..."
                value={domicilio}
                onChange={(e) => setDomicilio(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                N° Habilitación Sanitaria *
              </label>
              <input
                required
                type="text"
                placeholder="SENASA 4910 o DGAG-912"
                value={habilitacion}
                onChange={(e) => setHabilitacion(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Estado Inicial
              </label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as EstadoOperador)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-procarne-700 bg-white text-xs"
              >
                <option value="Habilitado">Habilitado</option>
                <option value="En Trámite de Renovación">En Trámite de Renovación</option>
                <option value="Suspendido / Sancionado">Suspendido / Sancionado</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[11px] text-emerald-900 font-bold block">
                  Adhiere al Sello AGROTRAZA Sustentable
                </span>
                <span className="text-[10px] text-emerald-700">
                  Trazabilidad ambiental y fiscalización sanitaria Ley Nac. 27.279
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={agrotrazaSustentable}
              onChange={(e) => setAgrotrazaSustentable(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-lg shadow cursor-pointer flex items-center gap-1.5 transition"
            >
              <Check className="w-4 h-4" /> Registrar e Inscribir Operador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
