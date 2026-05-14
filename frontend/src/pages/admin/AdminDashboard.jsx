// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { stats, jobsByZone, workerStatusSplit, bookings } from '../../data/mockAdminData';
import StatCard   from '../../components/admin/StatCard';
import StatusPill from '../../components/admin/StatusPill';

const lastBookings = [...bookings]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5);

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Platform overview — live mock data</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="👷" label="Total Workers"          value={stats.totalWorkers}                            sub="20 registered"              color="#2d6a4f" />
        <StatCard icon="📋" label="Active Jobs"             value={stats.activeJobs}                              sub="across 9 zones"             color="#1e40af" />
        <StatCard icon="✅" label="Completed Bookings"      value={stats.completedBookings}                       sub="this week"                  color="#7c3aed" />
        <StatCard icon="💰" label="Earnings Routed"         value={`₹${stats.totalEarningsRouted.toLocaleString()}`} sub="0% commission taken"    color="#b45309" />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-5 gap-4">

        {/* Bar chart — Jobs per zone */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">Jobs by Zone</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={jobsByZone} margin={{ top: 0, right: 8, left: -20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede8" />
              <XAxis
                dataKey="zone"
                tick={{ fontSize: 10, fill: '#888' }}
                angle={-40}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e8e5df', fontSize: 12 }}
                cursor={{ fill: '#f0f7f0' }}
              />
              <Bar dataKey="jobs" fill="#2d6a4f" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart — Worker status */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">Worker Status Split</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={workerStatusSplit}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {workerStatusSplit.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(val) => <span style={{ fontSize: 11, color: '#555' }}>{val}</span>}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e8e5df', fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent bookings mini-table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm font-bold text-gray-800">Recent Bookings</p>
          <a href="/admin/bookings" className="text-xs text-[#2d6a4f] font-semibold hover:underline">
            View all →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Worker</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Seeker</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Job</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lastBookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-900 whitespace-nowrap">{b.workerName}</td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{b.seekerName}</td>
                  <td className="px-5 py-3 text-gray-600 whitespace-nowrap max-w-[180px] truncate">{b.jobTitle}</td>
                  <td className="px-5 py-3 font-semibold text-gray-800 whitespace-nowrap">₹{b.amount.toLocaleString()}</td>
                  <td className="px-5 py-3 whitespace-nowrap"><StatusPill status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
