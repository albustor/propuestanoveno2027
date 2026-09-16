// =========================================================================================
// GUÍA DOCENTE DE FORMACIÓN TECNOLÓGICA MEP 2026 - SECUNDARIA (III CICLO / NOVENO AÑO)
// PERFILES DE SALIDA OFICIALES DE ESTUDIANTES POR ÁREA DE CONOCIMIENTO Y EJES TRANSVERSALES
// Dirección de Recursos Tecnológicos en Educación (DRTE - MEP)
// =========================================================================================

export interface SubareaPerfilSalida {
  nombre: string;
  descriptores: string[];
}

export interface AreaPerfilSalidaOficial {
  id: 'apropiacion_tecnologica' | 'programacion_algoritmos' | 'computacion_fisica_robotica' | 'ciencia_datos_ia';
  nombre: string;
  color: string;
  bgBadge: string;
  borderBadge: string;
  subareas: SubareaPerfilSalida[];
}

export interface EjeTransversalPerfilSalidaOficial {
  id: 'pensamiento_computacional' | 'ciudadania_etica_digital' | 'emprendimiento_innovacion';
  nombre: string;
  dimensiones: {
    nombre: string;
    descriptor: string;
  }[];
}

export const PERFILES_SALIDA_AREAS_MEP_2026: AreaPerfilSalidaOficial[] = [
  {
    id: 'apropiacion_tecnologica',
    nombre: 'Apropiación tecnológica y Digital',
    color: 'sky',
    bgBadge: 'bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300',
    borderBadge: 'border-sky-300 dark:border-sky-800',
    subareas: [
      {
        nombre: 'Subárea: Fundamentos de tecnología',
        descriptores: [
          'Implementa vocabulario técnico relacionado con la tecnología, tal como: software, hardware, IoT, protocolos de comunicación, software malicioso, riesgos en línea, IDE, hacker, huella digital, almacenamiento en la nube y base de datos.'
        ]
      },
      {
        nombre: 'Subárea: Experiencias de uso con la tecnología',
        descriptores: [
          'Utiliza de manera competente herramientas de comunicación digital, como el correo electrónico y los chats en línea, aplicando normas de netiqueta y seguridad en la comunicación, siendo consciente del comportamiento inapropiado en línea.',
          'Integra programas y aplicaciones de programación o productividad de diseño gráfico y edición de video para el desarrollo de proyectos creativos y producción de contenido, mediante la creación y edición de imágenes, videos y audio, para expresar sus ideas de manera efectiva.',
          'Realiza búsquedas efectivas en línea y evalúa críticamente la información que encuentra, distinguiendo entre fuentes confiables y no confiables, evaluando la calidad y la relevancia de la información, citando sus fuentes adecuadamente.',
          'Utiliza aplicaciones de almacenamiento en la nube, que le permiten trabajar de manera colaborativa.'
        ]
      },
      {
        nombre: 'Subárea: Seguridad digital y gestión de riesgos',
        descriptores: [
          'Aplica medidas de seguridad para proteger su privacidad y disminuir los riesgos en línea.'
        ]
      }
    ]
  },
  {
    id: 'programacion_algoritmos',
    nombre: 'Programación y Algoritmos',
    color: 'emerald',
    bgBadge: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300',
    borderBadge: 'border-emerald-300 dark:border-emerald-800',
    subareas: [
      {
        nombre: 'Subárea: Fundamentos de programación',
        descriptores: [
          'Diseña interfaces físicas o digitales para resolver problemas complejos de su contexto y así implementar funcionalidades y familiarizarse con el ciclo de vida de un programa o aplicación.',
          'Aplica conceptos de programación como funciones, variables, estructuras de datos y control de flujo en la solución programada, según lo requiera.'
        ]
      },
      {
        nombre: 'Subárea: Lenguajes de programación',
        descriptores: [
          'Crea prototipos de artefactos físicos programados en entornos de programación textual.',
          'Resuelve problemas mediante la programación por bloques o la programación textual.'
        ]
      }
    ]
  },
  {
    id: 'computacion_fisica_robotica',
    nombre: 'Computación física y Robótica',
    color: 'amber',
    bgBadge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300',
    borderBadge: 'border-amber-300 dark:border-amber-800',
    subareas: [
      {
        nombre: 'Subárea: Principios de computación física y robótica',
        descriptores: [
          'Aplica principios de diseño de robots incluyendo sus componentes y los desafíos éticos y legales.'
        ]
      },
      {
        nombre: 'Subárea: Mecánica y diseño de robots',
        descriptores: [
          'Implementa los diferentes tipos de mecanismos para generar fuerza y velocidad.'
        ]
      },
      {
        nombre: 'Subárea: Electrónica y circuitos',
        descriptores: [
          'Experimenta con componentes electrónicos básicos (resistencias y LEDs) y su conexión en distintos tipos de circuitos.'
        ]
      },
      {
        nombre: 'Subárea: Creación de prototipos',
        descriptores: [
          'Crea prototipos de artefactos físicos o robots que permitan utilizar una tarea o resolver un problema de la realidad.'
        ]
      }
    ]
  },
  {
    id: 'ciencia_datos_ia',
    nombre: 'Ciencia de datos e Inteligencia artificial',
    color: 'purple',
    bgBadge: 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300',
    borderBadge: 'border-purple-300 dark:border-purple-800',
    subareas: [
      {
        nombre: 'Subárea: Introducción a los datos',
        descriptores: [
          'Conoce la importancia de los datos en situaciones cotidianas como control de redes sociales, historial de navegación y localización.'
        ]
      },
      {
        nombre: 'Subárea: Organización y representación de datos',
        descriptores: [
          'Comprende la importancia de recolectar y organizar datos personales como gastos, notas, actividad física o salud.',
          'Conoce cómo se almacenan, gestionan y protegen los datos a lo largo de su ciclo de vida, aplicando principios de responsabilidad y seguridad digital.'
        ]
      },
      {
        nombre: 'Subárea: Introducción a la inteligencia artificial',
        descriptores: [
          'Conoce los fundamentos de la inteligencia artificial y reflexiona críticamente sobre sus beneficios, riesgos y desafíos en la actualidad.',
          'Identifica el funcionamiento de los asistentes virtuales y las herramientas generativas, comprendiendo la importancia de usarlos de forma segura, ética y responsable.'
        ]
      }
    ]
  }
];

