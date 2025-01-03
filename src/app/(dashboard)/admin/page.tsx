"use client";
import { listApi } from "@/api/listApi";
import { Overview } from "@/components/dashboard/overview";
import { Statistics } from "@/components/dashboard/statistics";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { StaffListResponse } from "@/types/listTypes";
import { userSection } from "@/types/sidebar";
import { withAuth } from "@/utils/withAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [overviewSection, setOverviewSection] = useState<userSection[]>([
    {
      name: "Users",
      count: 0,
    },
    {
      name: "Visitors",
      count: 0,
    },
    {
      name: "Exhibit",
      count: 0,
    },
    {
      name: "Delegate",
      count: 0,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const { users }: StaffListResponse = await listApi.getStaff({
        page: 1,
        searchTerm: "",
      });
      if (users?.length > 0) {
        setOverviewSection((prevOverview) =>
          prevOverview.map(
            (section) =>
              section.name === "Users"
                ? { ...section, count: users.length } // Update count to users.length
                : section // Keep other entries unchanged
          )
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while fetching data",
        duration: 1500,
        variant: "error",
      });
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isLoading) return <Loader size="medium" />;

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-6 text-black">Overview</h1>
          <Overview overviewSection={overviewSection} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <Statistics />
            </div>
            <div>{/* <SavingsWidget /> */}</div>
          </div>
          {/* <TransactionsTable /> */}
        </main>
      </div>
    </div>
  );
};

export default withAuth(Dashboard, { requiredRole: ["admin"] });
