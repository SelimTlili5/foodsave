import { MapPin, Star, UtensilsCrossed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import type { Restaurant } from '../../types'

export default function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const { favoriteRestaurantIds, toggleFavoriteRestaurant } = useAppContext()
  const isFavorite = favoriteRestaurantIds.includes(restaurant.id)

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="relative h-52 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" loading="lazy" />
        <button type="button" onClick={() => toggleFavoriteRestaurant(restaurant.id)} className={`absolute right-3 top-3 rounded-full p-2 ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-700'}`} aria-label="Toggle favorite restaurant">
          <HeartIcon filled={isFavorite} />
        </button>
        {restaurant.popular ? <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white">Populaire</span> : null}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{restaurant.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{restaurant.category}</p>
          </div>
          <div className="rounded-full bg-brand-50 px-2 py-1 text-sm font-semibold text-brand-700">{restaurant.note.toFixed(1)}</div>
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /> {restaurant.reviewCount} avis</span>
          <span className="inline-flex items-center gap-1"><MapPin size={14} /> {restaurant.city}</span>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <span>{restaurant.distanceKm} km</span>
          <span>{restaurant.offersCount} offres</span>
        </div>
        <Link to={`/restaurants/${restaurant.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
          Voir les offres
        </Link>
      </div>
    </article>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="h-4 w-4">
      <path d="M12 21s-8.5-4.35-10.5-9.2C.8 9.4 2.5 5 6.6 5c2.1 0 3.2 1.05 4.2 2.3C11.8 6.05 13 5 15.1 5c4.1 0 5.8 4.4 5.1 6.8C20.5 16.65 12 21 12 21z" />
    </svg>
  )
}
