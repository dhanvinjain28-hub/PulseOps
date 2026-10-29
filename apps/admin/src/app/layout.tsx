import './globals.css';
import React from 'react';
import Link from 'next/link';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'PulseOps Admin Portal | Cooperative Federation & Operations Management',
  description: 'PulseOps - Manage verified cooperative gig workers, fair dispatch, client pipelines, and revenue splits.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
              <span className="bg-emerald-600 text-white font-bold p-2 rounded-lg text-lg">PO</span>
              <div>
                <h1 className="text-xl font-bold tracking-tight">PulseOps</h1>
                <p className="text-xs text-emerald-200">Labour Cooperative Federation Portal</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="hover:text-emerald-200 transition">Society Overview</Link>
              <Link
                href="/dashboard"
                className="rounded-full bg-emerald-700 hover:bg-emerald-600 border border-emerald-400 px-3.5 py-1.5 text-white font-semibold transition shadow-sm"
              >
                PulseOps Dashboard ↗
              </Link>
              <Link href="/workers" className="hover:text-emerald-200 transition">Worker KYC &amp; Registry</Link>
              <Link href="/bookings" className="hover:text-emerald-200 transition">Active Dispatches</Link>
              <Link href="/welfare" className="hover:text-emerald-200 transition">Welfare &amp; Insurance</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <span className="text-xs bg-emerald-700 px-2.5 py-1 rounded-full text-emerald-100 border border-emerald-600">
                Bengaluru South Society
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
          PulseOps v1.1 • Owned &amp; Governed by Labour Cooperative Societies • Transparent Fair Split System
        </footer>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
