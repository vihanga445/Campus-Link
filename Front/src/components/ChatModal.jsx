import React, { useState } from 'react';
import { BiX } from 'react-icons/bi';

export default function ChatModal({ postOwnerId, postId, onClose }) {
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch('/Back/message/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    receiverId: postOwnerId,
                    postId,
                    content: message,
                }),
            });
            if (res.ok) {
                setMessage('');
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full shadow-lg flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Chat with Organizer</h2>
                    <button onClick={onClose}>
                        <BiX className="text-2xl" />
                    </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                    <form onSubmit={handleSendMessage} className="flex flex-col gap-4">
                        <textarea
                            className="w-full p-2 border rounded"
                            rows="4"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={sending}
                        >
                            {sending ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}