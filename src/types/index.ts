// Modelado de Datos Oficial - Formación Tecnológica MEP 2026 (III Ciclo - Noveno Año)

export type MomentoTipo = 'inicio' | 'desarrollo' | 'cierre';

export interface MomentoDidacticoDetalle {
  titulo: string;
  descripcion: string;
  tiempoEstimado: string;
  accionesDocente: string[];
  accionesEstudiante: string[];
  preguntasGeneradoras?: string[];
}

export interface EstrategiaMetodologicaIndicador {
  inicio: MomentoDidacticoDetalle;
  desarrollo: MomentoDidacticoDetalle;
  cierre: MomentoDidacticoDetalle;
  recursosSugeridos: {
    conectado: string[];
    desconectado: string[];
  };
  practicasComputacionales: string[]; // e.g. 'Modulariza', 'Abstrae', 'Depura', 'Formula algoritmos'
  actitudesComputacionales: string[]; // e.g. 'Aprender del error', 'Gusto por la precisión'
  pautasDUA: {
    principio: 'Compromiso' | 'Representacion' | 'Accion_Expresion';
    descripcion: string;
  }[];
}

export interface WebAppRecurso {
  id: string;
  titulo: string;
  url: string;
  descripcion?: string;
  momentoAsociado: 'desarrollo' | 'cierre' | 'ambos' | 'apoyo';
  tipo?: 'simulador' | 'herramienta' | 'editor' | 'cuestionario' | 'interactivo' | 'tutorial' | 'offline_pwa' | 'otro';
  esOffline?: boolean;
}

export interface RecursoApoyoAprender {
  conceptosClave: string;
  explicacionTecnica: string;
  analogiaCotidiana: string;
  terminosGlosario: { termino: string; definicion: string }[];
}

export interface RecursoApoyoComprender {
  opcionSeleccionada: 'preguntas_socraticas' | 'estudio_caso' | 'depuracion_error' | 'descomposicion_modular';
  tituloOpcion: string;
  descripcionOpcion: string;
  items: { titulo: string; detalle: string; reflexionEsperada?: string }[];
  analisisCausaEfecto: string;
}

export interface RecursoApoyoSimulacion {
  tipoSimulacion: 'simulador_web' | 'editor_codigo' | 'laboratorio_unplugged' | 'ia_interactiva';
  herramientaRecomendada: string;
  urlHerramienta?: string;
  guiaPasoAPaso: string[];
  codigoOEsquema?: string;
  lenguajeOFormato?: string;
  retoPractico: {
    entradas: string;
    proceso: string;
    salidasEsperadas: string;
    desafioExtra: string;
  };
}

export interface RecursoApoyoValoracion {
  criterioLogro: string;
  niveles: {
    inicial: string;
    intermedio: string;
    avanzado: string;
  };
  preguntasMetacognitivas: string[];
  listaVerificacion: string[];
}

export interface RecursoApoyoCompleto {
  saberId: string;
  saberNombre: string;
  indicador: string;
  areaNombre: string;
  moduloId: number;
  aprender: RecursoApoyoAprender;
  comprender: RecursoApoyoComprender;
  simulacion: RecursoApoyoSimulacion;
  valoracion: RecursoApoyoValoracion;
  promptMaestroGenerado: string;
}

// -------------------------------------------------------------
// EJES TRANSVERSALES OFICIALES MEP 2026 (III CICLO - 9° AÑO)
// -------------------------------------------------------------
export type EjeTransversalTipo = 
  | 'pensamiento_computacional' 
  | 'ciudadania_etica_digital' 
  | 'emprendimiento_innovacion';

export type DimensionPensamientoComputacional = 
  | 'pensamiento_algoritmico' 
  | 'abstraccion' 
  | 'descomposicion' 
  | 'reconocimiento_patrones';

export type DimensionCiudadaniaEticaDigital = 
  | 'ciudadania' 
  | 'etica_digital';

export type DimensionEmprendimientoInnovacion = 
  | 'emprendimiento' 
  | 'innovacion';

export interface DimensionEjeConfig {
  id: string;
  nombre: string;
  descriptor: string;
}

export interface EjeTransversalConfig {
  id: EjeTransversalTipo;
  nombre: string;
  nombreCorto: string;
  icono: string;
  color: string;
  bgLight: string;
  textColor: string;
  borderColor: string;
  descripcion: string;
  dimensiones: DimensionEjeConfig[];
  aplicacionEnNoveno: string;
  ejemplosProyectos: string[];
}

