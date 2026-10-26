export type TabType =
  | 'dashboard'
  | 'operadores'
  | 'movimientos'
  | 'fiscalizacion'
  | 'incentivos'
  | 'portal';

export type ActividadOperador =
  | 'Frigorífico / Ciclo I'
  | 'Despostadero / Ciclo II'
  | 'Matarife Abastecedor'
  | 'Distribuidor Mayorista'
  | 'Carnicería Minorista'
  | 'Transportista de Carnes';

export type EstadoOperador =
  | 'Habilitado'
  | 'En Trámite de Renovación'
  | 'Suspendido / Sancionado';

export interface Operador {
  id: string;
  cuit: string;
  nroRocca: string;
  razonSocial: string;
  titular?: string;
  tipoEstablecimiento: string;
  actividad: ActividadOperador;
  departamento: string;
  domicilio: string;
  habilitacion: string;
  estado: EstadoOperador;
  fechaVencimiento: string;
  agrotrazaSustentable: boolean;
  telefono?: string;
  origenPredominante?: string;
  faenaLocalCabezas?: number;
}

export type EspecieCarne = 'Bovino' | 'Porcino' | 'Caprino' | 'Ovino';

export interface RemitoREC {
  id: string;
  nroREC: string;
  nroDTE: string;
  especie: EspecieCarne;
  kilos: number;
  origenEstablecimiento: string;
  origenProvincia: string;
  destinoOperador: string;
  destinoCuit: string;
  estadoValidacion: 'ARCA OK' | 'Faena Local + REC' | 'En Tránsito RN 34' | 'Observado / Incompleto';
  recepcionEstado: 'Confirmado QR' | 'Pendiente Destino' | 'Rechazado';
  fecha: string;
  agrotrazaCertificado: boolean;
  detalleCortes?: string;
}

export interface ControlRuta {
  id: string;
  puesto: string;
  vehiculo: string;
  patente: string;
  cuit: string;
  mercaderia: string;
  kilos: number;
  documentacion: string;
  documentacionValida: boolean;
  estado: 'Liberado en Tránsito' | 'Intervenido / Decomiso' | 'En Inspección Sanitaria';
  actaRef?: string;
  hora: string;
}

export interface ActaInfraccion {
  id: string;
  nroActa: string;
  fecha: string;
  lugar: string;
  departamento: string;
  operadorInfractor: string;
  cuitInfractor?: string;
  infraccionDetectada: string;
  medidaAdoptada: string;
  kilosDecomisados?: number;
  destinoDecomiso: string;
  expediente: string;
  inspector: string;
  articuloLey: string;
}
