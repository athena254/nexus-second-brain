import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const userId = searchParams.get('user_id') || 'demo-user';
  const mode = searchParams.get('mode') || 'semantic';

  if (!query) {
    // Return recent notes if no query
    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);
    return NextResponse.json(data || []);
  }

  if (mode === 'exact') {
    // Simple text search
    const { data } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(20);
    return NextResponse.json(data || []);
  }

  // Semantic search would use embeddings - fallback to ILIKE for now
  const { data } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .limit(20);

  return NextResponse.json(data || []);
}
