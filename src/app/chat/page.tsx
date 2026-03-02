'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  cited_notes?: string[];
}

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: 'Hi! I\'m Nexus, your AI second brain. Ask me anything about your knowledge base, or let me help you discover connections in your notes.' }
  ]);
  const [mode, setMode] = useState<'general' | 'research' | 'summarize' | 'brainstorm'>('general');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, mode }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        cited_notes: data.cited_notes
      }]);
    } catch (e) {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong.'
      }]);
    }
    
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Sessions */}
      <div className="w-72 flex-shrink-0 bg-slate-800 rounded-xl border border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <button className="w-full py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-500">
            + New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <div className="p-3 rounded-lg bg-violet-600/20 border border-violet-500/30">
            <p className="text-sm text-violet-400 font-medium">Current Session</p>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col">
        {/* Mode */}
        <div className="flex gap-2 mb-4">
          {(['general', 'research', 'summarize', 'brainstorm'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mode === m ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-slate-700 text-white'}`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
                {msg.role === 'assistant' && msg.cited_notes && msg.cited_notes.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-600">
                    <p className="text-xs text-slate-400 mb-1">📎 Based on {msg.cited_notes.length} notes:</p>
                    <div className="flex flex-wrap gap-1">
                      {msg.cited_notes.map((note) => (
                        <span key={note} className="px-2 py-0.5 bg-violet-500/20 text-violet-400 text-xs rounded">{note}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700 rounded-2xl px-4 py-2.5">
                <span className="text-slate-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask anything..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
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
  );
}
