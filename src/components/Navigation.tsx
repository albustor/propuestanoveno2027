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
      sublabel: 'Computación Física & IoT (9° Año)',
      icon: Cpu,
      badge: '10 Indicadores',
      color: 'sky'
    },
    {
      id: 'proyecto',
      label: 'Proyecto Semestral',
      sublabel: '3 Fases / 5 Etapas (Design Thinking)',
      icon: Sparkles,
      badge: 'ABP / MEP',
      color: 'emerald'
    },
    {
      id: 'planeador',
      label: 'Planeador Didáctico',
      sublabel: '18 Semanas con 3 Momentos',
      icon: Calendar,
      badge: 'Mediación',
      color: 'indigo'
    },
    {
      id: 'evaluacion',
      label: 'Distribución y Evaluación',
      sublabel: 'Cotidiano, Tareas & Proyecto',
      icon: SlidersHorizontal,
      badge: 'REA MEP',
      color: 'indigo'
    },
    {
      id: 'webapps',
      label: 'Recursos & Evidencias',
      sublabel: 'Enlazado por Componente REA',
      icon: Layers,
      badge: 'Base de Datos',
      color: 'sky'
    },
    {
      id: 'sistematizacion',
      label: 'Equipo, Allan & Reuniones',
      sublabel: 'Co-Docencia & Telemetría',
      icon: Users,
      badge: 'Actas & Log',
      color: 'purple'
    },
    {
      id: 'exportacion',
      label: 'Exportación Oficial',
      sublabel: 'Descargar DOCX / PDF',
      icon: FileDown,
      badge: 'MEP Listo',
      color: 'rose'
    }
  ];

  return (
    <nav className="bg-white border-b border-zinc-200 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                <div className="text-left">
                  <div className="font-semibold leading-tight">{tab.label}</div>
                  <div className={`text-[10px] ${isActive ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {tab.sublabel}
                  </div>
                </div>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${
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
