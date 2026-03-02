'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AgentCard } from '@/components/AgentCard';
import { APIStatusBadge } from '@/components/APIStatusBadge';
import { TaskItem } from '@/components/TaskItem';
import { SystemMetrics } from '@/components/SystemMetrics';
import { LiveClock } from '@/components/LiveClock';
import { LoadingGrid } from '@/components/ui/LoadingSpinner';
import { agents, apiStatuses, tasks, systemMetrics } from '@/lib/data';
import { useDashboard } from '@/context/DashboardContext';

export default function Dashboard() {
  const { agents: contextAgents, isLoading, refresh, lastUpdated } = useDashboard();
  const [localAgents, setLocalAgents] = useState(agents);
  
  // Use context data if available, otherwise use static data
  useEffect(() => {
    if (contextAgents.length > 0) {
      setLocalAgents(contextAgents);
    }
  }, [contextAgents]);

  const activeAgents = localAgents.filter(a => a.status === 'active').length;
  const errorAgents = localAgents.filter(a => a.status === 'error').length;
  const operationalAPIs = apiStatuses.filter(a => a.status === 'operational').length;
  const criticalTasks = tasks.filter(t => t.priority === 'critical').length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <span className="text-4xl">🏎️</span>
                Agent Command Center
              </h1>
              <p className="text-slate-400 mt-1">DisMuriuki&apos;s AI Ecosystem Dashboard</p>
            </div>
            <div className="flex items-center gap-6">
              <LiveClock />
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live
                {lastUpdated && (
                  <span className="text-xs">• Updated {new Date(lastUpdated).toLocaleTimeString()}</span>
                )}
              </div>
              <button
                onClick={refresh}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm"
              >
                ↻ Refresh
              </button>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active Agents" value={activeAgents} total={localAgents.length} color="emerald" />
          <StatCard label="Agents in Error" value={errorAgents} total={localAgents.length} color="red" />
          <StatCard label="APIs Operational" value={operationalAPIs} total={apiStatuses.length} color="blue" />
          <StatCard label="Critical Tasks" value={criticalTasks} total={tasks.length} color="orange" />
        </div>

        {/* System Metrics */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
          <SystemMetrics metrics={systemMetrics} />
        </section>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Agents */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Agent Fleet</h2>
              <Link href="/logs" className="text-sm text-orange-400 hover:text-orange-300">
                View all logs →
              </Link>
            </div>
            {isLoading ? (
              <LoadingGrid count={8} />
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {localAgents.map((agent) => (
                  <Link key={agent.id} href={`/agent/${agent.id}`}>
                    <AgentCard agent={agent} />
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="space-y-8">
            {/* API Status */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">API Status</h2>
              <div className="space-y-2">
                {apiStatuses.map((api) => (
                  <APIStatusBadge key={api.name} api={api} />
                ))}
              </div>
            </section>

            {/* Tasks */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">Priority Tasks</h2>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </section>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-700/50 text-center text-slate-500 text-sm">
          <p>Agent Command Center v1.0 • Built with 💕 for Dis by Ishtar</p>
        </footer>
      </div>
    </main>
  );
}

function StatCard({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const colors: Record<string, string> = {
    emerald: 'text-emerald-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400'
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <p className="text-slate-400 text-sm">{label}</p>
      <p className={`text-2xl font-bold ${colors[color]}`}>
        {value}<span className="text-slate-500 text-lg">/{total}</span>
      </p>
    </div>
  );
}
