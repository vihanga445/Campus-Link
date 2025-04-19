import { Alert, Button, FileInput, TextInput, Label, Select } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFilePdf, FaFileAlt, FaFileUpload } from 'react-icons/fa';

const validateEventDate = (selectedDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(selectedDate);
  return eventDate >= today;
};

export default function EditPost() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);

  const [approvalDoc, setApprovalDoc] = useState(null);
  const [approvalDocUploadProgress, setApprovalDocUploadProgress] = useState(null);
  const [approvalDocError, setApprovalDocError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: 'Event',
    eventDetails: {
      types: [],
      date: '',
      time: '',
      eventMode: 'physical',
      onlineLink: '',
      venue: '',
      organizer: '',
      registration: {
        required: false,
        deadline: '',
        link: ''
      },
      maxParticipants: 0,
      currentParticipants: 0,
      approvalDocument: ''
    }
  });
  const [publishError, setPublishError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/Back/post/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData(data);
        } else {
          toast.error('Failed to fetch post details');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching post details');
      }
    };

    fetchPost();
  }, [id]);

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

      setApprovalDocUploadProgress(0);

      const response = await fetch('https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload', {
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

      const eventDetails = formData.category === 'Event' ? formData.eventDetails : undefined;

      const res = await fetch(`/Back/post/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          eventDetails,
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
        toast.success('Post updated successfully!', {
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
          Edit Post
        </h1>

        {/* Form with 3-column grid */}
        <form className="grid grid-cols-1 md:grid-cols-3 gap-8" onSubmit={handleSubmit}>
          {/* Column 1: General Details */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <TextInput
                type="text"
                placeholder="Enter the event title"
                className="w-full"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Types</label>
              <div className="grid grid-cols-2 gap-4">
                {["Academic", "Cultural", "Sports", "Workshop", "Career", "Club"].map((type) => (
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
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
              <TextInput
                type="date"
                required
                value={formData.eventDetails.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: { ...formData.eventDetails, date: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
              <TextInput
                type="time"
                required
                value={formData.eventDetails.time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: { ...formData.eventDetails, time: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Mode</label>
              <Select
                id="eventMode"
                required
                className="w-full"
                value={formData.eventDetails.eventMode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    eventDetails: { ...formData.eventDetails, eventMode: e.target.value },
                  })
                }
              >
                <option value="physical">Physical (In-person)</option>
                <option value="online">Online (Virtual)</option>
                <option value="hybrid">Hybrid (Both)</option>
              </Select>
            </div>

            {(formData.eventDetails.eventMode === "physical" ||
              formData.eventDetails.eventMode === "hybrid") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <TextInput
                  type="text"
                  placeholder="Enter event venue"
                  required
                  value={formData.eventDetails.venue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventDetails: { ...formData.eventDetails, venue: e.target.value },
                    })
                  }
                />
              </div>
            )}

            {(formData.eventDetails.eventMode === "online" ||
              formData.eventDetails.eventMode === "hybrid") && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Online Meeting Link
                </label>
                <TextInput
                  type="url"
                  placeholder="Enter Zoom, Google Meet, or other meeting link"
                  required
                  value={formData.eventDetails.onlineLink}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      eventDetails: { ...formData.eventDetails, onlineLink: e.target.value },
                    })
                  }
                />
              </div>
            )}
          </div>

          {/* Column 2: Image Upload */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
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

            {/* Approval Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Approval Document</label>
              <div className="flex items-center gap-4">
                <FileInput
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setApprovalDoc(e.target.files[0])}
                />
                <Button
                  type="button"
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  outline
                  onClick={handleUploadApprovalDoc}
                  disabled={!approvalDoc || approvalDocUploadProgress}
                >
                  {approvalDocUploadProgress ? `${approvalDocUploadProgress}%` : "Upload"}
                </Button>
              </div>
              {approvalDocError && (
                <p className="text-sm text-red-500 mt-2">{approvalDocError}</p>
              )}
              {formData.eventDetails.approvalDocument && (
                <div className="mt-4 flex items-center gap-2">
                  <FaFilePdf className="text-red-500" />
                  <a
                    href={formData.eventDetails.approvalDocument}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Uploaded Document
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Content Editor */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <ReactQuill
                theme="snow"
                placeholder="Write something amazing..."
                className="h-64"
                required
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-span-1 md:col-span-3 flex justify-end gap-4 mt-6">
            <Button
              type="button"
              color="gray"
              onClick={() => navigate('/dashboard?tab=profile')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              gradientDuoTone="greenToBlue"
            >
              Update Post
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}