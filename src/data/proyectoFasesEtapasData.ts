// Catálogo del Proyecto Curricular por Fases y Etapas (Design Thinking / DT - Noveno Año MEP)
// Fuente Oficial: Documento "Formación Tecnológica - Conceptualización componente proyecto - III ciclo, ciclo Diversificado y EPJA - 2026 - PNFT - DRTE"
import { ProyectoSemestral } from '../types';

export const PROYECTOS_SEMESTRALES_NOVENO: ProyectoSemestral[] = [
  {
    "moduloId": 1,
    "tituloProyecto": "Componente Proyecto • Metodología Design Thinking (DT) — Robótica & Computación Física",
    "problemaContextual": "El componente de evaluación denominado proyecto responde al currículo por competencias del PNFT. Se desarrolla mediante 3 etapas (Inicial, Desarrollo y Final) integrando las 5 fases de Design Thinking en torno a una situación problema real definida con el estudiantado.",
    "fases": [
      {
        "id": "fase1_investigacion",
        "numero": 1,
        "nombre": "A. Etapa Inicial: Empatizar, Definir e Idear",
        "descripcion": "Comprensión profunda de las necesidades de los usuarios, delimitación clara del problema y selección de la solución más eficiente.",
        "etapas": [
          "etapa1_empatizar",
          "etapa2_definir",
          "etapa3_idear"
        ],
        "evidenciasEsperadas": [
          "Registro de intereses y necesidades del usuario (entrevistas, encuestas, observaciones)",
          "Producto comunicativo con síntesis del problema (resumen, infográfico, video, esquema)",
          "Selección y justificación comparativa de la idea de solución más eficiente"
        ]
      },
      {
        "id": "fase2_desarrollo",
        "numero": 2,
        "nombre": "B. Etapa de Desarrollo: Prototipar",
        "descripcion": "Creación de un prototipo tangible o representación visual simple y realista que resuelva el problema utilizando recursos tecnológicos disponibles.",
        "etapas": [
          "etapa4_prototipar"
        ],
        "evidenciasEsperadas": [
          "Prototipo tangible o representación visual funcional (maqueta, guion gráfico, programa, simulación o combinación)",
          "Esquemas de conexión, algoritmos y código modular de control"
        ]
      },
      {
        "id": "fase3_evaluacion",
        "numero": 3,
        "nombre": "C. Etapa Final: Probar / Evaluar",
        "descripcion": "Evaluación del alcance del prototipo en situaciones cotidianas, recopilación de retroalimentación de usuarios, mejoras reiterativas y sustentación pública.",
        "etapas": [
          "etapa5_evaluar_testear"
        ],
        "evidenciasEsperadas": [
          "Pruebas de funcionamiento y registro de retroalimentación con usuarios/clientes",
          "Bitácora de mejoras aplicadas y presentación en la Demostración de lo Aprendido"
        ]
      }
    ],
    "etapas": [
      {
        "id": "etapa1_empatizar",
        "numero": 1,
        "nombre": "Etapa 1: Empatizar (Etapa Inicial)",
        "faseId": "fase1_investigacion",
        "faseNombre": "A. Etapa Inicial (Empatizar / Definir / Idear)",
        "proposito": "Partir del planteamiento de un problema o situación a resolver que surge de los intereses y necesidades de un usuario o cliente (estudiantes, docentes, administrativos, personas externas o encargados legales).",
        "accionesClave": [
          "Partir del planteamiento de un problema o situación a resolver que surge de los intereses y necesidades de un usuario o cliente.",
          "Registrar los intereses y necesidades del usuario ante un problema o situación a resolver, por medio de entrevistas, observaciones, grabaciones, encuestas, entre otras.",
          "Propiciar la reflexión individual o grupal de las personas estudiantes sobre el problema a resolver: ¿Cuál es la raíz del problema? ¿Cómo afecta a los usuarios? ¿Qué soluciones consideran viables?"
        ],
        "entregablesSugeridos": [
          "Instrumento de recolección aplicado (entrevistas, encuestas o guía de observación)",
          "Registro sistematizado de intereses y necesidades del usuario/cliente"
        ],
        "semanaSugeridaModulo1": [3, 4],
        "semanaSugeridaModulo2": [3, 4],
        "indicadorLogro": "Describir las necesidades, deseos y motivaciones de usuarios o clientes que tienen un problema o situación por resolver. (Empatizar)",
        "indicadoresEvaluacion": [
          "Describe un problema o situación por resolver que es importante para un usuario o cliente.",
          "Registra los intereses y necesidades del usuario ante un problema o situación a resolver, por medio de entrevistas, observaciones, grabaciones, encuestas, entre otras."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Diálogo y preguntas reflexivas sobre necesidades no resueltas en el entorno educativo y comunal.",
          "desarrollo": "Aplicación de entrevistas, observaciones directas o encuestas a los usuarios clave para recolectar información.",
          "cierre": "Sistematización y registro estructurado de los hallazgos y testimonios obtenidos."
        }
      },
      {
        "id": "etapa2_definir",
        "numero": 2,
        "nombre": "Etapa 2: Definir (Etapa Inicial)",
        "faseId": "fase1_investigacion",
        "faseNombre": "A. Etapa Inicial (Empatizar / Definir / Idear)",
        "proposito": "Sintetizar los hallazgos de la fase Empatizar mediante un producto comunicativo claro que delimite el problema y las necesidades a cubrir.",
        "accionesClave": [
          "Sintetizar los hallazgos de la fase Empatizar (problema a resolver, intereses y necesidades del usuario o cliente).",
          "Desarrollar un producto comunicativo (resumen, infográfico, tabla, mapa conceptual, esquema, video o audio) respondiendo a: ¿Qué?, ¿Quién?, ¿Dónde?, ¿Cómo?, ¿Por qué?, ¿Cuándo?",
          "Facilitar sesiones de discusión donde las personas estudiantes compartan sus puntos de vista y reflexionen sobre cómo el problema se conecta con situaciones reales."
        ],
        "entregablesSugeridos": [
          "Producto comunicativo estructurado (infografía, tabla, mapa conceptual o video/audio)",
          "Delimitación clara del problema y necesidades priorizadas"
        ],
        "semanaSugeridaModulo1": [5, 6],
        "semanaSugeridaModulo2": [5, 6],
        "indicadorLogro": "Sintetizar los hallazgos relacionados con los intereses y necesidades del usuario o cliente, de modo que se entienda con claridad el problema o situación a resolver. (Definir)",
        "indicadoresEvaluacion": [
          "Sintetiza los intereses y necesidades del usuario o cliente en la construcción de un producto comunicativo."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de respuestas recolectadas y categorización de puntos de dolor del usuario.",
          "desarrollo": "Elaboración del producto comunicativo respondiendo a las preguntas guía (¿Qué?, ¿Quién?, ¿Dónde?, ¿Cómo?, ¿Por qué?, ¿Cuándo?).",
          "cierre": "Sesión de intercambio grupal para validar la claridad y relevancia del problema definido."
        }
      },
      {
        "id": "etapa3_idear",
        "numero": 3,
        "nombre": "Etapa 3: Idear (Etapa Inicial)",
        "faseId": "fase1_investigacion",
        "faseNombre": "A. Etapa Inicial (Empatizar / Definir / Idear)",
        "proposito": "Generar una amplia variedad de ideas creativas, evaluar su aplicabilidad cotidiana y seleccionar la solución más eficiente mediante justificación comparativa.",
        "accionesClave": [
          "Generar una amplia variedad de ideas considerando la perspectiva del usuario y cómo beneficiarse de ellas en el día a día.",
          "Fomentar el pensamiento amplio y creativo, minimizando juicios de valor y permitiendo el flujo de ideas imaginativas.",
          "Seleccionar la idea más prometedora y justificar con claridad, con al menos dos ideas, por qué es la más eficiente frente a otras."
        ],
        "entregablesSugeridos": [
          "Matriz de lluvia de ideas y técnicas de ideación aplicadas",
          "Ficha de selección y justificación fundamentada de la solución elegida"
        ],
        "semanaSugeridaModulo1": [8, 9],
        "semanaSugeridaModulo2": [8, 9],
        "indicadorLogro": "Seleccionar la idea más eficiente para ofrecer una posible solución a un problema o situación por resolver. (Idear)",
        "indicadoresEvaluacion": [
          "Selecciona la idea que ofrezca la solución más eficiente para resolver el problema o situación.",
          "Justifica de manera clara, con al menos dos ideas, por qué la solución elegida es la más eficiente, comparándola con otras."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Pregunta generadora: ¿Cómo podrías usar esta solución en tu día a día?",
          "desarrollo": "Dinámica de ideación colaborativa, votación democrática y ponderación de viabilidad técnica.",
          "cierre": "Redacción de la justificación comparativa de la idea ganadora ante el grupo."
        }
      },
      {
        "id": "etapa4_prototipar",
        "numero": 4,
        "nombre": "Etapa 4: Prototipar (Etapa de Desarrollo)",
        "faseId": "fase2_desarrollo",
        "faseNombre": "B. Etapa de Desarrollo (Prototipar)",
        "proposito": "Crear un prototipo tangible o representación visual simple, realista y factible con los recursos disponibles que resuelva la situación problema planteada.",
        "accionesClave": [
          "A partir de la idea más prometedora seleccionada, crear un prototipo tangible o una representación visual simple y de bajo costo.",
          "Reflexionar sobre los recursos tecnológicos necesarios y disponibles (conexión a internet, materiales, lenguajes de programación y software específico).",
          "Generar prototipos funcionales mediante maqueta, guion gráfico, programa, simulación o la combinación de estos para resolver el problema."
        ],
        "entregablesSugeridos": [
          "Prototipo tangible o representación visual funcional (maqueta, programa, simulación o combinación)",
          "Código fuente estructurado y esquemas de conexionado/diseño"
        ],
        "semanaSugeridaModulo1": [11, 12, 13, 14],
        "semanaSugeridaModulo2": [11, 12, 13, 14],
        "actividadEnriquecida": {
          "inicio": "Focalización: Inventario de recursos tecnológicos disponibles y pautas de seguridad en el laboratorio.",
          "desarrollo": "Ensamble del prototipo tangible, conexión de circuitos y programación por bloques o texto.",
          "cierre": "Verificación de funcionamiento preliminar y ajustes técnicos inmediatos."
        }
      },
      {
        "id": "etapa5_evaluar_testear",
        "numero": 5,
        "nombre": "Etapa 5: Probar / Evaluar (Etapa Final)",
        "faseId": "fase3_evaluacion",
        "faseNombre": "C. Etapa Final (Probar / Evaluar)",
        "proposito": "Evaluar el alcance del prototipo, probar su efectividad con usuarios en situaciones cotidianas, aplicar mejoras reiterativas y sustentar los resultados.",
        "accionesClave": [
          "Evaluar el alcance del prototipo (qué funciona y qué no) para recopilar retroalimentación de los usuarios o clientes.",
          "Organizar pruebas donde las personas estudiantes usen sus prototipos en situaciones cotidianas y frente a los usuarios.",
          "Realizar sesiones de retroalimentación reflexiva: ¿Funcionó como esperabas? ¿Qué aprendiste sobre su aplicación práctica?",
          "Aplicar mejoras según observaciones y reiterar las etapas las veces necesarias hasta alcanzar la solución óptima."
        ],
        "entregablesSugeridos": [
          "Matriz de pruebas con usuarios y registro de retroalimentación",
          "Bitácora de mejoras implementadas y sustentación en la Demostración de lo Aprendido"
        ],
        "semanaSugeridaModulo1": [16, 17, 18],
        "semanaSugeridaModulo2": [16, 17, 18],
        "actividadEnriquecida": {
          "inicio": "Focalización: Planificación de las pruebas de usuario y pautas de presentación pública.",
          "desarrollo": "Pruebas de campo con usuarios reales, registro de impresiones y refinamiento del prototipo.",
          "cierre": "Sustentación pública del proyecto y evaluación final con instrumentos oficiales."
        }
      }
    ]
  },
  {
    "moduloId": 2,
    "tituloProyecto": "Componente Proyecto • Metodología Design Thinking (DT) — Ciencia de Datos & IA",
    "problemaContextual": "El componente de evaluación denominado proyecto responde al currículo por competencias del PNFT. Se desarrolla mediante 3 etapas (Inicial, Desarrollo y Final) integrando las 5 fases de Design Thinking en torno a una situación problema real de gestión de datos, modelado e inteligencia artificial.",
    "fases": [
      {
        "id": "fase1_investigacion",
        "numero": 1,
        "nombre": "A. Etapa Inicial: Empatizar, Definir e Idear",
        "descripcion": "Comprensión profunda de las necesidades de información de los usuarios, delimitación del desafío de datos y selección de la solución digital más eficiente.",
        "etapas": [
          "etapa1_empatizar",
          "etapa2_definir",
          "etapa3_idear"
        ],
        "evidenciasEsperadas": [
          "Registro de intereses y necesidades de información de los usuarios (encuestas digitales, entrevistas)",
          "Producto comunicativo con síntesis de requerimientos de datos (infografía, esquema relacional, resumen)",
          "Selección y justificación comparativa de la alternativa digital más eficiente"
        ]
      },
      {
        "id": "fase2_desarrollo",
        "numero": 2,
        "nombre": "B. Etapa de Desarrollo: Prototipar",
        "descripcion": "Creación de un prototipo digital tangible o representación visual (base de datos, modelo 3D, aplicación web o simulación) realista y funcional.",
        "etapas": [
          "etapa4_prototipar"
        ],
        "evidenciasEsperadas": [
          "Prototipo digital operativo (base de datos relacional, modelo 3D, interfaz web o simulación)",
          "Estructura de consultas SQL, archivos 3D y recursos interactivos documentados"
        ]
      },
      {
        "id": "fase3_evaluacion",
        "numero": 3,
        "nombre": "C. Etapa Final: Probar / Evaluar",
        "descripcion": "Evaluación del prototipo digital en contexto real, auditoría ética y de licenciamiento, recopilación de feedback y sustentación pública.",
        "etapas": [
          "etapa5_evaluar_testear"
        ],
        "evidenciasEsperadas": [
          "Pruebas de usabilidad y feedback de usuarios sobre la solución digital",
          "Portafolio digital con auditoría ética/licenciamiento y sustentación en la Demostración de lo Aprendido"
        ]
      }
    ],
    "etapas": [
      {
        "id": "etapa1_empatizar",
        "numero": 1,
        "nombre": "Etapa 1: Empatizar (Etapa Inicial)",
        "faseId": "fase1_investigacion",
        "faseNombre": "A. Etapa Inicial (Empatizar / Definir / Idear)",
        "proposito": "Partir del planteamiento de un problema o situación a resolver sobre gestión de información y necesidades de usuarios en la comunidad educativa.",
        "accionesClave": [
          "Partir del planteamiento de un problema o situación a resolver que surge de los intereses y necesidades de un usuario o cliente.",
          "Registrar los intereses y necesidades del usuario ante un problema o situación a resolver, por medio de entrevistas, observaciones, grabaciones, encuestas, entre otras.",
          "Propiciar la reflexión individual o grupal sobre el problema a resolver: ¿Cuál es la raíz del problema de información? ¿Cómo afecta a los usuarios? ¿Qué soluciones digitales son viables?"
        ],
        "entregablesSugeridos": [
          "Formulario o encuesta digital de recolección aplicado a usuarios",
          "Registro sistematizado de requerimientos e intereses de los usuarios"
        ],
        "semanaSugeridaModulo1": [3, 4],
        "semanaSugeridaModulo2": [3, 4],
        "indicadorLogro": "Describir las necesidades, deseos y motivaciones de usuarios o clientes que tienen un problema o situación por resolver. (Empatizar)",
        "indicadoresEvaluacion": [
          "Describe un problema o situación por resolver que es importante para un usuario o cliente.",
          "Registra los intereses y necesidades del usuario ante un problema o situación a resolver, por medio de entrevistas, observaciones, grabaciones, encuestas, entre otras."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de problemas cotidianos vinculados al manejo de datos, comunicación o diseño.",
          "desarrollo": "Diseño y aplicación de encuestas digitales y entrevistas a usuarios de la institución.",
          "cierre": "Consolidación de las respuestas y categorización de requerimientos clave."
        }
      },
      {
        "id": "etapa2_definir",
        "numero": 2,
        "nombre": "Etapa 2: Definir (Etapa Inicial)",
        "faseId": "fase1_investigacion",
        "faseNombre": "A. Etapa Inicial (Empatizar / Definir / Idear)",
        "proposito": "Sintetizar los hallazgos de la fase Empatizar construyendo un producto comunicativo que estructure con claridad las necesidades de datos o modelado.",
        "accionesClave": [
          "Sintetizar los hallazgos de la fase Empatizar (problema a resolver, intereses y necesidades del usuario o cliente).",
          "Desarrollar un producto comunicativo (resumen, infográfico, tabla, mapa conceptual, esquema, video o audio) respondiendo a: ¿Qué?, ¿Quién?, ¿Dónde?, ¿Cómo?, ¿Por qué?, ¿Cuándo?",
          "Facilitar sesiones de discusión donde las personas estudiantes compartan sus puntos de vista y reflexionen sobre cómo el problema se conecta con situaciones reales."
        ],
        "entregablesSugeridos": [
          "Producto comunicativo estructurado (infografía, diagrama de requerimientos o tabla comparativa)",
          "Definición formal del reto de diseño digital y entidades clave"
        ],
        "semanaSugeridaModulo1": [5, 6],
        "semanaSugeridaModulo2": [5, 6],
        "indicadorLogro": "Sintetizar los hallazgos relacionados con los intereses y necesidades del usuario o cliente, de modo que se entienda con claridad el problema o situación a resolver. (Definir)",
        "indicadoresEvaluacion": [
          "Sintetiza los intereses y necesidades del usuario o cliente en la construcción de un producto comunicativo."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Análisis de requerimientos funcionales y estructuración lógica del problema.",
          "desarrollo": "Creación del producto comunicativo respondiendo a las preguntas clave del reto de datos.",
          "cierre": "Validación con docentes y compañeros de la claridad de los requerimientos delimitados."
        }
      },
      {
        "id": "etapa3_idear",
        "numero": 3,
        "nombre": "Etapa 3: Idear (Etapa Inicial)",
        "faseId": "fase1_investigacion",
        "faseNombre": "A. Etapa Inicial (Empatizar / Definir / Idear)",
        "proposito": "Generar alternativas creativas de solución digital, evaluar su impacto y seleccionar la propuesta más eficiente con justificación fundamentada.",
        "accionesClave": [
          "Generar una amplia variedad de ideas considerando la perspectiva del usuario y cómo beneficiarse de ellas en el día a día.",
          "Fomentar el pensamiento amplio y creativo, minimizando juicios de valor y permitiendo el flujo de ideas imaginativas.",
          "Seleccionar la idea más prometedora y justificar con claridad, con al menos dos ideas, por qué es la más eficiente frente a otras."
        ],
        "entregablesSugeridos": [
          "Bocetos conceptuales, esquemas relacionales o borradores de prompts",
          "Justificación comparativa documentada de la solución seleccionada"
        ],
        "semanaSugeridaModulo1": [8, 9],
        "semanaSugeridaModulo2": [8, 9],
        "indicadorLogro": "Seleccionar la idea más eficiente para ofrecer una posible solución a un problema o situación por resolver. (Idear)",
        "indicadoresEvaluacion": [
          "Selecciona la idea que ofrezca la solución más eficiente para resolver el problema o situación.",
          "Justifica de manera clara, con al menos dos ideas, por qué la solución elegida es la más eficiente, comparándola con otras."
        ],
        "actividadEnriquecida": {
          "inicio": "Focalización: Pregunta generadora: ¿Cómo podrías usar esta solución en tu día a día?",
          "desarrollo": "Diseño de alternativas conceptuales (bases de datos, modelos 3D o plataformas) y evaluación cruzada.",
          "cierre": "Elección formal y redacción de la justificación con criterios de eficiencia y viabilidad."
        }
      },
      {
        "id": "etapa4_prototipar",
        "numero": 4,
        "nombre": "Etapa 4: Prototipar (Etapa de Desarrollo)",
        "faseId": "fase2_desarrollo",
        "faseNombre": "B. Etapa de Desarrollo (Prototipar)",
        "proposito": "Construir la solución digital (base de datos relacional, modelo 3D paramétrico o aplicación asistida por IA) de forma realista y factible.",
        "accionesClave": [
          "A partir de la idea más prometedora seleccionada, crear un prototipo tangible o una representación visual simple y de bajo costo.",
          "Reflexionar sobre los recursos tecnológicos necesarios y disponibles (software de base de datos, modelado 3D, conectividad).",
          "Generar prototipos funcionales mediante base de datos relacional, modelo 3D, simulación o combinación de estos."
        ],
        "entregablesSugeridos": [
          "Base de datos relacional funcional o archivo de modelado 3D (.STL)",
          "Recursos multimedia estructurados y documentación de consultas"
        ],
        "semanaSugeridaModulo1": [11, 12, 13, 14],
        "semanaSugeridaModulo2": [11, 12, 13, 14],
        "actividadEnriquecida": {
          "inicio": "Focalización: Verificación del entorno de desarrollo de bases de datos y software 3D.",
          "desarrollo": "Creación de tablas, relaciones, modelado CAD 3D y estructuración de la interfaz.",
          "cierre": "Validación de integridad de datos y prueba funcional del prototipo digital."
        }
      },
      {
        "id": "etapa5_evaluar_testear",
        "numero": 5,
        "nombre": "Etapa 5: Probar / Evaluar (Etapa Final)",
        "faseId": "fase3_evaluacion",
        "faseNombre": "C. Etapa Final (Probar / Evaluar)",
        "proposito": "Evaluar la efectividad del prototipo digital con usuarios reales, auditar el licenciamiento ético de recursos y sustentar los resultados.",
        "accionesClave": [
          "Evaluar el alcance del prototipo digital (qué funciona y qué no) recopilando retroalimentación de los usuarios.",
          "Organizar pruebas de uso en situaciones cotidianas con personas usuarias del entorno.",
          "Realizar sesiones de retroalimentación reflexiva: ¿Funcionó como esperabas? ¿Qué aprendiste sobre su aplicación práctica?",
          "Aplicar mejoras según observaciones y auditar el respeto a los derechos de autor y ética de la IA."
        ],
        "entregablesSugeridos": [
          "Registro de feedback y pruebas de usabilidad con usuarios",
          "Portafolio digital con autoría ética y sustentación en la Demostración de lo Aprendido"
        ],
        "semanaSugeridaModulo1": [16, 17, 18],
        "semanaSugeridaModulo2": [16, 17, 18],
        "actividadEnriquecida": {
          "inicio": "Focalización: Revisión de la rúbrica de sustentación y auditoría de licencias Creative Commons.",
          "desarrollo": "Demostración de la solución digital ante usuarios, recolección de observaciones y ajustes finales.",
          "cierre": "Sustentación pública y cierre del ciclo evaluativo del proyecto."
        }
      }
    ]
  }
];

