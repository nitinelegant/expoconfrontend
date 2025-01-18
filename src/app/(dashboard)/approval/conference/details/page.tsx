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
  VenueProps,
} from "@/types/listTypes";
import BackButton from "@/components/BackButton";
import { useSegments } from "@/hooks/useSegments";
import { approvalApi } from "@/api/approvalApi";
import { useRouter } from "next/navigation";
import { getStatusColor, getStatusText, ValuesToShow } from "@/utils/common";
import { Checkbox } from "@/components/ui/checkbox";
import StaffInformation from "@/components/staffInformationCard";

const displayNames: Record<string, string> = {
  _id: "Company ID",
  con_type_id: "Event Type",
  con_fullname: "Full Name",
  con_shortname: "Short Name",
  year_id: "Year",
  month_id: "Month",
  con_sd: "Start Date",
  con_ed: "End Date",
  fee_id: "Fees",
  con_city: "City",
  state_id: "State",
  venue_id: "Venue",
  con_website: "Website",
  con_frequency: "Frequency",
  company_id: "Company",
  con_segment_id: "Conference Segment",
  con_nassociation_id: "National Association",
  con_hassociation_id: "Hosting Chapter",
  status: "Status",
  adminStatus: "Admin Status",
  con_time: "Timing",
  con_logo: "Logo",
  con_featured: "Featured",
  user_fullname: "Staff Name",
  user_email: "Staff Email",
};

export default function ApprovalChanges() {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));
  const conferenceId = searchParams.get("id");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [conference, setConference] = useState<ConferenceProps>();
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        const { conference } = await listApi.getAdminConferenceById(
          conferenceId as string
        );
        const { companies } = await listApi.fetchCompanies();
        const { venues } = await listApi.fetchVenues();
        const { associations } = await listApi.fetchAssociation();

        if (conference) {
          setConference(conference);
        }
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
  }, [isEditMode, conferenceId]);

  if (initialLoading) return <Loader size="medium" />;

  const handleAction = async (id: string, action: string) => {
    try {
      setLoading(true);
      const isApproved = action === "approve" ? true : false;

      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `conference/${id}/${action}`
      );
      if (message) {
        toast({
          title: `${isApproved ? "Approve" : "Rejection"} Successful`,
          description: `You have successfully ${
            isApproved ? "approved" : "reject"
          } the conference.`,
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
        description: "Error while approving conference. Please try again.",
        duration: 1500,
        variant: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (key: keyof ConferenceProps, value: any) => {
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
      case "con_type_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.con_type_id?.find((x) => x._id === value)?.name || "---"}
            </p>
          </div>
        );
      case "con_sd":
        if (!value) return;
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {new Date(value).toLocaleDateString()}
            </p>
          </div>
        );

      case "con_ed":
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
              {venues?.find((x) => x._id === value)?.venue_name || "---"}
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
      case "con_nassociation_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {associations?.find((x) => x._id === value)?.association_name ||
                "---"}
            </p>
          </div>
        );
      case "con_segment_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {data?.con_segment_id?.find((x) => x._id === value)?.name ||
                "---"}
            </p>
          </div>
        );
      case "con_hassociation_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {associations?.find((x) => x._id === value)?.association_name ||
                "---"}
            </p>
          </div>
        );

      case "con_logo":
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

      case "con_featured":
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
            <p className="text-black capitalize break-words overflow-wrap-anywhere">
              {value}
            </p>
          </div>
        );
    }
  };

  const statusText = getStatusText(conference?.changes?.type);
  const colorClasses = getStatusColor(conference?.changes?.type);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mt-2">
            Approve Conference
            <Badge
              variant={
                conference?.adminStatus === "pending" ? "outline" : "default"
              }
              className={`outline outline-1 ${
                conference?.adminStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : conference?.adminStatus === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {conference?.adminStatus}
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
            <StaffInformation changes={conference?.changes} />

            {/* rendering all fields  */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-2">
              {Object.entries(conference || {}).map(([key, value]) =>
                renderField(key as keyof ConferenceProps, value)
              )}
            </div>
            {/* rendering updated  fields  */}
            <div className="space-y-4">
              {ValuesToShow.includes(conference?.changes?.type) && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Updated Values
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(
                      conference?.changes?.updated_values || {}
                    ).map(([key, value]) =>
                      renderField(key as keyof ConferenceProps, value)
                    )}
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end space-x-2 mt-3">
              <Button
                onClick={() => handleAction(conferenceId as string, "reject")}
                variant="outline"
                className="flex items-center space-x-2 bg-white border border-red-600 text-red-600"
                disabled={loading}
              >
                <XIcon className="w-4 h-4" />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => handleAction(conferenceId as string, "approve")}
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
