import { Alert, Button, FileInput, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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
    category: 'Event',
    eventDetails: {
      types: [],
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
      if (formData.category === 'Event' && !validateEventDate(formData.eventDetails.date)) {
        setPublishError('Event date cannot be in the past');
        toast.error('Event date cannot be in the past');
        return;
      }

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
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create a New Event
        </h1>

        {/* Form with 3-column grid */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-8" onSubmit={handleSubmit}>
          {/* Column 1: General Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <TextInput
                type="text"
                placeholder="Enter the event title"
                className="w-full"
                required
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Types
              </label>
              <div className="grid grid-cols-2 gap-4">
                {["Academic", "Cultural", "Sports", "Workshop", "Career", "Club"].map(
                  (type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={type}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        onChange={(e) => {
                          const updatedTypes = e.target.checked
                            ? [...formData.eventDetails.types, type]
                            : formData.eventDetails.types.filter((t) => t !== type);
                          setFormData({
                            ...formData,
                            eventDetails: {
                              ...formData.eventDetails,
                              types: updatedTypes,
                            },
                          });
                        }}
                        checked={formData.eventDetails.types.includes(type)}
                      />
                      <label htmlFor={type} className="ml-2 text-sm text-gray-700">
                        {type}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Date
              </label>
              <TextInput
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  const selectedDate = e.target.value;
                  if (!validateEventDate(selectedDate)) {
                    toast.error("Event date cannot be in the past");
                    return;
                  }
                  setFormData({
                    ...formData,
                    eventDetails: {
                      ...formData.eventDetails,
                      date: selectedDate,
                    },
                  });
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Time
              </label>
              <TextInput
                type="time"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: { ...formData.eventDetails, time: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <TextInput
                type="text"
                placeholder="Enter event venue"
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: { ...formData.eventDetails, venue: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organizer
              </label>
              <TextInput
                type="text"
                placeholder="Enter organizer name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: { ...formData.eventDetails, organizer: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Link
              </label>
              <TextInput
                type="url"
                placeholder="Enter registration link"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: {
                      ...formData.eventDetails,
                      registration: {
                        ...formData.eventDetails.registration,
                        link: e.target.value,
                      },
                    },
                  })
                }
              />
            </div>
          </div>

          {/* Column 2: Image Upload */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <div className="flex items-center gap-4">
                <FileInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button
                  type="button"
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  outline
                  onClick={handleUploadImage}
                  disabled={!file || imageUploadProgress}
                >
                  {imageUploadProgress ? `${imageUploadProgress}%` : "Upload"}
                </Button>
              </div>
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Content Editor */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Write something amazing..."
                className="h-64"
                required
                onChange={(value) => setFormData({ ...formData, content: value })}
              />
            </div>
          </div>
        

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            onClick={() => setShowPreview(true)}
            gradientDuoTone="purpleToBlue"
            outline
          >
            Preview
          </Button>
          <Button type="submit" gradientDuoTone="purpleToBlue">
            Publish
          </Button>
        </div>
        </form>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{formData.title || "Untitled"}</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 absolute top-4 right-4"
              >
                ✕
              </button>
            </div>
            {formData.image && (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <div className="prose max-w-none">{parse(formData.content || "")}</div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
