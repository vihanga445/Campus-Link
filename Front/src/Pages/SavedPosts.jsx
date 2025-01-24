import React from 'react'
import {useEffect , useState} from 'react';
import {useSelector} from 'react-redux';

export default function SavedPosts() {

  const {currentUser} = useSelector(state => state.user);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  return (
    <div>SavedPosts</div>
  )
}
