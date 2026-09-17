'use client';

import React from 'react';
import { Cpu, Layers, Sparkles, Calendar, Users, FileDown, QrCode, SlidersHorizontal } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'modulo1',
      label: 'Módulo 1: Robótica & Algoritmos',
      shortLabel: 'Módulo 1: Robótica',
      icon: Cpu,
      badge: '10 Indicadores',
      color: 'sky'
    },
    {
      id: 'proyecto',
      label: 'Proyecto: Design Thinking (DT)',
      shortLabel: 'Design Thinking (DT)',
      icon: Sparkles,
      badge: '5 Etapas',
      color: 'emerald'
    },
    {
      id: 'planeador',
      label: 'Planeador Didáctico',
      shortLabel: 'Planeamiento 18 Sem.',
      icon: Calendar,
      badge: '3 Momentos',
      color: 'indigo'
    },
    {
      id: 'evaluacion',
      label: 'Distribución y Evaluación',
      shortLabel: 'Evaluación REA',
      icon: SlidersHorizontal,
      badge: 'Cotidiano/Proy',
      color: 'indigo'
    },
    {
      id: 'webapps',
      label: 'Recursos & Evidencias',
      shortLabel: 'Recursos & WebApps',
      icon: Layers,
      badge: 'Catálogo',
      color: 'sky'
    },
    {
      id: 'sistematizacion',
      label: 'Equipo & Co-Docencia',
      shortLabel: 'Equipo & Log',
      icon: Users,
      badge: 'Actas',
      color: 'purple'
    },
    {
      id: 'exportacion',
      label: 'Exportación Oficial',
      shortLabel: 'Exportar MEP',
      icon: FileDown,
      badge: 'Word/PDF',
      color: 'rose'
    }
  ];

  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-zinc-300">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-xs ring-1 ring-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/90'
                }`}
                title={tab.label}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                <span className="leading-tight">
                  <span className="hidden xl:inline">{tab.label}</span>
                  <span className="xl:hidden">{tab.shortLabel}</span>
                </span>
                {tab.badge && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded text-[9px] font-bold ${
                      isActive
                        ? 'bg-zinc-800 text-zinc-200'
                        : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
