import { ArrowRight, Leaf, MapPin, Search, ShieldCheck, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { restaurants } from '../data/restaurants'

const stats = [
  { label: 'Repas sauvés', value: '28.4k', icon: <ShoppingBag size={18} /> },
  { label: 'Restaurants partenaires', value: '640+', icon: <MapPin size={18} /> },
  { label: 'Clients actifs', value: '12.8k', icon: <Users size={18} /> },
  { label: 'Économies réalisées', value: '1.7M DT', icon: <TrendingUp size={18} /> },
]

const steps = [
  'Choisissez une offre près de chez vous.',
  'Récupérez votre repas à l’heure indiquée.',
  'Profitez d’un prix réduit et sauvez un repas.',
]

const testimonials = [
  { name: 'Sonia', comment: 'J’économise chaque semaine et je trouve des endroits vraiment bien.', city: 'Tunis' },
  { name: 'Amine', comment: 'Super pour les repas du soir près du bureau. Simple, rapide et pratique.', city: 'Sfax' },
  { name: 'Leila', comment: 'La plateforme m’aide à manger mieux tout en réduisant le gaspillage.', city: 'Sousse' },
]

export default function HomePage() {
  const featuredRestaurants = restaurants.filter((restaurant) => restaurant.popular).slice(0, 3)
  const discountProducts = products.filter((product) => product.featured).slice(0, 4)

  return (
    <div className="space-y-14 pb-10">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-50 via-white to-emerald-50 px-6 py-10 shadow-soft lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200">SaveFood • Tunisie</span>
            <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Sauvez un repas. Économisez de l’argent. Protégez la planète.</h1>
            <p className="mt-4 max-w-lg text-lg text-slate-600">Découvrez des plats à prix réduit dans les restaurants de votre ville et participez à la lutte contre le gaspillage alimentaire.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <Search size={18} className="text-slate-400" />
                <input className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" placeholder="Rechercher un restaurant ou un plat" />
              </div>
              <Link to="/restaurants" className="btn-primary">Découvrir les offres</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/restaurants" className="btn-primary">Voir les offres</Link>
              <Link to="/register" className="btn-secondary">Devenir partenaire</Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] bg-white p-4 shadow-soft">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" alt="Repas de restaurant" className="h-[420px] w-full rounded-[1.5rem] object-cover" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-brand-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-brand-700"><Leaf size={16} /> Impact</div>
                  <div className="mt-2 text-2xl font-black text-slate-900">+42%</div>
                  <p className="text-xs text-slate-600">de réduction du gaspillage</p>
                </div>
                <div className="rounded-2xl bg-amber-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-700"><ShieldCheck size={16} /> Qualité</div>
                  <div className="mt-2 text-2xl font-black text-slate-900">4.8/5</div>
                  <p className="text-xs text-slate-600">moyenne clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Restaurants populaires</h2>
          <Link to="/restaurants" className="text-sm font-semibold text-brand-700">Voir tout</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredRestaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Plats à prix réduit</h2>
          <Link to="/search" className="text-sm font-semibold text-brand-700">Explorer</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {discountProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Catégories</h2>
          <Link to="/categories" className="text-sm font-semibold text-brand-700">Explorer les catégories</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <Link key={category.id} to="/restaurants" className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
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
          <h2 className="text-2xl font-bold text-slate-900">Comment ça marche ?</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{index + 1}</div>
              <p className="text-base font-medium text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">{stat.icon}</div>
              <div className="mt-4 text-3xl font-black text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-slate-900 px-6 py-10 text-white lg:px-10">
        <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:items-center">
          <div>
            <div className="text-3xl font-black">Impact écologique</div>
            <div className="mt-4 text-slate-300">Chaque repas récupéré aide à réduire le gaspillage alimentaire, à économiser de l’énergie et à soutenir les restaurants locaux de Tunisie.</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-3xl font-black text-brand-400">3.8t</div>
              <div className="mt-2 text-sm text-slate-300">CO₂ évité</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-3xl font-black text-brand-400">19k</div>
              <div className="mt-2 text-sm text-slate-300">kg de nourriture sauvée</div>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <div className="text-3xl font-black text-brand-400">71%</div>
              <div className="mt-2 text-sm text-slate-300">d’offres réémployées</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">Témoignages clients</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => <span key={`${item.name}-${index}`}>★</span>)}
              </div>
              <p className="mt-4 text-slate-700">“{item.comment}”</p>
              <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-900">{item.name} • {item.city}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] bg-gradient-to-r from-brand-600 to-emerald-500 px-6 py-10 text-white text-center shadow-soft">
        <h2 className="text-3xl font-black">Rejoignez la communauté SaveFood</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">Mieux manger, mieux consommer et mieux agir pour la planète.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 font-semibold text-brand-700">Créer un compte</Link>
          <Link to="/restaurants" className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-3 font-semibold text-white">Voir les offres <ArrowRight className="ml-2" size={16} /></Link>
        </div>
      </section>
    </div>
  )
}
