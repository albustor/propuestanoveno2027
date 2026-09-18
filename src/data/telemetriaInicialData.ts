import { EventoTelemetria } from '../types';

export const TELEMETRIA_INICIAL_NOVENO: EventoTelemetria[] = [
  {
    id: 'tel-init-1',
    timestamp: '2026-09-18T07:15:00.000Z',
    fechaHoraLegible: '18/09/2026 07:15:00',
    modulo: 'REUNIONES_ALLAN',
    accion: 'SESION_REGISTRADA',
    descripcion: 'Apertura de la jornada del viernes 18 de setiembre con Allan Morera: Consolidación de matriz evaluativa y correlación de saberes.',
    usuario: 'Allan Morera & Alberto Bustos',
    detalles: { dia: 'Viernes', etapa: 'Cierre de Semana' }
  },
  {
    id: 'tel-init-2',
    timestamp: '2026-09-17T15:30:00.000Z',
    fechaHoraLegible: '17/09/2026 15:30:00',
    modulo: 'IA_ENGINE',
    accion: 'SINTESIS_JORNADA_IA',
    descripcion: 'Generación de síntesis ejecutiva e informe pedagógico con IA para la sesión del jueves 17 de setiembre.',
    usuario: 'Allan Morera & Alberto Bustos',
    detalles: { motor: 'Gemini / Llama Cascade', tokensAprox: 1420 }
  },
  {
    id: 'tel-init-3',
    timestamp: '2026-09-17T11:45:00.000Z',
    fechaHoraLegible: '17/09/2026 11:45:00',
    modulo: 'EVALUACION',
    accion: 'ARTICULACION_DESIGN_THINKING',
    descripcion: 'Vinculación de los 10 saberes de robótica y computación física con las 5 etapas metodológicas de Design Thinking para el proyecto semestral.',
    usuario: 'Alberto Bustos',
    detalles: { modulo: 1, fases: 3, etapas: 5 }
  },
  {
    id: 'tel-init-4',
    timestamp: '2026-09-17T09:00:00.000Z',
    fechaHoraLegible: '17/09/2026 09:00:00',
    modulo: 'RECURSOS_ARCHIVOS',
    accion: 'CATALOGO_SIMULADORES_QR',
    descripcion: 'Estructuración y verificación de accesos directos y códigos QR interactivos para simuladores web (Wokwi, Tinkercad Circuits, MakeCode).',
    usuario: 'Allan Morera',
    detalles: { totalRecursos: 10, estado: 'Validado' }
  },
  {
    id: 'tel-init-5',
    timestamp: '2026-09-16T14:20:00.000Z',
    fechaHoraLegible: '16/09/2026 14:20:00',
    modulo: 'NOTAS_INDICADOR',
    accion: 'CALIBRACION_INDICADORES_MEP',
    descripcion: 'Revisión y contraste de consignas didácticas de inicio, desarrollo y cierre contra los indicadores oficiales de logro del III Ciclo.',
    usuario: 'Allan Morera & Alberto Bustos',
    detalles: { saberesRevisados: 10, pautasDUA: 'Incorporadas' }
  },
  {
    id: 'tel-init-6',
    timestamp: '2026-09-16T09:30:00.000Z',
    fechaHoraLegible: '16/09/2026 09:30:00',
    modulo: 'SISTEMATIZACION',
    accion: 'COORDINACION_CURRICULAR',
    descripcion: 'Reunión de coordinación curricular y lineamientos de calidad con Kevin Sánchez y el equipo de asesores de 9° año.',
    usuario: 'Kevin Sánchez & Equipo 9°',
    detalles: { tema: 'Cronograma y Cortes Valorativos' }
  },
  {
    id: 'tel-init-7',
    timestamp: '2026-09-11T10:00:00.000Z',
    fechaHoraLegible: '11/09/2026 10:00:00',
    modulo: 'SISTEMA',
    accion: 'CONTEXTUALIZACION_INICIAL',
    descripcion: 'Inicio formal de tareas de diseño curricular de 9° año y estudio de los módulos del programa oficial de Formación Tecnológica MEP.',
    usuario: 'Leonardo, Kevin Sánchez & Diseñadores',
    detalles: { programa: 'Formación Tecnológica III Ciclo' }
  }
];
