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
import {
  ApproveResponse,
  AssociationProps,
  CompanyProps,
  ConferenceProps,
  ExhibitionProps,
  VenueProps,
} from "@/types/listTypes";
import BackButton from "@/components/BackButton";
import { useSegments } from "@/hooks/useSegments";
import { approvalApi } from "@/api/approvalApi";
import { useRouter } from "next/navigation";
import { getStatusColor, getStatusText, ValuesToShow } from "@/utils/common";
import { Checkbox } from "@/components/ui/checkbox";

const displayNames: Record<string, string> = {
  _id: "Company ID",
  expo_type_id: "Event Type",
  expo_fullname: "Full Name",
  expo_shortname: "Short Name",
  year_id: "Year",
  month_id: "Month",
  expo_sd: "Start Date",
  expo_ed: "End Date",
  fee_id: "Fees",
  expo_city: "City",
  state_id: "State",
  venue_id: "Venue",
  expo_website: "Website",
  expo_frequency: "Frequency",
  company_id: "Exhibition Organizer",
  expo_segment_id: "Exhibition Type",
  expo_eprofile: "Exhibitor Profile",
  expo_vprofile: "Visitor Profile",
  status: "Status",
  adminStatus: "Admin Status",
  expo_time: "Timing",
  expo_logo: "Logo",
  expo_featured: "Featured",
};

export default function ApprovalChanges() {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));
  const exhibitionId = searchParams.get("id");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [exhibition, setConference] = useState<ConferenceProps>();
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        const { exhibition: Exhibition } = await listApi.getExhibitionById(
          exhibitionId as string
        );
        const { companies } = await listApi.fetchCompanies();
        const { venues } = await listApi.fetchVenues();
        const { associations } = await listApi.fetchAssociation();

        setConference(Exhibition);
        setCompanies(companies);
        setAssociations(associations);
        setVenues(venues);
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
  }, [isEditMode, exhibitionId]);

  if (initialLoading) return <Loader size="medium" />;

  const handleAction = async (id: string, action: string) => {
    try {
      setLoading(true);
      const isApproved = action === "approve" ? true : false;

      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `exhibition/${id}/${action}`
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

  const renderField = (key: keyof ExhibitionProps, value: any) => {
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
      case "expo_type_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.expo_type_id?.find((x) => x._id === value)?.name || "---"}
            </p>
          </div>
        );
      case "expo_sd":
        if (!value) return;
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {new Date(value).toLocaleDateString()}
            </p>
          </div>
        );
      case "expo_ed":
        if (!value) return;
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {new Date(value).toLocaleDateString()}
            </p>
          </div>
        );
      case "venue_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {venues?.find((x) => x._id?.toString() === value)?.venue_name ||
                "---"}
            </p>
          </div>
        );
      case "year_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.year_id?.find((x) => x._id === value)?.name || "---"}
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

      case "company_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {companies?.find((x) => x._id?.toString() === value?.toString())
                ?.company_name || "---"}
            </p>
          </div>
        );
      case "expo_segment_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.expo_segment_id?.find(
                (x) => x._id?.toString() === value?.toString()
              )?.name || "---"}
            </p>
          </div>
        );

      case "expo_logo":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <img
              src={value}
              alt="Preview"
              className="h-20 w-auto rounded-md border"
            />
          </div>
        );

      case "expo_featured":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <Checkbox id="featured" checked={value} />
          </div>
        );

      default:
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">{value}</p>
          </div>
        );
    }
  };

  const statusText = getStatusText(exhibition?.changes?.type);
  const colorClasses = getStatusColor(exhibition?.changes?.type);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mt-2">
            Approve Exhibition
            <Badge
              variant={
                exhibition?.adminStatus === "pending" ? "outline" : "default"
              }
              className={`outline outline-1 ${
                exhibition?.adminStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : exhibition?.adminStatus === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {exhibition?.adminStatus}
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
              {Object.entries(exhibition || {}).map(([key, value]) =>
                renderField(key as keyof ExhibitionProps, value)
              )}
            </div>
            {/* rendering updated  fields  */}
            <div className="space-y-4">
              {ValuesToShow.includes(exhibition?.changes?.type) && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Updated Values
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(
                      exhibition?.changes?.updated_values || {}
                    ).map(([key, value]) =>
                      renderField(key as keyof ExhibitionProps, value)
                    )}
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end space-x-2 mt-3">
              <Button
                onClick={() => handleAction(exhibitionId as string, "reject")}
                variant="outline"
                className="flex items-center space-x-2 bg-white border border-red-600 text-red-600"
                disabled={loading}
              >
                <XIcon className="w-4 h-4" />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => handleAction(exhibitionId as string, "approve")}
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
