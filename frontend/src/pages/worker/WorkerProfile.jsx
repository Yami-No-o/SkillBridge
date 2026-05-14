import { Link } from 'react-router-dom'
import { workerProfile } from '../../data/mockWorkerProfile'
import { SKILL_LABELS } from '../../data/mockWorkers'

/* ── Stars ───────────────────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
        >
          <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.1L6 8.02 3.22 9.56l.53-3.1L1.5 4.27l3.11-.45z" />
        </svg>
      ))}
    </span>
  )
}

/* ── Availability summary ────────────────────────────────────── */
function AvailSummary({ availability }) {
  const active = Object.entries(availability)
    .filter(([, slots]) => slots.length > 0)
    .map(([day, slots]) => ({ day, slots }))

  if (!active.length)
    return <p className="text-xs text-brand-muted">No availability set.</p>

  return (
    <div className="space-y-1.5">
      {active.map(({ day, slots }) => (
        <div key={day} className="flex items-center gap-3 text-xs">
          <span className="w-8 font-semibold text-brand-text">{day}</span>
          <div className="flex gap-1.5 flex-wrap">
            {slots.map((slot) => (
              <span
                key={slot}
                className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Bottom Nav (reused pattern) ─────────────────────────────── */
function BottomNav({ active }) {
  const items = [
    {
      key: 'home',
      to: '/worker',
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
          <path d="M9 21V12h6v9"/>
        </svg>
      ),
    },
    {
      key: 'jobs',
      to: '/worker/jobs',
      label: 'Jobs',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        </svg>
      ),
    },
    {
      key: 'profile',
      to: '/worker/profile',
      label: 'Profile',
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
      {items.map(({ key, to, label, icon }) => (
        <Link
          key={key}
          to={to}
          id={`profile-nav-${key}`}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[11px] font-medium transition-colors ${
            active === key ? 'text-brand-accent' : 'text-brand-muted'
          }`}
        >
          {icon}
          {label}
        </Link>
      ))}
    </nav>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function WorkerProfile() {
  const w = workerProfile

  return (
    <div className="min-h-screen bg-brand-bg pb-20 md:pb-8">
      {/* Header */}
      <section
        className="py-8 border-b border-brand-border"
        style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
      >
        <div className="max-w-md mx-auto px-4">
          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-3">
            My Profile
          </p>

          {/* Avatar + identity */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-xl flex-shrink-0">
              {w.name[0]}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-brand-text">{w.fullName}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Stars rating={w.rating} />
                <span className="text-sm font-semibold text-brand-text">{w.rating}</span>
                <span className="text-xs text-brand-muted">({w.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-brand-muted">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                  <path d="M7 1C4.79 1 3 2.79 3 5c0 3.28 4 8 4 8s4-4.72 4-8c0-2.21-1.79-4-4-4z"/>
                  <circle cx="7" cy="5" r="1.3"/>
                </svg>
                {w.zone}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-5">

        {/* Rate + experience row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-brand-border rounded-xl px-4 py-3">
            <p className="text-[11px] text-brand-muted font-medium mb-0.5">Daily Rate</p>
            <p className="text-xl font-extrabold text-brand-text">₹{w.rate}</p>
          </div>
          <div className="bg-white border border-brand-border rounded-xl px-4 py-3">
            <p className="text-[11px] text-brand-muted font-medium mb-0.5">Experience</p>
            <p className="text-xl font-extrabold text-brand-text">{w.experience}</p>
          </div>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
              w.available
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-gray-100 text-gray-500 border-gray-200'
            }`}
          >
            {w.available ? '● Currently Available' : '○ Currently Offline'}
          </span>
        </div>

        {/* Bio */}
        <div className="bg-white border border-brand-border rounded-xl px-4 py-4">
          <p className="text-[11px] text-brand-muted font-semibold uppercase tracking-wider mb-2">About</p>
          <p className="text-sm text-brand-text leading-relaxed">{w.bio}</p>
        </div>

        {/* Skills */}
        <div className="bg-white border border-brand-border rounded-xl px-4 py-4">
          <p className="text-[11px] text-brand-muted font-semibold uppercase tracking-wider mb-3">Skills</p>
          <div className="flex flex-wrap gap-2">
            {w.skills.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full bg-brand-warm border border-brand-border text-brand-text font-medium"
              >
                {SKILL_LABELS[s] || s}
              </span>
            ))}
          </div>
        </div>

        {/* Availability summary */}
        <div className="bg-white border border-brand-border rounded-xl px-4 py-4">
          <p className="text-[11px] text-brand-muted font-semibold uppercase tracking-wider mb-3">
            Availability
          </p>
          <AvailSummary availability={w.availability} />
        </div>

        {/* Edit CTA */}
        <Link
          to="/worker/setup"
          id="worker-edit-profile-btn"
          className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accentHover transition-colors"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
            <path d="M13 3l4 4-9 9H4v-4l9-9z"/>
          </svg>
          Edit Profile
        </Link>
      </div>

      <BottomNav active="profile" />
    </div>
  )
}
