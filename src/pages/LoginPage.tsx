import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

export default function LoginPage() {
  const [email, setEmail] = useState('sonia@example.com')
  const { login, showToast } = useAppContext()
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const user = login(email)
    if (user) {
      showToast('Connexion réussie')
      navigate('/')
    }
  }

  return (
    <div className="mx-auto max-w-lg pb-12">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-black text-slate-900">Connexion</h1>
        <p className="mt-2 text-slate-600">Accédez à vos commandes, favoris et profil.</p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <label className="block space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" placeholder="vous@exemple.com" />
          </label>

          <label className="block space-y-2 text-sm text-slate-600">
            <span>Mot de passe</span>
            <input type="password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-brand-500" placeholder="••••••••" />
          </label>

          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700">
            Se connecter <ArrowRight size={16} />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Pas encore inscrit ? <Link to="/register" className="font-semibold text-brand-700">Créer un compte</Link>
        </div>
      </div>
    </div>
  )
}
