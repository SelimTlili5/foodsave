import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { users } from '../data/users'
import type { User } from '../types'
import { useAppContext } from '../context/AppContext'

export default function RegisterPage() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '' })
  const navigate = useNavigate()
  const { showToast } = useAppContext()

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user: User = {
      id: `u${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
      avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?auto=format&fit=crop&w=300&q=80',
      role: 'client',
      joinedAt: new Date().toISOString(),
      status: 'active',
      ordersCount: 0,
      favoriteRestaurants: [],
    }
    users.unshift(user)
    showToast(t('auth.accountCreated'))
    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-2xl pb-12">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">{t('auth.registerTitle')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t('auth.registerDescription')}</p>

        <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
            <span>{t('auth.fullName')}</span>
            <input value={form.name} placeholder={t('Nom')} onChange={(event) => handleChange('name', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{t('auth.email')}</span>
            <input value={form.email} onChange={(event) => handleChange('email', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{t('auth.phone')}</span>
            <input value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
            <span>{t('auth.city')}</span>
            <input value={form.city} onChange={(event) => handleChange('city', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
          </label>

          <div className="md:col-span-2">
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              {t('auth.createAccount')} <ArrowRight size={16} />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          {t('auth.alreadyMember')} <Link to="/login" className="font-semibold text-brand-700 dark:text-red-300">{t('auth.join')}</Link>
        </div>
      </div>
    </div>
  )
}
