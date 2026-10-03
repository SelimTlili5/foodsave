import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="text-xl font-bold text-slate-900">SaveFood</div>
          <p className="mt-3 text-sm text-slate-600">Sauvez un repas, économisez de l’argent et protégez la planète.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Menu</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link to="/restaurants">Restaurants</Link></li>
            <li><Link to="/categories">Catégories</Link></li>
            <li><Link to="/search">Recherche</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Entreprise</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/login">Connexion</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>contact@savefood.tn</li>
            <li>+216 71 000 000</li>
            <li>Tunis, Tunisie</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">© 2025 SaveFood — Tous droits réservés.</div>
    </footer>
  )
}
