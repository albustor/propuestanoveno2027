// =========================================================================================
// CATÁLOGO OFICIAL DE EJES TRANSVERSALES MEP 2026 - SECUNDARIA (III CICLO / 9° AÑO)
// Dirección de Recursos Tecnológicos en Educación (DRTE - MEP)
// Programa Nacional de Formación Tecnológica (PNFT)
// =========================================================================================

import { EjeTransversalConfig, PerfilSalidaRasgoNoveno, EjeTransversalTipo } from '../types';

export const EJES_TRANSVERSALES_OFICIALES: Record<EjeTransversalTipo, EjeTransversalConfig> = {
  pensamiento_computacional: {
    id: 'pensamiento_computacional',
    nombre: 'Eje transversal: Pensamiento computacional',
    nombreCorto: 'Pensamiento Computacional',
    icono: 'Brain',
    color: 'indigo',
    bgLight: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
    textColor: 'text-indigo-700 dark:text-indigo-300',
    borderColor: 'border-indigo-400 dark:border-indigo-600',
    descripcion: 'Desarrolla habilidades para resolver problemas mediante la formulación de algoritmos eficientes, modularización, descomposición sistemática y reconocimiento de patrones.',
    dimensiones: [
      {
        id: 'pensamiento_algoritmico',
        nombre: 'Pensamiento algorítmico',
        descriptor: 'Construye algoritmos teniendo en cuenta la eficiencia y el rendimiento para la resolución de problemas.'
      },
      {
        id: 'abstraccion',
        nombre: 'Abstracción',
        descriptor: 'Utiliza funciones o procedimientos para encapsular y abstraer bloques de código reutilizables. Esto le permite modularizar y organizar su código, promoviendo una mayor eficiencia y legibilidad.'
      },
      {
        id: 'descomposicion',
        nombre: 'Descomposición',
        descriptor: 'Descompone problemas complejos en subproblemas más pequeños y los aborda de manera sistemática; para ello, utiliza diagramas de flujo u otras técnicas de representación visual para planificar y organizar su pensamiento.'
      },
      {
        id: 'reconocimiento_patrones',
        nombre: 'Reconocimiento de patrones',
        descriptor: 'Analiza patrones en datos, algoritmos y problemas para obtener regularidades y estructuras repetitivas que le ayuden a entender y resolver problemas de manera eficiente.'
      }
    ],
    aplicacionEnNoveno: 'Modularización de código en funciones, diseño de flujogramas estructurados, análisis de condiciones de control y calibración de ciclos en sistemas robóticos y algorítmicos.',
    ejemplosProyectos: [
      'Algoritmo modular de control cinemático para robots móviles',
      'Diagramación y depuración sistemática de lógica de toma de decisiones en microcontroladores',
      'Análisis de secuencias sensoriales y estructuras repetitivas en simuladores de circuitos'
    ]
  },
  ciudadania_etica_digital: {
    id: 'ciudadania_etica_digital',
    nombre: 'Eje transversal: Ciudadanía y Ética digital',
    nombreCorto: 'Ciudadanía y Ética Digital',
    icono: 'ShieldCheck',
    color: 'sky',
    bgLight: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
    textColor: 'text-sky-700 dark:text-sky-300',
    borderColor: 'border-sky-400 dark:border-sky-600',
    descripcion: 'Promueve la conciencia sobre la huella digital y el impacto de la actividad en línea, así como la aplicación de principios éticos, empatía, respeto y convivencia digital saludable.',
    dimensiones: [
      {
        id: 'ciudadania',
        nombre: 'Ciudadanía',
        descriptor: 'Reflexiona sobre cómo su actividad en línea genera rastros permanentes y la importancia de ser consciente de que su huella digital puede impactar en su reputación y en futuras oportunidades. Se espera que desarrolle habilidades para gestionar de manera responsable su presencia en línea y proteger su imagen digital.'
      },
      {
        id: 'etica_digital',
        nombre: 'Ética digital',
        descriptor: 'Aplica los conceptos de ética y moralidad en el entorno digital. Esto incluye fomentar la empatía, el respeto y la consideración hacia los demás en línea, evitando el ciberacoso y promoviendo relaciones digitales saludables.'
      }
    ],
    aplicacionEnNoveno: 'Gestión responsable de datos sensoriales y personales, privacidad en el uso de plataformas e IoT, análisis de sesgos éticos en la inteligencia artificial y prevención del ciberacoso.',
    ejemplosProyectos: [
      'Auditoría ética de recolección de datos en dispositivos inteligentes',
      'Guía de buenas prácticas y seguridad en la gestión de contraseñas y huella digital',
      'Análisis crítico del impacto ético de los asistentes virtuales y la IA generativa'
    ]
  },
  emprendimiento_innovacion: {
    id: 'emprendimiento_innovacion',
    nombre: 'Eje transversal: Emprendimiento e Innovación',
    nombreCorto: 'Emprendimiento e Innovación',
    icono: 'Sparkles',
    color: 'emerald',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-400 dark:border-emerald-600',
    descripcion: 'Fomenta el liderazgo colaborativo, la toma de decisiones en equipo, la delegación de roles y la integración creativa de herramientas tecnológicas para solucionar problemas reales.',
    dimensiones: [
      {
        id: 'emprendimiento',
        nombre: 'Emprendimiento',
        descriptor: 'Desarrolla habilidades de liderazgo trabajando en equipo donde tenga que asumir roles de liderazgo, tomar decisiones y delegar responsabilidades. Esto le ayudará a comprender la importancia de la colaboración y la comunicación efectiva en un entorno empresarial.'
      },
      {
        id: 'innovacion',
        nombre: 'Innovación',
        descriptor: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras a los problemas que debe resolver.'
      }
    ],
    aplicacionEnNoveno: 'Desarrollo de proyectos ABP en equipos con roles rotativos, prototipado de maquetas funcionales y diseño de soluciones automatizadas para retos comunitarios.',
    ejemplosProyectos: [
      'Prototipo automatizado e inclusivo desarrollado en equipo con metodología Design Thinking',
      'Integración innovadora de modelado 3D y bases de datos para optimizar recursos del colegio',
      'Diseño y validación de una solución tecnológica con usuarios reales en la comunidad'
    ]
  }
};

