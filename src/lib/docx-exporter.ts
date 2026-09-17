import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { SemanaPlaneamiento, ModuloCurricular } from '../types';

export const exportarPlaneamientoDocx = async (
  modulo: ModuloCurricular,
  semanas: SemanaPlaneamiento[],
  docenteNombre = 'Allan Morera & Alberto Bustos',
  institucion = 'Colegio Técnico Profesional / Liceo de Innovación'
) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Encabezado Oficial MEP
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'MINISTERIO DE EDUCACIÓN PÚBLICA',
                bold: true,
                size: 24,
                font: 'Arial',
                color: '014D6B'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'DIRECCIÓN DE DESARROLLO CURRICULAR • DEPARTAMENTO DE TERCER CICLO Y EDUCACIÓN DIVERSIFICADA',
                size: 18,
                font: 'Arial',
                color: '555555'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'PROGRAMA NACIONAL DE FORMACIÓN TECNOLÓGICA (PNFT 2026)',
                bold: true,
                size: 20,
                font: 'Arial',
                color: '09B7AE'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `PLANEAMIENTO DIDÁCTICO • NOVENO AÑO (9°) • ${modulo.nombre.toUpperCase()}`,
                bold: true,
                size: 20,
                font: 'Arial'
              })
            ]
          }),

          // Metadatos
          new Paragraph({
            children: [
              new TextRun({ text: 'Institución: ', bold: true }),
              new TextRun({ text: institucion }),
              new TextRun({ text: '    |    Docentes Asesores: ', bold: true }),
              new TextRun({ text: docenteNombre }),
              new TextRun({ text: '    |    Periodo: ', bold: true }),
              new TextRun({ text: modulo.periodo })
            ]
          }),
          new Paragraph({
            spacing: { after: 300 },
            children: [
              new TextRun({ text: 'Eje del Proyecto Semestral: ', bold: true }),
              new TextRun({ text: modulo.ejeProyectoSemestral, italics: true })
            ]
          }),

          // Tabla de Semanas con los 3 Momentos Didácticos
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Encabezado de la Tabla
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Semana / Saber', bold: true, color: 'FFFFFF' })] })],
                    shading: { fill: '014D6B' }
                  }),
                  new TableCell({
                    width: { size: 55, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Estrategias de Mediación Pedagógica (3 Momentos Didácticos)', bold: true, color: 'FFFFFF' })] })],
                    shading: { fill: '014D6B' }
                  }),
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Proyecto / Hito', bold: true, color: 'FFFFFF' })] })],
                    shading: { fill: '014D6B' }
                  }),
                  new TableCell({
                    width: { size: 15, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Evaluación / DUA', bold: true, color: 'FFFFFF' })] })],
                    shading: { fill: '014D6B' }
                  })
                ]
              }),

              // Filas de las 18 Semanas
              ...semanas.map((sem) => {
                return new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: `Semana ${sem.numeroSemana}`, bold: true })] }),
                        new Paragraph({ children: [new TextRun({ text: sem.tituloSemana.split(':')[1] || '', size: 16 })] })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({ text: `1. INICIO (${sem.momentoInicio.tiempo}): `, bold: true, color: '014D6B' }),
                            new TextRun({ text: sem.momentoInicio.estrategia })
                          ]
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: `2. DESARROLLO (${sem.momentoDesarrollo.tiempo}): `, bold: true, color: '45258F' }),
                            new TextRun({ text: sem.momentoDesarrollo.estrategia })
                          ]
                        }),
                        new Paragraph({
                          children: [
                            new TextRun({ text: `3. CIERRE (${sem.momentoCierre.tiempo}): `, bold: true, color: '09B7AE' }),
                            new TextRun({ text: sem.momentoCierre.estrategia })
                          ]
                        })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: sem.etapaProyectoAsociada ? `Etapa: ${sem.etapaProyectoAsociada.replace('_', ' ')}` : 'N/A',
                              bold: Boolean(sem.etapaProyectoAsociada),
                              color: sem.etapaProyectoAsociada ? '014D6B' : '888888'
                            })
                          ]
                        }),
                        sem.actividadProyectoEnSemana
                          ? new Paragraph({ children: [new TextRun({ text: sem.actividadProyectoEnSemana, size: 14 })] })
                          : new Paragraph({ children: [] })
                      ]
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({ children: [new TextRun({ text: `Inst: ${sem.instrumentoEvaluacion}`, size: 16 })] }),
                        new Paragraph({ children: [new TextRun({ text: `DUA: ${sem.pautaDUAAplicada}`, size: 14, italics: true })] })
                      ]
                    })
                  ]
                });
              })
            ]
          })
        ]
      }
    ]
  });

  const blob = await Packer.toBlob(doc);
  const filename = `Planeamiento_Oficial_Noveno_${modulo.id === 1 ? 'Modulo1' : 'Modulo2'}_2026.docx`;
  saveAs(blob, filename);
};
