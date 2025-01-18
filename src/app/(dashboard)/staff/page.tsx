"use client";
import { Statistics } from "@/components/dashboard/statistics";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data } = useUser();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  console.log(user);
  if (loading) return <Loader size="medium" />;
  if (!isAuthenticated) return null;
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-6 text-black">Overview</h1>
          { user === "staff" ? <h1 className="text-2xl font-semibold mb-6 text-black">Welcome {data?.fullname}</h1> : null }
          {/* <Overview /> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <Statistics />
            </div>
            <div>{/* <SavingsWidget /> */}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