export const PERFIL_SALIDA_NOVENO_RASGOS: PerfilSalidaRasgoNoveno[] = [
  {
    id: 'perfil_pc_modular',
    codigo: 'PS-NOV-01',
    titulo: 'Pensamiento Computacional y Lógica Modular',
    descripcion: 'Formula y depura algoritmos estructurados con funciones, parámetros y estructuras de control condicionales y repetitivas para resolver problemas complejos del entorno escolar y comunal.',
    dimension: 'Pensamiento Computacional',
    ejesTransversalesAsociados: ['pensamiento_computacional', 'ciudadania_etica_digital']
  },
  {
    id: 'perfil_robotica_iot',
    codigo: 'PS-NOV-02',
    titulo: 'Computación Física, Prototipado y Automatización',
    descripcion: 'Construye prototipos automatizados y cinemáticos integrando microcontroladores, sensores y actuadores mecánicos aplicados a la domótica y retos comunitarios.',
    dimension: 'Prototipado y Robótica',
    ejesTransversalesAsociados: ['emprendimiento_innovacion', 'pensamiento_computacional']
  },
  {
    id: 'perfil_datos_relacionales',
    codigo: 'PS-NOV-03',
    titulo: 'Gestión Relacional del Dato e Inteligencia de Información',
    descripcion: 'Estructura bases de datos relacionales, ejecuta consultas condicionales y diseña formularios de captura garantizando la confiabilidad, integridad y privacidad del dato.',
    dimension: 'Ciencia de Datos y BD',
    ejesTransversalesAsociados: ['ciudadania_etica_digital', 'pensamiento_computacional']
  },
  {
    id: 'perfil_modelado_3d',
    codigo: 'PS-NOV-04',
    titulo: 'Diseño Paramétrico y Fabricación Digital 3D',
    descripcion: 'Modela piezas tridimensionales paramétricas y funcionales orientadas a resolver necesidades de ergonomía o carcasas para sistemas electrónicos.',
    dimension: 'Fabricación 3D',
    ejesTransversalesAsociados: ['emprendimiento_innovacion', 'pensamiento_computacional']
  },
  {
    id: 'perfil_etica_ia_seguridad',
    codigo: 'PS-NOV-05',
    titulo: 'Ciberseguridad, Propiedad Intelectual y Ética de la IA',
    descripcion: 'Evalúa críticamente el impacto de la inteligencia artificial generativa, protege su huella digital, aplica licencias Creative Commons y previene riesgos en redes de comunicación.',
    dimension: 'Ética y Ciudadanía Digital',
    ejesTransversalesAsociados: ['ciudadania_etica_digital', 'emprendimiento_innovacion']
  },
  {
    id: 'perfil_actitudes_resilientes',
    codigo: 'PS-NOV-06',
    titulo: 'Prácticas y Actitudes Computacionales Resilientes',
    descripcion: 'Demuestra persistencia ante el error en procesos de depuración técnica, rigor metodológico en el trabajo colaborativo e iniciativa en proyectos comunitarios integrados.',
    dimension: 'Prácticas y Actitudes',
    ejesTransversalesAsociados: ['emprendimiento_innovacion', 'pensamiento_computacional']
  }
];

