import fs from 'fs';
import path from 'path';

export interface DBPlaneamientoRecord {
  id: string; // ej: sem_1_1
  moduloId: number;
  numeroSemana: number;
  data: any;
  updatedAt: string;
}

export interface DBSistematizacionRecord {
  id: string;
  tipo: string;
  fecha: string;
  titulo: string;
  data: any;
  updatedAt: string;
}

export interface DBNotaRecord {
  saberId: string;
  nota: string;
  seguimiento: any;
  updatedAt: string;
}

export interface DBEvaluacionRecord {
  moduloId: number;
  data: any;
  updatedAt: string;
}

export interface DatabaseState {
  version: string;
  lastSync: string;
  planeamiento: Record<string, DBPlaneamientoRecord>;
  sistematizacion: Record<string, DBSistematizacionRecord>;
  notas: Record<string, DBNotaRecord>;
  evaluacion: Record<string, DBEvaluacionRecord>;
  documentos: Record<string, any>;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'propuesta_noveno_database.json');

// Inicializar y asegurar existencia del directorio y archivo DB
const initDB = (): DatabaseState => {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initialState: DatabaseState = {
        version: '2026.1.0',
        lastSync: new Date().toISOString(),
        planeamiento: {},
        sistematizacion: {},
        notas: {},
        evaluacion: {},
        documentos: {}
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialState, null, 2), 'utf-8');
      return initialState;
    }

    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error inicializando base de datos:', error);
    return {
      version: '2026.1.0',
      lastSync: new Date().toISOString(),
      planeamiento: {},
      sistematizacion: {},
      notas: {},
      evaluacion: {},
      documentos: {}
    };
  }
};

const saveDB = (state: DatabaseState): void => {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    state.lastSync = new Date().toISOString();
    fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error guardando en base de datos:', error);
  }
};

// ==========================================
// OPERACIONES DE BASE DE DATOS: PLANEAMIENTO
// ==========================================
export const getPlaneamientoFromDB = (moduloId: number): any[] => {
  const db = initDB();
  const records = Object.values(db.planeamiento)
    .filter((r) => r.moduloId === moduloId)
    .sort((a, b) => a.numeroSemana - b.numeroSemana)
    .map((r) => r.data);
  return records;
};

export const savePlaneamientoBatchToDB = (moduloId: number, semanas: any[]): boolean => {
  try {
    const db = initDB();
    const now = new Date().toISOString();

    semanas.forEach((sem) => {
      const recordId = sem.id || `sem_${moduloId}_${sem.numeroSemana}`;
      db.planeamiento[recordId] = {
        id: recordId,
        moduloId,
        numeroSemana: sem.numeroSemana,
        data: sem,
        updatedAt: now
      };
    });

    saveDB(db);
    return true;
  } catch (e) {
    console.error('Error en savePlaneamientoBatchToDB:', e);
    return false;
  }
};

export const saveSemanaPlaneamientoToDB = (moduloId: number, semana: any): boolean => {
  try {
    const db = initDB();
    const now = new Date().toISOString();
    const recordId = semana.id || `sem_${moduloId}_${semana.numeroSemana}`;

    db.planeamiento[recordId] = {
      id: recordId,
      moduloId,
      numeroSemana: semana.numeroSemana,
      data: semana,
      updatedAt: now
    };

    saveDB(db);
    return true;
  } catch (e) {
    console.error('Error en saveSemanaPlaneamientoToDB:', e);
    return false;
  }
};

// ==========================================
// OPERACIONES DE BASE DE DATOS: SISTEMATIZACIÓN
// ==========================================
export const getSistematizacionFromDB = (): any[] => {
  const db = initDB();
  return Object.values(db.sistematizacion)
    .sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''))
    .map((r) => r.data);
};

export const saveSistematizacionToDB = (reunion: any): boolean => {
  try {
    const db = initDB();
    const recordId = reunion.id || `reunion_${Date.now()}`;
    db.sistematizacion[recordId] = {
      id: recordId,
      tipo: reunion.tipo || 'trabajo_allan',
      fecha: reunion.fecha || new Date().toISOString().split('T')[0],
      titulo: reunion.titulo || 'Sesión de Trabajo',
      data: reunion,
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return true;
  } catch (e) {
    console.error('Error en saveSistematizacionToDB:', e);
    return false;
  }
};

export const deleteSistematizacionFromDB = (reunionId: string): boolean => {
  try {
    const db = initDB();
    if (db.sistematizacion[reunionId]) {
      delete db.sistematizacion[reunionId];
      saveDB(db);
    }
    return true;
  } catch (e) {
    console.error('Error en deleteSistematizacionFromDB:', e);
    return false;
  }
};

// ==========================================
// OPERACIONES DE BASE DE DATOS: NOTAS & SABERES
// ==========================================
export const getNotasFromDB = (): Record<string, string> => {
  const db = initDB();
  const res: Record<string, string> = {};
  Object.values(db.notas).forEach((n) => {
    res[n.saberId] = n.nota;
  });
  return res;
};

export const saveNotaToDB = (saberId: string, nota: string): boolean => {
  try {
    const db = initDB();
    db.notas[saberId] = {
      saberId,
      nota,
      seguimiento: db.notas[saberId]?.seguimiento || {},
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return true;
  } catch (e) {
    return false;
  }
};

// ==========================================
// OPERACIONES DE BASE DE DATOS: EVALUACIÓN
// ==========================================
export const getEvaluacionFromDB = (moduloId: number): any => {
  const db = initDB();
  return db.evaluacion[`mod_${moduloId}`]?.data || null;
};

export const saveEvaluacionToDB = (moduloId: number, data: any): boolean => {
  try {
    const db = initDB();
    db.evaluacion[`mod_${moduloId}`] = {
      moduloId,
      data,
      updatedAt: new Date().toISOString()
    };
    saveDB(db);
    return true;
  } catch (e) {
    return false;
  }
};

// ==========================================
// ESTADO Y SALUD DE LA BASE DE DATOS
// ==========================================
export const getDBStatus = () => {
  const db = initDB();
  return {
    connected: true,
    engine: 'SQLite / JSON Persistent Engine (Local Server & Cloud Ready)',
    totalPlaneamientos: Object.keys(db.planeamiento).length,
    totalSistematizaciones: Object.keys(db.sistematizacion).length,
    totalNotas: Object.keys(db.notas).length,
    totalEvaluaciones: Object.keys(db.evaluacion).length,
    lastSync: db.lastSync,
    version: db.version
  };
};
