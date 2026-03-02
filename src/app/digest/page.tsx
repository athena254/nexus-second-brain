'use client';

import { useState } from 'react';

const sections = [
  { id: 'captured', icon: '📥', title: 'Captured Yesterday', content: 'You added 12 new pieces of knowledge yesterday, including notes on AI agents, React hooks, and TypeScript patterns.' },
  { id: 'synthesis', icon: '⚡', title: 'AI Synthesis', content: 'Your recent notes on AI agents and automation workflows are showing strong connections. Consider exploring how Claude API relates to your React architecture notes.' },
  { id: 'review', icon: '🔁', title: 'Review Queue', notes: ['Prompt Engineering Basics', 'React useEffect Patterns', 'Docker Compose Guide'] },
  { id: 'gaps', icon: '🌱', title: 'Knowledge Gaps', topics: ['GraphQL', 'WebSockets', 'System Design'] },
  { id: 'connections', icon: '🔗', title: 'Suggested Connections', pairs: [['AI Agents', 'Automation'], ['React', 'TypeScript']] },
];

export default function DigestPage() {
  const [openSection, setOpenSection] = useState<string | null>('synthesis');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span>📑</span> Digest
          </h1>
          <p className="text-slate-400 mt-1">Your daily AI-powered review.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 rounded-full">
            <span className="text-amber-400">🔥</span>
            <span className="text-sm font-medium text-amber-400">12 day streak</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-slate-700 last:border-0">
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{section.icon}</span>
                <span className="font-medium text-white">{section.title}</span>
              </div>
              <span className="text-slate-400">{openSection === section.id ? '▲' : '▼'}</span>
            </button>
            
            {openSection === section.id && (
              <div className="px-4 pb-4">
                {section.content && <p className="text-slate-400">{section.content}</p>}
                {section.notes && (
                  <div className="space-y-2">
                    {section.notes.map((note, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-sm text-white">{note}</span>
                        <span className="text-xs text-slate-500">Review</span>
                      </div>
                    ))}
                  </div>
                )}
                {section.topics && (
                  <div className="flex flex-wrap gap-2">
                    {section.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">{topic}</span>
                    ))}
                  </div>
                )}
                {section.pairs && (
                  <div className="space-y-2">
                    {section.pairs.map((pair, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg">
                        <span className="text-violet-400">🔗</span>
                        <span className="text-sm text-white">{pair[0]}</span>
                        <span className="text-slate-500">+</span>
                        <span className="text-sm text-white">{pair[1]}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-700">
                  <span className="text-sm text-slate-500">Was this helpful?</span>
                  <button className="p-1 hover:bg-slate-700 rounded">👍</button>
                  <button className="p-1 hover:bg-slate-700 rounded">👎</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
