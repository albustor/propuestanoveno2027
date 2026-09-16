// Sistema de Almacenamiento Local de Archivos y Evidencias Digitales (IndexedDB + Telemetría)
import { ArchivoEvidencia, ComponenteEvaluacionTipo } from '../types';
import { registrarEventoTelemetria } from './telemetry';

const DB_NAME = 'NovenoEvidenciasDB';
const DB_VERSION = 1;
const STORE_NAME = 'archivos_evidencias';
const LOCALSTORAGE_BACKUP_KEY = 'noveno_archivos_evidencias_backup';

// Inicialización de IndexedDB
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      return reject(new Error('IndexedDB solo está disponible en el navegador'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('saberId', 'saberId', { unique: false });
        store.createIndex('componenteAsociado', 'componenteAsociado', { unique: false });
        store.createIndex('moduloId', 'moduloId', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const formatearTamanoBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Guardar archivo en IndexedDB
export const guardarArchivoEvidencia = async (archivo: ArchivoEvidencia): Promise<ArchivoEvidencia> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(archivo);

      request.onsuccess = () => {
        // Disparar evento personalizado para actualizar UI
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('evidencias_actualizadas'));
        }

        // Telemetría
        registrarEventoTelemetria(
          'RECURSOS_ARCHIVOS',
          'SUBIR_ARCHIVO_EVIDENCIA',
          `Se subió el archivo "${archivo.nombreArchivo}" (${archivo.tamanoFormateado}) asignado a ${archivo.componenteAsociado} para el saber "${archivo.saberNombre}".`,
          {
            saberId: archivo.saberId,
            componente: archivo.componenteAsociado,
            nombre: archivo.nombreArchivo,
            tamano: archivo.tamanoBytes
          }
        );

        resolve(archivo);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error al guardar en IndexedDB, usando respaldo en localStorage:', err);
    // Fallback ligero a localStorage
    if (typeof window !== 'undefined') {
      const current = getArchivosEvidenciasLocalStorage();
      const sinDuplicado = current.filter((a) => a.id !== archivo.id);
      localStorage.setItem(LOCALSTORAGE_BACKUP_KEY, JSON.stringify([archivo, ...sinDuplicado]));
      window.dispatchEvent(new CustomEvent('evidencias_actualizadas'));
    }
    return archivo;
  }
};

// Obtener todos los archivos de evidencias
export const getAllArchivosEvidencias = async (): Promise<ArchivoEvidencia[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const results: ArchivoEvidencia[] = request.result || [];
        resolve(results.sort((a, b) => new Date(b.fechaSubida).getTime() - new Date(a.fechaSubida).getTime()));
      };

      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    return getArchivosEvidenciasLocalStorage();
  }
};

// Eliminar archivo
export const eliminarArchivoEvidencia = async (id: string, nombreArchivo?: string): Promise<boolean> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('evidencias_actualizadas'));
        }

        registrarEventoTelemetria(
          'RECURSOS_ARCHIVOS',
          'ELIMINAR_ARCHIVO_EVIDENCIA',
          `Se eliminó el archivo de evidencia "${nombreArchivo || id}".`,
          { archivoId: id }
        );

        resolve(true);
      };

      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    if (typeof window !== 'undefined') {
      const current = getArchivosEvidenciasLocalStorage();
      const filtrados = current.filter((a) => a.id !== id);
      localStorage.setItem(LOCALSTORAGE_BACKUP_KEY, JSON.stringify(filtrados));
      window.dispatchEvent(new CustomEvent('evidencias_actualizadas'));
    }
    return true;
  }
};

// Descargar archivo al equipo local
export const descargarArchivoEvidencia = (archivo: ArchivoEvidencia) => {
  if (!archivo.dataUrl) {
    alert('El archivo no contiene datos legibles para descarga.');
    return;
  }

  const link = document.createElement('a');
  link.href = archivo.dataUrl;
  link.download = archivo.nombreArchivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  registrarEventoTelemetria(
    'RECURSOS_ARCHIVOS',
    'DESCARGAR_ARCHIVO_EVIDENCIA',
    `Descarga de archivo "${archivo.nombreArchivo}" (${archivo.tamanoFormateado}) desde la base de datos local.`,
    { id: archivo.id, saber: archivo.saberNombre }
  );
};

// Fallback Helper para localStorage
const getArchivosEvidenciasLocalStorage = (): ArchivoEvidencia[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(LOCALSTORAGE_BACKUP_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};
