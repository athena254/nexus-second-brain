'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const nodes = [
  { id: '1', title: 'AI Agents', topic: 'AI', connections: 12 },
  { id: '2', title: 'React', topic: 'Frontend', connections: 8 },
  { id: '3', title: 'Automation', topic: 'AI', connections: 6 },
  { id: '4', title: 'TypeScript', topic: 'Frontend', connections: 7 },
  { id: '5', title: 'Claude API', topic: 'AI', connections: 5 },
];

const edges = [
  { source: '1', target: '3' },
  { source: '1', target: '5' },
  { source: '2', target: '4' },
];

const colors: Record<string, string> = {
  AI: '#7B5CF0',
  Frontend: '#06B6D4',
  Backend: '#10B981',
};

export default function GraphPage() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;
    
    svg.attr('width', width).attr('height', height);
    svg.selectAll('*').remove();
    
    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(edges).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(edges)
      .join('line')
      .attr('stroke', '#7B5CF0')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g');

    node.append('circle')
      .attr('r', (d) => 15 + d.connections * 2)
      .attr('fill', (d) => colors[d.topic] || '#7B5CF0')
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 2);

    node.append('text')
      .text((d) => d.title)
      .attr('text-anchor', 'middle')
      .attr('dy', 30)
      .attr('fill', '#94a3b8')
      .attr('font-size', '11px');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span>🕸️</span> Knowledge Graph
        </h1>
        <p className="text-slate-400 mt-1">Explore connections in your brain.</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <svg ref={svgRef} className="w-full" style={{ height: '600px' }} />
      </div>

      <div className="flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <span className="text-slate-400">AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500" />
          <span className="text-slate-400">Frontend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-slate-400">Backend</span>
        </div>
      </div>
    </div>
  );
}
