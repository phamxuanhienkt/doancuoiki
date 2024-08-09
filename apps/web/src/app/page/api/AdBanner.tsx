"use client";
import React, { useEffect, useState } from 'react';

const AdBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(prevVisible => !prevVisible);
    }, 5000); // Thay đổi trạng thái hiển thị sau mỗi 5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg transition-transform duration-500 ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between">
        <span>Quảng cáo đặc biệt!</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-4 bg-red-500 text-white rounded-full p-1"
        >
          &times;
        </button>
      </div>
      <p className="mt-2">Đừng bỏ lỡ cơ hội đặc biệt này!</p>
    </div>
  );
};

export default AdBanner;
