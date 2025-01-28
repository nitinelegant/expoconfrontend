"use client";
import { listApi } from "@/api/listApi";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/context/AuthContext";
import { DashboardDataResponse } from "@/types/listTypes";
import { userSection } from "@/types/sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Overview } from "@/components/dashboard/overview";

export default function DashboardPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [overviewSection, setOverviewSection] = useState<userSection[]>([
    { name: "Exhibitions", active: 0, pending: 0 },
    { name: "Conferences", active: 0, pending: 0 },
    { name: "Venues", active: 0, pending: 0 },
    { name: "Associations", active: 0, pending: 0 },
    { name: "Companies", active: 0, pending: 0 },
    { name: "Key Contacts", active: 0, pending: 0 },
  ]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      setIsLoading(true);
      const { data }: DashboardDataResponse = await listApi.getDashboard();
      if (data) {
        setOverviewSection((prevOverview) =>
          prevOverview.map((section) => {
            switch (section.name) {
              case "Exhibitions":
                return {
                  ...section,
                  active: data.totalExhibitions,
                  pending: data.pendingExhibitions,
                };
              case "Conferences":
                return {
                  ...section,
                  active: data.totalConferences,
                  pending: data.pendingConferences,
                };
              case "Venues":
                return {
                  ...section,
                  active: data.totalVenues,
                  pending: data.pendingVenues,
                };
              case "Associations":
                return {
                  ...section,
                  active: data.totalAssociations,
                  pending: data.pendingAssociations,
                };
              case "Companies":
                return {
                  ...section,
                  active: data.totalCompanies,
                  pending: data.pendingCompanies,
                };
              case "Key Contacts":
                return {
                  ...section,
                  active: data.totalKeyContacts,
                  pending: data.pendingKeyContacts,
                };
              default:
                return section;
            }
          })
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
          <h1 className="text-2xl font-semibold mb-6  text-black">
            Overview (Staff)
          </h1>

          <Overview overviewSection={overviewSection} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6"></div>
        </main>
      </div>
    </div>
  );
}
