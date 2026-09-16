import json

# 1. CURRICULO NOVENO OFICIAL
raw_m1 = [
  ('robotica_m1', 'movimiento_mecanismos', 'Movimiento en mecanismos', 'Identificar el movimiento en mecanismos robóticos, diferenciando el movimiento de entrada y salida, a partir de la observación y análisis de simulaciones o prototipos básicos que integren sensores y actuadores.', 'Análisis cinemático de engranajes, poleas, bielas y cálculo de relación de transmisión (torque vs. velocidad).', 'fase2_desarrollo', 'etapa4_prototipar', 'Observación de videos de transmisiones mecánicas (brazos robóticos, bicicletas). Pregunta: ¿Cómo transforma un engranaje pequeño la velocidad en fuerza?', 'Ensamble y simulación de trenes de engranajes y poleas con cálculo de relación de transmisión (fuerza vs. velocidad) acoplados a un motor.', 'Puesta en común, contrastación de la ganancia de torque y evaluación formativa con lista de cotejo cinemática.', ['Tinkercad Circuits/Mecanismos', 'Simulador PhET Gears', 'Kits de engranajes y poleas']),
  ('robotica_m1', 'microcontrolador', 'Microcontrolador', 'Aplicar las funciones de un microcontrolador, utilizando pines digitales y analógicos, conexión a VCC y GND y comunicación con sensores y actuadores durante la simulación o construcción de prototipos.', 'Arquitectura de placas (Arduino / Micro:bit / ESP32), mapeo de pines I/O, alimentación y señales PWM.', 'fase2_desarrollo', 'etapa4_prototipar', 'Comparación del microcontrolador con el cerebro humano (procesamiento de impulsos y control de actuadores).', 'Cableado seguro en protoboard distinguiendo pines digitales (0/1), analógicos (0-1023) y rieles 5V/GND, probando lecturas en monitor serial.', 'Lectura del monitor serial en vivo, comprobación de ausencia de cortocircuitos y registro en bitácora técnica.', ['Arduino IDE / MakeCode', 'Placas Arduino / Micro:bit', 'Protoboard y cables Dupont']),
  ('robotica_m1', 'sensor', 'Sensor', 'Integrar un sensor en un prototipo, utilizando sus datos como entrada para generar respuestas automatizadas mediante un microcontrolador.', 'Lectura y calibración de variables físicas con ultrasonido HC-SR04, fotorresistencia LDR y sensor de temperatura.', 'fase2_desarrollo', 'etapa4_prototipar', 'Demostración de cómo un sensor ultrasónico o fotorresistencia detecta variaciones del entorno en tiempo real.', 'Programación de umbrales condicionales (if distancia < 20 cm) para activar respuestas automáticas en el microcontrolador.', 'Calibración empírica con cinta métrica y reflexión sobre factores ambientales que generan ruido en los datos.', ['Sensores HC-SR04, LDR, DHT11', 'Tinkercad Circuits', 'Serial Plotter']),
  ('robotica_m1', 'actuador', 'Actuador', 'Integrar un actuador en un prototipo, programando su activación como respuesta a entradas digitales o condiciones del sistema mediante un microcontrolador.', 'Control angular de servomotores (0-180°), zumbadores piezoeléctricos y relevadores de potencia.', 'fase2_desarrollo', 'etapa4_prototipar', 'Demostración de barreras automáticas y timbres domóticos accionados por señales electrónicas.', 'Control de servomotores con señales PWM y zumbadores en respuesta directa a las lecturas del sensor.', 'Validación del movimiento suave sin forzar topes mecánicos y coevaluación entre parejas de trabajo.', ['Servomotores SG90', 'Buzzer piezoeléctrico', 'Librerías Servo.h']),
  ('robotica_m1', 'domotica', 'Domótica', 'Analizar los usos, aplicaciones y beneficios de la domótica, mediante la creación o simulación de un prototipo que responda a necesidades reales en un entorno cotidiano.', 'Sistemas inteligentes para el hogar: ahorro de energía, confort, seguridad perimetral y accesibilidad universal.', 'fase1_investigacion', 'etapa3_idear', 'Análisis de viviendas inteligentes y accesibles para adultos mayores o personas con discapacidad.', 'Elaboración del plano espacial y la matriz de causa-efecto domótica (ej. iluminación automática crepuscular + alarma de gas).', 'Mini-pitch justificando la viabilidad y el beneficio social/ecológico del sistema domótico diseñado.', ['Planos a escala', 'Sweet Home 3D / Tinkercad', 'Materiales reciclables para maquetas']),
  ('robotica_m1', 'prototipos', 'Prototipos', 'Construir prototipos que integren sensores, actuadores y un microcontrolador, a partir de una necesidad identificada en su contexto.', 'Integración completa de hardware, software y maqueta física en una solución funcional replicable.', 'fase2_desarrollo', 'etapa4_prototipar', 'Revisión de la lista de requisitos y criterios de éxito del prototipo domótico/robótico.', 'Montaje del circuito en la maqueta, carga del código unificado y ejecución de pruebas de estrés.', 'Dinámica cruzada de detección de bugs (Bug Hunting) y aplicación de la rúbrica de prototipos.', ['Kits de robótica completos', 'Estructuras de cartón o acrílico', 'Rúbrica oficial MEP']),
  ('algoritmos_m1', 'entorno_programacion', 'Entorno de programación textual o bloques para mecanismos robóticos', 'Diseñar soluciones automatizadas en un entorno de programación textual o por bloques para programar mecanismos robóticos.', 'Uso de IDEs visuales y textuales (MakeCode, Arduino IDE, Python) estructurando funciones y eventos.', 'fase2_desarrollo', 'etapa4_prototipar', 'Comparación entre lógica en bloques y código textual equivalente, analizando correspondencia de sintaxis.', 'Creación de funciones modulares con parámetros y estructuras de control selectivas/repetitivas.', 'Revisión de código entre pares evaluando legibilidad, indentación y comentarios.', ['Arduino IDE 2.0', 'MakeCode Arcade', 'Simulador Wokwi']),
  ('algoritmos_m1', 'algoritmo', 'Algoritmo', 'Diseñar un algoritmo para resolver un problema, representándolo de forma estructurada mediante pseudocódigo o diagrama de flujo.', 'Lógica algorítmica formal con simbología normalizada de flujogramas y pruebas de escritorio en papel.', 'fase2_desarrollo', 'etapa3_idear', 'Reto desconectado de instrucciones precisas a un robot ciego para sortear obstáculos.', 'Diseño del diagrama de flujo estructurado y redacción de pseudocódigo con PSeInt o papel.', 'Validación paso a paso con tabla de variables comprobando la ausencia de bucles infinitos.', ['PSeInt', 'Draw.io / Lucidchart', 'Plantillas de simbología ANSI']),
  ('datos_m1', 'iot', 'Internet de las cosas (IoT)', 'Analizar el funcionamiento y aplicaciones del Internet de las cosas (IoT), mediante la simulación de sistemas que integren sensores y actuadores para la automatización de tareas en contextos cotidianos.', 'Conectividad en red de objetos físicos: telemetría en la nube, dashboards visuales y accionamiento remoto.', 'fase2_desarrollo', 'etapa4_prototipar', 'Visualización en tiempo real de una estación meteorológica escolar conectada a Internet.', 'Envío de telemetría desde ESP32 simulado hacia un dashboard web (Adafruit IO / ThingSpeak).', 'Análisis de los riesgos de ciberseguridad en dispositivos IoT y buenas prácticas de contraseñas.', ['Wokwi ESP32 Wi-Fi', 'Adafruit IO / ThingSpeak', 'Paneles de telemetría']),
  ('datos_m1', 'almacenamiento_datos', 'Almacenamiento de datos', 'Reconocer el ciclo de vida del dato en el almacenamiento de datos, identificando las etapas de creación, uso, conservación y eliminación responsable de la información en contextos educativos o personales.', 'Gobernanza del dato: ciclo vital (Creación -> Almacenamiento -> Procesamiento -> Backup -> Eliminación segura).', 'fase1_investigacion', 'etapa2_definir', 'Dilema sobre la permanencia de fotos y registros personales tras ser supuestamente eliminados.', 'Implementación de la regla de respaldo 3-2-1 y análisis comparativo de formatos estructurados (CSV/JSON).', 'Creación colaborativa del decálogo de higiene del dato y protección de privacidad según Ley 8968.', ['Visualizadores JSON/CSV', 'Guías de respaldo 3-2-1', 'Herramientas de cifrado open source'])
]

