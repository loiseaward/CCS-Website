import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('name@nd.edu');
  const [adminName, setAdminName] = useState('First Last_Name');

  //have to come up with a way to handle logins from google and maintain sessions
  // Maintain session on page refresh

  useEffect(() => {
    //update from the backend after making a post request from login
    //fetch from an authentication checkpoint on backend and update on remount?
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
    //send a post request to /logout which will logout using passport
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