export interface PerfilSalidaRasgoNoveno {
  id: string;
  codigo: string;
  titulo: string;
  descripcion: string;
  dimension: 'Pensamiento Computacional' | 'Prototipado y Robótica' | 'Ciencia de Datos y BD' | 'Fabricación 3D' | 'Ética y Ciudadanía Digital' | 'Prácticas y Actitudes';
  ejesTransversalesAsociados: EjeTransversalTipo[];
}

export interface SaberConceptual {
  id: string;
  nombre: string;
  indicador: string;
  descripcion: string;
  estrategiaMetodologica: EstrategiaMetodologicaIndicador;
  webapps?: WebAppRecurso[];
  recursoApoyo?: RecursoApoyoCompleto;
  etapaProyectoRecomendada?: EtapaProyectoTipo;
  faseProyectoRecomendada?: FaseProyectoTipo;
  ejesTransversales?: EjeTransversalTipo[];
  perfilSalidaRasgos?: string[];
}

export interface AreaConocimiento {
  id: string;
  nombre: string;
  competenciaArea: string; // 1 Competencia oficial por área
  rdaCiclo: string;        // 1 RdA por Ciclo (III Ciclo: 7°, 8°, 9°)
  rda: string;             // Alias compatible
  color: string;
  icono: string;
  saberes: SaberConceptual[];
}

export interface ModuloCurricular {
  id: number;
  nombre: string;
  periodo: string; // 'I Semestre / I Periodo' | 'II Semestre / II Periodo'
  descripcion: string;
  entrelazamientoAreas: string; // Pautas de cómo se entrelazan e integran las áreas en el módulo
  ejeProyectoSemestral: string;
  ejeCiclo: string;             // Eje formativo articulador de III Ciclo
  perfilSalidaCiclo: string[];  // Rasgos del perfil de egreso de III Ciclo que tributa el módulo
  areas: AreaConocimiento[];
}

export interface SaberProcedimental {
  id: string;
  nombre: string;
  observable: string;
}

export interface SaberActitudinal {
  id: string;
  nombre: string;
  observable: string;
}

export type EstadoSeguimientoSaber = 'trabajado' | 'en_proceso' | 'pendiente' | 'descartado';

export interface RegistroSeguimientoSaber {
  saberCurricularId: string;
  saberTipo: 'procedimental' | 'actitudinal';
  saberId: string;
  estado: EstadoSeguimientoSaber;
  fechaActualizacion: string;
}

export type MapaSeguimientoSaberes = Record<string, Record<string, EstadoSeguimientoSaber>>;

// -------------------------------------------------------------
// MODELO DEL PROYECTO: 3 FASES Y 5 ETAPAS (Design Thinking / DT)
// -------------------------------------------------------------
export type FaseProyectoTipo = 'fase1_investigacion' | 'fase2_desarrollo' | 'fase3_evaluacion';

export type EtapaProyectoTipo = 
  | 'etapa1_empatizar' 
  | 'etapa2_definir' 
  | 'etapa3_idear' 
  | 'etapa4_prototipar' 
  | 'etapa5_evaluar_testear';

export interface EtapaProyectoConfig {
  id: EtapaProyectoTipo;
  numero: number;
  nombre: string;
  faseId: FaseProyectoTipo;
  faseNombre: string;
  proposito: string;
  accionesClave: string[];
  entregablesSugeridos: string[];
  semanaSugeridaModulo1: number[];
  semanaSugeridaModulo2: number[];
  indicadorLogro?: string;
  indicadorEvaluacion?: string;
  indicadoresEvaluacion?: string[];
  actividadEnriquecida: {
    inicio: string;
    desarrollo: string;
    cierre: string;
  };
}

export interface FaseProyectoConfig {
  id: FaseProyectoTipo;
  numero: number;
  nombre: string;
  descripcion: string;
  etapas: EtapaProyectoTipo[];
  evidenciasEsperadas: string[];
}

export interface ProyectoSemestral {
  moduloId: 1 | 2;
  tituloProyecto: string;
  problemaContextual: string;
  fases: FaseProyectoConfig[];
  etapas: EtapaProyectoConfig[];
}

