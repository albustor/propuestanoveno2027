import json, os

m1_saberes_robotica = [
    {
        id: movimiento_mecanismos,
        nombre: Movimiento en mecanismos,
        indicador: Identificar el movimiento en mecanismos robóticos, diferenciando el movimiento de entrada y salida, a partir de la observación y análisis de simulaciones o prototipos básicos que integren sensores y actuadores.,
        descripcion: Análisis de poleas, engranajes, palancas y transmisión de fuerza en mecanismos robóticos.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Observación de videos y modelos de transmisiones mecánicas (bicicletas, brazos robóticos). Pregunta: ¿Cómo transforma un engranaje pequeño la velocidad del motor en fuerza?,
        desarrollo: Construcción y Simulación: Ensamble y simulación de trenes de engranajes y poleas con cálculo de relación de transmisión (fuerza vs. velocidad) acoplados a un motor.,
        cierre: Sistematización: Puesta en común, contrastación de la ganancia de torque y evaluación formativa con lista de cotejo cinemática.,
        recursos: [Tinkercad Circuits/Mecanismos, Kits de engranajes y poleas, Material reciclable]
    },
    {
        id: microcontrolador,
        nombre: Microcontrolador,
        indicador: Aplicar las funciones de un microcontrolador, utilizando pines digitales y analógicos, conexión a VCC y GND y comunicación con sensores y actuadores durante la simulación o construcción de prototipos.,
        descripcion: Configuración de placas (Arduino / Micro:bit / ESP32), puertos I/O, alimentación y señales PWM.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Comparación del microcontrolador con el cerebro humano (procesamiento de impulsos y control de extremidades).,
        desarrollo: Laboratorio: Cableado seguro en protoboard distinguiendo pines digitales (0/1), analógicos (0-1023) y rieles de alimentación 5V/GND.,
        cierre: Verificación: Lectura del monitor serial en vivo, revisión de polaridad y registro de aprendizajes en bitácora.,
        recursos: [Arduino IDE / MakeCode, Placas Arduino Uno / Micro:bit, Protoboard y cables Dupont]
    },
    {
        id: sensor,
        nombre: Sensor,
        indicador: Integrar un sensor en un prototipo, utilizando sus datos como entrada para generar respuestas automatizadas mediante un microcontrolador.,
        descripcion: Lectura de variables ambientales con ultrasonido HC-SR04, fotorresistencia LDR y sensor de temperatura.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Demostración de cómo un sensor ultrasónico o fotorresistencia detecta cambios en tiempo real.,
        desarrollo: Construcción: Programación de umbrales condicionales (if distancia < 20 cm) para activar respuestas automáticas en el microcontrolador.,
        cierre: Evaluación: Calibración empírica con cinta métrica y reflexión sobre factores ambientales que generan ruido en los datos.,
        recursos: [Sensores HC-SR04, LDR, DHT11, Tinkercad Circuits, Serial Plotter]
    },
    {
        id: actuador,
        nombre: Actuador,
        indicador: Integrar un actuador en un prototipo, programando su activación como respuesta a entradas digitales o condiciones del sistema mediante un microcontrolador.,
        descripcion: Control angular de servomotores (0-180°), zumbadores piezoeléctricos y relevadores de potencia.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Demostración de barreras automáticas y timbres domóticos accionados por señales electrónicas.,
        desarrollo: Programación: Control de servomotores con señales PWM y zumbadores en respuesta directa a las lecturas del sensor.,
        cierre: Demostración: Validación del movimiento suave sin forzar topes mecánicos y coevaluación entre parejas de trabajo.,
        recursos: [Servomotores SG90, Buzzer piezoeléctrico, Librerías Servo.h]
    },
    {
        id: domotica,
        nombre: Domótica,
        indicador: Analizar los usos, aplicaciones y beneficios de la domótica, mediante la creación o simulación de un prototipo que responda a necesidades reales en un entorno cotidiano.,
        descripcion: Sistemas inteligentes para el hogar: ahorro de energía, confort, seguridad perimetral y accesibilidad universal.,
        faseProyecto: fase1_investigacion,
        etapaProyecto: etapa3_idear,
        inicio: Focalización: Análisis de viviendas inteligentes y accesibles para adultos mayores o personas con discapacidad.,
        desarrollo: Diseño: Elaboración del plano espacial y la matriz de causa-efecto domótica (ej. iluminación automática crepuscular).,
        cierre: Socialización: Mini-pitch justificando la viabilidad y el beneficio social/ecológico del sistema domótico diseñado.,
        recursos: [Planos arquitectónicos a escala, Sweet Home 3D / Tinkercad, Materiales reciclables para maquetas]
    },
    {
        id: prototipos,
        nombre: Prototipos,
        indicador: Construir prototipos que integren sensores, actuadores y un microcontrolador, a partir de una necesidad identificada en su contexto.,
        descripcion: Integración completa de hardware, software y maqueta física en una solución funcional replicable.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Revisión de la lista de requisitos y criterios de éxito del prototipo domótico/robótico.,
        desarrollo: Integración: Montaje del circuito en la maqueta, carga del código unificado y ejecución de pruebas de estrés.,
        cierre: Ronda de Pruebas: Dinámica cruzada de detección de bugs (Bug Hunting) y aplicación de la rúbrica de prototipos.,
        recursos: [Kits de robótica completos, Estructuras de cartón o acrílico, Rúbricas de evaluación MEP]
    }
]

