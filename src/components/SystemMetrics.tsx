'use client';

import { SystemMetric } from '@/types';

interface SystemMetricsProps {
  metrics: SystemMetric[];
}

export function SystemMetrics({ metrics }: SystemMetricsProps) {
  const statusColors = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-500 animate-pulse'
  };

  const barColors = {
    good: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-red-500'
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{metric.label}</span>
            <span className={`w-2 h-2 rounded-full ${statusColors[metric.status]}`} />
          </div>
          <div className="text-2xl font-bold text-white mb-2">
            {metric.value}<span className="text-sm text-slate-400 ml-1">{metric.unit}</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${barColors[metric.status]} transition-all`}
              style={{ width: `${(metric.value / metric.max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
