import { Agent, APIStatus, Task, SystemMetric } from '@/types';

export const agents: Agent[] = [
  {
    id: 'athena',
    name: 'Athena',
    role: 'Main Orchestrator',
    status: 'active',
    lastActive: 'Just now',
    model: 'gpt-4',
    tasks: 3,
    emoji: '🦉'
  },
  {
    id: 'ishtar',
    name: 'Ishtar',
    role: 'PAI Research & Architecture',
    status: 'active',
    lastActive: '2 min ago',
    model: 'GLM-5-FP8',
    tasks: 1,
    emoji: '🌟'
  },
  {
    id: 'sterling',
    name: 'Sterling',
    role: 'Finance & Beelancer',
    status: 'active',
    lastActive: '5 min ago',
    model: 'claude-3',
    tasks: 10,
    emoji: '💰'
  },
  {
    id: 'cisco',
    name: 'Cisco',
    role: 'Security & Audits',
    status: 'idle',
    lastActive: '1 hour ago',
    model: 'gpt-4',
    tasks: 0,
    emoji: '🔐'
  },
  {
    id: 'themis',
    name: 'THEMIS',
    role: 'Council & Decisions',
    status: 'error',
    lastActive: '3 hours ago',
    model: 'openrouter',
    tasks: 2,
    emoji: '⚖️'
  },
  {
    id: 'felicity',
    name: 'Felicity',
    role: 'Code & Dashboards',
    status: 'idle',
    lastActive: '30 min ago',
    model: 'claude-3',
    tasks: 1,
    emoji: '✨'
  },
  {
    id: 'prometheus',
    name: 'Prometheus',
    role: 'Deploy & Builds',
    status: 'error',
    lastActive: '2 hours ago',
    model: 'gpt-4',
    tasks: 1,
    emoji: '🔥'
  },
  {
    id: 'delver',
    name: 'Delver',
    role: 'Research',
    status: 'error',
    lastActive: '4 hours ago',
    model: 'tavily',
    tasks: 0,
    emoji: '🔍'
  }
];

export const apiStatuses: APIStatus[] = [
  { name: 'OpenAI', status: 'operational', latency: 45, lastChecked: '1 min ago' },
  { name: 'Anthropic', status: 'operational', latency: 62, lastChecked: '1 min ago' },
  { name: 'OpenRouter', status: 'down', lastChecked: '5 min ago' },
  { name: 'Tavily', status: 'down', lastChecked: '5 min ago' },
  { name: 'Beelancer', status: 'operational', latency: 120, lastChecked: '2 min ago' },
  { name: 'MiniMax', status: 'degraded', latency: 850, lastChecked: '3 min ago' },
  { name: 'Telegram', status: 'operational', latency: 35, lastChecked: '1 min ago' },
  { name: 'GitHub', status: 'operational', latency: 78, lastChecked: '2 min ago' }
];

export const tasks: Task[] = [
  { id: '1', title: 'Fix OpenRouter API key', agent: 'Ishtar', priority: 'critical', status: 'blocked', createdAt: '2 hours ago' },
  { id: '2', title: 'Renew Tavily API access', agent: 'Delver', priority: 'critical', status: 'pending', createdAt: '3 hours ago' },
  { id: '3', title: 'Recreate Telegram bot tokens', agent: 'Prometheus', priority: 'high', status: 'pending', createdAt: '4 hours ago' },
  { id: '4', title: 'Review pending Beelancer bids', agent: 'Sterling', priority: 'high', status: 'in-progress', createdAt: '1 hour ago' },
  { id: '5', title: 'Run security audit', agent: 'Cisco', priority: 'medium', status: 'pending', createdAt: '6 hours ago' },
  { id: '6', title: 'Update dashboard UI', agent: 'Felicity', priority: 'low', status: 'pending', createdAt: '1 day ago' }
];

export const systemMetrics: SystemMetric[] = [
  { label: 'CPU Usage', value: 45, max: 100, unit: '%', status: 'good' },
  { label: 'Memory', value: 6.2, max: 8, unit: 'GB', status: 'good' },
  { label: 'Swap', value: 495, max: 495, unit: 'MB', status: 'critical' },
  { label: 'Disk', value: 156, max: 500, unit: 'GB', status: 'good' }
];
