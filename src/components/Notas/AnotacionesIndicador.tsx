'use client';

import React, { useState, useEffect } from 'react';
import { FileEdit, Check, Trash2, ListPlus, Sparkles, Calendar, Plus } from 'lucide-react';
import { getNotaForSaber, saveNotaForSaber, saveEntradaDiaria } from '../../lib/storage';
import { registrarEventoTelemetria } from '../../lib/telemetry';
import { ResumenDiarioModal } from './ResumenDiarioModal';

interface AnotacionesIndicadorProps {
  saberId: string;
  saberNombre: string;
}

export const AnotacionesIndicador: React.FC<AnotacionesIndicadorProps> = ({
  saberId,
  saberNombre,
}) => {
  const [nota, setNota] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);
  const [showResumenModal, setShowResumenModal] = useState(false);

  useEffect(() => {
    const saved = getNotaForSaber(saberId);
    setNota(saved);
  }, [saberId]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNota(val);
    saveNotaForSaber(saberId, val);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 1500);
  };

  const handleInsertBullet = () => {
    const bullet = '\n• ';
    const updated = nota ? `${nota}${bullet}` : '• ';
    setNota(updated);
    saveNotaForSaber(saberId, updated);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 1500);
  };

  const handleGuardarComoEntradaDiaria = () => {
    if (!nota.trim()) {
      alert('Por favor escribe alguna anotación antes de registrarla en la bitácora diaria.');
      return;
    }
    const now = new Date();
    const fecha = now.toISOString().split('T')[0];
    const hora = now.toTimeString().slice(0, 5);

    saveEntradaDiaria({
      id: `entrada_${saberId}_${Date.now()}`,
      saberId,
      saberNombre,
      fecha,
      hora,
      textoNota: nota.trim(),
    });

    registrarEventoTelemetria(
      'NOTAS_INDICADOR',
      'ENTRADA_DIARIA_REGISTRADA',
      `Se registró entrada en bitácora para el saber "${saberNombre}".`,
      { saberId, fecha, hora }
    );

    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
    alert(`¡Registro de ${saberNombre} guardado para la fecha ${fecha} a las ${hora}!`);
  };

  const handleClear = () => {
    if (nota && confirm('¿Deseas borrar las anotaciones de este indicador?')) {
      setNota('');
      saveNotaForSaber(saberId, '');
    }
  };

  return (
    <>
      <div className="bg-amber-50/40 border border-amber-200/70 rounded-xl p-3.5 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 text-amber-950 font-bold text-xs">
            <FileEdit className="w-3.5 h-3.5 text-amber-700" />
            <span>Registro de Acciones y Anotaciones Pedagógicas</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {savedStatus && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center space-x-1 animate-in fade-in">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>Guardado</span>
              </span>
            )}

            <button
              type="button"
              onClick={handleInsertBullet}
              className="text-[10px] font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200 px-2 py-0.5 rounded-lg flex items-center space-x-1 transition-colors"
              title="Insertar viñeta de lista"
            >
              <ListPlus className="w-3 h-3" />
              <span>• Viñeta</span>
            </button>

            <button
              type="button"
              onClick={handleGuardarComoEntradaDiaria}
              className="text-[10px] font-semibold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-lg flex items-center space-x-1 transition-colors"
              title="Fijar en el historial de la bitácora de hoy"
            >
              <Calendar className="w-3 h-3 text-amber-800" />
              <span>Registrar Fecha Hoy</span>
            </button>

            <button
              type="button"
              onClick={() => setShowResumenModal(true)}
              className="text-[10px] font-bold text-purple-800 bg-purple-100/80 hover:bg-purple-200 px-2.5 py-0.5 rounded-lg border border-purple-200 flex items-center space-x-1 transition-all shadow-2xs"
              title="Resumir y sintetizar todos los avances de la jornada con IA"
            >
              <Sparkles className="w-3 h-3 text-purple-600 animate-pulse" />
              <span>Resumen Diario IA</span>
            </button>

            {nota && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[10px] text-zinc-400 hover:text-rose-600 p-0.5 rounded transition-colors"
                title="Borrar anotaciones"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <textarea
          rows={3}
          value={nota}
          onChange={handleChange}
          placeholder={`Escribe aquí las acciones realizadas, avances del estudiantado, dificultades observadas o acuerdos de clase para ${saberNombre}...`}
          className="w-full text-xs p-2.5 bg-white border border-amber-200 rounded-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 leading-relaxed resize-y shadow-2xs"
        />
      </div>

      {/* Modal de Resumen Ejecutivo con IA */}
      {showResumenModal && (
        <ResumenDiarioModal
          isOpen={true}
          onClose={() => setShowResumenModal(false)}
          initialSaberId={saberId}
        />
      )}
    </>
  );
};
