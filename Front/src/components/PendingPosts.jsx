import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiCheck, HiX } from 'react-icons/hi';
import parse from 'html-react-parser';

export default function PendingPosts() {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Pending Posts for {currentUser.moderatorRole.category}
            </h1>
            
            {/* Posts List */}
            <div className="grid grid-cols-1 gap-4">
    {pendingPosts.map(post => (
        <div key={post._id} 
             onClick={() => handlePostClick(post)}
             className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500">Category: {post.category}</p>
            {post.image && (
                <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg my-2"
                />
            )}
            <div className="line-clamp-2 text-gray-700 mt-2">{parse(post.content)}</div>
        </div>
    ))}
</div>

            {/* Post Review Modal */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
                        <p className="text-gray-600 mb-4">Category: {selectedPost.category}</p>
                        {selectedPost.image && (
                            <img 
                                src={selectedPost.image} 
                                alt={selectedPost.title}
                                className="w-full h-64 object-cover rounded-lg mb-4"
                            />
                        )}
                        <div className="prose max-w-none mb-6">
                            {parse(selectedPost.content)}
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleModeration(selectedPost._id, 'approved')}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                            >
                                <HiCheck /> Approve
                            </button>
                            <button
                                onClick={() => setShowRejectModal(true)}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg flex items-center gap-2"
                            >
                                <HiX /> Reject
                            </button>
                            <button
                                onClick={() => setSelectedPost(null)}
                                className="border px-6 py-2 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rejection Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">Rejection Reason</h3>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="w-full h-32 border rounded-lg p-2 mb-4"
                            placeholder="Please provide a reason for rejection..."
                            required
                        />
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    if (rejectionReason.trim()) {
                                        handleModeration(selectedPost._id, 'rejected');
                                    }
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                disabled={!rejectionReason.trim()}
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="border px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}