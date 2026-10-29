import React from 'react';

export default function BookingsPage() {
  const bookings = [
    {
      id: 'BK-M129X',
      customer: 'Ananya Sharma',
      worker: 'Ramesh Kumar',
      category: 'ELECTRICAL',
      status: 'IN_PROGRESS',
      startOtp: '4821',
      total: '₹450.00',
      address: 'Green Glen Layout, Bellandur',
    },
    {
      id: 'BK-L983Q',
      customer: 'Vikram Mehta',
      worker: 'Suresh Patil',
      category: 'PLUMBING',
      status: 'ARRIVED',
      startOtp: '9134',
      total: '₹350.00',
      address: 'JP Nagar 4th Phase',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Active Dispatches & State Machine Monitor</h2>
        <p className="text-sm text-slate-500 mt-1">Live tracking of service lifecycle, Start/End OTP verifications, and material approvals.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-slate-600 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Booking ID</th>
              <th className="py-3 px-4 text-left">Customer & Address</th>
              <th className="py-3 px-4 text-left">Assigned Worker</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">State</th>
              <th className="py-3 px-4 text-left">Start OTP</th>
              <th className="py-3 px-4 text-left">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">{b.id}</td>
                <td className="py-3.5 px-4">
                  <div className="font-medium text-slate-800">{b.customer}</div>
                  <div className="text-xs text-slate-400">{b.address}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 font-medium">{b.worker}</td>
                <td className="py-3.5 px-4">
                  <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {b.category}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full">
                    {b.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs bg-slate-50 font-bold text-slate-700">{b.startOtp}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">{b.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
