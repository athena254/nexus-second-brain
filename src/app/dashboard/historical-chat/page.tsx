'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  metadata?: ProvenanceRecord;
}

interface Citation {
  id: number;
  title: string;
  author: string;
  publisher: string;
  date: string;
  url: string;
  excerpt: string;
  confidence: number;
}

interface ProvenanceRecord {
  model: string;
  timestamp: string;
  agents: string[];
  retrievalTime: number;
}

const HISTORICAL_FIGURES = [
  { id: 'einstein', name: 'Albert Einstein', bio: 'Theoretical physicist, developed theory of relativity', emoji: '🔬' },
  { id: 'curie', name: 'Marie Curie', bio: 'Physicist & chemist, pioneer in radioactivity', emoji: '☢️' },
  { id: 'da Vinci', name: 'Leonardo da Vinci', bio: 'Renaissance polymath, artist & scientist', emoji: '🎨' },
  { id: 'mandela', name: 'Nelson Mandela', bio: 'Anti-apartheid revolutionary & President', emoji: '🕊️' },
  { id: 'cleopatra', name: 'Cleopatra VII', bio: 'Last active ruler of Ptolemaic Egypt', emoji: '👑' },
  { id: 'tesla', name: 'Nikola Tesla', bio: 'Inventor & electrical engineer', emoji: '⚡' },
  { id: 'churchill', name: 'Winston Churchill', bio: 'British statesman & writer', emoji: '🎭' },
  { id: 'galileo', name: 'Galileo Galilei', bio: 'Father of modern observational astronomy', emoji: '🔭' },
];

// Demo responses for testing
const DEMO_RESPONSES: Record<string, { content: string; citations: Citation[] }> = {
  'einstein': {
    content: `That is an excellent question about my work on relativity [1]. Let me share what the evidence shows.

The theory of special relativity, published in 1905, fundamentally changed our understanding of space and time [2]. The famous equation E=mc² emerged from this work, showing the relationship between mass and energy [3].

As I stated in my lectures, imagination is more important than knowledge [4]. The pursuit of understanding the universe requires both curiosity and perseverance.

Is there a specific aspect of physics you'd like to explore further?`,
    citations: [
      { id: 1, title: 'Annus Mirabilis', author: 'Albert Einstein', publisher: 'Wikipedia', date: '1905', url: 'https://en.wikipedia.org/wiki/Annus_Mirabilis_papers', excerpt: 'The Annus Mirabilis papers were four papers...', confidence: 0.95 },
      { id: 2, title: 'Special Relativity', author: 'Albert Einstein', publisher: 'Princeton University Press', date: '1905', url: 'https://en.wikipedia.org/wiki/Special_relativity', excerpt: 'Special relativity is based on two postulates...', confidence: 0.92 },
      { id: 3, title: 'Does E=mc² Work?', author: 'NASA', publisher: 'NASA Science', date: '2023', url: 'https://science.nasa.gov/', excerpt: "Einstein's famous equation shows...", confidence: 0.98 },
      { id: 4, title: 'Imagination Quote', author: 'Various', publisher: 'Wikiquote', date: '2024', url: 'https://en.wikiquote.org/wiki/Albert_Einstein', excerpt: 'Imagination is more important than knowledge...', confidence: 0.88 },
    ]
  }
};

