'use client';

import { useState } from 'react';

const mockNotebooks = [
  { id: '1', name: 'AI & ML', color: '#7B5CF0', icon: '🤖', count: 45 },
  { id: '2', name: 'Frontend', color: '#06B6D4', icon: '💅', count: 32 },
  { id: '3', name: 'Backend', color: '#10B981', icon: '⚙️', count: 28 },
  { id: '4', name: 'Projects', color: '#F59E0B', icon: '📁', count: 15 },
  { id: '5', name: 'Reading List', color: '#EF4444', icon: '📚', count: 23 },
];

export default function NotebooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span>📓</span> Notebooks
          </h1>
          <p className="text-slate-400 mt-1">Organize your knowledge.</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-500">
          + New Notebook
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockNotebooks.map((nb) => (
          <div key={nb.id} className="bg-slate-800 rounded-xl border border-slate-700 p-4 hover:border-violet-500/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${nb.color}20` }}>
                {nb.icon}
              </div>
              <div>
                <h3 className="font-medium text-white">{nb.name}</h3>
                <p className="text-sm text-slate-400">{nb.count} notes</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* New Notebook */}
        <div className="bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-700 p-4 hover:border-violet-500/50 transition-colors cursor-pointer flex items-center justify-center min-h-[100px]">
          <div className="text-center">
            <div className="text-2xl mb-2">+</div>
            <p className="text-sm text-slate-400">Create Notebook</p>
          </div>
        </div>
      </div>
    </div>
  );
}
