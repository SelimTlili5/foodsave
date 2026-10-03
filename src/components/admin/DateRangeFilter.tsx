type Period = '7D' | '30D' | '90D'

type DateRangeFilterProps = {
  value: Period
  onChange: (period: Period) => void
}

const options: Period[] = ['7D', '30D', '90D']

export default function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-100 p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            value === option ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
