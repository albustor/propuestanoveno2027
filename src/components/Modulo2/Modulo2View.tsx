'use client';

import React, { useState } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { PROYECTOS_SEMESTRALES_NOVENO } from '../../data/proyectoFasesEtapasData';
import { EJES_TRANSVERSALES_OFICIALES, MAPEO_EJES_POR_SABER } from '../../data/ejesTransversalesData';
import { Layers, Sparkles, Search, ChevronDown, ChevronUp, Clock, Wrench, CheckCircle2, ShieldCheck, QrCode, Edit3, Leaf, Filter } from 'lucide-react';
import { WebAppRecurso, EstrategiaMetodologicaIndicador, EjeTransversalTipo } from '../../types';
import { useWebApps } from '../../lib/useWebApps';
import { getCustomEstrategiaForSaber } from '../../lib/storage';
import { MomentoWebAppsSection } from '../WebApps/MomentoWebAppsSection';
import { WebAppQRModal } from '../WebApps/WebAppQRModal';
import { WebAppAddEditModal } from '../WebApps/WebAppAddEditModal';
import { RecursoApoyoModal } from '../RecursoApoyo/RecursoApoyoModal';
import { EditorActividadMediacionModal } from '../Mediacion/EditorActividadMediacionModal';
import { AnotacionesIndicador } from '../Notas/AnotacionesIndicador';
import { ModalPerfilesSalidaOficiales } from '../ModalPerfilesSalidaOficiales';

