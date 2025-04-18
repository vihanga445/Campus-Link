import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { Alert, Button, Textarea } from 'flowbite-react';

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [postOwnerId, setPostOwnerId] = useState(null); // State to store post owner ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/Back/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
      console.log('Error submitting comment:', error.message);
    }
  };

  useEffect(() => {
    // Fetch comments
    const fetchComments = async () => {
      try {
        const res = await fetch(`/Back/comment/getcomments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log('Error fetching comments:', error.message);
      }
    };

    // Fetch post details to get postOwnerId
    const fetchPostDetails = async () => {
      try {
        const res = await fetch(`/Back/post/${postId}`);
        if (res.ok) {
          const post = await res.json();
          setPostOwnerId(post.userId); // Set the post owner ID
        }
      } catch (error) {
        console.log('Error fetching post details:', error.message);
      }
    };

    fetchComments();
    fetchPostDetails();
  }, [postId]);

  return (
    <div className='max-w-2xl w-full p-2'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as :</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser.profilePicture}
            alt=''
          />
          <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm text-teal-500 my-5 flex gap-1'>
          You must sign in to comment
          <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
            Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className='flex gap-2'>
          <Textarea
            placeholder='Write a comment...'
            rows='3'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='flex justify-between items-center mt-5'>
            <Button outline gradientDuoTone='purpleToBlue' type='submit'>
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} postOwnerId={postOwnerId} />
          ))}
        </>
      )}
    </div>
  );
}

export default CommentSection;