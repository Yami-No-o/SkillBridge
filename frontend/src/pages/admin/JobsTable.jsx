// src/pages/admin/JobsTable.jsx
import React, { useState, useMemo } from 'react';
import { jobs } from '../../data/mockAdminData';
import DataTable  from '../../components/admin/DataTable';
import StatusPill from '../../components/admin/StatusPill';

const zones    = ['All Zones', ...new Set(jobs.map((j) => j.zone))];
const statuses = ['All', 'Open', 'Matched', 'Completed'];

export default function JobsTable() {
  const [zone, setZone]     = useState('All Zones');
  const [status, setStatus] = useState('All');

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchZone   = zone === 'All Zones' || j.zone === zone;
      const matchStatus = status === 'All'      || j.status === status;
      return matchZone && matchStatus;
    });
  }, [zone, status]);

  const columns = [
    {
      key: 'title', header: 'Job Title',
      render: (val) => <span className="font-medium text-gray-900">{val}</span>,
    },
    { key: 'zone',     header: 'Zone',      render: (val) => <span className="text-gray-600">{val}</span> },
    { key: 'postedBy', header: 'Posted By', render: (val) => <span className="text-gray-600">{val}</span> },
    { key: 'date',     header: 'Date',      render: (val) => <span className="text-gray-500 text-xs">{val}</span> },
    {
      key: 'isTeamJob', header: 'Team Job',
      render: (val) => val
        ? <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Team</span>
        : <span className="text-gray-400 text-xs">—</span>,
    },
    { key: 'status', header: 'Status', render: (val) => <StatusPill status={val} /> },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
        <p className="text-sm text-gray-500 mt-0.5">{filtered.length} of {jobs.length} jobs</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
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

      <DataTable columns={columns} rows={filtered} emptyMessage="No jobs match your filters." />
    </div>
  );
}
