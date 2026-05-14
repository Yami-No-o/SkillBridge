import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { workerProfile, ALL_SKILLS_LIST, ZONES, DAYS, SLOTS } from '../../data/mockWorkerProfile'

const TOTAL_STEPS = 3

/* ── Progress bar ────────────────────────────────────────────── */
function ProgressBar({ step }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] text-brand-muted mb-1.5">
        <span>Step {step} of {TOTAL_STEPS}</span>
        <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
      </div>
      <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-accent rounded-full transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  )
}

/* ── Step 1 — Basic Details ──────────────────────────────────── */
function StepBasic({ form, setForm }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-brand-text mb-0.5">Basic Details</h2>
        <p className="text-xs text-brand-muted">Tell seekers who you are and where you work.</p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold text-brand-text mb-1.5" htmlFor="setup-name">
          Full name
        </label>
        <input
          id="setup-name"
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Your full name"
          className="w-full h-12 px-4 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
        />
      </div>

      {/* Phone — display only */}
      <div>
        <label className="block text-xs font-semibold text-brand-text mb-1.5">
          Phone number
        </label>
        <div className="h-12 px-4 rounded-xl border border-brand-border bg-brand-warm flex items-center text-sm text-brand-muted select-none">
          {workerProfile.phone}
          <span className="ml-auto text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
            Verified
          </span>
        </div>
      </div>

      {/* Zone */}
      <div>
        <label className="block text-xs font-semibold text-brand-text mb-1.5" htmlFor="setup-zone">
          Your zone
        </label>
        <select
          id="setup-zone"
          value={form.zone}
          onChange={(e) => setForm((f) => ({ ...f, zone: e.target.value }))}
          className="w-full h-12 px-4 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 bg-white appearance-none"
        >
          {ZONES.map((z) => <option key={z}>{z}</option>)}
        </select>
      </div>

      {/* Daily rate */}
      <div>
        <label className="block text-xs font-semibold text-brand-text mb-1.5" htmlFor="setup-rate">
          Daily rate (₹)
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-semibold text-sm select-none">₹</span>
          <input
            id="setup-rate"
            type="number"
            min="100"
            value={form.rate}
            onChange={(e) => setForm((f) => ({ ...f, rate: e.target.value }))}
            placeholder="e.g. 600"
            className="w-full h-12 pl-8 pr-4 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-semibold text-brand-text mb-1.5" htmlFor="setup-bio">
          Short bio
        </label>
        <textarea
          id="setup-bio"
          rows={3}
          value={form.bio}
          onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
          placeholder="Briefly describe your experience and specialty…"
          className="w-full px-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text placeholder:text-brand-muted/70 focus:outline-none focus:ring-2 focus:ring-brand-accent/40 resize-none"
        />
      </div>
    </div>
  )
}

