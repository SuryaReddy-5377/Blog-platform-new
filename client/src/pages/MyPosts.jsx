import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function MyPosts() {

  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {

    try {

      const res = await API.get("/posts");

      const myPosts = res.data.filter(
        (post) => post.author?._id === user?._id
      );

      setPosts(myPosts);

    } catch (error) {

      toast.error("Failed to load posts");

    }

  };

  const deletePost = async (id) => {

    if (!window.confirm("Delete this blog?")) return;

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Blog Deleted");

      fetchPosts();

    } catch (error) {

      toast.error("Delete Failed");

    }

  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-100 pt-28 pb-12 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h1 className="text-5xl font-bold">
                My Blogs
              </h1>

              <p className="text-gray-500 mt-2">
                Total Blogs : {posts.length}
              </p>

            </div>

            <Link
              to="/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              + New Blog
            </Link>

          </div>

          {
            posts.length === 0 ? (

              <div className="bg-white rounded-3xl p-16 text-center shadow">

                <h2 className="text-3xl font-bold">
                  No Blogs Yet 😔
                </h2>

                <p className="mt-4 text-gray-500">
                  Start writing your first blog.
                </p>

              </div>

            ) : (

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {posts.map((post) => (

                  <div
                    key={post._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
                  >

                    <img
                      src={
                        post.image
                          ? post.image
                          : "https://picsum.photos/600/400"
                      }
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-6">

                      <h2 className="text-2xl font-bold">
                        {post.title}
                      </h2>

                      <p className="text-gray-500 mt-3 line-clamp-3">
                        {post.content}
                      </p>

                      <div className="flex justify-between mt-8">

                        <Link
                          to={`/edit/${post._id}`}
                          className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deletePost(post._id)}
                          className="bg-red-600 text-white px-5 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )

          }

        </div>

      </div>
    </>
  );

}