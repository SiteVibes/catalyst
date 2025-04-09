import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const p1 = searchParams.get('p1');
  console.log(p1);
  return NextResponse.json({ test: 'ok' }, { status: 200 });
}
