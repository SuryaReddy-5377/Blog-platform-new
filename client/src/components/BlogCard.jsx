import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img
        src={
          post.image && post.image !== ""
            ? post.image
            : "https://picsum.photos/600/400"
        }
        alt=""
        className="h-56 w-full object-cover"
      />

      <div className="p-6">

        <p className="text-sm text-blue-600 font-semibold">
          {post.author?.name}
        </p>

        <h2 className="text-2xl font-bold mt-2">
          {post.title}
        </h2>

        <p className="text-gray-500 mt-3 line-clamp-3">
          {post.content}
        </p>

        <Link
          to={`/post/${post._id}`}
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
        >
          Read More
        </Link>

      </div>

    </div>
  );
}