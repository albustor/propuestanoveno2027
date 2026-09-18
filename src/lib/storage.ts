import { PlaneamientoGlobalNoveno, SemanaPlaneamiento, RegistroSistematizacion, WebAppRecurso, EstrategiaMetodologicaIndicador } from '../types';
import { EQUIPO_NOVENO_INFO } from '../data/sistematizacionData';
import { WEBAPPS_NOVENO_CATALOGO } from '../data/webappsNovenoData';
import { syncSistematizacionWithDB, syncNotaWithDB, deleteSistematizacionFromDBAPI } from './db-client';

const KEY_SISTEMATIZACION = 'mep_noveno_sistematizacion_2026';
const KEY_WEBAPPS_CUSTOM = 'mep_noveno_webapps_custom_2026';
const KEY_ESTRATEGIAS_CUSTOM = 'mep_noveno_estrategias_custom_2026';

export const getSistematizacionLocal = (): typeof EQUIPO_NOVENO_INFO => {
  if (typeof window === 'undefined') return EQUIPO_NOVENO_INFO;
  try {
    const raw = localStorage.getItem(KEY_SISTEMATIZACION);
    if (!raw) {
      localStorage.setItem(KEY_SISTEMATIZACION, JSON.stringify(EQUIPO_NOVENO_INFO));
      return EQUIPO_NOVENO_INFO;
    }
    return JSON.parse(raw);
  } catch (e) {
    return EQUIPO_NOVENO_INFO;
  }
};

export const saveSistematizacionLocal = (info: typeof EQUIPO_NOVENO_INFO): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY_SISTEMATIZACION, JSON.stringify(info));
};

export const getAllWebappsStorage = (): Record<string, WebAppRecurso[]> => {
  if (typeof window === 'undefined') return WEBAPPS_NOVENO_CATALOGO;
  try {
    const raw = localStorage.getItem(KEY_WEBAPPS_CUSTOM);
    if (!raw) {
      return WEBAPPS_NOVENO_CATALOGO;
    }
    const custom = JSON.parse(raw);
    return { ...WEBAPPS_NOVENO_CATALOGO, ...custom };
  } catch (e) {
    return WEBAPPS_NOVENO_CATALOGO;
  }
};

export const getWebappsForSaber = (saberId: string): WebAppRecurso[] => {
  const all = getAllWebappsStorage();
  return all[saberId] || WEBAPPS_NOVENO_CATALOGO[saberId] || [];
};

export const saveWebappForSaber = (saberId: string, webapp: WebAppRecurso): WebAppRecurso[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllWebappsStorage();
    const currentList = all[saberId] || WEBAPPS_NOVENO_CATALOGO[saberId] || [];
    
    // Check if updating existing
    const existingIndex = currentList.findIndex(w => w.id === webapp.id);
    let updatedList: WebAppRecurso[];
    if (existingIndex >= 0) {
      updatedList = [...currentList];
      updatedList[existingIndex] = webapp;
    } else {
      updatedList = [...currentList, webapp];
    }

    const raw = localStorage.getItem(KEY_WEBAPPS_CUSTOM);
    const customObj = raw ? JSON.parse(raw) : {};
    customObj[saberId] = updatedList;
    localStorage.setItem(KEY_WEBAPPS_CUSTOM, JSON.stringify(customObj));
    return updatedList;
  } catch (e) {
    return [];
  }
};

export const deleteWebappForSaber = (saberId: string, webappId: string): WebAppRecurso[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllWebappsStorage();
    const currentList = all[saberId] || WEBAPPS_NOVENO_CATALOGO[saberId] || [];
    const updatedList = currentList.filter(w => w.id !== webappId);

    const raw = localStorage.getItem(KEY_WEBAPPS_CUSTOM);
    const customObj = raw ? JSON.parse(raw) : {};
    customObj[saberId] = updatedList;
    localStorage.setItem(KEY_WEBAPPS_CUSTOM, JSON.stringify(customObj));
    return updatedList;
  } catch (e) {
    return [];
  }
};

