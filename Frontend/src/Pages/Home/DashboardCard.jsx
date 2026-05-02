import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ENV } from "../../config/env";
import { AttendanceContext } from "../../contexts/AttendanceContext/AttendanceContext";
import {
  AlertTriangle,
  ClipboardList,
  Users,
  Wallet,
  UserCircle,
  Utensils,
} from "lucide-react";

export default function DashboardSection({ isManager }) {
  const navigate = useNavigate();
  const { lateCount = 0, absentCount = 0, presentCount = 0 } =
    useContext(AttendanceContext);

  const [lowStockCount, setLowStockCount] = useState(0);

  useEffect(() => {
    if (!isManager) return;

    const fetchLowStockCount = async () => {
      try {
        const res = await fetch(`${ENV.BASE_URL}/inventory/low-stock`, {
          credentials: "include",
        });
        const data = await res.json();
        setLowStockCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        setLowStockCount(0);
      }
    };

    fetchLowStockCount();
  }, [isManager]);

  const managerCards = useMemo(
    () => [
      {
        title: "Today's Sales",
        value: "৳ 12,450",
        subtitle: "Sales summary",
        icon: Wallet,
        color: "text-emerald-600",
        bg: "from-emerald-50 to-white",
        glow: "bg-emerald-200",
        route: "/report/sales-report",
      },
      {
        title: "Low Stock Items",
        value: lowStockCount,
        subtitle: "Refill required",
        icon: AlertTriangle,
        color: "text-rose-600",
        bg: "from-rose-50 to-white",
        glow: "bg-rose-200",
        route: "/inventory/low-stock",
      },
      {
        title: "Pending Orders",
        value: 4,
        subtitle: "Awaiting action",
        icon: ClipboardList,
        color: "text-amber-600",
        bg: "from-amber-50 to-white",
        glow: "bg-amber-200",
        route: "/inventory",
      },
      {
        title: "Attendance",
        value: `${lateCount} Late / ${absentCount} Absent`,
        subtitle: "Today status",
        icon: Users,
        color: "text-violet-600",
        bg: "from-violet-50 to-white",
        glow: "bg-violet-200",
        route: "/attendance",
      },
    ],
    [lowStockCount, lateCount, absentCount]
  );

  const staffCards = useMemo(
    () => [
       {
        title: "Today's Menu",
        value: "View Items",
        subtitle: "Breakfast / Lunch / Dinner",
        icon: Utensils,
        color: "text-orange-600",
        bg: "from-orange-50 to-white",
        glow: "bg-orange-200",
        route: "/menu",
      },
      {
        title: "Today's Attendance",
        value: `${presentCount} Present`,
        subtitle: `${lateCount} Late, ${absentCount} Absent`,
        icon: Users,
        color: "text-indigo-600",
        bg: "from-indigo-50 to-white",
        glow: "bg-indigo-200",
        route: "/attendance",
      },
     
      {
        title: "My Profile",
        value: "Update Profile",
        subtitle: "Name, image, password",
        icon: UserCircle,
        color: "text-sky-600",
        bg: "from-sky-50 to-white",
        glow: "bg-sky-200",
        route: "/profile",
      },
      {
        title: "Inventory",
        value: "Check Stock",
        subtitle: "Quick overview",
        icon: ClipboardList,
        color: "text-teal-600",
        bg: "from-teal-50 to-white",
        glow: "bg-teal-200",
        route: "/inventory",
      },
    ],
    [presentCount, lateCount, absentCount]
  );

  const cards = isManager ? managerCards : staffCards;

  return (
    <section className="px-6 py-6 min-h-[calc(100vh-300px)] flex flex-col">
      <div className="mb-5 flex items-center justify-between max-w-6xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-[#4A1D23]">
          {isManager ? "Manager Overview" : "Staff Overview"}
        </h2>
        <p className="text-sm text-gray-500">
          Click any card to open details
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-15">
        {cards.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.route)}
            className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br ${item.bg} p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl min-h-[160px]`}
          >
           
            <div
              className={`absolute -top-6 -right-6 h-28 w-28 rounded-full blur-2xl opacity-60 ${item.glow}`}
            />
            <div className="absolute top-4 right-4 rounded-2xl bg-white/80 p-3 shadow-md backdrop-blur-md group-hover:scale-110 transition">
              <item.icon className={`h-6 w-6 ${item.color}`} />
            </div>

           
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_40%)]" />

            <div className="relative z-10">
              <p className="text-base font-semibold text-gray-500">
                {item.title}
              </p>

              <h3 className={`mt-6 text-3xl font-bold ${item.color}`}>
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
