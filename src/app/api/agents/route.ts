import { NextResponse } from 'next/server';
import { agents } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ 
    agents,
    timestamp: new Date().toISOString(),
    total: agents.length,
    active: agents.filter(a => a.status === 'active').length,
    error: agents.filter(a => a.status === 'error').length
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  // In production, save to database
  return NextResponse.json({ 
    success: true, 
    agent: { ...body, id: Date.now().toString() } 
  });
}
