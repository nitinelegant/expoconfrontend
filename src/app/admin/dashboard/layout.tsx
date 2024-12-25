"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import {
  BarChart2,
  HelpCircle,
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
      { href: "/admin/dashboard/user/overview", icon: User2, text: "Overview" },
      { href: "/admin/dashboard/user/users", icon: User2, text: "Users" },
      { href: "/admin/dashboard/user/visitors", icon: User2, text: "Visitors" },
      {
        href: "/admin/dashboard/user/exhibit",
        icon: PiggyBank,
        text: "Exhibit",
      },
      {
        href: "/admin/dashboard/user/delegate",
        icon: Wallet,
        text: "Delegate",
      },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuSections={menuSections} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
