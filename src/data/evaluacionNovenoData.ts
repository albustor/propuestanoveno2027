import { AsignacionIndicadorEvaluacion, CorrelacionIndicadores, MatrizEvaluacionNoveno, ComponenteEvaluacionTipo } from '../types';
import { MODULOS_NOVENO_OFICIAL } from './curriculoNovenoOficial';

// Correlaciones Pedagógicas Oficiales Recomendadas para 9° Año MEP
export const CORRELACIONES_OFICIALES_NOVENO: CorrelacionIndicadores[] = [
  // --- MÓDULO 1 ---
  {
    id: 'corr-m1-domotica-integral',
    titulo: 'Sinergia 1: Sistema Domótico y Automatización Escolar/Comunitaria',
    moduloId: 1,
    componentePrincipal: 'proyecto',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['domotica', 'microcontrolador', 'sensor', 'actuador', 'entorno_programacion'],
    saberesNombres: ['Domótica', 'Microcontrolador', 'Sensor', 'Actuador', 'Entorno de Programación'],
    indicadoresTextos: [
      'Construir prototipos domóticos que respondan a necesidades reales de accesibilidad y ahorro de energía.',
      'Aplicar las funciones de un microcontrolador, utilizando pines digitales y analógicos, conexión a VCC y GND.',
      'Integrar un sensor en un prototipo, utilizando sus datos como entrada.',
      'Integrar un actuador en un prototipo para ejecutar acciones físicas automatizadas.',
      'Programar algoritmos mediante bloques o texto en el entorno de desarrollo.'
    ],
    justificacionPedagogica: 'Esta correlación articula la entrada sensorial del entorno con el procesamiento del microcontrolador y la respuesta física de los actuadores, integrándose directamente en el eje central del Proyecto Semestral (Design Thinking).',
    actividadIntegradaSugerida: 'Diseño, ensamble y programación de una maqueta de aula inteligente con iluminación automática por presencia y ventilación condicional por temperatura.',
    instrumentoEvaluacion: 'Rúbrica Analítica de Proyecto Integrado (Fase 2: Prototipado y Fase 3: Evaluación)',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m1-cinematica-algoritmos',
    titulo: 'Sinergia 2: Mecánica Robótica y Lógica Condicional',
    moduloId: 1,
    componentePrincipal: 'trabajo_cotidiano',
    componentesSecundarios: ['tareas'],
    saberesIds: ['movimiento_mecanismos', 'algoritmo', 'estructuras_control'],
    saberesNombres: ['Movimiento en mecanismos', 'Algoritmo', 'Estructuras de control'],
    indicadoresTextos: [
      'Identificar el movimiento en mecanismos robóticos, diferenciando el movimiento de entrada y salida.',
      'Formular algoritmos estructurados para resolver problemas técnicos.',
      'Implementar estructuras de control condicionales y repetitivas.'
    ],
    justificacionPedagogica: 'Vincula la relación de transmisión mecánica (engranajes, poleas) con las decisiones lógicas y bucles de control que regulan el arranque, velocidad y parada de los motores.',
    actividadIntegradaSugerida: 'Laboratorio de calibración: cálculo de relación de transmisión física emparejado con diagrama de flujo condicional que evita sobrecarga mecánica.',
    instrumentoEvaluacion: 'Escala de Desempeño en Trabajo Cotidiano (Observación de Proceso y Bitácora)',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m1-seguridad-datos',
    titulo: 'Sinergia 3: Gestión Ética y Confiabilidad del Dato en IoT',
    moduloId: 1,
    componentePrincipal: 'tareas',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['dato', 'practicas_actitudes_m1'],
    saberesNombres: ['Dato', 'Prácticas y Actitudes'],
    indicadoresTextos: [
      'Gestionar datos provenientes de dispositivos y sensores con responsabilidad.',
      'Aplicar actitudes de precisión, persistencia y resiliencia ante el error.'
    ],
    justificacionPedagogica: 'Permite al estudiantado analizar de forma autónoma y reflexiva cómo los dispositivos recolectan información ambiental y las implicaciones éticas de su almacenamiento.',
    actividadIntegradaSugerida: 'Tarea de investigación aplicada: Auditoría de privacidad de un dispositivo inteligente doméstico y decálogo de seguridad digital.',
    instrumentoEvaluacion: 'Lista de Cotejo Formativa con Criterios de Rigor Ético',
    esSugerenciaIA: false
  },

  // --- MÓDULO 2 ---
  {
    id: 'corr-m2-solucion-comunitaria-3d-bd',
    titulo: 'Sinergia 4: Plataforma de Diagnóstico Comunitario, Modelado 3D y Base de Datos',
    moduloId: 2,
    componentePrincipal: 'proyecto',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['plataformas_contenido', 'gestor_bd', 'modelado_3d', 'herramientas_generativas'],
    saberesNombres: ['Plataformas de Contenido', 'Gestor de Bases de Datos', 'Modelado 3D', 'Herramientas Generativas'],
    indicadoresTextos: [
      'Diseñar formularios e instrumentos digitales para recolección de datos comunitarios.',
      'Estructurar y consultar bases de datos relacionales para procesar información.',
      'Diseñar modelos tridimensionales paramétricos para soluciones físicas.',
      'Utilizar herramientas de IA generativa de forma crítica y creativa.'
    ],
    justificacionPedagogica: 'Crea un flujo de ingeniería completo: recolección de necesidades comunitarias con formularios → procesamiento relacional en BD → modelado 3D de la carcasa o accesorio → asistencia de IA para documentación.',
    actividadIntegradaSugerida: 'Proyecto Semestral: Sistema de inventario escolar o reporte comunitario con soporte 3D diseñado en CAD y base de datos con consultas funcionales.',
    instrumentoEvaluacion: 'Rúbrica Analítica de Proyecto Semestral (3 Fases / 5 Etapas)',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m2-redes-ciberseguridad',
    titulo: 'Sinergia 5: Arquitectura de Redes y Ciberdefensa Activa',
    moduloId: 2,
    componentePrincipal: 'trabajo_cotidiano',
    componentesSecundarios: ['tareas'],
    saberesIds: ['redes_comunicacion', 'riesgos_linea', 'huella_digital'],
    saberesNombres: ['Redes de Comunicación', 'Riesgos en Línea', 'Huella Digital'],
    indicadoresTextos: [
      'Analizar la topología y protocolos de transferencia en redes de computadoras.',
      'Identificar amenazas y protocolos de seguridad cibernética.',
      'Reconocer el impacto de la huella digital y la identidad en la web.'
    ],
    justificacionPedagogica: 'La comprensión de cómo viajan los paquetes IP fundamenta la adopción de protocolos seguros (HTTPS, 2FA) y la prevención de ingeniería social.',
    actividadIntegradaSugerida: 'Taller de ciberseguridad en clase: simulación de paquetes de red y auditoría de contraseñas seguras y huella digital.',
    instrumentoEvaluacion: 'Escala de Desempeño y Registro en Bitácora Cotidiana',
    esSugerenciaIA: false
  },
  {
    id: 'corr-m2-etica-ia-licencias',
    titulo: 'Sinergia 6: Ética de la Inteligencia Artificial y Propiedad Intelectual',
    moduloId: 2,
    componentePrincipal: 'tareas',
    componentesSecundarios: ['trabajo_cotidiano'],
    saberesIds: ['desafios_ia', 'derechos_autor'],
    saberesNombres: ['Desafíos de la IA', 'Derechos de Autor y Licencias'],
    indicadoresTextos: [
      'Evaluar sesgos, privacidad e impacto social en el uso de IA.',
      'Aplicar marcos de licenciamiento Creative Commons y derechos de autor en productos digitales.'
    ],
    justificacionPedagogica: 'Fomenta el juicio ético independiente en el uso de herramientas de inteligencia artificial y el respeto riguroso a la autoría intelectual.',
    actividadIntegradaSugerida: 'Tarea de análisis crítico: Ensayo comparativo sobre sesgos en modelos de IA y aplicación de licencias abiertas a un repositorio de recursos.',
    instrumentoEvaluacion: 'Rúbrica Sintética de Tarea de Pensamiento Crítico',
    esSugerenciaIA: false
  }
];