export const resetWebappsForSaber = (saberId: string): WebAppRecurso[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_WEBAPPS_CUSTOM);
    if (raw) {
      const customObj = JSON.parse(raw);
      delete customObj[saberId];
      localStorage.setItem(KEY_WEBAPPS_CUSTOM, JSON.stringify(customObj));
    }
    return WEBAPPS_NOVENO_CATALOGO[saberId] || [];
  } catch (e) {
    return WEBAPPS_NOVENO_CATALOGO[saberId] || [];
  }
};

// -------------------------------------------------------------
// GESTIÓN DE MEDIACIÓN Y ESTRATEGIAS PERSONALIZADAS
// -------------------------------------------------------------
export const getAllCustomEstrategias = (): Record<string, EstrategiaMetodologicaIndicador> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY_ESTRATEGIAS_CUSTOM);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const getCustomEstrategiaForSaber = (
  saberId: string,
  fallback: EstrategiaMetodologicaIndicador
): { estrategia: EstrategiaMetodologicaIndicador; isCustom: boolean } => {
  if (typeof window === 'undefined') return { estrategia: fallback, isCustom: false };
  try {
    const all = getAllCustomEstrategias();
    if (all[saberId]) {
      return { estrategia: all[saberId], isCustom: true };
    }
    return { estrategia: fallback, isCustom: false };
  } catch (e) {
    return { estrategia: fallback, isCustom: false };
  }
};

export const saveCustomEstrategiaForSaber = (
  saberId: string,
  estrategia: EstrategiaMetodologicaIndicador
): void => {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllCustomEstrategias();
    all[saberId] = estrategia;
    localStorage.setItem(KEY_ESTRATEGIAS_CUSTOM, JSON.stringify(all));
  } catch (e) {
    console.error('Error saving custom estrategia', e);
  }
};

export const resetCustomEstrategiaForSaber = (
  saberId: string,
  fallback: EstrategiaMetodologicaIndicador
): EstrategiaMetodologicaIndicador => {
  if (typeof window === 'undefined') return fallback;
  try {
    const all = getAllCustomEstrategias();
    if (all[saberId]) {
      delete all[saberId];
      localStorage.setItem(KEY_ESTRATEGIAS_CUSTOM, JSON.stringify(all));
    }
    return fallback;
  } catch (e) {
    return fallback;
  }
};

// -------------------------------------------------------------
// GESTIÓN DE ANOTACIONES Y NOTAS PEDAGÓGICAS POR INDICADOR
// -------------------------------------------------------------
const KEY_NOTAS_SABERES = 'mep_noveno_notas_saberes_2026';
const KEY_ENTRADAS_DIARIAS = 'mep_noveno_entradas_diarias_2026';
const KEY_RESUMENES_DIARIOS_IA = 'mep_noveno_resumenes_diarios_ia_2026';

export const getAllNotasSaberes = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY_NOTAS_SABERES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const getNotaForSaber = (saberId: string): string => {
  const all = getAllNotasSaberes();
  return all[saberId] || '';
};

export const saveNotaForSaber = (saberId: string, nota: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const all = getAllNotasSaberes();
    if (!nota || nota.trim() === '') {
      delete all[saberId];
    } else {
      all[saberId] = nota;
    }
    localStorage.setItem(KEY_NOTAS_SABERES, JSON.stringify(all));
    syncNotaWithDB(saberId, nota).catch(() => {});
  } catch (e) {
    console.error('Error saving nota for saber', e);
  }
};

// -------------------------------------------------------------
// HISTORIAL DE ENTRADAS DIARIAS Y ACCIONES
// -------------------------------------------------------------
import { EntradaRegistroDiario, ResumenDiarioIA } from '../types';

export const getAllEntradasDiarias = (): EntradaRegistroDiario[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_ENTRADAS_DIARIAS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const getEntradasForSaber = (saberId: string): EntradaRegistroDiario[] => {
  const all = getAllEntradasDiarias();
  return all.filter((e) => e.saberId === saberId).sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));
};

export const getEntradasForFecha = (fecha: string): EntradaRegistroDiario[] => {
  const all = getAllEntradasDiarias();
  return all.filter((e) => e.fecha === fecha).sort((a, b) => b.hora.localeCompare(a.hora));
};

