"use client";
import React, { useCallback, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  ConferenceDeleteResponse,
  ExpConferenceListResponse,
  ExpConferenceProps,
} from "@/types/listTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import formatDateToYear from "@/utils/common";
import { useAuth } from "@/context/AuthContext";
import { ADMIN } from "@/constants/auth";
import { useSegments } from "@/hooks/useSegments";

const Venue = () => {
  const { toast } = useToast();
  const { data } = useSegments();
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rerenderData, setRerenderData] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = useCallback(
    async (page: number, searchTerm: string) => {
      try {
        const {
          conferences,
          totalPages,
          currentPage,
        }: ExpConferenceListResponse = await listApi.getExpConference({
          page,
          searchTerm,
        });

        return {
          data: conferences,
          totalItems: totalPages * 10 || 0,
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

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDeleteDialogOpen(true);
  };

  const columns: Column<ExpConferenceProps>[] = [
    { header: "Name", accessorKey: "con_shortname" },
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
            item?.status === "active"
              ? "bg-green-100 text-green-600"
              : item.status === "inactive"
              ? "bg-gray-200  text-gray-600" //text-statuscolorreject
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status}
        </span>
      ),
    },
    // {
    //   header: "Action",
    //   accessorKey: "con_type_id",
    //   cell: (cellItem) => {
    //     if (user !== ADMIN) return null;
    //     return (
    //       <div className="flex items-center space-x-2">
    //         <Button variant="ghost" size="icon">
    //           <SquarePen />
    //         </Button>
    //         <Button
    //           variant="ghost"
    //           size="icon"
    //           onClick={() => handleDeleteClick(cellItem._id)}
    //         >
    //           <Trash2 className="text-red-600" />
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  if (user === ADMIN) {
    columns.push({
      header: "Action",
      accessorKey: "con_type_id",
      cell: (cellItem) => {
        if (user !== ADMIN) return null;
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
    });
  }
  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        const { message }: ConferenceDeleteResponse =
          await listApi.deleteConference(selectedId);

        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully deleted the venue.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData(!rerenderData);
        }
      } else {
        toast({
          title: "Failed to fetch Id",
          description: "Id is missing from the selected venue.",
          duration: 1500,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting venue. Please try again.",
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
        title="Expired Conference"
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
