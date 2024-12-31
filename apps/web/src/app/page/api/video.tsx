"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";

interface VideoData {
  _id: string;
  title: string;
  description: string;
  videoPath: string;
  views: number;
}

const VideoPlayerSwiper: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/video");
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoEnd = async (_id: string) => {
    try {
      await fetch(`http://localhost:5000/api/video/${_id}/increment-views`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error incrementing video views:", error);
    }
  };

  return (
    <div className="h-[600px] mt-32 bg-black flex items-center">
      <Swiper
        modules={[Navigation, Pagination, Mousewheel]}
        direction="vertical"
        pagination={{ clickable: true }}
        loop
        spaceBetween={0}
        slidesPerView={1}
        mousewheel={true}
        className="swiper-container"
      >
        {videos.map((video) => (
          <SwiperSlide key={video._id} className="swiper-slide ">
            <div className=" flex items-center justify-center">
              <video
                className="max-w-full object-cover"
                src={video.videoPath.replaceAll('"', "")}
                autoPlay
                loop
                playsInline
                onEnded={() => handleVideoEnd(video._id)}
              />
              <div className="absolute bottom-10 left-5 text-white bg-black bg-opacity-50 p-4 rounded-lg">
                <h2 className="text-xl font-bold">{video.title}</h2>
                <p className="text-sm">{video.description}</p>
                <div className="text-sm mt-2">Lượt xem: {video.views}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoPlayerSwiper;
