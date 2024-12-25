import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  amount: string;
  icon: LucideIcon;
  percentageChange: number;
  changeAmount: string;
  iconClassName?: string;
}

export function StatsCard({
  title,
  amount,
  icon: Icon,
  percentageChange,
  changeAmount,
  iconClassName,
}: StatsCardProps) {
  const isPositive = percentageChange > 0;

  return (
    <div className="bg-white p-6 rounded-xl border">
      <div className="flex items-center gap-4">
        <div className={cn("p-2 rounded-lg", iconClassName || "bg-blue-100")}>
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold">{amount}</h3>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {isPositive ? "+" : ""}
          {percentageChange}%
        </span>
        <span className="text-sm text-gray-500">
          {isPositive ? "+" : ""}
          {changeAmount} than last month
        </span>
      </div>
    </div>
  );
}