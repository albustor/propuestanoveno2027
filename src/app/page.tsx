'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Modulo1View } from '../components/Modulo1/Modulo1View';
import { Modulo2View } from '../components/Modulo2/Modulo2View';
import { ProyectoFasesEtapasView } from '../components/ProyectoIntegrado/ProyectoFasesEtapasView';
import { PlaneamientoView } from '../components/Planeamiento/PlaneamientoView';
import { SistematizacionEquipoView } from '../components/Sistematizacion/SistematizacionEquipoView';
import { ExportCenterView } from '../components/Exportacion/ExportCenterView';
import { WebAppsCatalogoView } from '../components/WebApps/WebAppsCatalogoView';
import { DistribucionEvaluacionView } from '../components/Evaluacion/DistribucionEvaluacionView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('modulo1');

  return (
    <div className="min-h-screen bg-zinc-50/60 text-zinc-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white antialiased">
      {/* Encabezado Fijo */}
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Barra de Navegación de Pestañas */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'modulo1' && <Modulo1View />}
        {activeTab === 'modulo2' && <Modulo2View />}
        {activeTab === 'proyecto' && <ProyectoFasesEtapasView />}
        {activeTab === 'planeador' && <PlaneamientoView />}
        {activeTab === 'evaluacion' && <DistribucionEvaluacionView />}
        {activeTab === 'webapps' && <WebAppsCatalogoView />}
        {activeTab === 'sistematizacion' && <SistematizacionEquipoView />}
        {activeTab === 'exportacion' && <ExportCenterView />}
      </main>

      {/* Pie de Página */}
      <Footer />
    </div>
  );
}
