// import { Alert, Button, TextInput, Modal, ModalBody } from 'flowbite-react';
// import { useEffect, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
// import {updateStart,updateSuccess,updateFailure,  deleteUserStart,
//     deleteUserSuccess,
//     deleteUserFailure,signoutSuccess} from '../redux/user/userSlice';

// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useDispatch } from 'react-redux';
// import { HiOutlineExclamationCircle } from 'react-icons/hi';
// export default function DashProfile() {
//   const { currentUser , error} = useSelector((state) => state.user);
//   const [imageFile, setImageFile] = useState(null);
//   const [imageFileUrl, setImageFileUrl] = useState(null);
//   const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
//   const [imageFileUploadError, setImageFileUploadError] = useState(null);
//   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
//   const [updateUserError, setUpdateUserError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({});
//   const filePickerRef = useRef();
//   const dispatch = useDispatch();
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImageFileUrl(URL.createObjectURL(file));
//     }
//   };
//   useEffect(() => {
//     if (imageFile) {
//     handleImageChange(imageFile);
//     }
//   }, [imageFile]);

//   const handleSubmit = async (e) => {
//     e.preventDefault(); 
//     setUpdateUserError(null);
//     setUpdateUserSuccess(null);
//     if(Object.keys(formData).length===0){
//         setUpdateUserError('No changes made');
//         return;
//     }
   
//       try {
//         dispatch(updateStart());
//         const res = await fetch(`/Back/user/update/${currentUser._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           dispatch(updateFailure(data.message));
//           setUpdateUserError(data.message);
//         } else {
//           dispatch(updateSuccess(data));
//           setUpdateUserSuccess("User's profile updated successfully");
//         }
//       } catch (error) {
//         dispatch(updateFailure(error.message));
//         setUpdateUserError(error.message);
//       }
//   };

// //   const uploadImage = async () => {
// //     setImageFileUploadError(null);
  
// //     const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload`; // Replace <your-cloud-name>
// //     const formData = new FormData();
  
// //     // Add image file and upload preset to the form data
// //     formData.append('file', imageFile);
// //     formData.append('upload_preset', 'final_project'); // Replace <your-upload-preset>
  
// //     try {
// //       const response = await fetch(cloudinaryUrl, {
// //         method: 'POST',
// //         body: formData,
// //       });
  
// //       if (!response.ok) {
// //         throw new Error('Could not upload image (File must be less than 2MB)');
// //       }
  
// //       const data = await response.json();
// //       setImageFileUrl(data.secure_url); // URL of the uploaded image
// //       setImageFileUploadProgress(100); // Mark upload as complete
// //     } catch (error) {
// //       setImageFileUploadError(error.message);
// //       setImageFileUploadProgress(null);
// //       setImageFile(null);
// //       setImageFileUrl(null);
// //     }
// //   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };
//   console.log(formData);  
//   const handleDeleteUser = async () => {
//     setShowModal(false);
//     try {
//       dispatch(deleteUserStart());
//       const res = await fetch(`/Back/user/delete/${currentUser._id}`, {
//         method: 'DELETE',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         dispatch(deleteUserFailure(data.message));
//       } else {
//         dispatch(deleteUserSuccess(data));
//       }
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };  
//   const handleSignout = async () => {
//     try {
//       const res = await fetch('/Back/user/signout', {
//         method: 'POST',
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         dispatch(signoutSuccess());
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//       <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
//       <form className='flex flex-col gap-4'  onSubmit={handleSubmit}>
//         <input
//           type='file'
//           accept='image/*'
//           onChange={handleImageChange}
//           ref={filePickerRef}
//           hidden
//         />
//         <div
//           className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
//           onClick={() => filePickerRef.current.click()}
//         >
//           {imageFileUploadProgress && (
//             <CircularProgressbar
//               value={imageFileUploadProgress || 0}
//               text={`${imageFileUploadProgress}%`}
//               strokeWidth={5}
//               styles={{
//                 root: {
//                   width: '100%',
//                   height: '100%',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                 },
//                 path: {
//                   stroke: `rgba(62, 152, 199, ${
//                     imageFileUploadProgress / 100
//                   })`,
//                 },
//               }}
//             />
//           )}
//           <img
//             src={imageFileUrl || currentUser.profilePicture}
//             alt='user'
//             className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
//               imageFileUploadProgress &&
//               imageFileUploadProgress < 100 &&
//               'opacity-60'
//             }`}
//           />
//         </div>
//         {imageFileUploadError && (
//           <Alert color='failure'>{imageFileUploadError}</Alert>
//         )}
//         <TextInput
//           type='text'
//           id='username'
//           placeholder='username'
//           defaultValue={currentUser.username}
//           onChange={handleChange}
//         />
//         <TextInput
//           type='email'
//           id='email'
//           placeholder='email'
//           defaultValue={currentUser.email} 
//           onChange={handleChange}
//         />
//         <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
//         <Button type='submit' gradientDuoTone='purpleToBlue' outline>
//           Update
//         </Button>
//       </form>

//       <div className='text-red-500 flex justify-between mt-5'>
//       <span onClick={() => setShowModal(true)} className='cursor-pointer'>
//           Delete Account
//         </span>
        
//         <span onClick={handleSignout} className='cursor-pointer'>
//           Sign Out
//         </span>
//       </div>
//       {updateUserSuccess && (
//         <Alert color='success' className='mt-5'>
//           {updateUserSuccess}
//         </Alert>
//       )}
//       {updateUserError && (
//         <Alert color='failure' className='mt-5'>
//           {updateUserError}
//         </Alert>
//       )}
//       {error && (
//         <Alert color='failure' className='mt-5'>
//           {error}
//         </Alert>
//       )}
//       <Modal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         popup
//         size='md'
//       >
//         <Modal.Header />
//         <Modal.Body>
//           <div className='text-center'>
//             <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
//             <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
//               Are you sure you want to delete your account?
//             </h3>
//             <div className='flex justify-center gap-4'>
//               <Button color='failure' onClick={handleDeleteUser}>
//                 Yes, I'm sure
//               </Button>
//               <Button color='gray' onClick={() => setShowModal(false)}>
//                 No, cancel
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }


import {
  Alert,
  Button,
  TextInput,
  Modal,
  ModalBody,
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

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  // Upload Image to Cloudinary
  const uploadImage = async () => {
    setImageFileUploadError(null);
    setImageFileUploadProgress(0);

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dfu1zqt5s/image/upload`;
    const formDataUpload = new FormData();
    formDataUpload.append('file', imageFile);
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
      setImageFileUrl(data.secure_url); // Cloudinary uploaded URL
      setImageFileUploadProgress(100);
      return data.secure_url;
    } catch (error) {
      setImageFileUploadError(error.message);
      setImageFileUploadProgress(null);
      return null;
    }
  };

  // Handle Submit (Update User)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    // Upload Image first if needed
    let uploadedImageUrl = imageFileUrl || currentUser.profilePicture;
    if (imageFile) {
      uploadedImageUrl = await uploadImage();
      if (!uploadedImageUrl) return; // Exit on upload failure
    }

    // Update User Data
    try {
      dispatch(updateStart());
      const res = await fetch(`/Back/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profilePicture: uploadedImageUrl, // Add image URL to payload
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle Account Deletion
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/Back/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // Handle Signout
  const handleSignout = async () => {
    try {
      const res = await fetch('/Back/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* Image Picker */}
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
      </form>

      {/* Delete and Signout */}
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span onClick={handleSignout} className='cursor-pointer'>
          Sign Out
        </span>
      </div>

      {/* Update Alerts */}
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

      {/* Confirmation Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
