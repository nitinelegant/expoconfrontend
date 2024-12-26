import { useState } from "react";
import Link from "next/link";
import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { SidebarProps, MenuLink, MenuSection } from "../../types/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Sidebar({ menuSections }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (itemText: string) => {
    setOpenMenus((prev) => ({ ...prev, [itemText]: !prev[itemText] }));
  };

  const renderMenuItem = (item: MenuLink, depth: number = 0) => {
    const isActive = pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus[item.text];

    return (
      <div key={item.text}>
        <div
          className={`flex items-center justify-between rounded-lg px-7 py-2 cursor-pointer ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          style={{ paddingLeft: `${depth * 12 + 28}px` }}
          onClick={() => {
            if (hasSubItems) {
              toggleMenu(item.text);
            } else if (item.href) {
              router.push(item.href);
            }
          }}
        >
          <span>{item.text}</span>
          {hasSubItems &&
            (isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
          {item.badge && (
            <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
              {item.badge}
            </span>
          )}
        </div>
        {hasSubItems && isOpen && (
          <div className="ml-4">
            {item.subItems!.map((subItem) =>
              renderMenuItem(subItem, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const renderSection = (section: MenuSection) => {
    const isActive = section.mainLink && pathname === section.mainLink;
    const hasLinks = section.links && section.links.length > 0;

    return (
      <div key={section.name}>
        <div
          className={`flex items-center justify-between cursor-pointer rounded-lg px-4 py-2 ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => {
            if (section.mainLink) {
              router.push(section.mainLink);
            } else if (hasLinks) {
              toggleMenu(section.name);
            }
          }}
        >
          <div className="flex items-center">
            <section.icon className="h-5 w-5" />
            <p className="px-2 text-xs font-semibold uppercase">
              {section.name}
            </p>
          </div>
          {!section.mainLink &&
            hasLinks &&
            (openMenus[section.name] ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            ))}
        </div>
        {!section.mainLink && hasLinks && openMenus[section.name] && (
          <div className="mt-2 space-y-1">
            {section.links.map((item) => renderMenuItem(item))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white">
      <div className="p-3">
        <div className="flex items-center space-x-2">
          <Image
            src={require("../../public/assets/images/logo.png")}
            alt="Logo"
            width={150}
            height={100}
          />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-6 px-4 pb-4 mt-4">
        {menuSections.map(renderSection)}
      </nav>
      <div className="p-4 border-t">
        <button className="flex w-full items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
