import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../data/mockWorkers'

export default function SeekerHome() {
  const [query, setQuery]         = useState('')
  const [teamMode, setTeamMode]   = useState(false)
  const navigate = useNavigate()

  const handleSearch = (q = query) => {
    const term = q.trim()
    if (!term) return
    if (teamMode) {
      navigate(`/seeker/team?q=${encodeURIComponent(term)}`)
    } else {
      navigate(`/seeker/results?q=${encodeURIComponent(term)}`)
    }
  }

  const handleCategory = (skill) => {
    navigate(`/seeker/results?q=${encodeURIComponent(skill)}`)
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* ── Hero search area ─────────────────────────────────── */}
      <section
        className="py-16 md:py-24"
        style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-brand-accent text-xs font-semibold uppercase tracking-widest mb-3">
            Hire Workers · Peri-urban Bengaluru
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight mb-2">
            What do you need done today?
          </h1>
          <p className="text-brand-muted text-sm mb-8">
            Describe your problem in plain language — we'll match you with the right worker.
          </p>

          {/* Search bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSearch() }}
            className="relative flex items-center gap-2 bg-white border border-brand-border rounded-2xl shadow-card px-4 py-3"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="w-5 h-5 text-brand-muted flex-shrink-0">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="seeker-nlp-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Describe what you need (e.g. fix leaking pipe in bathroom)'
              className="flex-1 bg-transparent text-sm text-brand-text placeholder:text-brand-muted/70 focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-brand-accent text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-brand-accentHover transition-colors duration-150 disabled:opacity-40"
              disabled={!query.trim()}
            >
              Search
            </button>
          </form>

          {/* Team mode toggle */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="text-sm text-brand-muted">Need a team?</span>
            <button
              id="team-mode-toggle"
              role="switch"
              aria-checked={teamMode}
              onClick={() => setTeamMode((v) => !v)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 ${
                teamMode ? 'bg-brand-accent' : 'bg-brand-border'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                  teamMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
            {teamMode && (
              <span className="text-xs text-brand-accent font-semibold">Team mode ON</span>
            )}
          </div>
        </div>
      </section>

      {/* ── Category chips ───────────────────────────────────── */}
      <section className="py-10 bg-white border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-base font-semibold text-brand-text mb-5">Browse by category</h2>
          {/* Horizontal scroll on mobile, wrap on desktop */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible hide-scrollbar">
            {CATEGORIES.map(({ label, skill, icon }) => (
              <button
                key={skill}
                id={`cat-${skill}`}
                onClick={() => handleCategory(skill)}
                className="flex-shrink-0 flex flex-col items-center gap-2 bg-brand-warm border border-brand-border rounded-2xl px-5 py-4 min-w-[90px] hover:border-brand-accent hover:bg-brand-accent/5 hover:shadow-soft transition-all duration-150 group"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium text-brand-text group-hover:text-brand-accent whitespace-nowrap">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust strip ─────────────────────────────────────── */}
      <section className="py-8 bg-brand-bg border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-brand-muted">
            {[
              { icon: '✅', text: 'Verified workers only' },
              { icon: '💸', text: 'Zero commission' },
              { icon: '📍', text: '6 peri-urban zones' },
              { icon: '⭐', text: 'Avg. rating 4.7' },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                {icon} {text}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