m1_saberes_algoritmos = [
    {
        id: entorno_programacion,
        nombre: Entorno de programación textual o bloques para mecanismos robóticos,
        indicador: Diseñar soluciones automatizadas en un entorno de programación textual o por bloques para programar mecanismos robóticos.,
        descripcion: Uso de IDEs visuales y textuales (MakeCode, Arduino IDE, Python) estructurando funciones y eventos.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Comparación entre lógica en bloques y código textual equivalente.,
        desarrollo: Codificación: Creación de funciones modulares con parámetros y estructuras de control selectivas/repetitivas.,
        cierre: Code Review: Revisión de código entre pares evaluando legibilidad, indentación y comentarios.,
        recursos: [Arduino IDE 2.0, MakeCode Arcade, Simulador Wokwi]
    },
    {
        id: algoritmo,
        nombre: Algoritmo,
        indicador: Diseñar un algoritmo para resolver un problema, representándolo de forma estructurada mediante pseudocódigo o diagrama de flujo.,
        descripcion: Lógica algorítmica formal con simbología normalizada de flujogramas y pruebas de escritorio en papel.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa3_idear,
        inicio: Focalización: Reto desconectado de instrucciones precisas a un robot ciego para sortear obstáculos.,
        desarrollo: Diagramación: Diseño del diagrama de flujo estructurado y redacción de pseudocódigo con PSeInt o papel.,
        cierre: Prueba de Escritorio: Validación paso a paso con tabla de variables comprobando la ausencia de bucles infinitos.,
        recursos: [PSeInt, Draw.io / Lucidchart, Plantillas de simbología ANSI]
    }
]

m1_saberes_datos = [
    {
        id: iot,
        nombre: Internet de las cosas (IoT),
        indicador: Analizar el funcionamiento y aplicaciones del Internet de las cosas (IoT), mediante la simulación de sistemas que integren sensores y actuadores para la automatización de tareas en contextos cotidianos.,
        descripcion: Conectividad en red de objetos físicos: telemetría en la nube, dashboards visuales y accionamiento remoto.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Visualización en tiempo real de una estación meteorológica escolar conectada a Internet.,
        desarrollo: Simulación IoT: Envío de telemetría desde ESP32 simulado hacia un dashboard web (Adafruit IO / ThingSpeak).,
        cierre: Reflexión: Análisis de los riesgos de ciberseguridad en dispositivos IoT y buenas prácticas de contraseñas.,
        recursos: [Wokwi ESP32 Wi-Fi, Adafruit IO / ThingSpeak, Paneles de telemetría]
    },
    {
        id: almacenamiento_datos,
        nombre: Almacenamiento de datos,
        indicador: Reconocer el ciclo de vida del dato en el almacenamiento de datos, identificando las etapas de creación, uso, conservación y eliminación responsable de la información en contextos educativos o personales.,
        descripcion: Gobernanza del dato: ciclo vital (Creación -> Almacenamiento -> Procesamiento -> Backup -> Eliminación segura).,
        faseProyecto: fase1_investigacion,
        etapaProyecto: etapa2_definir,
        inicio: Focalización: Dilema sobre la permanencia de fotos y registros personales tras ser supuestamente eliminados.,
        desarrollo: Práctica: Implementación de la regla de respaldo 3-2-1 y análisis comparativo de formatos estructurados (CSV/JSON).,
        cierre: Decálogo: Creación colaborativa del decálogo de higiene del dato y protección de privacidad según Ley 8968.,
        recursos: [Visualizadores JSON/CSV, Guías de respaldo 3-2-1, Herramientas de cifrado open source]
    }
]

