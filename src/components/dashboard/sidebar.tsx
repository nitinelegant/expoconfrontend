import { useState } from "react";
import { LogOut, ChevronDown, ChevronUp } from "lucide-react";
import { SidebarProps, MenuLink, MenuSection } from "../../types/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import { role } from "@/lib/data";

export function Sidebar({ menuSections }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (itemText: string, event: React.MouseEvent) => {
    // Prevent the event from bubbling up
    event.stopPropagation();
    setOpenMenus((prev) => ({ ...prev, [itemText]: !prev[itemText] }));
  };

  const handleNavigation = (href: string, event: React.MouseEvent) => {
    event.preventDefault();
    // Add a small delay to prevent the glitch during navigation
    setTimeout(() => {
      router.push(href);
    }, 50);
  };

  const renderMenuItem = (item: MenuLink, depth: number = 0) => {
    const isActive = pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openMenus[item.text];
    console.log("renderMenuItem", item);

    if (item.visible.includes(role)) {
      return (
        <div
          key={item.text}
          className="transition-all duration-200 ease-in-out"
        >
          <div
            className={`flex items-center justify-between rounded-lg px-7 py-2 cursor-pointer transition-colors duration-200 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{ paddingLeft: `${depth * 12 + 28}px` }}
            onClick={(e) => {
              if (hasSubItems) {
                toggleMenu(item.text, e);
              } else if (item.href) {
                handleNavigation(item.href, e);
              }
            }}
          >
            <span>{item.text}</span>
            {hasSubItems && (
              <span className="transition-transform duration-200">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
          <div
            className={`ml-4 overflow-hidden transition-all duration-200 ease-in-out ${
              hasSubItems && isOpen
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {hasSubItems &&
              item.subItems!.map((subItem) =>
                renderMenuItem(subItem, depth + 1)
              )}
          </div>
        </div>
      );
    }
  };

  const renderSection = (section: MenuSection) => {
    const isActive = section.mainLink && pathname === section.mainLink;
    const hasLinks = section.links && section.links.length > 0;
    console.log("renderSection", section);
    if (section.visible.includes(role)) {
      return (
        <div
          key={section.name}
          className="transition-all duration-200 ease-in-out"
        >
          <div
            className={`flex items-center justify-between cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            onClick={(e) => {
              if (section.mainLink) {
                handleNavigation(section.mainLink, e);
              } else if (hasLinks) {
                toggleMenu(section.name, e);
              }
            }}
          >
            <div className="flex items-center">
              <section.icon className="h-5 w-5" />
              <p className="px-2 text-xs font-semibold uppercase">
                {section.name}
              </p>
            </div>
            {!section.mainLink && hasLinks && (
              <span className="transition-transform duration-200">
                {openMenus[section.name] ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
          <div
            className={`mt-2 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
              !section.mainLink && hasLinks && openMenus[section.name]
                ? "max-h-screen opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {section.links?.map((item) => renderMenuItem(item))}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white">
      <div className="p-3">
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={150} height={100} />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-6 px-4 pb-4 mt-4">
        {menuSections.map(renderSection)}
      </nav>
      <div className="p-4 border-t">
        <button className="flex w-full items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
