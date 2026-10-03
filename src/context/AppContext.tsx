import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { orders as seedOrders } from '../data/orders'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'
import { users } from '../data/users'
import type { CartItem, Order, Product, User } from '../types'

type ToastItem = {
  id: number
  message: string
}

type AppContextValue = {
  cart: CartItem[]
  favoriteRestaurantIds: string[]
  favoriteProductIds: string[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleFavoriteRestaurant: (restaurantId: string) => void
  toggleFavoriteProduct: (productId: string) => void
  user: User | null
  isAdmin: boolean
  login: (email: string, password?: string) => User | null
  logout: () => void
  orders: Order[]
  addOrder: (nextOrder: Order) => void
  toast: ToastItem | null
  showToast: (message: string) => void
  getRestaurantName: (restaurantId: string) => string
  getProductById: (productId: string) => Product | undefined
  restaurantCount: number
  productCount: number
  totalSavings: number
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

const CART_KEY = 'savefood-cart'
const FAVORITES_RESTAURANTS_KEY = 'savefood-favourites-restaurants'
const FAVORITES_PRODUCTS_KEY = 'savefood-favourites-products'
const USER_KEY = 'savefood-current-user'
const ORDERS_KEY = 'savefood-orders'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]') as CartItem[] } catch { return [] }
  })
  const [favoriteRestaurantIds, setFavoriteRestaurantIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(FAVORITES_RESTAURANTS_KEY) ?? '[]') as string[] } catch { return [] }
  })
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(FAVORITES_PRODUCTS_KEY) ?? '[]') as string[] } catch { return [] }
  })
  const [orders, setOrders] = useState<Order[]>(() => {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]') as Order[] } catch { return seedOrders }
  })
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_KEY)
    return saved ? (JSON.parse(saved) as User) : null
  })
  const [toast, setToast] = useState<ToastItem | null>(null)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(FAVORITES_RESTAURANTS_KEY, JSON.stringify(favoriteRestaurantIds))
  }, [favoriteRestaurantIds])

  useEffect(() => {
    localStorage.setItem(FAVORITES_PRODUCTS_KEY, JSON.stringify(favoriteProductIds))
  }, [favoriteProductIds])

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  }, [orders])

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id)
      if (existing) {
        return prev.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      }
      return [...prev, { productId: product.id, restaurantId: product.restaurantId, quantity }]
    })
    showToast('Plat ajouté au panier')
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => item.productId === productId ? { ...item, quantity } : item))
  }

  const clearCart = () => setCart([])

  const toggleFavoriteRestaurant = (restaurantId: string) => {
    setFavoriteRestaurantIds((prev) => prev.includes(restaurantId) ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId])
  }

  const toggleFavoriteProduct = (productId: string) => {
    setFavoriteProductIds((prev) => prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId])
  }

  const login = (email: string, password?: string) => {
    const matchedUser = users.find((item) => item.email.toLowerCase() === email.toLowerCase())
    if (!matchedUser) {
      const fallback = users[0]
      setUser(fallback)
      return fallback
    }
    if (password && password.length < 3 && matchedUser.role === 'client') {
      return null
    }
    setUser(matchedUser)
    return matchedUser
  }

  const logout = () => setUser(null)

  const showToast = (message: string) => {
    const id = Date.now() + Math.random()
    setToast({ id, message })
    window.setTimeout(() => setToast((current) => (current && current.id === id ? null : current)), 1800)
  }

  const addOrder = (nextOrder: Order) => {
    setOrders((prev) => [nextOrder, ...prev])
  }

  const getRestaurantName = (restaurantId: string) => restaurants.find((restaurant) => restaurant.id === restaurantId)?.name ?? 'Restaurant'

  const getProductById = (productId: string) => products.find((product) => product.id === productId)

  const totalSavings = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = getProductById(item.productId)
      return sum + ((product?.originalPrice ?? 0) - (product?.salePrice ?? 0)) * item.quantity
    }, 0)
  }, [cart])

  const value = useMemo<AppContextValue>(() => ({
    cart,
    favoriteRestaurantIds,
    favoriteProductIds,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleFavoriteRestaurant,
    toggleFavoriteProduct,
    user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    orders,
    addOrder,
    toast,
    showToast,
    getRestaurantName,
    getProductById,
    restaurantCount: restaurants.length,
    productCount: products.length,
    totalSavings,
  }), [cart, favoriteRestaurantIds, favoriteProductIds, orders, toast, user, totalSavings])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
