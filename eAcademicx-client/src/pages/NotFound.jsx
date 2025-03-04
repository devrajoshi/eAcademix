import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-white bg-black">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl">Page Not Found</p>
      <a href="/" className="mt-6 text-yellow-400 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
