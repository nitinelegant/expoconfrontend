"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { HelpCircle, Settings, User, LayoutDashboard } from "lucide-react";
import { MenuSection } from "@/types/sidebar";

const menuSections: MenuSection[] = [
  {
    name: "Records",
    icon: LayoutDashboard,
    links: [
      {
        href: "/staff/dashboard/records/exhibition",
        icon: Settings,
        text: "Exhibition",
      },
      {
        href: "/staff/dashboard/records/expexhibition",
        icon: User,
        text: "Expired Exhibition",
      },
      {
        href: "/staff/dashboard/records/conference",
        icon: HelpCircle,
        text: "Conference",
      },
      {
        href: "/staff/dashboard/records/expconference",
        icon: HelpCircle,
        text: "Expired Conference",
      },
      {
        href: "/staff/dashboard/records/venue",
        icon: HelpCircle,
        text: "Venue",
      },
      {
        href: "/staff/dashboard/records/association",
        icon: HelpCircle,
        text: "Association",
      },
      {
        href: "/staff/dashboard/records/company",
        icon: HelpCircle,
        text: "Company",
      },
      {
        href: "/staff/dashboard/records/keycontact",
        icon: HelpCircle,
        text: "Key Contact",
      },
    ],
  },
  {
    name: "Report an issue",
    icon: HelpCircle,
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
        <Header title="Dashboard" />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
