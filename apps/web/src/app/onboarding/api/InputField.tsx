// InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  type?: string; // type mặc định là "text"
  placeholder?: string; // placeholder tùy chọn
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder = "Enter value", // Placeholder mặc định
  value,
  onChange,
}) => (
  <div>
    <label className="block font-medium text-gray-700">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default InputField;
