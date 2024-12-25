import {
  ArrowDownRight,
  ArrowUpRight,
  ShoppingCart,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Earnings</CardTitle>
          <Wallet className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$928.41</div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-600">+12.8%</span>
            <span className="text-xs text-gray-500">
              +$118.8 than last month
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Spendings</CardTitle>
          <ShoppingCart className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$169.43</div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-red-600">-3.1%</span>
            <span className="text-xs text-gray-500">-$5.2 than last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$406.27</div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-600">+8.2%</span>
            <span className="text-xs text-gray-500">
              +$33.3 than last month
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Investment</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,854.08</div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-600">+9.2%</span>
            <span className="text-xs text-gray-500">
              +$78.5 than last month
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
