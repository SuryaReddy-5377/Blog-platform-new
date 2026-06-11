import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import toast, { Toaster } from "react-hot-toast";

export default function BlogDetails() {

  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      toast.error("Failed to load blog");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {

    if (!comment.trim())
      return toast.error("Enter a comment");

    try {

      await API.post(
        `/comments/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Comment Added");

      setComment("");

      fetchComments();

    } catch (error) {

      toast.error("Failed to add comment");

    }

  };

  const deleteComment = async (commentId) => {

    try {

      await API.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Comment Deleted");

      fetchComments();

    } catch (error) {

      toast.error("Delete Failed");

    }

  };

  if (!post)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      <div className="min-h-screen bg-slate-100 pt-28 pb-16">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

          <img
            src={
              post.image
                ? post.image
                : "https://picsum.photos/1200/600"
            }
            className="w-full h-[450px] object-cover"
          />

          <div className="p-10">

            <p className="text-blue-600 font-semibold">
              {post.author?.name}
            </p>

            <h1 className="text-5xl font-bold mt-4">
              {post.title}
            </h1>

            <p className="text-gray-500 mt-4">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>

            <p className="mt-8 text-lg leading-9 whitespace-pre-wrap">
              {post.content}
            </p>

            <Link
              to="/"
              className="inline-block mt-10 bg-blue-600 text-white px-8 py-3 rounded-xl"
            >
              ← Back
            </Link>

          </div>

        </div>

        {/* COMMENTS */}

        <div className="max-w-5xl mx-auto mt-10 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Comments ({comments.length})
          </h2>

          {token && (

            <>

              <textarea
                rows="4"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full border rounded-xl p-4 outline-none"
              />

              <button
                onClick={addComment}
                className="mt-5 bg-blue-600 text-white px-8 py-3 rounded-xl"
              >
                Add Comment
              </button>

            </>

          )}

          {!token && (

            <p className="text-gray-500">
              Login to add comments.
            </p>

          )}

          <div className="mt-10 space-y-6">

            {comments.map((item)=>(

              <div
                key={item._id}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold">
                      {item.user?.name}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {item.comment}
                    </p>

                  </div>

                  {user && item.user?._id===user._id && (

                    <button
                      onClick={()=>deleteComment(item._id)}
                      className="text-red-600 font-semibold"
                    >
                      Delete
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </>
  );
}