import React from 'react'
import {Link} from 'react-router-dom';
import {FaCalendarAlt, FaMapMarkerAlt} from 'react-icons/fa';

export default function PostCard({post}) {
  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow'>

        {post.image && (
            <img src={post.image} alt={post.title} className='w-full h-48 object-cover' />

        )}
        <div className='p-4'>
            <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
            <div className='text-gray-600 space-y-2 mb-3'>
             <p className='flex items-center gap-2'>
              <FaCalendarAlt />
               {new Date(post.eventDetails.date).toLocaleDateString()}
            </p>
            <p className='flex items-center gap-2'>
              <FaMapMarkerAlt />
             {post.eventDetails.venue}
            </p>
            </div>
            <Link 
             to={`/post/${post.slug}`}
             className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
          View Details
        </Link>
        </div>
    </div>
  );
}
