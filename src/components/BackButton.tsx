"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // Import the desired icon from Lucide

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back(); // Navigates to the previous page
    } else {
      router.push("/"); // Fallback: Navigate to the home page
    }
  };

  return (
    <button
      onClick={handleGoBack}
      style={{
        position: "fixed",
        top: 110,
        width: "50px",
        height: "50px",
        backgroundColor: "#395b99",
        color: "#fff",
        border: "none",
        borderRadius: "50%", // Makes the button circular
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
    >
      <ArrowLeft size={24} color="#fff" />
    </button>
  );
};

export default BackButton;
