import type { DailyStatistic } from '../types'

const startDate = new Date('2026-09-05')

export const dailyStatistics: DailyStatistic[] = Array.from({ length: 30 }, (_, index) => {
  const date = new Date(startDate)
  date.setDate(startDate.getDate() + index)

  const orders = 32 + ((index * 11) % 22)
  const soldMeals = orders * (2 + (index % 4))
  const revenue = Number((orders * (42 + (index % 9) * 9)).toFixed(2))
  const customerSavings = Number((revenue * 0.38).toFixed(2))

  return {
    date: date.toISOString().slice(0, 10),
    orders,
    soldMeals,
    revenue,
    customerSavings,
  }
})
