// Saberes Procedimentales y Actitudinales Oficiales MEP 2026
import { SaberProcedimental, SaberActitudinal } from '../types';

export const SABERES_PROCEDIMENTALES_NOVENO: SaberProcedimental[] = [
  {
    "id": "reconoce_patrones",
    "nombre": "Reconoce patrones",
    "observable": "Predice a partir de las regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación."
  },
  {
    "id": "abstrae",
    "nombre": "Abstrae",
    "observable": "Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir, al resolver un problema o situación."
  },
  {
    "id": "generaliza",
    "nombre": "Generaliza",
    "observable": "Generaliza las funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos al resolver un problema o situación."
  },
  {
    "id": "transfiere",
    "nombre": "Transfiere",
    "observable": "Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación."
  },
  {
    "id": "modulariza",
    "nombre": "Modulariza",
    "observable": "Resuelve un problema por partes menos complejas, sin perder de vista el todo que las origina, al resolver un problema o situación."
  },
  {
    "id": "formula_algoritmos",
    "nombre": "Formula algoritmos",
    "observable": "Formula algoritmos por medio de una secuencia ordenada y detallada de pasos para resolver un problema o situación."
  },
  {
    "id": "remezcla",
    "nombre": "Remezcla",
    "observable": "Combina diferentes ideas, técnicas o soluciones existentes, con la autorización correspondiente, de manera innovadora y creativa para resolver un problema o situación."
  },
  {
    "id": "depura",
    "nombre": "Depura",
    "observable": "Valida el funcionamiento de los algoritmos en busca de errores para corregirlos al resolver un problema o situación."
  },
  {
    "id": "programa",
    "nombre": "Programa",
    "observable": "Programa mediante un entorno o IDE de programación para resolver un problema o situación."
  },
  {
    "id": "comunica",
    "nombre": "Comunica",
    "observable": "Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación."
  },
  {
    "id": "colabora",
    "nombre": "Colabora",
    "observable": "Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás."
  },
  {
    "id": "creativo",
    "nombre": "Piensa de forma creativa",
    "observable": "Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación."
  },
  {
    "id": "etica_seguridad",
    "nombre": "Maneja las tecnologías de forma ética y segura",
    "observable": "Aplica de manera consciente fundamentos de ética y seguridad digital al utilizar herramientas y recursos tecnológicos al resolver un problema o situación."
  }
];

export const SABERES_ACTITUDINALES_NOVENO: SaberActitudinal[] = [
  {
    "id": "precision",
    "nombre": "Gusto por la precisión",
    "observable": "Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles."
  },
  {
    "id": "aprender_error",
    "nombre": "Aprender del error",
    "observable": "Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje."
  },
  {
    "id": "flexibilidad",
    "nombre": "Flexibilidad para manejar problemas",
    "observable": "Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos."
  },
  {
    "id": "tolerancia_frustracion",
    "nombre": "Tolerancia a la frustración",
    "observable": "Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia."
  }
];

// Mapeo Rápido de Diccionarios
export const DICCIONARIO_PROCEDIMENTALES: Record<string, SaberProcedimental> = 
  Object.fromEntries(SABERES_PROCEDIMENTALES_NOVENO.map((s) => [s.id, s]));

export const DICCIONARIO_ACTITUDINALES: Record<string, SaberActitudinal> = 
  Object.fromEntries(SABERES_ACTITUDINALES_NOVENO.map((s) => [s.id, s]));

export interface DistribucionSaberesIndicador {
  saberId: string;
  saberNombre: string;
  procedimientoTecnicoEspecifico: string;
  saberesProcedimentalesIds: string[];
  saberesActitudinalesIds: string[];
  justificacionPedagogica: string;
}

