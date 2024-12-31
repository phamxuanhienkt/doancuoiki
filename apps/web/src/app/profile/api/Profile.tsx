"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { abi, contractAddress } from "@/config";
import { formatEther } from "viem";


const ProfilePage = () => {
  interface User {
    fullName: string;
    email: string;
    phone?: string;
    birthDate: string;
    hobbies: string;
    freeTime: string;
    avatar?: string; // Nếu có ảnh đại diện
  }

  const [coins, setCoins] = useState("0");
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
    phone: "",
    hobbies: "",
    freeTime: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { address } = useAccount();
  const { data } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address],
  });

  const router = useRouter();
 

  useEffect(() => {
    setCoins(formatEther(BigInt((data ?? "0") as string)));
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập.");
      router.push("/onboarding");
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
        setUpdatedData({
          fullName: data.fullName || "",
          email: data.email || "",
          password: "",
          birthDate: data.birthDate || "",
          phone: data.phone || "",
          hobbies: data.hobbies || "",
          freeTime: data.freeTime || "",
        });
      })
      .catch((err) => console.error("Lỗi khi lấy dữ liệu người dùng:", err));
  }, [router]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setIsEditing(false);
      })
      .catch((err) => console.error("Lỗi khi cập nhật hồ sơ:", err));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      alert("Vui lòng chọn file để tải lên!");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/upload-avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUser( data.user);
        alert("Tải lên ảnh đại diện thành công!");
      } else {
        console.error(data.message);
        alert("Lỗi khi tải lên ảnh đại diện.");
      }
    } catch (error) {
      console.error("Lỗi khi tải lên:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Đã đăng xuất.");
    router.push("/onboarding");
  };

  if (!user)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Đang tải...
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-purple-200 via-white to-purple-100 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-10">
          <img
            alt="Avatar người dùng"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 mb-6 shadow-md"
            src={user.avatar || "/img/ava.jpg"} // Ảnh mặc định nếu không có avatar
          />
          <h1 className="text-3xl font-bold text-gray-800">Số dư: {coins}</h1>
          {isEditing ? (
            <input
              type="text"
              value={updatedData.fullName}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, fullName: e.target.value })
              }
              className="text-3xl font-semibold text-center text-gray-800 mb-4 border-b-2 border-gray-300 outline-none"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-800">
              {user.fullName}
            </h1>
          )}
          <p className="text-lg text-gray-600">{user.email}</p>

          {isEditing && (
            <div className="flex flex-col items-center space-y-4 mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-gray-600"
              />
              <button
                onClick={handleUploadAvatar}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-400"
              >
                Tải lên ảnh đại diện
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          <div>
            <strong className="text-gray-800">Ngày sinh:</strong>{" "}
            {isEditing ? (
              <input
                type="date"
                value={updatedData.birthDate}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, birthDate: e.target.value })
                }
                className="border p-3 rounded-lg w-full text-gray-800"
              />
            ) : (
              user.birthDate || "Chưa có thông tin"
            )}
          </div>
          <div>
            <strong className="text-gray-800">Số điện thoại:</strong>{" "}
            {isEditing ? (
              <input
                type="tel"
                value={updatedData.phone}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, phone: e.target.value })
                }
                className="border p-3 rounded-lg w-full text-gray-800"
              />
            ) : (
              user.phone || "Chưa có thông tin"
            )}
          </div>
          <div>
            <strong className="text-gray-800">Sở thích:</strong>{" "}
            {isEditing ? (
              <textarea
                value={updatedData.hobbies}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, hobbies: e.target.value })
                }
                className="border p-3 rounded-lg w-full text-gray-800"
                rows={4}
              />
            ) : (
              user.hobbies || "Chưa có thông tin"
            )}
          </div>
          <div>
            <strong className="text-gray-800">Thời gian rảnh:</strong>{" "}
            {isEditing ? (
              <textarea
                value={updatedData.freeTime}
                onChange={(e) =>
                  setUpdatedData({ ...updatedData, freeTime: e.target.value })
                }
                className="border p-3 rounded-lg w-full text-gray-800"
                rows={4}
              />
            ) : (
              user.freeTime || "Chưa có thông tin"
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              className="w-full py-4 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-400"
            >
              Lưu thay đổi
            </button>
          ) : (
            <button
              onClick={handleEditProfile}
              className="w-full py-4 rounded-lg bg-blue-500 text-white font-semibold text-lg hover:bg-blue-400"
            >
              Chỉnh sửa hồ sơ
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full py-4 rounded-lg bg-red-500 text-white font-semibold text-lg hover:bg-red-400"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