export const saveEntradaDiaria = (entrada: EntradaRegistroDiario): EntradaRegistroDiario[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllEntradasDiarias();
    const idx = all.findIndex((e) => e.id === entrada.id);
    let updated: EntradaRegistroDiario[];
    if (idx >= 0) {
      updated = [...all];
      updated[idx] = entrada;
    } else {
      updated = [entrada, ...all];
    }
    localStorage.setItem(KEY_ENTRADAS_DIARIAS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const deleteEntradaDiaria = (entradaId: string): EntradaRegistroDiario[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllEntradasDiarias();
    const updated = all.filter((e) => e.id !== entradaId);
    localStorage.setItem(KEY_ENTRADAS_DIARIAS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

// -------------------------------------------------------------
// RESÚMENES DIARIOS GENERADOS POR IA
// -------------------------------------------------------------
export const getAllResumenesDiariosIA = (): ResumenDiarioIA[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_RESUMENES_DIARIOS_IA);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const saveResumenDiarioIA = (resumen: ResumenDiarioIA): ResumenDiarioIA[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllResumenesDiariosIA();
    const idx = all.findIndex((r) => r.id === resumen.id);
    let updated: ResumenDiarioIA[];
    if (idx >= 0) {
      updated = [...all];
      updated[idx] = resumen;
    } else {
      updated = [resumen, ...all];
    }
    localStorage.setItem(KEY_RESUMENES_DIARIOS_IA, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

// -------------------------------------------------------------
// GESTIÓN DE DISTRIBUCIÓN Y CORRELACIÓN DE EVALUACIÓN
// (Trabajo Cotidiano, Tareas, Proyecto)
// -------------------------------------------------------------
import { MatrizEvaluacionNoveno, AsignacionIndicadorEvaluacion, CorrelacionIndicadores } from '../types';
import { DEFAULT_MATRIZ_EVALUACION } from '../data/evaluacionNovenoData';

const KEY_DISTRIBUCION_EVALUACION = 'mep_noveno_distribucion_evaluacion_2026';

export const getDistribucionEvaluacionLocal = (): MatrizEvaluacionNoveno => {
  if (typeof window === 'undefined') return DEFAULT_MATRIZ_EVALUACION;
  try {
    const raw = localStorage.getItem(KEY_DISTRIBUCION_EVALUACION);
    if (!raw) {
      localStorage.setItem(KEY_DISTRIBUCION_EVALUACION, JSON.stringify(DEFAULT_MATRIZ_EVALUACION));
      return DEFAULT_MATRIZ_EVALUACION;
    }
    const parsed = JSON.parse(raw);
    return {
      asignaciones: { ...DEFAULT_MATRIZ_EVALUACION.asignaciones, ...parsed.asignaciones },
      correlaciones: parsed.correlaciones || DEFAULT_MATRIZ_EVALUACION.correlaciones,
      ultimaActualizacion: parsed.ultimaActualizacion || new Date().toISOString()
    };
  } catch (e) {
    return DEFAULT_MATRIZ_EVALUACION;
  }
};

export const saveDistribucionEvaluacionLocal = (matriz: MatrizEvaluacionNoveno): void => {
  if (typeof window === 'undefined') return;
  try {
    const payload: MatrizEvaluacionNoveno = {
      ...matriz,
      ultimaActualizacion: new Date().toISOString()
    };
    localStorage.setItem(KEY_DISTRIBUCION_EVALUACION, JSON.stringify(payload));
  } catch (e) {
    console.error('Error saving distribucion evaluacion', e);
  }
};

export const updateAsignacionIndicadorLocal = (
  saberId: string,
  updates: Partial<AsignacionIndicadorEvaluacion>
): MatrizEvaluacionNoveno => {
  const current = getDistribucionEvaluacionLocal();
  if (current.asignaciones[saberId]) {
    current.asignaciones[saberId] = {
      ...current.asignaciones[saberId],
      ...updates
    };
  }
  saveDistribucionEvaluacionLocal(current);
  return current;
};

export const saveCorrelacionIndicadoresLocal = (
  correlacion: CorrelacionIndicadores
): MatrizEvaluacionNoveno => {
  const current = getDistribucionEvaluacionLocal();
  const idx = current.correlaciones.findIndex((c) => c.id === correlacion.id);
  if (idx >= 0) {
    current.correlaciones[idx] = correlacion;
  } else {
    current.correlaciones.unshift(correlacion);
  }
  saveDistribucionEvaluacionLocal(current);
  return current;
};

export const deleteCorrelacionIndicadoresLocal = (
  correlacionId: string
): MatrizEvaluacionNoveno => {
  const current = getDistribucionEvaluacionLocal();
  current.correlaciones = current.correlaciones.filter((c) => c.id !== correlacionId);
  Object.keys(current.asignaciones).forEach((key) => {
    if (current.asignaciones[key].correlacionId === correlacionId) {
      delete current.asignaciones[key].correlacionId;
    }
  });
  saveDistribucionEvaluacionLocal(current);
  return current;
};

export const resetDistribucionEvaluacionLocal = (): MatrizEvaluacionNoveno => {
  if (typeof window === 'undefined') return DEFAULT_MATRIZ_EVALUACION;
  try {
    localStorage.setItem(KEY_DISTRIBUCION_EVALUACION, JSON.stringify(DEFAULT_MATRIZ_EVALUACION));
    registrarEventoTelemetria(
      'EVALUACION',
      'DISTRIBUCION_RESTAURADA',
      'Se restauraron los valores oficiales recomendados de la matriz de evaluación MEP.'
    );
    return DEFAULT_MATRIZ_EVALUACION;
  } catch (e) {
    return DEFAULT_MATRIZ_EVALUACION;
  }
};

// -------------------------------------------------------------
// GESTIÓN DE REUNIONES DE COORDINACIÓN Y TRABAJO CON ALLAN
// -------------------------------------------------------------
import { ReunionEquipoNivel } from '../types';
import { REUNIONES_INICIALES_NOVENO } from '../data/reunionesNovenoData';
import { registrarEventoTelemetria } from './telemetry';

const KEY_REUNIONES_EQUIPO = 'mep_noveno_reuniones_equipo_2026';

export const getAllReunionesLocal = (): ReunionEquipoNivel[] => {
  if (typeof window === 'undefined') return REUNIONES_INICIALES_NOVENO;
  try {
    const raw = localStorage.getItem(KEY_REUNIONES_EQUIPO);
    if (!raw) {
      localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(REUNIONES_INICIALES_NOVENO));
      return REUNIONES_INICIALES_NOVENO;
    }
    const parsed: ReunionEquipoNivel[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(REUNIONES_INICIALES_NOVENO));
      return REUNIONES_INICIALES_NOVENO;
    }

    // Merge any missing initial meetings by ID
    const existingIds = new Set(parsed.map((r) => r.id));
    let hasNew = false;
    const merged = [...parsed];
    REUNIONES_INICIALES_NOVENO.forEach((initReunion) => {
      if (!existingIds.has(initReunion.id)) {
        merged.push(initReunion);
        hasNew = true;
      }
    });

    if (hasNew) {
      // Sort descending by date
      merged.sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
      localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(merged));
    }

    return merged;
  } catch (e) {
    return REUNIONES_INICIALES_NOVENO;
  }
};

export const saveReunionLocal = (reunion: ReunionEquipoNivel): ReunionEquipoNivel[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllReunionesLocal();
    const idx = all.findIndex((r) => r.id === reunion.id);
    let updated: ReunionEquipoNivel[];
    if (idx >= 0) {
      updated = [...all];
      updated[idx] = reunion;
    } else {
      updated = [reunion, ...all];
    }
    localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(updated));

    // Telemetría automática
    registrarEventoTelemetria(
      reunion.tipo === 'trabajo_allan' ? 'REUNIONES_ALLAN' : 'SISTEMATIZACION',
      reunion.tipo === 'trabajo_allan' ? 'SESION_ALLAN_GUARDADA' : 'REUNION_GUARDADA',
      `Se guardó la reunión/sesión: "${reunion.titulo}" (${reunion.tipo}) con ${reunion.acuerdos.length} acuerdos.`,
      { reunionId: reunion.id, tipo: reunion.tipo, fecha: reunion.fecha }
    );

    return updated;
  } catch (e) {
    return [];
  }
};

export const deleteReunionLocal = (reunionId: string): ReunionEquipoNivel[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllReunionesLocal();
    const found = all.find((r) => r.id === reunionId);
    const updated = all.filter((r) => r.id !== reunionId);
    localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(updated));

    if (found) {
      registrarEventoTelemetria(
        found.tipo === 'trabajo_allan' ? 'REUNIONES_ALLAN' : 'SISTEMATIZACION',
        'REUNION_ELIMINADA',
        `Se eliminó la reunión: "${found.titulo}"`,
        { reunionId }
      );
    }

    return updated;
  } catch (e) {
    return [];
  }
};

