import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { 
  BiBookmark, BiShareAlt, BiCalendar, BiMap, 
  BiEnvelope, BiPhone, BiGroup, BiLayer, BiPlus
} from 'react-icons/bi';
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;

    if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

    return (
        <main className='min-h-screen bg-gray-50 py-8'>
            {post && (
                <div className='max-w-7xl mx-auto px-4'>
                    {/* Title Bar */}
                    <h1 className='text-3xl font-bold text-gray-800 mb-6 font-[Poppins]'>
                        {post.title}
                    </h1>

                    {/* Main Content - Flexbox Layout */}
                    <div className='flex flex-col lg:flex-row gap-6'>
                        {/* Left Column - Main Content (60%) */}
                        <div className='lg:w-7/12 space-y-6'>
                            {/* Image */}
                            {post.image && (
                                <div className='rounded-lg overflow-hidden shadow-md'>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className='w-full h-64 object-cover'
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Description</h2>
                                <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            {/* Comments */}
                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Comments</h2>
                                <CommentSection postId={post._id}/>
                            </div>
                        </div>

                        {/* Right Column - Event Details & Actions (40%) */}
                        <div className='lg:w-5/12 space-y-6'>
                            {/* Event Details Card */}
                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Event Details</h2>
                                
                                <div className='space-y-3'>
                                    {/* Event Types */}
                                    <div className='flex items-start'>
                                        <BiLayer className='text-blue-500 mt-1 mr-2' />
                                        <div>
                                            <span className='text-sm font-medium'>Event Types</span>
                                            <div className='flex flex-wrap gap-2 mt-1'>
                                                {post.eventDetails.types.map((type) => (
                                                    <span key={type} className='bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full'>
                                                        {type}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className='flex items-center'>
                                        <BiCalendar className='text-blue-500 mr-2' />
                                        <div>
                                            <span className='text-sm font-medium'>Date</span>
                                            <p className='text-gray-600'>{new Date(post.eventDetails.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    {/* Venue */}
                                    <div className='flex items-center'>
                                        <BiMap className='text-blue-500 mr-2' />
                                        <div>
                                            <span className='text-sm font-medium'>Venue</span>
                                            <p className='text-gray-600'>{post.eventDetails.venue}</p>
                                        </div>
                                    </div>

                                    {/* Organizer */}
                                    <div className='flex items-center'>
                                        <BiGroup className='text-blue-500 mr-2' />
                                        <div>
                                            <span className='text-sm font-medium'>Organizer</span>
                                            <p className='text-gray-600'>{post.eventDetails.organizer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Actions Card */}
                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Actions</h2>
                                
                                <div className='flex flex-wrap gap-2'>
                                    <Button 
                                        size='sm'
                                        color={isSaved ? 'light' : 'dark'}
                                        onClick={handleSave}
                                        className='flex items-center'
                                    >
                                        <BiBookmark className={`mr-1 ${isSaved ? 'text-blue-500' : ''}`} />
                                        {isSaved ? 'Saved' : 'Save'}
                                    </Button>

                                    <Button size='sm' color='light' className='flex items-center'>
                                        <BiShareAlt className='mr-1' /> Share
                                    </Button>

                                    <Button size='sm' color='light' className='flex items-center'>
                                        <BiCalendar className='mr-1' /> Add to Calendar
                                    </Button>
                                </div>
                                
                                {/* Contact Organizer */}
                                {currentUser && currentUser._id !== post.userId && (
                                    <Button 
                                        gradientDuoTone='purpleToBlue' 
                                        size='sm' 
                                        onClick={handleContactOwner}
                                        className='mt-4 w-full'
                                    >
                                        <BiEnvelope className='mr-1' /> Contact Organizer
                                    </Button>
                                )}
                            </div>

                            {/* Registration Info Card (if available) */}
                            {post.eventDetails.registration && post.eventDetails.registration.link && (
                                <div className='bg-white rounded-lg p-6 shadow-sm'>
                                    <h2 className='text-xl font-semibold mb-4'>Registration</h2>
                                    <a 
                                        href={post.eventDetails.registration.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='text-blue-500 flex items-center hover:underline'
                                    >
                                        <BiPlus className='mr-1' /> Register for this event
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}