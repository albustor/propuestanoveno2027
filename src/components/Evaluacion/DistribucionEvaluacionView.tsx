'use client';

import React, { useState, useEffect } from 'react';
import { 
  getDistribucionEvaluacionLocal, 
  saveDistribucionEvaluacionLocal, 
  updateAsignacionIndicadorLocal, 
  saveCorrelacionIndicadoresLocal, 
  deleteCorrelacionIndicadoresLocal, 
  resetDistribucionEvaluacionLocal 
} from '../../lib/storage';
import { processAICascade } from '../../lib/ai-service';
import { 
  MatrizEvaluacionNoveno, 
  AsignacionIndicadorEvaluacion, 
  CorrelacionIndicadores, 
  ComponenteEvaluacionTipo,
  EjeTransversalTipo 
} from '../../types';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { 
  EJES_TRANSVERSALES_OFICIALES, 
  PERFIL_SALIDA_NOVENO_RASGOS, 
  MAPEO_EJES_POR_SABER 
} from '../../data/ejesTransversalesData';
import { 
  Sparkles, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Edit3, 
  Copy, 
  Check, 
  RotateCcw, 
  Layers, 
  Cpu, 
  Filter, 
  FileText, 
  Link2, 
  X, 
  ChevronRight, 
  Download, 
  LayoutGrid, 
  Table, 
  Share2, 
  CheckSquare, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Target,
  Leaf,
  Users,
  HeartPulse,
  ShieldCheck,
  Award,
  Lock
} from 'lucide-react';

