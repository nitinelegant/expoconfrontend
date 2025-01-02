"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  AssociationDeleteResponse,
  AssociationProps,
  AssociationsListResponse,
} from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useSegments } from "@/hooks/useSegments";

const Association = () => {
  const { data } = useSegments();
  const { toast } = useToast();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  const [rerenderData, setRerenderData] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { associations }: AssociationsListResponse =
          await listApi.getAssociation();
        if (associations?.length > 0) setAssociations(associations);
        // setTotalPages(response.totalPages);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while fetching data",
          duration: 1500,
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
  const columns: Column<AssociationProps>[] = [
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
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.adminStatus === "approved" ? "Acitve" : "Pending"}
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
              variant="ghost"
              size="icon"
              onClick={() =>
                router.push(`/forms/add-association?id=${cellItem._id}`)
              }
            >
              <SquarePen />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(cellItem._id)}
            >
              <Trash2 className="text-red-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        setIsLoading(true);
        const { message }: AssociationDeleteResponse =
          await listApi.deleteAssociation(selectedId);

        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully deleted the association.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData(!rerenderData);
        }
      } else {
        toast({
          title: "Failed to fetch Id",
          description: "Id is missing from the selected association.",
          duration: 1500,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting association. Please try again.",
        duration: 1500,
        variant: "error",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        data={associations}
        title="Association"
        viewAllLink="/forms/add-association"
        addButtonTitle="Add Association"
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
