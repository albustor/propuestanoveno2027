import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SemanaPlaneamiento, ModuloCurricular } from '../types';

export const exportarPlaneamientoPdf = (
  modulo: ModuloCurricular,
  semanas: SemanaPlaneamiento[],
  docenteNombre = 'Alberto Bustos Ortega / Allan M.',
  institucion = 'Colegio Técnico Profesional / Liceo de Innovación'
) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Títulos MEP
  doc.setFontSize(14);
  doc.setTextColor(1, 77, 107);
  doc.text('MINISTERIO DE EDUCACIÓN PÚBLICA • DIRECCIÓN DE DESARROLLO CURRICULAR', 14, 15);

  doc.setFontSize(11);
  doc.setTextColor(9, 183, 174);
  doc.text(`PROGRAMA NACIONAL DE FORMACIÓN TECNOLÓGICA (PNFT 2026) • NOVENO AÑO (9°)`, 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.text(`${modulo.nombre} | Periodo: ${modulo.periodo}`, 14, 28);
  doc.text(`Docentes Asesores: ${docenteNombre} | Institución: ${institucion}`, 14, 34);

  // Filas para la tabla
  const tableRows = semanas.map((sem) => [
    `Sem ${sem.numeroSemana}\n${sem.tituloSemana.split(':')[1] || ''}`,
    `1. INICIO (${sem.momentoInicio.tiempo}):\n${sem.momentoInicio.estrategia}\n\n2. DESARROLLO (${sem.momentoDesarrollo.tiempo}):\n${sem.momentoDesarrollo.estrategia}\n\n3. CIERRE (${sem.momentoCierre.tiempo}):\n${sem.momentoCierre.estrategia}`,
    sem.etapaProyectoAsociada
      ? `Etapa: ${sem.etapaProyectoAsociada.replace('_', ' ')}\n\n${sem.actividadProyectoEnSemana || ''}`
      : 'N/A',
    `Inst: ${sem.instrumentoEvaluacion}\n\nDUA: ${sem.pautaDUAAplicada}`
  ]);

  autoTable(doc, {
    startY: 40,
    head: [['Semana / Saber', 'Estrategias de Mediación Pedagógica (3 Momentos)', 'Proyecto (Fases / Etapas)', 'Evaluación & DUA']],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [1, 77, 107],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 7,
      cellPadding: 2.5,
      textColor: [30, 30, 30]
    },
    columnStyles: {
      0: { cellWidth: 35 },
      1: { cellWidth: 150 },
      2: { cellWidth: 45 },
      3: { cellWidth: 40 }
    },
    margin: { top: 40, left: 14, right: 14 }
  });

  const filename = `Planeamiento_Noveno_${modulo.id === 1 ? 'Modulo1' : 'Modulo2'}_2026.pdf`;
  doc.save(filename);
};
