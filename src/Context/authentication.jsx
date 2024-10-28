import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const authContext = createContext();

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    
  
  }, [])
  

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
