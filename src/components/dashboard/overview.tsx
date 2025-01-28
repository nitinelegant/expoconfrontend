import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewProps } from "@/types/sidebar";

export function Overview({ overviewSection }: OverviewProps) {
  return (
    <div className="grid  grid-rows-4 grid-flow-col max-w-2xl gap-4">
      {overviewSection?.map((item) => (
        <div key={item.name} className="max-w-[300px]">
          <h1 className="text-2xl font-semibold mb-4 text-black ">
            {item.name}
          </h1>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex flex-col">
                <div className="text-sm font-medium text-black">Active</div>
                <div className="text-2xl font-bold text-black">
                  {item.active}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <CardTitle className="text-sm font-medium text-black">
                  Pending
                </CardTitle>
                <div className="text-2xl font-bold text-black">
                  {item.pending}
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
}
