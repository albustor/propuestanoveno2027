import { NextRequest, NextResponse } from 'next/server';
import { processAICascade, AIRequestPayload } from '@/lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const body: AIRequestPayload = await req.json();
    if (!body || !body.prompt || !body.tipo) {
      return NextResponse.json({ error: "Faltan parámetros requeridos (prompt, tipo)" }, { status: 400 });
    }

    const result = await processAICascade(body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI Cascade Route Error:", error);
    return NextResponse.json({
      success: false,
      error: error?.message || "Error interno procesando la solicitud de IA",
      content: "Degradación elegante: No fue posible contactar a los proveedores de IA en este instante. Se sugiere utilizar las plantillas curriculares predeterminadas de la plataforma."
    }, { status: 503 });
  }
}
