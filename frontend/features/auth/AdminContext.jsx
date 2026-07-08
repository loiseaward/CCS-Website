import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminName, setAdminName] = useState(null);

  //have to come up with a way to handle logins from google and maintain sessions
  // Maintain session on page refresh

  useEffect(() => {
    const savedAdmin = localStorage.getItem('isAdmin');
    const savedEmail = localStorage.getItem('adminEmail');
    const savedName = localStorage.getItem('adminName');

    if (savedAdmin === 'true') {
      setIsAdmin(true);
      setAdminEmail(savedEmail);
      setAdminName(savedName);
    }
  }, []);

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminEmail(null);
    setAdminName(null);
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminEmail, adminName, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
