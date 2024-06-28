import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setLoginStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
      });
      const token = response.data.token;
      const user = jwtDecode(token).name;
      localStorage.setItem("token", token);
      console.log(token);
      setUser(user);
      navigate("/");
      toast.success("Register Successful", { autoClose: 500 });
    } catch (error) {
      console.log("Register Failed", error);
      toast.error("Register Failed", { autoClose: 500 });
    }
  };

  return (
    <div className="container m-auto max-w-2xl py-24">
      <div className="bg-white px-6 py-8 mb-4 shadow-xl rounded-2xl border m-4 md:m-0">
        <h2 className="text-3xl text-center font-semibold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4 ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border rounded-md w-full py-2 px-3 mb-2 shadow-lg"
              required
            />
          </div>
          <div className="mb-4 ">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-md w-full py-2 px-3 mb-2 shadow-lg"
              required
            />
          </div>
          <div className="mb-4 ">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border rounded-md w-full py-2 px-3 mb-2 shadow-lg"
              required
            />
          </div>
          <div className="mb-4 center">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline shadow-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
