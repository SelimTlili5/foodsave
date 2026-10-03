import { Heart, MapPin, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import type { Restaurant } from '../../types'

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { t } = useTranslation()
  const { favoriteRestaurantIds, toggleFavoriteRestaurant } = useAppContext()
  const isFavorite = favoriteRestaurantIds.includes(restaurant.id)

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="relative h-52 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
        <button type="button" onClick={() => toggleFavoriteRestaurant(restaurant.id)} className={`absolute right-3 top-3 rounded-full p-2 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-700 dark:bg-slate-700 dark:text-slate-100'}`} aria-label={t('product.toggleFavorite')}>
          <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        {restaurant.popular ? <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">{t('restaurants.popular')}</span> : null}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{restaurant.name}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{restaurant.category}</p>
          </div>
          <div className="rounded-full bg-brand-50 px-2 py-1 text-sm font-semibold text-brand-700 dark:bg-slate-800 dark:text-red-300">{restaurant.note.toFixed(1)}</div>
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /> {restaurant.reviewCount} {t('common.reviews')}</span>
          <span className="inline-flex items-center gap-1"><MapPin size={14} /> {restaurant.city}</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{restaurant.distanceKm} {t('restaurants.distanceUnit')}</span>
          <span>{restaurant.offersCount} {t('restaurants.offersCount')}</span>
        </div>
        <Link to={`/restaurants/${restaurant.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
          {t('restaurants.viewOffers')}
        </Link>
      </div>
    </article>
  )
}
