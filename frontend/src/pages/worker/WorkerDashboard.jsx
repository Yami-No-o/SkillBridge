import { useState } from 'react'
import { Link } from 'react-router-dom'
import { workerProfile } from '../../data/mockWorkerProfile'

/* ── Bottom Nav ─────────────────────────────────────────────── */
function BottomNav({ active }) {
  const items = [
    {
      key: 'home', to: '/worker', label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
      ),
    },
    {
      key: 'jobs', to: '/worker/jobs', label: 'Jobs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
    },
    {
      key: 'profile', to: '/worker/profile', label: 'Profile',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      ),
    },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-brand-border flex md:hidden">
      {items.map(({ key, to, icon, label }) => (
        <Link
          key={key} to={to}
          id={`worker-nav-${key}`}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[11px] font-medium transition-colors ${
            active === key ? 'text-brand-accent' : 'text-brand-muted'
          }`}
        >
          {icon}{label}
        </Link>
      ))}
    </nav>
  )
}

/* ── Availability toggle ─────────────────────────────────────── */
function AvailToggle({ value, onChange }) {
  return (
    <button
      id="worker-avail-toggle"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors duration-200 ${
        value
          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
          : 'bg-gray-100 border-gray-200 text-gray-500'
      }`}
    >
      <span className={`w-9 h-5 rounded-full relative transition-colors duration-200 ${value ? 'bg-brand-accent' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-4' : ''}`} />
      </span>
      {value ? 'Available' : 'Offline'}
    </button>
  )
}

/* ── Status pill ─────────────────────────────────────────────── */
const STATUS_STYLES = {
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending:   'bg-amber-50 text-amber-700 border-amber-200',
  Cancelled: 'bg-gray-100 text-gray-400 border-gray-200',
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function WorkerDashboard() {
  const [available, setAvailable] = useState(workerProfile.available)
  const [requests,  setRequests]  = useState(workerProfile.pendingRequests)

  const handleAccept  = (id) => setRequests((r) => r.filter((x) => x.id !== id))
  const handleDecline = (id) => setRequests((r) => r.filter((x) => x.id !== id))

  return (
    <div className="min-h-screen bg-brand-bg pb-20 md:pb-8">
      <div className="max-w-md mx-auto px-4 pt-5 pb-6 space-y-6">

        {/* ── Top bar ───────────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-brand-muted">Worker Dashboard</p>
            <h1 className="text-xl font-extrabold text-brand-text">Hi {workerProfile.name} 👋</h1>
          </div>
          <AvailToggle value={available} onChange={setAvailable} />
        </div>

        {/* ── Earnings row ──────────────────────────────────── */}
        <section>
          <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2.5">Earnings</p>
          <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
            {[
              { label: 'Today',      amount: workerProfile.earnings.today  },
              { label: 'This Week',  amount: workerProfile.earnings.week   },
              { label: 'This Month', amount: workerProfile.earnings.month  },
            ].map(({ label, amount }) => (
              <div key={label} className="flex-shrink-0 w-36 bg-white border border-brand-border rounded-xl px-4 py-3 shadow-soft">
                <p className="text-[11px] text-brand-muted font-medium mb-1">{label}</p>
                <p className="text-xl font-extrabold text-brand-text">₹{amount.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pending Requests ──────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-2.5">
            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">Pending Requests</p>
            <span className="text-[11px] text-brand-accent font-semibold bg-brand-accent/10 px-2 py-0.5 rounded-full">
              {requests.length}
            </span>
          </div>

          {requests.length === 0 ? (
            <div className="bg-white border border-brand-border rounded-xl px-4 py-6 text-center">
              <p className="text-brand-muted text-sm">No pending requests right now.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="bg-white border border-brand-border rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-brand-text text-sm leading-snug">{req.title}</p>
                      <p className="text-xs text-brand-muted mt-0.5">{req.seeker} · {req.zone}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-base font-extrabold text-brand-text">₹{req.rate}</p>
                      <p className="text-[11px] text-brand-muted">/day</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-muted">📅 {req.date}</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      id={`accept-${req.id}`}
                      onClick={() => handleAccept(req.id)}
                      className="flex-1 h-10 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accentHover transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      id={`decline-${req.id}`}
                      onClick={() => handleDecline(req.id)}
                      className="flex-1 h-10 rounded-xl border border-brand-border text-brand-muted text-sm font-medium hover:border-gray-400 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Recent Bookings ───────────────────────────────── */}
        <section>
          <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2.5">Recent Bookings</p>
          <div className="bg-white border border-brand-border rounded-xl overflow-hidden divide-y divide-brand-border">
            {workerProfile.recentJobs.map((job) => (
              <div key={job.id} className="px-4 py-3 flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-text truncate">{job.title}</p>
                  <p className="text-[11px] text-brand-muted mt-0.5">{job.seeker} · {job.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLES[job.status]}`}>
                    {job.status}
                  </span>
                  {job.amount > 0 && (
                    <span className="text-xs font-bold text-brand-text">₹{job.amount}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick actions ─────────────────────────────────── */}
        <section className="grid grid-cols-2 gap-3">
          <Link
            to="/worker/setup"
            id="worker-edit-profile"
            className="flex items-center justify-center gap-2 h-12 rounded-xl border border-brand-border bg-white text-sm font-medium text-brand-text hover:border-brand-accent hover:text-brand-accent transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <path d="M13 3l4 4-9 9H4v-4l9-9z"/>
            </svg>
            Edit Profile
          </Link>
          <Link
            to="/worker/jobs"
            id="worker-browse-jobs"
            className="flex items-center justify-center gap-2 h-12 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accentHover transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <rect x="2" y="5" width="16" height="12" rx="1.5"/>
              <path d="M14 5V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1"/>
            </svg>
            Browse Jobs
          </Link>
        </section>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
