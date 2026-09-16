'use client';

import React, { useState } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { PROYECTOS_SEMESTRALES_NOVENO } from '../../data/proyectoFasesEtapasData';
import { EJES_TRANSVERSALES_OFICIALES, MAPEO_EJES_POR_SABER, getEjeEspecificoParaSaber } from '../../data/ejesTransversalesData';
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
import { PanelSaberesProcedimentalesActitudinales } from './PanelSaberesProcedimentalesActitudinales';
import { ModalDistribucionGlobalSaberes } from './ModalDistribucionGlobalSaberes';
import { ModalPerfilesSalidaOficiales } from '../ModalPerfilesSalidaOficiales';

export const Modulo1View: React.FC = () => {
  const modulo1 = MODULOS_NOVENO_OFICIAL.find((m) => m.id === 1);
  const proyecto1 = PROYECTOS_SEMESTRALES_NOVENO.find((p) => p.moduloId === 1);

  const { getWebapps, saveWebapp, deleteWebapp } = useWebApps();

  const [modoVista, setModoVista] = useState<'tarjetas' | 'lista'>('tarjetas');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [expandedSaberIds, setExpandedSaberIds] = useState<string[]>([]);
  const [showTopBanner, setShowTopBanner] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [mostrarModalDistribucionGlobal, setMostrarModalDistribucionGlobal] = useState<boolean>(false);
  const [mostrarModalPerfiles, setMostrarModalPerfiles] = useState<boolean>(false);

  const toggleExpandSaber = (saberId: string) => {
    setExpandedSaberIds(prev => 
      prev.includes(saberId) ? prev.filter(id => id !== saberId) : [...prev, saberId]
    );
  };

  const expandirTodos = (todosIds: string[]) => {
    setExpandedSaberIds(todosIds);
  };

  const contraerTodos = () => {
    setExpandedSaberIds([]);
  };

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
    <div className="space-y-4">
      {/* Banner del Módulo 1 (Colapsable con Botón para optimizar el espacio) */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-xs">
              I Semestre • 9° Año • III Ciclo MEP
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
              10 Indicadores Oficiales
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setShowTopBanner(!showTopBanner)}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-all flex items-center space-x-1 cursor-pointer"
            >
              <span>{showTopBanner ? 'Ocultar Resumen ▲' : 'Mostrar Resumen del Módulo ▼'}</span>
            </button>
          </div>
        </div>

        <div className="mt-1.5">
          <h1 className="text-lg sm:text-xl font-extrabold text-zinc-900 tracking-tight leading-snug">
            {modulo1.nombre}
          </h1>
        </div>

        {/* Contenido Extendido del Banner al Desplegar */}
        {showTopBanner && (
          <div className="mt-3 pt-3 border-t border-zinc-100 space-y-3 animate-in fade-in duration-200">
            <p className="text-xs text-zinc-600 max-w-4xl leading-relaxed">
              {modulo1.descripcion}
            </p>

            {modulo1.entrelazamientoAreas && (
              <div className="p-2.5 bg-sky-50/60 border border-sky-100 rounded-xl text-[11.5px] text-zinc-700 leading-snug">
                <span className="font-bold text-sky-900 flex items-center gap-1 mb-0.5 text-[11px]">
                  🔗 Entrelazamiento Curricular de Áreas (Módulo 1):
                </span>
                {modulo1.entrelazamientoAreas}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50/70 border border-sky-200/80 rounded-xl p-2.5 shadow-2xs">
                <div className="text-[9.5px] font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-600" />
                  Eje del Proyecto Semestral (ABP)
                </div>
                <div className="text-[11.5px] font-bold text-sky-950 mt-0.5 leading-snug">
                  {modulo1.ejeProyectoSemestral}
                </div>
              </div>

              {modulo1.ejeCiclo && (
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-[10.5px] text-zinc-600 leading-snug flex flex-col justify-center">
                  <div><strong className="font-bold text-zinc-800">Eje III Ciclo:</strong> {modulo1.ejeCiclo}</div>
                </div>
              )}
            </div>

            {/* Perfil de Salida de III Ciclo */}
            {modulo1.perfilSalidaCiclo && (
              <div className="pt-2 border-t border-zinc-100">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                  <div className="text-[10.5px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                    <Target className="w-3 h-3 text-sky-600" />
                    Rasgos del Perfil de Salida de III Ciclo Tributados:
                  </div>
                  <button
                    onClick={() => setMostrarModalPerfiles(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-gradient-to-r from-teal-50 to-sky-50 hover:from-teal-100 hover:to-sky-100 text-teal-800 border border-teal-200/80 rounded-lg text-[11px] font-semibold shadow-2xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-teal-600" />
                    <span>Consultar Perfiles MEP 2026</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {modulo1.perfilSalidaCiclo.map((rasgo, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-zinc-700 bg-zinc-50/80 border border-zinc-100 px-2.5 py-1 rounded-lg">
                      <span className="text-sky-600 font-bold">•</span>
                      <span>{rasgo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Barra de Filtros, Búsqueda y Switch de Modo Tarjetas / Lista */}
        <div className="mt-3 pt-3 border-t border-zinc-100 flex flex-col md:flex-row gap-2.5 items-center justify-between">
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedArea('todas')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedArea === 'todas'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Todas ({totalIndicadores})
            </button>
            {modulo1.areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
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

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Buscar saber o indicador..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800"
              />
            </div>

            {/* Botones de Expandir / Plegar Todos */}
            <div className="flex items-center space-x-1 shrink-0">
              <button
                onClick={() => expandirTodos(modulo1.areas.flatMap(a => a.saberes.map(s => s.id)))}
                className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all flex items-center space-x-1 cursor-pointer shadow-2xs"
                title="Desplegar todas las tarjetas para ver la información completa"
              >
                <ChevronDown className="w-3.5 h-3.5 text-indigo-600" />
                <span>Desplegar Todos</span>
              </button>
              <button
                onClick={contraerTodos}
                className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-all flex items-center space-x-1 cursor-pointer"
                title="Plegar todas las tarjetas en formato compacto"
              >
                <ChevronUp className="w-3.5 h-3.5 text-zinc-600" />
                <span>Compactar Todos</span>
              </button>
            </div>

            <button
              onClick={() => setMostrarModalDistribucionGlobal(true)}
              className="px-2.5 py-1 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white rounded-xl text-[11px] font-bold flex items-center space-x-1 shadow-2xs transition-all cursor-pointer shrink-0"
              title="Ver matriz de 13 Procedimentales y 4 Actitudinales"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Matriz de Saberes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Áreas y Saberes */}
      <div className="space-y-5">
        {filteredAreas.map((area) => {
          const colorCfg = getAreaColorConfig(area.id);

          return (
            <div key={area.id} className="space-y-3">
              {/* Header del Área Curricular */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1.5 border-b border-zinc-200 gap-1.5">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-600 shadow-xs"></div>
                  <h2 className="text-base font-extrabold text-zinc-900 tracking-tight">{area.nombre}</h2>
                  <span className="px-2 py-0.2 rounded-md text-[10.5px] font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
                    {area.saberes.length} saberes
                  </span>
                </div>
              </div>

              {/* Tarjetas de Competencia de Área y RdA de III Ciclo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="bg-sky-50/70 border border-sky-200/60 rounded-xl p-2 text-zinc-700 shadow-2xs">
                  <span className="font-bold text-sky-900 flex items-center gap-1 mb-0.5 text-[10.5px]">
                    🏆 Competencia del Área:
                  </span>
                  <p className="leading-snug text-sky-950 text-[11px] font-medium">{area.competenciaArea || 'Competencia rectora del área curricular.'}</p>
                </div>
                <div className="bg-indigo-50/70 border border-indigo-200/60 rounded-xl p-2 text-zinc-700 shadow-2xs">
                  <span className="font-bold text-indigo-900 flex items-center gap-1 mb-0.5 text-[10.5px]">
                    🎯 RdA de III Ciclo:
                  </span>
                  <p className="leading-snug text-indigo-950 text-[11px] font-medium">{area.rdaCiclo || area.rda}</p>
                </div>
              </div>

              {/* MODO ACORDEÓN DE INDICADORES (COMPACTO POR DEFECTO, DESPLEGABLE CON BOTÓN) */}
              {modoVista === 'tarjetas' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {area.saberes.map((saber) => {
                  const isExpanded = expandedSaberIds.includes(saber.id);
                  const { estrategia, isCustom } = getCustomEstrategiaForSaber(saber.id, saber.estrategiaMetodologica);
                  const saberWebapps = getWebapps(saber.id);
                  const ejeEsp = getEjeEspecificoParaSaber(saber.id);
                  const iconoEje = ejeEsp?.detalle.ejePrincipal === 'pensamiento_computacional' ? '🧠' : ejeEsp?.detalle.ejePrincipal === 'ciudadania_etica_digital' ? '🛡️' : '🚀';

                  return (
                    <div
                      key={saber.id}
                      className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                        isExpanded
                          ? 'border-indigo-300 shadow-md ring-1 ring-indigo-200/50'
                          : 'border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs'
                      } ${colorCfg.borderCard}`}
                    >
                      {/* Cabecera / Barra Resumen del Indicador (Siempre Visible y Clicable para Desplegar) */}
                      <div
                        onClick={() => toggleExpandSaber(saber.id)}
                        className="p-3 sm:p-3.5 cursor-pointer select-none bg-white hover:bg-zinc-50/60 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <div className="flex flex-wrap items-center gap-1">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${colorCfg.bgBadge}`}>
                              {area.nombre}
                            </span>
                            {saber.etapaProyectoRecomendada && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                                <span>🎯</span> {saber.etapaProyectoRecomendada.replace('_', ' ').toUpperCase()}
                              </span>
                            )}
                            {ejeEsp && (
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border flex items-center gap-1 ${ejeEsp.ejeConfig.bgLight}`}>
                                <span>{iconoEje}</span>
                                <span>{ejeEsp.ejeConfig.nombreCorto}</span>
                              </span>
                            )}
                            {isCustom && (
                              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1">
                                <ShieldCheck className="w-3 h-3 text-amber-600" />
                                <span>Editado</span>
                              </span>
                            )}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleExpandSaber(saber.id);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              isExpanded
                                ? 'bg-indigo-600 text-white shadow-2xs'
                                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                            }`}
                          >
                            <span>{isExpanded ? 'Plegar ▲' : 'Desplegar ▼'}</span>
                          </button>
                        </div>

                        <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 tracking-tight leading-snug">
                          {saber.nombre}
                        </h3>

                        {/* Indicador de Logro Oficial (Sintetizado en estado compacto) */}
                        <div className={`mt-2 p-2 rounded-xl border ${colorCfg.indicatorBg}`}>
                          <div className="text-[9.5px] font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1 mb-0.5">
                            <CheckCircle2 className="w-3 h-3 text-sky-600 shrink-0" />
                            <span>Indicador de Logro Oficial MEP:</span>
                          </div>
                          <p className={`text-[11px] font-medium leading-snug text-zinc-800 ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {saber.indicador}
                          </p>
                        </div>

                        {/* Mini-Pills de los 3 Momentos (Solo en estado compacto para dar visión rápida) */}
                        {!isExpanded && (
                          <div className="mt-2 grid grid-cols-3 gap-1 text-[9.5px] font-semibold text-zinc-600">
                            <div className="bg-sky-50/70 border border-sky-100 px-1.5 py-0.5 rounded-lg truncate text-center">
                              1. Inicio ({estrategia.inicio.tiempoEstimado})
                            </div>
                            <div className="bg-indigo-50/70 border border-indigo-100 px-1.5 py-0.5 rounded-lg truncate text-center">
                              2. Desarr. ({estrategia.desarrollo.tiempoEstimado})
                            </div>
                            <div className="bg-emerald-50/70 border border-emerald-100 px-1.5 py-0.5 rounded-lg truncate text-center">
                              3. Cierre ({estrategia.cierre.tiempoEstimado})
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Desglose Completo que se abre al Desplegar con el Botón */}
                      {isExpanded && (
                        <div className="p-3.5 sm:p-4 border-t border-zinc-100 bg-zinc-50/50 space-y-3.5 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-indigo-600" />
                              Desglose Pedagógico y Mediación Completa
                            </span>
                            <span className="text-[9px] font-semibold text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-md">
                              Guía MEP 2026
                            </span>
                          </div>

                          {/* 1. Momentos Didácticos en Profundidad */}
                          <div className="space-y-2">
                            {/* Momento Inicio */}
                            <div className="bg-white border border-sky-100 rounded-xl p-2.5 shadow-2xs space-y-1">
                              <div className="flex items-center justify-between pb-1 border-b border-sky-50">
                                <span className="text-xs font-bold text-sky-800 flex items-center gap-1">
                                  <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 inline-flex items-center justify-center text-[10px]">1</span>
                                  Momento Inicio ({estrategia.inicio.tiempoEstimado})
                                </span>
                                <span className="text-[11px] font-bold text-zinc-800">{estrategia.inicio.titulo}</span>
                              </div>
                              <p className="text-[11px] text-zinc-600 leading-relaxed">{estrategia.inicio.descripcion}</p>
                              {estrategia.inicio.preguntasGeneradoras && (
                                <div className="pt-0.5">
                                  <span className="text-[9.5px] font-bold text-zinc-500 uppercase tracking-wider">Preguntas Clave:</span>
                                  <ul className="list-disc list-inside text-[10.5px] text-zinc-600 space-y-0.5 mt-0.5">
                                    {estrategia.inicio.preguntasGeneradoras.map((p, idx) => (
                                      <li key={idx} className="italic">{p}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {/* Momento Desarrollo */}
                            <div className="bg-white border border-indigo-100 rounded-xl p-2.5 shadow-2xs space-y-1">
                              <div className="flex items-center justify-between pb-1 border-b border-indigo-50">
                                <span className="text-xs font-bold text-indigo-800 flex items-center gap-1">
                                  <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 inline-flex items-center justify-center text-[10px]">2</span>
                                  Momento Desarrollo ({estrategia.desarrollo.tiempoEstimado})
                                </span>
                                <span className="text-[11px] font-bold text-zinc-800">{estrategia.desarrollo.titulo}</span>
                              </div>
                              <p className="text-[11px] text-zinc-600 leading-relaxed">{estrategia.desarrollo.descripcion}</p>
                              <div className="text-[10.5px] text-zinc-700 pt-0.5">
                                <strong className="text-zinc-900">Acción Estudiante:</strong> {estrategia.desarrollo.accionesEstudiante.join(' ')}
                              </div>
                            </div>

                            {/* Momento Cierre */}
                            <div className="bg-white border border-emerald-100 rounded-xl p-2.5 shadow-2xs space-y-1">
                              <div className="flex items-center justify-between pb-1 border-b border-emerald-50">
                                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center justify-center text-[10px]">3</span>
                                  Momento Cierre ({estrategia.cierre.tiempoEstimado})
                                </span>
                                <span className="text-[11px] font-bold text-zinc-800">{estrategia.cierre.titulo}</span>
                              </div>
                              <p className="text-[11px] text-zinc-600 leading-relaxed">{estrategia.cierre.descripcion}</p>
                              <div className="text-[10.5px] text-zinc-700 pt-0.5">
                                <strong className="text-zinc-900">Evaluación Formativa:</strong> {estrategia.cierre.accionesDocente.join(' ')}
                              </div>
                            </div>
                          </div>

                          {/* Recursos y DUA */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="bg-zinc-100/70 rounded-xl p-2 space-y-0.5">
                              <span className="font-bold text-zinc-800 flex items-center gap-1 text-[10.5px]">
                                <Wrench className="w-3 h-3 text-zinc-500" /> Recursos Sugeridos:
                              </span>
                              <div className="text-[10.5px] text-zinc-600"><strong>Conectado:</strong> {estrategia.recursosSugeridos.conectado.join(', ')}</div>
                              <div className="text-[10.5px] text-zinc-600"><strong>Desconectado:</strong> {estrategia.recursosSugeridos.desconectado.join(', ')}</div>
                            </div>

                            <div className="bg-zinc-100/70 rounded-xl p-2 space-y-0.5">
                              <span className="font-bold text-zinc-800 flex items-center gap-1 text-[10.5px]">
                                <CheckCircle2 className="w-3 h-3 text-zinc-500" /> Pautas DUA:
                              </span>
                              <ul className="list-disc list-inside text-[10.5px] text-zinc-600 space-y-0.5">
                                {estrategia.pautasDUA.map((dua, idx) => (
                                  <li key={idx}><strong className="text-zinc-800">{dua.principio}:</strong> {dua.descripcion}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Recursos Interactivos & WebApps */}
                          <div className="pt-0.5">
                            <MomentoWebAppsSection
                              momentoFiltro="todos"
                              webapps={saberWebapps}
                              saberId={saber.id}
                              saberNombre={saber.nombre}
                              indicadorTexto={saber.indicador}
                              onOpenQR={(w) =>
                                setQrModalData({
                                  webapp: w,
                                  saberNombre: saber.nombre,
                                  indicadorTexto: saber.indicador,
                                })
                              }
                              onOpenAddModal={(initial, defaultMomento) =>
                                setAddEditModalData({
                                  saberId: saber.id,
                                  saberNombre: saber.nombre,
                                  initialData: initial,
                                  defaultMomento: defaultMomento,
                                })
                              }
                              onDeleteWebapp={(id) => {
                                deleteWebapp(saber.id, id);
                                setRefreshTrigger((prev) => prev + 1);
                              }}
                            />
                          </div>

                          {/* Detalle Profundo del Eje Transversal Oficial MEP */}
                          {ejeEsp && (
                            <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${ejeEsp.ejeConfig.bgLight}`}>
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold uppercase tracking-wider text-[10px] flex items-center gap-1 text-zinc-900">
                                  <span>🧭</span>
                                  <span>Eje Transversal Integrado: {ejeEsp.ejeConfig.nombre}</span>
                                </span>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-zinc-200">
                                  Dimensión: {ejeEsp.detalle.dimensionNombre}
                                </span>
                              </div>
                              <p className="text-[10.5px] leading-relaxed"><strong className="font-semibold">Descriptor Oficial:</strong> {ejeEsp.detalle.descriptorOficial}</p>
                              <p className="text-[10.5px] leading-relaxed"><strong className="font-semibold">Fundamentación:</strong> {ejeEsp.detalle.justificacion}</p>
                            </div>
                          )}

                          {/* Panel Interactivo de Saberes Procedimentales y Actitudinales */}
                          <PanelSaberesProcedimentalesActitudinales 
                            saberId={saber.id} 
                            saberNombre={saber.nombre} 
                            modoDetallado={true} 
                          />

                          {/* Bitácora y Anotaciones */}
                          <AnotacionesIndicador saberId={saber.id} saberNombre={saber.nombre} />

                          {/* Botonera de Acciones cuando está Desplegado */}
                          <div className="pt-2 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-1.5">
                            <div className="flex flex-wrap items-center gap-1">
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
                                className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 flex items-center space-x-1 transition-all shadow-2xs cursor-pointer"
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
                                className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 flex items-center space-x-1 transition-all shadow-2xs cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3 text-amber-700" />
                                <span>{isCustom ? '✏️ Mediación Editada' : '✏️ Replantear'}</span>
                              </button>
                            </div>

                            <button
                              onClick={() => toggleExpandSaber(saber.id)}
                              className="px-2.5 py-1 rounded-lg text-[10.5px] font-bold bg-zinc-200/80 hover:bg-zinc-300 text-zinc-800 flex items-center space-x-1 transition-all cursor-pointer"
                            >
                              <span>Plegar Información ▲</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              ) : (
                /* VISTA 2: MODO LISTA COMPACTA CON ACCORDION */
                <div className="grid grid-cols-1 gap-3">
                  {area.saberes.map((saber) => {
                    const isExpanded = expandedSaberIds.includes(saber.id);
                    const { estrategia, isCustom } = getCustomEstrategiaForSaber(saber.id, saber.estrategiaMetodologica);
                    const saberWebapps = getWebapps(saber.id);

                    return (
                      <div
                        key={saber.id}
                        className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm transition-all hover:border-zinc-300"
                      >
                        <div
                          onClick={() => toggleExpandSaber(saber.id)}
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

                              {(() => {
                                const ejeEsp = getEjeEspecificoParaSaber(saber.id);
                                if (!ejeEsp) return null;
                                const { ejeConfig, detalle } = ejeEsp;
                                const iconoEje = detalle.ejePrincipal === 'pensamiento_computacional' ? '🧠' : detalle.ejePrincipal === 'ciudadania_etica_digital' ? '🛡️' : '✨';
                                return (
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${ejeConfig.bgLight}`} title={detalle.justificacion}>
                                    <span>{iconoEje}</span>
                                    <span>{ejeConfig.nombreCorto}: {detalle.dimensionNombre}</span>
                                  </span>
                                );
                              })()}

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
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 flex items-center space-x-1 transition-all shadow-2xs cursor-pointer"
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
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/70 flex items-center space-x-1 transition-all shadow-2xs cursor-pointer"
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
                            <button className="p-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200 cursor-pointer">
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

                            {/* Panel Interactivo de Saberes Procedimentales y Actitudinales Asignados */}
                            <div className="pt-2">
                              <PanelSaberesProcedimentalesActitudinales 
                                saberId={saber.id} 
                                saberNombre={saber.nombre} 
                              />
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

      {/* Modal Matriz y Balance Global de Saberes Procedimentales y Actitudinales */}
      <ModalDistribucionGlobalSaberes
        isOpen={mostrarModalDistribucionGlobal}
        onClose={() => setMostrarModalDistribucionGlobal(false)}
      />

      {/* Modal Oficial de Perfiles de Salida MEP 2026 */}
      <ModalPerfilesSalidaOficiales
        isOpen={mostrarModalPerfiles}
        onClose={() => setMostrarModalPerfiles(false)}
      />
    </div>
  );
};

