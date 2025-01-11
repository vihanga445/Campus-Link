import { Alert ,Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload, FaEdit, FaLayerGroup } from 'react-icons/fa';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError , setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);
  const handleUploadImage = async () => {

    try{
      if(!file){
        setImageUploadError('Please select an image to upload');
        return;
      }
      setImageUploadError(null);
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'final_project');

      const response = await fetch('https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload',{
        method: 'POST',
        body: formDataUpload,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
          setImageUploadProgress(progress);
        }
      } );
      if(!response.ok){
        throw new Error('Failed to upload image');
      }
      const data = await response.json();
      setFormData({ ...formData, image: data.secure_url });
      setImageUploadProgress(null);
      setImageUploadError(null);
    }
    catch(error){
      setImageUploadError("image upload failed"); 
      setImageUploadProgress(null);
      console.log(error);
    }
    



  };
  const handleSubmit = async (e) => {

    e.preventDefault();
    try{
      const res = await fetch('Back/post/create',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),   
      });
      const data = await res.json();
      if(!res.ok){
         setPublishError(data.message);
         return;}
      if(res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }

    }
    catch(error){
      setPublishError('Something went wrong');  
    }
  };

  return (
    <div className='p-4 max-w-3xl mx-auto min-h-screen bg-gray-50 rounded-lg shadow-lg'>
      <h1 className='text-center text-4xl my-8 font-bold text-blue-700 flex items-center justify-center gap-2'>
        <FaEdit className='text-blue-500' /> Create a Post
      </h1>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        {/* Title and Category */}
        <div className='flex flex-column gap-6 sm:flex-row justify-between'>
          <div className='flex-column w-full'>
            <TextInput
              type='text'
              placeholder='Title'
              className='border-blue-400 focus:ring-blue-500 focus:border-blue-500'
              required
              onChange = { (e)=> setFormData({...formData, title: e.target.value})}
            />

          </div>
          <div className='flex items-center w-full'>
            <FaLayerGroup className='text-blue-500 mr-2' />
            <Select className='border-blue-400 focus:ring-blue-500 focus:border-blue-500 flex-1' onChange = { (e)=> setFormData({...formData, category: e.target.value})}>
              <option value='uncategorized'>Select a category</option>
              <option value='Event'>Event</option>
              <option value='Clubs and Societies'>Clubs and Societies</option>
              <option value='Lost-Found'>Lost-Found</option>
              <option value='Announcements'>Announcements</option>
            </Select>
          </div>
        </div>

        {/* File Upload Section */}
        <div className='flex gap-6 items-center justify-between border-4 border-indigo-400 border-dashed p-4 bg-indigo-50 rounded-lg'>
          <div className='flex items-center'>
            <FaUpload className='text-indigo-500 mr-2' />
            <FileInput
              type='file'
              accept='image/*'
              className='file:bg-indigo-200 file:border-indigo-400 file:font-semibold file:rounded-lg file:cursor-pointer'
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <Button
            type='button'
            gradientDuoTone='tealToLime'
            size='sm'
            className='hover:scale-105 flex items-center gap-2'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
          {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
            
          </Button>
        </div>
         {imageUploadError && <Alert color='red'>{imageUploadError}</Alert>}
         {formData.image && (
          <img src={formData.image} alt='upload' className='w-full h-72 object-cover'  />
         )}
        {/* Text Editor */}
        <ReactQuill
          theme='snow'
          placeholder='Write something amazing...'
          className='h-64 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-500'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        {/* Submit Button */}
        <Button
          type='submit'
          gradientDuoTone='cyanToBlue'
          className='text-lg font-semibold transform hover:scale-105 flex items-center gap-2'
        >
          <FaEdit />
          Publish
        </Button>
      </form>
    </div>
  );
}
