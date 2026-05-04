import { createContext, useEffect, useState } from "react";
import { ENV } from "../../config/env";

export const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [canMarkAttendance, setCanMarkAttendance] = useState(false);
  const [attendanceWindowText, setAttendanceWindowText] = useState("");

  // =========================
  // LOAD ATTENDANCE ONLY
  // =========================
  const loadAttendance = () => {
    const today = new Date().toISOString().split("T")[0];

    setLoading(true);

    fetch(`${ENV.BASE_URL}/attendance/all?date=${today}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAttendance(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log("Attendance fetch error:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // =========================
  // TIME WINDOW LOGIC
  // =========================
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      const nowMinutes = hour * 60 + minute;
      const start = 7 * 60; // 07:00
      const end = 16 * 60; // 16:00

      const inWindow = nowMinutes >= start && nowMinutes <= end;

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

  // =========================
  // MARK ATTENDANCE
  // =========================
  const markAttendance = (user_id) => {
    if (!canMarkAttendance) return;

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;

    const date = now.toISOString().split("T")[0];

    const status = hour > 8 || (hour === 8 && minute >= 1) ? "Late" : "Present";

    fetch(`${ENV.BASE_URL}/attendance/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, status, time, date }),
    })
      .then(() => {
        // 🔥 refresh after marking
        loadAttendance();
      })
      .catch((err) => console.log("Mark attendance error:", err));
  };

  // =========================
  // FILTERED LIST
  // =========================
  const filteredStaff =
    filter === "ALL"
      ? attendance.filter((u) => u.role?.toLowerCase() !== "manager")
      : attendance
          .filter((u) => u.status === filter)
          .filter((u) => u.role?.toLowerCase() !== "manager");

  // =========================
  // COUNTS
  // =========================
  const lateCount = attendance.filter((u) => u.status === "Late").length;

  const absentCount = attendance.filter((u) => u.status === "Absent").length;

  const presentCount = attendance.filter((u) => u.status === "Present").length;

  return (
    <AttendanceContext.Provider
      value={{
        loading,
        attendance,
        mergedList: attendance,
        filteredStaff,

        filter,
        setFilter,

        markAttendance,

        canMarkAttendance,
        attendanceWindowText,

        lateCount,
        absentCount,
        presentCount,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceProvider;
