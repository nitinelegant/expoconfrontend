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
  KeyContactProps,
  VenueProps,
} from "@/types/listTypes";
import BackButton from "@/components/BackButton";
import { useSegments } from "@/hooks/useSegments";
import { approvalApi } from "@/api/approvalApi";
import { useRouter } from "next/navigation";
import { getStatusColor, getStatusText, ValuesToShow } from "@/utils/common";

const displayNames: Record<string, string> = {
  _id: "ID",
  contact_name: "Name",
  contact_mobile: "Phone Number",
  contact_email: "Email",
  state_id: "State",
  contact_organizer_id: "Company",
  contact_venue_id: "Venue",
  contact_association_id: "Association",
  adminStatus: "Admin Status",
};

export default function ApprovalChanges() {
  const { toast } = useToast();
  const { data } = useSegments();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = Boolean(searchParams.get("id"));
  const keyContactId = searchParams.get("id");
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [keyContact, setKeyContact] = useState<KeyContactProps>();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setInitialLoading(true);
        const { keyContact } = await listApi.getKeyContactById(
          keyContactId as string
        );
        const { companies } = await listApi.fetchCompanies();
        const { venues } = await listApi.fetchVenues();
        const { associations } = await listApi.fetchAssociation();

        if (keyContact) {
          setKeyContact(keyContact);
        }
        setAssociations(associations);
        setVenues(venues);
        setCompanies(companies);
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
  }, [isEditMode, keyContactId]);

  if (initialLoading) return <Loader size="medium" />;

  const handleAction = async (id: string, action: string) => {
    try {
      setLoading(true);
      const isApproved = action === "approve" ? true : false;

      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `keycontact/${id}/${action}`
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderField = (key: keyof KeyContactProps, value: any) => {
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
      case "contact_venue_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {venues?.find((x) => x._id?.toString() === value)?.venue_name ||
                "---"}
            </p>
          </div>
        );

      case "contact_organizer_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {companies?.find((x) => x?._id?.toString() === value)
                ?.company_name || "---"}
            </p>
          </div>
        );
      case "contact_association_id":
        return (
          <div className="space-y-2" key={key}>
            <h6 className=" text-gray-500 font-bold ">{label}</h6>
            <p className="text-black capitalize">
              {associations?.find((x) => x?._id?.toString() === value)
                ?.association_name || "---"}
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

  const statusText = getStatusText(keyContact?.changes?.type);
  const colorClasses = getStatusColor(keyContact?.changes?.type);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackButton />
      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between mt-2">
            Approve Key Contact
            <Badge
              variant={
                keyContact?.adminStatus === "pending" ? "outline" : "default"
              }
              className={`outline outline-1 ${
                keyContact?.adminStatus === "approved"
                  ? "bg-green-100 text-green-600"
                  : keyContact?.adminStatus === "rejected"
                  ? "bg-red-50 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {keyContact?.adminStatus}
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
              {Object.entries(keyContact || {}).map(([key, value]) =>
                renderField(key as keyof KeyContactProps, value)
              )}
            </div>
            {/* rendering updated  fields  */}
            <div className="space-y-4">
              {ValuesToShow.includes(keyContact?.changes?.type) && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 ">
                  <h6 className="text-lg font-semibold text-green-700 mb-3">
                    Updated Values
                  </h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(
                      keyContact?.changes?.updated_values || {}
                    ).map(([key, value]) =>
                      renderField(key as keyof KeyContactProps, value)
                    )}
                  </div>
                </div>
              )}
            </div>

            <CardFooter className="flex justify-end space-x-2 mt-3">
              <Button
                onClick={() => handleAction(keyContactId as string, "reject")}
                variant="outline"
                className="flex items-center space-x-2 bg-white border border-red-600 text-red-600"
                disabled={loading}
              >
                <XIcon className="w-4 h-4" />
                <span>Reject</span>
              </Button>
              <Button
                onClick={() => handleAction(keyContactId as string, "approve")}
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
