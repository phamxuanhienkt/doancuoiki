interface VideoCardProps {
    title: string;
    views: number;
    earnings?: number; // Earnings là tùy chọn
    videoSrc: string; // Đường dẫn video
    className?: string; // className là tùy chọn
  }
  
  export const VideoCardProps: React.FC<VideoCardProps> = ({
    title,
    views,
    earnings = 0.002, // Giá trị mặc định
    videoSrc,
    className,
  }) => {
    return (
      <div
        className={`bg-white shadow-lg h-[600px] rounded-xl p-6 mx-auto max-w-4xl ${className}`}
      >
        {/* Title */}
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
  
        {/* Views and Earnings */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg text-gray-600">
            <strong className="font-semibold">Views:</strong> {views}
          </span>
          <span className="text-lg text-green-600">
            <strong className="font-semibold">Earnings:</strong> $
            {earnings.toFixed(3)}
          </span>
        </div>
  
        {/* Video Section */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <video
            className="w-full h-full object-cover rounded-lg"
            src={videoSrc}
            controls // Hiển thị các nút điều khiển video
          >
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
        </div>
      </div>
    );
  };
  