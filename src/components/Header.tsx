'use client';

import React, { useState } from 'react';
import { Cpu, Layers, Sparkles, BookOpen, Bot } from 'lucide-react';
import { ResumenDiarioModal } from './Notas/ResumenDiarioModal';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [showResumenModal, setShowResumenModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('modulo1')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                9°
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-zinc-900 text-sm tracking-tight">Formación Tecnológica</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800">
                    MEP 2026
                  </span>
                </div>
                <p className="text-xs text-zinc-500">III Ciclo • Noveno Año (Secundaria)</p>
              </div>
            </div>

            {/* Quick Stats Badges & Botón Resumen Diario */}
            <div className="flex items-center space-x-2 text-xs">
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={() => onTabChange('evaluacion')}
                  className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium border border-indigo-100 transition-colors cursor-pointer"
                  title="Ir a Distribución y Componentes de Evaluación"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                  Evaluación REA
                </button>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 font-semibold border border-sky-200">
                  <Cpu className="w-3.5 h-3.5 mr-1 text-sky-600" />
                  Módulo 1: Robótica & Algoritmos
                </span>
              </div>

              {/* Botón Resumen Diario con IA */}
              <button
                onClick={() => setShowResumenModal(true)}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-700 hover:to-indigo-700 text-white font-bold flex items-center space-x-1.5 shadow-sm transition-all"
                title="Sintetizar y resumir con IA todas las anotaciones y avances pedagógicos del día"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                <span>Resumen Diario IA</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal de Resumen Diario IA */}
      {showResumenModal && (
        <ResumenDiarioModal
          isOpen={true}
          onClose={() => setShowResumenModal(false)}
        />
      )}
    </>
  );
};