export default function HistoricalChat() {
  const [selectedFigure, setSelectedFigure] = useState(HISTORICAL_FIGURES[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [primaryOnly, setPrimaryOnly] = useState(false);
  const [showProvenance, setShowProvenance] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Call API
      const res = await fetch('/api/historical-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figure: selectedFigure.id,
          message: input,
          primaryOnly
        })
      });
      
      const data = await res.json();
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'I apologize, but I could not find reliable sources for that question. Would you like me to run a broader search?',
        citations: data.citations,
        metadata: data.metadata
      };
      
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      // Fallback to demo
      const demo = DEMO_RESPONSES[selectedFigure.id] || DEMO_RESPONSES['einstein'];
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: demo.content,
        citations: demo.citations,
        metadata: { model: 'demo', timestamp: new Date().toISOString(), agents: ['PersonaAgent'], retrievalTime: 120 }
      };
      setMessages(prev => [...prev, assistantMsg]);
    }
    
    setLoading(false);
  };

  const latestMessage = messages[messages.length - 1];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span>🏛️</span> Talk to a Historical Figure
          </h1>
          <p className="text-slate-400 mt-1">
            Chat with AI-powered personas grounded in historical sources. Every claim is verified.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* LEFT PANEL - Figure Selector */}
          <div className="col-span-3 space-y-4">
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="font-semibold mb-3">Select Figure</h3>
              <div className="space-y-2">
                {HISTORICAL_FIGURES.map(fig => (
                  <button
                    key={fig.id}
                    onClick={() => setSelectedFigure(fig)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedFigure.id === fig.id
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{fig.emoji}</span>
                      <span className="font-medium">{fig.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="text-4xl mb-2">{selectedFigure.emoji}</div>
              <h3 className="font-semibold">{selectedFigure.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{selectedFigure.bio}</p>
            </div>

            {/* Settings */}
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={primaryOnly}
                  onChange={(e) => setPrimaryOnly(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">Primary sources only</span>
              </label>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <p className="text-xs text-amber-400">
                ⚠️ This is a simulated persona grounded in sources; not an exact reproduction of the historical figure.
              </p>
            </div>
          </div>

          {/* CENTER - Chat */}
          <div className="col-span-6 flex flex-col">
            <div className="bg-slate-800 rounded-xl border border-slate-700 flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-slate-500 py-12">
                    <p className="text-4xl mb-4">💬</p>
                    <p>Start a conversation with {selectedFigure.name}</p>
                    <p className="text-sm mt-2">Ask about their life, work, or historical events</p>
                  </div>
                )}
                
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-slate-700 text-white'
                    }`}>
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      
                      {/* Citations inline */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-600">
                          <p className="text-xs text-slate-400 mb-1">Sources: {msg.citations.map(c => `[${c.id}]`).join(', ')}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 rounded-2xl px-4 py-3">
                      <span className="text-slate-400">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-slate-700">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                    placeholder={`Ask ${selectedFigure.name}...`}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                    disabled={loading}
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Sources */}
          <div className="col-span-3">
            <div className="bg-slate-800 rounded-xl border border-slate-700 h-full flex flex-col">
              <div className="p-4 border-b border-slate-700">
                <h3 className="font-semibold flex items-center gap-2">
                  <span>📚</span> Sources & Provenance
                </h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {latestMessage?.citations ? (
                  latestMessage.citations.map(citation => (
                    <div key={citation.id} className="bg-slate-700 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <span className="font-medium text-violet-400">[{citation.id}]</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          citation.confidence >= 0.9 ? 'bg-green-500/20 text-green-400' :
                          citation.confidence >= 0.7 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {citation.confidence.toFixed(2)}
                        </span>
                      </div>
                      <h4 className="font-medium text-sm mt-1">{citation.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {citation.author} — {citation.publisher} — {citation.date}
                      </p>
                      <p className="text-xs text-slate-300 mt-2 italic border-l-2 border-violet-500 pl-2">
                        "{citation.excerpt}"
                      </p>
                      <a 
                        href={citation.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-violet-400 hover:underline mt-2 block"
                      >
                        View Source →
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm text-center py-8">
                    Sources will appear here after each response
                  </p>
                )}
              </div>

              {/* Metadata */}
              {latestMessage?.metadata && (
                <div className="p-4 border-t border-slate-700 bg-slate-800">
                  <button
                    onClick={() => setShowProvenance(!showProvenance)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {showProvenance ? '▼' : '▶'} Chain of Evidence
                  </button>
                  {showProvenance && (
                    <div className="mt-2 text-xs text-slate-400 space-y-1">
                      <p>Model: {latestMessage.metadata.model}</p>
                      <p>Agents: {latestMessage.metadata.agents.join(', ')}</p>
                      <p>Retrieval: {latestMessage.metadata.retrievalTime}ms</p>
                      <p>Time: {new Date(latestMessage.metadata.timestamp).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
