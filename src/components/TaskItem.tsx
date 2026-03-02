'use client';

import { Task } from '@/types';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const priorityColors = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    low: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  };

  const statusColors = {
    pending: 'text-slate-400',
    'in-progress': 'text-blue-400',
    completed: 'text-emerald-400',
    blocked: 'text-red-400'
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
      <div className="flex items-center gap-3">
        <span className={`px-2 py-0.5 text-xs rounded border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className="text-white">{task.title}</span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-400">{task.agent}</span>
        <span className={`text-xs ${statusColors[task.status]}`}>{task.status}</span>
      </div>
    </div>
  );
}
