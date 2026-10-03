export type Role = 'client' | 'customer' | 'restaurant' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  city: string
  avatar: string
  role: Role
  joinedAt: string
  status: 'active' | 'inactive'
  ordersCount: number
  favoriteRestaurants: string[]
}

export interface Category {
  id: string
  name: string
  label: string
  emoji: string
  image: string
}

export interface Restaurant {
  id: string
  name: string
  category: string
  city: string
  location: string
  note: number
  reviewCount: number
  distanceKm: number
  offersCount: number
  image: string
  logo: string
  description: string
  address: string
  hours: string
  phone: string
  popular?: boolean
  active?: boolean
}

export interface Product {
  id: string
  restaurantId: string
  name: string
  description: string
  image: string
  originalPrice: number
  salePrice: number
  discountPercent: number
  availableQty: number
  pickupWindow: string
  category: string
  featured?: boolean
}

export interface OrderItem {
  productId: string
  quantity: number
  restaurantId: string
}

export interface Order {
  id: string
  userId: string
  restaurantId: string
  items: OrderItem[]
  total: number
  savings: number
  status: 'En attente' | 'Confirmée' | 'Prête' | 'Récupérée' | 'Annulée'
  createdAt: string
}

export interface Review {
  id: string
  restaurantId: string
  userName: string
  avatar: string
  rating: number
  comment: string
}

export interface CartItem {
  productId: string
  restaurantId: string
  quantity: number
}

export interface Sale {
  id: string
  date: string
  restaurantId: string
  productId: string
  quantity: number
  unitPrice: number
  total: number
  status: 'En attente' | 'Confirmée' | 'Prête' | 'Récupérée' | 'Annulée'
  customerId: string
  category: string
}

export interface DailyStatistic {
  date: string
  orders: number
  soldMeals: number
  revenue: number
  customerSavings: number
}
