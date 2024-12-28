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
    organigerName: "Www.expocon.com",
    start: "Maharashtra",
    end: "Maharashtra",
    status: "H.No 10 Main Road Nagpur Maharashtra",
  },

  // Add more transactions to test pagination
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    eventName: `Company ${i + 1}`,
    organigerName: `Www.expocon${i + 1}.com`,
    start: `City${i + 1}`,
    end: `Karnataka`,
    status: [
      "H.No 1096 Main Road Nagpur Maharashtra",
      "H.No 1097 Main Road Nagpur Maharashtra",
      "H.No 1091 Main Road Nagpur Maharashtra",
    ][Math.floor(Math.random() * 3)],
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

export default function Association() {
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
    { header: "Association Name", accessorKey: "eventName" },
    { header: "Website", accessorKey: "organigerName" },
    { header: "City", accessorKey: "start" },
    { header: "State", accessorKey: "end" },
    { header: "Address", accessorKey: "status" },

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
        title="Association"
        itemsPerPage={5}
        viewAllLink="/forms/add-association"
        addButtonTitle="Add Association"
      />
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