// Mapeo Rápido de Ejes por Saber
export const MAPEO_EJES_POR_SABER: Record<string, EjeTransversalTipo[]> = {
  // Módulo 1
  movimiento_mecanismos: ['pensamiento_computacional', 'emprendimiento_innovacion'],
  microcontrolador: ['pensamiento_computacional', 'emprendimiento_innovacion'],
  sensor: ['pensamiento_computacional', 'ciudadania_etica_digital'],
  actuador: ['emprendimiento_innovacion', 'pensamiento_computacional'],
  domotica: ['emprendimiento_innovacion', 'pensamiento_computacional'],
  prototipos: ['emprendimiento_innovacion', 'pensamiento_computacional'],
  algoritmo: ['pensamiento_computacional', 'ciudadania_etica_digital'],
  entorno_programacion: ['pensamiento_computacional', 'emprendimiento_innovacion'],
  estructuras_control: ['pensamiento_computacional', 'ciudadania_etica_digital'],
  dato: ['ciudadania_etica_digital', 'pensamiento_computacional'],
  iot: ['pensamiento_computacional', 'ciudadania_etica_digital'],
  practicas_actitudes_m1: ['emprendimiento_innovacion', 'pensamiento_computacional'],
  
  // Módulo 2
  plataformas_contenido: ['emprendimiento_innovacion', 'ciudadania_etica_digital'],
  redes_comunicacion: ['ciudadania_etica_digital', 'pensamiento_computacional'],
  riesgos_linea: ['ciudadania_etica_digital'],
  huella_digital: ['ciudadania_etica_digital'],
  modelado_3d: ['emprendimiento_innovacion', 'pensamiento_computacional'],
  gestor_bd: ['pensamiento_computacional', 'ciudadania_etica_digital'],
  derechos_autor: ['ciudadania_etica_digital'],
  desafios_ia: ['ciudadania_etica_digital', 'pensamiento_computacional'],
  herramientas_generativas: ['ciudadania_etica_digital', 'emprendimiento_innovacion'],
  practicas_actitudes_m2: ['emprendimiento_innovacion', 'pensamiento_computacional']
};

// Mapeo Específico Principal con Dimensión y Justificación Pedagógica por Indicador
export interface EjeEspecificoDetalle {
  ejePrincipal: EjeTransversalTipo;
  dimensionId: string;
  dimensionNombre: string;
  descriptorOficial: string;
  justificacion: string;
  aplicacionAula: string;
}

