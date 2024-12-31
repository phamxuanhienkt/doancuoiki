"use client";

import { VideoCard } from "@/components/button";
import { useState, useEffect } from "react";

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<
    { title: string; views: number; videoPath: string; earnings?: number }[]
  >([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/video");
        const data = await response.json();

        // Sắp xếp theo lượt xem giảm dần và lấy 3 video đầu tiên
        const sortedVideos = data
          .map((video: any) => ({
            title: video.title,
            views: video.views || 0,
            videoPath: video.videoPath,
            earnings: video.earnings || 0.002, // Giá trị mặc định nếu không có
          }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 3);

        setVideos(sortedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">
          Top 3 Video Xem Nhiều Nhất
        </h2>
        <ul className="divide-y divide-gray-200">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              views={video.views}
              earnings={video.earnings}
              videoSrc={video.videoPath} // Truyền đường dẫn video
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoList;
