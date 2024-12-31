interface VideoCardProps {
  title: string;
  views: number;
  earnings?: number; // earnings là tùy chọn
  videoSrc: string; // Đường dẫn video
  className?: string; // className là tùy chọn
}

export const VideoCard: React.FC<VideoCardProps> = ({
  title,
  views,
  earnings = 0.002, // Giá trị mặc định
  videoSrc,
  className,
}) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 m-4 w-80 ${className}`}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Views: {views}</span>
        <span className="text-green-500">Earnings: ${earnings.toFixed(3)}</span>
      </div>
      <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={videoSrc}
          controls // Hiển thị các nút điều khiển video
        >
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>
    </div>
  );
};