raw_m2 = [
  ('apropiacion_m2', 'redes_comunicacion', 'Redes de comunicación', 'Reconocer las redes de comunicación a partir de su arquitectura, protocolos (como HTTP, HTTPS y TCP/IP) e interfaces, comprendiendo su funcionamiento durante el intercambio de datos.', 'Topologías de red, modelo cliente-servidor, direccionamiento IPv4/IPv6 y protocolos de internet.', 'fase1_investigacion', 'etapa2_definir', 'Rastreo de la ruta de paquetes de datos (ping y tracert) a través de servidores mundiales.', 'Diseño de una red LAN en simulador configurando IPs, switches y pruebas de tráfico HTTP/HTTPS.', 'Detección y corrección de fallas de red (IPs duplicadas o puertas de enlace incorrectas).', ['Cisco Packet Tracer / Web Sim', 'Herramientas de terminal', 'Cables UTP y RJ-45']),
  ('apropiacion_m2', 'sistema_operativo', 'Sistema Operativo', 'Aplicar técnicas de optimización del sistema operativo, identificando cómo gestionar memoria, desfragmentar discos, limpiar caché y actualizar el sistema para el mejoramiento del desempeño de dispositivos.', 'Mantenimiento preventivo: gestión de memoria RAM, procesos en segundo plano, temporales y parches.', 'fase1_investigacion', 'etapa2_definir', 'Inspección del Administrador de Tareas identificando cuellos de botella en CPU y memoria RAM.', 'Ejecución segura de rutinas de limpieza de archivos temporales (%temp%) y optimización de arranque.', 'Elaboración de una guía ilustrada de mantenimiento preventivo para los dispositivos del hogar.', ['Herramientas nativas del S.O.', 'Monitores de rendimiento', 'Fichas de mantenimiento']),
  ('apropiacion_m2', 'base_datos', 'Herramienta de productividad (gestor de bases de datos)', 'Utilizar un gestor de bases de datos como herramienta de productividad para la creación de tablas, estableciendo relaciones entre ellas y realizando consultas en la organización de la información.', 'Modelado relacional: tablas, campos, clave primaria (PK), clave foránea (FK), relaciones 1:N y consultas de filtro.', 'fase2_desarrollo', 'etapa4_prototipar', 'Análisis de inconsistencias por duplicidad de datos en hojas de cálculo desordenadas.', 'Creación de tablas relacionadas con integridad referencial y ejecución de consultas con filtros.', 'Generación de consultas ejecutivas que resuelven preguntas clave de gestión comunitaria.', ['DB Browser for SQLite', 'LibreOffice Base / MS Access', 'Diagramas Entidad-Relación']),
  ('apropiacion_m2', 'contenido_multimedia_3d', 'Herramientas de creación de contenido multimedia', 'Utilizar herramientas de creación de contenido multimedia para el modelado 3D, aplicando funciones básicas de creación y edición en productos digitales.', 'Modelado 3D espacial en ejes X-Y-Z: primitivas, operaciones booleanas (agrupar, hueco) y exportación .STL.', 'fase2_desarrollo', 'etapa4_prototipar', 'Manipulación de piezas físicas impresas en 3D y análisis de sus vistas ortogonales.', 'Diseño de una pieza o soporte para sensor en Tinkercad 3D con medidas exactas en mm.', 'Validación del modelo 3D en software laminador revisando grosor de paredes y resistencia.', ['Tinkercad 3D Designs', 'Visor 3D', 'Calibrador y reglas métricas']),
  ('apropiacion_m2', 'plataformas_contenido', 'Plataformas de creación de contenido', 'Crear encuestas o formularios mediante plataformas de creación de contenido, ajustando su formato y estructura al propósito de recolección o evaluación de datos.', 'Instrumentación digital: encuestas, validación de campos, lógica de ramificación y exportación estadística.', 'fase1_investigacion', 'etapa1_empatizar', 'Comparación crítica de preguntas sesgadas vs. preguntas objetivas y medibles.', 'Creación de formulario con saltos de sección condicionales y distribución vía código QR.', 'Análisis de gráficos estadísticos generados en tiempo real y ajuste de preguntas confusas.', ['Microsoft Forms (MEP) / Google Forms', 'Generador de códigos QR', 'Hojas de cálculo']),
  ('apropiacion_m2', 'derechos_autor', 'Derechos de autor y licenciamiento', 'Reconocer la importancia de los derechos de autor y el licenciamiento, aplicando buenas prácticas de uso ético y legal de contenidos digitales.', 'Propiedad intelectual: Copyright, dominio público, licencias Creative Commons (CC) y normas de citación APA 7.', 'fase3_evaluacion', 'etapa5_evaluar_testear', 'Dilema ético sobre la apropiación indebida de ilustraciones y software en Internet.', 'Búsqueda de recursos libres (CC BY-SA) y redacción de referencias bibliográficas en APA 7.', 'Verificación de créditos en el portafolio del proyecto y asignación de licencia al trabajo propio.', ['Creative Commons Chooser', 'Manual APA 7 MEP/SIBEYCRA', 'Buscadores de recursos libres']),
  ('apropiacion_m2', 'huella_digital', 'Huella digital', 'Analizar la utilidad e implicaciones de la huella digital, valorando cómo las acciones en línea afectan la identidad, reputación y seguridad personal en entornos digitales.', 'Rastros digitales: metadatos EXIF, cookies de rastreo y construcción de una identidad digital profesional.', 'fase3_evaluacion', 'etapa5_evaluar_testear', 'Ejercicio de búsqueda del propio nombre y extracción de coordenadas GPS en metadatos de fotos.', 'Configuración de permisos de aplicaciones y diseño de una marca personal positiva.', 'Compromisos concretos de privacidad y uso de contraseñas seguras.', ['Visor de metadatos EXIF', 'Paneles de privacidad de cuentas', 'Guías de ciberseguridad personal']),
  ('apropiacion_m2', 'riesgos_linea', 'Riesgos en línea', 'Analizar riesgos en línea (acceso a información inapropiada, ciberadicción, ciberacoso y el sexting), valorando estrategias de prevención y autocuidado en sus interacciones digitales.', 'Prevención y autocuidado: ciberacoso, phishing, grooming y protocolos institucionales del MEP.', 'fase3_evaluacion', 'etapa5_evaluar_testear', 'Análisis de casos de engaño digital y presentación de las rutas institucionales de denuncia.', 'Creación de infografías o podcasts educativos con consejos de autocuidado y números de auxilio.', 'Presentación de campañas y firma del pacto de convivencia pacífica en entornos virtuales.', ['Protocolos oficiales MEP', 'Canva / Audacity', 'Fichas de números de emergencia']),
  ('datos_ia_m2', 'herramientas_generativas', 'Herramientas generativas', 'Aplicar herramientas generativas con inteligencia artificial en la producción de contenido digital, considerando criterios de seguridad, propiedad intelectual y responsabilidad digital.', 'Ingeniería de prompts estructurada (Rol, Contexto, Tarea, Restricción), fact-checking y co-creación.', 'fase2_desarrollo', 'etapa3_idear', 'Demostración de generación de textos y código mediante IA y detección de alucinaciones.', 'Redacción de prompts estructurados R-C-T-R y contrastación de datos con fuentes confiables.', 'Presentación del producto co-creado con su respectiva declaración de uso responsable de IA.', ['Gemini / Claude con fines educativos', 'Fuentes bibliográficas académicas', 'Guías de prompt engineering']),
  ('datos_ia_m2', 'desafios_ia', 'Desafíos de la IA', 'Reconocer los desafíos de la inteligencia artificial, identificando riesgos como sesgos, manipulación de información, dependencia tecnológica y privacidad de datos, reflexionando sobre su impacto en la vida laboral, personal y social.', 'Impacto ético y social: sesgos algorítmicos, deepfakes, desinformación y futuro del empleo juvenil.', 'fase3_evaluacion', 'etapa5_evaluar_testear', 'Exposición de casos de sesgos discriminatorios en algoritmos y videos deepfake suplantando personas.', 'Debate en tres comités (Fiscalía, Defensa y Tribunal) sobre la regulación de la IA.', 'Redacción consensuada de la Carta de Derechos del Estudiante frente a la Inteligencia Artificial.', ['Recomendaciones UNESCO sobre IA', 'Casos de estudio éticos', 'Herramientas de detección de deepfakes'])
]

