import { ArrowUpRight, ChartNoAxesCombined, Sparkles, TrendingUp, Wallet } from 'lucide-react'
import { useMemo, useState } from 'react'
import AdminLayout from '../components/admin/AdminLayout'
import CategorySalesChart from '../components/admin/CategorySalesChart'
import DailyStatisticsTable from '../components/admin/DailyStatisticsTable'
import DateRangeFilter from '../components/admin/DateRangeFilter'
import OrdersChart from '../components/admin/OrdersChart'
import ProductsSoldChart from '../components/admin/ProductsSoldChart'
import RevenueChart from '../components/admin/RevenueChart'
import RestaurantSalesChart from '../components/admin/RestaurantSalesChart'
import StatCard from '../components/admin/StatCard'
import { dailyStatistics } from '../data/statistics'

type Period = '7D' | '30D' | '90D'

const categoryBreakdown = [
  { name: 'Pizza', value: 32, color: '#ef4444' },
  { name: 'Fast Food', value: 26, color: '#f97316' },
  { name: 'Healthy', value: 18, color: '#f59e0b' },
  { name: 'Boulangerie', value: 15, color: '#facc15' },
  { name: 'Autres', value: 9, color: '#fca5a5' },
]

const restaurantRevenue = [
  { name: 'Café Bon', revenue: 1420 },
  { name: 'Urban Bowl', revenue: 1275 },
  { name: 'Le Petit', revenue: 1190 },
  { name: 'Sushi Pop', revenue: 1015 },
  { name: 'Pizza Deli', revenue: 980 },
]

export default function AdminStatisticsPage() {
  const [period, setPeriod] = useState<Period>('30D')

  const filteredStats = useMemo(() => {
    const size = period === '7D' ? 7 : period === '30D' ? 30 : 90
    return dailyStatistics.slice(-size)
  }, [period])

  const totalRevenue = filteredStats.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = filteredStats.reduce((sum, item) => sum + item.orders, 0)
  const totalSoldMeals = filteredStats.reduce((sum, item) => sum + item.soldMeals, 0)
  const totalCustomerSavings = filteredStats.reduce((sum, item) => sum + item.customerSavings, 0)

  const previousWindow = useMemo(() => {
    const previousSize = period === '7D' ? 7 : period === '30D' ? 30 : 90
    return dailyStatistics.slice(-(previousSize * 2), -previousSize)
  }, [period])

  const revenueTrend = previousWindow.length > 0
    ? (((totalRevenue - previousWindow.reduce((sum, item) => sum + item.revenue, 0)) / Math.max(previousWindow.reduce((sum, item) => sum + item.revenue, 0), 1)) * 100)
    : 0

  const ordersTrend = previousWindow.length > 0
    ? (((totalOrders - previousWindow.reduce((sum, item) => sum + item.orders, 0)) / Math.max(previousWindow.reduce((sum, item) => sum + item.orders, 0), 1)) * 100)
    : 0

  return (
    <AdminLayout title="Statistiques">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">Performance globale</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Suivi des performances</h2>
        </div>
        <DateRangeFilter value={period} onChange={setPeriod} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenu total" value={`${totalRevenue.toFixed(0)} €`} trend={`${revenueTrend >= 0 ? '+' : ''}${revenueTrend.toFixed(1)}%`} icon={Wallet} accent="red" />
        <StatCard label="Commandes" value={totalOrders.toString()} trend={`${ordersTrend >= 0 ? '+' : ''}${ordersTrend.toFixed(1)}%`} icon={ArrowUpRight} accent="orange" />
        <StatCard label="Plats vendus" value={totalSoldMeals.toString()} trend="+12,4% vs semaine dernière" icon={ChartNoAxesCombined} accent="yellow" />
        <StatCard label="Économie client" value={`${totalCustomerSavings.toFixed(0)} €`} trend="Impact positif" icon={Sparkles} accent="red" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Évolution du chiffre d’affaires</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Revenu par jour</h3>
            </div>
            <TrendingUp className="text-red-500" size={18} />
          </div>
          <RevenueChart data={filteredStats} />
        </div>

        <div className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Suivi des commandes</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Volume journalier</h3>
            </div>
            <ArrowUpRight className="text-orange-500" size={18} />
          </div>
          <OrdersChart data={filteredStats} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Rotation des plats</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Ventes détaillées</h3>
            </div>
            <ChartNoAxesCombined className="text-yellow-500" size={18} />
          </div>
          <ProductsSoldChart data={filteredStats} />
        </div>

        <div className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Mix produit</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Répartition par catégorie</h3>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
            <CategorySalesChart data={categoryBreakdown} />
            <div className="space-y-3">
              {categoryBreakdown.map((category) => (
                <div key={category.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                      {category.name}
                    </span>
                    <span className="font-semibold text-slate-900">{category.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 rounded-full" style={{ width: `${category.value}%`, backgroundColor: category.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <div className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Détail quotidien</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Table de performance</h3>
            </div>
          </div>
          <DailyStatisticsTable data={filteredStats} />
        </div>

        <div className="admin-panel p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Meilleurs revenus</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Top restaurants</h3>
            </div>
          </div>
          <RestaurantSalesChart data={restaurantRevenue} />
        </div>
      </div>
    </AdminLayout>
  )
}
