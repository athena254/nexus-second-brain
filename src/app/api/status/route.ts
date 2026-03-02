import { NextResponse } from 'next/server';
import { apiStatuses, systemMetrics } from '@/lib/data';

export async function GET() {
  // Simulate real-time status checks
  const statusWithTimestamp = apiStatuses.map(api => ({
    ...api,
    lastChecked: 'Just now',
    latency: api.latency ? api.latency + Math.floor(Math.random() * 20) - 10 : undefined
  }));

  const metricsWithValues = systemMetrics.map(metric => ({
    ...metric,
    value: metric.label === 'CPU Usage' 
      ? Math.min(100, metric.value + Math.floor(Math.random() * 10) - 5)
      : metric.value
  }));

  return NextResponse.json({
    apis: statusWithTimestamp,
    metrics: metricsWithValues,
    timestamp: new Date().toISOString()
  });
}
