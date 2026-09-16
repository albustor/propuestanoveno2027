'use client';

import React, { useState } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { PROYECTOS_SEMESTRALES_NOVENO } from '../../data/proyectoFasesEtapasData';
import { EJES_TRANSVERSALES_OFICIALES, MAPEO_EJES_POR_SABER } from '../../data/ejesTransversalesData';
import { 
  Cpu, 
  Code, 
  Database, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Wrench, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  QrCode, 
  Edit3, 
  ShieldCheck, 
  Leaf, 
  Filter,
  LayoutGrid,
  List,
  Target,
  FileText,
  Compass,
  Layers,
  Bot
} from 'lucide-react';
import { WebAppRecurso, EstrategiaMetodologicaIndicador, EjeTransversalTipo } from '../../types';
import { useWebApps } from '../../lib/useWebApps';
import { getCustomEstrategiaForSaber } from '../../lib/storage';
import { MomentoWebAppsSection } from '../WebApps/MomentoWebAppsSection';
import { WebAppQRModal } from '../WebApps/WebAppQRModal';
import { WebAppAddEditModal } from '../WebApps/WebAppAddEditModal';
import { RecursoApoyoModal } from '../RecursoApoyo/RecursoApoyoModal';
import { EditorActividadMediacionModal } from '../Mediacion/EditorActividadMediacionModal';
import { AnotacionesIndicador } from '../Notas/AnotacionesIndicador';

