import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminAuthProvider } from "./admin/AdminAuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AdminAuthProvider>
        <App />
      </AdminAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
