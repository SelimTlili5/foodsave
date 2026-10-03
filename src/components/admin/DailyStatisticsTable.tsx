import type { DailyStatistic } from '../../types'

type DailyStatisticsTableProps = {
  data: DailyStatistic[]
}

export default function DailyStatisticsTable({ data }: DailyStatisticsTableProps) {
  const rows = [...data].slice(-7).reverse()

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-semibold">Jour</th>
              <th className="px-4 py-3 font-semibold">Commandes</th>
              <th className="px-4 py-3 font-semibold">Plats</th>
              <th className="px-4 py-3 font-semibold">Revenu</th>
              <th className="px-4 py-3 font-semibold">Économie</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.date} className="border-t border-slate-200 text-slate-700">
                <td className="px-4 py-3 font-medium">{new Date(row.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</td>
                <td className="px-4 py-3">{row.orders}</td>
                <td className="px-4 py-3">{row.soldMeals}</td>
                <td className="px-4 py-3 font-semibold text-red-600">{row.revenue.toFixed(0)} €</td>
                <td className="px-4 py-3 text-emerald-600">{row.customerSavings.toFixed(0)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
