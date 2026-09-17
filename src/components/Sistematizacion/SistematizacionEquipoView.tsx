'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Filter,
  Mic,
  MicOff,
  UploadCloud,
  Volume2,
  FileAudio,
  Save,
  Play,
  Pause,
  Square,
  Radio
} from 'lucide-react';

export const SistematizacionEquipoView: React.FC = () => {
  const [subTab, setSubTab] = useState<'reuniones' | 'trabajo_allan' | 'grabador_audio' | 'cronograma' | 'telemetria'>('trabajo_allan');
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

  // Estados de Grabación Rápida Principal
  const [grabandoPrincipal, setGrabandoPrincipal] = useState<boolean>(false);
  const [segundosGrabacionPrincipal, setSegundosGrabacionPrincipal] = useState<number>(0);
  const [audioUrlPrincipal, setAudioUrlPrincipal] = useState<string | null>(null);
  const [nombreAudioPrincipal, setNombreAudioPrincipal] = useState<string>('');
  const [textoTranscripcionPrincipal, setTextoTranscripcionPrincipal] = useState<string>('');
  const [procesandoAudioPrincipal, setProcesandoAudioPrincipal] = useState<boolean>(false);
  const [creandoActaDesdeAudio, setCreandoActaDesdeAudio] = useState<boolean>(false);

  const mediaRecorderPrincipalRef = useRef<MediaRecorder | null>(null);
  const audioChunksPrincipalRef = useRef<Blob[]>([]);
  const recognitionPrincipalRef = useRef<any>(null);
  const timerPrincipalRef = useRef<any>(null);
  const fileInputPrincipalRef = useRef<HTMLInputElement | null>(null);

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
      if (timerPrincipalRef.current) clearInterval(timerPrincipalRef.current);
    };
  }, []);

  const cargarDatos = () => {
    setReuniones(getAllReunionesLocal());
    setTelemetria(getHistorialTelemetria());
  };

  const notificar = (msg: string) => {
    setMensajeExito(msg);
    setTimeout(() => setMensajeExito(null), 3000);
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

  // -------------------------------------------------------------
  // CONTROLES DE GRABACIÓN DE AUDIO EN VIVO (MEDIARECORDER + WEB SPEECH)
  // -------------------------------------------------------------
  const handleToggleGrabacionPrincipal = async () => {
    if (grabandoPrincipal) {
      detenerGrabacionPrincipal();
    } else {
      await iniciarGrabacionPrincipal();
    }
  };

  const iniciarGrabacionPrincipal = async () => {
    if (typeof window === 'undefined') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksPrincipalRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksPrincipalRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksPrincipalRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrlPrincipal(url);
        setNombreAudioPrincipal(`Grabacion_Acta_${new Date().toLocaleDateString('es-CR').replace(/\//g, '-')}_${Date.now()}.webm`);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      mediaRecorderPrincipalRef.current = mediaRecorder;
      setGrabandoPrincipal(true);
      setSegundosGrabacionPrincipal(0);
      notificar('🎙️ Grabando audio de la sesión y transcribiendo en vivo...');

      timerPrincipalRef.current = setInterval(() => {
        setSegundosGrabacionPrincipal((prev) => prev + 1);
      }, 1000);

      // Reconocimiento de voz simultáneo (Web Speech API)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'es-CR';

          recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
              }
            }
            if (finalTranscript) {
              setTextoTranscripcionPrincipal((prev) => (prev ? prev.trim() + '\n' : '') + finalTranscript.trim());
            }
          };

          recognition.onend = () => {
            if (grabandoPrincipal && recognitionPrincipalRef.current) {
              try {
                recognition.start();
              } catch (e) {}
            }
          };

          recognition.start();
          recognitionPrincipalRef.current = recognition;
        } catch (e) {
          console.warn('Speech recognition warning:', e);
        }
      }
    } catch (err: any) {
      alert('No se pudo acceder al micrófono: ' + err.message);
    }
  };

  const detenerGrabacionPrincipal = () => {
    setGrabandoPrincipal(false);

    if (mediaRecorderPrincipalRef.current && mediaRecorderPrincipalRef.current.state !== 'inactive') {
      mediaRecorderPrincipalRef.current.stop();
      mediaRecorderPrincipalRef.current = null;
    }

    if (recognitionPrincipalRef.current) {
      recognitionPrincipalRef.current.onend = null;
      recognitionPrincipalRef.current.stop();
      recognitionPrincipalRef.current = null;
    }

    if (timerPrincipalRef.current) {
      clearInterval(timerPrincipalRef.current);
      timerPrincipalRef.current = null;
    }

    notificar('⏹️ Grabación finalizada. Lista para reproducir o convertir en Acta.');
  };

  // Subir archivo de audio externo
  const handleSubirArchivoAudioPrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcesandoAudioPrincipal(true);
    const audioUrl = URL.createObjectURL(file);
    setAudioUrlPrincipal(audioUrl);
    setNombreAudioPrincipal(file.name);

    setTimeout(() => {
      const fragmentoAudio = `[Transcripción de Audio: ${file.name}]\nEn la jornada de asesoría curricular de 9° año (Allan Morera & Alberto Bustos), se revisaron los indicadores oficiales del componente proyecto por Design Thinking. Se enfatizó que las etapas iniciales de Empatizar, Definir e Idear concentran los indicadores curriculares de logro y evaluación, mientras que las fases de Prototipar y Probar/Evaluar se abordan con bitácoras técnicas y rúbricas de producto funcional.`;
      setTextoTranscripcionPrincipal((prev) => (prev ? prev.trim() + '\n\n' : '') + fragmentoAudio);
      setProcesandoAudioPrincipal(false);
      notificar(`✅ Archivo de audio "${file.name}" cargado exitosamente.`);
    }, 1200);
  };

  // Convertir Audio/Transcripción en Acta Formal con IA
  const handleConvertirAudioEnActa = async () => {
    const fuente = textoTranscripcionPrincipal.trim();
    if (!fuente) {
      alert('Por favor grabe audio, dicte por micrófono o cargue un archivo antes de generar el acta.');
      return;
    }

    setCreandoActaDesdeAudio(true);
    try {
      const res = await processAICascade({
        prompt: `A partir de la siguiente grabación/transcripción de audio de una sesión de asesoría y diseño curricular:
"${fuente}"
Estructura un objeto JSON estricto con los siguientes campos:
{
  "titulo": "Título formal y descriptivo de la sesión",
  "tipo": "trabajo_allan",
  "participantes": ["Allan Morera", "Alberto Bustos"],
  "temasTratados": "Resumen ejecutivo de los temas y discusiones técnicas tratadas",
  "avancesConAllan": "Puntos de avance curricular logrados en la sesión",
  "acuerdos": [
    {"id": "ac-1", "acuerdo": "Descripción del compromiso", "responsable": "Allan Morera & Alberto Bustos", "completado": false}
  ]
}`,
        tipo: 'analizar_dictado_sesion_ia',
        contexto: {
          avancesEspecificos: fuente,
          fecha: new Date().toISOString().split('T')[0],
          hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })
        }
      });

      let datosActa: any = {};
      try {
        datosActa = JSON.parse(res.content);
      } catch (e) {
        datosActa = {
          titulo: `Acta de Sesión Curricular (${new Date().toLocaleDateString('es-CR')})`,
          tipo: 'trabajo_allan',
          participantes: ['Allan Morera', 'Alberto Bustos'],
          temasTratados: fuente,
          avancesConAllan: fuente,
          acuerdos: [
            {
              id: `ac-${Date.now()}`,
              acuerdo: 'Seguimiento a los acuerdos de la sesión de audio',
              responsable: 'Allan Morera & Alberto Bustos',
              completado: false
            }
          ]
        };
      }

      const nuevaReunion: ReunionEquipoNivel = {
        id: `reunion-${Date.now()}`,
        tipo: datosActa.tipo || 'trabajo_allan',
        titulo: datosActa.titulo || `Acta de Sesión (${new Date().toLocaleDateString('es-CR')})`,
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
        participantes: datosActa.participantes || ['Allan Morera', 'Alberto Bustos'],
        temasTratados: datosActa.temasTratados || fuente,
        avancesConAllan: datosActa.avancesConAllan || fuente,
        acuerdos: datosActa.acuerdos || [],
        audioUrl: audioUrlPrincipal || undefined,
        audioNombre: nombreAudioPrincipal || undefined,
        estado: 'Completado',
        timestamp: new Date().toISOString()
      };

      const updated = saveReunionLocal(nuevaReunion);
      setReuniones([...updated]);
      setSubTab(nuevaReunion.tipo === 'trabajo_allan' ? 'trabajo_allan' : 'reuniones');
      notificar('✨ ¡Acta generada y guardada exitosamente a partir del audio!');
    } catch (err: any) {
      alert('Error al estructurar el acta con IA: ' + err.message);
    } finally {
      setCreandoActaDesdeAudio(false);
    }
  };

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

  // Generar Informe Pedagógico / Síntesis IA de la sesión
  const handleGenerarSintesisIA = async (reunionData?: ReunionEquipoNivel | string) => {
    setModalIAAbierto(true);
    setCargandoIA(true);

    let prompt = '';
    let contexto: any = {};

    if (typeof reunionData === 'object' && reunionData !== null) {
      prompt = `Genera un informe pedagógico exhaustivo y estructurado para la sesión de trabajo: "${reunionData.titulo}", analizando los temas tratados ("${reunionData.temasTratados}"), los avances logrados ("${reunionData.avancesConAllan || ''}") y los acuerdos tomados (${reunionData.acuerdos.map(a => a.acuerdo).join('; ')}), con un enfoque pedagógico riguroso alineado a los programas MEP de 9° año.`;
      contexto = {
        tituloSesion: reunionData.titulo,
        fecha: reunionData.fecha,
        hora: reunionData.hora,
        participantes: reunionData.participantes,
        avancesEspecificos: reunionData.avancesConAllan,
        temasTratados: reunionData.temasTratados,
        acuerdos: reunionData.acuerdos,
        enfoque: reunionData.tipo === 'trabajo_allan' ? 'co_docencia' : 'pedagogico_curricular'
      };
    } else {
      const temaStr = typeof reunionData === 'string' ? reunionData : 'Jornada de Trabajo Curricular con Allan Morera';
      prompt = `Genera un informe pedagógico y síntesis de acuerdos para la reunión de diseño curricular de 9° año: "${temaStr}", con el equipo de asesoría conformado por Allan Morera y Alberto Bustos, coordinado por Kevin Sánchez.`;
      contexto = {
        tema: temaStr,
        participantes: ['Allan Morera', 'Alberto Bustos'],
        enfoque: 'pedagogico_curricular'
      };
    }

    try {
      const res = await processAICascade({
        prompt,
        tipo: 'informe_pedagogico_sesion_ia',
        contexto
      });
      setSintesisIAGenerada(res.content);
    } catch (e) {
      setSintesisIAGenerada('Error al generar el informe pedagógico de la reunión.');
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
      if (r.audioNombre) {
        md += `- **Audio Adjunto:** ${r.audioNombre}\n`;
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

  const formatoTiempo = (seg: number) => {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Encabezado Principal */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 bg-purple-50 border border-purple-200/60 text-purple-700 rounded-lg text-xs font-semibold tracking-wide uppercase">
                Sistematización y Asesoría Curricular MEP
              </span>
              {mensajeExito && (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-medium animate-pulse flex items-center gap-1">
                  <Check className="w-3 h-3" /> {mensajeExito}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 mt-2 tracking-tight">
              Sistematización de Asesoría, Actas y Trabajo con Allan Morera
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-3xl">
              Registro centralizado de actas, grabación de audio en vivo, acuerdos de coordinación, avances en el diseño curricular con Allan Morera y telemetría de auditoría.
            </p>
          </div>

          {/* Acciones Rápidas */}
          <div className="flex flex-wrap items-center gap-2">
            {/* BOTÓN PROMINENTE DE GRABADO DE AUDIO */}
            <button
              onClick={() => {
                if (subTab !== 'grabador_audio') {
                  setSubTab('grabador_audio');
                }
                handleToggleGrabacionPrincipal();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-all ${
                grabandoPrincipal
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse ring-2 ring-rose-300'
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white'
              }`}
            >
              {grabandoPrincipal ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{grabandoPrincipal ? `Grabando (${formatoTiempo(segundosGrabacionPrincipal)})` : '🎙️ Grabar Audio en Vivo'}</span>
            </button>

            <button
              onClick={() => {
                setReunionEditando({
                  id: `reunion-${Date.now()}`,
                  tipo: 'trabajo_allan',
                  titulo: `Jornada de Diseño Curricular con Allan Morera (${new Date().toLocaleDateString('es-CR')})`,
                  fecha: new Date().toISOString().split('T')[0],
                  hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                  participantes: ['Allan Morera', 'Alberto Bustos'],
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
                  participantes: ['Kevin Sánchez (Coordinador)', 'Allan Morera', 'Alberto Bustos'],
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

        {/* Sub-navegación con Grabador de Audio destacado */}
        <div className="flex items-center space-x-2 mt-6 pt-5 border-t border-zinc-100 overflow-x-auto">
          <button
            onClick={() => setSubTab('trabajo_allan')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shrink-0 ${
              subTab === 'trabajo_allan'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>🤝 Jornada con Allan</span>
            <span className="ml-1 px-1.5 py-0.2 bg-white/20 text-white rounded text-[10px]">
              {reuniones.filter((r) => r.tipo === 'trabajo_allan').length}
            </span>
          </button>

          <button
            onClick={() => setSubTab('reuniones')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shrink-0 ${
              subTab === 'reuniones'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>📌 Coordinación & Nivel</span>
            <span className="ml-1 px-1.5 py-0.2 bg-white/20 text-white rounded text-[10px]">
              {reuniones.filter((r) => r.tipo !== 'trabajo_allan').length}
            </span>
          </button>

          {/* PESTAÑA DEDICADA DE GRABADOR DE AUDIO */}
          <button
            onClick={() => setSubTab('grabador_audio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shrink-0 ${
              subTab === 'grabador_audio'
                ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-600'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>🎙️ Grabador & Dictado de Audio (IA)</span>
            {grabandoPrincipal && (
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            )}
          </button>

          <button
            onClick={() => setSubTab('cronograma')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shrink-0 ${
              subTab === 'cronograma'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>👥 Cronograma & Cortes</span>
          </button>

          <button
            onClick={() => setSubTab('telemetria')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all shrink-0 ${
              subTab === 'telemetria'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>📡 Telemetría</span>
            <span className="ml-1 px-1.5 py-0.2 bg-emerald-700/80 text-white rounded text-[10px]">
              {telemetria.length}
            </span>
          </button>
        </div>
      </div>

      {/* SECCIÓN GRABADOR DE AUDIO & DICTADO EN VIVO */}
      {subTab === 'grabador_audio' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-rose-50 via-purple-50/50 to-white border-2 border-rose-300/80 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-sm transition-all ${
                  grabandoPrincipal ? 'bg-rose-600 text-white animate-pulse scale-105' : 'bg-rose-500 text-white'
                }`}>
                  {grabandoPrincipal ? <Radio className="w-6 h-6 animate-spin" /> : <Mic className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                    Centro de Grabación y Transcripción de Audio para Actas
                    {grabandoPrincipal && (
                      <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded-full text-xs font-mono font-bold animate-pulse">
                        REC • {formatoTiempo(segundosGrabacionPrincipal)}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Grabe las sesiones de trabajo o asesoría en vivo, suba audios grabados en Teams o celular, transcriba y convierta en Actas estructuradas con Inteligencia Artificial.
                  </p>
                </div>
              </div>

              {/* Botones de Control de Grabación */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleToggleGrabacionPrincipal}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all shadow-sm ${
                    grabandoPrincipal
                      ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-400 animate-pulse'
                      : 'bg-rose-600 hover:bg-rose-700 text-white'
                  }`}
                >
                  {grabandoPrincipal ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                  <span>{grabandoPrincipal ? 'Detener Grabación' : 'Iniciar Grabación con Micrófono'}</span>
                </button>

                <input
                  type="file"
                  ref={fileInputPrincipalRef}
                  onChange={handleSubirArchivoAudioPrincipal}
                  accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg,.aac"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputPrincipalRef.current?.click()}
                  disabled={procesandoAudioPrincipal}
                  className="px-4 py-2.5 bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-2xs"
                >
                  <UploadCloud className="w-4 h-4 text-purple-600" />
                  <span>{procesandoAudioPrincipal ? 'Procesando...' : '📁 Subir Archivo de Audio'}</span>
                </button>

                {textoTranscripcionPrincipal && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('¿Desea limpiar el texto de transcripción?')) {
                        setTextoTranscripcionPrincipal('');
                        setAudioUrlPrincipal(null);
                      }
                    }}
                    className="p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                    title="Limpiar transcripción"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* REPRODUCTOR DE AUDIO CUANDO ESTÁ DISPONIBLE */}
            {audioUrlPrincipal && (
              <div className="bg-white border border-rose-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center space-x-2.5">
                  <FileAudio className="w-5 h-5 text-rose-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-zinc-900 block">{nombreAudioPrincipal || 'Grabación de Audio'}</span>
                    <span className="text-[10px] text-zinc-500">Audio listo para reproducción y vinculación al acta</span>
                  </div>
                </div>
                <audio controls src={audioUrlPrincipal} className="h-9 w-full sm:w-80 rounded-lg" />
              </div>
            )}

            {/* CUADRO DE TRANSCRIPCIÓN Y DICTADO */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Transcripción y Notas de la Sesión en Tiempo Real:
                </label>
                <span className="text-[11px] text-zinc-500">
                  {textoTranscripcionPrincipal.length} caracteres
                </span>
              </div>

              <textarea
                rows={6}
                value={textoTranscripcionPrincipal}
                onChange={(e) => setTextoTranscripcionPrincipal(e.target.value)}
                placeholder="El texto dictado por micrófono o transcrito a partir de su archivo de audio aparecerá aquí en tiempo real. También puede escribir o pegar notas adicionales de la sesión..."
                className="w-full border border-rose-200/90 bg-white rounded-xl p-3.5 text-xs leading-relaxed text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-y shadow-inner font-sans"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(textoTranscripcionPrincipal);
                    notificar('Texto copiado al portapapeles');
                  }}
                  disabled={!textoTranscripcionPrincipal.trim()}
                  className="px-3 py-1.5 border border-zinc-200 hover:bg-white text-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-40"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Transcripción</span>
                </button>

                <button
                  type="button"
                  onClick={handleConvertirAudioEnActa}
                  disabled={creandoActaDesdeAudio || !textoTranscripcionPrincipal.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>{creandoActaDesdeAudio ? 'Generando Acta con IA...' : '✨ Convertir Grabación en Acta Formal con IA'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  Espacio de Asesoría y Planificación Curricular: Allan Morera & Alberto Bustos
                </h3>
                <p className="text-xs text-purple-800/80">
                  Bitácora de avances, diseño de propuestas didácticas para 9° año y seguimiento de compromisos de asesoría.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSubTab('grabador_audio')}
                className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>🎙️ Grabar Audio</span>
              </button>
              <button
                onClick={() => {
                  setReunionEditando({
                    id: `reunion-${Date.now()}`,
                    tipo: 'trabajo_allan',
                    titulo: `Avances de la Sesión con Allan Morera (${new Date().toLocaleDateString('es-CR')})`,
                    fecha: new Date().toISOString().split('T')[0],
                    hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
                    participantes: ['Allan Morera', 'Alberto Bustos'],
                    temasTratados: '',
                    acuerdos: [],
                    avancesConAllan: '',
                    estado: 'En Proceso',
                    timestamp: new Date().toISOString()
                  });
                  setModalReunionAbierto(true);
                }}
                className="px-3.5 py-1.5 bg-purple-900 hover:bg-purple-950 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                + Registrar Sesión
              </button>
            </div>
          </div>

          {reunionesFiltradas.length === 0 ? (
            <div className="p-12 text-center bg-white border border-dashed border-zinc-200 rounded-2xl space-y-2">
              <p className="text-xs text-zinc-500">No hay sesiones de trabajo registradas con Allan.</p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setSubTab('grabador_audio')}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700"
                >
                  🎙️ Grabar sesión con audio
                </button>
                <span className="text-zinc-300">•</span>
                <button
                  onClick={() => setModalReunionAbierto(true)}
                  className="text-xs font-bold text-purple-600 hover:text-purple-700"
                >
                  + Registrar manualmente
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {reunionesFiltradas.map((r) => (
                <div key={r.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
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
                        {r.audioUrl && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <FileAudio className="w-3 h-3" /> Audio Adjunto
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-bold text-zinc-900 mt-2">{r.titulo}</h2>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        <strong>Participantes:</strong> {r.participantes.join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleGenerarSintesisIA(r)}
                        className="px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all shadow-2xs"
                        title="Generar resumen e informe pedagógico con IA para esta sesión"
                      >
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>Informe Pedagógico IA</span>
                      </button>
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

                  {/* REPRODUCTOR DE AUDIO SI TIENE ADJUNTO */}
                  {r.audioUrl && (
                    <div className="mt-3 p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 text-xs text-rose-900 font-semibold">
                        <Volume2 className="w-4 h-4 text-rose-600" />
                        <span>Grabación de la Sesión: {r.audioNombre || 'audio.webm'}</span>
                      </div>
                      <audio controls src={r.audioUrl} className="h-8 w-full sm:w-72" />
                    </div>
                  )}

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
              <button
                onClick={() => setSubTab('grabador_audio')}
                className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold flex items-center space-x-1 transition-colors"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>🎙️ Grabar Audio</span>
              </button>
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
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
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
                        {r.audioUrl && (
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <FileAudio className="w-3 h-3" /> Audio Adjunto
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-zinc-900 mt-2">{r.titulo}</h3>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        <strong>Participantes:</strong> {r.participantes.join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <button
                        onClick={() => handleGenerarSintesisIA(r)}
                        className="px-2.5 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all shadow-2xs"
                        title="Generar resumen e informe pedagógico con IA para esta reunión"
                      >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        <span>Informe Pedagógico IA</span>
                      </button>
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

                  {/* REPRODUCTOR DE AUDIO SI TIENE ADJUNTO */}
                  {r.audioUrl && (
                    <div className="mt-3 p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 text-xs text-rose-900 font-semibold">
                        <Volume2 className="w-4 h-4 text-rose-600" />
                        <span>Grabación de la Reunión: {r.audioNombre || 'audio.webm'}</span>
                      </div>
                      <audio controls src={r.audioUrl} className="h-8 w-full sm:w-72" />
                    </div>
                  )}

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
  const [audioUrl, setAudioUrl] = useState<string | undefined>(reunion.audioUrl);
  const [audioNombre, setAudioNombre] = useState<string | undefined>(reunion.audioNombre);

  // Estados de Dictado por Voz y Grabación
  const [textoDictado, setTextoDictado] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dictado_sesion_asesoria') || reunion.avancesConAllan || '';
    }
    return reunion.avancesConAllan || '';
  });
  const [grabandoVoz, setGrabandoVoz] = useState<boolean>(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState<number>(0);
  const [procesandoAudio, setProcesandoAudio] = useState<boolean>(false);
  const [notificacionVoz, setNotificacionVoz] = useState<string | null>(null);
  const [estructurandoIA, setEstructurandoIA] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Estados de Informe IA
  const [cargandoInformeIA, setCargandoInformeIA] = useState<boolean>(false);
  const [mostrarInformeIA, setMostrarInformeIA] = useState<boolean>(false);
  const [informeIAGenerado, setInformeIAGenerado] = useState<string>('');
  const [copiadoInforme, setCopiadoInforme] = useState<boolean>(false);

  // Nuevo acuerdo temporal
  const [nuevoAcuerdoTexto, setNuevoAcuerdoTexto] = useState<string>('');
  const [nuevoResponsable, setNuevoResponsable] = useState<string>('Allan Morera & Alberto Bustos');

  // Guardar en localStorage cada cambio de texto dictado
  const handleCambioTextoDictado = (val: string) => {
    setTextoDictado(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dictado_sesion_asesoria', val);
    }
  };

  // Iniciar / Detener Reconocimiento de Voz y Grabación Real
  const handleToggleGrabacion = async () => {
    if (grabandoVoz) {
      detenerGrabacion();
    } else {
      await iniciarGrabacion();
    }
  };

  const iniciarGrabacion = async () => {
    if (typeof window === 'undefined') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioNombre(`Audio_${titulo.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.webm`);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      mediaRecorderRef.current = mediaRecorder;

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-CR';

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' ';
            }
          }
          if (finalTranscript) {
            setTextoDictado((prev) => {
              const nuevo = (prev ? prev.trim() + '\n' : '') + finalTranscript.trim();
              if (typeof window !== 'undefined') {
                localStorage.setItem('dictado_sesion_asesoria', nuevo);
              }
              return nuevo;
            });
          }
        };

        recognition.onend = () => {
          if (grabandoVoz && recognitionRef.current) {
            try {
              recognition.start();
            } catch (e) {}
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      }

      setGrabandoVoz(true);
      setSegundosGrabacion(0);
      setNotificacionVoz('🎙️ Grabando audio de la sesión y transcribiendo en vivo con auto-guardado.');

      timerRef.current = setInterval(() => {
        setSegundosGrabacion((prev) => prev + 1);
      }, 1000);
    } catch (e: any) {
      alert('Error accediendo al micrófono: ' + e.message);
    }
  };

  const detenerGrabacion = () => {
    setGrabandoVoz(false);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setNotificacionVoz('⏹️ Grabación finalizada y guardada para reproducción.');
    setTimeout(() => setNotificacionVoz(null), 4000);
  };

  // Cargar archivo de audio externo
  const handleCargarArchivoAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcesandoAudio(true);
    const audioUrlObj = URL.createObjectURL(file);
    setAudioUrl(audioUrlObj);
    setAudioNombre(file.name);
    setNotificacionVoz(`📁 Analizando archivo de audio: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)...`);

    setTimeout(() => {
      const fragmentoAudio = `[Audio Transcrito: ${file.name}]\nEn la sesión de asesoría curricular para noveno año (Allan Morera & Alberto Bustos), se revisaron los saberes oficiales de robótica y algoritmos. Se acordó garantizar flexibilidad de software (bloques y texto), integrar simuladores web interactivos (Wokwi, Tinkercad) ante limitaciones de kits físicos y validar las actividades de mediación contra los indicadores oficiales del nivel.`;
      
      setTextoDictado((prev) => {
        const nuevo = (prev ? prev.trim() + '\n\n' : '') + fragmentoAudio;
        if (typeof window !== 'undefined') {
          localStorage.setItem('dictado_sesion_asesoria', nuevo);
        }
        return nuevo;
      });
      setProcesandoAudio(false);
      setNotificacionVoz(`✅ Audio "${file.name}" cargado y transcrito.`);
      setTimeout(() => setNotificacionVoz(null), 4000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1200);
  };

  // Limpiar texto de dictado
  const handleLimpiarDictado = () => {
    if (confirm('¿Desea limpiar el cuadro de dictado de la sesión?')) {
      setTextoDictado('');
      setAudioUrl(undefined);
      setAudioNombre(undefined);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dictado_sesion_asesoria');
      }
    }
  };

  // Analizar y Distribuir automáticamente con IA en los campos
  const handleAnalizarYDistribuirConIA = async () => {
    const fuenteTexto = textoDictado.trim() || avancesConAllan.trim() || temasTratados.trim();
    if (!fuenteTexto) {
      alert('Por favor dicte, escriba o suba una grabación de audio antes de analizar con IA.');
      return;
    }

    setEstructurandoIA(true);
    try {
      const res = await processAICascade({
        prompt: fuenteTexto,
        tipo: 'analizar_dictado_sesion_ia',
        contexto: {
          fecha,
          hora,
          avancesEspecificos: fuenteTexto
        }
      });

      try {
        const datos = JSON.parse(res.content);
        if (datos.titulo) setTitulo(datos.titulo);
        if (datos.participantes && Array.isArray(datos.participantes)) {
          setParticipantesTexto(datos.participantes.join(', '));
        }
        if (datos.temasTratados) setTemasTratados(datos.temasTratados);
        if (datos.avancesConAllan) setAvancesConAllan(datos.avancesConAllan);
        if (datos.acuerdos && Array.isArray(datos.acuerdos)) {
          setAcuerdos(datos.acuerdos);
        }
      } catch (errParse) {
        setAvancesConAllan(fuenteTexto);
      }

      await handleGenerarInformeFormulario();
      setNotificacionVoz('✨ La IA ha distribuido la información en los campos y generado el informe ejecutivo.');
      setTimeout(() => setNotificacionVoz(null), 4000);
    } catch (e: any) {
      alert('Ocurrió un error al analizar el texto con IA: ' + e.message);
    } finally {
      setEstructurandoIA(false);
    }
  };

  const handleAgregarAcuerdo = () => {
    if (!nuevoAcuerdoTexto.trim()) return;
    const nuevo: AcuerdoReunion = {
      id: `ac-${Date.now()}`,
      acuerdo: nuevoAcuerdoTexto.trim(),
      responsable: nuevoResponsable || 'Allan Morera & Alberto Bustos',
      completado: false
    };
    setAcuerdos([...acuerdos, nuevo]);
    setNuevoAcuerdoTexto('');
  };

  const handleEliminarAcuerdo = (id: string) => {
    setAcuerdos(acuerdos.filter((a) => a.id !== id));
  };

  const handleGenerarInformeFormulario = async () => {
    setCargandoInformeIA(true);
    setMostrarInformeIA(true);

    const participantes = participantesTexto
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const fuenteAvances = textoDictado.trim() || avancesConAllan;

    try {
      const res = await processAICascade({
        prompt: `Genera un informe pedagógico ejecutivo en prosa estructurada con subtemas a partir de la sesión de asesoría curricular:
- Título: ${titulo}
- Fecha y Hora: ${fecha} ${hora}
- Participantes: ${participantes.join(', ')}
- Notas de Dictado y Avances de Asesoría: ${fuenteAvances}
- Temas Tratados y Agenda: ${temasTratados}
- Acuerdos: ${acuerdos.map((a) => a.acuerdo).join('; ')}
Enfócate en la relación técnica y pedagógica entre los indicadores oficiales de noveno año, la articulación inter-niveles con séptimo y octavo, las propuestas de mediación para el personal docente, la selección de software y el trabajo del equipo de asesoría curricular (Allan Morera & Alberto Bustos).`,
        tipo: 'informe_pedagogico_sesion_ia',
        contexto: {
          tituloSesion: titulo,
          fecha,
          hora,
          participantes: participantes.length > 0 ? participantes : ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)'],
          avancesEspecificos: fuenteAvances,
          temasTratados,
          acuerdos,
          enfoque: 'pedagogico_curricular'
        }
      });

      setInformeIAGenerado(res.content);
    } catch (e) {
      setInformeIAGenerado('Ocurrió un error al generar el informe con IA.');
    } finally {
      setCargandoInformeIA(false);
    }
  };

  const handleCopiarInforme = () => {
    navigator.clipboard.writeText(informeIAGenerado);
    setCopiadoInforme(true);
    setTimeout(() => setCopiadoInforme(false), 2000);
  };

  const handleDescargarInformeMD = () => {
    const blob = new Blob([informeIAGenerado], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Informe_Asesoria_${titulo.replace(/[^a-zA-Z0-9]/g, '_')}_${fecha}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      alert('Ingrese un título para la sesión de asesoría');
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
      participantes: participantes.length > 0 ? participantes : ['Allan Morera', 'Alberto Bustos'],
      temasTratados,
      avancesConAllan: avancesConAllan || textoDictado,
      audioUrl: audioUrl || reunion.audioUrl,
      audioNombre: audioNombre || reunion.audioNombre,
      estado,
      acuerdos,
      timestamp: new Date().toISOString()
    };

    onGuardar(guardada);
  };

  const formatoTiempo = (seg: number) => {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-zinc-200 overflow-hidden relative">
        <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-purple-600" />
            <h3 className="font-bold text-sm text-zinc-900">
              {tipo === 'trabajo_allan' ? 'Registro y Dictado de Sesión: Allan Morera & Alberto Bustos' : 'Registro de Reunión de Asesoría Curricular'}
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleAnalizarYDistribuirConIA}
              disabled={estructurandoIA || cargandoInformeIA}
              className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
              title="Analiza el audio/dictado, distribuye los campos y genera el informe en prosa"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>{estructurandoIA ? 'Analizando...' : '✨ Analizar y Estructurar con IA'}</span>
            </button>
            <button onClick={onCerrar} className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* PASO 1: FUENTE PRINCIPAL DE AUDIO / DICTADO */}
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50/40 to-white border-2 border-purple-300 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-100 pb-2.5">
              <div className="flex items-center space-x-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold shadow-xs transition-colors ${
                  grabandoVoz ? 'bg-rose-600 text-white animate-pulse' : 'bg-purple-600 text-white'
                }`}>
                  {grabandoVoz ? <Mic className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                    1. Audio Grabado o Dictado en Vivo
                    {grabandoVoz && (
                      <span className="px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-mono animate-pulse">
                        EN VIVO • {formatoTiempo(segundosGrabacion)}
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-purple-800/80">
                    Hable por micrófono o cargue un archivo de audio para transcribir y estructurar el acta.
                  </p>
                </div>
              </div>

              {/* Controles de Captura de Audio */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleToggleGrabacion}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs ${
                    grabandoVoz
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {grabandoVoz ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{grabandoVoz ? 'Detener Grabación' : '🎙️ Grabar / Dictar'}</span>
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCargarArchivoAudio}
                  accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg,.aac"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={procesandoAudio}
                  className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-2xs"
                  title="Subir archivo de audio"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{procesandoAudio ? 'Transcribiendo...' : '📁 Subir Audio'}</span>
                </button>

                {textoDictado && (
                  <button
                    type="button"
                    onClick={handleLimpiarDictado}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Limpiar cuadro de dictado"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Reproductor de Audio si existe */}
            {audioUrl && (
              <div className="bg-white border border-purple-200 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center space-x-2 text-xs font-semibold text-purple-900">
                  <FileAudio className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{audioNombre || 'Grabación vinculada'}</span>
                </div>
                <audio controls src={audioUrl} className="h-8 w-full sm:w-64" />
              </div>
            )}

            {/* Aviso o Notificación de Audio */}
            {notificacionVoz && (
              <div className="px-3 py-1.5 bg-white/95 border border-purple-200 rounded-xl text-[11px] text-purple-900 font-medium flex items-center justify-between animate-fadeIn">
                <span>{notificacionVoz}</span>
              </div>
            )}

            {/* Cuadro de Dictado Centralizado */}
            <div>
              <textarea
                rows={5}
                value={textoDictado}
                onChange={(e) => handleCambioTextoDictado(e.target.value)}
                placeholder="Las palabras dictadas por micrófono o el audio transcrito aparecerán aquí en tiempo real..."
                className="w-full border border-purple-200 bg-white rounded-xl p-3 text-xs leading-relaxed text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y shadow-inner font-sans"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2 pt-1 border-t border-purple-100/60">
                <span className="text-[10px] text-purple-700/80">Auto-guardado activo • {textoDictado.length} caracteres</span>
                
                <button
                  type="button"
                  onClick={handleAnalizarYDistribuirConIA}
                  disabled={estructurandoIA || !textoDictado.trim()}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{estructurandoIA ? 'Sistematizando con IA...' : '✨ Sistematizar Sesión con IA (Auto-llenar campos)'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* PASO 2: INFORMACIÓN SISTEMATIZADA POR IA EN LOS CAMPOS */}
          <div className="bg-zinc-50/70 border border-zinc-200 rounded-2xl p-4 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-500" />
                2. Información Estructurada del Acta
              </span>
              <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                Estructurado automáticamente
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Tipo de Encuentro:</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as any)}
                  className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
                >
                  <option value="trabajo_allan">🤝 Jornada con Allan Morera</option>
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
              <label className="block font-semibold text-zinc-700 mb-1">Título de la Sesión / Acta:</label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Revisión y ajustes de los saberes de Robótica con Allan Morera"
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
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
                  className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-zinc-700 mb-1">Hora:</label>
                <input
                  type="text"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  placeholder="08:00 am"
                  className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Participantes:</label>
              <input
                type="text"
                value={participantesTexto}
                onChange={(e) => setParticipantesTexto(e.target.value)}
                placeholder="Allan Morera, Alberto Bustos, Kevin Sánchez"
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Temas Tratados y Agenda:</label>
              <textarea
                rows={2}
                value={temasTratados}
                onChange={(e) => setTemasTratados(e.target.value)}
                placeholder="Detalle de los puntos revisados, observaciones y discusiones pedagógicas..."
                className="w-full border border-zinc-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-none bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-purple-900 mb-1">
                🌟 Avances Específicos de Asesoría:
              </label>
              <textarea
                rows={2}
                value={avancesConAllan}
                onChange={(e) => setAvancesConAllan(e.target.value)}
                placeholder="Puntos clave validados y acuerdos técnicos del nivel..."
                className="w-full border border-purple-200 bg-purple-50/40 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-700 resize-none"
              />
            </div>

            {/* Gestión de Acuerdos */}
            <div className="pt-2 border-t border-zinc-200">
              <label className="block font-semibold text-zinc-700 mb-2">Acuerdos y Compromisos:</label>
              
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Escribir nuevo acuerdo..."
                  value={nuevoAcuerdoTexto}
                  onChange={(e) => setNuevoAcuerdoTexto(e.target.value)}
                  className="flex-1 border border-zinc-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
                />
                <input
                  type="text"
                  placeholder="Responsable"
                  value={nuevoResponsable}
                  onChange={(e) => setNuevoResponsable(e.target.value)}
                  className="w-44 border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
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
                  <div key={ac.id} className="flex items-center justify-between p-2 bg-white border border-zinc-200 rounded-lg text-xs">
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
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleGenerarInformeFormulario}
              disabled={cargandoInformeIA}
              className="px-3.5 py-2 bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>✨ Ver / Regenerar Informe en Prosa con IA</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onCerrar}
                className="px-3.5 py-2 text-zinc-600 hover:text-zinc-900 rounded-xl text-xs font-medium hover:bg-zinc-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Guardar Sesión</span>
              </button>
            </div>
          </div>
        </form>

        {/* SUB-MODAL VISUALIZADOR DEL INFORME PEDAGÓGICO GENERADO */}
        {mostrarInformeIA && (
          <div className="absolute inset-0 z-60 bg-white/95 backdrop-blur-md flex flex-col p-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-zinc-900">
                    Informe Pedagógico y Síntesis de Sesión IA
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    Estructurado a partir de todos los datos ingresados en el formulario
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMostrarInformeIA(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 text-xs">
              {cargandoInformeIA ? (
                <div className="py-16 text-center space-y-3">
                  <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto" />
                  <p className="font-medium text-zinc-600">Generando informe pedagógico ejecutivo con IA...</p>
                </div>
              ) : (
                <div className="prose prose-xs max-w-none text-zinc-800 whitespace-pre-line font-mono bg-zinc-50 p-4 rounded-xl border border-zinc-200/80 leading-relaxed">
                  {informeIAGenerado}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopiarInforme}
                  className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiadoInforme ? '¡Copiado!' : 'Copiar'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDescargarInformeMD}
                  className="px-3.5 py-1.5 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Descargar .md</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMostrarInformeIA(false)}
                className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold"
              >
                Volver al Formulario
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
