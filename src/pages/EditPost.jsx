import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function EditPost() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {

      const res = await API.get(`/posts/${id}`);

      setPost({
        title: res.data.title,
        content: res.data.content,
        image: res.data.image,
      });

    } catch (error) {
      toast.error("Unable to load post");
    }
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const updatePost = async (e) => {

    e.preventDefault();

    if (!post.title.trim())
      return toast.error("Title is required");

    if (!post.content.trim())
      return toast.error("Content is required");

    try {

      const token = localStorage.getItem("token");

      await API.put(`/posts/${id}`, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Blog Updated Successfully 🎉");

      setTimeout(() => {
        navigate("/myposts");
      }, 1200);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Update Failed"
      );

    }

  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-700 to-purple-700 flex justify-center items-center px-5 py-28">

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10">

          <h1 className="text-5xl font-bold text-center text-indigo-700">
            Edit Blog
          </h1>

          <p className="text-center text-gray-500 mt-3 mb-10">
            Update your article ✍️
          </p>

          <form onSubmit={updatePost}>

            <div className="mb-6">

              <label className="font-semibold block mb-2">
                Blog Title
              </label>

              <input
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div className="mb-6">

              <label className="font-semibold block mb-2">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={post.image}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div className="mb-8">

              <label className="font-semibold block mb-2">
                Blog Content
              </label>

              <textarea
                rows="10"
                name="content"
                value={post.content}
                onChange={handleChange}
                className="w-full border rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl text-xl font-bold hover:scale-105 transition"
            >
              💾 Update Blog
            </button>

          </form>

        </div>

      </div>
    </>
  );
}