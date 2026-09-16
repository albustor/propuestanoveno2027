'use client';

import React, { useState } from 'react';
import { 
  PERFILES_SALIDA_AREAS_MEP_2026, 
  PERFILES_SALIDA_EJES_TRANSVERSALES_MEP_2026,
  AreaPerfilSalidaOficial,
  EjeTransversalPerfilSalidaOficial
} from '../data/perfilesSalidaData';
import { 
  GraduationCap, 
  X, 
  Search, 
  Sparkles, 
  Check, 
  Copy, 
  BookOpen, 
  ShieldCheck, 
  Cpu, 
  Code, 
  Database, 
  Layers,
  ChevronRight
} from 'lucide-react';

interface ModalPerfilesSalidaOficialesProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalPerfilesSalidaOficiales: React.FC<ModalPerfilesSalidaOficialesProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'areas' | 'ejes'>('areas');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getAreaIcon = (id: string) => {
    switch (id) {
      case 'apropiacion_tecnologica':
        return <Layers className="w-5 h-5 text-sky-600" />;
      case 'programacion_algoritmos':
        return <Code className="w-5 h-5 text-emerald-600" />;
      case 'computacion_fisica_robotica':
        return <Cpu className="w-5 h-5 text-amber-600" />;
      case 'ciencia_datos_ia':
        return <Database className="w-5 h-5 text-purple-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-zinc-600" />;
    }
  };

  const filteredAreas = PERFILES_SALIDA_AREAS_MEP_2026.map(area => {
    const filteredSubareas = area.subareas.map(sub => {
      const filteredDescriptores = sub.descriptores.filter(d => 
        d.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...sub, descriptores: filteredDescriptores };
    }).filter(sub => sub.descriptores.length > 0);

    return { ...area, subareas: filteredSubareas };
  }).filter(area => area.subareas.length > 0);

  const filteredEjes = PERFILES_SALIDA_EJES_TRANSVERSALES_MEP_2026.map(eje => {
    const filteredDims = eje.dimensiones.filter(dim =>
      dim.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dim.descriptor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eje.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...eje, dimensiones: filteredDims };
  }).filter(eje => eje.dimensiones.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-teal-700 via-sky-800 to-indigo-900 p-6 text-white flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <GraduationCap className="w-7 h-7 text-teal-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 bg-teal-500/30 border border-teal-300/40 rounded-full text-teal-100">
                  Guía Docente Oficial MEP 2026
                </span>
                <span className="text-xs font-medium text-teal-200/80">Secundaria (III Ciclo / 9° Año)</span>
              </div>
              <h2 className="text-2xl font-bold mt-1 text-white">
                Perfiles de Salida de Estudiantes
              </h2>
              <p className="text-sm text-teal-100/90 mt-0.5">
                Dirección de Recursos Tecnológicos en Educación (DRTE)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('areas')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'areas'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              Por Áreas de Conocimiento ({PERFILES_SALIDA_AREAS_MEP_2026.length})
            </button>
            <button
              onClick={() => setActiveTab('ejes')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'ejes'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 border border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Por Ejes Transversales ({PERFILES_SALIDA_EJES_TRANSVERSALES_MEP_2026.length})
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar descriptor o subárea..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 text-zinc-800 dark:text-zinc-200"
            />
          </div>
        </div>

        {/* Contenido del Modal con Scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'areas' ? (
            filteredAreas.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                No se encontraron descriptores de perfil para la búsqueda &quot;{searchTerm}&quot;.
              </div>
            ) : (
              filteredAreas.map((area) => (
                <div 
                  key={area.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-white dark:bg-zinc-900"
                >
                  {/* Encabezado del Área */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/60 p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200/80 dark:border-zinc-700">
                        {getAreaIcon(area.id)}
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {area.nombre}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                      {area.subareas.length} subáreas
                    </span>
                  </div>

                  {/* Lista de Subáreas y Descriptores */}
                  <div className="p-4 space-y-4">
                    {area.subareas.map((sub, sIdx) => (
                      <div 
                        key={sIdx}
                        className="bg-zinc-50/70 dark:bg-zinc-800/30 rounded-xl p-3.5 border border-zinc-200/70 dark:border-zinc-800"
                      >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-2 flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-teal-600" />
                          {sub.nombre}
                        </h4>
                        <div className="space-y-2">
                          {sub.descriptores.map((desc, dIdx) => {
                            const itemId = `${area.id}-${sIdx}-${dIdx}`;
                            return (
                              <div 
                                key={dIdx}
                                className="group flex items-start justify-between gap-3 p-2.5 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 hover:border-sky-300 dark:hover:border-sky-600 transition-colors"
                              >
                                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                                  {desc}
                                </p>
                                <button
                                  onClick={() => handleCopy(desc, itemId)}
                                  className="shrink-0 p-1.5 text-zinc-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950/50 rounded-lg transition-colors"
                                  title="Copiar descriptor"
                                >
                                  {copiedText === itemId ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )
          ) : (
            filteredEjes.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                No se encontraron dimensiones de ejes para la búsqueda &quot;{searchTerm}&quot;.
              </div>
            ) : (
              filteredEjes.map((eje) => (
                <div 
                  key={eje.id}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-white dark:bg-zinc-900"
                >
                  {/* Encabezado del Eje */}
                  <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-4 border-b border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-indigo-200/80 dark:border-indigo-800">
                        <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                        {eje.nombre}
                      </h3>
                    </div>
                  </div>

                  {/* Dimensiones y Descriptores */}
                  <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eje.dimensiones.map((dim, dIdx) => {
                      const itemId = `${eje.id}-${dIdx}`;
                      return (
                        <div 
                          key={dIdx}
                          className="bg-zinc-50/80 dark:bg-zinc-800/40 rounded-xl p-3.5 border border-zinc-200/70 dark:border-zinc-800 flex flex-col justify-between gap-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
                        >
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block mb-1">
                              {dim.nombre}
                            </span>
                            <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                              {dim.descriptor}
                            </p>
                          </div>
                          <div className="flex justify-end pt-2">
                            <button
                              onClick={() => handleCopy(`${dim.nombre}: ${dim.descriptor}`, itemId)}
                              className="text-[11px] font-medium text-zinc-500 hover:text-indigo-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
                            >
                              {copiedText === itemId ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span className="text-emerald-600">Copiado</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copiar</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
          <p>
            Integrado 100% con la Guía Docente FT MEP 2026 y el motor de IA en localhost.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
