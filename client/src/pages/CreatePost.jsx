import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title.trim()) {
      return toast.error("Title is required");
    }

    if (!post.content.trim()) {
      return toast.error("Content is required");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      await API.post("/posts", post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🎉 Blog Published Successfully!");

      setPost({
        title: "",
        content: "",
        image: "",
      });

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to publish blog"
      );
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 flex items-center justify-center px-5 py-28">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10">

          <h1 className="text-5xl font-bold text-center text-blue-700">
            Create Blog
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-10">
            Share your ideas with the world 🚀
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Enter Blog Title"
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="mb-6">

              <label className="block font-semibold mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={post.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <div className="mb-8">

              <label className="block font-semibold mb-2">
                Blog Content
              </label>

              <textarea
                rows="10"
                name="content"
                value={post.content}
                onChange={handleChange}
                placeholder="Write your blog here..."
                className="w-full border rounded-xl p-4 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl text-xl font-semibold hover:scale-105 transition duration-300"
            >
              🚀 Publish Blog
            </button>

          </form>

        </div>

      </div>
    </>
  );
}