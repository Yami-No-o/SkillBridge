import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { mockWorkers, SKILL_LABELS } from '../../data/mockWorkers'

const ALL_SKILLS = Object.keys(SKILL_LABELS)

/* Budget-optimal mock team assembler */
function assembleTeam(budget, requiredSkills) {
  if (!requiredSkills.length) return []
  const available = mockWorkers.filter((w) => w.available)
  // Greedy: pick lowest-rate worker that covers each required skill
  const covered = new Set()
  const team    = []
  for (const skill of requiredSkills) {
    if (covered.has(skill)) continue
    const candidates = available
      .filter((w) => w.skills.includes(skill) && !team.includes(w))
      .sort((a, b) => a.rate - b.rate)
    if (candidates.length) {
      const pick = candidates[0]
      team.push(pick)
      pick.skills.forEach((s) => covered.add(s))
    }
  }
  return team
}

export default function TeamHire() {
  const [budget,         setBudget]         = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [team,           setTeam]           = useState(null)
  const [workDate,       setWorkDate]       = useState('')
  const navigate = useNavigate()

  const toggleSkill = (skill) =>
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    )

  const handleAssemble = () => {
    setTeam(assembleTeam(Number(budget), selectedSkills))
  }

  const totalCost = team ? team.reduce((sum, w) => sum + w.rate, 0) : 0
  const coveredSkills = team
    ? [...new Set(team.flatMap((w) => w.skills))].filter((s) => selectedSkills.includes(s))
    : []

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <section
        className="py-10 border-b border-brand-border"
        style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <Link
            to="/seeker"
            className="inline-flex items-center gap-1.5 text-xs text-brand-muted hover:text-brand-accent mb-4 transition-colors"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M10 12L6 8l4-4"/>
            </svg>
            Back to search
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-text tracking-tight mb-1">
            Assemble a Team
          </h1>
          <p className="text-brand-muted text-sm">
            Tell us your budget and skills needed — we'll pick the best-fit team.
          </p>
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* Budget input */}
        <div>
          <label className="block text-sm font-semibold text-brand-text mb-2" htmlFor="team-budget">
            Daily budget (₹)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted font-semibold text-sm select-none">₹</span>
            <input
              id="team-budget"
              type="number"
              min="0"
              placeholder="e.g. 2000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
            />
          </div>
        </div>

        {/* Skills multi-select */}
        <div>
          <p className="text-sm font-semibold text-brand-text mb-3">Required skills</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_SKILLS.map((skill) => {
              const checked = selectedSkills.includes(skill)
              return (
                <label
                  key={skill}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 cursor-pointer transition-all duration-150 ${
                    checked
                      ? 'border-brand-accent bg-brand-accent/5 text-brand-accent'
                      : 'border-brand-border bg-white text-brand-text hover:border-brand-accent/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`skill-${skill}`}
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleSkill(skill)}
                  />
                  <span
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      checked ? 'bg-brand-accent border-brand-accent' : 'border-brand-border'
                    }`}
                  >
                    {checked && (
                      <svg viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="2" className="w-3 h-3">
                        <path d="M1.5 5l2.5 2.5 5-5"/>
                      </svg>
                    )}
                  </span>
                  <span className="text-xs font-medium leading-tight">{SKILL_LABELS[skill]}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Assemble button */}
        <button
          id="assemble-team-btn"
          onClick={handleAssemble}
          disabled={!budget || !selectedSkills.length}
          className="w-full btn-primary py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Assemble Team
        </button>

        {/* Result */}
        {team !== null && (
          <div className="space-y-5 animate-fade-up">
            {/* Explanation */}
            <div className="bg-brand-warm border border-brand-border rounded-xl px-5 py-4 flex items-start gap-3">
              <svg viewBox="0 0 20 20" fill="none" stroke="#4a7c59" strokeWidth="1.8" className="w-5 h-5 mt-0.5 flex-shrink-0">
                <circle cx="10" cy="10" r="8.5"/>
                <path d="M10 9v5M10 7h.01"/>
              </svg>
              <p className="text-xs text-brand-text leading-relaxed">
                <span className="font-semibold">Selected using budget-optimal matching</span> — workers
                are chosen to maximise skill coverage while keeping total daily cost within your budget.
              </p>
            </div>

            {team.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">😔</p>
                <p className="text-brand-text font-semibold text-sm">No available team found</p>
                <p className="text-brand-muted text-xs mt-1">Try adjusting your skill requirements.</p>
              </div>
            ) : (
              <>
                {/* Summary bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-brand-border rounded-xl px-5 py-3">
                  <div>
                    <p className="text-xs text-brand-muted">Total daily cost</p>
                    <p className="text-xl font-extrabold text-brand-text">₹{totalCost}</p>
                    {Number(budget) > 0 && totalCost > Number(budget) && (
                      <p className="text-[11px] text-rose-500 mt-0.5">Exceeds your budget by ₹{totalCost - Number(budget)}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-muted">Skill coverage</p>
                    <div className="flex flex-wrap gap-1 mt-1 justify-end">
                      {coveredSkills.map((s) => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {SKILL_LABELS[s]}
                        </span>
                      ))}
                      {selectedSkills.filter((s) => !coveredSkills.includes(s)).map((s) => (
                        <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 border border-gray-200 line-through">
                          {SKILL_LABELS[s]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Worker cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {team.map((worker) => (
                    <div key={worker.id} className="bg-white border border-brand-border rounded-xl p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {worker.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-brand-text text-sm truncate">{worker.name}</p>
                        <p className="text-xs text-brand-muted mt-0.5">
                          {worker.skills.map((s) => SKILL_LABELS[s] || s).join(' · ')}
                        </p>
                        <p className="text-xs text-brand-accent font-medium mt-0.5">₹{worker.rate}/day · {worker.zone}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preferred date */}
                <div>
                  <label className="block text-sm font-semibold text-brand-text mb-2" htmlFor="team-work-date">
                    Preferred work date
                  </label>
                  <input
                    id="team-work-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={workDate}
                    onChange={(e) => setWorkDate(e.target.value)}
                    className="w-full rounded-xl border border-brand-border px-4 py-2.5 text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
                  />
                </div>

                {/* Primary CTA */}
                <button
                  id="book-team-btn"
                  disabled={!workDate}
                  onClick={() =>
                    navigate('/seeker/team/confirm', {
                      state: { team, totalCost, coveredSkills, selectedSkills, workDate },
                    })
                  }
                  className="w-full btn-primary py-3.5 text-base disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Book This Team
                </button>

                <Link to="/seeker" className="block text-center text-xs text-brand-muted hover:text-brand-accent transition-colors">
                  ← Refine search
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
