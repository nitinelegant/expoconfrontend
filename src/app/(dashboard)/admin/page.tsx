import { Overview } from "@/components/dashboard/overview";
import { Statistics } from "@/components/dashboard/statistics";
import { TransactionsTable } from "@/components/dashboard/transactionsTable";
import { userSection } from "@/types/sidebar";

const overviewSection: userSection[] = [
  {
    name: "Users",
    count: 66,
  },
  {
    name: "Visitors",
    count: 97,
  },
  {
    name: "Exhibit",
    count: 15,
  },
  {
    name: "Delegate",
    count: 233,
  },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-6 text-black">Overview</h1>
          <Overview overviewSection={overviewSection} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <Statistics />
            </div>
            <div>{/* <SavingsWidget /> */}</div>
          </div>
          <TransactionsTable />
        </main>
      </div>
    </div>
  );
}
