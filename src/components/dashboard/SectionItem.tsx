import { ChevronDown, ChevronUp } from "lucide-react";
import { MenuSection } from "@/types/sidebar";

interface SectionItemProps {
  section: MenuSection;
  isOpen: boolean;
  toggleMenu: (itemText: string) => void;
  handleNavigation: (href: string) => void;
  pathname: string;
  children: React.ReactNode;
}

export function SectionItem({
  section,
  isOpen,
  toggleMenu,
  handleNavigation,
  pathname,
  children,
}: SectionItemProps) {
  const isActive = section.mainLink && pathname === section.mainLink;
  const hasLinks = section.links && section.links.length > 0;

  return (
    <div className="transition-all duration-200 ease-in-out">
      <div
        className={`flex items-center justify-between cursor-pointer rounded-lg px-4 py-2 transition-colors duration-200 ${
          isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          if (section.mainLink) {
            handleNavigation(section.mainLink);
          } else if (hasLinks) {
            toggleMenu(section.name);
          }
        }}
      >
        <div className="flex items-center">
          <section.icon className="h-5 w-5" />
          <p className="px-2 text-xs font-semibold uppercase">{section.name}</p>
        </div>
        {!section.mainLink && hasLinks && (
          <span className="transition-transform duration-200">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </span>
        )}
      </div>
      {!section.mainLink && hasLinks && (
        <div
          className={`mt-2 space-y-1 overflow-hidden transition-all duration-200 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
