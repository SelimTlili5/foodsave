import { Clock3, MapPin, Phone, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'
import { reviews } from '../data/reviews'

export default function RestaurantDetailPage() {
  const { t } = useTranslation()
  const { id } = useParams()
  const restaurant = restaurants.find((item) => item.id === id)

  if (!restaurant) {
    return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">{t('restaurantDetail.restaurantNotFound')}</div>
  }

  const restaurantProducts = products.filter((product) => product.restaurantId === restaurant.id)
  const restaurantReviews = reviews.filter((review) => review.restaurantId === restaurant.id)

  return (
    <div className="space-y-8 pb-12">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-soft dark:bg-slate-900">
        <div className="relative h-80">
          <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-slate-900/10" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-4">
                <img src={restaurant.logo} alt={restaurant.name} className="h-16 w-16 rounded-2xl border-4 border-white object-cover" />
                <div>
                  <h1 className="text-3xl font-black text-white">{restaurant.name}</h1>
                  <p className="text-sm text-slate-200">{restaurant.category} • {restaurant.city}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur">
                <Star size={16} className="fill-amber-400 text-amber-400" /> {restaurant.note.toFixed(1)} • {restaurant.reviewCount} {t('common.reviews')}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('restaurantDetail.address')}</div>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><MapPin size={15} /> {restaurant.address}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('restaurantDetail.hours')}</div>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><Clock3 size={15} /> {restaurant.hours}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('restaurantDetail.phone')}</div>
            <div className="mt-2 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"><Phone size={15} /> {restaurant.phone}</div>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{t('restaurantDetail.distance')}</div>
            <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">{restaurant.distanceKm} km • {restaurant.offersCount} {t('restaurants.offersCount')}</div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('restaurantDetail.about')}</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{restaurant.description}</p>
        </div>
        <div className="rounded-3xl bg-brand-50 p-6 dark:bg-slate-800">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700 dark:text-red-300">{t('restaurantDetail.impact')}</div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-slate-50">{restaurant.offersCount} {t('restaurantDetail.productsLabel')}</div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{restaurant.offersCount} {t('restaurantDetail.availableMeals')}</p>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('restaurantDetail.availableProducts')}</h2>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 dark:bg-slate-800 dark:text-red-300">{restaurantProducts.length} {t('restaurantDetail.productsLabel')}</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {restaurantProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('restaurantDetail.customerReviews')}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {restaurantReviews.map((review) => (
            <div key={review.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.userName} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{review.userName}</div>
                  <div className="text-sm text-amber-500">{'★'.repeat(review.rating)}</div>
                </div>
              </div>
              <p className="mt-3 text-slate-600 dark:text-slate-300">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
