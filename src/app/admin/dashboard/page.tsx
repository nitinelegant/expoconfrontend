import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Overview } from "@/components/dashboard/overview";
import { Statistics } from "@/components/dashboard/statistics";
import { SavingsWidget } from "@/components/dashboard/savingsWidget";
import { TransactionsTable } from "@/components/dashboard/transactionsTable";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-6 text-black">Overview</h1>
          <Overview />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <Statistics />
            </div>
            <div>
              <SavingsWidget />
            </div>
          </div>
          <TransactionsTable />
        </main>
      </div>
    </div>
  );
}
