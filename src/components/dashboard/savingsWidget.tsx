import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SavingsWidget() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Total Savings</CardTitle>
        <button className="rounded-lg p-1 hover:bg-gray-100">
          <svg
            className=" h-4 w-4 text-gray-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$406.27</div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-green-600">+8.2%</span>
          <span className="text-xs text-gray-500">+$33.3 than last month</span>
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm">
              <div>Dream Studio</div>
              <div>$251.9/$750</div>
            </div>
            <Progress value={33} className="mt-2" />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <div>Education</div>
              <div>$1660/$2000</div>
            </div>
            <Progress value={83} className="mt-2" />
          </div>
          <div>
            <div className="flex items-center justify-between text-sm">
              <div>Health Care</div>
              <div>$30.8/$150</div>
            </div>
            <Progress value={20} className="mt-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
