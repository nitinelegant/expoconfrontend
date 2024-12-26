"use client";
import React, { useState } from "react";
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

interface Transaction {
  id: string;
  fromTo: string;
  date: string;
  description: string;
  amount: string;
  status: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    fromTo: "Alcazar Events",
    date: "Nitin Singh",
    description: "Monthly salary",
    amount: "+$1,500.0",
    status: "Active",
  },
  {
    id: "2",
    fromTo: "Amazon",
    date: "1 Oct 2023",
    description: "Electronics purchase",
    amount: "-$299.99",
    status: "Expired",
  },
  {
    id: "3",
    fromTo: "Freelance Client",
    date: "30 Sep 2023",
    description: "Web design project",
    amount: "+$850.0",
    status: "Pending",
  },
  // Add more transactions to test pagination
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 4}`,
    fromTo: `Event ${i + 4}`,
    date: `Organizer ${i + 4}`,
    description: `Description ${i + 4}`,
    amount: `$${(Math.random() * 1000).toFixed(2)}`,
    status: ["Active", "InActive", "Completed"][Math.floor(Math.random() * 3)],
  })),
];

const DeleteConfirmationDialog = ({ isOpen, onClose, onConfirm }: any) => (
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
        <Button variant="outline" onClick={onClose} className="bg-primary">
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          className="outline outline-gray-300 text-gray-600"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default function Exhibition() {
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
    { header: "Event Name", accessorKey: "fromTo" },
    { header: "Organizer Name", accessorKey: "date" },
    { header: "Start Date", accessorKey: "date" },
    { header: "End Date", accessorKey: "date" },
    {
      header: "Status",
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
              <Trash2 />
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
        title="Exhibition List"
        viewAllLink="#"
        addButtonTitle="Add Exhibition"
        itemsPerPage={5}
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
