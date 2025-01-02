"use client";
import React, { useCallback, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { useToast } from "@/hooks/use-toast";
import {
  DeleteApiResponse,
  KeyContactListResponse,
  KeyContactProps,
} from "@/types/listTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { statesAndUnionTerritories } from "@/constants/form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { STAFF } from "@/constants/auth";
import { listApi } from "@/api/listApi";

const KeyContact = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rerenderData, setRerenderData] = useState(false);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDeleteDialogOpen(true);
  };

  const columns: Column<KeyContactProps>[] = [
    { header: "Name", accessorKey: "contact_name" },
    { header: "Mobile", accessorKey: "contact_mobile" },
    { header: "Email", accessorKey: "contact_email" },
    {
      header: "State",
      accessorKey: "state_id",
      cell: (item) => (
        <span className="capitalize">
          {statesAndUnionTerritories.find((x) => x.id === item.state_id)?.name}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            item.status === "approved"
              ? "bg-green-100 text-green-600"
              : item.status === "rejected"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (item) => {
        if (user === STAFF && item.status === "pending") return null;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                router.push(`/forms/add-key-contact?id=${item._id}`)
              }
            >
              <SquarePen />
            </Button>
            {item.status !== "approved" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteClick(item._id)}
              >
                <Trash2 className="text-red-600" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const fetchData = useCallback(
    async (page: number, searchTerm: string) => {
      try {
        const { keyContacts, totalPages, currentPage }: KeyContactListResponse =
          await listApi.getKeyContacts({ page, searchTerm });

        return {
          data: keyContacts,
          totalItems: totalPages * 5,
          currentPage: currentPage,
          totalPages: totalPages,
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

  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        const { message }: DeleteApiResponse = await listApi.deleteApi(
          `/keycontact/${selectedId}`
        );
        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully deleted the key contact.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData((prev) => !prev);
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
    }
  };

  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        fetchData={fetchData}
        title="Key Contact"
        viewAllLink="/forms/add-key-contact"
        addButtonTitle="Add Key Contact"
        itemsPerPage={10}
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

export default withAuth(KeyContact, { requiredRole: ["admin", "staff"] });
