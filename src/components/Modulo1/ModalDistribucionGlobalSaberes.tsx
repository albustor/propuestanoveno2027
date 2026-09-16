'use client';

import React, { useState, useEffect } from 'react';
import { 
  SABERES_PROCEDIMENTALES_NOVENO, 
  SABERES_ACTITUDINALES_NOVENO, 
  DISTRIBUCION_SABERES_M1 
} from '../../data/saberesPensamientoCompData';
import { getMapaSeguimientoSaberesLocal, saveEstadoSaberLocal } from '../../lib/storage';
import { EstadoSeguimientoSaber } from '../../types';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Circle, 
  XCircle, 
  Wrench, 
  HeartHandshake, 
  Filter, 
  Search, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  Layers 
} from 'lucide-react';

interface ModalDistribucionGlobalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalDistribucionGlobalSaberes: React.FC<ModalDistribucionGlobalProps> = ({
  isOpen,
  onClose
}) => {
  const [mapaGlobal, setMapaGlobal] = useState<Record<string, Record<string, EstadoSeguimientoSaber>>>({});
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'procedimentales' | 'actitudinales'>('todos');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | EstadoSeguimientoSaber>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (isOpen) {
      cargarDatos();
    }
  }, [isOpen]);

  const cargarDatos = () => {
    setMapaGlobal(getMapaSeguimientoSaberesLocal());
  };

  if (!isOpen) return null;

  // Lista de todos los saberes curriculares de M1
  const saberesCurriculares = Object.values(DISTRIBUCION_SABERES_M1);

  // Mapear cada saber procedimental a qué indicadores pertenece y su estado
  const listaProcedimentalesConIndicadores = SABERES_PROCEDIMENTALES_NOVENO.map((proc) => {
    const indicadoresAsociados = saberesCurriculares.filter((sc) => 
      sc.saberesProcedimentalesIds.includes(proc.id)
    );
    return {
      tipo: 'procedimental' as const,
      ...proc,
      indicadoresAsociados
    };
  });

  // Mapear cada saber actitudinal a qué indicadores pertenece y su estado
  const listaActitudinalesConIndicadores = SABERES_ACTITUDINALES_NOVENO.map((act) => {
    const indicadoresAsociados = saberesCurriculares.filter((sc) => 
      sc.saberesActitudinalesIds.includes(act.id)
    );
    return {
      tipo: 'actitudinal' as const,
      ...act,
      indicadoresAsociados
    };
  });

  const todosLosSaberes = [
    ...listaProcedimentalesConIndicadores,
    ...listaActitudinalesConIndicadores
  ];

  // Métricas Globales
  let totalInstancias = 0;
  let totalTrabajadas = 0;
  let totalEnProceso = 0;
  let totalPendientes = 0;
  let totalDescartadas = 0;

  saberesCurriculares.forEach((sc) => {
    const ids = [...sc.saberesProcedimentalesIds, ...sc.saberesActitudinalesIds];
    ids.forEach((id) => {
      totalInstancias++;
      const est = mapaGlobal[sc.saberId]?.[id] || 'pendiente';
      if (est === 'trabajado') totalTrabajadas++;
      else if (est === 'en_proceso') totalEnProceso++;
      else if (est === 'descartado') totalDescartadas++;
      else totalPendientes++;
    });
  });

  const porcentajeGlobal = totalInstancias > 0 ? Math.round((totalTrabajadas / totalInstancias) * 100) : 0;

  const filtrados = todosLosSaberes.filter((item) => {
    if (filtroTipo === 'procedimentales' && item.tipo !== 'procedimental') return false;
    if (filtroTipo === 'actitudinales' && item.tipo !== 'actitudinal') return false;
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      const matchName = item.nombre.toLowerCase().includes(q);
      const matchObs = item.observable.toLowerCase().includes(q);
      const matchInd = item.indicadoresAsociados.some((i) => i.saberNombre.toLowerCase().includes(q));
      if (!matchName && !matchObs && !matchInd) return false;
    }
    return true;
  });

  const handleCambiarEstado = (saberCurricularId: string, saberId: string, nuevoEstado: EstadoSeguimientoSaber) => {
    saveEstadoSaberLocal(saberCurricularId, saberId, nuevoEstado);
    setMapaGlobal((prev) => ({
      ...prev,
      [saberCurricularId]: {
        ...(prev[saberCurricularId] || {}),
        [saberId]: nuevoEstado
      }
    }));
  };

  const handleExportarResumen = () => {
    let md = `# Balance y Distribución de Saberes Procedimentales y Actitudinales\n`;
    md += `**Módulo 1: Robótica y Algoritmos (Noveno Año - MEP 2026)**\n\n`;
    md += `*Fecha:* ${new Date().toLocaleDateString('es-CR')} | *Progreso:* ${porcentajeGlobal}%\n\n`;
    md += `### 📊 Métricas Globales:\n`;
    md += `- **Trabajados / Se Sabe:** ${totalTrabajadas} / ${totalInstancias}\n`;
    md += `- **En Desarrollo:** ${totalEnProceso}\n`;
    md += `- **Pendientes:** ${totalPendientes}\n`;
    md += `- **Descartados:** ${totalDescartadas}\n\n`;
    md += `---\n\n`;

    md += `### 🛠️ Saberes Procedimentales (13) y Asignación:\n\n`;
    listaProcedimentalesConIndicadores.forEach((p) => {
      md += `#### • ${p.nombre}\n`;
      md += `*Observable:* ${p.observable}\n`;
      md += `*Indicadores donde se desarrolla:* ${p.indicadoresAsociados.map(i => i.saberNombre).join(', ')}\n\n`;
    });

    md += `### 💜 Saberes Actitudinales (4) y Asignación:\n\n`;
    listaActitudinalesConIndicadores.forEach((a) => {
      md += `#### • ${a.nombre}\n`;
      md += `*Observable:* ${a.observable}\n`;
      md += `*Indicadores donde se desarrolla:* ${a.indicadoresAsociados.map(i => i.saberNombre).join(', ')}\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Balance_Saberes_Procedimentales_Actitudinales_M1_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
        
        {/* Header del Modal */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 flex items-start justify-between">
          <div className="space-y-1 pr-3">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-xl bg-indigo-600 text-white shadow-xs">
                <Layers className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-900 bg-indigo-100/70 px-2.5 py-0.5 rounded-lg">
                Módulo 1: Robótica y Algoritmos • III Ciclo MEP
              </span>
            </div>
            <h3 className="font-black text-lg text-zinc-900 tracking-tight">
              Matriz y Balance de Saberes Procedimentales y Actitudinales
            </h3>
            <p className="text-xs text-zinc-600 font-medium">
              Verifica y gestiona la cobertura del 100% de las 13 prácticas procedimentales y 4 actitudes del Pensamiento Computacional.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-xl hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard de Métricas y Filtros */}
        <div className="p-4 sm:p-6 bg-zinc-50/60 border-b border-zinc-100 space-y-4 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Trabajados / Se Sabe</span>
              <div className="text-xl font-black text-emerald-600 mt-0.5">{totalTrabajadas} <span className="text-xs font-semibold text-zinc-400">/ {totalInstancias}</span></div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">En Desarrollo</span>
              <div className="text-xl font-black text-amber-600 mt-0.5">{totalEnProceso}</div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-zinc-200 shadow-2xs">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block">Pendientes</span>
              <div className="text-xl font-black text-zinc-800 mt-0.5">{totalPendientes}</div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-purple-200 shadow-2xs">
              <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">Cobertura Módulo 1</span>
              <div className="text-xl font-black text-purple-700 mt-0.5">{porcentajeGlobal}%</div>
            </div>
          </div>

          {/* Barra de Filtros y Búsqueda */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
              <button
                onClick={() => setFiltroTipo('todos')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filtroTipo === 'todos' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                Todos ({todosLosSaberes.length})
              </button>
              <button
                onClick={() => setFiltroTipo('procedimentales')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filtroTipo === 'procedimentales' ? 'bg-sky-700 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                🛠️ Procedimentales (13)
              </button>
              <button
                onClick={() => setFiltroTipo('actitudinales')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filtroTipo === 'actitudinales' ? 'bg-purple-700 text-white' : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                💜 Actitudinales (4)
              </button>
            </div>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Buscar saber u observable..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <button
                onClick={handleExportarResumen}
                className="px-3 py-1.5 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-bold flex items-center space-x-1 shrink-0 shadow-2xs"
                title="Exportar balance completo en formato Markdown"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar (.md)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Saberes con sus Indicadores Asignados */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          <div className="grid grid-cols-1 gap-3.5">
            {filtrados.map((saber) => (
              <div
                key={saber.id}
                className="bg-white rounded-2xl border border-zinc-200 p-4 sm:p-5 shadow-2xs hover:border-indigo-300 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider ${
                        saber.tipo === 'procedimental' ? 'bg-sky-100 text-sky-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {saber.tipo === 'procedimental' ? '🛠️ Procedimental (Saber Hacer)' : '💜 Actitudinal (Saber Ser)'}
                      </span>
                      <span className="text-xs font-bold text-zinc-900">{saber.nombre}</span>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                      <strong>Observable MEP:</strong> {saber.observable}
                    </p>
                  </div>
                </div>

                {/* Desglose por Indicador de Módulo 1 */}
                <div className="pt-2 border-t border-zinc-100 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-500">
                    Asignado a {saber.indicadoresAsociados.length} Indicador(es) en Módulo 1 (Robótica y Algoritmos):
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {saber.indicadoresAsociados.map((ind) => {
                      const estado = mapaGlobal[ind.saberId]?.[saber.id] || 'pendiente';

                      return (
                        <div
                          key={ind.saberId}
                          className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-2.5 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[11px] text-zinc-800 truncate" title={ind.saberNombre}>
                              {ind.saberNombre}
                            </span>
                          </div>

                          {/* Selector de estado directo */}
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleCambiarEstado(ind.saberId, saber.id, 'trabajado')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-all ${
                                estado === 'trabajado'
                                  ? 'bg-emerald-600 text-white border-emerald-700'
                                  : 'bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50'
                              }`}
                              title="Se sabe"
                            >
                              ✓ Se Sabe
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCambiarEstado(ind.saberId, saber.id, 'en_proceso')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-all ${
                                estado === 'en_proceso'
                                  ? 'bg-amber-500 text-white border-amber-600'
                                  : 'bg-white text-amber-800 border-amber-200 hover:bg-amber-50'
                              }`}
                              title="En proceso"
                            >
                              ⏳ En Proceso
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCambiarEstado(ind.saberId, saber.id, 'pendiente')}
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold border transition-all ${
                                estado === 'pendiente'
                                  ? 'bg-zinc-700 text-white border-zinc-800'
                                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                              }`}
                              title="Pendiente"
                            >
                              ○ Pendiente
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCambiarEstado(ind.saberId, saber.id, 'descartado')}
                              className={`px-1 py-0.5 rounded text-[9px] font-bold border transition-all ${
                                estado === 'descartado'
                                  ? 'bg-rose-600 text-white border-rose-700'
                                  : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50'
                              }`}
                              title="Descartar"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer del Modal */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-xs">
          <span className="text-[11px] text-zinc-500 font-medium">
            100% de saberes procedimentales y actitudinales articulados con los programas oficiales de 9° Año.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold"
          >
            Cerrar Matriz
          </button>
        </div>
      </div>
    </div>
  );
};
