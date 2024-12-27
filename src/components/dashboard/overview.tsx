import { Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewProps } from "@/types/sidebar";

export function Overview({ overviewSection }: OverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewSection?.map((item) => (
        <Card key={item.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-black">
              {item.name}
            </CardTitle>
            <Wallet className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{item.count}</div>
            {/* <div className="flex items-center space-x-2">
             <span className="text-xs text-green-600">+12.8%</span>
             <span className="text-xs text-gray-500">
               +$118.8 than last month
             </span>
           </div> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
