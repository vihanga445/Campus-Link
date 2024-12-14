import { Button, Label, TextInput , Alert, Spinner} from 'flowbite-react';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Signin() {
  const [formData , setFormData] = useState({})
  const {loading,error:errorMessage} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
     
      dispatch(signInStart());
      const res = await fetch('/Back/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success==false){
dispatch(signInFailure(data.message));      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {

       dispatch(signInFailure(error.message));
       
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="font-bold text-3xl text-indigo-600">
            Ruhuna App
          </Link>
          <p className="text-sm text-gray-500 mt-2">
            Sign up to explore events, societies, and announcements for university students.
          </p>
        </div>
        {/* Signup Form */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
       
          <div>
            <Label value="Email" />
            <TextInput
              type="email"
              placeholder="Enter your email"
              id="email"
              className="focus:ring-indigo-500 focus:border-indigo-500"

              onChange={handleChange}
            />
          </div>
          <div>
            <Label value="Password" />
            <TextInput
              type="password"
              placeholder="Enter your password"
              id="password"
              className="focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleChange}
            />
          </div>
          <Button gradientDuoTone="indigoToBlue" type="submit" disabled={loading}>
            {loading ? (
              <>
              <Spinner size="sm"/>
              <span className='pl-3'>Loading...</span>
              </>
            ): 'Sign In'}
          
          </Button>
          <OAuth />
        </form>
        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-5">
          <span>Dont have an account?</span>{' '}
          <Link to="/sign-up" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </div>
        {errorMessage && (
          <Alert className="mt-5" type="failure">
            {errorMessage}  
          </Alert>  
        )}
      </div>
    </div>
  );
}
