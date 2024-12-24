"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Ensure localStorage is accessed only on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      console.log("token", token);
      if (token) {
        router.replace("/admin/dashboard");
      } else {
        router.push("/login");
      }
    }
  });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to expocon</h1>
    </div>
  );
}
