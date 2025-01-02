"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/utils/withAuth";
import { useToast } from "@/hooks/use-toast";
import {
  ApproveResponse,
  ConferenceListResponse,
  ConferenceProps,
} from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { statesAndUnionTerritories } from "@/constants/form";
import formatDateToYear from "@/utils/common";
import { approvalApi } from "@/api/approvalApi";

const Venue = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [conferences, setConferences] = useState<ConferenceProps[]>([]);
  const [rerenderData, setRerenderData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { conferences }: ConferenceListResponse =
          await approvalApi.getConferenceApproval();
        if (conferences?.length > 0) setConferences(conferences);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while fetching data",
          duration: 1000,
          variant: "error",
        });
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [rerenderData]);

  if (isLoading) {
    return <Loader size="medium" />;
  }

  const handleAction = async (id: string, action: string) => {
    try {
      setIsLoading(true);
      const isApproved = action === "approve" ? true : false;
      const { message }: ApproveResponse = await approvalApi.approveOrReject(
        `keycontact/${id}/${action}`
      );
      if (message) {
        toast({
          title: `${isApproved ? "Approve" : "Rejection"} Successful`,
          description: `You have successfully ${
            isApproved ? "approved" : "reject"
          }.`,
          duration: 1500,
          variant: isApproved ? "success" : "error",
        });
        setRerenderData(!rerenderData);
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
      setIsLoading(false);
    }
  };

  const columns: Column<ConferenceProps>[] = [
    {
      header: "Type",
      accessorKey: "changes",
      cell: ({ changes }) => {
        if (!changes) return null;
        return (
          <span
            className={`uppercase inline-flex items-center rounded-full px-2 py-1 text-xs font-bold ${
              changes?.type === "create"
                ? "text-green-600"
                : changes?.type === "update"
                ? "text-[#d87225]"
                : "text-[#d1202a]"
            }`}
          >
            {changes?.type}
          </span>
        );
      },
    },
    { header: "Conference Name", accessorKey: "con_shortname" },
    {
      header: "Start Date",
      accessorKey: "con_sd",
      cell: (state) => {
        return (
          <span className="capitalize">{formatDateToYear(state.con_sd)}</span>
        );
      },
    },
    {
      header: "End Date",
      accessorKey: "con_ed",
      cell: (state) => {
        return (
          <span className="capitalize">{formatDateToYear(state.con_sd)}</span>
        );
      },
    },
    { header: "City", accessorKey: "con_city" },
    {
      header: "State",
      accessorKey: "state_id",
      cell: (state) => {
        return (
          <span className="capitalize">
            {
              statesAndUnionTerritories.find((x) => x.id === state.state_id)
                ?.name
            }
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (venue) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            venue.status === "approved"
              ? "bg-green-100 text-green-600"
              : venue.status === "rejected"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {venue.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (cellItem) => {
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="bg-primary text-white"
              size="sm"
              onClick={() => handleAction(cellItem._id, "approve")}
              disabled={isLoading}
            >
              <h1>Approve</h1>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="border border-primary text-primary"
              disabled={isLoading}
              onClick={() => handleAction(cellItem._id, "reject")}
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ];
  const handleConfirmDeletion = () => {
    // Implement the delete logic here
    console.log(`Deleting exhibition with id: ${selectedExhibitionId}`);
    setIsDeleteDialogOpen(false);
    setSelectedExhibitionId(null);
  };
  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        data={conferences}
        title="Approve Conference"
        itemsPerPage={10}
        searchField="con_shortname"
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDeletion}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action is irreversible."
        confirmButtonText="Yes, Delete"
        cancelButtonText="No, Cancel"
      />
    </div>
  );
};

export default withAuth(Venue, { requiredRole: ["admin", "staff"] });
