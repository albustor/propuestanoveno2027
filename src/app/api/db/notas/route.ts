import { NextRequest, NextResponse } from 'next/server';
import { getNotasFromDB, saveNotaToDB } from '@/lib/server-db';

export async function GET() {
  try {
    const notas = getNotasFromDB();
    return NextResponse.json({ success: true, notas });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { saberId, nota } = body;
    if (!saberId) {
      return NextResponse.json({ success: false, error: 'saberId es requerido' }, { status: 400 });
    }
    const ok = saveNotaToDB(saberId, nota || '');
    return NextResponse.json({ success: ok, saberId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
