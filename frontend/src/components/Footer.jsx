import { Link } from 'react-router-dom'

const BridgeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    <path d="M2 20 Q14 8 26 20" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <line x1="7"  y1="20" x2="7"  y2="24" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="14" y1="14" x2="14" y2="24" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="21" y1="20" x2="21" y2="24" stroke="#4a7c59" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="4"  y1="24" x2="24" y2="24" stroke="#6b7280" strokeWidth="2"   strokeLinecap="round"/>
  </svg>
)

const footerLinks = [
  {
    heading: 'Platform',
    links: [
      { label: 'Find Work',    to: '/worker' },
      { label: 'Hire Workers', to: '/seeker' },
      { label: 'How It Works', to: '/#how-it-works' },
    ],
  },
  {
    heading: 'Coverage',
    links: [
      { label: 'Anekal',               to: '/' },
      { label: 'Sarjapura',            to: '/' },
      { label: 'Kanakapura',           to: '/' },
      { label: 'Electronic City Fringe', to: '/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Admin',   to: '/admin' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-brand-warmDark border-t border-brand-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <BridgeIcon />
              <span className="font-bold text-base text-brand-text">
                Skill<span className="text-brand-accent">Bridge</span>
              </span>
            </Link>
            <p className="text-brand-muted text-sm leading-relaxed">
              Hyperlocal skilled worker marketplace serving peri-urban Bengaluru.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-3">
                {heading}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-brand-muted hover:text-brand-accent transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-brand-muted">
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <p className="text-xs text-brand-muted">
            Built for peri-urban Bengaluru 🌿
          </p>
        </div>
      </div>
    </footer>
  )
}
