import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Overview } from "@/components/dashboard/overview";
import { Statistics } from "@/components/dashboard/statistics";
import { SavingsWidget } from "@/components/dashboard/savingsWidget";
import { TransactionsTable } from "@/components/dashboard/transactionsTable";
import {
  BarChart2,
  HelpCircle,
  Layout,
  PiggyBank,
  Settings,
  User,
  Wallet,
  FileText,
  Calendar,
  Users,
  Bell,
  Briefcase,
  Globe,
  User2,
} from "lucide-react";
import { MenuSection } from "@/types/sidebar";

const menuSections: MenuSection[] = [
  {
    name: "User",
    links: [
      { href: "#", icon: User2, text: "Users" },
      { href: "#", icon: User2, text: "Visitors" },
      { href: "#", icon: PiggyBank, text: "Exhibit" },
      { href: "#", icon: Wallet, text: "Delegate" },
    ],
  },
  {
    name: "Records",
    links: [
      { href: "#", icon: Settings, text: "Exhibition" },
      { href: "#", icon: User, text: "Expired Exhibition" },
      { href: "#", icon: HelpCircle, text: "Conference" },
      { href: "#", icon: HelpCircle, text: "Expired Conference" },
      { href: "#", icon: HelpCircle, text: "Venue" },
      { href: "#", icon: HelpCircle, text: "Association" },
      { href: "#", icon: HelpCircle, text: "Company" },
      { href: "#", icon: HelpCircle, text: "Key Contact" },
    ],
  },
  {
    name: "Featured",
    links: [
      { href: "#", icon: BarChart2, text: "Organizer" },
      { href: "#", icon: FileText, text: "Venue" },
      { href: "#", icon: Users, text: "Exhibition" },
      { href: "#", icon: Users, text: "Conference" },
      { href: "#", icon: Users, text: "Supplier" },
    ],
  },
  {
    name: "Approval",
    links: [
      { href: "#", icon: Calendar, text: "Exhibition" },
      { href: "#", icon: Bell, text: "Conference" },
      { href: "#", icon: Briefcase, text: "Job" },
    ],
  },
  {
    name: "Jobs",
    links: [
      { href: "#", icon: Globe, text: "Openings" },
      { href: "#", icon: Settings, text: "Application" },
    ],
  },
  {
    name: "Advertisement",
    links: [{ href: "#", icon: Globe, text: "Advertisement" }],
  },
  {
    name: "Report an issue",
    links: [{ href: "#", icon: HelpCircle, text: "Report an issue" }],
  },
];

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuSections={menuSections} />
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
