import Link from "next/link";
import {
  BarChart2,
  HelpCircle,
  Layout,
  LogOut,
  Mail,
  PiggyBank,
  Settings,
  User,
  Wallet,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-white">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-blue-500" />
          <span className="text-xl font-bold text-black">ExpoCon</span>
        </div>
      </div>
      <nav className="space-y-6 px-4">
        <div>
          <p className="px-2 text-xs font-semibold uppercase text-gray-500">
            Menu
          </p>
          <div className="mt-2 space-y-1">
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg bg-blue-50 px-2 py-2 text-blue-600"
            >
              <Layout className="h-5 w-5" />
              <span>Overview</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <BarChart2 className="h-5 w-5" />
              <span>Statistics</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <PiggyBank className="h-5 w-5" />
              <span>Savings</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <Wallet className="h-5 w-5" />
              <span>Portfolios</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <Mail className="h-5 w-5" />
              <span>Messages</span>
              <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                13
              </span>
            </Link>
          </div>
        </div>
        <div>
          <p className="px-2 text-xs font-semibold uppercase text-gray-500">
            General
          </p>
          <div className="mt-2 space-y-1">
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <User className="h-5 w-5" />
              <span>Appearances</span>
            </Link>
            <Link
              href="#"
              className="flex items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Need Help?</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-6 p-4">
        <button className="flex w-full items-center space-x-2 rounded-lg px-2 py-2 text-gray-600 hover:bg-gray-50">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
