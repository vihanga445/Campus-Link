import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const AnnouncementsCarousel = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/Back/announcement/latest");
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="my-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="mx-8 text-3xl font-bold">Latest Announcements</h2>
        <Link to="/announcements">
        <button className="bg-blue-800 text-white py-2 px-4 rounded-lg shadow-lg transition ml-auto mr-10">
          See All Announcements
        </button>
        </Link>
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
              <p className="text-md">{announcement.message}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AnnouncementsCarousel;
