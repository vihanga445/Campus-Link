

import React, { useRef, useState, useEffect } from 'react';


function Dummy() {
  const carouselRef = useRef(null);
  const [userPosts, setUserPosts] = useState([]);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust the scroll distance
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust the scroll distance
      behavior: 'smooth',
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
        console.log('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative my-12">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold">Dummy Posts</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 opacity-70 transition ml-auto mr-10">
          All Dummy Posts
        </button>
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
        <div
          className="flex overflow-x-auto space-x-6 scrollbar-hide"
          ref={carouselRef}
        >
          {userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div
                key={post._id}
                className="w-full flex-shrink-0 p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white shadow-xl rounded-lg"
                style={{ width: '300px' }}
              >
                {/* Post Image */}
                <div
                  className="h-40 bg-cover bg-center rounded-t-lg"
                  style={{
                    backgroundImage: `url(${post.image || 'https://via.placeholder.com/300'})`,
                  }}
                ></div>

                {/* Post Details */}
                <div className="p-4">
                  {/* Category Badge */}
                  <span
                    className={`inline-block px-2 py-1 text-sm rounded-full ${
                      post.category === 'Lost and Found'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {post.category || 'Uncategorized'}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-bold mt-2">{post.title}</h3>

                  {/* Content */}
                  <p className="text-sm mt-2 text-gray-700 line-clamp-3">
                    {post.content || 'No description available.'}
                  </p>

                  {/* Created Date */}
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>

                  {/* View Details Link */}
                  <div className="mt-4">
                    <a
                      href={`/post/${post.slug}`}
                      className="text-blue-500 text-sm font-medium hover:underline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No posts available.</div>
          )}
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
