'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { EJES_TRANSVERSALES_OFICIALES, MAPEO_EJES_POR_SABER } from '../../data/ejesTransversalesData';
import { getDistribucionEvaluacionLocal } from '../../lib/storage';
import { 
  getAllArchivosEvidencias, 
  guardarArchivoEvidencia, 
  eliminarArchivoEvidencia, 
  descargarArchivoEvidencia,
  formatearTamanoBytes 
} from '../../lib/file-storage';
import { 
  ArchivoEvidencia, 
  ComponenteEvaluacionTipo, 
  MatrizEvaluacionNoveno, 
  EjeTransversalTipo 
} from '../../types';
import { RecursoApoyoModal } from '../RecursoApoyo/RecursoApoyoModal';
import {
  UploadCloud,
  FileText,
  Trash2,
  Download,
  Filter,
  Search,
  Sparkles,
  CheckCircle2,
  Layers,
  FolderOpen,
  File,
  FileCode,
  FileSpreadsheet,
  Image as ImageIcon,
  Archive,
  Clock,
  Plus,
  X,
  Check,
  Tag,
  BookOpen,
  CheckSquare
} from 'lucide-react';

export const WebAppsCatalogoView: React.FC = () => {
  const [matriz, setMatriz] = useState<MatrizEvaluacionNoveno | null>(null);
  const [archivos, setArchivos] = useState<ArchivoEvidencia[]>([]);
  const [componenteFiltro, setComponenteFiltro] = useState<ComponenteEvaluacionTipo | 'todos'>('todos');
  const [ejeFiltro, setEjeFiltro] = useState<EjeTransversalTipo | 'todos'>('todos');
  const [busqueda, setBusqueda] = useState<string>('');
  
  // Modal de Subida de Archivo
  const [modalSubidaAbierto, setModalSubidaAbierto] = useState<boolean>(false);
  const [saberSeleccionadoParaSubir, setSaberSeleccionadoParaSubir] = useState<{
    id: string;
    nombre: string;
    indicador: string;
    componente: ComponenteEvaluacionTipo;
  } | null>(null);
  
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [categoriaArchivo, setCategoriaArchivo] = useState<'guia_didactica' | 'instrumento_evaluacion' | 'evidencia_estudiante' | 'codigo_fuente' | 'otro'>('instrumento_evaluacion');
  const [descripcionArchivo, setDescripcionArchivo] = useState<string>('');
  const [subiendo, setSubiendo] = useState<boolean>(false);
  const [notificacion, setNotificacion] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal Recurso de Apoyo Pedagógico (4 Pilares)
  const [recursoApoyoModalData, setRecursoApoyoModalData] = useState<{
    saberId: string;
    saberNombre: string;
    indicador: string;
    areaNombre: string;
    moduloId: number;
  } | null>(null);

  useEffect(() => {
    cargarDatos();

    // Listener reactivo para actualización de base de datos
    const handleEvidenciasActualizadas = () => {
      cargarArchivos();
    };

    window.addEventListener('evidencias_actualizadas', handleEvidenciasActualizadas);
    return () => {
      window.removeEventListener('evidencias_actualizadas', handleEvidenciasActualizadas);
    };
  }, []);

  const cargarDatos = async () => {
    const mat = getDistribucionEvaluacionLocal();
    setMatriz(mat);
    await cargarArchivos();
  };

  const cargarArchivos = async () => {
    const data = await getAllArchivosEvidencias();
    setArchivos(data);
  };

  const mostrarNotificacion = (msg: string) => {
    setNotificacion(msg);
    setTimeout(() => setNotificacion(null), 3000);
  };

  const modulo1 = MODULOS_NOVENO_OFICIAL.find((m) => m.id === 1);
  if (!modulo1) return null;

  // Lista de saberes de Módulo 1 con sus asignaciones activas de evaluación
  const saberesModulo1 = modulo1.areas.flatMap((area) =>
    area.saberes.map((saber) => {
      const asig = matriz?.asignaciones[saber.id];
      const componentes = asig?.componentes || ['trabajo_cotidiano'];
      const instrumentoSugerido = asig?.instrumentoSugerido || 'Escala de desempeño / Bitácora';
      const archivosDelSaber = archivos.filter((a) => a.saberId === saber.id);

      return {
        saber,
        area,
        componentes,
        instrumentoSugerido,
        archivos: archivosDelSaber,
        correlacionId: asig?.correlacionId
      };
    })
  );

  // Filtrado reactivo
  const saberesFiltrados = saberesModulo1.filter((item) => {
    // Filtro por Componente
    if (componenteFiltro !== 'todos') {
      if (!item.componentes.includes(componenteFiltro)) return false;
    }

    // Filtro por Eje Transversal
    if (ejeFiltro !== 'todos') {
      const ejes = MAPEO_EJES_POR_SABER[item.saber.id] || [];
      if (!ejes.includes(ejeFiltro)) return false;
    }

    // Búsqueda por texto
    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      const match =
        item.saber.nombre.toLowerCase().includes(q) ||
        item.saber.indicador.toLowerCase().includes(q) ||
        item.area.nombre.toLowerCase().includes(q) ||
        item.archivos.some((a) => a.nombreArchivo.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  // Métricas de la Base de Datos
  const totalArchivosModulo1 = archivos.filter((a) => a.moduloId === 1).length;
  const archivosCotidiano = archivos.filter((a) => a.componenteAsociado === 'trabajo_cotidiano').length;
  const archivosProyecto = archivos.filter((a) => a.componenteAsociado === 'proyecto').length;
  const archivosTareas = archivos.filter((a) => a.componenteAsociado === 'tareas').length;

  // Manejo de Subida de Archivo a la Base de Datos
  const handleAbrirModalSubida = (
    saberId: string,
    saberNombre: string,
    indicador: string,
    componenteDefault: ComponenteEvaluacionTipo = 'trabajo_cotidiano'
  ) => {
    setSaberSeleccionadoParaSubir({
      id: saberId,
      nombre: saberNombre,
      indicador,
      componente: componenteDefault
    });
    setArchivoSeleccionado(null);
    setDescripcionArchivo('');
    setCategoriaArchivo('instrumento_evaluacion');
    setModalSubidaAbierto(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSeleccionado(e.target.files[0]);
    }
  };

  const handleGuardarArchivo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!archivoSeleccionado || !saberSeleccionadoParaSubir) {
      alert('Por favor selecciona un archivo para almacenar en la base de datos.');
      return;
    }

    setSubiendo(true);
    try {
      // Convertir archivo a Base64 Data URL para almacenamiento offline seguro
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;

        const nuevoArchivo: ArchivoEvidencia = {
          id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          saberId: saberSeleccionadoParaSubir.id,
          saberNombre: saberSeleccionadoParaSubir.nombre,
          indicadorTexto: saberSeleccionadoParaSubir.indicador,
          moduloId: 1,
          componenteAsociado: saberSeleccionadoParaSubir.componente,
          nombreArchivo: archivoSeleccionado.name,
          tipoMime: archivoSeleccionado.type || 'application/octet-stream',
          tamanoBytes: archivoSeleccionado.size,
          tamanoFormateado: formatearTamanoBytes(archivoSeleccionado.size),
          fechaSubida: new Date().toISOString(),
          dataUrl,
          descripcionOpcional: descripcionArchivo.trim(),
          categoriaRecurso: categoriaArchivo
        };

        await guardarArchivoEvidencia(nuevoArchivo);
        await cargarArchivos();
        setSubiendo(false);
        setModalSubidaAbierto(false);
        mostrarNotificacion(`¡Archivo "${archivoSeleccionado.name}" almacenado con éxito!`);
      };

      reader.onerror = () => {
        alert('Error al procesar el archivo.');
        setSubiendo(false);
      };

      reader.readAsDataURL(archivoSeleccionado);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error al guardar el archivo en la base de datos.');
      setSubiendo(false);
    }
  };

  const handleEliminarArchivo = async (id: string, nombre: string) => {
    if (confirm(`¿Deseas eliminar el archivo "${nombre}" de la base de datos?`)) {
      await eliminarArchivoEvidencia(id, nombre);
      await cargarArchivos();
      mostrarNotificacion(`Archivo eliminado de la base de datos.`);
    }
  };

  const getIconoArchivo = (nombre: string, mime: string) => {
    const ext = nombre.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) return <FileText className="w-4 h-4 text-red-600" />;
    if (['doc', 'docx'].includes(ext || '')) return <FileText className="w-4 h-4 text-blue-600" />;
    if (['xls', 'xlsx', 'csv'].includes(ext || '')) return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
    if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext || '')) return <ImageIcon className="w-4 h-4 text-purple-600" />;
    if (['zip', 'rar', '7z', 'tar'].includes(ext || '')) return <Archive className="w-4 h-4 text-amber-600" />;
    if (['py', 'ino', 'js', 'ts', 'hex', 'sb3', 'json', 'cpp'].includes(ext || '')) return <FileCode className="w-4 h-4 text-sky-600" />;
    return <File className="w-4 h-4 text-zinc-500" />;
  };

  const getEtiquetaCategoria = (cat?: string) => {
    switch (cat) {
      case 'instrumento_evaluacion':
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">📋 Instrumento / Rúbrica</span>;
      case 'guia_didactica':
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-sky-50 text-sky-700 border border-sky-200">📖 Guía de Trabajo</span>;
      case 'evidencia_estudiante':
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">🎓 Evidencia Estudiantil</span>;
      case 'codigo_fuente':
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200">💻 Código / Simulador</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">📁 Recurso General</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header Banner Oficial Enlazado a Evaluación */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-xl text-[11px] font-extrabold uppercase bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-xs">
                Recursos y Evidencias Digitales • Módulo 1 (9° Año)
              </span>
              <span className="text-xs text-zinc-500 font-medium">
                Enlazado a Matriz de Evaluación REA MEP
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Organizador de Indicadores, Instrumentos y Evidencias por Componente
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-4xl leading-relaxed">
              Los saberes e indicadores aparecen <strong>automáticamente organizados según la selección previa de componentes de evaluación</strong> (Trabajo Cotidiano, Proyecto Semestral y Tareas). Puede subir, almacenar en la base de datos local y descargar los instrumentos, rúbricas, guías y evidencias asociadas a cada indicador.
            </p>
          </div>

          {/* Tarjetas de Métricas Rápidas de la Base de Datos */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2.5 shrink-0">
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3.5 text-center min-w-[100px] shadow-2xs">
              <div className="text-[10px] font-extrabold text-sky-800 uppercase tracking-wider">Total Archivos</div>
              <div className="text-xl font-black text-sky-950 mt-0.5">
                {totalArchivosModulo1}
              </div>
              <div className="text-[9px] text-sky-600 font-medium">en Base de Datos</div>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3.5 text-center min-w-[95px] shadow-2xs">
              <div className="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider">Cotidiano</div>
              <div className="text-xl font-black text-blue-950 mt-0.5">
                {archivosCotidiano}
              </div>
              <div className="text-[9px] text-blue-600 font-medium">45-50%</div>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 text-center min-w-[95px] shadow-2xs">
              <div className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">Proyecto</div>
              <div className="text-xl font-black text-emerald-950 mt-0.5">
                {archivosProyecto}
              </div>
              <div className="text-[9px] text-emerald-600 font-medium">30-40%</div>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 text-center min-w-[95px] shadow-2xs">
              <div className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">Tareas</div>
              <div className="text-xl font-black text-amber-950 mt-0.5">
                {archivosTareas}
              </div>
              <div className="text-[9px] text-amber-600 font-medium">10%</div>
            </div>
          </div>
        </div>

        {/* Notificación de Éxito Flotante */}
        {notificacion && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notificacion}</span>
          </div>
        )}

        {/* Barra de Filtros por Componente de Evaluación y Búsqueda */}
        <div className="mt-6 pt-5 border-t border-zinc-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Filtro por Componente de Evaluación */}
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-zinc-400" /> Organizar por:
            </span>

            <button
              onClick={() => setComponenteFiltro('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                componenteFiltro === 'todos'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              Todos los 10 Indicadores
            </button>

            <button
              onClick={() => setComponenteFiltro('trabajo_cotidiano')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                componenteFiltro === 'trabajo_cotidiano'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'
              }`}
            >
              <span>🛠️ Trabajo Cotidiano</span>
            </button>

            <button
              onClick={() => setComponenteFiltro('proyecto')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                componenteFiltro === 'proyecto'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
              }`}
            >
              <span>🚀 Proyecto Semestral</span>
            </button>

            <button
              onClick={() => setComponenteFiltro('tareas')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                componenteFiltro === 'tareas'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <span>📝 Tareas Cortas</span>
            </button>
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por indicador, saber o archivo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800"
            />
          </div>
        </div>

        {/* Filtro Secundario por Eje Transversal */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-zinc-100 text-[11px]">
          <span className="font-bold text-zinc-400 uppercase tracking-wider mr-1">Eje Transversal:</span>
          <button
            onClick={() => setEjeFiltro('todos')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${
              ejeFiltro === 'todos' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setEjeFiltro('pensamiento_computacional')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 ${
              ejeFiltro === 'pensamiento_computacional' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 border border-blue-200/60'
            }`}
          >
            <span>💻</span> Pensamiento Computacional
          </button>
          <button
            onClick={() => setEjeFiltro('ciudadania_etica_digital')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 ${
              ejeFiltro === 'ciudadania_etica_digital' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800 border border-purple-200/60'
            }`}
          >
            <span>🛡️</span> Ciudadanía y Ética Digital
          </button>
          <button
            onClick={() => setEjeFiltro('emprendimiento_innovacion')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 ${
              ejeFiltro === 'emprendimiento_innovacion' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200/60'
            }`}
          >
            <span>🚀</span> Emprendimiento e Innovación
          </button>
        </div>
      </div>

      {/* Listado de Indicadores y Evidencias por Saber */}
      <div className="space-y-5">
        {saberesFiltrados.length === 0 ? (
          <div className="bg-white border border-dashed border-zinc-200 rounded-3xl p-12 text-center text-zinc-500">
            <FolderOpen className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <p className="font-bold text-sm text-zinc-700">No se encontraron indicadores con los filtros seleccionados.</p>
            <p className="text-xs text-zinc-400 mt-1">Pruebe ajustando el componente de evaluación o el término de búsqueda.</p>
          </div>
        ) : (
          saberesFiltrados.map(({ saber, area, componentes, instrumentoSugerido, archivos: archivosSaber }) => {
            const tieneCotidiano = componentes.includes('trabajo_cotidiano');
            const tieneProyecto = componentes.includes('proyecto');
            const tieneTareas = componentes.includes('tareas');

            return (
              <div
                key={saber.id}
                className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-6 shadow-sm hover:border-zinc-300 transition-all space-y-4"
              >
                {/* Header del Saber e Indicador Oficial */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-sky-100 text-sky-800">
                        {area.nombre}
                      </span>

                      {/* Badges de Componentes de Evaluación Enlazados */}
                      {tieneCotidiano && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                          <span>🛠️</span> Trabajo Cotidiano (45-50%)
                        </span>
                      )}
                      {tieneProyecto && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <span>🚀</span> Proyecto Semestral (30-40%)
                        </span>
                      )}
                      {tieneTareas && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <span>📝</span> Tareas Cortas (10%)
                        </span>
                      )}

                      {/* Ejes Transversales */}
                      {(MAPEO_EJES_POR_SABER[saber.id] || []).map((ejeId) => {
                        const cfg = EJES_TRANSVERSALES_OFICIALES[ejeId];
                        if (!cfg) return null;
                        return (
                          <span
                            key={ejeId}
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold border flex items-center gap-1 ${cfg.bgLight}`}
                            title={cfg.nombre}
                          >
                            <span>{ejeId === 'pensamiento_computacional' ? '💻' : ejeId === 'ciudadania_etica_digital' ? '🛡️' : '🚀'}</span>
                            <span>{cfg.nombreCorto}</span>
                          </span>
                        );
                      })}
                    </div>

                    <h3 className="text-base font-extrabold text-zinc-900">
                      {saber.nombre}
                    </h3>

                    {/* Indicador de Logro Oficial */}
                    <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-3.5 text-xs text-zinc-800 leading-relaxed">
                      <strong className="text-zinc-900 block font-bold text-[11px] uppercase tracking-wider text-sky-800 mb-1">
                        🎯 Indicador de Logro Oficial (MEP 2026):
                      </strong>
                      "{saber.indicador}"
                    </div>
                  </div>

                  {/* Acciones de Apoyo y Subida */}
                  <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                    <button
                      onClick={() =>
                        handleAbrirModalSubida(
                          saber.id,
                          saber.nombre,
                          saber.indicador,
                          tieneProyecto ? 'proyecto' : tieneTareas ? 'tareas' : 'trabajo_cotidiano'
                        )
                      }
                      className="px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
                    >
                      <UploadCloud className="w-4 h-4 text-sky-200" />
                      <span>Subir Archivo / Evidencia</span>
                    </button>

                    <button
                      onClick={() =>
                        setRecursoApoyoModalData({
                          saberId: saber.id,
                          saberNombre: saber.nombre,
                          indicador: saber.indicador,
                          areaNombre: area.nombre,
                          moduloId: 1
                        })
                      }
                      className="px-3 py-2 border border-purple-200 hover:bg-purple-50 text-purple-700 rounded-2xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
                      title="Ver Recurso Pedagógico de Apoyo en 4 Pilares"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Recurso Apoyo IA</span>
                    </button>
                  </div>
                </div>

                {/* Instrumento Oficial Sugerido */}
                <div className="flex items-center space-x-2 text-xs text-zinc-600 pt-1">
                  <span className="font-bold text-zinc-700">Instrumento Evaluativo Oficial:</span>
                  <span className="px-2.5 py-1 bg-zinc-100 text-zinc-800 font-semibold rounded-xl text-[11px] border border-zinc-200">
                    📋 {instrumentoSugerido}
                  </span>
                </div>

                {/* Repositorio de Archivos y Evidencias Almacenadas en la Base de Datos */}
                <div className="pt-3 border-t border-zinc-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FolderOpen className="w-3.5 h-3.5 text-zinc-400" /> Archivos Almacenados en Base de Datos ({archivosSaber.length}):
                    </span>
                  </div>

                  {archivosSaber.length === 0 ? (
                    <div className="p-4 bg-zinc-50/60 border border-dashed border-zinc-200 rounded-2xl text-center text-xs text-zinc-400">
                      No hay archivos subidos para este indicador todavía. Haga clic en <strong>"Subir Archivo / Evidencia"</strong> para almacenar guías, rúbricas o evidencias estudiantiles.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {archivosSaber.map((archivo) => (
                        <div
                          key={archivo.id}
                          className="bg-zinc-50 hover:bg-white border border-zinc-200 hover:border-zinc-300 rounded-2xl p-3 shadow-2xs transition-all space-y-2 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="flex items-center space-x-2 min-w-0">
                                <div className="p-1.5 bg-white rounded-lg border border-zinc-200 shrink-0">
                                  {getIconoArchivo(archivo.nombreArchivo, archivo.tipoMime)}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-xs text-zinc-900 truncate" title={archivo.nombreArchivo}>
                                    {archivo.nombreArchivo}
                                  </h4>
                                  <div className="text-[10px] text-zinc-400 font-medium">
                                    {archivo.tamanoFormateado} • {new Date(archivo.fechaSubida).toLocaleDateString('es-CR')}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Categoría y Componente */}
                            <div className="flex flex-wrap items-center gap-1 mt-2">
                              {getEtiquetaCategoria(archivo.categoriaRecurso)}
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-zinc-200 text-zinc-700">
                                {archivo.componenteAsociado === 'trabajo_cotidiano' ? 'Cotidiano' : archivo.componenteAsociado === 'proyecto' ? 'Proyecto' : 'Tareas'}
                              </span>
                            </div>

                            {archivo.descripcionOpcional && (
                              <p className="text-[11px] text-zinc-600 mt-1.5 italic line-clamp-2">
                                "{archivo.descripcionOpcional}"
                              </p>
                            )}
                          </div>

                          {/* Botonera Descargar y Eliminar */}
                          <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                            <button
                              onClick={() => descargarArchivoEvidencia(archivo)}
                              className="px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-lg text-[10px] font-bold text-zinc-800 flex items-center space-x-1 shadow-2xs transition-colors"
                              title="Descargar archivo a su computadora"
                            >
                              <Download className="w-3 h-3 text-zinc-600" />
                              <span>Descargar</span>
                            </button>

                            <button
                              onClick={() => handleEliminarArchivo(archivo.id, archivo.nombreArchivo)}
                              className="p-1 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                              title="Eliminar de la base de datos"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL DE SUBIDA DE ARCHIVO Y ALMACENAMIENTO EN BASE DE DATOS */}
      {modalSubidaAbierto && saberSeleccionadoParaSubir && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-2xl shadow-xs">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-zinc-900">
                    Almacenar Archivo en Base de Datos Local
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Saber: {saberSeleccionadoParaSubir.nombre}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalSubidaAbierto(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGuardarArchivo} className="p-6 space-y-4 text-xs">
              {/* Indicador de Referencia */}
              <div className="bg-sky-50/60 border border-sky-100 p-3 rounded-2xl text-zinc-700">
                <strong className="text-sky-900 block font-bold text-[10px] uppercase tracking-wider mb-0.5">
                  Indicador de Logro Asociado:
                </strong>
                {saberSeleccionadoParaSubir.indicador}
              </div>

              {/* Selector de Archivo Físico */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Seleccione el Archivo del Dispositivo:
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full text-xs text-zinc-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-zinc-900 file:text-white hover:file:bg-zinc-800 cursor-pointer bg-zinc-50 border border-zinc-200 rounded-2xl p-2"
                />
                {archivoSeleccionado && (
                  <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{archivoSeleccionado.name} ({formatearTamanoBytes(archivoSeleccionado.size)})</span>
                  </div>
                )}
              </div>

              {/* Componente de Evaluación al que pertenece */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    Componente de Evaluación:
                  </label>
                  <select
                    value={saberSeleccionadoParaSubir.componente}
                    onChange={(e) =>
                      setSaberSeleccionadoParaSubir({
                        ...saberSeleccionadoParaSubir,
                        componente: e.target.value as ComponenteEvaluacionTipo
                      })
                    }
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  >
                    <option value="trabajo_cotidiano">🛠️ Trabajo Cotidiano (45-50%)</option>
                    <option value="proyecto">🚀 Proyecto Semestral (30-40%)</option>
                    <option value="tareas">📝 Tareas Cortas (10%)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-zinc-700 mb-1">
                    Tipo / Categoría de Recurso:
                  </label>
                  <select
                    value={categoriaArchivo}
                    onChange={(e) => setCategoriaArchivo(e.target.value as any)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                  >
                    <option value="instrumento_evaluacion">📋 Instrumento / Rúbrica</option>
                    <option value="guia_didactica">📖 Guía Didáctica / Ficha de Trabajo</option>
                    <option value="evidencia_estudiante">🎓 Evidencia Estudiantil</option>
                    <option value="codigo_fuente">💻 Código Fuente / Proyecto Simulador</option>
                    <option value="otro">📁 Otro Documento</option>
                  </select>
                </div>
              </div>

              {/* Descripción o Nota Opcional */}
              <div>
                <label className="block font-bold text-zinc-700 mb-1">
                  Descripción o Notas del Documento (Opcional):
                </label>
                <input
                  type="text"
                  value={descripcionArchivo}
                  onChange={(e) => setDescripcionArchivo(e.target.value)}
                  placeholder="Ej: Rúbrica analítica aplicada en la semana 4 para el sensor de temperatura."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-xs text-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-900"
                />
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalSubidaAbierto(false)}
                  className="px-4 py-2 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={subiendo || !archivoSeleccionado}
                  className="px-5 py-2 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{subiendo ? 'Guardando...' : 'Almacenar en Base de Datos'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL RECURSO PEDAGÓGICO DE APOYO (4 PILARES) */}
      {recursoApoyoModalData && (
        <RecursoApoyoModal
          saberId={recursoApoyoModalData.saberId}
          saberNombre={recursoApoyoModalData.saberNombre}
          indicador={recursoApoyoModalData.indicador}
          areaNombre={recursoApoyoModalData.areaNombre}
          moduloId={recursoApoyoModalData.moduloId}
          onClose={() => setRecursoApoyoModalData(null)}
        />
      )}
    </div>
  );
};
