import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaLock, FaUser, FaPenNib } from "react-icons/fa";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!formData.name.trim())
      return toast.error("Name is required");

    if (!formData.email.trim())
      return toast.error("Email is required");

    if (!formData.password.trim())
      return toast.error("Password is required");

    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {

      await API.post("/auth/register", formData);

      toast.success("Registration Successful 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

    }
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 flex justify-center items-center p-6">

        <form
          onSubmit={registerUser}
          className="bg-white/90 rounded-3xl shadow-2xl w-full max-w-md p-10"
        >

          <div className="flex justify-center text-5xl text-indigo-600 mb-5">
            <FaPenNib />
          </div>

          <h1 className="text-4xl font-bold text-center">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2 mb-8">
            Join BlogSphere Today
          </p>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 mb-6"
          />

          <button
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold"
          >
            Register
          </button>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 ml-2 font-semibold"
            >
              Login
            </Link>

          </p>

        </form>

      </div>
    </>
  );
}