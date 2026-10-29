import React from 'react';

export default function WorkersPage() {
  const workers = [
    {
      id: 'W-001',
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      skills: ['ELECTRICAL', 'APPLIANCE_REPAIR'],
      status: 'VERIFIED',
      rating: 4.9,
      jobs: 142,
      wallet: '₹250.00',
    },
    {
      id: 'W-002',
      name: 'Suresh Patil',
      phone: '+91 98765 43211',
      skills: ['PLUMBING', 'GENERAL_MAINTENANCE'],
      status: 'VERIFIED',
      rating: 4.8,
      jobs: 98,
      wallet: '₹180.00',
    },
    {
      id: 'W-003',
      name: 'Manjunath Gowda',
      phone: '+91 98765 43214',
      skills: ['CARPENTRY'],
      status: 'PENDING',
      rating: 5.0,
      jobs: 0,
      wallet: '₹0.00',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Worker Registry & KYC Management</h2>
          <p className="text-sm text-slate-500 mt-1">Review credentials, skills, and welfare balances of affiliated workers.</p>
        </div>
        <button className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
          + Onboard New Worker
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Worker Name & ID</th>
              <th className="py-3 px-4 text-left">Phone Number</th>
              <th className="py-3 px-4 text-left">Verified Skills</th>
              <th className="py-3 px-4 text-left">KYC Status</th>
              <th className="py-3 px-4 text-left">Rating / Jobs</th>
              <th className="py-3 px-4 text-left">Wallet Balance</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {workers.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-medium text-slate-800">
                  <div>{w.name}</div>
                  <div className="text-xs text-slate-400">{w.id}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{w.phone}</td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1">
                    {w.skills.map((s, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  {w.status === 'VERIFIED' ? (
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  ) : (
                    <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                      Pending Review
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-slate-600">
                  ★ {w.rating} ({w.jobs} completed)
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-700">{w.wallet}</td>
                <td className="py-3.5 px-4 text-right space-x-2">
                  <button className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold">View Details</button>
                  {w.status === 'PENDING' && (
                    <button className="text-xs bg-emerald-600 text-white px-2.5 py-1 rounded hover:bg-emerald-700">
                      Approve KYC
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
