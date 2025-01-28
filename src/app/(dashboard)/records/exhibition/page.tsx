"use client";
import React, { useCallback, useEffect, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import { withAuth } from "@/utils/withAuth";
import { listApi } from "@/api/listApi";
import { useToast } from "@/hooks/use-toast";
import {
  CompanyProps,
  DeleteApiResponse,
  ExhibitionProps,
  ExhibitionsListResponse,
  VenueProps,
} from "@/types/listTypes";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";
import formatDateToYear from "@/utils/common";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ADMIN, STAFF } from "@/constants/auth";

const Exhibition = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [rerenderData, setRerenderData] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { venues: myVenue } = await listApi.fetchVenues();
        const { companies: myCompanies } = await listApi.fetchCompanies();
        setVenues(myVenue);
        setCompanies(myCompanies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompany();
  }, [rerenderData]);

  const fetchData = useCallback(
    async (page: number, searchTerm: string) => {
      try {
        const {
          exhibitions,
          totalPages,
          currentPage,
        }: ExhibitionsListResponse = await listApi.getExhibition({
          page,
          searchTerm,
        });

        return {
          data: exhibitions,
          totalItems: totalPages * 10 || 0,
          currentPage: currentPage || 0,
          totalPages: totalPages || 0,
        };
      } catch (error) {
        toast({
          title: "Error Loading Data",
          description: "Failed to load data. Please try again.",
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

  const columns: Column<ExhibitionProps>[] = [
    { header: "Event Full Name", accessorKey: "expo_fullname" },
    {
      header: "Start Date",
      accessorKey: "expo_sd",
      cell: (state) => {
        return (
          <span className="capitalize">{formatDateToYear(state.expo_sd)}</span>
        );
      },
    },
    {
      header: "End Date",
      accessorKey: "expo_ed",
      cell: (state) => {
        return (
          <span className="capitalize">{formatDateToYear(state.expo_ed)}</span>
        );
      },
    },
    // { header: "City", accessorKey: "expo_city" },
    {
      header: "Venue",
      accessorKey: "venue_id",
      cell: (item) => {
        return (
          <span className="capitalize">
            {venues?.find((x) => x._id === item?.venue_id)?.venue_name}
          </span>
        );
      },
    },
    {
      header: "Organizer Name",
      accessorKey: "company_id",
      cell: (item) => {
        return (
          <span className="capitalize">
            {companies?.find((x) => x._id === item?.company_id)?.company_name}
          </span>
        );
      },
    },

    // { header: "City", accessorKey: "expo_city" },
    // {
    //   header: "State",
    //   accessorKey: "state_id",
    //   cell: (state) => {
    //     return (
    //       <span className="capitalize">
    //         {data?.state_id?.find((x) => x._id === state.state_id)?.name}
    //       </span>
    //     );
    //   },
    // },
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
        if (user === STAFF && cellItem.adminStatus === "pending") return null;
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                router.push(`/forms/add-exhibition?id=${cellItem._id}`)
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
  const handleConfirmDeletion = async () => {
    try {
      if (selectedId) {
        const { message }: DeleteApiResponse = await listApi.deleteApi(
          `/exhibition/${selectedId}`
        );

        if (message) {
          setIsDeleteDialogOpen(false);
          setSelectedId(null);
          toast({
            title: "Delete Successful",
            description: "You have successfully deleted the exhibition.",
            duration: 1500,
            variant: "success",
          });
          setRerenderData(!rerenderData);
        }
      } else {
        toast({
          title: "Failed to fetch Id",
          description: "Id is missing from the selected exhibition.",
          duration: 1500,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while deleting exhibition. Please try again.",
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
        title="Exhibition"
        viewAllLink="/forms/add-exhibition"
        addButtonTitle="Add Exhibition"
        itemsPerPage={10}
        startingUrl="exhibition"
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

export default withAuth(Exhibition, { requiredRole: ["admin", "staff"] });
