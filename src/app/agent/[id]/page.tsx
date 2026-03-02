'use client';

import { useParams, useRouter } from 'next/navigation';
import { agents } from '@/lib/data';
import { TaskItem } from '@/components/TaskItem';
import { tasks } from '@/lib/data';

export default function AgentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const agent = agents.find(a => a.id === params.id);
  const agentTasks = tasks.filter(t => t.agent === agent?.name);

  if (!agent) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Agent Not Found</h1>
          <button onClick={() => router.push('/')} className="text-orange-400 hover:underline">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    active: 'bg-emerald-500',
    idle: 'bg-amber-500',
    error: 'bg-red-500',
    offline: 'bg-slate-500'
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 text-slate-400 hover:text-white flex items-center gap-2">
          ← Back to Dashboard
        </button>

        {/* Agent Header */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{agent.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
              <p className="text-slate-400">{agent.role}</p>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-sm ${statusColors[agent.status]} text-white`}>
              {agent.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-700">
            <div>
              <p className="text-slate-400 text-sm">Model</p>
              <p className="text-white font-medium">{agent.model || '—'}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Active Tasks</p>
              <p className="text-white font-medium">{agent.tasks}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Last Active</p>
              <p className="text-white font-medium">{agent.lastActive}</p>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Assigned Tasks</h2>
          {agentTasks.length > 0 ? (
            agentTasks.map(task => <TaskItem key={task.id} task={task} />)
          ) : (
            <p className="text-slate-400">No tasks assigned</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
            Activate Agent
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            View Logs
          </button>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Configure
          </button>
        </div>
      </div>
    </main>
  );
}
