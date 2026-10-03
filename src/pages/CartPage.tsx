import { Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/ui/EmptyState'
import { useAppContext } from '../context/AppContext'
import { products } from '../data/products'

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, totalSavings } = useAppContext()

  const items = cart.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId)
    return { ...item, product }
  }).filter((entry) => entry.product)

  const subtotal = items.reduce((sum, item) => sum + (item.product?.salePrice ?? 0) * item.quantity, 0)
  const originalTotal = items.reduce((sum, item) => sum + (item.product?.originalPrice ?? 0) * item.quantity, 0)

  if (!items.length) {
    return <div className="pb-12"><EmptyState title="Votre panier est vide" description="Ajoutez des plats à prix réduit pour commencer." action={<Link to="/restaurants" className="btn-primary">Découvrir les offres</Link>} /></div>
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">Panier</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
              <img src={item.product!.image} alt={item.product!.name} className="h-24 w-24 rounded-2xl object-cover" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{item.product!.name}</h3>
                    <p className="text-sm text-slate-500">{item.product!.pickupWindow}</p>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.productId)} className="rounded-full border border-slate-200 p-2 text-slate-500 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1">
                    <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="rounded-full p-1 hover:bg-slate-100"><Minus size={14} /></button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <button type="button" onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="rounded-full p-1 hover:bg-slate-100"><Plus size={14} /></button>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">{(item.product!.salePrice * item.quantity).toFixed(2)} DT</div>
                    <div className="text-xs text-slate-500 line-through">{(item.product!.originalPrice * item.quantity).toFixed(2)} DT</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-bold text-slate-900">Résumé</h2>
          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="flex justify-between"><span>Prix d’origine</span><span>{originalTotal.toFixed(2)} DT</span></div>
            <div className="flex justify-between"><span>Prix SaveFood</span><span>{subtotal.toFixed(2)} DT</span></div>
            <div className="flex justify-between"><span>Économies</span><span className="font-semibold text-brand-700">-{totalSavings.toFixed(2)} DT</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900"><span>Total</span><span>{subtotal.toFixed(2)} DT</span></div>
          </div>
          <Link to="/checkout" className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">Passer la commande</Link>
        </aside>
      </div>
    </div>
  )
}
