// Catálogo Oficial de Ejes Transversales y Perfil de Salida (III Ciclo - 9° Año MEP 2026)
import { EjeTransversalConfig, PerfilSalidaRasgoNoveno, EjeTransversalTipo } from '../types';

export const EJES_TRANSVERSALES_OFICIALES: Record<EjeTransversalTipo, EjeTransversalConfig> = {
  sostenibilidad_ambiental: {
    id: 'sostenibilidad_ambiental',
    nombre: 'Cultura Ambiental para el Desarrollo Sostenible y Eficiencia Energética',
    nombreCorto: 'Sostenibilidad Ambiental',
    icono: 'Leaf',
    color: 'emerald',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    textColor: 'text-emerald-700 dark:text-emerald-300',
    borderColor: 'border-emerald-400 dark:border-emerald-600',
    descripcion: 'Promueve la conciencia ecológica, el uso racional de recursos, la gestión responsable de residuos tecnológicos (e-waste) y el diseño de automatizaciones orientadas al ahorro energético y la conservación del entorno.',
    aplicacionEnNoveno: 'Desarrollo de prototipos domóticos que optimizan el consumo eléctrico (sensores de luz/presencia), monitoreo automatizado de variables ambientales (temperatura, humedad de suelos) y reducción de huella de carbono digital.',
    ejemplosProyectos: [
      'Invernadero automatizado con riego por goteo según humedad de suelo',
      'Sistema de iluminación eficiente para aulas con sensores LDR y PIR',
      'Monitoreo de calidad de aire y temperatura en espacios escolares'
    ]
  },
  inclusion_derechos: {
    id: 'inclusion_derechos',
    nombre: 'Inclusión, Accesibilidad Universal y Diseño Universal para el Aprendizaje (DUA)',
    nombreCorto: 'Inclusión y Accesibilidad',
    icono: 'Users',
    color: 'purple',
    bgLight: 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
    textColor: 'text-purple-700 dark:text-purple-300',
    borderColor: 'border-purple-400 dark:border-purple-600',
    descripcion: 'Garantiza que las soluciones tecnológicas consideren la diversidad humana, eliminando barreras de acceso físico, sensorial o cognitivo mediante tecnologías asistivas y diseño centrado en las personas.',
    aplicacionEnNoveno: 'Diseño de dispositivos domóticos con retroalimentación sonora y lumínica para personas con discapacidad, interfaces digitales con alto contraste y ergonomía física en el modelado 3D.',
    ejemplosProyectos: [
      'Dispositivo de alerta multisensorial (buzzer + LEDs) para timbres escolares accesibles',
      'Soporte ergonómico impreso en 3D para teclados o punteros adaptados',
      'Formularios accesibles con lectura por voz y validación simplificada'
    ]
  },
  salud_bienestar_digital: {
    id: 'salud_bienestar_digital',
    nombre: 'Salud Integral, Ergonomía y Bienestar Digital',
    nombreCorto: 'Salud y Bienestar Digital',
    icono: 'HeartPulse',
    color: 'amber',
    bgLight: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    textColor: 'text-amber-700 dark:text-amber-300',
    borderColor: 'border-amber-400 dark:border-amber-600',
    descripcion: 'Fomenta hábitos posturales adecuados en el uso de dispositivos, pausas activas, balance entre vida física y digital, así como la prevención de tecnoestrés y riesgos psicosociales en línea.',
    aplicacionEnNoveno: 'Análisis ergonómico en la estación de computación, diseño de recordatorios automatizados de pausas activas con microcontroladores y gestión del tiempo de pantalla en proyectos de software.',
    ejemplosProyectos: [
      'Alarma de postura ergonómica con sensor ultrasónico de distancia en la pantalla',
      'Temporizador Pomodoro físico con micro:bit para pausas activas en el laboratorio',
      'Campaña interactiva de concientización sobre huella digital y bienestar emocional'
    ]
  },
  etica_paz_ciudadania: {
    id: 'etica_paz_ciudadania',
    nombre: 'Derechos Humanos, Paz, Ciberdefensa y Juicio Ético de la IA',
    nombreCorto: 'Ética, Ciberseguridad y Paz',
    icono: 'ShieldCheck',
    color: 'blue',
    bgLight: 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    textColor: 'text-blue-700 dark:text-blue-300',
    borderColor: 'border-blue-400 dark:border-blue-600',
    descripcion: 'Desarrolla el pensamiento crítico sobre la privacidad del dato, la seguridad de la información, el respeto a la propiedad intelectual (licenciamiento Creative Commons) y la evaluación de sesgos en algoritmos e Inteligencia Artificial.',
    aplicacionEnNoveno: 'Auditoría de ciberseguridad en redes locales, gestión ética de la identidad digital, respeto a los derechos de autor en productos digitales y uso responsable y verificado de IA generativa.',
    ejemplosProyectos: [
      'Guía de auditoría escolar contra phishing y configuración segura de contraseñas',
      'Banco de recursos educativos licenciados bajo Creative Commons con atribución rigurosa',
      'Análisis comparativo de sesgos de género o culturales en respuestas de modelos de IA'
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
    ejesTransversalesAsociados: ['etica_paz_ciudadania', 'salud_bienestar_digital']
  },
  {
    id: 'perfil_robotica_iot',
    codigo: 'PS-NOV-02',
    titulo: 'Computación Física, Prototipado y Automatización',
    descripcion: 'Construye prototipos automatizados y cinemáticos integrando microcontroladores, sensores y actuadores mecánicos aplicados a la domótica y retos comunitarios sostenibles.',
    dimension: 'Prototipado y Robótica',
    ejesTransversalesAsociados: ['sostenibilidad_ambiental', 'inclusion_derechos']
  },
  {
    id: 'perfil_datos_relacionales',
    codigo: 'PS-NOV-03',
    titulo: 'Gestión Relacional del Dato e Inteligencia de Información',
    descripcion: 'Estructura bases de datos relacionales, ejecuta consultas condicionales y diseña formularios de captura garantizando la confiabilidad, integridad y privacidad del dato.',
    dimension: 'Ciencia de Datos y BD',
    ejesTransversalesAsociados: ['etica_paz_ciudadania', 'inclusion_derechos']
  },
  {
    id: 'perfil_modelado_3d',
    codigo: 'PS-NOV-04',
    titulo: 'Diseño Paramétrico y Fabricación Digital 3D',
    descripcion: 'Modela piezas tridimensionales paramétricas y funcionales orientadas a resolver necesidades de ergonomía, accesibilidad física o carcasas para sistemas electrónicos.',
    dimension: 'Fabricación 3D',
    ejesTransversalesAsociados: ['inclusion_derechos', 'sostenibilidad_ambiental']
  },
  {
    id: 'perfil_etica_ia_seguridad',
    codigo: 'PS-NOV-05',
    titulo: 'Ciberseguridad, Propiedad Intelectual y Ética de la IA',
    descripcion: 'Evalúa críticamente el impacto de la inteligencia artificial generativa, protege su huella digital, aplica licencias Creative Commons y previene riesgos en redes de comunicación.',
    dimension: 'Ética y Ciudadanía Digital',
    ejesTransversalesAsociados: ['etica_paz_ciudadania', 'salud_bienestar_digital']
  },
  {
    id: 'perfil_actitudes_resilientes',
    codigo: 'PS-NOV-06',
    titulo: 'Prácticas y Actitudes Computacionales Resilientes',
    descripcion: 'Demuestra persistencia ante el error en procesos de depuración técnica, rigor metodológico en el trabajo colaborativo e iniciativa en proyectos comunitarios integrados.',
    dimension: 'Prácticas y Actitudes',
    ejesTransversalesAsociados: ['salud_bienestar_digital', 'etica_paz_ciudadania']
  }
];

// Mapeo Rápido de Ejes por Saber
export const MAPEO_EJES_POR_SABER: Record<string, EjeTransversalTipo[]> = {
  // Módulo 1
  movimiento_mecanismos: ['sostenibilidad_ambiental', 'salud_bienestar_digital'],
  microcontrolador: ['sostenibilidad_ambiental', 'inclusion_derechos'],
  sensor: ['sostenibilidad_ambiental', 'salud_bienestar_digital'],
  actuador: ['sostenibilidad_ambiental', 'inclusion_derechos'],
  domotica: ['sostenibilidad_ambiental', 'inclusion_derechos'],
  algoritmo: ['etica_paz_ciudadania'],
  entorno_programacion: ['salud_bienestar_digital', 'etica_paz_ciudadania'],
  estructuras_control: ['etica_paz_ciudadania'],
  dato: ['etica_paz_ciudadania', 'inclusion_derechos'],
  practicas_actitudes_m1: ['salud_bienestar_digital', 'etica_paz_ciudadania'],
  
  // Módulo 2
  plataformas_contenido: ['inclusion_derechos', 'etica_paz_ciudadania'],
  redes_comunicacion: ['etica_paz_ciudadania', 'salud_bienestar_digital'],
  riesgos_linea: ['etica_paz_ciudadania', 'salud_bienestar_digital'],
  huella_digital: ['etica_paz_ciudadania', 'salud_bienestar_digital'],
  modelado_3d: ['inclusion_derechos', 'sostenibilidad_ambiental'],
  gestor_bd: ['etica_paz_ciudadania', 'inclusion_derechos'],
  derechos_autor: ['etica_paz_ciudadania'],
  desafios_ia: ['etica_paz_ciudadania', 'inclusion_derechos'],
  herramientas_generativas: ['etica_paz_ciudadania', 'salud_bienestar_digital'],
  practicas_actitudes_m2: ['salud_bienestar_digital', 'etica_paz_ciudadania']
};
