"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import { KeyContactListResponse, KeyContactProps } from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

const KeyContact = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [keyContacts, setKeyContacts] = useState<KeyContactProps[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response: KeyContactListResponse = await listApi.getKeyContact();
        setKeyContacts(response.keyContacts);
        // setTotalPages(response.totalPages);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while fetching data",
          duration: 1500,
          variant: "destructive",
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

  const columns: Column<KeyContactProps>[] = [
    { header: "Contact Name", accessorKey: "contact_name" },
    { header: "Mobile", accessorKey: "contact_mobile" },
    { header: "Email", accessorKey: "contact_email" },
    { header: "State", accessorKey: "state_id" },
    // { header: "Organizer Id", accessorKey: "contact_organizer_id" },
    // { header: "Venue Id", accessorKey: "contact_venue_id" },
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
        data={keyContacts}
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
