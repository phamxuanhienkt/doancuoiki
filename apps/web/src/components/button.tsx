"use client";
import React from 'react';

interface VideoCardProps {
  title: string;
  views: number;
  earnings: number;
  className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, views, earnings, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 m-4 w-80 ${className}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Views: {views}</span>
        <span className="text-green-500">Earnings: ${earnings.toFixed(2)}</span>
      </div>
      <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
        {/* Placeholder for video thumbnail */}
        <span className="text-gray-400">Video Thumbnail</span>
      </div>
    </div>
  );
};
