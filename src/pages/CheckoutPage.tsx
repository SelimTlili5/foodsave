import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'

export default function CheckoutPage() {
  const { t } = useTranslation()
  const { cart, user, addOrder, clearCart, showToast } = useAppContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user?.name ?? 'Client SaveFood', phone: user?.phone ?? '+216 20 000 000', email: user?.email ?? 'client@example.com' })

  const items = cart.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId)
    return { ...item, product }
  }).filter((entry) => entry.product)

  const subtotal = items.reduce((sum, item) => sum + (item.product!.salePrice * item.quantity), 0)
  const originalTotal = items.reduce((sum, item) => sum + (item.product!.originalPrice * item.quantity), 0)
  const savings = originalTotal - subtotal
  const restaurantId = items[0]?.restaurantId ?? restaurants[0].id

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const order = {
      id: `o${Date.now()}`,
      userId: user?.id ?? 'u1',
      restaurantId,
      items: cart,
      total: subtotal,
      savings,
      status: 'En attente' as const,
      createdAt: new Date().toISOString(),
    }
    addOrder(order)
    clearCart()
    showToast(t('toast.orderConfirmed'))
    navigate('/orders')
  }

  if (!items.length) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{t('cart.emptyTitle')} <Link to="/restaurants" className="font-semibold text-brand-700 dark:text-red-300">{t('common.viewOffers')}</Link></div>
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft dark:bg-slate-900">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">{t('common.checkout')}</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">Informations client</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300 md:col-span-2">
              <span>{t('auth.fullName')}</span>
              <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>{t('auth.phone')}</span>
              <input value={form.phone} onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
            </label>
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>{t('auth.email')}</span>
              <input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" />
            </label>
          </div>

          <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <div className="font-semibold text-brand-700 dark:text-red-300">Méthode de récupération</div>
            <div className="mt-2">Retrait au restaurant</div>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('cart.summary')}</h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <img src={item.product!.image} alt={item.product!.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">{item.product!.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Qté: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{(item.product!.salePrice * item.quantity).toFixed(2)} DT</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300">
            <div className="flex justify-between"><span>Prix original</span><span>{originalTotal.toFixed(2)} DT</span></div>
            <div className="flex justify-between"><span>{t('cart.savings')}</span><span className="font-semibold text-brand-700 dark:text-red-300">-{savings.toFixed(2)} DT</span></div>
            <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-50"><span>{t('cart.total')}</span><span>{subtotal.toFixed(2)} DT</span></div>
          </div>

          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">Confirmer la commande</button>
        </aside>
      </form>
    </div>
  )
}
