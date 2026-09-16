'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Calendar,
  BookOpen,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Layers,
  Bot
} from 'lucide-react';
import { EntradaRegistroDiario, ResumenDiarioIA } from '../../types';
import {
  getAllNotasSaberes,
  getAllEntradasDiarias,
  saveResumenDiarioIA,
  getAllResumenesDiariosIA
} from '../../lib/storage';
import { processAICascade } from '../../lib/ai-service';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';

interface ResumenDiarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSaberId?: string;
}

export const ResumenDiarioModal: React.FC<ResumenDiarioModalProps> = ({
  isOpen,
  onClose,
  initialSaberId,
}) => {
  const [selectedFecha, setSelectedFecha] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [resumenTexto, setResumenTexto] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [providerInfo, setProviderInfo] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'generar' | 'historial'>('generar');
  const [historialResumenes, setHistorialResumenes] = useState<ResumenDiarioIA[]>([]);

  // Cargar historial
  useEffect(() => {
    if (isOpen) {
      setHistorialResumenes(getAllResumenesDiariosIA());
      generarSintesisIA();
    }
  }, [isOpen, selectedFecha]);

  const allSaberes = MODULOS_NOVENO_OFICIAL.flatMap((m) => m.areas.flatMap((a) => a.saberes));
  const allNotas = getAllNotasSaberes();
  const allEntradas = getAllEntradasDiarias();
  const [ideasLibresUsuario, setIdeasLibresUsuario] = useState<string>('');

  // Saberes que tienen notas registradas
  const saberesConNotas = allSaberes.filter((s) => allNotas[s.id] && allNotas[s.id].trim().length > 0);

  const generarSintesisIA = async () => {
    setLoading(true);

    // Compilar todas las anotaciones, entradas registradas y reuniones
    const lineasAnotaciones: string[] = [];

    if (ideasLibresUsuario.trim()) {
      lineasAnotaciones.push(`- **Aportes e Ideas Clave Ingresadas:**\n  ${ideasLibresUsuario.trim()}`);
    }

    allSaberes.forEach((s) => {
      const nota = allNotas[s.id];
      if (nota && nota.trim()) {
        lineasAnotaciones.push(`- **Saber: ${s.nombre}** (Indicador: "${s.indicador}"):\n  *Anotaciones del Docente:* ${nota.trim()}`);
      }
    });

    const entradasDeFecha = allEntradas.filter((e) => e.fecha === selectedFecha);
    entradasDeFecha.forEach((e) => {
      lineasAnotaciones.push(`- **Registro de Bitácora [${e.hora} - ${e.saberNombre}]:** ${e.textoNota}`);
    });

    const promptContext = lineasAnotaciones.length > 0
      ? lineasAnotaciones.join('\n\n')
      : `Revisión y articulación curricular de los saberes de 9° Año (Módulos 1 y 2).`;

    try {
      const response = await processAICascade({
        prompt: `Actúa como un redactor ejecutivo pedagógico oficial de alto nivel. Redacta y contextualiza un Reporte Ejecutivo de Avances Diarios con base en las siguientes ideas, reflexiones y anotaciones ingresadas por el equipo docente:\n\n${promptContext}`,
        tipo: 'resumen_avances_diarios_ia',
        contexto: {
          fecha: selectedFecha,
          tema: 'Reporte Ejecutivo y Relatoría de Avances Diarios (9° Año MEP)',
          areas: saberesConNotas.length > 0 ? saberesConNotas.map((s) => s.nombre) : ['Robótica y Computación Física', 'Algoritmos', 'Ciencia de Datos', 'IA'],
          indicadores: saberesConNotas.map((s) => s.indicador),
          avancesEspecificos: promptContext,
          temasTratados: ideasLibresUsuario.trim() || 'Desarrollo curricular, software de programación, simuladores y mediación contextual'
        }
      });

      setResumenTexto(response.content);
      setProviderInfo(response.provider);

      // Guardar resumen en historial
      const nuevoResumen: ResumenDiarioIA = {
        id: `resumen_${selectedFecha}_${Date.now()}`,
        fecha: selectedFecha,
        totalEntradas: lineasAnotaciones.length,
        saberesInvolucrados: saberesConNotas.map((s) => s.nombre),
        sintesisGeneral: response.content,
        logrosAlcanzados: [],
        retosYDificultades: [],
        recomendacionesSiguienteSesion: [],
        textoCompletoGenerado: response.content,
        timestamp: new Date().toISOString(),
      };
      saveResumenDiarioIA(nuevoResumen);
      setHistorialResumenes(getAllResumenesDiariosIA());
    } catch (e) {
      console.error('Error generating AI daily summary', e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumenTexto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([resumenTexto], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Resumen_Diario_MEP_9_${selectedFecha}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-start justify-between bg-gradient-to-r from-amber-50/70 via-sky-50/50 to-indigo-50/70">
          <div className="space-y-1 pr-3">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-700 animate-pulse" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Síntesis de Avances Diarios con IA • 9° Año MEP
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900">
              Resumen Ejecutivo de Acciones y Mediación Diaria
            </h2>
            <p className="text-xs text-zinc-600">
              Compilación inteligente de todas las anotaciones y bitácoras docentes registradas por indicador.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Filtro de Fecha y Navegación */}
        <div className="p-3 sm:px-5 border-b border-zinc-100 bg-zinc-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span className="font-bold text-zinc-700">Fecha de Registro:</span>
            <input
              type="date"
              value={selectedFecha}
              onChange={(e) => setSelectedFecha(e.target.value)}
              className="px-2.5 py-1 bg-white border border-zinc-200 rounded-lg text-xs font-medium text-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('generar')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'generar'
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Síntesis del Día
            </button>
            <button
              onClick={() => setActiveTab('historial')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'historial'
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Historial ({historialResumenes.length})
            </button>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {activeTab === 'generar' ? (
            <>
              {/* Badge Informativo de Fuentes Analizadas */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="font-bold text-amber-950 flex items-center space-x-1.5">
                    <ClipboardList className="w-3.5 h-3.5 text-amber-700" />
                    <span>Indicadores con anotaciones activas: {saberesConNotas.length} de {allSaberes.length}</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    {saberesConNotas.length > 0
                      ? saberesConNotas.map((s) => s.nombre).join(', ')
                      : 'Puedes escribir anotaciones en cualquier saber de Módulo 1 o Módulo 2 para incluirlas aquí.'}
                  </p>
                </div>

                <button
                  onClick={generarSintesisIA}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center space-x-1 shrink-0 transition-all shadow-2xs"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Sintetizando...' : 'Regenerar con IA'}</span>
                </button>
              </div>

              {/* Caja para ingresar ideas y notas clave del día */}
              <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2 shadow-2xs">
                <label className="font-bold text-zinc-800 flex items-center justify-between text-xs">
                  <span className="flex items-center space-x-1.5 text-zinc-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Ideas clave, acuerdos o temas del día (para alimentar la redacción ejecutiva):</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal">Opcional</span>
                </label>
                <textarea
                  rows={3}
                  value={ideasLibresUsuario}
                  onChange={(e) => setIdeasLibresUsuario(e.target.value)}
                  placeholder="Ej: Hoy con Allan acordamos priorizar simuladores como Tinkercad para no perder lecciones de robótica, y definimos trabajar prototipos físicos o digitales según el equipo disponible..."
                  className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={generarSintesisIA}
                    disabled={loading}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-bold flex items-center space-x-1.5 transition-all text-xs shadow-2xs"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    <span>{loading ? 'Redactando Informe...' : 'Redactar Reporte Ejecutivo con IA'}</span>
                  </button>
                </div>
              </div>

              {/* Caja de Texto del Resumen Generado */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-zinc-700 flex items-center space-x-1">
                    <Bot className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Reporte Ejecutivo de Avances y Mediación Curricular (Editable):</span>
                  </label>
                  {providerInfo && (
                    <span className="text-[10px] text-zinc-500 font-medium">{providerInfo}</span>
                  )}
                </div>

                <textarea
                  rows={14}
                  value={resumenTexto}
                  onChange={(e) => setResumenTexto(e.target.value)}
                  className="w-full p-4 bg-zinc-50/80 border border-zinc-200 rounded-xl font-mono text-[11px] leading-relaxed text-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 select-all"
                  placeholder="El resumen generado por IA aparecerá aquí..."
                />
              </div>
            </>
          ) : (
            /* Tab Historial */
            <div className="space-y-3">
              <h3 className="font-bold text-zinc-800 text-xs uppercase tracking-wider">
                Historial de Informes de Avance Generados
              </h3>
              {historialResumenes.length === 0 ? (
                <div className="p-8 text-center bg-zinc-50 rounded-xl border border-dashed border-zinc-200 text-zinc-400">
                  No hay resúmenes históricos guardados aún.
                </div>
              ) : (
                <div className="space-y-2">
                  {historialResumenes.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedFecha(item.fecha);
                        setResumenTexto(item.textoCompletoGenerado);
                        setActiveTab('generar');
                      }}
                      className="p-3 bg-white border border-zinc-200 hover:border-zinc-300 rounded-xl cursor-pointer transition-all flex items-center justify-between hover:bg-zinc-50"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-zinc-900 text-xs">
                          Informe del {item.fecha}
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          {item.saberesInvolucrados.length} saberes analizados • Guardado: {new Date(item.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                      <span className="text-xs text-sky-600 font-semibold hover:underline">
                        Ver informe →
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">¡Copiado al Portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Informe Formateado</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Markdown (.md)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-bold transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
