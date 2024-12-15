import React from 'react';
import image1 from '../abt.png';
import image2 from '../abtcover.jpg';

const AboutUs = () => {
  return (
    <div className="bg-blue-50">
      {/* About Us Banner */}
      <section 
        className="relative bg-cover bg-center h-80" 
        style={{ backgroundImage: `url(${image2})` }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-70"></div> {/* Reduced opacity */}
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div>
            <h1 className="text-5xl font-bold"><u>About Us</u></h1>
            <p className="mt-4 text-xl text-semi-bold">Welcome to CampusLink, where we connect students across the campus.</p>
            <div className="mt-6">
              <a href="#who-we-are" className="text-white text-2xl">
                <i className="fas fa-arrow-down"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Behind the Project */}
      <section id="who-we-are" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">Behind the Project</h2>
              <p className="mt-4 text-lg text-gray-600">
                We are two undergraduate students currently pursuing a BSc Special Degree in Computer Science at the University of Ruhuna. With a passion for technology and a drive to improve student life, we embarked on this project to build a platform that connects our campus community in new and exciting ways.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6">
              {/* Increased image size */}
              <div className="w-80 h-64 bg-blue-200 rounded-md overflow-hidden">
                <img src={image1} alt="us" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Our Mission</h2>
          <p className="mt-4 text-lg">
            Our goal is simple: to create a space where students can easily access all the resources they need – from events and clubs to announcements and lost items. We want to make sure everyone has the chance to participate in campus life, no matter how busy their schedule is.
          </p>
        </div>
      </section>

      {/* The Journey So Far */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-blue-900 text-center">The Journey So Far</h2>
          <div className="mt-10">
            <div className="flex items-start space-x-8 mt-8">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">1</div>
              <div className="text-lg text-gray-600">
                <p><strong>Initial Idea:</strong> It all started with a simple idea: what if we could bring everything happening around campus into one place? From that spark, CampusLink was born.</p>
              </div>
            </div>
            <div className="flex items-start space-x-8 mt-8">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">2</div>
              <div className="text-lg text-gray-600">
                <p><strong>Development:</strong> Over countless hours of coding, brainstorming, and testing, we turned our idea into reality. We’ve learned more than we ever thought possible – about teamwork, innovation, and solving real-world problems through technology.</p>
              </div>
            </div>
            <div className="flex items-start space-x-8 mt-8">
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">3</div>
              <div className="text-lg text-gray-600">
                <p><strong>Launch:</strong> CampusLink is now a reality and is helping connect students and enhance campus life for everyone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision for the Future */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold">Our Vision for the Future</h2>
          <p className="mt-4 text-lg">
            We’re just getting started! Our dream is to continue improving CampusLink, adding new features, and expanding it beyond our campus. We envision this platform becoming the go-to resource for students everywhere, enhancing campus life and keeping everyone informed and engaged.
          </p>
        </div>
      </section>

      {/* Our Department */}
      <section className="py-16 bg-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-900">Our Department</h2>
          <p className="mt-4 text-lg text-gray-600">
            The Department of Computer Science at the University of Ruhuna has played an integral role in shaping our skills and passion for technology. From theoretical concepts to practical problem-solving, the department has provided us with the foundation we needed to take on this ambitious project.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            We’re grateful for the guidance and support we’ve received from our professors and peers, who’ve encouraged us every step of the way.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
