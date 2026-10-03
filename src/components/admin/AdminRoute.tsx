import { Navigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import UnauthorizedPage from '../../pages/UnauthorizedPage'

export default function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (user.role !== 'admin') {
    return <UnauthorizedPage />
  }

  return <>{children}</>
}
