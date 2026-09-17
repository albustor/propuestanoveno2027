'use client';

import React, { useState } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { exportarPlaneamientoDocx } from '../../lib/docx-exporter';
import { exportarPlaneamientoPdf } from '../../lib/pdf-exporter';
import { SemanaPlaneamiento } from '../../types';
import { FileDown, FileText, CheckCircle2, ShieldCheck, Cpu, Layers } from 'lucide-react';

export const ExportCenterView: React.FC = () => {
  const [docente, setDocente] = useState('Alberto Bustos Ortega / Allan M.');
  const [institucion, setInstitucion] = useState('Colegio Técnico Profesional / Liceo de Innovación');
  const [isExporting, setIsExporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getSemanasModulo = (moduloId: 1 | 2): SemanaPlaneamiento[] => {
    const saved = localStorage.getItem(`planeamiento_noveno_modulo_${moduloId}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const modulo = MODULOS_NOVENO_OFICIAL.find((m) => m.id === moduloId);
    const allSaberes = modulo ? modulo.areas.flatMap((a) => a.saberes) : [];
    return Array.from({ length: 18 }).map((_, i) => {
      const num = i + 1;
      const saber = allSaberes[(num - 1) % allSaberes.length];
      return {
        id: `sem_${moduloId}_${num}`,
        numeroSemana: num,
        moduloId,
        tituloSemana: `Semana ${num}: ${saber ? saber.nombre : 'Consolidación'}`,
        saberesSeleccionados: saber ? [saber.id] : [],
        esSemanaDedicadaAProyecto: num === 17 || num === 18,
        etapaProyectoAsociada: undefined,
        actividadProyectoEnSemana: '',
        momentoInicio: {
          estrategia: saber ? saber.estrategiaMetodologica.inicio.descripcion : 'Focalización y motivación.',
          tiempo: '15 min'
        },
        momentoDesarrollo: {
          estrategia: saber ? saber.estrategiaMetodologica.desarrollo.descripcion : 'Construcción y laboratorio.',
          tiempo: '50 min'
        },
        momentoCierre: {
          estrategia: saber ? saber.estrategiaMetodologica.cierre.descripcion : 'Sistematización y coevaluación.',
          tiempo: '15 min'
        },
        escenarioConectado: saber ? saber.estrategiaMetodologica.recursosSugeridos.conectado.join(', ') : 'Simulador',
        escenarioDesconectado: saber ? saber.estrategiaMetodologica.recursosSugeridos.desconectado.join(', ') : 'Guía impresa',
        evidenciaAprendizaje: `Bitácora semana ${num}`,
        instrumentoEvaluacion: 'Escala de Desempeño MEP',
        pautaDUAAplicada: 'Representación visual múltiple'
      };
    });
  };

  const handleExportDocx = async (moduloId: 1 | 2) => {
    setIsExporting(true);
    try {
      const modulo = MODULOS_NOVENO_OFICIAL.find((m) => m.id === moduloId);
      if (modulo) {
        const semanas = getSemanasModulo(moduloId);
        await exportarPlaneamientoDocx(modulo, semanas, docente, institucion);
        setSuccessMsg(`¡Planeamiento Módulo ${moduloId} exportado a Word (.docx) exitosamente!`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPdf = (moduloId: 1 | 2) => {
    setIsExporting(true);
    try {
      const modulo = MODULOS_NOVENO_OFICIAL.find((m) => m.id === moduloId);
      if (modulo) {
        const semanas = getSemanasModulo(moduloId);
        exportarPlaneamientoPdf(modulo, semanas, docente, institucion);
        setSuccessMsg(`¡Planeamiento Módulo ${moduloId} exportado a PDF exitosamente!`);
        setTimeout(() => setSuccessMsg(null), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
              Formatos Oficiales MEP
            </span>
            <span className="text-xs text-zinc-500 font-medium">Noveno Año 2026</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Centro de Descarga y Exportación
          </h1>
          <p className="text-xs text-zinc-600">
            Descargue los planeamientos didácticos completos estructurados con los 3 momentos pedagógicos (Inicio, Desarrollo, Cierre), la vinculación al Proyecto y los membretes ministeriales.
          </p>
        </div>

        {/* Notificación de Éxito */}
        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center space-x-2 text-xs text-emerald-800 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Configuración de Metadatos del Documento */}
        <div className="mt-6 pt-6 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-1">
              Docente(s) / Asesores:
            </label>
            <input
              type="text"
              value={docente}
              onChange={(e) => setDocente(e.target.value)}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-zinc-900 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-zinc-700 uppercase tracking-wider block mb-1">
              Institución / Centro Educativo:
            </label>
            <input
              type="text"
              value={institucion}
              onChange={(e) => setInstitucion(e.target.value)}
              className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-zinc-900 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tarjeta Principal de Exportación: Módulo 1 */}
      <div className="grid grid-cols-1 gap-6">
        {/* Módulo 1 */}
        <div className="bg-white rounded-3xl border-2 border-sky-200/80 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-xs">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                  Módulo Oficial Activo • Semestre 1 (9° Año)
                </span>
                <span className="text-[11px] text-zinc-400 font-semibold">18 Semanas Didácticas</span>
              </div>
              <h3 className="text-lg font-extrabold text-zinc-900 mt-1">
                Módulo 1: Computación Física, Robótica y Algoritmos para la Solución de Problemas
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-4xl">
            Genera el documento ministerial oficial con las 18 semanas de mediación didáctica (Inicio, Desarrollo y Cierre), indicadores de logro, escenario conectado/desconectado, DUA, pautas de evaluación REA y la articulación de las 5 etapas del Proyecto Domótico Comunitario.
          </p>

          <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row gap-3 max-w-md">
            <button
              onClick={() => handleExportDocx(1)}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4 text-zinc-300" />
              <span>Descargar Word (.docx)</span>
            </button>
            <button
              onClick={() => handleExportPdf(1)}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 shadow-sm transition-all"
            >
              <FileText className="w-4 h-4 text-sky-200" />
              <span>Descargar PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
