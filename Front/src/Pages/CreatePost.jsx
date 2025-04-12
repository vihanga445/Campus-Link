import { Alert, Button, FileInput, TextInput, Label } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf, FaFileAlt, FaFileUpload } from 'react-icons/fa';

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
  
  // New state for approval document
  const [approvalDoc, setApprovalDoc] = useState(null);
  const [approvalDocUploadProgress, setApprovalDocUploadProgress] = useState(null);
  const [approvalDocError, setApprovalDocError] = useState(null);
  
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
      currentParticipants: 0,
      approvalDocument: '' // New field for storing approval document URL
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

  // New function to handle approval document upload
  const handleUploadApprovalDoc = async () => {
    try {
      if (!approvalDoc) {
        setApprovalDocError('Please select a document to upload');
        return;
      }
      setApprovalDocError(null);
      const formDataUpload = new FormData();
      formDataUpload.append('file', approvalDoc);
      formDataUpload.append('upload_preset', 'final_project');
      
      // Set upload progress to 0 to start
      setApprovalDocUploadProgress(0);

      const response = await fetch('https://api.cloudinary.com/v1_1/dfu1zqt5s/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }
      
      const data = await response.json();
      
      setFormData({
        ...formData,
        eventDetails: {
          ...formData.eventDetails,
          approvalDocument: data.secure_url
        }
      });
      
      setApprovalDocUploadProgress(100);
      
      // Reset progress after 2 seconds
      setTimeout(() => {
        setApprovalDocUploadProgress(null);
        toast.success('Approval document uploaded successfully');
      }, 2000);
      
      setApprovalDocError(null);
    } catch (error) {
      setApprovalDocError("Document upload failed");
      setApprovalDocUploadProgress(null);
      console.log(error);
      toast.error('Failed to upload approval document');
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

      // Check if approval document is uploaded
      if (!formData.eventDetails.approvalDocument) {
        setPublishError('Please upload an approval document');
        toast.error('Approval document is required for event submission');
        return;
      }

      const eventDetails = formData.category === 'Event' ? formData.eventDetails : undefined;

      const res = await fetch('/Back/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          eventDetails,
          status: 'pending', // Set initial status to pending for approval
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        toast.error(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        toast.success('Event submitted for approval! A moderator will review your submission.', {
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

  const getApprovalDocName = () => {
    if (approvalDoc) {
      return approvalDoc.name;
    }
    return "No file selected";
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
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
            
            {/* NEW: Approval Document Upload */}
            <div className="pt-4 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Approval Document <span className="text-red-500">*</span>
              </label>
              <div className="text-xs text-gray-500 mb-2">
                Upload a document from your department/organization approving this event
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-grow">
                  <FileInput
                    id="approval-doc"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setApprovalDoc(e.target.files[0])}
                    className="w-full"
                  />
                </div>
                <Button
                  type="button"
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  outline
                  onClick={handleUploadApprovalDoc}
                  disabled={!approvalDoc || approvalDocUploadProgress}
                  className="whitespace-nowrap"
                >
                  <FaFileUpload className="mr-1" />
                  {approvalDocUploadProgress ? `${approvalDocUploadProgress}%` : "Upload"}
                </Button>
              </div>
              
              {/* Show document info when uploaded */}
              {formData.eventDetails.approvalDocument && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center">
                  <div className="text-blue-600 mr-2">
                    {approvalDoc && approvalDoc.name.match(/\.(pdf)$/i) ? (
                      <FaFilePdf size={24} />
                    ) : (
                      <FaFileAlt size={24} />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="text-sm font-medium text-gray-700 truncate">
                      {getApprovalDocName()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Document uploaded successfully
                    </div>
                  </div>
                  <a 
                    href={formData.eventDetails.approvalDocument} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              )}
              
              {approvalDocError && (
                <div className="mt-2 text-sm text-red-600">{approvalDocError}</div>
              )}
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
              Submit for Approval
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
            <div className="prose max-w-none mb-4">{parse(formData.content || "")}</div>
            
            {/* Show approval document status */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2">Submission Status</h3>
              <div className="flex items-center">
                <div className="mr-2 w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">Pending Approval</span>
              </div>
              
              {formData.eventDetails.approvalDocument ? (
                <div className="mt-3 flex items-center">
                  <FaFileAlt className="text-blue-500 mr-2" />
                  <span className="text-sm">Approval document attached</span>
                </div>
              ) : (
                <div className="mt-3 text-sm text-red-500">
                  Required: Please upload an approval document before submitting
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