m2_saberes_apropiacion = [
    {
        id: redes_comunicacion,
        nombre: Redes de comunicación,
        indicador: Reconocer las redes de comunicación a partir de su arquitectura, protocolos (como HTTP, HTTPS y TCP/IP) e interfaces, comprendiendo su funcionamiento durante el intercambio de datos.,
        descripcion: Topologías de red, modelo cliente-servidor, direccionamiento IPv4/IPv6 y protocolos de internet.,
        faseProyecto: fase1_investigacion,
        etapaProyecto: etapa2_definir,
        inicio: Focalización: Rastreo de la ruta de paquetes de datos (ping y tracert) a través de servidores mundiales.,
        desarrollo: Simulación de Red: Diseño de una red LAN en simulador configurando IPs, switches y pruebas de tráfico HTTP/HTTPS.,
        cierre: Diagnóstico: Detección y corrección de fallas de red (IPs duplicadas o puertas de enlace incorrectas).,
        recursos: [Cisco Packet Tracer / Web Network Sim, Herramientas de terminal, Cables UTP y conectores RJ-45]
    },
    {
        id: sistema_operativo,
        nombre: Sistema Operativo,
        indicador: Aplicar técnicas de optimización del sistema operativo, identificando cómo gestionar memoria, desfragmentar discos, limpiar caché y actualizar el sistema para el mejoramiento del desempeño de dispositivos.,
        descripcion: Mantenimiento preventivo: gestión de memoria RAM, procesos en segundo plano, limpieza de temporales y parches.,
        faseProyecto: fase1_investigacion,
        etapaProyecto: etapa2_definir,
        inicio: Focalización: Inspección del Administrador de Tareas identificando cuellos de botella en CPU y memoria RAM.,
        desarrollo: Optimización: Ejecución segura de rutinas de limpieza de archivos temporales (%temp%) y optimización de arranque.,
        cierre: Checklist: Elaboración de una guía ilustrada de mantenimiento preventivo para los dispositivos del hogar.,
        recursos: [Herramientas nativas del S.O., Monitores de rendimiento, Fichas de mantenimiento preventivo]
    },
    {
        id: base_datos,
        nombre: Herramienta de productividad (gestor de bases de datos),
        indicador: Utilizar un gestor de bases de datos como herramienta de productividad para la creación de tablas, estableciendo relaciones entre ellas y realizando consultas en la organización de la información.,
        descripcion: Modelado relacional: tablas, campos, clave primaria (PK), clave foránea (FK), relaciones 1:N y consultas de filtro.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Análisis de inconsistencias por duplicidad de datos en hojas de cálculo desordenadas.,
        desarrollo: Modelado SQL: Creación de tablas relacionadas con integridad referencial y ejecución de consultas con filtros.,
        cierre: Reporte: Generación de consultas ejecutivas que resuelven preguntas clave de gestión comunitaria.,
        recursos: [DB Browser for SQLite, LibreOffice Base / MS Access, Diagramas Entidad-Relación]
    },
    {
        id: contenido_multimedia_3d,
        nombre: Herramientas de creación de contenido multimedia,
        indicador: Utilizar herramientas de creación de contenido multimedia para el modelado 3D, aplicando funciones básicas de creación y edición en productos digitales.,
        descripcion: Modelado 3D espacial en ejes X-Y-Z: primitivas, operaciones booleanas (agrupar, hueco) y exportación .STL.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa4_prototipar,
        inicio: Focalización: Manipulación de piezas físicas impresas en 3D y análisis de sus vistas ortogonales.,
        desarrollo: Modelado Paramétrico: Diseño de una pieza o soporte para sensor en Tinkercad 3D con medidas exactas en mm.,
        cierre: Inspección Laminador: Validación del modelo 3D en software laminador revisando grosor de paredes y resistencia.,
        recursos: [Tinkercad 3D Designs, Visor 3D, Calibrador y reglas métricas]
    },
    {
        id: plataformas_contenido,
        nombre: Plataformas de creación de contenido,
        indicador: Crear encuestas o formularios mediante plataformas de creación de contenido, ajustando su formato y estructura al propósito de recolección o evaluación de datos.,
        descripcion: Instrumentación digital: encuestas, validación de campos, lógica de ramificación y exportación estadística.,
        faseProyecto: fase1_investigacion,
        etapaProyecto: etapa1_empatizar,
        inicio: Focalización: Comparación crítica de preguntas sesgadas vs. preguntas objetivas y medibles.,
        desarrollo: Formulario Digital: Creación de formulario con saltos de sección condicionales y distribución vía código QR.,
        cierre: Pilotaje: Análisis de gráficos estadísticos generados en tiempo real y ajuste de preguntas confusas.,
        recursos: [Microsoft Forms (MEP) / Google Forms, Generador de códigos QR, Hojas de cálculo]
    },
    {
        id: derechos_autor,
        nombre: Derechos de autor y licenciamiento,
        indicador: Reconocer la importancia de los derechos de autor y el licenciamiento, aplicando buenas prácticas de uso ético y legal de contenidos digitales.,
        descripcion: Propiedad intelectual: Copyright, dominio público, licencias Creative Commons (CC) y normas de citación APA 7.,
        faseProyecto: fase3_evaluacion,
        etapaProyecto: etapa5_evaluar_testear,
        inicio: Focalización: Dilema ético sobre la apropiación indebida de ilustraciones y software en Internet.,
        desarrollo: Curaduría y Citas: Búsqueda de recursos libres (CC BY-SA) y redacción de referencias bibliográficas en APA 7.,
        cierre: Auditoría Ética: Verificación de créditos en el portafolio del proyecto y asignación de licencia al trabajo propio.,
        recursos: [Creative Commons Chooser, Manual APA 7 MEP/SIBEYCRA, Buscadores de recursos libres]
    },
    {
        id: huella_digital,
        nombre: Huella digital,
        indicador: Analizar la utilidad e implicaciones de la huella digital, valorando cómo las acciones en línea afectan la identidad, reputación y seguridad personal en entornos digitales.,
        descripcion: Rastros digitales: metadatos EXIF, cookies de rastreo y construcción de una identidad digital profesional.,
        faseProyecto: fase3_evaluacion,
        etapaProyecto: etapa5_evaluar_testear,
        inicio: Focalización: Ejercicio de búsqueda del propio nombre y extracción de coordenadas GPS en metadatos de fotos.,
        desarrollo: Auditoría de Privacidad: Configuración de permisos de aplicaciones y diseño de una marca personal positiva.,
        cierre: Pacto de Higiene Digital: Compromisos concretos de privacidad y uso de contraseñas seguras.,
        recursos: [Visor de metadatos EXIF, Paneles de privacidad de cuentas, Guías de ciberseguridad personal]
    },
    {
        id: riesgos_linea,
        nombre: Riesgos en línea,
        indicador: Analizar riesgos en línea (acceso a información inapropiada, ciberadicción, ciberacoso y el sexting), valorando estrategias de prevención y autocuidado en sus interacciones digitales.,
        descripcion: Prevención y autocuidado: ciberacoso, phishing, grooming y protocolos institucionales del MEP.,
        faseProyecto: fase3_evaluacion,
        etapaProyecto: etapa5_evaluar_testear,
        inicio: Focalización: Análisis de casos de engaño digital y presentación de las rutas institucionales de denuncia.,
        desarrollo: Campaña Preventiva: Creación de infografías o podcasts educativos con consejos de autocuidado y números de auxilio.,
        cierre: Socialización: Presentación de campañas y firma del pacto de convivencia pacífica en entornos virtuales.,
        recursos: [Protocolos oficiales MEP, Canva / Audacity, Fichas de números de emergencia]
    }
]

