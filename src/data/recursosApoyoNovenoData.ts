import { RecursoApoyoCompleto } from '../types';

/**
 * Genera el Prompt Maestro estandarizado para Inteligencia Artificial (Gemini, Groq, OpenRouter, Qwen, etc.)
 * enfocado estrictamente en los 4 pilares pedagógicos (Aprender, Comprender, Simulaciones, Valoración)
 * sin datos administrativos ni burocráticos.
 */
export function generarPromptMaestroTexto(
  saberNombre: string,
  indicadorTexto: string,
  areaNombre: string,
  moduloNumero: number,
  opcionComprender: string = 'preguntas_socraticas',
  opcionSimulacion: string = 'simulador_web'
): string {
  return `### PROMPT MAESTRO: GENERADOR DE RECURSO DE APOYO PEDAGÓGICO (MEP 2026 - 9° AÑO)

**ROL:** Eres un Asesor y Docente Especialista en Educación Tecnológica y Pensamiento Computacional del MEP de Costa Rica para III Ciclo (Noveno Año de Secundaria).
**OBJETIVO:** Diseñar un recurso didáctico integral, interactivo, estimulante y libre de cualquier dato administrativo (sin membretes, fechas, nombres de circuito ni formalismos burocráticos), estructurado rigurosamente en 4 dimensiones formativas para el estudiante y el docente.

---

### DATOS CURRICULARES OFICIALES:
- **Nivel:** 9° Año de Secundaria (III Ciclo).
- **Módulo Curricular:** Módulo ${moduloNumero} (${moduloNumero === 1 ? 'Computación Física, Robótica y Algoritmos' : 'Ciencia de Datos, Redes, 3D e IA'}).
- **Área de Conocimiento:** ${areaNombre}.
- **Saber Conceptual:** ${saberNombre}.
- **Indicador de Logro Oficial MEP:** "${indicadorTexto}"

---

### ESTRUCTURA OBLIGATORIA DEL RECURSO (4 PILARES):

#### 📘 1. APRENDER (Conceptualización y Fundamentos Técnicos)
- **Concepto Fundamental:** Explicación técnica precisa, clara y rigurosa adaptada a jóvenes de 14-15 años.
- **Analogía del Mundo Real:** Una metáfora cotidiana o contextualizada a Costa Rica que permita visualizar el funcionamiento.
- **Principios y Leyes Técnicas:** Reglas lógicas, leyes físicas, arquitecturas o sintaxis clave del saber.
- **Glosario Clave:** 3 a 4 términos técnicos esenciales con definición sintética.

#### 💡 2. COMPRENDER (Razonamiento Crítico e Indagación Profunda)
*Configuración seleccionada:* **${opcionComprender === 'preguntas_socraticas' ? 'Preguntas Socráticas y Causa-Efecto' : opcionComprender === 'estudio_caso' ? 'Estudio de Caso y Dilemas Comunitarios' : opcionComprender === 'depuracion_error' ? 'Razonamiento sobre el Error y Depuración Guiada' : 'Descomposición Modular y Abstracción'}**
- **Retos de Razonamiento:** 3 situaciones o preguntas desafiantes que obliguen a justificar el "por qué" y predecir consecuencias (*¿Qué ocurre si...?*).
- **Análisis Causa-Efecto:** Explicación de cómo una variación en la entrada, en el código o en la conexión transforma el resultado.
- **Superación de Errores Comunes:** Identificación de los 2 equívocos conceptuales más frecuentes en este indicador y cómo corregirlos.

#### ⚡ 3. SIMULACIONES Y EXPERIMENTACIÓN PRÁCTICA (Integración Tecnológica Activa)
*Modalidad:* **${opcionSimulacion === 'simulador_web' ? 'Simulador Digital en Línea (Wokwi / Tinkercad / PhET / SQLite Online / Teachable Machine)' : opcionSimulacion === 'editor_codigo' ? 'Editor de Código / Pseudocódigo (PSeInt / MakeCode / Python)' : 'Laboratorio Desconectado (Unplugged con material concreto)'}**
- **Herramienta Interactiva Sugerida:** Nombre y enlace de la WebApp o simulator ideal.
- **Guía de Experimentación Paso a Paso:** 4 a 5 pasos secuenciales para montar el circuito, escribir el algoritmo o interactuar con el modelo.
- **Código Fuente / Pseudocódigo / Esquemático:** Bloque de código limpio, completamente comentado en español.
- **Reto Práctico Desafiante:**
  - *Entradas (Inputs):* Variables o señales a ingresar.
  - *Proceso:* Transformación lógica o física requerida.
  - *Salida Esperada (Output):* Resultado observable que valida el éxito.
  - *Desafío Extra (+Plus):* Una modificación creativa para estudiantes avanzados.

#### 🎯 4. VALORACIÓN Y AUTOEVALUACIÓN (Formativa y Metacognitiva)
- **Rúbrica Analítica Formativa MEP (3 Niveles):**
  - *Inicial (1 pt):* Desempeño incipiente que requiere apoyo constante.
  - *Intermedio (2 pts):* Desempeño autónomo pero con ajustes menores.
  - *Avanzado (3 pts):* Dominio pleno, optimizado y capaz de justificar su solución.
- **Lista de Cotejo Observable:** 3 criterios de "Sí / En Proceso / No".
- **Preguntas de Autorreflexión Metacognitiva:**
  1. *¿Qué estrategia mental o técnica fue la más efectiva para resolver el reto de hoy?*
  2. *¿Qué error cometí durante la simulación y cómo logré depurarlo?*
  3. *¿Cómo puedo conectar este indicador con el Proyecto de mi comunidad?*

---
*Genera el contenido en formato Markdown pulcro, con formato visual enriquecido, tablas, listas y bloques de código.*`;
}

