import { useEffect, useState, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_MOCK_CLIENTS, type ClientOnboarding, STATUS_CONFIG, PRIORITY_CONFIG } from '@/types/database';
import { toast } from 'sonner';

// Simple utility for class concatenation (fallback if not present)
const cn = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function ClientTable() {
  const [clients, setClients] = useState<ClientOnboarding[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState<'All' | 'Pending' | 'Active'>('All');

  // Load data (Supabase or mock)
  useEffect(() => {
    async function load() {
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('client_onboardings')
            .select('*');
          if (error) throw error;
          setClients(data as ClientOnboarding[]);
        } else {
          setClients(INITIAL_MOCK_CLIENTS);
        }
      } catch (e) {
        console.error(e);
        toast.error('Failed to load client data');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtered & searched list
  const displayedClients = useMemo(() => {
    let filtered = clients;
    if (statusTab !== 'All') {
      if (statusTab === 'Pending') {
        filtered = filtered.filter((c) =>
          c.status === 'Payment Pending' || c.status === 'Contract Sent'
        );
      } else if (statusTab === 'Active') {
        filtered = filtered.filter((c) => c.status === 'Active');
      }
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.client_name.toLowerCase().includes(term) ||
          c.company_name.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [clients, statusTab, search]);

  // Handle status change inline
  const handleStatusChange = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus as any } : c))
    );
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('client_onboardings')
        .update({ status: newStatus })
        .eq('id', id);
      if (error) {
        toast.error('Failed to update status');
        // roll back UI
        setClients((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: c.status } : c))
        );
        return;
      }
    }
    toast.success('Status updated');
  };

  if (loading) {
    return (
      <div className="mt-8 flex animate-pulse justify-center">
        <div className="h-8 w-48 rounded bg-gray-700" />
      </div>
    );
  }

  return (
    <section className="mt-8">
      {/* Search & Tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by client or company..."
          className="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex space-x-2">
          {['All', 'Pending', 'Active'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                'rounded px-3 py-1 text-sm font-medium',
                statusTab === tab
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              )}
              onClick={() => setStatusTab(tab as any)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-300">
                Client
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-300">
                Company
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-300">
                Service Tier
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-300">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-300">
                Priority
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase text-gray-300">
                Launch Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-900">
            {displayedClients.map((c) => (
              <tr key={c.id} className="hover:bg-gray-800">
                <td className="px-4 py-2 text-sm text-white">{c.client_name}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{c.company_name}</td>
                <td className="px-4 py-2 text-sm text-gray-300">{c.service_tier}</td>
                <td className="px-4 py-2 text-sm">
                  <select
                    className={cn(
                      'rounded border border-gray-600 bg-gray-800 p-1 text-sm text-white',
                      STATUS_CONFIG[c.status as any].bgClass
                    )}
                    value={c.status}
                    onChange={(e) =>
                      handleStatusChange(c.id, e.target.value)
                    }
                  >
                    {Object.keys(STATUS_CONFIG).map((st) => (
                      <option key={st} value={st}>
                        {STATUS_CONFIG[st as any].label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={cn(
                      'inline-block rounded px-2 py-0.5 text-xs font-medium',
                      PRIORITY_CONFIG[c.priority as any].bgClass,
                      PRIORITY_CONFIG[c.priority as any].textClass,
                      PRIORITY_CONFIG[c.priority as any].borderClass
                    )}
                  >
                    {PRIORITY_CONFIG[c.priority as any].label}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-300">
                  {c.target_launch_date ?? '--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
