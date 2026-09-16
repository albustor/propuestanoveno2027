'use client';

import React, { useState, useEffect } from 'react';
import { EQUIPO_NOVENO_INFO } from '../../data/sistematizacionData';
import { 
  getAllReunionesLocal, 
  saveReunionLocal, 
  deleteReunionLocal, 
  toggleAcuerdoReunionLocal 
} from '../../lib/storage';
import { 
  getHistorialTelemetria, 
  registrarEventoTelemetria, 
  limpiarHistorialTelemetria, 
  exportarTelemetriaMarkdown, 
  exportarTelemetriaJSON 
} from '../../lib/telemetry';
import { processAICascade } from '../../lib/ai-service';
import { 
  ReunionEquipoNivel, 
  TipoReunion, 
  AcuerdoReunion, 
  EventoTelemetria, 
  ModuloTelemetria 
} from '../../types';
import { 
  Users, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Activity, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Search, 
  X, 
  UserCheck, 
  Briefcase, 
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export const SistematizacionEquipoView: React.FC = () => {
  const [subTab, setSubTab] = useState<'reuniones' | 'trabajo_allan' | 'cronograma' | 'telemetria'>('trabajo_allan');
  const [reuniones, setReuniones] = useState<ReunionEquipoNivel[]>([]);
  const [telemetria, setTelemetria] = useState<EventoTelemetria[]>([]);
  const [filtroModuloTelemetria, setFiltroModuloTelemetria] = useState<string>('TODOS');
  const [busqueda, setBusqueda] = useState<string>('');

  // Modales
  const [modalReunionAbierto, setModalReunionAbierto] = useState<boolean>(false);
  const [reunionEditando, setReunionEditando] = useState<ReunionEquipoNivel | null>(null);
  const [modalIAAbierto, setModalIAAbierto] = useState<boolean>(false);
  const [cargandoIA, setCargandoIA] = useState<boolean>(false);
  const [sintesisIAGenerada, setSintesisIAGenerada] = useState<string>('');

  // Notificación
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);
  const [copiado, setCopiado] = useState<boolean>(false);

  useEffect(() => {
    cargarDatos();

    // Listener para telemetría en tiempo real
    const handleTelemetriaActualizada = () => {
      setTelemetria(getHistorialTelemetria());
    };

    window.addEventListener('telemetria_actualizada', handleTelemetriaActualizada);
    return () => {
      window.removeEventListener('telemetria_actualizada', handleTelemetriaActualizada);
    };
  }, []);

  const cargarDatos = () => {
    setReuniones(getAllReunionesLocal());
    setTelemetria(getHistorialTelemetria());
  };

  const notificar = (msg: string) => {
    setMensajeExito(msg);
    setTimeout(() => setMensajeExito(null), 2500);
  };

  // Filtrado de reuniones
  const reunionesFiltradas = reuniones.filter((r) => {
    if (subTab === 'trabajo_allan') {
      if (r.tipo !== 'trabajo_allan') return false;
    } else if (subTab === 'reuniones') {
      if (r.tipo === 'trabajo_allan') return false;
    }

    if (busqueda.trim() !== '') {
      const q = busqueda.toLowerCase();
      const coincide = 
        r.titulo.toLowerCase().includes(q) ||
        r.temasTratados.toLowerCase().includes(q) ||
        r.participantes.some((p) => p.toLowerCase().includes(q));
      if (!coincide) return false;
    }
    return true;
  });

  // Filtrado de telemetría
  const telemetriaFiltrada = telemetria.filter((t) => {
    if (filtroModuloTelemetria !== 'TODOS' && t.modulo !== filtroModuloTelemetria) {
      return false;
    }
    return true;
  });

  // Manejo de acuerdos (Toggle checkbox)
  const handleToggleAcuerdo = (reunionId: string, acuerdoId: string) => {
    const updated = toggleAcuerdoReunionLocal(reunionId, acuerdoId);
    setReuniones([...updated]);
    notificar('Estado del acuerdo actualizado');
  };

  // Eliminar reunión
  const handleEliminarReunion = (id: string) => {
    if (confirm('¿Desea eliminar este registro de reunión/sesión?')) {
      const updated = deleteReunionLocal(id);
      setReuniones([...updated]);
      notificar('Registro eliminado');
    }
  };

  // Guardar reunión desde modal
  const handleGuardarReunion = (reunion: ReunionEquipoNivel) => {
    const updated = saveReunionLocal(reunion);
    setReuniones([...updated]);
    setModalReunionAbierto(false);
    setReunionEditando(null);
    notificar('Reunión guardada exitosamente');
  };

  // Generar Síntesis IA de la sesión
  const handleGenerarSintesisIA = async (tema: string = 'Jornada de Trabajo Curricular con Allan') => {
    setModalIAAbierto(true);
    setCargandoIA(true);
    try {
      const res = await processAICascade({
        prompt: `Genera un acta ejecutiva y síntesis de acuerdos para la reunión de diseño curricular de 9° año: "${tema}", con el equipo conformado por Alberto Bustos Ortega y Allan M., coordinado por Kevin Sánchez Bogarín.`,
        tipo: 'sintesis_reunion_acuerdos_ia',
        contexto: {
          tema
        }
      });
      setSintesisIAGenerada(res.content);
    } catch (e) {
      setSintesisIAGenerada('Error al generar la síntesis de la reunión.');
    } finally {
      setCargandoIA(false);
    }
  };

  // Exportar todas las reuniones a Markdown
  const handleExportarReunionesMD = () => {
    let md = `# Actas y Registro de Reuniones de Nivel y Co-trabajo (9° Año MEP)\n\n`;
    md += `*Fecha de exportación:* ${new Date().toLocaleDateString('es-CR')}\n\n`;

    reuniones.forEach((r, idx) => {
      md += `## ${idx + 1}. [${r.tipo.toUpperCase()}] ${r.titulo}\n`;
      md += `- **Fecha:** ${r.fecha} | **Hora:** ${r.hora}\n`;
      md += `- **Participantes:** ${r.participantes.join(', ')}\n`;
      md += `- **Temas Tratados:** ${r.temasTratados}\n`;
      if (r.avancesConAllan) {
        md += `- **Avances con Allan:** ${r.avancesConAllan}\n`;
      }
      md += `- **Acuerdos:**\n`;
      r.acuerdos.forEach((a) => {
        md += `  - [${a.completado ? 'x' : ' '}] ${a.acuerdo} *(Resp: ${a.responsable}${a.fechaLimite ? ` | Límite: ${a.fechaLimite}` : ''})*\n`;
      });
      md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Actas_Reuniones_Noveno_MEP_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
    notificar('Actas exportadas a Markdown');
  };

  // Exportar Telemetría
  const handleDescargarTelemetria = () => {
    const md = exportarTelemetriaMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Telemetria_Auditoria_Noveno_MEP_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
    notificar('Telemetría descargada');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Encabezado Principal */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-purple-50 border border-purple-200/60 text-purple-700 rounded-lg text-xs font-semibold tracking-wide uppercase">
                Sistematización y Co-Docencia MEP 2026
              </span>
              {mensajeExito && (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-medium animate-pulse flex items-center gap-1">
                  <Check className="w-3 h-3" /> {mensajeExito}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-2 tracking-tight">
              Sistematización, Reuniones y Co-Trabajo con Allan
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-3xl">
              Registro centralizado de acuerdos de coordinación, reuniones de equipo de nivel (9°), avances diarios con el compañero Allan M. y telemetría de auditoría en vivo.
            </p>
          </div>

          {/* Acciones Rápidas */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setReunionEditando({
                  id: `reunion-${Date.now()}`,
                  tipo: 'trabajo_allan',
                  titulo: `Jornada de Diseño Curricular con Allan (${new Date().toLocaleDateString('es-CR')})`,
                  fecha: new Date().toISOString().split('T')[0],
                  hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                  participantes: ['Alberto Bustos Ortega', 'Allan M.'],
                  temasTratados: '',
                  acuerdos: [],
                  avancesConAllan: '',
                  estado: 'En Proceso',
                  timestamp: new Date().toISOString()
                });
                setModalReunionAbierto(true);
              }}
              className="px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center space-x-1.5 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>+ Sesión con Allan</span>
            </button>

            <button
              onClick={() => {
                setReunionEditando({
                  id: `reunion-${Date.now()}`,
                  tipo: 'coordinacion',
                  titulo: `Reunión de Coordinación Curricular`,
                  fecha: new Date().toISOString().split('T')[0],
                  hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                  participantes: ['Kevin Sánchez Bogarín', 'Alberto Bustos Ortega', 'Allan M.'],
                  temasTratados: '',
                  acuerdos: [],
                  estado: 'En Proceso',
                  timestamp: new Date().toISOString()
                });
                setModalReunionAbierto(true);
              }}
              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Reunión</span>
            </button>

            <button
              onClick={() => handleGenerarSintesisIA()}
              className="px-3 py-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors"
              title="Generar síntesis o acta ejecutiva con IA"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Síntesis IA</span>
            </button>

            <button
              onClick={handleExportarReunionesMD}
              className="p-2 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-xl text-xs transition-colors"
              title="Exportar Actas a Markdown"
            >
              <Download className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          </div>
        </div>

        {/* Sub-navegación minimalista */}
        <div className="flex items-center space-x-2 mt-6 pt-5 border-t border-zinc-100 overflow-x-auto">
          <button
            onClick={() => setSubTab('trabajo_allan')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              subTab === 'trabajo_allan'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>🤝 Jornada de Trabajo con Allan</span>
            <span className="ml-1 px-1.5 py-0.2 bg-white/20 text-white rounded text-[10px]">
              {reuniones.filter((r) => r.tipo === 'trabajo_allan').length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('reuniones')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              subTab === 'reuniones'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>📌 Coordinación y Equipos de Nivel</span>
            <span className="ml-1 px-1.5 py-0.2 bg-white/20 text-white rounded text-[10px]">
              {reuniones.filter((r) => r.tipo !== 'trabajo_allan').length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('cronograma')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              subTab === 'cronograma'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>👥 Equipo & Cortes Valorativos</span>
          </button>

          <button
            onClick={() => setSubTab('telemetria')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
              subTab === 'telemetria'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>📡 Telemetría en Vivo</span>
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-700/80 text-white rounded text-[10px]">
              {telemetria.length}
            </span>
          </button>
        </div>
      </div>

      {/* SECCIÓN 1: JORNADA DE TRABAJO CON ALLAN */}
      {subTab === 'trabajo_allan' && (
        <div className="space-y-4">
          <div className="bg-purple-50/70 border border-purple-200/60 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
                🤝
              </div>
              <div>
                <h3 className="text-sm font-bold text-purple-950">
                  Espacio Exclusivo de Co-Docencia y Planificación: Alberto Bustos & Allan M.
                </h3>
                <p className="text-xs text-purple-800/80">
                  Bitácora de avances diarios, diseño de recursos para 9° año y seguimiento de compromisos conjuntos.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setReunionEditando({
                  id: `reunion-${Date.now()}`,
                  tipo: 'trabajo_allan',
                  titulo: `Avances de la Sesión con Allan (${new Date().toLocaleDateString('es-CR')})`,
                  fecha: new Date().toISOString().split('T')[0],
                  hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                  participantes: ['Alberto Bustos Ortega', 'Allan M.'],
                  temasTratados: '',
                  acuerdos: [],
                  avancesConAllan: '',
                  estado: 'En Proceso',
                  timestamp: new Date().toISOString()
                });
                setModalReunionAbierto(true);
              }}
              className="px-3.5 py-1.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-semibold shrink-0 transition-colors"
            >
              + Registrar Sesión de Hoy
            </button>
          </div>

          {reunionesFiltradas.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-zinc-200 rounded-2xl">
              <p className="text-xs text-zinc-500">No hay sesiones de trabajo registradas con Allan.</p>
              <button
                onClick={() => setModalReunionAbierto(true)}
                className="mt-2 text-xs font-bold text-purple-600 hover:text-purple-700"
              >
                + Registrar primera sesión
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reunionesFiltradas.map((r) => (
                <div key={r.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-[10px] font-bold uppercase tracking-wider">
                          Co-Trabajo con Allan
                        </span>
                        <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-400" /> {r.fecha}
                        </span>
                        <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" /> {r.hora}
                        </span>
                        <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                          r.estado === 'Completado' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-sky-50 text-sky-700 border border-sky-200'
                        }`}>
                          {r.estado}
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-zinc-900 mt-2">{r.titulo}</h2>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        <strong>Participantes:</strong> {r.participantes.join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => {
                          setReunionEditando(r);
                          setModalReunionAbierto(true);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors"
                        title="Editar"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEliminarReunion(r.id)}
                        className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Avances con Allan */}
                  {r.avancesConAllan && (
                    <div className="mt-3.5 p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-xs">
                      <span className="font-bold text-purple-900">🌟 Avances y Logros del Día con Allan:</span>
                      <p className="text-zinc-700 mt-1 leading-relaxed">{r.avancesConAllan}</p>
                    </div>
                  )}

                  {/* Temas Tratados */}
                  <div className="mt-3 text-xs text-zinc-700 leading-relaxed">
                    <span className="font-semibold text-zinc-900">Temas y Discusión:</span> {r.temasTratados}
                  </div>

                  {/* Lista de Acuerdos y Checkbox */}
                  {r.acuerdos.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-zinc-100">
                      <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Acuerdos y Compromisos ({r.acuerdos.filter((a) => a.completado).length}/{r.acuerdos.length} cumplidos):
                      </h4>
                      <div className="space-y-1.5">
                        {r.acuerdos.map((ac) => (
                          <div 
                            key={ac.id}
                            onClick={() => handleToggleAcuerdo(r.id, ac.id)}
                            className={`flex items-start space-x-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                              ac.completado ? 'bg-zinc-50 text-zinc-500' : 'bg-white border border-zinc-200/70 hover:border-purple-300 text-zinc-900'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={ac.completado}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-purple-600 focus:ring-0"
                            />
                            <div className="text-xs flex-1">
                              <span className={ac.completado ? 'line-through text-zinc-400' : 'font-medium'}>
                                {ac.acuerdo}
                              </span>
                              <span className="text-[11px] text-zinc-400 ml-2">
                                (Resp: <strong>{ac.responsable}</strong>{ac.fechaLimite ? ` • Límite: ${ac.fechaLimite}` : ''})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECCIÓN 2: REUNIONES DE COORDINACIÓN Y EQUIPOS DE NIVEL */}
      {subTab === 'reuniones' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-zinc-700" />
              Reuniones de Coordinación, Asesoría y Nivel
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Buscar por tema o persona..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 w-52"
              />
            </div>
          </div>

          {reunionesFiltradas.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-zinc-200 rounded-2xl">
              <p className="text-xs text-zinc-500">No hay reuniones registradas con los filtros actuales.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reunionesFiltradas.map((r) => (
                <div key={r.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:border-zinc-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          r.tipo === 'coordinacion'
                            ? 'bg-blue-100 text-blue-800'
                            : r.tipo === 'corte_valorativo'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-100 text-zinc-800'
                        }`}>
                          {r.tipo.replace(/_/g, ' ')}
                        </span>
                        <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-400" /> {r.fecha}
                        </span>
                        <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-zinc-400" /> {r.hora}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 mt-2">{r.titulo}</h3>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        <strong>Participantes:</strong> {r.participantes.join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => {
                          setReunionEditando(r);
                          setModalReunionAbierto(true);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEliminarReunion(r.id)}
                        className="p-1.5 text-zinc-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-zinc-700 leading-relaxed">
                    <span className="font-semibold text-zinc-900">Temas Abordados:</span> {r.temasTratados}
                  </div>

                  {r.acuerdos.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-zinc-100">
                      <h4 className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
                        Acuerdos ({r.acuerdos.filter((a) => a.completado).length}/{r.acuerdos.length} completados):
                      </h4>
                      <div className="space-y-1.5">
                        {r.acuerdos.map((ac) => (
                          <div 
                            key={ac.id}
                            onClick={() => handleToggleAcuerdo(r.id, ac.id)}
                            className={`flex items-start space-x-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                              ac.completado ? 'bg-zinc-50 text-zinc-500' : 'bg-white border border-zinc-200/70 hover:border-zinc-300 text-zinc-900'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={ac.completado}
                              onChange={() => {}}
                              className="mt-0.5 rounded text-indigo-600 focus:ring-0"
                            />
                            <div className="text-xs flex-1">
                              <span className={ac.completado ? 'line-through text-zinc-400' : 'font-medium'}>
                                {ac.acuerdo}
                              </span>
                              <span className="text-[11px] text-zinc-400 ml-2">
                                (Resp: <strong>{ac.responsable}</strong>{ac.fechaLimite ? ` • Límite: ${ac.fechaLimite}` : ''})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECCIÓN 3: EQUIPO Y CRONOGRAMA OFICIAL MEP */}
      {subTab === 'cronograma' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Coordinación Curricular</span>
                  <h3 className="text-base font-bold text-zinc-900">{EQUIPO_NOVENO_INFO.coordinador}</h3>
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Orienta y acompaña el proceso de diseño curricular, asegurando la articulación entre el macro y microcurrículo de Formación Tecnológica y la validación en los cortes valorativos.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Equipo Diseñador (9° Año)</span>
                  <h3 className="text-base font-bold text-zinc-900">{EQUIPO_NOVENO_INFO.disenadores.join(' & ')}</h3>
                </div>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Diseñan las estrategias metodológicas completas en sus tres momentos didácticos, la vinculación con el proyecto semestral por etapas, pautas DUA y el banco de recursos WebApps.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider flex items-center">
                <Calendar className="w-4 h-4 mr-1.5 text-purple-600" />
                Cronograma Oficial de Entregas y Cortes Valorativos
              </h2>
              <span className="text-xs text-zinc-500 font-medium">Setiembre - Diciembre 2026</span>
            </div>

            <div className="divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
              {EQUIPO_NOVENO_INFO.cronograma.map((item, idx) => (
                <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50/60 transition-colors">
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-zinc-900">{item.actividad}</div>
                    <div className="text-[11px] text-zinc-500">
                      <strong>Responsables:</strong> {item.responsables}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0 self-start sm:self-auto">
                    <span className="text-xs font-medium text-zinc-600 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-zinc-400" />
                      {item.fecha}
                    </span>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.estado === 'Completado'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.estado === 'En Proceso'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {item.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 4: TELEMETRÍA Y AUDITORÍA EN VIVO */}
      {subTab === 'telemetria' && (
        <div className="space-y-4">
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  Registro de Telemetría y Auditoría de Acciones
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Trazabilidad en tiempo real de notas de indicadores, acuerdos de reuniones, ejecuciones de IA y cambios en la matriz de evaluación.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filtroModuloTelemetria}
                  onChange={(e) => setFiltroModuloTelemetria(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                >
                  <option value="TODOS">Todos los Módulos</option>
                  <option value="REUNIONES_ALLAN">Reuniones y Allan</option>
                  <option value="EVALUACION">Evaluación y Correlación</option>
                  <option value="NOTAS_INDICADOR">Notas de Indicadores</option>
                  <option value="IA_ENGINE">Inferencia IA</option>
                  <option value="SISTEMA">Sistema</option>
                </select>

                <button
                  onClick={handleDescargarTelemetria}
                  className="px-3 py-1.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Descargar Log</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('¿Desea limpiar el registro histórico de telemetría?')) {
                      limpiarHistorialTelemetria();
                      setTelemetria([]);
                      notificar('Historial de telemetría reiniciado');
                    }
                  }}
                  className="p-1.5 border border-zinc-200 hover:bg-zinc-50 text-zinc-400 hover:text-rose-600 rounded-xl transition-colors"
                  title="Limpiar telemetría"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Feed de Eventos */}
            <div className="mt-4 divide-y divide-zinc-100 max-h-[550px] overflow-y-auto">
              {telemetriaFiltrada.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-400">
                  No hay eventos de telemetría registrados aún.
                </div>
              ) : (
                telemetriaFiltrada.map((ev) => (
                  <div key={ev.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-zinc-50/80 px-2 rounded-lg transition-colors text-xs">
                    <div className="flex items-start space-x-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        ev.modulo === 'REUNIONES_ALLAN'
                          ? 'bg-purple-100 text-purple-800'
                          : ev.modulo === 'EVALUACION'
                          ? 'bg-blue-100 text-blue-800'
                          : ev.modulo === 'IA_ENGINE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-zinc-100 text-zinc-700'
                      }`}>
                        {ev.modulo}
                      </span>
                      <div>
                        <div className="font-semibold text-zinc-900 leading-tight">
                          {ev.descripcion}
                        </div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Acción: <code className="text-zinc-600 bg-zinc-100 px-1 py-0.2 rounded font-mono">{ev.accion}</code> • Usuario: {ev.usuario}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-zinc-400 shrink-0 self-end sm:self-auto">
                      {ev.fechaHoraLegible}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CREAR / EDITAR REUNIÓN */}
      {modalReunionAbierto && reunionEditando && (
        <ModalReunionForm
          reunion={reunionEditando}
          onGuardar={handleGuardarReunion}
          onCerrar={() => {
            setModalReunionAbierto(false);
            setReunionEditando(null);
          }}
        />
      )}

      {/* MODAL SÍNTESIS IA */}
      {modalIAAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-zinc-900">
                    Acta Ejecutiva y Síntesis de Acuerdos (IA)
                  </h3>
                  <p className="text-[11px] text-zinc-500">
                    Consolidado de acuerdos y avances para el equipo de diseño curricular.
                  </p>
                </div>
              </div>
              <button onClick={() => setModalIAAbierto(false)} className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs text-zinc-800 leading-relaxed font-sans">
              {cargandoIA ? (
                <div className="py-12 text-center text-zinc-500 space-y-3">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto" />
                  <p className="font-medium">Sintetizando la sesión y acuerdos con el compañero Allan y Coordinación...</p>
                </div>
              ) : (
                <div className="prose prose-xs max-w-none text-zinc-800 whitespace-pre-line font-mono bg-zinc-50 p-4 rounded-xl border border-zinc-200/80">
                  {sintesisIAGenerada}
                </div>
              )}
            </div>

            <div className="px-6 py-3.5 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">PÍA Asistente Curricular MEP</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sintesisIAGenerada);
                    notificar('Copiado al portapapeles');
                  }}
                  className="px-3 py-1.5 border border-zinc-200 hover:bg-white text-zinc-700 rounded-xl text-xs font-medium"
                >
                  Copiar Acta
                </button>
                <button
                  onClick={() => setModalIAAbierto(false)}
                  className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponente Formulario de Reunión
interface ModalReunionFormProps {
  reunion: ReunionEquipoNivel;
  onGuardar: (reunion: ReunionEquipoNivel) => void;
  onCerrar: () => void;
}

const ModalReunionForm: React.FC<ModalReunionFormProps> = ({ reunion, onGuardar, onCerrar }) => {
  const [tipo, setTipo] = useState<TipoReunion>(reunion.tipo);
  const [titulo, setTitulo] = useState<string>(reunion.titulo);
  const [fecha, setFecha] = useState<string>(reunion.fecha);
  const [hora, setHora] = useState<string>(reunion.hora);
  const [participantesTexto, setParticipantesTexto] = useState<string>(reunion.participantes.join(', '));
  const [temasTratados, setTemasTratados] = useState<string>(reunion.temasTratados);
  const [avancesConAllan, setAvancesConAllan] = useState<string>(reunion.avancesConAllan || '');
  const [estado, setEstado] = useState<'Completado' | 'En Proceso' | 'Pendiente'>(reunion.estado);
  const [acuerdos, setAcuerdos] = useState<AcuerdoReunion[]>(reunion.acuerdos);

  // Nuevo acuerdo temporal
  const [nuevoAcuerdoTexto, setNuevoAcuerdoTexto] = useState<string>('');
  const [nuevoResponsable, setNuevoResponsable] = useState<string>('Alberto & Allan');

  const handleAgregarAcuerdo = () => {
    if (!nuevoAcuerdoTexto.trim()) return;
    const nuevo: AcuerdoReunion = {
      id: `ac-${Date.now()}`,
      acuerdo: nuevoAcuerdoTexto.trim(),
      responsable: nuevoResponsable || 'Equipo Diseñador',
      completado: false
    };
    setAcuerdos([...acuerdos, nuevo]);
    setNuevoAcuerdoTexto('');
  };

  const handleEliminarAcuerdo = (id: string) => {
    setAcuerdos(acuerdos.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      alert('Ingrese un título para la reunión');
      return;
    }

    const participantes = participantesTexto
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const guardada: ReunionEquipoNivel = {
      ...reunion,
      tipo,
      titulo,
      fecha,
      hora,
      participantes: participantes.length > 0 ? participantes : ['Alberto Bustos Ortega', 'Allan M.'],
      temasTratados,
      avancesConAllan: tipo === 'trabajo_allan' ? avancesConAllan : undefined,
      estado,
      acuerdos,
      timestamp: new Date().toISOString()
    };

    onGuardar(guardada);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-zinc-900">
              {tipo === 'trabajo_allan' ? 'Registro de Sesión de Trabajo con Allan' : 'Registro de Reunión de Coordinación / Nivel'}
            </h3>
          </div>
          <button onClick={onCerrar} className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Tipo de Encuentro:</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as any)}
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="trabajo_allan">🤝 Jornada con Allan M.</option>
                <option value="coordinacion">📌 Coordinación con Kevin Sánchez</option>
                <option value="equipo_nivel_9">👥 Reunión de Nivel (9° Año)</option>
                <option value="corte_valorativo">⚖️ Corte Valorativo</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Estado:</label>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value as any)}
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="En Proceso">En Proceso</option>
                <option value="Completado">Completado</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Título de la Sesión / Encuentro:</label>
            <input
              type="text"
              required
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Revisión y ajustes de los saberes de Robótica con Allan"
              className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Fecha:</label>
              <input
                type="date"
                required
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Hora:</label>
              <input
                type="text"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                placeholder="08:00 am"
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Participantes (separados por coma):</label>
            <input
              type="text"
              value={participantesTexto}
              onChange={(e) => setParticipantesTexto(e.target.value)}
              placeholder="Alberto Bustos Ortega, Allan M., Kevin Sánchez"
              className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
            />
          </div>

          {tipo === 'trabajo_allan' && (
            <div>
              <label className="block font-semibold text-purple-900 mb-1">
                🌟 Avances y Logros Específicos del Día con Allan:
              </label>
              <textarea
                rows={2}
                value={avancesConAllan}
                onChange={(e) => setAvancesConAllan(e.target.value)}
                placeholder="¿Qué diseñamos hoy? (Ej: Se consolidaron las actividades de desarrollo de sensores y simulador Tinkercad)..."
                className="w-full border border-purple-200 bg-purple-50/30 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-700 resize-none"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-zinc-700 mb-1">Temas Tratados / Agenda:</label>
            <textarea
              rows={3}
              value={temasTratados}
              onChange={(e) => setTemasTratados(e.target.value)}
              placeholder="Detalle de los puntos revisados, observaciones y discusiones pedagógicas..."
              className="w-full border border-zinc-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none"
            />
          </div>

          {/* Gestión de Acuerdos */}
          <div className="pt-2 border-t border-zinc-100">
            <label className="block font-semibold text-zinc-700 mb-2">Acuerdos y Compromisos:</label>
            
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Escribir nuevo acuerdo..."
                value={nuevoAcuerdoTexto}
                onChange={(e) => setNuevoAcuerdoTexto(e.target.value)}
                className="flex-1 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <input
                type="text"
                placeholder="Responsable"
                value={nuevoResponsable}
                onChange={(e) => setNuevoResponsable(e.target.value)}
                className="w-32 border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <button
                type="button"
                onClick={handleAgregarAcuerdo}
                className="px-3 py-1.5 bg-zinc-800 text-white rounded-xl text-xs font-semibold hover:bg-zinc-900"
              >
                + Agregar
              </button>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {acuerdos.map((ac) => (
                <div key={ac.id} className="flex items-center justify-between p-2 bg-zinc-50 rounded-lg text-xs">
                  <div>
                    <span className="font-medium text-zinc-800">{ac.acuerdo}</span>
                    <span className="text-[11px] text-zinc-500 ml-2">({ac.responsable})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEliminarAcuerdo(ac.id)}
                    className="text-zinc-400 hover:text-rose-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
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
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold"
            >
              Guardar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
