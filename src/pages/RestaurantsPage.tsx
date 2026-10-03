import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { restaurants } from '../data/restaurants'

export default function RestaurantsPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [location, setLocation] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('popular')

  const categories = Array.from(new Set(restaurants.map((restaurant) => restaurant.category)))
  const locations = Array.from(new Set(restaurants.map((restaurant) => restaurant.city)))

  const filtered = useMemo(() => {
    const lowered = query.toLowerCase()
    const result = restaurants.filter((restaurant) => {
      const matchesQuery = !lowered || [restaurant.name, restaurant.category, restaurant.location, restaurant.city].some((value) => value.toLowerCase().includes(lowered))
      const matchesCategory = category === 'all' || restaurant.category === category
      const matchesLocation = location === 'all' || restaurant.city === location
      const matchesRating = restaurant.note >= minRating
      return matchesQuery && matchesCategory && matchesLocation && matchesRating
    })

    return result.sort((a, b) => {
      if (sortBy === 'note') return b.note - a.note
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm
      if (sortBy === 'price') return a.offersCount - b.offersCount
      return (b.reviewCount + (b.popular ? 100 : 0)) - (a.reviewCount + (a.popular ? 100 : 0))
    })
  }, [query, category, location, minRating, sortBy])

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft dark:bg-slate-900 dark:text-slate-100">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">{t('restaurants.title')}</h1>
            <p className="mt-1 text-slate-600 dark:text-slate-300">{t('restaurants.subtitle')}</p>
          </div>
          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
            <Search size={18} className="text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('common.restaurantOrCategory')} className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" />
          </div>
        </div>
      </div>

      <div className="container-shell">
        <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-slate-100"><SlidersHorizontal size={18} /> {t('restaurants.filterAndSort')}</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{t('common.category')}</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="all">{t('common.all')}</option>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{t('common.city')}</span>
            <select value={location} onChange={(event) => setLocation(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="all">{t('common.all')}</option>
              {locations.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{t('common.minimumRating')}</span>
            <select value={minRating} onChange={(event) => setMinRating(Number(event.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value={0}>Tous</option>
              <option value={4}>4.0+</option>
              <option value={4.5}>4.5+</option>
              <option value={4.8}>4.8+</option>
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>{t('common.sortBy')}</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
              <option value="popular">{t('common.popular')}</option>
              <option value="note">{t('common.note')}</option>
              <option value="distance">{t('common.distance')}</option>
              <option value="price">{t('common.price')}</option>
            </select>
          </label>

          <div className="flex items-end">
            <button type="button" onClick={() => { setQuery(''); setCategory('all'); setLocation('all'); setMinRating(0); setSortBy('popular') }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Filter size={16} /> {t('common.reset')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
      </div>
      {filtered.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{t('restaurants.notFound')}</div> : null}
    </div>
  )
}
