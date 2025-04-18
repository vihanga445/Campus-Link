import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiCheck, HiX, HiDownload, HiDocument, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock, HiOutlineUser, HiOutlineGlobe, HiOutlineOfficeBuilding } from 'react-icons/hi';
import parse from 'html-react-parser';
import { Button, Badge, Spinner, Tabs } from 'flowbite-react';

export default function PendingPosts() {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const [documentLoading, setDocumentLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchPendingPosts = async () => {
            try {
                const res = await fetch('/Back/post/pending-posts', {
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`
                    }
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setPendingPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPendingPosts();
    }, [currentUser]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setActiveTab('details');
    };

    const handleModeration = async (postId, status) => {
        try {
            const res = await fetch(`/Back/post/moderate/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
                body: JSON.stringify({ 
                    status, 
                    rejectionReason: status === 'rejected' ? rejectionReason : '' 
                })
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message);
            }
            setPendingPosts(pendingPosts.filter(post => post._id !== postId));
            setSelectedPost(null);
            setShowRejectModal(false);
            setRejectionReason('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDocumentDownload = async (documentUrl) => {
        try {
            setDocumentLoading(true);
            window.open(documentUrl, '_blank');
        } catch (error) {
            setError("Failed to download document: " + error.message);
        } finally {
            setDocumentLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not specified';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Spinner size="xl" />
        </div>
    );

    if (error) return (
        <div className="text-red-500 p-4 border border-red-200 rounded-lg bg-red-50">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
        </div>
    );

    return (
        <div className="p-3 max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Pending Posts for {currentUser.moderatorRole.category}
            </h1>
            
            {pendingPosts.length === 0 ? (
                <div className="text-center p-10 bg-gray-50 rounded-lg">
                    <HiCheck className="mx-auto text-green-500 text-4xl mb-4" />
                    <p className="text-gray-600">No pending posts to review!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingPosts.map(post => (
                        <div key={post._id} 
                             onClick={() => handlePostClick(post)}
                             className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                            {post.image && (
                                <div className="relative h-48 overflow-hidden">
                                    <img 
                                        src={post.image} 
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                    />
                                    <Badge color="warning" className="absolute top-3 right-3">
                                        Pending Review
                                    </Badge>
                                </div>
                            )}
                            
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{post.title}</h3>
                                
                                {post.eventDetails && (
                                    <div className="flex flex-col space-y-2 mb-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <HiOutlineCalendar className="mr-2 text-blue-600" />
                                            {formatDate(post.eventDetails.date)}
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-600">
                                            {post.eventDetails.eventMode === 'physical' ? (
                                                <>
                                                    <HiOutlineLocationMarker className="mr-2 text-blue-600" />
                                                    {post.eventDetails.venue || 'No venue specified'}
                                                </>
                                            ) : post.eventDetails.eventMode === 'online' ? (
                                                <>
                                                    <HiOutlineGlobe className="mr-2 text-blue-600" />
                                                    Online Event
                                                </>
                                            ) : (
                                                <>
                                                    <HiOutlineGlobe className="mr-2 text-blue-600" />
                                                    Hybrid Event
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                                
                                <div className="line-clamp-2 text-gray-700 text-sm mb-4">
                                    {parse(post.content)}
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge color="blue">{post.category}</Badge>
                                    {post.eventDetails && post.eventDetails.types && 
                                        post.eventDetails.types.slice(0, 2).map(type => (
                                            <Badge key={type} color="purple" className="text-xs">
                                                {type}
                                            </Badge>
                                        ))
                                    }
                                    {post.eventDetails && post.eventDetails.types && post.eventDetails.types.length > 2 && (
                                        <Badge color="gray" className="text-xs">
                                            +{post.eventDetails.types.length - 2}
                                        </Badge>
                                    )}
                                </div>
                                
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <span>Submitted: {new Date(post.createdAt).toLocaleDateString()}</span>
                                    <Button size="xs" gradientDuoTone="purpleToBlue">
                                        Review
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="border-b px-6 py-4 flex items-center justify-between">
                            <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
                            <button onClick={() => setSelectedPost(null)} className="text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="border-b">
                            <Tabs aria-label="Post review tabs">
                                <Tabs.Item active={activeTab === 'details'} title="Event Details" 
                                    onClick={() => setActiveTab('details')}>
                                    <div className="p-6">
                                        <div className="mb-6">
                                            {selectedPost.image && (
                                                <img 
                                                    src={selectedPost.image} 
                                                    alt={selectedPost.title}
                                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                                />
                                            )}
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {selectedPost.eventDetails && (
                                                    <>
                                                        <div className="flex gap-2">
                                                            <HiOutlineCalendar className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                            <div>
                                                                <p className="font-medium text-gray-700">Event Date</p>
                                                                <p>{formatDate(selectedPost.eventDetails.date)}</p>
                                                                {selectedPost.eventDetails.time && (
                                                                    <p className="text-gray-600">{selectedPost.eventDetails.time}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="flex gap-2">
                                                            {selectedPost.eventDetails.eventMode === 'physical' ? (
                                                                <HiOutlineOfficeBuilding className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                            ) : selectedPost.eventDetails.eventMode === 'online' ? (
                                                                <HiOutlineGlobe className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                            ) : (
                                                                <HiOutlineGlobe className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                            )}
                                                            <div>
                                                                <p className="font-medium text-gray-700">Event Mode</p>
                                                                <p className="capitalize">{selectedPost.eventDetails.eventMode || 'Not specified'}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {(selectedPost.eventDetails.eventMode === 'physical' || selectedPost.eventDetails.eventMode === 'hybrid') && (
                                                            <div className="flex gap-2">
                                                                <HiOutlineLocationMarker className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                                <div>
                                                                    <p className="font-medium text-gray-700">Venue</p>
                                                                    <p>{selectedPost.eventDetails.venue || 'Not specified'}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        {(selectedPost.eventDetails.eventMode === 'online' || selectedPost.eventDetails.eventMode === 'hybrid') && (
                                                            <div className="flex gap-2">
                                                                <HiOutlineGlobe className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                                <div>
                                                                    <p className="font-medium text-gray-700">Online Link</p>
                                                                    {selectedPost.eventDetails.onlineLink ? (
                                                                        <a 
                                                                            href={selectedPost.eventDetails.onlineLink} 
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-600 hover:underline"
                                                                        >
                                                                            {selectedPost.eventDetails.onlineLink}
                                                                        </a>
                                                                    ) : (
                                                                        <p>Not provided</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        <div className="flex gap-2">
                                                            <HiOutlineUser className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                            <div>
                                                                <p className="font-medium text-gray-700">Organizer</p>
                                                                <p>{selectedPost.eventDetails.organizer || 'Not specified'}</p>
                                                            </div>
                                                        </div>
                                                        
                                                        {selectedPost.eventDetails.types && selectedPost.eventDetails.types.length > 0 && (
                                                            <div className="flex gap-2 col-span-1 md:col-span-2">
                                                                <HiDocument className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                                <div>
                                                                    <p className="font-medium text-gray-700">Event Types</p>
                                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                                        {selectedPost.eventDetails.types.map(type => (
                                                                            <Badge key={type} color="info" className="text-xs">
                                                                                {type}
                                                                            </Badge>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        
                                                        {selectedPost.eventDetails.payment && selectedPost.eventDetails.payment.required && (
                                                            <div className="flex gap-2 col-span-1 md:col-span-2">
                                                                <HiDocument className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                                                                <div>
                                                                    <p className="font-medium text-gray-700">Payment Details</p>
                                                                    <p>Price: {selectedPost.eventDetails.payment.currency} {selectedPost.eventDetails.payment.price}</p>
                                                                    <p>Gateway: {selectedPost.eventDetails.payment.gateway}</p>
                                                                    {selectedPost.eventDetails.payment.description && (
                                                                        <p>Description: {selectedPost.eventDetails.payment.description}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Tabs.Item>
                                
                                <Tabs.Item active={activeTab === 'content'} title="Content" 
                                    onClick={() => setActiveTab('content')}>
                                    <div className="p-6">
                                        <div className="prose max-w-none">
                                            {parse(selectedPost.content)}
                                        </div>
                                    </div>
                                </Tabs.Item>
                                
                                <Tabs.Item active={activeTab === 'document'} title="Approval Document" 
                                    onClick={() => setActiveTab('document')}>
                                    <div className="p-6">
                                        {selectedPost.eventDetails && selectedPost.eventDetails.approvalDocument ? (
                                            <div className="flex flex-col items-center">
                                                <div className="mb-4 w-full bg-gray-50 rounded-lg p-4">
                                                    <p className="font-medium">Approval Document</p>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center">
                                                            <HiDocument className="text-blue-600 mr-2" size={24} />
                                                            <span className="text-gray-700">
                                                                {selectedPost.eventDetails.approvalDocument.split('/').pop()}
                                                            </span>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleDocumentDownload(selectedPost.eventDetails.approvalDocument)}
                                                            disabled={documentLoading}
                                                        >
                                                            {documentLoading ? <Spinner size="sm" /> : <HiDownload className="mr-1" />}
                                                            Download
                                                        </Button>
                                                    </div>
                                                </div>
                                                
                                                <div className="border rounded-lg w-full h-[400px]">
                                                    <iframe 
                                                        src={selectedPost.eventDetails.approvalDocument}
                                                        className="w-full h-full"
                                                        title="Approval Document Preview"
                                                    />
                                                </div>
                                                
                                                <p className="mt-2 text-sm text-gray-500">
                                                    If the document doesn't display properly, please download it.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                                                <p className="font-medium">No approval document provided.</p>
                                                <p className="mt-1">This event submission is missing a required approval document.</p>
                                            </div>
                                        )}
                                    </div>
                                </Tabs.Item>
                            </Tabs>
                        </div>
                        
                        <div className="p-6 border-t bg-gray-50">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium text-gray-700">Moderation Action</p>
                                    <p className="text-sm text-gray-500">
                                        Review all details carefully before making a decision
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => handleModeration(selectedPost._id, 'approved')}
                                        color="success"
                                    >
                                        <HiCheck className="mr-1" /> Approve
                                    </Button>
                                    <Button
                                        onClick={() => setShowRejectModal(true)}
                                        color="failure"
                                    >
                                        <HiX className="mr-1" /> Reject
                                    </Button>
                                    <Button
                                        onClick={() => setSelectedPost(null)}
                                        color="light"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-2">Rejection Reason</h3>
                        <p className="text-gray-500 mb-4">
                            Please provide a detailed reason for rejection. 
                            This will be shared with the event creator.
                        </p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full h-32 border rounded-lg p-2 mb-4"
                            placeholder="Please provide a reason for rejection..."
                            required
                        />
                        <div className="flex justify-end gap-4">
                            <Button
                                onClick={() => {
                                    if (rejectionReason.trim()) {
                                        handleModeration(selectedPost._id, 'rejected');
                                    }
                                }}
                                color="failure"
                                disabled={!rejectionReason.trim()}
                            >
                                Submit Rejection
                            </Button>
                            <Button
                                onClick={() => setShowRejectModal(false)}
                                color="light"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}