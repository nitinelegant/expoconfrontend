"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import {
  BarChart2,
  HelpCircle,
  Settings,
  User,
  FileText,
  Calendar,
  Users,
  Bell,
  Briefcase,
  Globe,
  User2,
  LayoutDashboard,
  Receipt,
  ViewIcon,
  SpeakerIcon,
  Megaphone,
  Award,
  UserRound,
  FileTextIcon,
  SquareCheckBig,
  BriefcaseIcon,
  UserPlus,
} from "lucide-react";
import { MenuSection } from "@/types/sidebar";

const menuSections: MenuSection[] = [
  {
    name: "User",
    icon: UserRound,

    links: [
      {
        href: "/admin/dashboard/user/overview",
        icon: LayoutDashboard,
        text: "Overview",
      },
      { href: "#", icon: User2, text: "Users" },
      {
        href: "#",
        icon: ViewIcon,
        text: "Visitors",
      },
      {
        href: "#",
        icon: Receipt,
        text: "Exhibit",
      },
      {
        href: "#",
        icon: SpeakerIcon,
        text: "Delegate",
      },
    ],
  },
  {
    name: "Staff",
    icon: UserPlus,

    links: [
      {
        href: "/admin/dashboard/staff",
        icon: LayoutDashboard,
        text: "Staff Registration",
      },
      {
        href: "/admin/dashboard/staff/stafflist",
        icon: LayoutDashboard,
        text: "Staff List",
      },
    ],
  },
  {
    name: "Records",
    icon: FileTextIcon,
    links: [
      {
        href: "/admin/dashboard/records/exhibition",
        icon: Settings,
        text: "Exhibition",
      },
      {
        href: "/admin/dashboard/records/expexhibition",
        icon: User,
        text: "Expired Exhibition",
      },
      {
        href: "/admin/dashboard/records/conference",
        icon: HelpCircle,
        text: "Conference",
      },
      {
        href: "/admin/dashboard/records/expconference",
        icon: HelpCircle,
        text: "Expired Conference",
      },
      {
        href: "/admin/dashboard/records/venue",
        icon: HelpCircle,
        text: "Venue",
      },
      {
        href: "/admin/dashboard/records/association",
        icon: HelpCircle,
        text: "Association",
      },
      {
        href: "/admin/dashboard/records/company",
        icon: HelpCircle,
        text: "Company",
      },
      {
        href: "/admin/dashboard/records/keycontact",
        icon: HelpCircle,
        text: "Key Contact",
      },
    ],
  },
  {
    name: "Featured",
    icon: Award,
    links: [
      {
        href: "/admin/dashboard/featured/organizer",
        icon: BarChart2,
        text: "Organizer",
      },
      { href: "/admin/dashboard/records/venue", icon: FileText, text: "Venue" },
      {
        href: "/admin/dashboard/records/exhibition",
        icon: Users,
        text: "Exhibition",
      },
      {
        href: "/admin/dashboard/records/conference",
        icon: Users,
        text: "Conference",
      },
      {
        href: "/admin/dashboard/featured/supplier",
        icon: Users,
        text: "Supplier",
      },
    ],
  },
  {
    name: "Approval",
    icon: SquareCheckBig,
    links: [
      { href: "#", icon: Calendar, text: "Exhibition" },
      { href: "#", icon: Bell, text: "Conference" },
      { href: "#", icon: Briefcase, text: "Job" },
    ],
  },
  {
    name: "Jobs",
    icon: BriefcaseIcon,
    links: [
      { href: "#", icon: Globe, text: "Openings" },
      { href: "#", icon: Settings, text: "Application" },
    ],
  },
  {
    name: "Advertisement",
    icon: Megaphone,
    links: [{ href: "#", icon: Globe, text: "Advertisement" }],
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
        <Header title="Admin Dashboard" />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
