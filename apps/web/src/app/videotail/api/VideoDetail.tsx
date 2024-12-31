import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface VideoData {
  _id: string;
  title: string;
  description: string;
  videoPath: string;
  views: number;
}

const VideoDetail: React.FC = () => {
  const { id } = useParams(); // Lấy videoId từ URL
  const [video, setVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    if (id) {
      // Lấy thông tin video từ API dựa trên video ID
      const fetchVideo = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/video/${id}`);
          const data = await response.json();
          setVideo(data);

          // Tăng lượt xem
          await fetch(`http://localhost:5000/api/video/${id}/increment-views`, {
            method: 'PUT',
          });
        } catch (error) {
          console.error('Error fetching video:', error);
        }
      };

      fetchVideo();
    }
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
      <video className="w-full rounded-lg" controls autoPlay>
        <source src={video.videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p className="mt-4">{video.description}</p>
      <p className="mt-2 text-sm">Views: {video.views}</p>
    </div>
  );
};

export default VideoDetail;