def map_item(item):
    area_id, sid, nom, ind, desc, fase, etapa, ini, des, cie, recs = item
    return {
        'id': sid,
        'nombre': nom,
        'indicador': ind,
        'descripcion': desc,
        'faseProyectoRecomendada': fase,
        'etapaProyectoRecomendada': etapa,
        'estrategiaMetodologica': {
            'inicio': {
                'titulo': 'Momento 1: Inicio (Focalización y Activación)',
                'descripcion': ini,
                'tiempoEstimado': '15 min',
                'accionesDocente': [
                    'Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.',
                    'Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica.'
                ],
                'accionesEstudiante': [
                    'Participa activamente analizando el problema o dilema planteado por el docente.',
                    'Registra dudas e hipótesis iniciales en su bitácora digital o física.'
                ],
                'preguntasGeneradoras': [
                    '¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?',
                    '¿Qué requerimientos técnicos debemos considerar antes de construir la solución?'
                ]
            },
            'desarrollo': {
                'titulo': 'Momento 2: Desarrollo (Exploración, Construcción y Aplicación)',
                'descripcion': des,
                'tiempoEstimado': '50 min',
                'accionesDocente': [
                    'Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.',
                    'Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional.'
                ],
                'accionesEstudiante': [
                    'Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.',
                    'Aplica depuración sistemática de errores y valida el funcionamiento de su producto.'
                ]
            },
            'cierre': {
                'titulo': 'Momento 3: Cierre (Sistematización, Reflexión y Evaluación)',
                'descripcion': cie,
                'tiempoEstimado': '15 min',
                'accionesDocente': [
                    'Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.',
                    'Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo.'
                ],
                'accionesEstudiante': [
                    'Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.',
                    'Registra conclusiones y aprendizajes consolidados en su bitácora personal.'
                ]
            },
            'recursosSugeridos': {
                'conectado': recs,
                'desconectado': [
                    'Guías impresas ilustradas paso a paso',
                    'Material concreto, componentes manipulables y reciclables',
                    'Fichas de trabajo desconectadas y tarjetas lógicas'
                ]
            },
            'practicasComputacionales': ['Modulariza', 'Abstrae', 'Depura', 'Maneja las tecnologías de forma ética y segura'],
            'actitudesComputacionales': ['Gusto por la precisión', 'Aprender del error', 'Flexibilidad para manejar problemas'],
            'pautasDUA': [
                {'principio': 'Representacion', 'descripcion': 'Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas.'},
                {'principio': 'Accion_Expresion', 'descripcion': 'Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo.'}
            ]
        }
    }

