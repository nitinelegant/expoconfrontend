import Link from "next/link";
import { LogOut } from "lucide-react";
import { SidebarProps, MenuLink } from "../../types/sidebar";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Sidebar({ menuSections }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 border-r bg-white">
      <div className="p-3">
        <div className="flex items-center space-x-2">
          {/* <div className="h-8 w-8 rounded-full bg-blue-500" /> */}
          <Image
            src={require("../../public/assets/images/logo.png")} // Path to the image file
            alt="Description of the image"
            width={150} // Desired width
            height={100} // Desired height
          />

          {/* <span className="text-xl font-bold text-black">ExpoCon</span> */}
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-6 px-4 pb-4 mt-4">
        {menuSections.map((section) => (
          <div key={section.name}>
            <div className="flex  items-center">
              <section.icon className="h-5 w-5 text-black" />
              <p className="px-2 text-xs font-semibold uppercase text-gray-500">
                {section.name}
              </p>
            </div>

            <div className="mt-2 space-y-1">
              {section.links.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.text}
                    href={item.href}
                    className={`flex items-center space-x-2 rounded-lg px-7 py-2 ${
                      isActive
                        ? "bg-primary text-white-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>{item.text}</span>
                    {/* {item.badge && (
                      <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                        {item.badge}
                      </span>
                    )} */}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
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
