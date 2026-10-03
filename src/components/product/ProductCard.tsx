import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../context/AppContext'
import type { Product } from '../../types'

export default function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation()
  const { addToCart, favoriteProductIds, toggleFavoriteProduct } = useAppContext()
  const isFavorite = favoriteProductIds.includes(product.id)

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="relative">
        <img src={product.image} alt={product.name} className="h-44 w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">-{product.discountPercent}%</span>
        <button type="button" onClick={() => toggleFavoriteProduct(product.id)} className={`absolute right-3 top-3 rounded-full p-2 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-700 dark:bg-slate-700 dark:text-slate-100'}`} aria-label={t('product.toggleFavorite')}>
          <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{product.name}</h3>
          <div className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700 dark:bg-slate-800 dark:text-red-300">{product.availableQty} {t('product.rests')}</div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Star className="fill-amber-400 text-amber-400" size={14} />
          {t('product.delivery')} {product.pickupWindow}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">{product.salePrice} DT</span>
          <span className="text-sm text-slate-400 line-through dark:text-slate-500">{product.originalPrice} DT</span>
        </div>
        <button type="button" onClick={() => addToCart(product)} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
          <ShoppingBag size={16} /> {t('product.addToCart')}
        </button>
      </div>
    </article>
  )
}
