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
              {/* Rúbrica de 3 Niveles */}
              <div className="space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Rúbrica Analítica de Evaluación Formativa MEP</span>
                </div>
                <p className="text-xs text-zinc-600">
                  <strong className="text-zinc-800">Criterio:</strong> {recurso.valoracion.criterioLogro}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="bg-rose-50/50 border border-rose-200/70 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-rose-100">
                      <span className="font-bold text-rose-900 text-xs">Inicial (1 pt)</span>
                      <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded">Incipiente</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      {recurso.valoracion.niveles.inicial}
                    </p>
                  </div>

                  <div className="bg-amber-50/50 border border-amber-200/70 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-amber-100">
                      <span className="font-bold text-amber-900 text-xs">Intermedio (2 pts)</span>
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">Autónomo</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      {recurso.valoracion.niveles.intermedio}
                    </p>
                  </div>

                  <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-emerald-100">
                      <span className="font-bold text-emerald-900 text-xs">Avanzado (3 pts)</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Experto</span>
                    </div>
                    <p className="text-xs text-zinc-700 leading-relaxed">
                      {recurso.valoracion.niveles.avanzado}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista de Cotejo */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-2">
                <span className="font-bold text-zinc-900 text-xs uppercase tracking-wider block">
                  Lista de Cotejo Observable (Autoevaluación / Coevaluación):
                </span>
                <div className="space-y-1.5">
                  {recurso.valoracion.listaVerificacion.map((item, idx) => (
                    <label key={idx} className="flex items-center space-x-2 text-xs text-zinc-700 font-medium cursor-pointer">
                      <input type="checkbox" className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Preguntas Metacognitivas */}
              <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-4 space-y-2">
                <span className="font-bold text-sky-950 text-xs uppercase tracking-wider block">
                  Preguntas de Reflexión Metacognitiva para la Bitácora:
                </span>
                <ul className="list-disc list-inside text-xs text-sky-900 space-y-1 font-medium">
                  {recurso.valoracion.preguntasMetacognitivas.map((q, idx) => (
                    <li key={idx}>{q}</li>
                  ))}
                </ul>
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
    </div>
  );
};
