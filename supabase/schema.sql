-- ==============================================================================
-- OpsFlow: Agency Operations & Client Onboarding Tracker
-- Supabase PostgreSQL Schema & Seed Migration Script
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLE CREATION
CREATE TABLE IF NOT EXISTS public.client_onboardings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    email TEXT NOT NULL,
    service_tier TEXT NOT NULL CHECK (service_tier IN ('Basic', 'Pro', 'Enterprise')),
    status TEXT NOT NULL DEFAULT 'Lead' CHECK (status IN ('Lead', 'Contract Sent', 'Payment Pending', 'Kickoff Scheduled', 'Active')),
    priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
    assigned_to TEXT,
    target_launch_date DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_client_onboardings_status ON public.client_onboardings(status);
CREATE INDEX IF NOT EXISTS idx_client_onboardings_priority ON public.client_onboardings(priority);
CREATE INDEX IF NOT EXISTS idx_client_onboardings_created_at ON public.client_onboardings(created_at DESC);

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.client_onboardings ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Public can view client onboardings" ON public.client_onboardings;
DROP POLICY IF EXISTS "Public can insert client onboardings" ON public.client_onboardings;
DROP POLICY IF EXISTS "Public can update client onboardings" ON public.client_onboardings;
DROP POLICY IF EXISTS "Public can delete client onboardings" ON public.client_onboardings;

-- Enable full read/write for hackathon demo (anon & authenticated users)
CREATE POLICY "Public can view client onboardings"
    ON public.client_onboardings
    FOR SELECT
    TO anon, authenticated
    USING (true);

CREATE POLICY "Public can insert client onboardings"
    ON public.client_onboardings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "Public can update client onboardings"
    ON public.client_onboardings
    FOR UPDATE
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Public can delete client onboardings"
    ON public.client_onboardings
    FOR DELETE
    TO anon, authenticated
    USING (true);

-- 5. REALISTIC SEED DATA (8 Rows Covering Varied Tiers, Statuses & Priorities)
-- Delete seed data if re-running script to avoid duplicate demo keys
DELETE FROM public.client_onboardings WHERE id IN (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    'a12b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    'b23c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    'c34d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
    'd45e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
    'e56f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b'
);

INSERT INTO public.client_onboardings (
    id,
    client_name,
    company_name,
    email,
    service_tier,
    status,
    priority,
    assigned_to,
    target_launch_date,
    notes,
    created_at
) VALUES
(
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'Sarah Connor',
    'Cyberdyne Systems',
    'sarah.connor@cyberdyne.ai',
    'Enterprise',
    'Active',
    'Urgent',
    'Elena Rostova',
    '2026-11-15',
    'Full AI workflow migration with dedicated 24/7 SLA. Phase 1 completed.',
    '2026-10-20 10:00:00+00'
),
(
    '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    'David Miller',
    'Apex Capital Partners',
    'david@apexcapital.io',
    'Pro',
    'Payment Pending',
    'High',
    'Marcus Chen',
    '2026-11-10',
    'Invoice #INV-2026-088 sent. Awaiting wire transfer confirmation from finance desk.',
    '2026-10-22 14:30:00+00'
),
(
    '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    'Rachel Adams',
    'Lumina Health Technologies',
    'rachel@luminahealth.com',
    'Pro',
    'Kickoff Scheduled',
    'High',
    'Sarah Jenkins',
    '2026-11-05',
    'Discovery call held. Technical kickoff session scheduled for Thursday 2 PM EST.',
    '2026-10-24 09:15:00+00'
),
(
    'a12b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
    'Michael Vance',
    'Orbit Creative Media',
    'mvance@orbitmedia.agency',
    'Basic',
    'Lead',
    'Low',
    'Alex Rivera',
    '2026-12-01',
    'Introductory outreach done. Requested pricing sheet for ongoing content retainer.',
    '2026-10-25 11:45:00+00'
),
(
    'b23c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e',
    'Sophia Martinez',
    'GreenPulse Global',
    'smartinez@greenpulse.eco',
    'Enterprise',
    'Contract Sent',
    'Medium',
    'Sarah Jenkins',
    '2026-11-20',
    'Master Services Agreement (MSA) with legal team under standard 5-day review.',
    '2026-10-26 16:20:00+00'
),
(
    'c34d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f',
    'James Wilson',
    'NextGen Robotics Labs',
    'j.wilson@nextgenrobotics.com',
    'Pro',
    'Payment Pending',
    'Urgent',
    'Marcus Chen',
    '2026-11-08',
    'Stripe payment link resent. Followed up with CFO via phone call.',
    '2026-10-27 08:00:00+00'
),
(
    'd45e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a',
    'Priya Sharma',
    'FinScale Solutions',
    'psharma@finscale.io',
    'Enterprise',
    'Kickoff Scheduled',
    'High',
    'Elena Rostova',
    '2026-11-12',
    'Integrations team invited. Architecture diagrams and API access keys received.',
    '2026-10-28 13:10:00+00'
),
(
    'e56f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b',
    'Lucas Reed',
    'Artisan Craft Roasters',
    'lucas@artisancraft.co',
    'Basic',
    'Active',
    'Medium',
    'Alex Rivera',
    '2026-11-02',
    'E-commerce revamp launched. Post-launch analytics monitoring in progress.',
    '2026-10-29 10:30:00+00'
);
