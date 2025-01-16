"use client";
import React, { useCallback, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  VenueProps,
  VenueListResponse,
  VenueDeleteResponse,
} from "@/types/listTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import { useRouter } from "next/navigation";
import { useSegments } from "@/hooks/useSegments";
import { useAuth } from "@/context/AuthContext";
import { ADMIN } from "@/constants/auth";
import { featureApi } from "@/api/featureApi";

const Venue = () => {
  const { data } = useSegments();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rerenderData, setRerenderData] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchData = useCallback(
    async (page: number, searchTerm: string) => {
      try {
        const { venues, totalPages, currentPage }: VenueListResponse =
          await featureApi.getFeaturedVanues({
            page,
            searchTerm,
          });

        return {
          data: venues,
          totalItems: totalPages * 10 || 0,
          currentPage: currentPage || 0,
          totalPages: totalPages || 0,
        };
      } catch (error) {
        toast({
          title: "Failed to fetch data",
          description: "Error while fetching association. Please try again.",
          duration: 1500,
          variant: "error",
        });
        throw error;
      }
    },
    [rerenderData]
  );
  const columns: Column<VenueProps>[] = [
    { header: "Venue Name", accessorKey: "venue_name" },
    { header: "City", accessorKey: "venue_city" },
    { header: "Address", accessorKey: "venue_address" },
    { header: "Website", accessorKey: "venue_website" },
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
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   cell: (item) => (
    //     <span
    //       className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
    //         item.adminStatus === "approved"
    //           ? "bg-green-100 text-green-600"
    //           : item.adminStatus === "rejected"
    //           ? "bg-red-50 text-red-600"
    //           : "bg-yellow-100 text-yellow-600"
    //       }`}
    //     >
    //       {item.adminStatus === "approved" ? item.status : item?.adminStatus}
    //     </span>
    //   ),
    // },
    {
      header: "Action",
      accessorKey: "_id",
      cell: (cellItem) => {
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/forms/add-venue?id=${cellItem._id}`)}
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
        const { message }: VenueDeleteResponse = await listApi.deleteVenue(
          selectedId
        );

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
        title="Featured Venue"
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

export default withAuth(Venue, { requiredRole: ["admin", "staff"] });
