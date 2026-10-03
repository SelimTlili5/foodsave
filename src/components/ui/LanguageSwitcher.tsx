import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const options = [
  { value: 'fr', label: '🇫🇷 Français' },
  { value: 'en', label: '🇬🇧 English' },
]

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
      <Globe size={16} className="text-red-500" />
      <select
        aria-label={t('nav.language')}
        value={i18n.language.startsWith('en') ? 'en' : 'fr'}
        onChange={(event) => {
          const next = event.target.value
          void i18n.changeLanguage(next)
          window.localStorage.setItem('savefood-language', next)
        }}
        className="appearance-none bg-transparent pr-4 text-sm font-medium outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}
