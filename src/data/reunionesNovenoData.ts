import { ReunionEquipoNivel } from '../types';

export const REUNIONES_INICIALES_NOVENO: ReunionEquipoNivel[] = [
  {
    id: 'reunion-allan-1',
    tipo: 'trabajo_allan',
    titulo: 'Jornada de Diseño Curricular y Articulación Pedagógica con Allan Morera',
    fecha: '2026-09-16',
    hora: '08:00',
    participantes: ['Allan Morera', 'Alberto Bustos'],
    temasTratados: 'Revisión y validación de estrategias metodológicas para los 10 saberes del Módulo 1 (Robótica, Computación Física y Algoritmos) con base en el currículo oficial establecido para el nivel de 9° año. Definición de los 3 momentos didácticos (Inicio, Desarrollo, Cierre), DUA, recursos unplugged y herramientas de evaluación. Definición sobre el indicador de Entorno de Programación sobre software textual o por bloques de acuerdo al equipamiento institucional, y validación del uso estratégico de simuladores web para optimizar tiempos lectivos.',
    acuerdos: [
      {
        id: 'ac-allan-1',
        acuerdo: 'Validar que los 10 indicadores de Módulo 1 respondan a la matriz de distribución evaluativa (Cotidiano, Tareas, Proyecto).',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-20',
        completado: false
      },
      {
        id: 'ac-allan-2',
        acuerdo: 'Estructurar el catálogo de WebApps y simuladores interactivos con códigos QR como apoyo a la mediación docente.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-25',
        completado: false
      },
      {
        id: 'ac-allan-3',
        acuerdo: 'Vincular el prototipo semestral con el marco metodológico de 5 etapas de Design Thinking.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-30',
        completado: false
      },
      {
        id: 'ac-allan-4',
        acuerdo: 'Considerar la flexibilidad de software para el desarrollo de actividades según el equipamiento que tenga a disposición el docente.',
        responsable: 'Allan Morera & Alberto Bustos',
        completado: false
      },
      {
        id: 'ac-allan-5',
        acuerdo: 'Consolidar las simulaciones digitales como una alternativa valiosa para mitigar la limitación de kits y optimizar lecciones.',
        responsable: 'Allan Morera & Alberto Bustos',
        completado: false
      },
      {
        id: 'ac-allan-6',
        acuerdo: 'Validar procesos de prototipos físicos o digitales en computación física y robótica, contemplando algoritmos y programación.',
        responsable: 'Allan Morera & Alberto Bustos',
        completado: false
      }
    ],
    avancesConAllan: 'Lectura y análisis de documentación curricular oficial. Validación del impacto y alineación del indicador de logro con el perfil del nivel. Bosquejos de mediación pedagógica, análisis de software de programación y diseño de secuencias desconectadas.',
    aspectosPuntuales: `Resumen General:
Se validaron los 10 saberes e indicadores de logro del Módulo 1 (Robótica, Computación Física y Algoritmos) asegurando coherencia curricular para 9° año y alternativas de software y simulación adaptadas al entorno escolar.

Aspectos Abordados por Viñeta:
• Calibración de Indicadores de Logro: Contraste de verbos operativos para asegurar el cumplimiento del descriptor de III Ciclo sin fragmentación.
• Flexibilidad de Entornos de Programación: Habilitación de herramientas en bloques y texto según el equipamiento del centro educativo.
• Simuladores Web Interactivos: Integración de Wokwi, Tinkercad y MakeCode con códigos QR para mitigar limitaciones de kits físicos.
• Metodología de Proyecto (Design Thinking): Estandarización de las 5 etapas del proyecto semestral.
• Enfoque DUA y Multiescenario: Diseño de secuencias conectadas y desconectadas (unplugged) para atención inclusiva.`,
    sintesisIA: 'Jornada altamente productiva. Se avanzó en el desarrollo y validación de la propuesta de Módulo 1 para el nivel de noveno año.',
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
    participantes: ['Kevin Sánchez (Coordinador)', 'Allan Morera', 'Alberto Bustos', 'Mariana'],
    temasTratados: 'Lineamientos para el uso de la herramienta PIA, criterios de consistencia curricular MEP 2026-2027, cronograma de cortes valorativos y estándares de calidad para la entrega a jefatura.',
    acuerdos: [
      {
        id: 'ac-coord-1',
        acuerdo: 'Cumplir con el cronograma oficial y preparar el primer corte valorativo para el 16 de octubre.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-10-16',
        completado: false
      },
      {
        id: 'ac-coord-2',
        acuerdo: 'Asegurar que todas las actividades de mediación integren pautas DUA y enfoque multi-escenario (conectado y desconectado).',
        responsable: 'Allan Morera & Alberto Bustos',
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
    participantes: ['Leonardo', 'Kevin Sánchez', 'Allan Morera', 'Alberto Bustos', 'Equipos de III Ciclo'],
    temasTratados: 'Estudio de los módulos del programa oficial de Formación Tecnológica y contextualización de tareas para 9° año frente a la articulación con 7° y 8° año.',
    acuerdos: [
      {
        id: 'ac-nivel-1',
        acuerdo: 'Especializar los saberes de 9° año en computación física avanzada (sensores/actuadores) y modelos de datos relacionales / IA en Módulo 2.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-15',
        completado: true
      }
    ],
    sintesisIA: 'Articulación de nivel completada para la transición curricular del tercer ciclo.',
    estado: 'Completado',
    timestamp: '2026-09-11T10:00:00.000Z'
  }
];
