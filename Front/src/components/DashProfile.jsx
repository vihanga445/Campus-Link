import {
  Alert,
  Button,
  TextInput,
  Modal,
  ModalBody,
  ModalFooter,
  Spinner,
} from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import { checkPasswordStrength } from './utils';
import image1 from '../default-profile-picture.jpg';
import image2 from '../defaultcover.jpg';

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverFileUrl, setCoverFileUrl] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: ""
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  const filePickerRef = useRef();
  const coverPickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverFileUrl(URL.createObjectURL(file));
      uploadCover(file);
    }
  };

  const uploadImage = async (file) => {
    setIsUploadingImage(true);
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload`;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'final_project');

    try {
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image. Please try again.');
      }

      const data = await response.json();
      setImageFileUrl(data.secure_url);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const uploadCover = async (file) => {
    setIsUploadingCover(true);
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload`;
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', 'final_project');

    try {
      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Failed to upload cover photo. Please try again.');
      }

      const data = await response.json();
      setCoverFileUrl(data.secure_url);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsUploadingCover(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); 
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    try {
      dispatch(updateStart());
      const res = await fetch(`/Back/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profilePicture: imageFileUrl || currentUser.profilePicture,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        toast.success('Profile updated successfully'); 
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
      toast.error('Failed to update profile'); 
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Show a loading state or spinner
      const res = await fetch(`/Back/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
  
      if (!res.ok) {
        // Handle failure
        toast.error('Failed to delete account.');
      } else {
        // Dispatch success action or signout
        dispatch(deleteUserSuccess());
        toast.success('Account deleted successfully');
        navigate('/');  // Redirect to home or login page
      }
    } catch (error) {
      toast.error('Error deleting account.');
    } finally {
      setShowModal(false); // Close the modal after the operation
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto p-3 w-full">
      {/* Cover Photo Picker */}
      <input
        type="file"
        accept="image/*"
        onChange={handleCoverChange}
        ref={coverPickerRef}
        hidden
      />
      <div
        className="relative mb-4 w-full bg-gray-200 cursor-pointer overflow-hidden h-48"
        onClick={() => coverPickerRef.current.click()}
      >
        <img
          src={coverFileUrl || currentUser.coverPhoto || image2} // Default cover photo
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Hover overlay for changing cover photo */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-lg">Change Cover Photo</span>
        </div>
      </div>

      {/* Profile Image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={filePickerRef}
        hidden
      />
      <div className="relative flex justify-center -mt-16 mb-8">
        <div
          className="relative w-40 h-40 border-4 border-white rounded-full shadow-md overflow-hidden cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture || defaultProfilePicture}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
          {/* Hover overlay for changing profile picture */}
          <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full bg-black bg-opacity-50">
            <span className="text-white text-sm">Change Profile Photo</span>
          </div>
        </div>
      </div>

      {/* Remaining Profile Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          aria-label="Username"
        />
        <TextInput
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          aria-label="Email"
        />
        <TextInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          aria-label="Password"
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>

        <Link to={'/create-post'}>
          <Button
            type="button"
            gradientDuoTone="purpleToPink"
            className="w-full h-2xl transition duration-300 transform hover:scale-105"
          >
            Create a post
          </Button>
        </Link>
      </form>

      {/* Delete and Signout */}
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={() => dispatch(signoutSuccess())} className="cursor-pointer">
          Sign Out
        </span>
      </div>
    

     {/* Modal for Account Deletion */}
     {showModal && (
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ModalBody>
          Are you sure you want to delete your account?
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleDeleteAccount}>Delete</Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )}
    </div>
  );
}
