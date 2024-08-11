// components/VideoCard.tsx
'use client';

import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

type VideoCardProps = {
  title: string;
  description: string;
  views: number;
  earnings: number;
};

export const VideoCard: React.FC<VideoCardProps> = ({ title, description, views, earnings }) => {
  return (
    <li className="py-4 flex items-center">
      <div className="flex-shrink-0">
        <FaPlay className="h-6 w-6 text-gray-500" />
      </div>
      <div className="ml-3">
        <p className="text-lg font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-500">Views: {views}</p>
        <p className="text-sm text-gray-500">Earnings: ${earnings.toFixed(2)}</p>
      </div>
      <div className="ml-auto flex space-x-3">
        <button>
          <FaPlay className="h-5 w-5 text-green-500" />
        </button>
        <button>
          <FaPause className="h-5 w-5 text-yellow-500" />
        </button>
        <button>
          <FaStop className="h-5 w-5 text-red-500" />
        </button>
      </div>
    </li>
  );
};