// -------------------------------------------------------------
// PLANEAMIENTO SEMANAL Y MEDIACIÓN DIDÁCTICA
// -------------------------------------------------------------
export interface SemanaPlaneamiento {
  id: string;
  numeroSemana: number; // 1 a 18
  moduloId: 1 | 2;
  tituloSemana: string;
  saberesSeleccionados: string[]; // IDs de saberes
  
  // Vinculación con el Proyecto (puede ser dentro de la semana o semana dedicada al proyecto)
  esSemanaDedicadaAProyecto: boolean;
  etapaProyectoAsociada?: EtapaProyectoTipo;
  actividadProyectoEnSemana?: string;

  // Momentos Didácticos de la Semana
  momentoInicio: {
    estrategia: string;
    tiempo: string;
  };
  momentoDesarrollo: {
    estrategia: string;
    tiempo: string;
  };
  momentoCierre: {
    estrategia: string;
    tiempo: string;
  };

  // Multiescenario (Conectado / Desconectado)
  escenarioConectado: string;
  escenarioDesconectado: string;

  // Componentes Oficiales de Evaluación MEP (Proyecto, Cotidiano, Tareas/Asistencia)
  componentesEvaluacion?: {
    proyecto: string;
    cotidiano: string;
    tareasAsistencia: string;
  };

  // Evaluación Formativa y DUA
  evidenciaAprendizaje: string;
  instrumentoEvaluacion: string; // 'Rúbrica analítica', 'Escala de desempeño', 'Lista de cotejo'
  pautaDUAAplicada: string;

  // Saberes y Ejes vinculados
  saberesProcedimentales?: string[];
  saberesActitudinales?: string[];
  ejeTransversalDetalle?: {
    ejeId: EjeTransversalTipo;
    ejeNombre: string;
    dimensionNombre: string;
    descriptor: string;
  };
}

export interface PlaneamientoGlobalNoveno {
  id: string;
  titulo: string;
  cursoLectivo: string;
  institucion: string;
  docente: string;
  moduloActivo: 1 | 2;
  semanas: SemanaPlaneamiento[];
}

// -------------------------------------------------------------
// SISTEMATIZACIÓN Y AUDITORÍA
// -------------------------------------------------------------
export interface RegistroSistematizacion {
  id: string;
  fecha: string;
  equipo: string;
  nivel: string;
  descripcionProceso: string;
  acuerdos: string[];
  evidenciasUrl: string;
  estado: 'En Proceso' | 'Completado' | 'Revisado';
}

// -------------------------------------------------------------
// BITÁCORA Y REGISTRO DIARIO DE ACCIONES CON SÍNTESIS IA
// -------------------------------------------------------------
export interface EntradaRegistroDiario {
  id: string;
  saberId: string;
  saberNombre: string;
  indicadorTexto?: string;
  areaNombre?: string;
  moduloId?: number;
  fecha: string; // Formato YYYY-MM-DD
  hora: string;  // Formato HH:mm
  textoNota: string; // Texto principal de la anotación
  accionesRealizadas?: string;
  avancesEstudiantes?: string;
  dificultadesObservadas?: string;
  acuerdosSiguienteSesion?: string;
}

export interface ResumenDiarioIA {
  id: string;
  fecha: string;
  totalEntradas: number;
  saberesInvolucrados: string[];
  sintesisGeneral: string;
  logrosAlcanzados: string[];
  retosYDificultades: string[];
  recomendacionesSiguienteSesion: string[];
  textoCompletoGenerado: string;
  timestamp: string;
}

// -------------------------------------------------------------
// DISTRIBUCIÓN Y CORRELACIÓN DE SABERES PARA EVALUACIÓN MEP
// (Trabajo Cotidiano, Tareas, Proyecto)
// -------------------------------------------------------------
export type ComponenteEvaluacionTipo = 'trabajo_cotidiano' | 'tareas' | 'proyecto' | 'pruebas';

export interface AsignacionIndicadorEvaluacion {
  saberId: string;
  saberNombre: string;
  indicadorTexto: string;
  areaNombre: string;
  areaId: string;
  moduloId: 1 | 2;
  componentes: ComponenteEvaluacionTipo[];
  instrumentoSugerido: string; // 'Rúbrica de proceso', 'Escala de desempeño', 'Lista de cotejo', 'Bitácora', etc.
  observaciones?: string;
  correlacionId?: string; // ID de correlación si pertenece a un clúster
}

