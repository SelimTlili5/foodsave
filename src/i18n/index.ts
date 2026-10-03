import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import fr from './locales/fr.json'

const getStoredLanguage = () => {
  if (typeof window === 'undefined') {
    return 'fr'
  }

  const stored = window.localStorage.getItem('savefood-language')
  return stored === 'en' || stored === 'fr' ? stored : 'fr'
}

void i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
  },
  lng: getStoredLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
