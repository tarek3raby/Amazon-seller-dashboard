import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const authContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const locToken = localStorage.getItem('sellerToken');
    setToken(locToken);
    setIsLoading(false);
  }, []);

  return (
    <authContext.Provider value={{ token, setToken, isLoading }}>
      {children}
    </authContext.Provider>
  );
}