export const MAPEO_EJE_ESPECIFICO_DETALLE: Record<string, EjeEspecificoDetalle> = {
  // --- MÓDULO 1 ---
  movimiento_mecanismos: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'descomposicion',
    dimensionNombre: 'Descomposición',
    descriptorOficial: 'Descompone problemas complejos en subproblemas más pequeños y los aborda de manera sistemática.',
    justificacion: 'Descomposición cinemática: análisis de transmisión de fuerza y velocidad dividiendo el sistema en subsistemas de poleas y engranajes.',
    aplicacionAula: 'Cálculo y prueba por etapas de la relación de transmisión para generar torque o velocidad mecánica.'
  },
  microcontrolador: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'abstraccion',
    dimensionNombre: 'Abstracción',
    descriptorOficial: 'Utiliza funciones o procedimientos para encapsular y abstraer bloques de código reutilizables.',
    justificacion: 'Abstracción de hardware: configuración de puertos I/O y mapeo de señales electrónicas mediante módulos de código reutilizables.',
    aplicacionAula: 'Programación modular de rutinas de control para gestionar entradas y salidas del microcontrolador.'
  },
  sensor: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'reconocimiento_patrones',
    dimensionNombre: 'Reconocimiento de patrones',
    descriptorOficial: 'Analiza patrones en datos, algoritmos y problemas para obtener regularidades y estructuras repetitivas.',
    justificacion: 'Reconocimiento de patrones en lecturas físicas continuas y discretas para definir rangos y calibración sensorial.',
    aplicacionAula: 'Identificación de umbrales en sensores analógicos (LDR) y digitales (PIR) para automatizar respuestas.'
  },
  actuador: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'innovacion',
    dimensionNombre: 'Innovación',
    descriptorOficial: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras a los problemas que debe resolver.',
    justificacion: 'Solución innovadora física: transformación de señales digitales en movimiento y alertas útiles para la comunidad escolar.',
    aplicacionAula: 'Integración de servomotores y buzzers en prototipos que solucionan barreras físicas o alertas escolares.'
  },
  domotica: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'innovacion',
    dimensionNombre: 'Innovación',
    descriptorOficial: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras a los problemas que debe resolver.',
    justificacion: 'Diseño integral de automatizaciones innovadoras contextualizadas a retos del hogar y el entorno educativo.',
    aplicacionAula: 'Diseño y montaje de maqueta de hogar o aula inteligente con gestión automatizada de luces y accesos.'
  },
  prototipos: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'emprendimiento',
    dimensionNombre: 'Emprendimiento',
    descriptorOficial: 'Desarrolla habilidades de liderazgo trabajando en equipo donde tenga que asumir roles de liderazgo, tomar decisiones y delegar responsabilidades.',
    justificacion: 'Liderazgo y trabajo en equipo para la construcción, integración y prueba de prototipos funcionales.',
    aplicacionAula: 'Distribución de roles técnicos (diseño, armado, programación, pruebas) durante el prototipado ABP.'
  },
  algoritmo: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'pensamiento_algoritmico',
    dimensionNombre: 'Pensamiento algorítmico',
    descriptorOficial: 'Construye algoritmos teniendo en cuenta la eficiencia y el rendimiento para la resolución de problemas.',
    justificacion: 'Construcción formal de secuencias lógicas paso a paso con máxima claridad, precisión y eficiencia.',
    aplicacionAula: 'Diseño de diagramas de flujo normalizados para modelar la lógica de control del sistema automatizado.'
  },
  entorno_programacion: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'abstraccion',
    dimensionNombre: 'Abstracción',
    descriptorOficial: 'Utiliza funciones o procedimientos para encapsular y abstraer bloques de código reutilizables.',
    justificacion: 'Modularidad en entornos de programación (bloques y texto) para estructurar código legible y mantenible.',
    aplicacionAula: 'Creación de procedimientos y funciones con parámetros en IDEs visuales y textuales.'
  },
  estructuras_control: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'pensamiento_algoritmico',
    dimensionNombre: 'Pensamiento algorítmico',
    descriptorOficial: 'Construye algoritmos teniendo en cuenta la eficiencia y el rendimiento para la resolución de problemas.',
    justificacion: 'Toma de decisiones lógicas mediante condicionales y bucles optimizados para responder a eventos del entorno.',
    aplicacionAula: 'Codificación de estructuras condicionales anidadas y ciclos repetitivos para gobernar el comportamiento del prototipo.'
  },
  dato: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'etica_digital',
    dimensionNombre: 'Ética digital',
    descriptorOficial: 'Aplica los conceptos de ética y moralidad en el entorno digital.',
    justificacion: 'Responsabilidad en el tratamiento, almacenamiento y uso de datos recolectados por sensores y sistemas digitales.',
    aplicacionAula: 'Validación de integridad del dato y protocolos de no vulneración de la privacidad estudiantil.'
  },
  iot: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'ciudadania',
    dimensionNombre: 'Ciudadanía',
    descriptorOficial: 'Reflexiona sobre cómo su actividad en línea genera rastros permanentes y la importancia de ser consciente de su presencia digital.',
    justificacion: 'Conciencia crítica de cómo los dispositivos interconectados transmiten datos y generan huellas digitales institucionales.',
    aplicacionAula: 'Análisis de protocolos de comunicación IoT y medidas de protección de la red escolar.'
  },
  practicas_actitudes_m1: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'emprendimiento',
    dimensionNombre: 'Emprendimiento',
    descriptorOficial: 'Desarrolla habilidades de liderazgo trabajando en equipo donde tenga que asumir roles de liderazgo, tomar decisiones y delegar responsabilidades.',
    justificacion: 'Cultura de persistencia ante el error, tolerancia a la frustración y aprendizaje colaborativo durante la depuración técnica.',
    aplicacionAula: 'Bitácora colaborativa de resolución de errores y retroalimentación entre pares.'
  },

  // --- MÓDULO 2 ---
  plataformas_contenido: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'innovacion',
    dimensionNombre: 'Innovación',
    descriptorOficial: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras a los problemas que debe resolver.',
    justificacion: 'Creación de instrumentos digitales para la recolección comunitaria y presentación innovadora de información.',
    aplicacionAula: 'Diseño de encuestas digitales y tableros interactivos para diagnósticos escolares.'
  },
  redes_comunicacion: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'ciudadania',
    dimensionNombre: 'Ciudadanía',
    descriptorOficial: 'Reflexiona sobre cómo su actividad en línea genera rastros permanentes y la importancia de gestionar responsablemente su presencia en línea.',
    justificacion: 'Comprensión de la arquitectura de redes y seguridad de la información que circula en medios digitales.',
    aplicacionAula: 'Configuración segura de perfiles y reconocimiento de puertos y canales de transmisión de datos.'
  },
  riesgos_linea: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'etica_digital',
    dimensionNombre: 'Ética digital',
    descriptorOficial: 'Aplica los conceptos de ética y moralidad en el entorno digital. Evita el ciberacoso y promueve relaciones digitales saludables.',
    justificacion: 'Prevención de fraudes, malware, phishing y fomento de una convivencia digital respetuosa y segura.',
    aplicacionAula: 'Taller de detección de enlaces fraudulentos y protocolo de reporte de ciberacoso.'
  },
  huella_digital: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'ciudadania',
    dimensionNombre: 'Ciudadanía',
    descriptorOficial: 'Reflexiona sobre cómo su actividad en línea genera rastros permanentes y su impacto en la reputación.',
    justificacion: 'Auditoría de presencia digital y desarrollo de criterios de protección de la identidad en línea.',
    aplicacionAula: 'Mapeo de la propia huella digital y configuración de privacidad en servicios web y redes sociales.'
  },
  modelado_3d: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'innovacion',
    dimensionNombre: 'Innovación',
    descriptorOficial: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras.',
    justificacion: 'Fabricación digital tridimensional paramétrica para materializar soluciones físicas personalizadas.',
    aplicacionAula: 'Modelado 3D en Tinkercad/FreeCAD de soportes o carcasas para proyectos escolares.'
  },
  gestor_bd: {
    ejePrincipal: 'pensamiento_computacional',
    dimensionId: 'descomposicion',
    dimensionNombre: 'Descomposición',
    descriptorOficial: 'Descompone problemas complejos en subproblemas más pequeños y los aborda de manera sistemática.',
    justificacion: 'Descomposición de la información en entidades, atributos, llaves primarias/foráneas y relaciones normalizadas.',
    aplicacionAula: 'Diseño del modelo entidad-relación y consultas SQL selectivas para la toma de decisiones.'
  },
  derechos_autor: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'etica_digital',
    dimensionNombre: 'Ética digital',
    descriptorOficial: 'Aplica los conceptos de ética y moralidad en el entorno digital, respetando los derechos de autor y licencias.',
    justificacion: 'Uso ético de contenidos ajenos, licenciamiento Creative Commons y atribución rigurosa de fuentes.',
    aplicacionAula: 'Curaduría y licenciamiento de contenidos multimedia escolares con Creative Commons.'
  },
  desafios_ia: {
    ejePrincipal: 'ciudadania_etica_digital',
    dimensionId: 'etica_digital',
    dimensionNombre: 'Ética digital',
    descriptorOficial: 'Aplica los conceptos de ética y moralidad en el entorno digital y reflexiona críticamente sobre la tecnología.',
    justificacion: 'Pensamiento crítico sobre sesgos, discriminación algorítmica y privacidad en sistemas basados en IA.',
    aplicacionAula: 'Debate guiado sobre dilemas éticos y límites del uso de la IA en la sociedad.'
  },
  herramientas_generativas: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'innovacion',
    dimensionNombre: 'Innovación',
    descriptorOficial: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras.',
    justificacion: 'Uso productivo, crítico y ético de la IA generativa como asistente para la resolución de retos complejos.',
    aplicacionAula: 'Formulación de prompts estructurados para sintetizar información y generar alternativas de diseño.'
  },
  practicas_actitudes_m2: {
    ejePrincipal: 'emprendimiento_innovacion',
    dimensionId: 'emprendimiento',
    dimensionNombre: 'Emprendimiento',
    descriptorOficial: 'Desarrolla habilidades de liderazgo trabajando en equipo donde tenga que asumir roles de liderazgo, tomar decisiones y delegar responsabilidades.',
    justificacion: 'Colaboración efectiva, adaptabilidad y liderazgo técnico en proyectos digitales basados en datos.',
    aplicacionAula: 'Evaluación formativa del trabajo en equipo y toma colectiva de decisiones en el proyecto semestral.'
  }
};

export function getEjeEspecificoParaSaber(saberId: string): { ejeConfig: EjeTransversalConfig; detalle: EjeEspecificoDetalle } | null {
  const detalle = MAPEO_EJE_ESPECIFICO_DETALLE[saberId];
  if (!detalle) return null;
  const ejeConfig = EJES_TRANSVERSALES_OFICIALES[detalle.ejePrincipal];
  return { ejeConfig, detalle };
}
