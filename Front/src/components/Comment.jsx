import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

function Comment({ comment, postOwnerId }) {
  const [user, setUser] = useState({});
  const [reply, setReply] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [showReplies, setShowReplies] = useState(false);
 
  // Check if the current user is the comment owner
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/Back/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log('Error fetching user:', error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/Back/comment/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId: comment._id,
          replyContent: reply,
        }),
      });
      if (res.ok) {
        setReply('');
        setShowReplyForm(false);
        console.log('Reply added successfully');
      } else {
        console.log('Failed to add reply');
      }
    } catch (error) {
      console.log('Error submitting reply:', error.message);
    }
  };

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img
          className='w-10 h-10 rounded-full bg-gray-200'
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className='flex-1 '>
        <div className='flex items-center mb-1'>
          <span className='font-bold mr-1 text-xs truncate'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>

        {comment.replies && comment.replies.length > 0 && (
          <button
            className='text-blue-500 text-xs pr-3'
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? 'Hide Replies' : 'View Replies   '}
          </button>
        )}

        {showReplies && (
          <div className='mt-2 ml-5'>
            {comment.replies.map((reply) => (
              <div key={reply._id} className='flex items-start mb-2'>
                <img
                  className='w-8 h-8 rounded-full bg-gray-200 mr-2'
                  src={reply.userId?.profilePicture || '/default-avatar.png'}
                  alt={reply.userId?.username || 'anonymous'}
                />
                <div>
                  <span className='font-bold mr-1 text-xs'>
                    {reply.userId ? `@${reply.userId.username}` : 'anonymous user'}
                  </span>
                  <span className='text-gray-500 text-xs'>{moment(reply.createdAt).fromNow()}</span>
                  <p className='text-gray-500'>{reply.content}</p>
                </div>
              </div>
            ))}

            {currentUser && currentUser._id === postOwnerId && (
              <button
                className='text-blue-500 text-xs mt-4' // Add margin-top to create space
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                Reply
              </button>
            )}

            {showReplyForm && (
              <form onSubmit={handleReplySubmit} className='mt-2'>
                <textarea
                  className='w-full p-2 border rounded'
                  rows='2'
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder='Write your reply...'
                ></textarea>
                <button
                  type='submit'
                  className='bg-blue-500 text-white px-3 py-1 rounded mt-2'
                >
                  Submit Reply
                </button>
              </form>
            )}
          </div>
        )}

        {!showReplies && currentUser && currentUser._id === postOwnerId && (
          <button
            className='text-black-500 text-xs mt-2'
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Reply
          </button>
        )}

        {showReplyForm && !showReplies && (
          <form onSubmit={handleReplySubmit} className='mt-2'>
            <textarea
              className='w-full p-2 border rounded'
              rows='2'
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder='Write your reply...'
            ></textarea>
            <button
              type='submit'
              className='bg-blue-500 text-white px-3 py-1 rounded mt-2'
            >
              Submit Reply
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Comment;