m2_saberes_datos = [
    {
        id: herramientas_generativas,
        nombre: Herramientas generativas,
        indicador: Aplicar herramientas generativas con inteligencia artificial en la producción de contenido digital, considerando criterios de seguridad, propiedad intelectual y responsabilidad digital.,
        descripcion: Ingeniería de prompts estructurada (Rol, Contexto, Tarea, Restricción), fact-checking y co-creación.,
        faseProyecto: fase2_desarrollo,
        etapaProyecto: etapa3_idear,
        inicio: Focalización: Demostración de generación de textos y código mediante IA y detección de alucinaciones.,
        desarrollo: Taller de Prompts: Redacción de prompts estructurados R-C-T-R y contrastación de datos con fuentes confiables.,
        cierre: Declaración Ética: Presentación del producto co-creado con su respectiva declaración de uso responsable de IA.,
        recursos: [Gemini / Claude con fines educativos, Fuentes bibliográficas académicas, Guías de prompt engineering]
    },
    {
        id: desafios_ia,
        nombre: Desafíos de la IA,
        indicador: Reconocer los desafíos de la inteligencia artificial, identificando riesgos como sesgos, manipulación de información, dependencia tecnológica y privacidad de datos, reflexionando sobre su impacto en la vida laboral, personal y social.,
        descripcion: Impacto ético y social: sesgos algorítmicos, deepfakes, desinformación y futuro del empleo juvenil.,
        faseProyecto: fase3_evaluacion,
        etapaProyecto: etapa5_evaluar_testear,
        inicio: Focalización: Exposición de casos de sesgos discriminatorios en algoritmos y videos deepfake suplantando personas.,
        desarrollo: Juicio Ético Simulado: Debate en tres comités (Fiscalía, Defensa y Tribunal) sobre la regulación de la IA.,
        cierre: Manifiesto Ético: Redacción consensuada de la Carta de Derechos del Estudiante frente a la Inteligencia Artificial.,
        recursos: [Recomendaciones UNESCO sobre IA, Casos de estudio éticos, Herramientas de detección de deepfakes]
    }
]

