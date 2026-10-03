type BadgeProps = {
  children: React.ReactNode
  tone?: 'green' | 'amber' | 'slate' | 'red'
}

export default function Badge({ children, tone = 'green' }: BadgeProps) {
  const styles = {
    green: 'bg-brand-50 text-brand-700 ring-brand-200',
    amber: 'bg-amber-50 text-amber-700 ring-amber-200',
    slate: 'bg-slate-100 text-slate-700 ring-slate-200',
    red: 'bg-red-50 text-red-700 ring-red-200',
  }

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles[tone]}`}>{children}</span>
}
