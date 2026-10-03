import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DailyStatistic } from '../../types'

type RevenueChartProps = {
  data: DailyStatistic[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((item) => ({
    ...item,
    day: new Date(item.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
    revenue: Number(item.revenue.toFixed(0)),
  }))

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0.08} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip formatter={(value) => [`${Number(value ?? 0)} €`, 'Revenu']} labelStyle={{ color: '#0f172a' }} />
          <Area type="monotone" dataKey="revenue" stroke="#f97316" fill="url(#revenueFill)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
