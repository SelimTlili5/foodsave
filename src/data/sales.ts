import type { Sale } from '../types'

const seedDates = [
  '2026-09-05', '2026-09-06', '2026-09-07', '2026-09-08', '2026-09-09', '2026-09-10', '2026-09-11',
  '2026-09-12', '2026-09-13', '2026-09-14', '2026-09-15', '2026-09-16', '2026-09-17', '2026-09-18',
  '2026-09-19', '2026-09-20', '2026-09-21', '2026-09-22', '2026-09-23', '2026-09-24', '2026-09-25',
  '2026-09-26', '2026-09-27', '2026-09-28', '2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02',
  '2026-10-03', '2026-10-04', '2026-10-05' 
]

const restaurantPool = ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12']
const productPool = ['p1', 'p3', 'p5', 'p7', 'p9', 'p11', 'p13', 'p15', 'p17', 'p21', 'p23', 'p27', 'p29', 'p31', 'p35', 'p36', 'p39', 'p40']
const statuses: Sale['status'][] = ['Confirmée', 'Prête', 'Récupérée', 'En attente']
const categories = ['Pizza', 'Fast Food', 'Healthy', 'Boulangerie', 'Cuisine tunisienne']

export const sales: Sale[] = seedDates.flatMap((date, index) => {
  const numberOfSales = 4 + ((index * 3) % 7)

  return Array.from({ length: numberOfSales }, (_, itemIndex) => {
    const restaurantId = restaurantPool[(index + itemIndex) % restaurantPool.length]
    const productId = productPool[(index * 2 + itemIndex) % productPool.length]
    const quantity = 1 + ((index + itemIndex) % 4)
    const unitPrice = 8 + ((index + itemIndex) % 16) * 1.5
    const total = Number((unitPrice * quantity).toFixed(2))

    return {
      id: `SF-${1200 + index * 10 + itemIndex}`,
      date,
      restaurantId,
      productId,
      quantity,
      unitPrice,
      total,
      status: statuses[(index + itemIndex) % statuses.length],
      customerId: `u${(index + itemIndex % 20) + 1}`,
      category: categories[(index + itemIndex) % categories.length],
    }
  })
})
