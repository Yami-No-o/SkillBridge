import { useState, useMemo } from 'react'
import { jobs, zones, skills } from '../data/mockData'

/* ── JobCard ─────────────────────────────────────────────────────── */
function JobCard({ job }) {
  const [applied, setApplied] = useState(false)
  return (
    <article className="bg-white rounded-2xl border border-brand-border shadow-soft p-6 flex flex-col gap-4 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 relative overflow-hidden">
      {job.urgent && (
        <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider">
          URGENT
        </span>
      )}

      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
          <h3 className="font-semibold text-brand-text text-base leading-snug pr-8">{job.title}</h3>
        </div>
        <p className="text-brand-muted text-xs">Posted by <span className="font-medium text-brand-text">{job.employer}</span> · {job.postedAgo}</p>
      </div>

      {/* Meta pills */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-warm border border-brand-border text-brand-text">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
            <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.5-2-4.5-4.5-4.5z"/>
            <circle cx="8" cy="6" r="1.5"/>
          </svg>
          {job.zone}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-warm border border-brand-border text-brand-accent font-medium">
          {job.skill}
        </span>
        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-warm border border-brand-border text-brand-text">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
            <circle cx="8" cy="8" r="6.5"/>
            <path d="M8 4.5V8l2 2"/>
          </svg>
          {job.duration}
        </span>
      </div>

      {/* Description */}
      <p className="text-brand-muted text-sm leading-relaxed line-clamp-2">{job.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-brand-border mt-auto">
        <div>
          <p className="text-lg font-extrabold text-brand-text">{job.budget}</p>
          <p className="text-xs text-brand-muted">Total budget</p>
        </div>
        <button
          id={`apply-${job.id}`}
          onClick={() => setApplied(v => !v)}
          className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 ${
            applied
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
              : 'bg-brand-accent text-white hover:bg-brand-accentHover hover:shadow-hover'
          }`}
        >
          {applied ? '✓ Applied' : 'Apply Now'}
        </button>
      </div>
    </article>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function WorkerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedZone, setSelectedZone] = useState('All Zones')
  const [selectedSkill, setSelectedSkill] = useState('All Skills')
  const [urgentOnly, setUrgentOnly] = useState(false)

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      const matchesSearch  = !searchQuery || j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesZone    = selectedZone  === 'All Zones'  || j.zone  === selectedZone
      const matchesSkill   = selectedSkill === 'All Skills' || j.skill === selectedSkill
      const matchesUrgent  = !urgentOnly   || j.urgent
      return matchesSearch && matchesZone && matchesSkill && matchesUrgent
    })
  }, [searchQuery, selectedZone, selectedSkill, urgentOnly])

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Page header */}
      <section
        className="py-14 border-b border-brand-border"
        style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #e8f0eb 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-brand-accent text-sm font-semibold mb-2 uppercase tracking-widest">Find Work</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight mb-2">
            Jobs Near Your Zone
          </h1>
          <p className="text-brand-muted text-base max-w-xl">
            Browse local job listings across peri-urban Bengaluru. Apply directly — no middlemen, no fees.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white border-b border-brand-border shadow-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              id="worker-search"
              type="search"
              placeholder="Search jobs…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-brand-border bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
            />
          </div>

          <select
            id="worker-zone-filter"
            value={selectedZone}
            onChange={e => setSelectedZone(e.target.value)}
            className="text-sm border border-brand-border rounded-xl px-3 py-2 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-brand-text"
          >
            {zones.map(z => <option key={z}>{z}</option>)}
          </select>

          <select
            id="worker-skill-filter"
            value={selectedSkill}
            onChange={e => setSelectedSkill(e.target.value)}
            className="text-sm border border-brand-border rounded-xl px-3 py-2 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-brand-text"
          >
            {skills.map(s => <option key={s}>{s}</option>)}
          </select>

          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-brand-text">
            <button
              id="worker-urgent-toggle"
              role="switch"
              aria-checked={urgentOnly}
              onClick={() => setUrgentOnly(v => !v)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 ${
                urgentOnly ? 'bg-rose-500' : 'bg-brand-border'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                urgentOnly ? 'translate-x-5' : ''
              }`} />
            </button>
            Urgent only
          </label>

          <span className="ml-auto text-xs text-brand-muted font-medium">
            {filtered.length} job{filtered.length !== 1 ? 's' : ''} listed
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-brand-text font-semibold mb-1">No jobs match your filters</p>
            <p className="text-brand-muted text-sm">Try a different zone or skill type.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
