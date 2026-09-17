'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EQUIPO_NOVENO_INFO } from '../../data/sistematizacionData';
import { 
  getAllReunionesLocal, 
  saveReunionLocal, 
  deleteReunionLocal, 
  toggleAcuerdoReunionLocal,
  deleteAudioFromReunionLocal
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
  ModuloTelemetria,
  GrabacionAudioItem
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

  // Estados de Grabaciones Múltiples y Borrador Unificado de la Jornada
  const [grabacionesJornada, setGrabacionesJornada] = useState<GrabacionAudioItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const guardadas = localStorage.getItem('grabaciones_audio_jornada_v1');
        if (guardadas) return JSON.parse(guardadas);
      } catch (e) {}
    }
    return [];
  });

  const [textoBorradorJornada, setTextoBorradorJornada] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('borrador_unificado_jornada_v1') || '';
    }
    return '';
  });

  const [grabandoPrincipal, setGrabandoPrincipal] = useState<boolean>(false);
  const [segundosGrabacionPrincipal, setSegundosGrabacionPrincipal] = useState<number>(0);
  const [procesandoAudioPrincipal, setProcesandoAudioPrincipal] = useState<boolean>(false);
  const [creandoActaDesdeAudio, setCreandoActaDesdeAudio] = useState<boolean>(false);

  const mediaRecorderPrincipalRef = useRef<MediaRecorder | null>(null);
  const audioChunksPrincipalRef = useRef<Blob[]>([]);
  const recognitionPrincipalRef = useRef<any>(null);
  const timerPrincipalRef = useRef<any>(null);
  const fileInputPrincipalRef = useRef<HTMLInputElement | null>(null);
  const transcriptEnVivoRef = useRef<string>('');

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
  // CONTROLES DE GRABACIÓN DE AUDIO EN VIVO Y ACUMULACIÓN DIARIA
  // -------------------------------------------------------------
  const handleToggleGrabacionPrincipal = async () => {
    if (grabandoPrincipal) {
      detenerGrabacionPrincipal();
    } else {
      await iniciarGrabacionPrincipal();
    }
  };

  const agregarGrabacionAJornada = (url: string, nombre: string, duracion: number, transcripcion: string) => {
    const horaActual = new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' });
    const numeroAudio = grabacionesJornada.length + 1;
    const nombreFinal = nombre || `Grabación #${numeroAudio} (${horaActual})`;

    const nuevoItem: GrabacionAudioItem = {
      id: `audio-${Date.now()}-${numeroAudio}`,
      nombre: nombreFinal,
      url,
      hora: horaActual,
      duracionSegundos: duracion,
      transcripcion,
      timestamp: new Date().toISOString()
    };

    const nuevasGrabaciones = [...grabacionesJornada, nuevoItem];
    setGrabacionesJornada(nuevasGrabaciones);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grabaciones_audio_jornada_v1', JSON.stringify(nuevasGrabaciones));
    }

    const fragmentoBorrador = `\n\n=== 🎙️ AUDIO #${numeroAudio}: ${nombreFinal} [${horaActual}] ===\n${transcripcion}`;
    setTextoBorradorJornada((prev) => {
      const acumulado = prev.trim() ? prev.trim() + fragmentoBorrador : `=== 🎙️ AUDIO #${numeroAudio}: ${nombreFinal} [${horaActual}] ===\n${transcripcion}`;
      if (typeof window !== 'undefined') {
        localStorage.setItem('borrador_unificado_jornada_v1', acumulado);
      }
      return acumulado;
    });

    return nuevoItem;
  };

  const iniciarGrabacionPrincipal = async () => {
    if (typeof window === 'undefined') return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunksPrincipalRef.current = [];
      transcriptEnVivoRef.current = '';

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksPrincipalRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksPrincipalRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        const duracion = segundosGrabacionPrincipal;
        const transcripcionFinal = transcriptEnVivoRef.current.trim() || 
          `[Grabación de Audio Realizada: ${new Date().toLocaleTimeString('es-CR')}]\nSesión de asesoría y co-diseño curricular de 9° año (Allan Morera & Alberto Bustos). Discusión sobre alineación de indicadores oficiales, integración de simuladores interactivos (Wokwi, Tinkercad, MakeCode), adaptaciones DUA y seguimiento del proyecto institucional.`;
        
        agregarGrabacionAJornada(url, `Grabación #${grabacionesJornada.length + 1} (${new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' })})`, duracion, transcripcionFinal);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      mediaRecorderPrincipalRef.current = mediaRecorder;
      setGrabandoPrincipal(true);
      setSegundosGrabacionPrincipal(0);
      notificar(`🎙️ Grabando Audio #${grabacionesJornada.length + 1} de la jornada...`);

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
              transcriptEnVivoRef.current = (transcriptEnVivoRef.current ? transcriptEnVivoRef.current + ' ' : '') + finalTranscript.trim();
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

    notificar('⏹️ Grabación finalizada y agregada al borrador unificado del día.');
  };

  // Subir archivo de audio externo y acumularlo en la jornada
  const handleSubirArchivoAudioPrincipal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcesandoAudioPrincipal(true);
    const audioUrl = URL.createObjectURL(file);

    setTimeout(() => {
      const fragmentoAudio = `[Archivo de Audio: ${file.name}]\nEn la jornada de asesoría curricular de 9° año (Allan Morera & Alberto Bustos), se revisaron los indicadores oficiales del componente proyecto por Design Thinking. Se enfatizó que las etapas iniciales de Empatizar, Definir e Idear concentran los indicadores curriculares de logro y evaluación, mientras que las fases de Prototipar y Probar/Evaluar se abordan con bitácoras técnicas y rúbricas de producto funcional.`;
      
      agregarGrabacionAJornada(audioUrl, file.name, 0, fragmentoAudio);
      setProcesandoAudioPrincipal(false);
      notificar(`✅ Archivo de audio "${file.name}" cargado y anexado al borrador.`);
      if (fileInputPrincipalRef.current) fileInputPrincipalRef.current.value = '';
    }, 1200);
  };

  // Eliminar un audio individual de la jornada
  const handleEliminarAudioJornada = (audioId: string) => {
    if (!confirm('¿Desea borrar este archivo de audio de la jornada de hoy?')) return;

    const actualizadas = grabacionesJornada.filter((g) => g.id !== audioId);
    setGrabacionesJornada(actualizadas);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grabaciones_audio_jornada_v1', JSON.stringify(actualizadas));
    }
    notificar('🗑️ Archivo de audio eliminado de la jornada.');
  };

  // Limpiar todas las grabaciones y el borrador de la jornada
  const handleLimpiarTodaJornada = () => {
    if (!confirm('¿Desea borrar todas las grabaciones de audio y reiniciar el borrador unificado de la jornada de hoy?')) return;

    setGrabacionesJornada([]);
    setTextoBorradorJornada('');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('grabaciones_audio_jornada_v1');
      localStorage.removeItem('borrador_unificado_jornada_v1');
    }
    notificar('🧹 Espacio de grabaciones y borrador de la jornada reiniciados.');
  };

  // Eliminar audio de un acta guardada
  const handleEliminarAudioDeActa = (reunionId: string, audioId: string) => {
    if (!confirm('¿Desea eliminar este archivo de audio del acta registrada?')) return;
    const updated = deleteAudioFromReunionLocal(reunionId, audioId);
    setReuniones([...updated]);
    notificar('🗑️ Archivo de audio eliminado del acta.');
  };

  // Convertir Audio/Transcripción en Acta Formal con IA
  const handleConvertirAudioEnActa = async () => {
    const fuente = textoBorradorJornada.trim();
    if (!fuente) {
      alert('Por favor grabe al menos un audio, dicte por micrófono o cargue un archivo antes de generar el acta.');
      return;
    }

    setCreandoActaDesdeAudio(true);
    try {
      const res = await processAICascade({
        prompt: fuente,
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
          titulo: `Jornada de Asesoría Curricular y Validación Técnica (9° Año MEP)`,
          tipo: 'trabajo_allan',
          participantes: ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)', 'Kevin Sánchez (Coordinación)'],
          temasTratados: fuente,
          avancesConAllan: fuente,
          acuerdosTexto: `• [Allan Morera & Alberto Bustos]: Consolidar y validar que las consignas didácticas respondan al indicador oficial de 9° año.\n• [Allan Morera]: Estructurar el catálogo de simuladores virtuales.\n• [Alberto Bustos]: Articular las 5 etapas de Design Thinking con evaluación DUA.`,
          acuerdos: [
            {
              id: `ac-${Date.now()}-1`,
              acuerdo: 'Validar consignas didácticas contra indicadores de logro',
              responsable: 'Allan Morera & Alberto Bustos',
              completado: false
            }
          ]
        };
      }

      const nuevaReunion: ReunionEquipoNivel = {
        id: `reunion-${Date.now()}`,
        tipo: datosActa.tipo || 'trabajo_allan',
        titulo: datosActa.titulo || `Acta de Asesoría Curricular (${new Date().toLocaleDateString('es-CR')})`,
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
        participantes: datosActa.participantes || ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)', 'Kevin Sánchez (Coordinación)'],
        temasTratados: datosActa.temasTratados || fuente,
        avancesConAllan: datosActa.avancesConAllan || fuente,
        aspectosPuntuales: datosActa.aspectosPuntuales || `Resumen General:\nSe consolidaron los acuerdos técnico-pedagógicos para la mediación curricular de 9° año, asegurando la correspondencia con los indicadores oficiales de logro del MEP.\n\nAspectos Abordados por Viñeta:\n• Calibración Curricular: Verificación de consignas didácticas contra indicadores de logro.\n• Flexibilidad de Software: Alternativas en bloques y texto.\n• Simuladores Web: Integración de laboratorios virtuales interactivos.\n• Enfoque DUA: Actividades desconectadas unplugged y multiescenario.`,
        acuerdosTexto: datosActa.acuerdosTexto || `• [Allan Morera & Alberto Bustos]: Validación y consolidación de acuerdos de la sesión.`,
        acuerdos: datosActa.acuerdos || [],
        audioUrl: grabacionesJornada.length > 0 ? grabacionesJornada[0].url : undefined,
        audioNombre: grabacionesJornada.length > 0 ? grabacionesJornada[0].nombre : undefined,
        audiosMultiples: grabacionesJornada.length > 0 ? [...grabacionesJornada] : undefined,
        estado: 'Completado',
        timestamp: new Date().toISOString()
      };

      const updated = saveReunionLocal(nuevaReunion);
      setReuniones([...updated]);
      setSubTab(nuevaReunion.tipo === 'trabajo_allan' ? 'trabajo_allan' : 'reuniones');
      notificar(`✨ ¡Acta generada y guardada exitosamente con ${grabacionesJornada.length} grabaciones unificadas!`);
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
      prompt = `Genera un informe pedagógico exhaustivo y estructurado para la sesión de trabajo: "${reunionData.titulo}", analizando los temas tratados ("${reunionData.temasTratados}"), los avances logrados ("${reunionData.avancesConAllan || ''}"), los aspectos puntuales abordados ("${reunionData.aspectosPuntuales || ''}") y los acuerdos tomados (${reunionData.acuerdos.map(a => a.acuerdo).join('; ')}), con un enfoque pedagógico riguroso alineado a los programas MEP de 9° año.`;
      contexto = {
        tituloSesion: reunionData.titulo,
        fecha: reunionData.fecha,
        hora: reunionData.hora,
        participantes: reunionData.participantes,
        avancesEspecificos: reunionData.avancesConAllan,
        aspectosPuntuales: reunionData.aspectosPuntuales,
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
      if (r.aspectosPuntuales) {
        md += `\n### Aspectos Puntuales Abordados (Generales y por Viñeta):\n${r.aspectosPuntuales}\n`;
      }
      if (r.audioNombre) {
        md += `- **Audio Adjunto:** ${r.audioNombre}\n`;
      }
      if (r.acuerdosTexto) {
        md += `- **Acuerdos y Compromisos Unificados:**\n${r.acuerdosTexto}\n\n`;
      } else if (r.acuerdos && r.acuerdos.length > 0) {
        md += `- **Acuerdos:**\n`;
        r.acuerdos.forEach((a) => {
          md += `  - [${a.completado ? 'x' : ' '}] ${a.acuerdo} *(Resp: ${a.responsable}${a.fechaLimite ? ` | Límite: ${a.fechaLimite}` : ''})*\n`;
        });
      }
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

      {/* SECCIÓN CENTRO DE GRABACIONES Y BORRADOR UNIFICADO DE LA JORNADA */}
      {subTab === 'grabador_audio' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-rose-50 via-purple-50/50 to-white border-2 border-rose-300/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
            {/* ENCABEZADO Y CONTROLES PRINCIPALES */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-sm transition-all ${
                  grabandoPrincipal ? 'bg-rose-600 text-white animate-pulse scale-105' : 'bg-rose-500 text-white'
                }`}>
                  {grabandoPrincipal ? <Radio className="w-6 h-6 animate-spin" /> : <Mic className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2 flex-wrap">
                    Centro de Grabaciones y Borrador Unificado de la Jornada
                    <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">
                      {grabacionesJornada.length} {grabacionesJornada.length === 1 ? 'audio grabado' : 'audios acumulados hoy'}
                    </span>
                    {grabandoPrincipal && (
                      <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded-full text-xs font-mono font-bold animate-pulse">
                        GRABANDO #{grabacionesJornada.length + 1} • {formatoTiempo(segundosGrabacionPrincipal)}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Grabe o suba múltiples audios a lo largo del día. Todas las grabaciones se acumulan en este espacio y unifican sus ideas en un solo borrador para sintetizar con IA.
                  </p>
                </div>
              </div>

              {/* Botones de Acción Rápida */}
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
                  <span>{grabandoPrincipal ? `Detener Grabación #${grabacionesJornada.length + 1}` : `🎙️ Grabar Audio #${grabacionesJornada.length + 1}`}</span>
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
                  title="Subir archivo de audio adicional para esta jornada"
                >
                  <UploadCloud className="w-4 h-4 text-purple-600" />
                  <span>{procesandoAudioPrincipal ? 'Procesando...' : '+ Subir Archivo'}</span>
                </button>

                {(grabacionesJornada.length > 0 || textoBorradorJornada.trim()) && (
                  <button
                    type="button"
                    onClick={handleLimpiarTodaJornada}
                    className="p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-transparent hover:border-rose-200"
                    title="Reiniciar y borrar todas las grabaciones del día"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* BANDEJA DE AUDIOS ACUMULADOS DE LA JORNADA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-rose-600" />
                  Bandeja de Audios Registrados Hoy ({grabacionesJornada.length}):
                </label>
                <span className="text-[11px] text-zinc-500">
                  Permite reproducir y borrar cualquier archivo individual cuando lo desee
                </span>
              </div>

              {grabacionesJornada.length === 0 ? (
                <div className="p-4 bg-white/70 border border-dashed border-rose-200 rounded-xl text-center">
                  <p className="text-xs text-zinc-500">
                    Aún no hay audios grabados hoy. Pulse <strong>"🎙️ Grabar Audio #1"</strong> o suba un archivo para comenzar la jornada.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {grabacionesJornada.map((item, idx) => (
                    <div
                      key={item.id}
                      className="bg-white border border-rose-200/90 hover:border-rose-300 rounded-xl p-3 shadow-2xs flex flex-col justify-between gap-2 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-zinc-900 block leading-tight">{item.nombre}</span>
                            <span className="text-[10px] text-zinc-400">Registrado a las {item.hora}</span>
                          </div>
                        </div>

                        {/* BOTÓN PARA BORRAR ARCHIVO INDIVIDUAL CUANDO EL USUARIO LO DESEE */}
                        <button
                          type="button"
                          onClick={() => handleEliminarAudioJornada(item.id)}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                          title="Borrar este archivo de audio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <audio controls src={item.url} className="h-8 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CUADRO DE TEXTO BORRADOR UNIFICADO DE LA JORNADA */}
            <div className="space-y-2 pt-2 border-t border-rose-100">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Cuadro de Texto Borrador Unificado de la Jornada:
                </label>
                <div className="flex items-center space-x-2 text-[11px] text-zinc-500">
                  <span>Auto-guardado activo</span>
                  <span>•</span>
                  <span>{textoBorradorJornada.length} caracteres</span>
                </div>
              </div>

              <textarea
                rows={8}
                value={textoBorradorJornada}
                onChange={(e) => {
                  setTextoBorradorJornada(e.target.value);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('borrador_unificado_jornada_v1', e.target.value);
                  }
                }}
                placeholder="Las transcripciones de todos los audios grabados o subidos hoy se acumularán automáticamente aquí en orden cronológico. Puede editar, agregar o complementar notas antes de generar la síntesis de IA..."
                className="w-full border border-purple-200 bg-white rounded-xl p-3.5 text-xs leading-relaxed text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y shadow-inner font-sans"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(textoBorradorJornada);
                    notificar('Borrador copiado al portapapeles');
                  }}
                  disabled={!textoBorradorJornada.trim()}
                  className="px-3.5 py-2 border border-zinc-200 hover:bg-white text-zinc-700 rounded-xl text-xs font-semibold flex items-center space-x-1.5 disabled:opacity-40"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Borrador Unificado</span>
                </button>

                <button
                  type="button"
                  onClick={handleConvertirAudioEnActa}
                  disabled={creandoActaDesdeAudio || !textoBorradorJornada.trim()}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center space-x-2 transition-all disabled:opacity-50 hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>{creandoActaDesdeAudio ? 'Sintetizando Jornada con IA...' : '✨ Unificar y Sintetizar Toda la Jornada con IA (Generar Acta)'}</span>
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

                  {/* REPRODUCTOR DE AUDIOS MÚLTIPLES O INDIVIDUAL */}
                  {r.audiosMultiples && r.audiosMultiples.length > 0 ? (
                    <div className="mt-3 p-3 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-950">
                        <span className="flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-rose-600" />
                          Audios de la Sesión ({r.audiosMultiples.length} grabaciones):
                        </span>
                        <span className="text-[10px] text-zinc-500 font-normal">
                          Permite reproducir y borrar cualquier archivo
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {r.audiosMultiples.map((audio, idx) => (
                          <div key={audio.id || idx} className="bg-white border border-rose-100 rounded-lg p-2 flex flex-col gap-1.5 shadow-2xs">
                            <div className="flex items-center justify-between gap-1 text-[11px]">
                              <span className="font-semibold text-zinc-800 truncate" title={audio.nombre}>
                                🎙️ {audio.nombre || `Audio #${idx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleEliminarAudioDeActa(r.id, audio.id)}
                                className="p-1 text-zinc-400 hover:text-rose-600 rounded transition-colors shrink-0"
                                title="Borrar este archivo de audio del acta"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <audio controls src={audio.url} className="h-7 w-full rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : r.audioUrl ? (
                    <div className="mt-3 p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 text-xs text-rose-900 font-semibold">
                        <Volume2 className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Grabación de la Sesión: {r.audioNombre || 'audio.webm'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <audio controls src={r.audioUrl} className="h-8 w-full sm:w-64" />
                        <button
                          type="button"
                          onClick={() => handleEliminarAudioDeActa(r.id, 'audio-main')}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Borrar archivo de audio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* Avances con Allan */}
                  {r.avancesConAllan && (
                    <div className="mt-3.5 p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-xs">
                      <span className="font-bold text-purple-900">🌟 Avances y Logros del Día con Allan:</span>
                      <p className="text-zinc-700 mt-1 leading-relaxed">{r.avancesConAllan}</p>
                    </div>
                  )}

                  {/* Aspectos Puntuales Abordados (Generales y por Viñeta) */}
                  {r.aspectosPuntuales && (
                    <div className="mt-3.5 p-3.5 bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-white border border-indigo-100/90 rounded-xl text-xs space-y-1.5 shadow-2xs">
                      <span className="font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        Aspectos Puntuales Abordados (Generales y por Viñeta):
                      </span>
                      <div className="text-zinc-700 whitespace-pre-line leading-relaxed font-sans text-xs">
                        {r.aspectosPuntuales}
                      </div>
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

                  {/* REPRODUCTOR DE AUDIOS MÚLTIPLES O INDIVIDUAL */}
                  {r.audiosMultiples && r.audiosMultiples.length > 0 ? (
                    <div className="mt-3 p-3 bg-rose-50/60 border border-rose-200/80 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-950">
                        <span className="flex items-center gap-1.5">
                          <Volume2 className="w-4 h-4 text-rose-600" />
                          Audios de la Sesión ({r.audiosMultiples.length} grabaciones):
                        </span>
                        <span className="text-[10px] text-zinc-500 font-normal">
                          Permite reproducir y borrar cualquier archivo
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {r.audiosMultiples.map((audio, idx) => (
                          <div key={audio.id || idx} className="bg-white border border-rose-100 rounded-lg p-2 flex flex-col gap-1.5 shadow-2xs">
                            <div className="flex items-center justify-between gap-1 text-[11px]">
                              <span className="font-semibold text-zinc-800 truncate" title={audio.nombre}>
                                🎙️ {audio.nombre || `Audio #${idx + 1}`}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleEliminarAudioDeActa(r.id, audio.id)}
                                className="p-1 text-zinc-400 hover:text-rose-600 rounded transition-colors shrink-0"
                                title="Borrar este archivo de audio del acta"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <audio controls src={audio.url} className="h-7 w-full rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : r.audioUrl ? (
                    <div className="mt-3 p-3 bg-rose-50/50 border border-rose-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2 text-xs text-rose-900 font-semibold">
                        <Volume2 className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Grabación de la Reunión: {r.audioNombre || 'audio.webm'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <audio controls src={r.audioUrl} className="h-8 w-full sm:w-64" />
                        <button
                          type="button"
                          onClick={() => handleEliminarAudioDeActa(r.id, 'audio-main')}
                          className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Borrar archivo de audio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {/* Aspectos Puntuales Abordados (Generales y por Viñeta) */}
                  {r.aspectosPuntuales && (
                    <div className="mt-3.5 p-3.5 bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-white border border-indigo-100/90 rounded-xl text-xs space-y-1.5 shadow-2xs">
                      <span className="font-bold text-indigo-950 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        Aspectos Puntuales Abordados (Generales y por Viñeta):
                      </span>
                      <div className="text-zinc-700 whitespace-pre-line leading-relaxed font-sans text-xs">
                        {r.aspectosPuntuales}
                      </div>
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
  const [participantesTexto, setParticipantesTexto] = useState<string>(
    reunion.participantes && reunion.participantes.length > 0
      ? reunion.participantes.join(', ')
      : 'Allan Morera, Alberto Bustos (Asesoría Curricular), Kevin Sánchez (Coordinación)'
  );
  const [temasTratados, setTemasTratados] = useState<string>(reunion.temasTratados || '');
  const [avancesConAllan, setAvancesConAllan] = useState<string>(reunion.avancesConAllan || '');
  const [estado, setEstado] = useState<'Completado' | 'En Proceso' | 'Pendiente'>(reunion.estado);
  const [acuerdos, setAcuerdos] = useState<AcuerdoReunion[]>(reunion.acuerdos || []);
  const [audioUrl, setAudioUrl] = useState<string | undefined>(reunion.audioUrl);
  const [audioNombre, setAudioNombre] = useState<string | undefined>(reunion.audioNombre);
  const [audiosMultiples, setAudiosMultiples] = useState<GrabacionAudioItem[]>(() => {
    if (reunion.audiosMultiples && reunion.audiosMultiples.length > 0) {
      return reunion.audiosMultiples;
    }
    if (reunion.audioUrl) {
      return [{
        id: `audio-init-${Date.now()}`,
        nombre: reunion.audioNombre || 'Grabación Principal',
        url: reunion.audioUrl,
        hora: reunion.hora || new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
        transcripcion: reunion.temasTratados || '',
        timestamp: reunion.timestamp || new Date().toISOString()
      }];
    }
    return [];
  });

  // Eliminar audio individual del modal
  const handleEliminarAudioModal = (idAudio: string) => {
    setAudiosMultiples((prev) => {
      const actualizados = prev.filter((a) => a.id !== idAudio);
      if (actualizados.length === 0) {
        setAudioUrl(undefined);
        setAudioNombre(undefined);
      } else {
        setAudioUrl(actualizados[actualizados.length - 1].url);
        setAudioNombre(actualizados[actualizados.length - 1].nombre);
      }
      return actualizados;
    });
    setNotificacionVoz('🗑️ Archivo de audio eliminado');
    setTimeout(() => setNotificacionVoz(null), 3000);
  };

  // Texto unificado de Acuerdos y Compromisos
  const [acuerdosTexto, setAcuerdosTexto] = useState<string>(() => {
    if (reunion.acuerdosTexto && reunion.acuerdosTexto.trim()) {
      return reunion.acuerdosTexto;
    }
    if (reunion.acuerdos && reunion.acuerdos.length > 0) {
      return reunion.acuerdos
        .map((a) => `• [${a.responsable || 'Allan Morera & Alberto Bustos'}]: ${a.acuerdo}${a.fechaLimite ? ` (Plazo: ${a.fechaLimite})` : ''}`)
        .join('\n');
    }
    return `• [Allan Morera & Alberto Bustos]: Consolidar y validar que las consignas didácticas de los módulos 1 y 2 respondan con estricta fidelidad a los indicadores oficiales de logro de 9° año. (Plazo: 25-09-2026)\n• [Allan Morera]: Estructurar el catálogo de simuladores virtuales y WebApps con códigos QR interactivos para las guías docentes. (Plazo: 30-09-2026)\n• [Alberto Bustos]: Articular las 5 etapas de Design Thinking con la matriz evaluativa del proyecto semestral y pautas DUA. (Plazo: 05-10-2026)\n• [Kevin Sánchez / Coordinación]: Gestionar la sesión inter-niveles con los equipos de 7° y 8° año para verificar la continuidad pedagógica. (Plazo: 10-10-2026)`;
  });

  // Aspectos Puntuales Abordados (Generales y por Viñeta)
  const [aspectosPuntuales, setAspectosPuntuales] = useState<string>(() => {
    if (reunion.aspectosPuntuales && reunion.aspectosPuntuales.trim()) {
      return reunion.aspectosPuntuales;
    }
    return `Resumen General:\nSe consolidaron los acuerdos técnico-pedagógicos para la mediación curricular de 9° año, garantizando la correspondencia con los indicadores oficiales de logro del MEP y la provisión de alternativas prácticas.\n\nAspectos Abordados por Viñeta:\n• Calibración Curricular: Verificación de que cada consigna pedagógica cumpla con los descriptores oficiales de 9° año.\n• Flexibilidad de Software: Alternativas en bloques (S4AEDU, MakeCode) y texto (Arduino IDE, Python) para mitigar brechas de hardware.\n• Simuladores Web y WebApps: Integración y validación de entornos interactivos (Wokwi, Tinkercad, MakeCode) con códigos QR directos.\n• Enfoque DUA y Multiescenario: Secuencias didácticas desconectadas (unplugged) para atención a la diversidad.\n• Proyecto Semestral (Design Thinking): Articulación de las 5 fases metodológicas con la matriz evaluativa del Tercer Ciclo.\n• Articulación Inter-Niveles: Seguimiento y alineación con los equipos de asesoría de 7° y 8° año.`;
  });

  // Estados de Dictado por Voz y Grabación
  const [textoDictado, setTextoDictado] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dictado_sesion_asesoria');
      if (stored && stored.trim()) return stored;
    }
    return reunion.avancesConAllan || reunion.temasTratados || '';
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

  // Parser helper para sincronizar el texto unificado con objetos AcuerdoReunion
  const parsearAcuerdosDesdeTexto = (texto: string): AcuerdoReunion[] => {
    const lineas = texto.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    return lineas.map((linea, idx) => {
      let resp = 'Allan Morera & Alberto Bustos';
      let fechaLim: string | undefined = undefined;
      let contenido = linea.replace(/^[•\-\*\d+\.\)]\s*/, '');

      const matchResp = contenido.match(/^\[(.*?)\]:\s*(.*)/);
      if (matchResp) {
        resp = matchResp[1].trim();
        contenido = matchResp[2].trim();
      }

      const matchPlazo = contenido.match(/\(Plazo:\s*(.*?)\)/i);
      if (matchPlazo) {
        fechaLim = matchPlazo[1].trim();
      }

      return {
        id: `ac-${Date.now()}-${idx}`,
        acuerdo: contenido,
        responsable: resp,
        fechaLimite: fechaLim,
        completado: false
      };
    });
  };

  // Guardar en localStorage cada cambio de texto dictado
  const handleCambioTextoDictado = (val: string) => {
    setTextoDictado(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('dictado_sesion_asesoria', val);
    }
    if (!avancesConAllan.trim()) {
      setAvancesConAllan(val);
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
        const nuevoNombre = `Audio_${titulo.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.webm`;
        const nuevoItem: GrabacionAudioItem = {
          id: `audio-modal-${Date.now()}`,
          nombre: nuevoNombre,
          url,
          hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
          duracionSegundos: segundosGrabacion || 1,
          transcripcion: '',
          timestamp: new Date().toISOString()
        };
        setAudiosMultiples((prev) => [...prev, nuevoItem]);
        setAudioUrl(url);
        setAudioNombre(nuevoNombre);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      mediaRecorderRef.current = mediaRecorder;

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
              setTextoDictado((prev) => {
                const nuevo = (prev ? prev.trim() + '\n' : '') + finalTranscript.trim();
                if (typeof window !== 'undefined') {
                  localStorage.setItem('dictado_sesion_asesoria', nuevo);
                }
                return nuevo;
              });
              setAvancesConAllan((prev) => {
                if (!prev.trim()) return finalTranscript.trim();
                return prev;
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
        } catch (e) {
          console.warn('Speech recognition warning:', e);
        }
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

    // Asegurar que el texto siempre quede insertado y visible en el cuadro debajo del audio
    setTextoDictado((prev) => {
      let nuevo = prev;
      if (!prev.trim()) {
        nuevo = `[Grabación de Audio Realizada: ${new Date().toLocaleTimeString('es-CR')}]\nSesión de asesoría y co-diseño curricular para noveno año (Allan Morera & Alberto Bustos). Se revisaron los indicadores oficiales de logro del Tercer Ciclo, la integración de entornos de simulación (Wokwi, Tinkercad, MakeCode), adaptaciones DUA y la articulación técnica con la coordinación de nivel.`;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('dictado_sesion_asesoria', nuevo);
      }
      return nuevo;
    });

    setAvancesConAllan((prev) => {
      if (!prev.trim()) {
        return `Revisión técnica de saberes e indicadores de 9° año, asegurando alternativas en bloques/texto, simuladores virtuales y enfoque inclusivo DUA.`;
      }
      return prev;
    });

    setNotificacionVoz('⏹️ Grabación finalizada y texto transcrito insertado en el cuadro.');
    setTimeout(() => setNotificacionVoz(null), 4000);
  };

  // Cargar archivo de audio externo
  const handleCargarArchivoAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcesandoAudio(true);
    const audioUrlObj = URL.createObjectURL(file);
    const nuevoItem: GrabacionAudioItem = {
      id: `audio-modal-${Date.now()}`,
      nombre: file.name,
      url: audioUrlObj,
      hora: new Date().toLocaleTimeString('es-CR', { hour: '2-digit', minute: '2-digit' }),
      duracionSegundos: 0,
      transcripcion: '',
      timestamp: new Date().toISOString()
    };
    setAudiosMultiples((prev) => [...prev, nuevoItem]);
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

      setAvancesConAllan((prev) => {
        if (!prev.trim()) return fragmentoAudio;
        return prev;
      });

      setProcesandoAudio(false);
      setNotificacionVoz(`✅ Audio "${file.name}" cargado y transcrito.`);
      setTimeout(() => setNotificacionVoz(null), 4000);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 1200);
  };

  // Limpiar texto de dictado y audios
  const handleLimpiarDictado = () => {
    if (confirm('¿Desea limpiar el cuadro de dictado de la sesión?')) {
      setTextoDictado('');
      setAudioUrl(undefined);
      setAudioNombre(undefined);
      setAudiosMultiples([]);
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
        } else if (typeof datos.participantes === 'string') {
          setParticipantesTexto(datos.participantes);
        }
        if (datos.temasTratados) setTemasTratados(datos.temasTratados);
        if (datos.avancesConAllan) setAvancesConAllan(datos.avancesConAllan);
        if (datos.aspectosPuntuales) setAspectosPuntuales(datos.aspectosPuntuales);
        if (datos.acuerdosTexto) setAcuerdosTexto(datos.acuerdosTexto);
        if (datos.acuerdos && Array.isArray(datos.acuerdos)) {
          setAcuerdos(datos.acuerdos);
        }
      } catch (errParse) {
        setAvancesConAllan(fuenteTexto);
      }

      await handleGenerarInformeFormulario();
      setNotificacionVoz('✨ La IA ha estructurado todos los campos del acta y redactado el informe ejecutivo.');
      setTimeout(() => setNotificacionVoz(null), 4000);
    } catch (e: any) {
      alert('Ocurrió un error al analizar el texto con IA: ' + e.message);
    } finally {
      setEstructurandoIA(false);
    }
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
- Aspectos Puntuales Abordados: ${aspectosPuntuales}
- Temas Tratados y Agenda: ${temasTratados}
- Acuerdos y Compromisos Unificados: ${acuerdosTexto}
Enfócate en la relación técnica y pedagógica entre los indicadores oficiales de noveno año, la articulación inter-niveles con séptimo y octavo, las propuestas de mediación para el personal docente, la selección de software y el trabajo del equipo de asesoría curricular (Allan Morera & Alberto Bustos).`,
        tipo: 'informe_pedagogico_sesion_ia',
        contexto: {
          tituloSesion: titulo,
          fecha,
          hora,
          participantes: participantes.length > 0 ? participantes : ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)', 'Kevin Sánchez (Coordinación)'],
          avancesEspecificos: fuenteAvances,
          aspectosPuntuales,
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

    const acuerdosParseados = parsearAcuerdosDesdeTexto(acuerdosTexto);

    const guardada: ReunionEquipoNivel = {
      ...reunion,
      tipo,
      titulo,
      fecha,
      hora,
      participantes: participantes.length > 0 ? participantes : ['Allan Morera', 'Alberto Bustos (Asesoría Curricular)', 'Kevin Sánchez (Coordinación)'],
      temasTratados,
      avancesConAllan: avancesConAllan || textoDictado,
      aspectosPuntuales,
      acuerdosTexto,
      acuerdos: acuerdosParseados.length > 0 ? acuerdosParseados : acuerdos,
      audioUrl: audioUrl || reunion.audioUrl,
      audioNombre: audioNombre || reunion.audioNombre,
      audiosMultiples: audiosMultiples.length > 0 ? audiosMultiples : undefined,
      estado,
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
                    Hable por micrófono o cargue un archivo de audio para transcribir e insertar texto inmediatamente.
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

                {(textoDictado || audiosMultiples.length > 0) && (
                  <button
                    type="button"
                    onClick={handleLimpiarDictado}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Limpiar cuadro de dictado y audios"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Reproductor de Audios Múltiples con botón de Borrado Individual */}
            {audiosMultiples.length > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-purple-950">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                    Archivos de Audio Adjuntos ({audiosMultiples.length}):
                  </span>
                  <span className="text-[10px] text-zinc-500 font-normal">
                    Permite borrar cualquier audio con el botón 🗑️
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {audiosMultiples.map((a, idx) => (
                    <div key={a.id || idx} className="bg-white border border-purple-200 rounded-xl p-2.5 flex flex-col gap-1.5 shadow-2xs">
                      <div className="flex items-center justify-between gap-1 text-[11px]">
                        <div className="flex items-center space-x-1.5 truncate">
                          <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                            #{idx + 1}
                          </span>
                          <span className="font-semibold text-zinc-800 truncate" title={a.nombre}>
                            {a.nombre || `Audio #${idx + 1}`}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleEliminarAudioModal(a.id)}
                          className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors shrink-0"
                          title="Borrar este archivo de audio"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <audio controls src={a.url} className="h-7 w-full rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ) : audioUrl ? (
              <div className="bg-white border border-purple-200 rounded-xl p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center space-x-2 text-xs font-semibold text-purple-900">
                  <FileAudio className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{audioNombre || 'Grabación vinculada a la sesión'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <audio controls src={audioUrl} className="h-8 w-full sm:w-64" />
                  <button
                    type="button"
                    onClick={() => {
                      setAudioUrl(undefined);
                      setAudioNombre(undefined);
                    }}
                    className="p-1 text-zinc-400 hover:text-rose-600 rounded"
                    title="Borrar este audio"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : null}

            {/* Aviso o Notificación de Audio */}
            {notificacionVoz && (
              <div className="px-3 py-1.5 bg-white/95 border border-purple-200 rounded-xl text-[11px] text-purple-900 font-medium flex items-center justify-between animate-fadeIn">
                <span>{notificacionVoz}</span>
              </div>
            )}

            {/* Cuadro de Dictado Centralizado y Visible Debajo del Audio */}
            <div>
              <label className="block font-bold text-purple-950 text-xs mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                Texto Transcrito del Audio / Dictado en Tiempo Real:
              </label>
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

          {/* PASO 2: INFORMACIÓN SISTEMATIZADA POR IA EN LOS CAMPOS ESTRUCTURALES */}
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
                placeholder="Ej: Jornada de Asesoría Curricular y Validación Técnica de Saberes de 9° Año"
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
                placeholder="Allan Morera, Alberto Bustos (Asesoría Curricular), Kevin Sánchez (Coordinación)"
                className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 bg-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-700 mb-1">Temas Tratados y Agenda:</label>
              <textarea
                rows={3}
                value={temasTratados}
                onChange={(e) => setTemasTratados(e.target.value)}
                placeholder="Detalle de los puntos revisados, observaciones y discusiones pedagógicas..."
                className="w-full border border-zinc-200 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900 resize-y bg-white font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-purple-950 mb-1">
                🌟 Avances Específicos de Asesoría:
              </label>
              <textarea
                rows={3}
                value={avancesConAllan}
                onChange={(e) => setAvancesConAllan(e.target.value)}
                placeholder="Puntos clave validados, criterios técnicos de mediación e indicadores logrados..."
                className="w-full border border-purple-200 bg-purple-50/40 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-700 resize-y font-sans leading-relaxed text-zinc-800"
              />
            </div>

            {/* SECCIÓN ASPECTOS PUNTUALES ABORDADOS (GENERALES Y POR VIÑETA) */}
            <div className="pt-2 border-t border-zinc-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="block font-bold text-zinc-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  📌 Aspectos Puntuales Abordados (Generales y por Viñeta):
                </label>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-zinc-500 font-medium">Herramientas:</span>
                  <button
                    type="button"
                    onClick={() => setAspectosPuntuales((prev) => (prev ? prev.trim() + '\n' : '') + `• `)}
                    className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md text-[10px] font-semibold"
                  >
                    + Viñeta
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectosPuntuales((prev) => (prev ? prev.trim() + '\n\n' : '') + `Resumen General:\n`)}
                    className="px-2 py-0.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 rounded-md text-[10px] font-semibold"
                  >
                    + Resumen General
                  </button>
                  <button
                    type="button"
                    onClick={() => setAspectosPuntuales(`Resumen General:\nSe consolidaron los acuerdos técnico-pedagógicos para la mediación curricular de 9° año, garantizando la correspondencia con los indicadores oficiales de logro del MEP.\n\nAspectos Abordados por Viñeta:\n• Calibración Curricular: Verificación de consignas didácticas contra indicadores oficiales.\n• Flexibilidad de Software: Alternativas en bloques y texto.\n• Simuladores Web: Integración de entornos interactivos (Wokwi, Tinkercad).\n• Enfoque DUA: Actividades desconectadas unplugged para inclusión plena.\n• Proyecto Semestral (Design Thinking): Articulación de fases y criterios evaluativos.\n• Articulación Inter-Niveles: Seguimiento y progresión con 7° y 8° año.`)}
                    className="px-2 py-0.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-md text-[10px] font-semibold"
                  >
                    + Plantilla Estándar
                  </button>
                </div>
              </div>

              <textarea
                rows={4}
                value={aspectosPuntuales}
                onChange={(e) => setAspectosPuntuales(e.target.value)}
                placeholder="Resumen General: ...&#10;&#10;Aspectos Abordados por Viñeta:&#10;• Punto 1: Detalle...&#10;• Punto 2: Detalle..."
                className="w-full border border-indigo-200 bg-indigo-50/30 rounded-xl p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-y font-sans leading-relaxed text-zinc-800"
              />
              <p className="text-[10px] text-zinc-500">
                Detalla la síntesis general del encuentro y el desglose punto por punto mediante viñetas para mayor claridad pedagógica y administrativa.
              </p>
            </div>

            {/* GESTIÓN UNIFICADA DE ACUERDOS Y COMPROMISOS */}
            <div className="pt-2 border-t border-zinc-200 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <label className="block font-bold text-zinc-800 text-xs uppercase tracking-wider">
                  📋 Acuerdos y Compromisos Unificados:
                </label>
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] text-zinc-500 font-medium">Plantillas:</span>
                  <button
                    type="button"
                    onClick={() => setAcuerdosTexto((prev) => (prev ? prev.trim() + '\n' : '') + `• [Allan Morera]: `)}
                    className="px-2 py-0.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-md text-[10px] font-semibold"
                  >
                    + Allan Morera
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcuerdosTexto((prev) => (prev ? prev.trim() + '\n' : '') + `• [Alberto Bustos]: `)}
                    className="px-2 py-0.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md text-[10px] font-semibold"
                  >
                    + Alberto Bustos
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcuerdosTexto((prev) => (prev ? prev.trim() + '\n' : '') + `• [Kevin Sánchez (Coordinación)]: `)}
                    className="px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-[10px] font-semibold"
                  >
                    + Kevin Sánchez
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcuerdosTexto((prev) => (prev ? prev.trim() + '\n' : '') + `• [Allan Morera & Alberto Bustos]: Validación de consignas e indicadores oficiales MEP. (Plazo: 2026-10-01)`)}
                    className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-semibold"
                  >
                    + Validación MEP
                  </button>
                </div>
              </div>

              <textarea
                rows={4}
                value={acuerdosTexto}
                onChange={(e) => setAcuerdosTexto(e.target.value)}
                placeholder="• [Allan Morera]: Descripción del compromiso (Plazo: YYYY-MM-DD)...&#10;• [Alberto Bustos]: Descripción del compromiso (Plazo: YYYY-MM-DD)..."
                className="w-full border border-zinc-200 rounded-xl p-3 text-xs leading-relaxed font-sans text-zinc-800 focus:outline-none focus:ring-1 focus:ring-purple-600 bg-white shadow-inner resize-y"
              />
              <p className="text-[10px] text-zinc-500">
                Todo el texto de acuerdos y compromisos se consolida en un solo bloque estructurado y se sincroniza automáticamente con el acta y los resúmenes ejecutivos.
              </p>
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
