// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const navItems = [
  { to: '/admin',          label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/workers',  label: 'Workers',   icon: '👷' },
  { to: '/admin/jobs',     label: 'Jobs',      icon: '📋' },
  { to: '/admin/bookings', label: 'Bookings',  icon: '📅' },
];

function SidebarContent({ onClose }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-[#2d3748]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#2d6a4f] flex items-center justify-center text-white font-bold text-sm">SB</span>
          <div>
            <p className="text-white font-bold text-sm leading-tight">SkillBridge</p>
            <p className="text-xs text-green-400 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors w-full',
                isActive
                  ? 'bg-[#2d6a4f] text-white'
                  : 'text-gray-300 hover:bg-[#2d3748] hover:text-white',
              ].join(' ')
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-[#2d3748]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xs font-bold">A</div>
          <div>
            <p className="text-xs text-white font-medium">Admin User</p>
            <p className="text-[10px] text-gray-400">admin@skillbridge.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8f9fa] overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#1f2937] shrink-0">
        <SidebarContent />
      </aside>

      {/* ── Mobile drawer backdrop ── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={[
          'fixed top-0 left-0 h-full w-60 bg-[#1f2937] z-50 flex flex-col',
          'transition-transform duration-300 lg:hidden',
          drawerOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <SidebarContent onClose={() => setDrawerOpen(false)} />
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shrink-0">
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <p className="font-bold text-gray-900 text-sm">SkillBridge Admin</p>
          <span className="ml-auto text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Admin</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
