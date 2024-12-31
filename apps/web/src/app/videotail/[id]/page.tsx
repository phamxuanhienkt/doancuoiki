"use client";

import AdsterraBanner from "@/app/page/api/add";
import Timer from "@/app/page/api/Timer";
import { VideoCardProps } from "@/components/videopro";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface VideoData {
  _id: string;
  title: string;
  description: string;
  videoPath: string;
  views: number;
}

const Page = () => {
  const { id } = useParams();
  const [video, setVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/video/" + id);
        const data = await response.json();
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  const incrementVideoViews = async (videoId: string) => {
    try {
      await fetch(`http://localhost:5000/api/video/${videoId}/increment-views`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error incrementing video views:", error);
    }
  };

  if (!video) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="">
    <div className="min-h-screen bg-gray-100 flex flex-row items-center p-6  mx-auto ">
      <div className="flex flex-row w-full justify-between ">
        {/* Quảng cáo bên trái */}
         <div className="hidden lg:block w-1/4">
          <AdsterraBanner />
        </div> 

        {/* Nội dung chính */}
        <div className="flex-grow flex flex-col bg-white shadow-lg rounded-lg p-6 mx-4 justify-center">
       
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">{video.title}</h1>
          <VideoCardProps
            title={video.title}
            views={video.views}
            videoSrc={video.videoPath} // Truyền đường dẫn video
          />
        </div>

        {/* Quảng cáo bên phải */}
       
        <div className="hidden lg:flex w-1/4 justify-end flex-col">
        <Timer/>
          <AdsterraBanner />
        </div> 
      </div>
    </div>
    </div>
  );
};

export default Page;
