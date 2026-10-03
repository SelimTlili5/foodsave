import { CheckCircle2, Clock3, XCircle } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

export default function OrdersPage() {
  const { orders, getRestaurantName } = useAppContext()

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">Mes commandes</h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm text-slate-500">Commande #{order.id}</div>
                <div className="text-xl font-bold text-slate-900">{getRestaurantName(order.restaurantId)}</div>
              </div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                order.status === 'Confirmée' ? 'bg-brand-50 text-brand-700' :
                order.status === 'Prête' ? 'bg-amber-50 text-amber-700' :
                order.status === 'Récupérée' ? 'bg-slate-200 text-slate-700' :
                order.status === 'Annulée' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {order.status === 'Confirmée' ? <CheckCircle2 size={12} /> : order.status === 'Annulée' ? <XCircle size={12} /> : <Clock3 size={12} />} {order.status}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <span>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</span>
              <span>{order.items.length} article(s)</span>
              <span>Total: <strong className="text-slate-900">{order.total} DT</strong></span>
              <span>Économie: <strong className="text-brand-700">{order.savings} DT</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
