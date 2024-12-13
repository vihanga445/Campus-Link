import React, { useRef } from 'react';
import event1 from "../ev1.jpg";
import event2 from "../ev2.jpg";
import event3 from "../ev3.jpg";
import event4 from "../ev4.jpg";
import event5 from "../ev5.jpg";

const UpcomingEventsCarousel = () => {
  const events = [
    {
      type: 'Open Event',
      title: 'Inter University Weightlifting Championship 2024',
      time: 'Fri, Dec 30, 2024 at 8:00 AM',
      location: 'University of Ruhuna Gymnasium',
      description: 'InterUniversityGames2024',
      attendees: 54,
      image: event1,
    },
    {
      type: 'Open Event',
      title: '31st General Convocation 2024',
      time: 'Mon & Tue, Jan 13 & 14 2024 at 8:00 AM',
      location: 'Rabindranath Tagore Memorial Auditorium)',
      description: 'University Of Ruhuna',
      attendees: 500,
      image: event2,
    },
    {
      type: 'Open Event',
      title: 'First Aid Training Program',
      time: 'Fri, Jan 23, 2024 at 10:30 AM',
      location: 'Alawaththagoda Hall',
      description: 'Organized by Ruhuna University Mathematics and Statistics Society',
      attendees: 50,
      image: event3,
    },
    {
      type: 'Private Event',
      title: 'Annual General Meeting of the Catholic Students society',
      time: 'Wed, Jan 25, 2024 at 12:00 PM',
      location: 'National Shrine of Our Lady Matara',
      description: 'CSM of Ruhuna',
      attendees: 30,
      image: event4,
    },
    {
      type: 'Open Event',
      title: '"SEHANSA" Book Release',
      time: 'Tue, Jan 30, 2024 at 10:00 AM',
      location: 'CS Auditorium',
      description: 'By Naduni Nirasha',
      attendees: 100,
      image: event5,
    },
  ];

  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -300, // Adjust the scroll distance
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 300, // Adjust the scroll distance
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative my-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold ">Upcoming Events</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 opacity-70 transition ml-auto mr-10">
          All Events
        </button>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
          onClick={scrollLeft}
        >
          &#8249;
        </button>

        {/* Carousel Container */}
        <div
          className="flex overflow-x-auto space-x-6 scrollbar-hide"
          ref={carouselRef}
        >
          {events.map((event, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white shadow-xl rounded-lg"

              style={{ width: '300px' }}
            >
              <div
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>
              <div className="p-4">
                <span
                  className={`inline-block px-2 py-1 text-sm rounded-full ${
                    event.type === 'Open Event'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {event.type}
                </span>
                <h3 className="text-lg font-bold mt-2">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.time}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
                <p className="text-sm mt-2 text-gray-700">{event.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-gray-500">
                    <span className="text-sm">👥 {event.attendees}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-md opacity-75 hover:opacity-100"
          onClick={scrollRight}
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default UpcomingEventsCarousel;
