'use client';

import { useState } from 'react';
import type { ClientOnboarding, OnboardingStatus } from '@/types/database';
import { toast } from 'sonner';
import { Trash2, Search, Filter } from 'lucide-react';

interface ClientTableProps {
  clients: ClientOnboarding[];
  onUpdateStatus?: (id: string, newStatus: OnboardingStatus) => void;
  onDeleteClient?: (id: string) => void;
}

const ALL_STATUSES: OnboardingStatus[] = [
  'Lead',
  'Proposal Sent',
  'Contract Signed',
  'Kickoff Scheduled',
  'Active',
  'Payment Pending',
  'Completed',
  'Churned',
];

const STATUS_COLORS: Record<string, string> = {
  Lead: 'bg-gray-600/30 text-gray-300 border-gray-500/50',
  'Proposal Sent': 'bg-blue-600/30 text-blue-300 border-blue-500/50',
  'Contract Signed': 'bg-cyan-600/30 text-cyan-300 border-cyan-500/50',
  'Kickoff Scheduled': 'bg-purple-600/30 text-purple-300 border-purple-500/50',
  Active: 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50',
  'Payment Pending': 'bg-amber-600/30 text-amber-300 border-amber-500/50',
  Completed: 'bg-green-600/30 text-green-300 border-green-500/50',
  Churned: 'bg-red-600/30 text-red-300 border-red-500/50',
};

const PRIORITY_COLORS: Record<string, string> = {
  Low: 'text-gray-400',
  Normal: 'text-blue-400',
  High: 'text-amber-400 font-semibold',
  Urgent: 'text-rose-400 font-bold',
};

export default function ClientTable({
  clients,
  onUpdateStatus,
  onDeleteClient,
}: ClientTableProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.client_name.toLowerCase().includes(search.toLowerCase()) ||
      c.company_name.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().includes(search.toLowerCase()) ||
      (c.assigned_to && c.assigned_to.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === 'ALL' ? true : c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalValue = filtered.reduce(
    (sum, c) => sum + (c.project_value || 0),
    0
  );

  const fmt = (val?: number) =>
    val ? `₹${val.toLocaleString('en-IN')}` : '—';

  const handleStatusChange = (id: string, newStatus: OnboardingStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(id, newStatus);
      toast.success(`Client status updated to "${newStatus}"`);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (onDeleteClient) {
      onDeleteClient(id);
      toast.error(`Removed client "${name}"`);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur overflow-hidden">
      {/* Table Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 px-6 py-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            Client Onboarding Pipeline
            <span className="text-xs bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-mono">
              {filtered.length} of {clients.length}
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Filtered Pipeline Value:{' '}
            <span className="text-emerald-400 font-semibold font-mono">
              ₹{totalValue.toLocaleString('en-IN')}
            </span>
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-56 pl-9 pr-3 py-1.5 rounded-lg border border-white/10 bg-slate-800 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative flex items-center">
            <Filter className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-1.5 rounded-lg border border-white/10 bg-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Status Filter Pills */}
      <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/40 border-b border-white/5 overflow-x-auto text-xs">
        <span className="text-gray-400 font-medium mr-1">Quick Filters:</span>
        {['ALL', 'Active', 'Payment Pending', 'Kickoff Scheduled', 'Completed'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full transition font-medium whitespace-nowrap ${
              statusFilter === s
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {s === 'ALL' ? 'Show All' : s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-300">
          <thead>
            <tr className="border-b border-white/10 bg-slate-800/60 text-xs uppercase tracking-wider text-gray-400">
              <th className="px-6 py-3.5 text-left font-semibold">Client &amp; Company</th>
              <th className="px-6 py-3.5 text-left font-semibold">Status (Interactive)</th>
              <th className="px-6 py-3.5 text-left font-semibold">Priority</th>
              <th className="px-6 py-3.5 text-left font-semibold">Value</th>
              <th className="px-6 py-3.5 text-left font-semibold">Launch Date</th>
              <th className="px-6 py-3.5 text-left font-semibold">Assigned To</th>
              <th className="px-6 py-3.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  <p className="text-base font-medium">No clients match your filter.</p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setStatusFilter('ALL');
                    }}
                    className="mt-2 text-xs text-indigo-400 hover:underline"
                  >
                    Clear search and filters
                  </button>
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.id}
                  className="transition hover:bg-white/[0.03] group"
                >
                  <td className="px-6 py-3.5 font-medium text-white">
                    <div className="text-base font-semibold">{c.client_name}</div>
                    <div className="text-xs text-indigo-300 font-normal">{c.company_name}</div>
                    <div className="text-xs text-gray-400 font-normal">{c.email}</div>
                  </td>

                  {/* Interactive Status Selector */}
                  <td className="px-6 py-3.5">
                    <select
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(c.id, e.target.value as OnboardingStatus)
                      }
                      className={`text-xs font-semibold rounded-lg px-2.5 py-1 border transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                        STATUS_COLORS[c.status] ?? 'bg-slate-700 text-white'
                      }`}
                    >
                      {ALL_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-slate-900 text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className={`px-6 py-3.5 ${PRIORITY_COLORS[c.priority]}`}>
                    {c.priority}
                  </td>

                  <td className="px-6 py-3.5 font-mono text-white font-medium">
                    {fmt(c.project_value)}
                  </td>

                  <td className="px-6 py-3.5 text-gray-300 text-xs">
                    {c.target_launch_date
                      ? new Date(c.target_launch_date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </td>

                  <td className="px-6 py-3.5 text-gray-300 text-xs">
                    {c.assigned_to ? (
                      <span className="bg-slate-800 px-2.5 py-1 rounded-md border border-white/10 text-gray-200">
                        {c.assigned_to}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>

                  <td className="px-6 py-3.5 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.client_name)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Delete client"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
