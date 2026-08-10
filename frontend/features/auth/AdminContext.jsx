import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminName, setAdminName] = useState(null);
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';


  const refreshAdmin = useCallback(async () => {
    setIsCheckingAdmin(true);

    try {
      const res = await fetch(`${apiUrl}/api/me`, { credentials: 'include' });
      const data = await res.json();

      setIsAdmin(Boolean(data.isAdmin));
      setAdminEmail(data.adminEmail || null);
      setAdminName(data.adminName || null);
    } catch {
      setIsAdmin(false);
      setAdminEmail(null);
      setAdminName(null);
    } finally {
      setIsCheckingAdmin(false);
    }
  }, [apiUrl]);

  useEffect(() => { //re-checks admin status after login redirects and every page change
    refreshAdmin();
  }, [location.pathname, refreshAdmin]);

  const logoutAdmin = () => {
    //send a post request to /logout which will logout using passport
    fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .catch((err) => {
        console.error('Logout failed:', err);
      })
      .finally(() => {
        setIsAdmin(false);
        setAdminEmail(null);
        setAdminName(null);
        window.location.assign('/');
      });
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminEmail, adminName, isCheckingAdmin, refreshAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
