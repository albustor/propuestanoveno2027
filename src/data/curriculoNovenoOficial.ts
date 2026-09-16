// Catálogo Curricular Oficial - Formación Tecnológica 9° Año (MEP 2026)
import { ModuloCurricular } from '../types';

export const MODULOS_NOVENO_OFICIAL: ModuloCurricular[] = [
  {
    "id": 1,
    "nombre": "Módulo 1: Robótica y Algoritmos para la Solución de Problemas",
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
                  "Examina mecanismos de transmisión (engranajes y poleas) identificando el punto motriz de entrada y anticipando la velocidad de salida.",
                  "Formula hipótesis en su bitácora sobre cómo influye el tamaño de los engranajes en la fuerza final."
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
                  "Identifica y diferencia el movimiento de entrada y salida ensamblando o simulando trenes de engranajes y poleas, calculando la relación de transmisión mecánica.",
                  "Comprueba experimentalmente la variación de torque vs. velocidad angular y verifica el acoplamiento cinemático con actuadores."
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
                  "Demuestra ante el grupo el movimiento resultante obtenido en el mecanismo y coevalúa la precisión del cálculo cinemático.",
                  "Registra en la bitácora técnica las lecciones aprendidas sobre tolerancia de piezas y fricción mecánica."
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
                  "Identifica en la placa microcontroladora la arquitectura de puertos, pines de entrada/salida (I/O) y rieles de alimentación eléctrica.",
                  "Registra en su bitácora la correspondencia básica entre señales digitales (HIGH/LOW) y analógicas."
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
                  "Aplica las funciones del microcontrolador conectando de forma segura pines digitales y analógicos con VCC y GND en protoboard o simulador.",
                  "Transfiere el programa desde el IDE y valida la comunicación bidireccional de control con sensores y actuadores."
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
                  "Verifica en el monitor serial la recepción continua de datos y comprueba la ausencia de cortocircuitos en el cableado.",
                  "Sistematiza el mapa de pines (pinout) y las buenas prácticas de conexionado eléctrico del microcontrolador."
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
                  "Observa el comportamiento de sensores (luz, distancia, temperatura) ante estímulos físicos del entorno y predice sus rangos de salida.",
                  "Formula preguntas sobre cómo transformar magnitudes físicas analógicas en valores computacionales."
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
                  "Integra sensores en el circuito del microcontrolador, leyendo y acondicionando las señales de entrada en tiempo real.",
                  "Programa umbrales y condiciones lógicas para que las lecturas del sensor detonen respuestas automatizadas precisas."
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
                  "Calibra empíricamente el rango de detección del sensor contrastando con instrumentos de medición y minimizando el ruido ambiental.",
                  "Registra en la bitácora la tabla de valores calibrados y su respuesta ante variaciones del entorno."
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
                  "Analiza los tipos de actuadores (servomotores, motores DC, zumbadores, LEDs) y los requerimientos de potencia y señal para accionarlos.",
                  "Plantea hipótesis sobre cómo modular el ángulo de giro o la velocidad motriz."
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
                  "Integra y cablea actuadores en el circuito, programando su activación y modulación (señales PWM o digitales) según las condiciones del sistema.",
                  "Verifica que las respuestas motrices, sonoras o lumínicas se ejecuten con precisión temporal ante los comandos del microcontrolador."
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
                  "Comprueba que el actuador opere dentro de los límites mecánicos seguros sin calentamiento ni sobrecarga de corriente.",
                  "Coevalúa con sus pares la suavidad del movimiento y la sincronización con los eventos programados."
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
                  "Analiza problemáticas cotidianas del hogar o colegio vinculadas con accesibilidad para personas con discapacidad o ahorro energético.",
                  "Dibuja el croquis espacial de la vivienda o aula identificando las zonas críticas de automatización."
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
                  "Analiza los usos y beneficios de la domótica construyendo o simulando una maqueta funcional con subsistemas de iluminación automática, alarmas o control térmico.",
                  "Integra la matriz de causa-efecto domótica vinculando eventos del entorno cotidiano con respuestas automatizadas de confort y seguridad."
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
                  "Sustenta mediante un mini-pitch el impacto social, ecológico y de accesibilidad universal de su solución domótica.",
                  "Evalúa con la rúbrica formativa la viabilidad técnica y eficiencia en el uso de recursos del prototipo."
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
                  "Revisa la lista de especificaciones técnicas, el árbol de problemas y los criterios de aceptación del prototipo a construir.",
                  "Distribuye roles de ensamble estructural, cableado y programación dentro de su equipo de trabajo."
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
                  "Construye de manera integral el prototipo físico o simulado ensamblando la estructura mecánica, cableado electrónico y firmware unificado.",
                  "Valida que la interacción entre sensores, microcontrolador y actuadores responda con fidelidad a la necesidad diagnosticada."
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
                  "Ejecuta protocolos de pruebas de estrés y cacería de errores (Bug Hunting) corrigiendo fallas de hardware y software.",
                  "Presenta el prototipo final ante la comunidad educativa destacando su funcionamiento y replicabilidad."
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
                  "Explora el entorno de programación (IDE), reconociendo la correspondencia entre bloques lógicos y su equivalente en código textual.",
                  "Configura los parámetros de compilador, puerto de comunicación y librerías requeridas por la tarjeta."
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
                  "Diseña y codifica la solución automatizada en el entorno visual o textual, modularizando el código en funciones, eventos y parámetros.",
                  "Compila y transfiere el firmware al mecanismo robótico, depurando errores de sintaxis y lógica en tiempo real."
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
                  "Realiza revisión de código entre pares (Code Review) verificando modularidad, indentación y comentarios explicativos.",
                  "Reflexiona sobre las ventajas de la programación estructurada para el mantenimiento y escalabilidad del software."
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
                  "Analiza el problema descomponiéndolo en datos de entrada, procesos secuenciales y salidas requeridas.",
                  "Plantea secuencias de pasos lógicos en lenguaje natural identificando posibles ambigüedades."
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
                  "Diseña el algoritmo estructurado utilizando simbología normalizada de diagramas de flujo y pseudocódigo formal.",
                  "Modela estructuras de decisión y repetición, trazando pruebas de escritorio con tablas de seguimiento de variables."
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
                  "Valida el algoritmo contrastando casos de prueba límite para garantizar que no existan bucles infinitos ni caminos sin salida.",
                  "Coevalúa con sus pares la claridad, economía de pasos y rigurosidad lógica de la solución representada."
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
                  "Observa paneles de telemetría en tiempo real y analiza cómo los objetos cotidianos se interconectan a través de Internet.",
                  "Registra preguntas sobre los protocolos de comunicación y la privacidad de los datos transmitidos en la red."
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
                  "Analiza el funcionamiento de IoT simulando o configurando el envío de paquetes de datos desde microcontroladores hacia paneles en la nube.",
                  "Programa la automatización de actuadores remotos en respuesta a umbrales de telemetría monitoreados en tiempo real."
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
                  "Analiza los vectores de riesgo en ciberseguridad para dispositivos IoT y formula buenas prácticas de autenticación.",
                  "Documenta en la bitácora el flujo completo de datos desde el sensor local hasta el dashboard en la nube."
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
                  "Debate sobre la permanencia de la información en medios digitales y las consecuencias de pérdidas o fugas de datos.",
                  "Identifica los diferentes soportes de almacenamiento físico y en la nube utilizados en su vida cotidiana."
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
                  "Reconoce y aplica las etapas del ciclo de vida del dato estructurando información en formatos estándar (CSV/JSON) y ejecutando respaldos 3-2-1.",
                  "Implementa protocolos de conservación segura, verificación de integridad y borrado seguro de datos confidenciales."
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
                  "Construye un decálogo de higiene digital y protección de datos personales alineado con la normativa de privacidad.",
                  "Evalúa las políticas de almacenamiento de sus propios proyectos aplicando criterios de responsabilidad ética."
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
                  "Ejecuta comandos de diagnóstico de red (ping, traceroute) rastreando la ruta de paquetes hacia servidores remotos.",
                  "Formula hipótesis sobre cómo viaja la información encapsulada a través de nodos y enrutadores."
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
                  "Reconoce la arquitectura de red modelando topologías LAN en simuladores interactivos, asignando direccionamiento IP y configurando interfaces.",
                  "Analiza el intercambio de datos diferenciando la seguridad entre protocolos cifrados (HTTPS) y no cifrados (HTTP/TCP)."
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
                  "Diagnostica y resuelve fallas simuladas de conectividad (conflictos de IP, puertas de enlace caídas o máscaras erróneas).",
                  "Elabora un mapa conceptual que sintetiza las capas y protocolos esenciales en la transmisión de datos."
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
                  "Inspecciona el monitor de rendimiento y el administrador de tareas para detectar cuellos de botella en CPU, disco y memoria RAM.",
                  "Registra los síntomas de lentitud más comunes en equipos de cómputo personales y de la institución."
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
                  "Aplica técnicas de optimización gestionando procesos de inicio, liberando memoria caché, limpiando temporales y programando actualizaciones.",
                  "Comprueba antes y después los tiempos de respuesta y recursos disponibles en el sistema operativo."
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
                  "Diseña una guía ilustrada de mantenimiento preventivo y optimización de software para usuarios no técnicos.",
                  "Coevalúa las mejoras de desempeño obtenidas aplicando criterios de eficiencia y estabilidad del sistema."
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
                  "Analiza una colección de datos desorganizada identificando problemas de redundancia, anomalías de actualización y falta de integridad.",
                  "Plantea las entidades y atributos principales que conformarán el modelo de datos del proyecto."
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
                  "Utiliza el gestor de bases de datos para crear tablas relacionales, definiendo claves primarias (PK), foráneas (FK) y relaciones 1 a N.",
                  "Diseña y ejecuta consultas con filtros condicionales y ordenamientos para extraer información estructurada y resolver problemas de gestión."
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
                  "Verifica la integridad referencial de la base de datos y genera reportes ejecutivos que responden a las preguntas del problema comunitario.",
                  "Reflexiona sobre la superioridad de los sistemas relacionales frente a las hojas de cálculo planas para grandes volúmenes de datos."
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
                  "Examina piezas tridimensionales reales y bocetos ortogonales identificando las dimensiones en los ejes espaciales X, Y, Z.",
                  "Planifica la descomposición de la pieza en figuras geométricas primitivas antes de iniciar el modelado digital."
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
                  "Utiliza el software de modelado 3D aplicando operaciones de escalado paramétrico, alineación, sustracción de huecos y agrupación booleana.",
                  "Modela el soporte o estructura física del prototipo ajustando medidas precisas en milímetros y verificando su ergonomía."
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
                  "Inspecciona la pieza en software laminador verificando la ausencia de caras invertidas, grosor de paredes y viabilidad de impresión 3D.",
                  "Exporta el archivo en formato estándar (.STL/.OBJ) y documenta las especificaciones dimensionales en su portafolio."
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
                  "Compara diferentes tipos de preguntas (abiertas, cerradas, escala Likert) analizando cuáles generan datos cuantitativos limpios y sin sesgo.",
                  "Define las variables e indicadores sociodemográficos que requiere recopilar para el diagnóstico de la comunidad escolar."
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
                  "Crea formularios y encuestas digitales estructurando secciones temáticas, validación de obligatoriedad de campos y saltos condicionales.",
                  "Ajusta el diseño visual e interactivo del instrumento y genera códigos QR y enlaces cortos para su distribución efectiva."
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
                  "Examina en tiempo real los tableros estadísticos y gráficos generados automáticamente por la plataforma de encuestas.",
                  "Depura preguntas que generaron confusión y redacta las conclusiones preliminares a partir de la muestra recolectada."
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
                  "Analiza casos reales de plagio y uso indebido de recursos en la web, debatiendo sobre los derechos morales y patrimoniales de los creadores.",
                  "Identifica los símbolos de Copyright, Copyleft y los íconos de licencias Creative Commons."
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
                  "Reconoce y aplica la normativa de derechos de autor buscando recursos en repositorios abiertos bajo licencias Creative Commons (CC BY, CC BY-SA).",
                  "Atribuye correctamente la autoría de imágenes, software y textos utilizados en sus proyectos aplicando el formato estándar APA 7."
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
                  "Asigna y justifica la licencia de uso para su propio producto digital o código fuente desarrollado en clase.",
                  "Firma y socializa el compromiso de integridad académica y respeto a la propiedad intelectual en el aula."
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
                  "Realiza un ejercicio de auditoría de huella digital visible buscando su rastro público y extrayendo metadatos EXIF de imágenes de prueba.",
                  "Reflexiona sobre la permanencia de publicaciones, comentarios y registros en plataformas digitales."
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
                  "Analiza las implicaciones de la huella digital configurando parámetros de privacidad, desactivando rastreadores y gestionando permisos en navegadores y apps.",
                  "Diseña un plan de construcción de identidad digital positiva y profesional orientado a su desarrollo académico y vocacional."
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
                  "Socializa un decálogo de buenas prácticas para proteger la reputación digital propia y la de sus pares.",
                  "Registra en la bitácora compromisos de higiene digital y navegación consciente y segura."
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
                  "Analiza dilemas y situaciones de riesgo frecuentes en redes sociales y entornos de videojuegos en línea.",
                  "Identifica las señales de alerta ante situaciones de ciberacoso, engaño o vulneración de la privacidad."
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
                  "Analiza riesgos digitales y elabora contenidos educativos (infografías interactivas, podcasts o campañas de concienciación) con estrategias de prevención y autocuidado.",
                  "Aplica y difunde las rutas institucionales de denuncia y los protocolos de actuación del MEP ante situaciones de vulneración."
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
                  "Firma colectivamente el pacto de convivencia escolar digital y respeto mutuo en espacios virtuales.",
                  "Evalúa las campañas creadas con la rúbrica de impacto comunicativo y pertinencia pedagógica."
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
                  "Observa ejemplos de respuestas generadas por modelos de lenguaje e imágenes con IA, identificando inconsistencias o alucinaciones.",
                  "Plantea la importancia de contrastar siempre la información generada con fuentes bibliográficas rigurosas."
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
                  "Aplica herramientas generativas de IA estructurando prompts profesionales bajo la fórmula R-C-T-R (Rol, Contexto, Tarea, Restricciones).",
                  "Co-crea borradores de código o síntesis temáticas, verificando la precisión técnica, evitando fuga de datos privados y declarando el uso de IA."
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
                  "Presenta el producto co-creado adjuntando la declaración de transparencia y verificación de fuentes (Fact-Checking).",
                  "Evalúa críticamente el aporte y las limitaciones de la IA generativa como asistente del pensamiento humano."
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
                  "Analiza casos de sesgos discriminatorios en sistemas de reconocimiento facial y algoritmos de selección automatizada.",
                  "Examina videos deepfake y noticias falsas creadas con IA reconociendo los riesgos para la democracia y la confianza."
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
                  "Reconoce los desafíos éticos de la IA participando en un debate estructurado o mesa redonda sobre sesgos, privacidad de datos y futuro del trabajo.",
                  "Redacta una matriz de evaluación ética de herramientas de IA valorando su impacto social, equidad y respeto a los derechos humanos."
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
                  "Consensa la Carta Estudiantil de Principios Éticos para el Uso de la Inteligencia Artificial en la Educación.",
                  "Sistematiza en la bitácora las conclusiones sobre el rol del criterio humano y la autonomía frente a la automatización algorítmica."
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
