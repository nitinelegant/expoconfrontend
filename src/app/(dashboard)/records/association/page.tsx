"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import { AssociationProps, AssociationsListResponse } from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

const Association = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [associations, setAssociations] = useState<AssociationProps[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader size="medium" />;
  }

  const handleDeleteClick = (id: string) => {
    setSelectedExhibitionId(id);
    setIsDeleteDialogOpen(true);
  };

  const columns: Column<AssociationProps>[] = [
    { header: "Association Name", accessorKey: "association_name" },
    { header: "City", accessorKey: "association_city" },
    { header: "State", accessorKey: "state_id" },
    { header: "Address", accessorKey: "association_address" },
    { header: "Website", accessorKey: "association_website" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            item.status === "approved"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status === "approved" ? "Acitve" : "Pending"}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (cellItem) => {
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
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
