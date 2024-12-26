"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import {
  HelpCircle,
  Megaphone,
  Award,
  UserRound,
  FileTextIcon,
  SquareCheckBig,
  BriefcaseIcon,
  UserPlus,
  LayoutDashboard,
} from "lucide-react";
import { MenuSection } from "@/types/sidebar";

const menuSections: MenuSection[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    mainLink: "/admin",
    links: [],
  },
  {
    name: "User",
    icon: UserRound,
    links: [
      { href: "#", text: "Users" },
      { href: "#", text: "Visitors" },
      { href: "#", text: "Exhibit" },
      { href: "#", text: "Delegate" },
    ],
  },
  {
    name: "Records",
    icon: FileTextIcon,
    links: [
      { href: "/admin/records/exhibition", text: "Exhibition" },
      { href: "/admin/records/expexhibition", text: "Expired Exhibition" },
      { href: "/admin/records/conference", text: "Conference" },
      { href: "/admin/records/expconference", text: "Expired Conference" },
      { href: "/admin/records/venue", text: "Venue" },
      { href: "/admin/records/association", text: "Association" },
      { href: "/admin/records/company", text: "Company" },
      { href: "/admin/records/keycontact", text: "Key Contact" },
    ],
  },
  {
    name: "Featured",
    icon: Award,
    links: [
      { href: "/admin/featured/organizer", text: "Organizer" },
      { href: "/admin/records/venue", text: "Venue" },
      { href: "/admin/records/exhibition", text: "Exhibition" },
      { href: "/admin/records/conference", text: "Conference" },
      { href: "/admin/featured/supplier", text: "Supplier" },
    ],
  },
  {
    name: "Approval",
    icon: SquareCheckBig,
    links: [
      { href: "#", text: "Exhibition" },
      { href: "#", text: "Conference" },
      { href: "#", text: "Job" },
    ],
  },
  {
    name: "Jobs",
    icon: BriefcaseIcon,
    links: [
      { href: "#", text: "Openings" },
      { href: "#", text: "Application" },
    ],
  },
  {
    name: "Staff",
    icon: UserPlus,
    links: [
      { href: "/admin/staff", text: "Staff Registration" },
      { href: "/admin/staff/stafflist", text: "Staff List" },
    ],
  },
  {
    name: "Advertisement",
    icon: Megaphone,
    mainLink: "#",
    links: [],
  },
  {
    name: "Report an issue",
    icon: HelpCircle,
    mainLink: "#",
    links: [],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 flex bg-gray-50">
      <Sidebar menuSections={menuSections} />
      <div className="flex-1 flex flex-col">
        <Header title="Admin Dashboard" />
        <div className="relative flex-1">
          <main className="absolute inset-0 overflow-y-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
