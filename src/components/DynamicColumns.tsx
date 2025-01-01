import React from "react";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";

interface Changes {
  type: "create" | "update" | "delete";
  updated_values?: Record<string, any>;
}

interface KeyContactProps {
  _id: string;
  changes: Changes;
  contact_name: string;
  contact_mobile?: string;
  contact_email?: string;
  state_id?: number;
  status: "approved" | "rejected" | "pending";
}

interface Props {
  data: KeyContactProps[];
  statesAndUnionTerritories: { id: number; name: string }[];
  handleAction: (id: string, action: string, type: string) => void;
  isLoading: boolean;
  title?: string;
}

const KeyContactsTable = ({
  data,
  statesAndUnionTerritories,
  handleAction,
  isLoading,
  title,
}: Props) => {
  const getColumns = (requestType: string): Column<KeyContactProps>[] => {
    const baseColumns: Column<KeyContactProps>[] = [
      {
        header: "Type",
        accessorKey: "changes",
        cell: (item) => (
          <span
            className={`uppercase inline-flex items-center rounded-full px-2 py-1 text-xs font-bold ${
              item.changes.type === "create"
                ? "text-green-600"
                : item.changes.type === "update"
                ? "text-statuscolorupdate"
                : "text-statuscolorreject"
            }`}
          >
            {item.changes.type}
          </span>
        ),
      },
      {
        header: "Name",
        accessorKey: "contact_name",
      },
    ];

    if (requestType === "create") {
      baseColumns.push(
        { header: "Mobile", accessorKey: "contact_mobile" },
        { header: "Email", accessorKey: "contact_email" },
        {
          header: "State",
          accessorKey: "state_id",
          cell: (item) => (
            <span className="capitalize">
              {
                statesAndUnionTerritories.find((x) => x.id === item.state_id)
                  ?.name
              }
            </span>
          ),
        }
      );
    } else if (requestType === "update") {
      baseColumns.push({
        header: "Updated Values",
        accessorKey: "changes",
        cell: (item) => (
          <div className="space-y-1">
            {Object.entries(item.changes.updated_values || {}).map(
              ([key, value]) => (
                <div key={key} className="text-sm">
                  {/* <span className="font-medium">{key}: </span> */}
                  <span>{String(value)}</span>
                </div>
              )
            )}
          </div>
        ),
      });
    }

    baseColumns.push(
      {
        header: "Status",
        accessorKey: "status",
        cell: (item) => (
          <span
            className={`capitalize inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
              item.status === "approved"
                ? "bg-green-100 text-green-600"
                : item.status === "rejected"
                ? "bg-red-50 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {item.status}
          </span>
        ),
      },
      {
        header: "Action",
        accessorKey: "_id",
        cell: (item) => (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="bg-primary text-white"
              size="sm"
              onClick={() =>
                handleAction(item._id, "approve", item.changes.type)
              }
              disabled={isLoading}
            >
              Approve
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="border border-primary text-primary"
              disabled={isLoading}
              onClick={() =>
                handleAction(item._id, "reject", item.changes.type)
              }
            >
              Reject
            </Button>
          </div>
        ),
      }
    );

    return baseColumns;
  };

  return (
    <DataTable
      columns={getColumns(data[0]?.changes.type || "create")}
      data={data}
      title={title}
      itemsPerPage={10}
      searchField="contact_name"
    />
  );
};

export default KeyContactsTable;
