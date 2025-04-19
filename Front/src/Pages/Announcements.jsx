import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'


function Announcements() {

  const [announcements , setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);


  useEffect(()=>{

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/Back/announcement/get-announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();



  },[]);

  const handleViewAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
  };

  return (
    
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Announcements</h1>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="p-4 border border-gray-300 rounded-md shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleViewAnnouncement(announcement)}
          >
            <h2 className="text-xl font-bold">{announcement.title}</h2>
            <p className="text-gray-600">{announcement.message.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500">Category: {announcement.category}</p>
            <p className="text-sm text-gray-500">Priority: {announcement.priority}</p>
          </div>
        ))}
      </div>

      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedAnnouncement.title}</h2>
            <p className="mb-4">{selectedAnnouncement.message}</p>
            <p className="text-sm text-gray-500 mb-4">Category: {selectedAnnouncement.category}</p>
            <p className="text-sm text-gray-500 mb-4">Priority: {selectedAnnouncement.priority}</p>
            <div className="mb-4">
              <h3 className="font-bold mb-2">Attachments:</h3>
              {selectedAnnouncement.attachments.map((file, index) => (
                <div key={index}>
                  <a
                    href={`http://localhost:5000/${file.fileUrl}`} // Adjust the URL based on your server
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {file.filename}
                  </a>
                </div>
              ))}
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

    <Link to = {'/create-announcement'}>

     <Button type='button' gradientDuoTone='purpleToPink' className='w-full h-2xl transition duration-300 transform hover:scale-105'>
        create Annonouncement
     </Button>


     </Link>
    </div>



      



    
  )
}

export default Announcements