import { useState, useCallback, useMemo } from "react";
import { LogOut } from "lucide-react";
import { SidebarProps } from "../../types/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import { useAuth } from "@/context/AuthContext";
import { MenuItem } from "@/components/dashboard/MenuItem";
import { SectionItem } from "@/components/dashboard/SectionItem";

export function Sidebar({ menuSections }: SidebarProps) {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = useCallback((itemText: string) => {
    setOpenMenus((prev) => ({ ...prev, [itemText]: !prev[itemText] }));
  }, []);

  const handleNavigation = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  const filteredSections = useMemo(
    () => menuSections.filter((section) => section.visible.includes(user)),
    [menuSections, user]
  );

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white">
      <div className="p-3">
        <div className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={150} height={100} />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-6 px-4 pb-4 mt-4">
        {filteredSections.map((section) => (
          <SectionItem
            key={section.name}
            section={section}
            isOpen={openMenus[section.name]}
            toggleMenu={toggleMenu}
            handleNavigation={handleNavigation}
            pathname={pathname}
          >
            {section.links?.map((item) => (
              <MenuItem
                key={item.text}
                item={item}
                depth={0}
                isOpen={openMenus[item.text]}
                toggleMenu={toggleMenu}
                handleNavigation={handleNavigation}
                pathname={pathname}
                user={user}
              />
            ))}
          </SectionItem>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          className="flex w-full items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
