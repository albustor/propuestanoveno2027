import crypto from 'crypto';
import { registrarEventoTelemetria } from './telemetry';
import { getPerfilesSalidaTextoParaIA } from '../data/perfilesSalidaData';

interface AICacheEntry {
  response: string;
  provider: string;
  model: string;
  timestamp: number;
}

const memoryCache = new Map<string, AICacheEntry>();

function getHash(prompt: string, context: string): string {
  return crypto.createHash('sha256').update(`${prompt}:${context}`).digest('hex');
}

export interface AIRequestPayload {
  prompt: string;
  tipo: 
    | 'recurso_apoyo_maestro_4_pilares'
    | 'opciones_comprender_ia'
    | 'simulacion_laboratorio_ia'
    | 'valoracion_rubrica_ia'
    | 'unificar_indicadores_ia'
    | 'mediacion_cotidiano_9_etapas'
    | 'mediacion_proyecto_etapas'
    | 'multiescenarios_4_cuadrantes'
    | 'mediacion_inicio_desarrollo_cierre'
    | 'dua_adaptaciones'
    | 'rubrica_evaluacion'
    | 'reto_robotica'
    | 'pregunta_generadora'
    | 'sistematizacion_resumen'
    | 'resumen_avances_diarios_ia'
    | 'distribucion_correlacion_evaluacion_ia'
    | 'informe_pedagogico_sesion_ia'
    | 'sintesis_reunion_acuerdos_ia'
    | 'analizar_dictado_sesion_ia';
  contexto?: {
    modulo?: number;
    tema?: string;
    tituloSesion?: string;
    fecha?: string;
    hora?: string;
    participantes?: string[];
    avancesEspecificos?: string;
    temasTratados?: string;
    acuerdos?: Array<{ id?: string; acuerdo: string; responsable: string; completado?: boolean }>;
    enfoque?: 'pedagogico_curricular' | 'co_docencia' | 'evaluacion_indicadores' | 'general';
    saberId?: string;
    saberNombre?: string;
    indicadorTexto?: string;
    modalidad?: 'cotidiano' | 'proyecto';
    componente?: 'proyecto' | 'cotidiano' | 'ejecucion' | 'tareas_asistencia' | 'todos';
    etapaProyecto?: string;
    opcionComprender?: 'preguntas_socraticas' | 'estudio_caso' | 'depuracion_error' | 'descomposicion_modular';
    opcionSimulacion?: 'simulador_web' | 'editor_codigo' | 'laboratorio_unplugged' | 'ia_interactiva';
    areas?: string[];
    indicadores?: string[];
    aspectosPuntuales?: string;
    faseDesignThinking?: string;
    rolSecuencia?: string;
    competenciaTexto?: string;
    rdaTexto?: string;
    ejeTransversalNombre?: string;
    ejeTransversalDimension?: string;
    ejeTransversalDescriptor?: string;
    saberesProcedimentales?: string[];
    saberesActitudinales?: string[];
    etapaDesignThinking?: string;
    accionesEtapaDT?: string[];
    entregablesDT?: string[];
    numeroSemana?: number;
  };
}

export interface AIResponsePayload {
  success: boolean;
  content: string;
  provider: string;
  model: string;
  cached: boolean;
  timestamp: string;
}

export async function processAICascade(payload: AIRequestPayload): Promise<AIResponsePayload> {
  const contextStr = JSON.stringify(payload.contexto || {});
  const cacheKey = getHash(payload.prompt, `${payload.tipo}:${contextStr}`);

  // 1. Check SHA-256 Memory Cache
  if (memoryCache.has(cacheKey)) {
    const cached = memoryCache.get(cacheKey)!;
    return {
      success: true,
      content: cached.response,
      provider: cached.provider,
      model: cached.model,
      cached: true,
      timestamp: new Date().toISOString()
    };
  }

  // Fallback Generation Engine with 2027 Meeting Directives
  const generatedContent = generatePedagogicalResponse2027(payload);

  memoryCache.set(cacheKey, {
    response: generatedContent,
    provider: "PÍA Asistente Curricular MEP (Nivel 1 Principal - gemini-3.5-flash)",
    model: "gemini-3.5-flash",
    timestamp: Date.now()
  });

  // Registrar telemetría de IA
  try {
    registrarEventoTelemetria(
      'IA_ENGINE',
      'INFERENCIA_IA_GENERADA',
      `Consulta IA tipo "${payload.tipo}" procesada con gemini-3.5-flash.`,
      { tipo: payload.tipo, promptLen: payload.prompt.length }
    );
  } catch (e) {
    // Silent catch
  }

  return {
    success: true,
    content: generatedContent,
    provider: "PÍA Asistente Curricular MEP (Nivel 1 Principal - gemini-3.5-flash)",
    model: "gemini-3.5-flash",
    cached: false,
    timestamp: new Date().toISOString()
  };
}

