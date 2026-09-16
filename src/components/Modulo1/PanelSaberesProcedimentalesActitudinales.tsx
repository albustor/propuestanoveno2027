'use client';

import React, { useState, useEffect } from 'react';
import { 
  DICCIONARIO_PROCEDIMENTALES, 
  DICCIONARIO_ACTITUDINALES, 
  getDistribucionSaberesParaIndicador, 
  DistribucionSaberesIndicador 
} from '../../data/saberesPensamientoCompData';
import { getMapaSeguimientoSaberesLocal, saveEstadoSaberLocal } from '../../lib/storage';
import { EstadoSeguimientoSaber } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  XCircle, 
  Wrench, 
  HeartHandshake, 
  Sparkles, 
  Info, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

interface PanelSaberesProps {
  saberId: string;
  saberNombre: string;
  modoDetallado?: boolean;
}

export const PanelSaberesProcedimentalesActitudinales: React.FC<PanelSaberesProps> = ({
  saberId,
  saberNombre,
  modoDetallado = false
}) => {
  const distribucion = getDistribucionSaberesParaIndicador(saberId);
  const [mapaEstados, setMapaEstados] = useState<Record<string, EstadoSeguimientoSaber>>({});
  const [expandido, setExpandido] = useState<boolean>(modoDetallado);

  useEffect(() => {
    cargarEstados();

    const handleActualizacion = (e: any) => {
      if (e.detail?.saberCurricularId === saberId) {
        cargarEstados();
      }
    };

    window.addEventListener('seguimiento_saberes_actualizado', handleActualizacion);
    return () => {
      window.removeEventListener('seguimiento_saberes_actualizado', handleActualizacion);
    };
  }, [saberId]);

  const cargarEstados = () => {
    const mapaGlobal = getMapaSeguimientoSaberesLocal();
    setMapaEstados(mapaGlobal[saberId] || {});
  };

  if (!distribucion) return null;

  const procedimentales = distribucion.saberesProcedimentalesIds
    .map((id) => DICCIONARIO_PROCEDIMENTALES[id])
    .filter(Boolean);

  const actitudinales = distribucion.saberesActitudinalesIds
    .map((id) => DICCIONARIO_ACTITUDINALES[id])
    .filter(Boolean);

  const totalSaberes = procedimentales.length + actitudinales.length;

  const getEstado = (id: string): EstadoSeguimientoSaber => {
    return mapaEstados[id] || 'pendiente';
  };

  const handleCambiarEstado = (id: string, nuevoEstado: EstadoSeguimientoSaber) => {
    saveEstadoSaberLocal(saberId, id, nuevoEstado);
    setMapaEstados((prev) => ({ ...prev, [id]: nuevoEstado }));
  };

  // Conteo de estados
  const todosIds = [...distribucion.saberesProcedimentalesIds, ...distribucion.saberesActitudinalesIds];
  const trabajados = todosIds.filter((id) => getEstado(id) === 'trabajado').length;
  const enProceso = todosIds.filter((id) => getEstado(id) === 'en_proceso').length;
  const pendientes = todosIds.filter((id) => getEstado(id) === 'pendiente').length;
  const descartados = todosIds.filter((id) => getEstado(id) === 'descartado').length;
  const porcentaje = totalSaberes > 0 ? Math.round((trabajados / totalSaberes) * 100) : 0;

  const getBadgeEstado = (estado: EstadoSeguimientoSaber) => {
    switch (estado) {
      case 'trabajado':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          label: 'Se Sabe / Trabajado',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600'
        };
      case 'en_proceso':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          label: 'En Desarrollo',
          icon: Clock,
          iconColor: 'text-amber-600'
        };
      case 'descartado':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200 opacity-70',
          label: 'Descartado / No aplica',
          icon: XCircle,
          iconColor: 'text-rose-500'
        };
      case 'pendiente':
      default:
        return {
          bg: 'bg-zinc-100 text-zinc-600 border-zinc-200',
          label: 'Pendiente',
          icon: Circle,
          iconColor: 'text-zinc-400'
        };
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50/40 via-sky-50/30 to-purple-50/40 border border-indigo-200/80 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
      {/* Header del Panel con Barra de Progreso y Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-indigo-100">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 rounded-lg bg-indigo-100 text-indigo-800">
              <Wrench className="w-3.5 h-3.5" />
            </span>
            <h4 className="font-extrabold text-xs text-indigo-950 uppercase tracking-wider">
              Saberes Procedimentales y Actitudinales Asignados (MEP 2026)
            </h4>
          </div>
          <p className="text-[11px] text-zinc-600 font-medium">
            Distribución curricular y seguimiento en tiempo real para <strong className="text-zinc-900">{saberNombre}</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="flex items-center space-x-1.5 text-[10px] font-bold bg-white px-2.5 py-1 rounded-xl border border-indigo-200/70 shadow-2xs">
            <span className="text-emerald-700">{trabajados} trabajados</span>
            <span className="text-zinc-300">•</span>
            <span className="text-amber-700">{enProceso} en proceso</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-500">{pendientes} pendientes</span>
            {descartados > 0 && (
              <>
                <span className="text-zinc-300">•</span>
                <span className="text-rose-600">{descartados} descartados</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpandido(!expandido)}
            className="p-1.5 rounded-lg bg-white border border-indigo-200/70 hover:bg-indigo-50 text-indigo-700 transition-colors"
            title={expandido ? 'Ver vista compacta' : 'Ver desglose completo'}
          >
            {expandido ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Procedimiento Técnico Concreto */}
      <div className="bg-white/80 border border-indigo-100 rounded-xl p-3 space-y-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-900 flex items-center gap-1">
          <span>⚙️</span> Procedimiento Técnico Específico de Aula:
        </span>
        <p className="text-xs text-zinc-800 leading-relaxed font-medium">
          {distribucion.procedimientoTecnicoEspecifico}
        </p>
      </div>

      {/* Barra de Progreso Visual */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] font-semibold text-zinc-500">
          <span>Progreso de apropiación de saberes:</span>
          <span className="font-bold text-indigo-900">{porcentaje}% completado</span>
        </div>
        <div className="w-full bg-zinc-200/80 rounded-full h-2 overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(trabajados / totalSaberes) * 100}%` }}
            title={`Trabajados: ${trabajados}`}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{ width: `${(enProceso / totalSaberes) * 100}%` }}
            title={`En proceso: ${enProceso}`}
          />
          <div
            className="bg-rose-400 h-full transition-all duration-300"
            style={{ width: `${(descartados / totalSaberes) * 100}%` }}
            title={`Descartados: ${descartados}`}
          />
        </div>
      </div>

      {/* SECCIÓN 1: SABERES PROCEDIMENTALES (SABER HACER) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1">
            <span>🛠️</span> Saberes Procedimentales ({procedimentales.length}) — Pensamiento Computacional:
          </span>
          <span className="text-[10px] text-zinc-500">Haz clic en un estado para registrar avance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {procedimentales.map((proc) => {
            const estadoActual = getEstado(proc.id);
            const cfg = getBadgeEstado(estadoActual);
            const Icon = cfg.icon;

            return (
              <div
                key={proc.id}
                className={`p-3 rounded-xl border transition-all space-y-2 bg-white ${
                  estadoActual === 'descartado' ? 'opacity-60 border-zinc-200 bg-zinc-50' : 'border-zinc-200/90 shadow-2xs hover:border-indigo-300'
                }`}
              >
                <div className="flex items-start justify-between gap-1.5">
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-zinc-900 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                      {proc.nombre}
                    </span>
                    <p className="text-[11px] text-zinc-600 leading-snug">
                      {proc.observable}
                    </p>
                  </div>
                </div>

                {/* Botonera de 4 Estados */}
                <div className="pt-1.5 border-t border-zinc-100 flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(proc.id, 'trabajado')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                      estadoActual === 'trabajado'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200/70 hover:bg-emerald-100'
                    }`}
                    title="Marcar como sabido / adquirido por el estudiantado"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Se Sabe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(proc.id, 'en_proceso')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                      estadoActual === 'en_proceso'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-amber-50 text-amber-800 border-amber-200/70 hover:bg-amber-100'
                    }`}
                    title="Marcar en desarrollo / trabajando actualmente"
                  >
                    <Clock className="w-3 h-3" />
                    <span>En Proceso</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(proc.id, 'pendiente')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                      estadoActual === 'pendiente'
                        ? 'bg-zinc-700 text-white border-zinc-800 shadow-2xs'
                        : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                    }`}
                    title="Marcar como pendiente"
                  >
                    <Circle className="w-3 h-3" />
                    <span>Pendiente</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(proc.id, 'descartado')}
                    className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-0.5 ${
                      estadoActual === 'descartado'
                        ? 'bg-rose-600 text-white border-rose-700 shadow-2xs'
                        : 'bg-rose-50 text-rose-700 border-rose-200/70 hover:bg-rose-100'
                    }`}
                    title="Descartar para esta mediación o no aplicable"
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Descartar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN 2: SABERES ACTITUDINALES (SABER SER / CONVIVIR) */}
      <div className="space-y-2 pt-1">
        <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1">
          <HeartHandshake className="w-3.5 h-3.5 text-purple-700" />
          Saberes Actitudinales ({actitudinales.length}) — Prácticas y Actitudes del Pensador:
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {actitudinales.map((act) => {
            const estadoActual = getEstado(act.id);
            const cfg = getBadgeEstado(estadoActual);

            return (
              <div
                key={act.id}
                className={`p-3 rounded-xl border transition-all space-y-2 bg-white ${
                  estadoActual === 'descartado' ? 'opacity-60 border-zinc-200 bg-zinc-50' : 'border-zinc-200/90 shadow-2xs hover:border-purple-300'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-zinc-900 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    {act.nombre}
                  </span>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    {act.observable}
                  </p>
                </div>

                {/* Botonera de 4 Estados */}
                <div className="pt-1.5 border-t border-zinc-100 flex flex-wrap items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(act.id, 'trabajado')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                      estadoActual === 'trabajado'
                        ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200/70 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Se Sabe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(act.id, 'en_proceso')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                      estadoActual === 'en_proceso'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-amber-50 text-amber-800 border-amber-200/70 hover:bg-amber-100'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>En Proceso</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(act.id, 'pendiente')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-1 ${
                      estadoActual === 'pendiente'
                        ? 'bg-zinc-700 text-white border-zinc-800 shadow-2xs'
                        : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200'
                    }`}
                  >
                    <Circle className="w-3 h-3" />
                    <span>Pendiente</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCambiarEstado(act.id, 'descartado')}
                    className={`px-1.5 py-0.5 rounded-lg text-[10px] font-bold border transition-all flex items-center gap-0.5 ${
                      estadoActual === 'descartado'
                        ? 'bg-rose-600 text-white border-rose-700 shadow-2xs'
                        : 'bg-rose-50 text-rose-700 border-rose-200/70 hover:bg-rose-100'
                    }`}
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Descartar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
