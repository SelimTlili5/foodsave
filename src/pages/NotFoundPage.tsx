import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-soft">
        <div className="text-5xl font-black text-brand-600">404</div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Page introuvable</h1>
        <p className="mt-2 text-slate-600">La page que vous cherchez n’existe pas ou a été déplacée.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">Retour à l’accueil</Link>
      </div>
    </div>
  )
}
