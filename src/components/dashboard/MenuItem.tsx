import { ChevronDown, ChevronUp } from "lucide-react";
import { MenuLink } from "@/types/sidebar";

interface MenuItemProps {
  item: MenuLink;
  depth: number;
  isOpen: boolean;
  toggleMenu: (itemText: string) => void;
  handleNavigation: (href: string) => void;
  pathname: string;
  user: string;
}

export function MenuItem({
  item,
  depth,
  isOpen,
  toggleMenu,
  handleNavigation,
  pathname,
  user,
}: MenuItemProps) {
  if (!item.visible.includes(user)) return null;

  const isActive = pathname === item.href;
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <div className="transition-all duration-200 ease-in-out">
      <div
        className={`flex items-center justify-between rounded-lg px-7 py-2 cursor-pointer transition-colors duration-200 ${
          isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${depth * 12 + 28}px` }}
        onClick={(e) => {
          e.stopPropagation();
          if (hasSubItems) {
            toggleMenu(item.text);
          } else if (item.href) {
            handleNavigation(item.href);
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
      {hasSubItems && (
        <div
          className={`ml-4 overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {item.subItems!.map((subItem) => (
            <MenuItem
              key={subItem.text}
              item={subItem}
              depth={depth + 1}
              isOpen={isOpen}
              toggleMenu={toggleMenu}
              handleNavigation={handleNavigation}
              pathname={pathname}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  );
}
