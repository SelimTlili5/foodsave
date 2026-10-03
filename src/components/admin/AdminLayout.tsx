import { BarChart3, Bell, ChevronRight, LayoutDashboard, Menu, Package2, Settings, ShoppingCart, Store, Users, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

export default function AdminLayout({ title, children }: { title: string; children: React.ReactNode }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: t('admin.dashboard'), to: '/admin', icon: LayoutDashboard },
    { label: t('admin.orders'), to: '/admin/orders', icon: ShoppingCart },
    { label: t('admin.restaurants'), to: '/admin/restaurants', icon: Store },
    { label: t('admin.products'), to: '/admin/products', icon: Package2 },
    { label: t('admin.users'), to: '/admin/users', icon: Users },
    { label: t('admin.sales'), to: '/admin/sales', icon: BarChart3 },
    { label: t('admin.statistics'), to: '/admin/statistics', icon: BarChart3 },
    { label: t('admin.settings'), to: '/admin', icon: Settings },
  ]

  return (
    <div className="min-h-screen pb-12">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-red-500">{t('admin.title')}</div>
          <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-50">{title}</h1>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 lg:hidden">
          <Menu size={16} />
          {t('admin.menu')}
        </button>
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-72 shrink-0 rounded-[1.75rem] border border-orange-100 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900 lg:block">
          <div className="mb-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-3 text-white">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-red-50/80">SaveFood</div>
              <div className="text-lg font-bold">Admin</div>
            </div>
            <Bell size={18} />
          </div>

          <nav className="space-y-2">
            {navItems.map(({ label, to, icon: Icon }) => (
              <NavLink key={`${to}-${label}`} to={to} className={({ isActive }) => `flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${isActive ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-orange-300'}`}>
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
          <div className="h-full w-[82%] max-w-xs rounded-[1.5rem] bg-white p-4 shadow-2xl dark:bg-slate-900" onClick={(event) => event.stopPropagation()}>
            <div className="mb-5 flex items-center justify-between">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-50">{t('admin.navigation')}</div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-slate-200 p-2 text-slate-600 dark:border-slate-700 dark:text-slate-200"><X size={16} /></button>
            </div>
            <nav className="space-y-2">
              {navItems.map(({ label, to, icon: Icon }) => (
                <NavLink key={`${to}-${label}`} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium ${isActive ? 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300' : 'text-slate-600 dark:text-slate-300'}`}>
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
