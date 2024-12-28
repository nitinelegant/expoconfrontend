"use client";
import React, { FC, useState } from "react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Trash2, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { withAuth } from "@/utils/withAuth";

interface Transaction {
  id: string;
  eventName: string;
  organigerName: string;
  start: string;
  end: string;
  status: string;
}
interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const transactions: Transaction[] = [
  {
    id: "1",
    eventName: "Alcazar",
    organigerName: "Nagpur",
    start: "Maharashtra",
    end: "staff1@gmail.com",
    status: "Active",
  },

  // Add more transactions to test pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    eventName: `Company ${i + 1}`,
    organigerName: `City ${i + 1}`,
    start: `State ${i + 1}`,
    end: `user${i + 1}@gmail.com`,
    status: ["Active", "InActive", "Completed"][Math.floor(Math.random() * 3)],
  })),
];

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this exhibition? This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="destructive"
          onClick={onClose}
          className=" text-background"
        >
          Cancel
        </Button>
        {/* <Button
          variant="destructive"
          onClick={onConfirm}
          className="outline outline-red-500 text-red-500"
        >
          Delete
        </Button> */}
        <Button
          variant="default"
          onClick={onConfirm}
          className=" text-white bg-[#FF0000]"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const Company = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExhibitionId, setSelectedExhibitionId] = useState<
    string | null
  >(null);

  const handleDeleteClick = (id: string) => {
    setSelectedExhibitionId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Implement the delete logic here
    console.log(`Deleting exhibition with id: ${selectedExhibitionId}`);
    setIsDeleteDialogOpen(false);
    setSelectedExhibitionId(null);
  };
  const columns: Column<Transaction>[] = [
    { header: "Compnay Name", accessorKey: "eventName" },
    { header: "City", accessorKey: "organigerName" },
    { header: "State", accessorKey: "start" },
    { header: "Email Id", accessorKey: "end" },
    {
      header: "Featured",
      accessorKey: "status",
      cell: (transaction) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
            transaction.status === "Active"
              ? "bg-green-100 text-green-600"
              : transaction.status === "Expired"
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {transaction.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (cellItem) => {
        return (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <SquarePen />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteClick(cellItem.id)}
            >
              <Trash2 className="text-red-600" />
            </Button>
            {/* <Button variant="ghost" size="icon">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        data={transactions}
        title="Companies"
        viewAllLink="/forms/add-company"
        addButtonTitle="Add Company"
        itemsPerPage={5}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
export default withAuth(Company, { requiredRole: ["admin", "staff"] });
