import { PackageCheck, ReceiptText, TrendingUp } from 'lucide-react'
import AdminLayout from '../components/admin/AdminLayout'
import { sales } from '../data/sales'

const statCards = [
  { label: 'Chiffre d’affaires', value: `${sales.reduce((sum, sale) => sum + sale.total, 0).toFixed(0)} DT`, icon: ReceiptText },
  { label: 'Ventes nettes', value: `${(sales.reduce((sum, sale) => sum + sale.total, 0) * 0.92).toFixed(0)} DT`, icon: TrendingUp },
  { label: 'Nombre de commandes', value: `${sales.length}`, icon: PackageCheck },
]

export default function AdminSalesPage() {
  return (
    <AdminLayout title="Ventes">
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
          <h2 className="text-xl font-bold text-slate-900">Dernières ventes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-5 py-3">Commande</th>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Catégorie</th>
                <th className="px-5 py-3">Montant</th>
                <th className="px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 12).map((sale) => (
                <tr key={sale.id} className="border-t border-slate-200 text-sm">
                  <td className="px-5 py-4 font-semibold text-slate-900">{sale.id}</td>
                  <td className="px-5 py-4 text-slate-600">Client {sale.customerId}</td>
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
