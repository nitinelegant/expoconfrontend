"use client";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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
    fromTo: "Elevate Agency",
    date: "2 Oct 2023",
    description: "Monthly salary",
    amount: "+$1,500.0",
    status: "Success",
  },
  {
    id: "2",
    fromTo: "Amazon",
    date: "1 Oct 2023",
    description: "Electronics purchase",
    amount: "-$299.99",
    status: "Completed",
  },
  {
    id: "3",
    fromTo: "Freelance Client",
    date: "30 Sep 2023",
    description: "Web design project",
    amount: "+$850.0",
    status: "Pending",
  },
];

const columns: Column<Transaction>[] = [
  { header: "Title", accessorKey: "fromTo" },
  { header: "Organizer Name", accessorKey: "date" },
  { header: "Start Date", accessorKey: "date" },
  { header: "End Date", accessorKey: "date" },
  {
    header: "Status",
    accessorKey: "status",
    cell: (transaction) => (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
          transaction.status === "Success"
            ? "bg-green-50 text-green-600"
            : transaction.status === "Pending"
            ? "bg-yellow-50 text-yellow-600"
            : "bg-gray-50 text-gray-600"
        }`}
      >
        {transaction.status}
      </span>
    ),
  },
  {
    header: "Action",
    accessorKey: "id",
    cell: () => (
      <div className="flex items-center space-x-2">
        {/* <Button variant="ghost" size="icon">
          <svg
            className="h-4 w-4"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </Button> */}
        {/* <Button variant="ghost" size="icon">
          <svg
            className="h-4 w-4"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
        </Button> */}
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

export default function Venue() {
  return (
    <div className="space-y-8 p-6">
      <DataTable
        columns={columns}
        data={transactions}
        title="Venue List"
        viewAllLink="/admin/dashboard/forms/addvenue"
      />
    </div>
  );
}
