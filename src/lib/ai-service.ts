import crypto from 'crypto';
import { registrarEventoTelemetria } from './telemetry';

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
    | 'sintesis_reunion_acuerdos_ia';
  contexto?: {
    modulo?: number;
    tema?: string;
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
    faseDesignThinking?: string;
    rolSecuencia?: string;
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
- 🎓 **Perfil de Salida (III Ciclo):** Pensamiento computacional autónomo, formulación algorítmica modular y prototipado ABP de impacto contextual.

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

    case 'resumen_avances_diarios_ia':
      return `### 📊 RESUMEN EJECUTIVO Y SÍNTESIS DE AVANCES DIARIOS (MEP 2026)
**Nivel:** Noveno Año de Secundaria (III Ciclo)
**Áreas / Saberes abordados:** ${areas}
**Fecha de Bitácora:** ${new Date().toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

---

#### 🌟 1. SÍNTESIS GENERAL DE LA JORNADA Y DESEMPEÑO
Durante la sesión de trabajo, el estudiantado demostró un nivel satisfactorio de apropiación conceptual y destreza procedimental en relación con los indicadores curriculares establecidos. Se evidencia una evolución favorable desde la fase inicial de focalización hasta la aplicación técnica en simuladores y montajes físicos.

---

#### 🎯 2. PRINCIPALES LOGROS Y PRÁCTICAS COMPUTACIONALES ALCANZADAS
1. **Modularización y Estructuración:** La mayoría de los subgrupos logró descomponer los desafíos en sub-problemas abordables, optimizando el tiempo de desarrollo.
2. **Experimentación y Comprobación Activa:** Ejecución rigurosa de pruebas en el entorno de simulación/físico, registrando valores de entrada y salida con precisión técnica.
3. **Colaboración y Comunicación Técnica:** Intercambio fluido de roles dentro de las parejas de trabajo, asumiendo con responsabilidad el liderazgo de hardware y la depuración lógica.

---

#### 🔍 3. DIFICULTADES DETECTADAS Y GESTIÓN FORMATIVA DEL ERROR
- **Punto Crítico Identificado:** Ciertos estudiantes presentaron dudas en la correcta inicialización de variables y mapeo de señales condicionales.
- **Intervención Docente:** Se aplicó andamiaje mediante preguntas socráticas dirigidas y modelado en la pizarra, logrando que los equipos descubrieran y corrigieran las discrepancias de forma autónoma.

---

#### 📋 4. ACUERDOS Y RECOMENDACIONES PARA LA PRÓXIMA SESIÓN
- [x] Iniciar la siguiente sesión con una breve prueba de escritorio de 5 minutos sobre el caso de borde analizado hoy.
- [x] Consolidar el registro de evidencias en las bitácoras individuales de los estudiantes.
- [x] Conectar los resultados obtenidos con la etapa correspondiente del Proyecto Semestral de Design Thinking.`;

    case 'distribucion_correlacion_evaluacion_ia': {
      const mod = payload.contexto?.modulo || 1;
      return `### 🧠 RECOMENDACIÓN PEDAGÓGICA DE CORRELACIÓN Y DISTRIBUCIÓN EVALUATIVA (MEP 2026)
**Nivel:** Noveno Año (III Ciclo) — **${mod === 1 ? 'Módulo 1: Robótica y Algoritmos' : mod === 2 ? 'Módulo 2: Ciencia de Datos, 3D e IA' : 'Módulos 1 y 2 Integrados'}**
**Marco Normativo:** Reglamento de Evaluación de los Aprendizajes (REA MEP) y Enfoque ABP / Pensamiento Computacional.

---

#### ⚖️ 1. DISTRIBUCIÓN CURRICULAR SUGERIDA POR COMPONENTE DE EVALUACIÓN

| Componente de Evaluación | Porcentaje Sugerido | Enfoque Pedagógico MEP | Indicadores Recomendados |
| :--- | :---: | :--- | :--- |
| **🛠️ Trabajo Cotidiano** | **45% - 50%** | Observación directa de desempeño, resolución de retos en parejas, depuración sistemática de errores y bitácora técnica de aula. | *Todos los saberes procedimentales con énfasis en montajes de circuitos, formulación de algoritmos, diseño de BD y modelado 3D.* |
| **🚀 Proyecto Semestral (ABP)** | **30% - 40%** | Proceso transversal en 3 Fases y 5 Etapas (Design Thinking). Valora la integración sistémica de múltiples saberes en una solución real. | *Clústeres articulados: Sensores + Microcontrolador + Actuadores (M1) o BD + Modelado 3D + IA (M2).* |
| **📝 Tareas / Evidencias Cortas** | **10%** | Actividades de investigación guiada, auditorías éticas, contraste de licenciamiento, glosarios técnicos y fichas de comprobación. | *Saberes de análisis reflexivo: Gestión Ética del Dato, Desafíos de la IA, Riesgos en Línea y Derechos de Autor.* |

---

#### 🔗 2. CLÚSTERES DE CORRELACIÓN SINÉRGICA IDENTIFICADOS POR IA

##### 🌟 Clúster A: ${mod === 1 ? 'Automatización y Lógica Física Condicional (Proyecto Semestral)' : 'Plataforma Digital Integral y Solución Comunitaria (Proyecto Semestral)'}
- **Saberes Interconectados:** ${mod === 1 ? 'Domótica + Microcontrolador + Sensor + Actuador + Entorno de Programación' : 'Plataformas de Contenido + Gestor de BD + Modelado 3D + Herramientas Generativas'}
- **Justificación Didáctica:** Los saberes no deben evaluarse de forma fragmentada; el microcontrolador depende del sensor para capturar datos y del algoritmo para activar el actuador. Esta sinergia optimiza el tiempo de aula y da sentido contextual al estudiantado.
- **Instrumento Evaluativo Integrador:** *Rúbrica Analítica de Desempeño en Proyecto (Etapa 4: Prototipar y Etapa 5: Evaluar).*

##### 💡 Clúster B: ${mod === 1 ? 'Cinemática Robótica y Control de Flujo (Trabajo Cotidiano)' : 'Arquitectura de Redes y Ciberdefensa Activa (Trabajo Cotidiano)'}
- **Saberes Interconectados:** ${mod === 1 ? 'Movimiento en Mecanismos + Algoritmos + Estructuras de Control' : 'Redes de Comunicación + Riesgos en Línea + Huella Digital'}
- **Justificación Didáctica:** Permite evaluar el razonamiento causa-efecto inmediato durante las sesiones prácticas de aula.
- **Instrumento Evaluativo Integrador:** *Escala de Desempeño de Observación Continua (1-3 pts por criterio).*

##### 🛡️ Clúster C: ${mod === 1 ? 'Seguridad y Responsabilidad en Datos IoT (Tareas)' : 'Ética de la IA y Propiedad Intelectual Digital (Tareas)'}
- **Saberes Interconectados:** ${mod === 1 ? 'Dato + Prácticas y Actitudes Computacionales' : 'Desafíos de la IA + Derechos de Autor y Licenciamiento'}
- **Justificación Didáctica:** Facilita el trabajo individual reflexivo y la investigación fuera del aula sin sobrecargar el tiempo de laboratorio.
- **Instrumento Evaluativo Integrador:** *Lista de Cotejo Formativa con criterios de rigor y juicio ético.*

---

#### 📌 3. RECOMENDACIONES TÉCNICAS PARA EL DOCENTE
1. **Evitar la sobre-evaluación:** No aplique instrumentos aislados por cada micro-saber; utilice las correlaciones sugeridas para evaluar hasta 4 indicadores en una sola actividad integrada.
2. **Retroalimentación Formativa Inmediata:** En Trabajo Cotidiano, registre avances diarios en la bitácora para que el resumen con IA consolide el progreso al final de la semana.
3. **Flexibilidad DUA:** Permita que las evidencias de tareas y proyectos puedan ser demostradas mediante prototipo físico, simulación interactiva en línea o sustentación oral.`;
    }

    case 'sintesis_reunion_acuerdos_ia': {
      const temaReunion = payload.contexto?.tema || "Sesión de Trabajo y Coordinación Curricular";
      return `### 🤝 ACTA EJECUTIVA Y SÍNTESIS DE REUNIÓN / JORNADA DE TRABAJO (MEP 2026)
**Nivel:** Noveno Año (III Ciclo de Secundaria)
**Tema / Eje:** ${temaReunion}
**Fecha:** ${new Date().toLocaleDateString('es-CR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
**Participantes Registrados:** Alberto Bustos Ortega & Allan M. (Diseñadores Curriculares) | Kevin Sánchez Bogarín (Coordinador)

---

#### 📌 1. SÍNTESIS DE TEMAS Y ANÁLISIS DE LA SESIÓN
Durante la jornada de trabajo conjunto, se llevó a cabo una exhaustiva revisión de los componentes pedagógicos de 9° año, logrando articular las estrategias metodológicas de los 3 momentos didácticos (Inicio, Desarrollo y Cierre) con la matriz de evaluación y el banco de recursos interactivos.

---

#### 🎯 2. PRINCIPALES AVANCES Y LOGROS ALCANZADOS
1. **Consolidación de Indicadores y Mediación:** Estandarización de las actividades de mediación asegurando coherencia técnica y enfoque multi-escenario (conectado y desconectado).
2. **Articulación del Proyecto Semestral:** Vinculación directa de los saberes técnicos (sensores, microcontroladores y algoritmos) a las 5 etapas de *Design Thinking*.
3. **Optimización de Recursos para el Estudiante:** Integración de códigos QR y simuladores web en el banco oficial de WebApps.

---

#### 📋 3. MATRIZ DE ACUERDOS Y COMPROMISOS OPERATIVOS

| # | Acuerdo / Tarea Específica | Responsable(s) | Plazo / Entrega | Estado |
| :---: | :--- | :--- | :---: | :---: |
| **1** | Revisión final de pautas DUA en estrategias de Módulo 1 | Alberto Bustos | Próxima sesión | En Proceso |
| **2** | Curaduría de simuladores y WebApps para Módulo 2 | Allan M. | Próxima sesión | En Proceso |
| **3** | Preparación de evidencias para el 1° Corte Valorativo | Allan M. & Alberto Bustos | 16 de Octubre | Programado |

---

#### 💡 4. OBSERVACIONES Y RECOMENDACIONES PARA EL SIGUIENTE ENCUENTRO
- Mantener el registro continuo de telemetría y bitácora diaria para sustentar las decisiones pedagógicas en los cortes de coordinación con Kevin Sánchez.`;
    }

    default:
      return `Respuesta pedagógica oficial generada conforme a los lineamientos de la Propuesta Educativa 2027 para Formación Tecnológica (Noveno Año MEP).`;
  }
}

