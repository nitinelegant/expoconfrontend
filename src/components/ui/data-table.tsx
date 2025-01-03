"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  fetchData: (
    page: number,
    searchTerm: string
  ) => Promise<{
    data: T[];
    totalItems: number;
    currentPage: number;
    totalPages: number;
  }>;
  title?: string;
  viewAllLink?: string;
  className?: string;
  showCheckbox?: boolean;
  addButtonTitle?: string;
  itemsPerPage?: number;
}

export function DataTable<T>({
  columns,
  fetchData,
  title,
  viewAllLink,
  className,
  showCheckbox = false,
  addButtonTitle,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await fetchData(currentPage, debouncedSearchTerm);
      setData(result.data);
      setTotalItems(result.totalItems);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, debouncedSearchTerm, fetchData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleNavigation = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 7;

    // Create unique, stable keys for ellipsis
    const leftEllipsisKey = "ellipsis-left";
    const rightEllipsisKey = "ellipsis-right";
    const ellipsisElement = (key: string) => <span key={key}>...</span>;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={`page-${i}`}
            variant={i === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i)}
            className={`bg-white border-gray-200 text-gray-600 ${
              i === currentPage ? "bg-primary text-white" : ""
            }`}
          >
            {i}
          </Button>
        );
      }
    } else {
      buttons.push(
        <Button
          key="page-1"
          variant={1 === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(1)}
          className={`bg-white border-gray-200 text-gray-600 ${
            1 === currentPage ? "bg-primary text-white" : ""
          }`}
        >
          1
        </Button>
      );

      if (currentPage > 3) {
        buttons.push(ellipsisElement(leftEllipsisKey));
      }

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) {
        buttons.push(
          <Button
            key={`page-${i}`}
            variant={i === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(i)}
            className={`bg-white border-gray-200 text-gray-600 ${
              i === currentPage ? "bg-primary text-white" : ""
            }`}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        buttons.push(ellipsisElement(rightEllipsisKey));
      }

      buttons.push(
        <Button
          key={`page-${totalPages}`}
          variant={totalPages === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          className={`bg-white border-gray-200 text-gray-600 ${
            totalPages === currentPage ? "bg-primary text-white" : ""
          }`}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Card className={cn("mt-6", className)}>
      {title && (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-black text-xl">{title}</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search"
                className="w-[300px] pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {viewAllLink && (
              <Button
                variant="link"
                className="text-white font-bold bg-primary hover:no-underline"
                onClick={(e) => handleNavigation(viewAllLink, e)}
              >
                <PlusIcon className="mr-2 h-4 w-4" />
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
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <p className="p-3 text-black">Loading...</p>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((item, index) => (
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
                    <TableCell
                      key={column.header}
                      className="max-w-[400px] text-black"
                    >
                      {column.cell
                        ? column.cell(item)
                        : (item[column.accessorKey] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-700">
            Showing {totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}{" "}
            to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
            {totalItems} entries
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
            {renderPaginationButtons()}
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
