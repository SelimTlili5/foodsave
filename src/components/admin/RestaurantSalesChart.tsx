import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

type RestaurantSalesChartProps = {
  data: Array<{ name: string; revenue: number }>
}

export default function RestaurantSalesChart({ data }: RestaurantSalesChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 12 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={80} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip formatter={(value) => [`${Number(value ?? 0)} €`, 'Ca']} />
          <Bar dataKey="revenue" radius={[0, 8, 8, 0]} fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
