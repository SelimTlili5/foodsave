import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: string
  trend: string
  icon: LucideIcon
  accent: 'red' | 'orange' | 'yellow'
}

const accentClasses: Record<StatCardProps['accent'], string> = {
  red: 'from-red-500/12 to-red-500/5 text-red-600',
  orange: 'from-orange-500/12 to-orange-500/5 text-orange-600',
  yellow: 'from-yellow-400/20 to-yellow-400/5 text-yellow-600',
}

export default function StatCard({ label, value, trend, icon: Icon, accent }: StatCardProps) {
  return (
    <div className="admin-panel p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">{label}</span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br ${accentClasses[accent]}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight text-slate-900">{value}</div>
      <div className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{trend}</div>
    </div>
  )
}