export const DistribucionEvaluacionView: React.FC = () => {
  const [matriz, setMatriz] = useState<MatrizEvaluacionNoveno | null>(null);
  const [moduloFiltro, setModuloFiltro] = useState<1 | 2 | 'todos'>(1);
  const [ejeFiltro, setEjeFiltro] = useState<EjeTransversalTipo | 'todos'>('todos');
  const [vistaModo, setVistaModo] = useState<'kanban' | 'matriz' | 'sinergias'>('kanban');
  const [busqueda, setBusqueda] = useState<string>('');
  
  // Modales
  const [modalIAModeloAbierto, setModalIAModeloAbierto] = useState<boolean>(false);
  const [cargandoIA, setCargandoIA] = useState<boolean>(false);
  const [respuestaIA, setRespuestaIA] = useState<string>('');
  
  const [modalCorrelacionAbierto, setModalCorrelacionAbierto] = useState<boolean>(false);
  const [correlacionEditando, setCorrelacionEditando] = useState<CorrelacionIndicadores | null>(null);
  const [modalPerfilSalidaAbierto, setModalPerfilSalidaAbierto] = useState<boolean>(false);

  // Notificaciones
  const [copiado, setCopiado] = useState<boolean>(false);
  const [mensajeGuardado, setMensajeGuardado] = useState<string | null>(null);

  useEffect(() => {
    const data = getDistribucionEvaluacionLocal();
    setMatriz(data);
  }, []);

  const notificarGuardado = (msg: string = 'Cambios guardados') => {
    setMensajeGuardado(msg);
    setTimeout(() => setMensajeGuardado(null), 2500);
  };

  if (!matriz) {
    return (
      <div className="p-12 text-center text-zinc-500">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
        Cargando matriz de evaluación curricular...
      </div>
    );
  }

  // Lista plana de todos los saberes disponibles según filtro de módulo
  const todosSaberes = MODULOS_NOVENO_OFICIAL.flatMap((mod) => 
    mod.areas.flatMap((area) => 
      area.saberes.map((saber) => ({
        saber,
        area,
        moduloId: mod.id as 1 | 2
      }))
    )
  );

  // Saberes en el módulo activo
  const saberesModuloActual = todosSaberes.filter(
    (s) => moduloFiltro === 'todos' || s.moduloId === moduloFiltro
  );

  const saberesFiltrados = saberesModuloActual.filter((item) => {
    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      const coincide = 
        item.saber.nombre.toLowerCase().includes(q) ||
        item.saber.indicador.toLowerCase().includes(q) ||
        item.area.nombre.toLowerCase().includes(q);
      if (!coincide) return false;
    }
    if (ejeFiltro !== 'todos') {
      const ejesDelSaber = MAPEO_EJES_POR_SABER[item.saber.id] || [];
      if (!ejesDelSaber.includes(ejeFiltro)) return false;
    }
    return true;
  });

  // Métricas y Agrupaciones para el Tablero Kanban
  const totalEnModulo = saberesModuloActual.length;

  const saberesCotidiano = saberesFiltrados.filter(
    (s) => matriz.asignaciones[s.saber.id]?.componentes?.includes('trabajo_cotidiano')
  );

  const saberesProyecto = saberesFiltrados.filter(
    (s) => matriz.asignaciones[s.saber.id]?.componentes?.includes('proyecto')
  );

  const saberesTareas = saberesFiltrados.filter(
    (s) => matriz.asignaciones[s.saber.id]?.componentes?.includes('tareas')
  );

  const saberesSinAsignar = saberesFiltrados.filter(
    (s) => (matriz.asignaciones[s.saber.id]?.componentes?.length || 0) === 0
  );

  const correlacionesVisibles = matriz.correlaciones.filter(
    (c) => moduloFiltro === 'todos' || c.moduloId === moduloFiltro || c.moduloId === 'ambos'
  );

  // Manejo de Toggles de Componentes
  const handleToggleComponente = (saberId: string, comp: ComponenteEvaluacionTipo) => {
    const asigActual = matriz.asignaciones[saberId] || {
      saberId,
      saberNombre: '',
      indicadorTexto: '',
      areaNombre: '',
      areaId: '',
      moduloId: 1,
      componentes: [],
      instrumentoSugerido: 'Escala de desempeño'
    };

    let nuevosComponentes: ComponenteEvaluacionTipo[];
    if (asigActual.componentes.includes(comp)) {
      nuevosComponentes = asigActual.componentes.filter((c) => c !== comp);
    } else {
      nuevosComponentes = [...asigActual.componentes, comp];
    }

    const updated = updateAsignacionIndicadorLocal(saberId, { componentes: nuevosComponentes });
    setMatriz({ ...updated });
    notificarGuardado();
  };

  // Manejo de Instrumento Sugerido
  const handleCambioInstrumento = (saberId: string, instrumento: string) => {
    const updated = updateAsignacionIndicadorLocal(saberId, { instrumentoSugerido: instrumento });
    setMatriz({ ...updated });
    notificarGuardado();
  };

  // Manejo de Correlación Asociada
  const handleCambioCorrelacion = (saberId: string, corrId: string) => {
    const updated = updateAsignacionIndicadorLocal(saberId, { 
      correlacionId: corrId === '' ? undefined : corrId 
    });
    setMatriz({ ...updated });
    notificarGuardado();
  };

  // Generar y Aplicar Organización Automática con IA basada en Sinergias y Continuidad
  const handleGenerarSugerenciaIA = async () => {
    setModalIAModeloAbierto(true);
    setCargandoIA(true);

    try {
      // 1. Aplicar automáticamente la distribución basada en continuidad técnica y similitud
      const defaultState = resetDistribucionEvaluacionLocal();
      setMatriz({ ...defaultState });
      notificarGuardado('¡Distribución y sinergias aplicadas automáticamente!');

      // 2. Obtener el análisis y justificación pedagógica estructurada de la IA
      const res = await processAICascade({
        prompt: `Analiza los 10 saberes e indicadores de 9° año para el ${
          moduloFiltro === 1 ? 'Módulo 1 (Robótica y Algoritmos)' : moduloFiltro === 2 ? 'Módulo 2 (Ciencia de Datos e IA)' : 'Currículo Completo de 9° Año'
        } y genera una propuesta ejecutiva de correlación por continuidad técnica y distribución de componentes evaluativos (Trabajo Cotidiano 45-50%, Proyecto 30-40%, Tareas 10%) según el REA MEP.`,
        tipo: 'distribucion_correlacion_evaluacion_ia',
        contexto: {
          modulo: moduloFiltro === 'todos' ? 1 : moduloFiltro,
          tema: moduloFiltro === 1 ? 'Robótica y Automatización' : 'Ciencia de Datos y Modelado 3D'
        }
      });
      setRespuestaIA(res.content);
    } catch (e) {
      setRespuestaIA('Error al consultar el asistente pedagógico de IA.');
    } finally {
      setCargandoIA(false);
    }
  };

  // Restaurar valores oficiales
  const handleRestaurarOficial = () => {
    if (confirm('¿Deseas restaurar la distribución y correlaciones oficiales recomendadas por el MEP?')) {
      const resetData = resetDistribucionEvaluacionLocal();
      setMatriz({ ...resetData });
      notificarGuardado('Distribución oficial restaurada');
    }
  };

  // Copiar Matriz en Markdown
  const handleCopiarMarkdown = () => {
    let md = `# Matriz Visual de Distribución y Correlación de Indicadores (9° Año MEP)\n\n`;
    md += `*Fecha de Generación:* ${new Date().toLocaleDateString('es-CR')} | *Marco:* REA MEP 2026\n\n`;
    md += `## 1. Distribución de Indicadores por Componente de Evaluación\n\n`;
    md += `| Módulo | Área | Saber Conceptual | Indicador de Logro | Cotidiano (45-50%) | Proyecto (30-40%) | Tareas (10%) | Instrumento Sugerido |\n`;
    md += `| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |\n`;

    todosSaberes.forEach(({ saber, area, moduloId }) => {
      const asig = matriz.asignaciones[saber.id];
      const cot = asig?.componentes.includes('trabajo_cotidiano') ? '✓' : '-';
      const tar = asig?.componentes.includes('tareas') ? '✓' : '-';
      const pro = asig?.componentes.includes('proyecto') ? '✓' : '-';
      const inst = asig?.instrumentoSugerido || 'Escala de desempeño';
      md += `| M${moduloId} | ${area.nombre} | ${saber.nombre} | ${saber.indicador.replace(/\n/g, ' ')} | ${cot} | ${pro} | ${tar} | ${inst} |\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Descargar Archivo Markdown
  const handleDescargarMarkdown = () => {
    let md = `# Matriz de Distribución y Correlación de Indicadores (9° Año MEP)\n\n`;
    md += `*Fecha de Generación:* ${new Date().toLocaleDateString('es-CR')} | *Marco:* REA MEP 2026\n\n`;
    md += `## 1. Distribución de Indicadores por Componente\n\n`;
    md += `| Módulo | Área | Saber Conceptual | Indicador de Logro | Cotidiano | Proyecto | Tareas | Instrumento Sugerido |\n`;
    md += `| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |\n`;

    todosSaberes.forEach(({ saber, area, moduloId }) => {
      const asig = matriz.asignaciones[saber.id];
      const cot = asig?.componentes.includes('trabajo_cotidiano') ? '✓' : '-';
      const tar = asig?.componentes.includes('tareas') ? '✓' : '-';
      const pro = asig?.componentes.includes('proyecto') ? '✓' : '-';
      const inst = asig?.instrumentoSugerido || 'Escala de desempeño';
      md += `| M${moduloId} | ${area.nombre} | ${saber.nombre} | ${saber.indicador.replace(/\n/g, ' ')} | ${cot} | ${pro} | ${tar} | ${inst} |\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Matriz_Evaluacion_Noveno_MEP_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Guardar Correlación desde Modal
  const handleGuardarCorrelacionModal = (corr: CorrelacionIndicadores) => {
    const updated = saveCorrelacionIndicadoresLocal(corr);
    corr.saberesIds.forEach((sId) => {
      updateAsignacionIndicadorLocal(sId, { correlacionId: corr.id });
    });
    const finalState = getDistribucionEvaluacionLocal();
    setMatriz({ ...finalState });
    setModalCorrelacionAbierto(false);
    setCorrelacionEditando(null);
    notificarGuardado('Correlación guardada con éxito');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Encabezado Visual y Barra de Herramientas */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-[11px] font-bold tracking-wide uppercase shadow-xs">
                Evaluación PNFT • REA MEP 2026
              </span>
              {mensajeGuardado && (
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold animate-pulse flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" /> {mensajeGuardado}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-2.5 tracking-tight flex items-center gap-2">
              Distribución y Correlación de Componentes de Evaluación
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-3xl leading-relaxed">
              Organice y articule visualmente los 10 indicadores por semestre en los 3 componentes oficiales: 
              <strong className="text-blue-700 font-bold"> Trabajo Cotidiano (45-50%)</strong>, 
              <strong className="text-emerald-700 font-bold"> Proyecto Semestral (30-40%)</strong> y 
              <strong className="text-amber-700 font-bold"> Tareas (10%)</strong>.
            </p>
          </div>

          {/* Botonera de Acciones Superiores */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModalPerfilSalidaAbierto(true)}
              className="px-3.5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
              title="Ver Articulación con el Perfil de Salida de 9° Año (III Ciclo)"
            >
              <Target className="w-4 h-4 text-emerald-200" />
              <span>Perfil de Salida 9°</span>
            </button>

            <button
              onClick={handleGenerarSugerenciaIA}
              className="px-4 py-2.5 bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 hover:from-sky-700 hover:to-purple-700 text-white rounded-2xl text-xs font-bold shadow-sm flex items-center space-x-2 transition-all hover:shadow-md"
            >
              <Sparkles className="w-4 h-4 text-sky-200 animate-pulse" />
              <span>Sugerir Distribución IA</span>
            </button>

            <button
              onClick={() => {
                setCorrelacionEditando(null);
                setModalCorrelacionAbierto(true);
              }}
              className="px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nueva Sinergia</span>
            </button>

            <button
              onClick={handleCopiarMarkdown}
              className="px-3 py-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-2xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              title="Copiar Matriz en Markdown"
            >
              {copiado ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copiado ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleDescargarMarkdown}
              className="p-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-2xl text-xs transition-colors"
              title="Descargar Reporte .md"
            >
              <Download className="w-4 h-4 text-zinc-500" />
            </button>

            <button
              onClick={handleRestaurarOficial}
              className="p-2.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-400 hover:text-zinc-800 rounded-2xl text-xs transition-colors"
              title="Restablecer Valores Oficiales MEP"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filtros de Módulo y Modos de Vista */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pt-5 border-t border-zinc-100">
          {/* Selector de Módulo */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModuloFiltro(1)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all ${
                moduloFiltro === 1
                  ? 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Módulo 1: Robótica (10 Ind.)</span>
            </button>

            <button
              onClick={() => setModuloFiltro(2)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all ${
                moduloFiltro === 2
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Módulo 2: Datos & IA (10 Ind.)</span>
            </button>

            <button
              onClick={() => setModuloFiltro('todos')}
              className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all ${
                moduloFiltro === 'todos'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <span>Ver Ambos (20)</span>
            </button>
          </div>

          {/* Switch de Modo Visual */}
          <div className="flex items-center space-x-1.5 bg-zinc-100 p-1 rounded-2xl self-start md:self-auto">
            <button
              onClick={() => setVistaModo('kanban')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                vistaModo === 'kanban'
                  ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-600" />
              <span>Tablero Visual</span>
            </button>

            <button
              onClick={() => setVistaModo('matriz')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                vistaModo === 'matriz'
                  ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-indigo-600" />
              <span>Matriz Tabular</span>
            </button>

            <button
              onClick={() => setVistaModo('sinergias')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                vistaModo === 'sinergias'
                  ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Link2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Sinergias ({correlacionesVisibles.length})</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtro por Ejes Transversales MEP */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-4 pt-3.5 border-t border-zinc-100">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-zinc-400" /> Ejes Transversales:
          </span>
          <button
            onClick={() => setEjeFiltro('todos')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all ${
              ejeFiltro === 'todos'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Todos ({saberesModuloActual.length})
          </button>
          <button
            onClick={() => setEjeFiltro('pensamiento_computacional')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all ${
              ejeFiltro === 'pensamiento_computacional'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            <span>💻</span> Pensamiento Computacional
          </button>
          <button
            onClick={() => setEjeFiltro('ciudadania_etica_digital')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all ${
              ejeFiltro === 'ciudadania_etica_digital'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60'
            }`}
          >
            <span>🛡️</span> Ciudadanía y Ética Digital
          </button>
          <button
            onClick={() => setEjeFiltro('emprendimiento_innovacion')}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1 transition-all ${
              ejeFiltro === 'emprendimiento_innovacion'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <span>🚀</span> Emprendimiento e Innovación
          </button>
        </div>
      </div>

      {/* Tarjetas de Métricas de Balance REA */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Cotidiano */}
        <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/50 border border-blue-200/80 rounded-2xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">🛠️ Trabajo Cotidiano</span>
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded-md text-[10px] font-extrabold shadow-2xs">45-50%</span>
          </div>
          <div className="text-2xl font-black text-blue-950 mt-2">
            {saberesCotidiano.length} <span className="text-xs font-medium text-blue-600">/ {totalEnModulo} saberes</span>
          </div>
          <div className="w-full bg-blue-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalEnModulo > 0 ? (saberesCotidiano.length / totalEnModulo) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[11px] text-blue-800/80 mt-2 font-medium">Observación directa y bitácora en clase</p>
        </div>

        {/* Proyecto */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border border-emerald-200/80 rounded-2xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">🚀 Proyecto Semestral</span>
            <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[10px] font-extrabold shadow-2xs">30-40%</span>
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-2">
            {saberesProyecto.length} <span className="text-xs font-medium text-emerald-600">/ {totalEnModulo} saberes</span>
          </div>
          <div className="w-full bg-emerald-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalEnModulo > 0 ? (saberesProyecto.length / totalEnModulo) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[11px] text-emerald-800/80 mt-2 font-medium">3 Fases / 5 Etapas Design Thinking</p>
        </div>

        {/* Tareas */}
        <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border border-amber-200/80 rounded-2xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">📝 Tareas Cortas</span>
            <span className="px-2 py-0.5 bg-amber-600 text-white rounded-md text-[10px] font-extrabold shadow-2xs">10%</span>
          </div>
          <div className="text-2xl font-black text-amber-950 mt-2">
            {saberesTareas.length} <span className="text-xs font-medium text-amber-600">/ {totalEnModulo} saberes</span>
          </div>
          <div className="w-full bg-amber-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
            <div 
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalEnModulo > 0 ? (saberesTareas.length / totalEnModulo) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[11px] text-amber-800/80 mt-2 font-medium">Investigación y rigor ético</p>
        </div>

        {/* Sinergias */}
        <div className="bg-gradient-to-br from-purple-50/70 to-fuchsia-50/50 border border-purple-200/80 rounded-2xl p-4.5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">🔗 Clústeres Activos</span>
            <span className="px-2 py-0.5 bg-purple-600 text-white rounded-md text-[10px] font-extrabold shadow-2xs">Sinergia</span>
          </div>
          <div className="text-2xl font-black text-purple-950 mt-2">
            {correlacionesVisibles.length} <span className="text-xs font-medium text-purple-600">articulaciones</span>
          </div>
          <div className="w-full bg-purple-200/60 rounded-full h-2 mt-2.5 overflow-hidden">
            <div 
              className="bg-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (correlacionesVisibles.length / 3) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-purple-800/80 mt-2 font-medium">Integración interdisciplinaria</p>
        </div>
      </div>

      {/* VISTA 1: TABLERO KANBAN VISUAL */}
      {vistaModo === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Columna 1: Trabajo Cotidiano */}
          <div className="bg-blue-50/40 border-2 border-blue-200/70 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  🛠️
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-blue-950">Trabajo Cotidiano</h3>
                  <p className="text-[11px] text-blue-700 font-medium">45% - 50% del Periodo</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-full text-xs font-black">
                {saberesCotidiano.length}
              </span>
            </div>

            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {saberesCotidiano.length === 0 ? (
                <div className="p-8 text-center text-xs text-blue-400 font-medium border border-dashed border-blue-200 rounded-2xl bg-white/60">
                  No hay indicadores asignados a Trabajo Cotidiano.
                </div>
              ) : (
                saberesCotidiano.map(({ saber, area, moduloId }) => (
                  <TarjetaIndicadorKanban
                    key={`cotidiano-${saber.id}`}
                    saber={saber}
                    area={area}
                    moduloId={moduloId}
                    matriz={matriz}
                    componenteActivo="trabajo_cotidiano"
                    onToggle={handleToggleComponente}
                    onCambioInstrumento={handleCambioInstrumento}
                    onCambioCorrelacion={handleCambioCorrelacion}
                  />
                ))
              )}
            </div>
          </div>

          {/* Columna 2: Proyecto Semestral */}
          <div className="bg-emerald-50/40 border-2 border-emerald-200/70 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  🚀
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-emerald-950">Proyecto Semestral</h3>
                  <p className="text-[11px] text-emerald-700 font-medium">30% - 40% (Design Thinking / DT)</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-xs font-black">
                {saberesProyecto.length}
              </span>
            </div>

            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {saberesProyecto.length === 0 ? (
                <div className="p-8 text-center text-xs text-emerald-400 font-medium border border-dashed border-emerald-200 rounded-2xl bg-white/60">
                  No hay indicadores asignados al Proyecto Semestral.
                </div>
              ) : (
                saberesProyecto.map(({ saber, area, moduloId }) => (
                  <TarjetaIndicadorKanban
                    key={`proyecto-${saber.id}`}
                    saber={saber}
                    area={area}
                    moduloId={moduloId}
                    matriz={matriz}
                    componenteActivo="proyecto"
                    onToggle={handleToggleComponente}
                    onCambioInstrumento={handleCambioInstrumento}
                    onCambioCorrelacion={handleCambioCorrelacion}
                  />
                ))
              )}
            </div>
          </div>

          {/* Columna 3: Tareas Cortas */}
          <div className="bg-amber-50/40 border-2 border-amber-200/70 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/80">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  📝
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-amber-950">Tareas Cortas</h3>
                  <p className="text-[11px] text-amber-700 font-medium">10% del Periodo</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-amber-600 text-white rounded-full text-xs font-black">
                {saberesTareas.length}
              </span>
            </div>

            {/* Lineamiento Normativo para Tareas (10% REA) */}
            <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-2.5 text-[11px] text-amber-950 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1 text-amber-900">
                <span>📝</span> Lineamiento de Tareas (10% REA):
              </div>
              <p className="text-zinc-700">
                Tareas formativas de corta duración: fichas diagnósticas, bitácora desconectada, análisis ético de casos y diagramación de algoritmos.
              </p>
            </div>

            <div className="space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {saberesTareas.length === 0 ? (
                <div className="p-8 text-center text-xs text-amber-400 font-medium border border-dashed border-amber-200 rounded-2xl bg-white/60">
                  No hay indicadores asignados a Tareas Cortas.
                </div>
              ) : (
                saberesTareas.map(({ saber, area, moduloId }) => (
                  <TarjetaIndicadorKanban
                    key={`tareas-${saber.id}`}
                    saber={saber}
                    area={area}
                    moduloId={moduloId}
                    matriz={matriz}
                    componenteActivo="tareas"
                    onToggle={handleToggleComponente}
                    onCambioInstrumento={handleCambioInstrumento}
                    onCambioCorrelacion={handleCambioCorrelacion}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* VISTA 2: MATRIZ TABULAR CURRICULAR */}
      {vistaModo === 'matriz' && (
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base font-bold text-zinc-900">
                Matriz Tabular de Evaluación Curricular (9° Año MEP)
              </h2>
              <p className="text-xs text-zinc-500">
                Seleccione con precisión los componentes e instrumentos evaluativos por cada saber e indicador.
              </p>
            </div>

            <input
              type="text"
              placeholder="Filtrar por saber o indicador..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 w-56"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-700 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-3">Saber & Área</th>
                  <th className="p-3">Indicador de Logro Oficial</th>
                  <th className="p-3 text-center">Cotidiano (45-50%)</th>
                  <th className="p-3 text-center">Proyecto (30-40%)</th>
                  <th className="p-3 text-center">Tareas (10%)</th>
                  <th className="p-3">Instrumento Sugerido</th>
                  <th className="p-3">Sinergia / Clúster</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {saberesFiltrados.map(({ saber, area, moduloId }) => {
                  const asig = matriz.asignaciones[saber.id] || {
                    saberId: saber.id,
                    saberNombre: saber.nombre,
                    indicadorTexto: saber.indicador,
                    areaNombre: area.nombre,
                    areaId: area.id,
                    moduloId,
                    componentes: ['trabajo_cotidiano'],
                    instrumentoSugerido: 'Escala de desempeño / Bitácora'
                  };

                  const tieneCotidiano = asig.componentes.includes('trabajo_cotidiano');
                  const tieneProyecto = asig.componentes.includes('proyecto');
                  const tieneTareas = asig.componentes.includes('tareas');

                  return (
                    <tr key={saber.id} className="hover:bg-zinc-50/60 transition-colors">
                      <td className="p-3 font-semibold text-zinc-900 whitespace-nowrap">
                        <div className="flex items-center space-x-1.5">
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            moduloId === 1 ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            M{moduloId}
                          </span>
                          <span>{saber.nombre}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-normal block mt-0.5">
                          {area.nombre}
                        </span>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          {(MAPEO_EJES_POR_SABER[saber.id] || []).map((ejeId) => {
                            const cfg = EJES_TRANSVERSALES_OFICIALES[ejeId];
                            if (!cfg) return null;
                            return (
                              <span
                                key={ejeId}
                                className={`px-1 py-0.2 rounded text-[8px] font-bold border ${cfg.bgLight}`}
                                title={cfg.nombre}
                              >
                                {ejeId === 'pensamiento_computacional' ? '💻 Computacional' : ejeId === 'ciudadania_etica_digital' ? '🛡️ Ética Digital' : '🚀 Emprendimiento'}
                              </span>
                            );
                          })}
                        </div>
                      </td>

                      <td className="p-3 text-zinc-700 max-w-sm leading-relaxed space-y-1.5">
                        <p className="text-xs text-zinc-800">{saber.indicador}</p>
                        
                        <div className="text-[10px] space-y-0.5 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                          <div className="text-sky-900 font-semibold">
                            <span className="font-bold">⚙️ Procedimental:</span> {saber.estrategiaMetodologica?.practicasComputacionales?.join(' • ') || 'Montaje técnico y aplicación algorítmica'}
                          </div>
                          <div className="text-emerald-900 font-semibold">
                            <span className="font-bold">💡 Actitudinal:</span> {saber.estrategiaMetodologica?.actitudesComputacionales?.join(' • ') || 'Gusto por la precisión y trabajo ético'}
                          </div>
                        </div>

                        {tieneProyecto && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[9px] font-bold">
                            <Lock className="w-2.5 h-2.5 text-emerald-600" />
                            <span>Vinculado a Proyecto Semestral (Design Thinking)</span>
                          </div>
                        )}
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggleComponente(saber.id, 'trabajo_cotidiano')}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center mx-auto transition-all ${
                            tieneCotidiano ? 'bg-blue-600 text-white shadow-2xs font-bold' : 'bg-zinc-100 text-zinc-300 hover:bg-zinc-200'
                          }`}
                        >
                          {tieneCotidiano ? '✓' : '•'}
                        </button>
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggleComponente(saber.id, 'proyecto')}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center mx-auto transition-all ${
                            tieneProyecto ? 'bg-emerald-600 text-white shadow-2xs font-bold' : 'bg-zinc-100 text-zinc-300 hover:bg-zinc-200'
                          }`}
                        >
                          {tieneProyecto ? '✓' : '•'}
                        </button>
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleToggleComponente(saber.id, 'tareas')}
                          className={`w-7 h-7 rounded-xl flex items-center justify-center mx-auto transition-all ${
                            tieneTareas ? 'bg-amber-600 text-white shadow-2xs font-bold' : 'bg-zinc-100 text-zinc-300 hover:bg-zinc-200'
                          }`}
                        >
                          {tieneTareas ? '✓' : '•'}
                        </button>
                      </td>

                      <td className="p-3">
                        <select
                          value={asig.instrumentoSugerido || 'Escala de desempeño / Bitácora'}
                          onChange={(e) => handleCambioInstrumento(saber.id, e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-[11px] text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900 w-full"
                        >
                          <option value="Escala de desempeño / Bitácora">Escala de desempeño / Bitácora</option>
                          <option value="Rúbrica analítica de proceso (3 niveles)">Rúbrica analítica de proceso</option>
                          <option value="Lista de cotejo formativa">Lista de cotejo formativa</option>
                          <option value="Rúbrica de producto final / prototipo">Rúbrica de producto final</option>
                        </select>
                      </td>

                      <td className="p-3">
                        <select
                          value={asig.correlacionId || ''}
                          onChange={(e) => handleCambioCorrelacion(saber.id, e.target.value)}
                          className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-[11px] text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900 w-full"
                        >
                          <option value="">(Individual)</option>
                          {matriz.correlaciones
                            .filter((c) => c.moduloId === moduloId || c.moduloId === 'ambos')
                            .map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.titulo}
                              </option>
                            ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA 3: MAPA DE SINERGIAS Y CORRELACIONES */}
      {vistaModo === 'sinergias' && (
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-purple-600" />
                  Clústeres Sinergéticos de Indicadores (9° Año)
                </h2>
                <p className="text-xs text-zinc-500">
                  Articulación interdisciplinaria de hardware, software y análisis ético del dato para optimizar tiempos de aula.
                </p>
              </div>

              <button
                onClick={() => {
                  setCorrelacionEditando(null);
                  setModalCorrelacionAbierto(true);
                }}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Crear Sinergia</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
              {correlacionesVisibles.map((corr, idx) => (
                <div 
                  key={corr.id}
                  className="border-2 border-purple-100 rounded-2xl p-5 hover:border-purple-300 hover:shadow-md transition-all bg-purple-50/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                        corr.componentePrincipal === 'proyecto'
                          ? 'bg-emerald-600 text-white'
                          : corr.componentePrincipal === 'trabajo_cotidiano'
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-600 text-white'
                      }`}>
                        {corr.componentePrincipal.replace('_', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => {
                            setCorrelacionEditando(corr);
                            setModalCorrelacionAbierto(true);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-white transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('¿Desea eliminar esta sinergia?')) {
                              const updated = deleteCorrelacionIndicadoresLocal(corr.id);
                              setMatriz({ ...updated });
                              notificarGuardado('Sinergia eliminada');
                            }
                          }}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-sm text-zinc-900 mt-2.5 leading-snug">
                      {corr.titulo}
                    </h3>

                    {/* Flujo Visual de Saberes Conectados */}
                    <div className="mt-3.5 p-3 bg-white rounded-xl border border-purple-100/80 space-y-1.5">
                      <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block">
                        Flujo Sinergético ({corr.saberesNombres.length} saberes):
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {corr.saberesNombres.map((sNombre, sIdx) => (
                          <React.Fragment key={sIdx}>
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-900 border border-purple-200 rounded-md text-[10px] font-bold">
                              {sNombre}
                            </span>
                            {sIdx < corr.saberesNombres.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-purple-400" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-600 mt-3 leading-relaxed">
                      {corr.justificacionPedagogica}
                    </p>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-purple-100 text-[11px] space-y-1 bg-white/70 p-2.5 rounded-xl">
                    <div className="text-zinc-700">
                      <span className="font-bold text-zinc-900">Actividad:</span> {corr.actividadIntegradaSugerida}
                    </div>
                    <div className="text-purple-700 font-semibold">
                      <span className="font-bold text-zinc-900">Instrumento:</span> {corr.instrumentoEvaluacion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE ASISTENTE IA */}
      {modalIAModeloAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xs">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900">
                    Organización Pedagógica y Correlación de Indicadores por IA
                  </h3>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sinergias aplicadas automáticamente al Tablero y Matriz de Evaluación</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setModalIAModeloAbierto(false)} className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs text-zinc-800 leading-relaxed font-sans">
              {cargandoIA ? (
                <div className="py-12 text-center text-zinc-500 space-y-3">
                  <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto" />
                  <p className="font-bold text-sm text-zinc-800">Organizando indicadores por similitud técnica y continuidad...</p>
                  <p className="text-xs text-zinc-400">Verificando sinergias entre hardware, algoritmos y datos.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
                    <span className="font-medium">
                      🎯 <strong>Distribución Normativa REA:</strong> Trabajo Cotidiano (45-50%), Proyecto DT (30-40%), Tareas (10%).
                    </span>
                    <span className="text-[10px] bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                      100% Sincronizado
                    </span>
                  </div>
                  <div className="prose prose-xs max-w-none text-zinc-800 whitespace-pre-line font-mono bg-zinc-50 p-4.5 rounded-2xl border border-zinc-200">
                    {respuestaIA}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3.5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">PÍA Asistente Curricular MEP</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(respuestaIA);
                    notificarGuardado('Copiado al portapapeles');
                  }}
                  className="px-3.5 py-1.5 border border-zinc-200 hover:bg-white text-zinc-700 rounded-xl text-xs font-semibold"
                >
                  Copiar Análisis
                </button>
                <button
                  onClick={() => {
                    setModalIAModeloAbierto(false);
                    setVistaModo('kanban');
                  }}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                >
                  Ver en Tablero Kanban →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CREAR / EDITAR CORRELACIÓN */}
      {modalCorrelacionAbierto && (
        <ModalCrearEditarCorrelacion
          correlacion={correlacionEditando}
          moduloFiltro={moduloFiltro}
          todosSaberes={todosSaberes}
          onGuardar={handleGuardarCorrelacionModal}
          onCerrar={() => {
            setModalCorrelacionAbierto(false);
            setCorrelacionEditando(null);
          }}
        />
      )}

      {/* MODAL PERFIL DE SALIDA Y EJES TRANSVERSALES NOVENO AÑO */}
      {modalPerfilSalidaAbierto && (
        <ModalPerfilSalidaNoveno
          onCerrar={() => setModalPerfilSalidaAbierto(false)}
        />
      )}
    </div>
  );
};

// Subcomponente Tarjeta de Indicador para Tablero Kanban
interface TarjetaIndicadorKanbanProps {
  saber: any;
  area: any;
  moduloId: 1 | 2;
  matriz: MatrizEvaluacionNoveno;
  componenteActivo: ComponenteEvaluacionTipo;
  onToggle: (saberId: string, comp: ComponenteEvaluacionTipo) => void;
  onCambioInstrumento: (saberId: string, inst: string) => void;
  onCambioCorrelacion: (saberId: string, corrId: string) => void;
}

const TarjetaIndicadorKanban: React.FC<TarjetaIndicadorKanbanProps> = ({
  saber,
  area,
  moduloId,
  matriz,
  componenteActivo,
  onToggle,
  onCambioInstrumento,
  onCambioCorrelacion
}) => {
  const asig = matriz.asignaciones[saber.id] || {
    saberId: saber.id,
    saberNombre: saber.nombre,
    indicadorTexto: saber.indicador,
    areaNombre: area.nombre,
    areaId: area.id,
    moduloId,
    componentes: ['trabajo_cotidiano'],
    instrumentoSugerido: 'Escala de desempeño / Bitácora'
  };

  const tieneCotidiano = asig.componentes.includes('trabajo_cotidiano');
  const tieneProyecto = asig.componentes.includes('proyecto');
  const tieneTareas = asig.componentes.includes('tareas');

  return (
    <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 hover:border-zinc-300 hover:shadow-md transition-all space-y-3 group">
      {/* Header Saber y Badges */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase ${
            moduloId === 1 ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
          }`}>
            M{moduloId}
          </span>
          <span className="text-[10px] font-bold text-zinc-500">
            {area.nombre}
          </span>
        </div>

        {asig.correlacionId && (
          <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-md text-[9px] font-bold flex items-center gap-1 shrink-0">
            <Link2 className="w-2.5 h-2.5" /> Sinergia
          </span>
        )}
      </div>

      <h4 className="font-extrabold text-xs text-zinc-900 leading-snug group-hover:text-indigo-600 transition-colors">
        {saber.nombre}
      </h4>

      <p className="text-[11px] text-zinc-600 leading-relaxed line-clamp-3">
        "{saber.indicador}"
      </p>

      {/* Ejes Transversales Asociados */}
      <div className="flex flex-wrap items-center gap-1">
        {(MAPEO_EJES_POR_SABER[saber.id] || []).map((ejeId) => {
          const cfg = EJES_TRANSVERSALES_OFICIALES[ejeId];
          if (!cfg) return null;
          return (
            <span
              key={ejeId}
              className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold border flex items-center gap-1 ${cfg.bgLight}`}
              title={cfg.nombre}
            >
              <span>{ejeId === 'pensamiento_computacional' ? '💻' : ejeId === 'ciudadania_etica_digital' ? '🛡️' : '🚀'}</span>
              <span>{cfg.nombreCorto}</span>
            </span>
          );
        })}
      </div>

      {/* Integración Explícita de Saberes Procedimentales y Actitudinales */}
      <div className="bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-2.5 space-y-1.5 text-[10px]">
        <div>
          <span className="font-bold text-sky-900 flex items-center gap-1">
            <span>⚙️</span> <strong>Saber Procedimental:</strong>
          </span>
          <span className="text-zinc-600 block pl-3.5 mt-0.5">
            {saber.estrategiaMetodologica?.practicasComputacionales?.join(' • ') || 'Montaje técnico, depuración algorítmica y aplicación práctica.'}
          </span>
        </div>
        <div className="pt-1 border-t border-zinc-200/60">
          <span className="font-bold text-emerald-900 flex items-center gap-1">
            <span>💡</span> <strong>Saber Actitudinal:</strong>
          </span>
          <span className="text-zinc-600 block pl-3.5 mt-0.5">
            {saber.estrategiaMetodologica?.actitudesComputacionales?.join(' • ') || 'Gusto por la precisión, perseverancia ante el error y ética digital.'}
          </span>
        </div>
      </div>

      {/* Badge de Bloqueo a Proyecto si está asignado */}
      {tieneProyecto && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2 flex items-center justify-between text-[10px] font-bold text-emerald-950">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>Vinculado a Proyecto Design Thinking</span>
          </span>
          <span className="bg-emerald-200/80 text-emerald-900 px-1.5 py-0.2 rounded text-[9px]">
            🔒 Fases 1-2-3
          </span>
        </div>
      )}

      {/* Toggles Rápidos de Componentes */}
      <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => onToggle(saber.id, 'trabajo_cotidiano')}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all ${
            tieneCotidiano
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700'
          }`}
          title="Evaluar en Trabajo Cotidiano"
        >
          <Check className={`w-3 h-3 ${tieneCotidiano ? 'text-white' : 'text-transparent'}`} />
          <span>Cotidiano</span>
        </button>

        <button
          onClick={() => onToggle(saber.id, 'proyecto')}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all ${
            tieneProyecto
              ? 'bg-emerald-600 text-white shadow-2xs'
              : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700'
          }`}
          title="Evaluar en Proyecto Semestral"
        >
          <Check className={`w-3 h-3 ${tieneProyecto ? 'text-white' : 'text-transparent'}`} />
          <span>Proyecto</span>
        </button>

        <button
          onClick={() => onToggle(saber.id, 'tareas')}
          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all ${
            tieneTareas
              ? 'bg-amber-600 text-white shadow-2xs'
              : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-700'
          }`}
          title="Evaluar en Tareas Cortas"
        >
          <Check className={`w-3 h-3 ${tieneTareas ? 'text-white' : 'text-transparent'}`} />
          <span>Tareas</span>
        </button>
      </div>

      {/* Selector de Instrumento en Badge */}
      <div className="pt-1.5">
        <select
          value={asig.instrumentoSugerido || 'Escala de desempeño / Bitácora'}
          onChange={(e) => onCambioInstrumento(saber.id, e.target.value)}
          className="w-full bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl px-2.5 py-1 text-[10px] font-semibold text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-900 cursor-pointer"
        >
          <option value="Escala de desempeño / Bitácora">📋 Escala de desempeño / Bitácora</option>
          <option value="Rúbrica analítica de proceso (3 niveles)">📊 Rúbrica analítica de proceso</option>
          <option value="Lista de cotejo formativa">✔️ Lista de cotejo formativa</option>
          <option value="Rúbrica de producto final / prototipo">🏆 Rúbrica de producto final</option>
          <option value="Prueba práctica de ejecución">⚡ Prueba práctica de ejecución</option>
        </select>
      </div>
    </div>
  );
};

// Subcomponente Modal de Crear/Editar Correlación
interface ModalCorrelacionProps {
  correlacion: CorrelacionIndicadores | null;
  moduloFiltro: 1 | 2 | 'todos';
  todosSaberes: { saber: any; area: any; moduloId: 1 | 2 }[];
  onGuardar: (corr: CorrelacionIndicadores) => void;
  onCerrar: () => void;
}

const ModalCrearEditarCorrelacion: React.FC<ModalCorrelacionProps> = ({
  correlacion,
  moduloFiltro,
  todosSaberes,
  onGuardar,
  onCerrar
}) => {
  const [titulo, setTitulo] = useState(correlacion?.titulo || '');
  const [moduloId, setModuloId] = useState<1 | 2 | 'ambos'>(
    correlacion?.moduloId || (moduloFiltro === 'todos' ? 1 : moduloFiltro)
  );
  const [componentePrincipal, setComponentePrincipal] = useState<ComponenteEvaluacionTipo>(
    correlacion?.componentePrincipal || 'proyecto'
  );
  const [saberesIds, setSaberesIds] = useState<string[]>(correlacion?.saberesIds || []);
  const [justificacionPedagogica, setJustificacionPedagogica] = useState(
    correlacion?.justificacionPedagogica || ''
  );
  const [actividadIntegradaSugerida, setActividadIntegradaSugerida] = useState(
    correlacion?.actividadIntegradaSugerida || ''
  );
  const [instrumentoEvaluacion, setInstrumentoEvaluacion] = useState(
    correlacion?.instrumentoEvaluacion || 'Rúbrica Analítica de Proyecto Integrado'
  );

  const saberesDisponibles = todosSaberes.filter(
    (s) => moduloId === 'ambos' || s.moduloId === moduloId
  );

  const handleToggleSaber = (sId: string) => {
    if (saberesIds.includes(sId)) {
      setSaberesIds(saberesIds.filter((id) => id !== sId));
    } else {
      setSaberesIds([...saberesIds, sId]);
    }
  };

  const handleGuardar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      alert('Por favor ingrese un título para la sinergia.');
      return;
    }
    if (saberesIds.length === 0) {
      alert('Debe seleccionar al menos un saber para la sinergia.');
      return;
    }

    const saberesNombres = saberesIds.map(
      (id) => todosSaberes.find((s) => s.saber.id === id)?.saber.nombre || id
    );
    const indicadoresTextos = saberesIds.map(
      (id) => todosSaberes.find((s) => s.saber.id === id)?.saber.indicador || ''
    );

    const nuevaCorr: CorrelacionIndicadores = {
      id: correlacion?.id || `corr-${Date.now()}`,
      titulo,
      moduloId,
      componentePrincipal,
      saberesIds,
      saberesNombres,
      indicadoresTextos,
      justificacionPedagogica: justificacionPedagogica || 'Articulación sinérgica de saberes e indicadores.',
      actividadIntegradaSugerida: actividadIntegradaSugerida || 'Actividad práctica integrada.',
      instrumentoEvaluacion: instrumentoEvaluacion || 'Rúbrica Analítica',
      esSugerenciaIA: correlacion?.esSugerenciaIA || false
    };

    onGuardar(nuevaCorr);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center space-x-2">
            <Link2 className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-zinc-900">
              {correlacion ? 'Editar Sinergia / Clúster' : 'Nueva Sinergia de Indicadores'}
            </h3>
          </div>
          <button onClick={onCerrar} className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleGuardar} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Título de la Sinergia:
            </label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Sinergia de Automatización Domótica y Control Algorítmico"
              className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">Módulo:</label>
              <select
                value={moduloId}
                onChange={(e) => setModuloId(e.target.value as any)}
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value={1}>Módulo 1 (Robótica)</option>
                <option value={2}>Módulo 2 (BD e IA)</option>
                <option value="ambos">Ambos Módulos (Transversal)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">Componente Principal:</label>
              <select
                value={componentePrincipal}
                onChange={(e) => setComponentePrincipal(e.target.value as any)}
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="proyecto">🚀 Proyecto Semestral</option>
                <option value="trabajo_cotidiano">🛠️ Trabajo Cotidiano</option>
                <option value="tareas">📝 Tareas Cortas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1.5">
              Seleccione los Saberes a Articular ({saberesIds.length} seleccionados):
            </label>
            <div className="max-h-40 overflow-y-auto border border-zinc-200 rounded-2xl p-2.5 space-y-1.5 bg-zinc-50/50">
              {saberesDisponibles.map(({ saber, area, moduloId: mId }) => {
                const seleccionado = saberesIds.includes(saber.id);
                return (
                  <label
                    key={saber.id}
                    className={`flex items-start space-x-2 p-2 rounded-xl cursor-pointer transition-colors ${
                      seleccionado ? 'bg-purple-50 border border-purple-200 text-purple-950 font-medium' : 'hover:bg-zinc-100 text-zinc-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={seleccionado}
                      onChange={() => handleToggleSaber(saber.id)}
                      className="mt-0.5 rounded text-purple-600 focus:ring-0"
                    />
                    <div className="text-[11px] leading-tight">
                      <span className="font-bold">M{mId} • {saber.nombre}</span> ({area.nombre})
                      <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">{saber.indicador}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-zinc-700 mb-1">
              Justificación Pedagógica de la Articulación:
            </label>
            <textarea
              rows={2}
              value={justificacionPedagogica}
              onChange={(e) => setJustificacionPedagogica(e.target.value)}
              placeholder="¿Por qué se integran estos indicadores? (Ej: Articulación sensor-algoritmo-actuador)"
              className="w-full border border-zinc-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-zinc-700 mb-1">
                Actividad Integrada Sugerida:
              </label>
              <input
                type="text"
                value={actividadIntegradaSugerida}
                onChange={(e) => setActividadIntegradaSugerida(e.target.value)}
                placeholder="Ej: Construcción de prototipo de aula inteligente"
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>

            <div>
              <label className="block font-bold text-zinc-700 mb-1">
                Instrumento Evaluativo:
              </label>
              <input
                type="text"
                value={instrumentoEvaluacion}
                onChange={(e) => setInstrumentoEvaluacion(e.target.value)}
                placeholder="Ej: Rúbrica analítica de proyecto"
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onCerrar}
              className="px-3.5 py-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold"
            >
              Guardar Sinergia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Subcomponente Modal de Perfil de Salida de 9° Año & Ejes Transversales (III Ciclo MEP)
interface ModalPerfilSalidaProps {
  onCerrar: () => void;
}

const ModalPerfilSalidaNoveno: React.FC<ModalPerfilSalidaProps> = ({ onCerrar }) => {
  const [tabActiva, setTabActiva] = useState<'perfil' | 'ejes'>('perfil');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-gradient-to-r from-emerald-900 via-zinc-900 to-teal-950 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600/30 border border-emerald-400/40 text-emerald-300 rounded-2xl shadow-xs">
              <Award className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 rounded-md text-[10px] font-extrabold uppercase">
                  III Ciclo • 9° Año
                </span>
                <span className="text-[11px] text-zinc-300 font-medium">Formación Tecnológica MEP 2026</span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-white mt-1">
                Perfil de Salida de Noveno Año & Ejes Transversales
              </h3>
            </div>
          </div>
          <button 
            onClick={onCerrar} 
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 pb-2 border-b border-zinc-100 bg-zinc-50 flex items-center space-x-2">
          <button
            onClick={() => setTabActiva('perfil')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              tabActiva === 'perfil'
                ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Target className="w-4 h-4 text-emerald-600" />
            <span>6 Dimensiones del Perfil de Salida</span>
          </button>
          <button
            onClick={() => setTabActiva('ejes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
              tabActiva === 'ejes'
                ? 'bg-white text-zinc-900 shadow-xs ring-1 ring-zinc-200'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Leaf className="w-4 h-4 text-teal-600" />
            <span>4 Ejes Transversales Oficiales</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {tabActiva === 'perfil' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 text-zinc-700">
                <h4 className="font-extrabold text-emerald-950 text-sm mb-1 flex items-center gap-1.5">
                  <span>🎯</span> Marco del Perfil de Egreso para 9° Año (III Ciclo)
                </h4>
                <p className="leading-relaxed text-zinc-600">
                  El perfil de salida de Noveno Año sintetiza las competencias terminales del III Ciclo. A través de los Módulos 1 y 2, las actividades de mediación y los proyectos se articulan para garantizar que cada estudiante alcance autonomía en pensamiento computacional, robótica, gestión de datos, modelado 3D y ética de la IA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {PERFIL_SALIDA_NOVENO_RASGOS.map((rasgo) => (
                  <div 
                    key={rasgo.id}
                    className="bg-white border border-zinc-200 rounded-2xl p-4 hover:border-emerald-300 hover:shadow-xs transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[10px] font-black">
                        {rasgo.codigo}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        {rasgo.dimension}
                      </span>
                    </div>

                    <h5 className="font-extrabold text-xs text-zinc-900 leading-snug">
                      {rasgo.titulo}
                    </h5>

                    <p className="text-zinc-600 text-[11px] leading-relaxed">
                      {rasgo.descripcion}
                    </p>

                    <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center gap-1">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mr-1">
                        Ejes vinculados:
                      </span>
                      {rasgo.ejesTransversalesAsociados.map((ejeId) => {
                        const cfg = EJES_TRANSVERSALES_OFICIALES[ejeId];
                        if (!cfg) return null;
                        return (
                          <span
                            key={ejeId}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${cfg.bgLight}`}
                          >
                            {ejeId === 'pensamiento_computacional' ? '💻' : ejeId === 'ciudadania_etica_digital' ? '🛡️' : '🚀'} {cfg.nombreCorto}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tabActiva === 'ejes' && (
            <div className="space-y-4">
              <div className="bg-teal-50/60 border border-teal-200/80 rounded-2xl p-4 text-zinc-700">
                <h4 className="font-extrabold text-teal-950 text-sm mb-1 flex items-center gap-1.5">
                  <span>💻</span> Ejes Transversales Oficiales del Currículo MEP
                </h4>
                <p className="leading-relaxed text-zinc-600">
                  Los ejes transversales orientan el propósito ético y contextual de cada saber. En 9° año, se manifiestan en el Pensamiento Computacional, la Ciudadanía y Ética Digital, y el Emprendimiento e Innovación.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {Object.values(EJES_TRANSVERSALES_OFICIALES).map((eje) => (
                  <div
                    key={eje.id}
                    className="bg-white border border-zinc-200 rounded-2xl p-4 hover:border-teal-300 hover:shadow-xs transition-all space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">
                        {eje.id === 'pensamiento_computacional' ? '💻' : eje.id === 'ciudadania_etica_digital' ? '🛡️' : '🚀'}
                      </span>
                      <div>
                        <h5 className="font-extrabold text-xs text-zinc-900 leading-snug">
                          {eje.nombreCorto}
                        </h5>
                        <p className="text-[10px] text-zinc-500 font-medium leading-tight">
                          {eje.nombre}
                        </p>
                      </div>
                    </div>

                    <p className="text-zinc-600 text-[11px] leading-relaxed">
                      {eje.descripcion}
                    </p>

                    <div className="bg-zinc-50 p-2.5 rounded-xl text-[11px] space-y-1">
                      <span className="font-bold text-zinc-800 block text-[10px] uppercase tracking-wider">
                        Aplicación Práctica en 9° Año:
                      </span>
                      <p className="text-zinc-600">{eje.aplicacionEnNoveno}</p>
                    </div>

                    <div className="text-[10px] text-zinc-500 space-y-1">
                      <span className="font-bold text-zinc-700 block">Ejemplos de Integración:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-zinc-600 pl-1">
                        {eje.ejemplosProyectos.map((ej, idx) => (
                          <li key={idx}>{ej}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 font-medium">
            Articulación Curricular III Ciclo • Formación Tecnológica 2026
          </span>
          <button
            onClick={onCerrar}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