/* ── Step 2 — Skills Selection ───────────────────────────────── */
function StepSkills({ form, setForm }) {
  const toggle = (key) =>
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(key)
        ? f.skills.filter((s) => s !== key)
        : [...f.skills, key],
    }))

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-brand-text mb-0.5">Your Skills</h2>
        <p className="text-xs text-brand-muted">
          Tap to select skills you offer. Selected: <span className="text-brand-accent font-semibold">{form.skills.length}</span>
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ALL_SKILLS_LIST.map(({ key, label }) => {
          const active = form.skills.includes(key)
          return (
            <button
              key={key}
              id={`skill-chip-${key}`}
              type="button"
              onClick={() => toggle(key)}
              className={`h-10 px-4 rounded-xl border text-xs font-medium transition-all duration-150 ${
                active
                  ? 'bg-brand-accent text-white border-brand-accent'
                  : 'bg-white text-brand-text border-brand-border hover:border-brand-accent/60'
              }`}
            >
              {active ? '✓ ' : ''}{label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 3 — Availability Setup ─────────────────────────────── */
function StepAvailability({ form, setForm }) {
  const toggleDay = (day) =>
    setForm((f) => {
      const cur = f.availability[day]
      return {
        ...f,
        availability: {
          ...f.availability,
          [day]: cur.length ? [] : ['Full Day'],
        },
      }
    })

  const toggleSlot = (day, slot) =>
    setForm((f) => {
      const cur  = f.availability[day]
      const next = cur.includes(slot)
        ? cur.filter((s) => s !== slot)
        : [...cur.filter((s) => s !== 'Full Day'), slot]
      return { ...f, availability: { ...f.availability, [day]: next } }
    })

  const selectFullDay = (day) =>
    setForm((f) => ({
      ...f,
      availability: { ...f.availability, [day]: ['Full Day'] },
    }))

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-extrabold text-brand-text mb-0.5">Availability</h2>
        <p className="text-xs text-brand-muted">Set the days and times you're available to work.</p>
      </div>

      <div className="space-y-2.5">
        {DAYS.map((day) => {
          const slots   = form.availability[day] || []
          const isOn    = slots.length > 0
          const fullDay = slots.includes('Full Day')

          return (
            <div
              key={day}
              className={`rounded-xl border transition-colors ${isOn ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-border bg-white'}`}
            >
              {/* Day header row */}
              <div className="flex items-center px-4 py-3">
                <span className="text-sm font-semibold text-brand-text w-10">{day}</span>
                <button
                  id={`day-toggle-${day}`}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${isOn ? 'bg-brand-accent' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${isOn ? 'translate-x-5' : ''}`} />
                </button>
                {isOn && (
                  <span className="ml-auto text-[11px] text-brand-accent font-medium">
                    {fullDay ? 'Full Day' : slots.join(', ')}
                  </span>
                )}
              </div>

              {/* Slot picker — only when ON */}
              {isOn && (
                <div className="px-4 pb-3 flex flex-wrap gap-2">
                  {SLOTS.map((slot) => (
                    <button
                      key={slot}
                      id={`slot-${day}-${slot}`}
                      type="button"
                      onClick={() =>
                        slot === 'Full Day' ? selectFullDay(day) : toggleSlot(day, slot)
                      }
                      className={`h-9 px-3 rounded-xl border text-xs font-medium transition-all ${
                        slots.includes(slot)
                          ? 'bg-brand-accent text-white border-brand-accent'
                          : 'bg-white text-brand-text border-brand-border'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function WorkerSetup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name:         workerProfile.fullName,
    zone:         workerProfile.zone,
    rate:         String(workerProfile.rate),
    bio:          workerProfile.bio,
    skills:       [...workerProfile.skills],
    availability: { ...workerProfile.availability },
  })

  const canNext = () => {
    if (step === 1) return form.name.trim() && form.rate && form.zone
    if (step === 2) return form.skills.length > 0
    return true
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
    else navigate('/worker')
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <section
        className="py-8 border-b border-brand-border"
        style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
      >
        <div className="max-w-md mx-auto px-4">
          <p className="text-xs text-brand-accent font-semibold uppercase tracking-widest mb-2">
            Worker Onboarding
          </p>
          <ProgressBar step={step} />
        </div>
      </section>

      {/* Form body */}
      <div className="max-w-md mx-auto px-4 py-7 pb-28">
        {step === 1 && <StepBasic      form={form} setForm={setForm} />}
        {step === 2 && <StepSkills     form={form} setForm={setForm} />}
        {step === 3 && <StepAvailability form={form} setForm={setForm} />}
      </div>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-brand-border px-4 py-3 flex gap-3 max-w-md mx-auto">
        {step > 1 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 h-12 rounded-xl border border-brand-border text-sm font-semibold text-brand-text hover:border-brand-accent hover:text-brand-accent transition-colors"
          >
            ← Back
          </button>
        ) : (
          <button
            onClick={() => navigate('/worker')}
            className="flex-1 h-12 rounded-xl border border-brand-border text-sm font-semibold text-brand-text hover:border-brand-accent hover:text-brand-accent transition-colors"
          >
            Cancel
          </button>
        )}

        <button
          id={step === TOTAL_STEPS ? 'complete-setup-btn' : `next-step-${step}-btn`}
          onClick={handleNext}
          disabled={!canNext()}
          className="flex-1 h-12 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:bg-brand-accentHover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {step === TOTAL_STEPS ? 'Complete Setup ✓' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
