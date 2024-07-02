import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setLoginStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      const token = response.data.token;
      const user = jwtDecode(token);
      localStorage.setItem("token", token);
      setUser(user);
      setLoginStatus(true);
      navigate("/");
      toast.success("Login Successful", { autoClose: 500 });
    } catch (error) {
      console.log("Login Failed", error);
      toast.error("Login Failed", { autoClose: 500 });
      navigate("/register");
    }
  };

  return (
    <div className="container m-auto max-w-2xl py-24">
      <div className="bg-white px-6 py-8 mb-4 shadow-xl rounded-2xl border m-4 md:m-0">
        <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 ">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-md hover:rounded-full w-full py-2 px-3 mb-2 shadow-lg hover:shadow-xl"
              required
            />
          </div>
          <div className="mb-4 ">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded-md hover:rounded-full w-full py-2 px-3 mb-2 shadow-lg hover:shadow-xl"
              required
            />
          </div>
          <div className="mb-4 center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded hover:rounded-full w-full focus:outline-none focus:shadow-outline shadow-lg"
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