def format_saber(s):
    return {
        id: s[id],
        nombre: s[nombre],
        indicador: s[indicador],
        descripcion: s[descripcion],
        faseProyectoRecomendada: s[faseProyecto],
        etapaProyectoRecomendada: s[etapaProyecto],
        estrategiaMetodologica: {
            inicio: {
                titulo: Momento 1: Inicio (Focalización y Activación),
                descripcion: s[inicio],
                tiempoEstimado: 15 min,
                accionesDocente: [
                    Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.,
                    Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica.
                ],
                accionesEstudiante: [
                    Participa activamente analizando el problema o dilema planteado por el docente.,
                    Registra dudas e hipótesis iniciales en su bitácora digital o física.
                ],
                preguntasGeneradoras: [
                    ¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?,
                    ¿Qué requerimientos técnicos debemos considerar antes de construir la solución?
                ]
            },
            desarrollo: {
                titulo: Momento 2: Desarrollo (Exploración, Construcción y Aplicación),
                descripcion: s[desarrollo],
                tiempoEstimado: 50 min,
                accionesDocente: [
                    Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.,
                    Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional.
                ],
                accionesEstudiante: [
                    Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.,
                    Aplica depuración sistemática de errores y valida el funcionamiento de su producto.
                ]
            },
            cierre: {
                titulo: Momento 3: Cierre (Sistematización, Reflexión y Evaluación),
                descripcion: s[cierre],
                tiempoEstimado: 15 min,
                accionesDocente: [
                    Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.,
                    Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo.
                ],
                accionesEstudiante: [
                    Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.,
                    Registra conclusiones y aprendizajes consolidados en su bitácora personal.
                ]
            },
            recursosSugeridos: {
                conectado: s[recursos],
                desconectado: [
                    Guías impresas ilustradas paso a paso,
                    Material concreto, componentes manipulables y reciclables,
                    Fichas de trabajo desconectadas y tarjetas lógicas
                ]
            },
            practicasComputacionales: [Modulariza, Abstrae, Depura, Maneja las tecnologías de forma ética y segura],
            actitudesComputacionales: [Gusto por la precisión, Aprender del error, Flexibilidad para manejar problemas],
            pautasDUA: [
                {
                    principio: Representacion,
                    descripcion: Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas.
                },
                {
                    principio: Accion_Expresion,
                    descripcion: Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo.
                }
            ]
        }
    }

