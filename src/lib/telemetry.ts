import { EventoTelemetria, ModuloTelemetria } from '../types';

const KEY_TELEMETRIA = 'mep_noveno_telemetria_eventos_2026';
const MAX_EVENTOS_TELEMETRIA = 500;

export const getHistorialTelemetria = (): EventoTelemetria[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY_TELEMETRIA);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
};

export const registrarEventoTelemetria = (
  modulo: ModuloTelemetria,
  accion: string,
  descripcion: string,
  detalles?: Record<string, any>,
  usuario: string = 'Allan Morera & Alberto Bustos'
): EventoTelemetria => {
  const ahora = new Date();
  const evento: EventoTelemetria = {
    id: `telemetria-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: ahora.toISOString(),
    fechaHoraLegible: ahora.toLocaleDateString('es-CR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    modulo,
    accion,
    descripcion,
    usuario,
    detalles
  };

  if (typeof window !== 'undefined') {
    try {
      const historial = getHistorialTelemetria();
      const nuevoHistorial = [evento, ...historial].slice(0, MAX_EVENTOS_TELEMETRIA);
      localStorage.setItem(KEY_TELEMETRIA, JSON.stringify(nuevoHistorial));
      
      // Dispatch custom browser event for live listeners
      window.dispatchEvent(new CustomEvent('telemetria_actualizada', { detail: evento }));
    } catch (e) {
      console.warn('No se pudo persistir evento de telemetría', e);
    }
  }

  return evento;
};

export const limpiarHistorialTelemetria = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY_TELEMETRIA);
  window.dispatchEvent(new CustomEvent('telemetria_actualizada', { detail: null }));
};

export const exportarTelemetriaJSON = (): string => {
  const historial = getHistorialTelemetria();
  return JSON.stringify(historial, null, 2);
};

export const exportarTelemetriaMarkdown = (): string => {
  const historial = getHistorialTelemetria();
  let md = `# Registro de Telemetría y Auditoría de Acciones (9° Año MEP)\n\n`;
  md += `*Fecha de Exportación:* ${new Date().toLocaleDateString('es-CR')} ${new Date().toLocaleTimeString('es-CR')}\n`;
  md += `*Total de Eventos Registrados:* ${historial.length}\n\n`;
  md += `| Fecha y Hora | Módulo | Acción | Descripción | Usuario |\n`;
  md += `| :--- | :--- | :--- | :--- | :--- |\n`;

  historial.forEach((e) => {
    md += `| ${e.fechaHoraLegible} | ${e.modulo} | ${e.accion} | ${e.descripcion.replace(/\|/g, '-')} | ${e.usuario} |\n`;
  });

  return md;
};
