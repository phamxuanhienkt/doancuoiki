"use client"
import React, { useState } from "react";
import InputField from "./InputField"; // Đảm bảo đường dẫn đúng
import { useRouter } from "next/navigation"; // Import useRouter

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onLoginSuccess: (fullName: string) => void;
  children?: React.ReactNode;
  className?: string;

}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchToRegister,
  
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { push } = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Lưu thông tin người dùng vào localStorage hoặc context
        localStorage.setItem("token", data.token); // Lưu token vào localStorage
        localStorage.setItem("fullName", data.user.fullName); // Lưu tên đầy đủ vào localStorage

        //   onLoginSuccess(data.user.fullName); // Gọi callback để hiển thị tên đầy đủ trên Header
        push("/");
        console.log("Login successful!");
      } else {
        setErrorMessage(data.error || "Incorrect account or password");
      }
    } catch (error) {
      setErrorMessage("Incorrect account or password");
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-blue-700 text-center">
        Login
      </h2>
      <p className="text-gray-600 text-center mt-2 mb-6">
        Please enter your email and password to continue.
      </p>
      <div className="space-y-6">
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      <button
        className="mt-4 w-full py-3 px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-blue-500/50"
        onClick={handleLogin}
      >
        Login
      </button>
      <p className="text-center text-gray-600 mt-4">
      <p>{"Don't forget to login!"}</p>
        <button
          className="text-blue-600 font-semibold"
          onClick={onSwitchToRegister}
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
