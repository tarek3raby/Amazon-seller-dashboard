import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../../Context/authentication';

export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useContext(authContext);

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
} 