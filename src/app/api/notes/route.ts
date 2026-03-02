import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id') || 'demo-user';
  
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { user_id = 'demo-user', title, content, source_type = 'text', source_url, tags = [] } = body;

  // Create note
  const { data: note, error } = await supabase
    .from('notes')
    .insert({ user_id, title, content, source_type, source_url })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Create tags
  for (const tagName of tags) {
    const { data: tag } = await supabase
      .from('tags')
      .upsert({ user_id, name: tagName, color: '#7B5CF0' }, { onConflict: 'user_id,name' })
      .select()
      .single();
    
    if (tag) {
      await supabase.from('note_tags').insert({ note_id: note.id, tag_id: tag.id });
    }
  }

  return NextResponse.json(note);
}
