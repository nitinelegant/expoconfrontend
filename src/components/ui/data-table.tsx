import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  title?: string;
  viewAllLink?: string;
  className?: string;
  showCheckbox?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  title,
  viewAllLink,
  className,
  showCheckbox = false,
}: DataTableProps<T>) {
  return (
    <Card className={cn("mt-6", className)}>
      {title && (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-black">{title}</CardTitle>
          {viewAllLink && (
            <Button variant="link" className="text-blue-500">
              <Link href={viewAllLink}>Add New</Link>
            </Button>
          )}
        </CardHeader>
      )}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {showCheckbox && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead key={column.header} className="text-black">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {showCheckbox && (
                  <TableCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.header} className="text-black">
                    {column.cell
                      ? column.cell(item)
                      : (item[column.accessorKey] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
