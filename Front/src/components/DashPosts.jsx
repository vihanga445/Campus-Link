import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/Back/post/getposts?userId=${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchPosts();
    }, [currentUser._id]);

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/Back/post/deletepost/${postIdToDelete}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="p-3 max-w-7xl mx-auto">
            {userPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userPosts.map((post) => (
                        <div
                            key={post._id}
                            className="border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800"
                        >
                            <Link to={`/post/${post.slug}`}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                            </Link>
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">{post.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no posts yet!</p>
            )}
        </div>
    );
}