export const toggleAcuerdoReunionLocal = (
  reunionId: string,
  acuerdoId: string
): ReunionEquipoNivel[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllReunionesLocal();
    const reunion = all.find((r) => r.id === reunionId);
    if (reunion) {
      const acuerdo = reunion.acuerdos.find((a) => a.id === acuerdoId);
      if (acuerdo) {
        acuerdo.completado = !acuerdo.completado;
        localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(all));

        registrarEventoTelemetria(
          'REUNIONES_ALLAN',
          'ACUERDO_ESTADO_CAMBIADO',
          `Acuerdo "${acuerdo.acuerdo.substring(0, 40)}..." marcado como ${acuerdo.completado ? 'COMPLETADO' : 'PENDIENTE'}.`,
          { reunionId, acuerdoId, completado: acuerdo.completado }
        );
      }
    }
    return all;
  } catch (e) {
    return [];
  }
};

export const deleteAudioFromReunionLocal = (
  reunionId: string,
  audioId: string
): ReunionEquipoNivel[] => {
  if (typeof window === 'undefined') return [];
  try {
    const all = getAllReunionesLocal();
    const reunion = all.find((r) => r.id === reunionId);
    if (reunion) {
      if (reunion.audiosMultiples) {
        reunion.audiosMultiples = reunion.audiosMultiples.filter((a) => a.id !== audioId);
      }
      if (reunion.audiosMultiples && reunion.audiosMultiples.length === 0) {
        reunion.audioUrl = undefined;
        reunion.audioNombre = undefined;
      }
      localStorage.setItem(KEY_REUNIONES_EQUIPO, JSON.stringify(all));
      registrarEventoTelemetria(
        'REUNIONES_ALLAN',
        'AUDIO_ELIMINADO',
        `Se eliminó un audio del acta "${reunion.titulo}".`,
        { reunionId, audioId }
      );
    }
    return all;
  } catch (e) {
    return [];
  }
};

