// Catálogo Curricular Oficial - Formación Tecnológica 9° Año (MEP 2026)
import { ModuloCurricular } from '../types';

export const MODULOS_NOVENO_OFICIAL: ModuloCurricular[] = [
  {
    "id": 1,
    "nombre": "Módulo 1: Computación Física, Robótica y Algoritmos para la Solución de Problemas",
    "periodo": "I Semestre / I Periodo (9° Año)",
    "descripcion": "Desarrollo de competencias en computación física, robótica, formulación algorítmica y gestión responsable del dato. El estudiantado diseña prototipos automatizados mediante microcontroladores, sensores y actuadores con aplicación en domótica y retos comunitarios.",
    "entrelazamientoAreas": "En el Módulo 1, el área de Computación Física y Robótica se entrelaza de forma directa y bidireccional con Algoritmos y Programación: los sensores capturan variables del entorno físico escolar o comunitario que alimentan las estructuras condicionales y de control en el código, el cual procesa las señales lógicas y comanda los actuadores y mecanismos mecánicos para generar respuestas automatizadas y domóticas. A su vez, el área de Ciencia de Datos aporta el principio de confiabilidad y trazabilidad en la captura de mediciones y telemetría de los dispositivos IoT.",
    "ejeProyectoSemestral": "Diseño y Construcción de un Prototipo Domótico o Sistema Automatizado Comunitario",
    "ejeCiclo": "Diseño, Programación y Prototipado de Soluciones Tecnológicas Automatizadas con Microcontroladores y Pensamiento Computacional para el Desarrollo Comunitario (III Ciclo).",
    "perfilSalidaCiclo": [
      "Formula algoritmos modulares y estructurados para resolver problemas técnicos del entorno.",
      "Construye prototipos físicos funcionales que integran sensores, microcontroladores y actuadores mecánicos.",
      "Aplica depuración sistemática de errores y prácticas computacionales con actitud resiliente.",
      "Gestiona datos de entrada y salida con criterios de exactitud y responsabilidad ética."
    ],
    "areas": [
      {
        "id": "robotica_m1",
        "nombre": "Computación Física y Robótica",
        "competenciaArea": "Desarrolla prototipos automatizados y sistemas robóticos integrando hardware programable, sensores, actuadores y cinemática mecánica para resolver problemas contextualizados.",
        "rdaCiclo": "Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema (RdA de III Ciclo: 7°, 8°, 9°).",
        "rda": "Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.",
        "color": "from-sky-600 to-blue-700",
        "icono": "Cpu",
        "saberes": [
          {
            "id": "movimiento_mecanismos",
            "nombre": "Movimiento en mecanismos",
            "indicador": "Identificar el movimiento en mecanismos robóticos, diferenciando el movimiento de entrada y salida, a partir de la observación y análisis de simulaciones o prototipos básicos que integren sensores y actuadores.",
            "descripcion": "Análisis cinemático de engranajes, poleas, bielas y cálculo de relación de transmisión (torque vs. velocidad).",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Observación de videos de transmisiones mecánicas (brazos robóticos, bicicletas). Pregunta: ¿Cómo transforma un engranaje pequeño la velocidad en fuerza?",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Ensamble y simulación de trenes de engranajes y poleas con cálculo de relación de transmisión (fuerza vs. velocidad) acoplados a un motor.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Puesta en común, contrastación de la ganancia de torque y evaluación formativa con lista de cotejo cinemática.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Tinkercad Circuits/Mecanismos",
                  "Simulador PhET Gears",
                  "Kits de engranajes y poleas"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "microcontrolador",
            "nombre": "Microcontrolador",
            "indicador": "Aplicar las funciones de un microcontrolador, utilizando pines digitales y analógicos, conexión a VCC y GND y comunicación con sensores y actuadores durante la simulación o construcción de prototipos.",
            "descripcion": "Arquitectura de placas (Arduino / Micro:bit / ESP32), mapeo de pines I/O, alimentación y señales PWM.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Comparación del microcontrolador con el cerebro humano (procesamiento de impulsos y control de actuadores).",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Cableado seguro en protoboard distinguiendo pines digitales (0/1), analógicos (0-1023) y rieles 5V/GND, probando lecturas en monitor serial.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Lectura del monitor serial en vivo, comprobación de ausencia de cortocircuitos y registro en bitácora técnica.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Arduino IDE / MakeCode",
                  "Placas Arduino / Micro:bit",
                  "Protoboard y cables Dupont"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "sensor",
            "nombre": "Sensor",
            "indicador": "Integrar un sensor en un prototipo, utilizando sus datos como entrada para generar respuestas automatizadas mediante un microcontrolador.",
            "descripcion": "Lectura y calibración de variables físicas con ultrasonido HC-SR04, fotorresistencia LDR y sensor de temperatura.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Demostración de cómo un sensor ultrasónico o fotorresistencia detecta variaciones del entorno en tiempo real.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Programación de umbrales condicionales (if distancia < 20 cm) para activar respuestas automáticas en el microcontrolador.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Calibración empírica con cinta métrica y reflexión sobre factores ambientales que generan ruido en los datos.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Sensores HC-SR04, LDR, DHT11",
                  "Tinkercad Circuits",
                  "Serial Plotter"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "actuador",
            "nombre": "Actuador",
            "indicador": "Integrar un actuador en un prototipo, programando su activación como respuesta a entradas digitales o condiciones del sistema mediante un microcontrolador.",
            "descripcion": "Control angular de servomotores (0-180°), zumbadores piezoeléctricos y relevadores de potencia.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Demostración de barreras automáticas y timbres domóticos accionados por señales electrónicas.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Control de servomotores con señales PWM y zumbadores en respuesta directa a las lecturas del sensor.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Validación del movimiento suave sin forzar topes mecánicos y coevaluación entre parejas de trabajo.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Servomotores SG90",
                  "Buzzer piezoeléctrico",
                  "Librerías Servo.h"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "domotica",
            "nombre": "Domótica",
            "indicador": "Analizar los usos, aplicaciones y beneficios de la domótica, mediante la creación o simulación de un prototipo que responda a necesidades reales en un entorno cotidiano.",
            "descripcion": "Sistemas inteligentes para el hogar: ahorro de energía, confort, seguridad perimetral y accesibilidad universal.",
            "faseProyectoRecomendada": "fase1_investigacion",
            "etapaProyectoRecomendada": "etapa3_idear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Análisis de viviendas inteligentes y accesibles para adultos mayores o personas con discapacidad.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Elaboración del plano espacial y la matriz de causa-efecto domótica (ej. iluminación automática crepuscular + alarma de gas).",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Mini-pitch justificando la viabilidad y el beneficio social/ecológico del sistema domótico diseñado.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Planos a escala",
                  "Sweet Home 3D / Tinkercad",
                  "Materiales reciclables para maquetas"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "prototipos",
            "nombre": "Prototipos",
            "indicador": "Construir prototipos que integren sensores, actuadores y un microcontrolador, a partir de una necesidad identificada en su contexto.",
            "descripcion": "Integración completa de hardware, software y maqueta física en una solución funcional replicable.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Revisión de la lista de requisitos y criterios de éxito del prototipo domótico/robótico.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Montaje del circuito en la maqueta, carga del código unificado y ejecución de pruebas de estrés.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Dinámica cruzada de detección de bugs (Bug Hunting) y aplicación de la rúbrica de prototipos.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Kits de robótica completos",
                  "Estructuras de cartón o acrílico",
                  "Rúbrica oficial MEP"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "algoritmos_m1",
        "nombre": "Programación y Algoritmos",
        "competenciaArea": "Diseña, programa y optimiza algoritmos computacionales modulares con estructuras de control lógicas y variables para la solución sistemática de problemas.",
        "rdaCiclo": "Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones y librerías en el diseño de algoritmos para resolver problemas (RdA de III Ciclo: 7°, 8°, 9°).",
        "rda": "Integra conceptos de programación como eventos, operadores, estructuras de datos, estructuras de control, procedimientos, funciones y librerías en el diseño de algoritmos para resolver problemas.",
        "color": "from-indigo-600 to-violet-700",
        "icono": "Code",
        "saberes": [
          {
            "id": "entorno_programacion",
            "nombre": "Entorno de programación textual o bloques para mecanismos robóticos",
            "indicador": "Diseñar soluciones automatizadas en un entorno de programación textual o por bloques para programar mecanismos robóticos.",
            "descripcion": "Uso de IDEs visuales y textuales (MakeCode, Arduino IDE, Python) estructurando funciones y eventos.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Comparación entre lógica en bloques y código textual equivalente, analizando correspondencia de sintaxis.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Creación de funciones modulares con parámetros y estructuras de control selectivas/repetitivas.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Revisión de código entre pares evaluando legibilidad, indentación y comentarios.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Arduino IDE 2.0",
                  "MakeCode Arcade",
                  "Simulador Wokwi"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "algoritmo",
            "nombre": "Algoritmo",
            "indicador": "Diseñar un algoritmo para resolver un problema, representándolo de forma estructurada mediante pseudocódigo o diagrama de flujo.",
            "descripcion": "Lógica algorítmica formal con simbología normalizada de flujogramas y pruebas de escritorio en papel.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa3_idear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Reto desconectado de instrucciones precisas a un robot ciego para sortear obstáculos.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Diseño del diagrama de flujo estructurado y redacción de pseudocódigo con PSeInt o papel.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Validación paso a paso con tabla de variables comprobando la ausencia de bucles infinitos.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "PSeInt",
                  "Draw.io / Lucidchart",
                  "Plantillas de simbología ANSI"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "datos_m1",
        "nombre": "Ciencia de Datos e Inteligencia Artificial",
        "competenciaArea": "Gestiona y analiza información digital proveniente de dispositivos y sensores aplicando principios de confiabilidad, integridad y juicio ético.",
        "rdaCiclo": "Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas (RdA de III Ciclo: 7°, 8°, 9°).",
        "rda": "Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.",
        "color": "from-emerald-600 to-teal-700",
        "icono": "Database",
        "saberes": [
          {
            "id": "iot",
            "nombre": "Internet de las cosas (IoT)",
            "indicador": "Analizar el funcionamiento y aplicaciones del Internet de las cosas (IoT), mediante la simulación de sistemas que integren sensores y actuadores para la automatización de tareas en contextos cotidianos.",
            "descripcion": "Conectividad en red de objetos físicos: telemetría en la nube, dashboards visuales y accionamiento remoto.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Visualización en tiempo real de una estación meteorológica escolar conectada a Internet.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Envío de telemetría desde ESP32 simulado hacia un dashboard web (Adafruit IO / ThingSpeak).",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Análisis de los riesgos de ciberseguridad en dispositivos IoT y buenas prácticas de contraseñas.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Wokwi ESP32 Wi-Fi",
                  "Adafruit IO / ThingSpeak",
                  "Paneles de telemetría"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "almacenamiento_datos",
            "nombre": "Almacenamiento de datos",
            "indicador": "Reconocer el ciclo de vida del dato en el almacenamiento de datos, identificando las etapas de creación, uso, conservación y eliminación responsable de la información en contextos educativos o personales.",
            "descripcion": "Gobernanza del dato: ciclo vital (Creación -> Almacenamiento -> Procesamiento -> Backup -> Eliminación segura).",
            "faseProyectoRecomendada": "fase1_investigacion",
            "etapaProyectoRecomendada": "etapa2_definir",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Dilema sobre la permanencia de fotos y registros personales tras ser supuestamente eliminados.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Implementación de la regla de respaldo 3-2-1 y análisis comparativo de formatos estructurados (CSV/JSON).",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Creación colaborativa del decálogo de higiene del dato y protección de privacidad según Ley 8968.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Visualizadores JSON/CSV",
                  "Guías de respaldo 3-2-1",
                  "Herramientas de cifrado open source"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "nombre": "Módulo 2: Apropiación Tecnológica, Ciudadanía Digital e Inteligencia Artificial",
    "periodo": "II Semestre / II Periodo (9° Año)",
    "descripcion": "Consolidación del uso crítico, ético y avanzado de las tecnologías digitales: arquitectura de redes, optimización de sistemas operativos, modelado 3D, bases de datos relacionales, formularios avanzados, ciberseguridad, huella digital y el impacto social de las IAs generativas.",
    "entrelazamientoAreas": "En el Módulo 2, el área de Apropiación Tecnológica (Bases de Datos Relacionales y Modelado 3D) se articula armónicamente con Inteligencia Artificial y Redes de Comunicación: los formularios y plataformas capturan datos comunitarios estructurados en SQL, el modelado 3D materializa la estructura física de la solución, y los modelos de IA asisten en el procesamiento de información y generación de contenidos. Todo este ecosistema se fundamenta en la ciberdefensa activa, la gestión de la huella digital y el marco ético y legal de derechos de autor y licencias abiertas.",
    "ejeProyectoSemestral": "Desarrollo de una Solución Digital Integral Comunitaria (Bases de Datos, Modelado 3D, Campaña de Ciudadanía Digital y Auditoría IA)",
    "ejeCiclo": "Gestión Relacional de Datos, Modelado Paramétrico 3D, Ciberseguridad y Aplicación Ética de la Inteligencia Artificial para la Ciudadanía Digital (III Ciclo).",
    "perfilSalidaCiclo": [
      "Estructura, consulta y visualiza bases de datos relacionales para la toma de decisiones informadas.",
      "Diseña modelos tridimensionales paramétricos para la fabricación digital de soluciones físicas.",
      "Aplica protocolos de ciberseguridad, 2FA y gestión responsable de la huella digital.",
      "Evalúa críticamente modelos de Inteligencia Artificial reconociendo sesgos, privacidad y marcos de licenciamiento."
    ],
    "areas": [
      {
        "id": "apropiacion_m2",
        "nombre": "Apropiación Tecnológica y Digital",
        "competenciaArea": "Combina herramientas digitales, diseño tridimensional y gestores de bases de datos relacionales para la creación de productos tecnológicos pertinentes al contexto.",
        "rdaCiclo": "Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad, y experiencia de usuario para la creación de soluciones digitales según su contexto (RdA de III Ciclo: 7°, 8°, 9°).",
        "rda": "Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad, y experiencia de usuario para la creación de soluciones digitales según su contexto.",
        "color": "from-amber-600 to-orange-700",
        "icono": "Layers",
        "saberes": [
          {
            "id": "redes_comunicacion",
            "nombre": "Redes de comunicación",
            "indicador": "Reconocer las redes de comunicación a partir de su arquitectura, protocolos (como HTTP, HTTPS y TCP/IP) e interfaces, comprendiendo su funcionamiento durante el intercambio de datos.",
            "descripcion": "Topologías de red, modelo cliente-servidor, direccionamiento IPv4/IPv6 y protocolos de internet.",
            "faseProyectoRecomendada": "fase1_investigacion",
            "etapaProyectoRecomendada": "etapa2_definir",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Rastreo de la ruta de paquetes de datos (ping y tracert) a través de servidores mundiales.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Diseño de una red LAN en simulador configurando IPs, switches y pruebas de tráfico HTTP/HTTPS.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Detección y corrección de fallas de red (IPs duplicadas o puertas de enlace incorrectas).",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Cisco Packet Tracer / Web Sim",
                  "Herramientas de terminal",
                  "Cables UTP y RJ-45"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "sistema_operativo",
            "nombre": "Sistema Operativo",
            "indicador": "Aplicar técnicas de optimización del sistema operativo, identificando cómo gestionar memoria, desfragmentar discos, limpiar caché y actualizar el sistema para el mejoramiento del desempeño de dispositivos.",
            "descripcion": "Mantenimiento preventivo: gestión de memoria RAM, procesos en segundo plano, temporales y parches.",
            "faseProyectoRecomendada": "fase1_investigacion",
            "etapaProyectoRecomendada": "etapa2_definir",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Inspección del Administrador de Tareas identificando cuellos de botella en CPU y memoria RAM.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Ejecución segura de rutinas de limpieza de archivos temporales (%temp%) y optimización de arranque.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Elaboración de una guía ilustrada de mantenimiento preventivo para los dispositivos del hogar.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Herramientas nativas del S.O.",
                  "Monitores de rendimiento",
                  "Fichas de mantenimiento"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "base_datos",
            "nombre": "Herramienta de productividad (gestor de bases de datos)",
            "indicador": "Utilizar un gestor de bases de datos como herramienta de productividad para la creación de tablas, estableciendo relaciones entre ellas y realizando consultas en la organización de la información.",
            "descripcion": "Modelado relacional: tablas, campos, clave primaria (PK), clave foránea (FK), relaciones 1:N y consultas de filtro.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Análisis de inconsistencias por duplicidad de datos en hojas de cálculo desordenadas.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Creación de tablas relacionadas con integridad referencial y ejecución de consultas con filtros.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Generación de consultas ejecutivas que resuelven preguntas clave de gestión comunitaria.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "DB Browser for SQLite",
                  "LibreOffice Base / MS Access",
                  "Diagramas Entidad-Relación"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "contenido_multimedia_3d",
            "nombre": "Herramientas de creación de contenido multimedia",
            "indicador": "Utilizar herramientas de creación de contenido multimedia para el modelado 3D, aplicando funciones básicas de creación y edición en productos digitales.",
            "descripcion": "Modelado 3D espacial en ejes X-Y-Z: primitivas, operaciones booleanas (agrupar, hueco) y exportación .STL.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa4_prototipar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Manipulación de piezas físicas impresas en 3D y análisis de sus vistas ortogonales.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Diseño de una pieza o soporte para sensor en Tinkercad 3D con medidas exactas en mm.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Validación del modelo 3D en software laminador revisando grosor de paredes y resistencia.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Tinkercad 3D Designs",
                  "Visor 3D",
                  "Calibrador y reglas métricas"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "plataformas_contenido",
            "nombre": "Plataformas de creación de contenido",
            "indicador": "Crear encuestas o formularios mediante plataformas de creación de contenido, ajustando su formato y estructura al propósito de recolección o evaluación de datos.",
            "descripcion": "Instrumentación digital: encuestas, validación de campos, lógica de ramificación y exportación estadística.",
            "faseProyectoRecomendada": "fase1_investigacion",
            "etapaProyectoRecomendada": "etapa1_empatizar",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Comparación crítica de preguntas sesgadas vs. preguntas objetivas y medibles.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Creación de formulario con saltos de sección condicionales y distribución vía código QR.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Análisis de gráficos estadísticos generados en tiempo real y ajuste de preguntas confusas.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Microsoft Forms (MEP) / Google Forms",
                  "Generador de códigos QR",
                  "Hojas de cálculo"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "derechos_autor",
            "nombre": "Derechos de autor y licenciamiento",
            "indicador": "Reconocer la importancia de los derechos de autor y el licenciamiento, aplicando buenas prácticas de uso ético y legal de contenidos digitales.",
            "descripcion": "Propiedad intelectual: Copyright, dominio público, licencias Creative Commons (CC) y normas de citación APA 7.",
            "faseProyectoRecomendada": "fase3_evaluacion",
            "etapaProyectoRecomendada": "etapa5_evaluar_testear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Dilema ético sobre la apropiación indebida de ilustraciones y software en Internet.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Búsqueda de recursos libres (CC BY-SA) y redacción de referencias bibliográficas en APA 7.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Verificación de créditos en el portafolio del proyecto y asignación de licencia al trabajo propio.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Creative Commons Chooser",
                  "Manual APA 7 MEP/SIBEYCRA",
                  "Buscadores de recursos libres"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "huella_digital",
            "nombre": "Huella digital",
            "indicador": "Analizar la utilidad e implicaciones de la huella digital, valorando cómo las acciones en línea afectan la identidad, reputación y seguridad personal en entornos digitales.",
            "descripcion": "Rastros digitales: metadatos EXIF, cookies de rastreo y construcción de una identidad digital profesional.",
            "faseProyectoRecomendada": "fase3_evaluacion",
            "etapaProyectoRecomendada": "etapa5_evaluar_testear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Ejercicio de búsqueda del propio nombre y extracción de coordenadas GPS en metadatos de fotos.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Configuración de permisos de aplicaciones y diseño de una marca personal positiva.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Compromisos concretos de privacidad y uso de contraseñas seguras.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Visor de metadatos EXIF",
                  "Paneles de privacidad de cuentas",
                  "Guías de ciberseguridad personal"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "riesgos_linea",
            "nombre": "Riesgos en línea",
            "indicador": "Analizar riesgos en línea (acceso a información inapropiada, ciberadicción, ciberacoso y el sexting), valorando estrategias de prevención y autocuidado en sus interacciones digitales.",
            "descripcion": "Prevención y autocuidado: ciberacoso, phishing, grooming y protocolos institucionales del MEP.",
            "faseProyectoRecomendada": "fase3_evaluacion",
            "etapaProyectoRecomendada": "etapa5_evaluar_testear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Análisis de casos de engaño digital y presentación de las rutas institucionales de denuncia.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Creación de infografías o podcasts educativos con consejos de autocuidado y números de auxilio.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Presentación de campañas y firma del pacto de convivencia pacífica en entornos virtuales.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Protocolos oficiales MEP",
                  "Canva / Audacity",
                  "Fichas de números de emergencia"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          }
        ]
      },
      {
        "id": "datos_ia_m2",
        "nombre": "Ciencia de Datos e Inteligencia Artificial",
        "competenciaArea": "Utiliza herramientas de Inteligencia Artificial y entornos de red de forma reflexiva, segura y éticamente responsable, evaluando riesgos y respetando la propiedad intelectual.",
        "rdaCiclo": "Evalúa y aprovecha sistemas de Inteligencia Artificial y redes de comunicación para la resolución de retos, reconociendo desafíos éticos, huella digital y derechos de autor (RdA de III Ciclo: 7°, 8°, 9°).",
        "rda": "Analiza datos mediante el uso de herramientas que permitan su visualización para la toma de decisiones en situaciones cotidianas.",
        "color": "from-teal-600 to-emerald-700",
        "icono": "Sparkles",
        "saberes": [
          {
            "id": "herramientas_generativas",
            "nombre": "Herramientas generativas",
            "indicador": "Aplicar herramientas generativas con inteligencia artificial en la producción de contenido digital, considerando criterios de seguridad, propiedad intelectual y responsabilidad digital.",
            "descripcion": "Ingeniería de prompts estructurada (Rol, Contexto, Tarea, Restricción), fact-checking y co-creación.",
            "faseProyectoRecomendada": "fase2_desarrollo",
            "etapaProyectoRecomendada": "etapa3_idear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Demostración de generación de textos y código mediante IA y detección de alucinaciones.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Redacción de prompts estructurados R-C-T-R y contrastación de datos con fuentes confiables.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Presentación del producto co-creado con su respectiva declaración de uso responsable de IA.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Gemini / Claude con fines educativos",
                  "Fuentes bibliográficas académicas",
                  "Guías de prompt engineering"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          },
          {
            "id": "desafios_ia",
            "nombre": "Desafíos de la IA",
            "indicador": "Reconocer los desafíos de la inteligencia artificial, identificando riesgos como sesgos, manipulación de información, dependencia tecnológica y privacidad de datos, reflexionando sobre su impacto en la vida laboral, personal y social.",
            "descripcion": "Impacto ético y social: sesgos algorítmicos, deepfakes, desinformación y futuro del empleo juvenil.",
            "faseProyectoRecomendada": "fase3_evaluacion",
            "etapaProyectoRecomendada": "etapa5_evaluar_testear",
            "estrategiaMetodologica": {
              "inicio": {
                "titulo": "Momento 1: Inicio (Focalización y Activación)",
                "descripcion": "Exposición de casos de sesgos discriminatorios en algoritmos y videos deepfake suplantando personas.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Plantea preguntas generadoras y contextualiza el reto en situaciones reales del entorno escolar y comunal.",
                  "Activa conocimientos previos mediante dinámicas participativas y motiva la indagación técnica."
                ],
                "accionesEstudiante": [
                  "Participa activamente analizando el problema o dilema planteado por el docente.",
                  "Registra dudas e hipótesis iniciales en su bitácora digital o física."
                ],
                "preguntasGeneradoras": [
                  "¿Cómo se relaciona este saber con un problema cotidiano de nuestro entorno?",
                  "¿Qué requerimientos técnicos debemos considerar antes de construir la solución?"
                ]
              },
              "desarrollo": {
                "titulo": "Momento 2: Desarrollo (Exploración, Construcción y Aplicación)",
                "descripcion": "Debate en tres comités (Fiscalía, Defensa y Tribunal) sobre la regulación de la IA.",
                "tiempoEstimado": "50 min",
                "accionesDocente": [
                  "Modela el procedimiento técnico, guía el uso seguro de herramientas y asesora en la resolución de problemas.",
                  "Supervisa el trabajo en equipo y la aplicación de prácticas del pensador computacional."
                ],
                "accionesEstudiante": [
                  "Diseña, ensambla, programa o modela la solución asignada siguiendo criterios técnicos y buenas prácticas.",
                  "Aplica depuración sistemática de errores y valida el funcionamiento de su producto."
                ]
              },
              "cierre": {
                "titulo": "Momento 3: Cierre (Sistematización, Reflexión y Evaluación)",
                "descripcion": "Redacción consensuada de la Carta de Derechos del Estudiante frente a la Inteligencia Artificial.",
                "tiempoEstimado": "15 min",
                "accionesDocente": [
                  "Conduce la plenaria de socialización, institucionaliza los conceptos clave y aplica evaluación formativa.",
                  "Retroalimenta las oportunidades de mejora detectadas en la jornada de trabajo."
                ],
                "accionesEstudiante": [
                  "Expone su solución ante el grupo y participa en coevaluación constructiva entre pares.",
                  "Registra conclusiones y aprendizajes consolidados en su bitácora personal."
                ]
              },
              "recursosSugeridos": {
                "conectado": [
                  "Recomendaciones UNESCO sobre IA",
                  "Casos de estudio éticos",
                  "Herramientas de detección de deepfakes"
                ],
                "desconectado": [
                  "Guías impresas ilustradas paso a paso",
                  "Material concreto, componentes manipulables y reciclables",
                  "Fichas de trabajo desconectadas y tarjetas lógicas"
                ]
              },
              "practicasComputacionales": [
                "Modulariza",
                "Abstrae",
                "Depura",
                "Maneja las tecnologías de forma ética y segura"
              ],
              "actitudesComputacionales": [
                "Gusto por la precisión",
                "Aprender del error",
                "Flexibilidad para manejar problemas"
              ],
              "pautasDUA": [
                {
                  "principio": "Representacion",
                  "descripcion": "Múltiples formas de representación: diagramas visuales, modelos físicos y explicaciones narradas."
                },
                {
                  "principio": "Accion_Expresion",
                  "descripcion": "Opciones flexibles para demostrar el aprendizaje: simulación digital, prototipo físico o informe descriptivo."
                }
              ]
            }
          }
        ]
      }
    ]
  }
];
