import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const language = i18n.language.startsWith('en') ? 'en' : 'fr'
  const nextLanguage = language === 'fr' ? 'en' : 'fr'

  return (
    <button
      type="button"
      aria-label={t(`nav.switchTo${nextLanguage === 'en' ? 'English' : 'French'}`)}
      title={t(`nav.switchTo${nextLanguage === 'en' ? 'English' : 'French'}`)}
      onClick={() => {
        void i18n.changeLanguage(nextLanguage)
        window.localStorage.setItem('savefood-language', nextLanguage)
      }}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-300 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-red-400 dark:hover:text-red-300 dark:focus-visible:ring-offset-slate-900"
    >
      <Globe size={16} className="text-red-500" aria-hidden="true" />
      <span>{language.toUpperCase()}</span>
    </button>
  )
}
