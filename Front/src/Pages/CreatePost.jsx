import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaUpload, FaEdit, FaLayerGroup, FaTimes } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add this helper function at the top of your component
const validateEventDate = (selectedDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  const eventDate = new Date(selectedDate);
  return eventDate >= today;
};

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    eventDetails: {
      type: '',
      date: '',
      time: '',
      venue: '',
      organizer: '',
      registration: {
        required: false,
        deadline: '',
        link: ''
      },
      maxParticipants: 0,
      currentParticipants: 0
    }
  });
  const [publishError, setPublishError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image to upload');
        return;
      }
      setImageUploadError(null);
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', 'final_project');

      const response = await fetch('https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload', {
        method: 'POST',
        body: formDataUpload,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(progressEvent.loaded / progressEvent.total * 100);
          setImageUploadProgress(progress);
        }
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const data = await response.json();
      setFormData({ ...formData, image: data.secure_url });
      setImageUploadProgress(null);
      setImageUploadError(null);
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add this validation check
      if (formData.category === 'Event' && !validateEventDate(formData.eventDetails.date)) {
        setPublishError('Event date cannot be in the past');
        toast.error('Event date cannot be in the past');
        return;
      }

      console.log('Form Data before event details:', formData); // Log form data before event details
       
      const eventDetails = formData.category === 'Event' ? formData.eventDetails : undefined;

      const res = await fetch('/Back/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, eventDetails }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        toast.success('Post submitted for admin review!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/dashboard?tab=profile');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-400 p-6'>
          <h1 className='text-center text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3'>
            <FaEdit className='text-white/90' /> Create a Post
          </h1>
        </div>

        <form className='p-6 space-y-6' onSubmit={handleSubmit}>
          {/* Title and Category Selection */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <TextInput
                type='text'
                placeholder='Title'
                className='w-full'
                required
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className='flex items-center gap-2'>
              <FaLayerGroup className='text-blue-500' />
              <Select 
                className='w-full'
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value='uncategorized'>Select a category</option>
                <option value='Event'>Event</option>
                <option value='Lost-Found'>Lost & Found</option>
                <option value='Clubs and Societies'>Clubs & Societies</option>
                <option value='Announcements'>Announcements</option>
              </Select>
            </div>
          </div>

          {/* Event Details */}
          {formData.category === 'Event' && (
            <>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Event Type</label>
                <Select 
                  className='w-full'
                  onChange={(e) => setFormData({ ...formData, eventDetails: { ...formData.eventDetails, type: e.target.value } })}
                >
                  <option value=''>Select event type</option>
                  <option value='Academic'>Academic</option>
                  <option value='Cultural'>Cultural</option>
                  <option value='Sports'>Sports</option>
                  <option value='Workshop'>Workshop</option>
                  <option value='Career'>Career</option>
                  <option value='Club'>Club</option>
                </Select>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Event Date</label>
                <TextInput
                  type='date'
                  required
                  min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    if (!validateEventDate(selectedDate)) {
                      toast.error('Event date cannot be in the past');
                      return;
                    }
                    setFormData({ 
                      ...formData, 
                      eventDetails: { 
                        ...formData.eventDetails, 
                        date: selectedDate 
                      } 
                    });
                  }}
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Event Time</label>
                <TextInput
                  type='time'
                  required
                  onChange={(e) => setFormData({ ...formData, eventDetails: { ...formData.eventDetails, time: e.target.value } })}
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Venue</label>
                <TextInput
                  type='text'
                  placeholder='Enter event venue'
                  required
                  onChange={(e) => setFormData({ ...formData, eventDetails: { ...formData.eventDetails, venue: e.target.value } })}
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Organizer</label>
                <TextInput
                  type='text'
                  placeholder='Enter organizer name'
                  onChange={(e) => setFormData({ ...formData, eventDetails: { ...formData.eventDetails, organizer: e.target.value } })}
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700'>Registration Link</label>
                <TextInput
                  type='url'
                  placeholder='Enter registration link'
                  onChange={(e) => setFormData({ ...formData, eventDetails: { ...formData.eventDetails, registration: { ...formData.eventDetails.registration, link: e.target.value } } })}
                />
              </div>
            </>
          )}

          {/* Image Upload Section */}
          <div className='flex items-center gap-4'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type='button'
              size='sm'
              gradientDuoTone='purpleToBlue'
              outline
              onClick={handleUploadImage}
              disabled={!file || imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className='w-8 h-8'>
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress}%`}
                  />
                </div>
              ) : (
                'Upload'
              )}
            </Button>
          </div>

          {/* Image Preview */}
          {formData.image && (
            <div className='relative'>
              <img
                src={formData.image}
                alt='upload'
                className='w-full h-72 object-cover rounded-lg'
              />
            </div>
          )}

          {/* Text Editor */}
          <ReactQuill
            theme='snow'
            placeholder='Write something amazing...'
            className='h-64 mb-20'
            required
            onChange={(value) => setFormData({ ...formData, content: value })}
          />

          {/* Error Display */}
          {publishError && (
            <Alert color='failure'>
              {publishError}
            </Alert>
          )}

          {/* Action Buttons */}
          <div className='flex gap-4 justify-end pt-8 mt-8 relative z-10 '>
            <Button
              type='button'
              onClick={() => setShowPreview(true)}
              gradientDuoTone='purpleToBlue'
              outline
            >
              Preview
            </Button>
            <Button type='submit' gradientDuoTone='purpleToBlue'>
              Publish
            </Button>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto'>
            <div className='mb-4 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>{formData.title || 'Untitled'}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                ✕
              </button>
            </div>
            
            <div className='mb-4'>
              <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
                {formData.category || 'Uncategorized'}
              </span>
            </div>

            {formData.image && (
              <img
                src={formData.image}
                alt='Post preview'
                className='w-full h-64 object-cover rounded-lg mb-4'
              />
            )}

            <div className='prose max-w-none'>
              {parse(formData.content || '')}
            </div>

            <div className='mt-6 flex justify-end gap-4'>
              <Button
                onClick={() => setShowPreview(false)}
                outline
                gradientDuoTone='purpleToBlue'
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setShowPreview(false);
                  handleSubmit(new Event('submit'));
                }}
                gradientDuoTone='purpleToBlue'
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
