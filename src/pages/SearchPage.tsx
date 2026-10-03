import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/product/ProductCard'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'

export default function SearchPage() {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const filteredRestaurants = useMemo(() => restaurants.filter((restaurant) => [restaurant.name, restaurant.category, restaurant.city].join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const filteredProducts = useMemo(() => products.filter((product) => [product.name, product.category, product.description].join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const filteredCategories = useMemo(() => categories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase())), [query])

  const hasResults = filteredRestaurants.length > 0 || filteredProducts.length > 0 || filteredCategories.length > 0

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('search.placeholder')} className="w-full border-0 bg-transparent text-sm outline-none placeholder:text-slate-400" />
        </div>
      </div>

      {!query ? <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">{t('search.empty')}</div> : null}

      {query && !hasResults ? <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">{t('search.noResults', { query })}</div> : null}

      {filteredRestaurants.length > 0 ? <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">{t('search.restaurants')}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filteredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
      </section> : null}

      {filteredProducts.length > 0 ? <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">{t('search.products')}</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      </section> : null}

      {filteredCategories.length > 0 ? <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">{t('search.categories')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
              <div className="text-3xl">{category.emoji}</div>
              <div className="mt-3 text-lg font-semibold text-slate-900">{category.name}</div>
            </div>
          ))}
        </div>
      </section> : null}
    </div>
  )
}
