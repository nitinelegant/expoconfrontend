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
                className="text-white-600 font-bold bg-primary hover:no-underline"
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
                <TableCell colSpan={columns.length + (showCheckbox ? 1 : 0)}>
                  Loading...
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
                    <TableCell key={column.header} className="max-w-[200px]">
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
