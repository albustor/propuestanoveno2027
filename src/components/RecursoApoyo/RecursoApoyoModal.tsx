'use client';

import React, { useState } from 'react';
import {
  getRecursoApoyoParaSaber,
  generarPromptMaestroTexto,
} from '../../data/recursosApoyoNovenoData';
import {
  BookOpen,
  Lightbulb,
  Cpu,
  CheckSquare,
  Sparkles,
  Copy,
  Check,
  X,
  ExternalLink,
  Printer,
  FileCode,
  Layers,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Share2,
  Mail,
  Send,
  FileSpreadsheet,
  Download,
  CheckCircle2,
  User,
  GraduationCap,
  MessageSquare,
  Award,
  BarChart3,
  Sliders,
  FileText,
} from 'lucide-react';

interface RecursoApoyoModalProps {
  saberId: string;
  saberNombre: string;
  indicador: string;
  areaNombre: string;
  moduloId: number;
  onClose: () => void;
}

export const RecursoApoyoModal: React.FC<RecursoApoyoModalProps> = ({
  saberId,
  saberNombre,
  indicador,
  areaNombre,
  moduloId,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'aprender' | 'comprender' | 'simulaciones' | 'valoracion' | 'prompt_maestro'>('aprender');
  const [opcionComprender, setOpcionComprender] = useState<'preguntas_socraticas' | 'estudio_caso' | 'depuracion_error' | 'descomposicion_modular'>('preguntas_socraticas');
  const [opcionSimulacion, setOpcionSimulacion] = useState<'simulador_web' | 'editor_codigo' | 'laboratorio_unplugged'>('simulador_web');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Estados para el Formulario de Valoración Formativa
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [seccionEstudiante, setSeccionEstudiante] = useState('9-1');
  const [nivelSeleccionado, setNivelSeleccionado] = useState<'inicial' | 'intermedio' | 'avanzado' | null>(null);
  const [checklistMarcados, setChecklistMarcados] = useState<Record<number, boolean>>({});
  const [respuestasMetacognitivas, setRespuestasMetacognitivas] = useState<Record<number, string>>({});
  const [correoDocente, setCorreoDocente] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mep_correo_docente_default') || 'alberto.bustos.ortega@mep.go.cr';
    }
    return 'alberto.bustos.ortega@mep.go.cr';
  });
  const [mostrarOpcionesDocente, setMostrarOpcionesDocente] = useState(false);
  const [modalPaseEvidencia, setModalPaseEvidencia] = useState(false);
  const [copiadoPase, setCopiadoPase] = useState(false);
  const [copiadoFormsTemplate, setCopiadoFormsTemplate] = useState(false);
  const [copiadoDashboardPrompt, setCopiadoDashboardPrompt] = useState(false);

  const recurso = getRecursoApoyoParaSaber(
    saberId,
    saberNombre,
    indicador,
    areaNombre,
    moduloId,
    opcionComprender,
    opcionSimulacion
  );

  const currentPromptMaestro = generarPromptMaestroTexto(
    saberNombre,
    indicador,
    areaNombre,
    moduloId,
    opcionComprender,
    opcionSimulacion
  );

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentPromptMaestro);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleChecklist = (index: number) => {
    setChecklistMarcados((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleRespuestaMetacognitivaChange = (index: number, val: string) => {
    setRespuestasMetacognitivas((prev) => ({
      ...prev,
      [index]: val,
    }));
  };

  const guardarCorreoDocente = (correo: string) => {
    setCorreoDocente(correo);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mep_correo_docente_default', correo);
    }
  };

  // Generación de texto para el Pase de Evidencia Formativa
  const puntajeObtenido = nivelSeleccionado === 'avanzado' ? 3 : nivelSeleccionado === 'intermedio' ? 2 : nivelSeleccionado === 'inicial' ? 1 : 0;
  const textoNivel = nivelSeleccionado === 'avanzado' ? 'Avanzado (3 pts)' : nivelSeleccionado === 'intermedio' ? 'Intermedio (2 pts)' : nivelSeleccionado === 'inicial' ? 'Inicial (1 pt)' : 'Pendiente de autoasignación';

  const textoPaseEvidencia = `=======================================================
PASE DE EVIDENCIA DE VALORACIÓN FORMATIVA MEP • 9° AÑO
=======================================================
Estudiante: ${nombreEstudiante || 'Estudiante en Práctica Formativa'}
Sección: ${seccionEstudiante}
Fecha: ${new Date().toLocaleDateString('es-CR')}
Saber Curricular: ${saberNombre}
Módulo: ${moduloId} • ${areaNombre}
Indicador MEP: ${indicador}

1. NIVEL DE DESEMPEÑO LOGRADO:
-------------------------------------------------------
Nivel: ${textoNivel} (Puntaje: ${puntajeObtenido}/3 pts)
Criterio: ${recurso.valoracion.criterioLogro}
Descripción del Nivel:
${nivelSeleccionado ? recurso.valoracion.niveles[nivelSeleccionado] : 'No seleccionado'}

2. LISTA DE COTEJO OBSERVABLE:
-------------------------------------------------------
${recurso.valoracion.listaVerificacion
  .map((item, idx) => `[${checklistMarcados[idx] ? 'X' : ' '}] ${item}`)
  .join('\n')}

3. REFLEXIÓN METACOGNITIVA (BITÁCORA):
-------------------------------------------------------
${recurso.valoracion.preguntasMetacognitivas
  .map((q, idx) => `Pregunta: ${q}\nRespuesta: ${respuestasMetacognitivas[idx] || 'Sin respuesta registrada'}\n`)
  .join('\n')}

Propuesta Pedagógica Desarrollada por: Allan Morera & Alberto Bustos
Coordinación: Kevin Sánchez • MEP Costa Rica
=======================================================`;

  const handleCopiarPase = () => {
    navigator.clipboard.writeText(textoPaseEvidencia);
    setCopiadoPase(true);
    setTimeout(() => setCopiadoPase(false), 2000);
  };

  const handleEnviarCorreoDocente = () => {
    const subject = encodeURIComponent(`[Evidencia Formativa 9°] ${saberNombre} - ${nombreEstudiante || 'Estudiante'} (${seccionEstudiante})`);
    const body = encodeURIComponent(textoPaseEvidencia);
    window.open(`mailto:${correoDocente}?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCompartirTeams = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const msg = encodeURIComponent(`Evidencia de Valoración Formativa - Saber: ${saberNombre} (Módulo ${moduloId})`);
    window.open(`https://teams.microsoft.com/share?href=${shareUrl}&msgText=${msg}`, '_blank');
  };

  const handleCompartirClassroom = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(`Valoración Formativa MEP: ${saberNombre}`);
    window.open(`https://classroom.google.com/share?url=${shareUrl}&title=${title}`, '_blank');
  };

  const textoFormsTemplate = `PLANTILLA PARA MICROSOFT FORMS MEP / GOOGLE FORMS
================================================================
Título: Valoración Formativa MEP 9°: ${saberNombre}
Descripción: Evaluación formativa y metacognitiva correspondiente al Módulo ${moduloId} (${areaNombre}). Indicador: ${indicador}

Pregunta 1 (Texto corto): Nombre completo del estudiante
Pregunta 2 (Opción única): Sección (9-1, 9-2, 9-3, 9-4, 9-5)
Pregunta 3 (Opción múltiple / Rúbrica): Seleccione el nivel de logro alcanzado en base a su práctica:
- Inicial (1 pt): ${recurso.valoracion.niveles.inicial}
- Intermedio (2 pts): ${recurso.valoracion.niveles.intermedio}
- Avanzado (3 pts): ${recurso.valoracion.niveles.avanzado}

Pregunta 4 (Casillas de verificación): Marque los criterios de la lista de cotejo que cumplió con éxito:
${recurso.valoracion.listaVerificacion.map((c, i) => `- ${c}`).join('\n')}

${recurso.valoracion.preguntasMetacognitivas.map((q, i) => `Pregunta ${5 + i} (Texto largo): ${q}`).join('\n')}
`;

  const handleCopiarFormsTemplate = () => {
    navigator.clipboard.writeText(textoFormsTemplate);
    setCopiadoFormsTemplate(true);
    setTimeout(() => setCopiadoFormsTemplate(false), 2000);
  };

  const textoPromptDashboard = `Actúa como un Desarrollador Web y Especialista en Analítica Educativa MEP. Crea una plantilla de Dashboard / Cuadro de Mando en Google Sheets o aplicación web en HTML/Tailwind para que un docente de Informática Educativa pueda recolectar y visualizar las valoraciones formativas de sus estudiantes para el saber "${saberNombre}".

Estructura de datos a tabular:
- Estudiante (Nombre)
- Sección (9-1 a 9-5)
- Fecha
- Nivel de Logro (Inicial 1 pt, Intermedio 2 pts, Avanzado 3 pts)
- Criterios de Cotejo Cumplidos (${recurso.valoracion.listaVerificacion.length} criterios)
- Respuestas Metacognitivas

Genera:
1. Las fórmulas de Google Sheets para promediar niveles y calcular porcentaje de logro por sección.
2. Un gráfico sugerido (Barras de distribución por nivel y radar de criterios).
3. Un código HTML/JavaScript independiente de un solo archivo con diseño moderno y soporte para exportar en Excel/PDF.`;

  const handleCopiarPromptDashboard = () => {
    navigator.clipboard.writeText(textoPromptDashboard);
    setCopiadoDashboardPrompt(true);
    setTimeout(() => setCopiadoDashboardPrompt(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 bg-zinc-50/80 flex items-start justify-between">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-800 flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                Recurso Pedagógico 4 Pilares • IA
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                Módulo {moduloId} • {areaNombre}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight">
              {saberNombre}
            </h2>
            <p className="text-xs text-zinc-600 font-medium leading-relaxed max-w-3xl">
              <strong className="text-zinc-800">Indicador MEP:</strong> {indicador}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Navegación de las 4 Dimensiones Pedagógicas + Prompt Maestro */}
        <div className="px-5 sm:px-6 pt-3 border-b border-zinc-200 bg-white flex space-x-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('aprender')}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'aprender'
                ? 'border-sky-600 text-sky-700 bg-sky-50/50'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Aprender (Concepto)</span>
          </button>

          <button
            onClick={() => setActiveTab('comprender')}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'comprender'
                ? 'border-amber-600 text-amber-700 bg-amber-50/50'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>2. Comprender (Razonamiento)</span>
          </button>

          <button
            onClick={() => setActiveTab('simulaciones')}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'simulaciones'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>3. Simulaciones (Práctica)</span>
          </button>

          <button
            onClick={() => setActiveTab('valoracion')}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'valoracion'
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>4. Valoración (Rúbrica)</span>
          </button>

          <button
            onClick={() => setActiveTab('prompt_maestro')}
            className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'prompt_maestro'
                ? 'border-purple-600 text-purple-700 bg-purple-50/50'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Prompt Maestro IA</span>
          </button>
        </div>

        {/* Contenido Dinámico por Dimensión */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-zinc-700">
          {/* TAB 1: APRENDER */}
          {activeTab === 'aprender' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center space-x-2 text-sky-900 font-bold uppercase text-[11px] tracking-wider">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  <span>Fundamentación Conceptual y Principio Técnico</span>
                </div>
                <p className="text-sm font-semibold text-zinc-900 leading-relaxed">
                  {recurso.aprender.conceptosClave}
                </p>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  {recurso.aprender.explicacionTecnica}
                </p>
              </div>

              {/* Analogía Cotidiana */}
              <div className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-4 sm:p-5 space-y-1.5">
                <div className="font-bold text-amber-900 text-xs flex items-center space-x-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Analogía para el Estudiante (Visualización Mental)</span>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed font-medium">
                  {recurso.aprender.analogiaCotidiana}
                </p>
              </div>

              {/* Glosario Clave */}
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
                  Términos Técnicos Esenciales:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {recurso.aprender.terminosGlosario.map((g, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-0.5">
                      <div className="font-bold text-zinc-900 text-xs">{g.termino}</div>
                      <div className="text-[11px] text-zinc-600 leading-snug">{g.definicion}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPRENDER */}
          {activeTab === 'comprender' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Selector de Opción de Comprensión */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Modo de Indagación con IA:
                  </span>
                  <div className="font-bold text-zinc-900 text-xs">
                    {recurso.comprender.tituloOpcion}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setOpcionComprender('preguntas_socraticas')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      opcionComprender === 'preguntas_socraticas'
                        ? 'bg-amber-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    Preguntas Socráticas
                  </button>
                  <button
                    onClick={() => setOpcionComprender('depuracion_error')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      opcionComprender === 'depuracion_error'
                        ? 'bg-amber-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    Depuración de Errores
                  </button>
                  <button
                    onClick={() => setOpcionComprender('estudio_caso')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      opcionComprender === 'estudio_caso'
                        ? 'bg-amber-600 text-white'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    Estudio de Casos
                  </button>
                </div>
              </div>

              {/* Items de Razonamiento */}
              <div className="space-y-3">
                {recurso.comprender.items.map((item, idx) => (
                  <div key={idx} className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-2xs space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10px] inline-flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-bold text-zinc-900 text-xs">{item.titulo}</h4>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium pl-7">
                      {item.detalle}
                    </p>
                    {item.reflexionEsperada && (
                      <div className="ml-7 p-2.5 rounded-xl bg-amber-50/60 border border-amber-100 text-[11px] text-amber-900 leading-relaxed">
                        <strong>Razonamiento esperado:</strong> {item.reflexionEsperada}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Análisis Causa-Efecto */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-1">
                <span className="font-bold text-zinc-900 text-xs uppercase tracking-wider block">
                  Regla de Transformación Causa-Efecto:
                </span>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {recurso.comprender.analisisCausaEfecto}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SIMULACIONES */}
          {activeTab === 'simulaciones' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Selector de Simulación */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Plataforma de Experimentación:
                  </span>
                  <div className="font-bold text-zinc-900 text-xs">
                    {recurso.simulacion.herramientaRecomendada}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex bg-zinc-100 p-1 rounded-xl">
                    <button
                      onClick={() => setOpcionSimulacion('simulador_web')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        opcionSimulacion === 'simulador_web'
                          ? 'bg-indigo-600 text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Simulador Web
                    </button>
                    <button
                      onClick={() => setOpcionSimulacion('editor_codigo')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        opcionSimulacion === 'editor_codigo'
                          ? 'bg-indigo-600 text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Editor Código
                    </button>
                    <button
                      onClick={() => setOpcionSimulacion('laboratorio_unplugged')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                        opcionSimulacion === 'laboratorio_unplugged'
                          ? 'bg-indigo-600 text-white'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      Desconectado
                    </button>
                  </div>

                  {recurso.simulacion.urlHerramienta && (
                    <a
                      href={recurso.simulacion.urlHerramienta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold flex items-center space-x-1 shadow-2xs"
                    >
                      <span>Abrir Simulador</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Guía Paso a Paso */}
              <div className="space-y-2">
                <h4 className="font-bold text-zinc-900 text-xs uppercase tracking-wider">
                  Guía de Experimentación y Montaje:
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {recurso.simulacion.guiaPasoAPaso.map((paso, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl text-xs text-zinc-800 flex items-start space-x-2 font-medium">
                      <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-bold text-[10px] inline-flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{paso.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Código / Esquemático */}
              {recurso.simulacion.codigoOEsquema && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-700 text-[11px] uppercase tracking-wider">
                      Código / Algoritmo de Prueba ({recurso.simulacion.lenguajeOFormato || 'C++ / Pseudocódigo'}):
                    </span>
                  </div>
                  <pre className="p-4 bg-zinc-900 text-zinc-100 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 selection:bg-indigo-500 selection:text-white">
                    <code>{recurso.simulacion.codigoOEsquema}</code>
                  </pre>
                </div>
              )}

              {/* Reto Práctico */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="font-bold text-indigo-950 text-xs flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  <span>Desafío de Desempeño Práctico:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                    <strong className="text-indigo-900 block text-[10px] uppercase">Entradas:</strong>
                    <span className="text-[11px] text-zinc-700">{recurso.simulacion.retoPractico.entradas}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                    <strong className="text-indigo-900 block text-[10px] uppercase">Proceso:</strong>
                    <span className="text-[11px] text-zinc-700">{recurso.simulacion.retoPractico.proceso}</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-indigo-100">
                    <strong className="text-indigo-900 block text-[10px] uppercase">Salida Esperada:</strong>
                    <span className="text-[11px] text-zinc-700">{recurso.simulacion.retoPractico.salidasEsperadas}</span>
                  </div>
                </div>
                {recurso.simulacion.retoPractico.desafioExtra && (
                  <div className="pt-2 text-[11px] text-indigo-900 font-medium border-t border-indigo-100/80">
                    <strong>Desafío Extra (+Plus):</strong> {recurso.simulacion.retoPractico.desafioExtra}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: VALORACIÓN */}
          {activeTab === 'valoracion' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Barra de Identificación del Estudiante & Modo Docente */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-emerald-700 shrink-0" />
                    <input
                      type="text"
                      placeholder="Nombre del estudiante..."
                      value={nombreEstudiante}
                      onChange={(e) => setNombreEstudiante(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-emerald-300 bg-white text-xs font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-48 sm:w-60 shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                    <select
                      value={seccionEstudiante}
                      onChange={(e) => setSeccionEstudiante(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl border border-emerald-300 bg-white text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs cursor-pointer"
                    >
                      <option value="9-1">Sección 9-1</option>
                      <option value="9-2">Sección 9-2</option>
                      <option value="9-3">Sección 9-3</option>
                      <option value="9-4">Sección 9-4</option>
                      <option value="9-5">Sección 9-5</option>
                      <option value="9-6">Sección 9-6</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMostrarOpcionesDocente(!mostrarOpcionesDocente)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-2xs ${
                      mostrarOpcionesDocente
                        ? 'bg-emerald-800 text-white'
                        : 'bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100/60'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{mostrarOpcionesDocente ? 'Ocultar Opciones Docente' : '⚙️ Opciones de Entrega Docente'}</span>
                  </button>
                </div>
              </div>

              {/* Panel Desplegable de Configuración y Opciones del Docente */}
              {mostrarOpcionesDocente && (
                <div className="p-4 bg-zinc-900 text-white rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-150 border border-zinc-800 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                        <Mail className="w-4 h-4" />
                        <span>Correo Electrónico Docente por Defecto (Recepción de Evidencias)</span>
                      </div>
                      <p className="text-[11px] text-zinc-400">
                        Los estudiantes podrán enviar su autoevaluación o coevaluación directamente a esta dirección oficial MEP o personal.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="email"
                        value={correoDocente}
                        onChange={(e) => guardarCorreoDocente(e.target.value)}
                        placeholder="docente@mep.go.cr"
                        className="px-3 py-1 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-zinc-100 font-medium w-64 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                      />
                      <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-800/60">
                        Guardado
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                    <button
                      onClick={() => setModalPaseEvidencia(true)}
                      className="p-3 bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Pase de Evidencia Digital</span>
                        </span>
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">Voucher</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Genera un resumen oficial con puntaje, nivel y bitácora para guardar o copiar.
                      </p>
                    </button>

                    <button
                      onClick={handleEnviarCorreoDocente}
                      className="p-3 bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <Send className="w-4 h-4 text-emerald-400" />
                          <span>Enviar a Correo MEP</span>
                        </span>
                        <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">Mailto</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Abre el cliente de correo con el informe estructurado listo para enviar.
                      </p>
                    </button>

                    <button
                      onClick={handleCompartirTeams}
                      className="p-3 bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <Share2 className="w-4 h-4 text-indigo-400" />
                          <span>Microsoft Teams MEP</span>
                        </span>
                        <span className="text-[10px] bg-indigo-400/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">Teams</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Comparte la ficha directamente en canales de Teams o tareas asignadas.
                      </p>
                    </button>

                    <button
                      onClick={handleCompartirClassroom}
                      className="p-3 bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <Share2 className="w-4 h-4 text-sky-400" />
                          <span>Google Classroom</span>
                        </span>
                        <span className="text-[10px] bg-sky-400/20 text-sky-300 px-1.5 py-0.5 rounded font-mono">Classroom</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Publica como tarea o material didáctico en clases de Google Classroom.
                      </p>
                    </button>

                    <button
                      onClick={handleCopiarFormsTemplate}
                      className="p-3 bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <FileSpreadsheet className="w-4 h-4 text-teal-400" />
                          <span>{copiadoFormsTemplate ? '¡Copiado al Portapapeles!' : 'Plantilla Forms / Excel'}</span>
                        </span>
                        <span className="text-[10px] bg-teal-400/20 text-teal-300 px-1.5 py-0.5 rounded font-mono">Forms</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Copia la estructura de preguntas para duplicar en MS Forms MEP o Google Forms.
                      </p>
                    </button>

                    <button
                      onClick={handleCopiarPromptDashboard}
                      className="p-3 bg-zinc-800/90 hover:bg-zinc-750 border border-zinc-700 rounded-xl text-left transition-all group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <BarChart3 className="w-4 h-4 text-purple-400" />
                          <span>{copiadoDashboardPrompt ? '¡Prompt Copiado!' : 'Prompt Dashboard No-Code'}</span>
                        </span>
                        <span className="text-[10px] bg-purple-400/20 text-purple-300 px-1.5 py-0.5 rounded font-mono">IA + Sheets</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">
                        Prompt para que el docente genere su propio Dashboard en Google Sheets / Web.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* Rúbrica de 3 Niveles Interactiva */}
              <div className="space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                    <CheckSquare className="w-4 h-4 text-emerald-600" />
                    <span>Rúbrica Analítica de Evaluación Formativa MEP</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-semibold text-zinc-500">Puntaje Asignado:</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      nivelSeleccionado === 'avanzado'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : nivelSeleccionado === 'intermedio'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : nivelSeleccionado === 'inicial'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
                    }`}>
                      {puntajeObtenido} / 3 pts ({textoNivel})
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80">
                  <strong className="text-zinc-800">Criterio de Desempeño:</strong> {recurso.valoracion.criterioLogro}
                </p>

                {/* Tarjetas de Selección de Nivel */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  {/* Tarjeta Inicial */}
                  <div
                    onClick={() => setNivelSeleccionado('inicial')}
                    className={`rounded-2xl p-4 space-y-2 cursor-pointer transition-all border-2 ${
                      nivelSeleccionado === 'inicial'
                        ? 'bg-rose-100/70 border-rose-500 shadow-md ring-2 ring-rose-300'
                        : 'bg-rose-50/40 border-rose-200/70 hover:border-rose-300 hover:bg-rose-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-rose-200/80">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-rose-950 text-xs">Inicial (1 pt)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded">Incipiente</span>
                        {nivelSeleccionado === 'inicial' && (
                          <CheckCircle2 className="w-4 h-4 text-rose-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                      {recurso.valoracion.niveles.inicial}
                    </p>
                  </div>

                  {/* Tarjeta Intermedio */}
                  <div
                    onClick={() => setNivelSeleccionado('intermedio')}
                    className={`rounded-2xl p-4 space-y-2 cursor-pointer transition-all border-2 ${
                      nivelSeleccionado === 'intermedio'
                        ? 'bg-amber-100/70 border-amber-500 shadow-md ring-2 ring-amber-300'
                        : 'bg-amber-50/40 border-amber-200/70 hover:border-amber-300 hover:bg-amber-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-amber-950 text-xs">Intermedio (2 pts)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">Autónomo</span>
                        {nivelSeleccionado === 'intermedio' && (
                          <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                      {recurso.valoracion.niveles.intermedio}
                    </p>
                  </div>

                  {/* Tarjeta Avanzado */}
                  <div
                    onClick={() => setNivelSeleccionado('avanzado')}
                    className={`rounded-2xl p-4 space-y-2 cursor-pointer transition-all border-2 ${
                      nivelSeleccionado === 'avanzado'
                        ? 'bg-emerald-100/70 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                        : 'bg-emerald-50/40 border-emerald-200/70 hover:border-emerald-300 hover:bg-emerald-50/70'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-emerald-200/80">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-emerald-950 text-xs">Avanzado (3 pts)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Experto</span>
                        {nivelSeleccionado === 'avanzado' && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                      {recurso.valoracion.niveles.avanzado}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de Cotejo Observable Interactiva */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-900 text-xs uppercase tracking-wider block">
                    Lista de Cotejo Observable (Autoevaluación / Coevaluación):
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                    {Object.values(checklistMarcados).filter(Boolean).length} de {recurso.valoracion.listaVerificacion.length} criterios
                  </span>
                </div>

                <div className="space-y-2">
                  {recurso.valoracion.listaVerificacion.map((item, idx) => (
                    <label
                      key={idx}
                      onClick={() => handleToggleChecklist(idx)}
                      className={`flex items-start space-x-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                        checklistMarcados[idx]
                          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                          : 'bg-white border-zinc-200/80 text-zinc-700 hover:border-zinc-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!checklistMarcados[idx]}
                        onChange={() => {}} // Manejado por onClick del contenedor
                        className="mt-0.5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className="leading-snug">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preguntas Metacognitivas con Cuadro de Respuesta */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center space-x-2 text-sky-950">
                  <MessageSquare className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-xs uppercase tracking-wider">
                    Preguntas de Reflexión Metacognitiva para la Bitácora:
                  </span>
                </div>

                <div className="space-y-3">
                  {recurso.valoracion.preguntasMetacognitivas.map((q, idx) => (
                    <div key={idx} className="space-y-1.5 p-3 bg-white rounded-xl border border-sky-100/90 shadow-2xs">
                      <div className="text-xs font-bold text-sky-900 flex items-start space-x-1.5">
                        <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] inline-flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{q}</span>
                      </div>
                      <textarea
                        rows={2}
                        value={respuestasMetacognitivas[idx] || ''}
                        onChange={(e) => handleRespuestaMetacognitivaChange(idx, e.target.value)}
                        placeholder="Escriba aquí la reflexión o hallazgo de aprendizaje..."
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none font-normal"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Barra de Acciones Finales de Valoración */}
              <div className="p-4 bg-zinc-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center space-x-1.5">
                    <Award className="w-4 h-4" />
                    <span>Resumen Formativo: {textoNivel}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Estudiante: <strong className="text-zinc-200">{nombreEstudiante || 'Sin nombre'}</strong> ({seccionEstudiante}) • {Object.values(checklistMarcados).filter(Boolean).length} criterios cumplidos
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setModalPaseEvidencia(true)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                  >
                    <Award className="w-4 h-4" />
                    <span>Generar Pase de Evidencia</span>
                  </button>

                  <button
                    onClick={handleEnviarCorreoDocente}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center space-x-1.5 transition-all border border-zinc-700"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Enviar a Correo MEP</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROMPT MAESTRO IA */}
          {activeTab === 'prompt_maestro' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-purple-950 text-xs flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Prompt Maestro Estandarizado (Sin Datos Administrativos)</span>
                  </div>
                  <p className="text-[11px] text-purple-800">
                    Formateado y listo para copiar en Google Gemini, ChatGPT, Claude, Groq o DeepSeek.
                  </p>
                </div>

                <button
                  onClick={handleCopyPrompt}
                  className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm shrink-0 self-start sm:self-auto"
                >
                  {copiedPrompt ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPrompt ? '¡Prompt Copiado!' : 'Copiar Prompt Maestro'}</span>
                </button>
              </div>

              <pre className="p-5 bg-zinc-900 text-zinc-100 rounded-2xl font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 select-all whitespace-pre-wrap">
                {currentPromptMaestro}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Modal con Acciones */}
        <div className="p-4 sm:p-5 border-t border-zinc-100 bg-zinc-50/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyPrompt}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copiedPrompt ? '¡Prompt Copiado!' : 'Copiar Prompt Maestro'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" />
              <span>Imprimir Ficha</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 font-bold text-xs transition-colors shadow-sm"
          >
            Cerrar Recurso
          </button>
        </div>
      </div>

      {/* Modal / Overlay del Pase de Evidencia Formativa Digital */}
      {modalPaseEvidencia && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-zinc-100 bg-emerald-50/70 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>Pase de Evidencia Formativa Digital • 9° Año</span>
                </div>
                <h3 className="text-base font-extrabold text-zinc-900">
                  {saberNombre}
                </h3>
                <p className="text-xs text-zinc-600">
                  Estudiante: <strong className="text-zinc-800">{nombreEstudiante || 'Estudiante en Práctica'}</strong> ({seccionEstudiante}) • Nivel: <strong className="text-emerald-700">{textoNivel}</strong>
                </p>
              </div>

              <button
                onClick={() => setModalPaseEvidencia(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <pre className="p-4 bg-zinc-900 text-emerald-400 font-mono text-[11px] leading-relaxed rounded-2xl overflow-x-auto whitespace-pre-wrap select-all border border-zinc-800">
                {textoPaseEvidencia}
              </pre>
            </div>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopiarPase}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
                >
                  {copiadoPase ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  <span>{copiadoPase ? '¡Pase Copiado al Portapapeles!' : 'Copiar Pase de Evidencia'}</span>
                </button>

                <button
                  onClick={handleEnviarCorreoDocente}
                  className="px-3.5 py-2 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 font-semibold text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Enviar a Docente</span>
                </button>
              </div>

              <button
                onClick={() => setModalPaseEvidencia(false)}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 font-bold text-xs transition-colors"
              >
                Cerrar Pase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
