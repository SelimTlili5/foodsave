import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DailyStatistic } from '../../types'

type OrdersChartProps = {
  data: DailyStatistic[]
}

export default function OrdersChart({ data }: OrdersChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    day: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
  }))

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip formatter={(value) => [`${Number(value ?? 0)} cmd`, 'Commandes']} labelStyle={{ color: '#0f172a' }} />
          <Bar dataKey="orders" radius={[8, 8, 0, 0]} fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
