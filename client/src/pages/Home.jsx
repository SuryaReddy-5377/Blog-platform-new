import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import API from "../services/api";
import { FaArrowRight, FaPenNib, FaUsers, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Home() {
    const [posts, setPosts] = useState([]);

useEffect(() => {
    getPosts();
}, []);

const getPosts = async () => {
    try {
        const res = await API.get("/posts");
        setPosts(res.data);
    } catch (error) {
        console.log(error);
    }
};
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        {/* Hero Section */}
        <section className="pt-32 pb-24 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white">

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

            <div>

              <h1 className="text-6xl font-extrabold leading-tight">
                Share Your <span className="text-yellow-300">Stories</span>
                <br />
                Inspire Everyone
              </h1>

              <p className="mt-6 text-lg text-blue-100">
                Create beautiful blogs, connect with readers, and explore amazing
                stories from around the world.
              </p>

              <div className="flex gap-5 mt-8">

                <Link
                  to="/create"
                  className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 duration-300"
                >
                  Start Writing
                </Link>

                <Link
                  to="/register"
                  className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-700 duration-300"
                >
                  Join Now
                </Link>

              </div>

            </div>

            <div className="flex justify-center">

              <img
                src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900"
                className="rounded-3xl shadow-2xl h-[420px] object-cover"
              />

            </div>

          </div>

        </section>

        {/* Stats */}

        <section className="max-w-7xl mx-auto py-20 px-6">

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300">

              <FaBookOpen className="text-5xl mx-auto text-blue-600" />

              <h2 className="text-4xl font-bold mt-5">1000+</h2>

              <p className="text-gray-500 mt-2">Published Blogs</p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300">

              <FaUsers className="text-5xl mx-auto text-purple-600" />

              <h2 className="text-4xl font-bold mt-5">500+</h2>

              <p className="text-gray-500 mt-2">Active Writers</p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300">

              <FaPenNib className="text-5xl mx-auto text-pink-600" />

              <h2 className="text-4xl font-bold mt-5">20K+</h2>

              <p className="text-gray-500 mt-2">Readers Monthly</p>

            </div>

          </div>

        </section>

        {/* Featured Blogs */}

        <section className="max-w-7xl mx-auto px-6 pb-24">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-bold">
              Featured Blogs
            </h2>

            <button className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 duration-300">
              View All <FaArrowRight />
            </button>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

          {posts.map((post) => (
  <BlogCard
    key={post._id}
    post={post}
  />
))}

          </div>

        </section>

        {/* Footer */}

        <footer className="bg-slate-900 text-white py-10">

          <div className="max-w-7xl mx-auto text-center">

            <h2 className="text-3xl font-bold">
              BlogSphere
            </h2>

            <p className="text-gray-400 mt-3">
              Write • Read • Inspire
            </p>

            <p className="mt-8 text-gray-500">
              © 2026 BlogSphere. All Rights Reserved.
            </p>

          </div>

        </footer>

      </div>
    </>
  );
}