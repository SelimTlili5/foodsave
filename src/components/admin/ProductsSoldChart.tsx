import { useTranslation } from 'react-i18next'
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { DailyStatistic } from '../../types'

type ProductsSoldChartProps = {
  data: DailyStatistic[]
}

export default function ProductsSoldChart({ data }: ProductsSoldChartProps) {
  const { i18n, t } = useTranslation()
  const locale = i18n.language === 'en' ? 'en-US' : 'fr-FR'

  const chartData = data.map((item) => ({
    ...item,
    day: new Date(item.date).toLocaleDateString(locale, { day: 'numeric', month: 'short' }),
  }))

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip formatter={(value) => [`${Number(value ?? 0)} ${t('admin.mealsCount')}`, t('admin.soldCount')]} labelStyle={{ color: '#0f172a' }} />
          <Line type="monotone" dataKey="soldMeals" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
