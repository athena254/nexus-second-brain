'use client';

import { Agent } from '@/types';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: 'bg-emerald-500',
    idle: 'bg-amber-500',
    error: 'bg-red-500',
    offline: 'bg-slate-500'
  };

  const statusText = {
    active: 'Active',
    idle: 'Idle',
    error: 'Error',
    offline: 'Offline'
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-900/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{agent.emoji}</span>
          <div>
            <h3 className="font-semibold text-white">{agent.name}</h3>
            <p className="text-sm text-slate-400">{agent.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColors[agent.status]} animate-pulse`} />
          <span className="text-xs text-slate-400">{statusText[agent.status]}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">{agent.model || '—'}</span>
        <span className="text-slate-400">{agent.lastActive}</span>
      </div>
      
      {agent.tasks > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-700/50">
          <span className="text-xs text-slate-400">Tasks: </span>
          <span className="text-xs font-medium text-orange-400">{agent.tasks}</span>
        </div>
      )}
    </div>
  );
}
