import ProductCard from '../components/product/ProductCard'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import EmptyState from '../components/ui/EmptyState'
import { useAppContext } from '../context/AppContext'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'

export default function FavoritesPage() {
  const { favoriteRestaurantIds, favoriteProductIds } = useAppContext()

  const favoriteRestaurants = restaurants.filter((restaurant) => favoriteRestaurantIds.includes(restaurant.id))
  const favoriteProducts = products.filter((product) => favoriteProductIds.includes(product.id))

  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">Favoris</h1>
      </div>

      {favoriteRestaurants.length === 0 && favoriteProducts.length === 0 ? (
        <EmptyState title="Aucun favori pour le moment" description="Ajoutez des restaurants ou des plats à vos favoris pour les retrouver plus tard." />
      ) : null}

      {favoriteRestaurants.length > 0 ? (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Restaurants favoris</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{favoriteRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}</div>
        </section>
      ) : null}

      {favoriteProducts.length > 0 ? (
        <section>
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Plats favoris</h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">{favoriteProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>
      ) : null}
    </div>
  )
}
