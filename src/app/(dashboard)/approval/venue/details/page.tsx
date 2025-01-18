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
import { ApproveResponse, VenueProps } from "@/types/listTypes";
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
import { Checkbox } from "@/components/ui/checkbox";
import StaffInformation from "@/components/staffInformationCard";

const displayNames: Record<string, string> = {
  _id: "Company ID",
  venue_name: "Venue Name",
  venue_city: "City",
  state_id: "State",
  venue_phone: "Phone",
  venue_address: "Address",
  venue_website: "Website",
  venue_map: "Google Map Link",
  venue_photo: "Venue Photo",
  venue_layout: "Venue Layout",
  status: "Status",
  adminStatus: "Admin Status",
  venue_featured: "Featured",
};

export default function ApprovalChanges() {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));
  const venueId = searchParams.get("id");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [venue, setvenue] = useState<VenueProps>();

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        const { venue } = await listApi.getAdminVenueById(venueId as string);
        if (venue) {
          setvenue(venue);
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
  }, [isEditMode, venueId]);

  if (initialLoading) return <Loader size="medium" />;

  const handleAction = async (id: string, action: string) => {
    try {
      setLoading(true);
      const isApproved = action === "approve" ? true : false;

      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `venue/${id}/${action}`
      );
      if (message) {
        toast({
          title: `${isApproved ? "Approve" : "Rejection"} Successful`,
          description: `You have successfully ${isApproved ? "approved" : "reject"
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

  const renderMap = (mapUrl: string, key: string, label: string) => {
    if (!mapUrl) return null;

    const url = extractMapUrl(mapUrl);
    if (isValidGoogleMapLink(url)) {
      return (
        <div key={key}>
          <h6 className=" text-gray-500 font-bold ">{label}</h6>
          <div className="mt-2 rounded-md overflow-hidden border border-gray-200">
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
        </div>
      );
    }
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (key: keyof VenueProps, value: any) => {
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
      case "state_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.state_id?.find((x) => x._id === value)?.name || "---"}
            </p>
          </div>
        );
      case "venue_photo":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <img
              src={value || null}
              alt="Preview"
              className="h-20 w-auto rounded-md border"
            />
          </div>
        );
      case "venue_featured":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <Checkbox id="featured" checked={value} />
          </div>
        );

      case "venue_layout":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <img
              src={value || null}
              alt="logo"
              className="h-20 w-auto rounded-md border"
            />
          </div>
        );

      case "venue_map":
        return renderMap(value, key, label);

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

  const statusText = getStatusText(venue?.changes?.type);
  const colorClasses = getStatusColor(venue?.changes?.type);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mt-2">
            Approve Venue
            <Badge
              variant={venue?.adminStatus === "pending" ? "outline" : "default"}
              className={`outline outline-1 ${
                venue?.adminStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : venue?.adminStatus === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
                }`}
            >
              {venue?.adminStatus}
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
            <StaffInformation changes={venue?.changes} />

            {/* rendering all fields  */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-2">
              {Object.entries(venue || {}).map(([key, value]) =>
                renderField(key as keyof VenueProps, value)
              )}
            </div>
            {/* rendering updated  fields  */}
            <div className="space-y-4">
              {ValuesToShow.includes(venue?.changes?.type) && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Updated Values
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(venue?.changes?.updated_values || {}).map(
                      ([key, value]) =>
                        renderField(key as keyof VenueProps, value)
                    )}
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end space-x-2 mt-3">
              <Button
                onClick={() => handleAction(venueId as string, "reject")}
                variant="outline"
                className="flex items-center space-x-2 bg-white border border-red-600 text-red-600"
                disabled={loading}
              >
                <XIcon className="w-4 h-4" />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => handleAction(venueId as string, "approve")}
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
