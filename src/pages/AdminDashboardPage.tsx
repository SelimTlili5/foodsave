import { ArrowRight, CircleDollarSign, Clock3, Flame, ShoppingBag, ShoppingCart, TrendingUp, UtensilsCrossed, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AdminLayout from '../components/admin/AdminLayout'
import { orders } from '../data/orders'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'
import { sales } from '../data/sales'
import { dailyStatistics } from '../data/statistics'
import { users } from '../data/users'

const maxRevenue = Math.max(...dailyStatistics.map((item) => item.revenue))
const topRestaurants = restaurants
  .map((restaurant) => {
    const restaurantSales = sales.filter((sale) => sale.restaurantId === restaurant.id)
    const total = restaurantSales.reduce((sum, sale) => sum + sale.total, 0)
    return {
      restaurant,
      orders: restaurantSales.length,
      meals: restaurantSales.reduce((sum, sale) => sum + sale.quantity, 0),
      revenue: total,
      note: restaurant.note,
    }
  })
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 4)

const topProducts = products
  .map((product) => ({
    product,
    quantity: sales.filter((sale) => sale.productId === product.id).reduce((sum, sale) => sum + sale.quantity, 0),
    revenue: sales.filter((sale) => sale.productId === product.id).reduce((sum, sale) => sum + sale.total, 0),
  }))
  .sort((a, b) => b.quantity - a.quantity)
  .slice(0, 4)

const recentSales = sales.slice(0, 5)

export default function AdminDashboardPage() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR'
  const revenueToday = sales.reduce((sum, sale) => sum + sale.total, 0)
  const mealsSaved = products.reduce((sum, product) => sum + product.availableQty, 0)
  const todaysAverage = (revenueToday / Math.max(1, sales.length)).toFixed(0)

  return (
    <AdminLayout title={t('admin.dashboard')}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title={t('admin.revenueToday')} value={`${revenueToday.toFixed(0)} DT`} delta={`+12,5 % ${t('admin.vsYesterday')}`} icon={<CircleDollarSign size={18} />} tone="red" />
        <StatCard title={t('admin.ordersToday')} value={`${sales.length} ${t('admin.ordersCount')}`} delta={`+8,4 % ${t('admin.vsYesterday')}`} icon={<ShoppingCart size={18} />} tone="orange" />
        <StatCard title={t('admin.productsSoldToday')} value={`${sales.reduce((sum, sale) => sum + sale.quantity, 0)} ${t('admin.mealsCount')}`} delta={`+15,8 % ${t('admin.vsYesterday')}`} icon={<ShoppingBag size={18} />} tone="amber" />
        <StatCard title={t('admin.savingsRealized')} value={`${(sales.reduce((sum, sale) => sum + sale.total * 0.38, 0)).toFixed(0)} DT`} delta="+6,6 %" icon={<TrendingUp size={18} />} tone="orange" />
        <StatCard title={t('admin.mealsSaved')} value={`${mealsSaved} ${t('admin.mealsCount')}`} delta="+18,4 %" icon={<Flame size={18} />} tone="red" />
        <StatCard title={t('admin.activeRestaurants')} value={`${restaurants.filter((restaurant) => restaurant.active).length}`} delta={`12 ${t('admin.online')}`} icon={<UtensilsCrossed size={18} />} tone="amber" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="admin-panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">{t('admin.sales')}</h2>
            <div className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700">{t('admin.lastSevenDays')}</div>
          </div>
          <div className="mt-6 flex h-56 items-end gap-3">
            {dailyStatistics.slice(-7).map((item) => (
              <div key={item.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-2xl bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300" style={{ height: `${(item.revenue / maxRevenue) * 100}%` }} />
                <span className="text-[10px] text-slate-500">{new Date(item.date).toLocaleDateString(locale, { weekday: 'short' })}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel p-5">
          <h2 className="text-xl font-bold text-slate-900">{t('admin.dailyPerformance')}</h2>
          <div className="mt-5 space-y-3">
            {dailyStatistics.slice(-5).map((item) => (
              <div key={item.date} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div>
                  <div className="font-semibold text-slate-900">{new Date(item.date).toLocaleDateString(locale, { day: '2-digit', month: 'short' })}</div>
                  <div className="text-xs text-slate-500">{item.orders} commandes</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{item.revenue} DT</div>
                  <div className="text-xs text-orange-600">{item.soldMeals} plats</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="admin-panel overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">{t('admin.topRestaurants')}</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {topRestaurants.map((entry) => (
              <div key={entry.restaurant.id} className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <img src={entry.restaurant.logo} alt={entry.restaurant.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-slate-900">{entry.restaurant.name}</div>
                    <div className="text-xs text-slate-500">{entry.orders} commandes · {entry.meals} plats</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{entry.revenue.toFixed(0)} DT</div>
                  <div className="text-xs text-amber-600">★ {entry.note.toFixed(1)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">{t('admin.topProducts')}</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {topProducts.map(({ product, quantity, revenue }) => (
              <div key={product.id} className="flex items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div>
                    <div className="font-semibold text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-500">{restaurants.find((restaurant) => restaurant.id === product.restaurantId)?.name ?? 'Restaurant'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{quantity} vendus</div>
                  <div className="text-xs text-red-600">{revenue.toFixed(0)} DT</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="admin-panel overflow-hidden">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-xl font-bold text-slate-900">{t('admin.recentSales')}</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <div className="font-semibold text-slate-900">{sale.id}</div>
                  <div className="text-xs text-slate-500">{restaurants.find((restaurant) => restaurant.id === sale.restaurantId)?.name ?? 'Restaurant'}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{sale.total.toFixed(0)} DT</div>
                  <div className="text-xs text-slate-500">{sale.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-panel p-5">
          <h2 className="text-xl font-bold text-slate-900">Impact de SaveFood</h2>
          <div className="mt-5 space-y-4">
            <ImpactRow label="Repas sauvés" value={`${mealsSaved}`} accent="red" />
            <ImpactRow label="Économies réalisées" value={`${(sales.reduce((sum, sale) => sum + sale.total * 0.38, 0)).toFixed(0)} DT`} accent="orange" />
            <ImpactRow label="Plats récupérés" value={`${sales.reduce((sum, sale) => sum + sale.quantity, 0)}`} accent="amber" />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function StatCard({ title, value, delta, icon, tone }: { title: string; value: string; delta: string; icon: React.ReactNode; tone: 'red' | 'orange' | 'amber' }) {
  const toneMap = {
    red: 'bg-red-50 text-red-600',
    orange: 'bg-orange-50 text-orange-600',
    amber: 'bg-yellow-50 text-yellow-600',
  }

  return (
    <div className="admin-panel p-5">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${toneMap[tone]}`}>{icon}</div>
      <div className="mt-4 text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-black text-slate-900">{value}</div>
      <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600"><TrendingUp size={12} /> {delta}</div>
    </div>
  )
}

function ImpactRow({ label, value, accent }: { label: string; value: string; accent: 'red' | 'orange' | 'amber' }) {
  const toneMap = {
    red: 'from-red-500 to-red-400',
    orange: 'from-orange-400 to-orange-300',
    amber: 'from-yellow-400 to-yellow-300',
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-semibold text-slate-900">{value}</span>
      </div>
      <div className="h-2.5 rounded-full bg-slate-200">
        <div className={`h-2.5 rounded-full bg-gradient-to-r ${toneMap[accent]}`} style={{ width: '72%' }} />
      </div>
    </div>
  )
}
