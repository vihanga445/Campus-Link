import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch events data from the backend API
    axios
      .get("http://localhost:5000/Back/events") // URL of the backend API
      .then((response) => {
        setEvents(response.data); // Set events state with fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError("Failed to load events"); // Handle error
        setLoading(false);
      });
  }, []); // Empty array means this effect runs only once when component mounts

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h2>{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
