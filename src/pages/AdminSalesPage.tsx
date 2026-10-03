import { PackageCheck, ReceiptText, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import AdminLayout from '../components/admin/AdminLayout'
import { sales } from '../data/sales'

export default function AdminSalesPage() {
  const { t } = useTranslation()

  const statCards = [
    { label: t('admin.revenueToday'), value: `${sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(0)} DT`, icon: ReceiptText },
    { label: t('admin.netSales'), value: `${(sales.reduce((sum, sale) => sum + sale.total, 0) * 0.92).toFixed(0)} DT`, icon: TrendingUp },
    { label: t('admin.ordersToday'), value: `${sales.length}`, icon: PackageCheck },
  ]

  return (
    <AdminLayout title={t('admin.sales')}>
      <div className="grid gap-4 md:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="admin-panel p-5">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600"><Icon size={18} /></div>
            <div className="mt-4 text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-black text-slate-900">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 admin-panel overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-bold text-slate-900">{t('admin.lastSales')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-3">{t('orders.order')}</th>
                <th className="px-5 py-3">{t('admin.customer')}</th>
                <th className="px-5 py-3">{t('admin.category')}</th>
                <th className="px-5 py-3">{t('admin.amount')}</th>
                <th className="px-5 py-3">{t('admin.status')}</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 12).map((sale) => (
                <tr key={sale.id} className="border-t border-slate-200 text-sm">
                  <td className="px-5 py-4 font-semibold text-slate-900">{sale.id}</td>
                  <td className="px-5 py-4 text-slate-600">{t('admin.customer')} {sale.customerId}</td>
                  <td className="px-5 py-4 text-slate-600">{sale.category}</td>
                  <td className="px-5 py-4 font-medium text-slate-800">{sale.total} DT</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">{sale.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
