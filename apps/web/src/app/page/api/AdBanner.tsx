"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const AdBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible);
    }, 5000); // Toggle visibility every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setVisible(false); // Hide the banner
    router.push("/gift"); // Navigate to the Quiz Game page
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg transition-transform duration-500 ${
        visible ? "translate-x-0" : "translate-x-full"
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
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Tham gia ngay
      </button>
    </div>
  );
};

export default AdBanner;
