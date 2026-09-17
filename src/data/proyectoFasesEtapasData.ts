// Catálogo del Proyecto Curricular por Fases y Etapas (Design Thinking / DT - Noveno Año)
import { ProyectoSemestral } from '../types';

export const PROYECTOS_SEMESTRALES_NOVENO: ProyectoSemestral[] = [
  {
    "moduloId": 1,
    "tituloProyecto": "Marco Metodológico de Proyecto por Design Thinking (DT) — Robótica & Computación Física",
    "problemaContextual": "Espacio de ideación y diagnóstico contextual abierto: la problemática comunitaria y el reto de automatización específico serán tipificados y validados por el equipo docente según los saberes e indicadores que se vinculen a las 5 etapas de DT.",
    "fases": [
      {
        "id": "fase1_investigacion",
        "numero": 1,
        "nombre": "Fase I: Comprensión y Diagnóstico del Contexto",
        "descripcion": "Observación directa de necesidades del entorno, escucha activa de los usuarios y delimitación clara del reto tecnológico.",
        "etapas": [
          "etapa1_empatizar",
          "etapa2_definir"
        ],
        "evidenciasEsperadas": [
          "Mapa de empatía y registro de necesidades del entorno",
          "Ficha de requerimientos técnicos y declaración del reto de diseño"
        ]
      },
      {
        "id": "fase2_desarrollo",
        "numero": 2,
        "nombre": "Fase II: Ideación, Diseño y Construcción Técnica",
        "descripcion": "Generación creativa de alternativas, formulación de algoritmos en pseudocódigo/flujogramas y ensamble del prototipo tecnológico.",
        "etapas": [
          "etapa3_idear",
          "etapa4_prototipar"
        ],
        "evidenciasEsperadas": [
          "Diagramas de flujo y esquemas de conexionado de pines",
          "Prototipo tecnológico funcional operativo (físico o simulado)"
        ]
      },
      {
        "id": "fase3_evaluacion",
        "numero": 3,
        "nombre": "Fase III: Validación, Depuración y Socialización",
        "descripcion": "Pruebas de funcionamiento, calibración de sensores, depuración sistemática de fallas y sustentación pública ante la comunidad escolar.",
        "etapas": [
          "etapa5_evaluar_testear"
        ],
        "evidenciasEsperadas": [
          "Matriz de pruebas y bitácora de depuración de errores",
          "Presentación demostrativa (Demostración de lo Aprendido)"
        ]
      }
    ],
    "etapas": [
      {
        "id": "etapa1_empatizar",
        "numero": 1,
        "nombre": "Etapa 1: Empatizar",
        "faseId": "fase1_investigacion",
        "faseNombre": "Fase I: Comprensión y Diagnóstico",
        "proposito": "Comprender las necesidades reales de las personas usuarias mediante observación directa y escucha activa en el entorno escolar o comunal.",
        "accionesClave": [
          "Observar y registrar de forma directa situaciones problemáticas o necesidades cotidianas en el colegio o comunidad.",
          "Conversar y escuchar activamente a las personas involucradas para identificar puntos de mejora y oportunidades de automatización."
        ],
        "entregablesSugeridos": [
          "Mapa de empatía de las personas usuarias",
          "Bitácora de observación directa de necesidades"
        ],
        "semanaSugeridaModulo1": [3, 4],
        "semanaSugeridaModulo2": [3, 4],
        "criteriosEvaluacionMEP": [
          "Aplica técnicas de observación y escucha activa para identificar necesidades reales del contexto.",
          "Sistematiza la información cualitativa recopilada en instrumentos visuales como mapas de empatía."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Diálogo guiado sobre situaciones cotidianas que requieren soluciones innovadoras o automatizadas.",
          "desarrollo": "Recorrido de observación en equipos y construcción colaborativa del mapa de empatía.",
          "cierre": "Plenaria: Puesta en común de los principales hallazgos y necesidades identificadas."
        }
      },
      {
        "id": "etapa2_definir",
        "numero": 2,
        "nombre": "Etapa 2: Definir",
        "faseId": "fase1_investigacion",
        "faseNombre": "Fase I: Comprensión y Diagnóstico",
        "proposito": "Sintetizar los hallazgos y formular el desafío tecnológico central mediante la pregunta detonante de diseño: ¿Cómo podríamos...?",
        "accionesClave": [
          "Sintetizar los hallazgos de la empatía y redactar la declaración precisa del reto de diseño.",
          "Establecer la lista preliminar de requerimientos funcionales y técnicos necesarios para la solución."
        ],
        "entregablesSugeridos": [
          "Declaración del reto de diseño (Problem Statement)",
          "Lista de especificaciones y requerimientos funcionales"
        ],
        "semanaSugeridaModulo1": [5, 6],
        "semanaSugeridaModulo2": [5, 6],
        "criteriosEvaluacionMEP": [
          "Delimita el reto técnico con claridad mediante la formulación estructurada de la pregunta de diseño.",
          "Establece especificaciones y requerimientos técnicos viables acordes al nivel de 9° año."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de problemas amplios vs. retos de diseño bien acotados.",
          "desarrollo": "Redacción colaborativa de la pregunta '¿Cómo podríamos...?' y definición de especificaciones técnicas.",
          "cierre": "Validación con el equipo docente para asegurar la viabilidad del reto."
        }
      },
      {
        "id": "etapa3_idear",
        "numero": 3,
        "nombre": "Etapa 3: Idear",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Ideación y Construcción",
        "proposito": "Generar múltiples alternativas creativas y estructurar la lógica algorítmica y esquemas de conexión antes de la construcción.",
        "accionesClave": [
          "Realizar sesiones de lluvia de ideas (Brainstorming) y bocetos conceptuales de la solución.",
          "Diseñar el diagrama de flujo y los esquemas lógicos previos a la implementación técnica."
        ],
        "entregablesSugeridos": [
          "Diagrama de flujo normalizado",
          "Boceto conceptual del prototipo con lista de materiales"
        ],
        "semanaSugeridaModulo1": [8, 9],
        "semanaSugeridaModulo2": [8, 9],
        "criteriosEvaluacionMEP": [
          "Genera y evalúa múltiples alternativas creativas de solución seleccionando la más pertinente.",
          "Diseña diagramas de flujo y esquemas lógicos con adecuada simbología técnica."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Dinámica de pensamiento lateral y divergente.",
          "desarrollo": "Diagramación del algoritmo y diseño del circuito preliminar en papel o simulador.",
          "cierre": "Prueba de escritorio para validar la lógica algorítmica propuesta."
        }
      },
      {
        "id": "etapa4_prototipar",
        "numero": 4,
        "nombre": "Etapa 4: Prototipar",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Ideación y Construcción",
        "proposito": "Construir el prototipo funcional integrando componentes de hardware, simulación y programación modular.",
        "accionesClave": [
          "Construir la estructura física o interactiva con materiales disponibles o simuladores web.",
          "Conectar los componentes técnicos y programar el algoritmo en bloques o texto.",
          "Integrar los subsistemas mecánicos, sensoriales y de software en una solución funcional."
        ],
        "entregablesSugeridos": [
          "Prototipo funcional operativo (físico o digital)",
          "Código fuente comentado y modularizado"
        ],
        "semanaSugeridaModulo1": [11, 12, 13, 14],
        "semanaSugeridaModulo2": [11, 12, 13, 14],
        "criteriosEvaluacionMEP": [
          "Construye el prototipo integrando hardware programable o simulaciones interactivas.",
          "Implementa el código funcional demostrando orden, depuración y buenas prácticas."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Verificación de componentes y normas de seguridad en el laboratorio.",
          "desarrollo": "Montaje intensivo, programación y prueba individual de cada subsistema.",
          "cierre": "Integración de componentes y primera prueba de funcionamiento integral."
        }
      },
      {
        "id": "etapa5_evaluar_testear",
        "numero": 5,
        "nombre": "Etapa 5: Evaluar y Testear",
        "faseId": "fase3_evaluacion",
        "faseNombre": "Fase III: Validación y Socialización",
        "proposito": "Validar el funcionamiento del prototipo en condiciones reales, corregir fallos mediante depuración y presentar los resultados.",
        "accionesClave": [
          "Ejecutar pruebas de funcionamiento sistemáticas y registrar las mejoras en la bitácora.",
          "Aplicar procesos de coevaluación y retroalimentación entre equipos.",
          "Presentar el proyecto en la Demostración de lo Aprendido (Feria Tecnológica)."
        ],
        "entregablesSugeridos": [
          "Informe técnico final con bitácora de depuración",
          "Demostración pública del funcionamiento del prototipo"
        ],
        "semanaSugeridaModulo1": [16, 17, 18],
        "semanaSugeridaModulo2": [16, 17, 18],
        "criteriosEvaluacionMEP": [
          "Valida el funcionamiento del prototipo verificando el cumplimiento del reto planteado.",
          "Comunica con claridad técnica los resultados, aprendizajes y proceso de depuración."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Preparación de la demostración y revisión de criterios de evaluación.",
          "desarrollo": "Exhibición y demostración en vivo ante compañeros y docentes.",
          "cierre": "Sistematización de aprendizajes y retroalimentación final."
        }
      }
    ]
  },
  {
    "moduloId": 2,
    "tituloProyecto": "Marco Metodológico de Proyecto por Design Thinking (DT) — Ciencia de Datos & IA",
    "problemaContextual": "Espacio de ideación y diagnóstico contextual abierto: la problemática digital comunitaria y la solución específica (base de datos, modelado 3D, IA o ciberseguridad) serán tipificadas y validadas por el equipo docente según los indicadores vinculados.",
    "fases": [
      {
        "id": "fase1_investigacion",
        "numero": 1,
        "nombre": "Fase I: Diagnóstico e Instrumentación Digital",
        "descripcion": "Diseño de encuestas en línea, análisis del entorno y levantamiento de requerimientos de información.",
        "etapas": [
          "etapa1_empatizar",
          "etapa2_definir"
        ],
        "evidenciasEsperadas": [
          "Formulario digital con análisis de necesidades",
          "Esquema de requerimientos funcionales de la solución"
        ]
      },
      {
        "id": "fase2_desarrollo",
        "numero": 2,
        "nombre": "Fase II: Modelado, Diseño 3D y Co-creación con IA",
        "descripcion": "Estructuración de datos, modelado paramétrico 3D y generación de contenidos con prompts estructurados.",
        "etapas": [
          "etapa3_idear",
          "etapa4_prototipar"
        ],
        "evidenciasEsperadas": [
          "Estructura relacional de base de datos",
          "Modelo 3D y recursos multimedia documentados"
        ]
      },
      {
        "id": "fase3_evaluacion",
        "numero": 3,
        "nombre": "Fase III: Auditoría Ética, Seguridad y Socialización",
        "descripcion": "Revisión de licencias Creative Commons, análisis de riesgos digitales y exposición comunitaria.",
        "etapas": [
          "etapa5_evaluar_testear"
        ],
        "evidenciasEsperadas": [
          "Portafolio digital con licenciamiento y autoría ética",
          "Sustentación de la solución digital"
        ]
      }
    ],
    "etapas": [
      {
        "id": "etapa1_empatizar",
        "numero": 1,
        "nombre": "Etapa 1: Empatizar",
        "faseId": "fase1_investigacion",
        "faseNombre": "Fase I: Diagnóstico e Instrumentación",
        "proposito": "Diseñar y aplicar instrumentos digitales para conocer necesidades de gestión de información y ciudadanía digital.",
        "accionesClave": [
          "Diseñar formularios o encuestas en plataformas digitales con validación de datos.",
          "Aplicar el instrumento a una muestra del colegio o comunidad para recabar insumos."
        ],
        "entregablesSugeridos": [
          "Formulario digital publicado",
          "Informe preliminar de necesidades identificadas"
        ],
        "semanaSugeridaModulo1": [3, 4],
        "semanaSugeridaModulo2": [3, 4],
        "criteriosEvaluacionMEP": [
          "Formula instrumentos digitales claros y estructurados para recolectar información contextual.",
          "Aplica normas éticas de privacidad y consentimiento informado en la captura de datos."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Métodos de recolección de datos y diseño de encuestas en línea.",
          "desarrollo": "Configuración técnica del formulario y pilotaje con usuarios del entorno.",
          "cierre": "Análisis preliminar de respuestas obtenidas."
        }
      },
      {
        "id": "etapa2_definir",
        "numero": 2,
        "nombre": "Etapa 2: Definir",
        "faseId": "fase1_investigacion",
        "faseNombre": "Fase I: Diagnóstico e Instrumentación",
        "proposito": "Definir los requerimientos de la base de datos, topología de red y alcance de la solución digital.",
        "accionesClave": [
          "Identificar entidades, atributos y relaciones clave para el procesamiento de información.",
          "Delimitar el reto de diseño digital y los requerimientos técnicos de ciberseguridad."
        ],
        "entregablesSugeridos": [
          "Diagrama Entidad-Relación preliminar",
          "Declaración del reto de diseño digital"
        ],
        "semanaSugeridaModulo1": [5, 6],
        "semanaSugeridaModulo2": [5, 6],
        "criteriosEvaluacionMEP": [
          "Estructura requerimientos técnicos y modelos de datos con claridad y pertinencia.",
          "Define el reto digital delimitando los alcances de la solución."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de esquemas de bases de datos y arquitectura de soluciones.",
          "desarrollo": "Modelado del esquema relacional y definición del reto en equipos.",
          "cierre": "Validación docente para asegurar la alineación con los indicadores del nivel."
        }
      },
      {
        "id": "etapa3_idear",
        "numero": 3,
        "nombre": "Etapa 3: Idear",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Modelado y Co-creación",
        "proposito": "Diseñar bocetos paramétricos para piezas 3D y estructurar prompts avanzados para generación de contenidos.",
        "accionesClave": [
          "Elaborar bocetos acotados en papel con medidas exactas antes del modelado CAD.",
          "Formular prompts estructurados para asistir en la documentación y diseño conceptual."
        ],
        "entregablesSugeridos": [
          "Bocetos acotados de la pieza 3D",
          "Registro de prompts y verificación crítica de fuentes"
        ],
        "semanaSugeridaModulo1": [8, 9],
        "semanaSugeridaModulo2": [8, 9],
        "criteriosEvaluacionMEP": [
          "Aplica técnicas de ideación y formulación de prompts con pensamiento crítico.",
          "Demuestra razonamiento espacial y precisión en los bocetos de diseño 3D."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Exploración de interfaces de diseño 3D y formulación ética de prompts.",
          "desarrollo": "Diseño preliminar de modelos y contraste de datos asistidos por IA.",
          "cierre": "Verificación de viabilidad dimensional y técnica de las propuestas."
        }
      },
      {
        "id": "etapa4_prototipar",
        "numero": 4,
        "nombre": "Etapa 4: Prototipar",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Modelado y Co-creación",
        "proposito": "Implementar la base de datos relacional, modelar la pieza 3D y estructurar los recursos digitales.",
        "accionesClave": [
          "Crear tablas relacionales y consultas de datos funcionales.",
          "Modelar en software 3D exportando archivos listos para fabricación (.STL).",
          "Integrar los recursos multimedia con criterios de seguridad y accesibilidad."
        ],
        "entregablesSugeridos": [
          "Base de datos relacional funcional",
          "Archivo de modelado 3D (.STL) y recursos multimedia"
        ],
        "semanaSugeridaModulo1": [11, 12, 13, 14],
        "semanaSugeridaModulo2": [11, 12, 13, 14],
        "criteriosEvaluacionMEP": [
          "Construye bases de datos relacionales funcionales con consultas estructuradas.",
          "Aplica herramientas de modelado 3D respetando medidas y operaciones booleanas."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Demostración de consultas SQL y modelado 3D.",
          "desarrollo": "Taller práctico de bases de datos y refinamiento paramétrico 3D.",
          "cierre": "Verificación de integridad de datos y geometría 3D."
        }
      },
      {
        "id": "etapa5_evaluar_testear",
        "numero": 5,
        "nombre": "Etapa 5: Evaluar y Testear",
        "faseId": "fase3_evaluacion",
        "faseNombre": "Fase III: Auditoría y Demostración",
        "proposito": "Auditar el licenciamiento de recursos (Creative Commons), evaluar desafíos éticos de la IA y presentar la solución.",
        "accionesClave": [
          "Auditar citas y licencias de los recursos multimedia utilizados.",
          "Reflexionar sobre sesgos y uso responsable de herramientas inteligentes.",
          "Sustentar la solución digital completa en la Demostración de lo Aprendido."
        ],
        "entregablesSugeridos": [
          "Portafolio digital con auditoría de licenciamiento",
          "Sustentación pública de la solución"
        ],
        "semanaSugeridaModulo1": [16, 17, 18],
        "semanaSugeridaModulo2": [16, 17, 18],
        "criteriosEvaluacionMEP": [
          "Aplica marcos legales de licenciamiento Creative Commons y derechos de autor.",
          "Argumenta con rigor sobre los aspectos éticos de la IA y la solución desarrollada."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Pautas de evaluación de la sustentación y propiedad intelectual.",
          "desarrollo": "Exhibición de la solución digital ante el grupo y sesión de preguntas.",
          "cierre": "Sistematización de aprendizajes y cierre evaluativo."
        }
      }
    ]
  }
];
