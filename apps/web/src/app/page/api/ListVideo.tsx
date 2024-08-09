import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const VideoList: React.FC = () => {
  const videos = [
    { title: 'Video Title 1', description: 'Description for video 1.' },
    { title: 'Video Title 2', description: 'Description for video 2.' },
    { title: 'Video Title 3', description: 'Description for video 3.' },
  ];

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Video đề xuất</h2>
        <ul className="divide-y divide-gray-200 rounded-full">
          {videos.map((video, index) => (
            <li key={index} className="py-4 flex items-center">
               <div className="flex-shrink-0">
                <FaPlay className="h-6 w-6 text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-lg font-medium text-gray-900">{video.title}</p>
                <p className="text-sm text-gray-500">{video.description}</p>
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoList;
