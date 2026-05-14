import { useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { SKILL_LABELS } from '../../data/mockWorkers'

/* Avatar colour — mirrors WorkerCard */
const AVATAR_COLORS = [
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100   text-amber-700',
  'bg-sky-100     text-sky-700',
  'bg-rose-100    text-rose-600',
  'bg-violet-100  text-violet-700',
  'bg-orange-100  text-orange-700',
  'bg-teal-100    text-teal-700',
  'bg-pink-100    text-pink-700',
]
const colorFor = (id) =>
  AVATAR_COLORS[parseInt(id.replace(/\D/g, ''), 10) % AVATAR_COLORS.length]

/* ── Confirmed state ─────────────────────────────────────────── */
function ConfirmedScreen({ bookingId, onReset }) {
  return (
    <div className="text-center py-10 space-y-5 animate-fade-up">
      <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto">
        <svg viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2.5" className="w-8 h-8">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>

      <div>
        <h2 className="text-xl font-extrabold text-brand-text mb-1">Team Booking Confirmed!</h2>
        <p className="text-brand-muted text-sm">
          Your team request has been sent. Workers will confirm within 2 hours.
        </p>
      </div>

      <div className="inline-block bg-brand-warm border border-brand-border rounded-xl px-6 py-3 text-sm">
        <span className="text-brand-muted">Booking ID: </span>
        <span className="font-bold text-brand-accent tracking-wide">{bookingId}</span>
      </div>

      <div className="flex flex-col gap-2 pt-2 max-w-xs mx-auto">
        <Link to="/seeker" className="btn-primary justify-center py-3">
          Back to Search
        </Link>
        <button
          onClick={onReset}
          className="btn-ghost justify-center text-sm"
        >
          Book another team
        </button>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function TeamBookingConfirm() {
  const { state }   = useLocation()
  const navigate    = useNavigate()
  const [confirmed, setConfirmed] = useState(false)
  const [bookingId]               = useState(
    () => 'ST-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  )

  /* Guard: if landed here without state, redirect back */
  if (!state?.team) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-text font-semibold">No team selected.</p>
        <Link to="/seeker/team" className="btn-primary">Assemble a team</Link>
      </div>
    )
  }

  const { team, totalCost, coveredSkills, selectedSkills, workDate } = state

  if (confirmed) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <section
          className="py-10 border-b border-brand-border"
          style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
        >
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <h1 className="text-2xl font-extrabold text-brand-text tracking-tight">Team Booking</h1>
          </div>
        </section>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <ConfirmedScreen
            bookingId={bookingId}
            onReset={() => navigate('/seeker/team')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <section
        className="py-10 border-b border-brand-border"
        style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-accent mb-4 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M10 12L6 8l4-4"/>
            </svg>
            Back to team builder
          </button>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight mb-1">
            Review Team Booking
          </h1>
          <p className="text-brand-muted text-sm">
            Confirm the details below, then book your team.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">

        {/* ── Selected workers ──────────────────────────────── */}
        <div>
          <p className="text-sm font-semibold text-brand-text mb-3">
            Your team · {team.length} worker{team.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {team.map((worker) => (
              <div
                key={worker.id}
                className="bg-white border border-brand-border rounded-xl p-4 flex items-center gap-3"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorFor(worker.id)}`}
                >
                  {worker.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-text text-sm truncate">{worker.name}</p>
                  <p className="text-xs text-brand-muted mt-0.5 leading-snug">
                    {worker.skills.map((s) => SKILL_LABELS[s] || s).join(' · ')}
                  </p>
                  <p className="text-xs text-brand-accent font-semibold mt-0.5">
                    ₹{worker.rate}/day · {worker.zone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Booking summary card ──────────────────────────── */}
        <div className="bg-white rounded-xl border border-brand-border divide-y divide-brand-border">
          {/* Total cost */}
          <div className="px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-brand-muted font-medium">Total estimated cost</span>
            <span className="text-lg font-extrabold text-brand-text">₹{totalCost}<span className="text-xs font-normal text-brand-muted">/day</span></span>
          </div>

          {/* Work date */}
          <div className="px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-brand-muted font-medium">Preferred work date</span>
            <span className="text-sm font-semibold text-brand-text">{workDate}</span>
          </div>

          {/* Skills covered */}
          <div className="px-5 py-4">
            <p className="text-sm text-brand-muted font-medium mb-2">Skill coverage</p>
            <div className="flex flex-wrap gap-1.5">
              {selectedSkills.map((s) => {
                const covered = coveredSkills.includes(s)
                return (
                  <span
                    key={s}
                    className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${
                      covered
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-400 border-gray-200 line-through'
                    }`}
                  >
                    {covered ? '✓ ' : ''}{SKILL_LABELS[s]}
                  </span>
                )
              })}
            </div>
            {selectedSkills.some((s) => !coveredSkills.includes(s)) && (
              <p className="text-[11px] text-rose-500 mt-2">
                Some skills couldn't be matched — strikethrough skills have no available workers.
              </p>
            )}
          </div>
        </div>

        {/* ── Zero-commission note ──────────────────────────── */}
        <div className="bg-brand-warm border border-brand-border rounded-xl px-5 py-3.5 flex items-center gap-3">
          <span className="text-lg">💸</span>
          <p className="text-xs text-brand-text leading-relaxed">
            <span className="font-semibold">Zero platform commission.</span>{' '}
            You pay workers directly on completion of work. SkillBridge charges nothing.
          </p>
        </div>

        {/* ── Confirm CTA ───────────────────────────────────── */}
        <button
          id="confirm-team-booking-btn"
          onClick={() => setConfirmed(true)}
          className="w-full btn-primary py-3.5 text-base"
        >
          Confirm Team Booking
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full btn-ghost justify-center py-2.5 text-sm"
        >
          ← Go back and change
        </button>
      </div>
    </div>
  )
}
