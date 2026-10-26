import React, { useState, useMemo } from 'react';
import {
  UserPlus,
  Download,
  Search,
  Eye,
  FileBadge,
  CheckCircle,
  Clock,
  AlertTriangle,
  Leaf,
  FileText,
  Building2,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Operador, ActividadOperador, EstadoOperador } from '../types';

interface OperadoresViewProps {
  operadores: Operador[];
  onOpenNuevoOperador: () => void;
  onVerCertificado: (operador: Operador) => void;
  onAddOperadorDirect?: (operador: Omit<Operador, 'id'>) => void;
}

export const OperadoresView: React.FC<OperadoresViewProps> = ({
  operadores,
  onOpenNuevoOperador,
  onVerCertificado,
  onAddOperadorDirect,
}) => {
  // Pestaña interna: 'padron' | 'formulario'
  const [activeSubTab, setActiveSubTab] = useState<'padron' | 'formulario'>('padron');

  // Filtros de búsqueda en padrón
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActividad, setSelectedActividad] = useState<string>('');
  const [selectedEstado, setSelectedEstado] = useState<string>('');

  // Estados del Formulario de Inscripción integrado
  const [formCuit, setFormCuit] = useState('');
  const [formRazonSocial, setFormRazonSocial] = useState('');
  const [formTitular, setFormTitular] = useState('');
  const [formActividad, setFormActividad] = useState<ActividadOperador>('Carnicería Minorista');
  const [formDepartamento, setFormDepartamento] = useState('Capital, Santiago del Estero');
  const [formDomicilio, setFormDomicilio] = useState('');
  const [formHabilitacion, setFormHabilitacion] = useState('DGAG-');
  const [formEstado, setFormEstado] = useState<EstadoOperador>('Habilitado');
  const [formAgrotraza, setFormAgrotraza] = useState(true);
  const [formTelefono, setFormTelefono] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [ultimoInscripto, setUltimoInscripto] = useState<Operador | null>(null);

  const filteredOperadores = useMemo(() => {
    return operadores.filter((op) => {
      const matchesSearch =
        searchTerm === '' ||
        op.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.cuit.includes(searchTerm) ||
        op.nroRocca.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.domicilio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (op.titular && op.titular.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesActividad =
        selectedActividad === '' || op.actividad === selectedActividad;

      const matchesEstado =
        selectedEstado === '' || op.estado === selectedEstado;

      return matchesSearch && matchesActividad && matchesEstado;
    });
  }, [operadores, searchTerm, selectedActividad, selectedEstado]);

  const handleExportCSV = () => {
    const headers = [
      'CUIT',
      'Nro ROCCA',
      'Razón Social',
      'Titular',
      'Actividad',
      'Departamento',
      'Domicilio',
      'Habilitación',
      'Estado',
      'Vencimiento',
      'Sello AGROTRAZA',
    ];
    const rows = filteredOperadores.map((op) => [
      op.cuit,
      op.nroRocca,
      `"${op.razonSocial}"`,
      `"${op.titular || ''}"`,
      `"${op.actividad}"`,
      `"${op.departamento}"`,
      `"${op.domicilio}"`,
      `"${op.habilitacion}"`,
      op.estado,
      op.fechaVencimiento,
      op.agrotrazaSustentable ? 'SÍ' : 'NO',
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Padron_Operadores_ROCCA_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAutofillForm = () => {
    const rnd = Math.floor(100 + Math.random() * 900);
    setFormCuit(`30-71${rnd}890-5`);
    setFormRazonSocial(`FRIGORÍFICO Y MATADERO EL CHAQUEÑO ${rnd} S.A.`);
    setFormTitular('Pérez Daniel Alejandro');
    setFormActividad('Frigorífico / Ciclo I');
    setFormDepartamento('Robles, Fernández');
    setFormDomicilio('Ruta Nac. 34 Km 712');
    setFormHabilitacion(`SENASA N° 4${rnd} / DGAG`);
    setFormTelefono('(0385) 492-4110');
    setFormAgrotraza(true);
    setFormError(null);
  };

  const handleSubmitInscripcion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formCuit.trim()) {
      setFormError('El CUIT del operador es obligatorio.');
      return;
    }
    if (!formRazonSocial.trim()) {
      setFormError('La Razón Social o Denominación Comercial es obligatoria.');
      return;
    }
    if (!formDomicilio.trim()) {
      setFormError('El domicilio del establecimiento es obligatorio.');
      return;
    }
    if (!formHabilitacion.trim() || formHabilitacion.trim() === 'DGAG-') {
      setFormError('Debe ingresar el N° de Habilitación Oficial (SENASA o DGAG).');
      return;
    }

    const nextRoccaNum = Math.floor(1000 + Math.random() * 9000);
    const nroRocca = `ROCCA-SDE-${nextRoccaNum}`;

    const newOpData: Omit<Operador, 'id'> = {
      cuit: formCuit.trim(),
      nroRocca,
      razonSocial: formRazonSocial.trim().toUpperCase(),
      titular: formTitular.trim() || undefined,
      tipoEstablecimiento: formActividad,
      actividad: formActividad,
      departamento: formDepartamento,
      domicilio: formDomicilio.trim(),
      habilitacion: formHabilitacion.trim(),
      estado: formEstado,
      fechaVencimiento: '31/12/2027',
      agrotrazaSustentable: formAgrotraza,
      telefono: formTelefono.trim() || undefined,
      origenPredominante: 'Faena Local Provincial',
    };

    if (onAddOperadorDirect) {
      onAddOperadorDirect(newOpData);
    }

    const createdOp: Operador = {
      ...newOpData,
      id: `op-${Date.now()}`,
    };
    setUltimoInscripto(createdOp);
    setFormError(null);

    // Limpiar formulario
    setFormCuit('');
    setFormRazonSocial('');
    setFormTitular('');
    setFormDomicilio('');
    setFormHabilitacion('DGAG-');
    setFormTelefono('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
        {/* Cabecera del Módulo */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-procarne-100 text-procarne-800 uppercase tracking-wider">
                Módulo I Oficial
              </span>
              <span className="text-xs text-slate-500">
                Dirección General de Agricultura y Ganadería
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
              Registro Provincial de Operadores Cárnicos (ROCCA)
            </h2>
            <p className="text-xs text-slate-500">
              Padrón unificado de Frigoríficos, Mataderos, Distribuidores, Matarifes y Carnicerías habilitadas en Santiago del Estero.
            </p>
          </div>

          {/* Selector de Vistas / Acciones Rápidas */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveSubTab('padron')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeSubTab === 'padron'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4" /> Ver Padrón ({operadores.length})
            </button>
            <button
              onClick={() => {
                setActiveSubTab('formulario');
                setUltimoInscripto(null);
              }}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer ${
                activeSubTab === 'formulario'
                  ? 'bg-procarne-700 text-white shadow-md'
                  : 'bg-procarne-50 text-procarne-800 hover:bg-procarne-100 border border-procarne-200'
              }`}
            >
              <UserPlus className="w-4 h-4" /> Formulario de Inscripción
            </button>
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> Exportar CSV
            </button>
          </div>
        </div>

        {/* ================= VISTA: FORMULARIO DE INSCRIPCIÓN INTEGRADO ================= */}
        {activeSubTab === 'formulario' && (
          <div className="space-y-6 animate-fade-in">
            {/* Banner de bienvenida al trámite de registro */}
            <div className="bg-gradient-to-r from-slate-900 to-procarne-900 text-white p-5 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Alta de Operador Cárnico en Santiago del Estero
                </span>
                <h3 className="text-base sm:text-lg font-bold">
                  Formulario Único de Inscripción Sanitaria y Comercial
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  Complete los datos de la razón social o establecimiento para incorporarlo al padrón público provincial y generar su matrícula ROCCA.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAutofillForm}
                  className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Cargar Datos de Prueba
                </button>
              </div>
            </div>

            {/* Tarjeta de Confirmación de Alta Exitosa */}
            {ultimoInscripto && (
              <div className="p-5 bg-emerald-50 border-2 border-emerald-400 rounded-xl space-y-3 shadow-sm animate-fade-in">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-emerald-900">
                        ¡OPERADOR INSCRIPTO CORRECTAMENTE EN ROCCA!
                      </h4>
                      <p className="text-xs text-emerald-700">
                        Se ha asignado la matrícula provincial y registrado en el padrón de fiscalización.
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-base font-black px-3 py-1 bg-white text-emerald-900 border border-emerald-300 rounded-lg shadow-xs">
                    {ultimoInscripto.nroRocca}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white p-3.5 rounded-lg border border-emerald-200">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Razón Social:</span>
                    <p className="font-bold text-slate-900">{ultimoInscripto.razonSocial}</p>
                    <p className="text-slate-600 font-mono text-[11px]">CUIT: {ultimoInscripto.cuit}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Actividad / Habilitación:</span>
                    <p className="font-semibold text-slate-800">{ultimoInscripto.actividad}</p>
                    <p className="text-slate-600 text-[11px]">{ultimoInscripto.habilitacion}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Ubicación:</span>
                    <p className="font-medium text-slate-800">{ultimoInscripto.domicilio}</p>
                    <p className="text-slate-600 text-[11px]">{ultimoInscripto.departamento}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onVerCertificado(ultimoInscripto)}
                    className="px-4 py-2 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <FileBadge className="w-4 h-4" /> Ver Credencial Oficial Digital
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('padron')}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                  >
                    Ir al Padrón de Operadores
                  </button>
                </div>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmitInscripcion} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bloque 1: Identificación y CUIT */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <FileText className="w-4 h-4 text-procarne-700" /> 1. Datos Fiscales y Razón Social
                  </h4>

                  <div>
                    <label className="block font-medium text-slate-700 text-xs mb-1">
                      CUIT del Operador * <span className="text-slate-400 font-normal">(con o sin guiones)</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej: 30-71049281-2"
                      value={formCuit}
                      onChange={(e) => setFormCuit(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 font-mono text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 text-xs mb-1">
                      Razón Social o Nombre Comercial *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej: FRIGORÍFICO SANTIAGUEÑO S.R.L."
                      value={formRazonSocial}
                      onChange={(e) => setFormRazonSocial(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 text-xs mb-1">
                        Titular / Apoderado Legal
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre y Apellido"
                        value={formTitular}
                        onChange={(e) => setFormTitular(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 text-xs mb-1">
                        Teléfono de Contacto
                      </label>
                      <input
                        type="text"
                        placeholder="(0385) 421-XXXX"
                        value={formTelefono}
                        onChange={(e) => setFormTelefono(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Bloque 2: Actividad y Habilitación */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <Building2 className="w-4 h-4 text-procarne-700" /> 2. Actividad Cárnica y Habilitación
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 text-xs mb-1">
                        Actividad Principal *
                      </label>
                      <select
                        value={formActividad}
                        onChange={(e) => setFormActividad(e.target.value as ActividadOperador)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                      >
                        <option value="Carnicería Minorista">Carnicería Minorista</option>
                        <option value="Frigorífico / Ciclo I">Frigorífico / Ciclo I (Faena)</option>
                        <option value="Despostadero / Ciclo II">Despostadero / Ciclo II (Troceo)</option>
                        <option value="Matarife Abastecedor">Matarife Abastecedor</option>
                        <option value="Distribuidor Mayorista">Distribuidor Mayorista</option>
                        <option value="Transportista de Carnes">Transportista de Carnes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 text-xs mb-1">
                        Estado Inicial
                      </label>
                      <select
                        value={formEstado}
                        onChange={(e) => setFormEstado(e.target.value as EstadoOperador)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                      >
                        <option value="Habilitado">Habilitado</option>
                        <option value="En Trámite de Renovación">En Trámite de Renovación</option>
                        <option value="Suspendido / Sancionado">Suspendido / Sancionado</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 text-xs mb-1">
                      N° Habilitación Sanitaria (SENASA o DGAG) *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Ej: SENASA 3849 o DGAG-842"
                      value={formHabilitacion}
                      onChange={(e) => setFormHabilitacion(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 text-xs mb-1">
                        Departamento Provincial *
                      </label>
                      <select
                        value={formDepartamento}
                        onChange={(e) => setFormDepartamento(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
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
                      <label className="block font-medium text-slate-700 text-xs mb-1">
                        Domicilio / Dirección del Local o Planta *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Calle y N° o Ruta Km..."
                        value={formDomicilio}
                        onChange={(e) => setFormDomicilio(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-procarne-700 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Adhesión Sello AGROTRAZA */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-emerald-950 text-xs">
                      Sello AGROTRAZA Sustentable (Ley Nacional N° 27.279)
                    </h5>
                    <p className="text-[11px] text-emerald-800">
                      Declara trazabilidad ambiental, gestión de envases fitosanitarios y balance de masa en producción cárnica provincial.
                    </p>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs font-bold text-emerald-900 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formAgrotraza}
                    onChange={(e) => setFormAgrotraza(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded cursor-pointer"
                  />
                  <span>Adherir al Sello Verde</span>
                </label>
              </div>

              {/* Botones de acción del formulario */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('padron')}
                  className="w-full sm:w-auto px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancelar y Volver al Padrón
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-procarne-700 hover:bg-procarne-800 text-white font-bold rounded-lg text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Registrar e Inscribir Operador en ROCCA
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= VISTA: PADRÓN OFICIAL ================= */}
        {activeSubTab === 'padron' && (
          <div className="space-y-4 animate-fade-in">
            {/* Filtros y Búsqueda */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 py-1">
              <div className="sm:col-span-2 relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por CUIT, Razón Social, Titular o N° ROCCA..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-procarne-700 focus:outline-none"
                />
              </div>
              <div>
                <select
                  value={selectedActividad}
                  onChange={(e) => setSelectedActividad(e.target.value)}
                  className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-procarne-700 focus:outline-none bg-white text-slate-700"
                >
                  <option value="">Todas las Actividades</option>
                  <option value="Frigorífico / Ciclo I">Frigorífico / Ciclo I</option>
                  <option value="Despostadero / Ciclo II">Despostadero / Ciclo II</option>
                  <option value="Matarife Abastecedor">Matarife Abastecedor</option>
                  <option value="Distribuidor Mayorista">Distribuidor Mayorista</option>
                  <option value="Carnicería Minorista">Carnicería Minorista</option>
                  <option value="Transportista de Carnes">Transportista de Carnes</option>
                </select>
              </div>
              <div>
                <select
                  value={selectedEstado}
                  onChange={(e) => setSelectedEstado(e.target.value)}
                  className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-procarne-700 focus:outline-none bg-white text-slate-700"
                >
                  <option value="">Todos los Estados</option>
                  <option value="Habilitado">Habilitado</option>
                  <option value="En Trámite de Renovación">En Trámite de Renovación</option>
                  <option value="Suspendido / Sancionado">Suspendido / Sancionado</option>
                </select>
              </div>
            </div>

            {/* Tabla de Operadores */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">CUIT / N° ROCCA</th>
                    <th className="py-3 px-3">Razón Social & Titular</th>
                    <th className="py-3 px-3">Actividad Principal</th>
                    <th className="py-3 px-3">Departamento / Domicilio</th>
                    <th className="py-3 px-3">Habilitación</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredOperadores.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-500">
                        No se encontraron operadores registrados con los filtros seleccionados.
                      </td>
                    </tr>
                  ) : (
                    filteredOperadores.map((op) => (
                      <tr key={op.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-slate-900">{op.cuit}</span>
                          <div className="text-[10px] text-procarne-700 font-semibold">
                            {op.nroRocca}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-900">
                          <div className="flex items-center gap-1.5">
                            {op.razonSocial}
                            {op.agrotrazaSustentable && (
                              <span
                                title="Operador Certificado AGROTRAZA Sustentable"
                                className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium"
                              >
                                <Leaf className="w-2.5 h-2.5 mr-0.5 text-emerald-600" /> AGROTRAZA
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {op.titular ? `Titular: ${op.titular}` : op.tipoEstablecimiento}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-medium inline-block">
                            {op.actividad}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">{op.departamento}</div>
                          <div className="text-[10px] text-slate-400">{op.domicilio}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-slate-700">{op.habilitacion}</span>
                          <div className="text-[10px] text-slate-400">Vto: {op.fechaVencimiento}</div>
                        </td>
                        <td className="py-3 px-3">
                          {op.estado === 'Habilitado' && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] inline-flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> Habilitado
                            </span>
                          )}
                          {op.estado === 'En Trámite de Renovación' && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" /> Renovación
                            </span>
                          )}
                          {op.estado === 'Suspendido / Sancionado' && (
                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px] inline-flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3 text-red-600" /> Sancionado
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            title="Ver Credencial Oficial Digital"
                            onClick={() => onVerCertificado(op)}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 hover:text-procarne-700 rounded transition cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            title="Imprimir Certificado ProCarne"
                            onClick={() => onVerCertificado(op)}
                            className="p-1.5 hover:bg-slate-200 text-slate-600 hover:text-procarne-700 rounded transition cursor-pointer"
                          >
                            <FileBadge className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
