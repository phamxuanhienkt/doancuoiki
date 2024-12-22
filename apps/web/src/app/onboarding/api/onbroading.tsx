"use client";

import { useState } from "react";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    country: "",
    phoneNumber: "",
    hobbies: "",
    favoriteVideoType: "",
    occupation: "",
    bankDetails: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => (prev < 3 ? prev + 1 : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg border-t-8 border-blue-400">
        {step === 1 && (
          <Step1 formData={formData} onChange={handleChange} />
        )}
        {step === 2 && (
          <Step2 formData={formData} onChange={handleChange} />
        )}
        {step === 3 && (
          <Step3 formData={formData} onChange={handleChange} />
        )}

        <div className="flex justify-between mt-8">
          <button
            className={`py-3 px-6 rounded-lg font-semibold text-sm ${
              step === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg hover:shadow-purple-500/50"
            }`}
            onClick={prevStep}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            className="py-3 px-6 rounded-lg font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-blue-500/50"
            onClick={nextStep}
          >
            {step === 3 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Step1 = ({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (field: string, value: string) => void;
}) => (
  <div>
    <h2 className="text-2xl font-extrabold text-purple-700 text-center">Personal Details</h2>
    <p className="text-gray-600 text-center mt-2 mb-6">Let’s start with some basic information.</p>
    <div className="space-y-6">
      <InputField
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={(e) => onChange("fullName", e.target.value)}
      />
      <InputField
        label="Birth Date"
        type="date"
        value={formData.birthDate}
        onChange={(e) => onChange("birthDate", e.target.value)}
      />
      <InputField
        label="Country"
        placeholder="Enter your country"
        value={formData.country}
        onChange={(e) => onChange("country", e.target.value)}
      />
      <InputField
        label="Phone Number"
        placeholder="Enter your phone number"
        value={formData.phoneNumber}
        onChange={(e) => onChange("phoneNumber", e.target.value)}
      />
    </div>
  </div>
);

const Step2 = ({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (field: string, value: string) => void;
}) => (
  <div>
    <h2 className="text-2xl font-extrabold text-blue-700 text-center">Your Preferences</h2>
    <p className="text-gray-600 text-center mt-2 mb-6">Tell us more about your likes and interests.</p>
    <div className="space-y-6">
      <InputField
        label="Hobbies"
        placeholder="Enter your hobbies"
        value={formData.hobbies}
        onChange={(e) => onChange("hobbies", e.target.value)}
      />
      <InputField
        label="Favorite Video Type"
        placeholder="Enter your favorite video type"
        value={formData.favoriteVideoType}
        onChange={(e) => onChange("favoriteVideoType", e.target.value)}
      />
      <InputField
        label="Occupation"
        placeholder="Enter your occupation"
        value={formData.occupation}
        onChange={(e) => onChange("occupation", e.target.value)}
      />
    </div>
  </div>
);

const Step3 = ({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (field: string, value: string) => void;
}) => (
  <div>
    <h2 className="text-2xl font-extrabold text-teal-700 text-center">Payment Details</h2>
    <p className="text-gray-600 text-center mt-2 mb-6">Bank details are optional. You can leave this blank.</p>
    <div className="space-y-6">
      <InputField
        label="Bank Details (Optional)"
        placeholder="Enter bank details"
        value={formData.bankDetails}
        onChange={(e) => onChange("bankDetails", e.target.value)}
      />
    </div>
  </div>
);

const InputField = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export default Onboarding;
