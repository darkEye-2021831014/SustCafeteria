import { createContext, useEffect, useState } from "react";
import { ENV } from "../../config/env";
import { useGetAllUser } from "../../hooks/useUser";

export const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isAfter8, setIsAfter8] = useState(false);

  const [attendanceLoading, setAttendanceLoading] = useState(true);

  // ✅ use hook
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetAllUser();

  // Attendance click window
  const [canMarkAttendance, setCanMarkAttendance] = useState(false);
  const [attendanceWindowText, setAttendanceWindowText] = useState("");

  // ✅ Handle users from hook
  useEffect(() => {
    if (userError) {
      console.log("Failed to fetch users");
      setUsers([]);
      return;
    }

    if (userData) {
      setUsers(Array.isArray(userData.users) ? userData.users : []);
    }
  }, [userData, userError]);

  // Load attendance
  const loadAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    setAttendanceLoading(true);

    fetch(`${ENV.BASE_URL}/attendance/all?date=${today}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data.attendance)
            ? data.attendance
            : [];
        setAttendance(list);
      })
      .catch(console.log)
      .finally(() => setAttendanceLoading(false));
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // Time logic
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      const after = hour > 8 || (hour === 8 && minute >= 1);
      setIsAfter8(after);

      const nowMinutes = hour * 60 + minute;
      const startMinutes = 7 * 60;
      const endMinutes = 16 * 60;

      const inWindow = nowMinutes >= startMinutes && nowMinutes <= endMinutes;

      setCanMarkAttendance(inWindow);

      setAttendanceWindowText(
        inWindow
          ? "Attendance window is open (7:00 AM - 4:00 PM)"
          : "Attendance can be marked only from 7:00 AM to 4:00 PM",
      );
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mark attendance
  const markAttendance = (user_id) => {
    if (!canMarkAttendance) return;

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;

    const today = now.toISOString().split("T")[0];

    const status = hour > 8 || (hour === 8 && minute >= 1) ? "Late" : "Present";

    fetch(`${ENV.BASE_URL}/attendance/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, status, time, date: today }),
    })
      .then((res) => res.json())
      .then(() => {
        setAttendance((prev) => {
          const index = prev.findIndex(
            (a) => Number(a.user_id) === Number(user_id),
          );

          if (index > -1) {
            const updated = [...prev];
            updated[index] = { user_id, status, time, date: today };
            return updated;
          }

          return [...prev, { user_id, status, time, date: today }];
        });
      })
      .catch(console.log);
  };

  // Merge users + attendance
  const mergedList = users.map((u) => {
    const uid = u.user_id || u.id;

    const a = attendance.find((x) => Number(x.user_id) === Number(uid));

    if (a?.status) return { ...u, status: a.status, time: a.time || "" };

    if ((!a || !a.status) && isAfter8) {
      return { ...u, status: "Absent", time: "" };
    }

    return { ...u, status: "", time: "" };
  });

  const filteredStaff =
    filter === "ALL"
      ? mergedList.filter((s) => s.role?.toLowerCase() !== "manager")
      : mergedList
          .filter((s) => s.status === filter)
          .filter((s) => s.role?.toLowerCase() !== "manager");

  const lateCount = mergedList.filter(
    (u) => u.status === "Late" && u.role?.toLowerCase() !== "manager",
  ).length;

  const absentCount = mergedList.filter(
    (u) => u.status === "Absent" && u.role?.toLowerCase() !== "manager",
  ).length;

  const presentCount = mergedList.filter(
    (u) => u.status === "Present" && u.role?.toLowerCase() !== "manager",
  ).length;

  // ✅ final loading (combined safely)
  const loading = userLoading || attendanceLoading;

  return (
    <AttendanceContext.Provider
      value={{
        loading,
        mergedList,
        filteredStaff,
        filter,
        setFilter,
        markAttendance,
        isAfter8,
        lateCount,
        absentCount,
        presentCount,
        canMarkAttendance,
        attendanceWindowText,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
