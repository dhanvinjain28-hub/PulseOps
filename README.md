# PulseOps

> **The 15-second visual cockpit for digital agencies to track, update, and manage their client onboarding pipeline in real time.**

---

## 🎯 The Problem
Agencies lose dozens of hours every week manually chasing client updates across scattered spreadsheets, Slack threads, and email chains. Key operational bottlenecks include:
- Unclear visibility into signed contracts versus unpaid invoices (`Payment Pending`).
- Missed follow-ups and delayed kickoff calls.
- Confusion over team member assignments and task ownership.
- Lack of immediate priority flags for urgent client blockers.

## 🚀 The Solution
**OpsFlow** eliminates operational chaos by providing agency founders and operations leads with a unified, real-time dashboard. In under 15 seconds, teams can review client statuses, assign ownership, manage launch targets, and resolve bottlenecks without spreadsheet clutter.

---

## ✨ Key Features

- 📊 **KPI Executive Metrics:** Instant summary cards displaying Total Clients, Action Required (payment blockers/urgent priority), Active Onboardings, and Average Time to Kickoff.
- 🔄 **Interactive Pipeline Table:** Search, filter (`All`, `Pending`, `Active`), and track client progress in real time.
- ⚡ **One-Click Inline Status Updates:** Seamlessly transition clients between stages (`Lead` ➔ `Contract Sent` ➔ `Payment Pending` ➔ `Kickoff Scheduled` ➔ `Active`) with instant backend synchronization.
- 🏷️ **Smart Color Badges:** Distinct visual color coding for both onboarding statuses and priority levels (`Low`, `Medium`, `High`, `Urgent`).
- 📝 **Modal Onboarding Form:** Quick client intake with validation and toast notification feedback (`sonner`).
- 🛡️ **Offline & Demo Fallback:** Built-in fallback data layer ensuring full UI functionality even when disconnected from Supabase.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router, TypeScript)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (Radix UI Primitives)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database & Backend:** [Supabase](https://supabase.com/) (PostgreSQL with RLS)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚦 Getting Started

### 1. Prerequisites
Ensure you have the following installed on your local machine:
- Node.js (v18.x or higher)
- npm or pnpm

### 2. Installation

Clone the repository and install dependencies:
```bash
git clone [https://github.com/dhanvinjain28-hub/antigravity-intelligent-franklin.git](https://github.com/dhanvinjain28-hub/antigravity-intelligent-franklin.git)
cd antigravity-intelligent-franklin
npm install