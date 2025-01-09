import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function RejectedPosts() {
    const [rejectedPosts, setRejectedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const fetchRejectedPosts = async () => {
            try {
                const res = await fetch('/Back/post/rejected-posts', {
                    headers: {
                        'Authorization': `Bearer ${currentUser.token}`
                    }
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
        <div className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Rejected Posts</h1>
            <div className="grid grid-cols-1 gap-4">
                {rejectedPosts.map(post => (
                    <div key={post._id} className="border rounded-lg p-4 bg-red-50">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-500">Category: {post.category}</p>
                        {post.image && (
                            <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-48 object-cover rounded-lg my-2"
                            />
                        )}
                        <div className="mt-2">{post.content}</div>
                        <div className="mt-4 p-3 bg-red-100 rounded-lg">
                            <p className="font-semibold text-red-600">Rejection Reason:</p>
                            <p className="text-red-700">{post.moderationDetails.rejectionReason}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}