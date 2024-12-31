import React, { useState } from "react";
import InputField from "./InputField"; // Đảm bảo đường dẫn đúng

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    birthDate: "",
    hobbies: "",
    freeTime: "",
    phone: "", // Thêm trường phone vào đây
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Đăng ký thành công!");
        onSwitchToLogin(); // Chuyển sang trang đăng nhập
      } else {
        setErrorMessage(data.error || "Đăng ký thất bại.");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName !== "" && formData.phone !== ""; // Kiểm tra thêm trường phone
      case 2:
        return formData.email !== "" && formData.password !== "";
      case 3:
        return formData.birthDate !== "";
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      setErrorMessage("Vui lòng hoàn thành thông tin trước khi tiếp tục.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-purple-700 text-center">
        Register
      </h2>
      <p className="text-gray-600 text-center mt-2 mb-6">
        Fill in the form below to create an account.
      </p>
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <InputField
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </>
        )}

        {currentStep === 3 && (
          <>
            <InputField
              label="Date of Birth"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
            />
            <InputField
              label="Hobbies"
              placeholder="Enter your hobbies"
              value={formData.hobbies}
              onChange={(e) => handleChange("hobbies", e.target.value)}
            />
            <InputField
              label="Free Time"
              placeholder="When are you free? (e.g., evenings, weekends)"
              value={formData.freeTime}
              onChange={(e) => handleChange("freeTime", e.target.value)}
            />
          </>
        )}
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="w-full py-3 px-6 rounded-lg font-semibold text-sm bg-gray-500 text-white"
          >
            Back
          </button>
        )}

        {currentStep < 3 ? (
          <button
            onClick={nextStep}
            className="w-full py-3 px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-500 to-purple-700 text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="w-full py-3 px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-purple-500 to-purple-700 text-white"
          >
            Register
          </button>
        )}
      </div>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          className="text-blue-600 font-semibold"
          onClick={onSwitchToLogin}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
