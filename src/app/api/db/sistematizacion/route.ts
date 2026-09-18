import { NextRequest, NextResponse } from 'next/server';
import { getSistematizacionFromDB, saveSistematizacionToDB, deleteSistematizacionFromDB } from '@/lib/server-db';

export async function GET() {
  try {
    const data = getSistematizacionFromDB();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reunion } = body;
    if (!reunion) {
      return NextResponse.json({ success: false, error: 'reunion es requerida' }, { status: 400 });
    }
    const ok = saveSistematizacionToDB(reunion);
    return NextResponse.json({ success: ok, reunionId: reunion.id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'id es requerido' }, { status: 400 });
    }
    const ok = deleteSistematizacionFromDB(id);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
