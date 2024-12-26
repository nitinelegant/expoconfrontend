"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", earnings: 400, spendings: 240 },
  { month: "Feb", earnings: 500, spendings: 300 },
  { month: "Mar", earnings: 300, spendings: 200 },
  { month: "Apr", earnings: 736.4, spendings: 400 },
  { month: "May", earnings: 500, spendings: 300 },
  { month: "Jun", earnings: 400, spendings: 380 },
];

export function Statistics() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-black">Statistics</CardTitle>
        <Select defaultValue="yearly">
          <SelectTrigger className="w-[120px] bg-white text-black">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="text-black">
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="earnings"
              name="Earnings"
              fill="#395b99"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="spendings"
              name="Spendings"
              fill="#0083bc"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
