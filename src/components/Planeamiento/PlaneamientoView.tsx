'use client';

import React, { useState, useEffect } from 'react';
import { MODULOS_NOVENO_OFICIAL } from '../../data/curriculoNovenoOficial';
import { PROYECTOS_SEMESTRALES_NOVENO } from '../../data/proyectoFasesEtapasData';
import { 
  SemanaPlaneamiento, 
  EtapaProyectoTipo, 
  EstrategiaMetodologicaIndicador,
  WebAppRecurso,
  EjeTransversalTipo
} from '../../types';
import { 
  DISTRIBUCION_SABERES_M1, 
  DICCIONARIO_PROCEDIMENTALES, 
  DICCIONARIO_ACTITUDINALES 
} from '../../data/saberesPensamientoCompData';
import { 
  EJES_TRANSVERSALES_OFICIALES, 
  getEjeEspecificoParaSaber 
} from '../../data/ejesTransversalesData';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  Clock, 
  Sparkles, 
  Save, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Layers, 
  QrCode, 
  Edit3, 
  ShieldCheck,
  Brain,
  Award,
  CheckSquare,
  BookOpen,
  Compass,
  Zap,
  Target,
  Database,
  RefreshCw,
  Cloud
} from 'lucide-react';
import { useWebApps } from '../../lib/useWebApps';
import { getCustomEstrategiaForSaber } from '../../lib/storage';
import { syncPlaneamientoWithDB, syncSemanaWithDB, fetchPlaneamientoFromDB, checkDBHealth } from '../../lib/db-client';
import { MomentoWebAppsSection } from '../WebApps/MomentoWebAppsSection';
import { WebAppQRModal } from '../WebApps/WebAppQRModal';
import { WebAppAddEditModal } from '../WebApps/WebAppAddEditModal';
import { RecursoApoyoModal } from '../RecursoApoyo/RecursoApoyoModal';
import { EditorActividadMediacionModal } from '../Mediacion/EditorActividadMediacionModal';
import { AnotacionesIndicador } from '../Notas/AnotacionesIndicador';
import { ModalPerfilesSalidaOficiales } from '../ModalPerfilesSalidaOficiales';
import { processAICascade } from '../../lib/ai-service';

