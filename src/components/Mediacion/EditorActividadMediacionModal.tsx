'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Save,
  RotateCcw,
  Copy,
  Check,
  Clock,
  BookOpen,
  Layers,
  HelpCircle,
  Wrench,
  HeartHandshake,
  Bot,
  Lightbulb,
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { EstrategiaMetodologicaIndicador, MomentoDidacticoDetalle } from '../../types';
import {
  getCustomEstrategiaForSaber,
  saveCustomEstrategiaForSaber,
  resetCustomEstrategiaForSaber
} from '../../lib/storage';

interface EditorActividadMediacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  saberId: string;
  saberNombre: string;
  indicadorTexto: string;
  areaNombre: string;
  moduloId: number;
  estrategiaBaseOficial: EstrategiaMetodologicaIndicador;
  onSaved?: (nuevaEstrategia: EstrategiaMetodologicaIndicador) => void;
}

type TabTipo = 'inicio' | 'desarrollo' | 'cierre' | 'recursos_dua' | 'ia_replan';

export const EditorActividadMediacionModal: React.FC<EditorActividadMediacionModalProps> = ({
  isOpen,
  onClose,
  saberId,
  saberNombre,
  indicadorTexto,
  areaNombre,
  moduloId,
  estrategiaBaseOficial,
  onSaved,
}) => {
  const [activeTab, setActiveTab] = useState<TabTipo>('inicio');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Estado editable de la Estrategia Metodológica
  const [estrategia, setEstrategia] = useState<EstrategiaMetodologicaIndicador>(estrategiaBaseOficial);

  // Estados locales en texto multilínea para facilitar la edición amigable
  const [inicioDocente, setInicioDocente] = useState('');
  const [inicioEstudiante, setInicioEstudiante] = useState('');
  const [inicioPreguntas, setInicioPreguntas] = useState('');

  const [desarrolloDocente, setDesarrolloDocente] = useState('');
  const [desarrolloEstudiante, setDesarrolloEstudiante] = useState('');
  const [desarrolloPracticas, setDesarrolloPracticas] = useState('');

  const [cierreDocente, setCierreDocente] = useState('');
  const [cierreEstudiante, setCierreEstudiante] = useState('');

  const [recursosConectado, setRecursosConectado] = useState('');
  const [recursosDesconectado, setRecursosDesconectado] = useState('');
  const [pautasDUACompromiso, setPautasDUACompromiso] = useState('');
  const [pautasDUARepresentacion, setPautasDUARepresentacion] = useState('');
  const [pautasDUAExpresion, setPautasDUAExpresion] = useState('');

  // Cargar estado inicial persistente
  useEffect(() => {
    if (isOpen) {
      const { estrategia: loaded, isCustom: custom } = getCustomEstrategiaForSaber(
        saberId,
        estrategiaBaseOficial
      );
      setEstrategia(loaded);
      setIsCustom(custom);

      // Sincronizar campos de texto
      setInicioDocente(loaded.inicio.accionesDocente.join('\n'));
      setInicioEstudiante(loaded.inicio.accionesEstudiante.join('\n'));
      setInicioPreguntas((loaded.inicio.preguntasGeneradoras || []).join('\n'));

      setDesarrolloDocente(loaded.desarrollo.accionesDocente.join('\n'));
      setDesarrolloEstudiante(loaded.desarrollo.accionesEstudiante.join('\n'));
      setDesarrolloPracticas(loaded.practicasComputacionales.join(', '));

      setCierreDocente(loaded.cierre.accionesDocente.join('\n'));
      setCierreEstudiante(loaded.cierre.accionesEstudiante.join('\n'));

      setRecursosConectado(loaded.recursosSugeridos.conectado.join(', '));
      setRecursosDesconectado(loaded.recursosSugeridos.desconectado.join(', '));

      const duaComp = loaded.pautasDUA.find((p) => p.principio === 'Compromiso')?.descripcion || '';
      const duaRep = loaded.pautasDUA.find((p) => p.principio === 'Representacion')?.descripcion || '';
      const duaExp = loaded.pautasDUA.find((p) => p.principio === 'Accion_Expresion')?.descripcion || '';
      setPautasDUACompromiso(duaComp);
      setPautasDUARepresentacion(duaRep);
      setPautasDUAExpresion(duaExp);
    }
  }, [isOpen, saberId, estrategiaBaseOficial]);

  if (!isOpen) return null;

  const buildEstrategiaFromInputs = (): EstrategiaMetodologicaIndicador => {
    return {
      ...estrategia,
      inicio: {
        ...estrategia.inicio,
        accionesDocente: inicioDocente.split('\n').map((s) => s.trim()).filter(Boolean),
        accionesEstudiante: inicioEstudiante.split('\n').map((s) => s.trim()).filter(Boolean),
        preguntasGeneradoras: inicioPreguntas.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      desarrollo: {
        ...estrategia.desarrollo,
        accionesDocente: desarrolloDocente.split('\n').map((s) => s.trim()).filter(Boolean),
        accionesEstudiante: desarrolloEstudiante.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      cierre: {
        ...estrategia.cierre,
        accionesDocente: cierreDocente.split('\n').map((s) => s.trim()).filter(Boolean),
        accionesEstudiante: cierreEstudiante.split('\n').map((s) => s.trim()).filter(Boolean),
      },
      practicasComputacionales: desarrolloPracticas.split(',').map((s) => s.trim()).filter(Boolean),
      recursosSugeridos: {
        conectado: recursosConectado.split(',').map((s) => s.trim()).filter(Boolean),
        desconectado: recursosDesconectado.split(',').map((s) => s.trim()).filter(Boolean),
      },
      pautasDUA: [
        { principio: 'Compromiso', descripcion: pautasDUACompromiso },
        { principio: 'Representacion', descripcion: pautasDUARepresentacion },
        { principio: 'Accion_Expresion', descripcion: pautasDUAExpresion },
      ],
    };
  };

  const handleSave = () => {
    const finalEstrategia = buildEstrategiaFromInputs();
    saveCustomEstrategiaForSaber(saberId, finalEstrategia);
    setIsCustom(true);
    setShowSavedToast(true);
    if (onSaved) onSaved(finalEstrategia);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleReset = () => {
    if (confirm('¿Deseas restaurar esta actividad de mediación a la versión oficial MEP original?')) {
      const reset = resetCustomEstrategiaForSaber(saberId, estrategiaBaseOficial);
      setEstrategia(reset);
      setIsCustom(false);

      setInicioDocente(reset.inicio.accionesDocente.join('\n'));
      setInicioEstudiante(reset.inicio.accionesEstudiante.join('\n'));
      setInicioPreguntas((reset.inicio.preguntasGeneradoras || []).join('\n'));

      setDesarrolloDocente(reset.desarrollo.accionesDocente.join('\n'));
      setDesarrolloEstudiante(reset.desarrollo.accionesEstudiante.join('\n'));
      setDesarrolloPracticas(reset.practicasComputacionales.join(', '));

      setCierreDocente(reset.cierre.accionesDocente.join('\n'));
      setCierreEstudiante(reset.cierre.accionesEstudiante.join('\n'));

      setRecursosConectado(reset.recursosSugeridos.conectado.join(', '));
      setRecursosDesconectado(reset.recursosSugeridos.desconectado.join(', '));

      setPautasDUACompromiso(reset.pautasDUA.find((p) => p.principio === 'Compromiso')?.descripcion || '');
      setPautasDUARepresentacion(reset.pautasDUA.find((p) => p.principio === 'Representacion')?.descripcion || '');
      setPautasDUAExpresion(reset.pautasDUA.find((p) => p.principio === 'Accion_Expresion')?.descripcion || '');

      if (onSaved) onSaved(reset);
    }
  };

  // Re-planteamiento rápido con Presets Pedagógicos
  const aplicarPresetReformulacion = (tipo: 'desconectado' | 'depuracion' | 'dua' | 'gamificacion' | 'dt') => {
    const current = buildEstrategiaFromInputs();
    let updated = { ...current };

    if (tipo === 'desconectado') {
      updated.inicio = {
        ...updated.inicio,
        titulo: `Activación Unplugged: Desafío Kinestésico y Lógico de ${saberNombre}`,
        descripcion: `El docente organiza una dinámica vivencial donde el estudiantado simula el flujo de control o la transmisión de señales usando tarjetas de roles y pistas en el aula.`,
        preguntasGeneradoras: [
          `¿Cómo podemos representar este proceso sin usar computadoras ni energía eléctrica?`,
          `¿Qué reglas lógicas garantizan que ningún dato o movimiento se pierda?`,
        ],
      };
      updated.desarrollo = {
        ...updated.desarrollo,
        titulo: `Construcción y Simulación Desconectada con Material Concreto`,
        descripcion: `En equipos de 3, los estudiantes construyen modelos en cartón/madera o tableros de lógica en papel cuadriculado, ejecutando pruebas de escritorio manuales.`,
        accionesDocente: [
          `Proporciona las guías impresas y plantillas de tarjetas lógicas.`,
          `Supervisa el cumplimiento de las reglas del algoritmo en cada mesa de trabajo.`,
        ],
        accionesEstudiante: [
          `Ensamblan el mecanismo o tablero lógico con material reciclable.`,
          `Registran en su bitácora física cada paso de la prueba de escritorio.`,
        ],
      };
      updated.recursosSugeridos.desconectado = [
        `Cartulina, marcadores, hilo/lana, tarjetas de colores para estados, plantillas impresas de depuración`,
      ];
    } else if (tipo === 'depuracion') {
      updated.desarrollo = {
        ...updated.desarrollo,
        titulo: `Laboratorio de Detección y Depuración Sistemática de Errores (Bugs)`,
        descripcion: `El docente entrega un código/circuito con 3 fallas lógicas y de conexión deliberadas. Los estudiantes aplican la técnica del patito de goma y aislamiento de variables.`,
        accionesDocente: [
          `Modela el protocolo de depuración: 1. Reproducir el error, 2. Aislar el módulo causante, 3. Corregir y 4. Validar casos de borde.`,
          `Acompaña a las parejas formulando preguntas socráticas sin dar la solución directa.`,
        ],
        accionesEstudiante: [
          `Identifican el comportamiento anómalo y registran la hipótesis de fallo.`,
          `Aplican correcciones paso a paso comprobando el monitor serial o voltajes.`,
        ],
      };
      updated.cierre = {
        ...updated.cierre,
        titulo: `Bitácora Metacognitiva: Anatomía del Error Superado`,
        descripcion: `Cada estudiante escribe en 3 líneas cuál fue el error más complejo de la sesión, qué pista les permitió resolverlo y cómo evitarlo en proyectos futuros.`,
      };
    } else if (tipo === 'dua') {
      setPautasDUACompromiso(
        `Elección de nivel de desafío (Básico, Intermedio o Avanzado) y asignación rotativa de roles: Líder de Hardware, Programador, Documentador y Diseñador UX.`
      );
      setPautasDUARepresentacion(
        `Código cromático en diagramas (VCC=Rojo, GND=Negro, Señal=Verde), videotutoriales con subtítulos y glosario ilustrado con analogías cotidianas.`
      );
      setPautasDUAExpresion(
        `Los estudiantes pueden evidenciar su logro mediante: demostración en vivo, diagrama de flujo comentado, simulación grabada en video corto o reporte en bitácora.`
      );
    } else if (tipo === 'gamificacion') {
      updated.inicio = {
        ...updated.inicio,
        titulo: `Misión Contrarreloj: El Enigma Tecnológico de ${saberNombre}`,
        descripcion: `Se proyecta una narrativa de emergencia: un sistema comunitario ha fallado y el grupo tiene 15 minutos para descifrar las pistas iniciales y desbloquear el entorno de trabajo.`,
      };
      updated.cierre = {
        ...updated.cierre,
        titulo: `Podio de Eficiencia y Conquista de Insignias Digitales`,
        descripcion: `Los equipos que lograron optimizar su solución con menos líneas de código o menor consumo de pines obtienen la insignia de 'Maestría Técnica 9°'.`,
      };
    } else if (tipo === 'dt') {
      updated.desarrollo = {
        ...updated.desarrollo,
        titulo: `Articulación DT: Prototipado para la Solución Comunitaria (Design Thinking)`,
        descripcion: `Los estudiantes integran directamente este saber conceptual en el prototipo funcional de su proyecto semestral de Design Thinking (DT).`,
      };
    }

    setEstrategia(updated);
    setInicioDocente(updated.inicio.accionesDocente.join('\n'));
    setInicioEstudiante(updated.inicio.accionesEstudiante.join('\n'));
    setInicioPreguntas((updated.inicio.preguntasGeneradoras || []).join('\n'));
    setDesarrolloDocente(updated.desarrollo.accionesDocente.join('\n'));
    setDesarrolloEstudiante(updated.desarrollo.accionesEstudiante.join('\n'));
    setCierreDocente(updated.cierre.accionesDocente.join('\n'));
    setCierreEstudiante(updated.cierre.accionesEstudiante.join('\n'));

    alert(`¡Preset "${tipo.toUpperCase()}" aplicado en el editor! Recuerda revisar los campos y hacer clic en "Guardar Cambios".`);
  };

  const generarPromptReescritura = (): string => {
    const cur = buildEstrategiaFromInputs();
    return `### PROMPT DE RE-PLANTEAMIENTO DIDÁCTICO (MEP 2026 - 9° AÑO)
Actúa como Asesor Nacional de Educación Técnica y Formación Tecnológica del MEP de Costa Rica.
Reescribe y perfecciona la siguiente Actividad de Mediación en 3 Momentos Didácticos para Noveno Año:

**Saber Conceptual:** ${saberNombre}
**Indicador Oficial:** "${indicadorTexto}"
**Área Curricular:** ${areaNombre} (Módulo ${moduloId})

---
**Estrategia Actual a Perfeccionar:**
1. INICIO (${cur.inicio.tiempoEstimado}):
   - Título: ${cur.inicio.titulo}
   - Descripción: ${cur.inicio.descripcion}
   - Preguntas Generadoras: ${cur.inicio.preguntasGeneradoras?.join(' | ')}
2. DESARROLLO (${cur.desarrollo.tiempoEstimado}):
   - Título: ${cur.desarrollo.titulo}
   - Descripción: ${cur.desarrollo.descripcion}
   - Acciones Estudiante: ${cur.desarrollo.accionesEstudiante.join(' ')}
3. CIERRE (${cur.cierre.tiempoEstimado}):
   - Título: ${cur.cierre.titulo}
   - Descripción: ${cur.cierre.descripcion}
   - Evaluación: ${cur.cierre.accionesDocente.join(' ')}

---
**Instrucción de Re-planteamiento:**
Proporciona una versión mejorada en formato Markdown estructurado, enfatizando:
- Enfoque por competencias y prácticas del pensamiento computacional (modularizar, depurar, abstraer).
- Inclusión DUA (Compromiso, Representación, Acción/Expresión).
- Opciones duales (Conectado con simuladores y Desconectado/Unplugged con material concreto).
- Tiempos exactos y lenguaje pedagógico oficial MEP.`;
  };

  const handleCopyPrompt = () => {
    const text = generarPromptReescritura();
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header del Modal */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-start justify-between bg-zinc-50/70">
          <div className="space-y-1 pr-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                Módulo {moduloId} • {areaNombre}
              </span>
              {isCustom ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-amber-700" />
                  <span>Actividad Personalizada (Local)</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-200 text-zinc-700">
                  Base Oficial MEP 2026
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              Editor y Re-planteador de Mediación: {saberNombre}
            </h2>
            <p className="text-xs text-zinc-600 line-clamp-2">
              <strong>Indicador:</strong> {indicadorTexto}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de Re-planteamiento Rápido con IA */}
        <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 border-b border-indigo-100/60 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-1.5 font-bold text-indigo-950">
            <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            <span>Re-plantear con 1 Clic (IA):</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => aplicarPresetReformulacion('desconectado')}
              className="px-2.5 py-1 rounded-lg bg-white border border-sky-200 text-sky-800 hover:bg-sky-50 text-[11px] font-semibold transition-all shadow-2xs"
            >
              🔌 Modo Desconectado
            </button>
            <button
              onClick={() => aplicarPresetReformulacion('depuracion')}
              className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-indigo-800 hover:bg-indigo-50 text-[11px] font-semibold transition-all shadow-2xs"
            >
              🔍 Enfoque Depuración
            </button>
            <button
              onClick={() => aplicarPresetReformulacion('dua')}
              className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 text-purple-800 hover:bg-purple-50 text-[11px] font-semibold transition-all shadow-2xs"
            >
              ♿ Refuerzo DUA
            </button>
            <button
              onClick={() => aplicarPresetReformulacion('gamificacion')}
              className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-800 hover:bg-emerald-50 text-[11px] font-semibold transition-all shadow-2xs"
            >
              🏆 Reto Gamificado
            </button>
            <button
              onClick={() => aplicarPresetReformulacion('dt')}
              className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-800 hover:bg-amber-50 text-[11px] font-semibold transition-all shadow-2xs"
            >
              🚀 Articular con DT
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación del Editor */}
        <div className="flex items-center border-b border-zinc-200 bg-zinc-50/50 px-4 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('inicio')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'inicio'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-800 text-[10px] inline-flex items-center justify-center font-bold">1</span>
            <span>Momento Inicio ({estrategia.inicio.tiempoEstimado})</span>
          </button>

          <button
            onClick={() => setActiveTab('desarrollo')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'desarrollo'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 text-[10px] inline-flex items-center justify-center font-bold">2</span>
            <span>Momento Desarrollo ({estrategia.desarrollo.tiempoEstimado})</span>
          </button>

          <button
            onClick={() => setActiveTab('cierre')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'cierre'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] inline-flex items-center justify-center font-bold">3</span>
            <span>Momento Cierre ({estrategia.cierre.tiempoEstimado})</span>
          </button>

          <button
            onClick={() => setActiveTab('recursos_dua')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'recursos_dua'
                ? 'border-purple-600 text-purple-700 bg-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Recursos & DUA</span>
          </button>

          <button
            onClick={() => setActiveTab('ia_replan')}
            className={`px-3.5 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-1.5 transition-all whitespace-nowrap ${
              activeTab === 'ia_replan'
                ? 'border-zinc-900 text-zinc-900 bg-white'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-600" />
            <span>Prompt Maestro Re-escritura</span>
          </button>
        </div>

        {/* Contenido de la Pestaña */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          
          {/* TAB 1: MOMENTO INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-zinc-700">Título de la Estrategia de Inicio:</label>
                  <input
                    type="text"
                    value={estrategia.inicio.titulo}
                    onChange={(e) =>
                      setEstrategia({
                        ...estrategia,
                        inicio: { ...estrategia.inicio, titulo: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Tiempo Estimado:</label>
                  <input
                    type="text"
                    value={estrategia.inicio.tiempoEstimado}
                    onChange={(e) =>
                      setEstrategia({
                        ...estrategia,
                        inicio: { ...estrategia.inicio, tiempoEstimado: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Descripción / Focalización:</label>
                <textarea
                  rows={3}
                  value={estrategia.inicio.descripcion}
                  onChange={(e) =>
                    setEstrategia({
                      ...estrategia,
                      inicio: { ...estrategia.inicio, descripcion: e.target.value },
                    })
                  }
                  className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Acciones del Docente (una por línea):</label>
                  <textarea
                    rows={4}
                    value={inicioDocente}
                    onChange={(e) => setInicioDocente(e.target.value)}
                    placeholder="Ej: Formula la pregunta detonante..."
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800 leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Acciones del Estudiante (una por línea):</label>
                  <textarea
                    rows={4}
                    value={inicioEstudiante}
                    onChange={(e) => setInicioEstudiante(e.target.value)}
                    placeholder="Ej: Expresan hipótesis iniciales..."
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800 leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Preguntas Generadoras Clave (una por línea):</label>
                <textarea
                  rows={2}
                  value={inicioPreguntas}
                  onChange={(e) => setInicioPreguntas(e.target.value)}
                  placeholder="Ej: ¿Qué ocurre si invertimos la polaridad...?"
                  className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-zinc-800 italic"
                />
              </div>
            </div>
          )}

          {/* TAB 2: MOMENTO DESARROLLO */}
          {activeTab === 'desarrollo' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-zinc-700">Título de la Estrategia de Desarrollo:</label>
                  <input
                    type="text"
                    value={estrategia.desarrollo.titulo}
                    onChange={(e) =>
                      setEstrategia({
                        ...estrategia,
                        desarrollo: { ...estrategia.desarrollo, titulo: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Tiempo Estimado:</label>
                  <input
                    type="text"
                    value={estrategia.desarrollo.tiempoEstimado}
                    onChange={(e) =>
                      setEstrategia({
                        ...estrategia,
                        desarrollo: { ...estrategia.desarrollo, tiempoEstimado: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Descripción / Construcción Práctica:</label>
                <textarea
                  rows={3}
                  value={estrategia.desarrollo.descripcion}
                  onChange={(e) =>
                    setEstrategia({
                      ...estrategia,
                      desarrollo: { ...estrategia.desarrollo, descripcion: e.target.value },
                    })
                  }
                  className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Acciones del Docente (Acompañamiento):</label>
                  <textarea
                    rows={4}
                    value={desarrolloDocente}
                    onChange={(e) => setDesarrolloDocente(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800 leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Acciones del Estudiante (Manos a la obra):</label>
                  <textarea
                    rows={4}
                    value={desarrolloEstudiante}
                    onChange={(e) => setDesarrolloEstudiante(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800 leading-relaxed"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Prácticas Computacionales (separadas por coma):</label>
                <input
                  type="text"
                  value={desarrolloPracticas}
                  onChange={(e) => setDesarrolloPracticas(e.target.value)}
                  placeholder="Modulariza, Abstrae, Depura, Formula algoritmos"
                  className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-zinc-800"
                />
              </div>
            </div>
          )}

          {/* TAB 3: MOMENTO CIERRE */}
          {activeTab === 'cierre' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-zinc-700">Título de la Estrategia de Cierre:</label>
                  <input
                    type="text"
                    value={estrategia.cierre.titulo}
                    onChange={(e) =>
                      setEstrategia({
                        ...estrategia,
                        cierre: { ...estrategia.cierre, titulo: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-zinc-800 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Tiempo Estimado:</label>
                  <input
                    type="text"
                    value={estrategia.cierre.tiempoEstimado}
                    onChange={(e) =>
                      setEstrategia({
                        ...estrategia,
                        cierre: { ...estrategia.cierre, tiempoEstimado: e.target.value },
                      })
                    }
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-zinc-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-700">Descripción / Sistematización y Metacognición:</label>
                <textarea
                  rows={3}
                  value={estrategia.cierre.descripcion}
                  onChange={(e) =>
                    setEstrategia({
                      ...estrategia,
                      cierre: { ...estrategia.cierre, descripcion: e.target.value },
                    })
                  }
                  className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-zinc-800 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Evaluación Formativa Docente (una por línea):</label>
                  <textarea
                    rows={4}
                    value={cierreDocente}
                    onChange={(e) => setCierreDocente(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-zinc-800 leading-relaxed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-700">Reflexión / Metacognición Estudiante:</label>
                  <textarea
                    rows={4}
                    value={cierreEstudiante}
                    onChange={(e) => setCierreEstudiante(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-zinc-800 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RECURSOS Y DUA */}
          {activeTab === 'recursos_dua' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-sky-800 flex items-center">
                    <Wrench className="w-3.5 h-3.5 mr-1" />
                    Recursos Escenario Conectado (separados por coma):
                  </label>
                  <textarea
                    rows={2}
                    value={recursosConectado}
                    onChange={(e) => setRecursosConectado(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-amber-800 flex items-center">
                    <Wrench className="w-3.5 h-3.5 mr-1" />
                    Recursos Escenario Desconectado / Unplugged (separados por coma):
                  </label>
                  <textarea
                    rows={2}
                    value={recursosDesconectado}
                    onChange={(e) => setRecursosDesconectado(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-zinc-800"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-3 space-y-3">
                <div className="text-xs font-bold text-purple-900 flex items-center">
                  <HeartHandshake className="w-4 h-4 mr-1 text-purple-600" />
                  Pautas del Diseño Universal para el Aprendizaje (DUA)
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">1. Principio de Compromiso e Implicación:</label>
                  <input
                    type="text"
                    value={pautasDUACompromiso}
                    onChange={(e) => setPautasDUACompromiso(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">2. Principio de Múltiples Formas de Representación:</label>
                  <input
                    type="text"
                    value={pautasDUARepresentacion}
                    onChange={(e) => setPautasDUARepresentacion(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-zinc-700">3. Principio de Acción y Expresión:</label>
                  <input
                    type="text"
                    value={pautasDUAExpresion}
                    onChange={(e) => setPautasDUAExpresion(e.target.value)}
                    className="w-full p-2 text-xs bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PROMPT MAESTRO DE RE-ESCRITURA */}
          {activeTab === 'ia_replan' && (
            <div className="space-y-3">
              <div className="p-3 bg-purple-50/80 border border-purple-200 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-purple-950">
                  <Bot className="w-4 h-4 text-purple-700" />
                  <span>Prompt Maestro de Re-planteamiento para Modelos de IA</span>
                </div>
                <p className="text-[11px] text-purple-800 leading-relaxed">
                  Copia este prompt optimizado y pégalo directamente en ChatGPT, Gemini, Claude o DeepSeek para generar adaptaciones ultra-detalladas o rúbricas adicionales acordes al currículo 2026.
                </p>
              </div>

              <div className="relative">
                <pre className="p-4 bg-zinc-900 text-zinc-100 rounded-xl text-[11px] font-mono whitespace-pre-wrap overflow-x-auto max-h-72 border border-zinc-800 leading-relaxed select-all">
                  {generarPromptReescritura()}
                </pre>
                <button
                  onClick={handleCopyPrompt}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center space-x-1 backdrop-blur-xs transition-all"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer con Acciones */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={handleReset}
              disabled={!isCustom}
              className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center space-x-1.5 transition-all ${
                isCustom
                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
                  : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              }`}
              title="Restaurar a la estrategia original oficial MEP 2026"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Base Oficial</span>
            </button>

            {showSavedToast && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center space-x-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>¡Cambios Guardados Localmente!</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-100 text-xs font-medium transition-all"
            >
              Cerrar
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Actividad de Mediación</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