export const PERFILES_SALIDA_EJES_TRANSVERSALES_MEP_2026: EjeTransversalPerfilSalidaOficial[] = [
  {
    id: 'pensamiento_computacional',
    nombre: 'Eje Transversal: Pensamiento computacional',
    dimensiones: [
      {
        nombre: 'Pensamiento algorítmico',
        descriptor: 'Construye algoritmos teniendo en cuenta la eficiencia y el rendimiento para la resolución de problemas.'
      },
      {
        nombre: 'Abstracción',
        descriptor: 'Utiliza funciones o procedimientos para encapsular y abstraer bloques de código reutilizables. Esto le permite modularizar y organizar su código, promoviendo una mayor eficiencia y legibilidad.'
      },
      {
        nombre: 'Descomposición',
        descriptor: 'Descompone problemas complejos en subproblemas más pequeños y los aborda de manera sistemática; para ello, utiliza diagramas de flujo u otras técnicas de representación visual para planificar y organizar su pensamiento.'
      },
      {
        nombre: 'Reconocimiento de patrones',
        descriptor: 'Analiza patrones en datos, algoritmos y problemas para obtener regularidades y estructuras repetitivas que le ayuden a entender y resolver problemas de manera eficiente.'
      }
    ]
  },
  {
    id: 'ciudadania_etica_digital',
    nombre: 'Eje Transversal: Ciudadanía y Ética digital',
    dimensiones: [
      {
        nombre: 'Ciudadanía',
        descriptor: 'Reflexiona sobre cómo su actividad en línea genera rastros permanentes y la importancia de ser consciente de que su huella digital puede impactar en su reputación y en futuras oportunidades. Se espera que desarrolle habilidades para gestionar de manera responsable su presencia en línea y proteger su imagen digital.'
      },
      {
        nombre: 'Ética digital',
        descriptor: 'Aplica los conceptos de ética y moralidad en el entorno digital. Esto incluye fomentar la empatía, el respeto y la consideración hacia los demás en línea, evitando el ciberacoso y promoviendo relaciones digitales saludables.'
      }
    ]
  },
  {
    id: 'emprendimiento_innovacion',
    nombre: 'Eje Transversal: Emprendimiento e Innovación',
    dimensiones: [
      {
        nombre: 'Emprendimiento',
        descriptor: 'Desarrolla habilidades de liderazgo trabajando en equipo donde tenga que asumir roles de liderazgo, tomar decisiones y delegar responsabilidades. Esto le ayudará a comprender la importancia de la colaboración y la comunicación efectiva en un entorno empresarial.'
      },
      {
        nombre: 'Innovación',
        descriptor: 'Integra el uso de diversas herramientas de productividad y programación para generar soluciones innovadoras a los problemas que debe resolver.'
      }
    ]
  }
];

// Helper para obtener el resumen consolidado en texto para inyección en Prompts de IA y reportes
export function getPerfilesSalidaTextoParaIA(): string {
  let output = '=== PERFILES DE SALIDA OFICIALES MEP 2026 (III CICLO / NOVENO AÑO) ===\n\n';

  output += '--- ÁREAS DE CONOCIMIENTO ---\n';
  PERFILES_SALIDA_AREAS_MEP_2026.forEach((area, index) => {
    output += `${index + 1}. ${area.nombre.toUpperCase()}:\n`;
    area.subareas.forEach(sub => {
      output += `   * ${sub.nombre}:\n`;
      sub.descriptores.forEach(d => {
        output += `     - ${d}\n`;
      });
    });
    output += '\n';
  });

  output += '--- EJES TRANSVERSALES ---\n';
  PERFILES_SALIDA_EJES_TRANSVERSALES_MEP_2026.forEach((eje, idx) => {
    output += `${idx + 1}. ${eje.nombre.toUpperCase()}:\n`;
    eje.dimensiones.forEach(dim => {
      output += `   * ${dim.nombre}: ${dim.descriptor}\n`;
    });
    output += '\n';
  });

  return output;
}
