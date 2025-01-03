"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MenuSection } from "@/types/sidebar";
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
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuSections: MenuSection[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      mainLink: "/admin",
      links: [],
      visible: ["admin"],
    },
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      mainLink: "/staff",
      links: [],
      visible: ["staff"],
    },
    {
      name: "User",
      icon: UserRound,
      links: [
        { href: "#", text: "Users", visible: ["admin"] },
        { href: "#", text: "Visitors", visible: ["admin"] },
        { href: "#", text: "Exhibit", visible: ["admin"] },
        { href: "#", text: "Delegate", visible: ["admin"] },
      ],
      visible: ["admin"],
    },
    {
      name: "Records",
      icon: FileTextIcon,
      links: [
        {
          href: "/records/exhibition",
          text: "Exhibition",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/expexhibition",
          text: "Expired Exhibition",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/conference",
          text: "Conference",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/expconference",
          text: "Expired Conference",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/venue",
          text: "Venue",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/association",
          text: "Association",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/company",
          text: "Company",
          visible: ["admin", "staff"],
        },
        {
          href: "/records/keycontact",
          text: "Key Contact",
          visible: ["admin", "staff"],
        },
      ],
      visible: ["admin", "staff"],
    },
    {
      name: "Featured",
      icon: Award,
      links: [
        {
          href: "/featured/organizer",
          text: "Organizer",
          visible: ["admin"],
        },
        { href: "/featured/venue", text: "Venue", visible: ["admin"] },
        {
          href: "/featured/exhibition",
          text: "Exhibition",
          visible: ["admin"],
        },
        {
          href: "/featured/conference",
          text: "Conference",
          visible: ["admin"],
        },
        {
          href: "/featured/supplier",
          text: "Supplier",
          visible: ["admin"],
        },
      ],
      visible: ["admin"],
    },
    {
      name: "Approval",
      icon: SquareCheckBig,
      links: [
        {
          href: "/approval/exhibition",
          text: "Exhibition",
          visible: ["admin"],
        },
        {
          href: "/approval/conference",
          text: "Conference",
          visible: ["admin"],
        },
        {
          href: "/approval/venue",
          text: "Venue",
          visible: ["admin"],
        },
        {
          href: "/approval/association",
          text: "Association",
          visible: ["admin"],
        },
        {
          href: "/approval/company",
          text: "Company",
          visible: ["admin"],
        },
        {
          href: "/approval/keycontact",
          text: "Key Contact",
          visible: ["admin"],
        },
        { href: "#", text: "Job", visible: ["admin"] },
      ],
      visible: ["admin"],
    },
    {
      name: "Jobs",
      icon: BriefcaseIcon,
      links: [
        { href: "#", text: "Openings", visible: ["admin"] },
        { href: "#", text: "Application", visible: ["admin"] },
      ],
      visible: ["admin"],
    },

    {
      name: "Advertisement",
      icon: Megaphone,
      mainLink: "#",
      links: [],
      visible: ["admin"],
    },
    {
      name: "Report an issue",
      icon: HelpCircle,
      mainLink: "#",
      links: [],
      visible: ["staff"],
    },
    {
      name: "Staff",
      icon: UserPlus,
      links: [
        {
          href: "/staff-onboard",
          text: "Staff Registration",
          visible: ["admin"],
        },
        {
          href: "/staff-onboard/stafflist",
          text: "Staff List",
          visible: ["admin"],
        },
      ],
      visible: ["admin"],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuSections={menuSections} />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <div className="relative flex-1">
          <Suspense fallback={<Loader />}>
            <main className="absolute inset-0 overflow-y-auto p-4">
              {children}
            </main>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
