"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import LoginForm from "./login"; // Đảm bảo đúng đường dẫn
import RegisterForm from "./Register"; // Đảm bảo đúng đường dẫn
import LoggedInView from "./LoggedInView"; // Đảm bảo đúng đường dẫn

const Onboarding = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    birthDate: "",
    hobbies: "",
    freeTime: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter(); // Khởi tạo useRouter

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (formData.email && formData.password) {
      setIsLoggedIn(true);
      setErrorMessage("");
      router.push("/"); // Chuyển hướng tới trang Home
    } else {
      setErrorMessage("Please fill in both email and password.");
    }
  };

  const handleRegister = () => {
    if (
      formData.fullName &&
      formData.email &&
      formData.password &&
      formData.birthDate
    ) {
      setIsLoggedIn(true);
      setErrorMessage("");
      router.push("/"); // Chuyển hướng tới trang Home
    } else {
      setErrorMessage("Please fill in all required fields.");
    }
  };

  if (isLoggedIn) {
    return <LoggedInView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg border-t-8 border-blue-400">
        {!isRegistering ? (
          <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
        )}
      </div>
    </div>
  );
};

export default Onboarding;
