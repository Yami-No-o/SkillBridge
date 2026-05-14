// src/pages/admin/BookingsTable.jsx
import React from 'react';
import { bookings } from '../../data/mockAdminData';
import DataTable  from '../../components/admin/DataTable';
import StatusPill from '../../components/admin/StatusPill';

const total = bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.amount : 0), 0);

const columns = [
  {
    key: 'workerName', header: 'Worker',
    render: (val) => <span className="font-medium text-gray-900">{val}</span>,
  },
  { key: 'seekerName', header: 'Seeker',   render: (val) => <span className="text-gray-600">{val}</span> },
  {
    key: 'jobTitle', header: 'Job',
    render: (val) => <span className="text-gray-600 max-w-[200px] truncate block">{val}</span>,
  },
  { key: 'date',   header: 'Date',   render: (val) => <span className="text-gray-500 text-xs">{val}</span> },
  {
    key: 'amount', header: 'Amount',
    render: (val, row) => (
      <span className={`font-semibold ${row.status === 'Cancelled' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        ₹{val.toLocaleString()}
      </span>
    ),
  },
  { key: 'status', header: 'Status', render: (val) => <StatusPill status={val} /> },
];

export default function BookingsTable() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Bookings</h1>
        <p className="text-sm text-gray-500 mt-0.5">{bookings.length} total bookings</p>
      </div>

      <DataTable columns={columns} rows={bookings} emptyMessage="No bookings found." />

      {/* Total row */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">Total Earnings Routed</p>
          <p className="text-xs text-gray-400 mt-0.5">Excludes cancelled bookings · 0% commission deducted</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#2d6a4f]">₹{total.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-0.5">{bookings.filter(b => b.status !== 'Cancelled').length} active bookings</p>
        </div>
      </div>
    </div>
  );
}
