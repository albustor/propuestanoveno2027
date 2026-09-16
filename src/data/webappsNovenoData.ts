import { WebAppRecurso } from '../types';

export const WEBAPPS_NOVENO_CATALOGO: Record<string, WebAppRecurso[]> = {
  // ==========================================
  // MÓDULO 1: INDICADORES 1 A 10
  // ==========================================

  // 1. Movimiento en mecanismos
  movimiento_mecanismos: [
    {
      id: 'gear_gen_01',
      titulo: 'Gear Generator (Simulador de Trenes de Engranajes)',
      url: 'https://geargenerator.com/',
      descripcion: 'Simulador 2D en tiempo real para calcular relación de transmisión, RPM, número de dientes y torque en mecanismos.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'phet_forces_01',
      titulo: 'PhET Interactive Simulations - Palancas y Cinemática',
      url: 'https://phet.colorado.edu/es/simulations/balancing-act',
      descripcion: 'Laboratorio interactivo para verificar equilibrio de torques y brazos de palanca con retroalimentación visual.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: true,
    },
    {
      id: 'quiz_mecanismos_01',
      titulo: 'Cuestionario Interactivo: Cinemática y Mecanismos MEP',
      url: 'https://quizizz.com/join?gc=mep-noveno-mecanismos',
      descripcion: 'Evaluación formativa de cierre sobre cálculo de relación de transmisión (fuerza vs. velocidad).',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 2. Procesamiento de datos con microcontrolador
  procesamiento_microcontrolador: [
    {
      id: 'wokwi_arduino_01',
      titulo: 'Wokwi Simulator (Arduino UNO & C++)',
      url: 'https://wokwi.com/projects/new/arduino-uno',
      descripcion: 'Simulador completo de microcontrolador en el navegador sin instalar software; permite conectar puertos digitales y analógicos.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'tinkercad_circuits_01',
      titulo: 'Tinkercad Circuits (Laboratorio Virtual)',
      url: 'https://www.tinkercad.com/circuits',
      descripcion: 'Entorno de esquemáticos y programación por bloques o texto para microcontroladores y electrónica básica.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'rubrica_micro_cierre',
      titulo: 'Bitácora Digital de Depuración y Comprobación I/O',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSc-micro-cierre/viewform',
      descripcion: 'Instrumento de coevaluación y verificación de lectura de entradas digitales y salidas de control.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 3. Actuadores electromecánicos
  actuadores_electromecanicos: [
    {
      id: 'wokwi_servo_stepper',
      titulo: 'Wokwi Servomotor & Stepper Motor Lab',
      url: 'https://wokwi.com/projects/335431671992025684',
      descripcion: 'Simulación de control de ángulo en servomotores con señales PWM y posicionamiento angular preciso.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'falstad_circuit_pwm',
      titulo: 'Falstad Circuit Simulator (Señales PWM y Drivers H)',
      url: 'https://www.falstad.com/circuit/',
      descripcion: 'Visualizador de formas de onda de ciclo de trabajo PWM y corrientes en transistores y puentes H.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: true,
    },
    {
      id: 'cierre_actuadores_rubrica',
      titulo: 'Diana de Autoevaluación en Control de Actuadores',
      url: 'https://mentimeter.com/app',
      descripcion: 'Reflexión y sondeo interactivo en tiempo real sobre seguridad eléctrica y protección de cargas inductivas.',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 4. Variables y operadores lógicos
  variables_operadores_logicos: [
    {
      id: 'pseudocode_online_01',
      titulo: 'PSeInt Web / Pseudocode Online Studio',
      url: 'https://pseudocode.io/',
      descripcion: 'Editor y ejecutor de pseudocódigo en español para trazar tablas de variables, tipos de datos y operadores booleanos.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: true,
    },
    {
      id: 'logic_gate_sim',
      titulo: 'Logicly Online (Compuertas y Álgebra Booleana)',
      url: 'https://circuitverse.org/simulator',
      descripcion: 'Diseño visual interactivo de tablas de verdad con compuertas AND, OR, NOT para validar expresiones lógicas complejas.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'cierre_variables_kahoot',
      titulo: 'Kahoot! Desafío de Expresiones Booleanas',
      url: 'https://kahoot.it/',
      descripcion: 'Juego evaluativo de cierre para calcular el valor de verdad de expresiones compuestas.',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 5. Estructuras de control condicionales
  estructuras_control_condicionales: [
    {
      id: 'blockly_maze_cond',
      titulo: 'Blockly Games - Maze & Conditionals',
      url: 'https://blockly.games/maze',
      descripcion: 'Entorno lúdico de resolución de laberintos aplicando condiciones si / si-no (if-else) y operadores relacionales.',
      momentoAsociado: 'desarrollo',
      tipo: 'interactivo',
      esOffline: true,
    },
    {
      id: 'python_tutor_cond',
      titulo: 'Python Tutor (Visualizador de Flujo de Ejecución)',
      url: 'https://pythontutor.com/visualize.html',
      descripcion: 'Paso a paso visual de la memoria y ramificaciones condicionales para detectar bifurcaciones incorrectas.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'cierre_condicionales_peer',
      titulo: 'Rúbrica de Revisión de Casos Borde (Boundary Tests)',
      url: 'https://forms.office.com/',
      descripcion: 'Formulario de comprobación por pares para verificar que el código cubra todas las condiciones posibles.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 6. Estructuras cíclicas e iterativas
  estructuras_ciclicas_iterativas: [
    {
      id: 'makecode_loops',
      titulo: 'MakeCode Arcade (Mundo de Bucles y Contadores)',
      url: 'https://arcade.makecode.com/',
      descripcion: 'Desarrollo de videojuegos retro aplicando bucles Para (for), Mientras (while) y acumuladores numéricos.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: true,
    },
    {
      id: 'codeorg_loops_lab',
      titulo: 'Code.org Artist & Counter Loops Studio',
      url: 'https://studio.code.org/s/express-2024',
      descripcion: 'Plataforma para practicar patrones geométricos e iteraciones controladas por variables.',
      momentoAsociado: 'desarrollo',
      tipo: 'interactivo',
      esOffline: false,
    },
    {
      id: 'cierre_loops_matrix',
      titulo: 'Matriz de Análisis de Complejidad y Bucles Infinitos',
      url: 'https://padlet.com/',
      descripcion: 'Muro interactivo donde los estudiantes exponen cómo previnieron bucles infinitos en sus programas.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 7. Formulación algorítmica modular
  formulacion_algoritmica_modular: [
    {
      id: 'scratch_functions',
      titulo: 'Scratch 3.0 Web - Mis Bloques (Funciones y Modularización)',
      url: 'https://scratch.mit.edu/create',
      descripcion: 'Creación de módulos con paso de parámetros para descomponer problemas complejos en subrutinas limpias.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: true,
    },
    {
      id: 'diagrams_flowchart',
      titulo: 'Draw.io / Diagrams.net (Diagramación Modular)',
      url: 'https://app.diagrams.net/',
      descripcion: 'Herramienta de diagramas de flujo normalizados (ISO 5807) para representar módulos y llamadas a subprocesos.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: true,
    },
    {
      id: 'cierre_modular_checklist',
      titulo: 'Lista de Cotejo de Modularidad y Reutilización',
      url: 'https://docs.google.com/spreadsheets/',
      descripcion: 'Instrumento para evaluar independencia modular, nombres significativos y claridad de parámetros.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 8. Ciclo de vida del dato
  ciclo_vida_dato: [
    {
      id: 'looker_data_studio',
      titulo: 'Google Looker Studio (Visualización y Dashboard)',
      url: 'https://lookerstudio.google.com/',
      descripcion: 'Plataforma para cargar datasets escolares, limpiar registros duplicados y generar gráficos analíticos en tiempo real.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'rawgraphs_app',
      titulo: 'RAWGraphs WebApp (Mapeo Abierto de Datos)',
      url: 'https://app.rawgraphs.io/',
      descripcion: 'Transformación de datos tabulares (CSV/JSON) en representaciones visuales avanzadas sin necesidad de programar.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: true,
    },
    {
      id: 'cierre_datos_infografia',
      titulo: 'Galería Digital de Hallazgos y Análisis de Datos',
      url: 'https://canva.com/',
      descripcion: 'Presentación de cierre donde los estudiantes argumentan decisiones basadas en los datos depurados.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 9. Seguridad y privacidad del dato
  seguridad_privacidad_dato: [
    {
      id: 'haveibeenpwned_web',
      titulo: 'Have I Been Pwned & Password Strength Tester',
      url: 'https://haveibeenpwned.com/',
      descripcion: 'Verificador pedagógico de filtración de credenciales y cálculo de entropía de contraseñas seguras.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'eff_surveillance_self_defense',
      titulo: 'EFF Guía Interactiva de Privacidad Digital',
      url: 'https://ssd.eff.org/es',
      descripcion: 'Simulador de escenarios de riesgo, autenticación en dos pasos (2FA) y gestión de permisos en aplicaciones.',
      momentoAsociado: 'desarrollo',
      tipo: 'tutorial',
      esOffline: false,
    },
    {
      id: 'cierre_seguridad_quiz',
      titulo: 'Escape Room Digital de Ciberseguridad MEP',
      url: 'https://genially.com/',
      descripcion: 'Reto evaluativo gamificado de cierre para resolver incidentes de phishing y privacidad de información escolar.',
      momentoAsociado: 'cierre',
      tipo: 'interactivo',
      esOffline: false,
    }
  ],

  // 10. Ética en el tratamiento de datos
  etica_tratamiento_datos: [
    {
      id: 'moral_machine_mit',
      titulo: 'MIT Moral Machine (Dilemas Éticos en IA y Algoritmos)',
      url: 'https://www.moralmachine.net/',
      descripcion: 'Plataforma para explorar decisiones morales que enfrentan las máquinas inteligentes y sesgos en datos.',
      momentoAsociado: 'desarrollo',
      tipo: 'interactivo',
      esOffline: false,
    },
    {
      id: 'prodhab_cr_portal',
      titulo: 'Portal PRODHAB Costa Rica (Ley N° 8968 Datos Personales)',
      url: 'https://prodhab.go.cr/',
      descripcion: 'Recurso oficial costarricense sobre derechos ARCO (Acceso, Rectificación, Cancelación y Oposición) y privacidad.',
      momentoAsociado: 'desarrollo',
      tipo: 'tutorial',
      esOffline: false,
    },
    {
      id: 'cierre_etica_padlet',
      titulo: 'Mural de Compromiso Ético y Huella Digital Responsable',
      url: 'https://padlet.com/',
      descripcion: 'Consolidación de compromisos éticos del estudiantado para el uso de tecnologías en su comunidad.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // ==========================================
  // MÓDULO 2: INDICADORES 11 A 20
  // ==========================================

  // 11. Sensores avanzados y telemetría
  sensores_avanzados_telemetria: [
    {
      id: 'wokwi_esp32_dht22',
      titulo: 'Wokwi ESP32 + DHT22 Temperature & Humidity Telemetry',
      url: 'https://wokwi.com/projects/new/esp32',
      descripcion: 'Simulación de lectura y calibración de variables ambientales con microcontrolador WiFi y sensor digital.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'adafruit_io_dashboard',
      titulo: 'Adafruit IO Cloud Telemetry Monitor',
      url: 'https://io.adafruit.com/',
      descripcion: 'Plataforma IoT en la nube para graficar feeds de telemetría y configurar disparadores de alerta automáticos.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'cierre_telemetria_rubrica',
      titulo: 'Validación de Curva de Calibración y Error de Medición',
      url: 'https://docs.google.com/forms/',
      descripcion: 'Comprobación de cierre sobre rangos de tolerancia, muestreo y precisión de los sensores aplicados.',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 12. Sistemas robóticos autónomos
  sistemas_roboticos_autonomos: [
    {
      id: 'vex_vr_robotics',
      titulo: 'VEXcode VR (Simulador de Robot Autónomo 3D)',
      url: 'https://vr.vex.com/',
      descripcion: 'Robot virtual con sensor de distancia, giroscopio y cámara de piso para programar algoritmos de evasión y navegación.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: true,
    },
    {
      id: 'open_roberta_lab',
      titulo: 'Open Roberta Lab (Fraunhofer Autonomous Systems)',
      url: 'https://lab.open-roberta.org/',
      descripcion: 'Laboratorio en línea con robots móviles (EV3, Micro:bit, Arduino) para resolver laberintos autónomos.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'cierre_autonomo_coeval',
      titulo: 'Bitácora de Coevaluación: Máquina de Estados Finitos',
      url: 'https://classroom.google.com/',
      descripcion: 'Evaluación de robustez del algoritmo ante obstáculos imprevistos y transiciones de estado del robot.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 13. Diseño y modelado 3D de piezas
  diseno_modelado_3d: [
    {
      id: 'tinkercad_3d_editor',
      titulo: 'Autodesk Tinkercad 3D Design',
      url: 'https://www.tinkercad.com/3d-design',
      descripcion: 'Modelador 3D para construir chasis, soportes de servomotores y uniones paramétricas para impresión 3D.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: false,
    },
    {
      id: 'sweethome_3d_web',
      titulo: 'Sweet Home 3D Online (Espacios Arquitectónicos)',
      url: 'http://www.sweethome3d.com/SweetHome3DJSOnline.jsp',
      descripcion: 'Diseño en planta y 3D de habitaciones para planificar la ubicación de sensores domóticos.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: false,
    },
    {
      id: 'cierre_3d_viewer',
      titulo: 'Visor 3D Web & Verificador de Tolerancias STL',
      url: 'https://www.viewstl.com/',
      descripcion: 'Inspección de cierre del archivo exportado para comprobar dimensiones milimétricas antes del ensamble físico.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: true,
    }
  ],

  // 14. Programación de interfaces visuales GUI
  programacion_interfaces_gui: [
    {
      id: 'mit_app_inventor',
      titulo: 'MIT App Inventor (Desarrollo de Apps Móviles GUI)',
      url: 'https://appinventor.mit.edu/',
      descripcion: 'Construcción de interfaces móviles con botones, indicadores gráficos y comunicación Bluetooth con microcontroladores.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: false,
    },
    {
      id: 'figma_education',
      titulo: 'Figma Educación (Wireframes & UX/UI)',
      url: 'https://www.figma.com/education/',
      descripcion: 'Diseño de arquitectura de información, accesibilidad del color y prototipos de alta fidelidad para el panel de control.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'cierre_gui_usabilidad',
      titulo: 'Test de Usabilidad y Criterios Heurísticos Nielsen',
      url: 'https://forms.google.com/',
      descripcion: 'Encuesta de cierre para evaluar si la interfaz es intuitiva y accesible para los usuarios destinatarios.',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 15. Estructuras de datos colecciones
  estructuras_datos_colecciones: [
    {
      id: 'visualgo_arrays_lists',
      titulo: 'VisuAlgo (Visualización Interactiva de Arreglos y Listas)',
      url: 'https://visualgo.net/en/list',
      descripcion: 'Animaciones interactivas paso a paso para inserción, búsqueda, ordenamiento y eliminación en listas.',
      momentoAsociado: 'desarrollo',
      tipo: 'interactivo',
      esOffline: false,
    },
    {
      id: 'replit_python_collections',
      titulo: 'Replit IDE - Colecciones y Arreglos Indexados',
      url: 'https://replit.com/',
      descripcion: 'Entorno de codificación colaborativo para procesar listas de lecturas de sensores y cálculos de medias aritméticas.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: false,
    },
    {
      id: 'cierre_colecciones_test',
      titulo: 'Desafío de Rastreo de Índices y Recorridos (For-Each)',
      url: 'https://quizlet.com/',
      descripcion: 'Autoevaluación de cierre para diagnosticar errores comunes de desbordamiento de índice (Out of bounds).',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 16. Bases de datos y persistencia
  bases_datos_persistencia: [
    {
      id: 'sqlite_online_ide',
      titulo: 'SQLite Online Studio (Gestor SQL en Navegador)',
      url: 'https://sqliteonline.com/',
      descripcion: 'Creación de tablas relacionales, llaves primarias, inserción de registros históricos y consultas SELECT con filtros WHERE.',
      momentoAsociado: 'desarrollo',
      tipo: 'editor',
      esOffline: false,
    },
    {
      id: 'db_fiddle_sql',
      titulo: 'DB-Fiddle SQL Playground',
      url: 'https://www.db-fiddle.com/',
      descripcion: 'Entorno liviano para ensayar scripts SQL de modelado entidad-relación y consultas con funciones de agregación.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'cierre_db_integridad',
      titulo: 'Rúbrica de Integridad Referencial y Buenas Prácticas SQL',
      url: 'https://docs.google.com/document/',
      descripcion: 'Instrumento de coevaluación para validar que no existan inconsistencias de tipos ni datos redundantes.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 17. Conectividad IoT y protocolos
  conectividad_iot_protocolos: [
    {
      id: 'hivemq_mqtt_websocket',
      titulo: 'HiveMQ MQTT Web Client (Publicador y Suscriptor)',
      url: 'http://www.hivemq.com/demos/websocket-client/',
      descripcion: 'Cliente MQTT en vivo para publicar mensajes en tópicos (`mep/colegio/aula9/temp`) y recibir payloads en tiempo real.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'nodered_iot_simulator',
      titulo: 'Node-RED Flow Playground (Flujos IoT)',
      url: 'https://nodered.org/',
      descripcion: 'Orquestación de flujos de datos entre sensores, actuadores y servicios web mediante nodos visuales.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'cierre_iot_topology',
      titulo: 'Mapa de Arquitectura IoT y Topología de Red',
      url: 'https://lucid.app/',
      descripcion: 'Socialización grupal de diagramas de red identificando broker, clientes, protocolos y seguridad en el transporte.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 18. Ciberseguridad y redes locales
  ciberseguridad_redes_locales: [
    {
      id: 'cisco_skills_packet_tracer',
      titulo: 'Cisco Packet Tracer Web & Networking Hub',
      url: 'https://skillsforall.com/',
      descripcion: 'Simulación de redes LAN, asignación de direccionamiento IPv4, máscaras de subred y configuración de firewall.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'cryptool_online',
      titulo: 'CrypTool Online (Criptografía y Cifrado)',
      url: 'https://www.cryptool.org/en/cto/',
      descripcion: 'Laboratorio didáctico para experimentar con cifrado simétrico (AES), asimétrico (RSA) y funciones hash (SHA-256).',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: true,
    },
    {
      id: 'cierre_seguridad_auditoria',
      titulo: 'Lista de Chequeo: Auditoría de Seguridad en Dispositivos IoT',
      url: 'https://docs.google.com/forms/',
      descripcion: 'Evaluación formativa para verificar cambio de contraseñas por defecto, cifrado HTTPS/TLS y cierre de puertos vulnerables.',
      momentoAsociado: 'cierre',
      tipo: 'cuestionario',
      esOffline: false,
    }
  ],

  // 19. Inteligencia Artificial y Visión Computacional
  inteligencia_artificial_vision: [
    {
      id: 'teachable_machine_google',
      titulo: 'Teachable Machine by Google (Entrenamiento de Modelos)',
      url: 'https://teachablemachine.withgoogle.com/',
      descripcion: 'Entrenamiento rápido de redes neuronales con cámara web para clasificar objetos, gestos o sonidos con exportación a código.',
      momentoAsociado: 'desarrollo',
      tipo: 'simulador',
      esOffline: false,
    },
    {
      id: 'quick_draw_ai',
      titulo: 'Quick, Draw! (Dataset Abierto de Visión Artificial)',
      url: 'https://quickdraw.withgoogle.com/',
      descripcion: 'Juego interactivo para entender cómo una red convolucional reconoce trazos y patrones visuales humanos.',
      momentoAsociado: 'desarrollo',
      tipo: 'interactivo',
      esOffline: false,
    },
    {
      id: 'cierre_ia_matriz_confusion',
      titulo: 'Matriz de Confusión y Análisis de Falsos Positivos',
      url: 'https://jamboard.google.com/',
      descripcion: 'Plenaria de cierre analizando la precisión del modelo entrenado y cómo mitigar sesgos de datos de entrenamiento.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ],

  // 20. Impacto social y sostenible de la tecnología
  impacto_social_sostenibilidad: [
    {
      id: 'un_sdgs_tracker',
      titulo: 'UN Sustainable Development Goals (ODS 2030)',
      url: 'https://sdgs.un.org/goals',
      descripcion: 'Catálogo de metas globales para vincular el prototipo tecnológico con la sostenibilidad ecológica y social.',
      momentoAsociado: 'desarrollo',
      tipo: 'tutorial',
      esOffline: false,
    },
    {
      id: 'circulab_circular_design',
      titulo: 'Circular Design Guide (Análisis de Ciclo de Vida e-Waste)',
      url: 'https://www.circulardesignguide.com/',
      descripcion: 'Metodología de ecodiseño para evaluar la reparabilidad, reciclaje y eficiencia energética del producto tecnológico.',
      momentoAsociado: 'desarrollo',
      tipo: 'herramienta',
      esOffline: false,
    },
    {
      id: 'cierre_pitch_impacto',
      titulo: 'Matriz de Evaluación de Impacto Comunitario y Pitch Final',
      url: 'https://padlet.com/',
      descripcion: 'Defensa y socialización final del impacto del proyecto en la calidad de vida y el desarrollo sostenible local.',
      momentoAsociado: 'cierre',
      tipo: 'herramienta',
      esOffline: false,
    }
  ]
};
