import React from 'react';
import { IoMdSearch } from "react-icons/io";


const Body: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-md flex items-center justify-between px-4 py-2 w-full h-[100px]">
      <div className="flex items-center w-[10%] space-x-4">
        <img src="" alt="TikTok Logo" className="w-8 h-8" />
        
      </div>
      <div className="flex w-[30%] h-[60%] ">
      <div className="relative flex items-center w-full ">
        <IoMdSearch className="absolute left-2 text-gray-500" />
        <input 
          type="text"
          placeholder="Search"
          className="bg-gray-100 rounded-full h-full pl-10 pr-4 py-1 outline-none focus:ring-2 focus:ring-blue-500 w-[80%]"
        />
      </div>
    </div>
   

      
      <div className="flex items-center space-x-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400">Upload</button>
        <button className="relative">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 20a2 2 0 100-4 2 2 0 000 4zM17 8a7 7 0 10-14 0c0 5.25 7 11 7 11s7-5.75 7-11z"/>
          </svg>
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </button>
        <button><img src="public/img/anh-dep-thien-nhien-2-1.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" /></button>
        
      </div>
    </header>
  );
};

export default Body;
    