import React from 'react';

export default function WelfarePage() {
  const funds = [
    { title: 'Worker Health & OPD Insurance Fund', amount: '₹14,595', description: 'Covers outpatient claims & annual health checkups for member families.' },
    { title: 'Accidental Disability & Life Cover', amount: '₹4,865', description: '24/7 on-the-job accidental life & hospitalization indemnity pool.' },
    { title: 'Cooperative Micro-Pension Savings', amount: '₹4,865', description: 'Long-term compounding pension credits accrued automatically per job.' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Worker Welfare & Micro-Insurance Ledger</h2>
        <p className="text-sm text-slate-500 mt-1">Automatic 5% deductions collected from every service job, feeding worker social security pools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {funds.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-sm font-semibold text-slate-700">{f.title}</h3>
            <div className="text-2xl font-extrabold text-emerald-700">{f.amount}</div>
            <p className="text-xs text-slate-500">{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
