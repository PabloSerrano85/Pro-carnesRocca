import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { OperadoresView } from './components/OperadoresView';
import { MovimientosView } from './components/MovimientosView';
import { FiscalizacionView } from './components/FiscalizacionView';
import { IncentivosView } from './components/IncentivosView';
import { PortalPublicoView } from './components/PortalPublicoView';

import { ModalRec } from './components/modals/ModalRec';
import { ModalOperativo } from './components/modals/ModalOperativo';
import { ModalActa } from './components/modals/ModalActa';
import { ModalOperador } from './components/modals/ModalOperador';
import { ModalCertificado } from './components/modals/ModalCertificado';
import { ModalExpediente } from './components/modals/ModalExpediente';

import {
  INITIAL_OPERADORES,
  INITIAL_REMITOS,
  INITIAL_CONTROLES,
  INITIAL_ACTAS,
} from './data/mockData';
import { TabType, Operador, RemitoREC, ControlRuta, ActaInfraccion } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');

  const [operadores, setOperadores] = useState<Operador[]>(INITIAL_OPERADORES);
  const [remitos, setRemitos] = useState<RemitoREC[]>(INITIAL_REMITOS);
  const [controles, setControles] = useState<ControlRuta[]>(INITIAL_CONTROLES);
  const [actas, setActas] = useState<ActaInfraccion[]>(INITIAL_ACTAS);

  // Modals state
  const [isRecModalOpen, setIsRecModalOpen] = useState(false);
  const [isOperativoModalOpen, setIsOperativoModalOpen] = useState(false);
  const [isActaModalOpen, setIsActaModalOpen] = useState(false);
  const [isOperadorModalOpen, setIsOperadorModalOpen] = useState(false);
  const [selectedCertificadoOperador, setSelectedCertificadoOperador] =
    useState<Operador | null>(null);
  const [selectedExpedienteActa, setSelectedExpedienteActa] =
    useState<ActaInfraccion | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleAddRemito = (newRemitoData: Omit<RemitoREC, 'id'>) => {
    const newRemito: RemitoREC = {
      ...newRemitoData,
      id: `rec-${Date.now()}`,
    };
    setRemitos([newRemito, ...remitos]);
    showToast(
      `✅ Remito ${newRemito.nroREC} registrado y validado en plataforma provincial ROCCA.`
    );
  };

  const handleUpdateRecepcion = (
    id: string,
    nuevoEstado: 'Confirmado QR' | 'Pendiente Destino' | 'Rechazado'
  ) => {
    setRemitos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, recepcionEstado: nuevoEstado } : r))
    );
  };

  const handleAddOperativo = (newControlData: Omit<ControlRuta, 'id'>) => {
    const newControl: ControlRuta = {
      ...newControlData,
      id: `ctrl-${Date.now()}`,
    };
    setControles([newControl, ...controles]);
    showToast(
      `✅ Operativo en ${newControl.puesto} registrado correctamente (${newControl.estado}).`
    );
  };

  const handleAddActa = (newActaData: Omit<ActaInfraccion, 'id'>) => {
    const newActa: ActaInfraccion = {
      ...newActaData,
      id: `acta-${Date.now()}`,
    };
    setActas([newActa, ...actas]);
    showToast(`⚖️ ${newActa.nroActa} labrada e ingresada al registro sancionatorio.`);
  };

  const handleAddOperador = (newOpData: Omit<Operador, 'id'>) => {
    const newOp: Operador = {
      ...newOpData,
      id: `op-${Date.now()}`,
    };
    setOperadores([newOp, ...operadores]);
    showToast(
      `🏛️ Operador ${newOp.razonSocial} inscripto con matrícula ${newOp.nroRocca}.`
    );
  };

  const handleSelectActaRef = (actaRef: string) => {
    const found = actas.find((a) => a.nroActa === actaRef);
    if (found) {
      setSelectedExpedienteActa(found);
    } else {
      setCurrentTab('fiscalizacion');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 antialiased selection:bg-procarne-700 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs flex items-center gap-2 max-w-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            ×
          </button>
        </div>
      )}

      {/* Header institucional y navegación */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        operadoresCount={operadores.length}
        remitosCount={remitos.length}
        actasCount={actas.length}
      />

      {/* Contenedor Principal */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {currentTab === 'dashboard' && (
          <DashboardView
            onOpenRecModal={() => setIsRecModalOpen(true)}
            onOpenOperativoModal={() => setIsOperativoModalOpen(true)}
            onOpenOperadorModal={() => setIsOperadorModalOpen(true)}
            onSelectActa={handleSelectActaRef}
            controles={controles}
            operadores={operadores}
          />
        )}

        {currentTab === 'operadores' && (
          <OperadoresView
            operadores={operadores}
            onOpenNuevoOperador={() => setIsOperadorModalOpen(true)}
            onVerCertificado={(op) => setSelectedCertificadoOperador(op)}
            onAddOperadorDirect={handleAddOperador}
          />
        )}

        {currentTab === 'movimientos' && (
          <MovimientosView
            remitos={remitos}
            onAddRemito={handleAddRemito}
            onUpdateRecepcion={handleUpdateRecepcion}
            onOpenNuevoModal={() => setIsRecModalOpen(true)}
          />
        )}

        {currentTab === 'fiscalizacion' && (
          <FiscalizacionView
            actas={actas}
            onOpenNuevaActa={() => setIsActaModalOpen(true)}
            onVerExpediente={(acta) => setSelectedExpedienteActa(acta)}
          />
        )}

        {currentTab === 'incentivos' && <IncentivosView />}

        {currentTab === 'portal' && <PortalPublicoView operadores={operadores} />}
      </main>

      {/* Footer Institucional */}
      <Footer />

      {/* Modales Interactivos */}
      <ModalRec
        isOpen={isRecModalOpen}
        onClose={() => setIsRecModalOpen(false)}
        onSubmit={handleAddRemito}
      />

      <ModalOperativo
        isOpen={isOperativoModalOpen}
        onClose={() => setIsOperativoModalOpen(false)}
        onSubmit={handleAddOperativo}
      />

      <ModalActa
        isOpen={isActaModalOpen}
        onClose={() => setIsActaModalOpen(false)}
        onSubmit={handleAddActa}
      />

      <ModalOperador
        isOpen={isOperadorModalOpen}
        onClose={() => setIsOperadorModalOpen(false)}
        onSubmit={handleAddOperador}
      />

      <ModalCertificado
        operador={selectedCertificadoOperador}
        onClose={() => setSelectedCertificadoOperador(null)}
      />

      <ModalExpediente
        acta={selectedExpedienteActa}
        onClose={() => setSelectedExpedienteActa(null)}
      />
    </div>
  );
};

export default App;
