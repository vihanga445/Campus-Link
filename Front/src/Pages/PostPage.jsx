import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { FaBookmark, FaShare, FaCalendarAlt, FaMapMarkerAlt, 
         FaRegEnvelope, FaPhone, FaUserFriends, FaLayerGroup } from 'react-icons/fa';
import CommentSection from '../components/CommentSection';

export default function PostPage() {
    const { postSlug } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

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
      useEffect(() => {
        const checkIfSaved = async () => {
            
          try {
            const res = await fetch(`/Back/post/saved-posts`);
            const data = await res.json();
            setIsSaved(data.some(savedPost => savedPost._id === post._id));
          } catch (error) {
            console.log(error);
          }
        };
        if (currentUser) {
          checkIfSaved();
        }
      }, [post, currentUser]);
      const handleSave = async () => {
        if (!currentUser) {
          navigate('/sign-in');
          return;
        }
        try {
          const method = isSaved ? 'DELETE' : 'POST';
          const res = await fetch(`/Back/post/save/${post._id}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: currentUser._id }),
          });
          if (res.ok) {
            setIsSaved(!isSaved);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const handleContactOwner = async () => {
        try {
            const res = await fetch('/Back/message/initiate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiverId: post.userId,
                    postId: post._id,
                }),
            });
            const data = await res.json();
            navigate(`/dashboard/chat/${data._id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>;

    if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

    return (
        <main className='min-h-screen bg-gray-50'>
            {post && (
                <div className='max-w-6xl mx-auto p-4'>
                    {/* Hero Section */}
                    <div className='relative h-[400px] rounded-2xl overflow-hidden shadow-xl mb-8'>
                        {post.image && (
                            <img
                                src={post.image}
                                alt={post.title}
                                className='w-full h-full object-cover'
                            />
                        )}
                        <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent'></div>
                        <div className='absolute bottom-0 p-8'>
                            <h1 className='text-4xl font-bold text-white mb-4 font-[Poppins]'>
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    {/* Event Details Card */}
                    <div className='bg-white rounded-2xl p-8 shadow-lg mb-8 hover:shadow-xl transition-shadow'>
                        <h2 className='text-3xl font-bold mb-6 text-gray-800 font-[Poppins]'>Event Details</h2>
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className='space-y-4'>
                                {/* Add Event Types */}
                                <div className='flex items-start text-lg'>
                                    <FaLayerGroup className='mr-3 text-blue-500 mt-1' />
                                    <div>
                                        <span className='font-medium'>Event Types:</span>
                                        <div className='flex flex-wrap gap-2 mt-2'>
                                            {post.eventDetails.types.map((type) => (
                                                <span
                                                    key={type}
                                                    className='bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full'
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Existing event details */}
                                <p className='flex items-center text-lg'>
                                    <FaCalendarAlt className='mr-3 text-blue-500' />
                                    <span className='font-medium'>Date:</span>
                                    <span className='ml-2'>{new Date(post.eventDetails.date).toLocaleDateString()}</span>
                                </p>
                                <p className='flex items-center text-lg'>
                                    <FaMapMarkerAlt className='mr-3 text-blue-500' />
                                    <span className='font-medium'>Venue:</span>
                                    <span className='ml-2'>{post.eventDetails.venue}</span>
                                </p>
                                <p className='flex items-center text-lg'>
                                    <FaUserFriends className='mr-3 text-blue-500' />
                                    <span className='font-medium'>Organizer:</span>
                                    <span className='ml-2'>{post.eventDetails.organizer}</span>
                                </p>
                                
                            </div>
                            
                        </div>
                    </div>

                    {/* Description */}

                    <div className='bg-white rounded-2xl p-8 shadow-lg mb-8 hover:shadow-xl transition-shadow'>
                      
                    <div className='space-y-4'>
                        <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    </div>


                    {/* Registration */}
                    <div className='bg-white rounded-2xl p-8 shadow-lg mb-8 hover:shadow-xl transition-shadow'>
                        <h2 className='text-3xl font-bold mb-6 text-gray-800 font-[Poppins]'>Registration</h2>
                        <div className='space-y-6'>
                            <div className='flex flex-wrap gap-4 items-center'>
                                
                                <a href={post.eventDetails.registration.link} 
                                   className='text-blue-500 hover:underline'>
                                    Registration Link
                                </a>
                            </div>
                            <div className='space-y-2'>
                                <p className='text-lg'>
                                    <span className='font-medium'>Deadline:</span>
                                    <span className='ml-2'>
                                        {new Date(post.eventDetails.registration.deadline).toLocaleDateString()}
                                    </span>
                                </p>
                                <div>
                                    <div className='flex justify-between mb-1'>
                                        <span className='font-medium'>Participants</span>
                                        <span>{post.eventDetails.currentParticipants}/{post.eventDetails.maxParticipants}</span>
                                    </div>
                                    <div className='w-full bg-gray-200 rounded-full h-2.5'>
                                        <div className='bg-blue-500 h-2.5 rounded-full' 
                                             style={{width: `${(post.eventDetails.currentParticipants/post.eventDetails.maxParticipants)*100}%`}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Interaction */}
                    <div className='bg-white rounded-2xl p-8 shadow-lg mb-8 hover:shadow-xl transition-shadow'>
                        <h2 className='text-3xl font-bold mb-6 text-gray-800 font-[Poppins]'>User Interaction</h2>
                        <div className='flex flex-wrap gap-4'>
                            <Button gradientDuoTone='purpleToBlue' size='lg' onClick={handleSave}>
                                <FaBookmark className={`mr-2 ${isSaved ? 'text-yellow-500' : ''}`} />
                                {isSaved ? 'Unsave' : 'Save'}
                            </Button>
                            <Button gradientDuoTone='purpleToBlue' size='lg'>
                                <FaShare className='mr-2' /> Share
                            </Button>
                            <Button gradientDuoTone='purpleToBlue' size='lg'>
                                <FaCalendarAlt className='mr-2' /> Add to Calendar
                            </Button>
                        </div>
                    </div>
                    
                    
                    <div className='bg-white rounded-2xl p-8 shadow-lg mb-8 hover:shadow-xl transition-shadow'>
 
                         {currentUser &&  currentUser._id !== post.userId && (
                         <Button gradientDuoTone='purpleToBlue' size='lg' onClick={handleContactOwner}>
                            Contact organizers
                         </Button>


                         )}
                    

                    </div>

                    <div className='bg-white rounded-2xl p-8 shadow-lg mb-8 hover:shadow-xl transition-shadow'>


                    <CommentSection postId={post._id}/>


                    </div>



                </div>

            
                
            )}


            
        
        </main>
    );
}