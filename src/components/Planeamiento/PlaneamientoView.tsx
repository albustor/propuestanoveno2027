'use client';

import React, { useState, useEffect } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { PROYECTOS_SEMESTRALES_NOVENO } from '../../data/proyectoFasesEtapasData';
import { SemanaPlaneamiento, EtapaProyectoTipo, EstrategiaMetodologicaIndicador } from '../../types';
import { Calendar, Plus, Trash2, Clock, Sparkles, Save, CheckCircle2, ChevronRight, FileText, Layers, QrCode, Edit3, ShieldCheck } from 'lucide-react';
import { WebAppRecurso } from '../../types';
import { useWebApps } from '../../lib/useWebApps';
import { getCustomEstrategiaForSaber } from '../../lib/storage';
import { MomentoWebAppsSection } from '../WebApps/MomentoWebAppsSection';
import { WebAppQRModal } from '../WebApps/WebAppQRModal';
import { WebAppAddEditModal } from '../WebApps/WebAppAddEditModal';
import { RecursoApoyoModal } from '../RecursoApoyo/RecursoApoyoModal';
import { EditorActividadMediacionModal } from '../Mediacion/EditorActividadMediacionModal';
import { AnotacionesIndicador } from '../Notas/AnotacionesIndicador';

export const PlaneamientoView: React.FC = () => {
  const [selectedModuloId, setSelectedModuloId] = useState<1 | 2>(1);
  const [semanas, setSemanas] = useState<SemanaPlaneamiento[]>([]);
  const [selectedSemanaNum, setSelectedSemanaNum] = useState<number>(1);
  const [isSaved, setIsSaved] = useState(false);

  const { getWebapps, saveWebapp, deleteWebapp } = useWebApps();

  // Modales
  const [qrModalData, setQrModalData] = useState<{
    webapp: WebAppRecurso;
    saberNombre: string;
    indicadorTexto: string;
  } | null>(null);

  const [addEditModalData, setAddEditModalData] = useState<{
    saberId: string;
    saberNombre: string;
    initialData?: WebAppRecurso | null;
    defaultMomento?: 'desarrollo' | 'cierre' | 'ambos' | 'apoyo';
  } | null>(null);

  // Modal Recurso de Apoyo Pedagógico (4 Pilares)
  const [recursoApoyoModalData, setRecursoApoyoModalData] = useState<{
    saberId: string;
    saberNombre: string;
    indicador: string;
    areaNombre: string;
    moduloId: number;
  } | null>(null);

  // Modal Editor y Re-planteador de Mediación
  const [editorMediacionData, setEditorMediacionData] = useState<{
    saberId: string;
    saberNombre: string;
    indicadorTexto: string;
    areaNombre: string;
    moduloId: number;
    estrategiaBaseOficial: EstrategiaMetodologicaIndicador;
  } | null>(null);

  const modulo = MODULOS_NOVENO_OFICIAL.find((m) => m.id === selectedModuloId);
  const proyecto = PROYECTOS_SEMESTRALES_NOVENO.find((p) => p.moduloId === selectedModuloId);

  // Inicializar 18 semanas preconfiguradas con los saberes oficiales
  useEffect(() => {
    const storageKey = `planeamiento_noveno_modulo_${selectedModuloId}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        setSemanas(JSON.parse(saved));
        return;
      } catch (e) {
        console.error('Error loading saved planeamiento', e);
      }
    }

    // Si no hay datos guardados, generar semanas por defecto
    const initialSemanas: SemanaPlaneamiento[] = [];
    const allSaberes = modulo ? modulo.areas.flatMap((a) => a.saberes) : [];

    for (let i = 1; i <= 18; i++) {
      const saberIndex = (i - 1) % allSaberes.length;
      const saber = allSaberes[saberIndex];

      // Determinar si la semana coincide con una etapa del proyecto
      let etapaAsoc: EtapaProyectoTipo | undefined;
      let esSemanaProyecto = false;
      let actProyecto = '';

      if (proyecto) {
        for (const etapa of proyecto.etapas) {
          const semanasSugeridas = selectedModuloId === 1 ? etapa.semanaSugeridaModulo1 : etapa.semanaSugeridaModulo2;
          if (semanasSugeridas.includes(i)) {
            etapaAsoc = etapa.id;
            actProyecto = `${etapa.nombre}: ${etapa.proposito}`;
            if (i === 17 || i === 18) {
              esSemanaProyecto = true;
            }
            break;
          }
        }
      }

      initialSemanas.push({
        id: `sem_${selectedModuloId}_${i}`,
        numeroSemana: i,
        moduloId: selectedModuloId,
        tituloSemana: `Semana ${i}: ${saber ? saber.nombre : 'Consolidación de Aprendizajes'}`,
        saberesSeleccionados: saber ? [saber.id] : [],
        esSemanaDedicadaAProyecto: esSemanaProyecto,
        etapaProyectoAsociada: etapaAsoc,
        actividadProyectoEnSemana: actProyecto,
        momentoInicio: {
          estrategia: saber ? saber.estrategiaMetodologica.inicio.descripcion : 'Activación de conocimientos previos y contextualización.',
          tiempo: '15 min'
        },
        momentoDesarrollo: {
          estrategia: saber ? saber.estrategiaMetodologica.desarrollo.descripcion : 'Construcción guiada, laboratorio práctico y resolución de retos.',
          tiempo: '50 min'
        },
        momentoCierre: {
          estrategia: saber ? saber.estrategiaMetodologica.cierre.descripcion : 'Sistematización de aprendizajes y evaluación formativa entre pares.',
          tiempo: '15 min'
        },
        escenarioConectado: saber ? saber.estrategiaMetodologica.recursosSugeridos.conectado.join(', ') : 'Simuladores y software educativo.',
        escenarioDesconectado: saber ? saber.estrategiaMetodologica.recursosSugeridos.desconectado.join(', ') : 'Guías impresas y material concreto.',
        evidenciaAprendizaje: `Registro de desempeño y bitácora técnica de la semana ${i}.`,
        instrumentoEvaluacion: 'Escala de Desempeño Formativa MEP',
        pautaDUAAplicada: 'Representación visual y opciones flexibles de expresión.'
      });
    }

    setSemanas(initialSemanas);
  }, [selectedModuloId]);

  const handleSave = () => {
    const storageKey = `planeamiento_noveno_modulo_${selectedModuloId}`;
    localStorage.setItem(storageKey, JSON.stringify(semanas));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const currentSemana = semanas.find((s) => s.numeroSemana === selectedSemanaNum);

  const updateCurrentSemana = (updater: (prev: SemanaPlaneamiento) => SemanaPlaneamiento) => {
    setSemanas((prev) =>
      prev.map((s) => (s.numeroSemana === selectedSemanaNum ? updater(s) : s))
    );
  };

  if (!modulo) return null;

  const allSaberes = modulo.areas.flatMap((a) => a.saberes);

  return (
    <div className="space-y-6">
      {/* Header del Planeador */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
                Mediación Didáctica Oficial 2026
              </span>
              <span className="text-xs text-zinc-500 font-medium">9° Año • 18 Semanas Lectivas</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Planeador Semanal de Mediación Pedagógica
            </h1>
            <p className="text-xs text-zinc-600">
              Estructure las semanas de clase respetando los 3 momentos didácticos (Inicio, Desarrollo y Cierre) e integre hitos del Proyecto semestral.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            {/* Badge Módulo 1 */}
            <div className="px-3.5 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-2xs">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Módulo 1: Robótica & Algoritmos (18 Semanas)</span>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaved ? '¡Guardado!' : 'Guardar Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid de 18 Semanas (Navegación Compacta) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-zinc-700 uppercase tracking-wider flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
            Línea de Semanas Lectivas (1 a 18)
          </span>
          <span className="text-[11px] text-zinc-500">
            Haga clic en una semana para editar su mediación
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-1.5">
          {semanas.map((sem) => {
            const isSelected = selectedSemanaNum === sem.numeroSemana;
            const hasProject = Boolean(sem.etapaProyectoAsociada);

            return (
              <button
                key={sem.numeroSemana}
                onClick={() => setSelectedSemanaNum(sem.numeroSemana)}
                className={`py-2 px-1 rounded-xl text-center border text-xs transition-all relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-xs'
                    : hasProject
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-semibold'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <div className="text-[10px] opacity-75">S</div>
                <div className="font-bold text-sm leading-none mt-0.5">{sem.numeroSemana}</div>
                {hasProject && !isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute bottom-1 left-1/2 -translate-x-1/2"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor de la Semana Seleccionada */}
      {currentSemana && (
        <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header de la Semana */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-900 text-white">
                  Semana {currentSemana.numeroSemana} de 18
                </span>
                {currentSemana.etapaProyectoAsociada && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    Hito del Proyecto Activo
                  </span>
                )}
              </div>
              <input
                type="text"
                value={currentSemana.tituloSemana}
                onChange={(e) =>
                  updateCurrentSemana((prev) => ({ ...prev, tituloSemana: e.target.value }))
                }
                className="text-lg sm:text-xl font-bold text-zinc-900 mt-1.5 w-full bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Asignar Saber Conceptual */}
            <div className="shrink-0 w-full sm:w-80">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                Saber e Indicador Base:
              </label>
              <select
                value={currentSemana.saberesSeleccionados[0] || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const selectedSaber = allSaberes.find((s) => s.id === val);

                  updateCurrentSemana((prev) => {
                    let inicioDesc = prev.momentoInicio.estrategia;
                    let desarrolloDesc = prev.momentoDesarrollo.estrategia;
                    let cierreDesc = prev.momentoCierre.estrategia;

                    if (selectedSaber) {
                      const { estrategia: activeEst } = getCustomEstrategiaForSaber(
                        selectedSaber.id,
                        selectedSaber.estrategiaMetodologica
                      );
                      inicioDesc = activeEst.inicio.descripcion;
                      desarrolloDesc = activeEst.desarrollo.descripcion;
                      cierreDesc = activeEst.cierre.descripcion;
                    }

                    return {
                      ...prev,
                      saberesSeleccionados: val ? [val] : [],
                      tituloSemana: selectedSaber
                        ? `Semana ${currentSemana.numeroSemana}: ${selectedSaber.nombre}`
                        : prev.tituloSemana,
                      momentoInicio: selectedSaber
                        ? { ...prev.momentoInicio, estrategia: inicioDesc }
                        : prev.momentoInicio,
                      momentoDesarrollo: selectedSaber
                        ? { ...prev.momentoDesarrollo, estrategia: desarrolloDesc }
                        : prev.momentoDesarrollo,
                      momentoCierre: selectedSaber
                        ? { ...prev.momentoCierre, estrategia: cierreDesc }
                        : prev.momentoCierre,
                    };
                  });
                }}
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-zinc-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
              >
                <option value="">-- Seleccionar Saber Oficial --</option>
                {allSaberes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
              </select>

              {currentSemana.saberesSeleccionados[0] && (() => {
                const selId = currentSemana.saberesSeleccionados[0];
                const selObj = allSaberes.find((s) => s.id === selId);
                if (!selObj) return null;
                const { isCustom } = getCustomEstrategiaForSaber(selObj.id, selObj.estrategiaMetodologica);
                return (
                  <div className="mt-1.5 flex flex-wrap gap-1.5 justify-end">
                    <button
                      onClick={() => {
                        setEditorMediacionData({
                          saberId: selObj.id,
                          saberNombre: selObj.nombre,
                          indicadorTexto: selObj.indicador,
                          areaNombre: modulo?.areas.find((a) => a.saberes.some((s) => s.id === selId))?.nombre || 'Área Oficial',
                          moduloId: selectedModuloId,
                          estrategiaBaseOficial: selObj.estrategiaMetodologica,
                        });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 text-[11px] font-bold flex items-center space-x-1 transition-colors shadow-2xs"
                      title="Editar o Re-plantear la actividad de mediación didáctica"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                      <span>{isCustom ? '✏️ Mediación Editada' : '✏️ Replantear Mediación'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setRecursoApoyoModalData({
                          saberId: selObj.id,
                          saberNombre: selObj.nombre,
                          indicador: selObj.indicador,
                          areaNombre: modulo?.areas.find((a) => a.saberes.some((s) => s.id === selId))?.nombre || 'Área Oficial',
                          moduloId: selectedModuloId,
                        });
                      }}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/70 text-[11px] font-bold flex items-center space-x-1 transition-colors shadow-2xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Recurso Apoyo IA</span>
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Bloque de Vinculación con Proyecto */}
          <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-xl p-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                Vinculación con el Proyecto Semestral
              </span>
              <label className="flex items-center space-x-2 text-xs text-emerald-950 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentSemana.esSemanaDedicadaAProyecto}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      esSemanaDedicadaAProyecto: e.target.checked
                    }))
                  }
                  className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium">Semana 100% dedicada al Proyecto</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Etapa de Design Thinking Asociada:
                </label>
                <select
                  value={currentSemana.etapaProyectoAsociada || ''}
                  onChange={(e) => {
                    const val = e.target.value as EtapaProyectoTipo;
                    const etapaObj = proyecto?.etapas.find((et) => et.id === val);
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      etapaProyectoAsociada: val || undefined,
                      actividadProyectoEnSemana: etapaObj ? `${etapaObj.nombre}: ${etapaObj.proposito}` : ''
                    }));
                  }}
                  className="w-full text-xs bg-white border border-emerald-200 rounded-lg p-2 text-zinc-800 focus:outline-none"
                >
                  <option value="">Sin etapa de proyecto específica esta semana</option>
                  {proyecto?.etapas.map((et) => (
                    <option key={et.id} value={et.id}>
                      {et.nombre} ({et.faseNombre})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                  Acción de Proyecto en la Semana:
                </label>
                <input
                  type="text"
                  placeholder="Ej: Levantamiento de mapa de empatía / Ensamble de prototipo..."
                  value={currentSemana.actividadProyectoEnSemana || ''}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      actividadProyectoEnSemana: e.target.value
                    }))
                  }
                  className="w-full text-xs bg-white border border-emerald-200 rounded-lg p-2 text-zinc-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Los 3 Momentos Didácticos de la Semana */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              Desglose de los 3 Momentos Didácticos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1. Momento Inicio */}
              <div className="bg-sky-50/40 border border-sky-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-sky-100">
                  <span className="text-xs font-bold text-sky-800 flex items-center">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 inline-flex items-center justify-center mr-1 text-[11px]">1</span>
                    Momento Inicio
                  </span>
                  <input
                    type="text"
                    value={currentSemana.momentoInicio.tiempo}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        momentoInicio: { ...prev.momentoInicio, tiempo: e.target.value }
                      }))
                    }
                    className="text-[11px] font-medium text-zinc-500 w-16 text-right bg-transparent border-b border-transparent hover:border-zinc-300 focus:outline-none"
                  />
                </div>
                <textarea
                  rows={4}
                  value={currentSemana.momentoInicio.estrategia}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      momentoInicio: { ...prev.momentoInicio, estrategia: e.target.value }
                    }))
                  }
                  className="w-full text-xs bg-white border border-sky-200/80 rounded-lg p-2.5 text-zinc-800 focus:ring-2 focus:ring-sky-500/20 focus:outline-none leading-relaxed"
                  placeholder="Focalización, preguntas generadoras y activación..."
                />
              </div>

              {/* 2. Momento Desarrollo */}
              <div className="bg-indigo-50/40 border border-indigo-100 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-indigo-100">
                    <span className="text-xs font-bold text-indigo-800 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 inline-flex items-center justify-center mr-1 text-[11px]">2</span>
                      Momento Desarrollo
                    </span>
                    <input
                      type="text"
                      value={currentSemana.momentoDesarrollo.tiempo}
                      onChange={(e) =>
                        updateCurrentSemana((prev) => ({
                          ...prev,
                          momentoDesarrollo: { ...prev.momentoDesarrollo, tiempo: e.target.value }
                        }))
                      }
                      className="text-[11px] font-medium text-zinc-500 w-16 text-right bg-transparent border-b border-transparent hover:border-zinc-300 focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={currentSemana.momentoDesarrollo.estrategia}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        momentoDesarrollo: { ...prev.momentoDesarrollo, estrategia: e.target.value }
                      }))
                    }
                    className="w-full text-xs bg-white border border-indigo-200/80 rounded-lg p-2.5 text-zinc-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none leading-relaxed"
                    placeholder="Construcción, laboratorio práctico, codificación..."
                  />
                </div>
              </div>

              {/* 3. Momento Cierre */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1 border-b border-emerald-100">
                    <span className="text-xs font-bold text-emerald-800 flex items-center">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center justify-center mr-1 text-[11px]">3</span>
                      Momento Cierre
                    </span>
                    <input
                      type="text"
                      value={currentSemana.momentoCierre.tiempo}
                      onChange={(e) =>
                        updateCurrentSemana((prev) => ({
                          ...prev,
                          momentoCierre: { ...prev.momentoCierre, tiempo: e.target.value }
                        }))
                      }
                      className="text-[11px] font-medium text-zinc-500 w-16 text-right bg-transparent border-b border-transparent hover:border-zinc-300 focus:outline-none"
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={currentSemana.momentoCierre.estrategia}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        momentoCierre: { ...prev.momentoCierre, estrategia: e.target.value }
                      }))
                    }
                    className="w-full text-xs bg-white border border-emerald-200/80 rounded-lg p-2.5 text-zinc-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none leading-relaxed"
                    placeholder="Sistematización, coevaluación y reflexión..."
                  />
                </div>
              </div>
            </div>

            {/* Espacio de Anotaciones y Bitácora Docente para el Saber de la Semana */}
            {currentSemana.saberesSeleccionados[0] && (
              <div className="pt-2">
                <AnotacionesIndicador
                  saberId={currentSemana.saberesSeleccionados[0]}
                  saberNombre={allSaberes.find((s) => s.id === currentSemana.saberesSeleccionados[0])?.nombre || 'Saber de la Semana'}
                />
              </div>
            )}
          </div>

          {/* Multiescenarios y Evaluación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-zinc-50 rounded-xl p-4 space-y-2 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                Recursos (Conectado / Desconectado):
              </span>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold">Escenario Conectado:</label>
                <input
                  type="text"
                  value={currentSemana.escenarioConectado}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({ ...prev, escenarioConectado: e.target.value }))
                  }
                  className="w-full text-xs bg-white border border-zinc-200 rounded p-1.5 mt-0.5"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold">Escenario Desconectado:</label>
                <input
                  type="text"
                  value={currentSemana.escenarioDesconectado}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({ ...prev, escenarioDesconectado: e.target.value }))
                  }
                  className="w-full text-xs bg-white border border-zinc-200 rounded p-1.5 mt-0.5"
                />
              </div>
            </div>

            <div className="bg-zinc-50 rounded-xl p-4 space-y-2 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider block">
                Evaluación Formativa & DUA:
              </span>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold">Instrumento de Evaluación:</label>
                <input
                  type="text"
                  value={currentSemana.instrumentoEvaluacion}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({ ...prev, instrumentoEvaluacion: e.target.value }))
                  }
                  className="w-full text-xs bg-white border border-zinc-200 rounded p-1.5 mt-0.5"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 font-bold">Pauta DUA Aplicada:</label>
                <input
                  type="text"
                  value={currentSemana.pautaDUAAplicada}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({ ...prev, pautaDUAAplicada: e.target.value }))
                  }
                  className="w-full text-xs bg-white border border-zinc-200 rounded p-1.5 mt-0.5"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal QR Code */}
      {qrModalData && (
        <WebAppQRModal
          webapp={qrModalData.webapp}
          saberNombre={qrModalData.saberNombre}
          indicadorTexto={qrModalData.indicadorTexto}
          onClose={() => setQrModalData(null)}
        />
      )}

      {/* Modal Agregar / Editar WebApp */}
      {addEditModalData && (
        <WebAppAddEditModal
          saberId={addEditModalData.saberId}
          saberNombre={addEditModalData.saberNombre}
          initialData={addEditModalData.initialData}
          defaultMomento={addEditModalData.defaultMomento}
          onSave={(webapp) => saveWebapp(addEditModalData.saberId, webapp)}
          onClose={() => setAddEditModalData(null)}
        />
      )}

      {/* Modal Recurso de Apoyo Pedagógico (4 Pilares) */}
      {recursoApoyoModalData && (
        <RecursoApoyoModal
          saberId={recursoApoyoModalData.saberId}
          saberNombre={recursoApoyoModalData.saberNombre}
          indicador={recursoApoyoModalData.indicador}
          areaNombre={recursoApoyoModalData.areaNombre}
          moduloId={recursoApoyoModalData.moduloId}
          onClose={() => setRecursoApoyoModalData(null)}
        />
      )}

      {/* Modal Editor y Re-planteador de Mediación Didáctica */}
      {editorMediacionData && (
        <EditorActividadMediacionModal
          isOpen={true}
          saberId={editorMediacionData.saberId}
          saberNombre={editorMediacionData.saberNombre}
          indicadorTexto={editorMediacionData.indicadorTexto}
          areaNombre={editorMediacionData.areaNombre}
          moduloId={editorMediacionData.moduloId}
          estrategiaBaseOficial={editorMediacionData.estrategiaBaseOficial}
          onSaved={(nuevaEst) => {
            // Actualizar la semana actual si tiene este saber seleccionado
            updateCurrentSemana((prev) => {
              if (prev.saberesSeleccionados.includes(editorMediacionData.saberId)) {
                return {
                  ...prev,
                  momentoInicio: { ...prev.momentoInicio, estrategia: nuevaEst.inicio.descripcion },
                  momentoDesarrollo: { ...prev.momentoDesarrollo, estrategia: nuevaEst.desarrollo.descripcion },
                  momentoCierre: { ...prev.momentoCierre, estrategia: nuevaEst.cierre.descripcion },
                };
              }
              return prev;
            });
          }}
          onClose={() => setEditorMediacionData(null)}
        />
      )}
    </div>
  );
};

