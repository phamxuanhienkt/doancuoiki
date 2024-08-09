'use client';
import { useState } from 'react';

const VideoPlayer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-200">
        {/* Video Player */}
        <div className="relative w-full max-w-lg h-full bg-black">
          <video
            src="app/web/public/video"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
          <button 
            onClick={handlePlayPause} 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-4">
        <p className="text-gray-700 text-lg">Video Description</p>
      </div>
      <div className="flex items-center justify-center bg-gray-800 text-white p-2">
        <span>Time: {currentTime}s</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
