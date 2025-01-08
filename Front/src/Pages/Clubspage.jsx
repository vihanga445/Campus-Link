import React, { useState, useEffect } from "react";

const clubsData = [
  {
    id: 1,
    name: "Coding Club",
    description: "Join our Coding Club to enhance your programming skills, participate in hackathons, and collaborate on projects with fellow students.",
    meetingTime: "Every Wednesday, 4:00 PM",
    location: "Tech Lab, Room 102",
  },
  {
    id: 2,
    name: "Photography Society",
    description: "Passionate about capturing moments? Our Photography Society organizes workshops and photo walks for students of all skill levels.",
    meetingTime: "Every Friday, 3:00 PM",
    location: "Art Studio, Room 205",
  },
  {
    id: 3,
    name: "Drama Club",
    description: "Express yourself through theater and drama! Our Drama Club holds regular rehearsals and performances throughout the semester.",
    meetingTime: "Every Tuesday, 6:00 PM",
    location: "Auditorium, Main Stage",
  },
  {
    id: 4,
    name: "Debate Club",
    description: "Develop your public speaking and debate skills. Join the Debate Club and participate in friendly debates and competitions.",
    meetingTime: "Every Thursday, 5:00 PM",
    location: "Lecture Hall, Room 303",
  },
];

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    setClubs(clubsData);
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Clubs & Societies</h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2">{club.name}</h2>
            <p className="mt-4 text-gray-800">{club.description}</p>
            <p className="text-gray-600 mt-4">
              <strong>Meeting Time:</strong> {club.meetingTime}
            </p>
            <p className="text-gray-600">
              <strong>Location:</strong> {club.location}
            </p>
            <button className="mt-4 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg">
              Join Club
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
