import {
  Alert,
  Button,
  TextInput,
  Modal,
  ModalBody,
  ModalFooter,
  Spinner,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { checkPasswordStrength } from "./utils";
import image1 from "../default-profile-picture.jpg";
import newDefaultCover from "../defaultcover.jpg";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverFileUrl, setCoverFileUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
  });

  const filePickerRef = useRef();
  const coverPickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverFileUrl(URL.createObjectURL(file));
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
    console.log("Form submitted");
    // Add your form submission logic here
  };

  const handleDeleteAccount = async () => {
    console.log("Account deletion logic here");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Cover Photo */}
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          ref={coverPickerRef}
          hidden
        />
        <div
          className="relative h-64 bg-gray-200 cursor-pointer rounded-lg overflow-hidden"
          onClick={() => coverPickerRef.current.click()}
        >
          <img
            src={coverFileUrl || currentUser.coverPicture || newDefaultCover}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-lg">Change Cover Photo</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="relative -mt-20 flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />
          <div
            className="relative w-48 h-48 border-4 border-white rounded-full shadow-md overflow-hidden cursor-pointer"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={imageFileUrl || currentUser.profilePicture || image1}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-full">
              <span className="text-white text-sm">Change Profile Photo</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="mt-8 px-12">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <TextInput
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              aria-label="Username"
              className="rounded-lg"
            />
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              aria-label="Email"
              className="rounded-lg"
            />
            <TextInput
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              aria-label="Password"
              className="rounded-lg"
            />
            <Button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition duration-300"
            >
              Update Profile
            </Button>
          </form>

          {/* Delete and Signout */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300"
            >
              Delete Account
            </button>
            <button
              onClick={() => dispatch(signoutSuccess())}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Account Deletion */}
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ModalBody>
            <p className="text-center text-lg">
              Are you sure you want to delete your account?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleDeleteAccount} color="failure">
              Delete
            </Button>
            <Button onClick={() => setShowModal(false)} color="gray">
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
