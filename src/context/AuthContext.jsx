import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const register = async (fname, lname, email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        fname,
        lname,
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log("Registeration failed", error);
    }
  };

  //checking if the user is authenticated at the inial loading of page
//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         try {
//           const response = await axios.get("http://localhost:3000/api/user", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data.user);
//         } catch (error) {
//           console.log("Authentication Failed", error);
//           logout();
//         }
//       }
//       setLoading(false);
//     };
//     checkAuth();
//   }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
