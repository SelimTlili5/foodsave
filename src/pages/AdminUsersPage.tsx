import { useTranslation } from 'react-i18next'
import AdminLayout from '../components/admin/AdminLayout'
import { users } from '../data/users'

export default function AdminUsersPage() {
  const { t } = useTranslation()

  return (
    <AdminLayout title={t('admin.users')}>
      <div className="admin-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="px-4 py-3">{t('admin.user')}</th>
                <th className="px-4 py-3">{t('admin.role')}</th>
                <th className="px-4 py-3">{t('profile.orders')}</th>
                <th className="px-4 py-3">{t('admin.status')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-200 text-sm">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{user.role}</td>
                  <td className="px-4 py-3 text-slate-600">{user.ordersCount}</td>
                  <td className="px-4 py-3"><span className={`rounded-full px-2 py-1 text-xs font-medium ${user.status === 'active' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700'}`}>{user.status === 'active' ? t('admin.active') : t('admin.inactive')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
