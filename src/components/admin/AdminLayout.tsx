import { BarChart3, Bell, ChevronRight, LayoutDashboard, Menu, Package2, Settings, ShoppingCart, Store, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Tableau de bord', to: '/admin', icon: LayoutDashboard },
  { label: 'Commandes', to: '/admin/orders', icon: ShoppingCart },
  { label: 'Restaurants', to: '/admin/restaurants', icon: Store },
  { label: 'Plats', to: '/admin/products', icon: Package2 },
  { label: 'Utilisateurs', to: '/admin/users', icon: Users },
  { label: 'Ventes', to: '/admin/sales', icon: BarChart3 },
  { label: 'Statistiques', to: '/admin/statistics', icon: BarChart3 },
  { label: 'Paramètres', to: '/admin', icon: Settings },
]

export default function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen pb-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-red-500">Administration</div>
          <h1 className="mt-2 text-3xl font-black text-slate-900">{title}</h1>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 lg:hidden">
          <Menu size={16} />
          Menu
        </button>
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-72 shrink-0 rounded-[1.75rem] border border-orange-100 bg-white p-4 shadow-soft lg:block">
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-3 text-white">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-red-50/80">SaveFood</div>
              <div className="text-lg font-bold">Admin</div>
            </div>
            <Bell size={18} />
          </div>

          <nav className="space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink key={`${to}-${label}`} to={to} className={({ isActive }) => `flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-red-50 text-red-700' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'}`}>
                <span className="flex items-center gap-3">
                  <Icon size={16} />
                  {label}
                </span>
                <ChevronRight size={14} />
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex-1">{children}</div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-900/40 p-4 lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-[82%] max-w-xs rounded-[1.5rem] bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <div className="text-lg font-bold text-slate-900">Navigation</div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-slate-200 p-2 text-slate-600"><X size={16} /></button>
            </div>
            <nav className="space-y-2">
              {navItems.map(({ label, to, icon: Icon }) => (
                <NavLink key={`${to}-${label}`} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-red-50 text-red-700' : 'text-slate-600'}`}>
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  )
}