// Distribución Equitativa y Completa de Saberes para Módulo 1 (Robótica y Algoritmos)
export const DISTRIBUCION_SABERES_M1: Record<string, DistribucionSaberesIndicador> = {
  movimiento_mecanismos: {
    saberId: 'movimiento_mecanismos',
    saberNombre: 'Movimiento en mecanismos',
    procedimientoTecnicoEspecifico: 'Cálculo de relación de transmisión (fuerza vs. velocidad), ensamble físico/virtual de trenes de engranajes y poleas, y medición de torque.',
    saberesProcedimentalesIds: ['modulariza', 'abstrae', 'depura', 'colabora'],
    saberesActitudinalesIds: ['precision', 'aprender_error'],
    justificacionPedagogica: 'El cálculo cinemático exige descomponer el sistema en subsistemas de transmisión (modularización) y ajustar tolerancias ante la fricción.'
  },
  microcontrolador: {
    saberId: 'microcontrolador',
    saberNombre: 'Microcontrolador',
    procedimientoTecnicoEspecifico: 'Mapeo de arquitectura de puertos, conexionado seguro de pines I/O digitales/analógicos y transferencia de firmware desde el IDE.',
    saberesProcedimentalesIds: ['reconoce_patrones', 'programa', 'depura', 'modulariza'],
    saberesActitudinalesIds: ['precision', 'tolerancia_frustracion'],
    justificacionPedagogica: 'La interacción con la placa requiere reconocer patrones de conexionado y persistir pacientemente ante fallas de compilación o pines mal configurados.'
  },
  sensor: {
    saberId: 'sensor',
    saberNombre: 'Sensor',
    procedimientoTecnicoEspecifico: 'Calibración de umbrales en sensores analógicos/digitales (LDR, PIR, ultrasonido, DHT) y procesamiento de señales físicas del entorno.',
    saberesProcedimentalesIds: ['abstrae', 'reconoce_patrones', 'depura', 'creativo'],
    saberesActitudinalesIds: ['precision', 'flexibilidad'],
    justificacionPedagogica: 'Interpretar lecturas del mundo físico demanda abstraer el ruido ambiental y flexibilizar los rangos de sensibilidad en el código.'
  },
  actuador: {
    saberId: 'actuador',
    saberNombre: 'Actuador',
    procedimientoTecnicoEspecifico: 'Control de servomotores con modulación PWM, activación de motores DC mediante puentes H y señalización multisensorial (LEDs/Buzzer).',
    saberesProcedimentalesIds: ['transfiere', 'modulariza', 'programa', 'colabora'],
    saberesActitudinalesIds: ['flexibilidad', 'aprender_error'],
    justificacionPedagogica: 'El accionamiento mecánico transfiere señales lógicas en trabajo físico real, requiriendo aprendizaje ante el bloqueo o desajuste motriz.'
  },
  domotica: {
    saberId: 'domotica',
    saberNombre: 'Domótica',
    procedimientoTecnicoEspecifico: 'Integración sistémica de subsistemas electrónicos, cinemáticos y de control en maquetas de automatización escolar y ahorro energético.',
    saberesProcedimentalesIds: ['generaliza', 'remezcla', 'creativo', 'colabora', 'etica_seguridad'],
    saberesActitudinalesIds: ['flexibilidad', 'tolerancia_frustracion'],
    justificacionPedagogica: 'La domótica combina creativamente soluciones previas (sensores + actuadores) bajo normas estrictas de seguridad eléctrica e impacto ecológico.'
  },
  prototipos: {
    saberId: 'prototipos',
    saberNombre: 'Prototipos',
    procedimientoTecnicoEspecifico: 'Construcción física, cableado estructurado, verificación de polaridades y validación funcional iterativa en equipo.',
    saberesProcedimentalesIds: ['creativo', 'remezcla', 'colabora', 'comunica', 'depura'],
    saberesActitudinalesIds: ['tolerancia_frustracion', 'aprender_error'],
    justificacionPedagogica: 'Prototipar es el núcleo del Design Thinking: demanda trabajo en equipo constructivo, comunicación asertiva y alta resiliencia ante el error.'
  },
  algoritmo: {
    saberId: 'algoritmo',
    saberNombre: 'Algoritmo',
    procedimientoTecnicoEspecifico: 'Diseño estructurado de secuencias lógicas mediante diagramas de flujo normalizados, tablas de decisión y pseudocódigo modular.',
    saberesProcedimentalesIds: ['formula_algoritmos', 'abstrae', 'reconoce_patrones', 'comunica'],
    saberesActitudinalesIds: ['precision', 'aprender_error'],
    justificacionPedagogica: 'Formular algoritmos sin ambigüedades exige rigor formal y pensamiento secuencial exacto para comunicar la solución al sistema.'
  },
  entorno_programacion: {
    saberId: 'entorno_programacion',
    saberNombre: 'Entorno de programación',
    procedimientoTecnicoEspecifico: 'Configuración del IDE (bloques y texto), importación de extensiones/librerías y estructuración modular del código fuente.',
    saberesProcedimentalesIds: ['programa', 'modulariza', 'remezcla', 'transfiere'],
    saberesActitudinalesIds: ['flexibilidad', 'tolerancia_frustracion'],
    justificacionPedagogica: 'El dominio del IDE permite transferir bloques lógicos a código textual adaptándose con flexibilidad al ritmo individual (DUA).'
  },
  estructuras_control: {
    saberId: 'estructuras_control',
    saberNombre: 'Estructuras de control',
    procedimientoTecnicoEspecifico: 'Programación de condicionales simples y anidados (if/else), bucles de repetición (while/for) y operadores lógicos booleanos.',
    saberesProcedimentalesIds: ['formula_algoritmos', 'programa', 'depura', 'generaliza'],
    saberesActitudinalesIds: ['precision', 'tolerancia_frustracion'],
    justificacionPedagogica: 'Las condiciones de borde y ciclos infinitos requieren depuración meticulosa y una búsqueda constante de la exactitud lógica.'
  },
  dato: {
    saberId: 'dato',
    saberNombre: 'Dato',
    procedimientoTecnicoEspecifico: 'Declaración y tipado de variables (int, float, boolean), conversión de unidades analógicas y validación de integridad.',
    saberesProcedimentalesIds: ['reconoce_patrones', 'abstrae', 'etica_seguridad', 'comunica'],
    saberesActitudinalesIds: ['precision', 'flexibilidad'],
    justificacionPedagogica: 'El tratamiento de variables sensoriales demanda precisión matemática y responsabilidad ética en la privacidad y fiabilidad de la medición.'
  },
  iot: {
    saberId: 'iot',
    saberNombre: 'IoT',
    procedimientoTecnicoEspecifico: 'Simulación de paquetes de telemetría y transmisión de estados de sensores en tiempo real para monitoreo remoto.',
    saberesProcedimentalesIds: ['transfiere', 'generaliza', 'etica_seguridad', 'comunica'],
    saberesActitudinalesIds: ['flexibilidad', 'aprender_error'],
    justificacionPedagogica: 'Conectar objetos a redes exige transferir la lógica local a un entorno distribuido con juicio ético sobre la ciberdefensa escolar.'
  },
  practicas_actitudes_m1: {
    saberId: 'practicas_actitudes_m1',
    saberNombre: 'Prácticas y Actitudes de Robótica y Algoritmos',
    procedimientoTecnicoEspecifico: 'Bitácora metacognitiva de debugging, análisis de causa-raíz en fallas de hardware/software y coevaluación en parejas.',
    saberesProcedimentalesIds: ['depura', 'colabora', 'comunica', 'creativo', 'etica_seguridad'],
    saberesActitudinalesIds: ['aprender_error', 'tolerancia_frustracion', 'precision', 'flexibilidad'],
    justificacionPedagogica: 'Consolida la dimensión socioafectiva y ética del estudiante ante la resolución sistemática de problemas computacionales.'
  }
};

export function getDistribucionSaberesParaIndicador(saberId: string): DistribucionSaberesIndicador | null {
  return DISTRIBUCION_SABERES_M1[saberId] || null;
}

