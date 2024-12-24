"use client";
import React from "react";
import { useState } from "react";
import styles from "./page.module.css"; // Assuming CSS module for styling
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const Sidebar = ({ menuItems, onSelect }: any) => {
  return (
    <div className={styles.sidebar}>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Sample data for charts
const data = [
  { name: "Jan", sales: 4000, profit: 2400 },
  { name: "Feb", sales: 3000, profit: 1398 },
  { name: "Mar", sales: 2000, profit: 9800 },
  { name: "Apr", sales: 2780, profit: 3908 },
];

const MainContent = ({ selectedMenu }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return (
          <div>
            <h2>Dashboard Overview</h2>
            <BarChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
              <Bar dataKey="profit" fill="#82ca9d" />
            </BarChart>
          </div>
        );
      case "users":
        return (
          <div>
            <h2>User Management</h2>
            <ul>
              <li>John Doe</li>
              <li>Jane Smith</li>
              <li>Michael Johnson</li>
            </ul>
          </div>
        );
      case "records":
        return (
          <div>
            <h2>Records Overview</h2>
            <LineChart width={600} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
            </LineChart>
          </div>
        );
      case "customers":
        return (
          <div>
            <h2>Customer Information</h2>
            <ul>
              <li>Customer A</li>
              <li>Customer B</li>
              <li>Customer C</li>
            </ul>
          </div>
        );
      case "settings":
        return (
          <div>
            <h2>Settings Page</h2>
            <p>Configure your preferences here.</p>
          </div>
        );
      case "logout":
        return (
          <div>
            <h2>Logging Out...</h2>
            <p>Redirecting you to the login page...</p>
          </div>
        );
      default:
        return (
          <div>
            <h2>Welcome</h2>
            <p>Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

// export default MainContent;

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const menuItems = [
    "dashboard",
    "users",
    "records",
    "customers",
    "settings",
    "logout",
  ];

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar menuItems={menuItems} onSelect={setSelectedMenu} />
      <MainContent selectedMenu={selectedMenu} />
    </div>
  );
};

export default Dashboard;
