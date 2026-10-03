import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdminLayout from '../components/admin/AdminLayout'
import { orders } from '../data/orders'
import { restaurants } from '../data/restaurants'
import { users } from '../data/users'

const statusColors: Record<string, string> = {
  'En attente': 'bg-amber-100 text-amber-700',
  Confirmée: 'bg-orange-100 text-orange-700',
  Prête: 'bg-yellow-100 text-yellow-700',
  Récupérée: 'bg-emerald-100 text-emerald-700',
  Annulée: 'bg-red-100 text-red-700',
}

export default function AdminOrdersPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const restaurant = restaurants.find((item) => item.id === order.restaurantId)
      const user = users.find((item) => item.id === order.userId)
      const search = query.toLowerCase()
      return !search || [order.id, user?.name ?? '', restaurant?.name ?? '', order.status].join(' ').toLowerCase().includes(search)
    })
  }, [query])

  return (
    <AdminLayout title={t('admin.orders')}>
      <div className="admin-panel overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('common.search')} className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none ring-0 transition focus:border-red-300" />
          </div>
          <div className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">{filteredOrders.length} {t('admin.ordersCount')}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-3">{t('orders.order')}</th>
                <th className="px-5 py-3">{t('admin.customer')}</th>
                <th className="px-5 py-3">{t('admin.restaurant')}</th>
                <th className="px-5 py-3">{t('admin.amount')}</th>
                <th className="px-5 py-3">{t('admin.status')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const restaurant = restaurants.find((item) => item.id === order.restaurantId)
                const user = users.find((item) => item.id === order.userId)

                return (
                  <tr key={order.id} className="border-t border-slate-200 text-sm">
                    <td className="px-5 py-4 font-semibold text-slate-900">{order.id}</td>
                    <td className="px-5 py-4 text-slate-600">{user?.name ?? 'Client'}</td>
                    <td className="px-5 py-4 text-slate-600">{restaurant?.name ?? 'Restaurant'}</td>
                    <td className="px-5 py-4 font-medium text-slate-800">{order.total.toFixed(2)} DT</td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[order.status] ?? 'bg-slate-100 text-slate-700'}`}>{order.status}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
