import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { figure, message, primaryOnly } = await request.json();

  // For demo, return structured response
  // In production, this would call:
  // 1. RetrievalAgent - search for sources
  // 2. VerificationAgent - cross-check claims
  // 3. PersonaAgent - generate response
  // 4. CitationAgent - format citations
  
  const demoResponses: Record<string, { content: string; citations: any[] }> = {
    'einstein': {
      content: `${message ? `Regarding "${message}" - ` : ''}The evidence shows that my work on relativity fundamentally changed our understanding of space and time [1]. The famous equation E=mc² emerged from the 1905 paper on special relativity [2].

As I've often said, imagination is more important than knowledge [3]. The pursuit of scientific truth requires both curiosity and perseverance.

Is there a specific aspect you'd like to explore further?`,
      citations: [
        { id: 1, title: 'Annus Mirabilis Papers', author: 'Various', publisher: 'Wikipedia', date: '1905', url: 'https://en.wikipedia.org/wiki/Annus_Mirabilis_papers', excerpt: 'The Annus Mirabilis papers were four papers...', confidence: 0.95 },
        { id: 2, title: 'Special Relativity', author: 'Albert Einstein', publisher: 'Princeton University Press', date: '1905', url: 'https://en.wikipedia.org/wiki/Special_relativity', excerpt: 'Special relativity is based on two postulates...', confidence: 0.92 },
        { id: 3, title: 'Albert Einstein Quotes', author: 'Various', publisher: 'Wikiquote', date: '2024', url: 'https://en.wikiquote.org/wiki/Albert_Einstein', excerpt: 'Imagination is more important than knowledge...', confidence: 0.88 },
      ]
    },
    'curie': {
      content: `${message ? `About "${message}" - ` : ''}My research on radioactivity was driven by pure curiosity and the desire to understand the fundamental nature of matter [1]. We discovered two new elements, polonium and radium, through years of painstaking work [2].

As I said, nothing in life is to be feared, it is only to be understood [3].`,
      citations: [
        { id: 1, title: 'Radioactivity', author: 'Marie Curie', publisher: 'Wikipedia', date: '1898', url: 'https://en.wikipedia.org/wiki/Radioactivity', excerpt: 'Marie Curie pioneered research on radioactivity...', confidence: 0.94 },
        { id: 2, title: 'Discovery of Polonium', author: 'Marie & Pierre Curie', publisher: 'Wikipedia', date: '1898', url: 'https://en.wikipedia.org/wiki/Polonium', excerpt: 'They discovered polonium and radium...', confidence: 0.93 },
        { id: 3, title: 'Marie Curie Quotes', author: 'Marie Curie', publisher: 'Wikiquote', date: '1934', url: 'https://en.wikiquote.org/wiki/Marie_Curie', excerpt: 'Nothing in life is to be feared...', confidence: 0.91 },
      ]
    }
  };

  const response = demoResponses[figure] || demoResponses['einstein'];

  return NextResponse.json({
    reply: response.content,
    citations: response.citations,
    metadata: {
      model: 'demo-mode',
      timestamp: new Date().toISOString(),
      agents: ['RetrievalAgent', 'VerificationAgent', 'PersonaAgent', 'CitationAgent'],
      retrievalTime: Math.floor(Math.random() * 500) + 100
    }
  });
}