export const RECURSOS_APOYO_NOVENO_CATALOGO: Record<string, RecursoApoyoCompleto> = {
  // 1. Movimiento en mecanismos
  movimiento_mecanismos: {
    saberId: 'movimiento_mecanismos',
    saberNombre: 'Movimiento en mecanismos',
    indicador: 'Identificar el movimiento en mecanismos robóticos, diferenciando el movimiento de entrada y salida, a partir de la observación y análisis de simulaciones o prototipos básicos que integren sensores y actuadores.',
    areaNombre: 'Computación Física y Robótica',
    moduloId: 1,
    aprender: {
      conceptosClave: 'Cinemática, transmisión de movimiento, relación de transmisión (i), engranaje conductor (entrada), engranaje conducido (salida), torque y velocidad angular.',
      explicacionTecnica: 'En los mecanismos robóticos, la energía mecánica rotacional suministrada por un actuador (motor) se transforma y transmite hacia un efector final mediante trenes de engranajes, poleas o levas. La relación de transmisión determina si el sistema multiplica la fuerza (torque) sacrificando velocidad de giro, o si incrementa la velocidad reduciendo el torque disponible.',
      analogiaCotidiana: 'Es idéntico a los cambios de una bicicleta en una cuesta de montaña: al colocar un piñón grande atrás y un plato pequeño adelante, pedaleas con facilidad (ganas torque) aunque avances más lento.',
      terminosGlosario: [
        { termino: 'Engranaje Conductor', definicion: 'Rueda dentada acoplada directamente al eje del motor que transmite el movimiento de entrada.' },
        { termino: 'Engranaje Conducido', definicion: 'Rueda dentada que recibe el movimiento de salida hacia la carga o brazo robótico.' },
        { termino: 'Relación de Transmisión (i)', definicion: 'Cociente entre el número de dientes de salida y los de entrada (Z2/Z1 = N1/N2).' },
        { termino: 'Torque', definicion: 'Fuerza de rotación o momento de giro que produce el eje mecánico sobre una carga.' }
      ]
    },
    comprender: {
      opcionSeleccionada: 'preguntas_socraticas',
      tituloOpcion: 'Preguntas Socráticas y Razonamiento Causa-Efecto',
      descripcionOpcion: 'Análisis de transformaciones cinemáticas y conservación de potencia mecánica.',
      items: [
        {
          titulo: 'Multiplicación de torque vs. velocidad',
          detalle: 'Si un engranaje conductor de 12 dientes mueve a uno conducido de 60 dientes (relación 5:1), ¿por qué el eje final gira 5 veces más lento pero con 5 veces más fuerza?',
          reflexionEsperada: 'Por el principio de conservación de energía (Potencia = Torque x Velocidad). Al disminuir la velocidad angular, el torque se incrementa proporcionalmente.'
        },
        {
          titulo: 'Inversión del sentido de giro',
          detalle: 'Al acoplar directamente dos ruedas dentadas cilíndricas exteriores, ¿qué ocurre con el sentido de giro del eje de salida con respecto a la entrada?',
          reflexionEsperada: 'El sentido se invierte (giro horario produce giro antihorario). Para mantener el mismo sentido se requiere un engranaje loco o intermedio.'
        },
        {
          titulo: 'Pérdida por fricción y atascamiento',
          detalle: '¿Qué sucede si los dientes de los engranajes están demasiado apretados o desalineados respecto a su paso circular?',
          reflexionEsperada: 'Aumenta la fricción, se sobrecalienta el motor, se consume mayor corriente eléctrica y puede quemarse el driver del actuador.'
        }
      ],
      analisisCausaEfecto: 'Mayor número de dientes en la salida (Z2 > Z1) produce reducción de velocidad (RPM) y aumento proporcional de torque (Nm).'
    },
    simulacion: {
      tipoSimulacion: 'simulador_web',
      herramientaRecomendada: 'Gear Generator & PhET Balances',
      urlHerramienta: 'https://geargenerator.com/',
      guiaPasoAPaso: [
        '1. Abrir Gear Generator en el navegador.',
        '2. Configurar el engranaje 1 con 10 dientes (Z1=10) conectado al motor a 100 RPM.',
        '3. Añadir un segundo engranaje con 40 dientes (Z2=40) engranado al primero.',
        '4. Observar el contador de RPM de salida y verificar que marque exactamente 25 RPM (reducción 4:1).',
        '5. Añadir un tercer engranaje de 20 dientes y registrar la nueva relación de transmisión total.'
      ],
      codigoOEsquema: `// Cálculo cinemático de relación de transmisión (i)
// i = Z_salida / Z_entrada
// RPM_salida = RPM_entrada / i
const zEntrada = 10;
const zSalida = 40;
const rpmEntrada = 100;

const relacionTransmision = zSalida / zEntrada; // 4.0
const rpmSalida = rpmEntrada / relacionTransmision; // 25.0 RPM
const factorTorque = relacionTransmision; // Torque se multiplica por 4`,
      lenguajeOFormato: 'JavaScript / Pseudocódigo Matemático',
      retoPractico: {
        entradas: 'Motor DC a 120 RPM, ruedas dentadas disponibles de 12, 24, 36 y 48 dientes.',
        proceso: 'Diseñar un tren de mecanismos que reduzca la velocidad final exactamente a 30 RPM para levantar una compuerta domótica pesada.',
        salidasEsperadas: 'Relación 4:1 lograda conectando Z1=12 con Z2=48.',
        desafioExtra: 'Agregar un engranaje intermedio para que el eje final gire en el mismo sentido que el motor sin alterar la relación 4:1.'
      }
    },
    valoracion: {
      criterioLogro: 'Identifica el movimiento de entrada y salida en mecanismos mecánicos y calcula la relación de transformación de torque y velocidad.',
      niveles: {
        inicial: 'Reconoce que los engranajes transmiten movimiento, pero no distingue con precisión el sentido de giro ni la diferencia entre torque y velocidad.',
        intermedio: 'Distingue entre engranaje conductor y conducido y explica cualitativamente si el mecanismo gana fuerza o velocidad.',
        avanzado: 'Calcula con exactitud relaciones de transmisión compuestas, predice RPM y torque de salida, y propone mejoras mecánicas al prototipo.'
      },
      preguntasMetacognitivas: [
        '¿Cómo determiné cuál engranaje debía ser más grande para lograr mover la carga pesada?',
        '¿Qué dificultad encontré al alinear los ejes en la simulación y cómo la resolví?',
        '¿De qué manera puedo aplicar este mecanismo en el proyecto de mi equipo?'
      ],
      listaVerificacion: [
        'Identifiqué el componente conductor (entrada) y el conducido (salida).',
        'Comprobé el sentido de giro horario / antihorario de cada eje.',
        'Calculé correctamente la relación de transmisión en el simulador.'
      ]
    },
    promptMaestroGenerado: ''
  },

  // 2. Procesamiento de datos con microcontrolador
  procesamiento_microcontrolador: {
    saberId: 'procesamiento_microcontrolador',
    saberNombre: 'Procesamiento de datos con microcontrolador',
    indicador: 'Reconocer el microcontrolador como el procesador central del sistema, interpretando la lectura de señales analógicas/digitales y la emisión de órdenes de control hacia actuadores.',
    areaNombre: 'Computación Física y Robótica',
    moduloId: 1,
    aprender: {
      conceptosClave: 'Microcontrolador, CPU, pines GPIO (Digitales I/O, Analógicos ADC, PWM), ciclo setup/loop, lectura sensorial y escritura de control.',
      explicacionTecnica: 'El microcontrolador es un circuito integrado programable que ejecuta instrucciones secuenciales para interactuar con el entorno físico. Posee memoria Flash para el programa, SRAM para variables y periféricos de entrada/salida (GPIO). Transforma voltajes continuos del mundo real (0V a 5V) en valores digitales comprensibles (0 a 1023 en ADC de 10 bits) y comanda actuadores.',
      analogiaCotidiana: 'Es como el cerebro humano: los sensores son los sentidos (ojos, piel), los nervios son los cables, el microcontrolador toma decisiones lógicas y los músculos son los actuadores.',
      terminosGlosario: [
        { termino: 'GPIO', definicion: 'Pines de entrada/salida de propósito general configurables por software.' },
        { termino: 'ADC (Conversor Analógico-Digital)', definicion: 'Circuito que convierte un nivel de voltaje continuo en un número digital entero.' },
        { termino: 'PWM (Modulación por Ancho de Pulsos)', definicion: 'Técnica digital que simula voltajes variables modulando el ciclo de trabajo de una señal cuadrada.' },
        { termino: 'Loop Principal', definicion: 'Bucle infinito donde el microcontrolador lee entradas, procesa algoritmos y actualiza salidas continuamente.' }
      ]
    },
    comprender: {
      opcionSeleccionada: 'depuracion_error',
      tituloOpcion: 'Razonamiento sobre el Error y Depuración de Código I/O',
      descripcionOpcion: 'Análisis de errores típicos en la configuración de pines y lecturas flotantes.',
      items: [
        {
          titulo: 'Pin configurado como OUTPUT al leer un sensor',
          detalle: '¿Qué ocurre si un estudiante olvida configurar pinMode(2, INPUT) y ejecuta digitalRead(2) en Arduino?',
          reflexionEsperada: 'El pin puede provocar un cortocircuito si se conecta a un sensor activo o retornar lecturas erráticas e impredecibles.'
        },
        {
          titulo: 'Pin flotante sin resistencia Pull-Up o Pull-Down',
          detalle: '¿Por qué al conectar un pulsador sin resistencia de referencia el valor digital oscila aleatoriamente entre 0 y 1 al acercar la mano?',
          reflexionEsperada: 'Porque el pin capta ruido electromagnético ambiental. Se requiere una resistencia Pull-Up o activar INPUT_PULLUP para fijar un estado definido.'
        },
        {
          titulo: 'Uso de delay() bloqueante en sistemas de alerta',
          detalle: '¿Qué consecuencia tiene colocar delay(5000) después de leer un sensor de gas o presencia?',
          reflexionEsperada: 'El microcontrolador queda congelado durante 5 segundos completos y no puede responder a ninguna otra emergencia durante ese tiempo.'
        }
      ],
      analisisCausaEfecto: 'La configuración correcta de pinMode() y voltajes de referencia condiciona la veracidad de los datos leídos por la CPU.'
    },
    simulacion: {
      tipoSimulacion: 'simulador_web',
      herramientaRecomendada: 'Wokwi Simulator (Arduino UNO)',
      urlHerramienta: 'https://wokwi.com/projects/new/arduino-uno',
      guiaPasoAPaso: [
        '1. Ingresar a Wokwi y crear un proyecto nuevo con Arduino UNO.',
        '2. Conectar un potenciómetro al pin analógico A0, VCC a 5V y GND a tierra.',
        '3. Conectar un LED con resistencia de 220Ω al pin digital PWM ~9.',
        '4. Copiar el código de control proporcional e iniciar la simulación.',
        '5. Mover el potenciómetro y observar la variación suave del brillo del LED.'
      ],
      codigoOEsquema: `// Control Inteligente de Brillo con Microcontrolador
const int pinSensor = A0;  // Entrada Analógica
const int pinActuador = 9; // Salida PWM (~9)

void setup() {
  pinMode(pinActuador, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lecturaADC = analogRead(pinSensor); // Rango: 0 a 1023
  int salidaPWM = map(lecturaADC, 0, 1023, 0, 255); // Mapeo a 8 bits

  analogWrite(pinActuador, salidaPWM);

  Serial.print("Sensor: ");
  Serial.print(lecturaADC);
  Serial.print(" | PWM: ");
  Serial.println(salidaPWM);
  delay(50);
}`,
      lenguajeOFormato: 'C++ / Arduino IDE',
      retoPractico: {
        entradas: 'Lectura de A0 entre 0 y 1023.',
        proceso: 'Si la lectura supera el umbral de 700 (luz alta o alerta), hacer parpadear el LED en pin 9 rápidamente; si es menor, mantenerlo apagado.',
        salidasEsperadas: 'Comportamiento condicional reactivo en tiempo real con monitoreo por puerto serial.',
        desafioExtra: 'Incorporar un zumbador pasivo en pin 8 que emita un tono de advertencia cuando el sensor supere 850.'
      }
    },
    valoracion: {
      criterioLogro: 'Interpreta señales digitales/analógicas en un microcontrolador y programa algoritmos de control reactivo para actuadores.',
      niveles: {
        inicial: 'Copia código básico pero confunde los pines analógicos con digitales y requiere asistencia para conectar el circuito.',
        intermedio: 'Conecta correctamente el circuito y programa la lectura y mapeo de señales con apoyo en la calibración de umbrales.',
        avanzado: 'Diseña, programa y optimiza estructuras de control no bloqueantes, documentando el flujo de datos y depurando errores con solvencia.'
      },
      preguntasMetacognitivas: [
        '¿Cómo comprobé que la señal que leía el microcontrolador correspondía al cambio físico del potenciómetro?',
        '¿Por qué fue necesario mapear el valor de 10 bits (0-1023) a 8 bits (0-255)?',
        '¿Cómo ayuda este concepto a controlar los actuadores en el proyecto de mi aula?'
      ],
      listaVerificacion: [
        'Conecté correctamente alimentación (5V), tierra (GND) y señal.',
        'Configuré el modo de los pines (INPUT / OUTPUT) en el setup.',
        'Verifiqué la lectura en el Monitor Serial de Wokwi.'
      ]
    },
    promptMaestroGenerado: ''
  }
};

