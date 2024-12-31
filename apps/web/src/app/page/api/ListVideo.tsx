"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

interface VideoData {
  _id: string;
  title: string;
  description: string;
  videoPath: string;
  views: number; // Thêm trường lượt xem
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/video");
        const data: VideoData[] = await response.json();

        // Sắp xếp video theo lượt xem giảm dần và lấy 3 video đầu tiên
        const topVideos = data.sort((a, b) => b.views - a.views).slice(0, 3);
        setVideos(topVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6">
        <h3 className="text-3xl font-bold text-white mb-6 text-center">
        Top 3 Most Viewed Videos
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {videos.map((video) => (
          <li key={video._id} className="p-4 flex items-center hover:bg-gray-50 transition">
            <Link href={`/videotail/${video._id}`}>
              <div className="flex items-center space-x-4">
                {/* Biểu tượng Play */}
                <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-md">
                  <FaPlay className="text-white text-xl" />
                </div>

                {/* Thông tin Video */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {video.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {video.description}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {video.views.toLocaleString()} lượt xem
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