export const Modulo2View: React.FC = () => {
  const modulo2 = MODULOS_NOVENO_OFICIAL.find((m) => m.id === 2);
  const proyecto2 = PROYECTOS_SEMESTRALES_NOVENO.find((p) => p.moduloId === 2);

  const { getWebapps, saveWebapp, deleteWebapp } = useWebApps();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('todas');
  const [expandedSaberId, setExpandedSaberId] = useState<string | null>('base_datos');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [mostrarModalPerfiles, setMostrarModalPerfiles] = useState<boolean>(false);

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

  if (!modulo2) return null;

  const filteredAreas = modulo2.areas.map((area) => {
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

  const totalIndicadores = modulo2.areas.reduce((acc, a) => acc + a.saberes.length, 0);

  return (
    <div className="space-y-6">
      {/* Banner Minimalista del Módulo 2 */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                II Semestre • II Periodo
              </span>
              <span className="text-xs text-zinc-500 font-medium">9° Año • III Ciclo MEP</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              {modulo2.nombre}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-4xl leading-relaxed">
              {modulo2.descripcion}
            </p>

            {/* Entrelazamiento de Áreas según Descripción del Módulo */}
            {modulo2.entrelazamientoAreas && (
              <div className="mt-3 p-3.5 bg-amber-50/50 border border-amber-100 rounded-xl text-xs text-zinc-700 leading-relaxed">
                <span className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                  🔗 Entrelazamiento Curricular de Áreas (Módulo 2):
                </span>
                {modulo2.entrelazamientoAreas}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 shrink-0 md:max-w-xs w-full">
            <div className="bg-amber-50/80 border border-amber-100 rounded-xl p-3">
              <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Eje del Proyecto Semestral</div>
              <div className="text-xs font-medium text-amber-950 mt-0.5">
                {modulo2.ejeProyectoSemestral}
              </div>
            </div>

            {modulo2.ejeCiclo && (
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-[11px] text-zinc-600">
                <span className="font-bold text-zinc-800">Eje de III Ciclo:</span> {modulo2.ejeCiclo}
              </div>
            )}
          </div>
        </div>

        {/* Perfil de Salida de III Ciclo */}
        {modulo2.perfilSalidaCiclo && (
          <div className="mt-4 pt-3.5 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-1.5">
              <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                🎯 Rasgos del Perfil de Salida de III Ciclo Tributados:
              </div>
              <button
                onClick={() => setMostrarModalPerfiles(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-teal-50 to-sky-50 hover:from-teal-100 hover:to-sky-100 text-teal-800 border border-teal-200/80 rounded-xl text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                title="Ver matriz completa de Perfiles de Salida MEP 2026 (4 Áreas y Ejes)"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Consultar Perfiles de Salida Oficiales MEP (4 Áreas y Ejes)</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {modulo2.perfilSalidaCiclo.map((rasgo, idx) => (
                <div key={idx} className="flex items-start space-x-1.5 text-xs text-zinc-700 bg-zinc-50 px-2.5 py-1 rounded-lg">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>{rasgo}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barra de Filtros y Búsqueda */}
        <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedArea('todas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedArea === 'todas'
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Todas las Áreas ({totalIndicadores})
            </button>
            {modulo2.areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                  selectedArea === area.id
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <span>{area.nombre}</span>
                <span className="text-[10px] opacity-70">({area.saberes.length})</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar saber, indicador o momento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-zinc-800"
            />
          </div>
        </div>
      </div>

      {/* Listado de Áreas y Saberes con los 3 Momentos Didácticos */}
      <div className="space-y-6">
        {filteredAreas.map((area) => (
          <div key={area.id} className="space-y-3">
            <div className="flex items-center space-x-2 px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-600"></div>
              <h2 className="text-base font-bold text-zinc-900 tracking-tight">{area.nombre}</h2>
              <span className="text-xs text-zinc-400">({area.saberes.length} saberes)</span>
            </div>

            {/* Tarjeta de Competencia de Área y RdA de III Ciclo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 text-zinc-700">
                <span className="font-bold text-amber-900 block mb-0.5">🏆 1 Competencia del Área:</span>
                {area.competenciaArea || 'Competencia rectora del área curricular.'}
              </div>
              <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-3 text-zinc-700">
                <span className="font-bold text-teal-900 block mb-0.5">🎯 1 RdA por Ciclo (III Ciclo):</span>
                {area.rdaCiclo || area.rda}
              </div>
            </div>

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
                    {/* Header del Saber */}
                    <div
                      onClick={() => setExpandedSaberId(isExpanded ? null : saber.id)}
                      className="p-4 sm:p-5 flex items-start justify-between cursor-pointer select-none bg-white hover:bg-zinc-50/50"
                    >
                      <div className="space-y-1.5 pr-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-zinc-900 text-sm">{saber.nombre}</span>

                          {isCustom && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1">
                              <ShieldCheck className="w-3 h-3 text-amber-600" />
                              <span>Mediación Personalizada</span>
                            </span>
                          )}

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center space-x-1">
                            <QrCode className="w-3 h-3 text-amber-700" />
                            <span>{saberWebapps.length} WebApps QR</span>
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditorMediacionData({
                                saberId: saber.id,
                                saberNombre: saber.nombre,
                                indicadorTexto: saber.indicador,
                                areaNombre: area.nombre,
                                moduloId: 2,
                                estrategiaBaseOficial: saber.estrategiaMetodologica,
                              });
                            }}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/80 flex items-center space-x-1 transition-all shadow-2xs"
                            title="Editar o Re-plantear la actividad de mediación en 3 momentos"
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
                                moduloId: 2,
                              });
                            }}
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200/70 flex items-center space-x-1 transition-all shadow-2xs"
                            title="Ver Recurso Pedagógico de Apoyo en 4 Pilares (Aprender, Comprender, Simular, Valorar)"
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

                        {/* Ejes Transversales del Saber */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Ejes:</span>
                          {(MAPEO_EJES_POR_SABER[saber.id] || []).map((ejeId) => {
                            const cfg = EJES_TRANSVERSALES_OFICIALES[ejeId];
                            if (!cfg) return null;
                            return (
                              <span
                                key={ejeId}
                                className={`px-2 py-0.5 rounded-md text-[9px] font-bold border flex items-center gap-1 ${cfg.bgLight}`}
                                title={cfg.nombre}
                              >
                                <span>{ejeId === 'pensamiento_computacional' ? '💻' : ejeId === 'ciudadania_etica_digital' ? '🛡️' : '🚀'}</span>
                                <span>{cfg.nombreCorto}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="shrink-0 pt-1">
                        <button className="p-1.5 rounded-lg bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Desglose de los 3 Momentos Didácticos al Expandir */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 border-t border-zinc-100 bg-zinc-50/40 space-y-5">
                        <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                          Estrategia Metodológica Oficial en 3 Momentos Didácticos
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {/* 1. Momento Inicio */}
                          <div className="bg-white border border-amber-100 rounded-xl p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between pb-1.5 border-b border-amber-50">
                                <span className="text-xs font-bold text-amber-900 flex items-center">
                                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 inline-flex items-center justify-center mr-1.5 text-[11px]">1</span>
                                  Momento Inicio
                                </span>
                                <span className="text-[10px] text-zinc-400 font-medium flex items-center">
                                  <Clock className="w-3 h-3 mr-0.5" />
                                  {estrategia.inicio.tiempoEstimado}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-zinc-900">
                                {estrategia.inicio.titulo}
                              </div>
                              <p className="text-xs text-zinc-600 leading-relaxed">
                                {estrategia.inicio.descripcion}
                              </p>
                              {estrategia.inicio.preguntasGeneradoras && (
                                <div className="pt-2">
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Preguntas Clave:</span>
                                  <ul className="list-disc list-inside text-[11px] text-zinc-600 space-y-0.5 mt-1">
                                    {estrategia.inicio.preguntasGeneradoras.map((p, idx) => (
                                      <li key={idx} className="italic">{p}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 2. Momento Desarrollo */}
                          <div className="bg-white border border-orange-100 rounded-xl p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between pb-1.5 border-b border-orange-50">
                                <span className="text-xs font-bold text-orange-900 flex items-center">
                                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-900 inline-flex items-center justify-center mr-1.5 text-[11px]">2</span>
                                  Momento Desarrollo
                                </span>
                                <span className="text-[10px] text-zinc-400 font-medium flex items-center">
                                  <Clock className="w-3 h-3 mr-0.5" />
                                  {estrategia.desarrollo.tiempoEstimado}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-zinc-900">
                                {estrategia.desarrollo.titulo}
                              </div>
                              <p className="text-xs text-zinc-600 leading-relaxed">
                                {estrategia.desarrollo.descripcion}
                              </p>
                              <div className="pt-2 space-y-1">
                                <div className="text-[11px] text-zinc-700">
                                  <strong className="text-zinc-900">Acción Estudiante:</strong> {estrategia.desarrollo.accionesEstudiante.join(' ')}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 3. Momento Cierre */}
                          <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow-2xs space-y-2 flex flex-col justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between pb-1.5 border-b border-emerald-50">
                                <span className="text-xs font-bold text-emerald-800 flex items-center">
                                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 inline-flex items-center justify-center mr-1.5 text-[11px]">3</span>
                                  Momento Cierre
                                </span>
                                <span className="text-[10px] text-zinc-400 font-medium flex items-center">
                                  <Clock className="w-3 h-3 mr-0.5" />
                                  {estrategia.cierre.tiempoEstimado}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-zinc-900">
                                {estrategia.cierre.titulo}
                              </div>
                              <p className="text-xs text-zinc-600 leading-relaxed">
                                {estrategia.cierre.descripcion}
                              </p>
                              <div className="pt-2 space-y-1">
                                <div className="text-[11px] text-zinc-700">
                                  <strong className="text-zinc-900">Evaluación / Cierre:</strong> {estrategia.cierre.accionesDocente.join(' ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Metadatos de Recursos, Pensamiento Computacional y DUA */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                          <div className="bg-zinc-100/70 rounded-xl p-3 text-xs space-y-1">
                            <span className="font-bold text-zinc-700 flex items-center">
                              <Wrench className="w-3.5 h-3.5 mr-1 text-zinc-500" />
                              Recursos Recomendados:
                            </span>
                            <div className="text-[11px] text-zinc-600">
                              <strong>Conectado:</strong> {estrategia.recursosSugeridos.conectado.join(', ')}
                            </div>
                            <div className="text-[11px] text-zinc-600">
                              <strong>Desconectado:</strong> {estrategia.recursosSugeridos.desconectado.join(', ')}
                            </div>
                          </div>

                          <div className="bg-zinc-100/70 rounded-xl p-3 text-xs space-y-1">
                            <span className="font-bold text-zinc-700 flex items-center">
                              <Sparkles className="w-3.5 h-3.5 mr-1 text-zinc-500" />
                              Pensador Computacional:
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {estrategia.practicasComputacionales.map((p, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-white text-zinc-700 border border-zinc-200 text-[10px]">
                                  {p}
                                </span>
                              ))}
                            </div>
                            <div className="text-[10px] text-zinc-500 italic mt-1">
                              Actitudes: {estrategia.actitudesComputacionales.join(', ')}
                            </div>
                          </div>

                          <div className="bg-zinc-100/70 rounded-xl p-3 text-xs space-y-1">
                            <span className="font-bold text-zinc-700 flex items-center">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-zinc-500" />
                              Pautas DUA Integradas:
                            </span>
                            <ul className="list-disc list-inside text-[11px] text-zinc-600 space-y-0.5">
                              {estrategia.pautasDUA.map((dua, idx) => (
                                <li key={idx}>
                                  <strong className="text-zinc-800">{dua.principio}:</strong> {dua.descripcion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Espacio de Anotaciones y Bitácora Docente por Indicador */}
                        <AnotacionesIndicador saberId={saber.id} saberNombre={saber.nombre} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
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

      {/* Modal Oficial de Perfiles de Salida MEP 2026 */}
      <ModalPerfilesSalidaOficiales
        isOpen={mostrarModalPerfiles}
        onClose={() => setMostrarModalPerfiles(false)}
      />
    </div>
  );
};