export const Modulo1View: React.FC = () => {
  const modulo1 = MODULOS_NOVENO_OFICIAL.find((m) => m.id === 1);
  const proyecto1 = PROYECTOS_SEMESTRALES_NOVENO.find((p) => p.moduloId === 1);

  const { getWebapps, saveWebapp, deleteWebapp } = useWebApps();

  const [modoVista, setModoVista] = useState<'tarjetas' | 'lista'>('tarjetas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [expandedSaberId, setExpandedSaberId] = useState<string | null>('movimiento_mecanismos');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modales de WebApps y QR
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

  if (!modulo1) return null;

  const filteredAreas = modulo1.areas.map((area) => {
    const filteredSaberes = area.saberes.filter((s) => {
      const matchSearch =
        s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.indicador.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchArea = selectedArea === 'todas' || area.id === selectedArea;
      return matchSearch && matchArea;
    });
    return { ...area, saberes: filteredSaberes };
  }).filter((area) => area.saberes.length > 0);

  const totalIndicadores = modulo1.areas.reduce((acc, a) => acc + a.saberes.length, 0);

  // Paleta temática por área
  const getAreaColorConfig = (areaId: string) => {
    switch (areaId) {
      case 'mecanismos_estructuras':
        return {
          bgBadge: 'bg-sky-100 text-sky-800 border-sky-200',
          borderCard: 'hover:border-sky-300',
          indicatorBg: 'bg-sky-50/70 border-sky-200/80 text-sky-950',
          iconColor: 'text-sky-600',
          badgeGradient: 'from-sky-600 to-blue-700'
        };
      case 'algoritmos_programacion':
        return {
          bgBadge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          borderCard: 'hover:border-indigo-300',
          indicatorBg: 'bg-indigo-50/70 border-indigo-200/80 text-indigo-950',
          iconColor: 'text-indigo-600',
          badgeGradient: 'from-indigo-600 to-purple-700'
        };
      case 'computacion_fisica':
        return {
          bgBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          borderCard: 'hover:border-emerald-300',
          indicatorBg: 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950',
          iconColor: 'text-emerald-600',
          badgeGradient: 'from-emerald-600 to-teal-700'
        };
      default:
        return {
          bgBadge: 'bg-zinc-100 text-zinc-800 border-zinc-200',
          borderCard: 'hover:border-zinc-300',
          indicatorBg: 'bg-zinc-50 border-zinc-200 text-zinc-900',
          iconColor: 'text-zinc-600',
          badgeGradient: 'from-zinc-700 to-zinc-900'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner Minimalista y Visual del Módulo 1 */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-2.5 flex-1">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-xs">
                I Semestre • 9° Año • III Ciclo MEP
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                10 Indicadores de Logro Oficiales
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              {modulo1.nombre}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-4xl leading-relaxed">
              {modulo1.descripcion}
            </p>

            {/* Entrelazamiento de Áreas según Descripción del Módulo */}
            {modulo1.entrelazamientoAreas && (
              <div className="mt-3 p-3.5 bg-sky-50/60 border border-sky-100 rounded-2xl text-xs text-zinc-700 leading-relaxed">
                <span className="font-bold text-sky-900 flex items-center gap-1.5 mb-1">
                  🔗 Entrelazamiento Curricular de Áreas (Módulo 1):
                </span>
                {modulo1.entrelazamientoAreas}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 shrink-0 lg:max-w-sm w-full">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50/70 border border-sky-200/80 rounded-2xl p-3.5 shadow-2xs">
              <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                Eje del Proyecto Semestral (ABP)
              </div>
              <div className="text-xs font-bold text-sky-950 mt-1">
                {modulo1.ejeProyectoSemestral}
              </div>
            </div>

            {modulo1.ejeCiclo && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-[11px] text-zinc-600">
                <span className="font-bold text-zinc-800">Eje de III Ciclo:</span> {modulo1.ejeCiclo}
              </div>
            )}
          </div>
        </div>

        {/* Perfil de Salida de III Ciclo */}
        {modulo1.perfilSalidaCiclo && (
          <div className="mt-5 pt-4 border-t border-zinc-100">
            <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-sky-600" />
              Rasgos del Perfil de Salida de III Ciclo Tributados:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {modulo1.perfilSalidaCiclo.map((rasgo, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-700 bg-zinc-50/80 border border-zinc-100 px-3 py-1.5 rounded-xl">
                  <span className="text-sky-600 font-bold">•</span>
                  <span>{rasgo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barra de Filtros, Búsqueda y Switch de Modo Tarjetas / Lista */}
        <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-col md:flex-row gap-3.5 items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedArea('todas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedArea === 'todas'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Todas las Áreas ({totalIndicadores})
            </button>
            {modulo1.areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedArea === area.id
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <span>{area.nombre}</span>
                <span className="text-[10px] opacity-75 font-bold">({area.saberes.length})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar saber o indicador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800"
              />
            </div>

            {/* Switch de Vista: Tarjetas vs Lista */}
            <div className="flex items-center bg-zinc-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setModoVista('tarjetas')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                  modoVista === 'tarjetas'
                    ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="Vista en Cuadrícula de Tarjetas Visuales"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">Tarjetas</span>
              </button>
              <button
                onClick={() => setModoVista('lista')}
                className={`p-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition-all ${
                  modoVista === 'lista'
                    ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="Vista en Lista Desplegable"
              >
                <List className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Lista</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Áreas y Saberes */}
      <div className="space-y-8">
        {filteredAreas.map((area) => {
          const colorCfg = getAreaColorConfig(area.id);

          return (
            <div key={area.id} className="space-y-4">
              {/* Header del Área Curricular */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-zinc-200 gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-sky-600 shadow-xs"></div>
                  <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight">{area.nombre}</h2>
                  <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
                    {area.saberes.length} saberes
                  </span>
                </div>
              </div>

              {/* Tarjetas de Competencia de Área y RdA de III Ciclo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-sky-50/70 border border-sky-200/60 rounded-2xl p-3.5 text-zinc-700 shadow-2xs">
                  <span className="font-bold text-sky-900 flex items-center gap-1 mb-1">
                    🏆 1 Competencia del Área:
                  </span>
                  <p className="leading-relaxed text-sky-950 font-medium">{area.competenciaArea || 'Competencia rectora del área curricular.'}</p>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-200/60 rounded-2xl p-3.5 text-zinc-700 shadow-2xs">
                  <span className="font-bold text-indigo-900 flex items-center gap-1 mb-1">
                    🎯 1 RdA por Ciclo (III Ciclo):
                  </span>
                  <p className="leading-relaxed text-indigo-950 font-medium">{area.rdaCiclo || area.rda}</p>
                </div>
              </div>

              {/* VISTA 1: MODO CUADRÍCULA DE TARJETAS VISUALES (DEFAULT) */}
              {modoVista === 'tarjetas' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {area.saberes.map((saber) => {
                    const isExpanded = expandedSaberId === saber.id;
                    const { estrategia, isCustom } = getCustomEstrategiaForSaber(saber.id, saber.estrategiaMetodologica);
                    const saberWebapps = getWebapps(saber.id);

                    return (
                      <div
                        key={saber.id}
                        className={`bg-white rounded-3xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${colorCfg.borderCard}`}
                      >
                        {/* Top Bar de la Tarjeta */}
                        <div className="p-5 sm:p-6 space-y-4">
                          {/* Encabezado del Saber & Badges */}
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${colorCfg.bgBadge}`}>
                                  {area.nombre}
                                </span>
                                {saber.etapaProyectoRecomendada && (
                                  <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                    <span>🎯</span> {saber.etapaProyectoRecomendada.replace('_', ' ').toUpperCase()}
                                  </span>
                                )}
                              </div>

                              {isCustom && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1">
                                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                                  <span>Personalizado</span>
                                </span>
                              )}
                            </div>

                            <h3 className="font-extrabold text-base text-zinc-900 tracking-tight">
                              {saber.nombre}
                            </h3>
                            <p className="text-xs text-zinc-500 line-clamp-2">
                              {saber.descripcion}
                            </p>
                          </div>

                          {/* Caja Destacada del Indicador de Logro Oficial */}
                          <div className={`p-4 rounded-2xl border ${colorCfg.indicatorBg} space-y-1`}>
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                              Indicador de Logro Oficial (MEP 2026):
                            </div>
                            <p className="text-xs font-semibold leading-relaxed">
                              {saber.indicador}
                            </p>
                          </div>

                          {/* Mini-Tarjetas de los 3 Momentos Didácticos */}
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                              Estrategia en 3 Momentos:
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              {/* Momento 1: Inicio */}
                              <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-2.5 space-y-1">
                                <div className="flex items-center justify-between text-[10px] font-bold text-sky-800">
                                  <span>1. Inicio</span>
                                  <span className="opacity-75">{estrategia.inicio.tiempoEstimado}</span>
                                </div>
                                <p className="text-[11px] text-zinc-600 line-clamp-2 leading-snug font-medium">
                                  {estrategia.inicio.titulo}
                                </p>
                              </div>

                              {/* Momento 2: Desarrollo */}
                              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-2.5 space-y-1">
                                <div className="flex items-center justify-between text-[10px] font-bold text-indigo-800">
                                  <span>2. Desarr.</span>
                                  <span className="opacity-75">{estrategia.desarrollo.tiempoEstimado}</span>
                                </div>
                                <p className="text-[11px] text-zinc-600 line-clamp-2 leading-snug font-medium">
                                  {estrategia.desarrollo.titulo}
                                </p>
                              </div>

                              {/* Momento 3: Cierre */}
                              <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5 space-y-1">
                                <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800">
                                  <span>3. Cierre</span>
                                  <span className="opacity-75">{estrategia.cierre.tiempoEstimado}</span>
                                </div>
                                <p className="text-[11px] text-zinc-600 line-clamp-2 leading-snug font-medium">
                                  {estrategia.cierre.titulo}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Ejes Transversales */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Ejes:</span>
                            {(MAPEO_EJES_POR_SABER[saber.id] || []).map((ejeId) => {
                              const cfg = EJES_TRANSVERSALES_OFICIALES[ejeId];
                              if (!cfg) return null;
                              return (
                                <span
                                  key={ejeId}
                                  className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border flex items-center gap-1 ${cfg.bgLight}`}
                                  title={cfg.nombre}
                                >
                                  <span>{ejeId === 'sostenibilidad_ambiental' ? '🌿' : ejeId === 'inclusion_derechos' ? '♿' : ejeId === 'salud_bienestar_digital' ? '🍎' : '🛡️'}</span>
                                  <span>{cfg.nombreCorto}</span>
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Desglose Completo si se expande la tarjeta */}
                        {isExpanded && (
                          <div className="p-5 sm:p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-5">
                            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                              Estrategia Metodológica Completa (Detalle Profundo)
                            </div>

                            <div className="space-y-3">
                              {/* 1. Momento Inicio */}
                              <div className="bg-white border border-sky-100 rounded-2xl p-4 shadow-2xs space-y-2">
                                <div className="flex items-center justify-between pb-1 border-b border-sky-50">
                                  <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-800 inline-flex items-center justify-center text-[11px]">1</span>
                                    Momento Inicio ({estrategia.inicio.tiempoEstimado})
                                  </span>
                                  <span className="text-xs font-bold text-zinc-800">{estrategia.inicio.titulo}</span>
                                </div>
                                <p className="text-xs text-zinc-600 leading-relaxed">{estrategia.inicio.descripcion}</p>
                                {estrategia.inicio.preguntasGeneradoras && (
                                  <div className="pt-1.5">
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Preguntas Clave:</span>
                                    <ul className="list-disc list-inside text-[11px] text-zinc-600 space-y-0.5 mt-0.5">
                                      {estrategia.inicio.preguntasGeneradoras.map((p, idx) => (
                                        <li key={idx} className="italic">{p}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>

                              {/* 2. Momento Desarrollo */}
                              <div className="bg-white border border-indigo-100 rounded-2xl p-4 shadow-2xs space-y-2">
                                <div className="flex items-center justify-between pb-1 border-b border-indigo-50">
                                  <span className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 inline-flex items-center justify-center text-[11px]">2</span>
                                    Momento Desarrollo ({estrategia.desarrollo.tiempoEstimado})
                                  </span>
                                  <span className="text-xs font-bold text-zinc-800">{estrategia.desarrollo.titulo}</span>
                                </div>
                                <p className="text-xs text-zinc-600 leading-relaxed">{estrategia.desarrollo.descripcion}</p>
                                <div className="text-[11px] text-zinc-700 pt-1">
                                  <strong className="text-zinc-900">Acción Estudiante:</strong> {estrategia.desarrollo.accionesEstudiante.join(' ')}
                                </div>
                              </div>

                              {/* 3. Momento Cierre */}
                              <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-2xs space-y-2">
                                <div className="flex items-center justify-between pb-1 border-b border-emerald-50">
                                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center justify-center text-[11px]">3</span>
                                    Momento Cierre ({estrategia.cierre.tiempoEstimado})
                                  </span>
                                  <span className="text-xs font-bold text-zinc-800">{estrategia.cierre.titulo}</span>
                                </div>
                                <p className="text-xs text-zinc-600 leading-relaxed">{estrategia.cierre.descripcion}</p>
                                <div className="text-[11px] text-zinc-700 pt-1">
                                  <strong className="text-zinc-900">Evaluación:</strong> {estrategia.cierre.accionesDocente.join(' ')}
                                </div>
                              </div>
                            </div>

                            {/* Recursos y DUA */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                              <div className="bg-zinc-100/70 rounded-2xl p-3.5 space-y-1">
                                <span className="font-bold text-zinc-800 flex items-center gap-1">
                                  <Wrench className="w-3.5 h-3.5 text-zinc-500" /> Recursos:
                                </span>
                                <div className="text-[11px] text-zinc-600"><strong>Conectado:</strong> {estrategia.recursosSugeridos.conectado.join(', ')}</div>
                                <div className="text-[11px] text-zinc-600"><strong>Desconectado:</strong> {estrategia.recursosSugeridos.desconectado.join(', ')}</div>
                              </div>

                              <div className="bg-zinc-100/70 rounded-2xl p-3.5 space-y-1">
                                <span className="font-bold text-zinc-800 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500" /> Pautas DUA:
                                </span>
                                <ul className="list-disc list-inside text-[11px] text-zinc-600 space-y-0.5">
                                  {estrategia.pautasDUA.map((dua, idx) => (
                                    <li key={idx}><strong className="text-zinc-800">{dua.principio}:</strong> {dua.descripcion}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Bitácora y Anotaciones */}
                            <AnotacionesIndicador saberId={saber.id} saberNombre={saber.nombre} />
                          </div>
                        )}

                        {/* Botonera de Acciones de la Tarjeta */}
                        <div className="p-3.5 bg-zinc-50/80 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <button
                              onClick={() => {
                                setRecursoApoyoModalData({
                                  saberId: saber.id,
                                  saberNombre: saber.nombre,
                                  indicador: saber.indicador,
                                  areaNombre: area.nombre,
                                  moduloId: 1,
                                });
                              }}
                              className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 flex items-center space-x-1 transition-all shadow-2xs"
                              title="Ver Recurso Pedagógico de Apoyo en 4 Pilares (Aprender, Comprender, Simular, Valorar)"
                            >
                              <Sparkles className="w-3 h-3 text-purple-600" />
                              <span>Recurso IA (4 Pilares)</span>
                            </button>

                            <button
                              onClick={() => {
                                setEditorMediacionData({
                                  saberId: saber.id,
                                  saberNombre: saber.nombre,
                                  indicadorTexto: saber.indicador,
                                  areaNombre: area.nombre,
                                  moduloId: 1,
                                  estrategiaBaseOficial: saber.estrategiaMetodologica,
                                });
                              }}
                              className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 flex items-center space-x-1 transition-all shadow-2xs"
                              title="Editar o Re-plantear la mediación didáctica"
                            >
                              <Edit3 className="w-3 h-3 text-amber-700" />
                              <span>{isCustom ? '✏️ Mediación Editada' : '✏️ Replantear'}</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setExpandedSaberId(isExpanded ? null : saber.id)}
                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200 flex items-center space-x-1 transition-all shadow-2xs"
                          >
                            <span>{isExpanded ? 'Ocultar Detalle' : 'Ver Detalle'}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* VISTA 2: MODO LISTA COMPACTA CON ACCORDION */
                <div className="grid grid-cols-1 gap-3">
                  {area.saberes.map((saber) => {
                    const isExpanded = expandedSaberId === saber.id;
                    const { estrategia, isCustom } = getCustomEstrategiaForSaber(saber.id, saber.estrategiaMetodologica);
                    const saberWebapps = getWebapps(saber.id);

                    return (
                      <div
                        key={saber.id}
                        className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm transition-all hover:border-zinc-300"
                      >
                        <div
                          onClick={() => setExpandedSaberId(isExpanded ? null : saber.id)}
                          className="p-4 sm:p-5 flex items-start justify-between cursor-pointer select-none bg-white hover:bg-zinc-50/50"
                        >
                          <div className="space-y-1.5 pr-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-zinc-900 text-sm">{saber.nombre}</span>
                              {saber.etapaProyectoRecomendada && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                  Vinculado a {saber.etapaProyectoRecomendada.replace('_', ' ').toUpperCase()}
                                </span>
                              )}
                              
                              {isCustom && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1">
                                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                                  <span>Mediación Personalizada</span>
                                </span>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditorMediacionData({
                                    saberId: saber.id,
                                    saberNombre: saber.nombre,
                                    indicadorTexto: saber.indicador,
                                    areaNombre: area.nombre,
                                    moduloId: 1,
                                    estrategiaBaseOficial: saber.estrategiaMetodologica,
                                  });
                                }}
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 flex items-center space-x-1 transition-all shadow-2xs"
                              >
                                <Edit3 className="w-3 h-3 text-amber-700" />
                                <span>{isCustom ? '✏️ Editar / Replantear' : '✏️ Replantear Mediación'}</span>
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecursoApoyoModalData({
                                    saberId: saber.id,
                                    saberNombre: saber.nombre,
                                    indicador: saber.indicador,
                                    areaNombre: area.nombre,
                                    moduloId: 1,
                                  });
                                }}
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/70 flex items-center space-x-1 transition-all shadow-2xs"
                              >
                                <Sparkles className="w-3 h-3 text-purple-600" />
                                <span>Recurso Apoyo IA (4 Pilares)</span>
                              </button>
                            </div>
                            <p className="text-xs text-zinc-700 leading-relaxed font-medium">
                              <strong className="text-zinc-900">Indicador:</strong> {saber.indicador}
                            </p>
                            <p className="text-[11px] text-zinc-500">
                              {saber.descripcion}
                            </p>
                          </div>

                          <div className="shrink-0 pt-1">
                            <button className="p-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Desglose Accordion */}
                        {isExpanded && (
                          <div className="p-4 sm:p-6 border-t border-zinc-100 bg-zinc-50/40 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {/* 1. Momento Inicio */}
                              <div className="bg-white border border-sky-100 rounded-xl p-4 shadow-2xs space-y-2">
                                <div className="text-xs font-bold text-sky-800">1. Momento Inicio ({estrategia.inicio.tiempoEstimado})</div>
                                <div className="text-xs font-semibold text-zinc-900">{estrategia.inicio.titulo}</div>
                                <p className="text-xs text-zinc-600">{estrategia.inicio.descripcion}</p>
                              </div>

                              {/* 2. Momento Desarrollo */}
                              <div className="bg-white border border-indigo-100 rounded-xl p-4 shadow-2xs space-y-2">
                                <div className="text-xs font-bold text-indigo-800">2. Momento Desarrollo ({estrategia.desarrollo.tiempoEstimado})</div>
                                <div className="text-xs font-semibold text-zinc-900">{estrategia.desarrollo.titulo}</div>
                                <p className="text-xs text-zinc-600">{estrategia.desarrollo.descripcion}</p>
                              </div>

                              {/* 3. Momento Cierre */}
                              <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-2xs space-y-2">
                                <div className="text-xs font-bold text-emerald-800">3. Momento Cierre ({estrategia.cierre.tiempoEstimado})</div>
                                <div className="text-xs font-semibold text-zinc-900">{estrategia.cierre.titulo}</div>
                                <p className="text-xs text-zinc-600">{estrategia.cierre.descripcion}</p>
                              </div>
                            </div>

                            <AnotacionesIndicador saberId={saber.id} saberNombre={saber.nombre} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

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

      {/* Modal Editor y Re-planteador de Mediación en 3 Momentos */}
      {editorMediacionData && (
        <EditorActividadMediacionModal
          isOpen={true}
          saberId={editorMediacionData.saberId}
          saberNombre={editorMediacionData.saberNombre}
          indicadorTexto={editorMediacionData.indicadorTexto}
          areaNombre={editorMediacionData.areaNombre}
          moduloId={editorMediacionData.moduloId}
          estrategiaBaseOficial={editorMediacionData.estrategiaBaseOficial}
          onSaved={() => setRefreshTrigger((prev) => prev + 1)}
          onClose={() => setEditorMediacionData(null)}
        />
      )}
    </div>
  );
};

