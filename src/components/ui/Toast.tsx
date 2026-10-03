type ToastProps = {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg">
      {message}
    </div>
  )
}
