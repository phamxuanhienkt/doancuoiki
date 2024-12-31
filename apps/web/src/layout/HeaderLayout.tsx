"use client";
import { useEffect, useState, useRef } from "react";
import { IoMdSearch } from "react-icons/io";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  birthDate: string;
  hobbies: string;
  freeTime: string;
  avatar?: string; // Nếu có ảnh đại diện
}

const Header: React.FC = () => {
  const [showBox, setShowBox] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Ref cho menu
  const avatarRef = useRef<HTMLButtonElement>(null); // Ref cho avatar
  const { push } = useRouter();

  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setInputValue(value);
    setShowBox(value !== "");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      push("/onboarding");
      return;
    }

    fetch("http://localhost:5000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu người dùng:", err));
  }, [push]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) && // Kiểm tra nếu click không nằm trong menu
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node) // Kiểm tra nếu click không nằm trong avatar
      ) {
        setShowProfileMenu(false); // Đóng menu
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    push("/onboarding");
  };

  const fullName = user?.fullName || "Guest";

  return (
    <header className="rounded-sm flex items-center justify-between px-4 py-2 w-full h-[100px] border-b-2 border-blue-400">
      {/* Logo TikTok */}
      <div className="flex items-center w-[10%] cursor-pointer" onClick={() => push("/")}>
        <img src="/img/ava.jpg" className="w-8 h-8" />
      </div>

      {/* Thanh tìm kiếm */}
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

      {/* Profile Section */}
      <div className="flex items-center w-[10%] space-x-8">
        {localStorage.getItem("token") ? (
          <div className="relative">
            {/* Avatar */}
            <button
              ref={avatarRef} // Thêm ref cho avatar
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="rounded-full focus:outline-none hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              <img
                src={user?.avatar || "/img/ava.jpg"}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
              />
            </button>

            {/* Profile Menu */}
            {showProfileMenu && (
              <div
                ref={menuRef} // Thêm ref cho menu
                className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50"
              >
                {/* Avatar và Tên */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={user?.avatar || "/img/ava.jpg"}
                    alt="Avatar"
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <span className="block text-lg font-bold text-gray-800">{fullName}</span>
                    <span className="block text-sm text-gray-500">Personal Profile</span>
                  </div>
                </div>

                {/* Menu */}
                <ul className="space-y-3">
                  <li
                    className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center rounded-lg"
                    onClick={() => push("/profile")}
                  >
                    <FiUser className="mr-3 text-gray-600" />
                    <span>Personal Info</span>
                  </li>
                  <li className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center rounded-lg">
                    <FiSettings className="mr-3 text-gray-600" />
                    <span>Settings</span>
                  </li>
                  <li
                    className="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center rounded-lg text-red-500"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="mr-3" />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => push("/onboarding")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
