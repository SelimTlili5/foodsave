import { Minus, Plus, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import EmptyState from '../components/ui/EmptyState'
import { useAppContext } from '../context/AppContext'
import { products } from '../data/products'

export default function CartPage() {
  const { t } = useTranslation()
  const { cart, removeFromCart, updateCartQuantity, totalSavings } = useAppContext()

  const items = cart.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId)
    return { ...item, product }
  }).filter((entry) => entry.product)

  const subtotal = items.reduce((sum, item) => sum + (item.product?.salePrice ?? 0) * item.quantity, 0)
  const originalTotal = items.reduce((sum, item) => sum + (item.product?.originalPrice ?? 0) * item.quantity, 0)

  if (!items.length) {
    return <div className="pb-12"><EmptyState title={t('cart.emptyTitle')} description={t('cart.emptyDescription')} action={<Link to="/restaurants" className="btn-primary">{t('common.discoverOffers')}</Link>} /></div>
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft dark:bg-slate-900">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">{t('cart.title')}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <img src={item.product!.image} alt={item.product!.name} className="h-24 w-24 rounded-2xl object-cover" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{item.product!.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.product!.pickupWindow}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.productId)} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-red-600 dark:border-slate-700 dark:text-slate-300" aria-label={t('cart.remove')}><Trash2 size={16} /></button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1 dark:border-slate-700">
                    <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-medium dark:text-slate-100">{item.quantity}</span>
                    <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900 dark:text-slate-50">{(item.product!.salePrice * item.quantity).toFixed(2)} DT</div>
                    <div className="text-xs text-slate-500 line-through dark:text-slate-400">{(item.product!.originalPrice * item.quantity).toFixed(2)} DT</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{t('cart.summary')}</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span>{t('cart.originalPrice')}</span><span>{originalTotal.toFixed(2)} DT</span></div>
            <div className="flex justify-between"><span>{t('cart.saveFoodPrice')}</span><span>{subtotal.toFixed(2)} DT</span></div>
            <div className="flex justify-between"><span>{t('cart.savings')}</span><span className="font-semibold text-brand-700 dark:text-red-300">-{totalSavings.toFixed(2)} DT</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-50"><span>{t('cart.total')}</span><span>{subtotal.toFixed(2)} DT</span></div>
          </div>
          <Link to="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">{t('cart.checkout')}</Link>
        </aside>
      </div>
    </div>
  )
}
