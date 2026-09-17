'use client';

import React, { useState } from 'react';
import { PROYECTOS_SEMESTRALES_NOVENO } from '../../data/proyectoFasesEtapasData';
import { Sparkles, CheckCircle, Calendar, ArrowRight, Lightbulb, Wrench, Presentation, Compass, FileCheck, Target, Award, CheckSquare, FileText, Layers } from 'lucide-react';

export const ProyectoFasesEtapasView: React.FC = () => {
  const [selectedModulo, setSelectedModulo] = useState<1 | 2>(1);
  const [selectedEtapaId, setSelectedEtapaId] = useState<string>('etapa1_empatizar');

  const proyecto = PROYECTOS_SEMESTRALES_NOVENO.find((p) => p.moduloId === selectedModulo);
  if (!proyecto) return null;

  const activeEtapa = proyecto.etapas.find((e) => e.id === selectedEtapaId) || proyecto.etapas[0];

  const getEtapaIcon = (num: number) => {
    switch (num) {
      case 1:
        return Compass;
      case 2:
        return FileCheck;
      case 3:
        return Lightbulb;
      case 4:
        return Wrench;
      case 5:
        return Presentation;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header del Proyecto */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  Componente Proyecto • Metodología Design Thinking (DT)
                </span>
                <span className="text-xs text-zinc-500 font-medium">3 Fases • 5 Etapas de DT</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                {proyecto.tituloProyecto}
              </h1>
              <p className="text-sm text-zinc-600 max-w-4xl leading-relaxed">
                <strong className="text-zinc-800">Marco Metodológico:</strong> {proyecto.problemaContextual}
              </p>
            </div>

            {/* Selector de Módulo */}
            <div className="flex items-center space-x-2 shrink-0 self-start lg:self-center">
              <button
                onClick={() => setSelectedModulo(1)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedModulo === 1 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                🤖 Módulo 1: Robótica (DT)
              </button>
              <button
                onClick={() => setSelectedModulo(2)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedModulo === 2 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                💾 Módulo 2: Datos & IA (DT)
              </button>
            </div>
        </div>
      </div>

      {/* Las 3 Fases del Proyecto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {proyecto.fases.map((fase) => (
          <div
            key={fase.id}
            className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Fase {fase.numero}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                {fase.etapas.length} {fase.etapas.length === 1 ? 'Etapa' : 'Etapas'}
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900">{fase.nombre}</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">{fase.descripcion}</p>

            <div className="pt-2 border-t border-zinc-100">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Evidencias Clave:</span>
              <ul className="list-disc list-inside text-[11px] text-zinc-700 space-y-0.5 mt-1">
                {fase.evidenciasEsperadas.map((ev, idx) => (
                  <li key={idx}>{ev}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Navegador Horizontal de las 5 Etapas */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5 text-emerald-600" />
            Línea de Secuencia: Las 5 Etapas de Design Thinking
          </h2>
          <span className="text-xs text-zinc-500">
            Semanas lectivas sugeridas en el semestre
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {proyecto.etapas.map((etapa) => {
            const Icon = getEtapaIcon(etapa.numero);
            const isSelected = selectedEtapaId === etapa.id;
            const semanas = selectedModulo === 1 ? etapa.semanaSugeridaModulo1 : etapa.semanaSugeridaModulo2;

            return (
              <button
                key={etapa.id}
                onClick={() => setSelectedEtapaId(etapa.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600 shadow-xs'
                    : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-white text-zinc-600 border border-zinc-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-0.5 text-zinc-400" />
                    Sem {semanas.join('-')}
                  </span>
                </div>
                <div className="font-bold text-xs text-zinc-900">{etapa.nombre}</div>
                <div className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">{etapa.faseNombre}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detalle Profundo de la Etapa Seleccionada */}
      {activeEtapa && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {activeEtapa.faseNombre}
              </span>
              <h2 className="text-xl font-bold text-zinc-900 mt-0.5">{activeEtapa.nombre}</h2>
            </div>
            <div className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-lg self-start sm:self-auto">
              Semanas sugeridas de aplicación: {selectedModulo === 1 ? activeEtapa.semanaSugeridaModulo1.join(', ') : activeEtapa.semanaSugeridaModulo2.join(', ')}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Propósito y Acciones Clave */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-xl p-4 space-y-1.5">
                <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">Propósito Pedagógico:</span>
                <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                  {activeEtapa.proposito}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Acciones Clave del Estudiantado:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {activeEtapa.accionesClave.map((acc, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 bg-white border border-zinc-200/80 rounded-xl p-3">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-700 leading-relaxed">{acc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mediación Didáctica Enriquecida de la Etapa (Inicio, Desarrollo, Cierre) */}
              <div className="pt-2 space-y-2">
                <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                  Guía de Mediación para la Etapa (3 Momentos):
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3 space-y-1">
                    <div className="text-[11px] font-bold text-sky-800">1. Inicio de Etapa</div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">{activeEtapa.actividadEnriquecida.inicio}</p>
                  </div>
                  <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 space-y-1">
                    <div className="text-[11px] font-bold text-indigo-800">2. Desarrollo de Etapa</div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">{activeEtapa.actividadEnriquecida.desarrollo}</p>
                  </div>
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 space-y-1">
                    <div className="text-[11px] font-bold text-emerald-800">3. Cierre y Evaluación</div>
                    <p className="text-[11px] text-zinc-600 leading-relaxed">{activeEtapa.actividadEnriquecida.cierre}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Entregables, Indicador de Logro e Indicador de Evaluación de Proyecto */}
            <div className="space-y-4">
              {/* Indicadores Oficiales MEP (Etapa Inicial: Empatizar, Definir, Idear) */}
              {activeEtapa.indicadorLogro && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-1.5 shadow-2xs">
                  <div className="flex items-center space-x-1.5 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Indicador de Logro Oficial (MEP):</span>
                  </div>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {activeEtapa.indicadorLogro}
                  </p>
                </div>
              )}

              {(activeEtapa.indicadoresEvaluacion || activeEtapa.indicadorEvaluacion) && (
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center space-x-1.5 text-indigo-950 font-bold text-xs uppercase tracking-wider">
                    <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Indicador(es) de Evaluación del Proyecto:</span>
                  </div>
                  {activeEtapa.indicadoresEvaluacion && activeEtapa.indicadoresEvaluacion.length > 0 ? (
                    <ul className="space-y-1.5">
                      {activeEtapa.indicadoresEvaluacion.map((ind, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-indigo-950 font-medium leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                      {activeEtapa.indicadorEvaluacion}
                    </p>
                  )}
                </div>
              )}

              {/* Entregables Sugeridos */}
              <div className="bg-white border border-zinc-200 rounded-xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center space-x-1.5 text-zinc-900 font-bold text-xs uppercase tracking-wider">
                  <FileText className="w-4 h-4 text-zinc-600 shrink-0" />
                  <span>Entregables Sugeridos:</span>
                </div>
                <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1">
                  {activeEtapa.entregablesSugeridos.map((ent, idx) => (
                    <li key={idx} className="font-medium">{ent}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
