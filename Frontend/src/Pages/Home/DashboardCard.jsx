import React, { useState } from "react";
import StatCard from "../../components/Table/Card";
import { useNavigate, useRouteError, useRoutes } from "react-router";

const dashboardData = [
  { title: "Menu", value: "Manage", route: "/menu" },
  { title: "Inventory", value: "Stock", route: "/inventory" },
  { title: "Staff", value: "Members", route: "/staff" },
  { title: "Attendance", value: "Records", route: "/attendance" },
  { title: "Supplier", value: "Vendors", route: "/supplier" },
  { title: "Reports", value: "Analytics", route: "/report" },
];

export default function DashboardSection() {
  const [active, setActive] = useState(null);
  const navigate=useNavigate();

  const handleClick = (item) => {
    setActive(item.title);

    // route change
    navigate(item.route);
  };

  return (
    <section className=" px-5 py-5">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Quick Access</h2>
        <p className="text-gray-500">
          Access all cafeteria management features
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            active={active === item.title}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </section>
  );
}