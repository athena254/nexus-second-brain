// Agent Command Center Types

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'error' | 'offline';
  lastActive: string;
  model?: string;
  tasks: number;
  emoji: string;
}

export interface APIStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency?: number;
  lastChecked: string;
}

export interface Task {
  id: string;
  title: string;
  agent: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  createdAt: string;
}

export interface SystemMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}
