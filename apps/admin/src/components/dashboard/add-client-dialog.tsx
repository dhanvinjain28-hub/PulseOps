'use client';

import { useState } from 'react';
import type { ClientOnboarding, OnboardingStatus, Priority } from '@/types/database';

interface AddClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClientAdded: (client: ClientOnboarding) => void;
}

const STATUSES: OnboardingStatus[] = [
  'Lead',
  'Proposal Sent',
  'Contract Signed',
  'Kickoff Scheduled',
  'Active',
  'Payment Pending',
  'Completed',
  'Churned',
];

const PRIORITIES: Priority[] = ['Low', 'Normal', 'High', 'Urgent'];

const defaultForm = {
  client_name: '',
  company_name: '',
  email: '',
  phone: '',
  status: 'Lead' as OnboardingStatus,
  priority: 'Normal' as Priority,
  assigned_to: '',
  project_value: '',
  target_launch_date: '',
  notes: '',
};

export default function AddClientDialog({
  open,
  onOpenChange,
  onClientAdded,
}: AddClientDialogProps) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const now = new Date().toISOString();
      const newClient: ClientOnboarding = {
        id: crypto.randomUUID(),
        client_name: form.client_name,
        company_name: form.company_name,
        email: form.email,
        phone: form.phone || undefined,
        status: form.status,
        priority: form.priority,
        assigned_to: form.assigned_to || undefined,
        project_value: form.project_value ? Number(form.project_value) : undefined,
        target_launch_date: form.target_launch_date || undefined,
        notes: form.notes || undefined,
        created_at: now,
        updated_at: now,
      };
      onClientAdded(newClient);
      setForm(defaultForm);
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900 p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Add New Client</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Client Name *
              </label>
              <input
                required
                name="client_name"
                value={form.client_name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Company *
              </label>
              <input
                required
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Email *
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@acme.com"
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Phone
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Priority
              </label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Project Value (₹)
              </label>
              <input
                type="number"
                name="project_value"
                value={form.project_value}
                onChange={handleChange}
                placeholder="50000"
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-400">
                Target Launch Date
              </label>
              <input
                type="date"
                name="target_launch_date"
                value={form.target_launch_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Assigned To
            </label>
            <input
              name="assigned_to"
              value={form.assigned_to}
              onChange={handleChange}
              placeholder="Team member name"
              className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-400">
              Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Any special requirements…"
              className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg px-4 py-2 text-sm text-gray-400 hover:bg-white/10 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Adding…' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
