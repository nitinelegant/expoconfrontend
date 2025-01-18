import React from "react";
import { Badge } from "@/components/ui/badge";

const ChangeTypeBadge = ({ type }: { type: string }) => {
  const getTypeColor = (changeType: string) => {
    switch (changeType?.toLowerCase()) {
      case "create":
        return "bg-green-500 hover:bg-green-600";
      case "update":
        return "bg-orange-500 hover:bg-orange-600";
      case "delete":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <Badge className={`${getTypeColor(type)} text-white`}>
      {type || "Unknown"}
    </Badge>
  );
};

export default ChangeTypeBadge;
