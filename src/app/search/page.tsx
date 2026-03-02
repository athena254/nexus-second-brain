'use client';

import { useState, useEffect } from 'react';
import { searchNotes } from '@/lib/api';

const typeColors: Record<string, string> = {
  text: 'border-l-violet-500',
  url: 'border-l-cyan-500',
  voice: 'border-l-amber-500',
  image: 'border-l-emerald-500',
  file: 'border-l-slate-500',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'semantic' | 'exact' | 'ai'>('semantic');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchNotes(query, mode);
        setResults(data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, mode]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span>🔍</span> Search
        </h1>
        <p className="text-slate-400 mt-1">Find anything in your brain.</p>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your knowledge..."
        className="w-full h-14 bg-slate-800 border border-slate-700 rounded-xl px-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 text-lg"
      />

      {/* Mode Toggle */}
      <div className="flex gap-2">
        {(['semantic', 'exact', 'ai-powered'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m === 'ai-powered' ? 'ai' : m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mode === m || (m === 'ai-powered' && mode === 'ai')
                ? 'bg-violet-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {m === 'ai-powered' ? 'AI-Powered' : m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Searching...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          {query ? `No results for "${query}"` : 'Start typing to search'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((note) => (
            <div
              key={note.id}
              className={`bg-slate-800 rounded-xl border border-slate-700 p-4 cursor-pointer hover:border-violet-500/50 transition-colors border-l-4 ${typeColors[note.source_type] || 'border-l-violet-500'}`}
            >
              <h3 className="font-medium text-white truncate">{note.title}</h3>
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">{note.content}</p>
              <p className="text-xs text-slate-500 mt-2">
                {new Date(note.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
