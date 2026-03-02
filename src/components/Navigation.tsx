'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/capture', label: 'Capture', icon: '⚡' },
    { href: '/search', label: 'Search', icon: '🔍' },
    { href: '/graph', label: 'Graph', icon: '🕸️' },
    { href: '/chat', label: 'Chat', icon: '💬' },
    { href: '/notebooks', label: 'Notebooks', icon: '📓' },
    { href: '/digest', label: 'Digest', icon: '📑' },
    { href: '/logs', label: 'Logs', icon: '📜' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-2xl">🏎️</span>
            <span className="font-bold text-white hidden sm:inline">Command Center</span>
          </Link>
          
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm whitespace-nowrap ${
                  pathname === item.href
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
