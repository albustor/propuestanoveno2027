import { AsignacionIndicadorEvaluacion, CorrelacionIndicadores, MatrizEvaluacionNoveno, ComponenteEvaluacionTipo } from '../types';
import { MODULOS_NOVENO_OFICIAL } from './curriculoNovenoOficial';

// Correlaciones Pedagógicas Oficiales para 9° Año MEP (Organizadas por Continuidad y Similitud Técnica)
export const CORRELACIONES_OFICIALES_NOVENO: CorrelacionIndicadores[] = [
  // --- MÓDULO 1 ---
  {
    id: 'corr-m1-domotica-integral',
    titulo: 'Sinergia 1: Sistema Domótico, Control y Actuación Física',
    moduloId: 1,
    componentePrincipal: 'proyecto',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['domotica', 'microcontrolador', 'sensor', 'actuador', 'prototipos', 'entorno_programacion'],
    saberesNombres: ['Domótica', 'Microcontrolador', 'Sensor', 'Actuador', 'Prototipos', 'Entorno de Programación'],
    indicadoresTextos: [
      'Construir prototipos domóticos que respondan a necesidades reales de accesibilidad y ahorro de energía.',
      'Aplicar las funciones de un microcontrolador, utilizando pines digitales y analógicos, conexión a VCC y GND.',
      'Integrar un sensor en un prototipo, utilizando sus datos como entrada.',
      'Integrar un actuador en un prototipo para ejecutar acciones físicas automatizadas.',
      'Construir prototipos integrando componentes mecánicos y electrónicos.',
      'Programar algoritmos mediante bloques o texto en el entorno de desarrollo.'
    ],
    justificacionPedagogica: 'Esta correlación articula el lazo completo de control físico: captura sensorial del entorno → procesamiento lógico en microcontrolador → respuesta física en actuadores → ensamblaje del prototipo domótico programado.',
    actividadIntegradaSugerida: 'Proyecto / Reto Integrador: Diseño, ensamble y programación de un sistema automatizado con sensores de presencia/luz y actuadores mecánicos o luminosos.',
    instrumentoEvaluacion: 'Rúbrica Analítica de Desempeño Técnico y Proceso de Prototipado',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m1-cinematica-algoritmos',
    titulo: 'Sinergia 2: Cinemática Robótica y Lógica Condicional',
    moduloId: 1,
    componentePrincipal: 'trabajo_cotidiano',
    componentesSecundarios: ['tareas'],
    saberesIds: ['movimiento_mecanismos', 'algoritmo'],
    saberesNombres: ['Movimiento en mecanismos', 'Algoritmo'],
    indicadoresTextos: [
      'Identificar el movimiento en mecanismos robóticos, diferenciando el movimiento de entrada y salida.',
      'Formular algoritmos estructurados para resolver problemas técnicos.'
    ],
    justificacionPedagogica: 'Vincula la relación de transmisión mecánica (engranajes, poleas) con las decisiones lógicas y diagramas de flujo condicionales que regulan el sentido de giro, velocidad y parada de los sistemas.',
    actividadIntegradaSugerida: 'Laboratorio Práctico: Cálculo de relación de transmisión mecánica emparejado con diagrama de flujo condicional de control.',
    instrumentoEvaluacion: 'Escala de Desempeño en Trabajo Cotidiano (Bitácora de Laboratorio)',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m1-seguridad-datos',
    titulo: 'Sinergia 3: Almacenamiento e Interconexión de Dispositivos (IoT)',
    moduloId: 1,
    componentePrincipal: 'tareas',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['almacenamiento_datos', 'iot'],
    saberesNombres: ['Almacenamiento de datos', 'Internet de las cosas (IoT)'],
    indicadoresTextos: [
      'Gestionar y registrar datos provenientes de dispositivos y sensores con responsabilidad.',
      'Reconocer la interacción entre dispositivos inteligentes interconectados en red.'
    ],
    justificacionPedagogica: 'Permite al estudiantado analizar cómo los dispositivos recolectan y transmiten variables en red, desarrollando hábitos de gestión confiable y segura de la información.',
    actividadIntegradaSugerida: 'Tarea de Investigación Aplicada: Auditoría de transmisión de datos en dispositivos IoT y registro estructurado de variables sensoriales.',
    instrumentoEvaluacion: 'Lista de Cotejo Formativa con Criterios de Rigor Técnico',
    esSugerenciaIA: false
  },

  // --- MÓDULO 2 ---
  {
    id: 'corr-m2-solucion-comunitaria-3d-bd',
    titulo: 'Sinergia 4: Plataforma Digital, Base de Datos, Modelado 3D e IA Generativa',
    moduloId: 2,
    componentePrincipal: 'proyecto',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['plataformas_contenido', 'base_datos', 'contenido_multimedia_3d', 'herramientas_generativas'],
    saberesNombres: ['Plataformas de Contenido', 'Bases de Datos', 'Contenido Multimedia 3D', 'Herramientas Generativas'],
    indicadoresTextos: [
      'Diseñar formularios e instrumentos digitales para recolección de datos comunitarios.',
      'Estructurar y consultar bases de datos relacionales para procesar información.',
      'Diseñar modelos tridimensionales paramétricos para soluciones físicas.',
      'Utilizar herramientas de IA generativa de forma crítica y creativa.'
    ],
    justificacionPedagogica: 'Crea un flujo de ingeniería digital completo: recolección de requerimientos con formularios → diseño relacional y consultas SQL → modelado 3D de la pieza física → asistencia de IA generativa para documentación y diseño.',
    actividadIntegradaSugerida: 'Proyecto Integrado: Sistema de gestión con recolección en línea, base de datos relacional y modelado 3D de soporte físico.',
    instrumentoEvaluacion: 'Rúbrica Analítica de Proyecto Digital y Consultas SQL',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m2-redes-ciberseguridad',
    titulo: 'Sinergia 5: Arquitectura de Redes, Sistemas Operativos y Ciberdefensa',
    moduloId: 2,
    componentePrincipal: 'trabajo_cotidiano',
    componentesSecundarios: ['tareas'],
    saberesIds: ['redes_comunicacion', 'sistema_operativo', 'riesgos_linea', 'huella_digital'],
    saberesNombres: ['Redes de Comunicación', 'Sistemas Operativos', 'Riesgos en Línea', 'Huella Digital'],
    indicadoresTextos: [
      'Analizar la topología y protocolos de transferencia en redes de computadoras.',
      'Reconocer las funciones y administración básica del sistema operativo.',
      'Identificar amenazas y protocolos de seguridad cibernética.',
      'Reconocer el impacto de la huella digital y la identidad en la web.'
    ],
    justificacionPedagogica: 'La comprensión de la arquitectura de redes y el sistema operativo fundamenta la adopción de medidas defensivas (HTTPS, 2FA, cifrado) y la gestión responsable de la identidad digital.',
    actividadIntegradaSugerida: 'Taller de Ciberdefensa: Simulación de topología de red, configuración defensiva en SO y auditoría de huella digital.',
    instrumentoEvaluacion: 'Escala de Desempeño y Registro en Bitácora Cotidiana',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m2-etica-ia-licencias',
    titulo: 'Sinergia 6: Ética de la IA y Propiedad Intelectual',
    moduloId: 2,
    componentePrincipal: 'tareas',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['desafios_ia', 'derechos_autor'],
    saberesNombres: ['Desafíos de la IA', 'Derechos de Autor'],
    indicadoresTextos: [
      'Evaluar sesgos, privacidad e impacto social en el uso de IA.',
      'Aplicar marcos de licenciamiento Creative Commons y derechos de autor en productos digitales.'
    ],
    justificacionPedagogica: 'Fomenta el juicio crítico autónomo en la interacción con sistemas generativos y el respeto estricto a las licencias de autoría intelectual.',
    actividadIntegradaSugerida: 'Tarea de Análisis Crítico: Matriz comparativa de sesgos algorítmicos y auditoría de licenciamiento Creative Commons.',
    instrumentoEvaluacion: 'Rúbrica Sintética de Tarea y Pensamiento Crítico',
    esSugerenciaIA: false
  }
];

