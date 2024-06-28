import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { admin } = useContext(AdminAuthContext);

  if (!admin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AdminProtectedRoute;
