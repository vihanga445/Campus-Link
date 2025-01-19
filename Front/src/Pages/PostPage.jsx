import React, { useEffect } from 'react';
import { Button, Spinner, Avatar } from 'flowbite-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaRegClock, FaRegCalendar, FaShare, FaBookmark, FaRegEnvelope, FaPhone, FaCalendarAlt } from 'react-icons/fa';

function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);   
    const [post, setPost] = useState(null);
    
    useEffect(() => {
        const fetchPost = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/Back/post/getposts?slug=${postSlug}`);
            const data = await res.json();
            if (!res.ok) {
              setError(true);
              setLoading(false);
              return;
            }
            if (res.ok) {
              setPost(data.posts[0]);
              setLoading(false);
              setError(false);
            }
          } catch (error) {
            setError(true);
            setLoading(false);
          }
        };
        fetchPost();
      }, [postSlug]);
    
    return (
        <main className='min-h-screen bg-gray-50 py-8'>
            {loading ? (
                <div className='flex justify-center items-center min-h-screen'>
                    <Spinner size='xl' />
                </div>
            ) : error ? (
                <div className='flex flex-col items-center justify-center min-h-screen'>
                    <p className='text-red-500 mb-4'>Error loading post</p>
                    <Link to='/' className='text-blue-500 hover:underline'>
                        Back to Home
                    </Link>
                </div>
            ) : (
                <div className='max-w-4xl mx-auto px-4'>
                    {/* Event Title and Image */}
                    <div className='mb-6'>
                        <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                            {post.title}
                        </h1>
                        {post.image && (
                            <div className='relative h-[400px] w-full mb-8 rounded-xl overflow-hidden shadow-lg'>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className='absolute inset-0 w-full h-full object-cover'
                                />
                            </div>
                        )}
                    </div>

                    {/* Event Details */}
                    <div className='bg-white rounded-xl p-8 shadow-sm mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Event Details</h2>
                        <div className='text-gray-800 leading-relaxed text-lg space-y-4'>
                            <p><strong>Type:</strong> {post.eventDetails.type}</p>
                            <p><strong>Date:</strong> {new Date(post.eventDetails.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {post.eventDetails.time}</p>
                            <p><strong>Venue:</strong> {post.eventDetails.venue}</p>
                            <p><strong>Organizer:</strong> {post.eventDetails.organizer}</p>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </div>

                    {/* Event Rules and Requirements */}
                    <div className='bg-white rounded-xl p-8 shadow-sm mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Event Rules and Requirements</h2>
                        <div className='text-gray-800 leading-relaxed text-lg space-y-4'>
                            <p><strong>Rules:</strong> {post.eventDetails.rules}</p>
                            <p><strong>Required Materials/Dress Code:</strong> {post.eventDetails.materials}</p>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className='bg-white rounded-xl p-8 shadow-sm mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Contact Information</h2>
                        <div className='text-gray-800 leading-relaxed text-lg space-y-4'>
                            <p><FaRegEnvelope className='inline-block mr-2' /> {post.eventDetails.contactEmail}</p>
                            <p><FaPhone className='inline-block mr-2' /> {post.eventDetails.contactPhone}</p>
                        </div>
                    </div>

                    {/* Event Reminders */}
                    <div className='bg-white rounded-xl p-8 shadow-sm mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Event Reminders</h2>
                        <div className='text-gray-800 leading-relaxed text-lg space-y-4'>
                            <p>Email/SMS reminders will be sent to registered participants.</p>
                        </div>
                    </div>

                 

                    {/* Registration */}
                    <div className='bg-white rounded-xl p-8 shadow-sm mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>Registration</h2>
                        <div className='text-gray-800 leading-relaxed text-lg space-y-4'>
                            <p><strong>RSVP:</strong> <Button gradientDuoTone='purpleToBlue' size='sm'>RSVP</Button></p>
                            <p><strong>Registration Link:</strong> <a href={post.eventDetails.registration.link} className='text-blue-500 hover:underline'>{post.eventDetails.registration.link}</a></p>
                            <p><strong>Registration Deadline:</strong> {new Date(post.eventDetails.registration.deadline).toLocaleDateString()}</p>
                            <p><strong>Max Participants:</strong> {post.eventDetails.maxParticipants}</p>
                            <p><strong>Current Participants:</strong> {post.eventDetails.currentParticipants}</p>
                        </div>
                    </div>



                      {/* User Interaction */}
                      <div className='bg-white rounded-xl p-8 shadow-sm mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>User Interaction</h2>
                        <div className='flex items-center gap-4'>
                            <Button gradientDuoTone='purpleToBlue' size='sm'>
                                <FaBookmark className='mr-2' /> Save/Bookmark
                            </Button>
                            <Button gradientDuoTone='purpleToBlue' size='sm'>
                                <FaShare className='mr-2' /> Share
                            </Button>
                            <Button gradientDuoTone='purpleToBlue' size='sm'>
                                <FaCalendarAlt className='mr-2' /> Add to Calendar
                            </Button>
                        </div>
                    </div>


                </div>
            )}
        </main>
    );
}

export default PostPage;