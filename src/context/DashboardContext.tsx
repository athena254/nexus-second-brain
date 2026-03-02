'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  lastActive: string;
  model?: string;
  tasks: number;
  emoji: string;
}

interface Task {
  id: string;
  title: string;
  agent: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  createdAt: string;
}

interface DashboardState {
  agents: Agent[];
  tasks: Task[];
  isLoading: boolean;
  lastUpdated: string | null;
  error: string | null;
}

interface DashboardContextType extends DashboardState {
  refresh: () => Promise<void>;
  updateAgentStatus: (id: string, status: Agent['status']) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DashboardState>({
    agents: [],
    tasks: [],
    isLoading: true,
    lastUpdated: null,
    error: null
  });

  const fetchData = useCallback(async () => {
    try {
      const [agentsRes, tasksRes] = await Promise.all([
        fetch('/api/agents'),
        fetch('/api/tasks')
      ]);
      
      const agentsData = await agentsRes.json();
      const tasksData = await tasksRes.json();
      
      setState(prev => ({
        ...prev,
        agents: agentsData.agents || prev.agents,
        tasks: tasksData.tasks || prev.tasks,
        isLoading: false,
        lastUpdated: new Date().toISOString(),
        error: null
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch data'
      }));
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const updateAgentStatus = useCallback((id: string, status: Agent['status']) => {
    setState(prev => ({
      ...prev,
      agents: prev.agents.map(a => a.id === id ? { ...a, status } : a)
    }));
  }, []);

  const updateTaskStatus = useCallback((id: string, status: Task['status']) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, status } : t)
    }));
  }, []);

  return (
    <DashboardContext.Provider value={{
      ...state,
      refresh: fetchData,
      updateAgentStatus,
      updateTaskStatus
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
