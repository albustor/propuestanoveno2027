import { ReunionEquipoNivel } from '../types';

export const REUNIONES_INICIALES_NOVENO: ReunionEquipoNivel[] = [
  {
    id: 'reunion-allan-1',
    tipo: 'trabajo_allan',
    titulo: 'Jornada de Diseño Curricular y Articulación Pedagógica con Allan M.',
    fecha: '2026-09-16',
    hora: '08:00',
    participantes: ['Alberto Bustos Ortega', 'Allan M.'],
    temasTratados: 'Revisión y diseño de estrategias metodológicas para los 10 saberes del Módulo 1 (Robótica, Computación Física y Algoritmos). Definición de los 3 momentos didácticos (Inicio, Desarrollo, Cierre), DUA, recursos unplugged y herramientas de evaluación.',
    acuerdos: [
      {
        id: 'ac-allan-1',
        acuerdo: 'Alinear los 10 indicadores de Módulo 1 a la matriz de distribución evaluativa (Cotidiano, Tareas, Proyecto).',
        responsable: 'Alberto Bustos & Allan M.',
        fechaLimite: '2026-09-20',
        completado: true
      },
      {
        id: 'ac-allan-2',
        acuerdo: 'Estructurar el banco de WebApps y simuladores interactivos con códigos QR para el estudiantado.',
        responsable: 'Allan M.',
        fechaLimite: '2026-09-25',
        completado: true
      },
      {
        id: 'ac-allan-3',
        acuerdo: 'Vincular el prototipo domótico semestral con las 5 etapas de Design Thinking.',
        responsable: 'Alberto Bustos',
        fechaLimite: '2026-09-30',
        completado: true
      }
    ],
    avancesConAllan: 'Se logró consolidar el 100% de los 10 saberes de Robótica y Algoritmos para 9° año. Se integró la bitácora de anotaciones diarias con síntesis por IA y la matriz de distribución de componentes del REA.',
    sintesisIA: 'Jornada altamente productiva. Se completó el diseño metodológico de Módulo 1 y se establecieron los clústeres sinérgicos para el proyecto domótico.',
    estado: 'Completado',
    adjuntosOEnlaces: 'Propuesta Noveno Año 2026 - Módulo 1 y Planeador',
    timestamp: '2026-09-16T08:00:00.000Z'
  },
  {
    id: 'reunion-coord-kevin-1',
    tipo: 'coordinacion',
    titulo: 'Reunión de Coordinación Curricular y Capacitación PIA con Kevin Sánchez',
    fecha: '2026-09-16',
    hora: '09:30',
    participantes: ['Kevin Sánchez Bogarín (Coordinador)', 'Alberto Bustos Ortega', 'Allan M.', 'Mariana'],
    temasTratados: 'Lineamientos para el uso de la herramienta PIA, criterios de consistencia curricular MEP 2026-2027, cronograma de cortes valorativos y estándares de calidad para la entrega a jefatura.',
    acuerdos: [
      {
        id: 'ac-coord-1',
        acuerdo: 'Cumplir con el cronograma oficial y preparar el primer corte valorativo para el 16 de octubre.',
        responsable: 'Equipo Diseñador (Allan & Alberto)',
        fechaLimite: '2026-10-16',
        completado: false
      },
      {
        id: 'ac-coord-2',
        acuerdo: 'Asegurar que todas las actividades de mediación integren pautas DUA y enfoque multi-escenario (conectado y desconectado).',
        responsable: 'Alberto Bustos',
        fechaLimite: '2026-10-10',
        completado: true
      }
    ],
    sintesisIA: 'Alineamiento total con la coordinación curricular. Se ratifican los plazos de entrega y el enfoque inclusivo DUA.',
    estado: 'Completado',
    timestamp: '2026-09-16T09:30:00.000Z'
  },
  {
    id: 'reunion-nivel-contexto-1',
    tipo: 'equipo_nivel_9',
    titulo: 'Mesa de Trabajo de Nivel 9°: Contextualización y Recursos',
    fecha: '2026-09-11',
    hora: '10:00',
    participantes: ['Leonardo', 'Kevin Sánchez', 'Allan M.', 'Alberto Bustos', 'Equipos de III Ciclo'],
    temasTratados: 'Estudio de los módulos del programa de Formación Tecnológica y contextualización de tareas para 9° año frente a la transición con 7° y 8° año.',
    acuerdos: [
      {
        id: 'ac-nivel-1',
        acuerdo: 'Especializar los saberes de 9° año en computación física avanzada (sensores/actuadores) y modelos de datos relacionales / IA en Módulo 2.',
        responsable: 'Equipo 9° Año',
        fechaLimite: '2026-09-15',
        completado: true
      }
    ],
    estado: 'Completado',
    timestamp: '2026-09-11T10:00:00.000Z'
  }
];
