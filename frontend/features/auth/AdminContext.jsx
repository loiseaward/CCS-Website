import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminName, setAdminName] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';


  useEffect(() => { //runs due to remounting after google redirects back
    fetch(`${apiUrl}/api/me`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.isAdmin);
        setAdminEmail(data.adminEmail || null);
        setAdminName(data.adminName || null);
      })
      .catch(() => {
        setIsAdmin(false);
        setAdminEmail(null);
        setAdminName(null);
      });
  }, [apiUrl]);

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
    <AdminContext.Provider value={{ isAdmin, adminEmail, adminName, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
