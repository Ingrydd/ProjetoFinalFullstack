import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { autenticado } = useAuth();

  if (!autenticado) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
