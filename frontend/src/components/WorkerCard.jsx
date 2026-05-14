import { Link } from 'react-router-dom'
import { SKILL_LABELS } from '../data/mockWorkers'

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

const Stars = ({ rating }) => (
  <span className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 12 12"
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
      >
        <path d="M6 1l1.39 2.82L10.5 4.27l-2.25 2.19.53 3.1L6 8.02 3.22 9.56l.53-3.1L1.5 4.27l3.11-.45z" />
      </svg>
    ))}
  </span>
)

export default function WorkerCard({ worker }) {
  return (
    <article className="bg-white rounded-xl border border-brand-border shadow-soft flex flex-col gap-3 p-5 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 ${colorFor(worker.id)}`}
        >
          {worker.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 flex-wrap">
            <h3 className="font-semibold text-brand-text text-sm truncate">{worker.name}</h3>
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
                worker.available
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}
            >
              {worker.available ? '● Available' : '○ Busy'}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-brand-muted">
            <Stars rating={worker.rating} />
            <span className="font-medium text-brand-text">{worker.rating}</span>
            <span>({worker.reviews})</span>
            <span>·</span>
            <span>{worker.experience}</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-brand-muted">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3 flex-shrink-0">
              <path d="M7 1C4.79 1 3 2.79 3 5c0 3.28 4 8 4 8s4-4.72 4-8c0-2.21-1.79-4-4-4z"/>
              <circle cx="7" cy="5" r="1.3"/>
            </svg>
            {worker.zone}
          </div>
        </div>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {worker.skills.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2 py-0.5 rounded-full bg-brand-warm border border-brand-border text-brand-text"
          >
            {SKILL_LABELS[s] || s}
          </span>
        ))}
      </div>

      {/* Match reason */}
      <p className="text-xs text-brand-accent italic leading-snug">{worker.matchReason}</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-brand-border mt-auto">
        <div>
          <span className="text-base font-extrabold text-brand-text">₹{worker.rate}</span>
          <span className="text-xs text-brand-muted">/day</span>
        </div>
        {worker.available ? (
          <Link
            to={`/seeker/book/${worker.id}`}
            id={`book-${worker.id}`}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-brand-accent text-white hover:bg-brand-accentHover transition-colors duration-150"
          >
            Book Now
          </Link>
        ) : (
          <span className="text-xs font-medium px-4 py-2 rounded-xl bg-gray-100 text-gray-400 cursor-not-allowed select-none">
            Unavailable
          </span>
        )}
      </div>
    </article>
  )
}
