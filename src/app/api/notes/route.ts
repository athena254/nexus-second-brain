import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Return demo data for now
  return NextResponse.json([
    { id: '1', title: 'Welcome to NEXUS', content: 'This is your AI-powered second brain.', created_at: new Date().toISOString() },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // Demo: just echo back
  return NextResponse.json({ id: Date.now().toString(), ...body });
}