modulos = [
    {
        id: 1,
        nombre: Módulo 1: Computación Física, Robótica y Algoritmos para la Solución de Problemas,
        periodo: I Semestre / I Periodo (9° Año),
        descripcion: Desarrollo de competencias en computación física, robótica, formulación algorítmica y gestión responsable del dato. El estudiantado diseña prototipos automatizados mediante microcontroladores, sensores y actuadores con aplicación en domótica y retos comunitarios.,
        ejeProyectoSemestral: Diseño y Construcción de un Prototipo Domótico o Sistema Automatizado Comunitario,
        areas: [
            {
                id: robotica_m1,
                nombre: Computación Física y Robótica,
                rda: Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.,
                color: from-sky-600 to-blue-700,
                icono: Cpu,
                saberes: [format_saber(s) for s in m1_saberes_robotica]
            },
            {
                id: algoritmos_m1,
                nombre: Programación y Algoritmos,
                rda: Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones y librerías en el diseño de algoritmos para resolver problemas.,
                color: from-indigo-600 to-violet-700,
                icono: Code,
                saberes: [format_saber(s) for s in m1_saberes_algoritmos]
            },
            {
                id: datos_m1,
                nombre: Ciencia de Datos e Inteligencia Artificial,
                rda: Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.,
                color: from-emerald-600 to-teal-700,
                icono: Database,
                saberes: [format_saber(s) for s in m1_saberes_datos]
            }
        ]
    },
    {
        id: 2,
        nombre: Módulo 2: Apropiación Tecnológica, Ciudadanía Digital e Inteligencia Artificial,
        periodo: II Semestre / II Periodo (9° Año),
        descripcion: Consolidación del uso crítico, ético y avanzado de las tecnologías digitales: arquitectura de redes, optimización de sistemas operativos, modelado 3D, bases de datos relacionales, formularios avanzados, ciberseguridad, huella digital y el impacto social de las IAs generativas.,
        ejeProyectoSemestral: Desarrollo de una Solución Digital Integral Comunitaria (Bases de Datos, Modelado 3D, Campaña de Ciudadanía Digital y Auditoría IA),
        areas: [
            {
                id: apropiacion_m2,
                nombre: Apropiación Tecnológica y Digital,
                rda: Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad, y experiencia de usuario para la creación de soluciones digitales según su contexto.,
                color: from-amber-600 to-orange-700,
                icono: Layers,
                saberes: [format_saber(s) for s in m2_saberes_apropiacion]
            },
            {
                id: datos_ia_m2,
                nombre: Ciencia de Datos e Inteligencia Artificial,
                rda: Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.,
                color: from-teal-600 to-emerald-700,
                icono: Sparkles,
                saberes: [format_saber(s) for s in m2_saberes_datos]
            }
        ]
    }
]

ts_content = // Catálogo Curricular Oficial - Formación Tecnológica 9° Año (MEP 2026)\nimport { ModuloCurricular } from '../types';\n\nexport const MODULOS_NOVENO_OFICIAL: ModuloCurricular[] =  + json.dumps(modulos, indent=2, ensure_ascii=False) + ;\n

with open('src/data/curriculoNovenoOficial.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print('SUCCESS: src/data/curriculoNovenoOficial.ts generated with 20 indicators!')
