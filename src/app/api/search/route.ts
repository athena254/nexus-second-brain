import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  // Demo search results
  const results = [
    { id: '1', title: 'AI Agent Architecture', content: 'Building autonomous agents...', created_at: new Date().toISOString() },
    { id: '2', title: 'React Best Practices', content: 'Component patterns...', created_at: new Date().toISOString() },
  ];
  
  if (query) {
    return NextResponse.json(results.filter(r => r.title.toLowerCase().includes(query.toLowerCase())));
  }
  
  return NextResponse.json(results);
}
