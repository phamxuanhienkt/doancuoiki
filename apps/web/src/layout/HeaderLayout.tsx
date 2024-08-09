'use client';
import { useState } from 'react';
import { IoMdSearch } from "react-icons/io";

const Header: React.FC = () => {
  const [showBox, setShowBox] = useState(false);
  const [lognBox, setLognBox] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Thêm trạng thái kiểm tra đăng nhập

  const handleChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setInputValue(value);
    setShowBox(value !== '');
  };

  const toggleLognBox = () => {
    setLognBox(!lognBox);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLognBox(false); // Đóng khung lognBox sau khi đăng xuất
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-sm flex items-center justify-between px-4 py-2 w-full h-[100px] border-1">
      <div className="flex items-center w-[10%]">
        <img src="" alt="TikTok Logo" className="w-8 h-8" />
      </div>
      
      <div className="flex items-center justify-center w-[80%]">
        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={handleChange}
            className="bg-gray-100 rounded-full h-14 pl-4 pr-14 py-2 outline-none border border-transparent focus:border-blue-500 w-full text-lg"
          />
          <IoMdSearch className="absolute top-1/2 transform -translate-y-1/2 right-6 text-gray-400 text-2xl" />
          {showBox && (
            <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-300 rounded-xl shadow-lg p-4 overflow-auto">
              <p className="text-gray-700 text-lg">{inputValue}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center w-[10%] space-x-8">
        {loggedIn ? (
          <>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400">Upload</button>
            <button className="relative">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 20a2 2 0 100-4 2 2 0 000 4zM17 8a7 7 0 10-14 0c0 5.25 7 11 7 11s7-5.75 7-11z"/>
              </svg>
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <div className="relative flex flex-col">
              <button onFocus={toggleLognBox}>
                <img src="public/img/anh-dep-thien-nhien-2-1.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
              </button>
              {lognBox && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-gray-300 rounded-xl shadow-lg p-4">
                  <button onClick={handleLogout} className="w-full text-left px-2 py-1 hover:bg-gray-100">Logout</button>
                  <button onClick={handleLogout} className="w-full text-left px-2 py-1 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400">Login</button>
        )}
      </div>
    </header>
  );
};

export default Header;
