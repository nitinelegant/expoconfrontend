"use client";
import React, { useCallback, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  ApproveResponse,
  CompanyDeleteResponse,
  CompanyListResponse,
  CompanyProps,
} from "@/types/listTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useSegments } from "@/hooks/useSegments";
import { useAuth } from "@/context/AuthContext";
import { ADMIN } from "@/constants/auth";
import { approvalApi } from "@/api/approvalApi";

const Company = () => {
  const { data } = useSegments();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rerenderData, setRerenderData] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = useCallback(
    async (page: number, searchTerm: string) => {
      try {
        const { companies, totalPages, currentPage }: CompanyListResponse =
          await approvalApi.getCompanyApproval({ page, searchTerm });

        return {
          data: companies,
          totalItems: totalPages * 5 || 0,
          currentPage: currentPage || 0,
          totalPages: totalPages || 0,
        };
      } catch (error) {
        toast({
          title: "Failed to fetch data",
          description: "Error while fetching company. Please try again.",
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
        `company/${id}/${action}`
      );
      if (message) {
        toast({
          title: `${isApproved ? "Approve" : "Rejection"} Successful`,
          description: `You have successfully ${
            isApproved ? "approved" : "reject"
          } the company.`,
          duration: 1500,
          variant: isApproved ? "success" : "error",
        });
        setRerenderData(!rerenderData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while approving company. Please try again.",
        duration: 1500,
        variant: "error",
      });
      console.log(error);
    } finally {
    }
  };
  const columns: Column<CompanyProps>[] = [
    { header: "Company Name", accessorKey: "company_name" },
    { header: "City", accessorKey: "company_city" },
    { header: "Address", accessorKey: "company_address" },
    { header: "Website", accessorKey: "company_website" },
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
      cell: (item) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            item?.adminStatus === "approved"
              ? "bg-green-100 text-green-600"
              : item?.adminStatus === "rejected"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item?.adminStatus}
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
        const { message }: CompanyDeleteResponse = await listApi.deleteCompany(
          selectedId
        );

        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully Deleted the company.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData(!rerenderData);
        }
      } else {
        toast({
          title: "Failed to fetch Id",
          description: "Id is missing from the selected company.",
          duration: 1500,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting company. Please try again.",
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
        title="Approve Company"
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

export default withAuth(Company, { requiredRole: ["admin"] });
