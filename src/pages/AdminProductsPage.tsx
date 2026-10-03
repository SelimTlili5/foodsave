import AdminLayout from '../components/admin/AdminLayout'
import { products } from '../data/products'

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Plats">
      <div className="admin-panel p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Gestion des plats</h2>
          <button className="btn-primary">Ajouter un plat</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Plat</th>
                <th className="px-4 py-3">Restaurant</th>
                <th className="px-4 py-3">Prix</th>
                <th className="px-4 py-3">Quantité</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id} className="border-t border-slate-200 text-sm">
                  <td className="px-4 py-3"><div className="font-semibold text-slate-900">{product.name}</div></td>
                  <td className="px-4 py-3 text-slate-600">{product.restaurantId}</td>
                  <td className="px-4 py-3 text-slate-600">{product.salePrice} DT</td>
                  <td className="px-4 py-3 text-slate-600">{product.availableQty}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">Disponible</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
