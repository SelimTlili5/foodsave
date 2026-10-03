import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { users } from '../data/users'
import type { User } from '../types'
import { useAppContext } from '../context/AppContext'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: 'Nouvel utilisateur', email: 'new@example.com', phone: '+216 20 111 111', city: 'Tunis' })
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
    showToast('Compte créé avec succès')
    navigate('/login')
  }

  return (
    <div className="mx-auto max-w-2xl pb-12">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">Créer un compte</h1>
        <p className="mt-2 text-slate-600">Rejoignez SaveFood pour réserver vos repas à prix réduit.</p>

        <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
            <span>Nom complet</span>
            <input value={form.name} onChange={(event) => handleChange('name', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <input value={form.email} onChange={(event) => handleChange('email', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Téléphone</span>
            <input value={form.phone} onChange={(event) => handleChange('phone', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
            <span>Ville</span>
            <input value={form.city} onChange={(event) => handleChange('city', event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>

          <div className="md:col-span-2">
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">
              Créer mon compte <ArrowRight size={16} />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Déjà membre ? <Link to="/login" className="font-semibold text-brand-700">Me connecter</Link>
        </div>
      </div>
    </div>
  )
}
