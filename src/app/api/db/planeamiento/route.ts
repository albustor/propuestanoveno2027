import { NextRequest, NextResponse } from 'next/server';
import { getPlaneamientoFromDB, savePlaneamientoBatchToDB, saveSemanaPlaneamientoToDB } from '@/lib/server-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduloId = parseInt(searchParams.get('moduloId') || '1', 10);
    const semanas = getPlaneamientoFromDB(moduloId);
    return NextResponse.json({ success: true, moduloId, semanas });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduloId, semanas, semana } = body;

    if (!moduloId) {
      return NextResponse.json({ success: false, error: 'moduloId es requerido' }, { status: 400 });
    }

    if (semanas && Array.isArray(semanas)) {
      const ok = savePlaneamientoBatchToDB(moduloId, semanas);
      return NextResponse.json({ success: ok, count: semanas.length });
    }

    if (semana) {
      const ok = saveSemanaPlaneamientoToDB(moduloId, semana);
      return NextResponse.json({ success: ok, semanaId: semana.id });
    }

    return NextResponse.json({ success: false, error: 'Datos no válidos' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
