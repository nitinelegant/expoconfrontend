"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { FileSpreadsheetIcon } from "lucide-react";
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
  url: string;
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
  showIcon = true,
  label = "Export to Excel",
  onExportStart,
  onExportComplete,
  onError,
  url,
}: ExcelExportButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/${url}/list?limit=1000`);
      const arrayData = getArrayFromResponse(response.data);

      if (Array.isArray(arrayData) && arrayData.length > 0) {
        setKeys(Object.keys(arrayData[0]));
        setSelectedKeys(Object.keys(arrayData[0]));
        setModalVisible(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      onError?.(error as Error);
      setLoading(false);
    }
  };

  const confirmExport = () => {
    try {
      const filteredData = data.map((item: any) => {
        const filteredItem: any = {};
        selectedKeys.forEach((key) => {
          filteredItem[key] = item[key];
        });
        return filteredItem;
      });

      // Proceed with export
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.xlsx`);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      onExportComplete?.();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      onError?.(error as Error);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <>
      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-white rounded-lg p-6 w-4/5 min-w-[80%]">
            <h2 className="text-lg font-bold mb-4">Select Keys to Export</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {keys.map((key) => (
                <div key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    id={key}
                    value={key}
                    checked={selectedKeys.includes(key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedKeys((prev) => [...prev, key]);
                      } else {
                        setSelectedKeys((prev) => prev.filter((k) => k !== key));
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={key} className="text-sm break-all">
                    {key}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button
                variant="default"
                className="ml-2 text-white font-bold"
                onClick={confirmExport}
                disabled={selectedKeys.length === 0}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={handleExport}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        className={"bg-[#1e744b]"}
      >
        {showIcon && <FileSpreadsheetIcon className="mr-2 h-4 w-4 text-white" />}
        <p className="text-white font-bold">{label}</p>
      </Button>
    </>
  );
};

export default ExcelExportButton;
