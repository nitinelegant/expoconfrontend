"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { axiosInstance } from "@/lib/axios";

interface ExcelExportButtonProps {
  data: [];
  fileName?: string;
  sheetName?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  className?: string;
  showIcon?: boolean;
  label?: string;
  onExportStart?: () => void;
  onExportComplete?: () => void;
  onError?: (error: Error) => void;
}
const getArrayFromResponse = (data) => {
  const staticKeys = ["currentPage", "hasMore", "totalPages", "message"];
  const arrayKey = Object.keys(data).find((key) => !staticKeys.includes(key));
  return arrayKey ? data[arrayKey] : [];
};
const ExcelExportButton = ({
  data,
  fileName = "exported-data",
  sheetName = "Sheet1",
  variant = "default",
  size = "default",
  disabled = false,
  className = "",
  showIcon = true,
  label = "Export to Excel",
  onExportStart,
  onExportComplete,
  onError,
}: ExcelExportButtonProps) => {
  const [loading, setLoading] = useState(false);
  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${fileName}/list?limit=1000`);
      const arrayData = getArrayFromResponse(response.data);
      console.log("response", response.data);
      if (Array.isArray(arrayData)) {
        onExportStart?.();

        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Convert data to worksheet
        const worksheet = XLSX.utils.json_to_sheet(arrayData);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

        // Generate buffer
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

        // Create blob
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName}.xlsx`);

        // Trigger download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        onExportComplete?.();
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      variant={variant}
      size={size}
      disabled={disabled || !data?.length || loading}
      className={className}
    >
      {showIcon && <Download className="mr-2 h-4 w-4 text-white" />}
      <p className="text-white font-bold">{label}</p>
    </Button>
  );
};

export default ExcelExportButton;
