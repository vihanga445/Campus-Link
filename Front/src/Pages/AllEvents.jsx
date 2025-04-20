import React, { useEffect, useState } from "react";

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/Back/post/get-all-events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Delete event
  const handleDelete = async () => {
    try {
      const response = await fetch(`/Back/post/${eventToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      setEvents((prev) => prev.filter((event) => event._id !== eventToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-4 text-center">All Events</h1>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Event Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b">
                <td className="p-4">
                  <a href={`/post/${event.slug}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 object-cover rounded-md hover:opacity-80"
                    />
                  </a>
                </td>
                <td className="p-4">{event.title}</td>
                <td className="p-4">{new Date(event.eventDetails.date).toLocaleDateString()}</td>
                <td className="p-4 flex justify-center gap-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => {
                      setEventToDelete(event._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4">Delete Event</h2>
              <p>Are you sure you want to delete this event?</p>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllEvents;