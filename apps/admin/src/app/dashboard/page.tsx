'use client';

import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { INITIAL_MOCK_CLIENTS, type ClientOnboarding, type OnboardingStatus } from '@/types/database';
import MetricCard from '@/components/dashboard/metric-card';
import { User, AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react';
import ClientTable from '@/components/dashboard/client-table';
import AddClientDialog from '@/components/dashboard/add-client-dialog';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [clients, setClients] = useState<ClientOnboarding[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        if (isSupabaseConfigured) {
          const { data, error } = await supabase
            .from('client_onboardings')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          setClients(data as ClientOnboarding[]);
        } else {
          // fallback to mock data
          setClients(INITIAL_MOCK_CLIENTS);
        }
      } catch (e) {
        console.error('Failed to load onboarding data', e);
        setClients(INITIAL_MOCK_CLIENTS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Status update handler
  const handleUpdateStatus = async (id: string, newStatus: OnboardingStatus) => {
    setClients((prev) =>
      prev
        ? prev.map((c) =>
            c.id === id
              ? { ...c, status: newStatus, updated_at: new Date().toISOString() }
              : c
          )
        : prev
    );

    if (isSupabaseConfigured) {
      try {
        await supabase
          .from('client_onboardings')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', id);
      } catch (err) {
        console.error('Failed to update status in Supabase', err);
      }
    }
  };

  // Client deletion handler
  const handleDeleteClient = async (id: string) => {
    setClients((prev) => (prev ? prev.filter((c) => c.id !== id) : prev));

    if (isSupabaseConfigured) {
      try {
        await supabase.from('client_onboardings').delete().eq('id', id);
      } catch (err) {
        console.error('Failed to delete client from Supabase', err);
      }
    }
  };

  // Client added handler
  const handleClientAdded = (newClient: ClientOnboarding) => {
    setClients((prev) => (prev ? [newClient, ...prev] : [newClient]));
    toast.success(`Client "${newClient.client_name}" added to pipeline!`);
  };

  // ----- Metric calculations -------------------------------------------------
  const totalClients = clients?.length ?? 0;
  const actionRequired =
    clients?.filter(
      (c) => c.status === 'Payment Pending' || c.priority === 'Urgent'
    ).length ?? 0;
  const activeOnboardings =
    clients?.filter((c) => c.status === 'Active').length ?? 0;

  const avgTimeToKickoff = (() => {
    const kickoffClients = clients?.filter(
      (c) =>
        c.status === 'Kickoff Scheduled' &&
        c.target_launch_date &&
        c.created_at
    );
    if (!kickoffClients?.length) return '--';
    const totalDays = kickoffClients.reduce((sum, c) => {
      const created = new Date(c.created_at);
      const launch = new Date(c.target_launch_date!);
      const diff = (launch.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
      return sum + diff;
    }, 0);
    const avg = totalDays / kickoffClients.length;
    return `${avg.toFixed(1)}d`;
  })();

  return (
    <main className="min-h-screen bg-slate-950 p-6 md:p-10 text-white">
      {/* Top Header */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Real-time Pipeline
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">
            PulseOps Client Onboarding
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            15-second visual cockpit for client kickoff, contract milestones, and payment follow-ups.
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition active:scale-95"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 w-full animate-pulse rounded-xl bg-slate-900 border border-white/5"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {/* KPI Metrics */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Clients"
              value={totalClients}
              icon={<User size={24} />}
              bgClass="bg-slate-900/90"
            />
            <MetricCard
              title="Action Required"
              value={actionRequired}
              icon={<AlertTriangle size={24} />}
              bgClass="bg-amber-950/40 border-amber-500/30"
            />
            <MetricCard
              title="Active Onboardings"
              value={activeOnboardings}
              icon={<CheckCircle size={24} />}
              bgClass="bg-emerald-950/40 border-emerald-500/30"
            />
            <MetricCard
              title="Avg. Time to Kickoff"
              value={avgTimeToKickoff}
              icon={<Clock size={24} />}
              bgClass="bg-indigo-950/40 border-indigo-500/30"
            />
          </section>

          {/* Interactive Client Pipeline Table */}
          <ClientTable
            clients={clients || []}
            onUpdateStatus={handleUpdateStatus}
            onDeleteClient={handleDeleteClient}
          />
        </div>
      )}

      {/* Add Client Modal */}
      <AddClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onClientAdded={handleClientAdded}
      />
    </main>
  );
}
