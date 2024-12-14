import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

const AnnouncementsCarousel = () => {
  const announcements = [
    {
      title: "Annual Sports Day - Registration Open!",
      description: "Register now for the upcoming Annual Sports Day happening on Nov 15th.",
    },
    {
      title: "Tech Talk Series - AI and the Future",
      description: "Join our guest speakers to discuss AI advancements in industry and research.",
    },
    {
      title: "Blood Donation Camp by Rotaract Club",
      description: "Participate in the blood donation camp on Oct 28th at the Faculty Hall.",
    },
    {
      title: "New Yoga Classes Available",
      description: "Weekly yoga classes for students. Register soon, slots limited!",
    },
    {
      title: "Hackathon 2024 - Early Bird Registration",
      description: "Gear up for Hackathon 2024 and showcase your coding skills.",
    },
  ];

  return (
    <div className="my-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold">Latest Announcements</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 opacity-70 transition ml-auto mr-10">
          See All Announcements
        </button>
      </div>

      {/* Swiper Carousel */}
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000, // Slides every 3 seconds
          disableOnInteraction: false, // Allows manual sliding without stopping autoplay
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {announcements.map((announcement, index) => (
          <SwiperSlide key={index} style={{ width: "320px" }}>
            <div
              className="p-6 rounded-lg text-center shadow-xl"
              style={{
                backgroundColor: "#1E3A8A", // Deep blue background
                color: "#FFFFFF", // White text
              }}
            >
              <h3 className="text-2xl font-bold mb-2">{announcement.title}</h3>
              <p className="text-md">{announcement.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AnnouncementsCarousel;