// -------------------------------------------------------------
// SEGUIMIENTO DE SABERES PROCEDIMENTALES Y ACTITUDINALES (MEP 2026)
// -------------------------------------------------------------
const KEY_SEGUIMIENTO_SABERES = 'mep_noveno_seguimiento_saberes_2026';

export const getMapaSeguimientoSaberesLocal = (): Record<string, Record<string, 'trabajado' | 'en_proceso' | 'pendiente' | 'descartado'>> => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(KEY_SEGUIMIENTO_SABERES);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
};

export const saveEstadoSaberLocal = (
  saberCurricularId: string,
  saberId: string,
  estado: 'trabajado' | 'en_proceso' | 'pendiente' | 'descartado'
): Record<string, Record<string, 'trabajado' | 'en_proceso' | 'pendiente' | 'descartado'>> => {
  if (typeof window === 'undefined') return {};
  try {
    const mapa = getMapaSeguimientoSaberesLocal();
    if (!mapa[saberCurricularId]) {
      mapa[saberCurricularId] = {};
    }
    mapa[saberCurricularId][saberId] = estado;
    localStorage.setItem(KEY_SEGUIMIENTO_SABERES, JSON.stringify(mapa));

    registrarEventoTelemetria(
      'NOTAS_INDICADOR',
      'ESTADO_SABER_ACTUALIZADO',
      `Saber "${saberId}" en "${saberCurricularId}" actualizado a estado ${estado.toUpperCase()}.`,
      { saberCurricularId, saberId, estado }
    );

    // Disparar evento para reactividad entre componentes
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('seguimiento_saberes_actualizado', { detail: { saberCurricularId, saberId, estado } }));
    }

    return mapa;
  } catch (e) {
    return {};
  }
};
