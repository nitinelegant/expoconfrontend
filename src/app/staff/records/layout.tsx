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
        href: "/staff/records/exhibition",
        text: "Exhibition",
      },
      {
        href: "/staff/records/expexhibition",
        text: "Expired Exhibition",
      },
      {
        href: "/staff/records/conference",
        text: "Conference",
      },
      {
        href: "/staff/records/expconference",
        text: "Expired Conference",
      },
      {
        href: "/staff/records/venue",
        text: "Venue",
      },
      {
        href: "/staff/records/association",
        text: "Association",
      },
      {
        href: "/staff/records/company",
        text: "Company",
      },
      {
        href: "/staff/records/keycontact",
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