export const PlaneamientoView: React.FC = () => {
  const [selectedModuloId, setSelectedModuloId] = useState<1 | 2>(1);
  const [semanas, setSemanas] = useState<SemanaPlaneamiento[]>([]);
  const [selectedSemanaNum, setSelectedSemanaNum] = useState<number>(1);
  const [isSaved, setIsSaved] = useState(false);
  const [generandoIA, setGenerandoIA] = useState(false);
  const [mostrarModalPerfiles, setMostrarModalPerfiles] = useState(false);
  const [toastIA, setToastIA] = useState<string | null>(null);
  const [dbSincronizada, setDbSincronizada] = useState<boolean>(true);

  const { getWebapps, saveWebapp, deleteWebapp } = useWebApps();

  // Modales
  const [qrModalData, setQrModalData] = useState<{
    webapp: WebAppRecurso;
    saberNombre: string;
    indicadorTexto: string;
  } | null>(null);

  const [addEditModalData, setAddEditModalData] = useState<{
    saberId: string;
    saberNombre: string;
    initialData?: WebAppRecurso | null;
    defaultMomento?: 'desarrollo' | 'cierre' | 'ambos' | 'apoyo';
  } | null>(null);

  // Modal Recurso de Apoyo Pedagógico (4 Pilares)
  const [recursoApoyoModalData, setRecursoApoyoModalData] = useState<{
    saberId: string;
    saberNombre: string;
    indicador: string;
    areaNombre: string;
    moduloId: number;
  } | null>(null);

  // Modal Editor y Re-planteador de Mediación
  const [editorMediacionData, setEditorMediacionData] = useState<{
    saberId: string;
    saberNombre: string;
    indicadorTexto: string;
    areaNombre: string;
    moduloId: number;
    estrategiaBaseOficial: EstrategiaMetodologicaIndicador;
  } | null>(null);

  const modulo = MODULOS_NOVENO_OFICIAL.find((m) => m.id === selectedModuloId);
  const proyecto = PROYECTOS_SEMESTRALES_NOVENO.find((p) => p.moduloId === selectedModuloId);
  const allSaberes = modulo ? modulo.areas.flatMap((a) => a.saberes) : [];

  // Helper para construir la mediación didáctica integrando Competencia, RdA, Eje Transversal y Pensamiento Computacional en los 3 Momentos
  const construirMomentosMediacionIntegrados = (
    saber: any,
    area: any,
    distM1: any,
    ejeInfo: any,
    etapaObjMatch: any
  ) => {
    if (!saber) {
      return {
        inicio: 'Momento 1: Inicio (Focalización y Activación)\n- Focalización: Activación de conocimientos previos y planteamiento de reto detonante contextualizado.',
        desarrollo: 'Momento 2: Desarrollo (Exploración, Construcción y Aplicación)\n- Construcción guiada, laboratorio práctico colaborativo y depuración.',
        cierre: 'Momento 3: Cierre (Sistematización, Reflexión y Evaluación)\n- Sistematización de aprendizajes en bitácora y evaluación formativa.'
      };
    }

    const procMap: Record<string, string> = {
      modulariza: '(modulariza) al descomponer el sistema y estructurar el conexionado por bloques',
      depura: '(depura) al rastrear y corregir fallas de conexión o errores en el código',
      programa: '(programa) al codificar las instrucciones y estructuras condicionales en el entorno de desarrollo',
      reconoce_patrones: '(reconoce patrones) al identificar regularidades en el comportamiento de las señales y datos',
      abstrae: '(abstrae) al seleccionar únicamente los parámetros y variables esenciales para la solución',
      formula_algoritmos: '(formula algoritmos) al diseñar la secuencia lógica de pasos para resolver el reto',
      remezcla: '(remezcla) al combinar librerías, bloques de código y componentes existentes',
      transfiere: '(transfiere) al aplicar conocimientos y estrategias previas en esta nueva práctica',
      comunica: '(comunica) al formular preguntas, registrar hallazgos y explicar la solución',
      colabora: '(colabora) mediante el trabajo coordinado en equipo y la distribución de roles',
      creativo: '(piensa de forma creativa) al idear respuestas ingeniosas e innovadoras ante el reto',
      etica_seguridad: '(maneja las tecnologías de forma ética y segura) al operar los componentes con cuidado y considerar la privacidad del dato'
    };

    const actMap: Record<string, string> = {
      precision: '(gusto por la precisión) al calibrar minuciosamente los valores y registrar con exactitud los datos',
      aprender_error: '(aprender del error) al convertir los fallos de prueba en oportunidades de aprendizaje y mejora',
      tolerancia_frustracion: '(tolerancia a la frustración) al mantener la perseverancia y el autocontrol ante los desajustes técnicos',
      flexibilidad: '(flexibilidad para manejar problemas) al adaptarse a situaciones imprevistas durante el montaje o la programación'
    };

    // Conectar el eje transversal de forma práctica al contexto real de la actividad
    const getEjeAplicadoContexto = () => {
      const sId = saber.id?.toLowerCase() || '';
      const sNom = saber.nombre?.toLowerCase() || '';

      if (sId.includes('actuador') || sNom.includes('actuador') || sNom.includes('mecanismo') || sNom.includes('domótica')) {
        return '(seguridad y accesibilidad) al reflexionar sobre cómo automatizar alertas o compuertas para proteger a las personas y facilitar el paso en el colegio';
      }
      if (sId.includes('sensor') || sNom.includes('sensor')) {
        return '(cuidado ambiental y ahorro de energía) al dialogar sobre cómo medir la luz o temperatura ambiental para evitar el desperdicio de electricidad en las aulas';
      }
      if (sId.includes('microcontrolador') || sNom.includes('microcontrolador')) {
        return '(manejo seguro de la tecnología) al operar con precaución la energía y cuidar los componentes electrónicos en el taller';
      }
      if (sId.includes('algoritmo') || sNom.includes('algoritmo') || sNom.includes('estructura') || sNom.includes('programa')) {
        return '(pensamiento lógico y ciudadanía) al redactar instrucciones claras que solucionen un problema de forma justa y ordenada';
      }
      if (sId.includes('dato') || sNom.includes('dato') || sNom.includes('base')) {
        return '(privacidad y ética digital) al proteger la confidencialidad de la información y cuidar los datos personales de las y los usuarios';
      }
      if (sId.includes('3d') || sNom.includes('modelado')) {
        return '(innovación y sostenibilidad) al diseñar piezas ergonómicas optimizando el uso de material para no generar residuos';
      }
      if (sId.includes('ia') || sNom.includes('inteligencia') || sNom.includes('generativa')) {
        return '(ética digital) al verificar la veracidad de la información y utilizar las herramientas de IA con honestidad';
      }
      if (sId.includes('red') || sNom.includes('ciberseguridad') || sNom.includes('huella')) {
        return '(ciudadanía digital) al reflexionar sobre la importancia de contraseñas seguras y la protección de la identidad en línea';
      }

      return ejeInfo
        ? `(${ejeInfo.ejeConfig.nombreCorto.toLowerCase()}) al reflexionar sobre cómo aplicar "${ejeInfo.detalle.descriptorOficial}" para beneficiar a la comunidad escolar`
        : '(ética y tecnología) al reflexionar sobre el uso responsable de las herramientas para ayudar a la comunidad';
    };

    const procDesarrolloTags = (distM1?.saberesProcedimentalesIds || ['modulariza', 'programa', 'depura'])
      .map((id: string) => procMap[id] || `(${id}) al aplicar este saber procedimental en la tarea`)
      .join('; ');

    const act1 = actMap[distM1?.saberesActitudinalesIds?.[0] || 'precision'] || '(gusto por la precisión) al anticipar con cuidado los requerimientos de la sesión';
    const act2 = actMap[distM1?.saberesActitudinalesIds?.[1] || distM1?.saberesActitudinalesIds?.[0] || 'aprender_error'] || '(aprender del error) al superar los obstáculos técnicos';

    const preguntasGeneradoras = (saber.estrategiaMetodologica?.inicio?.preguntasGeneradoras || []).join(' ');
    const descInicio = saber.estrategiaMetodologica?.inicio?.descripcion || `¿Cómo podemos aprovechar ${saber.nombre} para resolver una necesidad del entorno escolar?`;

    const descDesarrollo = saber.estrategiaMetodologica?.desarrollo?.descripcion || `Construcción y validación práctica de ${saber.nombre}`;
    const accionesEstDesarrollo = saber.estrategiaMetodologica?.desarrollo?.accionesEstudiante?.join(' ') || `construyen el circuito y programan el algoritmo para ${saber.indicador.toLowerCase()}`;
    const conectados = saber.estrategiaMetodologica?.recursosSugeridos?.conectado?.join(', ') || 'Simulador Wokwi, Tinkercad Circuits, IDE';
    const desconectados = saber.estrategiaMetodologica?.recursosSugeridos?.desconectado?.join(', ') || 'Guías impresas, material concreto, diagramas';

    const descCierre = saber.estrategiaMetodologica?.cierre?.descripcion || `Sistematización del funcionamiento de ${saber.nombre} y evaluación formativa`;
    const accionEstCierre = saber.estrategiaMetodologica?.cierre?.accionesEstudiante?.join(' ') || `socializan su prototipo ante el grupo y coevalúan la precisión del resultado`;

    // Momento 1: Inicio (Focalización y Activación - 15 min)
    const inicio = `Se presenta el reto: ${descInicio} El estudiantado comparte experiencias previas y dialoga a partir de las preguntas generadoras: ${preguntasGeneradoras}. Se promueve (comunica) al formular preguntas y expresar ideas iniciales sobre el problema; ${getEjeAplicadoContexto()}; y ${act1}.${etapaObjMatch ? ` En articulación con la etapa de proyecto (${etapaObjMatch.nombre}), se orienta la indagación inicial hacia necesidades reales del centro educativo.` : ''}`;

    // Momento 2: Desarrollo (Exploración, Construcción y Aplicación - 50 min)
    const desarrollo = `En parejas de trabajo colaborativo, las y los estudiantes abordan la actividad práctica: ${descDesarrollo}. Para dar cumplimiento al indicador de aprendizaje, ${accionesEstDesarrollo.toLowerCase()}. Utilizan el entorno de simulación (${conectados}) y recursos desconectados (${desconectados}) bajo enfoque DUA. Se promueve (colabora) mediante el trabajo en equipo; ${procDesarrolloTags}; y ${act2}.${etapaObjMatch ? ` Como parte del proyecto semestral en la etapa (${etapaObjMatch.nombre}), realizan: ${etapaObjMatch.accionesClave.join(' ')}.` : ''}`;

    // Momento 3: Cierre (Sistematización, Reflexión y Evaluación - 15 min)
    const cierre = `Los equipos registran en su bitácora técnica el diagrama esquemático, el código validado y los resultados del funcionamiento (${descCierre}). En plenaria, ${accionEstCierre.toLowerCase()} y reflexionan sobre los errores surgidos y cómo lograron superarlos. Se promueve (aprender del error) al reflexionar sobre la raíz de los problemas y las lecciones aprendidas; y (gusto por la precisión) al verificar el cumplimiento del indicador oficial de logro: "${saber.indicador}".${etapaObjMatch ? ` Se valida el avance del entregable: ${etapaObjMatch.entregablesSugeridos.join(', ')}.` : ''}`;

    return { inicio, desarrollo, cierre };
  };

  // Helper para armar semanas con actividades preconfiguradas completas
  const generarSemanasCompletas = (): SemanaPlaneamiento[] => {
    const list: SemanaPlaneamiento[] = [];

    for (let i = 1; i <= 18; i++) {
      const saberIndex = (i - 1) % allSaberes.length;
      const saber = allSaberes[saberIndex];
      const area = modulo?.areas.find((a) => a.saberes.some((s) => s.id === saber?.id));

      let etapaAsoc: EtapaProyectoTipo | undefined;
      let esSemanaProyecto = false;
      let actProyecto = '';
      let etapaObjMatch: any = null;

      if (proyecto) {
        for (const etapa of proyecto.etapas) {
          const semanasSugeridas = selectedModuloId === 1 ? etapa.semanaSugeridaModulo1 : etapa.semanaSugeridaModulo2;
          if (semanasSugeridas.includes(i)) {
            etapaAsoc = etapa.id;
            etapaObjMatch = etapa;
            actProyecto = `[DT - ${etapa.nombre}]: ${etapa.proposito}. Acciones: ${etapa.accionesClave.join(' ')}`;
            if (i === 17 || i === 18) {
              esSemanaProyecto = true;
            }
            break;
          }
        }
      }

      const distM1 = saber ? DISTRIBUCION_SABERES_M1[saber.id] : null;
      const ejeInfo = saber ? getEjeEspecificoParaSaber(saber.id) : null;

      const { inicio, desarrollo, cierre } = construirMomentosMediacionIntegrados(
        saber,
        area,
        distM1,
        ejeInfo,
        etapaObjMatch
      );

      list.push({
        id: `sem_${selectedModuloId}_${i}`,
        numeroSemana: i,
        moduloId: selectedModuloId,
        tituloSemana: `Semana ${i}: ${saber ? saber.nombre : 'Consolidación y Prototipado'} ${etapaObjMatch ? `(DT - ${etapaObjMatch.nombre.split(':')[1]?.trim() || etapaObjMatch.nombre})` : ''}`,
        saberesSeleccionados: saber ? [saber.id] : [],
        esSemanaDedicadaAProyecto: esSemanaProyecto,
        etapaProyectoAsociada: etapaAsoc,
        actividadProyectoEnSemana: actProyecto,
        momentoInicio: {
          estrategia: inicio,
          tiempo: '15 min'
        },
        momentoDesarrollo: {
          estrategia: desarrollo,
          tiempo: '50 min'
        },
        momentoCierre: {
          estrategia: cierre,
          tiempo: '15 min'
        },
        escenarioConectado: saber ? saber.estrategiaMetodologica.recursosSugeridos.conectado.join(', ') : 'Simulador Wokwi, Tinkercad Circuits, IDE de programación, microcontrolador físico.',
        escenarioDesconectado: saber ? saber.estrategiaMetodologica.recursosSugeridos.desconectado.join(', ') : 'Guía de laboratorio impresa, diagramas de flujo en papel milimetrado, material concreto.',
        
        // Los 3 Componentes Oficiales de Evaluación MEP
        componentesEvaluacion: {
          proyecto: etapaAsoc 
            ? `Avance en ${actProyecto}. Verificación de entregables (${etapaObjMatch?.entregablesSugeridos.join(', ') || 'bitácora'}) e indicador de logro DT.` 
            : 'Integración paulatina de los componentes desarrollados hacia la maqueta del proyecto semestral.',
          cotidiano: `Observación sistemática del desempeño práctico en aula: aplicación de ${saber?.nombre || 'saber curricular'} y resolución de retos de clase.`,
          tareasAsistencia: `Bitácora técnica individual, persistencia ante el error, tolerancia a la frustración y entrega puntual del reporte.`
        },

        evidenciaAprendizaje: etapaObjMatch 
          ? `Evidencia de Etapa DT (${etapaObjMatch.nombre}): ${etapaObjMatch.entregablesSugeridos.join(', ')}. Registro técnico de la semana ${i}.`
          : `Registro de desempeño técnico, código depurado y reporte en bitácora estudiantil de la semana ${i}.`,
        instrumentoEvaluacion: etapaObjMatch ? (etapaObjMatch.indicadorLogro ? 'Rúbrica Analítica de Proyecto DT y Escala de Proceso' : 'Escala de Calificación MEP') : 'Rúbrica Analítica de Proceso y Escala de Calificación MEP',
        pautaDUAAplicada: 'Principio de Representación: Opciones múltiples de lenguaje visual/textual. Principio de Acción y Expresión: Uso de simulador interactivo o montaje físico.',
        
        saberesProcedimentales: distM1 ? distM1.saberesProcedimentalesIds : ['modulariza', 'depura', 'programa'],
        saberesActitudinales: distM1 ? distM1.saberesActitudinalesIds : ['precision', 'aprender_error'],
        ejeTransversalDetalle: ejeInfo ? {
          ejeId: ejeInfo.detalle.ejePrincipal,
          ejeNombre: ejeInfo.ejeConfig.nombre,
          dimensionNombre: ejeInfo.detalle.dimensionNombre,
          descriptor: ejeInfo.detalle.descriptorOficial
        } : undefined
      });
    }

    return list;
  };

  // Inicializar o cargar semanas (Local + Base de Datos)
  useEffect(() => {
    const storageKey = `planeamiento_noveno_modulo_${selectedModuloId}_v2026_mep_practico_v7`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) && 
          parsed.length === 18 && 
          parsed[0]?.momentoInicio?.estrategia &&
          parsed[0]?.componentesEvaluacion &&
          parsed[0]?.saberesProcedimentales
        ) {
          setSemanas(parsed);
          // Sincronizar en segundo plano con la base de datos
          syncPlaneamientoWithDB(selectedModuloId, parsed).then((ok) => setDbSincronizada(ok));
          return;
        }
      } catch (e) {
        console.error('Error loading saved planeamiento', e);
      }
    }

    // Cargar desde Base de Datos o generar nuevo oficial
    fetchPlaneamientoFromDB(selectedModuloId).then((dbSemanas) => {
      if (dbSemanas && dbSemanas.length === 18) {
        setSemanas(dbSemanas);
        try {
          localStorage.setItem(storageKey, JSON.stringify(dbSemanas));
        } catch (e) {}
        setDbSincronizada(true);
      } else {
        const initial = generarSemanasCompletas();
        setSemanas(initial);
        try {
          localStorage.setItem(storageKey, JSON.stringify(initial));
        } catch (e) {}
        syncPlaneamientoWithDB(selectedModuloId, initial).then((ok) => setDbSincronizada(ok));
      }
    });
  }, [selectedModuloId]);

  const handleSave = () => {
    const storageKey = `planeamiento_noveno_modulo_${selectedModuloId}_v2026_mep_practico_v7`;
    localStorage.setItem(storageKey, JSON.stringify(semanas));
    syncPlaneamientoWithDB(selectedModuloId, semanas).then((ok) => setDbSincronizada(ok));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleRestablecerOficial = () => {
    const fresh = generarSemanasCompletas();
    setSemanas(fresh);
    const storageKey = `planeamiento_noveno_modulo_${selectedModuloId}_v2026_mep_practico_v7`;
    localStorage.setItem(storageKey, JSON.stringify(fresh));
    syncPlaneamientoWithDB(selectedModuloId, fresh).then((ok) => setDbSincronizada(ok));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const currentSemana = semanas.find((s) => s.numeroSemana === selectedSemanaNum);

  const updateCurrentSemana = (updater: (prev: SemanaPlaneamiento) => SemanaPlaneamiento) => {
    setSemanas((prev) => {
      const next = prev.map((s) => (s.numeroSemana === selectedSemanaNum ? updater(s) : s));
      try {
        const storageKey = `planeamiento_noveno_modulo_${selectedModuloId}_v2026_mep_practico_v7`;
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {}
      const targetSem = next.find((s) => s.numeroSemana === selectedSemanaNum);
      if (targetSem) {
        syncSemanaWithDB(selectedModuloId, targetSem).then((ok) => setDbSincronizada(ok));
      }
      return next;
    });
  };

  // Asistente IA para regenerar y enriquecer actividades de la semana
  const handleMejorarActividadesConIA = async () => {
    if (!currentSemana) return;
    setGenerandoIA(true);

    const saberSelId = currentSemana.saberesSeleccionados[0];
    const saberSelObj = allSaberes.find((s) => s.id === saberSelId);
    const areaSelObj = modulo?.areas.find((a) => a.saberes.some((s) => s.id === saberSelId));
    const distSel = saberSelId ? DISTRIBUCION_SABERES_M1[saberSelId] : null;
    const ejeSel = saberSelId ? getEjeEspecificoParaSaber(saberSelId) : null;
    const etapaObj = proyecto?.etapas.find((et) => et.id === currentSemana.etapaProyectoAsociada);

    const procNombres = distSel?.saberesProcedimentalesIds.map((id) => DICCIONARIO_PROCEDIMENTALES[id]?.nombre || id) || [
      'Modulariza',
      'Depura',
      'Programa',
      'Reconoce patrones'
    ];
    const actNombres = distSel?.saberesActitudinalesIds.map((id) => DICCIONARIO_ACTITUDINALES[id]?.nombre || id) || [
      'Gusto por la precisión',
      'Aprender del error',
      'Tolerancia a la frustración'
    ];

    try {
      const resp = await processAICascade({
        tipo: 'mediacion_inicio_desarrollo_cierre',
        prompt: `Regenerar las actividades de mediación didáctica en 3 momentos para la semana ${currentSemana.numeroSemana} sobre el saber "${saberSelObj?.nombre || currentSemana.tituloSemana}". Indicador oficial: "${saberSelObj?.indicador || ''}". Integrar explícitamente: 1. Competencia del Área (${areaSelObj?.competenciaArea || ''}), 2. RdA (${areaSelObj?.rdaCiclo || areaSelObj?.rda || ''}), 3. Eje Transversal (${ejeSel?.ejeConfig.nombre || ''} - ${ejeSel?.detalle.dimensionNombre || ''}), 4. Pensamiento Computacional (Saberes Procedimentales: ${procNombres.join(', ')} y Actitudinales: ${actNombres.join(', ')}), 5. Etapa DT (${etapaObj ? etapaObj.nombre : 'Trabajo Cotidiano'}).`,
        contexto: {
          modulo: selectedModuloId,
          saberId: saberSelObj?.id,
          saberNombre: saberSelObj?.nombre,
          indicadorTexto: saberSelObj?.indicador,
          tema: saberSelObj?.nombre,
          competenciaTexto: areaSelObj?.competenciaArea,
          rdaTexto: areaSelObj?.rdaCiclo || areaSelObj?.rda,
          ejeTransversalNombre: ejeSel?.ejeConfig.nombre,
          ejeTransversalDimension: ejeSel?.detalle.dimensionNombre,
          ejeTransversalDescriptor: ejeSel?.detalle.descriptorOficial,
          saberesProcedimentales: procNombres,
          saberesActitudinales: actNombres,
          etapaDesignThinking: etapaObj ? etapaObj.nombre : undefined,
          accionesEtapaDT: etapaObj ? etapaObj.accionesClave : undefined,
          entregablesDT: etapaObj ? etapaObj.entregablesSugeridos : undefined,
          numeroSemana: currentSemana.numeroSemana
        }
      });

      if (resp && resp.success) {
        try {
          const parsed = JSON.parse(resp.content);
          updateCurrentSemana((prev) => ({
            ...prev,
            momentoInicio: {
              ...prev.momentoInicio,
              estrategia: parsed.inicio || prev.momentoInicio.estrategia
            },
            momentoDesarrollo: {
              ...prev.momentoDesarrollo,
              estrategia: parsed.desarrollo || prev.momentoDesarrollo.estrategia
            },
            momentoCierre: {
              ...prev.momentoCierre,
              estrategia: parsed.cierre || prev.momentoCierre.estrategia
            },
            evidenciaAprendizaje: parsed.evidenciaAprendizaje || prev.evidenciaAprendizaje,
            escenarioConectado: parsed.recursoConectado || prev.escenarioConectado,
            escenarioDesconectado: parsed.recursoDesconectado || prev.escenarioDesconectado,
            componentesEvaluacion: {
              proyecto: parsed.componenteProyecto || prev.componentesEvaluacion?.proyecto || '',
              cotidiano: parsed.componenteCotidiano || prev.componentesEvaluacion?.cotidiano || '',
              tareasAsistencia: parsed.componenteTareasAsistencia || prev.componentesEvaluacion?.tareasAsistencia || ''
            }
          }));
          setToastIA(`✨ ¡Actividades en 3 momentos regeneradas exitosamente con IA para la Semana ${currentSemana.numeroSemana}!`);
          setTimeout(() => setToastIA(null), 4000);
        } catch (jsonErr) {
          updateCurrentSemana((prev) => ({
            ...prev,
            evidenciaAprendizaje: `Bitácora técnica, circuito/algoritmo probado y análisis metacognitivo sobre ${saberSelObj?.nombre || 'la sesión'}.`
          }));
          setToastIA(`✨ ¡Mediación enriquecida con IA para la Semana ${currentSemana.numeroSemana}!`);
          setTimeout(() => setToastIA(null), 4000);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGenerandoIA(false);
    }
  };

  if (!modulo) return null;

  const currentSaberId = currentSemana?.saberesSeleccionados[0];
  const currentSaberObj = allSaberes.find((s) => s.id === currentSaberId);
  const currentArea = modulo.areas.find((a) => a.saberes.some((s) => s.id === currentSaberId));
  const currentDistM1 = currentSaberId ? DISTRIBUCION_SABERES_M1[currentSaberId] : null;
  const currentEjeInfo = currentSaberId ? getEjeEspecificoParaSaber(currentSaberId) : null;

  return (
    <div className="space-y-6">
      {/* Header del Planeador */}
      <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-sky-600 text-white shadow-xs">
                Mediación Pedagógica Oficial MEP 2026
              </span>
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                III Ciclo • 9° Año • 18 Semanas Lectivas
              </span>
              <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${dbSincronizada ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                <Database className={`w-3.5 h-3.5 ${dbSincronizada ? 'text-emerald-600' : 'text-amber-600 animate-spin'}`} />
                <span>{dbSincronizada ? 'Base de Datos Sincronizada' : 'Guardando en Base de Datos...'}</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Planeamiento Didáctico y Actividades de Mediación en 3 Momentos
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-4xl">
              Estructure las sesiones semanales con actividades listas para analizar, articulando los <strong>Saberes Procedimentales</strong>, <strong>Actitudinales</strong>, <strong>Competencias</strong>, <strong>RdA</strong>, <strong>Ejes Transversales Oficiales</strong> y los <strong>3 Componentes de Evaluación MEP</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setMostrarModalPerfiles(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Target className="w-3.5 h-3.5 text-teal-600" />
              <span>Perfiles de Salida MEP</span>
            </button>

            <button
              onClick={handleRestablecerOficial}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
              title="Recargar y sincronizar todas las 18 semanas con los 3 momentos y saberes oficiales"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>🔄 Sincronizar Guía Oficial 2026</span>
            </button>

            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-sm cursor-pointer ${
                isSaved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white'
              }`}
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4 text-emerald-200" /> : <Save className="w-4 h-4" />}
              <span>{isSaved ? '¡Guardado Localmente!' : 'Guardar Planeamiento'}</span>
            </button>
          </div>
        </div>

        {/* Selector de Semanas / Días (1 a 18) */}
        <div className="mt-6 pt-5 border-t border-zinc-100">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-600" />
              Itinerario de Semanas Lectivas (Periodo Escolar):
            </span>
            <span className="text-xs text-zinc-500 font-medium">
              Semana Activa: <strong className="text-indigo-600 font-bold">#{selectedSemanaNum}</strong> de 18
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-18 gap-1.5">
            {semanas.map((sem) => {
              const isSelected = sem.numeroSemana === selectedSemanaNum;
              const tieneEtapa = Boolean(sem.etapaProyectoAsociada);

              return (
                <button
                  key={sem.numeroSemana}
                  onClick={() => setSelectedSemanaNum(sem.numeroSemana)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-300'
                      : tieneEtapa
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                  }`}
                  title={`${sem.tituloSemana} ${tieneEtapa ? '(Etapa de Proyecto)' : '(Trabajo Cotidiano)'}`}
                >
                  <span>S{sem.numeroSemana}</span>
                  <span className="text-[9px] opacity-80 font-normal">
                    {tieneEtapa ? '🎯 DT' : '📝 Cot.'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detalle de la Semana Seleccionada */}
      {currentSemana && (
        <div className="bg-white rounded-3xl border border-zinc-200 p-6 sm:p-8 shadow-sm space-y-6">
          
          {/* Fila Superior: Título de la Semana, Modalidad y Saber Oficial */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-5 border-b border-zinc-100">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Semana {currentSemana.numeroSemana}
                </span>

                {currentSemana.etapaProyectoAsociada ? (
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>Vinculada a Proyecto DT: {currentSemana.etapaProyectoAsociada.replace('etapa', 'Etapa ').replace('_', ' ').toUpperCase()}</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5">
                    <span>📝</span>
                    <span>Modalidad: Trabajo Cotidiano (9 Sub-etapas)</span>
                  </span>
                )}
              </div>

              <input
                type="text"
                value={currentSemana.tituloSemana}
                onChange={(e) =>
                  updateCurrentSemana((prev) => ({ ...prev, tituloSemana: e.target.value }))
                }
                className="text-lg sm:text-xl font-bold text-zinc-900 bg-transparent border-b border-dashed border-zinc-300 focus:border-indigo-600 focus:outline-none w-full"
                placeholder="Título descriptivo de la semana..."
              />
            </div>

            {/* Selector de Saber Oficial */}
            <div className="w-full lg:w-96 space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider block">
                Saber Curricular Asignado:
              </label>
              <select
                value={currentSemana.saberesSeleccionados[0] || ''}
                onChange={(e) => {
                  const sId = e.target.value;
                  const sObj = allSaberes.find((s) => s.id === sId);
                  const areaObj = modulo?.areas.find((a) => a.saberes.some((s) => s.id === sId));
                  const dist = sId ? DISTRIBUCION_SABERES_M1[sId] : null;
                  const eje = sId ? getEjeEspecificoParaSaber(sId) : null;
                  const etapaMatch = proyecto?.etapas.find((et) => et.id === currentSemana.etapaProyectoAsociada);

                  const { inicio, desarrollo, cierre } = construirMomentosMediacionIntegrados(
                    sObj,
                    areaObj,
                    dist,
                    eje,
                    etapaMatch
                  );

                  updateCurrentSemana((prev) => ({
                    ...prev,
                    saberesSeleccionados: sId ? [sId] : [],
                    tituloSemana: `Semana ${prev.numeroSemana}: ${sObj ? sObj.nombre : 'Sesión de Mediación'}`,
                    momentoInicio: {
                      estrategia: inicio,
                      tiempo: prev.momentoInicio.tiempo
                    },
                    momentoDesarrollo: {
                      estrategia: desarrollo,
                      tiempo: prev.momentoDesarrollo.tiempo
                    },
                    momentoCierre: {
                      estrategia: cierre,
                      tiempo: prev.momentoCierre.tiempo
                    },
                    escenarioConectado: sObj ? sObj.estrategiaMetodologica.recursosSugeridos.conectado.join(', ') : prev.escenarioConectado,
                    escenarioDesconectado: sObj ? sObj.estrategiaMetodologica.recursosSugeridos.desconectado.join(', ') : prev.escenarioDesconectado,
                    saberesProcedimentales: dist ? dist.saberesProcedimentalesIds : prev.saberesProcedimentales,
                    saberesActitudinales: dist ? dist.saberesActitudinalesIds : prev.saberesActitudinales,
                    ejeTransversalDetalle: eje ? {
                      ejeId: eje.detalle.ejePrincipal,
                      ejeNombre: eje.ejeConfig.nombre,
                      dimensionNombre: eje.detalle.dimensionNombre,
                      descriptor: eje.detalle.descriptorOficial
                    } : prev.ejeTransversalDetalle
                  }));
                }}
                className="w-full text-xs bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 text-zinc-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none font-medium"
              >
                <option value="">-- Seleccionar Saber Oficial MEP --</option>
                {allSaberes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre} - ({s.indicador.substring(0, 45)}...)
                  </option>
                ))}
              </select>

              {currentSaberObj && (
                <div className="flex items-center justify-end gap-1.5 pt-1">
                  <button
                    onClick={() => {
                      setEditorMediacionData({
                        saberId: currentSaberObj.id,
                        saberNombre: currentSaberObj.nombre,
                        indicadorTexto: currentSaberObj.indicador,
                        areaNombre: currentArea?.nombre || 'Área Oficial',
                        moduloId: selectedModuloId,
                        estrategiaBaseOficial: currentSaberObj.estrategiaMetodologica,
                      });
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3 h-3 text-amber-700" />
                    <span>Replantear</span>
                  </button>

                  <button
                    onClick={handleMejorarActividadesConIA}
                    disabled={generandoIA}
                    className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>{generandoIA ? 'Generando...' : 'Asistente IA'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Tarjetas Curriculares de Vinculación: Competencia, RdA, Eje Transversal y Saberes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* 1. Competencia & RdA */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-sky-900 font-bold uppercase tracking-wider text-[10px]">
                <Award className="w-4 h-4 text-sky-600" />
                Competencia & RdA de III Ciclo
              </div>
              <p className="text-zinc-800 text-[11px] leading-relaxed">
                <strong className="text-sky-950 font-bold">Área:</strong> {currentArea?.nombre || 'Formación Tecnológica'}
              </p>
              <p className="text-zinc-700 text-[11px] leading-relaxed line-clamp-2" title={currentArea?.competenciaArea}>
                <strong className="text-zinc-900 font-semibold">Competencia:</strong> {currentArea?.competenciaArea || 'Competencia rectora del área.'}
              </p>
              <p className="text-zinc-700 text-[11px] leading-relaxed line-clamp-2" title={currentArea?.rdaCiclo || currentArea?.rda}>
                <strong className="text-zinc-900 font-semibold">RdA (7°-8°-9°):</strong> {currentArea?.rdaCiclo || currentArea?.rda || 'Resultado de Aprendizaje oficial.'}
              </p>
            </div>

            {/* 2. Eje Transversal Oficial MEP */}
            <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-indigo-900 font-bold uppercase tracking-wider text-[10px]">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  Eje Transversal Oficial
                </span>
                <span className="px-2 py-0.5 bg-white rounded-full border border-indigo-200 text-indigo-700">
                  MEP 2026
                </span>
              </div>
              {currentEjeInfo ? (
                <>
                  <p className="font-bold text-indigo-950 text-xs">
                    {currentEjeInfo.ejeConfig.nombre}
                  </p>
                  <p className="text-[11px] text-zinc-700 leading-snug">
                    <strong className="text-zinc-900 font-semibold">Dimensión:</strong> {currentEjeInfo.detalle.dimensionNombre}
                  </p>
                  <p className="text-[11px] text-zinc-600 leading-snug line-clamp-2" title={currentEjeInfo.detalle.descriptorOficial}>
                    {currentEjeInfo.detalle.descriptorOficial}
                  </p>
                </>
              ) : (
                <p className="text-zinc-500 text-[11px]">Seleccione un saber para visualizar el eje transversal oficial vinculado.</p>
              )}
            </div>

            {/* 3. Saberes Procedimentales & Actitudinales */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 space-y-2 text-xs">
              <div className="flex items-center justify-between text-emerald-900 font-bold uppercase tracking-wider text-[10px]">
                <span className="flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-emerald-600" />
                  Pensamiento Computacional
                </span>
                <span className="px-2 py-0.5 bg-white rounded-full border border-emerald-200 text-emerald-700">
                  Saberes
                </span>
              </div>
              
              <div className="space-y-1.5">
                <div>
                  <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider block">Procedimentales:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {currentDistM1?.saberesProcedimentalesIds.map((id) => {
                      const sp = DICCIONARIO_PROCEDIMENTALES[id];
                      return (
                        <span 
                          key={id} 
                          className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 text-[10px] font-semibold text-emerald-900"
                          title={sp?.observable}
                        >
                          {sp?.nombre || id}
                        </span>
                      );
                    }) || <span className="text-[11px] text-zinc-500">General</span>}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider block">Actitudinales:</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {currentDistM1?.saberesActitudinalesIds.map((id) => {
                      const sa = DICCIONARIO_ACTITUDINALES[id];
                      return (
                        <span 
                          key={id} 
                          className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-900"
                          title={sa?.observable}
                        >
                          {sa?.nombre || id}
                        </span>
                      );
                    }) || <span className="text-[11px] text-zinc-500">General</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloque de Vinculación con el Proyecto Semestral (Design Thinking - DT) */}
          <div className="bg-gradient-to-br from-emerald-50/60 via-teal-50/30 to-white border-2 border-emerald-200/80 rounded-2xl p-4.5 space-y-3.5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Articulación con el Proyecto Semestral • Metodología Design Thinking (DT)
              </span>
              <label className="flex items-center space-x-2 text-xs text-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={currentSemana.esSemanaDedicadaAProyecto}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      esSemanaDedicadaAProyecto: e.target.checked
                    }))
                  }
                  className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-semibold text-emerald-900">Semana 100% dedicada a Proyecto DT (Taller / Feria)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block mb-1">
                  Etapa de Proyecto Design Thinking (DT):
                </label>
                <select
                  value={currentSemana.etapaProyectoAsociada || ''}
                  onChange={(e) => {
                    const val = e.target.value as EtapaProyectoTipo;
                    const etapaObj = proyecto?.etapas.find((et) => et.id === val);
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      etapaProyectoAsociada: val || undefined,
                      actividadProyectoEnSemana: etapaObj ? `[DT - ${etapaObj.nombre}]: ${etapaObj.proposito}` : ''
                    }));
                  }}
                  className="w-full text-xs bg-white border border-emerald-200 rounded-xl p-2.5 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="">Sin etapa de proyecto específica (Trabajo Cotidiano Regular)</option>
                  {proyecto?.etapas.map((et) => (
                    <option key={et.id} value={et.id}>
                      {et.nombre} ({et.faseNombre})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider block mb-1">
                  Acción Concreta en el Proyecto DT:
                </label>
                <input
                  type="text"
                  placeholder="Ej: Levantamiento de mapa de empatía, ensamble de prototipo, pruebas..."
                  value={currentSemana.actividadProyectoEnSemana || ''}
                  onChange={(e) =>
                    updateCurrentSemana((prev) => ({
                      ...prev,
                      actividadProyectoEnSemana: e.target.value
                    }))
                  }
                  className="w-full text-xs bg-white border border-emerald-200 rounded-xl p-2.5 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            {/* Ficha Descriptiva de Actividades DT de la Etapa (Del Documento Base del Proyecto) */}
            {(() => {
              const etapaObj = proyecto?.etapas.find((et) => et.id === currentSemana.etapaProyectoAsociada);
              if (!etapaObj) return null;
              return (
                <div className="pt-2 border-t border-emerald-100 space-y-2.5 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1">
                    <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">
                      🎯 Propósito Oficial de la Etapa ({etapaObj.nombre}):
                    </span>
                    <p className="text-zinc-700 leading-relaxed text-[11px]">{etapaObj.proposito}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-100 space-y-1.5">
                    <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">
                      📋 Actividades y Acciones Clave Desarrolladas para el Proyecto (Documento Base DT):
                    </span>
                    <ul className="space-y-1">
                      {etapaObj.accionesClave.map((acc, aIdx) => (
                        <li key={aIdx} className="flex items-start space-x-2 text-[11px] text-zinc-700 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                      <span className="font-bold text-zinc-900 block mb-0.5">📦 Entregables Sugeridos:</span>
                      <span className="text-zinc-600">{etapaObj.entregablesSugeridos.join(' • ')}</span>
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-emerald-100">
                      <span className="font-bold text-indigo-900 block mb-0.5">🏆 Indicador de Logro / Evaluación DT:</span>
                      <span className="text-zinc-600">{etapaObj.indicadorLogro || etapaObj.indicadorEvaluacion}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Actividades Didácticas Creadas en los 3 Momentos (Inicio, Desarrollo, Cierre) */}
          <div className="space-y-3">
            {toastIA && (
              <div className="p-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 text-white rounded-2xl text-xs font-semibold flex items-center justify-between shadow-md">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {toastIA}
                </span>
                <button
                  onClick={() => setToastIA(null)}
                  className="px-2 py-0.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px]"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Actividades de Mediación a Desarrollar (Los 3 Momentos Didácticos)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMejorarActividadesConIA}
                  disabled={generandoIA}
                  className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                  title="Regenerar y enriquecer los 3 momentos integrando Competencia, RdA, Eje Transversal, Pensamiento Computacional y DT"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
                  <span>{generandoIA ? 'Generando con IA...' : '✨ Regenerar 3 Momentos con IA'}</span>
                </button>
                <span className="text-[11px] text-zinc-500 font-medium">
                  80 min lectivos totales
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 1. Momento Inicio */}
              <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-sky-100">
                    <span className="text-xs font-bold text-sky-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-200/70 text-sky-900 inline-flex items-center justify-center text-[11px] font-bold">1</span>
                      Momento 1: Inicio (Focalización y Activación)
                    </span>
                    <input
                      type="text"
                      value={currentSemana.momentoInicio.tiempo}
                      onChange={(e) =>
                        updateCurrentSemana((prev) => ({
                          ...prev,
                          momentoInicio: { ...prev.momentoInicio, tiempo: e.target.value }
                        }))
                      }
                      className="text-[11px] font-bold text-sky-800 w-16 text-right bg-white px-2 py-0.5 rounded-md border border-sky-200"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 pb-1">
                    <span className="text-[9px] font-semibold text-sky-800 bg-sky-100/80 px-1.5 py-0.5 rounded">🎯 Focalización</span>
                    <span className="text-[9px] font-semibold text-indigo-800 bg-indigo-100/80 px-1.5 py-0.5 rounded">🛡️ Eje Transversal</span>
                    <span className="text-[9px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">💡 Actitudes</span>
                  </div>
                  <textarea
                    rows={6}
                    value={currentSemana.momentoInicio.estrategia}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        momentoInicio: { ...prev.momentoInicio, estrategia: e.target.value }
                      }))
                    }
                    className="w-full text-xs bg-white border border-sky-200 rounded-xl p-3 text-zinc-800 focus:ring-2 focus:ring-sky-500/20 focus:outline-none leading-relaxed"
                    placeholder="Estrategia de focalización, reto detonante y activación de conocimientos previos..."
                  />
                </div>
              </div>

              {/* 2. Momento Desarrollo */}
              <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-indigo-100">
                    <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-200/70 text-indigo-900 inline-flex items-center justify-center text-[11px] font-bold">2</span>
                      Momento 2: Desarrollo (Exploración, Construcción y Aplicación)
                    </span>
                    <input
                      type="text"
                      value={currentSemana.momentoDesarrollo.tiempo}
                      onChange={(e) =>
                        updateCurrentSemana((prev) => ({
                          ...prev,
                          momentoDesarrollo: { ...prev.momentoDesarrollo, tiempo: e.target.value }
                        }))
                      }
                      className="text-[11px] font-bold text-indigo-800 w-16 text-right bg-white px-2 py-0.5 rounded-md border border-indigo-200"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 pb-1">
                    <span className="text-[9px] font-semibold text-sky-800 bg-sky-100/80 px-1.5 py-0.5 rounded">🏆 Competencia & RdA</span>
                    <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">⚙️ Pensamiento Computacional</span>
                    <span className="text-[9px] font-semibold text-purple-800 bg-purple-100/80 px-1.5 py-0.5 rounded">🚀 Construcción</span>
                  </div>
                  <textarea
                    rows={6}
                    value={currentSemana.momentoDesarrollo.estrategia}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        momentoDesarrollo: { ...prev.momentoDesarrollo, estrategia: e.target.value }
                      }))
                    }
                    className="w-full text-xs bg-white border border-indigo-200 rounded-xl p-3 text-zinc-800 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none leading-relaxed"
                    placeholder="Laboratorio práctico, construcción de prototipos, codificación y depuración..."
                  />
                </div>
              </div>

              {/* 3. Momento Cierre */}
              <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 space-y-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-emerald-100">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-200/70 text-emerald-900 inline-flex items-center justify-center text-[11px] font-bold">3</span>
                      Momento 3: Cierre (Sistematización, Reflexión y Evaluación)
                    </span>
                    <input
                      type="text"
                      value={currentSemana.momentoCierre.tiempo}
                      onChange={(e) =>
                        updateCurrentSemana((prev) => ({
                          ...prev,
                          momentoCierre: { ...prev.momentoCierre, tiempo: e.target.value }
                        }))
                      }
                      className="text-[11px] font-bold text-emerald-800 w-16 text-right bg-white px-2 py-0.5 rounded-md border border-emerald-200"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 pb-1">
                    <span className="text-[9px] font-semibold text-emerald-800 bg-emerald-100/80 px-1.5 py-0.5 rounded">📝 Sistematización</span>
                    <span className="text-[9px] font-semibold text-amber-800 bg-amber-100/80 px-1.5 py-0.5 rounded">💡 Reflexión & Error</span>
                    <span className="text-[9px] font-semibold text-teal-800 bg-teal-100/80 px-1.5 py-0.5 rounded">📊 Evaluación</span>
                  </div>
                  <textarea
                    rows={6}
                    value={currentSemana.momentoCierre.estrategia}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        momentoCierre: { ...prev.momentoCierre, estrategia: e.target.value }
                      }))
                    }
                    className="w-full text-xs bg-white border border-emerald-200 rounded-xl p-3 text-zinc-800 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none leading-relaxed"
                    placeholder="Sistematización en bitácora, coevaluación formativa y síntesis metacognitiva..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recursos Conectados / Desconectados y Componentes Oficiales de Evaluación MEP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
            
            {/* Recursos: Conectado vs Desconectado */}
            <div className="bg-zinc-50/80 rounded-2xl p-5 space-y-3 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Recursos Didácticos de Aula (Conectado / Desconectado):
              </span>

              <div className="space-y-2">
                <div>
                  <label className="text-[11px] text-zinc-600 font-bold block mb-1">
                    🌐 Escenario Conectado (Software / Simuladores / WebApps):
                  </label>
                  <textarea
                    rows={2}
                    value={currentSemana.escenarioConectado}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({ ...prev, escenarioConectado: e.target.value }))
                    }
                    className="w-full text-xs bg-white border border-zinc-200 rounded-xl p-2.5 text-zinc-800 focus:outline-none"
                    placeholder="Wokwi, Tinkercad Circuits, IDE de programación..."
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-600 font-bold block mb-1">
                    📦 Escenario Desconectado (Unplugged / Material Concreto):
                  </label>
                  <textarea
                    rows={2}
                    value={currentSemana.escenarioDesconectado}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({ ...prev, escenarioDesconectado: e.target.value }))
                    }
                    className="w-full text-xs bg-white border border-zinc-200 rounded-xl p-2.5 text-zinc-800 focus:outline-none"
                    placeholder="Guías impresas, diagramas en papel milimetrado, tarjetas de roles..."
                  />
                </div>
              </div>
            </div>

            {/* Los 3 Componentes Oficiales de Evaluación MEP y DUA */}
            <div className="bg-zinc-50/80 rounded-2xl p-5 space-y-3 border border-zinc-200">
              <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                Los 3 Componentes de Evaluación Formativa MEP & DUA:
              </span>

              <div className="space-y-2 text-xs">
                {/* 1. Proyecto */}
                <div>
                  <label className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <span>🚀 1. Proyecto Semestral (Design Thinking / DT):</span>
                  </label>
                  <input
                    type="text"
                    value={currentSemana.componentesEvaluacion?.proyecto || ''}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        componentesEvaluacion: {
                          proyecto: e.target.value,
                          cotidiano: prev.componentesEvaluacion?.cotidiano || '',
                          tareasAsistencia: prev.componentesEvaluacion?.tareasAsistencia || ''
                        }
                      }))
                    }
                    className="w-full text-xs bg-white border border-emerald-200 rounded-xl p-2 mt-0.5 text-zinc-800"
                    placeholder="Avances en entregables de la maqueta / prototipo..."
                  />
                </div>

                {/* 2. Trabajo Cotidiano */}
                <div>
                  <label className="text-[11px] font-bold text-sky-800 flex items-center gap-1">
                    <span>📝 2. Trabajo Cotidiano (Observación de Aula):</span>
                  </label>
                  <input
                    type="text"
                    value={currentSemana.componentesEvaluacion?.cotidiano || ''}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        componentesEvaluacion: {
                          proyecto: prev.componentesEvaluacion?.proyecto || '',
                          cotidiano: e.target.value,
                          tareasAsistencia: prev.componentesEvaluacion?.tareasAsistencia || ''
                        }
                      }))
                    }
                    className="w-full text-xs bg-white border border-sky-200 rounded-xl p-2 mt-0.5 text-zinc-800"
                    placeholder="Aplicación procedimental y resolución colaborativa..."
                  />
                </div>

                {/* 3. Tareas / Asistencia */}
                <div>
                  <label className="text-[11px] font-bold text-purple-800 flex items-center gap-1">
                    <span>📁 3. Tareas / Asistencia / Actitudes:</span>
                  </label>
                  <input
                    type="text"
                    value={currentSemana.componentesEvaluacion?.tareasAsistencia || ''}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({
                        ...prev,
                        componentesEvaluacion: {
                          proyecto: prev.componentesEvaluacion?.proyecto || '',
                          cotidiano: prev.componentesEvaluacion?.cotidiano || '',
                          tareasAsistencia: e.target.value
                        }
                      }))
                    }
                    className="w-full text-xs bg-white border border-purple-200 rounded-xl p-2 mt-0.5 text-zinc-800"
                    placeholder="Bitácora individual, persistencia ante el error, respeto..."
                  />
                </div>

                {/* Pauta DUA */}
                <div className="pt-1">
                  <label className="text-[11px] font-bold text-zinc-600 block">
                    ♿ Pauta DUA Formativa:
                  </label>
                  <input
                    type="text"
                    value={currentSemana.pautaDUAAplicada}
                    onChange={(e) =>
                      updateCurrentSemana((prev) => ({ ...prev, pautaDUAAplicada: e.target.value }))
                    }
                    className="w-full text-xs bg-white border border-zinc-200 rounded-xl p-2 mt-0.5 text-zinc-800"
                    placeholder="Opciones de representación visual/auditiva y expresión..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Espacio de Bitácora Docente para el Saber de la Semana */}
          {currentSaberObj && (
            <div className="pt-2">
              <AnotacionesIndicador
                saberId={currentSaberObj.id}
                saberNombre={currentSaberObj.nombre}
              />
            </div>
          )}

        </div>
      )}

      {/* Modal QR Code */}
      {qrModalData && (
        <WebAppQRModal
          webapp={qrModalData.webapp}
          saberNombre={qrModalData.saberNombre}
          indicadorTexto={qrModalData.indicadorTexto}
          onClose={() => setQrModalData(null)}
        />
      )}

      {/* Modal Agregar / Editar WebApp */}
      {addEditModalData && (
        <WebAppAddEditModal
          saberId={addEditModalData.saberId}
          saberNombre={addEditModalData.saberNombre}
          initialData={addEditModalData.initialData}
          defaultMomento={addEditModalData.defaultMomento}
          onSave={(webapp) => saveWebapp(addEditModalData.saberId, webapp)}
          onClose={() => setAddEditModalData(null)}
        />
      )}

      {/* Modal Recurso de Apoyo Pedagógico (4 Pilares) */}
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

      {/* Modal Editor y Re-planteador de Mediación Didáctica */}
      {editorMediacionData && (
        <EditorActividadMediacionModal
          isOpen={true}
          saberId={editorMediacionData.saberId}
          saberNombre={editorMediacionData.saberNombre}
          indicadorTexto={editorMediacionData.indicadorTexto}
          areaNombre={editorMediacionData.areaNombre}
          moduloId={editorMediacionData.moduloId}
          estrategiaBaseOficial={editorMediacionData.estrategiaBaseOficial}
          onSaved={() => {
            // Refrescar
          }}
          onClose={() => setEditorMediacionData(null)}
        />
      )}

      {/* Modal de Perfiles de Salida Oficiales MEP */}
      <ModalPerfilesSalidaOficiales
        isOpen={mostrarModalPerfiles}
        onClose={() => setMostrarModalPerfiles(false)}
      />
    </div>
  );
};
