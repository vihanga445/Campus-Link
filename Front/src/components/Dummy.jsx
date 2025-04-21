import React, { useRef, useState, useEffect } from "react";
import parse from "html-react-parser";
import PostCard from "./PostCard";

function Dummy() {
  const carouselRef = useRef(null);
  const [userPosts, setUserPosts] = useState([]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust the scroll distance
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust the scroll distance
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/Back/post/getposts`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
        }
      } catch (error) {
        console.log("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative my-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold">Events</h2>
        <Link to="/events">
          <button className="bg-blue-800 text-white py-2 px-4 rounded-lg shadow-lg transition ml-auto mr-10">
            All Events
          </button>
        </Link>
      </div>

      {/* Carousel Section */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
          onClick={scrollLeft}
        >
          &#8249;
        </button>

        {/* Carousel Container */}
        <div className="relative w-full px-4 py-6" ref={carouselRef}>
          <div
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth no-scrollbar"
            ref={carouselRef}
            style={{
              scrollbarWidth: "none",
              "-ms-overflow-style": "none",
            }}
          >
            {userPosts && userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post._id} className="flex-none w-[300px]">
                  <PostCard key={post._id} post={post} />
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500">No posts available.</div>
            )}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
          onClick={scrollRight}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}

export default Dummy;
