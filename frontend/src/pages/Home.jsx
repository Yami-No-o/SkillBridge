import { Link } from 'react-router-dom'

/* ─── Section data ────────────────────────────────────────────── */
const stats = [
  {
    value: '500+',
    label: 'Verified Workers',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    value: '6',
    label: 'Zones Covered',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    ),
  },
  {
    value: '0%',
    label: 'Commission Fee',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
        <path d="M9 9h.01M15 15h.01"/>
      </svg>
    ),
  },
]

const steps = [
  {
    num: '01',
    title: 'Post a Job',
    desc: 'Describe the work you need — plumbing, painting, electrical, or more.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <path d="M8 12h8M12 8v8"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Get Matched',
    desc: 'We surface skilled workers available in your zone — instantly.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <path d="M8 11h6M11 8v6"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Book Direct',
    desc: 'Connect and confirm directly — no middlemen, no platform fees.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
]

const zones = [
  'Anekal',
  'Sarjapura',
  'Kanakapura',
  'Whitefield Outskirts',
  'Electronic City Fringe',
  'Attibele',
]

/* ─── Sub-components ──────────────────────────────────────────── */

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #faf9f7 0%, #f0ebe0 45%, #e8f0eb 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #4a7c59 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -left-24 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #4a7c59 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-warm border border-brand-border text-brand-accent text-xs font-semibold mb-6 shadow-soft">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block animate-pulse" />
          Peri-urban Bengaluru's Skill Network
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-text leading-tight mb-5 animate-fade-up"
            style={{ animationDelay: '0.05s' }}>
          Connect with{' '}
          <span
            className="relative inline-block"
            style={{
              background: 'linear-gradient(135deg, #4a7c59, #2d5e40)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Skilled Workers
          </span>
          <br />
          Near You
        </h1>

        <p className="text-brand-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
           style={{ animationDelay: '0.15s' }}>
          SkillBridge connects households and businesses in peri-urban Bengaluru with
          trusted local workers — directly, quickly, and without any commission.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
             style={{ animationDelay: '0.25s' }}>
          <Link
            to="/seeker"
            id="hero-hire-cta"
            className="btn-primary text-base px-8 py-3 rounded-xl shadow-hover"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
              <line x1="20" y1="8"  x2="20" y2="14"/>
            </svg>
            Hire Workers
          </Link>
          <Link
            to="/worker"
            id="hero-work-cta"
            className="btn-outline text-base px-8 py-3 rounded-xl"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Find Work
          </Link>
        </div>

        {/* Social proof micro-bar */}
        <p className="mt-8 text-xs text-brand-muted animate-fade-up" style={{ animationDelay: '0.35s' }}>
          Trusted by 500+ workers · 6 zones · Zero platform fees
        </p>
      </div>
    </section>
  )
}

function TrustStats() {
  return (
    <section id="trust-stats" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="card text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-warm text-brand-accent mb-4 mx-auto transition-all duration-200 group-hover:bg-brand-accent group-hover:text-white">
                {icon}
              </div>
              <p className="text-4xl font-extrabold text-brand-text mb-1">{value}</p>
              <p className="text-brand-muted text-sm font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-brand-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">How It Works</h2>
          <p className="section-sub">
            Three simple steps to get skilled help — or skilled work — in your neighbourhood.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {steps.map(({ num, title, desc, icon }, i) => (
            <div key={num} className="relative flex flex-col items-center text-center px-6 pb-10 md:pb-0">
              {/* Connector line (between cards on desktop) */}
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-0 h-px step-line"
                />
              )}

              {/* Icon circle */}
              <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-card border border-brand-border text-brand-accent mb-5 transition-all duration-200 hover:shadow-hover hover:-translate-y-1">
                {icon}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-accent text-white text-xs font-bold flex items-center justify-center shadow">
                  {num.slice(-1)}
                </span>
              </div>

              <h3 className="text-lg font-bold text-brand-text mb-2">{title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoverageZones() {
  return (
    <section id="coverage" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="section-title mb-3">Coverage Zones</h2>
        <p className="section-sub mb-10">
          We operate across the peri-urban belt surrounding Bengaluru — and growing.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {zones.map((zone) => (
            <button key={zone} className="zone-pill transition-all duration-200">
              <span className="mr-1.5">📍</span>
              {zone}
            </button>
          ))}
        </div>
        <p className="mt-6 text-xs text-brand-muted">
          More zones launching soon · <span className="text-brand-accent font-medium cursor-pointer hover:underline">Request your area →</span>
        </p>
      </div>
    </section>
  )
}

function CtaBanner() {
  return (
    <section
      id="cta-banner"
      className="py-20"
      style={{
        background: 'linear-gradient(135deg, #2d5e40 0%, #4a7c59 50%, #3a6e70 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
          Ready to get started?
        </h2>
        <p className="text-green-100 text-base md:text-lg mb-10 leading-relaxed">
          Join hundreds of workers and families already using SkillBridge to
          get work done — locally, fairly, and fast.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/seeker"
            id="cta-hire-btn"
            className="inline-flex items-center gap-2 bg-white text-brand-accent font-semibold text-sm px-8 py-3 rounded-xl shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
              <line x1="20" y1="8"  x2="20" y2="14"/>
            </svg>
            Hire Workers
          </Link>
          <Link
            to="/worker"
            id="cta-work-btn"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold text-sm px-8 py-3 rounded-xl transition-all duration-200 hover:bg-white hover:text-brand-accent hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            Find Work
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStats />
      <HowItWorks />
      <CoverageZones />
      <CtaBanner />
    </>
  )
}
