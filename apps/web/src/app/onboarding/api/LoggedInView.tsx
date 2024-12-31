import React from "react";

const LoggedInView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-blue-700 text-center">
          Welcome!
        </h2>
        <p className="text-center text-gray-600 mt-2">
          You are now logged in.
        </p>
      </div>
    </div>
  );
};

export default LoggedInView;
