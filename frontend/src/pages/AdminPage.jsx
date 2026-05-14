import { useState } from 'react'
import { workers, jobs, adminStats } from '../data/mockData'

/* ── stat card ────────────────────────────────────────────────── */
function StatCard({ value, label, icon, color }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-soft p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-brand-text">{value}</p>
        <p className="text-brand-muted text-sm">{label}</p>
      </div>
    </div>
  )
}

/* ── Worker row ────────────────────────────────────────────────── */
function WorkerRow({ worker, index }) {
  const [status, setStatus] = useState(worker.available ? 'active' : 'inactive')
  return (
    <tr className="border-b border-brand-border hover:bg-brand-warm/50 transition-colors">
      <td className="py-3 px-4 text-sm text-brand-muted">{index + 1}</td>
      <td className="py-3 px-4">
        <div className="font-medium text-brand-text text-sm">{worker.name}</div>
        <div className="text-xs text-brand-muted">{worker.skill}</div>
      </td>
      <td className="py-3 px-4 text-sm text-brand-muted">{worker.zone}</td>
      <td className="py-3 px-4 text-sm text-brand-text">{worker.rate}</td>
      <td className="py-3 px-4">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          status === 'active'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : 'bg-gray-100 text-gray-500 border border-gray-200'
        }`}>
          {status === 'active' ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="py-3 px-4">
        <button
          id={`toggle-worker-${worker.id}`}
          onClick={() => setStatus(s => s === 'active' ? 'inactive' : 'active')}
          className="text-xs text-brand-accent hover:underline font-medium"
        >
          {status === 'active' ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  )
}

/* ── Job row ───────────────────────────────────────────────────── */
function JobRow({ job, index }) {
  const [removed, setRemoved] = useState(false)
  if (removed) return null
  return (
    <tr className="border-b border-brand-border hover:bg-brand-warm/50 transition-colors">
      <td className="py-3 px-4 text-sm text-brand-muted">{index + 1}</td>
      <td className="py-3 px-4">
        <div className="font-medium text-brand-text text-sm">{job.title}</div>
        <div className="text-xs text-brand-muted">{job.employer}</div>
      </td>
      <td className="py-3 px-4 text-sm text-brand-muted">{job.zone}</td>
      <td className="py-3 px-4 text-sm text-brand-text">{job.budget}</td>
      <td className="py-3 px-4">
        {job.urgent && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
            Urgent
          </span>
        )}
      </td>
      <td className="py-3 px-4">
        <button
          id={`remove-job-${job.id}`}
          onClick={() => setRemoved(true)}
          className="text-xs text-rose-500 hover:underline font-medium"
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('workers')

  const stats = [
    {
      value: adminStats.totalWorkers.toLocaleString(),
      label: 'Total Workers',
      color: 'bg-emerald-50 text-emerald-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      value: adminStats.activeJobs,
      label: 'Active Job Listings',
      color: 'bg-sky-50 text-sky-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      ),
    },
    {
      value: adminStats.zonesActive,
      label: 'Active Zones',
      color: 'bg-amber-50 text-amber-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
      ),
    },
    {
      value: adminStats.successfulMatches.toLocaleString(),
      label: 'Successful Matches',
      color: 'bg-violet-50 text-violet-600',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <section
        className="py-10 border-b border-brand-border"
        style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #ede8df 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-brand-accent text-sm font-semibold mb-1 uppercase tracking-widest">Admin Panel</p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight">
              SkillBridge Dashboard
            </h1>
          </div>
          <span className="text-xs bg-brand-warm border border-brand-border text-brand-muted px-3 py-1.5 rounded-full font-medium">
            🔒 Admin Access
          </span>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Tab switcher */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
          <div className="flex border-b border-brand-border">
            {[
              { id: 'workers', label: `Workers (${workers.length})` },
              { id: 'jobs',    label: `Job Listings (${jobs.length})` },
            ].map(tab => (
              <button
                key={tab.id}
                id={`admin-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors duration-150 ${
                  activeTab === tab.id
                    ? 'text-brand-accent border-b-2 border-brand-accent bg-brand-warm/50'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-warm/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {activeTab === 'workers' ? (
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-brand-warm/60">
                    {['#', 'Worker', 'Zone', 'Rate', 'Status', 'Action'].map(h => (
                      <th key={h} className="py-3 px-4 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workers.map((w, i) => <WorkerRow key={w.id} worker={w} index={i} />)}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-brand-warm/60">
                    {['#', 'Job', 'Zone', 'Budget', 'Flag', 'Action'].map(h => (
                      <th key={h} className="py-3 px-4 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((j, i) => <JobRow key={j.id} job={j} index={i} />)}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
