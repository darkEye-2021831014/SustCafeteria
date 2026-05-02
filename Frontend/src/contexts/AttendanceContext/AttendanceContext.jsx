import { createContext, useEffect, useState } from "react";
import { ENV } from "../../config/env";

export const AttendanceContext = createContext();

const AttendanceProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [isAfter8, setIsAfter8] = useState(false);
  const [loading, setLoading] = useState(true);

  // Attendance click window: 7:00 AM to 4:00 PM
  const [canMarkAttendance, setCanMarkAttendance] = useState(false);
  const [attendanceWindowText, setAttendanceWindowText] = useState("");

  // Load users
  useEffect(() => {
    setLoading(true);
    fetch(`${ENV.BASE_URL}/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(Array.isArray(data.users) ? data.users : []))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  // Load attendance for today
  const loadAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    setLoading(true);

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
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  // Live clock checks
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // After 8:00 AM => absent if still unmarked
      const after = hour > 8 || (hour === 8 && minute >= 1);
      setIsAfter8(after);

      // Marking allowed only 7:00 AM - 4:00 PM
      const nowMinutes = hour * 60 + minute;
const startMinutes = 7 * 60;   // 07:00
const endMinutes = 16 * 60;    // 16:00
      const inWindow = nowMinutes >= startMinutes && nowMinutes <= endMinutes;

      setCanMarkAttendance(inWindow);
      setAttendanceWindowText(
        inWindow
          ? "Attendance window is open (7:00 AM - 4:00 PM)"
          : "Attendance can be marked only from 7:00 AM to 4:00 PM"
      );
    };

    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Mark attendance
  const markAttendance = (user_id) => {
    // Hard guard for click window
    if (!canMarkAttendance) {
      console.log("Attendance marking is disabled outside 7:00 AM - 4:00 PM");
      return;
    }

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const time = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:00`;
    const today = now.toISOString().split("T")[0];

    // Before 8:01 => Present, else Late
    let status = "";
    if (hour > 8 || (hour === 8 && minute >= 1)) {
      status = "Late";
    } else {
      status = "Present";
    }

    fetch(`${ENV.BASE_URL}/attendance/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id, status, time, date: today }),
    })
      .then((res) => res.json())
      .then(() => {
        // Replace existing row or add new row
        setAttendance((prev) => {
          const existsIndex = prev.findIndex(
            (a) => Number(a.user_id) === Number(user_id)
          );

          if (existsIndex > -1) {
            const updated = [...prev];
            updated[existsIndex] = { user_id, status, time, date: today };
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

    // If attendance exists with status, show that
    if (a?.status) return { ...u, status: a.status, time: a.time || "" };

    // If no valid status and now after 8:00 => Absent
    if ((!a || !a.status) && isAfter8) {
      return { ...u, status: "Absent", time: "" };
    }

    // Before 8:01 and unmarked => no status
    return { ...u, status: "", time: "" };
  });

  const filteredStaff =
    filter === "ALL"
      ? mergedList.filter((s) => s.role?.toLowerCase() !== "manager")
      : mergedList
          .filter((s) => s.status === filter)
          .filter((s) => s.role?.toLowerCase() !== "manager");

  const lateCount = mergedList.filter(
    (u) => u.status === "Late" && u.role?.toLowerCase() !== "manager"
  ).length;

  const absentCount = mergedList.filter(
    (u) => u.status === "Absent" && u.role?.toLowerCase() !== "manager"
  ).length;

  const presentCount = mergedList.filter(
    (u) => u.status === "Present" && u.role?.toLowerCase() !== "manager"
  ).length;

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