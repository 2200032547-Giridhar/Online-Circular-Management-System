import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // To track if auth state is checked

  // Load token and user info from localStorage on mount, and verify token expiry
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const { exp } = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (exp > currentTime) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired - clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        // Invalid token - clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setAuthChecked(true); // Done checking auth state
  }, []);

  // Logout function clears state, localStorage and redirects to login
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  // Check token expiration whenever token changes
  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          logout();
        }
      } catch (err) {
        logout();
      }
    }
  }, [token, logout]);

  // Login function to save user data and token
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Show loading until auth state is checked to prevent flicker or premature redirects
  if (!authChecked) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
