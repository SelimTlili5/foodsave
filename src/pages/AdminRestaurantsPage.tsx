import AdminLayout from '../components/admin/AdminLayout'
import { restaurants } from '../data/restaurants'

export default function AdminRestaurantsPage() {
  return (
    <AdminLayout title="Restaurants">
      <div className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">Restaurant</th>
                <th className="px-4 py-3">Ville</th>
                <th className="px-4 py-3">Note</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="border-t border-slate-200 text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={restaurant.logo} alt={restaurant.name} className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-slate-900">{restaurant.name}</div>
                        <div className="text-xs text-slate-500">{restaurant.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{restaurant.city}</td>
                  <td className="px-4 py-3 text-slate-600">{restaurant.note}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-medium ${restaurant.active ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'}`}>{restaurant.active ? 'Actif' : 'Inactif'}</span></td>
                  <td className="px-4 py-3"><button className="text-sm font-medium text-red-600">Voir</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
