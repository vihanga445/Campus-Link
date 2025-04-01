import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import moment from 'moment';

export default function ChatList() {
    const { currentUser } = useSelector(state => state.user);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await fetch('/Back/message/conversations');
                const data = await res.json();
                setConversations(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser) {
            fetchConversations();
        }
    }, [currentUser]);

    const getOtherParticipant = (conversation) => {
        return conversation.participants.find(p => p._id !== currentUser._id);
    };

    return (
        <div className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Messages</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {conversations.map(conversation => (
                        <Link 
                            key={conversation._id} 
                            to={`/dashboard/chat/${conversation._id}`}
                        >
                            <div className='border rounded-lg p-4 flex justify-between items-center hover:bg-gray-100'>
                                <div>
                                    <h2 className='font-semibold'>
                                        {conversation.postId.title}
                                    </h2>
                                    <p className='text-gray-500 text-sm'>
                                        With: {getOtherParticipant(conversation).username}
                                    </p>
                                    {conversation.lastMessage && (
                                        <p className='text-sm text-gray-600 mt-1'>
                                            {conversation.lastMessage.content}
                                        </p>
                                    )}
                                </div>
                                <div className='text-sm text-gray-500'>
                                    {moment(conversation.updatedAt).fromNow()}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}