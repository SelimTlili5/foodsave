import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

type CategorySalesChartProps = {
  data: Array<{ name: string; value: number; color: string }>
}

export default function CategorySalesChart({ data }: CategorySalesChartProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${Number(value ?? 0)}%`, 'Part']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
