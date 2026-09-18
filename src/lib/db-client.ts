/**
 * Client Database Synchronization Layer
 * Handles async sync between localStorage and the Next.js DB API
 */

export interface SyncStatus {
  connected: boolean;
  lastSync: string | null;
  error?: string;
}

export const syncPlaneamientoWithDB = async (moduloId: number, semanas: any[]): Promise<boolean> => {
  try {
    const res = await fetch('/api/db/planeamiento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduloId, semanas })
    });
    return res.ok;
  } catch (e) {
    console.warn('Sync planeamiento background warning:', e);
    return false;
  }
};

export const syncSemanaWithDB = async (moduloId: number, semana: any): Promise<boolean> => {
  try {
    const res = await fetch('/api/db/planeamiento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moduloId, semana })
    });
    return res.ok;
  } catch (e) {
    console.warn('Sync semana background warning:', e);
    return false;
  }
};

export const fetchPlaneamientoFromDB = async (moduloId: number): Promise<any[] | null> => {
  try {
    const res = await fetch(`/api/db/planeamiento?moduloId=${moduloId}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.semanas) && json.semanas.length === 18) {
        return json.semanas;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const syncSistematizacionWithDB = async (reunion: any): Promise<boolean> => {
  try {
    const res = await fetch('/api/db/sistematizacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reunion })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const fetchSistematizacionFromDB = async (): Promise<any[] | null> => {
  try {
    const res = await fetch('/api/db/sistematizacion');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const deleteSistematizacionFromDBAPI = async (id: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/db/sistematizacion?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const syncNotaWithDB = async (saberId: string, nota: string): Promise<boolean> => {
  try {
    const res = await fetch('/api/db/notas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ saberId, nota })
    });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const fetchNotasFromDB = async (): Promise<Record<string, string> | null> => {
  try {
    const res = await fetch('/api/db/notas');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.notas) {
        return json.notas;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const checkDBHealth = async (): Promise<any> => {
  try {
    const res = await fetch('/api/db/status');
    if (res.ok) {
      const json = await res.json();
      return json.status || null;
    }
    return null;
  } catch (e) {
    return null;
  }
};
