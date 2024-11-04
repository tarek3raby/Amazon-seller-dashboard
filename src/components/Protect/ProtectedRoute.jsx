import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { authContext } from '../../Context/authentication';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(authContext);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute; 