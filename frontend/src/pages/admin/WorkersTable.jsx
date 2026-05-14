// src/pages/admin/WorkersTable.jsx
import React, { useState, useMemo } from 'react';
import { workers } from '../../data/mockAdminData';
import DataTable  from '../../components/admin/DataTable';
import StatusPill from '../../components/admin/StatusPill';

const zones   = ['All Zones', ...new Set(workers.map((w) => w.zone))];
const statuses = ['All', 'Verified', 'Pending', 'Flagged'];

export default function WorkersTable() {
  const [search, setSearch]   = useState('');
  const [zone, setZone]       = useState('All Zones');
  const [status, setStatus]   = useState('All');

  const filtered = useMemo(() => {
    return workers.filter((w) => {
      const q = search.toLowerCase();
      const matchSearch = !q || w.name.toLowerCase().includes(q) || w.skills.join(' ').toLowerCase().includes(q);
      const matchZone   = zone === 'All Zones' || w.zone === zone;
      const matchStatus = status === 'All'      || w.status === status;
      return matchSearch && matchZone && matchStatus;
    });
  }, [search, zone, status]);

  const columns = [
    {
      key: 'name', header: 'Worker',
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-bold shrink-0">
            {val.charAt(0)}
          </div>
          <span className="font-medium text-gray-900">{val}</span>
        </div>
      ),
    },
    { key: 'zone',     header: 'Zone',    render: (val) => <span className="text-gray-600">{val}</span> },
    {
      key: 'skills', header: 'Skills',
      render: (val) => (
        <div className="flex gap-1 flex-wrap max-w-[200px]">
          {val.map((s) => (
            <span key={s} className="bg-gray-100 text-gray-600 text-[10px] font-mono px-1.5 py-0.5 rounded">{s}</span>
          ))}
        </div>
      ),
    },
    {
      key: 'rating', header: 'Rating',
      render: (val) => val > 0
        ? <span className="font-semibold text-yellow-600">★ {val.toFixed(1)}</span>
        : <span className="text-gray-400 text-xs">—</span>,
    },
    { key: 'status',   header: 'Status',   render: (val) => <StatusPill status={val} /> },
    { key: 'joinDate', header: 'Joined',   render: (val) => <span className="text-gray-500 text-xs">{val}</span> },
    {
      key: 'id', header: 'Action',
      render: (_, row) => row.status !== 'Verified' ? (
        <button className="text-xs font-semibold text-[#2d6a4f] border border-[#2d6a4f] px-3 py-1 rounded-lg hover:bg-green-50 transition-colors">
          Verify
        </button>
      ) : (
        <span className="text-xs text-gray-400">Verified ✓</span>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Workers</h1>
        <p className="text-sm text-gray-500 mt-0.5">{filtered.length} of {workers.length} workers</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by name or skill…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] bg-white"
        />
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#2d6a4f]"
        >
          {zones.map((z) => <option key={z}>{z}</option>)}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#2d6a4f]"
        >
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <DataTable columns={columns} rows={filtered} emptyMessage="No workers match your filters." />
    </div>
  );
}