// Generador de Asignaciones Iniciales por Defecto
export const generarAsignacionesPorDefecto = (): Record<string, AsignacionIndicadorEvaluacion> => {
  const asignaciones: Record<string, AsignacionIndicadorEvaluacion> = {};

  MODULOS_NOVENO_OFICIAL.forEach((modulo) => {
    modulo.areas.forEach((area) => {
      area.saberes.forEach((saber) => {
        // Determinación inteligente de componentes según naturaleza del saber
        const componentes: ComponenteEvaluacionTipo[] = ['trabajo_cotidiano']; // Base cotidiana

        let instrumentoSugerido = 'Escala de desempeño / Bitácora de proceso';
        let correlacionId: string | undefined = undefined;

        // Asignaciones por saber en Módulo 1
        if (modulo.id === 1) {
          if (['domotica', 'microcontrolador', 'sensor', 'actuador'].includes(saber.id)) {
            componentes.push('proyecto');
            instrumentoSugerido = 'Rúbrica de proceso de prototipado y desempeño en clase';
            correlacionId = 'corr-m1-domotica-integral';
          } else if (['movimiento_mecanismos', 'algoritmo', 'estructuras_control'].includes(saber.id)) {
            componentes.push('tareas');
            instrumentoSugerido = 'Lista de cotejo cinemática y prueba práctica';
            correlacionId = 'corr-m1-cinematica-algoritmos';
          } else if (['dato', 'practicas_actitudes_m1'].includes(saber.id)) {
            componentes.push('tareas');
            instrumentoSugerido = 'Rúbrica de reporte y auditoría de datos';
            correlacionId = 'corr-m1-seguridad-datos';
          }
        } 
        // Asignaciones por saber en Módulo 2
        else if (modulo.id === 2) {
          if (['plataformas_contenido', 'gestor_bd', 'modelado_3d', 'herramientas_generativas'].includes(saber.id)) {
            componentes.push('proyecto');
            instrumentoSugerido = 'Rúbrica de producto digital y consultas relacionales';
            correlacionId = 'corr-m2-solucion-comunitaria-3d-bd';
          } else if (['redes_comunicacion', 'riesgos_linea', 'huella_digital'].includes(saber.id)) {
            componentes.push('tareas');
            instrumentoSugerido = 'Escala de desempeño en simulación de redes y ciberseguridad';
            correlacionId = 'corr-m2-redes-ciberseguridad';
          } else if (['desafios_ia', 'derechos_autor'].includes(saber.id)) {
            componentes.push('tareas');
            instrumentoSugerido = 'Rúbrica de ensayo crítico y licenciamiento';
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
          observaciones: `Asignación oficial recomendada para ${modulo.nombre.split(':')[0]}.`,
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
