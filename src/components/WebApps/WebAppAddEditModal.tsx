'use client';

import React, { useState } from 'react';
import { WebAppRecurso } from '../../types';
import { X, Plus, Save, Link as LinkIcon, Sparkles } from 'lucide-react';

interface WebAppAddEditModalProps {
  saberId: string;
  saberNombre: string;
  initialData?: WebAppRecurso | null;
  defaultMomento?: 'desarrollo' | 'cierre' | 'ambos' | 'apoyo';
  onSave: (webapp: WebAppRecurso) => void;
  onClose: () => void;
}

export const WebAppAddEditModal: React.FC<WebAppAddEditModalProps> = ({
  saberId,
  saberNombre,
  initialData,
  defaultMomento = 'desarrollo',
  onSave,
  onClose,
}) => {
  const [titulo, setTitulo] = useState(initialData?.titulo || '');
  const [url, setUrl] = useState(initialData?.url || 'https://');
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
  const [momentoAsociado, setMomentoAsociado] = useState<'desarrollo' | 'cierre' | 'ambos' | 'apoyo'>(
    initialData?.momentoAsociado || defaultMomento
  );
  const [tipo, setTipo] = useState<WebAppRecurso['tipo']>(initialData?.tipo || 'simulador');
  const [esOffline, setEsOffline] = useState(initialData?.esOffline || false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      setError('Por favor ingrese un título descriptivo para la WebApp.');
      return;
    }
    if (!url.trim() || !url.startsWith('http')) {
      setError('Por favor ingrese una URL válida que inicie con http:// o https://');
      return;
    }

    const newWebApp: WebAppRecurso = {
      id: initialData?.id || `webapp_custom_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      titulo: titulo.trim(),
      url: url.trim(),
      descripcion: descripcion.trim() || undefined,
      momentoAsociado,
      tipo,
      esOffline,
    };

    onSave(newWebApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-zinc-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 border-b border-zinc-100 flex items-start justify-between bg-zinc-50/70">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                <LinkIcon className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                {initialData ? 'Editar WebApp Vinculada' : 'Vincular Nueva WebApp al Indicador'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 font-medium line-clamp-1">
              {saberNombre}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
              Título del Recurso / WebApp <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Wokwi Simulador ESP32, PSeInt Web, Cuestionario Kahoot..."
              value={titulo}
              onChange={(e) => {
                setTitulo(e.target.value);
                setError(null);
              }}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
              Enlace / URL del Recurso Digital <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              placeholder="https://wokwi.com/..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError(null);
              }}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                Momento Didáctico Asociado
              </label>
              <select
                value={momentoAsociado}
                onChange={(e) => setMomentoAsociado(e.target.value as any)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              >
                <option value="desarrollo">Momento 2: Desarrollo (Exploración / Construcción)</option>
                <option value="cierre">Momento 3: Cierre (Sistematización / Evaluación)</option>
                <option value="ambos">Ambos Momentos (Desarrollo y Cierre)</option>
                <option value="apoyo">Recurso de Apoyo General / Refuerzo</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
                Tipo de Recurso
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as any)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              >
                <option value="simulador">Simulador Digital (Wokwi, Tinkercad, PhET)</option>
                <option value="editor">Editor de Código / Pseudocódigo (PSeInt, MakeCode)</option>
                <option value="cuestionario">Cuestionario / Evaluación (Kahoot, Google Forms)</option>
                <option value="herramienta">Herramienta de Diseño / Análisis (Diagrams, Looker)</option>
                <option value="interactivo">Actividad Interactiva / Gamificada</option>
                <option value="tutorial">Tutorial / Guía Interactiva</option>
                <option value="offline_pwa">App Web Progresiva (PWA Offline)</option>
                <option value="otro">Otro Recurso Educativo</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-zinc-800 uppercase tracking-wider text-[10px]">
              Descripción u Orientación Pedagógica para el Estudiante
            </label>
            <textarea
              rows={3}
              placeholder="Instrucciones breves: 'Utilizar el simulador para probar 3 tipos de engranajes y anotar la relación de vueltas en la bitácora...'"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="esOffline"
              checked={esOffline}
              onChange={(e) => setEsOffline(e.target.checked)}
              className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="esOffline" className="text-zinc-700 font-medium cursor-pointer">
              Este recurso funciona sin conexión a Internet (Offline / PWA descargable)
            </label>
          </div>

          {/* Footer Botones */}
          <div className="pt-4 border-t border-zinc-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-bold flex items-center space-x-1.5 shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>Guardar y Generar QR</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
