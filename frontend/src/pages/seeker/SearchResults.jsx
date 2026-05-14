import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { mockWorkers, ZONES, SKILL_LABELS } from '../../data/mockWorkers'
import WorkerCard from '../../components/WorkerCard'

const SORT_OPTIONS = [
  { value: 'match',  label: 'Best Match' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'rate',   label: 'Lowest Rate' },
]

function matchWorkers(workers, q) {
  if (!q) return workers
  const term = q.toLowerCase().replace(/_/g, ' ')
  return workers.map((w) => {
    const skillHit = w.skills.some(
      (s) =>
        SKILL_LABELS[s]?.toLowerCase().includes(term) ||
        s.replace(/_/g, ' ').includes(term)
    )
    const nameHit = w.name.toLowerCase().includes(term)
    return { ...w, _score: skillHit ? w.matchDepth + 5 : nameHit ? 50 : w.matchDepth }
  })
}

export default function SearchResults() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''

  const [zone,      setZone]      = useState('All Zones')
  const [availOnly, setAvailOnly] = useState(false)
  const [sort,      setSort]      = useState('match')

  const results = useMemo(() => {
    let list = matchWorkers(mockWorkers, query)
    if (zone !== 'All Zones')  list = list.filter((w) => w.zone === zone)
    if (availOnly)             list = list.filter((w) => w.available)
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating)
    else if (sort === 'rate')  list = [...list].sort((a, b) => a.rate - b.rate)
    else                       list = [...list].sort((a, b) => (b._score ?? 0) - (a._score ?? 0))
    return list
  }, [query, zone, availOnly, sort])

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Page header */}
      <section
        className="py-10 border-b border-brand-border"
        style={{ background: 'linear-gradient(160deg, #faf9f7 0%, #eef3ee 100%)' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
            Results for "<span className="text-brand-accent">{query}</span>"
          </h1>
          <p className="text-brand-muted text-sm">
            {results.length} worker{results.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-brand-border shadow-soft">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3">
          {/* Zone */}
          <select
            id="results-zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
            className="text-sm border border-brand-border rounded-xl px-3 py-2 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-brand-text"
          >
            {ZONES.map((z) => <option key={z}>{z}</option>)}
          </select>

          {/* Sort */}
          <select
            id="results-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border border-brand-border rounded-xl px-3 py-2 bg-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-accent/40 text-brand-text"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          {/* Available toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-brand-text">
            <button
              id="results-avail-toggle"
              role="switch"
              aria-checked={availOnly}
              onClick={() => setAvailOnly((v) => !v)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none ${
                availOnly ? 'bg-brand-accent' : 'bg-brand-border'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                availOnly ? 'translate-x-5' : ''
              }`} />
            </button>
            Available now
          </label>

          <span className="ml-auto text-xs text-brand-muted font-medium hidden sm:block">
            {results.length} result{results.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-brand-text font-semibold mb-1">No workers found</p>
            <p className="text-brand-muted text-sm">Try adjusting zone or availability filters.</p>
            <Link to="/seeker" className="mt-4 inline-block text-sm text-brand-accent hover:underline">
              ← Start a new search
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((w) => (
              <WorkerCard key={w.id} worker={w} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