modulos = [
    {
        'id': 1,
        'nombre': 'Módulo 1: Computación Física, Robótica y Algoritmos para la Solución de Problemas',
        'periodo': 'I Semestre / I Periodo (9° Año)',
        'descripcion': 'Desarrollo de competencias en computación física, robótica, formulación algorítmica y gestión responsable del dato. El estudiantado diseña prototipos automatizados mediante microcontroladores, sensores y actuadores con aplicación en domótica y retos comunitarios.',
        'ejeProyectoSemestral': 'Diseño y Construcción de un Prototipo Domótico o Sistema Automatizado Comunitario',
        'areas': [
            {
                'id': 'robotica_m1',
                'nombre': 'Computación Física y Robótica',
                'rda': 'Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.',
                'color': 'from-sky-600 to-blue-700',
                'icono': 'Cpu',
                'saberes': [map_item(x) for x in raw_m1 if x[0] == 'robotica_m1']
            },
            {
                'id': 'algoritmos_m1',
                'nombre': 'Programación y Algoritmos',
                'rda': 'Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones y librerías en el diseño de algoritmos para resolver problemas.',
                'color': 'from-indigo-600 to-violet-700',
                'icono': 'Code',
                'saberes': [map_item(x) for x in raw_m1 if x[0] == 'algoritmos_m1']
            },
            {
                'id': 'datos_m1',
                'nombre': 'Ciencia de Datos e Inteligencia Artificial',
                'rda': 'Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.',
                'color': 'from-emerald-600 to-teal-700',
                'icono': 'Database',
                'saberes': [map_item(x) for x in raw_m1 if x[0] == 'datos_m1']
            }
        ]
    },
    {
        'id': 2,
        'nombre': 'Módulo 2: Apropiación Tecnológica, Ciudadanía Digital e Inteligencia Artificial',
        'periodo': 'II Semestre / II Periodo (9° Año)',
        'descripcion': 'Consolidación del uso crítico, ético y avanzado de las tecnologías digitales: arquitectura de redes, optimización de sistemas operativos, modelado 3D, bases de datos relacionales, formularios avanzados, ciberseguridad, huella digital y el impacto social de las IAs generativas.',
        'ejeProyectoSemestral': 'Desarrollo de una Solución Digital Integral Comunitaria (Bases de Datos, Modelado 3D, Campaña de Ciudadanía Digital y Auditoría IA)',
        'areas': [
            {
                'id': 'apropiacion_m2',
                'nombre': 'Apropiación Tecnológica y Digital',
                'rda': 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad, y experiencia de usuario para la creación de soluciones digitales según su contexto.',
                'color': 'from-amber-600 to-orange-700',
                'icono': 'Layers',
                'saberes': [map_item(x) for x in raw_m2 if x[0] == 'apropiacion_m2']
            },
            {
                'id': 'datos_ia_m2',
                'nombre': 'Ciencia de Datos e Inteligencia Artificial',
                'rda': 'Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.',
                'color': 'from-teal-600 to-emerald-700',
                'icono': 'Sparkles',
                'saberes': [map_item(x) for x in raw_m2 if x[0] == 'datos_ia_m2']
            }
        ]
    }
]

