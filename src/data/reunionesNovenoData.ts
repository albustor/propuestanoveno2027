import { ReunionEquipoNivel } from '../types';

export const REUNIONES_INICIALES_NOVENO: ReunionEquipoNivel[] = [
  {
    id: 'reunion-allan-3-viernes',
    tipo: 'trabajo_allan',
    titulo: 'Jornada de Cierre Semanal: Consolidación Evaluativa y Saberes Procedimentales/Actitudinales',
    fecha: '2026-09-18',
    hora: '07:30',
    participantes: ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)'],
    temasTratados: 'Consolidación de la matriz evaluativa del Tercer Ciclo. Integración de los saberes procedimentales (habilidades observables en circuitos, algoritmos y depuración) y saberes actitudinales (ética digital, trabajo colaborativo y resiliencia). Revisión de la distribución porcentual oficial: Trabajo Cotidiano (45-50%), Proyecto DT (30-40%) y Tareas/Evidencias (10%).',
    avancesConAllan: 'Estructuración de las rúbricas analíticas de proceso y escalas de desempeño para los 10 saberes del Módulo 1. Blindaje de los saberes asignados al proyecto semestral para evitar duplicidad evaluativa.',
    aspectosPuntuales: `Resumen General:
Se consolidó la estructura de evaluación formativa y sumativa para noveno año, asegurando que cada saber cuente con sus observables procedimentales y actitudinales articulados con las pautas DUA y el Reglamento de Evaluación de los Aprendizajes (REA MEP).

Aspectos Abordados por Viñeta:
• Matriz de Tres Componentes: Definición clara de Trabajo Cotidiano (45-50%), Proyecto Design Thinking (30-40%) y Tareas / Evidencias Cortas (10%).
• Integración de Saberes Procedimentales: Descriptores de desempeño para montaje de circuitos, programación de microcontroladores y algoritmos.
• Integración de Saberes Actitudinales: Criterios de perseverancia ante el error, seguridad de datos y respeto a la autoría digital.
• Bloqueo de Indicadores de Proyecto: Salvaguarda técnica de los saberes de prototipado para evaluación integrada por fases.
• Cierre de Bitácora Semanal: Sincronización de telemetría y resúmenes ejecutivos para la jefatura curricular.`,
    acuerdosTexto: `• [Allan Morera & Alberto Bustos]: Finalizar el banco de instrumentos de evaluación formativa para los 10 saberes del Módulo 1. (Plazo: 2026-09-22)
• [Allan Morera]: Validar la integración de los simuladores Wokwi y Tinkercad en las guías didácticas del docente. (Plazo: 2026-09-25)
• [Alberto Bustos]: Articular las 5 etapas de Design Thinking con la base documental de proyecto y pautas DUA. (Plazo: 2026-09-28)`,
    acuerdos: [
      {
        id: 'ac-v18-1',
        acuerdo: 'Finalizar el banco de instrumentos de evaluación formativa para los 10 saberes del Módulo 1.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-22',
        completado: false
      },
      {
        id: 'ac-v18-2',
        acuerdo: 'Validar la integración de los simuladores Wokwi y Tinkercad en las guías didácticas del docente.',
        responsable: 'Allan Morera',
        fechaLimite: '2026-09-25',
        completado: false
      },
      {
        id: 'ac-v18-3',
        acuerdo: 'Articular las 5 etapas de Design Thinking con la base documental de proyecto y pautas DUA.',
        responsable: 'Alberto Bustos',
        fechaLimite: '2026-09-28',
        completado: false
      }
    ],
    sintesisIA: 'Jornada de viernes completada exitosamente. Se alcanza la correlación total entre mediación pedagógica, recursos de simulación y evaluación por componentes.',
    estado: 'Completado',
    adjuntosOEnlaces: 'Matriz Evaluativa Noveno 2026 y Guía de Tareas',
    timestamp: '2026-09-18T07:30:00.000Z'
  },
  {
    id: 'reunion-allan-2-jueves',
    tipo: 'trabajo_allan',
    titulo: 'Jornada de Metodología de Proyecto: Las 5 Etapas de Design Thinking y Simuladores Web',
    fecha: '2026-09-17',
    hora: '08:30',
    participantes: ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)'],
    temasTratados: 'Diseño y estructuración del componente Proyecto Semestral mediante las 5 etapas de Design Thinking (Empatizar, Definir, Idear, Prototipar, Evaluar). Selección y pruebas técnicas de simuladores virtuales (Wokwi para microcontroladores y Tinkercad Circuits) como soporte fundamental frente a limitaciones de kits físicos.',
    avancesConAllan: 'Delimitación de las 3 fases del proyecto: Fase 1 Inicial (Empatizar, Definir, Idear), Fase 2 Desarrollo (Prototipar) y Fase 3 Final (Evaluar/Testear). Verificación de códigos QR de WebApps interactivas.',
    aspectosPuntuales: `Resumen General:
Se definió el marco operativo del proyecto semestral, articulando el aprendizaje basado en retos con el diseño por etapas y herramientas de simulación digital accesibles desde cualquier navegador web.

Aspectos Abordados por Viñeta:
• Fases Metodológicas de DT: Fase 1 (Semanas 1-9), Fase 2 (Semanas 11-14) y Fase 3 (Semanas 16-18).
• Prototipado Híbrido: Guías para construcción física y simulación virtual completa en Wokwi y Tinkercad.
• Enfoque DUA en Proyectos: Adaptaciones para estudiantes con barreras de conectividad mediante dinámicas desenchufadas.
• Evidencias de Desempeño: Bitácoras de ingeniería, esquemas de conexión y código modular documentado.`,
    acuerdosTexto: `• [Allan Morera]: Consolidar el catálogo de WebApps y códigos QR de simuladores interactivos. (Plazo: 2026-09-25)
• [Alberto Bustos]: Redactar las orientaciones metodológicas de las 5 etapas de Design Thinking para el personal docente. (Plazo: 2026-09-30)`,
    acuerdos: [
      {
        id: 'ac-j17-1',
        acuerdo: 'Consolidar el catálogo de WebApps y códigos QR de simuladores interactivos.',
        responsable: 'Allan Morera',
        fechaLimite: '2026-09-25',
        completado: true
      },
      {
        id: 'ac-j17-2',
        acuerdo: 'Redactar las orientaciones metodológicas de las 5 etapas de Design Thinking para el personal docente.',
        responsable: 'Alberto Bustos',
        fechaLimite: '2026-09-30',
        completado: false
      }
    ],
    sintesisIA: 'Avance significativo en el diseño del proyecto semestral. Se cuenta con alternativas de simulación para todos los centros educativos.',
    estado: 'Completado',
    adjuntosOEnlaces: 'Esquema de 5 Etapas DT - Módulo 1 y 2',
    timestamp: '2026-09-17T08:30:00.000Z'
  },
  {
    id: 'reunion-allan-1',
    tipo: 'trabajo_allan',
    titulo: 'Jornada de Diseño Curricular y Articulación Pedagógica con Allan Morera',
    fecha: '2026-09-16',
    hora: '08:00',
    participantes: ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)'],
    temasTratados: 'Revisión y validación de estrategias metodológicas para los 10 saberes del Módulo 1 (Robótica, Computación Física y Algoritmos) con base en el currículo oficial establecido para el nivel de 9° año. Definición de los 3 momentos didácticos (Inicio, Desarrollo, Cierre), DUA, recursos unplugged y herramientas de evaluación. Definición sobre el indicador de Entorno de Programación sobre software textual o por bloques de acuerdo al equipamiento institucional, y validación del uso estratégico de simuladores web para optimizar tiempos lectivos.',
    acuerdos: [
      {
        id: 'ac-allan-1',
        acuerdo: 'Validar que los 10 indicadores de Módulo 1 respondan a la matriz de distribución evaluativa (Cotidiano, Tareas, Proyecto).',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-20',
        completado: true
      },
      {
        id: 'ac-allan-2',
        acuerdo: 'Estructurar el catálogo de WebApps y simuladores interactivos con códigos QR como apoyo a la mediación docente.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-25',
        completado: true
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
        fechaLimite: '2026-09-20',
        completado: true
      },
      {
        id: 'ac-allan-5',
        acuerdo: 'Consolidar las simulaciones digitales como una alternativa valiosa para mitigar la limitación de kits y optimizar lecciones.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-22',
        completado: true
      },
      {
        id: 'ac-allan-6',
        acuerdo: 'Validar procesos de prototipos físicos o digitales en computación física y robótica, contemplando algoritmos y programación.',
        responsable: 'Allan Morera & Alberto Bustos',
        fechaLimite: '2026-09-24',
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
    aspectosPuntuales: `Resumen General:
Alineación técnica con la coordinación general de Formación Tecnológica MEP, definiendo la ruta de trabajo, entregables y cortes de validación.

Aspectos Abordados por Viñeta:
• Capacitación PIA: Protocolo de sistematización y estructura de entregas.
• Cronograma Oficial: Hitos del 11 de setiembre al 4 de diciembre de 2026.
• Cortes Valorativos: Primer corte el 16 de octubre y segundo corte el 20 de noviembre.`,
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
    aspectosPuntuales: `Resumen General:
Apertura del proceso de diseño curricular e inducción a la arquitectura de Formación Tecnológica en Tercer Ciclo.

Aspectos Abordados por Viñeta:
• Diagnóstico Curricular: Análisis de los saberes de 7° y 8° año para asegurar la progresión técnica hacia 9°.
• Delimitación de Módulos: Módulo 1 en Robótica/Algoritmos y Módulo 2 en Ciencia de Datos/IA/3D.`,
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
