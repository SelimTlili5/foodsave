import { ShieldAlert, ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-[2rem] border border-red-100 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <ShieldAlert size={28} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Accès refusé</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Zone réservée aux administrateurs</h1>
        <p className="mt-4 text-base text-slate-600">
          Cette page est protégée et n’est accessible qu’avec un compte administrateur.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 text-sm font-semibold text-white">
            <Home size={16} />
            Revenir à l’accueil
          </Link>
          <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-red-200 hover:text-red-600">
            <ArrowLeft size={16} />
            Se reconnecter
          </Link>
        </div>
      </div>
    </div>
  )
}
