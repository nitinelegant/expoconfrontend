"use client";
import React, { useCallback, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  ApproveResponse,
  KeyContactDeleteResponse,
  KeyContactListResponse,
  KeyContactProps,
} from "@/types/listTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useAuth } from "@/context/AuthContext";
import { ADMIN } from "@/constants/auth";
import { useSegments } from "@/hooks/useSegments";
import { approvalApi } from "@/api/approvalApi";

const KeyContact = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data } = useSegments();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rerenderData, setRerenderData] = useState(false);

  const fetchData = useCallback(
    async (page: number, searchTerm: string) => {
      try {
        const { keyContacts, totalPages, currentPage }: KeyContactListResponse =
          await approvalApi.getKeyContactApproval({ page, searchTerm });

        return {
          data: keyContacts,
          totalItems: totalPages * 5 || 0,
          currentPage: currentPage || 0,
          totalPages: totalPages || 0,
        };
      } catch (error) {
        toast({
          title: "Failed to fetch data",
          description: "Error while fetching key contacts. Please try again.",
          duration: 1500,
          variant: "error",
        });
        throw error;
      }
    },
    [rerenderData]
  );

  const handleAction = async (id: string, action: string) => {
    try {
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
    }
  };

  const columns: Column<KeyContactProps>[] = [
    { header: "Name", accessorKey: "contact_name" },
    { header: "Mobile", accessorKey: "contact_mobile" },
    { header: "Email", accessorKey: "contact_email" },

    {
      header: "State",
      accessorKey: "state_id",
      cell: (state) => {
        return (
          <span className="capitalize">
            {data?.state_id?.find((x) => x._id === state.state_id)?.name}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (status) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            status?.adminStatus === "approved"
              ? "bg-green-100 text-green-600"
              : status.adminStatus === "rejected"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status.adminStatus}
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
            >
              <h1>Approve</h1>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="border border-primary text-primary"
              onClick={() => handleAction(cellItem._id, "reject")}
            >
              Reject
            </Button>
          </div>
        );
      },
    },
  ];
  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        const { message }: KeyContactDeleteResponse =
          await listApi.deleteKeyContact(selectedId);

        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully eleted the key contact.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData(!rerenderData);
        }
      } else {
        toast({
          title: "Failed to fetch Id",
          description: "Id is missing from the selected key contact.",
          duration: 1500,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting key contact. Please try again.",
        duration: 1500,
        variant: "error",
      });
      console.log(error);
    } finally {
    }
  };
  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        fetchData={fetchData}
        title="Approve Key Contact"
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDeletion}
        title="Delete Item"
        description={
          user === ADMIN
            ? "Are you sure you want to delete this item? This action is irreversible."
            : "Your request will be sent to admin for approval"
        }
        confirmButtonText="Yes, Delete"
        cancelButtonText="No, Cancel"
      />
    </div>
  );
};

export default withAuth(KeyContact, { requiredRole: ["admin"] });
