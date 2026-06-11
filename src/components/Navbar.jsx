import { Link, useNavigate } from "react-router-dom";
import { FaPenNib, FaUserCircle } from "react-icons/fa";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-bold text-blue-600"
        >
          <FaPenNib />
          BlogSphere
        </Link>

        {token && (
          <div className="hidden md:flex gap-8 font-medium">

            <Link
              to="/"
              className="hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/create"
              className="hover:text-blue-600"
            >
              Create
            </Link>

            <Link
              to="/myposts"
              className="hover:text-blue-600"
            >
              My Blogs
            </Link>

          </div>
        )}

        {!token ? (

          <div className="flex gap-3">

            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-5 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
            >
              Register
            </Link>

          </div>

        ) : (

          <div className="flex items-center gap-5">

            <div className="flex items-center gap-2">

              <FaUserCircle className="text-3xl text-blue-600" />

              <div>

                <p className="font-semibold">
                  {user?.name}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
            >
              Logout
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}