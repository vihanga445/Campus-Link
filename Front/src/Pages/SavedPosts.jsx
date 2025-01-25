import React from 'react'
import {useEffect , useState} from 'react';
import {useSelector} from 'react-redux';
import PostCard from '../components/PostCard';

export default function SavedPosts() {

  const {currentUser} = useSelector(state => state.user);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('savedPosts:', savedPosts);

 useEffect(() => {
   const fetchSavedPosts = async () =>{
    try{
      const res = await fetch(`/Back/post/saved-posts`,{
        headers:{
          'Authorization': `Bearer ${currentUser.token}`
        }
      });
      if(!res.ok){
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      setSavedPosts(data);
      } catch(error){
        setError(error.message);
      
      }
      finally{
        setLoading(false);
    }
   };
   if(currentUser){
     fetchSavedPosts();
   }
 
 }, [currentUser]);

 if(loading) return <div className='text-center py-8'>Loading..</div>
 if(error) return <div className='text-red-500 text-center py-8'>{error}</div>
 if(savedPosts.length === 0) return <div className='text-center py-8'>No saved posts</div>

  return (
    <div className='max-w-6xl mx-auto p-4'>
    <h1 className='text-2xl font-bold mb-6'>Saved Posts</h1>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {savedPosts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  </div>
  )
}
