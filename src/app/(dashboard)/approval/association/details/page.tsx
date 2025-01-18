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
import { ApproveResponse, AssociationProps } from "@/types/listTypes";
import BackButton from "@/components/BackButton";
import { useSegments } from "@/hooks/useSegments";
import { approvalApi } from "@/api/approvalApi";
import { useRouter } from "next/navigation";
import { getStatusColor, getStatusText, ValuesToShow } from "@/utils/common";
import StaffInformation from "@/components/staffInformationCard";

const displayNames: Record<string, string> = {
  _id: "Company ID",
  association_website: "Website Name",
  association_name: "Association Name",
  association_city: "City",
  state_id: "State",
  association_address: "address",
  association_type_id: "Association Type",
  status: "Status",
  adminStatus: "Admin Status",
};

export default function ApprovalChanges() {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));
  const associationId = searchParams.get("id");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [association, setAssociation] = useState<AssociationProps>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        const { association } = await listApi.getAdminAssociationById(
          associationId as string
        );
        if (association) {
          setAssociation(association);
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
  }, [isEditMode, associationId]);

  if (initialLoading) return <Loader size="medium" />;

  const handleAction = async (id: string, action: string) => {
    try {
      setLoading(true);
      const isApproved = action === "approve" ? true : false;

      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `association/${id}/${action}`
      );
      if (message) {
        toast({
          title: `${isApproved ? "Approve" : "Rejection"} Successful`,
          description: `You have successfully ${
            isApproved ? "approved" : "reject"
          } the association.`,
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
        description: "Error while approving association. Please try again.",
        duration: 1500,
        variant: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (key: keyof AssociationProps, value: any) => {
    if (
      key === "changes" ||
      key === "_id" ||
      key === "__v" ||
      key === "status" ||
      key === "createdAt" ||
      key === "updatedAt" ||
      key === "adminStatus"
    )
      return null;

    const label = displayNames[key] || key;

    switch (key) {
      case "association_type_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.association_type_id?.find((x) => x._id === value)?.name ||
                "---"}
            </p>
          </div>
        );

      case "state_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.state_id?.find((x) => x._id === value)?.name || "---"}
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize break-words overflow-wrap-anywhere">
              {value}
            </p>
          </div>
        );
    }
  };

  const statusText = getStatusText(association?.changes?.type);
  const colorClasses = getStatusColor(association?.changes?.type);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mt-2">
            Approve Association
            <Badge
              variant={
                association?.adminStatus === "pending" ? "outline" : "default"
              }
              className={`outline outline-1 ${
                association?.adminStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : association?.adminStatus === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {association?.adminStatus}
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
            <StaffInformation changes={association?.changes} />
            
            {/* rendering all fields  */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-2">
              {Object.entries(association || {}).map(([key, value]) =>
                renderField(key as keyof AssociationProps, value)
              )}
            </div>
            {/* rendering updated  fields  */}
            <div className="space-y-4">
              {ValuesToShow.includes(association?.changes?.type) && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 ">
                  <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Updated Values
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(
                      association?.changes?.updated_values || {}
                    ).map(([key, value]) =>
                      renderField(key as keyof AssociationProps, value)
                    )}
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end space-x-2 mt-3">
              <Button
                onClick={() => handleAction(associationId as string, "reject")}
                variant="outline"
                className="flex items-center space-x-2 bg-white border border-red-600 text-red-600"
                disabled={loading}
              >
                <XIcon className="w-4 h-4" />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => handleAction(associationId as string, "approve")}
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
