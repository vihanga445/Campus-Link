import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tooltip, Badge, TextInput, Textarea } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { 
  BiBookmark, BiShareAlt, BiCalendar, BiMap, 
  BiEnvelope, BiGroup, BiLayer, BiPlus,
  BiLink, BiLogoFacebook, BiLogoTwitter, BiLogoWhatsapp, BiLogoLinkedin,
  BiLogoGoogle, BiLogoApple, BiWindows, BiCalendarPlus,
  BiGlobe, BiBuildings, BiDevices
} from 'react-icons/bi';
import CommentSection from '../components/CommentSection';
import { toast } from 'react-toastify';

export default function PostPage() {
    const { postSlug } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const shareMenuRef = useRef(null);
    const [showCalendarOptions, setShowCalendarOptions] = useState(false);
    const calendarMenuRef = useRef(null);
    const navigate = useNavigate();

    const [discussions, setDiscussions] = useState([]);
    const [newDiscussion, setNewDiscussion] = useState({ title: '', content: '' });
    const [newComment, setNewComment] = useState('');
    const [loadingDiscussions, setLoadingDiscussions] = useState(true);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
                setShowShareOptions(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarMenuRef.current && !calendarMenuRef.current.contains(event.target)) {
                setShowCalendarOptions(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShare = (e) => {
        e.preventDefault();
        setShowShareOptions(!showShareOptions);
    };

    const handleCalendar = (e) => {
        e.preventDefault();
        setShowCalendarOptions(!showCalendarOptions);
    };

    const shareUrl = window.location.href;
    const shareTitle = post?.title || 'Check out this event!';
    const shareText = `Check out this event: ${shareTitle}`;

    const shareViaLink = () => {
        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                toast.success('Link copied to clipboard!');
                setShowShareOptions(false);
            })
            .catch(() => toast.error('Failed to copy link'));
    };

    const shareViaFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        setShowShareOptions(false);
    };

    const shareViaTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
        setShowShareOptions(false);
    };

    const shareViaLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        setShowShareOptions(false);
    };

    const shareViaWhatsapp = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        setShowShareOptions(false);
    };

    const formatCalendarDateTime = () => {
        if (!post?.eventDetails?.date) return { start: '', end: '' };
        
        const eventDate = new Date(post.eventDetails.date);
        
        let startHour = 12, startMinute = 0, endHour = 13, endMinute = 0;
        
        if (post.eventDetails.time) {
            const [hours, minutes] = post.eventDetails.time.split(':').map(Number);
            startHour = hours;
            startMinute = minutes;
            endHour = hours + 1;
            endMinute = minutes;
        }
        
        const startDateTime = new Date(eventDate);
        startDateTime.setHours(startHour, startMinute, 0);
        
        const endDateTime = new Date(eventDate);
        endDateTime.setHours(endHour, endMinute, 0);
        
        const start = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
        const end = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');
        
        return { start, end, startDateTime, endDateTime };
    };

    const addToGoogleCalendar = () => {
        const { start, end } = formatCalendarDateTime();
        const eventTitle = encodeURIComponent(post.title);
        const eventDetails = encodeURIComponent(post.content.replace(/<[^>]*>?/gm, '').substring(0, 500));
        const eventLocation = encodeURIComponent(post.eventDetails.venue || '');
        
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${start}/${end}&details=${eventDetails}&location=${eventLocation}`;
        
        window.open(url, '_blank');
        setShowCalendarOptions(false);
    };

    const addToOutlookCalendar = () => {
        const { start, end } = formatCalendarDateTime();
        const eventTitle = encodeURIComponent(post.title);
        const eventDetails = encodeURIComponent(post.content.replace(/<[^>]*>?/gm, '').substring(0, 500));
        const eventLocation = encodeURIComponent(post.eventDetails.venue || '');
        
        const url = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${eventTitle}&startdt=${start}&enddt=${end}&body=${eventDetails}&location=${eventLocation}`;
        
        window.open(url, '_blank');
        setShowCalendarOptions(false);
    };

    const addToYahooCalendar = () => {
        const { startDateTime, endDateTime } = formatCalendarDateTime();
        const eventTitle = encodeURIComponent(post.title);
        const eventDetails = encodeURIComponent(post.content.replace(/<[^>]*>?/gm, '').substring(0, 500));
        const eventLocation = encodeURIComponent(post.eventDetails.venue || '');
        
        const yahooStart = startDateTime.toISOString().replace(/-|:|\.\d+/g, '');
        const yahooEnd = endDateTime.toISOString().replace(/-|:|\.\d+/g, '');
        
        const url = `https://calendar.yahoo.com/?v=60&title=${eventTitle}&st=${yahooStart}&et=${yahooEnd}&desc=${eventDetails}&in_loc=${eventLocation}`;
        
        window.open(url, '_blank');
        setShowCalendarOptions(false);
    };

    const addToAppleCalendar = () => {
        const { startDateTime, endDateTime } = formatCalendarDateTime();
        const eventTitle = post.title;
        const eventDetails = post.content.replace(/<[^>]*>?/gm, '').substring(0, 500);
        const eventLocation = post.eventDetails.venue || '';
        
        const formatDate = (date) => {
            return date.toISOString().replace(/-|:|\.\d+/g, '');
        };
        
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Campus Events//NONSGML v1.0//EN',
            'BEGIN:VEVENT',
            `DTSTART:${formatDate(startDateTime)}`,
            `DTEND:${formatDate(endDateTime)}`,
            `SUMMARY:${eventTitle}`,
            `DESCRIPTION:${eventDetails}`,
            `LOCATION:${eventLocation}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');
        
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${post.title.replace(/\s+/g, '_')}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('Calendar file downloaded successfully');
        setShowCalendarOptions(false);
    };

  
    
    

    if (loading) return <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;

    if (error) return <div className="text-red-500 text-center p-8">{error}</div>;

    return (
        <main className='min-h-screen bg-gray-50 py-8'>
            {post && (
                <div className='max-w-7xl mx-auto px-4'>
                    <h1 className='text-3xl font-bold text-gray-800 mb-6 font-[Poppins]'>
                        {post.title}
                    </h1>

                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='lg:w-7/12 space-y-6'>
                            {post.image && (
                                <div className='rounded-lg overflow-hidden shadow-md'>
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className='w-full h-64 object-cover'
                                    />
                                </div>
                            )}

                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Description</h2>
                                <div className='prose max-w-none' dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>

                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Comments</h2>
                                <CommentSection postId={post._id}/>
                            </div>
                        </div>

                        <div className='lg:w-5/12 space-y-6'>
                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Event Details</h2>
                                
                                <div className='space-y-3'>
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

                                    <div className='flex items-center'>
                                        <BiCalendar className='text-blue-500 mr-2' />
                                        <div>
                                            <span className='text-sm font-medium'>Date</span>
                                            <p className='text-gray-600'>{new Date(post.eventDetails.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center'>
                                        {post.eventDetails.eventMode === 'physical' ? (
                                            <BiBuildings className='text-blue-500 mr-2' />
                                        ) : post.eventDetails.eventMode === 'online' ? (
                                            <BiGlobe className='text-blue-500 mr-2' />
                                        ) : (
                                            <BiDevices className='text-blue-500 mr-2' />
                                        )}
                                        <div>
                                            <span className='text-sm font-medium'>Event Mode</span>
                                            <div className='flex items-center'>
                                                <p className='text-gray-600 capitalize'>{post.eventDetails.eventMode}</p>
                                                <Badge color={post.eventDetails.eventMode === 'physical' ? 'indigo' : post.eventDetails.eventMode === 'online' ? 'purple' : 'info'} 
                                                      className="ml-2">
                                                    {post.eventDetails.eventMode === 'physical' ? 'In-person' : 
                                                     post.eventDetails.eventMode === 'online' ? 'Virtual' : 'Both'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {(post.eventDetails.eventMode === 'physical' || post.eventDetails.eventMode === 'hybrid') && (
                                        <div className='flex items-center'>
                                            <BiMap className='text-blue-500 mr-2' />
                                            <div>
                                                <span className='text-sm font-medium'>Venue</span>
                                                <p className='text-gray-600'>{post.eventDetails.venue}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {(post.eventDetails.eventMode === 'online' || post.eventDetails.eventMode === 'hybrid') && 
                                     post.eventDetails.onlineLink && (
                                        <div className='flex items-center'>
                                            <BiGlobe className='text-blue-500 mr-2' />
                                            <div>
                                                <span className='text-sm font-medium'>Online Meeting</span>
                                                <p className='text-gray-600'>
                                                    <a 
                                                        href={post.eventDetails.onlineLink} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:underline inline-flex items-center"
                                                    >
                                                        Join Meeting <BiLink className="ml-1" />
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className='flex items-center'>
                                        <BiGroup className='text-blue-500 mr-2' />
                                        <div>
                                            <span className='text-sm font-medium'>Organizer</span>
                                            <p className='text-gray-600'>{post.eventDetails.organizer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <h2 className='text-xl font-semibold mb-4'>Actions</h2>
                                
                                <div className='flex flex-wrap gap-2'>
                                    <Button 
                                        size='sm'
                                        color={isSaved ? 'blue' : 'light'}
                                        onClick={handleSave}
                                        className='flex items-center'
                                    >
                                        <BiBookmark className={`mr-1 ${isSaved ? 'text-blue-500' : ''}`} />
                                        {isSaved ? 'Saved' : 'Save'}
                                    </Button>

                                    <div className="relative" ref={shareMenuRef}>
                                        <Button 
                                            size='sm' 
                                            color='light' 
                                            className='flex items-center'
                                            onClick={handleShare}
                                        >
                                            <BiShareAlt className='mr-1' /> Share
                                        </Button>
                                        
                                        {showShareOptions && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-100">
                                                <button 
                                                    onClick={shareViaLink}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLink className="mr-2 text-gray-500" /> Copy Link
                                                </button>
                                                <button 
                                                    onClick={shareViaFacebook}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLogoFacebook className="mr-2 text-blue-600" /> Facebook
                                                </button>
                                                <button 
                                                    onClick={shareViaTwitter}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLogoTwitter className="mr-2 text-blue-400" /> Twitter
                                                </button>
                                                <button 
                                                    onClick={shareViaLinkedin}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLogoLinkedin className="mr-2 text-blue-700" /> LinkedIn
                                                </button>
                                                <button 
                                                    onClick={shareViaWhatsapp}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLogoWhatsapp className="mr-2 text-green-500" /> WhatsApp
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative" ref={calendarMenuRef}>
                                        <Button 
                                            size='sm' 
                                            color='light' 
                                            className='flex items-center'
                                            onClick={handleCalendar}
                                        >
                                            <BiCalendar className='mr-1' /> Add to Calendar
                                        </Button>
                                        
                                        {showCalendarOptions && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-100">
                                                <button 
                                                    onClick={addToGoogleCalendar}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLogoGoogle className="mr-2 text-red-500" /> Google Calendar
                                                </button>
                                                <button 
                                                    onClick={addToOutlookCalendar}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiWindows className="mr-2 text-blue-500" /> Outlook Calendar
                                                </button>
                                                <button 
                                                    onClick={addToYahooCalendar}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiCalendarPlus className="mr-2 text-purple-500" /> Yahoo Calendar
                                                </button>
                                                <button 
                                                    onClick={addToAppleCalendar}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <BiLogoApple className="mr-2 text-gray-900" /> Download .ics File
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
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
