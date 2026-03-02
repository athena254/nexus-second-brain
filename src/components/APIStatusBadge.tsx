'use client';

import { APIStatus } from '@/types';

interface APIStatusBadgeProps {
  api: APIStatus;
}

export function APIStatusBadge({ api }: APIStatusBadgeProps) {
  const statusStyles = {
    operational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    degraded: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    down: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const statusIcons = {
    operational: '✓',
    degraded: '⚠',
    down: '✗'
  };

  return (
    <div className={`flex items-center justify-between px-3 py-2 rounded-lg border ${statusStyles[api.status]} bg-slate-800/30`}>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{statusIcons[api.status]}</span>
        <span className="text-sm font-medium">{api.name}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        {api.latency && (
          <span className="font-mono">{api.latency}ms</span>
        )}
        <span>{api.lastChecked}</span>
      </div>
    </div>
  );
}