export interface CorrelacionIndicadores {
  id: string;
  titulo: string;
  moduloId: 1 | 2 | 'ambos';
  componentePrincipal: ComponenteEvaluacionTipo;
  componentesSecundarios?: ComponenteEvaluacionTipo[];
  saberesIds: string[];
  saberesNombres: string[];
  indicadoresTextos: string[];
  justificacionPedagogica: string;
  actividadIntegradaSugerida: string;
  instrumentoEvaluacion: string;
  esSugerenciaIA?: boolean;
}

export interface MatrizEvaluacionNoveno {
  asignaciones: Record<string, AsignacionIndicadorEvaluacion>;
  correlaciones: CorrelacionIndicadores[];
  ultimaActualizacion: string;
}

// -------------------------------------------------------------
// REUNIONES DE COORDINACIÓN, EQUIPO DE NIVEL Y TRABAJO CON ALLAN
// -------------------------------------------------------------
export type TipoReunion = 
  | 'trabajo_allan' 
  | 'coordinacion' 
  | 'equipo_nivel_9' 
  | 'corte_valorativo' 
  | 'asesoria_mep' 
  | 'otro';

export interface AcuerdoReunion {
  id: string;
  acuerdo: string;
  responsable: string;
  fechaLimite?: string;
  completado: boolean;
}

export interface GrabacionAudioItem {
  id: string;
  nombre: string;
  url: string;
  hora: string;
  duracionSegundos?: number;
  transcripcion?: string;
  timestamp: string;
}

export interface ReunionEquipoNivel {
  id: string;
  tipo: TipoReunion;
  titulo: string;
  fecha: string; // YYYY-MM-DD
  hora: string;  // HH:mm
  participantes: string[];
  temasTratados: string;
  acuerdos: AcuerdoReunion[];
  acuerdosTexto?: string; // Texto unificado de acuerdos y compromisos
  avancesConAllan?: string; // Bitácora específica de co-trabajo con Allan
  aspectosPuntuales?: string; // Aspectos puntuales abordados (generales y por viñeta)
  sintesisIA?: string;
  audioUrl?: string; // Grabación de audio principal vinculada al acta
  audioNombre?: string;
  audiosMultiples?: GrabacionAudioItem[]; // Lista de grabaciones de audio acumuladas en la jornada
  estado: 'Completado' | 'En Proceso' | 'Pendiente';
  adjuntosOEnlaces?: string;
  timestamp: string;
}

// -------------------------------------------------------------
// SISTEMA DE TELEMETRÍA Y AUDITORÍA DE ACCIONES
// -------------------------------------------------------------
export type ModuloTelemetria = 
  | 'EVALUACION' 
  | 'NOTAS_INDICADOR' 
  | 'MEDIACION' 
  | 'REUNIONES_ALLAN' 
  | 'IA_ENGINE' 
  | 'SISTEMATIZACION' 
  | 'EXPORTACION' 
  | 'RECURSOS_ARCHIVOS'
  | 'SISTEMA';

export interface EventoTelemetria {
  id: string;
  timestamp: string; // ISO
  fechaHoraLegible: string;
  modulo: ModuloTelemetria;
  accion: string;
  descripcion: string;
  usuario: string; // 'Allan Morera & Alberto Bustos'
  detalles?: Record<string, any>;
}

// -------------------------------------------------------------
// RECURSOS Y EVIDENCIAS DIGITALES POR COMPONENTE DE EVALUACIÓN
// -------------------------------------------------------------
export interface ArchivoEvidencia {
  id: string;
  saberId: string;
  saberNombre: string;
  indicadorTexto: string;
  moduloId: 1 | 2;
  componenteAsociado: ComponenteEvaluacionTipo; // 'trabajo_cotidiano' | 'proyecto' | 'tareas'
  nombreArchivo: string;
  tipoMime: string;
  tamanoBytes: number;
  tamanoFormateado: string;
  fechaSubida: string; // ISO / YYYY-MM-DD HH:mm
  dataUrl?: string;    // Base64 para vista previa o descarga
  descripcionOpcional?: string;
  categoriaRecurso?: 'guia_didactica' | 'instrumento_evaluacion' | 'evidencia_estudiante' | 'codigo_fuente' | 'otro';
}


