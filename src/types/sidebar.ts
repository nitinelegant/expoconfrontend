import { type LucideIcon } from "lucide-react";

export interface MenuLink {
  href: string;
  icon?: LucideIcon;
  text: string;
}

export interface MenuSection {
  name: string;
  icon: LucideIcon;
  links: MenuLink[];
  mainLink?: string;
}
export interface userSection {
  name: string;
  count: number;
}
export interface OverviewProps {
  overviewSection: userSection[];
}

export interface SidebarProps {
  menuSections: MenuSection[];
}