// Completar la generación del prompt maestro en el catálogo
Object.keys(RECURSOS_APOYO_NOVENO_CATALOGO).forEach((key) => {
  const item = RECURSOS_APOYO_NOVENO_CATALOGO[key];
  item.promptMaestroGenerado = generarPromptMaestroTexto(
    item.saberNombre,
    item.indicador,
    item.areaNombre,
    item.moduloId,
    item.comprender.opcionSeleccionada,
    item.simulacion.tipoSimulacion
  );
});

/**
 * Obtiene o genera al vuelo el recurso de apoyo completo para cualquier indicador de 9°
 */
export function getRecursoApoyoParaSaber(
  saberId: string,
  saberNombre: string,
  indicador: string,
  areaNombre: string,
  moduloId: number,
  opcionComprender: string = 'preguntas_socraticas',
  opcionSimulacion: string = 'simulador_web'
): RecursoApoyoCompleto {
  if (RECURSOS_APOYO_NOVENO_CATALOGO[saberId]) {
    const existing = { ...RECURSOS_APOYO_NOVENO_CATALOGO[saberId] };
    existing.promptMaestroGenerado = generarPromptMaestroTexto(
      saberNombre,
      indicador,
      areaNombre,
      moduloId,
      opcionComprender,
      opcionSimulacion
    );
    return existing;
  }

  // Generador dinámico estructurado para cualquier indicador no precargado
  return {
    saberId,
    saberNombre,
    indicador,
    areaNombre,
    moduloId,
    aprender: {
      conceptosClave: `${saberNombre}, Pensamiento Computacional, Abstracción, Modelado Tecnológico.`,
      explicacionTecnica: `El saber '${saberNombre}' permite al estudiantado de 9° año dominar los principios tecnológicos fundamentales para resolver retos auténticos de su entorno, aplicando rigor conceptual y buenas prácticas de ingeniería digital.`,
      analogiaCotidiana: `Imagina este proceso como un sistema interactivo donde cada componente cumple una función especializada en armonía con las demás partes del sistema.`,
      terminosGlosario: [
        { termino: saberNombre, definicion: `Concepto central del currículo de Formación Tecnológica MEP para 9° Año.` },
        { termino: 'Abstracción', definicion: 'Capacidad de enfocarse en los elementos cruciales de un problema ignorando detalles irrelevantes.' },
        { termino: 'Depuración', definicion: 'Metodología sistemática para encontrar y corregir fallos o discrepancias lógicas.' }
      ]
    },
    comprender: {
      opcionSeleccionada: opcionComprender as any,
      tituloOpcion: opcionComprender === 'preguntas_socraticas' ? 'Preguntas Socráticas y Razonamiento Causa-Efecto' : 'Estudio de Casos y Dilemas Comunitarios',
      descripcionOpcion: `Desafíos cognitivos diseñados para consolidar la comprensión profunda del indicador: "${indicador}".`,
      items: [
        {
          titulo: `Reto de análisis conceptual en ${saberNombre}`,
          detalle: `¿Por qué es indispensable comprender los fundamentos de ${saberNombre} antes de iniciar el prototipado físico o digital?`,
          reflexionEsperada: 'Permite anticipar fallos de diseño, ahorrar tiempo en la depuración y asegurar un funcionamiento eficiente y seguro.'
        },
        {
          titulo: 'Análisis de impacto y optimización',
          detalle: `¿Cómo influye una decisión incorrecta en este saber sobre el comportamiento global del sistema tecnológico?`,
          reflexionEsperada: 'Provoca errores en cascada, fallos de integridad de datos o ineficiencia en el uso de recursos energéticos.'
        }
      ],
      analisisCausaEfecto: `Un diseño riguroso en '${saberNombre}' produce prototipos robustos, escalables y seguros para la comunidad escolar.`
    },
    simulacion: {
      tipoSimulacion: opcionSimulacion as any,
      herramientaRecomendada: moduloId === 1 ? 'Wokwi Simulator / Tinkercad / PSeInt' : 'SQLite Online / MakeCode / Diagrams.net',
      urlHerramienta: 'https://wokwi.com/',
      guiaPasoAPaso: [
        '1. Abrir la plataforma recomendada en el navegador o preparar la guía desconectada.',
        `2. Configurar el escenario de trabajo para ensayar los principios de ${saberNombre}.`,
        '3. Probar los casos de prueba iniciales y registrar las observaciones en la bitácora digital.',
        '4. Depurar cualquier comportamiento anómalo hasta que el resultado coincida con la especificación técnica.'
      ],
      codigoOEsquema: `// Plantilla de experimentación para: ${saberNombre}
// Indicador MEP: ${indicador}

function ejecutarPruebaTecnica() {
  console.log("Iniciando prueba de ${saberNombre}...");
  // Implementación del algoritmo o circuito
  return true;
}`,
      lenguajeOFormato: 'Pseudocódigo / Código Estructurado',
      retoPractico: {
        entradas: 'Parámetros de prueba y condiciones de entrada del reto.',
        proceso: `Aplicar la lógica de ${saberNombre} respetando estándares técnicos.`,
        salidasEsperadas: 'Respuesta verificable y óptima en el simulador o prototipo.',
        desafioExtra: 'Optimizar la solución para reducir el tiempo de respuesta o simplificar la estructura modular.'
      }
    },
    valoracion: {
      criterioLogro: indicador,
      niveles: {
        inicial: 'Aplica conceptos básicos con asistencia continua del docente o guías paso a paso.',
        intermedio: 'Resuelve los retos prácticos de manera autónoma, requiriendo apoyo puntual en casos de borde o depuración compleja.',
        avanzado: 'Demuestra dominio integral, formula soluciones óptimas, justifica técnicamente sus decisiones y asiste a sus pares.'
      },
      preguntasMetacognitivas: [
        `¿Qué fue lo más retador de aprender sobre ${saberNombre}?`,
        '¿Cómo logré superar los errores durante la fase de simulación o experimentación?',
        '¿Cómo impacta este conocimiento en el proyecto semestral de mi equipo?'
      ],
      listaVerificacion: [
        'Comprendí el fundamento técnico del saber.',
        'Completé el reto de simulación y depuración.',
        'Completé mi autoevaluación formativa en la bitácora.'
      ]
    },
    promptMaestroGenerado: generarPromptMaestroTexto(
      saberNombre,
      indicador,
      areaNombre,
      moduloId,
      opcionComprender,
      opcionSimulacion
    )
  };
}
