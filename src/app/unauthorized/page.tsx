"use client";
import { useRouter } from "next/navigation";
import { ShieldBanIcon } from "lucide-react";

export default function Unauthorized() {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.go(-2);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 shadow-lg">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Unauthorized</h1>
          <p className="mt-4 text-gray-600">
            Sorry, you don’t have permission to access this page.
          </p>
        </div>
        <div className="flex items-center justify-center mt-5">
          <ShieldBanIcon className="h-20 w-20 text-red-500" />
        </div>
        <div className="mt-8">
          <button
            onClick={handleGoBack}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary focus:outline-none focus:ring focus:ring-red-200"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
