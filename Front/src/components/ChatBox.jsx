import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import moment from 'moment';

export default function ChatBox({ conversationId }) {
    const { currentUser } = useSelector(state => state.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`/Back/message/messages/${conversationId}`);
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (conversationId) {
            fetchMessages();
        }
    }, [conversationId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            const res = await fetch('/Back/message/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversationId,
                    content: newMessage,
                }),
            });

            const data = await res.json();
            setMessages([...messages, data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex flex-col h-[600px] bg-white rounded-lg shadow-md'>
            <div className='flex-1 overflow-y-auto p-4'>
                {loading ? (
                    <div>Loading messages...</div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`mb-4 ${
                                message.senderId._id === currentUser._id
                                    ? 'text-right'
                                    : 'text-left'
                            }`}
                        >
                            <div
                                className={`inline-block p-3 rounded-lg ${
                                    message.senderId._id === currentUser._id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100'
                                }`}
                            >
                                <p className='text-sm font-semibold'>
                                    {message.senderId.username}
                                </p>
                                <p>{message.content}</p>
                                <p className='text-xs mt-1 opacity-70'>
                                    {moment(message.createdAt).fromNow()}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className='p-4 border-t'>
                <div className='flex gap-2'>
                    <TextInput
                        type='text'
                        placeholder='Type a message...'
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className='flex-1'
                    />
                    <Button type='submit' gradientDuoTone='purpleToBlue'>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    );
}