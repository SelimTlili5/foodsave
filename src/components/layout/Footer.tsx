import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-50">SaveFood</div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{t('footer.impactText')}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('footer.menu')}</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><Link to="/restaurants">{t('nav.restaurants')}</Link></li>
            <li><Link to="/categories">{t('nav.categories')}</Link></li>
            <li><Link to="/search">{t('common.search')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('footer.company')}</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><Link to="/about">{t('footer.about')}</Link></li>
            <li><Link to="/admin">{t('common.dashboard')}</Link></li>
            <li><Link to="/login">{t('nav.login')}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('footer.contact')}</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>contact@savefood.tn</li>
            <li>+216 71 000 000</li>
            <li>Tunis, Tunisie</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">{t('footer.rights')}</div>
    </footer>
  )
}
