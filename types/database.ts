export type ServiceTier = 'Basic' | 'Pro' | 'Enterprise';

export type OnboardingStatus =
  | 'Lead'
  | 'Contract Sent'
  | 'Payment Pending'
  | 'Kickoff Scheduled'
  | 'Active';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ClientOnboarding {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  service_tier: ServiceTier;
  status: OnboardingStatus;
  priority: Priority;
  assigned_to: string | null;
  target_launch_date: string | null; // ISO Date YYYY-MM-DD
  notes: string | null;
  created_at: string; // ISO Timestamp
}

export type ClientOnboardingInsert = Omit<ClientOnboarding, 'id' | 'created_at'> & {
  id?: string;
  created_at?: string;
};

export type ClientOnboardingUpdate = Partial<ClientOnboardingInsert>;

export interface Database {
  public: {
    Tables: {
      client_onboardings: {
        Row: ClientOnboarding;
        Insert: ClientOnboardingInsert;
        Update: ClientOnboardingUpdate;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      service_tier: ServiceTier;
      onboarding_status: OnboardingStatus;
      priority: Priority;
    };
  };
}

// Visual badge color configurations aligned with OpsFlow Design System
export const STATUS_CONFIG: Record<
  OnboardingStatus,
  {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
    dotClass: string;
  }
> = {
  Lead: {
    label: 'Lead',
    bgClass: 'bg-slate-500/10',
    textClass: 'text-slate-400',
    borderClass: 'border-slate-500/20',
    dotClass: 'bg-slate-400',
  },
  'Contract Sent': {
    label: 'Contract Sent',
    bgClass: 'bg-blue-500/10',
    textClass: 'text-blue-400',
    borderClass: 'border-blue-500/20',
    dotClass: 'bg-blue-400',
  },
  'Payment Pending': {
    label: 'Payment Pending',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    dotClass: 'bg-amber-400',
  },
  'Kickoff Scheduled': {
    label: 'Kickoff Scheduled',
    bgClass: 'bg-indigo-500/10',
    textClass: 'text-indigo-400',
    borderClass: 'border-indigo-500/20',
    dotClass: 'bg-indigo-400',
  },
  Active: {
    label: 'Active',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20',
    dotClass: 'bg-emerald-400',
  },
};

export const PRIORITY_CONFIG: Record<
  Priority,
  {
    label: string;
    bgClass: string;
    textClass: string;
    borderClass: string;
  }
> = {
  Low: {
    label: 'Low',
    bgClass: 'bg-zinc-500/10',
    textClass: 'text-zinc-400',
    borderClass: 'border-zinc-500/20',
  },
  Medium: {
    label: 'Medium',
    bgClass: 'bg-sky-500/10',
    textClass: 'text-sky-400',
    borderClass: 'border-sky-500/20',
  },
  High: {
    label: 'High',
    bgClass: 'bg-orange-500/10',
    textClass: 'text-orange-400',
    borderClass: 'border-orange-500/20',
  },
  Urgent: {
    label: 'Urgent',
    bgClass: 'bg-rose-500/10',
    textClass: 'text-rose-400',
    borderClass: 'border-rose-500/20',
  },
};

export const SERVICE_TIER_CONFIG: Record<
  ServiceTier,
  {
    label: string;
    badgeClass: string;
  }
> = {
  Basic: {
    label: 'Basic',
    badgeClass: 'bg-zinc-800 text-zinc-300 border-zinc-700',
  },
  Pro: {
    label: 'Pro',
    badgeClass: 'bg-violet-950/60 text-violet-300 border-violet-800/40',
  },
  Enterprise: {
    label: 'Enterprise',
    badgeClass: 'bg-amber-950/50 text-amber-300 border-amber-800/40',
  },
};

// Fallback mock dataset for reliable offline/unconnected hackathon testing
export const INITIAL_MOCK_CLIENTS: ClientOnboarding[] = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    client_name: 'Sarah Connor',
    company_name: 'Cyberdyne Systems',
    email: 'sarah.connor@cyberdyne.ai',
    service_tier: 'Enterprise',
    status: 'Active',
    priority: 'Urgent',
    assigned_to: 'Elena Rostova',
    target_launch_date: '2026-11-15',
    notes: 'Full AI workflow migration with dedicated 24/7 SLA. Phase 1 completed.',
    created_at: '2026-10-20T10:00:00Z',
  },
  {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    client_name: 'David Miller',
    company_name: 'Apex Capital Partners',
    email: 'david@apexcapital.io',
    service_tier: 'Pro',
    status: 'Payment Pending',
    priority: 'High',
    assigned_to: 'Marcus Chen',
    target_launch_date: '2026-11-10',
    notes: 'Invoice #INV-2026-088 sent. Awaiting wire transfer confirmation from finance desk.',
    created_at: '2026-10-22T14:30:00Z',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    client_name: 'Rachel Adams',
    company_name: 'Lumina Health Technologies',
    email: 'rachel@luminahealth.com',
    service_tier: 'Pro',
    status: 'Kickoff Scheduled',
    priority: 'High',
    assigned_to: 'Sarah Jenkins',
    target_launch_date: '2026-11-05',
    notes: 'Discovery call held. Technical kickoff session scheduled for Thursday 2 PM EST.',
    created_at: '2026-10-24T09:15:00Z',
  },
  {
    id: 'a12b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    client_name: 'Michael Vance',
    company_name: 'Orbit Creative Media',
    email: 'mvance@orbitmedia.agency',
    service_tier: 'Basic',
    status: 'Lead',
    priority: 'Low',
    assigned_to: 'Alex Rivera',
    target_launch_date: '2026-12-01',
    notes: 'Introductory outreach done. Requested pricing sheet for ongoing content retainer.',
    created_at: '2026-10-25T11:45:00Z',
  },
  {
    id: 'b23c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    client_name: 'Sophia Martinez',
    company_name: 'GreenPulse Global',
    email: 'smartinez@greenpulse.eco',
    service_tier: 'Enterprise',
    status: 'Contract Sent',
    priority: 'Medium',
    assigned_to: 'Sarah Jenkins',
    target_launch_date: '2026-11-20',
    notes: 'Master Services Agreement (MSA) with legal team under standard 5-day review.',
    created_at: '2026-10-26T16:20:00Z',
  },
  {
    id: 'c34d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
    client_name: 'James Wilson',
    company_name: 'NextGen Robotics Labs',
    email: 'j.wilson@nextgenrobotics.com',
    service_tier: 'Pro',
    status: 'Payment Pending',
    priority: 'Urgent',
    assigned_to: 'Marcus Chen',
    target_launch_date: '2026-11-08',
    notes: 'Stripe payment link resent. Followed up with CFO via phone call.',
    created_at: '2026-10-27T08:00:00Z',
  },
  {
    id: 'd45e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
    client_name: 'Priya Sharma',
    company_name: 'FinScale Solutions',
    email: 'psharma@finscale.io',
    service_tier: 'Enterprise',
    status: 'Kickoff Scheduled',
    priority: 'High',
    assigned_to: 'Elena Rostova',
    target_launch_date: '2026-11-12',
    notes: 'Integrations team invited. Architecture diagrams and API access keys received.',
    created_at: '2026-10-28T13:10:00Z',
  },
  {
    id: 'e56f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
    client_name: 'Lucas Reed',
    company_name: 'Artisan Craft Roasters',
    email: 'lucas@artisancraft.co',
    service_tier: 'Basic',
    status: 'Active',
    priority: 'Medium',
    assigned_to: 'Alex Rivera',
    target_launch_date: '2026-11-02',
    notes: 'E-commerce revamp launched. Post-launch analytics monitoring in progress.',
    created_at: '2026-10-29T10:30:00Z',
  },
];
