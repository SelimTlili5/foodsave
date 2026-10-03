import { useState } from 'react'
import { useAppContext } from '../context/AppContext'

export default function ProfilePage() {
  const { user, orders } = useAppContext()
  const [form, setForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '', city: user?.city ?? '' })

  if (!user) return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">Connectez-vous pour voir votre profil.</div>

  const totalSavings = orders.reduce((sum, order) => sum + order.savings, 0)

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
            <div>
              <h1 className="text-3xl font-black text-slate-900">{user.name}</h1>
              <p className="text-slate-600">{user.role}</p>
            </div>
          </div>
          <button type="button" className="btn-primary">Modifier</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Commandes</div><div className="mt-2 text-3xl font-black text-slate-900">{orders.length}</div></div>
        <div className="rounded-3xl bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Montant économisé</div><div className="mt-2 text-3xl font-black text-slate-900">{totalSavings.toFixed(0)} DT</div></div>
        <div className="rounded-3xl bg-white p-5 shadow-soft"><div className="text-sm text-slate-500">Repas sauvés</div><div className="mt-2 text-3xl font-black text-slate-900">{Math.round(totalSavings / 5)}</div></div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-bold text-slate-900">Informations personnelles</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Nom</span>
            <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Téléphone</span>
            <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Ville</span>
            <input value={form.city} onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" />
          </label>
        </div>
      </div>
    </div>
  )
}
