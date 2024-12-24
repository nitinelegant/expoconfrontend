import React from "react";

const ComingSoon = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Coming Soon</h1>
        <p className="text-xl mb-6">
          We are working hard to bring you something amazing. Stay tuned!
        </p>
        <form className="flex flex-col items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-80 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            Notify Me
          </button>
        </form>
        <footer className="mt-8 text-sm text-gray-200">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;
