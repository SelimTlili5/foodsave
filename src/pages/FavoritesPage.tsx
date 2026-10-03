import { useTranslation } from 'react-i18next'
import ProductCard from '../components/product/ProductCard'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import EmptyState from '../components/ui/EmptyState'
import { useAppContext } from '../context/AppContext'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'

export default function FavoritesPage() {
  const { t } = useTranslation()
  const { favoriteRestaurantIds, favoriteProductIds } = useAppContext()

  const favoriteRestaurants = restaurants.filter((restaurant) => favoriteRestaurantIds.includes(restaurant.id))
  const favoriteProducts = products.filter((product) => favoriteProductIds.includes(product.id))

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">{t('favorites.title')}</h1>
      </div>

      {favoriteRestaurants.length === 0 && favoriteProducts.length === 0 ? (
        <EmptyState title={t('favorites.emptyTitle')} description={t('favorites.emptyDescription')} />
      ) : null}

      {favoriteRestaurants.length > 0 ? (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">{t('favorites.favoriteRestaurants')}</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{favoriteRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
        </section>
      ) : null}

      {favoriteProducts.length > 0 ? (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">{t('favorites.favoriteProducts')}</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{favoriteProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>
      ) : null}
    </div>
  )
}
