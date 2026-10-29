import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Active Society Workers', value: '124', change: '+12 this month', color: 'border-blue-500' },
    { label: 'Pending KYC Verifications', value: '6', change: 'Requires review', color: 'border-amber-500' },
    { label: 'Total Jobs This Month', value: '842', change: '99.4% completion', color: 'border-emerald-500' },
    { label: 'Worker Wages Disbursed (82%)', value: '₹3,98,930', change: 'Fair wage index', color: 'border-indigo-500' },
    { label: 'Society Maint. Fund (8%)', value: '₹38,920', change: 'Operational pool', color: 'border-purple-500' },
    { label: 'Welfare & Micro-Insurance (5%)', value: '₹24,325', change: 'Health/Pension pool', color: 'border-teal-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">PulseOps – Society Operations &amp; Welfare Overview</h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time metrics for Bengaluru South Skilled Labourers Cooperative Society (SOC-BLR-SOUTH-042).
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition"
        >
          Open Client Onboarding Dashboard →
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className={`bg-white p-6 rounded-xl border-l-4 ${item.color} shadow-sm border-t border-r border-b border-slate-200`}>
            <div className="text-sm font-medium text-slate-500">{item.label}</div>
            <div className="text-3xl font-extrabold text-slate-800 mt-2">{item.value}</div>
            <div className="text-xs text-slate-400 mt-2">{item.change}</div>
          </div>
        ))}
      </div>

      {/* Quick Action Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fair Split Transparency Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center justify-between">
            <span>SRS v1.1 Fair Split Breakdown</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">Formula Active</span>
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Worker Direct Wage</span>
                <span>82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Society Local Maintenance</span>
                <span>8%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Micro-Insurance & Pension Fund</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Platform Operations & SMS Gateway</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full mt-1 overflow-hidden">
                <div className="bg-slate-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 pt-2 border-t border-slate-100">
            * 100% of approved material costs are passed through directly to the worker with zero commission.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Quick Administrative Actions</h3>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Link href="/dashboard" className="p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-center transition">
              <div className="font-semibold text-sm text-indigo-900">Client Pipeline Tracker</div>
              <div className="text-xs text-indigo-600 mt-1">Open Dashboard →</div>
            </Link>
            <Link href="/workers" className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center transition">
              <div className="font-semibold text-sm text-slate-800">Verify Worker KYC</div>
              <div className="text-xs text-amber-600 mt-1">6 Pending Approval</div>
            </Link>
            <Link href="/bookings" className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center transition">
              <div className="font-semibold text-sm text-slate-800">Live Dispatches</div>
              <div className="text-xs text-emerald-600 mt-1">14 In Progress</div>
            </Link>
            <Link href="/welfare" className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-center transition">
              <div className="font-semibold text-sm text-slate-800">Welfare Ledger</div>
              <div className="text-xs text-slate-500 mt-1">₹24,325 Accrued</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
