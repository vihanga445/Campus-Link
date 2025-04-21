import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import NoDataImage from "../No data.png"; // Import the No data.png image

export default function RejectedPosts() {
  const [rejectedPosts, setRejectedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRejectedPosts = async () => {
      try {
        const res = await fetch("/Back/post/rejected-posts", {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        const data = await res.json();
        setRejectedPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRejectedPosts();
  }, [currentUser]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-3 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Rejected Posts
      </h1>
      {rejectedPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rejectedPosts.map((post) => (
            <div key={post._id} className="border rounded-lg p-4 bg-red-50">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg my-2"
                />
              )}
              <div className="mt-4 p-3 bg-red-100 rounded-lg">
                <p className="font-semibold text-red-600">Rejection Reason:</p>
                <p className="text-red-700">
                  {parse(post.moderationDetails.rejectionReason)}
                </p>
              </div>
              <button
                onClick={() => navigate(`/edit-post/${post._id}`)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Post
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96 bg-gray-100 dark:bg-gray-800 rounded-lg ">
          <img
            src={NoDataImage}
            alt="No Data"
            className="w-40 h-40 object-contain mb-4"
          />
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            You have no rejected posts at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
