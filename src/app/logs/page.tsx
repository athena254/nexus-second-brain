'use client';

import { useState, useEffect } from 'react';

interface Log {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  agent: string;
  message: string;
}

const sampleLogs: Log[] = [
  { id: '1', timestamp: '09:35:42', level: 'success', agent: 'Ishtar', message: 'Dashboard build completed successfully' },
  { id: '2', timestamp: '09:34:18', level: 'info', agent: 'System', message: 'Auto-refresh triggered' },
  { id: '3', timestamp: '09:32:05', level: 'warning', agent: 'THEMIS', message: 'OpenRouter API returned 401' },
  { id: '4', timestamp: '09:30:22', level: 'error', agent: 'Delver', message: 'Tavily API key expired' },
  { id: '5', timestamp: '09:28:11', level: 'info', agent: 'Sterling', message: 'Beelancer sync completed - 10 pending bids' },
  { id: '6', timestamp: '09:25:33', level: 'info', agent: 'Athena', message: 'Morning check-in report generated' },
  { id: '7', timestamp: '09:20:15', level: 'warning', agent: 'Prometheus', message: 'Telegram bot token invalid' },
  { id: '8', timestamp: '09:15:42', level: 'success', agent: 'Cisco', message: 'Security audit completed - no issues' },
];

export default function LogsPage() {
  const [logs, setLogs] = useState<Log[]>(sampleLogs);
  const [filter, setFilter] = useState<'all' | 'error' | 'warning' | 'info' | 'success'>('all');
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase()) ||
                         log.agent.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const levelColors = {
    info: 'text-blue-400 bg-blue-500/10',
    warning: 'text-amber-400 bg-amber-500/10',
    error: 'text-red-400 bg-red-500/10',
    success: 'text-emerald-400 bg-emerald-500/10'
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">📜 System Logs</h1>
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Export Logs
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
          >
            <option value="all">All Levels</option>
            <option value="error">Errors</option>
            <option value="warning">Warnings</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
          </select>
        </div>

        {/* Log Stream */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="divide-y divide-slate-700/50">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-700/30 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-slate-500 font-mono text-sm">{log.timestamp}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${levelColors[log.level]}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <span className="text-orange-400 font-medium w-24">{log.agent}</span>
                  <span className="text-slate-300 flex-1">{log.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Live streaming enabled
        </div>
      </div>
    </main>
  );
}
