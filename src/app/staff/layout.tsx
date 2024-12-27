"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { HelpCircle, LayoutDashboard } from "lucide-react";
import { MenuSection } from "@/types/sidebar";

const menuSections: MenuSection[] = [
  {
    name: "Records",
    icon: LayoutDashboard,
    links: [
      {
        href: "/staff/exhibition",
        text: "Exhibition",
      },
      {
        href: "/staff/expexhibition",
        text: "Expired Exhibition",
      },
      {
        href: "/staff/conference",
        text: "Conference",
      },
      {
        href: "/staff/expconference",
        text: "Expired Conference",
      },
      {
        href: "/staff/venue",
        text: "Venue",
      },
      {
        href: "/staff/association",
        text: "Association",
      },
      {
        href: "/staff/company",
        text: "Company",
      },
      {
        href: "/staff/keycontact",
        text: "Key Contact",
      },
    ],
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuSections={menuSections} />
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
