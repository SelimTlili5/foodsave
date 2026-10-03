import { ArrowRight, Leaf, MapPin, Search, ShieldCheck, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'

const testimonials = [
  { name: 'Sonia', comment: 'J’économise chaque semaine et je trouve des endroits vraiment bien.', city: 'Tunis' },
  { name: 'Amine', comment: 'Super pour les repas du soir près du bureau. Simple, rapide et pratique.', city: 'Sfax' },
  { name: 'Leila', comment: 'La plateforme m’aide à manger mieux tout en réduisant le gaspillage.', city: 'Sousse' },
]

export default function HomePage() {
  const { t } = useTranslation()
  const steps = t('home.steps', { returnObjects: true }) as string[]
  const featuredRestaurants = restaurants.filter((restaurant) => restaurant.popular).slice(0, 3)
  const discountProducts = products.filter((product) => product.featured).slice(0, 4)

  const stats = [
    { label: t('home.stats.mealsSaved'), value: '28.4k', icon: <ShoppingBag size={18} /> },
    { label: t('home.stats.partnerRestaurants'), value: '640+', icon: <MapPin size={18} /> },
    { label: t('home.stats.activeClients'), value: '12.8k', icon: <Users size={18} /> },
    { label: t('home.stats.savings'), value: '1.7M DT', icon: <TrendingUp size={18} /> },
  ]

  return (
    <div className="space-y-14 pb-10">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-emerald-50 px-6 py-10 shadow-soft dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200 dark:bg-slate-800 dark:text-red-300 dark:ring-slate-700">{t('home.tag')}</span>
            <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl">{t('home.title')}</h1>
            <p className="mt-4 max-w-lg text-lg text-slate-600 dark:text-slate-300">{t('home.subtitle')}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <Search size={18} className="text-slate-400" />
                <input className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500" placeholder={t('common.searchPlaceholder')} />
              </div>
              <Link to="/restaurants" className="btn-primary">{t('home.discover')}</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/restaurants" className="btn-primary">{t('common.viewOffers')}</Link>
              <Link to="/register" className="btn-secondary">{t('home.becomePartner')}</Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-white p-4 shadow-soft dark:bg-slate-900">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" alt="Repas de restaurant" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-brand-50 p-4 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-red-300"><Leaf size={16} /> Impact</div>
                  <div className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">+42%</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">de réduction du gaspillage</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4 dark:bg-slate-800">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-300"><ShieldCheck size={16} /> Qualité</div>
                  <div className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">4.8/5</div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">moyenne clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('home.popularRestaurants')}</h2>
          <Link to="/restaurants" className="text-sm font-semibold text-brand-700 dark:text-red-300">{t('common.viewAll')}</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('home.discountedMeals')}</h2>
          <Link to="/search" className="text-sm font-semibold text-brand-700 dark:text-red-300">{t('common.explore')}</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {discountProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('home.categories')}</h2>
          <Link to="/categories" className="text-sm font-semibold text-brand-700 dark:text-red-300">{t('common.explore')}</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} to="/restaurants" className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <div className="relative h-40 overflow-hidden">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <div className="text-2xl">{category.emoji}</div>
                  <div className="mt-2 text-lg font-semibold">{category.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{t('home.howItWorks')}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{index + 1}</div>
              <p className="text-base font-medium text-slate-800 dark:text-slate-100">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-red-300">{stat.icon}</div>
              <div className="mt-4 text-3xl font-black text-slate-900 dark:text-slate-50">{stat.value}</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white lg:px-10">
        <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <div className="text-3xl font-black">{t('home.impact')}</div>
            <div className="mt-4 text-slate-300">{t('home.impactDescription')}</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-3xl font-black text-brand-400">3.8t</div>
              <div className="mt-2 text-sm text-slate-300">{t('home.ecosystemMetrics.co2')}</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-3xl font-black text-brand-400">19k</div>
              <div className="mt-2 text-sm text-slate-300">{t('home.ecosystemMetrics.foodSaved')}</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-3xl font-black text-brand-400">71%</div>
              <div className="mt-2 text-sm text-slate-300">{t('home.ecosystemMetrics.offersReused')}</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-50">{t('home.testimonials')}</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => <span key={`${item.name}-${index}`}>★</span>)}
              </div>
              <p className="mt-4 text-slate-700 dark:text-slate-200">“{item.comment}”</p>
              <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-50">{item.name} • {item.city}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-brand-600 to-emerald-500 px-6 py-10 text-center text-white shadow-soft">
        <h2 className="text-3xl font-black">{t('home.joinCommunity')}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">{t('home.joinDescription')}</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-brand-700">{t('home.createAccount')}</Link>
          <Link to="/restaurants" className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 font-semibold text-white">{t('home.exploreOffers')} <ArrowRight className="ml-2" size={16} /></Link>
        </div>
      </section>
    </div>
  )
}
