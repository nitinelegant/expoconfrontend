"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { listApi } from "@/api/listApi";
import { Loader } from "@/components/ui/loader";
import { ApproveResponse, CompanyProps } from "@/types/listTypes";
import BackButton from "@/components/BackButton";
import { useSegments } from "@/hooks/useSegments";
import { approvalApi } from "@/api/approvalApi";
import { useRouter } from "next/navigation";
import {
  extractMapUrl,
  getStatusColor,
  getStatusText,
  isValidGoogleMapLink,
  ValuesToShow,
} from "@/utils/common";

const displayNames: Record<string, string> = {
  _id: "Company ID",
  company_name: "Company Name",
  company_type_id: "Company Type",
  company_city: "City",
  state_id: "State",
  company_address: "Address",
  company_phone: "Phone Number",
  company_website: "Website",
  company_map: "Map Location",
  company_logo: "Logo",
  company_featured: "Featured Company",
  company_user_id: "Email ID",
  company_password: "Password",
  status: "Status",
  adminStatus: "Admin Status",
};

export default function ApprovalChanges() {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));
  const companyId = searchParams.get("id");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [company, setCompany] = useState<CompanyProps>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        const { company } = await listApi.getCompanyById(companyId as string);
        if (company) {
          setCompany(company);
        }
      } catch (error) {
        console.error("Error initializing data:", error);
        toast({
          title: "Error Loading Data",
          description: "Failed to load data. Please try again.",
          variant: "error",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    initializeData();
  }, [isEditMode, companyId]);

  if (initialLoading) return <Loader size="medium" />;

  const handleAction = async (id: string, action: string) => {
    try {
      setLoading(true);
      const isApproved = action === "approve" ? true : false;

      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `company/${id}/${action}`
      );
      if (message) {
        toast({
          title: `${isApproved ? "Approve" : "Rejection"} Successful`,
          description: `You have successfully ${
            isApproved ? "approved" : "reject"
          } the key contact.`,
          duration: 1500,
          variant: isApproved ? "success" : "error",
        });
      }
      if (window.history.length > 1) {
        router.back(); // Navigates to the previous page
      } else {
        router.push("/"); // Fallback: Navigate to the home page
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while approving key contact. Please try again.",
        duration: 1500,
        variant: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderMap = (mapUrl: string, key: string) => {
    if (!mapUrl) return null;

    const url = extractMapUrl(mapUrl);
    if (isValidGoogleMapLink(url)) {
      return (
        <div
          className="mt-2 rounded-md overflow-hidden border border-gray-200"
          key={key}
        >
          <iframe
            src={url}
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-md"
          />
        </div>
      );
    }
    return null;
  };

  const renderField = (key: keyof CompanyProps, value: any) => {
    if (
      key === "changes" ||
      key === "_id" ||
      key === "__v" ||
      key === "company_featured" ||
      key === "status" ||
      key === "createdAt" ||
      key === "updatedAt" ||
      key === "company_password" ||
      key === "adminStatus"
    )
      return null;

    const label = displayNames[key] || key;

    switch (key) {
      case "company_type_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className="text-black font-medium ">{label}</h6>
            <p className="text-gray-400 capitalize">
              {data?.company_type_id?.find((x) => x._id === value)?.name ||
                "---"}
            </p>
          </div>
        );

      case "company_type_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className="text-black font-medium ">{label}</h6>
            <p className="text-gray-400 capitalize">
              {data?.company_type_id?.find((x) => x._id === value)?.name ||
                "---"}
            </p>
          </div>
        );

      case "state_id":
        console.log("state_id", value);
        return (
          <div className="space-y-2" key={key}>
            <h6 className="text-black font-medium ">{label}</h6>
            <p className="text-gray-400 capitalize">
              {data?.state_id?.find((x) => x._id === value)?.name || "---"}
            </p>
          </div>
        );
      case "company_logo":
        if (!value?.company_logo) return null;
        return (
          <div className="space-y-2" key={key}>
            <img
              src={value?.company_logo}
              alt="Preview"
              className="h-20 w-auto rounded-md border"
            />
          </div>
        );

      case "company_map":
        return renderMap(value, key);

      default:
        return (
          <div className="space-y-2" key={key}>
            <h6 className="text-black font-medium ">{label}</h6>
            <p className="text-gray-400 capitalize">{value}</p>
          </div>
        );
    }
  };

  const statusText = getStatusText(company?.changes?.type);
  const colorClasses = getStatusColor(company?.changes?.type);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mt-2">
            Approve Company
            <Badge
              variant={
                company?.adminStatus === "pending" ? "outline" : "default"
              }
              className={`outline outline-1 ${
                company?.adminStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : company?.adminStatus === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {company?.adminStatus}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <>
            {/* showing action status  */}

            <div className="flex  items-center">
              <h2 style={{ color: colorClasses, fontWeight: "bold" }}>
                <span className="text-black font-medium">Action: </span>{" "}
                {statusText}
              </h2>
            </div>

            {/* rendering all fields  */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-2">
              {Object.entries(company || {}).map(([key, value]) =>
                renderField(key as keyof CompanyProps, value)
              )}
            </div>
            {/* rendering updated  fields  */}
            <div className="space-y-4">
              {ValuesToShow.includes(company?.changes?.type) && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 ">
                  <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Updated Values
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(company?.changes?.updated_values || {}).map(
                      ([key, value]) =>
                        renderField(key as keyof CompanyProps, value)
                    )}
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end space-x-2 mt-3">
              <Button
                onClick={() => handleAction(companyId as string, "reject")}
                variant="outline"
                className="flex items-center space-x-2 bg-white border border-red-600 text-red-600"
                disabled={loading}
              >
                <XIcon className="w-4 h-4" />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => handleAction(companyId as string, "approve")}
                className="flex items-center space-x-2"
                disabled={loading}
              >
                <CheckIcon className="w-4 h-4" />
                <span>Approve</span>
              </Button>
            </CardFooter>
          </>
        </CardContent>
      </Card>
    </div>
  );
}