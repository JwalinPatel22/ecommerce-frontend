import React, { createContext, useState } from "react";

const AdminAuthContext = createContext();

const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <AdminAuthContext.Provider
      value={{ admin, loginStatus, setAdmin, setLoginStatus }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export { AdminAuthContext, AdminAuthProvider };
