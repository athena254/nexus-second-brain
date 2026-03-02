'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function SettingsPage() {
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">⚙️ Settings</h1>

        {/* Appearance */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Theme</span>
            <ThemeToggle />
          </div>
        </section>

        {/* Refresh Settings */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Data Refresh</h2>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-300">Auto Refresh</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`w-12 h-6 rounded-full transition-colors ${autoRefresh ? 'bg-orange-500' : 'bg-slate-600'}`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full transform transition-transform ${autoRefresh ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {autoRefresh && (
            <div>
              <label className="text-slate-300 block mb-2">Refresh Interval: {refreshInterval}s</label>
              <input
                type="range"
                min="5"
                max="120"
                step="5"
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          )}
        </section>

        {/* Notifications */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-300">Enable Notifications</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-orange-500' : 'bg-slate-600'}`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full transform transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {notifications && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-slate-300">
                <input type="checkbox" defaultChecked className="accent-orange-500" />
                Agent errors
              </label>
              <label className="flex items-center gap-3 text-slate-300">
                <input type="checkbox" defaultChecked className="accent-orange-500" />
                API downtime
              </label>
              <label className="flex items-center gap-3 text-slate-300">
                <input type="checkbox" defaultChecked className="accent-orange-500" />
                Critical tasks
              </label>
            </div>
          )}
        </section>

        {/* API Keys */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
          <div className="space-y-4">
            {['OpenAI', 'Anthropic', 'OpenRouter', 'Tavily', 'Beelancer'].map((api) => (
              <div key={api} className="flex items-center gap-3">
                <span className="text-slate-300 w-24">{api}</span>
                <input
                  type="password"
                  placeholder={`Enter ${api} API key`}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white focus:outline-none focus:border-orange-500"
                />
                <button className="px-3 py-2 bg-slate-600 hover:bg-slate-500 rounded text-white text-sm">
                  Test
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
            Reset
          </button>
          <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}
