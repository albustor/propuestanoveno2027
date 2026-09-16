// Catálogo del Proyecto Curricular por Fases y Etapas (MEP 2026 - Noveno Año)
import { ProyectoSemestral } from '../types';

export const PROYECTOS_SEMESTRALES_NOVENO: ProyectoSemestral[] = [
  {
    "moduloId": 1,
    "tituloProyecto": "Prototipo Domótico Automatizado para Ahorro Energético y Accesibilidad",
    "problemaContextual": "La comunidad escolar y los hogares enfrentan un alto consumo eléctrico y barreras de accesibilidad que pueden resolverse con sistemas automatizados.",
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
        "descripcion": "Generación creativa de alternativas, formulación de algoritmos en pseudocódigo/flujogramas y ensamble del prototipo domótico.",
        "etapas": [
          "etapa3_idear",
          "etapa4_prototipar"
        ],
        "evidenciasEsperadas": [
          "Diagramas de flujo y esquemas de conexionado de pines",
          "Prototipo domótico funcional operativo (físico o simulado)"
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
        "proposito": "Comprender las necesidades reales de los usuarios mediante observación directa y escucha activa en el entorno escolar o comunal.",
        "accionesClave": [
          "Observar y registrar de forma directa situaciones de consumo eléctrico o barreras de accesibilidad en el colegio.",
          "Conversar y escuchar activamente a conserjes, docentes y compañeros sobre retos y necesidades cotidianas."
        ],
        "entregablesSugeridos": [
          "Mapa de empatía de las personas usuarias",
          "Bitácora de observación directa de necesidades"
        ],
        "semanaSugeridaModulo1": [
          3,
          4
        ],
        "semanaSugeridaModulo2": [
          3,
          4
        ],
        "criteriosEvaluacionMEP": [
          "Identifica con sensibilidad y respeto situaciones problemáticas reales en su contexto educativo.",
          "Registra información cualitativa relevante de los usuarios sin sesgos ni suposiciones."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Diálogo guiado sobre situaciones cotidianas que requieren soluciones automatizadas o accesibles en la institución.",
          "desarrollo": "Recorrido de observación guiada en equipos y construcción colaborativa del mapa de empatía.",
          "cierre": "Plenaria: Puesta en común de los principales hallazgos y dolores identificados en las personas usuarias."
        }
      },
      {
        "id": "etapa2_definir",
        "numero": 2,
        "nombre": "Etapa 2: Definir",
        "faseId": "fase1_investigacion",
        "faseNombre": "Fase I: Comprensión y Diagnóstico",
        "proposito": "Sintetizar las observaciones del entorno y formular el desafío tecnológico central mediante la pregunta detonante de diseño: ¿Cómo podríamos...?",
        "accionesClave": [
          "Sintetizar los hallazgos de la empatía y redactar la declaración precisa del problema.",
          "Establecer la lista de requerimientos técnicos y funcionales del reto (sensores, actuadores, condiciones de operación)."
        ],
        "entregablesSugeridos": [
          "Declaración del reto de diseño (Problem Statement)",
          "Lista de especificaciones y requerimientos funcionales"
        ],
        "semanaSugeridaModulo1": [
          5,
          6
        ],
        "semanaSugeridaModulo2": [
          5,
          6
        ],
        "criteriosEvaluacionMEP": [
          "Delimita el reto técnico con claridad, pertinencia contextual y viabilidad pedagógica.",
          "Establece requerimientos funcionales coherentes con los indicadores curriculares del nivel."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de declaraciones de problemas amplias vs. retos de diseño bien focalizados.",
          "desarrollo": "Redacción colaborativa de la pregunta '¿Cómo podríamos...?' y definición de especificaciones técnicas.",
          "cierre": "Validación formativa con el docente para asegurar la alineación con los indicadores oficiales."
        }
      },
      {
        "id": "etapa3_idear",
        "numero": 3,
        "nombre": "Etapa 3: Idear",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Ideación y Construcción",
        "proposito": "Generar múltiples soluciones creativas y diseñar la lógica algorítmica y los esquemas de conexión antes del ensamblaje.",
        "accionesClave": [
          "Realizar sesiones de lluvia de ideas (Brainstorming) y bocetos conceptuales de la maqueta.",
          "Diseñar el diagrama de flujo estructurado y el pseudocódigo del sistema automático."
        ],
        "entregablesSugeridos": [
          "Diagrama de flujo normalizado",
          "Boceto a escala de la maqueta domótica"
        ],
        "semanaSugeridaModulo1": [
          8,
          9
        ],
        "semanaSugeridaModulo2": [
          8,
          9
        ],
        "criteriosEvaluacionMEP": [
          "Diseña algoritmos estructurados con adecuada simbología y lógica secuencial.",
          "Propone soluciones innovadoras y viables para el problema definido."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Dinámica de pensamiento lateral y divergente.",
          "desarrollo": "Diagramación del algoritmo en Draw.io/PSeInt y diseño del circuito en simulador.",
          "cierre": "Prueba de escritorio para validar la lógica algorítmica."
        }
      },
      {
        "id": "etapa4_prototipar",
        "numero": 4,
        "nombre": "Etapa 4: Prototipar",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Ideación y Construcción",
        "proposito": "Construir el prototipo funcional integrando la placa microcontroladora, sensores, actuadores y el código depurado.",
        "accionesClave": [
          "Ensamblar la estructura física o maqueta con materiales reusables.",
          "Cablear los circuitos en protoboard y programar el microcontrolador en bloques o texto.",
          "Integrar los subsistemas mecánicos y electrónicos en un conjunto cohesivo."
        ],
        "entregablesSugeridos": [
          "Prototipo funcional operativo",
          "Código fuente comentado y modularizado"
        ],
        "semanaSugeridaModulo1": [
          11,
          12,
          13,
          14
        ],
        "semanaSugeridaModulo2": [
          11,
          12,
          13,
          14
        ],
        "criteriosEvaluacionMEP": [
          "Aplica correctamente las funciones del microcontrolador, sensores y actuadores.",
          "Demuestra orden, seguridad y buenas prácticas en el cableado y programación."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Verificación de lista de componentes y medidas de seguridad.",
          "desarrollo": "Montaje intensivo, programación y prueba individual de cada subsistema.",
          "cierre": "Integración final y verificación del primer encendido seguro."
        }
      },
      {
        "id": "etapa5_evaluar_testear",
        "numero": 5,
        "nombre": "Etapa 5: Evaluar y Testear",
        "faseId": "fase3_evaluacion",
        "faseNombre": "Fase III: Validación y Socialización",
        "proposito": "Validar el funcionamiento del prototipo en condiciones reales, corregir fallas mediante depuración y presentar los resultados.",
        "accionesClave": [
          "Ejecutar la matriz de pruebas de funcionamiento y registrar fallas (debugging).",
          "Aplicar coevaluación con la rúbrica oficial del MEP.",
          "Presentar el proyecto en la Demostración de lo Aprendido (Feria Tecnológica)."
        ],
        "entregablesSugeridos": [
          "Informe técnico final con bitácora de depuración",
          "Demostración pública del prototipo"
        ],
        "semanaSugeridaModulo1": [
          16,
          17,
          18
        ],
        "semanaSugeridaModulo2": [
          16,
          17,
          18
        ],
        "criteriosEvaluacionMEP": [
          "Demuestra la funcionalidad del prototipo resolviendo el reto inicial planteado.",
          "Comunica los resultados con claridad técnica, fundamentación y vocabulario preciso."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Preparación del stand de demostración y criterios de la rúbrica sumativa.",
          "desarrollo": "Exhibición y demostración en vivo ante jurado/compañeros y ronda de preguntas.",
          "cierre": "Sistematización de aprendizajes y entrega final de calificaciones formativas y sumativas."
        }
      }
    ]
  },
  {
    "moduloId": 2,
    "tituloProyecto": "Solución Digital Comunitaria: Base de Datos, Modelado 3D y Campaña de Ciberseguridad",
    "problemaContextual": "Las organizaciones comunales y colegios requieren sistematizar inventarios, diseñar piezas ergonómicas y educar a los jóvenes en ciudadanía digital y ética IA.",
    "fases": [
      {
        "id": "fase1_investigacion",
        "numero": 1,
        "nombre": "Fase I: Diagnóstico e Instrumentación Digital",
        "descripcion": "Diseño de encuestas en línea, optimización de sistemas operativos y levantamiento de requerimientos.",
        "etapas": [
          "etapa1_empatizar",
          "etapa2_definir"
        ],
        "evidenciasEsperadas": [
          "Formulario digital con análisis estadístico",
          "Esquema de requerimientos de la base de datos"
        ]
      },
      {
        "id": "fase2_desarrollo",
        "numero": 2,
        "nombre": "Fase II: Modelado Relacional, Diseño 3D y Co-creación con IA",
        "descripcion": "Creación de tablas relacionales en SQL, modelado paramétrico 3D y generación de contenidos con prompts estructurados.",
        "etapas": [
          "etapa3_idear",
          "etapa4_prototipar"
        ],
        "evidenciasEsperadas": [
          "Base de datos relacional operativa con consultas",
          "Modelo 3D en formato .STL y campaña multimedia"
        ]
      },
      {
        "id": "fase3_evaluacion",
        "numero": 3,
        "nombre": "Fase III: Auditoría Ética, Ciberseguridad y Demostración",
        "descripcion": "Revisión de licencias Creative Commons, verificación APA 7, análisis de riesgos en línea y exposición final.",
        "etapas": [
          "etapa5_evaluar_testear"
        ],
        "evidenciasEsperadas": [
          "Portafolio auditado con citas APA 7 y licencias CC",
          "Sustentación comunitaria de la solución"
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
        "proposito": "Diseñar y aplicar encuestas digitales estructuradas para conocer necesidades de gestión y riesgos digitales.",
        "accionesClave": [
          "Crear formularios en Microsoft Forms / Google Forms con validación de respuestas.",
          "Aplicar la encuesta a una muestra representativa de estudiantes y docentes."
        ],
        "entregablesSugeridos": [
          "Formulario digital publicado con código QR",
          "Informe estadístico de respuestas"
        ],
        "semanaSugeridaModulo1": [
          3,
          4
        ],
        "semanaSugeridaModulo2": [
          3,
          4
        ],
        "criteriosEvaluacionMEP": [
          "Formula preguntas claras, pertinentes y sin sesgo metodológico.",
          "Aplica buenas prácticas de privacidad y consentimiento informado."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de metodologías de muestreo y diseño de preguntas.",
          "desarrollo": "Configuración técnica del formulario con lógica de salto condicional.",
          "cierre": "Recolección piloto y validación de gráficos estadísticos."
        }
      },
      {
        "id": "etapa2_definir",
        "numero": 2,
        "nombre": "Etapa 2: Definir",
        "faseId": "fase1_investigacion",
        "faseNombre": "Fase I: Diagnóstico e Instrumentación",
        "proposito": "Definir la arquitectura de red y el modelo entidad-relación para la solución de datos.",
        "accionesClave": [
          "Identificar entidades, atributos y relaciones clave para la base de datos.",
          "Diseñar el esquema de red local que soportará el intercambio seguro de datos."
        ],
        "entregablesSugeridos": [
          "Diagrama Entidad-Relación (DER)",
          "Topología de red LAN simulada"
        ],
        "semanaSugeridaModulo1": [
          5,
          6
        ],
        "semanaSugeridaModulo2": [
          5,
          6
        ],
        "criteriosEvaluacionMEP": [
          "Estructura entidades y claves primarias/foráneas con integridad referencial.",
          "Configura direccionamiento IP y protocolos de red adecuados."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de diagramas de red y esquemas de bases de datos.",
          "desarrollo": "Modelado del DER en papel o Draw.io y simulación de red en Packet Tracer.",
          "cierre": "Revisión cruzada para eliminar redundancias."
        }
      },
      {
        "id": "etapa3_idear",
        "numero": 3,
        "nombre": "Etapa 3: Idear",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Modelado y Co-creación",
        "proposito": "Diseñar bocetos paramétricos para el modelado 3D y estructurar prompts avanzados para contenidos educativos.",
        "accionesClave": [
          "Dibujar bocetos 3D en papel isométrico acotando medidas exactas en milímetros.",
          "Redactar prompts con técnica R-C-T-R para asistir en redacción técnica."
        ],
        "entregablesSugeridos": [
          "Bocetos acotados en vistas ortogonales",
          "Guía de prompts y fact-checking"
        ],
        "semanaSugeridaModulo1": [
          8,
          9
        ],
        "semanaSugeridaModulo2": [
          8,
          9
        ],
        "criteriosEvaluacionMEP": [
          "Aplica técnicas de ingeniería de prompts con sentido crítico y verificación.",
          "Demuestra visión espacial y precisión matemática en los bocetos 3D."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Exploración de interfaces 3D y ejemplos de prompts efectivos.",
          "desarrollo": "Modelado preliminar y contraste de datos generados por IA.",
          "cierre": "Consolidación de la matriz de verificación de fuentes."
        }
      },
      {
        "id": "etapa4_prototipar",
        "numero": 4,
        "nombre": "Etapa 4: Prototipar",
        "faseId": "fase2_desarrollo",
        "faseNombre": "Fase II: Modelado y Co-creación",
        "proposito": "Implementar la base de datos relacional, modelar la pieza 3D definitiva y compilar el contenido multimedia.",
        "accionesClave": [
          "Crear las tablas en DB Browser / MS Access y programar consultas SQL.",
          "Modelar la pieza 3D en Tinkercad exportando archivo .STL para manufactura.",
          "Producir la campaña de ciberseguridad con recursos multimedia."
        ],
        "entregablesSugeridos": [
          "Archivo de Base de Datos relacional (.db)",
          "Archivo 3D (.stl) y recursos gráficos"
        ],
        "semanaSugeridaModulo1": [
          11,
          12,
          13,
          14
        ],
        "semanaSugeridaModulo2": [
          11,
          12,
          13,
          14
        ],
        "criteriosEvaluacionMEP": [
          "Crea tablas relacionadas funcionales y ejecuta consultas precisas.",
          "Aplica funciones booleanas (unión/hueco) en el modelado 3D."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Demostración de consultas SQL y operaciones booleanas 3D avanzadas.",
          "desarrollo": "Laboratorio intensivo de bases de datos y diseño espacial.",
          "cierre": "Inspección de integridad de datos y verificación dimensional de piezas."
        }
      },
      {
        "id": "etapa5_evaluar_testear",
        "numero": 5,
        "nombre": "Etapa 5: Evaluar y Testear",
        "faseId": "fase3_evaluacion",
        "faseNombre": "Fase III: Auditoría y Demostración",
        "proposito": "Auditar el cumplimiento de derechos de autor (APA 7 / Creative Commons), evaluar riesgos éticos de la IA y exponer la solución.",
        "accionesClave": [
          "Revisar la tabla de citas y atribuciones garantizando el uso legal de recursos.",
          "Participar en el debate sobre sesgos y desafíos éticos de la IA.",
          "Presentar la solución completa en la Demostración de lo Aprendido."
        ],
        "entregablesSugeridos": [
          "Portafolio digital integral con auditoría ética",
          "Sustentación de la solución ante la comunidad"
        ],
        "semanaSugeridaModulo1": [
          16,
          17,
          18
        ],
        "semanaSugeridaModulo2": [
          16,
          17,
          18
        ],
        "criteriosEvaluacionMEP": [
          "Aplica rigurosamente la normativa APA 7 y el licenciamiento Creative Commons.",
          "Argumenta con solvencia sobre los desafíos éticos de la tecnología."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Pautas de la rúbrica de sustentación y auditoría de propiedad intelectual.",
          "desarrollo": "Exposición oral de proyectos y demostración práctica de la base de datos y modelo 3D.",
          "cierre": "Retroalimentación formativa y consolidación de calificaciones finales."
        }
      }
    ]
  }
];
