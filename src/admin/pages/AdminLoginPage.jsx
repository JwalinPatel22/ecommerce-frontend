import React, { useState, useContext } from "react";
import { AdminAuthContext } from "../AdminAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [adminEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdmin, setLoginStatus } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin/login", {
        adminEmail,
        password,
      });
      const token = response.data.token;
      const admin = jwtDecode(token);
      localStorage.setItem("token", token);
      setAdmin(admin);
      setLoginStatus(true);
      navigate("/admin/dashboard");
      toast.success("Login Successful", { autoClose: 500 });
    } catch (error) {
      console.log("Login Failed", error);
      toast.error("Login Failed", { autoClose: 500 });
    }
  };

  return (
    <div className="container m-auto max-w-2xl py-24">
      <div className="bg-white px-6 py-8 mb-4 shadow-xl rounded-2xl border m-4 md:m-0">
        <h2 className="text-3xl text-center font-semibold mb-6">Admin Login Page</h2>
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4 ">
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-md w-full py-2 px-3 mb-2 shadow-lg"
            />
          </div>
          <div className="mb-4 ">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded-md w-full py-2 px-3 mb-2 shadow-lg"
            />
          </div>
          <div className="mb-4 center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline shadow-lg"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
