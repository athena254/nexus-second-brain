import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { DashboardProvider } from '@/context/DashboardContext';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agent Command Center | DisMuriuki',
  description: 'AI Ecosystem Dashboard for monitoring and managing AI agents',
  keywords: ['AI', 'agents', 'dashboard', 'monitoring', 'orchestration'],
  authors: [{ name: 'Ishtar' }],
  openGraph: {
    title: 'Agent Command Center',
    description: 'AI Ecosystem Dashboard',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <DashboardProvider>
            <div className="min-h-screen">
              <Navigation />
              {children}
            </div>
          </DashboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
