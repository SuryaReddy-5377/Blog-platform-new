import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock, FaPenNib } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful 🎉");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex justify-center items-center p-6">

        <form
          onSubmit={loginUser}
          className="bg-white/90 backdrop-blur-xl w-full max-w-md rounded-3xl shadow-2xl p-10"
        >

          <div className="flex justify-center text-blue-600 text-5xl mb-5">
            <FaPenNib />
          </div>

          <h1 className="text-4xl font-bold text-center">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Login to continue blogging
          </p>

          <div className="mb-5">

            <label className="font-semibold">
              Email
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full p-4 outline-none"
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="mb-6">

            <label className="font-semibold">
              Password
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <FaLock className="text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full p-4 outline-none"
                onChange={handleChange}
              />

            </div>

          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:scale-105 duration-300"
          >
            Login
          </button>

          <p className="text-center mt-6">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2"
            >
              Register
            </Link>

          </p>

        </form>

      </div>
    </>
  );
}