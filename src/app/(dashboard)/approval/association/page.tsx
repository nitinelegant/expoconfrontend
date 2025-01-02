"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/utils/withAuth";
import {
  ApproveResponse,
  AssociationProps,
  AssociationsListResponse,
} from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { statesAndUnionTerritories } from "@/constants/form";
import { approvalApi } from "@/api/approvalApi";
import { useToast } from "@/hooks/use-toast";

const Association = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [rerenderData, setRerenderData] = useState(false);

  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { associations }: AssociationsListResponse =
          await approvalApi.getAssociationApproval();
        if (associations?.length > 0) setAssociations(associations);
        // setTotalPages(response.totalPages);
      } catch (error) {
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

  const columns: Column<AssociationProps>[] = [
    {
      header: "Type",
      accessorKey: "changes",
      cell: ({ changes }) => {
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
    { header: "Association Name", accessorKey: "association_name" },
    { header: "City", accessorKey: "association_city" },

    { header: "Address", accessorKey: "association_address" },
    { header: "Website", accessorKey: "association_website" },
    {
      header: "State",
      accessorKey: "state_id",
      cell: (state) => {
        return (
          <span className="capitalize">
            {statesAndUnionTerritories[state.state_id]?.name}
          </span>
        );
      },
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
        data={associations}
        title="Approve Association"
        itemsPerPage={10}
        searchField="association_name"
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

export default withAuth(Association, { requiredRole: ["admin", "staff"] });
