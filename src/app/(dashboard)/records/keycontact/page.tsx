"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  KeyContactDeleteResponse,
  KeyContactListResponse,
  KeyContactProps,
} from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { statesAndUnionTerritories } from "@/constants/form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { STAFF } from "@/constants/auth";

const KeyContact = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [keyContacts, setKeyContacts] = useState<KeyContactProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rerenderData, setRerenderData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { keyContacts }: KeyContactListResponse =
          await listApi.getKeyContact();
        setKeyContacts(keyContacts);
        // setTotalPages(response.totalPages);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while fetching data",
          duration: 1500,
          variant: "error",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [rerenderData]);

  if (isLoading) {
    return <Loader size="medium" />;
  }

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
      cell: (status) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            status.status === "approved"
              ? "bg-green-100 text-green-600"
              : status.status === "rejected"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (cellItem) => {
        if (user === STAFF && cellItem.status === "pending") return null;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                router.push(`/forms/add-key-contact?id=${cellItem._id}`)
              }
            >
              <SquarePen />
            </Button>
            {cellItem.status !== "approved" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteClick(cellItem._id)}
              >
                <Trash2 className="text-red-600" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        data={keyContacts}
        title="Key Contact"
        viewAllLink="/forms/add-key-contact"
        addButtonTitle="Add Key Contact"
        itemsPerPage={10}
        searchField={"contact_name"}
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
