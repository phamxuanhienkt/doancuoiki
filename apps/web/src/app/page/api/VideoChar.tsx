// components/VideoList.tsx
"use client";

import { VideoCard } from "@/components/button";

const VideoChar: React.FC = () => {
  const videos = [
    {
      title: "Video Title 1",
      description: "Description for video 1.",
      views: 1500,
      earnings: 10.25,
    },
    {
      title: "Video Title 2",
      description: "Description for video 2.",
      views: 3000,
      earnings: 20.5,
    },
    {
      title: "Video Title 3",
      description: "Description for video 3.",
      views: 4500,
      earnings: 30.75,
    },
  ];

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Video Cho Ban</h2>
        <ul className="divide-y divide-gray-200 rounded-full">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              views={video.views}
              earnings={video.earnings}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoChar;
