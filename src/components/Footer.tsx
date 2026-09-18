'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 mt-16 py-8 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
            9°
          </div>
          <div>
            <span className="font-semibold text-zinc-800">Formación Tecnológica (PNFT) • Noveno Año</span>
            <span className="mx-2 text-zinc-300">|</span>
            <span>Ministerio de Educación Pública de Costa Rica</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-[11px] text-zinc-400">
          <span>Guía Docente 2026</span>
          <span>•</span>
          <span>Design Thinking / DT (3 Fases, 5 Etapas)</span>
          <span>•</span>
          <span>Estrategias en 3 Momentos Didácticos</span>
        </div>
      </div>
    </footer>
  );
};
