import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'

export default function CategoriesPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="rounded-[2rem] bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">Catégories</h1>
        <p className="mt-2 text-slate-600">Explorez les cuisines et trouvez les meilleurs deals près de chez vous.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} to="/restaurants" className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
            <div className="relative h-52 overflow-hidden">
              <img src={category.image} alt={category.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="text-3xl">{category.emoji}</div>
                <div className="mt-2 text-xl font-bold">{category.name}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 text-sm font-semibold text-slate-700">
              <span>Découvrir</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
