import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const BridgeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M2 20 Q14 8 26 20" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <line x1="7"  y1="20" x2="7"  y2="24" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="14" y1="14" x2="14" y2="24" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="21" y1="20" x2="21" y2="24" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="4"  y1="24" x2="24" y2="24" stroke="#374151" strokeWidth="2"   strokeLinecap="round"/>
  </svg>
)

const navLinks = [
  { to: '/worker', label: 'Find Work' },
  { to: '/seeker', label: 'Hire Workers' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-brand-border'
          : 'bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border/60'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label="SkillBridge home"
        >
          <BridgeIcon />
          <span className="font-bold text-lg text-brand-text tracking-tight">
            Skill<span className="text-brand-accent">Bridge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-brand-accent bg-brand-warm'
                    : 'text-brand-text hover:text-brand-accent hover:bg-brand-warm'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost text-sm">Sign in</button>
          <Link to="/seeker" className="btn-primary text-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          id="mobile-menu-btn"
          className="md:hidden p-2 rounded-lg hover:bg-brand-warm transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-0.5 bg-brand-text transition-transform duration-200 mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-0.5 bg-brand-text transition-opacity duration-200 mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-brand-text transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-brand-border px-4 py-4 space-y-2 shadow-card animate-fade-in">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-brand-text hover:bg-brand-warm hover:text-brand-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button className="w-full btn-ghost justify-center">Sign in</button>
            <Link to="/seeker" className="btn-primary justify-center" onClick={() => setMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
