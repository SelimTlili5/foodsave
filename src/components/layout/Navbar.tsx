import { Heart, Menu, ShoppingCart, User, UtensilsCrossed, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import ThemeToggle from '../ui/ThemeToggle'

export default function Navbar() {
  const { t } = useTranslation()
  const { cart, user, isAdmin, logout } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.restaurants'), to: '/restaurants' },
    { label: t('nav.categories'), to: '/categories' },
    { label: t('nav.favorites'), to: '/favorites' },
    { label: t('nav.cart'), to: '/cart' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-orange-400 text-white shadow-sm">
            <UtensilsCrossed size={18} />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">SaveFood</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Anti-gaspi</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-red-600 dark:text-red-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />

          <Link to="/favorites" className="rounded-full border border-slate-200 p-2 text-slate-600 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-red-400">
            <Heart size={18} />
          </Link>

          <Link to="/cart" className="relative rounded-full border border-slate-200 p-2 text-slate-600 hover:text-red-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-red-400">
            <ShoppingCart size={18} />
            {cart.length > 0 ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{cart.length}</span> : null}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Link to="/admin" className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110">
                  {t('nav.admin')}
                </Link>
              ) : null}
              <Link to="/profile" className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 hover:border-red-300 hover:text-red-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-red-400 dark:hover:text-red-300">
                <User size={16} />
                {user.name.split(' ')[0]}
              </Link>
              <button type="button" onClick={logout} className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">{t('nav.logout')}</button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary">{t('nav.login')}</Link>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button type="button" onClick={() => setMenuOpen((current) => !current)} className="rounded-full border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200" aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900 lg:hidden">
          <div className="flex flex-col gap-2">
            <div className="mb-1">
              <LanguageSwitcher />
            </div>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-slate-800">{item.label}</NavLink>
            ))}
            {user && isAdmin ? (
              <Link to="/admin" onClick={() => setMenuOpen(false)} className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm">{t('nav.admin')}</Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
