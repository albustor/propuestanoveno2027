'use client';

import React from 'react';
import { WebAppRecurso } from '../../types';
import { QrCode, ExternalLink, Plus, Trash2, Edit3, Smartphone, Laptop, Sparkles } from 'lucide-react';

interface MomentoWebAppsSectionProps {
  saberId: string;
  saberNombre: string;
  indicadorTexto: string;
  momentoFiltro: 'desarrollo' | 'cierre' | 'todos';
  webapps: WebAppRecurso[];
  onOpenQR: (webapp: WebAppRecurso) => void;
  onOpenAddModal: (initial?: WebAppRecurso | null, defaultMomento?: 'desarrollo' | 'cierre') => void;
  onDeleteWebapp?: (webappId: string) => void;
}

export const MomentoWebAppsSection: React.FC<MomentoWebAppsSectionProps> = ({
  saberId,
  saberNombre,
  indicadorTexto,
  momentoFiltro,
  webapps,
  onOpenQR,
  onOpenAddModal,
  onDeleteWebapp,
}) => {
  // Filtrar las webapps correspondientes
  const filteredWebapps = webapps.filter((w) => {
    if (momentoFiltro === 'todos') return true;
    if (w.momentoAsociado === 'ambos' || w.momentoAsociado === 'apoyo') return true;
    return w.momentoAsociado === momentoFiltro;
  });

  const isDesarrollo = momentoFiltro === 'desarrollo';
  const isCierre = momentoFiltro === 'cierre';

  const badgeColor = isDesarrollo 
    ? 'bg-indigo-50 border-indigo-200 text-indigo-800' 
    : isCierre 
      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
      : 'bg-sky-50 border-sky-200 text-sky-800';

  return (
    <div className="mt-3 pt-3 border-t border-zinc-100 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <QrCode className={`w-3.5 h-3.5 ${isDesarrollo ? 'text-indigo-600' : isCierre ? 'text-emerald-600' : 'text-sky-600'}`} />
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-700">
            WebApps y Recursos Interactivos ({filteredWebapps.length})
          </span>
        </div>

        <button
          onClick={() => onOpenAddModal(null, isDesarrollo ? 'desarrollo' : isCierre ? 'cierre' : 'desarrollo')}
          className="text-[10px] font-bold text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-2 py-0.5 rounded-md flex items-center space-x-1 transition-colors"
          title="Vincular nueva WebApp con código QR"
        >
          <Plus className="w-3 h-3" />
          <span>Vincular WebApp</span>
        </button>
      </div>

      {filteredWebapps.length === 0 ? (
        <div className="p-2.5 rounded-xl bg-zinc-50 border border-dashed border-zinc-200 text-center">
          <p className="text-[11px] text-zinc-400">
            No hay WebApps vinculadas para este momento aún. Haz clic en "Vincular WebApp" para agregar una con QR.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {filteredWebapps.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-zinc-200 rounded-xl p-2.5 shadow-2xs hover:border-zinc-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase border ${badgeColor}`}>
                    {item.tipo || 'Recurso'}
                  </span>
                  {item.esOffline && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-zinc-100 text-zinc-600">
                      ⚡ Offline
                    </span>
                  )}
                  <span className="text-xs font-bold text-zinc-900 truncate">
                    {item.titulo}
                  </span>
                </div>
                {item.descripcion && (
                  <p className="text-[10px] text-zinc-500 line-clamp-1">
                    {item.descripcion}
                  </p>
                )}
              </div>

              {/* Acciones Rápidas */}
              <div className="flex items-center space-x-1.5 shrink-0 self-end sm:self-center">
                {/* Botón QR */}
                <button
                  onClick={() => onOpenQR(item)}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 text-[11px] font-semibold flex items-center space-x-1 transition-colors shadow-2xs"
                  title="Abrir y descargar código QR para estudiantes"
                >
                  <QrCode className="w-3.5 h-3.5 text-sky-400" />
                  <span>Código QR</span>
                </button>

                {/* Botón Abrir WebApp */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  title="Abrir enlace en nueva pestaña"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Botón Eliminar si es custom */}
                {onDeleteWebapp && (
                  <button
                    onClick={() => onDeleteWebapp(item.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Eliminar recurso vinculado"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
