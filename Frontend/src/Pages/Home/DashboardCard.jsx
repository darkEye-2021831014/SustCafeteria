import React, { useContext, useState } from "react";
import StatCard from "../../components/Table/Card";
import { useNavigate } from "react-router";
import { ENV } from "../../config/env";
import { AttendanceContext } from "../../contexts/AttendanceContext/AttendanceContext";
export default function DashboardSection() {
  const [active, setActive] = useState(null);
  const [lowStockCount, setLowStockCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActive(item.title);
    navigate(item.route);
  };
    const fetchLowStockCount = async () => {
    const res = await fetch(`${ENV.BASE_URL}/inventory/low-stock`, {
      credentials: "include",
    });
    const data = await res.json();
    setLowStockCount(data.length);
  };
  fetchLowStockCount();
 const { lateCount=0, absentCount=0 } = useContext(AttendanceContext);
const dashboardData = [
  { title: "Today's SalesTotal :", className: "text-[#34C759]  py-10 w-[300px]" },
  { title: `${lowStockCount} Items In Inventory Are below Minimum Stock Level`,className: "text-[#FF383C]  py-10 w-[450px]" },
  { title: "You Have 4 Pending Orders", className: "text-[#FF8D28]  py-10 w-[300px]"},
  { title: (
    <>
      {lateCount} Staff Are Late Today <br />
      And {absentCount} Staff Are Still Absent
    </>
  ), className: "text-[#CB30E0] py-10 w-[450px]" },
];
console.log(lowStockCount);


  return (
    <section className="px-5 py-5 bg-[#ffff]/10 mt-5">
      <div className="px-90 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
        {dashboardData.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            
            onClick={() => handleClick(item)}
                    className={`
                        bg-[#f1f1f4]/20
                        border border-[#E8B5BA]
                        rounded-3xl
                        shadow-sm
                        hover:shadow-xl
                        hover:-translate-y-2
                        hover:border-border-[#E8B5BA]
                        hover:bg-[#f1f1f4]/40
                        font-salsa
                        transition-all duration-300 ease-in-out
                        cursor-pointer
                        text-lg
                        ${item.className}`}
          />
        ))}
      </div>
    </section>
  );
}
