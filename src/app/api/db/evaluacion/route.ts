import { NextRequest, NextResponse } from 'next/server';
import { getEvaluacionFromDB, saveEvaluacionToDB } from '@/lib/server-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const moduloId = parseInt(searchParams.get('moduloId') || '1', 10);
    const data = getEvaluacionFromDB(moduloId);
    return NextResponse.json({ success: true, moduloId, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduloId, data } = body;
    if (!moduloId) {
      return NextResponse.json({ success: false, error: 'moduloId es requerido' }, { status: 400 });
    }
    const ok = saveEvaluacionToDB(moduloId, data);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
