// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import VerifyUser from './verifyUser';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { status, error } = VerifyUser();

  useEffect(() => {
    if (status !== undefined) {
      setIsAuthenticated(status);
    }
  }, [status, error]);

  const updateAuthStatus = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
