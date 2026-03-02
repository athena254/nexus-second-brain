import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { message, mode = 'general', context = [] } = await request.json();

  // Build context from notes
  const contextText = context.length > 0 
    ? context.map((n: any) => `Note: "${n.title}"\n${n.content}`).join('\n\n')
    : 'No relevant notes found.';

  // System prompt
  const systemPrompt = `You are Nexus, an AI assistant with access to the user's personal knowledge base (Second Brain).

CONTEXT NOTES:
${contextText}

INSTRUCTIONS:
- Ground answers in the context notes when possible
- Cite relevant notes with [Note: "title"] inline
- If not in context, say so and suggest what to capture
- Use markdown for formatting
- Mode: ${mode}`;

  // Call Groq (free, fast)
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!groqRes.ok) {
      throw new Error('Groq API error');
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || 'No response';

    return NextResponse.json({ reply, cited_notes: context.slice(0, 3).map((n: any) => n.title) });
  } catch (e) {
    // Fallback for demo
    return NextResponse.json({
      reply: `I understand you're asking about "${message}". In a full setup, I'd search your knowledge base and provide an AI-powered response using Groq or Claude.\n\nFor now, try:\n1. Adding some notes via Capture\n2. Setting GROQ_API_KEY in env vars\n3. Connecting Supabase for persistence`,
      cited_notes: []
    });
  }
}
