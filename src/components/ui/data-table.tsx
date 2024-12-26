"use client";
import React, { useState } from "react";
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
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

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
  addButtonTitle?: string;
  itemsPerPage?: number;
}

export function DataTable<T>({
  columns,
  data,
  title,
  viewAllLink,
  className,
  showCheckbox = false,
  addButtonTitle,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className={cn("mt-6", className)}>
      {title && (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-black text-xl">{title}</CardTitle>
          <div className="flex gap-4">
            {viewAllLink && (
              <Button
                variant="link"
                className="text-white-600 font-bold bg-blue-600 hover:no-underline"
              >
                <PlusIcon />
                {addButtonTitle}
              </Button>
            )}
          </div>
        </CardHeader>
      )}
      <CardContent>
        <Table className="w-full bg-white">
          <TableHeader className="hover:bg-gray-50 transition-colors text-background">
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
                <TableHead
                  key={column.header}
                  className="font-semibold text-[#64748b]"
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition-colors text-background "
              >
                {showCheckbox && (
                  <TableCell>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.header} className="max-w-[200px]">
                    {column.cell
                      ? column.cell(item)
                      : (item[column.accessorKey] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}{" "}
            entries
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white border-gray-200 text-gray-600 hover:cursor-pointer"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={`bg-white  border-gray-200 text-gray-600 ${
                  page === currentPage ? "bg-primary text-white" : ""
                }`}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-white border-gray-200 text-gray-600"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