curriculo_content = "// Catálogo Curricular Oficial - Formación Tecnológica 9° Año (MEP 2026)\nimport { ModuloCurricular } from '../types';\n\nexport const MODULOS_NOVENO_OFICIAL: ModuloCurricular[] = " + json.dumps(modulos, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/curriculoNovenoOficial.ts', 'w', encoding='utf-8') as f:
    f.write(curriculo_content)

print('1. src/data/curriculoNovenoOficial.ts generated!')

# 2. PROYECTOS POR SEMESTRE (3 FASES, 5 ETAPAS)
proyecto_semestres = [
    {
        'moduloId': 1,
        'tituloProyecto': 'Prototipo Domótico Automatizado para Ahorro Energético y Accesibilidad',
        'problemaContextual': 'La comunidad escolar y los hogares enfrentan un alto consumo eléctrico y barreras de accesibilidad que pueden resolverse con sistemas automatizados.',
        'fases': [
            {
                'id': 'fase1_investigacion',
                'numero': 1,
                'nombre': 'Fase I: Investigación y Diagnóstico del Contexto',
                'descripcion': 'Identificación de necesidades del entorno, delimitación del reto tecnológico y análisis del ciclo de vida del dato.',
                'etapas': ['etapa1_empatizar', 'etapa2_definir'],
                'evidenciasEsperadas': ['Bitácora de necesidades comunitarias', 'Ficha técnica de requerimientos y planteamiento del reto']
            },
            {
                'id': 'fase2_desarrollo',
                'numero': 2,
                'nombre': 'Fase II: Ideación, Diseño y Construcción Técnica',
                'descripcion': 'Generación de alternativas, formulación de algoritmos en pseudocódigo y construcción del prototipo físico/simulado.',
                'etapas': ['etapa3_idear', 'etapa4_prototipar'],
                'evidenciasEsperadas': ['Diagramas de flujo y esquemas de conexión', 'Prototipo domótico funcional (físico o simulado)']
            },
            {
                'id': 'fase3_evaluacion',
                'numero': 3,
                'nombre': 'Fase III: Validación, Depuración y Socialización',
                'descripcion': 'Pruebas de estrés, calibración de sensores, corrección de fallas y demostración pública ante la comunidad escolar.',
                'etapas': ['etapa5_evaluar_testear'],
                'evidenciasEsperadas': ['Instrumento de pruebas y depuración', 'Presentación demostrativa (Demostración de lo Aprendido)']
            }
        ],
        'etapas': [
            {
                'id': 'etapa1_empatizar',
                'numero': 1,
                'nombre': 'Etapa 1: Empatizar',
                'faseId': 'fase1_investigacion',
                'faseNombre': 'Fase I: Investigación y Diagnóstico',
                'proposito': 'Comprender las necesidades reales de los usuarios e identificar puntos críticos en el uso de la energía o accesibilidad.',
                'accionesClave': [
                    'Observar y registrar situaciones de desperdicio de luz o barreras arquitectónicas en el colegio.',
                    'Realizar entrevistas breves a conserjes, docentes y familiares sobre retos cotidianos.'
                ],
                'entregablesSugeridos': ['Mapa de empatía del usuario', 'Registro de observaciones en bitácora'],
                'semanaSugeridaModulo1': [3, 4],
                'semanaSugeridaModulo2': [3, 4],
                'criteriosEvaluacionMEP': [
                    'Identifica situaciones problemáticas pertinentes en su contexto sociocultural.',
                    'Registra información cualitativa relevante y con respeto ético.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Lluvia de ideas sobre problemas que la tecnología puede mitigar en el colegio.',
                    'desarrollo': 'Trabajo de campo: Levantamiento de datos en equipos y construcción del mapa de empatía.',
                    'cierre': 'Plenaria: Socialización de los principales hallazgos diagnósticos.'
                }
            },
            {
                'id': 'etapa2_definir',
                'numero': 2,
                'nombre': 'Etapa 2: Definir',
                'faseId': 'fase1_investigacion',
                'faseNombre': 'Fase I: Investigación y Diagnóstico',
                'proposito': 'Formular el problema de diseño de manera precisa mediante una pregunta reto: ¿Cómo podríamos...?',
                'accionesClave': [
                    'Sintetizar los datos recolectados y redactar la declaración del problema.',
                    'Definir los requerimientos técnicos mínimos (sensores, actuadores, presupuesto).'
                ],
                'entregablesSugeridos': ['Declaración del reto de diseño (Problem Statement)', 'Lista de especificaciones técnicas'],
                'semanaSugeridaModulo1': [5, 6],
                'semanaSugeridaModulo2': [5, 6],
                'criteriosEvaluacionMEP': [
                    'Delimita el reto técnico con claridad y viabilidad pedagógica.',
                    'Establece requerimientos funcionales coherentes con los saberes del nivel.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Análisis de declaraciones de problemas bien vs. mal delimitadas.',
                    'desarrollo': 'Redacción colaborativa del reto y la lista de especificaciones del prototipo.',
                    'cierre': 'Validación con el docente para asegurar pertinencia curricular.'
                }
            },
            {
                'id': 'etapa3_idear',
                'numero': 3,
                'nombre': 'Etapa 3: Idear',
                'faseId': 'fase2_desarrollo',
                'faseNombre': 'Fase II: Ideación y Construcción',
                'proposito': 'Generar múltiples soluciones creativas y diseñar la lógica algorítmica y los esquemas de conexión antes del ensamblaje.',
                'accionesClave': [
                    'Realizar sesiones de lluvia de ideas (Brainstorming) y bocetos conceptuales de la maqueta.',
                    'Diseñar el diagrama de flujo estructurado y el pseudocódigo del sistema automático.'
                ],
                'entregablesSugeridos': ['Diagrama de flujo normalizado', 'Boceto a escala de la maqueta domótica'],
                'semanaSugeridaModulo1': [8, 9],
                'semanaSugeridaModulo2': [8, 9],
                'criteriosEvaluacionMEP': [
                    'Diseña algoritmos estructurados con adecuada simbología y lógica secuencial.',
                    'Propone soluciones innovadoras y viables para el problema definido.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Dinámica de pensamiento lateral y divergente.',
                    'desarrollo': 'Diagramación del algoritmo en Draw.io/PSeInt y diseño del circuito en simulador.',
                    'cierre': 'Prueba de escritorio para validar la lógica algorítmica.'
                }
            },
            {
                'id': 'etapa4_prototipar',
                'numero': 4,
                'nombre': 'Etapa 4: Prototipar',
                'faseId': 'fase2_desarrollo',
                'faseNombre': 'Fase II: Ideación y Construcción',
                'proposito': 'Construir el prototipo funcional integrando la placa microcontroladora, sensores, actuadores y el código depurado.',
                'accionesClave': [
                    'Ensamblar la estructura física o maqueta con materiales reusables.',
                    'Cablear los circuitos en protoboard y programar el microcontrolador en bloques o texto.',
                    'Integrar los subsistemas mecánicos y electrónicos en un conjunto cohesivo.'
                ],
                'entregablesSugeridos': ['Prototipo funcional operativo', 'Código fuente comentado y modularizado'],
                'semanaSugeridaModulo1': [11, 12, 13, 14],
                'semanaSugeridaModulo2': [11, 12, 13, 14],
                'criteriosEvaluacionMEP': [
                    'Aplica correctamente las funciones del microcontrolador, sensores y actuadores.',
                    'Demuestra orden, seguridad y buenas prácticas en el cableado y programación.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Verificación de lista de componentes y medidas de seguridad.',
                    'desarrollo': 'Montaje intensivo, programación y prueba individual de cada subsistema.',
                    'cierre': 'Integración final y verificación del primer encendido seguro.'
                }
            },
            {
                'id': 'etapa5_evaluar_testear',
                'numero': 5,
                'nombre': 'Etapa 5: Evaluar y Testear',
                'faseId': 'fase3_evaluacion',
                'faseNombre': 'Fase III: Validación y Socialización',
                'proposito': 'Validar el funcionamiento del prototipo en condiciones reales, corregir fallas mediante depuración y presentar los resultados.',
                'accionesClave': [
                    'Ejecutar la matriz de pruebas de funcionamiento y registrar fallas (debugging).',
                    'Aplicar coevaluación con la rúbrica oficial del MEP.',
                    'Presentar el proyecto en la Demostración de lo Aprendido (Feria Tecnológica).'
                ],
                'entregablesSugeridos': ['Informe técnico final con bitácora de depuración', 'Demostración pública del prototipo'],
                'semanaSugeridaModulo1': [16, 17, 18],
                'semanaSugeridaModulo2': [16, 17, 18],
                'criteriosEvaluacionMEP': [
                    'Demuestra la funcionalidad del prototipo resolviendo el reto inicial planteado.',
                    'Comunica los resultados con claridad técnica, fundamentación y vocabulario preciso.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Preparación del stand de demostración y criterios de la rúbrica sumativa.',
                    'desarrollo': 'Exhibición y demostración en vivo ante jurado/compañeros y ronda de preguntas.',
                    'cierre': 'Sistematización de aprendizajes y entrega final de calificaciones formativas y sumativas.'
                }
            }
        ]
    },
    {
        'moduloId': 2,
        'tituloProyecto': 'Solución Digital Comunitaria: Base de Datos, Modelado 3D y Campaña de Ciberseguridad',
        'problemaContextual': 'Las organizaciones comunales y colegios requieren sistematizar inventarios, diseñar piezas ergonómicas y educar a los jóvenes en ciudadanía digital y ética IA.',
        'fases': [
            {
                'id': 'fase1_investigacion',
                'numero': 1,
                'nombre': 'Fase I: Diagnóstico e Instrumentación Digital',
                'descripcion': 'Diseño de encuestas en línea, optimización de sistemas operativos y levantamiento de requerimientos.',
                'etapas': ['etapa1_empatizar', 'etapa2_definir'],
                'evidenciasEsperadas': ['Formulario digital con análisis estadístico', 'Esquema de requerimientos de la base de datos']
            },
            {
                'id': 'fase2_desarrollo',
                'numero': 2,
                'nombre': 'Fase II: Modelado Relacional, Diseño 3D y Co-creación con IA',
                'descripcion': 'Creación de tablas relacionales en SQL, modelado paramétrico 3D y generación de contenidos con prompts estructurados.',
                'etapas': ['etapa3_idear', 'etapa4_prototipar'],
                'evidenciasEsperadas': ['Base de datos relacional operativa con consultas', 'Modelo 3D en formato .STL y campaña multimedia']
            },
            {
                'id': 'fase3_evaluacion',
                'numero': 3,
                'nombre': 'Fase III: Auditoría Ética, Ciberseguridad y Demostración',
                'descripcion': 'Revisión de licencias Creative Commons, verificación APA 7, análisis de riesgos en línea y exposición final.',
                'etapas': ['etapa5_evaluar_testear'],
                'evidenciasEsperadas': ['Portafolio auditado con citas APA 7 y licencias CC', 'Sustentación comunitaria de la solución']
            }
        ],
        'etapas': [
            {
                'id': 'etapa1_empatizar',
                'numero': 1,
                'nombre': 'Etapa 1: Empatizar',
                'faseId': 'fase1_investigacion',
                'faseNombre': 'Fase I: Diagnóstico e Instrumentación',
                'proposito': 'Diseñar y aplicar encuestas digitales estructuradas para conocer necesidades de gestión y riesgos digitales.',
                'accionesClave': [
                    'Crear formularios en Microsoft Forms / Google Forms con validación de respuestas.',
                    'Aplicar la encuesta a una muestra representativa de estudiantes y docentes.'
                ],
                'entregablesSugeridos': ['Formulario digital publicado con código QR', 'Informe estadístico de respuestas'],
                'semanaSugeridaModulo1': [3, 4],
                'semanaSugeridaModulo2': [3, 4],
                'criteriosEvaluacionMEP': [
                    'Formula preguntas claras, pertinentes y sin sesgo metodológico.',
                    'Aplica buenas prácticas de privacidad y consentimiento informado.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Análisis de metodologías de muestreo y diseño de preguntas.',
                    'desarrollo': 'Configuración técnica del formulario con lógica de salto condicional.',
                    'cierre': 'Recolección piloto y validación de gráficos estadísticos.'
                }
            },
            {
                'id': 'etapa2_definir',
                'numero': 2,
                'nombre': 'Etapa 2: Definir',
                'faseId': 'fase1_investigacion',
                'faseNombre': 'Fase I: Diagnóstico e Instrumentación',
                'proposito': 'Definir la arquitectura de red y el modelo entidad-relación para la solución de datos.',
                'accionesClave': [
                    'Identificar entidades, atributos y relaciones clave para la base de datos.',
                    'Diseñar el esquema de red local que soportará el intercambio seguro de datos.'
                ],
                'entregablesSugeridos': ['Diagrama Entidad-Relación (DER)', 'Topología de red LAN simulada'],
                'semanaSugeridaModulo1': [5, 6],
                'semanaSugeridaModulo2': [5, 6],
                'criteriosEvaluacionMEP': [
                    'Estructura entidades y claves primarias/foráneas con integridad referencial.',
                    'Configura direccionamiento IP y protocolos de red adecuados.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Análisis de diagramas de red y esquemas de bases de datos.',
                    'desarrollo': 'Modelado del DER en papel o Draw.io y simulación de red en Packet Tracer.',
                    'cierre': 'Revisión cruzada para eliminar redundancias.'
                }
            },
            {
                'id': 'etapa3_idear',
                'numero': 3,
                'nombre': 'Etapa 3: Idear',
                'faseId': 'fase2_desarrollo',
                'faseNombre': 'Fase II: Modelado y Co-creación',
                'proposito': 'Diseñar bocetos paramétricos para el modelado 3D y estructurar prompts avanzados para contenidos educativos.',
                'accionesClave': [
                    'Dibujar bocetos 3D en papel isométrico acotando medidas exactas en milímetros.',
                    'Redactar prompts con técnica R-C-T-R para asistir en redacción técnica.'
                ],
                'entregablesSugeridos': ['Bocetos acotados en vistas ortogonales', 'Guía de prompts y fact-checking'],
                'semanaSugeridaModulo1': [8, 9],
                'semanaSugeridaModulo2': [8, 9],
                'criteriosEvaluacionMEP': [
                    'Aplica técnicas de ingeniería de prompts con sentido crítico y verificación.',
                    'Demuestra visión espacial y precisión matemática en los bocetos 3D.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Exploración de interfaces 3D y ejemplos de prompts efectivos.',
                    'desarrollo': 'Modelado preliminar y contraste de datos generados por IA.',
                    'cierre': 'Consolidación de la matriz de verificación de fuentes.'
                }
            },
            {
                'id': 'etapa4_prototipar',
                'numero': 4,
                'nombre': 'Etapa 4: Prototipar',
                'faseId': 'fase2_desarrollo',
                'faseNombre': 'Fase II: Modelado y Co-creación',
                'proposito': 'Implementar la base de datos relacional, modelar la pieza 3D definitiva y compilar el contenido multimedia.',
                'accionesClave': [
                    'Crear las tablas en DB Browser / MS Access y programar consultas SQL.',
                    'Modelar la pieza 3D en Tinkercad exportando archivo .STL para manufactura.',
                    'Producir la campaña de ciberseguridad con recursos multimedia.'
                ],
                'entregablesSugeridos': ['Archivo de Base de Datos relacional (.db)', 'Archivo 3D (.stl) y recursos gráficos'],
                'semanaSugeridaModulo1': [11, 12, 13, 14],
                'semanaSugeridaModulo2': [11, 12, 13, 14],
                'criteriosEvaluacionMEP': [
                    'Crea tablas relacionadas funcionales y ejecuta consultas precisas.',
                    'Aplica funciones booleanas (unión/hueco) en el modelado 3D.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Demostración de consultas SQL y operaciones booleanas 3D avanzadas.',
                    'desarrollo': 'Laboratorio intensivo de bases de datos y diseño espacial.',
                    'cierre': 'Inspección de integridad de datos y verificación dimensional de piezas.'
                }
            },
            {
                'id': 'etapa5_evaluar_testear',
                'numero': 5,
                'nombre': 'Etapa 5: Evaluar y Testear',
                'faseId': 'fase3_evaluacion',
                'faseNombre': 'Fase III: Auditoría y Demostración',
                'proposito': 'Auditar el cumplimiento de derechos de autor (APA 7 / Creative Commons), evaluar riesgos éticos de la IA y exponer la solución.',
                'accionesClave': [
                    'Revisar la tabla de citas y atribuciones garantizando el uso legal de recursos.',
                    'Participar en el debate sobre sesgos y desafíos éticos de la IA.',
                    'Presentar la solución completa en la Demostración de lo Aprendido.'
                ],
                'entregablesSugeridos': ['Portafolio digital integral con auditoría ética', 'Sustentación de la solución ante la comunidad'],
                'semanaSugeridaModulo1': [16, 17, 18],
                'semanaSugeridaModulo2': [16, 17, 18],
                'criteriosEvaluacionMEP': [
                    'Aplica rigurosamente la normativa APA 7 y el licenciamiento Creative Commons.',
                    'Argumenta con solvencia sobre los desafíos éticos de la tecnología.'
                ],
                'actividadEnriquecida': {
                    'inicio': 'Focalización: Pautas de la rúbrica de sustentación y auditoría de propiedad intelectual.',
                    'desarrollo': 'Exposición oral de proyectos y demostración práctica de la base de datos y modelo 3D.',
                    'cierre': 'Retroalimentación formativa y consolidación de calificaciones finales.'
                }
            }
        ]
    }
]

proyecto_content = "// Catálogo del Proyecto Curricular por Fases y Etapas (MEP 2026 - Noveno Año)\nimport { ProyectoSemestral } from '../types';\n\nexport const PROYECTOS_SEMESTRALES_NOVENO: ProyectoSemestral[] = " + json.dumps(proyecto_semestres, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/proyectoFasesEtapasData.ts', 'w', encoding='utf-8') as f:
    f.write(proyecto_content)

print('2. src/data/proyectoFasesEtapasData.ts generated!')

# 3. SABERES PROCEDIMENTALES Y ACTITUDINALES
saberes_procedimentales = [
    {'id': 'reconoce_patrones', 'nombre': 'Reconoce patrones', 'observable': 'Predice a partir de las regularidades, similitudes o características comunes de un conjunto de datos o situaciones, patrones que pueda aplicar en la solución a un problema o situación.'},
    {'id': 'abstrae', 'nombre': 'Abstrae', 'observable': 'Concluye cuáles son las características relevantes que debe considerar y cuáles debe omitir, al resolver un problema o situación.'},
    {'id': 'generaliza', 'nombre': 'Generaliza', 'observable': 'Generaliza las funcionalidades o estructuras generales de un elemento que pueda aprovechar en otros contextos al resolver un problema o situación.'},
    {'id': 'transfiere', 'nombre': 'Transfiere', 'observable': 'Transfiere conocimientos, habilidades y estrategias aprendidas previamente en un contexto específico, a situaciones diferentes y nuevas al resolver un problema o situación.'},
    {'id': 'modulariza', 'nombre': 'Modulariza', 'observable': 'Resuelve un problema por partes menos complejas, sin perder de vista el todo que las origina, al resolver un problema o situación.'},
    {'id': 'formula_algoritmos', 'nombre': 'Formula algoritmos', 'observable': 'Formula algoritmos por medio de una secuencia ordenada y detallada de pasos para resolver un problema o situación.'},
    {'id': 'remezcla', 'nombre': 'Remezcla', 'observable': 'Combina diferentes ideas, técnicas o soluciones existentes, con la autorización correspondiente, de manera innovadora y creativa para resolver un problema o situación.'},
    {'id': 'depura', 'nombre': 'Depura', 'observable': 'Valida el funcionamiento de los algoritmos en busca de errores para corregirlos al resolver un problema o situación.'},
    {'id': 'programa', 'nombre': 'Programa', 'observable': 'Programa mediante un entorno o IDE de programación para resolver un problema o situación.'},
    {'id': 'comunica', 'nombre': 'Comunica', 'observable': 'Comunica ideas o soluciones a problemas o situaciones de manera creativa, coherente y comprensible, compartiendo conocimientos con otros al resolver un problema o situación.'},
    {'id': 'colabora', 'nombre': 'Colabora', 'observable': 'Demuestra un trato constructivo y respetuoso para resolver un problema o situación específica, al trabajar con otros y así apoyar su aprendizaje y contribuir al de los demás.'},
    {'id': 'creativo', 'nombre': 'Piensa de forma creativa', 'observable': 'Desarrolla soluciones ingeniosas, innovadoras, originales con enfoques no convencionales, al resolver un problema o situación.'},
    {'id': 'etica_seguridad', 'nombre': 'Maneja las tecnologías de forma ética y segura', 'observable': 'Aplica de manera consciente fundamentos de ética y seguridad digital al utilizar herramientas y recursos tecnológicos al resolver un problema o situación.'}
]

saberes_actitudinales = [
    {'id': 'precision', 'nombre': 'Gusto por la precisión', 'observable': 'Demuestra ante los procesos de aprendizaje un comportamiento hacia la búsqueda de la exactitud, al ser minucioso con los detalles.'},
    {'id': 'aprender_error', 'nombre': 'Aprender del error', 'observable': 'Demuestra ante los errores un comportamiento que le permita ganar experiencia a partir de lecciones aprendidas producto de los errores, convirtiendo los desaciertos en oportunidades de aprendizaje.'},
    {'id': 'flexibilidad', 'nombre': 'Flexibilidad para manejar problemas', 'observable': 'Demuestra un comportamiento hacia la adaptabilidad, flexibilidad y resiliencia ante los desafíos o situaciones imprevistas producto del entorno, la interacción con otros, o bien, con los recursos.'},
    {'id': 'tolerancia_frustracion', 'nombre': 'Tolerancia a la frustración', 'observable': 'Demuestra ante los desafíos, un comportamiento hacia la búsqueda de la autoconfianza, motivación, autocontrol, paciencia y persistencia.'}
]

content_pc = "// Saberes Procedimentales y Actitudinales Oficiales MEP 2026\nimport { SaberProcedimental, SaberActitudinal } from '../types';\n\nexport const SABERES_PROCEDIMENTALES_NOVENO: SaberProcedimental[] = " + json.dumps(saberes_procedimentales, indent=2, ensure_ascii=False) + ";\n\nexport const SABERES_ACTITUDINALES_NOVENO: SaberActitudinal[] = " + json.dumps(saberes_actitudinales, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/saberesPensamientoCompData.ts', 'w', encoding='utf-8') as f:
    f.write(content_pc)

print('3. src/data/saberesPensamientoCompData.ts generated!')

# 4. SISTEMATIZACIÓN Y EQUIPO NOVENO
equipo_noveno_data = {
    'nivel': 'Noveno Año (9°)',
    'coordinador': 'Kevin Sánchez Bogarín',
    'disenadores': ['Allan M.', 'Alberto Bustos Ortega'],
    'cronograma': [
        {'actividad': '1. Contextualización de las tareas', 'fecha': '11 de setiembre 10:00 - 12:00 md', 'responsables': 'Leonardo', 'estado': 'Completado'},
        {'actividad': '2. Estudio de los módulos y recursos', 'fecha': '11 de setiembre 1:00 - 3:00 pm', 'responsables': 'Todos los equipos', 'estado': 'Completado'},
        {'actividad': '3. Capacitación en la herramienta PIA', 'fecha': '16 de setiembre 8:00 - 3:00 pm', 'responsables': 'Kevin, Mariana', 'estado': 'Completado'},
        {'actividad': '4. Diseño del planeamiento (Módulo 1)', 'fecha': '17 setiembre al 15 octubre', 'responsables': 'Allan M, Alberto', 'estado': 'En Proceso'},
        {'actividad': '5. Primer corte valorativo y realimentación', 'fecha': '16 de octubre', 'responsables': 'Kevin (Coordina)', 'estado': 'Pendiente'},
        {'actividad': '6. Ajustes a los productos y diseño de recursos', 'fecha': '19 octubre al 19 noviembre', 'responsables': 'Allan M, Alberto', 'estado': 'Pendiente'},
        {'actividad': '8. Segundo corte valorativo y realimentación', 'fecha': '20 de noviembre', 'responsables': 'Kevin (Coordina)', 'estado': 'Pendiente'},
        {'actividad': '9. Ajustes finales y marca gráfica MEP', 'fecha': '23 noviembre al 4 diciembre', 'responsables': 'Allan M, Alberto', 'estado': 'Pendiente'},
        {'actividad': '10. Entrega de planes finales a jefatura Ana Lucía', 'fecha': '4 de diciembre', 'responsables': 'Todos los equipos', 'estado': 'Pendiente'}
    ]
}

content_equipo = "// Equipo y Cronograma Oficial de Diseño Curricular - Noveno Año 2026\nexport const EQUIPO_NOVENO_INFO = " + json.dumps(equipo_noveno_data, indent=2, ensure_ascii=False) + ";\n"

with open('src/data/sistematizacionData.ts', 'w', encoding='utf-8') as f:
    f.write(content_equipo)

print('4. src/data/sistematizacionData.ts generated!')
print('ALL 4 DATASETS SUCCESSFULLY BUILT!')
