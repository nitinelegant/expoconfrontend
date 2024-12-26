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
      {
        href: "#",

        text: "Visitors",
      },
      {
        href: "#",
        text: "Exhibit",
      },
      {
        href: "#",
        text: "Delegate",
      },
    ],
  },

  {
    name: "Records",
    icon: FileTextIcon,
    links: [
      {
        href: "/admin/records/exhibition",

        text: "Exhibition",
      },
      {
        href: "/admin/records/expexhibition",

        text: "Expired Exhibition",
      },
      {
        href: "/admin/records/conference",

        text: "Conference",
      },
      {
        href: "/admin/records/expconference",

        text: "Expired Conference",
      },
      {
        href: "/admin/records/venue",

        text: "Venue",
      },
      {
        href: "/admin/records/association",

        text: "Association",
      },
      {
        href: "/admin/records/company",
        text: "Company",
      },
      {
        href: "/admin/records/keycontact",
        text: "Key Contact",
      },
    ],
  },
  {
    name: "Featured",
    icon: Award,
    links: [
      {
        href: "/admin/featured/organizer",
        text: "Organizer",
      },
      { href: "/admin/records/venue", text: "Venue" },
      {
        href: "/admin/records/exhibition",
        text: "Exhibition",
      },
      {
        href: "/admin/records/conference",
        text: "Conference",
      },
      {
        href: "/admin/featured/supplier",
        text: "Supplier",
      },
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
    name: "Advertisement",
    icon: Megaphone,
    links: [{ href: "#", text: "Advertisement" }],
  },
  {
    name: "Report an issue",
    icon: HelpCircle,
    links: [{ href: "#", text: "Report an issue" }],
  },
  {
    name: "Staff",
    icon: UserPlus,

    links: [
      {
        href: "/admin/staff",
        text: "Staff Registration",
      },
      {
        href: "/admin/staff/stafflist",
        text: "Staff List",
      },
    ],
  },
];

// const menuSections = [
//   {
//     name: "Dashboard",
//     icon: LayoutDashboard,
//     links: [{ text: "Dashboard", href: "/admin/dashboard" }],
//   },
//   {
//     name: "User",
//     icon: UserRound,
//     links: [
//       { href: "#", text: "Users" },
//       {
//         href: "#",

//         text: "Visitors",
//       },
//       {
//         href: "#",
//         text: "Exhibit",
//       },
//       {
//         href: "#",
//         text: "Delegate",
//       },
//     ],
//   },

//   {
//     name: "Records",
//     icon: FileTextIcon,
//     links: [
//       {
//         href: "/admin/records/exhibition",

//         text: "Exhibition",
//       },
//       {
//         href: "/admin/records/expexhibition",

//         text: "Expired Exhibition",
//       },
//       {
//         href: "/admin/records/conference",

//         text: "Conference",
//       },
//       {
//         href: "/admin/records/expconference",

//         text: "Expired Conference",
//       },
//       {
//         href: "/admin/records/venue",

//         text: "Venue",
//       },
//       {
//         href: "/admin/records/association",

//         text: "Association",
//       },
//       {
//         href: "/admin/records/company",
//         text: "Company",
//       },
//       {
//         href: "/admin/records/keycontact",
//         text: "Key Contact",
//       },
//     ],
//   },
//   // {
//   //   name: "Main",
//   //   icon: Award,
//   //   links: [
//   //     { text: "Dashboard", href: "/" },
//   //     {
//   //       text: "Staff",
//   //       href: "/staff",
//   //       subItems: [
//   //         { text: "Staff Registration", href: "/staff/registration" },
//   //         { text: "Staff List", href: "/staff/list" },
//   //       ],
//   //     },
//   //   ],
//   // },
//   {
//     name: "Management",
//     icon: Award,
//     links: [
//       {
//         text: "Reports",
//         href: "/reports",
//         subItems: [
//           { text: "Sales Report", href: "/reports/sales" },
//           { text: "User Activity", href: "/reports/activity" },
//         ],
//       },
//       { text: "Settings", href: "/settings" },
//     ],
//   },
// ];

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