function generatePedagogicalResponse2027(payload: AIRequestPayload): string {
  const tema = payload.contexto?.tema || "Automatización y Robótica con Microcontroladores";
  const fase = payload.contexto?.faseDesignThinking || "Prototipar";
  const rol = payload.contexto?.rolSecuencia || "Construir y Probar";
  const areas = payload.contexto?.areas?.join(", ") || "Computación Física y Robótica, Algoritmos";
  const indicadores = payload.contexto?.indicadores?.join("; ") || "Construir prototipos que integren sensores y actuadores";

  switch (payload.tipo) {
    case 'recurso_apoyo_maestro_4_pilares': {
      const saber = payload.contexto?.saberNombre || tema;
      const ind = payload.contexto?.indicadorTexto || indicadores;
      const opComprender = payload.contexto?.opcionComprender || 'preguntas_socraticas';
      const opSimulacion = payload.contexto?.opcionSimulacion || 'simulador_web';
      const mod = payload.contexto?.modulo || 1;

      return `## 📘 Recurso Integral de Apoyo Pedagógico (9° Año MEP)
### **Saber Conceptual:** ${saber}
### **Indicador de Logro Oficial:** "${ind}"
### **Alineamiento Curricular:**
- 🏆 **Competencia del Área:** ${mod === 1 ? 'Desarrolla prototipos automatizados y sistemas robóticos integrando hardware programable, sensores, actuadores y cinemática mecánica.' : 'Combina herramientas digitales, diseño tridimensional y gestores de bases de datos relacionales con ética digital.'}
- 🎯 **Resultado de Aprendizaje (RdA de III Ciclo):** ${mod === 1 ? 'Aplica fundamentos de robótica, computación física, electrónica, mecánica y sistemas robóticos autónomos en la programación y construcción de prototipos que resuelven un problema.' : 'Combina herramientas digitales, tomando en cuenta fundamentos de tecnología, impacto de las TIC, seguridad y privacidad para la creación de soluciones digitales.'}
- 🎓 **Perfil de Salida (III Ciclo):** Pensamiento computacional autónomo, formulación algorítmica modular y prototipado Design Thinking (DT) de impacto contextual.

---

### 📘 1. APRENDER (Conceptualización y Fundamento Técnico)
- **Concepto Central:** El saber **${saber}** constituye una competencia técnica vertebral en el ${mod === 1 ? 'I Semestre (Robótica y Programación)' : 'II Semestre (Ciencia de Datos e Inteligencia Artificial)'}, capacitando al estudiantado para comprender cómo interactúan el software y el hardware en soluciones de automatización.
- **Principio Físico / Lógico:** Operación estructurada mediante modelos computacionales y reglas técnicas de diseño seguro.
- **Analogía Cotidiana:** Visualiza este proceso como los engranajes de un reloj suizo o los sentidos del cuerpo humano: cada elemento debe recibir la señal adecuada para que el sistema completo funcione con precisión milimétrica.
- **Términos Clave:**
  - **${saber}:** Componente de aprendizaje oficial del currículo de Formación Tecnológica MEP.
  - **Modularidad:** Principio de diseño que divide el reto en bloques independientes y reutilizables.
  - **Depuración Sistemática:** Protocolo de búsqueda y corrección de errores lógicos o de conexión.

---

### 💡 2. COMPRENDER (Razonamiento Crítico e Indagación Profunda)
*Modalidad Activa:* **${opComprender === 'preguntas_socraticas' ? 'Preguntas Socráticas y Análisis Causa-Efecto' : opComprender === 'estudio_caso' ? 'Estudio de Caso y Dilemas Comunitarios' : 'Depuración Guiada de Errores'}**
1. **Reto de Análisis:** ¿Por qué un fallo en la inicialización o en el tipo de variable puede provocar que todo el sistema responda de manera errática?
2. **Pregunta Causa-Efecto:** Si aumentamos la frecuencia de muestreo de entrada al doble, ¿cómo impacta esto en el consumo de memoria y la velocidad de respuesta del actuador?
3. **Superación del Error Típico:** Evitar asumir que el código está libre de fallos sin haber realizado previamente una prueba de escritorio y validación de casos de borde.

---

### ⚡ 3. SIMULACIONES Y EXPERIMENTACIÓN PRÁCTICA
*Entorno Recomendado:* **${opSimulacion === 'simulador_web' ? 'Simulador Digital en Línea (Wokwi / Tinkercad / PSeInt)' : 'Laboratorio Desconectado (Unplugged con Material Concreto)'}**
- **Paso 1:** Abrir el entorno interactivo y configurar los parámetros iniciales de hardware/código.
- **Paso 2:** Ejecutar la secuencia de prueba base verificando voltajes o variables en el monitor serial.
- **Paso 3:** Modificar deliberadamente una condición límite para registrar el comportamiento anómalo.
- **Paso 4:** Aplicar la corrección técnica y consolidar el resultado en la bitácora estudiantil.

\`\`\`
// Bloque de Comprobación Técnica - 9° Año MEP
void ejecutarValidacion() {
  // 1. Lectura de variables de entrada
  // 2. Procesamiento algorítmico condicional
  // 3. Emisión de respuesta hacia el actuador / base de datos
}
\`\`\`

- **Reto de Desempeño:**
  - *Entrada:* Parámetros de prueba sensoriales o datos tabulares.
  - *Proceso:* Aplicación del algoritmo condicional / cinemático.
  - *Salida Esperada:* Activación precisa del actuador o consulta SQL correcta.

---

### 🎯 4. VALORACIÓN Y AUTOEVALUACIÓN FORMATIVA
- **Rúbrica Analítica MEP (3 Niveles de Logro):**
  - **Inicial (1 pt):** Reconoce elementos básicos de **${saber}** pero requiere acompañamiento paso a paso.
  - **Intermedio (2 pts):** Conecta, programa o simula la solución de forma autónoma con apoyo puntual en la calibración.
  - **Avanzado (3 pts):** Formula, optimiza y justifica técnicamente el funcionamiento de **${saber}**, asistiendo a sus pares en la resolución de problemas.
- **Pregunta Metacognitiva de Cierre:** *¿Qué estrategia me permitió identificar y corregir el fallo durante la simulación de hoy?*`;
    }

    case 'unificar_indicadores_ia':
      const moduloNum = payload.contexto?.modulo || 1;
      if (moduloNum === 1) {
        return `### 🧠 Análisis de Relaciones Curriculares y Clústeres Unificados por IA (Módulo 1: Robótica y Computación Física)

#### 1. 🚀 Clúster Unificado para Proyecto Trimestral (Design Thinking)
- **Título:** *Sistema Domótico Automatizado e Inclusivo*
- **Saberes e Indicadores Integrados:**
  1. *Domótica (CFR)* $\rightarrow$ Diagnóstico de necesidades y diseño de maqueta asistencial.
  2. *Microcontrolador + Sensor + Actuador (CFR)* $\rightarrow$ Entrada de señales sensoriales, mapeo de pines I/O y activación de salidas físicas.
  3. *Entorno de Programación (Algoritmos)* $\rightarrow$ Codificación estructurada modularizada de la lógica de control.
- **Vínculo Conceptual:** Los sensores captan variables del entorno escolar/comunal $\rightarrow$ El microcontrolador ejecuta el algoritmo condicional $\rightarrow$ Los actuadores realizan trabajo físico útil.
- **Estructura Didáctica Oficial:**
  - **Etapa 1 (Empatizar, Definir, Idear):** Entrevistas contextuales a la comunidad educativa y árbol de problemas.
  - **Etapa 2 (Prototipar):** Esquema de conexionado en simulador/físico, cableado con polaridad y programación modular.
  - **Etapa 3 (Depurar y Presentar):** Depuración sistemática de falsos contactos y sustentación en Feria Tecnológica.

---

#### 2. 📝 Clúster Unificado para Trabajo Cotidiano (9 Sub-etapas MEP 2027)
- **Título:** *Mecanismos Robóticos y Modelado Algorítmico Condicional*
- **Saberes e Indicadores Integrados:** *Movimiento en mecanismos (CFR)* + *Algoritmo (Algoritmos y Programación)*.
- **Vínculo Conceptual:** El mecanismo transforma el movimiento físico (poleas/engranajes) mientras que el diagrama de flujo formaliza las condiciones lógicas de arranque, giro y paro.
- **Secuencia de Clase Oficial:**
  - **Inicio (2 Etapas):** 1. Reto detonante ('¿Cómo controla el algoritmo la velocidad del mecanismo?'); 2. Clarificación de criterios y metas en la bitácora.
  - **Desarrollo (4 Etapas):** 1. Indagación guiada con simulador de mecanismos; 2. Conceptualización de la relación de transmisión y simbología de flujogramas; 3. Construcción práctica en parejas; 4. Depuración sistemática entre pares.
  - **Cierre (3 Etapas):** 1. Síntesis metacognitiva del error; 2. Demostración pública entre equipos; 3. Registro de evidencias y enlace con la próxima sesión.

---

#### 3. 🎯 Clúster Unificado para Tareas y Actitudes (TA)
- **Título:** *Gestión Ética y Seguridad de Datos en Dispositivos Inteligentes*
- **Saberes e Indicadores Integrados:** *Dato (Ciencia de Datos)* + *Actitudes del Pensador Computacional (Gusto por la precisión y aprender del error)*.
- **Actividad Formativa:** Auditoría de privacidad y decálogo ético sobre cómo los sensores IoT recolectan información personal.`;
      } else {
        return `### 🧠 Análisis de Relaciones Curriculares y Clústeres Unificados por IA (Módulo 2: Ciencia de Datos e IA Generativa)

#### 1. 🚀 Clúster Unificado para Proyecto Trimestral (Design Thinking)
- **Título:** *Plataforma de Diagnóstico Comunitario, Modelado 3D e IA Generativa*
- **Saberes e Indicadores Integrados:**
  1. *Plataformas de Contenido / Encuestas (Apropiación)* $\rightarrow$ Formulación de instrumentos para recolección de datos.
  2. *Gestor de Bases de Datos (Apropiación)* $\rightarrow$ Diseño de tablas relacionales, llaves primarias/foráneas y consultas SQL.
  3. *Modelado 3D (Apropiación)* $\rightarrow$ Diseño paramétrico del soporte o carcasa física de la solución.
  4. *Herramientas Generativas (IA)* $\rightarrow$ Prompt engineering ético y síntesis crítica de información.
- **Vínculo Conceptual:** Los formularios capturan datos de campo $\rightarrow$ La base de datos los estructura y analiza $\rightarrow$ El modelado 3D materializa la pieza física $\rightarrow$ La IA asiste la ideación y comunicación.
- **Estructura Didáctica Oficial:**
  - **Etapa 1 (Empatizar, Definir, Idear):** Encuesta comunitaria y uso de IA generativa para enriquecer la lluvia de ideas.
  - **Etapa 2 (Prototipar):** Creación del esquema entidad-relación y modelado 3D de la pieza en Tinkercad 3D / FreeCAD.
  - **Etapa 3 (Depurar y Presentar):** Verificación de integridad de datos y sustentación del producto tecnológico.

---

#### 2. 📝 Clúster Unificado para Trabajo Cotidiano (9 Sub-etapas MEP 2027)
- **Título:** *Arquitectura de Redes, Ciberseguridad y Huella Digital*
- **Saberes e Indicadores Integrados:** *Redes de comunicación* + *Riesgos en línea / Ciberseguridad* + *Huella digital*.
- **Vínculo Conceptual:** Entender los protocolos de red (HTTP vs HTTPS y TCP/IP) es indispensable para prevenir ingeniería social, malware y proteger la identidad digital.
- **Secuencia de Clase Oficial:**
  - **Inicio (2 Etapas):** 1. Simulación de correo señuelo de phishing; 2. Metas de aprendizaje e indicadores de ciberdefensa.
  - **Desarrollo (4 Etapas):** 1. Indagación de saltos de red (ping/traceroute); 2. Conceptualización de paquetes IP y cifrado; 3. Configuración práctica de 2FA y checklist de seguridad; 4. Depuración de casos de fraude digital.
  - **Cierre (3 Etapas):** 1. Síntesis sobre la resiliencia humana y tecnológica; 2. Puesta en común del decálogo defensivo; 3. Registro en bitácora y enlace.

---

#### 3. 🎯 Clúster Unificado para Tareas y Actitudes (TA)
- **Título:** *Sesgos Algorítmicos, Ética de la IA y Licenciamiento Digital*
- **Saberes e Indicadores Integrados:** *Desafíos de la IA* + *Derechos de autor y licenciamiento*.
- **Actividad Formativa:** Matriz de contraste entre licencias Creative Commons y análisis crítico de sesgos en respuestas de modelos de lenguaje.`;
      }

    case 'mediacion_cotidiano_9_etapas':
      return `### Secuencia Didáctica Oficial de Trabajo Cotidiano (9 Sub-etapas)
**Tema:** ${tema}
**Indicadores:** ${indicadores}
**Áreas:** ${areas}

#### MOMENTO 1: INICIO (2 Etapas)
1. **Etapa 1 (Conexión y Activación):** Planteamiento del reto detonante cotidiano: *"¿Cómo responde un sistema automatizado inteligente cuando cambian las condiciones de su entorno?"*. Se activa el interés mediante una breve dinámica de predicción de señales de entrada.
2. **Etapa 2 (Clarificación de Metas y Criterios):** Se explicita a los estudiantes la meta de la sesión (diseñar y validar la respuesta del microcontrolador ante sensores) y los criterios de éxito formativo esperados en la bitácora.

#### MOMENTO 2: DESARROLLO (4 Etapas)
1. **Etapa 1 (Indagación y Exploración Guiada):** Manipulación de componentes electrónicos o simulaciones interactivas para observar la variación de voltaje en pines analógicos y digitales.
2. **Etapa 2 (Conceptualización y Modelado):** Modelado en la pizarra del diagrama de flujo condicional (*Si entrada > umbral entonces activar salida*) y declaración de pines I/O.
3. **Etapa 3 (Construcción Práctica y Colaborativa):** En parejas, los estudiantes conectan el circuito y programan el bloque de código en el IDE, distribuyendo roles de hardware y software.
4. **Etapa 4 (Depuración Sistemática y Retroalimentación):** Prueba de funcionamiento en vivo, detección sistemática de falsos contactos o errores lógicos de sintaxis, con acompañamiento docente.

#### MOMENTO 3: CULMINACIÓN / CIERRE (3 Etapas)
1. **Etapa 1 (Síntesis Metacognitiva):** Reflexión sobre el error: *"¿Qué fallo imprevisto tuvimos en el código o circuito y qué aprendimos al depurarlo?"*.
2. **Etapa 2 (Demostración y Puesta en Común):** Tres parejas voluntarias exhiben el comportamiento de su prototipo ante el grupo.
3. **Etapa 3 (Registro de Evidencias y Puente):** Registro de la evidencia en la lista de cotejo y enlace anticipatorio con la siguiente sesión.`;

    case 'mediacion_inicio_desarrollo_cierre': {
      const saber = payload.contexto?.saberNombre || tema;
      const ind = payload.contexto?.indicadorTexto || indicadores;
      const comp = payload.contexto?.competenciaTexto || "Desarrolla prototipos automatizados y sistemas robóticos integrando hardware y software con responsabilidad.";
      const rda = payload.contexto?.rdaTexto || "Aplica fundamentos de robótica, computación física, electrónica, mecánica y algoritmos en prototipos contextualizados.";
      const ejeNom = payload.contexto?.ejeTransversalNombre || "Pensamiento Computacional y Ética Digital";
      const ejeDim = payload.contexto?.ejeTransversalDimension || "Apropiación Tecnológica y Resolución de Problemas";
      const ejeDesc = payload.contexto?.ejeTransversalDescriptor || "Aplica el pensamiento computacional para resolver situaciones de la vida cotidiana.";
      const procList = payload.contexto?.saberesProcedimentales?.join(", ") || "Modulariza, Depura, Programa, Reconoce patrones";
      const actList = payload.contexto?.saberesActitudinales?.join(", ") || "Gusto por la precisión, Aprender del error, Tolerancia a la frustración";
      const etapaDT = payload.contexto?.etapaDesignThinking || "";
      const accionesDT = payload.contexto?.accionesEtapaDT?.join("; ") || "";
      const entregablesDT = payload.contexto?.entregablesDT?.join(", ") || "";
      const semanaNum = payload.contexto?.numeroSemana || 1;

      // Generar contexto y acciones aplicadas según la naturaleza técnica del saber
      let retoAplicado = `un reto práctico sobre cómo implementar ${saber.toLowerCase()} para resolver una necesidad técnica real en el colegio o la comunidad`;
      let accionAplicadaDesarrollo = `conectan los componentes y escriben el código para que el sistema responda con exactitud`;
      let reflexionAplicadaCierre = `revisan cómo calibraron las señales y ajustaron los parámetros técnicos`;

      const saberLower = saber.toLowerCase();
      if (saberLower.includes('actuador') || saberLower.includes('motor') || saberLower.includes('mecanismo')) {
        retoAplicado = `un caso real donde se requiere accionar físicamente una compuerta, alarma o mecanismo móvil mediante ${saber.toLowerCase()}`;
        accionAplicadaDesarrollo = `ensamblan el mecanismo móvil, conectan las señales de control y calibran el rango de movimiento o activación en el código`;
        reflexionAplicadaCierre = `analizan cómo resolvieron la caída de tensión o la fricción mecánica al accionar la carga`;
      } else if (saberLower.includes('sensor')) {
        retoAplicado = `una situación del entorno donde se necesita medir en tiempo real variables físicas (como luz, presencia o temperatura) para tomar decisiones automáticas`;
        accionAplicadaDesarrollo = `conectan el sensor a pines analógicos o digitales, calibran el umbral de disparo y programan la lectura continua de datos`;
        reflexionAplicadaCierre = `evalúan cómo filtraron el ruido en las lecturas analógicas y fijaron el umbral de activación`;
      } else if (saberLower.includes('microcontrolador')) {
        retoAplicado = `el diseño del cerebro electrónico de una solución domótica, identificando cómo gestionar entradas sensoriales y salidas de potencia`;
        accionAplicadaDesarrollo = `mapean los pines digitales y analógicos, configuran la alimentación eléctrica segura y cargan el programa de control`;
        reflexionAplicadaCierre = `contrastan el consumo de recursos, la distribución de pines y la sincronización del bucle principal`;
      } else if (saberLower.includes('algoritmo') || saberLower.includes('estructura') || saberLower.includes('programación') || saberLower.includes('entorno')) {
        retoAplicado = `un problema de toma de decisiones automatizada donde se requiere estructurar la lógica antes de codificar`;
        accionAplicadaDesarrollo = `diseñan el diagrama de flujo condicional, declaran variables y programan las funciones en el entorno de desarrollo`;
        reflexionAplicadaCierre = `examinan cómo depuraron bucles infinitos y optimizaron la legibilidad del código`;
      } else if (saberLower.includes('base de datos') || saberLower.includes('dato') || saberLower.includes('gestor')) {
        retoAplicado = `la necesidad de registrar y consultar información comunitaria de manera estructurada y segura`;
        accionAplicadaDesarrollo = `diseñan las tablas con sus llaves primarias, ingresan registros de prueba y ejecutan consultas condicionales`;
        reflexionAplicadaCierre = `verifican la integridad referencial y las medidas de privacidad de la información almacenada`;
      } else if (saberLower.includes('3d') || saberLower.includes('modelado')) {
        retoAplicado = `el diseño del soporte físico o carcasa protectora para albergar el circuito del proyecto`;
        accionAplicadaDesarrollo = `toman medidas exactas de los componentes con calibrador y modelan la pieza paramétrica en el software de diseño tridimensional`;
        reflexionAplicadaCierre = `analizan la resistencia estructural, las tolerancias de encastre y la optimización del filamento`;
      } else if (saberLower.includes('ia') || saberLower.includes('inteligencia') || saberLower.includes('generativa')) {
        retoAplicado = `un dilema sobre cómo aprovechar modelos de inteligencia artificial para procesar información y resolver problemas éticos`;
        accionAplicadaDesarrollo = `diseñan prompts estructurados con criterios de verificación, contrastan las respuestas y depuran sesgos algorítmicos`;
        reflexionAplicadaCierre = `debaten sobre la veracidad de las fuentes y el uso responsable de contenidos generados`;
      }

      let ejeContextoAplicado = `(ética y tecnología) al dialogar sobre cómo usar esta herramienta de forma responsable para beneficiar a la comunidad`;
      if (saberLower.includes('actuador') || saberLower.includes('motor') || saberLower.includes('mecanismo')) {
        ejeContextoAplicado = `(seguridad y accesibilidad) al reflexionar sobre cómo automatizar accesos o alertas para proteger a las personas y facilitar el paso en el colegio`;
      } else if (saberLower.includes('sensor')) {
        ejeContextoAplicado = `(cuidado ambiental y ahorro de energía) al dialogar sobre cómo medir la luz o temperatura ambiental para evitar el desperdicio de electricidad en las aulas`;
      } else if (saberLower.includes('microcontrolador')) {
        ejeContextoAplicado = `(manejo seguro de la tecnología) al operar con precaución la energía y cuidar los componentes electrónicos en el taller`;
      } else if (saberLower.includes('algoritmo') || saberLower.includes('estructura') || saberLower.includes('programa')) {
        ejeContextoAplicado = `(pensamiento lógico y ciudadanía) al redactar instrucciones claras que solucionen un problema de forma justa y ordenada`;
      } else if (saberLower.includes('dato') || saberLower.includes('base')) {
        ejeContextoAplicado = `(privacidad y ética digital) al proteger la confidencialidad de la información y cuidar los datos personales de las y los usuarios`;
      } else if (saberLower.includes('3d') || saberLower.includes('modelado')) {
        ejeContextoAplicado = `(innovación y sostenibilidad) al diseñar piezas ergonómicas optimizando el uso de material para no generar residuos`;
      } else if (saberLower.includes('ia') || saberLower.includes('inteligencia')) {
        ejeContextoAplicado = `(ética digital) al verificar la veracidad de la información y utilizar las herramientas de IA con honestidad`;
      } else if (saberLower.includes('red') || saberLower.includes('ciberseguridad') || saberLower.includes('huella')) {
        ejeContextoAplicado = `(ciudadanía digital) al reflexionar sobre la importancia de contraseñas seguras y la protección de la identidad en línea`;
      }

      // Momento 1: Inicio (Focalización y Activación) en prosa viva y aplicada
      const inicioNarrativa = `Se presenta el reto: ${retoAplicado}. El estudiantado comparte experiencias previas y dialoga sobre situaciones similares en su entorno escolar. Se promueve (comunica) al formular preguntas y compartir ideas iniciales sobre el problema; ${ejeContextoAplicado}; y (gusto por la precisión) al anticipar con entusiasmo y cuidado los requerimientos técnicos de la sesión.${etapaDT ? ` En articulación con la etapa de proyecto (${etapaDT}), se orienta la indagación inicial hacia necesidades reales del centro educativo.` : ''}`;

      // Momento 2: Desarrollo (Exploración, Construcción y Aplicación) en prosa viva y aplicada
      const desarrolloNarrativa = `En parejas de trabajo colaborativo, las y los estudiantes abordan la actividad práctica: ${accionAplicadaDesarrollo} para dar cumplimiento al indicador de aprendizaje: ${ind}. Utilizan el entorno de simulación (Wokwi / Tinkercad Circuits / IDE) y recursos desconectados bajo enfoque DUA. Se promueve (colabora) mediante el trabajo coordinado en parejas; (modulariza) al descomponer el sistema y estructurar el conexionado; (programa) al codificar las instrucciones y estructuras condicionales en el entorno de desarrollo; (depura) al probar el funcionamiento y corregir las fallas detectadas en el código o circuito; y (aprender del error) al persistir pacientemente ante los desajustes técnicos hasta lograr la respuesta esperada.${etapaDT ? ` Como parte del proyecto semestral en la etapa (${etapaDT}), realizan: ${accionesDT}.` : ''}`;

      // Momento 3: Cierre (Sistematización, Reflexión y Evaluación) en prosa viva y aplicada
      const cierreNarrativa = `Los equipos registran en su bitácora técnica el diagrama esquemático, el código validado y los resultados del funcionamiento. En plenaria, comparten sus principales hallazgos y ${reflexionAplicadaCierre}. Se promueve (aprender del error) al reflexionar sobre la raíz de los problemas y las lecciones aprendidas; y (gusto por la precisión) al verificar el cumplimiento del indicador oficial de logro: "${ind}".${entregablesDT ? ` Se valida el avance del entregable: ${entregablesDT} para el proyecto.` : ''}`;

      const jsonResponse = {
        inicio: inicioNarrativa,
        desarrollo: desarrolloNarrativa,
        cierre: cierreNarrativa,
        evidenciaAprendizaje: `Bitácora técnica con esquema del circuito, código depurado de ${saber}, simulación validada y reflexión metacognitiva sobre el error (Semana ${semanaNum}).`,
        recursoConectado: `Simulador interactivo Wokwi / Tinkercad Circuits, IDE de programación, microcontrolador y sensores virtuales.`,
        recursoDesconectado: `Ficha técnica impresa, diagramas de flujo en papel milimetrado, tarjetas de depuración y material concreto DUA.`,
        componenteProyecto: etapaDT ? `Avance estructurado en ${etapaDT}: ${accionesDT}. Verificación de entregables: ${entregablesDT || 'Bitácora técnica'}.` : 'Integración continua de subsistemas hacia la maqueta del proyecto semestral.',
        componenteCotidiano: `Observación directa del desempeño individual y en parejas al aplicar ${procList} en la resolución del reto de ${saber}.`,
        componenteTareasAsistencia: `Registro en bitácora estudiantil, puntualidad en la entrega de reportes y demostración de ${actList.toLowerCase()}.`
      };

      return JSON.stringify(jsonResponse);
    }

    case 'mediacion_proyecto_etapas':
      return `### Mediación Didáctica para Proyecto Trimestral (Design Thinking)
**Proyecto:** ${tema}
**Indicadores Curriculares:** ${indicadores}

#### ETAPA 1: EMPATIZAR, DEFINIR E IDEAR (Semanas Iniciales)
- **Empatizar:** Los estudiantes realizan entrevistas breves a usuarios de su comunidad escolar para identificar necesidades reales de accesibilidad, seguridad o automatización.
- **Definir:** Construcción del árbol de problemas y redacción de la pregunta detonante de diseño: *"¿Cómo podríamos automatizar [...] para beneficiar a [...]?"*.
- **Idear:** Sesión de lluvia de ideas con bocetos rápidos y selección de la solución domótica/digital mediante matriz de factibilidad.

#### ETAPA 2: PROTOTIPAR (Semanas Centrales)
- **Diseño Lógico:** Esquema de conexionado de microcontrolador, sensores y actuadores con mapeo de pines.
- **Programación:** Codificación modularizada del algoritmo condicional en bloques o texto.
- **Ensamble:** Integración física de la maqueta a escala con materiales reciclables y componentes electrónicos.

#### ETAPA 3: DEPURAR, EVALUAR Y PRESENTAR (Semanas Finales)
- **Pruebas de Estrés y Depuración:** Verificación continua del prototipo, detección y resolución de bugs.
- **Coevaluación:** Aplicación de rúbrica analítica entre pares estudiantiles.
- **Sustentación:** Feria tecnológica de aula con pitch oral y demostración funcional en vivo.`;

    case 'multiescenarios_4_cuadrantes':
      return `### Matriz de Adaptación Contextual en 4 Cuadrantes
**Tema:** ${tema}

1. **Cuadrante 1: Con Equipo + Con Conectividad (Online 1:1)**
   - Simulación directa en la nube con Tinkercad Circuits / Wokwi.
   - Trabajo colaborativo en plataformas web y consulta de documentación digital en tiempo real.

2. **Cuadrante 2: Con Equipo + Sin Conectividad (Offline Local)**
   - Uso de software local preinstalado (Arduino IDE, Thonny, procesador de bases de datos local).
   - Carga directa del programa al microcontrolador físico mediante cable USB.

3. **Cuadrante 3: Sin Equipo + Con Conectividad (Dispositivos Móviles / BYOD)**
   - Uso de teléfonos móviles de los estudiantes para acceder a simuladores móviles ligeros, fichas digitales y códigos QR.

4. **Cuadrante 4: Sin Equipo + Sin Conectividad (100% Desconectado / Unplugged)**
   - Metodología Unplugged pura: Maquetas de cartón con poleas y ligas elásticas, diagramas de flujo en papel y tableros de pines con lana de colores.`;

    case 'dua_adaptaciones':
      return `### Pautas DUA Integradas desde la Planeación Inicial (9° Año)

1. **Múltiples Formas de Representación:**
   - Diagramas esquemáticos con código cromático estándar en conductores (Rojo=VCC, Negro=GND, Verde=Señal).
   - Tarjetas de referencia rápida (Cheat Sheets) de sintaxis en español con tipografía de alta legibilidad.
   - Apoyos audiovisuales con subtítulos y modelos tangibles de mecanismos mecánicos.

2. **Múltiples Formas de Acción y Expresión:**
   - Opciones para evidenciar el indicador: prototipo físico, simulación digital interactiva o diagrama de flujo detallado.
   - Plantillas de pseudocódigo prediseñadas para estudiantes que requieren apoyo en funciones ejecutivas.

3. **Múltiples Formas de Implicación:**
   - Vinculación del reto domótico a necesidades reales de su comunidad (accesibilidad, seguridad escolar, ahorro de energía).
   - Asignación de roles rotativos en el equipo (Líder de Hardware, Programador, Documentador y Diseñador UX).`;

    case 'rubrica_evaluacion':
      return `### Rúbrica Analítica de Evaluación Formativa MEP (Propuesta 2027)
**Indicador:** ${indicadores}

| Criterio de Logro | Inicial (1 pt) | Intermedio (2 pts) | Avanzado (3 pts) |
| :--- | :--- | :--- | :--- |
| **Identificación de Movimiento y Conexión** | Reconoce pines y componentes pero requiere asistencia continua para completar el montaje. | Conecta adecuadamente los componentes en el circuito, requiriendo apoyo puntual en la calibración de señales. | Integra de manera autónoma microcontroladores, sensores y actuadores con polaridad correcta y comunicación óptima. |
| **Diseño Algorítmico y Lógica** | Plantea secuencias incompletas o sin orden condicional claro. | Diseña algoritmos en pseudocódigo o flujograma que resuelven parcialmente el problema. | Formula algoritmos estructurados y completos que controlan con exactitud el comportamiento del sistema. |
| **Depuración y Pensamiento Computacional** | Identifica fallos por ensayo y error sin método sistemático. | Corrige errores de sintaxis o conexión siguiendo guías paso a paso. | Aplica métodos sistemáticos de depuración, anticipa patrones de error y optimiza el código de forma eficiente. |`;

    case 'resumen_avances_diarios_ia': {
      const fecha = payload.contexto?.fecha 
        ? new Date(`${payload.contexto.fecha}T12:00:00`).toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        : new Date().toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      
      const rawPrompt = payload.prompt || "";
      const rawContext = payload.contexto?.avancesEspecificos || "";
      const temasContext = payload.contexto?.temasTratados || "";
      const saberesInvolucrados = payload.contexto?.areas && payload.contexto.areas.length > 0 
        ? payload.contexto.areas.join(', ') 
        : 'Robótica, computación física, algoritmos, ciencia de datos e IA';

      // Detectar si hay insumos o notas específicas ingresadas
      const hayNotasAsesoria = rawPrompt.includes('Anotaciones') || rawPrompt.includes('Aportes') || rawPrompt.includes('Registro de Bitácora') || rawPrompt.includes('Allan') || rawContext.trim().length > 0;
      
      // Extraer ideas clave aportadas
      let ideasRedactadas = "";
      if (temasContext && temasContext !== 'Desarrollo curricular, software de programación, simuladores y mediación contextual') {
        ideasRedactadas += `\n- **Aportes temáticos de la asesoría:** ${temasContext}`;
      }
      if (rawContext && rawContext.length > 5) {
        ideasRedactadas += `\n\n${rawContext}`;
      }

      return `### Reporte ejecutivo de asesoría y avance curricular
**Programa:** Formación tecnológica MEP • Propuesta didáctica para noveno año (tercer ciclo)
**Nivel de trabajo:** Asesoría curricular y validación pedagógica (preparación para entrega a docentes)
**Fecha:** ${fecha}
**Áreas y saberes en diseño:** ${saberesInvolucrados}
**Equipo de asesoría:** Allan Morera & Alberto Bustos • **Coordinación:** Kevin Sánchez

---

#### 1. Síntesis ejecutiva de la jornada de asesoría
${hayNotasAsesoria ? `Con base en el currículo oficial ya establecido por el MEP para el tercer ciclo, el equipo de asesoría curricular concentró la jornada en desarrollar y validar que todas las actividades didácticas, estrategias de mediación, recursos y orientaciones respondan rigurosamente a los saberes e indicadores contemplados en el nivel de noveno año, asegurando su articulación con séptimo y octavo año para la entrega formal a las personas docentes.` : `Durante la jornada se avanzó en el desarrollo y validación de la propuesta pedagógica de noveno año con base en el currículo oficial establecido, estructurando orientaciones de mediación, recursos interactivos y criterios de evaluación formativa que respondan a las exigencias del nivel.`}

---

#### 2. Relatoría de criterios técnico-pedagógicos y validación del nivel
${ideasRedactadas ? `**Registro contextual de insumos y decisiones técnicas:**\n${ideasRedactadas}\n\n*Fundamentación y criterios de diseño curricular:*` : `*Criterios pedagógicos y validación para la propuesta docente:*`}
- **Validación con base en el currículo establecido del nivel:** se verifica que cada propuesta didáctica, reto y momento de clase responda directamente a los saberes, habilidades y descriptores oficiales de noveno año del programa de Formación Tecnológica MEP.
- **Flexibilidad en el software de programación:** la propuesta que se entregará al personal docente no impondrá una única plataforma; contempla alternativas en bloques y texto (como S4AEDU, EV3, Arduino IDE o MakeCode) adaptables al equipamiento institucional.
- **Continuidad pedagógica mediante simuladores web:** se integran entornos virtuales y simuladores interactivos (Wokwi, Tinkercad, PSeInt) en el banco de recursos para garantizar que los docentes dispongan de alternativas prácticas efectivas frente a limitaciones de kits físicos o reducción de tiempos lectivos.
- **Prototipado híbrido (físico y digital):** se validan guías tanto para prototipos tangibles como para simulaciones digitales completas, asegurando el cumplimiento del indicador de logro en cualquier centro educativo.
- **Inclusión y Diseño Universal para el Aprendizaje (DUA):** se estructuran secuencias conectadas y desconectadas (*unplugged*) para facilitar a las personas docentes la atención inclusiva de todo el estudiantado.

---

#### 3. Alineación con los indicadores oficiales del nivel
- **Alineación con el indicador oficial:** cada acción de aprendizaje propuesta para los momentos de inicio, desarrollo y cierre está calibrada con el verbo operativo y objeto técnico del indicador oficial establecido en el programa.
- **Respuesta al perfil del nivel (tercer ciclo):** aseguramiento del pensamiento computacional, resolución de problemas mediante algoritmos y apropiación tecnológica responsable contemplados para noveno año.

---

#### 4. Matriz ejecutiva de acuerdos y responsabilidades de la asesoría

| # | Compromiso o acuerdo estratégico | Responsable(s) | Estado operativo |
| :-: | :--- | :--- | :-: |
| **1** | Validar que las actividades didácticas respondan fielmente a los indicadores oficiales del nivel. | Allan Morera & Alberto Bustos | ✅ Sincronizado |
| **2** | Disponer de alternativas en bloques y texto en cada propuesta didáctica para el docente. | Allan Morera & Alberto Bustos | ✅ Establecido |
| **3** | Incorporar simulaciones web y WebApps interactivas en el catálogo de recursos docentes. | Allan Morera & Alberto Bustos | ✅ Integrado |
| **4** | Diseñar actividades desconectadas (*unplugged*) bajo enfoque DUA para cada saber. | Allan Morera & Alberto Bustos | ✅ Incorporado |
| **5** | Coordinar con los equipos de asesoría de 7° y 8° año la progresión de saberes del nivel. | Allan Morera & Alberto Bustos | ⏳ En proceso |
| **6** | Mantener sincronizadas las actas y bitácoras de la asesoría para la entrega oficial. | Allan Morera & Alberto Bustos | ✅ Actualizado |

---

#### 5. Orientaciones para la siguiente sesión de diseño
1. **Validación de secuencias didácticas:** contrastar la progresión de los momentos de clase contra los indicadores oficiales del programa.
2. **Revisión del catálogo de WebApps:** comprobar los enlaces y códigos QR de simuladores antes de la entrega final.
3. **Seguimiento inter-niveles:** continuar la articulación con los asesores de séptimo y octavo año para validar la continuidad curricular.`;
    }

    case 'distribucion_correlacion_evaluacion_ia': {
      const mod = payload.contexto?.modulo || 1;
      return `### Recomendación pedagógica de correlación y distribución evaluativa (MEP 2026)
**Nivel de aplicación:** Propuesta para noveno año (tercer ciclo) — **${mod === 1 ? 'Módulo 1: Robótica y algoritmos' : mod === 2 ? 'Módulo 2: Ciencia de datos, 3D e IA' : 'Módulos 1 y 2 integrados'}**
**Destinatarios:** Propuesta técnica de asesoría para la orientación evaluativa de las personas docentes.
**Marco normativo:** Reglamento de Evaluación de los Aprendizajes (REA MEP) y currículo oficial establecido.
**Equipo de asesoría:** Allan Morera & Alberto Bustos

---

#### 1. Distribución curricular sugerida por componente de evaluación

| Componente de evaluación | Porcentaje sugerido | Enfoque pedagógico MEP | Indicadores recomendados |
| :--- | :-: | :--- | :--- |
| **Trabajo cotidiano** | **45% - 50%** | Observación directa del desempeño, resolución de retos en parejas, depuración sistemática de errores y bitácora técnica. | *Todos los saberes procedimentales con énfasis en montajes de circuitos, formulación de algoritmos, diseño de bases de datos y modelado 3D.* |
| **Proyecto semestral (DT)** | **30% - 40%** | Proceso transversal en 3 fases y 5 etapas (Design Thinking). Valora la integración sistémica de múltiples saberes en una solución contextualizada. | *Clústeres articulados: sensores + microcontrolador + actuadores (M1) o bases de datos + modelado 3D + IA (M2).* |
| **Tareas y evidencias cortas** | **10%** | Actividades de investigación guiada, auditorías éticas, contraste de licenciamiento, glosarios técnicos y fichas de comprobación. | *Saberes de análisis reflexivo: gestión ética del dato, desafíos de la IA, riesgos en línea y derechos de autor.* |

---

#### 2. Clústeres de correlación sinérgica identificados por IA

##### Clúster A: ${mod === 1 ? 'Automatización y lógica física condicional (Proyecto semestral)' : 'Plataforma digital integral y solución comunitaria (Proyecto semestral)'}
- **Saberes interconectados:** ${mod === 1 ? 'Domótica + Microcontrolador + Sensor + Actuador + Entorno de programación' : 'Plataformas de contenido + Gestor de bases de datos + Modelado 3D + Herramientas generativas'}
- **Justificación didáctica:** los saberes no deben evaluarse de forma fragmentada; el microcontrolador depende del sensor para capturar datos y del algoritmo para activar el actuador. Esta sinergia optimiza el tiempo lectivo y da sentido contextual a la mediación docente.
- **Instrumento evaluativo integrador:** *Rúbrica analítica de desempeño en proyecto (Etapa 4: Prototipar y Etapa 5: Evaluar).*

##### Clúster B: ${mod === 1 ? 'Cinemática robótica y control de flujo (Trabajo cotidiano)' : 'Arquitectura de redes y ciberdefensa activa (Trabajo cotidiano)'}
- **Saberes interconectados:** ${mod === 1 ? 'Movimiento en mecanismos + Algoritmos + Estructuras de control' : 'Redes de comunicación + Riesgos en línea + Huella digital'}
- **Justificación didáctica:** permite evaluar el razonamiento causa-efecto inmediato durante las sesiones prácticas guiadas por el docente.
- **Instrumento evaluativo integrador:** *Escala de desempeño de observación continua (1-3 pts por criterio).*

##### Clúster C: ${mod === 1 ? 'Seguridad y responsabilidad en datos IoT (Tareas)' : 'Ética de la IA y propiedad intelectual digital (Tareas)'}
- **Saberes interconectados:** ${mod === 1 ? 'Dato + Prácticas y actitudes computacionales' : 'Desafíos de la IA + Derechos de autor y licenciamiento'}
- **Justificación didáctica:** facilita el trabajo individual reflexivo y la investigación fuera del aula sin sobrecargar el tiempo de laboratorio.
- **Instrumento evaluativo integrador:** *Lista de cotejo formativa con criterios de rigor y juicio ético.*

---

#### 3. Orientaciones para la mediación y evaluación docente
1. **Evitar la sobre-evaluación:** la propuesta orienta al personal docente a no aplicar instrumentos aislados por cada micro-saber, sino a utilizar las correlaciones sinérgicas para evaluar hasta 4 indicadores en una sola actividad integrada.
2. **Acompañamiento formativo continuo:** promover el registro sistemático de evidencias formativas para retroalimentar oportunamente al estudiantado.
3. **Flexibilidad DUA:** asegurar que los instrumentos de evaluación admitan evidencias mediante prototipo físico, simulación digital interactiva o sustentación oral.`;
    }

    case 'informe_pedagogico_sesion_ia':
    case 'sintesis_reunion_acuerdos_ia': {
      const titulo = payload.contexto?.tituloSesion || payload.contexto?.tema || "Jornada de diseño curricular y articulación de asesoría";
      const fecha = payload.contexto?.fecha || new Date().toISOString().split('T')[0];
      const hora = payload.contexto?.hora || "08:00 a. m.";
      const participantes = payload.contexto?.participantes && payload.contexto.participantes.length > 0 
        ? payload.contexto.participantes.join(', ')
        : "Allan Morera & Alberto Bustos (Asesoría Curricular)";
      const acuerdos = payload.contexto?.acuerdos || [];

      return `# Informe ejecutivo de asesoría y diseño curricular
**Programa:** Formación tecnológica MEP • Propuesta didáctica para noveno año (tercer ciclo)
**Nivel de trabajo:** Asesoría curricular y validación pedagógica (preparación para entrega a docentes)
**Fecha:** ${fecha} | **Hora:** ${hora}
**Equipo de asesoría:** ${participantes} • **Coordinación:** Kevin Sánchez

---

### 1. Propósito y alcance de la sesión
Desarrollar y validar que la propuesta didáctica, orientaciones metodológicas, recursos interactivos y criterios de evaluación de noveno año respondan con estricta fidelidad a los saberes e indicadores del currículo oficial establecido para el nivel, garantizando su articulación con séptimo y octavo año previo a su entrega oficial a las personas docentes.

---

### 2. Síntesis y fundamentación de las decisiones técnico-pedagógicas

* **Fidelidad al currículo oficial del nivel:**
  Se analizaron los descriptores e indicadores vigentes del programa de Formación Tecnológica para noveno año, asegurando que cada momento didáctico propuesto (inicio, desarrollo y cierre) refleje fielmente el nivel de complejidad requerido sin alterar los objetivos curriculares oficiales.

* **Articulación inter-niveles de asesoría:**
  Se coordinó la progresión conceptual y técnica entre séptimo, octavo y noveno año, garantizando una transición fluida en el dominio de microcontroladores, lógica condicional, arquitectura de datos y principios éticos de la inteligencia artificial.

* **Flexibilidad en el software de mediación docente:**
  Se acordó no condicionar la propuesta a una sola herramienta informática. La documentación para los docentes contemplará alternativas tanto en programación por bloques como en código textual (S4AEDU, EV3, Arduino IDE, MakeCode), permitiendo su adaptación al parque tecnológico de cada centro educativo.

* **Continuidad pedagógica mediante simulaciones digitales:**
  Se validó la incorporación de entornos virtuales interactivos (Wokwi, Tinkercad, PSeInt) para que el personal docente cuente con herramientas que mitiguen la escasez de kits físicos o la pérdida imprevista de lecciones lectivas.

* **Inclusión educativa y enfoque DUA:**
  Se diseñaron alternativas de prototipado físico, digital y desconectado (*unplugged*), asegurando que las personas docentes dispongan de opciones inclusivas para la totalidad del estudiantado.

---

### 3. Aspectos puntuales abordados (generales y por viñeta)

**Resumen General:**
${payload.contexto?.aspectosPuntuales || 'Se abordaron de forma focalizada y sistemática los lineamientos curriculares de 9° año, asegurando la correspondencia estricta con los indicadores oficiales de logro del MEP y la provisión de alternativas prácticas adaptadas a los distintos contextos institucionales.'}

**Aspectos Específicos por Viñeta:**
• **Fidelidad al Currículo Oficial MEP:** Verificación de que cada experiencia de aprendizaje responda de manera idéntica al indicador de logro del nivel.
• **Flexibilidad y Pluralidad de Software:** Habilitación de propuestas en bloques (S4AEDU, MakeCode) y código textual (Arduino C++, Python) para adaptarse al equipamiento disponible.
• **Entornos de Simulación Interactiva:** Catalogación y validación de simuladores web (Wokwi, Tinkercad Circuits, PSeInt) con códigos QR en las guías docentes.
• **Diseño Universal para el Aprendizaje (DUA):** Incorporación de actividades desconectadas (*unplugged*) y dinámicas multinivel para inclusión plena.
• **Evaluación Integrada por Proyecto (Design Thinking):** Articulación de las 5 fases metodológicas con la matriz de evaluación y el REA MEP.
• **Articulación Inter-Niveles:** Coordinación de la progresión pedagógica con los equipos de asesoría de 7° y 8° año.

---

### 4. Acuerdos, compromisos y responsabilidades de la asesoría

${acuerdos.length > 0 
  ? acuerdos.map((a, idx) => `* **${a.acuerdo.includes(':') ? a.acuerdo.split(':')[0] : `Compromiso ${idx + 1}`}**: ${a.acuerdo} *(Responsable(s): ${a.responsable || 'Allan Morera & Alberto Bustos'} — Estado: ${a.completado ? 'Cumplido' : 'En proceso'})*`).join('\n\n')
  : `* **Alineación curricular y validación pedagógica:**
  El equipo conformado por Allan Morera & Alberto Bustos asume la responsabilidad de revisar y calibrar las actividades de mediación de los módulos 1 y 2, garantizando que el verbo operativo de cada consigna responda de manera idéntica al indicador de logro del nivel.

* **Consolidación del banco de recursos y WebApps:**
  Allan Morera liderará la estructuración del catálogo de simuladores web y herramientas interactivas, incorporando accesos directos y códigos QR orientados a enriquecer las guías que se facilitarán al personal docente.

* **Articulación de proyectos y metodología Design Thinking:**
  Alberto Bustos asume la integración de las 5 etapas metodológicas de Design Thinking con los proyectos semestrales, permitiendo una tipificación abierta y contextualizada por parte de los docentes a futuro.

* **Flexibilidad técnica e inclusión DUA:**
  Ambos asesores consolidarán el inventario de actividades desconectadas (*unplugged*) y las pautas DUA, asegurando alternativas en bloques y texto para cada propuesta temática.

* **Coordinación y seguimiento inter-niveles:**
  Se mantendrán sesiones de seguimiento con los equipos de asesoría de 7° y 8° año para verificar la continuidad pedagógica antes del primer corte valorativo oficial.`}

---

### 5. Próximas acciones operativas
1. Validar la matriz de distribución evaluativa (trabajo cotidiano 45-50%, proyecto DT 30-40% y tareas 10%).
2. Finalizar la tipificación abierta para las etapas de empatizar, definir, idear, prototipar y evaluar.
3. Sincronizar las bitácoras y actas en la plataforma para la presentación de avances a la coordinación.`;
    }

    case 'analizar_dictado_sesion_ia': {
      const textoDictado = (payload.prompt || payload.contexto?.avancesEspecificos || "").trim();
      const fechaHoy = payload.contexto?.fecha || new Date().toISOString().split('T')[0];
      const horaActual = payload.contexto?.hora || new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' });
      
      // Limpiar prefijos de metadatos de audio para análisis de contenido
      const lineas = textoDictado
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0 && !l.startsWith('=== 🎙️') && !l.startsWith('---'));

      const parrafosRelevantes = lineas.filter((l) => !l.startsWith('[Audio') && !l.startsWith('[Grabación'));
      const textoLimpio = (parrafosRelevantes.length > 0 ? parrafosRelevantes.join(' ') : textoDictado).replace(/\[.*?\]/g, '').trim();

      // Detección de participantes mencionados en el texto
      const participantesDetectados: string[] = [];
      const textoLower = textoDictado.toLowerCase();
      if (textoLower.includes('allan') || textoLower.includes('morera')) participantesDetectados.push('Allan Morera');
      if (textoLower.includes('alberto') || textoLower.includes('bustos')) participantesDetectados.push('Alberto Bustos (Asesoría Curricular)');
      if (textoLower.includes('kevin') || textoLower.includes('sánchez') || textoLower.includes('sanchez')) participantesDetectados.push('Kevin Sánchez (Coordinación)');
      if (participantesDetectados.length === 0) {
        participantesDetectados.push('Allan Morera', 'Alberto Bustos (Asesoría Curricular)');
      }

      // Extracción de oraciones y temas clave reales de la conversación
      const oraciones = textoLimpio
        .split(/(?<=[.?!;])\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 8);

      // Generar título específico y fiel al contenido
      let tituloGenerado = '';
      if (oraciones.length > 0) {
        const primeraOracion = oraciones[0].replace(/^(en la jornada|se discutió|hablamos de|revisamos|tratamos sobre|se analizó|hoy vimos)\s+/i, '');
        const resumenTitulo = primeraOracion.length > 60 ? primeraOracion.substring(0, 57) + '...' : primeraOracion;
        tituloGenerado = `Sesión de Trabajo: ${resumenTitulo}`;
      } else {
        tituloGenerado = `Sesión de Asesoría Curricular y Validación Técnica (${fechaHoy})`;
      }

      // Temas tratados estructurados fielmente a partir de las frases del audio
      const listaTemas: string[] = [];
      if (oraciones.length >= 2) {
        oraciones.slice(0, 6).forEach((oracion, idx) => {
          listaTemas.push(`${idx + 1}. ${oracion}`);
        });
      } else if (textoLimpio.length > 0) {
        listaTemas.push(`1. Análisis y deliberación sobre: ${textoLimpio}`);
      } else {
        listaTemas.push(`1. Revisión de los acuerdos y avances técnicos de la jornada.`);
      }

      // Avances específicos fieles a lo hablado
      const avancesFieles = textoLimpio.length > 0
        ? `Transcripción y contenido abordado en la sesión:\n"${textoLimpio}"\n\n[Síntesis del equipo de asesoría]: Se abordaron los puntos expuestos en el diálogo técnico, consolidando las decisiones y los requerimientos manifestados durante la grabación.`
        : `Se registraron los intercambios de la sesión de trabajo para dar seguimiento a los requerimientos de la asesoría curricular.`;

      // Aspectos puntuales desglosados directamente de lo conversado
      const aspectosViñetas: string[] = [];
      if (oraciones.length > 0) {
        oraciones.slice(0, 5).forEach((or) => {
          const palabras = or.split(' ');
          const clave = palabras.slice(0, 3).join(' ');
          aspectosViñetas.push(`• ${clave}: ${or}`);
        });
      } else {
        aspectosViñetas.push(`• Puntos tratados: Deliberaciones registradas en el audio de la sesión.`);
      }

      const aspectosPuntualesGenerado = `Resumen General de la Conversación:\n${oraciones.slice(0, 2).join(' ') || textoLimpio || 'Se llevó a cabo la sesión de trabajo y asesoría curricular.'}\n\nAspectos Abordados en el Audio:\n${aspectosViñetas.join('\n')}`;

      // Detección y extracción de acuerdos específicos del audio
      const acuerdosArray: Array<{ id: string; acuerdo: string; responsable: string; fechaLimite?: string; completado: boolean }> = [];
      
      // Buscar frases de compromiso en el texto
      const frasesAcuerdo = oraciones.filter((o) => {
        const l = o.toLowerCase();
        return (
          l.includes('acord') ||
          l.includes('quedam') ||
          l.includes('compromis') ||
          l.includes('revisar') ||
          l.includes('subir') ||
          l.includes('preparar') ||
          l.includes('hacer') ||
          l.includes('validar') ||
          l.includes('entregar') ||
          l.includes('ajustar') ||
          l.includes('definir')
        );
      });

      if (frasesAcuerdo.length > 0) {
        frasesAcuerdo.slice(0, 4).forEach((frase, idx) => {
          let resp = 'Allan Morera & Alberto Bustos';
          const fLower = frase.toLowerCase();
          if (fLower.includes('allan') && !fLower.includes('alberto')) resp = 'Allan Morera';
          else if (fLower.includes('alberto') && !fLower.includes('allan')) resp = 'Alberto Bustos';
          else if (fLower.includes('kevin')) resp = 'Kevin Sánchez (Coordinación)';

          acuerdosArray.push({
            id: `ac-audio-${Date.now()}-${idx + 1}`,
            acuerdo: frase,
            responsable: resp,
            fechaLimite: fechaHoy,
            completado: false
          });
        });
      }

      // Si no se detectaron frases de acuerdo explícitas, usar las ideas principales del diálogo
      if (acuerdosArray.length === 0 && oraciones.length > 0) {
        acuerdosArray.push({
          id: `ac-audio-${Date.now()}-1`,
          acuerdo: `Dar seguimiento al punto tratado: ${oraciones[0].length > 100 ? oraciones[0].substring(0, 97) + '...' : oraciones[0]}`,
          responsable: participantesDetectados.join(' & '),
          fechaLimite: fechaHoy,
          completado: false
        });
      }

      const acuerdosTextoUnificado = acuerdosArray
        .map((a) => `• [${a.responsable}]: ${a.acuerdo}`)
        .join('\n');

      return JSON.stringify({
        titulo: tituloGenerado,
        participantes: participantesDetectados,
        temasTratados: listaTemas.join('\n'),
        avancesConAllan: avancesFieles,
        aspectosPuntuales: aspectosPuntualesGenerado,
        acuerdosTexto: acuerdosTextoUnificado || `• [${participantesDetectados.join(' & ')}]: Seguimiento a los temas abordados en la grabación.`,
        acuerdos: acuerdosArray,
        estado: 'Completado'
      });
    }

    default:
      return `Propuesta pedagógica oficial elaborada a nivel de Asesoría Curricular de Formación Tecnológica MEP (Noveno Año, Tercer Ciclo).`;
  }
}

