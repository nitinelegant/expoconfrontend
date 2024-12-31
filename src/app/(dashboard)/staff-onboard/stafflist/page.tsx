"use client";
import React, { useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  StaffProps,
  StaffListResponse,
  StaffDeleteResponse,
} from "@/types/listTypes";
import { Loader } from "@/components/ui/loader";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

const StaffList = () => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [users, setUsers] = useState<StaffProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rerenderData, setRerenderData] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { users }: StaffListResponse = await listApi.getStaff();
        if (users?.length > 0) setUsers(users);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error while fetching data",
          duration: 1000,
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

  const columns: Column<StaffProps>[] = [
    { header: "Staff Name", accessorKey: "user_fullname" },
    { header: "Email", accessorKey: "user_email" },
    {
      header: "Role",
      accessorKey: "user_role",
      cell: (user) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold`}
        >
          {user.user_role === 1 ? "Adming" : "Staff"}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "user_status",
      cell: (venue) => (
        <span
          className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            venue.user_status === "active"
              ? "bg-green-100 text-green-600"
              : venue.user_status === "rejected"
              ? "bg-red-50 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {venue.user_status}
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
  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        setIsLoading(true);
        const { message }: StaffDeleteResponse = await listApi.deleteStaff(
          selectedId
        );

        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully deleted the staff.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData(!rerenderData);
        }
      } else {
        toast({
          title: "Failed to fetch Id",
          description: "Id is missing from the selected staff.",
          duration: 1500,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting staff. Please try again.",
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
        data={users}
        title="Staff "
        viewAllLink="/staff-onboard"
        addButtonTitle="Add Staff"
        itemsPerPage={10}
        searchField="user_fullname"
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

export default withAuth(StaffList, { requiredRole: ["admin", "staff"] });
