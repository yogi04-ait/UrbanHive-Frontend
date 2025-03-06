import React from "react";

const ShimmerLoader = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-4 p-4">
      <div className="h-12 w-32 bg-gray-300 rounded-lg animate-pulse"></div>{" "}
      <div className="flex space-x-4">
        <div className="h-8 w-24 bg-gray-300 rounded-lg animate-pulse"></div>{" "}
        <div className="h-8 w-24 bg-gray-300 rounded-lg animate-pulse"></div>{" "}
      </div>
      <div className="mt-6 bg-gray-300 h-0.5 w-full animate-pulse"></div>{" "}
      <div className="flex space-x-4 mt-6">
        <div className="h-16 w-16 bg-gray-300 rounded-lg animate-pulse"></div>{" "}
        <div className="flex-1 h-96 bg-gray-300 rounded-lg animate-pulse"></div>{" "}
      </div>
    </div>
  );
};

export default ShimmerLoader;
