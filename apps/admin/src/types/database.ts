export type OnboardingStatus =
  | 'Lead'
  | 'Proposal Sent'
  | 'Contract Signed'
  | 'Kickoff Scheduled'
  | 'Active'
  | 'Payment Pending'
  | 'Completed'
  | 'Churned';

export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent';

export interface ClientOnboarding {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  phone?: string;
  status: OnboardingStatus;
  priority: Priority;
  assigned_to?: string;
  project_value?: number;
  target_launch_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const INITIAL_MOCK_CLIENTS: ClientOnboarding[] = [
  {
    id: '1',
    client_name: 'Arjun Mehta',
    company_name: 'Nexus Labs',
    email: 'arjun@nexuslabs.io',
    phone: '+91 98765 43210',
    status: 'Active',
    priority: 'High',
    assigned_to: 'Priya S.',
    project_value: 120000,
    target_launch_date: '2026-12-01',
    notes: 'Needs weekly status updates.',
    created_at: '2026-09-01T09:00:00Z',
    updated_at: '2026-10-20T10:00:00Z',
  },
  {
    id: '2',
    client_name: 'Sara Johnson',
    company_name: 'Bloom Retail',
    email: 'sara@bloomretail.com',
    status: 'Payment Pending',
    priority: 'Urgent',
    assigned_to: 'Rahul D.',
    project_value: 45000,
    target_launch_date: '2026-11-15',
    created_at: '2026-09-15T11:00:00Z',
    updated_at: '2026-10-25T08:30:00Z',
  },
  {
    id: '3',
    client_name: 'David Kim',
    company_name: 'FinTrack AI',
    email: 'david@fintrack.ai',
    status: 'Kickoff Scheduled',
    priority: 'Normal',
    assigned_to: 'Priya S.',
    project_value: 85000,
    target_launch_date: '2026-11-30',
    created_at: '2026-10-01T10:00:00Z',
    updated_at: '2026-10-28T09:00:00Z',
  },
  {
    id: '4',
    client_name: 'Meera Patel',
    company_name: 'GreenPath Consulting',
    email: 'meera@greenpath.co',
    status: 'Proposal Sent',
    priority: 'Normal',
    project_value: 30000,
    created_at: '2026-10-10T14:00:00Z',
    updated_at: '2026-10-29T07:00:00Z',
  },
  {
    id: '5',
    client_name: 'Tom Rivera',
    company_name: 'SkyBuild Corp',
    email: 'tom@skybuild.com',
    status: 'Completed',
    priority: 'Low',
    assigned_to: 'Rahul D.',
    project_value: 200000,
    target_launch_date: '2026-10-01',
    created_at: '2026-07-01T09:00:00Z',
    updated_at: '2026-10-05T16:00:00Z',
  },
];