// Generador de Asignaciones Iniciales por Defecto
export const generarAsignacionesPorDefecto = (): Record<string, AsignacionIndicadorEvaluacion> => {
  const asignaciones: Record<string, AsignacionIndicadorEvaluacion> = {};

  MODULOS_NOVENO_OFICIAL.forEach((modulo) => {
    modulo.areas.forEach((area) => {
      area.saberes.forEach((saber) => {
        const componentes: ComponenteEvaluacionTipo[] = ['trabajo_cotidiano']; // Base cotidiana

        let instrumentoSugerido = 'Escala de desempeño / Bitácora de proceso';
        let correlacionId: string | undefined = undefined;

        // Asignaciones en Módulo 1 (Robótica y Programación)
        if (modulo.id === 1) {
          if (['domotica', 'microcontrolador', 'sensor', 'actuador', 'prototipos', 'entorno_programacion'].includes(saber.id)) {
            componentes.push('proyecto');
            instrumentoSugerido = 'Rúbrica de proceso de prototipado y desempeño técnico';
            correlacionId = 'corr-m1-domotica-integral';
          } else if (['movimiento_mecanismos', 'algoritmo'].includes(saber.id)) {
            instrumentoSugerido = 'Escala de observación de laboratorio y bitácora';
            correlacionId = 'corr-m1-cinematica-algoritmos';
          } else if (['almacenamiento_datos', 'iot'].includes(saber.id)) {
            componentes.push('tareas');
            instrumentoSugerido = 'Lista de cotejo formativa y reporte de datos IoT';
            correlacionId = 'corr-m1-seguridad-datos';
          }
        } 
        // Asignaciones en Módulo 2 (Ciencia de Datos e IA)
        else if (modulo.id === 2) {
          if (['plataformas_contenido', 'base_datos', 'contenido_multimedia_3d', 'herramientas_generativas'].includes(saber.id)) {
            componentes.push('proyecto');
            instrumentoSugerido = 'Rúbrica de solución digital y consultas relacionales SQL';
            correlacionId = 'corr-m2-solucion-comunitaria-3d-bd';
          } else if (['redes_comunicacion', 'sistema_operativo', 'riesgos_linea', 'huella_digital'].includes(saber.id)) {
            instrumentoSugerido = 'Escala de desempeño en simulación de redes y ciberseguridad';
            correlacionId = 'corr-m2-redes-ciberseguridad';
          } else if (['desafios_ia', 'derechos_autor'].includes(saber.id)) {
            componentes.push('tareas');
            instrumentoSugerido = 'Rúbrica de ensayo crítico y licenciamiento Creative Commons';
            correlacionId = 'corr-m2-etica-ia-licencias';
          }
        }

        asignaciones[saber.id] = {
          saberId: saber.id,
          saberNombre: saber.nombre,
          indicadorTexto: saber.indicador,
          areaNombre: area.nombre,
          areaId: area.id,
          moduloId: modulo.id as 1 | 2,
          componentes: Array.from(new Set(componentes)),
          instrumentoSugerido,
          observaciones: `Asignación articulada por sinergia técnica para ${modulo.nombre.split(':')[0]}.`,
          correlacionId
        };
      });
    });
  });

  return asignaciones;
};

export const DEFAULT_MATRIZ_EVALUACION: MatrizEvaluacionNoveno = {
  asignaciones: generarAsignacionesPorDefecto(),
  correlaciones: CORRELACIONES_OFICIALES_NOVENO,
  ultimaActualizacion: new Date().toISOString()
};
