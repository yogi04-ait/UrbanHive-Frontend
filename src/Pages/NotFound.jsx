import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <h1 className="text-6xl font-bold">🤖 404</h1>
      <p className="text-2xl mt-4">Oops! Page Not Found</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
