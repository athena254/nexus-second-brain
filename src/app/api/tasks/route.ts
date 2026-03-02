import { NextResponse } from 'next/server';
import { tasks } from '@/lib/data';

export async function GET() {
  return NextResponse.json({
    tasks,
    timestamp: new Date().toISOString(),
    byPriority: {
      critical: tasks.filter(t => t.priority === 'critical').length,
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length
    },
    byStatus: {
      pending: tasks.filter(t => t.status === 'pending').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      blocked: tasks.filter(t => t.status === 'blocked').length
    }
  });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, task: body });
}
