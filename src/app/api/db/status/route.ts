import { NextResponse } from 'next/server';
import { getDBStatus } from '@/lib/server-db';

export async function GET() {
  try {
    const status = getDBStatus();
    return NextResponse.json({ success: true, status });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
