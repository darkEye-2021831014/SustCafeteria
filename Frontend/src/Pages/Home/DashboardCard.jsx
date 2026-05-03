import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ENV } from "../../config/env";
import { AttendanceContext } from "../../contexts/AttendanceContext/AttendanceContext";
import {
  ShoppingCart,
  Users,
  Wallet,
  FileBarChart,
  Utensils,
  UserCircle,
  ClipboardList,
} from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext/Authcontext";

export default function DashboardSection({ isManager }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  const [todaySalesCount, setTodaySalesCount] = useState(0);
  const [totalStaffCount, setTotalStaffCount] = useState(0);
  const [todayOrderCount, setTodayOrderCount] = useState(0);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [load, setLoad] = useState(false);
  const {
    loading,
    lateCount = 0,
    absentCount = 0,
    presentCount = 0,
  } = useContext(AttendanceContext);
  useEffect(() => {
    if (!isManager) return;
    setLoad(true);

    const fetchDashboardData = async () => {
      try {
        const [salesRes, staffRes, orderRes] = await Promise.all([
          fetch(
            `${ENV.BASE_URL}/sales?startDate=${startDate}&endDate=${endDate}`,
            {
              credentials: "include",
            },
          ),

          fetch(`${ENV.BASE_URL}/user`, {
            credentials: "include",
          }),

          fetch(`${ENV.BASE_URL}/order/today`, {
            credentials: "include",
          }),
        ]);

        const salesData = await salesRes.json();
        const staffData = await staffRes.json();
        const orderData = await orderRes.json();

        setTodaySalesCount(salesData.data.length || 0);
        setTotalStaffCount(staffData.users.length);
        setTodayOrderCount(orderData.data.length || 0);
      } catch (error) {
        setTodaySalesCount(0);
        setTotalStaffCount(0);
        setTodayOrderCount(0);
      } finally {
        setLoad(false);
      }
    };

    fetchDashboardData();
  }, [isManager]);

  /* ================= MANAGER CARDS ================= */
  const managerCards = useMemo(
    () => [
      {
        title: "Today's Sales",
        value: `${todaySalesCount} Items`,
        subtitle: "Sold today",
        icon: Wallet,
        color: "text-emerald-600",
        bg: "from-emerald-50 to-white",
        glow: "bg-emerald-200",
        route: "/report/sales-report",
      },
      {
        title: "Total Staffs",
        value: `${totalStaffCount} Members`,
        subtitle: "Registered staffs",
        icon: Users,
        color: "text-blue-600",
        bg: "from-blue-50 to-white",
        glow: "bg-blue-200",
        route: "/staff",
      },
      {
        title: "Today's Orders",
        value: `${todayOrderCount} Orders`,
        subtitle: "Placed today",
        icon: ShoppingCart,
        color: "text-[#eb3483]",
        bg: "from-orange-50 to-white",
        glow: "bg-orange-200",
        route: "/report/sales-report",
      },
      {
        title: "Generate Report",
        value: "Report Analysis",
        subtitle: "Sales / Inventory / Attendance",
        icon: FileBarChart,
        color: "text-violet-600",
        bg: "from-violet-50 to-white",
        glow: "bg-violet-200",
        route: "/report",
      },
    ],
    [todaySalesCount, totalStaffCount, todayOrderCount],
  );

  /* ================= STAFF CARDS ================= */
  const staffCards = useMemo(
    () => [
      {
        title: "Today's Menu",
        value: "View Items",
        subtitle: "Breakfast / Lunch / Dinner",
        icon: Utensils,
        color: "text-[#eb3483]",
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
    [presentCount, lateCount, absentCount],
  );

  const cards = isManager ? managerCards : staffCards;

  return (
    <section className="px-6 py-6 min-h-[calc(100vh-300px)] flex flex-col">
      {load || loading ? (
        <div className="flex items-center justify-center py-30">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between max-w-6xl w-full mx-auto">
            <h2 className="text-2xl font-bold text-[#4A1D23]">
              {isManager ? "Manager Dashboard" : "Staff Dashboard"}
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
                {/* top right glow */}
                <div
                  className={`absolute -top-6 -right-6 h-28 w-28 rounded-full blur-2xl opacity-60 ${item.glow}`}
                />

                {/* icon */}
                <div className="absolute top-4 right-4 rounded-2xl bg-white/80 p-3 shadow-md backdrop-blur-md group-hover:scale-110 transition">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>

                {/* pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.8),transparent_40%)]" />

                <div className="relative z-10">
                  <p className="text-base font-semibold text-gray-500">
                    {item.title}
                  </p>

                  <h3 className={`mt-6 text-3xl font-bold ${item.color}`}>
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
