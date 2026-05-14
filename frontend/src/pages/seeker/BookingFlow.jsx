import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockWorkers, SKILL_LABELS, ZONES } from '../../data/mockWorkers'

const TIME_SLOTS = ['Morning (8–12)', 'Afternoon (12–4)', 'Evening (4–8)']
const STEPS = ['Job Details', 'Review', 'Confirmed']

/* ── Progress indicator ─────────────────────────────────────── */
function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => {
        const done    = i < current
        const active  = i === current
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-200 ${
                  done
                    ? 'bg-brand-accent border-brand-accent text-white'
                    : active
                    ? 'bg-white border-brand-accent text-brand-accent'
                    : 'bg-white border-brand-border text-brand-muted'
                }`}
              >
                {done ? (
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <path d="M2 6l3 3 5-5"/>
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-[11px] mt-1 font-medium whitespace-nowrap ${active ? 'text-brand-accent' : 'text-brand-muted'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-px mx-2 mb-5 transition-colors duration-300 ${done ? 'bg-brand-accent' : 'bg-brand-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Step 1: Job details form ──────────────────────────────── */
function StepJobDetails({ form, setForm, onNext }) {
  const today = new Date().toISOString().split('T')[0]
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onNext() }}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-brand-text mb-1.5" htmlFor="job-description">
          Describe the job
        </label>
        <textarea
          id="job-description"
          required
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="e.g. Fix leaking pipe under the kitchen sink, replace washers if needed…"
          rows={4}
          className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm text-brand-text placeholder:text-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-brand-text mb-1.5" htmlFor="job-date">
            Preferred date
          </label>
          <input
            id="job-date"
            type="date"
            required
            min={today}
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="w-full rounded-xl border border-brand-border px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-text mb-1.5">
            Your zone
          </label>
          <select
            id="job-zone"
            required
            value={form.zone}
            onChange={(e) => setForm((f) => ({ ...f, zone: e.target.value }))}
            className="w-full rounded-xl border border-brand-border px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white"
          >
            <option value="">Select zone…</option>
            {ZONES.filter((z) => z !== 'All Zones').map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-brand-text mb-2">Time slot</p>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot}
              type="button"
              id={`slot-${slot.split(' ')[0].toLowerCase()}`}
              onClick={() => setForm((f) => ({ ...f, slot }))}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-150 ${
                form.slot === slot
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'bg-white text-brand-text border-brand-border hover:border-brand-accent hover:text-brand-accent'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!form.description || !form.date || !form.zone || !form.slot}
        className="w-full btn-primary py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue to Review →
      </button>
    </form>
  )
}

/* ── Step 2: Review ─────────────────────────────────────────── */
function StepReview({ worker, form, onBack, onConfirm }) {
  return (
    <div className="space-y-5">
      {/* Worker mini card */}
      <div className="bg-brand-warm rounded-xl border border-brand-border p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
          {worker.avatar}
        </div>
        <div>
          <p className="font-semibold text-brand-text text-sm">{worker.name}</p>
          <p className="text-xs text-brand-muted">
            {worker.skills.map((s) => SKILL_LABELS[s] || s).join(' · ')} · {worker.zone}
          </p>
          <p className="text-xs text-brand-accent mt-0.5">₹{worker.rate}/day</p>
        </div>
      </div>

      {/* Job summary */}
      <div className="bg-white rounded-xl border border-brand-border divide-y divide-brand-border">
        {[
          { label: 'Job description', value: form.description },
          { label: 'Date',            value: form.date },
          { label: 'Time slot',       value: form.slot },
          { label: 'Zone',            value: form.zone },
        ].map(({ label, value }) => (
          <div key={label} className="px-4 py-3 flex justify-between gap-4">
            <span className="text-xs text-brand-muted font-medium">{label}</span>
            <span className="text-xs text-brand-text text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex-1 btn-outline py-3">← Edit</button>
        <button onClick={onConfirm} className="flex-1 btn-primary py-3">Confirm Booking</button>
      </div>
    </div>
  )
}

/* ── Step 3: Confirmation ───────────────────────────────────── */
function StepConfirmation({ bookingId }) {
  return (
    <div className="text-center py-6 space-y-5">
      <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto">
        <svg viewBox="0 0 24 24" fill="none" stroke="#4a7c59" strokeWidth="2.5" className="w-8 h-8">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-brand-text mb-1">Booking Confirmed!</h2>
        <p className="text-brand-muted text-sm">Your booking request has been sent to the worker.</p>
      </div>
      <div className="inline-block bg-brand-warm border border-brand-border rounded-xl px-6 py-3 text-sm">
        <span className="text-brand-muted">Booking ID: </span>
        <span className="font-bold text-brand-accent tracking-wide">{bookingId}</span>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <Link to="/seeker/results?q=any" className="btn-primary justify-center py-3">
          Back to Search
        </Link>
        <Link to="/seeker" className="btn-ghost justify-center text-sm">
          ← Seeker Home
        </Link>
      </div>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────── */
export default function BookingFlow() {
  const { workerId } = useParams()
  const worker = mockWorkers.find((w) => w.id === workerId)

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ description: '', date: '', slot: '', zone: '' })
  const [bookingId] = useState(
    () => 'SB-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  )

  if (!worker) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-text font-semibold">Worker not found.</p>
        <Link to="/seeker" className="btn-primary">← Back to Search</Link>
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
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-extrabold text-brand-text tracking-tight mb-1">
            Book {worker.name}
          </h1>
          <p className="text-brand-muted text-sm">
            {worker.skills.map((s) => SKILL_LABELS[s] || s).join(' · ')} · {worker.zone}
          </p>
        </div>
      </section>

      <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
        <StepBar current={step} />
        {step === 0 && (
          <StepJobDetails form={form} setForm={setForm} onNext={() => setStep(1)} />
        )}
        {step === 1 && (
          <StepReview
            worker={worker}
            form={form}
            onBack={() => setStep(0)}
            onConfirm={() => setStep(2)}
          />
        )}
        {step === 2 && <StepConfirmation bookingId={bookingId} />}
      </div>
    </div>
  )
}
