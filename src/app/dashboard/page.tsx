"use client";

import { useState } from "react";
import Link from "next/link";
import withAuth from "../../context/withAuth";

interface DashboardMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

interface RecentActivity {
  id: number;
  user: string;
  action: string;
  time: string;
}

type ActivePage =
  | "dashboard"
  | "products"
  | "orders"
  | "customers"
  | "settings";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");

  const metrics: DashboardMetric[] = [
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
    },
    { label: "Active Users", value: "2,338", change: "+15.3%", trend: "up" },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "-4.1%",
      trend: "down",
    },
    {
      label: "Avg. Order Value",
      value: "$87.13",
      change: "+2.5%",
      trend: "up",
    },
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: 1,
      user: "John Doe",
      action: "Completed order #12345",
      time: "5 minutes ago",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Updated their profile",
      time: "10 minutes ago",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Left a review",
      time: "15 minutes ago",
    },
    {
      id: 4,
      user: "Sarah Wilson",
      action: "Subscribed to newsletter",
      time: "25 minutes ago",
    },
  ];

  const navigationItems = [
    {
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Products",
      icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
    },
    {
      name: "Orders",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      name: "Customers",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    },
    {
      name: "Settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
  ];

  const renderContent = () => {
    switch (activePage) {
      case "products":
      case "orders":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-500">
                This feature is currently under development.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div
                          className={`rounded-md p-3 ${
                            metric.trend === "up" ? "bg-green-50" : "bg-red-50"
                          }`}
                        >
                          <svg
                            className={`h-6 w-6 ${
                              metric.trend === "up"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={
                                metric.trend === "up"
                                  ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                  : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                              }
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {metric.label}
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {metric.value}
                            </div>
                            <div
                              className={`ml-2 flex items-baseline text-sm font-semibold ${
                                metric.trend === "up"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {metric.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recent Activity
                  </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={`https://via.placeholder.com/32?text=${activity.user.charAt(
                                0
                              )}`}
                              alt={activity.user}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {activity.user}
                            </div>
                            <div className="text-sm text-gray-500">
                              {activity.action}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {activity.time}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  Dashboard
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/32"
                  alt="User"
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  Admin User
                </div>
                <div className="text-sm font-medium text-gray-500">
                  admin@example.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } lg:block lg:w-64 bg-white border-r border-gray-200`}
        >
          <div className="h-full px-3 py-4">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const pageName = item.name.toLowerCase() as ActivePage;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActivePage(pageName)}
                    className={`w-full flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      activePage === pageName
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <svg
                      className={`mr-4 h-6 w-6 ${
                        activePage === pageName
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={item.icon}
                      />
                    </svg>
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
