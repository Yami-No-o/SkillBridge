import { useState, useMemo } from 'react'
import { workers, zones, skills } from '../data/mockData'

/* ── helpers ───────────────────────────────────────────────────── */
const avatarColors = [
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-sky-100 text-sky-700',
  'bg-rose-100 text-rose-700',
  'bg-violet-100 text-violet-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
  'bg-pink-100 text-pink-700',
]
const colorFor = (id) => avatarColors[parseInt(id.replace(/\D/g, '')) % avatarColors.length]

const Stars = ({ rating }) => {
  const full = Math.floor(rating)
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className={`w-3 h-3 ${i < full ? 'text-amber-400' : 'text-brand-border'}`} fill="currentColor">
          <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.1L6 8.02 3.22 9.56l.53-3.1L1.5 4.27l3.11-.45z"/>
        </svg>
      ))}
    </span>
  )
}

/* ── WorkerCard ─────────────────────────────────────────────────── */
function WorkerCard({ worker }) {
  return (
    <article className="bg-white rounded-2xl border border-brand-border shadow-soft p-6 flex flex-col gap-4 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorFor(worker.id)}`}>
          {worker.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="font-semibold text-brand-text text-base truncate">{worker.name}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
              worker.available
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}>
              {worker.available ? '● Available' : '○ Busy'}
            </span>
          </div>
          <p className="text-brand-accent text-sm font-medium">{worker.skill}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-brand-muted">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.5-2-4.5-4.5-4.5z"/>
                <circle cx="8" cy="6" r="1.5"/>
              </svg>
              {worker.zone}
            </span>
            <span>{worker.experience} exp.</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-brand-muted text-sm leading-relaxed line-clamp-2">{worker.bio}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {worker.tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-brand-warm text-brand-text border border-brand-border">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-brand-border mt-auto">
        <div>
          <p className="text-base font-bold text-brand-text">{worker.rate}</p>
          <div className="flex items-center gap-1.5 text-xs text-brand-muted mt-0.5">
            <Stars rating={worker.rating} />
            <span>{worker.rating} ({worker.reviews} reviews)</span>
          </div>
        </div>
        <button
          className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-150 ${
            worker.available
              ? 'bg-brand-accent text-white hover:bg-brand-accentHover hover:shadow-hover'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!worker.available}
          id={`contact-${worker.id}`}
        >
          {worker.available ? 'Contact' : 'Unavailable'}
        </button>
      </div>
    </article>
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function SeekerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedZone, setSelectedZone] = useState('All Zones')
  const [selectedSkill, setSelectedSkill] = useState('All Skills')
  const [availableOnly, setAvailableOnly] = useState(false)

  const filtered = useMemo(() => {
    return workers.filter(w => {
      const matchesSearch =
        !searchQuery ||
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesZone  = selectedZone  === 'All Zones'  || w.zone  === selectedZone
      const matchesSkill = selectedSkill === 'All Skills' || w.skill === selectedSkill
      const matchesAvail = !availableOnly || w.available
      return matchesSearch && matchesZone && matchesSkill && matchesAvail
    })
  }, [searchQuery, selectedZone, selectedSkill, availableOnly])

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Page header */}
      <section
        className="py-14 border-b border-brand-border"
        style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #f0ebe0 100%)' }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-brand-accent text-sm font-semibold mb-2 uppercase tracking-widest">Hire Workers</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-text tracking-tight mb-2">
            Find Skilled Workers Near You
          </h1>
          <p className="text-brand-muted text-base max-w-xl">
            Browse verified workers across 6 peri-urban zones in Bengaluru. Contact them directly — zero commission.
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
              id="seeker-search"
              type="search"
              placeholder="Search by name, skill, or tag…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-brand-border bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent"
            />
          </div>

          {/* Zone filter */}
          <select
            id="seeker-zone-filter"
            value={selectedZone}
            onChange={e => setSelectedZone(e.target.value)}
            className="text-sm border border-brand-border rounded-xl px-3 py-2 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-brand-text"
          >
            {zones.map(z => <option key={z}>{z}</option>)}
          </select>

          {/* Skill filter */}
          <select
            id="seeker-skill-filter"
            value={selectedSkill}
            onChange={e => setSelectedSkill(e.target.value)}
            className="text-sm border border-brand-border rounded-xl px-3 py-2 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-brand-text"
          >
            {skills.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Available toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-brand-text">
            <button
              id="seeker-available-toggle"
              role="switch"
              aria-checked={availableOnly}
              onClick={() => setAvailableOnly(v => !v)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 ${
                availableOnly ? 'bg-brand-accent' : 'bg-brand-border'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                availableOnly ? 'translate-x-5' : ''
              }`} />
            </button>
            Available only
          </label>

          <span className="ml-auto text-xs text-brand-muted font-medium">
            {filtered.length} worker{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-brand-text font-semibold mb-1">No workers found</p>
            <p className="text-brand-muted text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(worker => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
